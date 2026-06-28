import { NextResponse } from "next/server";
import { getTrendingPrediction } from "@/lib/data/needs";

export async function GET() {
  const trending = await getTrendingPrediction();
  return NextResponse.json(trending);
}
