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
  signingDate?: string;
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

// Map city → actual court jurisdiction in Israel
function getCourtCity(city: string): string {
  const c = city.trim();
  const telAvivDistrict = ["רמת גן", "גבעתיים", "בני ברק", "חולון", "בת ים", "אור יהודה", "קרית אונו", "גבעת שמואל", "יהוד-מונוסון", "יהוד", "רמת השרון", "גני תקווה", "אזור", "גבעת שמואל"];
  if (telAvivDistrict.some(n => c.includes(n))) return "תל אביב-יפו";

  const centralDistrict = ["ראש העין", "רעננה", "כפר יונה", "מודיעין", "נס ציונה", "גן יבנה", "מזכרת בתיה", "גדרה", "יבנה"];
  if (centralDistrict.some(n => c.includes(n))) return "פתח תקווה";

  const haifaDistrict = ["קרית ים", "קרית ביאליק", "קרית מוצקין", "קרית אתא", "נשר", "טירת כרמל", "יוקנעם", "עתלית"];
  if (haifaDistrict.some(n => c.includes(n))) return "חיפה";

  return c; // cities with their own courts (תל אביב, ירושלים, חיפה, באר שבע, etc.)
}

function ownershipLabel(o: ContractData["ownership"]): string {
  if (o === "full") return "העברת בעלות מלאה לאחר תשלום מלא";
  if (o === "license") return "רישיון שימוש עסקי בלבד — הבעלות נשארת אצל הפרילנסר";
  if (o === "afterpayment") return "הבעלות עוברת ללקוח רק לאחר קבלת התשלום המלא";
  return "לא צוין";
}

// Strip trailing periods/spaces from user-supplied text so Claude doesn't double up
function t(s: string | null | undefined): string {
  return (s ?? "").trim().replace(/\.+$/, "");
}

