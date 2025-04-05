import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Crypto } from "@/actions/crypto";

export async function POST(req: NextRequest) {
  const crypto: Crypto[] = await req.json();

  if (!Array.isArray(crypto)) {
    return NextResponse.json(
      { message: "Invalid data format. Expected an array." },
      { status: 400 }
    );
  }

  try {
    await Promise.all(
      crypto.map((crypto) =>
        setDoc(doc(db, "crypto", crypto.name), {
          img: crypto.img,
          name: crypto.name,
          symbol: crypto.symbol,
          rate: crypto.rate,
        })
      )
    );

    return NextResponse.json(
      { message: "crypto added successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding crypto:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
