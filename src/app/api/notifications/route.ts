import { NextResponse } from "next/server";
import { getNotifications } from "@/lib/data/needs";

export async function GET() {
  const notifications = await getNotifications();
  return NextResponse.json(notifications);
}
