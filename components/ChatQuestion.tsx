"use client";

import { useState } from "react";

interface QuickOption {
  label: string;
  value: string;
}

interface ChatQuestionProps {
  question: string;
  placeholder?: string;
  quickOptions?: QuickOption[];
  onAnswer: (answer: string) => void;
}

export default function ChatQuestion({
  question,
  placeholder = "כתוב כאן...",
  quickOptions = [],
  onAnswer,
}: ChatQuestionProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) onAnswer(value.trim());
  }

  function handleQuickOption(optValue: string) {
    onAnswer(optValue);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <p className="text-xl font-semibold mb-6 leading-relaxed" style={{ color: "#0F1F3D" }}>
        {question}
      </p>

      {quickOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {quickOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleQuickOption(opt.value)}
              className="px-4 py-2 text-sm border rounded font-medium transition-colors hover:text-white"
              style={{ borderColor: "#2563EB", color: "#2563EB" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563EB";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#2563EB";
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          dir="rtl"
          className="flex-1 border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-blue-500 bg-white"
          autoFocus
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-6 py-3 text-sm font-semibold text-white rounded disabled:opacity-40 transition-opacity"
          style={{ backgroundColor: "#2563EB" }}
        >
          המשך
        </button>
      </form>
    </div>
  );
}
