import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  try {
    const { projectDescription, projectExclusions } = await req.json();

    if (!projectDescription?.trim()) {
      return NextResponse.json({ description: "", exclusions: "" });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt = `אתה עורך דין ישראלי. הלקוח תיאר את הפרויקט שלו בשפה יומיומית. נסח מחדש בשפה משפטית מקצועית, קצרה וברורה — כמו שייכתב בסעיף "היקף השירות" בחוזה אמיתי. אל תמציא פרטים שלא נאמרו.

תיאור הפרויקט (כפי שהלקוח כתב): "${projectDescription.trim()}"
${projectExclusions?.trim() ? `מה לא כלול (כפי שהלקוח כתב): "${projectExclusions.trim()}"` : ""}

החזר תשובה בפורמט JSON בלבד, ללא טקסט נוסף, במבנה:
{"description": "ניסוח משפטי קצר של תיאור השירות (פסקה אחת, 2-3 משפטים)", "exclusions": "ניסוח משפטי קצר של מה אינו כלול (פסקה אחת, או מחרוזת ריקה אם לא צוין)"}`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const block = message.content[0];
    if (block.type !== "text") throw new Error("Unexpected response type");

    const match = block.text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in response");
    const parsed = JSON.parse(match[0]);

    return NextResponse.json({
      description: typeof parsed.description === "string" ? parsed.description : "",
      exclusions: typeof parsed.exclusions === "string" ? parsed.exclusions : "",
    });
  } catch (err) {
    console.error("preview-clauses error:", err);
    return NextResponse.json({ description: "", exclusions: "" });
  }
}
