import { NextRequest, NextResponse } from "next/server";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data) {
    return NextResponse.json({ message: "Invalid data." }, { status: 400 });
  }
  const userRef = doc(db, "users", data.userId);

  try {
    await updateDoc(userRef, {
      bank_account: arrayUnion({
        account_name: data.accName,
        account_number: data.accNumber,
        bank_name: data.bankName,
      }),
    });

    return NextResponse.json(
      { message: "Bank account added successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding bank account:", error);
    return NextResponse.json({
      message: "Error adding bank account",
      error: error,
    });
  }
}
