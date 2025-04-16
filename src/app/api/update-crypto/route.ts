import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json(
      { message: "Invalid data format" },
      { status: 400 }
    );
  }

  try {
    await updateDoc(doc(db, "crypto", data.name), {
      rate: data.rate,
    });
    return NextResponse.json(
      { message: "crypto rate updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating crypto rate:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 400 }
    );
  }
}
