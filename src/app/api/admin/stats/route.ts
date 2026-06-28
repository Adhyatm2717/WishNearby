import { NextResponse } from "next/server";
import { getPlatformStats } from "@/lib/data/needs";
import { MOCK_USERS } from "@/lib/data/mock-data";

export async function GET() {
  const stats = await getPlatformStats();
  return NextResponse.json({
    users: MOCK_USERS.length * 1250,
    needs: stats.needsPosted,
    reports: 3,
    verified: stats.businessesStarted,
  });
}
