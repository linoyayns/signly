import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { ContractData } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ids = await kv.zrange("contracts:recent", 0, 29, { rev: true });

  const results = await Promise.all(
    ids.map(async (id) => {
      const clearingId = String(id);
      const data = await kv.get<ContractData>(`contract:${clearingId}`);
      return data ? { clearingId, data } : null;
    })
  );

  return NextResponse.json({ results: results.filter(Boolean) });
}
