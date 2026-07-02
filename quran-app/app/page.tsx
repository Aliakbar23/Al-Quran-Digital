"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getLastRead, type LastRead } from "@/lib/db";

const MENU = [
  { href: "/quran", icon: "📖", label: "Al-Quran", desc: "114 Surah lengkap" },
  { href: "/sholat", icon: "🕌", label: "Jadwal Sholat", desc: "Waktu sholat hari ini" },
  { href: "/dzikir", icon: "📿", label: "Dzikir & Doa", desc: "Pagi, petang & harian" },
  { href: "/tajwid", icon: "📝", label: "Belajar Tajwid", desc: "Hukum bacaan & audio" },
  { href: "/asmaul-husna", icon: "✨", label: "Asmaul Husna", desc: "99 nama Allah" },
  { href: "/tasbih", icon: "🤲", label: "Tasbih Digital", desc: "Hitung dzikir" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat Pagi";
  if (h < 15) return "Selamat Siang";
  if (h < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function getHijriDate() {
  try {
    return new Intl.DateTimeFormat("id-ID-u-ca-islamic", {
      day: "numeric", month: "long", year: "numeric",
    }).format(new Date());
  } catch {
    return "";
  }
}

export default function HomePage() {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [time, setTime] = useState("");
  const [sholawatCount, setSholawatCount] = useState(0);
  const [popBadge, setPopBadge] = useState(false);

  useEffect(() => {
    getLastRead().then((r) => setLastRead(r ?? null));
    
    // Load persisted sholawat count with daily reset logic
    const todayKey = new Date().toDateString();
    const savedDate = localStorage.getItem("homepage_sholawat_date");
    const savedCount = localStorage.getItem("homepage_sholawat_count");

    if (savedDate === todayKey && savedCount) {
      setSholawatCount(parseInt(savedCount, 10));
    } else {
      setSholawatCount(0);
      localStorage.setItem("homepage_sholawat_date", todayKey);
      localStorage.setItem("homepage_sholawat_count", "0");
    }

    const tick = () => setTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  // Web Audio API Synthesizer untuk Bel Chime (Offline-Capable)
  const playChime = () => {
    if (typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        try {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          // Suara lonceng lembut (sine wave)
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, ctx.currentTime); // Nada A5
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);
          
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.9);
        } catch (e) {
          console.warn("AudioContext blocked/failed:", e);
        }
      }
    }
  };

  const handleIncrementSholawat = () => {
    const todayKey = new Date().toDateString();
    const nextCount = sholawatCount + 1;
    setSholawatCount(nextCount);
    localStorage.setItem("homepage_sholawat_date", todayKey);
    localStorage.setItem("homepage_sholawat_count", nextCount.toString());
    
    // Suara bel chime spiritual
    playChime();

    // Trigger animasi letupan badge
    setPopBadge(true);
    setTimeout(() => setPopBadge(false), 200);
  };

  return (
    <main className="pb-24">
      {/* Header hero premium beranimasi */}
      <div className="gradient-green px-5 pb-8 pt-10 md:rounded-3xl md:shadow-card relative overflow-hidden">
        {/* Latar belakang ornamen berputar lambat */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8 animate-spin" style={{ animationDuration: '20s' }}>
          <svg viewBox="0 0 100 100" fill="white">
            <polygon points="50,0 60,35 95,35 65,55 75,90 50,70 25,90 35,55 5,35 40,35" />
          </svg>
        </div>

        <div className="flex justify-between items-start z-10 relative">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300 h-5" suppressHydrationWarning>
              ✨ {getGreeting()}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-white tracking-wide">بِسْمِ اللَّهِ</h1>
            <p className="font-arabic text-lg text-gold-light mt-0.5">الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>

          <div className="text-right bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-2.5 backdrop-blur-md animate-glow">
            <p className="text-xl font-bold text-white tracking-wide h-6" suppressHydrationWarning>
              {time}
            </p>
            <p className="text-[10px] text-emerald-200 mt-0.5 h-4" suppressHydrationWarning>
              {getHijriDate()}
            </p>
          </div>
        </div>

        {/* Card Sholawat Nabi Interaktif */}
        <div className="mt-5 bg-emerald-950/40 rounded-2xl p-4 border border-gold/20 text-center relative overflow-hidden backdrop-blur-md animate-float">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
          <p className="font-arabic text-xl text-gold-light leading-loose">
            اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
          </p>
          <p className="text-[10px] text-emerald-300 mt-1.5 italic">
            "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan kepada keluarga Nabi Muhammad."
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-emerald-800/40 pt-3">
            <div className="text-left">
              <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">Sholawat Hari Ini</p>
              <p className={`text-xl font-extrabold text-white transition-transform ${popBadge ? 'scale-125 text-gold' : 'scale-100'}`}>
                {sholawatCount} <span className="text-xs font-normal text-emerald-300">kali</span>
              </p>
            </div>
            
            <button
              onClick={handleIncrementSholawat}
              className="flex items-center gap-1.5 bg-gold text-emerald-950 hover:bg-yellow-400 font-bold px-4 py-2 rounded-xl text-xs shadow-gold transition-all active:scale-95 hover:shadow-lg"
            >
              ❤️ Kirim Sholawat
            </button>
          </div>
        </div>

        {/* Tanggal Masehi */}
        <div className="mt-4 text-center">
          <p className="text-xs text-emerald-300" suppressHydrationWarning>
            {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Lanjut baca */}
      {lastRead && (
        <div className="mx-4 -mt-4 z-10 relative animate-fade-up">
          <Link
            href={`/quran/${lastRead.surahNumber}`}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card border border-gold/20 hover:border-gold transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-green text-white text-xl animate-pulse">
              📖
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Lanjut Membaca</p>
              <p className="font-bold text-emerald-950">{lastRead.surahName}</p>
              <p className="text-xs text-gray-400">Ayah {lastRead.ayahNumber}</p>
            </div>
            <span className="text-gold text-xl font-bold">›</span>
          </Link>
        </div>
      )}

      {/* Menu grid */}
      <div className="px-4 pt-6">
        <h2 className="mb-3 text-xs font-bold text-emerald-800 uppercase tracking-widest pl-1">Akses Layanan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {MENU.map((m, i) => (
            <Link
              key={m.href}
              href={m.href}
              className="card-islamic p-4 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold hover:border-gold/50 cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-3xl transition-transform duration-300 hover:scale-110">{m.icon}</span>
              <div>
                <p className="font-bold text-emerald-950 text-sm">{m.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quote islami */}
      <div className="mx-4 mt-6 rounded-2xl gradient-green p-5 text-center relative overflow-hidden border border-gold/10">
        <p className="font-arabic text-xl text-gold-light leading-loose">
          وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا
        </p>
        <p className="mt-2 text-xs text-emerald-200 italic">
          "Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya."
        </p>
        <p className="mt-1.5 text-[10px] text-gold/60 font-semibold">QS. At-Talaq: 2</p>
      </div>
    </main>
  );
}
