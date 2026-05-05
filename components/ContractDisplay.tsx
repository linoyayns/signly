"use client";

interface ContractDisplayProps {
  content: string;
}

export default function ContractDisplay({ content }: ContractDisplayProps) {
  const paragraphs = content.split("\n").filter((line) => line.trim() !== "");

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-200 rounded p-8 text-sm leading-8 text-gray-800 max-w-3xl mx-auto"
      style={{ fontFamily: "var(--font-heebo), sans-serif" }}
    >
      {paragraphs.map((para, i) => {
        const isBold = para.startsWith("**") && para.endsWith("**");
        const isHeading = para.startsWith("#");
        const clean = para.replace(/^#+\s*/, "").replace(/\*\*/g, "");

        if (isHeading || isBold) {
          return (
            <p key={i} className="font-bold mt-5 mb-1" style={{ color: "#0F1F3D" }}>
              {clean}
            </p>
          );
        }

        return (
          <p key={i} className="mb-2">
            {clean}
          </p>
        );
      })}
    </div>
  );
}
