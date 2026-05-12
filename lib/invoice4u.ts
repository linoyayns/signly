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
  const body = {
    Invoice4UUserApiKey: process.env.INVOICE4U_API_KEY,
    Type: 1, // Regular charge
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

  console.log("[Invoice4U] Request:", JSON.stringify({ ...body, Invoice4UUserApiKey: "***" }));

  const res = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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
