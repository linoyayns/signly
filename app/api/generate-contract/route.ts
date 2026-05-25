import { NextRequest, NextResponse } from "next/server";
import { generateContract, ContractData } from "@/lib/claude";
import { kv } from "@vercel/kv";

const TTL_30_DAYS = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
  try {
    const { clearingId, ...data }: ContractData & { clearingId?: string } = await req.json();

    if (!data.freelancerName || !data.clientName || !data.projectDescription) {
      return NextResponse.json({ error: "חסרים שדות חובה: שם פרילנסר, שם לקוח, תיאור פרויקט" }, { status: 400 });
    }

    const contract = await generateContract(data);

    // Save after confirmed payment — auto-deletes after 30 days
    if (clearingId) {
      try {
        await kv.set(`contract:${clearingId}`, data, { ex: TTL_30_DAYS });
        if (data.deliveryEmail) {
          await kv.set(`email:${data.deliveryEmail}:${clearingId}`, clearingId, { ex: TTL_30_DAYS });
        }
      } catch (kvErr) {
        console.error("KV save failed (non-fatal):", kvErr);
      }
    }

    return NextResponse.json({ contract });
  } catch (err) {
    console.error("generate-contract error:", err);
    return NextResponse.json({ error: "שגיאה ביצירת החוזה" }, { status: 500 });
  }
}
