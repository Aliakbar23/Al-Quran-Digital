"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchSurah, type SurahDetail, type Ayah, fetchSurahTafsir } from "@/lib/api";
import { saveLastRead, toggleBookmark, isBookmarked, getBookmarkedAyahsForSurah } from "@/lib/db";
import { highlightTajwid } from "@/lib/tajwid-parser";

export default function BacaSurahPage() {
  const { id } = useParams<{ id: string }>();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(28);
  const [showTrans, setShowTrans] = useState(true);
  const [showTajwid, setShowTajwid] = useState(false);
  const [selectedQari, setSelectedQari] = useState("05");
  const [repeatCount, setRepeatCount] = useState(1);
  const [tafsirData, setTafsirData] = useState<Record<number, string>>({});
  const [showTafsir, setShowTafsir] = useState<Record<number, boolean>>({});
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});

  // Auto-scroll states & refs
  const [scrollState, setScrollState] = useState(0); // 0 = stop, 1 = 1x, 2 = 2x, 3 = 3x
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Audio murottal states & refs
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchSurah(Number(id)).then((data) => {
      setSurah(data);
      setLoading(false);
      saveLastRead(data.number, data.englishName, 1);

      // Load bookmarks for this surah on mount
      getBookmarkedAyahsForSurah(data.number).then((list) => {
        const mapping: Record<number, boolean> = {};
        list.forEach((b) => {
          mapping[b.ayahNumber] = true;
        });
        setBookmarked(mapping);
      });
    });

    // Fetch Tafsir Kemenag on mount
    fetchSurahTafsir(Number(id)).then((data) => {
      setTafsirData(data);
    }).catch(err => console.error("Gagal memuat tafsir:", err));
  }, [id]);

  const handleBookmark = async (ayah: Ayah) => {
    if (!surah) return;
    const result = await toggleBookmark(surah.number, surah.englishName, ayah.numberInSurah, ayah.text);
    setBookmarked((prev) => ({ ...prev, [ayah.numberInSurah]: result }));
  };

  // Auto-scroll logic
  const startScrolling = (speed: number) => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    
    // Nilai delay (milidetik) per 1px scroll. Semakin kecil delay, semakin cepat.
    const delay = speed === 1 ? 55 : speed === 2 ? 35 : 18;
    scrollIntervalRef.current = setInterval(() => {
      window.scrollBy({ top: 1, behavior: "auto" });
    }, delay);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleCircleClick = () => {
    const nextState = (scrollState + 1) % 4; // siklus 0 -> 1 -> 2 -> 3 -> 0
    setScrollState(nextState);

    if (nextState === 0) {
      stopScrolling();
    } else {
      startScrolling(nextState);
    }
  };

  // Murottal audio playback logic
  const handlePlayAudio = (ayah: Ayah) => {
    if (playingAyah === ayah.numberInSurah) {
      // Pause audio jika sedang berjalan
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }
      setPlayingAyah(null);
    } else {
      // Hentikan audio sebelumnya jika ada
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }

      // Get audio URL based on selected Qari
      const audioUrl = ayah.audio[selectedQari] || ayah.audio["05"] || ayah.audio["01"];
      if (!audioUrl) return;

      const audio = new Audio(audioUrl);
      audioInstanceRef.current = audio;
      setPlayingAyah(ayah.numberInSurah);

      audio.play().catch((e) => {
        console.warn("Autoplay murottal diblokir browser:", e);
        setPlayingAyah(null);
      });

      let currentRepetition = 1;
      audio.onended = () => {
        if (currentRepetition < repeatCount) {
          currentRepetition++;
          audio.currentTime = 0;
          audio.play().catch((e) => console.warn(e));
        } else {
          setPlayingAyah(null);
        }
      };
    }
  };

  // Bersihkan interval & audio saat keluar halaman
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }
    };
  }, []);

  // Auto-scroll ke ayat pilihan jika ada hash di URL
  useEffect(() => {
    if (!loading && surah) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const timer = setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [loading, surah]);

  if (loading) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-900 text-white gap-3">
      <div className="text-5xl animate-pulse">📖</div>
      <p className="text-emerald-300 text-sm">Memuat surah...</p>
    </div>
  );
  if (!surah) return null;

  return (
    <main className="pb-28 bg-cream">
      {/* Floating Minimalist Auto-Scroll Circle Button */}
      <button
        onClick={handleCircleClick}
        className={`fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex h-12 w-12 flex-col items-center justify-center rounded-full border shadow-gold transition-all cursor-pointer select-none active:scale-95
          ${scrollState > 0 
            ? "bg-gold border-gold text-emerald-950 scale-105 font-extrabold" 
            : "bg-emerald-950 border-gold/40 text-gold-light hover:bg-emerald-900"}`}
        title={scrollState > 0 ? `Auto Scroll: Kecepatan ${scrollState}x (Klik untuk ubah/stop)` : "Mulai Auto Scroll"}
      >
        {scrollState > 0 && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-30 animate-ping -z-10" />
        )}
        <span className="text-[8px] uppercase tracking-tighter leading-none font-bold">
          {scrollState > 0 ? "SPEED" : "AUTO"}
        </span>
        <span className="text-sm font-bold mt-0.5 leading-none">
          {scrollState === 0 ? "↓" : `${scrollState}x`}
        </span>
      </button>

      {/* Header surah */}
      <div className="gradient-green px-5 pb-6 pt-10 md:rounded-3xl md:shadow-card">
        <Link href="/quran" className="mb-3 inline-flex items-center gap-1 text-sm text-emerald-300">← Al-Quran</Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{surah.englishName}</h1>
            <p className="text-sm text-emerald-300 mt-0.5">{surah.englishNameTranslation} · {surah.numberOfAyahs} Ayah</p>
          </div>
          <p className="font-arabic text-3xl text-gold">{surah.name}</p>
        </div>
        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button onClick={() => setFontSize((f) => Math.max(20, f - 2))} className="rounded-lg bg-emerald-800 px-3 py-1.5 text-sm text-white">A-</button>
          <button onClick={() => setFontSize((f) => Math.min(42, f + 2))} className="rounded-lg bg-emerald-800 px-3 py-1.5 text-sm text-white">A+</button>
          <button
            onClick={() => setShowTrans((v) => !v)}
            className={`rounded-lg px-3 py-1.5 text-sm ${showTrans ? "bg-gold text-white" : "bg-emerald-800 text-white"}`}
          >
            Terjemahan
          </button>
          <button
            onClick={() => setShowTajwid((v) => !v)}
            className={`rounded-lg px-3 py-1.5 text-sm ${showTajwid ? "bg-gold text-white" : "bg-emerald-800 text-white"}`}
          >
            Tajwid
          </button>
        </div>

        {/* Tahfidz & Qari Settings */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white bg-emerald-950/30 rounded-xl p-3 border border-emerald-800/40">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-300 font-semibold">🎙️ Qari:</span>
            <select
              value={selectedQari}
              onChange={(e) => setSelectedQari(e.target.value)}
              className="bg-emerald-800 border border-emerald-700 text-white rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="05">Misyari Rasyid Al-Afasy</option>
              <option value="01">Abdullah Al-Juhany</option>
              <option value="02">Abdul Muhsin Al-Qasim</option>
              <option value="03">Abdurrahman As-Sudais</option>
              <option value="04">Ibrahim Al-Dossari</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-300 font-semibold">🔁 Ulangi:</span>
            <select
              value={repeatCount}
              onChange={(e) => setRepeatCount(Number(e.target.value))}
              className="bg-emerald-800 border border-emerald-700 text-white rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value={1}>1x</option>
              <option value={3}>3x (Tahfidz)</option>
              <option value={5}>5x (Tahfidz)</option>
              <option value={10}>10x (Tahfidz)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 divider-gold" />
      </div>

      {/* Bismillah */}
      {surah.number !== 9 && surah.number !== 1 && (
        <div className="mx-4 mt-5 rounded-2xl bg-emerald-900 py-5 text-center">
          <p className="font-arabic text-3xl text-gold-light leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      )}

      {/* Ayat */}
      <div className="px-4 pt-4 space-y-3">
        {surah.ayahs.map((ayah) => (
          <div
            key={ayah.numberInSurah}
            id={`ayah-${ayah.numberInSurah}`}
            className="card-islamic p-4"
          >
            {/* Nomor ayah + Murottal + bookmark + tafsir toggle */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-green text-xs font-bold text-gold">
                  {ayah.numberInSurah}
                </div>
                {/* Tombol Play Audio */}
                {ayah.audio && (ayah.audio["05"] || ayah.audio["01"]) && (
                  <button
                    onClick={() => handlePlayAudio(ayah)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all text-xs cursor-pointer
                      ${playingAyah === ayah.numberInSurah
                        ? "bg-gold border-gold text-emerald-950 scale-90"
                        : "bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      }`}
                    title={playingAyah === ayah.numberInSurah ? "Hentikan Murottal" : "Putar Murottal"}
                  >
                    {playingAyah === ayah.numberInSurah ? "⏸️" : "▶️"}
                  </button>
                )}
                {/* Tombol Tafsir */}
                {tafsirData[ayah.numberInSurah] && (
                  <button
                    onClick={() => setShowTafsir((prev) => ({ ...prev, [ayah.numberInSurah]: !prev[ayah.numberInSurah] }))}
                    className={`flex px-2.5 py-1 items-center justify-center rounded-full border transition-all text-[10px] font-bold cursor-pointer
                      ${showTafsir[ayah.numberInSurah]
                        ? "bg-gold border-gold text-emerald-950"
                        : "bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      }`}
                    title="Tampilkan Tafsir Kemenag"
                  >
                    📖 Tafsir
                  </button>
                )}
              </div>
              <button
                onClick={() => handleBookmark(ayah)}
                className="text-xl hover:scale-105 transition-transform cursor-pointer"
                title="Bookmark ayah"
              >
                {bookmarked[ayah.numberInSurah] ? "🔖" : "🏷️"}
              </button>
            </div>

            {/* Teks Arab (Dengan / Tanpa Tajwid Berwarna) */}
            {showTajwid ? (
              <p
                className="text-arabic text-right text-emerald-900 leading-loose"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: highlightTajwid(ayah.text) }}
              />
            ) : (
              <p
                className="text-arabic text-right text-emerald-900 leading-loose"
                style={{ fontSize: `${fontSize}px` }}
              >
                {ayah.text}
              </p>
            )}

            {/* Terjemahan */}
            {showTrans && ayah.translation && (
              <p className="mt-3 border-t border-gold/20 pt-3 text-sm leading-relaxed text-gray-600 italic">
                {ayah.translation}
              </p>
            )}

            {/* Tafsir */}
            {showTafsir[ayah.numberInSurah] && tafsirData[ayah.numberInSurah] && (
              <div className="mt-3 border-t border-emerald-100 bg-emerald-50/40 rounded-xl p-4 text-xs text-gray-700 leading-relaxed animate-fade-up whitespace-pre-line text-left">
                <span className="font-bold text-emerald-800 block mb-1.5">Tafsir Kemenag RI:</span>
                {tafsirData[ayah.numberInSurah]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigasi surah */}
      <div className="mx-4 mt-6 flex justify-between gap-3">
        {surah.number > 1 && (
          <Link href={`/quran/${surah.number - 1}`} className="flex-1 rounded-xl gradient-green py-3 text-center text-sm font-medium text-white">
            ← Surah {surah.number - 1}
          </Link>
        )}
        {surah.number < 114 && (
          <Link href={`/quran/${surah.number + 1}`} className="flex-1 rounded-xl gradient-green py-3 text-center text-sm font-medium text-white">
            Surah {surah.number + 1} →
          </Link>
        )}
      </div>
    </main>
  );
}
