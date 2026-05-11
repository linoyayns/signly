import Anthropic from "@anthropic-ai/sdk";

export interface ContractData {
  profession: string | null;
  freelancerName: string;
  freelancerId: string;
  freelancerCity: string;
  clientName: string;
  clientId: string;
  clientEmail: string;
  projectDescription: string;
  projectExclusions: string;
  totalPrice: string;
  depositPercent: string;
  vat: "plus_vat" | "incl_vat" | "exempt" | null;
  paymentTiming: string;
  paymentMethod: string;
  latePayment: string;
  startDate: string;
  deliveryDate: string;
  delayConditions: string;
  freelancerDelay: string;
  revisionsIncluded: string;
  revisionCost: string;
  revisionDefinition: string;
  clientCancellation: string;
  freelancerCancellation: string;
  ownership: "full" | "license" | "afterpayment" | null;
  protectionAnswer: string;
  specialRequests: string;
  deliveryEmail: string;
}

function vatLabel(vat: ContractData["vat"]): string {
  if (vat === "plus_vat") return "בתוספת מע\"מ (18%)";
  if (vat === "incl_vat") return "כולל מע\"מ";
  if (vat === "exempt") return "ללא מע\"מ — עוסק פטור";
  return "לא צוין";
}

function ownershipLabel(o: ContractData["ownership"]): string {
  if (o === "full") return "העברת בעלות מלאה לאחר תשלום מלא";
  if (o === "license") return "רישיון שימוש עסקי בלבד — הבעלות נשארת אצל הפרילנסר";
  if (o === "afterpayment") return "הבעלות עוברת ללקוח רק לאחר קבלת התשלום המלא";
  return "לא צוין";
}

export async function generateContract(data: ContractData): Promise<string> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const deposit = data.depositPercent
    ? `${data.depositPercent}% מקדמה (${Math.round((Number(data.totalPrice) * Number(data.depositPercent)) / 100)} ₪) בעת חתימת החוזה`
    : "לא סוכמה מקדמה";

  const specialSection = data.specialRequests?.trim()
    ? `\n\nסעיפים מיוחדים שהתבקשו:\n${data.specialRequests}`
    : "";

  const prompt = `אתה עורך דין ישראלי מנוסה המתמחה בחוזי פרילנס.
נסח חוזה התקשרות מקצועי, תקין משפטית, בעברית תקינה ומאורגנת.

=== פרטי הצדדים ===
פרילנסר: ${data.freelancerName} | ת.ז. / ח.פ.: ${data.freelancerId} | עיר שיפוט: ${data.freelancerCity}
לקוח: ${data.clientName} | ת.ז. / ח.פ.: ${data.clientId} | מייל: ${data.clientEmail}

=== תיאור הפרויקט ===
מה כלול: ${data.projectDescription}
מה לא כלול: ${data.projectExclusions}

=== תשלום ===
מחיר כולל: ${data.totalPrice} ₪ (${vatLabel(data.vat)})
מקדמה: ${deposit}
יתרה: ${data.paymentTiming}
אמצעי תשלום: ${data.paymentMethod || "העברה בנקאית"}
איחור בתשלום: ${data.latePayment}

=== לוח זמנים ===
תחילת עבודה: ${data.startDate}
מסירה: ${data.deliveryDate}
עיכוב מצד הלקוח: ${data.delayConditions}
עיכוב מצד הפרילנסר: ${data.freelancerDelay}

=== תיקונים ===
תיקונים כלולים: ${data.revisionsIncluded}
עלות תיקון נוסף: ${data.revisionCost ? `${data.revisionCost} ₪` : "לא צוין"}
הגדרת תיקון: ${data.revisionDefinition}

=== ביטול ===
ביטול מצד הלקוח: ${data.clientCancellation}
ביטול מצד הפרילנסר: ${data.freelancerCancellation}

=== קניין רוחני ===
${ownershipLabel(data.ownership)}

=== סעיף הגנה מקצועי ===
${data.protectionAnswer}
${specialSection}

=== הנחיות לניסוח ===
1. כתוב חוזה מלא ומובנה עם הסעיפים הבאים לפי הסדר:
   א. הצדדים
   ב. תיאור השירות והיקפו
   ג. תמורה ותנאי תשלום
   ד. לוח זמנים ועיכובים
   ה. תיקונים ושינויים
   ו. ביטול החוזה
   ז. קניין רוחני
   ח. סעיפי הגנה מיוחדים
   ט. הגבלת אחריות
   י. שיפוט וסמכות
   יא. חתימות

2. שפה: משפטית אך ברורה וקריאה. משפטים קצרים.
3. הכנס את כל הפרטים שסופקו — אל תמציא פרטים שלא צוינו.
4. הסעיף "שיפוט" — בתי המשפט המוסמכים יהיו בעיר ${data.freelancerCity}.
5. כלול שורת חתימה עם תאריך לשני הצדדים.
6. אם מצוין שהפרילנסר עוסק פטור — ציין זאת בסעיף התשלום והדגש שלא תצורף חשבונית מע"מ.`;

  const message = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}
