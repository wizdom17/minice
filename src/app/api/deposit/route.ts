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
    await setDoc(doc(db, "transactions", id), {
      id,
      type: "deposit",
      reference: data.reference,
      amount: data.amount,
      status: "success",
      userId: data.user.id,
      userEmail: data.user.email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await updateDoc(doc(db, "users", data.user.id), {
      balance: data.user.balance + data.amount,
    });

    return NextResponse.json({ message: "deposit approved" }, { status: 200 });
  } catch (error) {
    console.error("Error depositing funds:", error);
    return NextResponse.json({ error: "Error occured" }, { status: 400 });
  }
}
