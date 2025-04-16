import { auth, db } from "@/firebase";
import { createAdminSession } from "@/lib/session";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email && password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!user) {
        return NextResponse.json(
          { success: false, message: "invalid credentials" },
          { status: 401 }
        );
      }
      const userDocRef = doc(db, "users", user.uid); // Assumes user data is in 'users' collection
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return NextResponse.json(
          { success: false, message: "User data not found" },
          { status: 404 }
        );
      }
      await createAdminSession({
        uid: user.uid,
        role: userDoc.data().role,
      });
      const response = NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );
      return response;
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message, errorCode: error.code },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "invalid request data" },
      { status: 401 }
    );
  }
}
