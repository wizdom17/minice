import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  try {
    await updateDoc(doc(db, "users", data.user.id), {
      balance: data.user.balance - data.amount,
    });

    return NextResponse.json(
      { message: "withdrawal completed" },
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
