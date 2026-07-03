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

  // 1. Ikhfa Syafawi (Mim mati/bare bertemu Ba)
  const ikhfaSyafawiRegex = /(مْ|م(?![\u064b-\u0652\u0670]))(\s*)(ب)/g;
  html = html.replace(ikhfaSyafawiRegex, '<span class="tajwid-ikhfa">$1</span>$2$3');

  // 2. Idgham Mimi (Mim mati/bare bertemu Mim)
  const idghamMimiRegex = /(مْ|م(?![\u064b-\u0652\u0670]))(\s*)(م)/g;
  html = html.replace(idghamMimiRegex, '<span class="tajwid-idgham">$1</span>$2$3');

  // 3. Ikhfa (Nun mati/bare atau Tanwin bertemu huruf ikhfa)
  const ikhfaRegex = /(نْ|ن(?![\u064b-\u0652\u0670])|[ًٌٍ])(\s*)([تثجدذزسشصضطظفقك])/g;
  html = html.replace(ikhfaRegex, '<span class="tajwid-ikhfa">$1</span>$2$3');

  // 4. Idgham (Nun mati/bare atau Tanwin bertemu huruf idgham)
  const idghamRegex = /(نْ|ن(?![\u064b-\u0652\u0670])|[ًٌٍ])(\s*)([ينمولر])/g;
  html = html.replace(idghamRegex, '<span class="tajwid-idgham">$1</span>$2$3');

  // 5. Iqlab (Nun mati/bare atau Tanwin bertemu Ba)
  const iqlabRegex = /(نْ|ن(?![\u064b-\u0652\u0670])|[ًٌٍ])(\s*)(ب)/g;
  html = html.replace(iqlabRegex, '<span class="tajwid-iqlab">$1</span>$2$3');

  // 6. Izhar (Nun mati/bare atau Tanwin bertemu huruf halqi)
  const izharRegex = /(نْ|ن(?![\u064b-\u0652\u0670])|[ًٌٍ])(\s*)([اھهعحغkhخء])/g;
  html = html.replace(izharRegex, '<span class="tajwid-izhar">$1</span>$2$3');

  // 7. Mad (Huruf Arab ber-maddah bendera)
  const madRegex = /([\u0621-\u064a][\u064b-\u0652\u0670]*ٓ)/g;
  html = html.replace(madRegex, '<span class="tajwid-mad">$1</span>');

  // 8. Ghunnah (Nun/Mim bertasydid)
  const ghunnahRegex = /([نم][\u064b-\u065f\u0670]*ّ[\u064b-\u065f\u0670]*)/g;
  html = html.replace(ghunnahRegex, '<span class="tajwid-ghunnah">$1</span>');

  // 9. Qalqalah (Huruf qalqalah bersukun)
  const qalqalahRegex = /([دجبطق][\u064b-\u065f\u0670]*ْ[\u064b-\u065f\u0670]*)/g;
  html = html.replace(qalqalahRegex, '<span class="tajwid-qalqalah">$1</span>');

  return html;
}
