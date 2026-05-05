"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ChatQuestion from "@/components/ChatQuestion";

interface Question {
  key: string;
  question: string;
  placeholder?: string;
  quickOptions?: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    key: "name",
    question: "מה שמך המלא או שם העסק שלך?",
    placeholder: "לדוגמה: שירה לוי עיצוב גרפי",
  },
  {
    key: "client",
    question: "מה שם הלקוח?",
    placeholder: "שם פרטי, שם חברה, או שם עסק",
  },
  {
    key: "service",
    question: "מה השירות שאתה מספק?",
    placeholder: "לדוגמה: עיצוב לוגו ומיתוג, פיתוח אתר, כתיבת תוכן...",
  },
  {
    key: "amount",
    question: "מה הסכום הכולל לפרויקט?",
    placeholder: "לדוגמה: 5,000 ₪",
    quickOptions: [
      { label: "עד 2,000 ₪", value: "עד 2,000 ₪" },
      { label: "2,000–5,000 ₪", value: "2,000–5,000 ₪" },
      { label: "5,000–15,000 ₪", value: "5,000–15,000 ₪" },
      { label: "מעל 15,000 ₪", value: "מעל 15,000 ₪" },
    ],
  },
  {
    key: "paymentTerms",
    question: "מה תנאי התשלום?",
    placeholder: "לדוגמה: 50% מקדמה, 50% בסיום",
    quickOptions: [
      { label: "תשלום מלא מראש", value: "תשלום מלא מראש" },
      { label: "50% מקדמה + 50% בסיום", value: "50% מקדמה, 50% בסיום הפרויקט" },
      { label: "30% מקדמה + 70% בסיום", value: "30% מקדמה, 70% בסיום הפרויקט" },
      { label: "תשלומים חודשיים", value: "תשלומים חודשיים שווים" },
    ],
  },
  {
    key: "timeline",
    question: "מה לוח הזמנים של הפרויקט?",
    placeholder: "לדוגמה: מה-1 במאי עד ה-1 ביוני 2024",
    quickOptions: [
      { label: "שבוע", value: "תוך שבוע מחתימת החוזה" },
      { label: "חודש", value: "תוך חודש מחתימת החוזה" },
      { label: "3 חודשים", value: "תוך 3 חודשים מחתימת החוזה" },
    ],
  },
  {
    key: "revisions",
    question: "כמה סבבי תיקונים כלולים במחיר?",
    placeholder: "לדוגמה: 2 סבבי תיקונים",
    quickOptions: [
      { label: "ללא תיקונים", value: "ללא סבבי תיקונים — כל שינוי בתשלום נפרד" },
      { label: "סבב אחד", value: "סבב תיקונים אחד" },
      { label: "2 סבבים", value: "שני סבבי תיקונים" },
      { label: "3 סבבים", value: "שלושה סבבי תיקונים" },
    ],
  },
  {
    key: "cancellation",
    question: "מה קורה אם הלקוח מבטל את הפרויקט?",
    placeholder: "לדוגמה: המקדמה אינה מוחזרת",
    quickOptions: [
      { label: "המקדמה לא מוחזרת", value: "המקדמה אינה מוחזרת בכל מקרה של ביטול" },
      { label: "ביטול עד שבוע — החזר מלא", value: "ביטול עד שבוע מחתימה — החזר מלא; לאחר מכן המקדמה נשמרת" },
      { label: "תשלום יחסי לעבודה שנעשתה", value: "בביטול, תשלום יחסי לפי שלב הפרויקט שהושלם" },
    ],
  },
  {
    key: "ipOwnership",
    question: "מי מחזיק בזכויות היוצרים על העבודה?",
    placeholder: "לדוגמה: הלקוח מקבל זכויות מלאות לאחר תשלום מלא",
    quickOptions: [
      { label: "ללקוח — אחרי תשלום מלא", value: "זכויות היוצרים עוברות ללקוח לאחר קבלת תשלום מלא" },
      { label: "לפרילנסר לתמיד", value: "זכויות היוצרים נשארות אצל הפרילנסר; ללקוח ניתנת רישיון שימוש" },
      { label: "בבעלות משותפת", value: "זכויות היוצרים בבעלות משותפת של הצדדים" },
    ],
  },
  {
    key: "specialClauses",
    question: "יש משהו מיוחד שחשוב לך לכלול?",
    placeholder: "לדוגמה: הלקוח לא יוכל לעבוד עם מתחרים שלי, סודיות, וכו'",
    quickOptions: [
      { label: "אין סעיפים מיוחדים", value: "אין סעיפים מיוחדים נוספים" },
    ],
  },
];

export default function CreatePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function handleAnswer(answer: string) {
    const key = QUESTIONS[currentIndex].key;
    const updated = { ...answers, [key]: answer };
    setAnswers(updated);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      const params = new URLSearchParams(updated as Record<string, string>);
      router.push(`/payment?${params.toString()}`);
    }
  }

  const q = QUESTIONS[currentIndex];

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-bold" style={{ color: "#0F1F3D" }}>Signly</span>
            <span className="text-xs text-gray-400">חוזה פרילנסר</span>
          </div>
          <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
        </div>
      </header>

      {/* Question area */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <ChatQuestion
          key={currentIndex}
          question={q.question}
          placeholder={q.placeholder}
          quickOptions={q.quickOptions}
          onAnswer={handleAnswer}
        />
      </section>

      {/* Previous answers summary */}
      {Object.keys(answers).length > 0 && (
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="max-w-xl mx-auto">
            <p className="text-xs text-gray-400 mb-2">תשובות קודמות:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(answers).map(([key, val]) => (
                <span
                  key={key}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 max-w-xs truncate"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
