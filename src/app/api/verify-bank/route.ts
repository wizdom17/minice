import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accNumber, bank_code } = await req.json();
  try {
    const res = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accNumber}&bank_code=${bank_code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk_test_75c0137ff31e262cc51d0c5092fd06c81da7e462`, // Replace with your actual Bearer token
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json({ message: "request failed" }, { status: 400 });
    }
    const data = await res.json()
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
