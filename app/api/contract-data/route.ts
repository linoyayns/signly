import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { ContractData } from "@/lib/claude";

export async function GET(req: NextRequest) {
  const clearingId = req.nextUrl.searchParams.get("clearing_id");
  if (!clearingId) {
    return NextResponse.json({ error: "חסר מזהה תשלום" }, { status: 400 });
  }

  const data = await kv.get<ContractData>(`contract:${clearingId}`);
  if (!data) {
    return NextResponse.json({ error: "לא נמצא" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const { clearingId, contractData }: { clearingId?: string; contractData?: ContractData } = await req.json();
  if (!clearingId || !contractData) {
    return NextResponse.json({ error: "חסרים נתונים" }, { status: 400 });
  }

  await kv.set(`contract:${clearingId}`, contractData);
  if (contractData.deliveryEmail) {
    await kv.set(`email:${contractData.deliveryEmail}:${clearingId}`, 1);
  }

  return NextResponse.json({ ok: true });
}
