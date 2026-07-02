"use client";
import { useState, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { ASMAUL_HUSNA } from "@/data/asmaul-husna";

const AUDIO_URL = "https://archive.org/download/KoleksiNasyidPilihanBacaquran.tk/Hijjaz-asmaulHusna.mp3";

export default function AsmaulHusnaPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  // Mode Murottal (Hijjaz) States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  // Mode Belajar (Asisten Suara Google Neural TTS) States
  const [studyIndex, setStudyIndex] = useState<number | null>(null);

  // Index kartu yang harus disorot (Murottal atau Mode Belajar)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const studyAudioRef = useRef<HTMLAudioElement | null>(null);
  const isStudyActiveRef = useRef(false);
  const studyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sinkronisasi Sorotan & Gulir untuk Mode Belajar (Asisten Suara)
  useEffect(() => {
    if (studyIndex !== null) {
      setHighlightedIndex(studyIndex);
      if (autoScroll) {
        const el = document.getElementById(`name-card-${studyIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else {
      setHighlightedIndex(null);
    }
  }, [studyIndex, autoScroll]);

  // Pengendali Putar / Jeda Murottal Lengkap (Hijjaz)
  const togglePlayFull = () => {
    stopStudyMode();

    if (!audioPlayerRef.current) {
      const audio = new Audio(AUDIO_URL);
      audio.volume = 0.7;
      audioPlayerRef.current = audio;

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setHighlightedIndex(null);
        setCurrentTime(0);
      };
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play().catch((e) => {
        console.warn("Autoplay murottal diblokir browser:", e);
      });
      setIsPlaying(true);
    }
  };

  // Logika Asisten Suara Mode Belajar menggunakan Google Neural Arabic TTS (Bebas Robot) dengan fallback SpeechSynthesis
  const speakName = (index: number) => {
    if (!isStudyActiveRef.current) return;

    if (index < 1 || index > ASMAUL_HUSNA.length) {
      stopStudyMode();
      return;
    }

    // Hentikan suara sistem (SpeechSynthesis) yang sedang berputar agar tidak tumpang tindih
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const nameData = ASMAUL_HUSNA[index - 1];
    
    if (studyAudioRef.current) {
      try {
        studyAudioRef.current.pause();
      } catch (e) {}
    }

    const nextStep = () => {
      if (!isStudyActiveRef.current) return;
      if (studyTimeoutRef.current) clearTimeout(studyTimeoutRef.current);
      studyTimeoutRef.current = setTimeout(() => {
        if (!isStudyActiveRef.current) return;
        setStudyIndex(index + 1);
        speakName(index + 1);
      }, 1200);
    };

    const playSpeechSynthesisFallback = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(nameData.arabic);
        utterance.lang = "ar-SA";
        utterance.rate = 0.65;

        // Cari suara wanita (female) jika tersedia di sistem
        const voices = window.speechSynthesis.getVoices();
        const arabicVoices = voices.filter(v => v.lang.toLowerCase().startsWith("ar"));
        const femaleVoice = arabicVoices.find(v => 
          v.name.toLowerCase().includes("female") || 
          v.name.toLowerCase().includes("leila") || 
          v.name.toLowerCase().includes("muna") || 
          v.name.toLowerCase().includes("zira") || 
          v.name.toLowerCase().includes("mariam") ||
          v.name.toLowerCase().includes("hoda")
        ) || arabicVoices[0];
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        utterance.onend = () => {
          nextStep();
        };
        utterance.onerror = (e) => {
          console.warn("SpeechSynthesis error:", e);
          nextStep();
        };
        window.speechSynthesis.speak(utterance);
      } else {
        nextStep();
      }
    };

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(nameData.arabic)}&tl=ar&client=tw-ob`;
    const audio = new Audio(url);
    studyAudioRef.current = audio;

    audio.onerror = () => {
      console.warn("Google TTS error. Falling back to SpeechSynthesis for:", nameData.arabic);
      playSpeechSynthesisFallback();
    };

    audio.play()
      .then(() => {
        audio.onended = () => {
          nextStep();
        };
      })
      .catch((err) => {
        console.warn("Autoplay/play blocked, trying SpeechSynthesis fallback:", err);
        playSpeechSynthesisFallback();
      });
  };

  const startStudyMode = () => {
    // Matikan sesi belajar yang lama jika ada
    stopStudyMode();

    if (audioPlayerRef.current && isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
    
    isStudyActiveRef.current = true;
    setStudyIndex(1);
    speakName(1);
  };

  const stopStudyMode = () => {
    isStudyActiveRef.current = false;
    setStudyIndex(null);
    setHighlightedIndex(null);

    // Hapus pending timeout perpindahan nama
    if (studyTimeoutRef.current) {
      clearTimeout(studyTimeoutRef.current);
      studyTimeoutRef.current = null;
    }

    // Jeda audio yang sedang berputar
    if (studyAudioRef.current) {
      try {
        studyAudioRef.current.pause();
      } catch (e) {}
      studyAudioRef.current = null;
    }
  };

  // Pengucapan individual lafal nama Allah (Google Neural TTS sekali jalan dengan fallback SpeechSynthesis)
  const playVoice = (text: string) => {
    // Hentikan suara sistem (SpeechSynthesis) yang sedang berputar agar tidak tumpang tindih
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (audioPlayerRef.current && isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
    stopStudyMode();

    const playSpeechSynthesisFallback = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ar-SA";
        utterance.rate = 0.65;

        // Cari suara wanita (female) jika tersedia di sistem
        const voices = window.speechSynthesis.getVoices();
        const arabicVoices = voices.filter(v => v.lang.toLowerCase().startsWith("ar"));
        const femaleVoice = arabicVoices.find(v => 
          v.name.toLowerCase().includes("female") || 
          v.name.toLowerCase().includes("leila") || 
          v.name.toLowerCase().includes("muna") || 
          v.name.toLowerCase().includes("zira") || 
          v.name.toLowerCase().includes("mariam") ||
          v.name.toLowerCase().includes("hoda")
        ) || arabicVoices[0];
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        window.speechSynthesis.speak(utterance);
      }
    };

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ar&client=tw-ob`;
    const audio = new Audio(url);
    audio.onerror = () => {
      playSpeechSynthesisFallback();
    };
    audio.play().catch((e) => {
      console.warn("Gagal memutar suara individual via Google, fallback ke SpeechSynthesis:", e);
      playSpeechSynthesisFallback();
    });
  };

  // Bersihkan semua audio & timeout saat keluar halaman
  useEffect(() => {
    return () => {
      isStudyActiveRef.current = false;
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if (studyAudioRef.current) {
        studyAudioRef.current.pause();
      }
      if (studyTimeoutRef.current) {
        clearTimeout(studyTimeoutRef.current);
      }
    };
  }, []);

  const filtered = ASMAUL_HUSNA.filter(
    (a) =>
      a.latin.toLowerCase().includes(search.toLowerCase()) ||
      a.arti.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="pb-28">
      <PageHeader title="Asmaul Husna" subtitle="99 Nama-Nama Allah Yang Indah" />

      {/* Search */}
      <div className="sticky top-0 z-10 bg-cream border-b border-emerald-100 px-4 py-2">
        <input
          type="search"
          placeholder="Cari nama Allah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      {/* Quote */}
      <div className="mx-4 mt-4 rounded-2xl gradient-green p-4 text-center">
        <p className="font-arabic text-lg text-gold-light leading-loose">
          وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا
        </p>
        <p className="text-xs text-emerald-300 mt-2 italic">
          "Dan Allah memiliki Asmaul Husna, maka berdoalah kepada-Nya dengan menyebut nama-nama itu."
          — QS. Al-A'raf: 180
        </p>
      </div>

      {/* Player Card Asmaul Husna */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-emerald-900 border border-gold/30 shadow-gold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="text-3xl flex-shrink-0 animate-pulse">🎵</div>
          <div>
            <h3 className="font-bold text-sm text-white">Murottal Asmaul Husna</h3>
            <p className="text-[10px] text-emerald-300">Dua Pilihan Pemutaran: Musik Nadhom atau Asisten Belajar</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end flex-wrap gap-2.5">
          {/* Auto Scroll Checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="accent-gold h-4 w-4 rounded border-gold/40 bg-emerald-950"
            />
            <span className="text-[9px] text-emerald-200 font-semibold uppercase tracking-wider">
              Auto-Scroll
            </span>
          </label>

          <div className="flex gap-2">
            {/* Tombol Mode Belajar TTS */}
            {studyIndex === null ? (
              <button
                onClick={startStudyMode}
                className="rounded-xl bg-emerald-800 border border-emerald-700 text-white hover:bg-emerald-700 px-3 py-2 text-xs font-semibold shadow active:scale-95 transition-all"
              >
                🎓 Mode Belajar
              </button>
            ) : (
              <button
                onClick={stopStudyMode}
                className="rounded-xl bg-gold text-emerald-950 px-3 py-2 text-xs font-bold shadow active:scale-95 transition-all animate-pulse"
              >
                ⏹️ Stop Belajar
              </button>
            )}

            {/* Tombol Murottal Hijjaz */}
            <button
              onClick={togglePlayFull}
              className={`rounded-xl px-3 py-2 text-xs font-semibold shadow transition-all active:scale-95
                ${isPlaying 
                  ? "bg-gold text-emerald-950 font-bold" 
                  : "bg-emerald-800 text-white hover:bg-emerald-700 border border-emerald-700"}`}
            >
              <span>{isPlaying ? "⏸️ Jeda Nadhom" : "▶️ Putar Nadhom"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((a) => {
          const isSelected = selected === a.no;
          const isHighlighted = highlightedIndex === a.no;
          return (
            <button
              key={a.no}
              id={`name-card-${a.no}`}
              onClick={() => setSelected(isSelected ? null : a.no)}
              className={`card-islamic p-4 text-left transition-all relative overflow-hidden
                ${isSelected ? "border-gold bg-gold/5 shadow-soft" : ""}
                ${isHighlighted ? "border-gold bg-gold/20 scale-105 shadow-gold ring-2 ring-gold" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold
                  ${isHighlighted ? "bg-emerald-950 text-gold" : "gradient-green text-gold"}`}>
                  {a.no}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playVoice(a.arabic);
                  }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all text-xs
                    ${isHighlighted 
                      ? "bg-emerald-950 text-gold border-gold hover:bg-emerald-900" 
                      : "bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100"}`}
                  title="Dengarkan Lafal"
                >
                  🔊
                </button>
              </div>
              <p className="font-arabic text-2xl text-emerald-800 text-right leading-loose mb-1">
                {a.arabic}
              </p>
              <p className="font-semibold text-sm text-emerald-900">{a.latin}</p>
              {isSelected && (
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed border-t border-gold/20 pt-1.5">
                  {a.arti}
                </p>
              )}
              {!isSelected && (
                <p className="text-xs text-gray-400 mt-0.5 truncate">{a.arti}</p>
              )}
            </button>
          );
        })}
      </div>
    </main>
  );
}
