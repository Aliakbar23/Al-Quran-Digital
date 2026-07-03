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

  const words = text.split(/\s+/);
  const resultWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nextWord = words[i + 1] || "";
    
    let tajwidClass = "";

    // 1. Cek Mad (Huruf ber-maddah bendera)
    if (word.includes("ٓ")) {
      tajwidClass = "tajwid-mad";
    }
    // 2. Cek Ghunnah (Nun/Mim bertasydid)
    else if (/[نم][\u064b-\u065f\u0670]*ّ/.test(word)) {
      tajwidClass = "tajwid-ghunnah";
    }
    // 3. Cek Qalqalah (Huruf qalqalah bersukun)
    else if (/[دجبطق][\u064b-\u065f\u0670]*ْ/.test(word)) {
      tajwidClass = "tajwid-qalqalah";
    }
    // 4. Cek aturan dua kata (Nun/Mim mati/Tanwin bertemu huruf berikutnya)
    else {
      const nextChar = getFirstConsonant(nextWord);
      
      if (nextChar) {
        // Cek Mim mati / bare
        if (/م[ْ]?$/.test(word)) {
          if (nextChar === "ب") {
            tajwidClass = "tajwid-ikhfa"; // Ikhfa Syafawi
          } else if (nextChar === "م") {
            tajwidClass = "tajwid-idgham"; // Idgham Mimi
          }
        }
        // Cek Nun mati / bare atau Tanwin
        else if (/ن[ْ]?$/.test(word) || /[ًٌٍ]/.test(word)) {
          if (nextChar === "ب") {
            tajwidClass = "tajwid-iqlab";
          } else if ("تثجدذزسشصضطظفقك".includes(nextChar)) {
            tajwidClass = "tajwid-ikhfa";
          } else if ("ينمولر".includes(nextChar)) {
            tajwidClass = "tajwid-idgham";
          } else if ("اھهعحغخءٱ".includes(nextChar)) {
            tajwidClass = "tajwid-izhar";
          }
        }
      }
    }

    if (tajwidClass) {
      resultWords.push(`<span class="${tajwidClass}">${word}</span>`);
    } else {
      resultWords.push(word);
    }
  }

  return resultWords.join(" ");
}

function getFirstConsonant(word: string): string {
  if (!word) return "";
  const match = word.match(/[\u0621-\u064a\u0671]/);
  return match ? match[0] : "";
}
