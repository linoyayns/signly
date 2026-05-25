const API_BASE = "https://api.invoice4u.co.il/Services/ApiService.svc";

export async function createClearingRequest({
  sum,
  fullName,
  email,
  returnUrl,
}: {
  sum: number;
  fullName: string;
  email: string;
  returnUrl: string;
}) {
  const apiKey = process.env.INVOICE4U_API_KEY;
  if (!apiKey) {
    console.error("[Invoice4U] INVOICE4U_API_KEY is not set!");
    return { Errors: ["שגיאת הגדרות שרת: מפתח API חסר — פנה לתמיכה"] };
  }

  const clearingRequest = {
    Invoice4UUserApiKey: apiKey,
    Type: 1,
    Sum: sum,
    FullName: fullName,
    Email: email,
    Currency: "ILS",
    ReturnUrl: returnUrl,
    IsDocCreate: true,
    DocType: 4,           // 4 = קבלה (receipt) — מתאים לעוסק פטור
    DocEmail: email,      // שלח קבלה למייל הלקוח
    DocItemName: "חוזה פרילנסר — Signly",
    DocItemQuantity: 1,
    DocItemPrice: sum,
    DocItemTaxRate: 0,    // עוסק פטור — ללא מע"מ
    DocLanguage: "he",
  };

  console.log("[Invoice4U] API key present:", !!apiKey, "| Request:", JSON.stringify({ ...clearingRequest, Invoice4UUserApiKey: "***" }));

  const res = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ request: clearingRequest }),
  });

  const text = await res.text();
  console.log("[Invoice4U] Raw response:", text);

  try {
    const parsed = JSON.parse(text);
    // Invoice4U WCF API wraps response in {"d": {...}}
    const inner = parsed?.d ?? parsed;

    // Extract I4UClearingLogId from OpenInfo array
    const openInfo: { Key: string; Value: string }[] = inner?.OpenInfo ?? [];
    const logId = openInfo.find((o) => o.Key === "I4UClearingLogId")?.Value ?? null;

    return {
      ...inner,
      I4UClearingLogId: logId,
      Errors: inner?.Errors ?? null,
    };
  } catch {
    return { Errors: [`שגיאת שרת Invoice4U: ${text.slice(0, 200)}`] };
  }
}

export async function getClearingStatus(clearingLogId: string) {
  const res = await fetch(`${API_BASE}/GetClearingLogById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      request: {
        Invoice4UUserApiKey: process.env.INVOICE4U_API_KEY?.trim(),
        ClearingLogId: clearingLogId,
      }
    }),
  });
  const text = await res.text();
  console.log("[Invoice4U] getClearingStatus raw response:", text);
  try {
    const parsed = JSON.parse(text);
    const inner = parsed?.d ?? parsed;
    console.log("[Invoice4U] getClearingStatus parsed:", JSON.stringify(inner));
    return inner;
  } catch {
    console.error("[Invoice4U] getClearingStatus parse error, raw:", text);
    return { IsSuccess: false };
  }
}
