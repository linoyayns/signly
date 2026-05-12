import { NextResponse } from "next/server";

const API_BASE = "https://api.invoice4u.co.il/Services/ApiService.svc";

export async function GET() {
  const apiKey = process.env.INVOICE4U_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing from env" }, { status: 500 });
  }

  const baseFields = {
    Invoice4UUserApiKey: apiKey,
    Type: 1,
    Sum: 1,
    FullName: "Test User",
    Email: "test@test.com",
    Currency: "ILS",
    ReturnUrl: "https://mysignly.com/payment-complete",
    IsDocCreate: false,
  };

  const attempts: Record<string, unknown>[] = [];

  // Attempt 1: direct body, application/json
  try {
    const r1 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(baseFields),
    });
    const t1 = await r1.text();
    attempts.push({ format: "direct + application/json", status: r1.status, response: t1.slice(0, 500) });
  } catch (e) { attempts.push({ format: "direct + application/json", error: String(e) }); }

  // Attempt 2: with __type hint, direct body
  try {
    const r2 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "__type": "ApiClearingRequest:#Invoice.Common", ...baseFields }),
    });
    const t2 = await r2.text();
    attempts.push({ format: "with __type hint", status: r2.status, response: t2.slice(0, 500) });
  } catch (e) { attempts.push({ format: "with __type hint", error: String(e) }); }

  // Attempt 3: wrapped in {"d": {...}}
  try {
    const r3 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ d: baseFields }),
    });
    const t3 = await r3.text();
    attempts.push({ format: "wrapped in d", status: r3.status, response: t3.slice(0, 500) });
  } catch (e) { attempts.push({ format: "wrapped in d", error: String(e) }); }

  // Attempt 4: wrapped in {"d": {...}} with __type
  try {
    const r4 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ d: { "__type": "ApiClearingRequest:#Invoice.Common", ...baseFields } }),
    });
    const t4 = await r4.text();
    attempts.push({ format: "wrapped in d + __type", status: r4.status, response: t4.slice(0, 500) });
  } catch (e) { attempts.push({ format: "wrapped in d + __type", error: String(e) }); }

  // Attempt 5: GET with query params instead of POST body
  try {
    const qs = new URLSearchParams({
      Invoice4UUserApiKey: apiKey,
      Type: "1",
      Sum: "1",
      FullName: "Test User",
      Email: "test@test.com",
      Currency: "ILS",
      ReturnUrl: "https://mysignly.com/payment-complete",
      IsDocCreate: "false",
    });
    const r5 = await fetch(`${API_BASE}/ProcessApiRequestV2?${qs.toString()}`, {
      method: "GET",
    });
    const t5 = await r5.text();
    attempts.push({ format: "GET with query params", status: r5.status, response: t5.slice(0, 500) });
  } catch (e) { attempts.push({ format: "GET with query params", error: String(e) }); }

  // Attempt 6: apiClearingRequest wrapped with __type
  try {
    const r6 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiClearingRequest: { "__type": "ApiClearingRequest:#Invoice.Common", ...baseFields }
      }),
    });
    const t6 = await r6.text();
    attempts.push({ format: "apiClearingRequest + __type", status: r6.status, response: t6.slice(0, 500) });
  } catch (e) { attempts.push({ format: "apiClearingRequest + __type", error: String(e) }); }

  // Attempt 7: Try alternate endpoint name
  try {
    const r7 = await fetch(`${API_BASE}/CreateClearingRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(baseFields),
    });
    const t7 = await r7.text();
    attempts.push({ format: "alternate endpoint: CreateClearingRequest", status: r7.status, response: t7.slice(0, 500) });
  } catch (e) { attempts.push({ format: "alternate endpoint: CreateClearingRequest", error: String(e) }); }

  // Attempt 8: Try with lowercase field names
  try {
    const r8 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoice4UUserApiKey: apiKey,
        type: 1,
        sum: 1,
        fullName: "Test User",
        email: "test@test.com",
        currency: "ILS",
        returnUrl: "https://mysignly.com/payment-complete",
        isDocCreate: false,
      }),
    });
    const t8 = await r8.text();
    attempts.push({ format: "camelCase field names", status: r8.status, response: t8.slice(0, 500) });
  } catch (e) { attempts.push({ format: "camelCase field names", error: String(e) }); }

  return NextResponse.json({
    apiKeyPresent: true,
    apiKeyPrefix: apiKey.slice(0, 6) + "...",
    attempts,
  });
}
