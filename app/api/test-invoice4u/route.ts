import { NextResponse } from "next/server";

const API_BASE = "https://api.invoice4u.co.il/Services/ApiService.svc";

async function tryPost(label: string, url: string, body: unknown, contentType = "application/json") {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return { format: label, status: res.status, response: text.slice(0, 800) };
  } catch (e) {
    return { format: label, error: String(e) };
  }
}

export async function GET() {
  const apiKey = process.env.INVOICE4U_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key missing" }, { status: 500 });

  const cleanKey = apiKey.trim();

  const keyDebug = {
    length: cleanKey.length,
    prefix: cleanKey.slice(0, 8),
    suffix: cleanKey.slice(-4),
    hasNewline: apiKey.includes("\n"),
    hasSpace: apiKey.includes(" "),
  };

  const attempts = await Promise.all([
    // 1. Verify the API key works at all — IsUserValid endpoint
    tryPost("IsUserValid", `${API_BASE}/IsUserValid`, {
      Invoice4UUserApiKey: cleanKey,
    }),

    // 2. GetUserDetails
    tryPost("GetUserDetails", `${API_BASE}/GetUserDetails`, {
      Invoice4UUserApiKey: cleanKey,
    }),

    // 3. Login endpoint
    tryPost("Login", `${API_BASE}/Login`, {
      Invoice4UUserApiKey: cleanKey,
    }),

    // 4. Clearing — wrapped with "request" parameter name
    tryPost('wrapped "request"', `${API_BASE}/ProcessApiRequestV2`, {
      request: {
        Invoice4UUserApiKey: cleanKey,
        Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
        Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
      },
    }),

    // 5. Clearing — wrapped with "clearingRequest" parameter name
    tryPost('wrapped "clearingRequest"', `${API_BASE}/ProcessApiRequestV2`, {
      clearingRequest: {
        Invoice4UUserApiKey: cleanKey,
        Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
        Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
      },
    }),

    // 6. Try Type: 0
    tryPost("Type: 0 (direct)", `${API_BASE}/ProcessApiRequestV2`, {
      Invoice4UUserApiKey: cleanKey,
      Type: 0, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 7. Try Type: 2
    tryPost("Type: 2 (direct)", `${API_BASE}/ProcessApiRequestV2`, {
      Invoice4UUserApiKey: cleanKey,
      Type: 2, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),

    // 8. ProcessApiRequest V1 (without V2)
    tryPost("ProcessApiRequest V1", `${API_BASE}/ProcessApiRequest`, {
      Invoice4UUserApiKey: cleanKey,
      Type: 1, Sum: 1, FullName: "Test", Email: "test@test.com",
      Currency: "ILS", ReturnUrl: "https://mysignly.com/payment-complete",
    }),
  ]);

  return NextResponse.json({ keyDebug, attempts });
}
