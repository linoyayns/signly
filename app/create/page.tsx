"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 8;

type Profession =
  | "photographer" | "designer" | "writer" | "consultant" | "developer"
  | "coach" | "tutor" | "videoEditor" | "socialMedia" | "translator"
  | "beauty" | "gardener" | "kindergarten" | "renovation" | "musician" | "interiorDesigner"
  | "architect" | "psychologist" | "sportsInstructor" | "privateChef"
  | "producer" | "eventManager" | "hairdresser"
  | "other";
type VatType = "plus_vat" | "incl_vat" | "exempt" | null;
type OwnershipType = "full" | "license" | "afterpayment" | null;

interface FormData {
  profession: Profession | null;
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
  vat: VatType;
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
  ownership: OwnershipType;
  protectionAnswer: string;
  specialRequests: string;
  deliveryEmail: string;
}

const PROFESSIONS = [
  { id: "photographer" as Profession, icon: "📷", label: "צלם / צלמת" },
  { id: "designer" as Profession, icon: "🎨", label: "מעצב / מעצבת" },
  { id: "writer" as Profession, icon: "✍️", label: "כותב / כותבת" },
  { id: "consultant" as Profession, icon: "💼", label: "יועץ / יועצת" },
  { id: "developer" as Profession, icon: "💻", label: "מפתח / מפתחת" },
  { id: "videoEditor" as Profession, icon: "🎬", label: "עורך / עורכת וידאו" },
  { id: "socialMedia" as Profession, icon: "📱", label: "מנהל/ת סושיאל מדיה" },
  { id: "coach" as Profession, icon: "🏆", label: "מאמן / מאמנת" },
  { id: "sportsInstructor" as Profession, icon: "🏋️", label: "מדריך / מדריכת ספורט" },
  { id: "tutor" as Profession, icon: "📚", label: "מורה פרטי/ת" },
  { id: "psychologist" as Profession, icon: "🧠", label: "פסיכולוג / מטפל/ת" },
  { id: "interiorDesigner" as Profession, icon: "🛋️", label: "מעצב/ת פנים" },
  { id: "architect" as Profession, icon: "📐", label: "אדריכל / אדריכלית" },
  { id: "musician" as Profession, icon: "🎵", label: "מוזיקאי / מוזיקאית" },
  { id: "translator" as Profession, icon: "🌐", label: "מתרגם / מתרגמת" },
  { id: "beauty" as Profession, icon: "💄", label: "מאפרת / ספרית / קוסמטיקאית" },
  { id: "privateChef" as Profession, icon: "👨‍🍳", label: "שף / שפית פרטי/ת" },
  { id: "kindergarten" as Profession, icon: "🧒", label: "גננת / גן ילדים" },
  { id: "gardener" as Profession, icon: "🌿", label: "גנן / גינון" },
  { id: "renovation" as Profession, icon: "🔨", label: "שיפוצים / קבלן" },
  { id: "producer" as Profession, icon: "🎭", label: "מפיק / מפיקה" },
  { id: "eventManager" as Profession, icon: "🎉", label: "מנהל/ת אירועים" },
  { id: "hairdresser" as Profession, icon: "✂️", label: "ספר / ספרית" },
  { id: "other" as Profession, icon: "⚡", label: "אחר" },
];

const PROTECTION_QUESTIONS: Record<Profession, { question: string; hint: string; placeholder: string }> = {
  photographer: {
    question: "מי מחליט שהעבודה הסתיימה?",
    hint: "צילמת אלף תמונות. הלקוח בוחר 30. ואז אומר \"לא מה שציפיתי\" — ומסרב לשלם. חוזה שמגדיר מראש מה נחשב \"מסירה\" סוגר את הדיון.",
    placeholder: "המסירה מוגדרת כ-X תמונות ערוכות לפי הסגנון שסוכם. בחירת התמונות — של הפרילנסר. אישור הלקוח נדרש תוך 48 שעות.",
  },
  designer: {
    question: "מה קורה לזכויות העיצוב אם הלקוח מכר את העסק?",
    hint: "הלקוח מכר את העסק לחברה גדולה. החברה ממשיכה להשתמש בלוגו שעיצבת — בלי לשלם לך שקל נוסף. מה החוזה שלך אומר?",
    placeholder: "העברת הבעלות על הלוגו אינה כוללת העברת הרישיון לצד שלישי. שימוש על ידי גוף שרכש את העסק מחייב הסכם נפרד.",
  },
  writer: {
    question: "מה קורה לתוכן שכתבת אם הלקוח מכר את העסק?",
    hint: "כתבת תוכן שיווקי. הלקוח מכר את העסק. הקונה ממשיך להשתמש בתוכן — בלי לשלם לך. מה מגן עליך?",
    placeholder: "הזכויות על התוכן עוברות ללקוח לאחר תשלום מלא. שימוש על ידי גוף שרכש את העסק מחייב הסכם נפרד.",
  },
  consultant: {
    question: "האם הלקוח רשאי ללמד את המתודולוגיה שלך לאחרים?",
    hint: "לימדת לקוח את המתודולוגיה שלך. עכשיו הוא מקיים סדנאות עם אותה שיטה — ולא הזכיר אותך. מה מגן עליך?",
    placeholder: "הלקוח רשאי ליישם את המתודולוגיה בעסקו בלבד. הדרכה, שיתוף, או הוראה של הגישה לאחרים — אסורה ללא הסכמה בכתב.",
  },
  developer: {
    question: "מה קורה לקוד המקור — נמסר לאחר תשלום מלא?",
    hint: "פיתחת מערכת שלמה. הלקוח משתמש בה — אבל טוען שלא חייב לשלם עד שיקבל את קוד המקור. מה הגדרת?",
    placeholder: "קוד המקור נמסר לאחר קבלת התשלום המלא. עד אז — הלקוח מקבל גישה לפרודקשן בלבד.",
  },
  videoEditor: {
    question: "מי מחליט שהסרטון מוכן למסירה?",
    hint: "ערכת 8 גרסאות. הלקוח אומר 'קרוב אבל לא מה שרציתי'. מה כתוב בחוזה על סבבי עריכה?",
    placeholder: "מסירה מוגדרת כגרסה שאושרה בכתב על ידי הלקוח, לאחר עד X סבבי עריכה הכלולים במחיר. עריכות נוספות יחויבו בנפרד.",
  },
  socialMedia: {
    question: "מי אחראי על תוכן שפורסם ולא עמד בציפיות הלקוח?",
    hint: "פירסמת פוסט שהלקוח אישר בכתב — ואחרי שיצא, הוא טוען שנגרם לו נזק. מי נושא באחריות?",
    placeholder: "הלקוח אחראי לאישור כל תוכן לפני פרסום. לאחר אישור בכתב — האחריות על התוצאות עוברת ללקוח.",
  },
  coach: {
    question: "מה קורה אם הלקוח מבטל פגישה ברגע האחרון?",
    hint: "הפרשת שעה שלמה בלוח הזמנים. הלקוח מבטל שעה לפני. הרגע אבד — מי משלם על הזמן?",
    placeholder: "ביטול פחות מ-24 שעות לפני הפגישה — 50% עלות הפגישה. ביטול פחות מ-2 שעות / אי-הגעה — תשלום מלא.",
  },
  sportsInstructor: {
    question: "מה קורה אם המתאמן נפצע במהלך האימון?",
    hint: "הדרכת אימון בצורה מקצועית. המתאמן נפצע — ומאשים את ההדרכה שלך. מה הגדרת מראש?",
    placeholder: "המתאמן/ת מצהיר/ה שהוא/היא בריא/ה ומסוגל/ת לפעילות. הפרילנסר אינו נושא באחריות לפציעות הנגרמות מרשלנות המתאמן או ממצב בריאותי שלא הוצהר.",
  },
  tutor: {
    question: "מה קורה אם התלמיד לא מגיע לשיעור ולא מודיע?",
    hint: "הפרשת שעה, ביטלת לקוחות אחרים — והתלמיד פשוט לא הגיע. ולא שילם.",
    placeholder: "אי-הגעה ללא הודעה של 4+ שעות מראש מחייבת תשלום מלא עבור השיעור שהוזמן.",
  },
  psychologist: {
    question: "מה קורה אם המטופל מבטל פגישה ברגע האחרון?",
    hint: "קבעת שעה שלמה בלוח הזמנים. המטופל מבטל שעה לפני — הרגע הטיפולי אבד ואי אפשר למלא אותו.",
    placeholder: "ביטול פחות מ-24 שעות לפני — 50% דמי ביטול. אי-הגעה ללא הודעה — תשלום מלא. הביטול יתקבל אך ורק בכתב.",
  },
  interiorDesigner: {
    question: "מי אחראי אם ספק עיכב חומרים וגרם לדחייה בפרויקט?",
    hint: "תכננת הכל, הזמנת חומרים — הספק עיכב. הלקוח מתלונן שהעיצוב לא הסתיים בזמן.",
    placeholder: "עיכובים שנגרמו מספקים חיצוניים, יצרנים או ייבוא — אינם באחריות המעצב/ת. לוח הזמנים יעודכן בהתאם ובהסכמה.",
  },
  architect: {
    question: "מה קורה אם הרשויות דחו את הבקשה להיתר?",
    hint: "עיצבת תוכנית מושלמת. הרשות המקומית דחתה בגלל תקנות שאינן בשליטתך. הלקוח דורש החזר מלא.",
    placeholder: "שכר הטרחה משולם עבור העבודה שבוצעה בפועל ואינו מותנה בקבלת היתר. דחיית רשויות תחייב עבודה נוספת שתחויב בנפרד.",
  },
  musician: {
    question: "האם הלקוח רשאי להשתמש ביצירה לצרכים מסחריים?",
    hint: "הלחנת מוזיקה לסרטון. הלקוח העלה אותה לפלטפורמה מסחרית ומרוויח ממנה. מה בדיוק סוכם?",
    placeholder: "הרישיון מוגבל לשימוש המוגדר בחוזה בלבד. שימוש מסחרי, הפצה נוספת, או שינוי היצירה — מחייבים הסכם נפרד ותמורה נוספת.",
  },
  translator: {
    question: "מה קורה אם נמצאו שגיאות בתרגום לאחר הגשה?",
    hint: "תרגמת מסמך חשוב. הלקוח מוצא שגיאה — ודורש פיצוי על נזק עסקי שנגרם. מה הגדרת?",
    placeholder: "האחריות מוגבלת לתיקון השגיאה בלבד. אין אחריות לנזק עסקי עקיף. הלקוח אחראי לבדיקה ואישור התרגום לפני שימוש רשמי.",
  },
  beauty: {
    question: "מה קורה אם הלקוחה לא מרוצה מהתוצאה לאחר עזיבת המקום?",
    hint: "השקעת שעות בטיפול. הלקוחה עזבה, ויום אחר כך שולחת הודעה שהיא לא מרוצה ורוצה החזר.",
    placeholder: "שינויים מוסכמים במהלך הטיפול בלבד. לאחר סיום הטיפול ועזיבת המקום — אין החזר כספי. תלונות יועברו תוך 24 שעות בלבד.",
  },
  privateChef: {
    question: "מה קורה אם אורח סובל מרגישות למרכיב שלא הוצהר?",
    hint: "בישלת ארוחה מושקעת. אורח טוען שלא ידע שיש בה אגוזים — ומאשים אותך. מה הגדרת?",
    placeholder: "הלקוח אחראי למסור את כל האלרגיות והרגישויות לפני הארוחה בכתב. הפרילנסר אינו נושא באחריות לרגישויות שלא הוצהרו.",
  },
  kindergarten: {
    question: "מה קורה אם הורה מחליט להוציא את הילד באמצע השנה?",
    hint: "הפרשת מקום לילד לכל שנת הלימודים — ויצאת מכיס על הכנות, ציוד וסגירת המקום לאחרים. עזיבה פתאומית פוגעת ישירות.",
    placeholder: "עזיבה מוקדמת מחייבת הודעה של 30 יום מראש בכתב ואינה מזכה בהחזר על חודשים שהוכנו או שולמו מראש.",
  },
  gardener: {
    question: "מי אחראי אם צמח נפגע לאחר הטיפול?",
    hint: "טיפלת בגינה מקצועית. שבוע אחר כך צמח מת — הלקוח טוען שזה מהטיפול שלך. מה הגדרת מראש?",
    placeholder: "אחריות על צמחים מוגבלת ל-7 ימים מיום הטיפול, ובתנאי שניתנו השקיה ותחזוקה שוטפת לפי ההמלצות שנמסרו.",
  },
  renovation: {
    question: "מה קורה אם הלקוח מחליט לשנות את הפרויקט באמצע העבודה?",
    hint: "התחלת שיפוץ לפי תוכנית מוסכמת. הלקוח אומר 'שנה לי גם את זה'. כל שינוי עולה לך זמן וכסף.",
    placeholder: "כל שינוי בהיקף הפרויקט לאחר תחילת העבודה יחויב בנפרד לפי הצעת מחיר מעודכנת שתאושר בכתב לפני ביצוע.",
  },
  producer: {
    question: "מה קורה אם ספק חיוני ביטל ברגע האחרון?",
    hint: "הזמנת ציוד, צוות, לוקיישן — ספק ביטל שעתיים לפני. הלקוח מצפה שהכל יעבוד. מי נושא באחריות?",
    placeholder: "ביטול מצד ספקים חיצוניים שאינם בשליטת המפיק אינו מקנה ללקוח זכות לפיצוי. המפיק יפעל למציאת חלופה סבירה.",
  },
  eventManager: {
    question: "מי אחראי אם ספק שנשכר לאירוע לא הגיע?",
    hint: "תיאמת קייטרינג, DJ, צלם — אחד מהם לא הגיע. הלקוח מאשים אותך. מה הגדרת?",
    placeholder: "מנהל האירועים אחראי לתיאום בלבד. אחריות ביצועית של ספקים חיצוניים חלה עליהם ישירות. ביטוח ספקים — באחריות הספק.",
  },
  hairdresser: {
    question: "מה קורה אם הלקוח לא מרוצה מהתוצאה לאחר עזיבת המקום?",
    hint: "קצצת, צבעת, עיצבת — הלקוח יצא מרוצה. יומיים אחר כך טוען שזה לא מה שביקש.",
    placeholder: "שינויים ניתן לבקש בזמן השירות בלבד. לאחר עזיבת המקום — התוצאה נחשבת מאושרת. תלונות יועברו תוך 24 שעות בלבד.",
  },
  other: {
    question: "האם הלקוח רשאי להשתמש בעבודתך מחוץ לפרויקט הנוכחי?",
    hint: "הגדר מה מותר ללקוח לעשות עם התוצרים — מחוץ להיקף הפרויקט שסוכם.",
    placeholder: "השימוש בתוצרים מוגבל למטרות הפרויקט שסוכם בלבד. כל שימוש אחר מחייב הסכמה מפורשת בכתב.",
  },
};

