import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { GiftCard } from "@/actions/giftcards";
import { db } from "@/firebase";

export async function POST(req: NextRequest) {
  const giftcards: GiftCard[] = await req.json();

  if (!Array.isArray(giftcards)) {
    return NextResponse.json(
      { message: "Invalid data format. Expected an array." },
      { status: 400 }
    );
  }

  try {
    await Promise.all(
      giftcards.map((card) =>
        setDoc(doc(db, "giftcard", card.name), {
          img: card.img,
          name: card.name,
          countries: card.countries,
        })
      )
    );

    return NextResponse.json(
      { message: "Gift cards added successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding gift cards:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
