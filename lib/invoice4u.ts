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
    DocItemName: "חוזה פרילנסר — Signly",
    DocItemQuantity: 1,
    DocItemPrice: sum,
    DocItemTaxRate: 18,
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
    return JSON.parse(text);
  } catch {
    return { Errors: [`שגיאת שרת Invoice4U: ${text.slice(0, 200)}`] };
  }
}

export async function getClearingStatus(clearingLogId: string) {
  const res = await fetch(`${API_BASE}/GetClearingLogById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Invoice4UUserApiKey: process.env.INVOICE4U_API_KEY,
      ClearingLogId: clearingLogId,
    }),
  });
  return res.json();
}
