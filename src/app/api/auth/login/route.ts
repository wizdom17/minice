import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/firebase"; // Import Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { token, uid, email, password } = await req.json();

  if (token && uid) {
    try {
      const userDocRef = doc(db, "users", uid); // Assumes user data is in 'users' collection
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return NextResponse.json(
          { success: false, message: "User data not found" },
          { status: 404 }
        );
      }
      await createSession({ uid: uid });
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
  }

  try {
    // Authenticate user using Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication failed" },
        { status: 401 }
      );
    }

    // Retrieve user data from Firestore
    const userDocRef = doc(db, "users", user.uid); // Assumes user data is in 'users' collection
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json(
        { success: false, message: "User data not found" },
        { status: 404 }
      );
    }
    await createSession({ uid: user.uid });
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
}
