"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

type Category = "nun" | "mim" | "qalqalah" | "mad";

interface Rule {
  id: string;
  name: string;
  desc: string;
  letters: string;
  examples: { arabic: string; transliteration: string; meaning: string }[];
}

const TAJWID_RULES: Record<Category, Rule[]> = {
  nun: [
    {
      id: "izhar-halqi",
      name: "Izhar Halqi (إِظْهَار حَلْقِي)",
      desc: "Membaca huruf nun mati atau tanwin secara jelas dan terang tanpa dengung jika bertemu salah satu dari 6 huruf tenggorokan (Halqi).",
      letters: "ء (Alif), هـ (Ha), ع ('Ain), ح (Ha), غ (Ghain), خ (Kha)",
      examples: [
        { arabic: "مَنْ آمَنَ", transliteration: "Man āmana", meaning: "Barangsiapa yang beriman" },
        { arabic: "عَذَابٌ أَلِيمٌ", transliteration: "'Adzābun alīm", meaning: "Azab yang sangat pedih" },
      ],
    },
    {
      id: "idgham-bighunnah",
      name: "Idgham Bighunnah (إِدْغَام بِغُنَّة)",
      desc: "Memasukkan bunyi nun mati atau tanwin ke dalam huruf berikutnya disertai dengan dengung (ghunnah) selama 2-3 ketukan.",
      letters: "ي (Ya), ن (Nun), م (Mim), و (Wawu)",
      examples: [
        { arabic: "مَنْ يَقُولُ", transliteration: "May yaqūlu", meaning: "Orang yang berkata" },
        { arabic: "لَهَبٍ وَتَبَّ", transliteration: "Lahabiw watabb", meaning: "Gejolak api dan akan binasa" },
      ],
    },
    {
      id: "idgham-bilaghunnah",
      name: "Idgham Bilaghunnah (إِدْغَام بِلَا غُنَّة)",
      desc: "Memasukkan bunyi nun mati atau tanwin ke dalam huruf berikutnya secara penuh TANPA disertai dengung.",
      letters: "ل (Lam), ر (Ra)",
      examples: [
        { arabic: "مِنْ رَبِّهِمْ", transliteration: "Mir rabbihim", meaning: "Dari Tuhan mereka" },
        { arabic: "هُدًى لِلْمُتَّقِينَ", transliteration: "Hudal lilmuttaqīn", meaning: "Petunjuk bagi orang bertakwa" },
      ],
    },
    {
      id: "iqlab",
      name: "Iqlab (إِقْلَاب)",
      desc: "Mengubah bunyi nun mati atau tanwin menjadi bunyi huruf mim mati (م) disertai dengung pelan saat bertemu huruf Ba.",
      letters: "ب (Ba)",
      examples: [
        { arabic: "مِنْ بَعْدِ", transliteration: "Mim ba'di", meaning: "Setelah itu" },
        { arabic: "سَمِيعٌ بَصِيرٌ", transliteration: "Samī'um başīr", meaning: "Maha Mendengar lagi Maha Melihat" },
      ],
    },
    {
      id: "ikhfa-haqiqi",
      name: "Ikhfa Haqiqi (إِخْفَاء حَقِيقِي)",
      desc: "Menyamarkan atau menyembunyikan bunyi nun mati atau tanwin saat bertemu huruf ikhfa, dibaca samar disertai dengung tipis.",
      letters: "ت, ث, ج, د, ذ, ز, س, ش, ص, ض, ط, ظ, ف, ق, ك (15 Huruf)",
      examples: [
        { arabic: "مِنْ دُونِ", transliteration: "Min dūni", meaning: "Selain dari" },
        { arabic: "أَنْفُسَكُمْ", transliteration: "Anfusakum", meaning: "Dirimu sendiri" },
      ],
    },
  ],
  mim: [
    {
      id: "ikhfa-syafawi",
      name: "Ikhfa Syafawi (إِخْفَاء شَفَوِي)",
      desc: "Menyembunyikan bunyi mim mati (مْ) ke dalam huruf Ba (ب) dengan merapatkan bibir disertai dengung.",
      letters: "ب (Ba)",
      examples: [
        { arabic: "تَرْمِيهِمْ بِحِجَارَةٍ", transliteration: "Tarmīhim bihijārah", meaning: "Melempar mereka dengan batu" },
      ],
    },
    {
      id: "idgham-mimi",
      name: "Idgham Mimi / Mutamatsilain (إِدْغَام مِثْلَيْنِ)",
      desc: "Memasukkan bunyi mim mati (مْ) ke dalam huruf mim berharakat yang ada di depannya disertai dengung yang rapat.",
      letters: "م (Mim)",
      examples: [
        { arabic: "فِي قُلُوبِهِمْ مَرَضٌ", transliteration: "Fī qulūbihim maradun", meaning: "Di dalam hati mereka ada penyakit" },
      ],
    },
    {
      id: "izhar-syafawi",
      name: "Izhar Syafawi (إِظْهَار شَفَوِي)",
      desc: "Membaca bunyi mim mati (مْ) secara jelas, terang, dan singkat tanpa dengung jika bertemu seluruh huruf hijaiyah selain Mim dan Ba.",
      letters: "Semua huruf selain م (Mim) dan ب (Ba)",
      examples: [
        { arabic: "لَهُمْ فِيهَا", transliteration: "Lahum fīhā", meaning: "Bagi mereka di dalamnya" },
        { arabic: "أَلَمْ تَرَ", transliteration: "Alam tara", meaning: "Tidakkah kamu perhatikan" },
      ],
    },
  ],
  qalqalah: [
    {
      id: "qalqalah-sugra",
      name: "Qalqalah Sugra (قَلْقَلَة صُغْرَى)",
      desc: "Bunyi pantulan huruf qalqalah yang sukun asli (mati) dan terletak di tengah-tengah kata. Pantulannya dibaca ringan.",
      letters: "ق (Qa), ط (Tha), ب (Ba), ج (Ja), د (Da) — [Baju Di Toko]",
      examples: [
        { arabic: "يَقْطَعُونَ", transliteration: "Yaqta'ūna", meaning: "Mereka memutuskan" },
        { arabic: "يَجْعَلُونَ", transliteration: "Yaj'alūna", meaning: "Mereka menjadikan" },
      ],
    },
    {
      id: "qalqalah-kubra",
      name: "Qalqalah Kubra (قَلْقَلَة كُبْرَى)",
      desc: "Bunyi pantulan huruf qalqalah yang mati karena dihentikan (waqaf) di akhir kalimat. Pantulannya dibaca kuat dan tebal.",
      letters: "ق (Qa), ط (Tha), ب (Ba), ج (Ja), د (Da)",
      examples: [
        { arabic: "الْفَلَقِ", transliteration: "Al-falaq", meaning: "Waktu subuh (diwaqafkan)" },
        { arabic: "عَذَابٌ شَدِيدٌ", transliteration: "'Adzābun syadīd", meaning: "Siksaan yang keras" },
      ],
    },
  ],
  mad: [
    {
      id: "mad-thabii",
      name: "Mad Thabi'i / Asli (مَدّ طَبِيعِي)",
      desc: "Membaca panjang huruf sepanjang 2 ketukan (1 alif) jika terdapat alif setelah fathah, ya mati setelah kasrah, atau wawu mati setelah dhammah.",
      letters: "ا (setelah fathah), ي (setelah kasrah), و (setelah dhammah)",
      examples: [
        { arabic: "قَالَ", transliteration: "Qāla", meaning: "Dia berkata" },
        { arabic: "يَقُولُ", transliteration: "Yaqūlu", meaning: "Dia berkata" },
      ],
    },
    {
      id: "mad-wajib-muttasil",
      name: "Mad Wajib Muttasil (مَدّ وَاجِب مُتَّصِل)",
      desc: "Membaca panjang huruf mad bertemu alif/hamzah dalam satu kata yang sama. Panjang ketukannya 4-5 ketukan.",
      letters: "Mad Thabi'i bertemu Hamzah (ء) dalam SATU kata",
      examples: [
        { arabic: "جَاءَ", transliteration: "Jā'a", meaning: "Telah datang" },
        { arabic: "السَّمَاءِ", transliteration: "As-samā'i", meaning: "Langit" },
      ],
    },
    {
      id: "mad-jaiz-munfasil",
      name: "Mad Jaiz Munfasil (مَدّ جَائِز مُنْفَصِل)",
      desc: "Membaca panjang huruf mad bertemu alif/hamzah di lain kata. Panjang ketukannya 2 sampai 5 ketukan.",
      letters: "Mad Thabi'i bertemu Hamzah di LAIN kata",
      examples: [
        { arabic: "إِنَّا أَنْزَلْنَاهُ", transliteration: "Innā anzalnāhu", meaning: "Sesungguhnya Kami menurunkannya" },
      ],
    },
  ],
};

