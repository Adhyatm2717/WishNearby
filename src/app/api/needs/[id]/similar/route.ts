import { NextRequest, NextResponse } from "next/server";
import { getNeedById, getSimilarNeeds } from "@/lib/data/needs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const need = await getNeedById(id);
  if (!need) return NextResponse.json([], { status: 404 });
  const similar = await getSimilarNeeds(need);
  return NextResponse.json(similar);
}
