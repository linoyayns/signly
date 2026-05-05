export function downloadContractAsPdf(content: string, filename = "signly-contract") {
  const htmlContent = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2>${line.replace("## ", "")}</h2>`;
      if (line.startsWith("# ")) return `<h1>${line.replace("# ", "")}</h1>`;
      if (line.match(/^\*\*.*\*\*$/)) return `<h3>${line.replace(/\*\*/g, "")}</h3>`;
      if (!line.trim()) return "<br>";
      return `<p>${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
    })
    .join("\n");

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>${filename}</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Heebo', Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.8;
          color: #1a1a1a;
          direction: rtl;
          text-align: right;
          padding: 20mm 25mm;
          max-width: 210mm;
          margin: 0 auto;
        }
        h1 {
          font-size: 15pt;
          font-weight: 700;
          margin: 16pt 0 8pt;
          border-bottom: 2px solid #1a1a1a;
          padding-bottom: 4pt;
        }
        h2 { font-size: 13pt; font-weight: 700; margin: 14pt 0 6pt; }
        h3 { font-size: 12pt; font-weight: 600; margin: 10pt 0 4pt; }
        p { margin-bottom: 5pt; }
        strong { font-weight: 700; }
        @page { margin: 20mm 25mm; size: A4; }
      </style>
    </head>
    <body>
      ${htmlContent}
      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 600);
        };
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
}