const PROJECT_EXAMPLES: Record<Profession, { description: string; exclusions: string }> = {
  photographer: {
    description: "צילום חתונה מלא: טקס, קבלת פנים וסעודה. כ-600 תמונות ערוכות בסגנון שיוסכם, מסירה תוך 6 שבועות.",
    exclusions: "לא כלול: הדפסות, אלבום מודפס, וידאו, עריכה מעבר ל-600 תמונות.",
  },
  designer: {
    description: "עיצוב לוגו ומיתוג מלא: לוגו ראשי, גרסאות צבע, מדריך שימוש בסיסי ו-5 פריטי קולטרל.",
    exclusions: "לא כלול: עיצוב לאתר, הדפסה, אנימציות, ניהול רשתות חברתיות.",
  },
  writer: {
    description: "כתיבת 8 מאמרי SEO בעברית, 800-1000 מילה כל אחד, על נושאים שיוסכמו מראש.",
    exclusions: "לא כלול: תרגום, עיצוב גרפי, הגהה של תכנים שנכתבו על ידי אחרים, פרסום.",
  },
  consultant: {
    description: "8 מפגשי ייעוץ עסקי שבועיים של שעה כל אחד, כולל סיכום ומשימות לביצוע.",
    exclusions: "לא כלול: ביצוע המשימות בפועל, שיווק, גיוס עובדים, יישום המלצות.",
  },
  developer: {
    description: "פיתוח אפליקציית ווב: דשבורד, מערכת התחברות, 3 דוחות בסיסיים. סטאק: React + Node.js.",
    exclusions: "לא כלול: אפליקציית מובייל, עיצוב UI/UX, SEO, אחסון, תחזוקה שוטפת.",
  },
  videoEditor: {
    description: "עריכת סרטון תדמית לעסק: 2-3 דקות, כולל מוזיקה, כותרות וסאבטייטלס בעברית.",
    exclusions: "לא כלול: צילום, כתיבת תסריט, קריינות, פרסום בפלטפורמות.",
  },
  socialMedia: {
    description: "ניהול אינסטגרם + פייסבוק: 3 פוסטים שבועיים, כתיבה, עיצוב בסיסי ולוח תוכן חודשי.",
    exclusions: "לא כלול: פרסום ממומן, צילום, עיצוב מותג, מענה להודעות פרטיות.",
  },
  coach: {
    description: "8 מפגשי אימון אישי של שעה כל אחד, בזום, כולל כלים, תרגילים ותמיכה בין-פגישתית.",
    exclusions: "לא כלול: זמינות 24/7, ייעוץ פסיכולוגי, הבטחת תוצאות ספציפיות.",
  },
  sportsInstructor: {
    description: "12 אימונים אישיים שבועיים של 60 דקות, כולל תוכנית אימונים מותאמת ומעקב התקדמות.",
    exclusions: "לא כלול: תוכנית תזונה, ציוד, ביטוח תאונות.",
  },
  tutor: {
    description: "10 שיעורים פרטיים במתמטיקה לבגרות 5 יח', שעה כל אחד, כולל חומרי עזר וסיכומים.",
    exclusions: "לא כלול: הכנת חיבורים, הדרכה בנושאים נוספים, מענה לשאלות מחוץ לשיעורים.",
  },
  psychologist: {
    description: "ליווי טיפולי: 12 פגישות שבועיות של 50 דקות, גישה קוגניטיבית-התנהגותית.",
    exclusions: "לא כלול: מענה למצבי חירום, ייעוץ לבני משפחה, כתיבת חוות דעת רשמיות.",
  },
  interiorDesigner: {
    description: "עיצוב פנים לדירת 4 חדרים: תוכנית עיצובית, בחירת חומרים וריהוט, ליווי ספקים.",
    exclusions: "לא כלול: פיקוח בנייה, רכישת ריהוט בפועל, הובלה, שיפוצים.",
  },
  architect: {
    description: "תכנון תוספת בנייה של 40 מ\"ר: שרטוטים, מפרט טכני, הגשה לרשות המקומית.",
    exclusions: "לא כלול: פיקוח בנייה, ליווי קבלן, שינויים מהותיים לאחר הגשה.",
  },
  musician: {
    description: "הלחנה וביצוע של 3 יצירות מקוריות לסרטון פרסומי, עד 90 שניות כל אחת.",
    exclusions: "לא כלול: מיקסינג, מאסטרינג, שימוש מסחרי מעבר לפרויקט המוגדר.",
  },
  translator: {
    description: "תרגום מסמך משפטי מאנגלית לעברית, עד 20 עמודים, כולל הגהה אחת.",
    exclusions: "לא כלול: נוטריון, אימות תרגום, חומרים נוספים שלא נכללו בהצעה.",
  },
  beauty: {
    description: "איפור כלה ביום האירוע: פגישת ניסיון + ביצוע באירוע, כולל מוצרים.",
    exclusions: "לא כלול: שיער, איפור לשושבינות, נסיעה מעל 30 ק\"מ.",
  },
  privateChef: {
    description: "הכנת ארוחה חגיגית ל-10 סועדים: תפריט 3 מנות שיוסכם מראש, כולל קניות והגשה.",
    exclusions: "לא כלול: ציוד הגשה, משקאות, ניקיון לאחר הארוחה, עוגה.",
  },
  kindergarten: {
    description: "שנת לימודים מלאה בגן פרטי: ספטמבר–יולי, 5 ימים בשבוע, שעות 7:30–14:00. כולל פעילויות חינוכיות, ארוחת צהריים וחגים.",
    exclusions: "לא כלול: ימי חופש רשמיים, ימי מחלה, ציוד אישי של הילד, טיולים בתשלום נוסף.",
  },
  gardener: {
    description: "עיצוב וטיפול שוטף בגינה פרטית: 2 ביקורים חודשיים, גיזום, השקיה ועידור.",
    exclusions: "לא כלול: מערכת השקיה אוטומטית, רכישת צמחים, הדברה.",
  },
  renovation: {
    description: "שיפוץ חדר אמבטיה: פירוק, ריצוף, אינסטלציה, גבס וצביעה — חומרים כלולים.",
    exclusions: "לא כלול: עבודות חשמל, ריהוט, ציוד סניטרי, חדרים נוספים.",
  },
  producer: {
    description: "הפקת אירוע עסקי ל-100 איש: תכנון, לוקיישן, ספקים, ציוד, לוח זמנים וניהול האירוע בפועל.",
    exclusions: "לא כלול: ביגוד, ציוד שכירות מיוחד, שירות קייטרינג, הסעות.",
  },
  eventManager: {
    description: "ניהול אירוע חתונה: תכנון, תיאום ספקים (צלם, DJ, קייטרינג, פרחים), ניהול באירוע עצמו.",
    exclusions: "לא כלול: עלויות ספקים ישירים, הסעות, ציוד מיוחד שלא צוין בהצעה.",
  },
  hairdresser: {
    description: "עיצוב שיער לאירוע: פגישת ניסיון + ביצוע ביום האירוע, כולל מוצרים.",
    exclusions: "לא כלול: איפור, שושבינות, נסיעה מעל 20 ק\"מ.",
  },
  other: {
    description: "תאר את השירות שאתה מספק — מה בדיוק כלול, כמה, ובאיזה פורמט?",
    exclusions: "פרט את מה שאינו כלול בהיקף העבודה שסוכמה.",
  },
};