export default function TajwidPage() {
  const [activeTab, setActiveTab] = useState<Category>("nun");

  const TABS = [
    { key: "nun", label: "Nun & Tanwin", icon: "✨" },
    { key: "mim", label: "Mim Sukun", icon: "💎" },
    { key: "qalqalah", label: "Qalqalah", icon: "🌀" },
    { key: "mad", label: "Hukum Mad", icon: "📏" },
  ];

  const playVoice = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.65; // Sangat lambat agar pelafalan hukum tajwid terdengar jelas
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="pb-28">
      <PageHeader title="Belajar Tajwid" subtitle="Hukum bacaan Al-Quran & contoh pelafalan" />

      {/* Tab Selector */}
      <div className="sticky top-0 z-10 bg-cream border-b border-emerald-100 px-4 py-2">
        <div className="flex gap-1 overflow-x-auto scrollbar-none py-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as Category)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5
              ${activeTab === t.key ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"}`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Rules */}
      <div className="px-4 pt-4 space-y-4">
        {TAJWID_RULES[activeTab].map((rule) => (
          <div key={rule.id} className="card-islamic p-5 space-y-3 animate-fade-up">
            <div>
              <h3 className="font-bold text-base text-emerald-900">{rule.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">{rule.desc}</p>
            </div>

            {/* Huruf Hukum */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block mb-0.5">Huruf</span>
              <p className="text-sm font-semibold text-emerald-900">{rule.letters}</p>
            </div>

            {/* Contoh Bacaan */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gold-muted uppercase tracking-widest block">Contoh Bacaan</span>
              <div className="grid grid-cols-1 gap-2.5">
                {rule.examples.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-gold/15 rounded-xl p-3 shadow-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs text-emerald-800">{ex.transliteration}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{ex.meaning}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-arabic text-xl text-emerald-950 text-right leading-loose">{ex.arabic}</p>
                      <button
                        onClick={() => playVoice(ex.arabic)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-gold-muted border border-gold/20 hover:bg-gold/20 active:scale-95 transition-all text-xs"
                        title="Dengarkan Contoh"
                      >
                        🔊
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
