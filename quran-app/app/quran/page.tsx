"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { fetchSurahList, type SurahMeta } from "@/lib/api";
import { getAllBookmarks, toggleBookmark } from "@/lib/db";

const JUZ_STARTS: Record<number, number> = {
  1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,
  11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,
  19:19,20:20,21:21,22:22,23:23,24:24,25:25,
  26:26,27:27,28:28,29:29,30:78,
};

export default function QuranPage() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"surah" | "bookmark">("surah");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const loadBookmarks = () => {
    getAllBookmarks().then((data) => {
      setBookmarks(data);
    });
  };

  useEffect(() => {
    fetchSurahList().then((data) => {
      setSurahs(data);
      setLoading(false);
    });
    loadBookmarks();
  }, []);

  const handleDeleteBookmark = async (e: React.MouseEvent, b: any) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleBookmark(b.surahNumber, b.surahName, b.ayahNumber, b.text);
    loadBookmarks();
  };

  const filtered = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      String(s.number).includes(search)
  );

  return (
    <main className="pb-28">
      <PageHeader title="Al-Quran" subtitle="114 Surah" />

      {/* Tab Selector */}
      <div className="px-4 mt-6 mb-4">
        <div className="flex gap-2 bg-emerald-950/5 p-1 rounded-2xl border border-emerald-900/10">
          <button
            onClick={() => setActiveTab("surah")}
            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "surah"
                ? "gradient-green text-white shadow-soft"
                : "text-emerald-800 hover:bg-emerald-900/5"
            }`}
          >
            📖 Daftar Surah
          </button>
          <button
            onClick={() => setActiveTab("bookmark")}
            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "bookmark"
                ? "gradient-green text-white shadow-soft"
                : "text-emerald-800 hover:bg-emerald-900/5"
            }`}
          >
            🔖 Bookmark Saya
          </button>
        </div>
      </div>

      {/* Search */}
      {activeTab === "surah" && (
        <div className="px-4 py-3 sticky top-0 bg-cream z-10 border-b border-emerald-100">
          <input
            type="search"
            placeholder="Cari surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>
      )}

      {loading && activeTab === "surah" && (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
          <div className="text-4xl mb-3 animate-pulse">📖</div>
          <p className="text-sm">Memuat Al-Quran...</p>
        </div>
      )}

      {/* List Surah */}
      {activeTab === "surah" && !loading && (
        <div className="px-4 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((s) => (
            <Link
              key={s.number}
              href={`/quran/${s.number}`}
              className="card-islamic flex items-center gap-3 p-3 hover:border-gold/40 transition-colors"
            >
              {/* Nomor surah dalam bentuk berlian */}
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
                  <polygon points="20,2 38,20 20,38 2,20" fill="#1B4332" />
                </svg>
                <span className="relative z-10 text-xs font-bold text-gold">{s.number}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-emerald-900 text-sm">{s.englishName}</p>
                <p className="text-xs text-gray-400">
                  {s.revelationType === "Meccan" ? "Makkiyah" : "Madaniyah"} · {s.numberOfAyahs} ayah
                </p>
              </div>

              <p className="font-arabic text-lg text-emerald-700 flex-shrink-0">{s.name}</p>
            </Link>
          ))}
        </div>
      )}

      {/* List Bookmark */}
      {activeTab === "bookmark" && (
        <div className="px-4 pt-3 space-y-3.5">
          {bookmarks.length === 0 ? (
            <div className="card-islamic p-8 text-center text-gray-500 flex flex-col items-center gap-3 animate-fade-up">
              <span className="text-4xl text-gold">🏷️</span>
              <p className="text-sm font-semibold text-emerald-950">Belum ada bookmark</p>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Silakan baca Al-Quran dan ketuk tombol bookmark (🏷️) di setiap ayat untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <Link
                key={b.id}
                href={`/quran/${b.surahNumber}#ayah-${b.ayahNumber}`}
                className="card-islamic flex flex-col p-4 hover:border-gold/40 transition-colors animate-fade-up relative block text-left"
              >
                <div className="flex items-center justify-between border-b border-gold/15 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔖</span>
                    <span className="font-bold text-sm text-emerald-950">
                      {b.surahName} : Ayat {b.ayahNumber}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteBookmark(e, b)}
                    className="text-xs bg-red-50 text-red-500 border border-red-100 hover:bg-red-100/50 hover:text-red-600 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer"
                    title="Hapus dari Bookmark"
                  >
                    🗑️ Hapus
                  </button>
                </div>
                <p className="text-arabic text-right text-emerald-900 leading-loose text-2xl mb-1">
                  {b.text}
                </p>
              </Link>
            ))
          )}
        </div>
      )}
    </main>
  );
}
