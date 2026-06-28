import { NextRequest, NextResponse } from "next/server";
import { getEntrepreneurOpportunities, getPlatformStats } from "@/lib/data/needs";
import { MOCK_USERS } from "@/lib/data/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname.endsWith("/stats")) {
    const stats = await getPlatformStats();
    return NextResponse.json({
      users: MOCK_USERS.length * 1250,
      needs: stats.needsPosted,
      reports: 3,
      verified: stats.businessesStarted,
    });
  }

  const opportunities = await getEntrepreneurOpportunities();
  return NextResponse.json(opportunities);
}
