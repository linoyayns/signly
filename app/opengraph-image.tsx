import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Signly — חוזים מקצועיים לפרילנסרים";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F172A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: "#533afd",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              fontWeight: 900,
              color: "white",
            }}
          >
            S
          </div>
          <span style={{ fontSize: 80, fontWeight: 900, color: "white", letterSpacing: -3 }}>
            Signly<span style={{ color: "#533afd" }}>.</span>
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
