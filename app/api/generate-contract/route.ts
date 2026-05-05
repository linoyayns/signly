import { NextRequest, NextResponse } from "next/server";
import { generateContract, ContractData } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const data: ContractData = await req.json();

    if (!data.name || !data.client || !data.service) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    const contract = await generateContract(data);
    return NextResponse.json({ contract });
  } catch (err) {
    console.error("generate-contract error:", err);
    return NextResponse.json({ error: "שגיאה ביצירת החוזה" }, { status: 500 });
  }
}
