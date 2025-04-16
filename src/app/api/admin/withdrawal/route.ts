import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  if (data.type === "completed") {
    try {
      await updateDoc(doc(db, "transactions", data.id), {
        status: "completed",
        updatedAt: Date.now(),
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
  } else {
    const user = await getDoc(doc(db, "users", data.id));
    try {
      await updateDoc(doc(db, "transactions", data.id), {
        status: "declined",
        updatedAt: Date.now(),
      });
      await updateDoc(doc(db, "users", data.userId), {
        balance: user.data()?.balance + data.amount,
      });
      return NextResponse.json(
        { message: "withdrawal declined" },
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
}
