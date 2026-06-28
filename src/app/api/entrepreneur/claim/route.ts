import { NextRequest, NextResponse } from "next/server";
import { getEntrepreneurOpportunities } from "@/lib/data/needs";
import { DEFAULT_LOCATION } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat") ? Number(searchParams.get("lat")) : DEFAULT_LOCATION.lat;
  const lng = searchParams.get("lng") ? Number(searchParams.get("lng")) : DEFAULT_LOCATION.lng;

  const opportunities = await getEntrepreneurOpportunities();
  return NextResponse.json(opportunities);
}

export async function POST(request: NextRequest) {
  const { need_id } = await request.json();
  return NextResponse.json({
    id: `claim-${Date.now()}`,
    need_id,
    entrepreneur_id: "user-2",
    stage: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { status: 201 });
}
