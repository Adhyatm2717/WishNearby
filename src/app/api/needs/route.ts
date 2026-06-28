import { NextRequest, NextResponse } from "next/server";
import { getNeeds } from "@/lib/data/needs";
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
  const body = await request.json();
  const need = {
    id: `need-${Date.now()}`,
    ...body,
    support_count: 1,
    comment_count: 0,
    growth_rate: 5,
    author_id: "user-1",
    status: "active" as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return NextResponse.json(need, { status: 201 });
}
