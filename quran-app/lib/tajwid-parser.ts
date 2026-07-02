/**
 * Utility helper to color-code Tajwid rules in Quranic Arabic text.
 * 1. Ghunnah: Syaddah (ّ) on Nun (ن) or Mim (m) -> Rose
 * 2. Qalqalah: Letters د, ج, ب, ط, ق when sukun (ْ) -> Sky Blue
 * 3. Ikhfa: Nun mati (نْ) or Tanwin (ًٌٍ) meeting ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك -> Purple
 * 4. Idgham: Nun mati (نْ) or Tanwin (ًٌٍ) meeting ي ن م و ل ر -> Emerald Green
 * 5. Iqlab: Nun mati (نْ) or Tanwin (ًٌٍ) meeting ب -> Gold
 */
export function highlightTajwid(text: string): string {
  if (!text) return "";

  let html = text;

  // 1. Ghunnah (Rose text for double nasal sound on Nun and Mim syaddah)
  html = html.replace(/([نم]ّ)/g, '<span class="text-rose-500 font-bold font-arabic">$1</span>');

  // 2. Qalqalah (Blue-green text for bouncing sukun)
  html = html.replace(/([دجبطق]ْ)/g, '<span class="text-sky-600 font-bold font-arabic">$1</span>');

  // 3. Ikhfa (Purple for nasalized hidden Nun/Tanwin before Ikhfa letters)
  const ikhfaRegex = /(نْ|[ًٌٍ])(\s*)([تثجدذزسشصضطظفقك])/g;
  html = html.replace(ikhfaRegex, '<span class="text-purple-600 font-bold font-arabic">$1</span>$2$3');

  // 4. Idgham (Emerald green for blended Nun/Tanwin before Idgham letters)
  const idghamRegex = /(نْ|[ًٌٍ])(\s*)([ينمولر])/g;
  html = html.replace(idghamRegex, '<span class="text-emerald-600 font-bold font-arabic">$1</span>$2$3');

  // 5. Iqlab (Gold for Nun/Tanwin converted to Mim sound before Ba)
  const iqlabRegex = /(نْ|[ًٌٍ])(\s*)(ب)/g;
  html = html.replace(iqlabRegex, '<span class="text-amber-600 font-bold font-arabic">$1</span>$2$3');

  return html;
}
