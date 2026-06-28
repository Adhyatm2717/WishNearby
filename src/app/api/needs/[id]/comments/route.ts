import { NextRequest, NextResponse } from "next/server";
import { getComments } from "@/lib/data/needs";
import { enrichComment, getMockUser, CURRENT_USER_ID } from "@/lib/data/mock-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const comments = await getComments(id);
  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content } = await request.json();
  const user = getMockUser(CURRENT_USER_ID);

  const comment = enrichComment({
    id: `comment-${Date.now()}`,
    need_id: id,
    user_id: CURRENT_USER_ID,
    content,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json(comment, { status: 201 });
}