const DATES_CONFIG: Record<Profession, { startLabel: string; endLabel: string }> = {
  photographer:      { startLabel: "תאריך הצילום",            endLabel: "תאריך מסירת התמונות" },
  designer:          { startLabel: "תאריך תחילת העיצוב",      endLabel: "תאריך מסירת הקבצים" },
  writer:            { startLabel: "תאריך תחילת הכתיבה",      endLabel: "תאריך מסירת התוכן" },
  consultant:        { startLabel: "תאריך פגישה ראשונה",      endLabel: "תאריך סיום הייעוץ" },
  developer:         { startLabel: "תאריך תחילת הפיתוח",      endLabel: "תאריך מסירת הפרויקט" },
  videoEditor:       { startLabel: "תאריך קבלת החומרים",      endLabel: "תאריך מסירת הסרטון" },
  socialMedia:       { startLabel: "תאריך תחילת הניהול",      endLabel: "תאריך סיום ההתקשרות" },
  coach:             { startLabel: "תאריך פגישה ראשונה",      endLabel: "תאריך פגישה אחרונה" },
  sportsInstructor:  { startLabel: "תאריך אימון ראשון",       endLabel: "תאריך אימון אחרון" },
  tutor:             { startLabel: "תאריך שיעור ראשון",       endLabel: "תאריך שיעור אחרון" },
  psychologist:      { startLabel: "תאריך פגישה ראשונה",      endLabel: "תאריך פגישה אחרונה" },
  interiorDesigner:  { startLabel: "תאריך תחילת העיצוב",      endLabel: "תאריך מסירת התוכנית" },
  architect:         { startLabel: "תאריך תחילת התכנון",      endLabel: "תאריך הגשת התוכניות" },
  musician:          { startLabel: "תאריך תחילת העבודה",      endLabel: "תאריך מסירת היצירה" },
  translator:        { startLabel: "תאריך קבלת החומר לתרגום", endLabel: "תאריך מסירת התרגום" },
  beauty:            { startLabel: "תאריך פגישת ניסיון (אופציונלי)", endLabel: "תאריך האירוע" },
  privateChef:       { startLabel: "תאריך אישור התפריט (אופציונלי)", endLabel: "תאריך הארוחה" },
  kindergarten:      { startLabel: "תאריך תחילת שנת הלימודים", endLabel: "תאריך סיום שנת הלימודים" },
  gardener:          { startLabel: "תאריך ביקור ראשון",        endLabel: "תאריך סיום הטיפול" },
  renovation:        { startLabel: "תאריך תחילת העבודות",     endLabel: "תאריך סיום מתוכנן" },
  producer:          { startLabel: "תאריך תחילת ההפקה",         endLabel: "תאריך האירוע / המסירה" },
  eventManager:      { startLabel: "תאריך תחילת תכנון האירוע",  endLabel: "תאריך האירוע" },
  hairdresser:       { startLabel: "תאריך פגישת ניסיון (אופציונלי)", endLabel: "תאריך האירוע" },
  other:             { startLabel: "תאריך התחלה",             endLabel: "תאריך מסירה / סיום" },
};

