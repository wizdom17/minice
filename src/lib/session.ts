"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Encrypt the userId in the JWT token using jose
export async function encrypt(user: { uid: string; isAdmin?: boolean }) {
  const secretKey = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET
  );
  const token = await new SignJWT({ userId: user.uid, isAdmin: user.isAdmin })
    .setProtectedHeader({ alg: "HS256" }) // Set the algorithm to HS256
    .setExpirationTime("1h") // Set expiration to 1 hour
    .sign(secretKey);

  return token;
}

// Decrypt the JWT token using jose
export async function decrypt(session: string | undefined = "") {
  try {
    const secretKey = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );
    const { payload } = await jwtVerify(session || "", secretKey);
    return { valid: true, decoded: payload };
  } catch (error) {
    return { valid: false, error };
  }
}

// Create the session cookie with the JWT token
export async function createSession(user: { uid: string }) {
  const token = await encrypt(user);
  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function createAdminSession(user: {
  uid: string;
  isAdmin: boolean;
}) {
  const token = await encrypt(user);
  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

// Delete the session cookie
export async function deleteSession() {
  const cookie = await cookies();
  cookie.delete("token");
}
