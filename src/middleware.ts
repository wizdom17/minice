import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/session';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/dashboard')) {
    // If no token or invalid token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    const { valid } = await decrypt(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
  
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    if (token) {
      const { valid } = await decrypt(token);

      if (valid) {
        // If the user is authenticated, redirect to the dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  }

  if (pathname.startsWith('/admin/dashboard')) {
    // If no token or invalid token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const { valid, decoded } = await decrypt(token);
    if (!valid && !decoded?.role) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/admin/dashboard/:path*', '/trade/binary-trade/:path*'],
};