const DELAYS_CONFIG: Record<Profession, {
  clientLabel: string; clientHint: string; clientPlaceholder: string;
  freelancerLabel: string; freelancerHint: string; freelancerPlaceholder: string;
}> = {
  photographer: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב בקבלת אישורים / שינוי לוקיישן — ידחה את מועד המסירה בהתאמה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 7 ימים יוודע ללקוח מיידית.",
  },
  designer: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב במסירת חומרים, בריפינג, או אישורי ביניים — ידחה את מועד המסירה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 5 ימים יוודע ללקוח מיידית.",
  },
  writer: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב בהספקת מידע, ראיונות, או חומרים — ידחה את מועד המסירה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 3 ימים יוודע ללקוח מיידית.",
  },
  consultant: {
    clientLabel: "מה קורה אם הלקוח מבטל פגישה?",
    clientHint: "ביטול פגישות גורם לך לאבד זמן שיכולת להקדיש ללקוחות אחרים",
    clientPlaceholder: "ביטול פחות מ-24 שעות מראש — יחויב 50% עלות הפגישה.",
    freelancerLabel: "מה קורה אם נאלצת לדחות פגישה?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "דחייה תוודע ללקוח לפחות 24 שעות מראש ותתואם מועד חלופי.",
  },
  developer: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב באישורי ביניים, גישות מערכות, או פידבק — ידחה את לוח הזמנים.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 7 ימים יוודע ללקוח מיידית ויוצג לוח זמנים מעודכן.",
  },
  videoEditor: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב בהספקת חומרי גלם, מוזיקה, לוגו, או אישורי ביניים — ידחה את המסירה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 5 ימים יוודע ללקוח מיידית.",
  },
  socialMedia: {
    clientLabel: "מה קורה אם הלקוח לא מאשר תוכן בזמן?",
    clientHint: "אישורים מאוחרים מפריעים ללוח הפרסום",
    clientPlaceholder: "תוכן שלא אושר תוך 48 שעות — יפורסם במועד הבא בלוח התוכן.",
    freelancerLabel: "מה קורה אם נוצר עיכוב בפרסום מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב בפרסום יוודע ללקוח מיידית.",
  },
  coach: {
    clientLabel: "מה קורה אם הלקוח מבטל פגישה?",
    clientHint: "ביטול פגישות גורם לך לאבד זמן ולקוחות אחרים",
    clientPlaceholder: "ביטול פחות מ-24 שעות מראש — 50% עלות הפגישה. אי-הגעה — תשלום מלא.",
    freelancerLabel: "מה קורה אם נאלצת לדחות פגישה?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "דחייה תוודע ללקוח לפחות 24 שעות מראש ותתואם פגישה חלופית.",
  },
  sportsInstructor: {
    clientLabel: "מה קורה אם המתאמן מבטל אימון?",
    clientHint: "ביטול אימונים גורם לך לאבד הכנסה מתוכננת",
    clientPlaceholder: "ביטול פחות מ-24 שעות מראש — 50% עלות האימון. אי-הגעה — תשלום מלא.",
    freelancerLabel: "מה קורה אם נאלצת לבטל אימון?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "ביטול מצדי יוודע לפחות 3 שעות מראש ויתואם אימון חלופי.",
  },
  tutor: {
    clientLabel: "מה קורה אם התלמיד לא מגיע לשיעור?",
    clientHint: "אי-הגעה ללא הודעה גורמת לך לאבד שעת עבודה",
    clientPlaceholder: "אי-הגעה ללא הודעה של 4+ שעות — תחויב השעה במלואה.",
    freelancerLabel: "מה קורה אם נאלצת לבטל שיעור?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "ביטול מצדי יוודע לפחות 3 שעות מראש ויתואם שיעור חלופי.",
  },
  psychologist: {
    clientLabel: "מה קורה אם המטופל מבטל פגישה?",
    clientHint: "שעה שנקבעה ולא נוצלה — הכנסה שאבדה",
    clientPlaceholder: "ביטול פחות מ-24 שעות מראש — 50% דמי ביטול. אי-הגעה — תשלום מלא.",
    freelancerLabel: "מה קורה אם נאלצת לדחות פגישה?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "דחייה תוודע ללקוח לפחות 24 שעות מראש ותתואם פגישה חלופית.",
  },
  interiorDesigner: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב באישורים, שינוי בחירות, או עיכוב ספקים שהלקוח בחר — ידחה את לוח הזמנים.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב יוודע ללקוח מיידית ויוצג לוח זמנים מעודכן.",
  },
  architect: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב באישורים, שינוי בתוכניות, או דרישות נוספות — ידחה את לוח הזמנים.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב יוודע ללקוח מיידית ויוצג לוח זמנים מעודכן.",
  },
  musician: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב במסירת ברייף, חומרי השראה, או אישורי ביניים — ידחה את המסירה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 5 ימים יוודע ללקוח מיידית.",
  },
  translator: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב במסירת החומר לתרגום — ידחה את מועד המסירה בהתאמה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 2 ימים יוודע ללקוח מיידית.",
  },
  beauty: {
    clientLabel: "מה קורה אם הלקוחה משנה את תאריך האירוע?",
    clientHint: "שינוי תאריך ברגע האחרון עלול לפגוע בלוח הזמנים שלך",
    clientPlaceholder: "שינוי תאריך פחות מ-14 יום לפני האירוע — יחויב 50% מהמחיר.",
    freelancerLabel: "מה קורה אם לא תוכלי להגיע ביום האירוע?",
    freelancerHint: "מחלה, חירום — מה הלקוחה מקבלת במקרה כזה",
    freelancerPlaceholder: "במקרה של אי-יכולת להגיע — אמצא מחליפה ברמה דומה, או אבצע החזר מלא.",
  },
  privateChef: {
    clientLabel: "מה קורה אם הלקוח משנה את תאריך הארוחה או מבטל?",
    clientHint: "שינוי או ביטול מאוחר גורם לך להפסיד הכנות ורכישות",
    clientPlaceholder: "שינוי או ביטול פחות מ-72 שעות לפני האירוע — יחויב 50% מהמחיר.",
    freelancerLabel: "מה קורה אם לא תוכל להגיע ביום הארוחה?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "במקרה של אי-יכולת להגיע — אמצא מחליף ברמה דומה, או אבצע החזר מלא.",
  },
  kindergarten: {
    clientLabel: "מה קורה אם הורה מאחר לאסוף את הילד?",
    clientHint: "איחור באיסוף מחייב שמירה על הילד מעבר לשעות הגן",
    clientPlaceholder: "איחור של מעל 15 דקות מסיום הגן יחויב בתשלום נוסף של X ₪ לכל רבע שעה.",
    freelancerLabel: "מה קורה אם הגן סגור ביום מתוכנן?",
    freelancerHint: "מחלה, חירום — מה ההורים מקבלים במקרה כזה",
    freelancerPlaceholder: "במקרה של סגירת הגן שלא עקב חג רשמי — יינתן יום חלופי או זיכוי כספי יחסי.",
  },
  gardener: {
    clientLabel: "מה קורה אם הלקוח לא מאפשר גישה לגינה?",
    clientHint: "הגעת לביקור מוסכם ואין גישה — הזמן שלך הלך לאיבוד",
    clientPlaceholder: "אי-גישה לגינה במועד מוסכם — יחויב ביקור בגובה 50% מהמחיר.",
    freelancerLabel: "מה קורה אם נאלצת לדחות ביקור?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "דחייה תוודע ללקוח לפחות 24 שעות מראש ויתואם מועד חלופי.",
  },
  renovation: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "עיכוב בפינוי הדירה, שינוי בחירות חומרים, או קבלנים נוספים מטעם הלקוח — ידחה את לוח הזמנים.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב מעל 3 ימים יוודע ללקוח מיידית ויוצג לוח זמנים מעודכן.",
  },
  producer: {
    clientLabel: "מה קורה אם הלקוח משנה דרישות לאחר אישור תוכנית ההפקה?",
    clientHint: "שינויים בשלב מתקדם גורמים לעלויות ועיכובים",
    clientPlaceholder: "שינויים מהותיים לאחר אישור תוכנית ההפקה — יחויבו בנפרד לפי הצעת מחיר מעודכנת.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב יוודע ללקוח מיידית ויוצג לוח זמנים מעודכן.",
  },
  eventManager: {
    clientLabel: "מה קורה אם הלקוח משנה את תאריך האירוע?",
    clientHint: "שינוי תאריך גורר ביטול ותיאום מחדש עם כל הספקים",
    clientPlaceholder: "שינוי תאריך פחות מ-30 יום לפני האירוע — יחויב בדמי ניהול נוספים. זמינות מחדש כפופה ללוח הזמנים.",
    freelancerLabel: "מה קורה אם לא תוכל לנהל את האירוע?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "במקרה של אי-יכולת להגיע — אמצא מחליף ברמה דומה, או אבצע החזר מלא.",
  },
  hairdresser: {
    clientLabel: "מה קורה אם הלקוח מבטל ברגע האחרון?",
    clientHint: "ביטול מאוחר גורם לאבד הכנסה שאי אפשר למלא",
    clientPlaceholder: "ביטול פחות מ-48 שעות לפני — 50% ממחיר השירות. ביטול ביום האירוע — תשלום מלא.",
    freelancerLabel: "מה קורה אם לא תוכל/י להגיע ביום האירוע?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "במקרה של אי-יכולת להגיע — אמצא מחליף/ה ברמה דומה, או אבצע/י החזר מלא.",
  },
  other: {
    clientLabel: "מה יגרום לעיכוב מצד הלקוח?",
    clientHint: "עיכובים שהלקוח גורם להם — לא באחריותך",
    clientPlaceholder: "פרט מה מצד הלקוח עלול לדחות את המסירה.",
    freelancerLabel: "מה קורה אם נוצר עיכוב מצדך?",
    freelancerHint: "הגדר מה קורה כדי שיהיה ברור לשני הצדדים מראש",
    freelancerPlaceholder: "עיכוב יוודע ללקוח מיידית ויתואם לוח זמנים חדש.",
  },
};

