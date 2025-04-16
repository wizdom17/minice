import { db } from "@/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import uid from "uid2";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const id = uid(7);
  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  try {
    await setDoc(doc(db, "support", id), {
      id,
      subject: data.subject,
      message: data.message,
      userId: data.userId,
      userEmail: data.userEmail,
    });

    return NextResponse.json(
      { message: "support submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("", error);
    return NextResponse.json(
      { error: "Error occured" },
      { status: 400 }
    );
  }
}
