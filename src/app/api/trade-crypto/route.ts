import { db, storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import uid from "uid2";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = Object.fromEntries(form.entries());
  const file = form.get("file") as File;
  const id = uid(7);

  try {
    const storageRef = ref(storage, `/trade/crypto/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    await setDoc(doc(db, "trades", id), {
      id,
      type: "crypto",
      name: data.crypto,
      amount: 0,
      rate: data.rate,
      chain: data.chain,
      address: data.address,
      value: "0",
      status: "pending",
      userId: data.userId,
      userEmail: data.userEmail,
      images: [downloadUrl], // keep it as an array
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json(
      { message: "crypto uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading crypto:", error);
    return NextResponse.json(
      { error: "Error uploading crypto" },
      { status: 400 }
    );
  }
}
