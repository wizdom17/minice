import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  try {
    if (data.user.status === "active") {
      await updateDoc(doc(db, "users", data.user.id), {
        status: "banned",
      });

      return NextResponse.json({ message: "user banned" }, { status: 200 });
    } else {
      await updateDoc(doc(db, "users", data.user.id), {
        status: "active",
      });

      return NextResponse.json({ message: "user unbanned" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error banning user:", error);
    return NextResponse.json({ error: "Error occured" }, { status: 400 });
  }
}
