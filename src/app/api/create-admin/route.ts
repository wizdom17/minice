import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";


export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      createdAt: Date.now(),
      id: user.uid,
      firstname: firstName,
      lastname: lastName,
      email: email,
      role: "admin"
    });
    await createSession({ uid: user.uid });
    const response = NextResponse.json(
      { success: true, userId: user.uid },
      { status: 200 }
    );

    return response;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return NextResponse.json(
      { success: false, errorCode, errorMessage },
      { status: 400 }
    );
  }
}
