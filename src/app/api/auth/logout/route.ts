import { NextRequest, NextResponse } from "next/server";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await signOut(auth);
    const cookie = await cookies();
    cookie.delete("token");
    return NextResponse.json(
      { success: true, message: "Logged out" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message, errorCode: error.code },
      { status: 401 }
    );
  }
}
