import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { generateContract, ContractData } from "@/lib/claude";
import { sendContractEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { secret, clearingId, overrideEmail } = await req.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contractData = await kv.get<ContractData>(`contract:${clearingId}`);
  if (!contractData) return NextResponse.json({ error: "לא נמצא" }, { status: 404 });

  const contract = await generateContract(contractData);
  const toEmail = overrideEmail || contractData.deliveryEmail;

  await sendContractEmail({
    to: toEmail,
    contractText: contract,
    freelancerName: contractData.freelancerName,
    clientName: contractData.clientName,
    sessionId: clearingId,
  });

  return NextResponse.json({ ok: true, sentTo: toEmail });
}
