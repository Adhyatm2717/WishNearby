import { NextRequest, NextResponse } from "next/server";
import { getNeeds, createNeed } from "@/lib/data/needs";
import type { CategorySlug } from "@/lib/constants";
import type { SortOption } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filters = {
    category: searchParams.get("category") as CategorySlug | undefined,
    sort: (searchParams.get("sort") as SortOption) || "trending",
    query: searchParams.get("q") || undefined,
    lat: searchParams.get("lat") ? Number(searchParams.get("lat")) : undefined,
    lng: searchParams.get("lng") ? Number(searchParams.get("lng")) : undefined,
    radiusKm: searchParams.get("radius") ? Number(searchParams.get("radius")) : undefined,
  };

  const needs = await getNeeds(filters);
  return NextResponse.json(needs);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const need = await createNeed(body);
    return NextResponse.json(need, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create need" }, { status: 500 });
  }
}