export async function generateContract(data: ContractData): Promise<string> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const depositNum = Number(data.depositPercent);
  const deposit = data.depositPercent && depositNum > 0
    ? `${data.depositPercent}% מקדמה (${Math.round((Number(data.totalPrice) * depositNum) / 100)} ₪) בעת חתימת החוזה`
    : "אין מקדמה — כל התשלום ישולם בתשלום אחד בתום העבודה";

  const specialSection = data.specialRequests?.trim()
    ? `\n\nסעיפים מיוחדים שהתבקשו:\n${data.specialRequests}`
    : "";

  const prompt = `אתה עורך דין ישראלי בכיר המתמחה בחוזי פרילנס.
נסח חוזה התקשרות מקצועי, מקיף ותקין משפטית, בעברית משפטית תקינה.
רמת הניסוח: כאילו חוזה זה נכתב על-ידי משרד עורכי דין מוביל. כל סעיף יכיל סעיפי משנה ממוספרים.

=== פרטי הצדדים ===
פרילנסר: ${data.freelancerName} | ת.ז. / ח.פ.: ${data.freelancerId} | עיר: ${data.freelancerCity}
לקוח: ${data.clientName} | ת.ז. / ח.פ.: ${data.clientId} | מייל: ${data.clientEmail}

=== תיאור הפרויקט ===
מה כלול: ${t(data.projectDescription)}
מה לא כלול: ${t(data.projectExclusions) || "לא פורט"}

=== תשלום ===
מחיר כולל: ${data.totalPrice} ₪ (${vatLabel(data.vat)})
מקדמה: ${deposit}
יתרה: ${t(data.paymentTiming)}
אמצעי תשלום: ${data.paymentMethod || "העברה בנקאית"}
איחור בתשלום: ${t(data.latePayment)}

=== תאריך חתימה ===
${data.signingDate ? `תאריך חתימה על החוזה: ${data.signingDate}` : "תאריך חתימה: יימולא ידנית (השאר שורה ריקה עם קו תחתון)"}

=== לוח זמנים ===
תחילת עבודה: ${data.startDate}
מסירה: ${data.deliveryDate}
עיכוב מצד הלקוח: ${t(data.delayConditions)}
עיכוב מצד הפרילנסר: ${t(data.freelancerDelay)}

=== תיקונים ===
תיקונים כלולים: ${t(data.revisionsIncluded)}
עלות תיקון נוסף: ${data.revisionCost ? `${data.revisionCost} ₪` : "לא צוין"}
הגדרת תיקון: ${t(data.revisionDefinition)}

=== ביטול ===
ביטול מצד הלקוח: ${t(data.clientCancellation)}
ביטול מצד הפרילנסר: ${t(data.freelancerCancellation)}

=== קניין רוחני ===
${ownershipLabel(data.ownership)}

=== הגנה מקצועית נוספת ===
${t(data.protectionAnswer) || "לא צוין"}
${specialSection}

=== הנחיות לניסוח ===
כתוב את החוזה עם הסעיפים הבאים לפי הסדר המדויק הזה. כל סעיף יכיל כותרת ראשית (## א. שם הסעיף) וסעיפי משנה ממוספרים (### א.1, א.2, ...).

**סעיפי החוזה:**

א. הצדדים — זהות מלאה של שני הצדדים, כולל תפקיד כל אחד, כינויים בהסכם.

ב. היקף השירות — ב.1 תיאור מפורט של השירות, ב.2 מה אינו כלול (אם צוין — ניסח כרשימה. אם לא צוין — כתוב "אינו כולל שירותים שאינם מפורטים מפורשות לעיל"), ב.3 אחריות מקצועית.

ג. תמורה ותנאי תשלום — ג.1 סכום התמורה (כתוב את הסכום גם במספרים וגם באותיות בסוגריים, לדוגמה: 8,500 ₪ (שמונת אלפים וחמש מאות שקלים חדשים)), ג.2 מבנה התשלומים (מקדמה + יתרה עם הסכומים הכספיים המדויקים וגם באותיות), ג.3 אמצעי תשלום, ג.4 איחור בתשלום.

ד. לוח זמנים ועיכובים — ד.1 מועדי הפרויקט, ד.2 עיכובים מצד הלקוח, ד.3 עיכובים מצד נותן השירות.

ה. תיקונים ושינויים — ה.1 סבבי תיקון כלולים (עם הספירה המדויקת), ה.2 עלות תיקון נוסף (אם צוין), ה.3 הגדרת "תיקון" לעומת "שינוי מהותי".

ו. ביטול ההסכם — ו.1 ביטול מצד הלקוח (מדרג ברור של תנאים לפי מה שצוין), ו.2 ביטול מצד נותן השירות.

ז. קניין רוחני ובעלות — ז.1 העברת בעלות (בהתאם לאפשרות שצוינה: מלאה / רישיון / לאחר תשלום מלא), ז.2 זכות נותן השירות לפורטפוליו, ז.3 הסתייגות — טרם תשלום מלא.

ח. סודיות ואי-גילוי — ח.1 התחייבות הדדית לסודיות לגבי מידע עסקי שהוחלף. ח.2 תקופת הסודיות. ח.3 חריגים (מידע שנמצא בנחלת הכלל, מידע שגילויו נדרש על-פי דין). אם צוינה הגנה מקצועית נוספת — שלב אותה כסעיף ח.4.

ט. יחסי עצמאי — ט.1 הצהרה שנותן השירות הוא קבלן עצמאי בלבד, ואין יחסי עובד-מעביד, שותפות, סוכנות, או ייצוג. ט.2 אחריות נותן השירות לתשלומי מס, ביטוח לאומי, ורגולציה.

י. כוח עליון — י.1 הגדרת כוח עליון (מלחמה, אסון טבע, מגפה, הוראת רשות מוסמכת). י.2 חובת הודעה מיידית. י.3 אם האירוע נמשך מעל 30 יום — זכות ביטול ללא פיצוי.

יא. הגבלת אחריות ושיפוי — יא.1 אחריות נותן השירות לא תעלה על הסכום ששולם בפועל. יא.2 שלילת אחריות לנזקים עקיפים ואבדן רווחים. יא.3 שיפוי הדדי בגין הפרת ההסכם.

יב. שינויים בהסכם — כל שינוי חייב להיות בכתב וחתום על-ידי שני הצדדים.

יג. ניהול סכסוכים ושיפוט — יג.1 פתרון ידידותי (14 יום ממועד הודעה בכתב), יג.2 גישור (עלות משותפת), יג.3 ערכאות משפטיות — בתי המשפט המוסמכים יהיו ב${getCourtCity(data.freelancerCity)}, וחוק ישראלי יחול.

יד. שלמות ההסכם — ההסכם מהווה את מלוא ההסכמה בין הצדדים ומבטל כל הסכמה קודמת. אם הוראה כלשהי בטלה — יתר ההוראות יישארו בתוקף.

טו. חתימות — בלוק חתימה לכל צד בנפרד (שני בלוקים בזה אחר זה, לא טבלה):

**נותן השירות:**
${data.freelancerName}

חתימה: _______________  תאריך: _______________

---

**הלקוח:**
${data.clientName}

חתימה: _______________  תאריך: _______________

**כללי ניסוח:**
- שפה: משפטית, מדויקת, מנוסחת כחוזה אמיתי.
- כל סכום כספי: כתוב גם במספרים וגם באותיות בסוגריים.
- כל מספר יום / שבוע: כתוב גם בספרות וגם באותיות בסוגריים — לדוגמה: 7 (שבעה) ימים.
- **אסור להשתמש בטבלאות markdown** (תווי |) — גם לא בחתימות.
- אם אין מקדמה — כתוב בפירוש "אין תשלום מראש. כל התשלום ישולם בתשלום אחד בתום העבודה." ואל תזכיר 0 ₪.
- בשורת "נערך ביום" בראש החוזה — השתמש בתאריך החתימה שצוין. אם לא צוין — הוסף קו תחתון (_____________) למילוי ידני.
- אם מצוין שהפרילנסר עוסק פטור — ציין זאת בסעיף התשלום והדגש שלא תצורף חשבונית מע"מ.
- אל תמציא פרטים שלא צוינו — אך נסח את מה שצוין בניסוח משפטי מלא ומדויק.`;

  const message = await anthropic.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text.replace(/\.\.+/g, ".");
}
