import Anthropic from "@anthropic-ai/sdk";

export interface ContractData {
  name: string;
  client: string;
  service: string;
  amount: string;
  paymentTerms: string;
  timeline: string;
  revisions: string;
  cancellation: string;
  ipOwnership: string;
  specialClauses: string;
}

export async function generateContract(data: ContractData): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = `אתה עורך דין ישראלי מנוסה. נסח חוזה התקשרות מקצועי בעברית לפרילנסר.

פרטי הפרויקט:
- שם הפרילנסר: ${data.name}
- שם הלקוח: ${data.client}
- תיאור השירות: ${data.service}
- סכום כולל: ${data.amount}
- תנאי תשלום: ${data.paymentTerms}
- לוח זמנים: ${data.timeline}
- סבבי תיקון: ${data.revisions}
- ביטול: ${data.cancellation}
- זכויות יוצרים: ${data.ipOwnership}
- סעיפים מיוחדים: ${data.specialClauses}

הנחיות:
- שפה משפטית מקצועית אך ברורה
- מבנה: הקדמה, תיאור השירות, תשלום, לוח זמנים, קניין רוחני, ביטול, כללי
- כלול סעיף הגבלת אחריות
- כלול שורת חתימה לשני הצדדים
- מבוסס על חוק החוזים הישראלי`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}
