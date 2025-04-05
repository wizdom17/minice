import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { cardForm, country, amount, comment, rate, total } = data;
  try {
    const id = uuid();
    await setDoc(doc(db, "transactions"), {
      id,
      cardForm,
      country,
      amount,
      comment,
      rate,
      total,
    });
    return NextResponse.json(
      { message: "Gift card submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding gift cards:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
