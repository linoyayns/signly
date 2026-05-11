import { NextRequest, NextResponse } from "next/server";
import { sendContractEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { contractText, email, freelancerName, clientName, sessionId } =
      await req.json();

    if (!contractText || !email) {
      return NextResponse.json({ error: "חסרים פרטים" }, { status: 400 });
    }

    await sendContractEmail({
      to: email,
      contractText,
      freelancerName: freelancerName || "פרילנסר",
      clientName: clientName || "לקוח",
      sessionId,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-contract error:", err);
    return NextResponse.json({ error: "שגיאה בשליחת המייל" }, { status: 500 });
  }
}
