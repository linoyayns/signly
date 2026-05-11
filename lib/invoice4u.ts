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
  const res = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Invoice4UUserApiKey: process.env.INVOICE4U_API_KEY,
      Type: 1, // Regular charge
      Sum: sum,
      FullName: fullName,
      Email: email,
      Phone: "050-0000000",
      CreditCardCompanyType: 15, // Cardcom
      Currency: "ILS",
      ReturnUrl: returnUrl,
      IsDocCreate: true,
      DocItemName: "חוזה פרילנסר — Signly",
      DocItemQuantity: "1",
      DocItemPrice: String(sum),
      DocItemTaxRate: "17",
      DocLanguage: "he",
    }),
  });
  return res.json();
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
