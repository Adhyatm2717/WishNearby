import { NextRequest, NextResponse } from "next/server";
import { getNeedById } from "@/lib/data/needs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const need = await getNeedById(id);
  if (!need) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(need);
}
