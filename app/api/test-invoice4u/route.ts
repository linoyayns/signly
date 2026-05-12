import { NextResponse } from "next/server";

const API_BASE = "https://api.invoice4u.co.il/Services/ApiService.svc";

async function tryPost(label: string, body: unknown, headers: Record<string, string> = {}) {
  try {
    const res = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return { format: label, status: res.status, response: text.slice(0, 600) };
  } catch (e) {
    return { format: label, error: String(e) };
  }
}

export async function GET() {
  const apiKey = process.env.INVOICE4U_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing from env" }, { status: 500 });
  }

  // Debug: show key details
  const keyDebug = {
    length: apiKey.length,
    prefix: apiKey.slice(0, 8),
    suffix: apiKey.slice(-4),
    hasNewline: apiKey.includes("\n"),
    hasSpace: apiKey.includes(" "),
    trimmedLength: apiKey.trim().length,
  };

  const cleanKey = apiKey.trim();

  const attempts = await Promise.all([
    // 1. Standard: Invoice4UUserApiKey (current)
    tryPost("Invoice4UUserApiKey (current)", {
      Invoice4UUserApiKey: cleanKey,
      Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 2. UserApiKey
    tryPost("UserApiKey", {
      UserApiKey: cleanKey,
      Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 3. ApiKey
    tryPost("ApiKey", {
      ApiKey: cleanKey,
      Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 4. Minimal fields only (just key + sum + return url)
    tryPost("minimal: key+sum+returnUrl only", {
      Invoice4UUserApiKey: cleanKey,
      Sum: 1,
      ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 5. Type as string "1"
    tryPost("Type as string", {
      Invoice4UUserApiKey: cleanKey,
      Type: "1", Sum: "1", FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 6. No IsDocCreate at all
    tryPost("without IsDocCreate", {
      Invoice4UUserApiKey: cleanKey,
      Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 7. With CompanyId field (some APIs require it)
    tryPost("with CompanyId:0", {
      Invoice4UUserApiKey: cleanKey,
      CompanyId: 0,
      Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 8. XML body
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
          method: "POST",
          headers: { "Content-Type": "application/xml" },
          body: `<ApiClearingRequest xmlns="http://schemas.datacontract.org/2004/07/Invoice.Common"><Invoice4UUserApiKey>${cleanKey}</Invoice4UUserApiKey><Type>1</Type><Sum>1</Sum><FullName>Test</FullName><Email>test@test.com</Email><Currency>ILS</Currency><ReturnUrl>https://mysignly.com/payment-complete</ReturnUrl></ApiClearingRequest>`,
        });
        const text = await res.text();
        return { format: "XML body", status: res.status, response: text.slice(0, 600) };
      } catch (e) {
        return { format: "XML body", error: String(e) };
      }
    })(),
  ]);

  return NextResponse.json({ keyDebug, attempts });
}
