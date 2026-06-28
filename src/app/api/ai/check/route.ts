import { NextRequest, NextResponse } from "next/server";
import { checkNeedWithAI } from "@/lib/data/needs";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  const result = await checkNeedWithAI(title, description);
  return NextResponse.json(result);
}
