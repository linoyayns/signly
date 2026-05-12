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
    attempts.push({ format: "direct + application/json", status: r1.status, response: t1.slice(0, 400) });
  } catch (e) { attempts.push({ format: "direct + application/json", error: String(e) }); }

  // Attempt 2: wrapped { apiClearingRequest: {...} }, application/json
  try {
    const r2 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiClearingRequest: baseFields }),
    });
    const t2 = await r2.text();
    attempts.push({ format: "wrapped apiClearingRequest + application/json", status: r2.status, response: t2.slice(0, 400) });
  } catch (e) { attempts.push({ format: "wrapped + application/json", error: String(e) }); }

  // Attempt 3: direct body, application/json; charset=utf-8
  try {
    const r3 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(baseFields),
    });
    const t3 = await r3.text();
    attempts.push({ format: "direct + charset", status: r3.status, response: t3.slice(0, 400) });
  } catch (e) { attempts.push({ format: "direct + charset", error: String(e) }); }

  // Attempt 4: wrapped with charset
  try {
    const r4 = await fetch(`${API_BASE}/ProcessApiRequestV2`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ apiClearingRequest: baseFields }),
    });
    const t4 = await r4.text();
    attempts.push({ format: "wrapped + charset", status: r4.status, response: t4.slice(0, 400) });
  } catch (e) { attempts.push({ format: "wrapped + charset", error: String(e) }); }

  return NextResponse.json({
    apiKeyPresent: true,
    apiKeyPrefix: apiKey.slice(0, 4) + "...",
    attempts,
  });
}
