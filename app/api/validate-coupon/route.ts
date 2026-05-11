import { NextRequest, NextResponse } from "next/server";

const BASE_PRICE = 97;

function getCoupons(): Record<string, number> {
  // COUPON_CODES env var as JSON string: {"CODE": discountPercent}
  // Example: {"SIGNLYTEST":100,"WELCOME20":20,"FRIEND10":10}
  try {
    const raw = process.env.COUPON_CODES;
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code?.trim()) return NextResponse.json({ valid: false });

    const coupons = getCoupons();
    const upperCode = (code as string).toUpperCase().trim();

    if (!(upperCode in coupons)) {
      return NextResponse.json({ valid: false, message: "קוד קופון לא קיים" });
    }

    const discountPercent = coupons[upperCode];
    const finalPrice = Math.round(BASE_PRICE * (1 - discountPercent / 100));

    return NextResponse.json({
      valid: true,
      discountPercent,
      finalPrice,
      message: discountPercent === 100 ? "✓ גישה חינמית" : `✓ הנחה של ${discountPercent}% — ${finalPrice} ₪`,
    });
  } catch {
    return NextResponse.json({ valid: false, message: "שגיאה בבדיקת הקופון" });
  }
}
