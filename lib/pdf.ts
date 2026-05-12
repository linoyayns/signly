function renderLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return "";
  if (/^\|[-| :]+\|$/.test(trimmed)) return ""; // table separator
  if (/^---+$/.test(trimmed)) return `<hr style="border:none;border-top:1px solid #ddd;margin:14pt 0;">`;

  if (trimmed.startsWith("# ")) {
    return `<h1>${bold(trimmed.replace(/^#+ /, ""))}</h1>`;
  }
  if (trimmed.startsWith("## ")) {
    return `<h2>${bold(trimmed.replace(/^##+ /, ""))}</h2>`;
  }
  if (trimmed.startsWith("### ")) {
    return `<h3>${bold(trimmed.replace(/^###+ /, ""))}</h3>`;
  }

  // Table row — detect signature vs regular
  if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
    const cells = trimmed.split("|").map(c => c.trim()).filter(Boolean);
    const isSignature = cells.some(c => c.includes("חתימת") || c.includes("חתימה") || c.includes("נותן השירות") || c.includes("הלקוח:"));
    if (isSignature) {
      const divs = cells.map(c => `<div class="sig-box">${bold(c)}</div>`).join("");
      return `<div class="sig-row">${divs}</div>`;
    }
    const tds = cells.map(c => `<td>${bold(c)}</td>`).join("");
    return `<tr>${tds}</tr>`;
  }

  return `<p>${bold(trimmed)}</p>`;
}

function bold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

export function downloadContractAsPdf(content: string, filename = "signly-contract") {
  const lines = content.split("\n");
  let html = "";
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const isTableRow = trimmed.startsWith("|") && trimmed.endsWith("|");
    const isTableSep = /^\|[-| :]+\|$/.test(trimmed);

    if (isTableRow && !isTableSep) {
      if (!inTable) { html += `<table>`; inTable = true; }
      html += renderLine(line);
    } else {
      if (inTable) { html += `</table>`; inTable = false; }
      if (!isTableSep) html += renderLine(line);
    }
  }
  if (inTable) html += `</table>`;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${filename}</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Heebo', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.9;
      color: #1a1a1a;
      direction: rtl;
      text-align: right;
      padding: 22mm 28mm;
      max-width: 210mm;
      margin: 0 auto;
    }
    h1 {
      font-size: 16pt;
      font-weight: 900;
      margin: 20pt 0 10pt;
      border-bottom: 2px solid #1a1a1a;
      padding-bottom: 5pt;
      color: #0F172A;
    }
    h2 {
      font-size: 13pt;
      font-weight: 700;
      margin: 16pt 0 6pt;
      color: #0F172A;
      border-bottom: 1px solid #ddd;
      padding-bottom: 3pt;
    }
    h3 {
      font-size: 11.5pt;
      font-weight: 700;
      margin: 12pt 0 4pt;
      color: #1e293b;
    }
    p { margin-bottom: 5pt; }
    strong { font-weight: 700; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      font-size: 10.5pt;
    }
    td {
      border: 1px solid #ddd;
      padding: 6pt 8pt;
      text-align: right;
    }
    tr:first-child td { font-weight: 700; background: #f8fafc; }
    hr { border: none; border-top: 1px solid #ddd; margin: 14pt 0; }
    .sig-row { display: flex; gap: 16pt; margin: 14pt 0; }
    .sig-box { flex: 1; border: 1px solid #ccc; border-radius: 6pt; padding: 12pt 14pt; background: #f8fafc; font-size: 10.5pt; line-height: 2; }
    @page { margin: 20mm 25mm; size: A4; }
  </style>
</head>
<body>
  ${html}
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 700);
    };
  </script>
</body>
</html>`);

  printWindow.document.close();
}
