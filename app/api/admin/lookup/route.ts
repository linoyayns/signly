import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest) {
  const { secret, email, clearingId } = await req.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (clearingId) {
    const data = await kv.get(`contract:${clearingId}`);
    if (!data) return NextResponse.json({ error: "לא נמצא" }, { status: 404 });
    return NextResponse.json({ clearingId, data });
  }

  if (email) {
    const keys = await kv.keys(`email:${email}:*`);
    if (!keys.length) return NextResponse.json({ error: "לא נמצא מייל זה" }, { status: 404 });
    const results = await Promise.all(
      keys.map(async (k) => {
        const id = (k as string).split(":").pop();
        const data = await kv.get(`contract:${id}`);
        return { clearingId: id, data };
      })
    );
    return NextResponse.json({ results });
  }

  return NextResponse.json({ error: "יש לספק email או clearingId" }, { status: 400 });
}