const REVISIONS_CONFIG: Record<Profession, {
  stepTitle: string;
  stepSubtitle: string;
  showCountAndCost: boolean;
  countLabel: string;
  countPlaceholder: string;
  definitionLabel: string;
  definitionPlaceholder: string;
}> = {
  photographer: {
    stepTitle: "כמה סבבי עריכה כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "סבבי עריכה כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'סבב עריכה' לעומת דרישה חדשה?",
    definitionPlaceholder: "שינוי צבעוניות, חיתוך, קרופ — כלול. בחירה מחדש של תמונות שאושרו, הוספת צילומים — לא כלול.",
  },
  designer: {
    stepTitle: "כמה סבבי עיצוב כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "סבבי עיצוב כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'תיקון' לעומת עיצוב חדש?",
    definitionPlaceholder: "שינוי צבע, גופן, מיקום — כלול. שינוי קונספט מלא, הוספת פריטים חדשים — לא כלול.",
  },
  writer: {
    stepTitle: "כמה סבבי תיקון כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "סבבי תיקון כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'תיקון' לעומת כתיבה חדשה?",
    definitionPlaceholder: "שינוי ניסוח, הוספת/גריעת פסקה — כלול. שינוי נושא, קהל יעד, כיוון שיווקי — לא כלול.",
  },
  consultant: {
    stepTitle: "תיקונים בתוצרים ומסמכים",
    stepSubtitle: "אם הייעוץ כולל מסמכים — הגדר כמה סבבי תיקון כלולים.",
    showCountAndCost: true,
    countLabel: "סבבי תיקון כלולים",
    countPlaceholder: "1",
    definitionLabel: "מה נחשב 'תיקון' לעומת עבודה חדשה?",
    definitionPlaceholder: "שינוי ניסוח, הוספת/גריעת סעיף — כלול. בניית מסמך חדש, שינוי מהותי בגישה — לא כלול.",
  },
  developer: {
    stepTitle: "כמה סבבי שינויים כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "סבבי שינויים כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'תיקון באג' לעומת 'פיצ׳ר חדש'?",
    definitionPlaceholder: "תיקון קוד שלא עובד לפי המפרט — כלול ללא עלות. תוספת פונקציות, שינוי עיצוב, כל מה שלא כתוב במפרט — יחויב בנפרד.",
  },
  videoEditor: {
    stepTitle: "כמה סבבי עריכה כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "סבבי עריכה כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'סבב עריכה' לעומת שינוי מהותי?",
    definitionPlaceholder: "שינוי קאט, טקסט, מוזיקה — כלול. שינוי קונספט, הוספת חומר שלא צולם, שינוי כיוון — לא כלול.",
  },
  socialMedia: {
    stepTitle: "כמה תיקונים לפני פרסום?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "תיקונים לכל פוסט",
    countPlaceholder: "1",
    definitionLabel: "מה נחשב 'תיקון' לעומת תוכן חדש?",
    definitionPlaceholder: "שינוי טקסט, צבע, תמונה — כלול. שינוי נושא הפוסט לגמרי — נחשב תוכן חדש ויחויב בנפרד.",
  },
  translator: {
    stepTitle: "כמה סבבי הגהה כלולים?",
    stepSubtitle: "הגדר כמה פעמים הלקוח יכול לבקש תיקונים בתרגום.",
    showCountAndCost: true,
    countLabel: "סבבי הגהה כלולים",
    countPlaceholder: "1",
    definitionLabel: "מה נחשב 'הגהה' לעומת תרגום מחדש?",
    definitionPlaceholder: "תיקון שגיאה, שינוי ניסוח — כלול. תרגום מחדש של פרק שלם, שינוי שפת היעד — לא כלול.",
  },
  interiorDesigner: {
    stepTitle: "כמה סבבי תכנון כלולים?",
    stepSubtitle: "שינויים בתוכנית העיצוב לאחר אישור — מי מחליט ומה עולה?",
    showCountAndCost: true,
    countLabel: "סבבי תכנון כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'שינוי קטן' לעומת 'שינוי מהותי'?",
    definitionPlaceholder: "שינוי צבע, חומר, ריהוט בודד — כלול. שינוי פריסה מלאה, ביטול חדר, שינוי סגנון כללי — יחויב בנפרד.",
  },
  architect: {
    stepTitle: "כמה סבבי שרטוט ותיקון כלולים?",
    stepSubtitle: "שינויים בתוכניות לאחר אישור — מה כלול ומה לא?",
    showCountAndCost: true,
    countLabel: "סבבי תיקון שרטוטים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'שינוי קטן' לעומת 'שינוי מהותי'?",
    definitionPlaceholder: "שינוי מידה, פתח, חלון — כלול. שינוי קונסטרוקציה, הוספת קומה, שינוי ייעוד — יחויב בנפרד.",
  },
  musician: {
    stepTitle: "כמה גרסאות ותיקונים כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "גרסאות / תיקונים כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'תיקון' לעומת יצירה מחדש?",
    definitionPlaceholder: "שינוי טמפו, נגינה, מיקסינג — כלול. שינוי ז׳אנר, הלחנה מחדש, שינוי מהותי בסגנון — לא כלול.",
  },
  beauty: {
    stepTitle: "אישור התוצאה",
    stepSubtitle: "מתי הטיפול נחשב מוכן — ומה קורה אם הלקוחה רוצה שינוי לאחר הסיום?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מתי הטיפול נחשב מאושר ומוכן?",
    definitionPlaceholder: "שינויים ניתן לבצע במהלך הטיפול בלבד. לאחר סיום הטיפול ועזיבת המקום — התוצאה נחשבת מאושרת ואין החזרים.",
  },
  privateChef: {
    stepTitle: "שינויים בתפריט",
    stepSubtitle: "עד מתי ניתן לשנות את התפריט — ומה קורה עם בקשות ברגע האחרון?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "עד מתי ניתן לשנות את התפריט?",
    definitionPlaceholder: "שינויים בתפריט מתקבלים עד 72 שעות לפני האירוע. בקשות מאוחרות יותר — לפי שיקול הדעת ובהתאם לזמינות חומרים.",
  },
  coach: {
    stepTitle: "פגישות שלא נוצלו",
    stepSubtitle: "מה קורה עם פגישות שהלקוח לא ניצל? הגדרה ברורה מונעת ויכוחים.",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מה קורה אם הלקוח לא ניצל את כל הפגישות בחבילה?",
    definitionPlaceholder: "פגישות שלא נוצלו עד תום תקופת ההתקשרות — אינן ניתנות לפדיון, זיכוי כספי, או העברה לחבילה הבאה.",
  },
  sportsInstructor: {
    stepTitle: "אימונים שלא נוצלו",
    stepSubtitle: "מה קורה עם אימונים שהמתאמן ביטל או לא הגיע אליהם?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מה קורה אם המתאמן לא ניצל את כל האימונים בחבילה?",
    definitionPlaceholder: "אימונים שבוטלו פחות מ-24 שעות מראש, או שלא נוצלו עד תום תקופת החבילה — אינם ניתנים לזיכוי.",
  },
  tutor: {
    stepTitle: "שיעורים שלא נוצלו",
    stepSubtitle: "מה קורה עם שיעורים שהתלמיד ביטל או לא הגיע אליהם?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מה קורה אם התלמיד לא ניצל את כל השיעורים בחבילה?",
    definitionPlaceholder: "שיעורים שבוטלו ללא הודעה של 4+ שעות מראש, או שלא נוצלו עד סוף תקופת הלמידה — אינם ניתנים לזיכוי.",
  },
  psychologist: {
    stepTitle: "פגישות שלא נוצלו",
    stepSubtitle: "מה קורה עם פגישות שהמטופל ביטל ברגע האחרון או לא הגיע?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מה קורה אם המטופל לא ניצל את כל הפגישות?",
    definitionPlaceholder: "פגישות שבוטלו פחות מ-24 שעות מראש, או שלא נוצלו עד תום תקופת הטיפול המוסכמת — אינן ניתנות לזיכוי.",
  },
  kindergarten: {
    stepTitle: "עזיבה מוקדמת ושינויים בלוח השנה",
    stepSubtitle: "מה קורה אם ההורים מחליטים להוציא את הילד לפני סוף השנה?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מה מדיניות העזיבה המוקדמת?",
    definitionPlaceholder: "עזיבה מוקדמת מחייבת הודעה של 30 יום מראש בכתב. לא יינתן החזר על חודשים ששולמו או שהוכנו מראש.",
  },
  gardener: {
    stepTitle: "עבודות נוספות שלא היו בהסכם",
    stepSubtitle: "כשמגלים שצריך יותר — מה קורה ומי מחליט?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מה קורה כשמתגלה עבודה נוספת שלא הייתה בהסכם?",
    definitionPlaceholder: "עבודות נוספות שלא נכללו בהצעה המקורית — יחויבו בנפרד לפי הצעת מחיר שתאושר מראש בכתב.",
  },
  renovation: {
    stepTitle: "שינויים בהיקף הפרויקט",
    stepSubtitle: "שינוי בזמן עבודה = עלות נוספת. חייב להיות מוגדר בחוזה.",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "כיצד מטפלים בבקשות שינוי לאחר תחילת העבודה?",
    definitionPlaceholder: "כל שינוי בהיקף שהוסכם יגרור הצעת מחיר נוספת שתאושר בכתב לפני ביצוע. לא יבוצעו שינויים ללא אישור כתוב.",
  },
  producer: {
    stepTitle: "שינויים בתוכנית ההפקה",
    stepSubtitle: "שינויים לאחר אישור תוכנית ההפקה — מה כלול ומה יחויב בנפרד?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "עד מתי ניתן לשנות את תוכנית ההפקה?",
    definitionPlaceholder: "שינויים מתקבלים עד 7 ימים לפני האירוע. שינויים מאוחרים יותר — בעלות נוספת ולפי שיקול הדעת.",
  },
  eventManager: {
    stepTitle: "שינויים בתוכנית האירוע",
    stepSubtitle: "שינויים לאחר אישור תוכנית האירוע — מה כלול ומה לא?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "עד מתי ניתן לשנות את תוכנית האירוע?",
    definitionPlaceholder: "שינויים בתוכנית האירוע מתקבלים עד 14 יום לפניו. שינויים מאוחרים — לפי שיקול הדעת ובהתאם לזמינות ספקים.",
  },
  hairdresser: {
    stepTitle: "אישור התוצאה",
    stepSubtitle: "מתי העיצוב נחשב מוכן ומה קורה אם הלקוח רוצה שינוי?",
    showCountAndCost: false,
    countLabel: "",
    countPlaceholder: "",
    definitionLabel: "מתי העיצוב נחשב מאושר?",
    definitionPlaceholder: "שינויים ניתן לבקש במהלך השירות בלבד. לאחר סיום ועזיבת המקום — העיצוב נחשב מאושר ואין החזרים.",
  },
  other: {
    stepTitle: "כמה תיקונים / שינויים כלולים?",
    stepSubtitle: "בלי הגדרה ברורה — כל לקוח יפרש 'תיקון' אחרת.",
    showCountAndCost: true,
    countLabel: "תיקונים / שינויים כלולים",
    countPlaceholder: "2",
    definitionLabel: "מה נחשב 'תיקון' לעומת עבודה חדשה?",
    definitionPlaceholder: "שינוי בתוצר קיים — כלול. עבודה חדשה, תוספות, שינוי כיוון מהותי — לא כלול.",
  },
};

const LATE_PAYMENT_CONFIG: Record<Profession, string> = {
  photographer:     "תשלום שלא יתקבל תוך 7 ימים ממועד החשבונית — מסירת הקבצים הסופיים תעוכב עד לקבלתו.",
  designer:         "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — העבודה מוקפאת עד לקבלתו.",
  writer:           "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — העבודה מוקפאת עד לקבלתו.",
  consultant:       "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — הפגישות הבאות יושהו עד לסילוק החוב.",
  developer:        "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — הפיתוח מוקפא וגישת הלקוח למערכת מושעית עד לקבלתו.",
  videoEditor:      "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — מסירת הסרטון הסופי תעוכב עד לקבלתו.",
  socialMedia:      "תשלום חודשי שלא יתקבל עד ה-1 בחודש — הפרסום מוקפא עד לסילוק החוב.",
  coach:            "תשלום שלא יתקבל תוך 7 ימים — הפגישות הבאות יושהו עד לסילוק החוב.",
  sportsInstructor: "תשלום שלא יתקבל תוך 7 ימים — האימונים הבאים יושהו עד לסילוק החוב.",
  tutor:            "תשלום שלא יתקבל תוך 7 ימים — השיעורים הבאים יושהו עד לסילוק החוב.",
  psychologist:     "תשלום שלא יתקבל תוך 7 ימים — הפגישות הבאות יושהו עד לסילוק החוב.",
  interiorDesigner: "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — העבודה מוקפאת עד לקבלתו.",
  architect:        "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — התכנון מוקפא ולא יוגשו מסמכים לרשויות עד לקבלתו.",
  musician:         "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — מסירת הקבצים תעוכב עד לקבלתו.",
  translator:       "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — מסירת התרגום תעוכב עד לקבלתו.",
  beauty:           "תשלום שלא יתקבל תוך 7 ימים מיום האירוע — יחויבו דמי פיגורים ויינקטו הליכי גבייה.",
  privateChef:      "תשלום שלא יתקבל תוך 7 ימים מיום הארוחה — יחויבו דמי פיגורים ויינקטו הליכי גבייה.",
  kindergarten:     "תשלום חודשי שלא יתקבל עד ה-1 בחודש — קבלת הילד לגן תושעה עד לסילוק החוב.",
  gardener:         "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — הביקורים הבאים יושהו עד לסילוק החוב.",
  renovation:       "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — העבודות יעצרו עד לקבלתו.",
  producer:         "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — ההפקה תעצור עד לקבלתו.",
  eventManager:     "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — תיאום הספקים יופסק עד לקבלתו.",
  hairdresser:      "תשלום שלא יתקבל ביום השירות — לא יינתן שירות נוסף עד לסילוק החוב.",
  other:            "תשלום שלא יתקבל תוך 7 ימים ממועד החיוב — העבודה מוקפאת עד לקבלתו.",
};

