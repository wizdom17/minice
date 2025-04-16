import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  try {
    await deleteDoc(doc(db, "transactions", data.id));

    return NextResponse.json(
      { message: "transaction deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: "Error deleting transaction" },
      { status: 400 }
    );
  }
}
