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
      type: "withdrawal",
      reference: id,
      amount: data.amount,
      status: "proccessing",
      bankName: data.selectedBank.bank_name,
      accountName: data.selectedBank.account_name,
      accountNumber: data.selectedBank.account_number,
      userId: data.user.id,
      userEmail: data.user.email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await updateDoc(doc(db, "users", data.user.id), {
      balance: data.user.balance - data.amount,
    });

    return NextResponse.json(
      { message: "withdrawal processing" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    return NextResponse.json(
      { error: "Error withdrawing funds" },
      { status: 400 }
    );
  }
}