const STEP_LABELS = [
  "מקצוע",
  "פרטי הצדדים",
  "תיאור הפרויקט",
  "תשלום",
  "תאריכים ותיקונים",
  "ביטול ובעלות",
  "הגנה ובקשות",
  "סיכום ותשלום",
];

const initialData: FormData = {
  profession: null,
  freelancerName: "",
  freelancerId: "",
  freelancerCity: "",
  clientName: "",
  clientId: "",
  clientEmail: "",
  projectDescription: "",
  projectExclusions: "",
  totalPrice: "",
  depositPercent: "",
  vat: null,
  paymentTiming: "",
  paymentMethod: "",
  latePayment: "",
  startDate: "",
  deliveryDate: "",
  delayConditions: "",
  freelancerDelay: "",
  revisionsIncluded: "",
  revisionCost: "",
  revisionDefinition: "",
  clientCancellation: "",
  freelancerCancellation: "",
  ownership: null,
  protectionAnswer: "",
  specialRequests: "",
  deliveryEmail: "",
};

function isStepValid(step: number, data: FormData): boolean {
  switch (step) {
    case 1: return !!data.profession;
    case 2: return !!(data.freelancerName.trim());
    case 3: return !!(data.projectDescription.trim().length > 5 && data.projectExclusions.trim().length > 2);
    case 4: return !!(data.totalPrice && data.vat && data.paymentTiming.trim() && data.latePayment.trim());
    case 5: {
      const startOptional = data.profession === "beauty" || data.profession === "privateChef" || data.profession === "hairdresser";
      return !!((startOptional || data.startDate) && data.deliveryDate);
    }
    case 6: return true;
    case 7: return true;
    case 8: return !!(data.deliveryEmail.trim());
    default: return false;
  }
}

// Shared styles
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1.5px solid #E2E8F0",
  borderRadius: 10,
  fontSize: 15,
  fontFamily: "inherit",
  color: "#0F172A",
  background: "white",
  outline: "none",
  direction: "rtl",
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "#374151",
  marginBottom: 6,
  display: "block",
};

