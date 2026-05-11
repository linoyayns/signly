"use client";

interface ContractDisplayProps {
  content: string;
}

function renderInline(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function ContractDisplay({ content }: ContractDisplayProps) {
  const lines = content.split("\n");

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines — add spacing
    if (!trimmed) { i++; continue; }

    // Skip markdown table separators
    if (/^\|[-| :]+\|$/.test(trimmed)) { i++; continue; }

    // Skip raw --- dividers
    if (/^---+$/.test(trimmed)) {
      elements.push(<hr key={i} style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "16px 0" }} />);
      i++; continue;
    }

    // H1
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={i} style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "28px 0 10px", borderBottom: "2px solid #0F172A", paddingBottom: 6 }}>
          {trimmed.replace(/^#+ /, "")}
        </h1>
      );
      i++; continue;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "22px 0 8px", borderBottom: "1px solid #E2E8F0", paddingBottom: 4 }}>
          {trimmed.replace(/^##+ /, "")}
        </h2>
      );
      i++; continue;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "16px 0 4px" }}>
          {trimmed.replace(/^###+ /, "")}
        </h3>
      );
      i++; continue;
    }

    // Markdown table row — render as plain text (skip pipes)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed.split("|").map(c => c.trim()).filter(Boolean);
      elements.push(
        <div key={i} style={{ display: "flex", gap: 16, fontSize: 13, padding: "4px 0", borderBottom: "1px solid #F1F5F9" }}>
          {cells.map((cell, ci) => (
            <span key={ci} style={{ flex: 1 }}>{renderInline(cell)}</span>
          ))}
        </div>
      );
      i++; continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{ fontSize: 13, lineHeight: 1.9, marginBottom: 6, color: "#1e293b" }}>
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return (
    <div
      dir="rtl"
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        borderRadius: 10,
        padding: "36px 40px",
        fontFamily: "'Heebo', Arial, sans-serif",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      {elements}
    </div>
  );
}
