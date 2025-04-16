import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY as string}`,
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();

    return NextResponse.json(
      { message: "deposit approved", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error depositing funds:", error);
    return NextResponse.json({ error: "Error occured" }, { status: 400 });
  }
}