const fieldGroupStyle: React.CSSProperties = {
  marginBottom: 20,
};

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof FormData, value: string | null) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && isStepValid(currentStep, data)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractData: data }),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
    } catch {
      alert("שגיאה בחיבור לתשלום. נסה שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const profession = data.profession;
  const protectionConfig = profession ? PROTECTION_QUESTIONS[profession] : null;
  const projectExamples = profession ? PROJECT_EXAMPLES[profession] : PROJECT_EXAMPLES["other"];
  const datesConfig = profession ? DATES_CONFIG[profession] : DATES_CONFIG["other"];
  const delaysConfig = profession ? DELAYS_CONFIG[profession] : DELAYS_CONFIG["other"];
  const revisionsConfig = profession ? REVISIONS_CONFIG[profession] : REVISIONS_CONFIG["other"];
  const latePaymentPlaceholder = profession ? LATE_PAYMENT_CONFIG[profession] : LATE_PAYMENT_CONFIG["other"];
  const progress = (currentStep / TOTAL_STEPS) * 100;
  const valid = isStepValid(currentStep, data);

  // Reusable "use suggestion" button — shown only when field is empty
  const UseSuggestion = ({ field, value }: { field: keyof FormData; value: string }) =>
    !data[field] ? (
      <button
        onClick={() => update(field, value)}
        style={{ background: "none", border: "none", color: "#2563EB", fontSize: 12, cursor: "pointer", padding: "4px 0", textDecoration: "underline", display: "block", marginTop: 4 }}
      >
        ← השתמש בהצעה
      </button>
    ) : null;

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC", color: "#0F172A" }}>

      {/* NAV */}
      <nav style={{ background: "rgba(15,31,61,0.97)", height: 56, display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: "white" }}>Signly<span style={{ color: "#60A5FA" }}>.</span></span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>🔒 מאובטח</span>
      </nav>

      {/* PROGRESS */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "14px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#64748B" }}>{STEP_LABELS[currentStep - 1]}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB" }}>שלב {currentStep} מתוך {TOTAL_STEPS}</span>
          </div>
          <div style={{ height: 5, background: "#E2E8F0", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #2563EB, #7C3AED)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      {/* STEP CONTENT */}
      <div className="mob-step-outer" style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px 120px" }}>
        <div className="mob-step-card" style={{ background: "white", borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "40px 36px", width: "100%", maxWidth: 600 }}>

          {/* GLOBAL OPTIONAL NOTE — shown on all steps except 1 and 8 */}
          {currentStep > 1 && currentStep < 8 && (
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 14px", marginBottom: 24, fontSize: 13, color: "#64748B" }}>
              💡 <strong>לא חייבים למלא הכל עכשיו.</strong> מה שתשאירו ריק — יופיע בחוזה כמקום ריק למילוי ידני לפני החתימה.
            </div>
          )}

          {/* STEP 1 — PROFESSION */}
          {currentStep === 1 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 1 מתוך 8</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>מה המקצוע שלך?</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>זה קובע אילו שאלות הגנה ייכנסו לחוזה שלך.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                {PROFESSIONS.map(({ id, label }) => {
                  const selected = data.profession === id;
                  return (
                    <button
                      key={id}
                      onClick={() => update("profession", id)}
                      style={{
                        border: `1.5px solid ${selected ? "#2563EB" : "#E2E8F0"}`,
                        background: selected ? "#EFF6FF" : "white",
                        borderRadius: 8,
                        padding: "12px 16px",
                        cursor: "pointer",
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: selected ? 700 : 500, color: selected ? "#2563EB" : "#374151" }}>{label}</span>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: `2px solid ${selected ? "#2563EB" : "#CBD5E1"}`,
                        background: selected ? "#2563EB" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {selected && <span style={{ color: "white", fontSize: 10, lineHeight: 1 }}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* STEP 2 — PARTIES */}
          {currentStep === 2 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 2 מתוך 8</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>פרטי הצדדים</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>בלי פרטי זיהוי, החוזה קשה לאכיפה — עם הפרטים, הוא מסמך משפטי לכל דבר.</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 12 }}>הפרטים שלך</p>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>שמך המלא</label>
                <input style={inputStyle} placeholder="לדוגמה: נועה כהן" value={data.freelancerName} onChange={(e) => update("freelancerName", e.target.value)} />
              </div>
              <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>ת.ז. / ח.פ.</label>
                  <input style={inputStyle} placeholder="123456789" value={data.freelancerId} onChange={(e) => update("freelancerId", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>עיר מגורים</label>
                  <input style={inputStyle} placeholder="תל אביב" value={data.freelancerCity} onChange={(e) => update("freelancerCity", e.target.value)} />
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", marginBottom: 12 }}>פרטי הלקוח</p>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>שם הלקוח / החברה</label>
                <input style={inputStyle} placeholder="לדוגמה: סטודיו ABC בע&quot;מ" value={data.clientName} onChange={(e) => update("clientName", e.target.value)} />
              </div>
              <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>ת.ז. / ח.פ. לקוח</label>
                  <input style={inputStyle} placeholder="987654321" value={data.clientId} onChange={(e) => update("clientId", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>מייל לקוח</label>
                  <input style={inputStyle} type="email" placeholder="client@email.com" value={data.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* STEP 3 — PROJECT */}
          {currentStep === 3 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 3 מתוך 8</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>מה כלול בפרויקט?</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>מה שלא כתוב בחוזה — הלקוח יכול לטעון שסיכמתם עליו.</p>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>תיאור הפרויקט — מה כלול?</label>
                <textarea style={{ ...inputStyle, minHeight: 100 }} placeholder={`לדוגמה: ${projectExamples.description}`} value={data.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>מה לא כלול?</label>
                <span style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>ככל שתהיה יותר ספציפי — כך פחות אי-הבנות בהמשך</span>
                <textarea style={{ ...inputStyle, minHeight: 80 }} placeholder={`לדוגמה: ${projectExamples.exclusions}`} value={data.projectExclusions} onChange={(e) => update("projectExclusions", e.target.value)} />
              </div>
            </>
          )}

          {/* STEP 4 — PAYMENT */}
          {currentStep === 4 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 4 מתוך 8</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>תשלום ותנאים</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>מה שמוגדר בכתב — לא יכול להיות שנוי במחלוקת.</p>
              <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>מחיר כולל (₪)</label>
                  <input style={inputStyle} type="number" placeholder="5000" value={data.totalPrice} onChange={(e) => update("totalPrice", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>מקדמה (%)</label>
                  <input style={inputStyle} type="number" placeholder="30" value={data.depositPercent} onChange={(e) => update("depositPercent", e.target.value)} />
                </div>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>מע&quot;מ</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {([
                    { val: "plus_vat", title: "בתוספת מע\"מ", desc: "המחיר + 18% מע\"מ" },
                    { val: "incl_vat", title: "כולל מע\"מ", desc: "המחיר כבר כולל את המע\"מ" },
                    { val: "exempt", title: "פטור ממע\"מ (עוסק פטור)", desc: "הסכום לא חייב במע\"מ" },
                  ] as { val: VatType; title: string; desc: string }[]).map(({ val, title, desc }) => (
                    <div
                      key={val}
                      onClick={() => update("vat", val)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: `1.5px solid ${data.vat === val ? "#2563EB" : "#E2E8F0"}`, borderRadius: 10, cursor: "pointer", background: data.vat === val ? "#EFF6FF" : "white" }}
                    >
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${data.vat === val ? "#2563EB" : "#CBD5E1"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {data.vat === val && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB" }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{title}</div>
                        <div style={{ fontSize: 12, color: "#64748B" }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>מתי מתקבלת יתרת התשלום?</label>
                <input style={inputStyle} placeholder="עם מסירת הקבצים הסופיים" value={data.paymentTiming} onChange={(e) => update("paymentTiming", e.target.value)} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>אמצעי תשלום מקובלים</label>
                <input style={inputStyle} placeholder="העברה בנקאית / ביט" value={data.paymentMethod} onChange={(e) => update("paymentMethod", e.target.value)} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>מה קורה אם הלקוח לא שילם בזמן?</label>
                <span style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>בלי תנאים ברורים, קשה לדרוש עמידה בלוח הזמנים</span>
                <input style={inputStyle} placeholder={latePaymentPlaceholder} value={data.latePayment} onChange={(e) => update("latePayment", e.target.value)} />
                <UseSuggestion field="latePayment" value={latePaymentPlaceholder} />
              </div>
            </>
          )}

          {/* STEP 5 — DATES + REVISIONS */}
          {currentStep === 5 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 5 מתוך 8</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>מתי ולמתי?</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>תאריך מסירה שלא כתוב בחוזה — לא מחייב אף אחד.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>{datesConfig.startLabel}</label>
                  <input style={inputStyle} type="date" value={data.startDate} onChange={(e) => update("startDate", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>{datesConfig.endLabel}</label>
                  <input style={inputStyle} type="date" value={data.deliveryDate} onChange={(e) => update("deliveryDate", e.target.value)} />
                </div>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>{delaysConfig.clientLabel}</label>
                <span style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>{delaysConfig.clientHint}</span>
                <input style={inputStyle} placeholder={delaysConfig.clientPlaceholder} value={data.delayConditions} onChange={(e) => update("delayConditions", e.target.value)} />
                <UseSuggestion field="delayConditions" value={delaysConfig.clientPlaceholder} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>{delaysConfig.freelancerLabel}</label>
                <span style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>{delaysConfig.freelancerHint}</span>
                <input style={inputStyle} placeholder={delaysConfig.freelancerPlaceholder} value={data.freelancerDelay} onChange={(e) => update("freelancerDelay", e.target.value)} />
                <UseSuggestion field="freelancerDelay" value={delaysConfig.freelancerPlaceholder} />
              </div>

              <div style={{ borderTop: "1px solid #E2E8F0", margin: "28px 0 24px" }} />
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{revisionsConfig.stepTitle}</h3>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 8 }}>{revisionsConfig.stepSubtitle}</p>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>לא חובה — אפשר לדלג.</p>
              {revisionsConfig.showCountAndCost && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>{revisionsConfig.countLabel}</label>
                    <input style={inputStyle} type="number" placeholder={revisionsConfig.countPlaceholder} value={data.revisionsIncluded} onChange={(e) => update("revisionsIncluded", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>עלות נוספת (₪)</label>
                    <input style={inputStyle} type="number" placeholder="200" value={data.revisionCost} onChange={(e) => update("revisionCost", e.target.value)} />
                  </div>
                </div>
              )}
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>{revisionsConfig.definitionLabel}</label>
                <input style={inputStyle} placeholder={revisionsConfig.definitionPlaceholder} value={data.revisionDefinition} onChange={(e) => update("revisionDefinition", e.target.value)} />
                <UseSuggestion field="revisionDefinition" value={revisionsConfig.definitionPlaceholder} />
              </div>
            </>
          )}

          {/* STEP 6 — CANCELLATION + OWNERSHIP */}
          {currentStep === 6 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 6 מתוך 8</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>מה קורה בביטול?</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 12 }}>לא נעים לחשוב על זה — אבל עדיף לסכם מראש מאשר להתווכח אחרי.</p>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>אם לא רלוונטי — אפשר לדלג.</p>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>ביטול מצד הלקוח — מה קורה?</label>
                <input style={inputStyle} placeholder="המקדמה אינה מוחזרת. עבודה שבוצעה תחויב לפי יחס שעות." value={data.clientCancellation} onChange={(e) => update("clientCancellation", e.target.value)} />
                <UseSuggestion field="clientCancellation" value="המקדמה אינה מוחזרת. עבודה שבוצעה תחויב לפי יחס שעות." />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>ביטול מצדך — מה קורה?</label>
                <input style={inputStyle} placeholder="החזר מלא של כל סכום ששולם, תוך 7 ימי עסקים." value={data.freelancerCancellation} onChange={(e) => update("freelancerCancellation", e.target.value)} />
                <UseSuggestion field="freelancerCancellation" value="החזר מלא של כל סכום ששולם, תוך 7 ימי עסקים." />
              </div>

              <div style={{ borderTop: "1px solid #E2E8F0", margin: "28px 0 24px" }} />
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>בעלות על העבודה</h3>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 8 }}>שאלה שרוב הפרילנסרים לא מגדירים — עד שהיא הופכת לבעיה.</p>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>אם לא רלוונטי (למשל: שירות אישי) — אפשר לדלג.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {([
                  { val: "full", title: "העברת בעלות מלאה", desc: "הלקוח מקבל את כל הזכויות לאחר תשלום מלא. את/ה מוותר/ת על הבעלות." },
                  { val: "license", title: "רישיון שימוש (לא העברת בעלות)", desc: "הלקוח יכול להשתמש בעבודה לצרכי העסק שלו, אך לא למכור, להפיץ, או לשנות ללא אישור." },
                  { val: "afterpayment", title: "בעלות עוברת רק לאחר תשלום מלא", desc: "עד לקבלת התשלום המלא — הבעלות נשארת אצלך. הלקוח לא יכול להשתמש בעבודה לפני כן." },
                ] as { val: OwnershipType; title: string; desc: string }[]).map(({ val, title, desc }) => (
                  <div
                    key={val!}
                    onClick={() => update("ownership", val)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 16px", border: `1.5px solid ${data.ownership === val ? "#2563EB" : "#E2E8F0"}`, borderRadius: 12, cursor: "pointer", background: data.ownership === val ? "#EFF6FF" : "white" }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${data.ownership === val ? "#2563EB" : "#CBD5E1"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      {data.ownership === val && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#2563EB" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 7 — PROTECTION + SPECIAL REQUESTS */}
          {currentStep === 7 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 7 מתוך 8 — אופציונלי</span>
              {protectionConfig && (
                <>
                  <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{protectionConfig.question}</h2>
                  <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12, marginBottom: 24 }}>
                    <span style={{ fontSize: 20 }}>🛡️</span>
                    <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>{protectionConfig.hint}</p>
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>הגדר/י את התנאי בחוזה</label>
                    <textarea
                      style={{ ...inputStyle, minHeight: 100 }}
                      placeholder={protectionConfig.placeholder}
                      value={data.protectionAnswer}
                      onChange={(e) => update("protectionAnswer", e.target.value)}
                    />
                    <UseSuggestion field="protectionAnswer" value={protectionConfig.placeholder} />
                  </div>
                  <div style={{ borderTop: "1px solid #E2E8F0", margin: "28px 0 24px" }} />
                </>
              )}
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>יש סעיפים שחשוב לך להוסיף?</h3>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>כתוב/י בשפה שלך — המערכת תפענח ותהפוך לסעיף משפטי מנוסח. לא חובה.</p>
              <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 20 }}>💡</span>
                <p style={{ fontSize: 13, color: "#166534", lineHeight: 1.6 }}>
                  <strong>מה אפשר לבקש?</strong> הגנה במקרה מלחמה / כוח עליון, מה קורה אם הקבצים נמחקים, סעיף סודיות, אי-תחרות, זיכוי פרסומי, שימוש בעבודה בתיק העבודות שלי — ועוד.
                </p>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>הבקשות המיוחדות שלך</label>
                <span style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>כל בקשה בשורה נפרדת, בשפה שלך</span>
                <textarea
                  style={{ ...inputStyle, minHeight: 120 }}
                  placeholder={"לדוגמה:\n- אני רוצה סעיף כוח עליון — מלחמה, אסון טבע\n- אם הקבצים יאבדו בכשל טכני שאינו באשמתי — לא אחראית\n- אני רוצה לשמור את הזכות להציג את העבודה בתיק שלי"}
                  value={data.specialRequests}
                  onChange={(e) => update("specialRequests", e.target.value)}
                />
              </div>
            </>
          )}

          {/* STEP 8 — SUMMARY + PAYMENT */}
          {currentStep === 8 && (
            <>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 10px", borderRadius: 99, marginBottom: 14, display: "inline-block" }}>שלב 8 מתוך 8 — סיכום ותשלום</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>הכל נראה טוב?</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>בדוק/י את הפרטים לפני התשלום. לאחר התשלום תקבל/י את החוזה תוך דקות.</p>

              {/* Summary */}
              {[
                { title: "פרטי הצדדים", rows: [
                  ["פרילנסר/ית", data.freelancerName],
                  ["ת.ז.", data.freelancerId],
                  ["לקוח", data.clientName],
                  ["ת.ז./ח.פ. לקוח", data.clientId],
                ]},
                { title: "הפרויקט", rows: [
                  ["תיאור", data.projectDescription],
                  ["מחיר", `${data.totalPrice} ₪`],
                  ["מע\"מ", data.vat === "plus_vat" ? "בתוספת מע\"מ" : data.vat === "incl_vat" ? "כולל מע\"מ" : "פטור"],
                  ["מסירה", data.deliveryDate],
                  ["תיקונים", data.revisionsIncluded ? `${data.revisionsIncluded} תיקונים כלולים` : ""],
                  ["בעלות", data.ownership === "full" ? "העברה מלאה" : data.ownership === "license" ? "רישיון שימוש" : data.ownership === "afterpayment" ? "לאחר תשלום מלא" : ""],
                ]},
              ].map(({ title, rows }) => (
                <div key={title} style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#64748B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</p>
                  {rows.map(([key, val]) => val && (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: "1px solid #F1F5F9" }}>
                      <span style={{ color: "#64748B" }}>{key}</span>
                      <span style={{ fontWeight: 600, color: "#0F172A", maxWidth: "60%", textAlign: "left" }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* CONTRACT PREVIEW */}
              <div style={{ marginBottom: 24, borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #C9D0DC" }}>

                {/* Thin top bar */}
                <div style={{ background: "#1E3A5F", padding: "7px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: 1 }}>תצוגה מקדימה</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>3 סעיפים מתוך ~15</span>
                </div>

                {/* Paper */}
                <div style={{ background: "#FEFCF8", position: "relative", direction: "rtl" }}>

                  {/* Watermark */}
                  <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%) rotate(-30deg)", fontSize: 64, fontWeight: 900, color: "rgba(37,99,235,0.05)", whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none", letterSpacing: 10 }}>SIGNLY</div>

                  <div style={{ padding: "36px 40px 0", fontFamily: "'Times New Roman', 'David', serif" }}>

                    {/* Formal title block */}
                    <div style={{ textAlign: "center", marginBottom: 28, paddingBottom: 20, borderBottom: "2px solid #0F172A" }}>
                      <p style={{ fontSize: 11, letterSpacing: 4, color: "#94A3B8", marginBottom: 6, textTransform: "uppercase" }}>הסכם</p>
                      <p style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", letterSpacing: 1, marginBottom: 6 }}>הסכם שירות פרילנס</p>
                      <p style={{ fontSize: 11, color: "#94A3B8" }}>נערך ביום {new Date().toLocaleDateString("he-IL")}</p>
                    </div>

                    {/* Clause 1 — Parties */}
                    <div style={{ marginBottom: 22 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>1. הצדדים להסכם</p>
                      <p style={{ fontSize: 13, lineHeight: 2, color: "#374151" }}>
                        הסכם זה נכרת בין <u>{data.freelancerName || "_______________"}</u>
                        {data.freelancerId ? `, ת.ז. ${data.freelancerId}` : ""}
                        {data.freelancerCity ? `, ${data.freelancerCity}` : ""}
                        {" "}(להלן: <strong>&quot;נותן השירות&quot;</strong>), לבין <u>{data.clientName || "_______________"}</u>
                        {data.clientId ? `, ח.פ./ת.ז. ${data.clientId}` : ""}
                        {" "}(להלן: <strong>&quot;הלקוח&quot;</strong>).
                      </p>
                    </div>

                    {/* Clause 2 — Scope */}
                    <div style={{ marginBottom: 22 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>2. היקף השירות</p>
                      <p style={{ fontSize: 13, lineHeight: 2, color: "#374151" }}>
                        {data.projectDescription
                          ? <>נותן השירות מתחייב לספק ללקוח את השירות הבא: {data.projectDescription}.{data.projectExclusions ? ` השירות אינו כולל: ${data.projectExclusions}.` : ""}</>
                          : "נותן השירות מתחייב לספק ללקוח את השירות כפי שפורט בנספח א׳ להסכם זה, במועד ובאיכות שנקבעו."
                        }
                      </p>
                    </div>

                    {/* Clause 3 — Payment */}
                    <div style={{ marginBottom: 22 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>3. תמורה ותנאי תשלום</p>
                      <p style={{ fontSize: 13, lineHeight: 2, color: "#374151" }}>
                        {data.totalPrice
                          ? <>התמורה הכוללת עבור השירות הינה <strong>₪{data.totalPrice}</strong>{data.vat === "plus_vat" ? " בתוספת מע״מ כחוק" : data.vat === "incl_vat" ? " כולל מע״מ" : " (עוסק פטור ממע״מ)"}. {data.depositPercent ? `מקדמה בשיעור ${data.depositPercent}% תשולם עם חתימת ההסכם. ` : ""}{data.paymentTiming ? `יתרת התשלום תשולם ${data.paymentTiming}.` : ""}</>
                          : "התמורה תשולם בהתאם לתנאים שנקבעו בין הצדדים."
                        }
                      </p>
                    </div>

                    {/* BLURRED locked clauses */}
                    <div style={{ filter: "blur(3.5px)", userSelect: "none", pointerEvents: "none", opacity: 0.55 }}>
                      <div style={{ marginBottom: 22 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>4. מועד מסירה ולוח זמנים</p>
                        <p style={{ fontSize: 13, lineHeight: 2, color: "#374151" }}>
                          המסירה תתבצע עד לתאריך {data.deliveryDate || "___/___/______"}. במקרה של עיכוב מצד הלקוח — {data.delayConditions || "מועד המסירה יידחה בהתאמה ובהודעה מראש."}
                        </p>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>5. ביטול הסכם</p>
                        <p style={{ fontSize: 13, lineHeight: 2, color: "#374151" }}>
                          {data.clientCancellation || "במקרה של ביטול מצד הלקוח — המקדמה אינה מוחזרת ועבודה שבוצעה תחויב לפי יחס."} {data.freelancerCancellation || "ביטול מצד נותן השירות — החזר מלא תוך 7 ימי עסקים."}
                        </p>
                      </div>
                    </div>

                    {/* Gradient fade */}
                    <div style={{ height: 100, background: "linear-gradient(to bottom, transparent, #FEFCF8)", marginRight: -40, marginLeft: -40, position: "relative", zIndex: 2 }} />
                  </div>

                  {/* Lock footer */}
                  <div style={{ borderTop: "1px dashed #D1D5DB", padding: "14px 20px", textAlign: "center", background: "#F8FAFC" }}>
                    <span style={{ fontSize: 12, color: "#64748B" }}>🔒 סעיפי עיכובים · ביטול · בעלות · הגנה מקצועית · סודיות — יחשפו לאחר התשלום</span>
                  </div>
                </div>
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle}>לאיזה מייל לשלוח את החוזה?</label>
                <span style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>תקבל/י PDF מוכן לחתימה תוך כמה דקות</span>
                <input style={inputStyle} type="email" placeholder="your@email.com" value={data.deliveryEmail} onChange={(e) => update("deliveryEmail", e.target.value)} />
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
                <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer", flexShrink: 0 }} />
                <label htmlFor="terms" style={{ fontSize: 13, color: "#64748B", cursor: "pointer", lineHeight: 1.5 }}>
                  קראתי ואני מסכים/ה ל<a href="/terms" style={{ color: "#2563EB" }}>תנאי השימוש</a> ו<a href="/privacy" style={{ color: "#2563EB" }}>מדיניות הפרטיות</a>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>חוזה פרילנס מקצועי</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#2563EB" }}>₪97</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!agreedToTerms || !data.deliveryEmail.trim() || isSubmitting}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: 17,
                  fontWeight: 700,
                  background: agreedToTerms && data.deliveryEmail.trim() ? "#2563EB" : "#CBD5E1",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  cursor: agreedToTerms && data.deliveryEmail.trim() ? "pointer" : "not-allowed",
                  transition: "background 0.2s",
                }}
              >
                {isSubmitting ? "מעביר לתשלום..." : "לתשלום מאובטח – ₪97 →"}
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginTop: 10 }}>
                🔒 מאובטח על ידי Stripe | תקבל/י את החוזה תוך דקות
              </p>
            </>
          )}

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #E2E8F0", zIndex: 50 }}>
        {!valid && currentStep < TOTAL_STEPS && (
          <div style={{ background: "#FFF7ED", borderBottom: "1px solid #FED7AA", padding: "8px 24px", textAlign: "center", fontSize: 13, color: "#92400E" }}>
            {currentStep === 1 && "בחרי מקצוע כדי להמשיך"}
            {currentStep === 2 && "הכניסי לפחות את שמך כדי להמשיך"}
            {currentStep === 3 && "תארי את הפרויקט ומה לא כלול בו"}
            {currentStep === 4 && "מלאי מחיר, בחרי אפשרות מע\"מ, ותנאי תשלום מאוחר"}
            {currentStep === 5 && "בחרי לפחות תאריך מסירה / סיום"}
            {currentStep === 8 && "הכניסי מייל לקבלת החוזה ואשרי את התנאים"}
          </div>
        )}
        <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={prevStep}
          style={{ visibility: currentStep > 1 ? "visible" : "hidden", padding: "10px 20px", fontSize: 15, fontWeight: 600, background: "transparent", border: "1.5px solid #E2E8F0", borderRadius: 8, cursor: "pointer", color: "#374151" }}
        >
          ← חזרה
        </button>
        {currentStep < TOTAL_STEPS ? (
          <button
            onClick={nextStep}
            disabled={!valid}
            style={{ padding: "12px 32px", fontSize: 16, fontWeight: 700, background: valid ? "#2563EB" : "#CBD5E1", color: "white", border: "none", borderRadius: 8, cursor: valid ? "pointer" : "not-allowed", transition: "background 0.2s" }}
          >
            המשך
          </button>
        ) : null}
        </div>
      </div>

    </div>
  );
}
