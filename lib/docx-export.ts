import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  UnderlineType,
} from "docx";

function parseInline(text: string, baseSize = 22): TextRun[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    new TextRun({
      text: part,
      bold: i % 2 === 1,
      font: "Arial",
      size: baseSize,
      rightToLeft: true,
    })
  );
}

async function buildDocxBlob(content: string): Promise<Blob> {
  const lines = content.split("\n");
  const children: Paragraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      children.push(new Paragraph({ text: "" }));
      continue;
    }

    if (/^\|[-| :]+\|$/.test(trimmed)) continue; // table separator

    if (/^---+$/.test(trimmed)) {
      children.push(
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } },
          text: "",
        })
      );
      continue;
    }

    if (trimmed.startsWith("# ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/^# /, "").replace(/\*\*/g, ""),
              bold: true,
              size: 32,
              font: "Arial",
              rightToLeft: true,
              underline: { type: UnderlineType.SINGLE },
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          spacing: { before: 240, after: 120 },
        })
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/^## /, "").replace(/\*\*/g, ""),
              bold: true,
              size: 26,
              font: "Arial",
              rightToLeft: true,
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          spacing: { before: 200, after: 80 },
        })
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/^### /, "").replace(/\*\*/g, ""),
              bold: true,
              size: 24,
              font: "Arial",
              rightToLeft: true,
            }),
          ],
          heading: HeadingLevel.HEADING_3,
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          spacing: { before: 160, after: 60 },
        })
      );
      continue;
    }

    // Table row — render as plain paragraph
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed.split("|").map(c => c.trim()).filter(Boolean);
      const text = cells.join("    |    ");
      children.push(
        new Paragraph({
          children: parseInline(text, 20),
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          spacing: { before: 60, after: 60 },
        })
      );
      continue;
    }

    children.push(
      new Paragraph({
        children: parseInline(trimmed),
        bidirectional: true,
        alignment: AlignmentType.RIGHT,
        spacing: { before: 40, after: 40 },
      })
    );
  }

  const rtlPara = { bidirectional: true, alignment: AlignmentType.RIGHT };
  const rtlRun  = { rightToLeft: true as const, font: "Arial" };

  const doc = new Document({
    styles: {
      default: {
        document:  { paragraph: rtlPara, run: { ...rtlRun, size: 22 } },
        heading1:  { paragraph: rtlPara, run: { ...rtlRun, size: 32 } },
        heading2:  { paragraph: rtlPara, run: { ...rtlRun, size: 26 } },
        heading3:  { paragraph: rtlPara, run: { ...rtlRun, size: 24 } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export async function downloadContractAsDocx(content: string, filename = "signly-contract") {
  const blob = await buildDocxBlob(content);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function shareContractViaWhatsApp(content: string) {
  const text = "שלום, הכנתי עבורנו חוזה עבודה. אשלח לך אותו עכשיו לעיון ולחתימה.";
  try {
    const blob = await buildDocxBlob(content);
    const file = new File([blob], "חוזה-עבודה.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "חוזה עבודה", text });
      return;
    }
  } catch {
    // fall through
  }
  // Desktop fallback — open WhatsApp with text only
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}
