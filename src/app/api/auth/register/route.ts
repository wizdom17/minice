import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";
// import { Resend } from "resend";
// import userRegistration from "@/components/email-templates/NewRegistration";

// const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { token, uid, email, password, firstName, lastName } = await req.json();

  if (token && uid) {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await createSession({ uid: uid });
        return NextResponse.json(
          { success: true, userId: uid, message: "User already exists" },
          { status: 200 }
        );
      }

      // If user doesn't exist, create a new document
      await setDoc(userDocRef, {
        createdAt: Date.now(),
        id: uid,
        firstname: firstName,
        lastname: lastName,
        email: email,
        isVerified: false,
        country: "",
        address: "",
        phone: "",
        total_withdrawal: 0,
        total_deposit: 0,
        balance: 0,
        referral_code: `${uid}`,
        status: "active",
        role: "user",
      });

      await createSession({ uid: uid });
      // await resend.emails.send({
      //   from: "CoinVest <info@wallstreetmatrix.com>",
      //   to: ["wisdomukpong.jnr@gmail.com"],
      //   subject: "New Registration",
      //   react: userRegistration({ userEmail: email }),
      // });
      const response = NextResponse.json(
        { success: true, userId: uid },
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

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      createdAt: Date.now(),
      id: uid,
      firstname: firstName,
      lastname: lastName,
      email: email,
      isVerified: false,
      country: "",
      address: "",
      phone: "",
      total_withdrawal: 0,
      total_deposit: 0,
      balance: 0,
      referral_code: `${uid}`,
      status: "active",
      role: "user",
    });
    await createSession({ uid: user.uid });
    // await resend.emails.send({
    //   from: "CoinVest <info@wallstreetmatrix.com>",
    //   to: ["wisdomukpong.jnr@gmail.com"],
    //   subject: "New Registration",
    //   react: userRegistration({ userEmail: email }),
    // });
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
