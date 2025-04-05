import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.thenewsapi.com/v1/news/all?locale=us&language=en&api_token=${process.env.NEWS_API_KEY}&limit=8&categories=business,tech`
    );

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 400 }
    );
  }
}
