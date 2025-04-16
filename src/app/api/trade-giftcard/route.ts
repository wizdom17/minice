import { db, storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import uid from "uid2";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = Object.fromEntries(form.entries());
  const files = form.getAll("files") as File[];
  const id = uid(7);

  try {
    const downloadUrls = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `/trade/giftcards/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
      })
    );

    await setDoc(doc(db, "trades", id), {
      id,
      type: "giftcard",
      name: data.name,
      cardForm: data.cardForm,
      country: data.country,
      currency: data.currency,
      value: data.value,
      amount: data.amount,
      rate: data.rate,
      comment: data.comment,
      status: "pending",
      userId: data.userId,
      userEmail: data.userEmail,
      images: downloadUrls,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json({ message: "Giftcard uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error uploading giftcard:", error);
    return NextResponse.json(
      { error: "Error uploading giftcard" },
      { status: 400 }
    );
  }
}
