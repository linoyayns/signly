// Convert integer amounts to Hebrew words, so Claude never has to do this math itself
// (large round numbers like 50,000 are a known source of off-by-one mistakes when an LLM
// is asked to spell out a number it was just given).

const ONES_MASC: Record<number, string> = {
  1: "אחד", 2: "שניים", 3: "שלושה", 4: "ארבעה", 5: "חמישה",
  6: "שישה", 7: "שבעה", 8: "שמונה", 9: "תשעה",
};

const TEENS: Record<number, string> = {
  10: "עשרה", 11: "אחד עשר", 12: "שנים עשר", 13: "שלושה עשר", 14: "ארבעה עשר",
  15: "חמישה עשר", 16: "שישה עשר", 17: "שבעה עשר", 18: "שמונה עשר", 19: "תשעה עשר",
};

const TENS: Record<number, string> = {
  20: "עשרים", 30: "שלושים", 40: "ארבעים", 50: "חמישים",
  60: "שישים", 70: "שבעים", 80: "שמונים", 90: "תשעים",
};

const HUNDREDS_PREFIX_FEM: Record<number, string> = {
  3: "שלוש", 4: "ארבע", 5: "חמש", 6: "שש", 7: "שבע", 8: "שמונה", 9: "תשע",
};

const THOUSANDS_CONSTRUCT: Record<number, string> = {
  3: "שלושת", 4: "ארבעת", 5: "חמשת", 6: "ששת", 7: "שבעת", 8: "שמונת", 9: "תשעת", 10: "עשרת",
};

// Spells out a number from 0-999
function numberUnder1000Words(n: number): string {
  if (n === 0) return "";

  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];

  if (hundreds === 1) parts.push("מאה");
  else if (hundreds === 2) parts.push("מאתיים");
  else if (hundreds >= 3) parts.push(`${HUNDREDS_PREFIX_FEM[hundreds]} מאות`);

  if (rest > 0) {
    let restWords: string;
    if (rest < 10) restWords = ONES_MASC[rest];
    else if (rest < 20) restWords = TEENS[rest];
    else {
      const tens = Math.floor(rest / 10) * 10;
      const units = rest % 10;
      restWords = units === 0 ? TENS[tens] : `${TENS[tens]} ו${ONES_MASC[units]}`;
    }
    parts.push(parts.length > 0 ? `ו${restWords}` : restWords);
  }

  return parts.join(" ");
}

// Spells out any non-negative integer up to 999,999
function numberToHebrewWords(n: number): string {
  if (n === 0) return "אפס";

  const thousands = Math.floor(n / 1000);
  const remainder = n % 1000;

  let thousandsPhrase = "";
  if (thousands === 1) thousandsPhrase = "אלף";
  else if (thousands === 2) thousandsPhrase = "אלפיים";
  else if (thousands >= 3 && thousands <= 10) thousandsPhrase = `${THOUSANDS_CONSTRUCT[thousands]} אלפים`;
  else if (thousands > 10) thousandsPhrase = `${numberUnder1000Words(thousands)} אלף`;

  const remainderWords = numberUnder1000Words(remainder);

  if (thousandsPhrase && remainderWords) return `${thousandsPhrase} ו${remainderWords}`;
  return thousandsPhrase || remainderWords;
}

// Returns "50,000 ₪ (חמישים אלף שקלים חדשים)" — ready to paste straight into the contract
export function formatAmountWithWords(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded === 1) return "1 ₪ (שקל אחד)";
  return `${rounded.toLocaleString("he-IL")} ₪ (${numberToHebrewWords(rounded)} שקלים חדשים)`;
}
