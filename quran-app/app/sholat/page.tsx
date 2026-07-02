"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { fetchPrayerTimes, SHOLAT_NAMES, SHOLAT_ICONS, type PrayerTimes } from "@/lib/api";
import { NIAT_SHOLAT, SHOLAT_STEPS, DOA_SETELAH_SHOLAT } from "@/data/panduan-sholat";

const SHOLAT_ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

function getNextPrayer(times: PrayerTimes) {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (const key of SHOLAT_ORDER) {
    const [h, m] = times[key].split(":").map(Number);
    if (h * 60 + m > nowMinutes) return key;
  }
  return "Fajr";
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function countdown(nextPrayer: string, times: PrayerTimes) {
  const now = new Date();
  const nowM = now.getHours() * 60 + now.getMinutes();
  const pM = timeToMinutes(times[nextPrayer as keyof PrayerTimes] as string);
  let diff = pM - nowM;
  if (diff < 0) diff += 24 * 60;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h > 0 ? `${h} jam ` : ""}${m} menit lagi`;
}

export default function SholatPage() {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [tick, setTick] = useState(0);
  const [activeTab, setActiveTab] = useState<"jadwal" | "niat" | "panduan" | "doa" | "jurnal">("jadwal");
  const [alarms, setAlarms] = useState<Record<string, boolean>>({
    Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false
  });

  // Habit Tracker (Jurnal Ibadah) States & Logic
  const [jurnalDate, setJurnalDate] = useState<string>("");
  const [trackerData, setTrackerData] = useState<Record<string, boolean>>({
    subuh: false, dzuhur: false, ashar: false, maghrib: false, isya: false,
    dhuha: false, tahajjud: false, rawatib: false,
    tilawah: false, dzikirPagi: false, dzikirPetang: false
  });
  const [weeklyHistory, setWeeklyHistory] = useState<{ date: string; percent: number; dayLabel: string }[]>([]);

  const loadTrackerData = (dateStr: string) => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(`jurnal_tracker_${dateStr}`);
    if (saved) {
      try {
        setTrackerData(JSON.parse(saved));
      } catch (e) {
        resetTrackerState();
      }
    } else {
      resetTrackerState();
    }
    
    // Load last 7 days history
    const history = [];
    const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toDateString();
      const raw = localStorage.getItem(`jurnal_tracker_${dStr}`);
      let checkedCount = 0;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          checkedCount = Object.values(parsed).filter(Boolean).length;
        } catch (e) {}
      }
      const total = 11; // 11 habits
      const pct = Math.round((checkedCount / total) * 100);
      history.push({
        date: dStr,
        percent: pct,
        dayLabel: weekdays[d.getDay()]
      });
    }
    setWeeklyHistory(history);
  };

  const resetTrackerState = () => {
    setTrackerData({
      subuh: false, dzuhur: false, ashar: false, maghrib: false, isya: false,
      dhuha: false, tahajjud: false, rawatib: false,
      tilawah: false, dzikirPagi: false, dzikirPetang: false
    });
  };

  const handleToggleHabit = (key: string) => {
    const updated = { ...trackerData, [key]: !trackerData[key] };
    setTrackerData(updated);
    localStorage.setItem(`jurnal_tracker_${jurnalDate}`, JSON.stringify(updated));
    
    // Refresh history with delay
    setTimeout(() => {
      if (jurnalDate) loadTrackerData(jurnalDate);
    }, 50);
  };

  const changeJurnalDate = (offset: number) => {
    const current = new Date(jurnalDate);
    current.setDate(current.getDate() + offset);
    const newStr = current.toDateString();
    setJurnalDate(newStr);
    loadTrackerData(newStr);
  };

  useEffect(() => {
    // Memuat pengaturan alarm yang tersimpan
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adhanAlarmSettings");
      if (saved) {
        try {
          setAlarms(JSON.parse(saved));
        } catch (e) {
          console.error("Gagal membaca adhanAlarmSettings:", e);
        }
      }
    }

    // Initialize Jurnal Date
    const todayStr = new Date().toDateString();
    setJurnalDate(todayStr);
    loadTrackerData(todayStr);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          localStorage.setItem("userCoordinates", JSON.stringify({ lat, lng }));

          const data = await fetchPrayerTimes(lat, lng);
          setTimes(data);
          setNextPrayer(getNextPrayer(data));

          // Simpan data jadwal sholat hari ini di cache
          localStorage.setItem("prayerTimesToday", JSON.stringify({
            date: new Date().toDateString(),
            times: data
          }));
        } catch {
          setError("Gagal memuat jadwal sholat");
        } finally {
          setLoading(false);
        }
      },
      () => {
        // fallback ke Jakarta jika GPS ditolak
        const lat = -6.2;
        const lng = 106.8;
        localStorage.setItem("userCoordinates", JSON.stringify({ lat, lng }));

        fetchPrayerTimes(lat, lng).then((data) => {
          setTimes(data);
          setNextPrayer(getNextPrayer(data));

          localStorage.setItem("prayerTimesToday", JSON.stringify({
            date: new Date().toDateString(),
            times: data
          }));
          setLoading(false);
        });
      }
    );
    const t = setInterval(() => {
      setTick((v) => v + 1);
    }, 60000);
    return () => clearInterval(t);
  }, []);

  // Update sholat berikutnya ketika menit berubah
  useEffect(() => {
    if (times) {
      setNextPrayer(getNextPrayer(times));
    }
  }, [tick, times]);

  const handleToggleAlarm = (key: string) => {
    const updated = { ...alarms, [key]: !alarms[key] };
    setAlarms(updated);
    localStorage.setItem("adhanAlarmSettings", JSON.stringify(updated));

    if (updated[key]) {
      // Meminta izin browser untuk mengirimkan notifikasi push
      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission !== "granted") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("Izin notifikasi disetujui.");
            }
          });
        }
      }

      // Putar preview adzan pendek selama 2 detik sebagai umpan balik visual & audio
      try {
        const audio = new Audio("https://raw.githubusercontent.com/muhammadyana/sistem-informasi-jadwal-sholat/master/adzan.mp3");
        audio.volume = 0.15;
        audio.play().then(() => {
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 2500);
        }).catch((e) => console.log("Autoplay preview diblokir browser:", e));
      } catch (e) {}
    }
  };

  return (
    <main className="pb-28">
      <PageHeader title="Jadwal Sholat" subtitle="Waktu sholat, panduan ibadah & doa lengkap" />

      {/* Tab Selector */}
      <div className="px-4 mt-6 mb-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("jadwal")}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "jadwal" ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"
            }`}
          >
            Anjungan Jadwal
          </button>
          <button
            onClick={() => setActiveTab("niat")}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "niat" ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"
            }`}
          >
            📖 Niat Sholat
          </button>
          <button
            onClick={() => setActiveTab("panduan")}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "panduan" ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"
            }`}
          >
            👣 Tata Cara Sholat
          </button>
          <button
            onClick={() => setActiveTab("doa")}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "doa" ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"
            }`}
          >
            📿 Doa Setelah Sholat
          </button>
          <button
            onClick={() => setActiveTab("jurnal")}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "jurnal" ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"
            }`}
          >
            📊 Jurnal Ibadah
          </button>
        </div>
      </div>

      {activeTab === "jadwal" && loading && (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
          <div className="text-4xl mb-3 animate-pulse">🕌</div>
          <p className="text-sm">Mendeteksi lokasi...</p>
        </div>
      )}

      {activeTab === "jadwal" && error && (
        <div className="mx-4 p-4 card-islamic bg-red-50 text-red-700 text-sm text-center">
          {error}
        </div>
      )}

      {activeTab === "jadwal" && times && (
        <div className="px-4 pt-5 space-y-4">
          {/* Tanggal */}
          <div className="card-islamic p-4 text-center">
            <p className="text-sm font-semibold text-emerald-700">{times.date}</p>
            <p className="text-xs text-gold mt-0.5">{times.hijriDate}</p>
          </div>

          {/* Sholat berikutnya highlight */}
          {nextPrayer && (
            <div className="rounded-2xl gradient-green p-5 text-center shadow-gold animate-fade-up">
              <p className="text-xs text-emerald-300 font-medium">Sholat Berikutnya</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {SHOLAT_ICONS[nextPrayer]} {SHOLAT_NAMES[nextPrayer]}
              </p>
              <p className="text-2xl font-bold text-gold mt-1">
                {times[nextPrayer as keyof PrayerTimes]}
              </p>
              <p className="mt-2 text-sm text-emerald-300">{countdown(nextPrayer, times)}</p>
            </div>
          )}

          {/* List semua waktu sholat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SHOLAT_ORDER.map((key) => {
              const isNext = key === nextPrayer;
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between rounded-2xl p-4 transition-all
                  ${isNext ? "bg-emerald-800 text-white shadow-soft" : "card-islamic"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{SHOLAT_ICONS[key]}</span>
                    <div>
                      <p className={`font-semibold text-sm ${isNext ? "text-white" : "text-emerald-900"}`}>
                        {SHOLAT_NAMES[key]}
                      </p>
                      <p className={`text-xs ${isNext ? "text-emerald-300" : "text-gray-400"}`}>{key}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${isNext ? "text-gold" : "text-emerald-700"}`}>
                      {times[key]}
                    </p>
                    <button
                      onClick={() => handleToggleAlarm(key)}
                      className={`text-xs mt-1 px-2.5 py-0.5 rounded-lg border font-semibold transition-all cursor-pointer
                        ${alarms[key]
                          ? (isNext ? "bg-gold text-emerald-900 border-gold shadow" : "bg-emerald-800 text-gold border-emerald-800")
                          : (isNext ? "bg-emerald-900/40 text-emerald-300 border-emerald-700" : "bg-white text-emerald-800/40 border-emerald-100 hover:bg-emerald-50")
                        }`}
                      title={alarms[key] ? "Matikan Alarm Adzan" : "Aktifkan Alarm Adzan"}
                    >
                      {alarms[key] ? "🔔 On" : "🔕 Off"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info & Pengaturan Alarm */}
          <div className="card-islamic p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
              <span className="text-xl">📢</span>
              <div>
                <p className="font-semibold text-emerald-900 text-sm">Notifikasi Adzan</p>
                <p className="text-[10px] text-gray-400">Alarm Adzan akan berbunyi di browser/PWA saat waktu sholat tiba.</p>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-gray-400 italic">
              *Catatan: Pastikan browser Anda mengizinkan suara dan notifikasi. Karena kebijakan autoplay browser modern, suara adzan hanya akan berputar otomatis jika Anda telah berinteraksi dengan aplikasi ini sebelumnya di hari tersebut.
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 pb-2">
            📍 Berdasarkan lokasi Anda · Metode Kemenag RI
          </p>
        </div>
      )}

      {/* Render Niat Sholat Tab */}
      {activeTab === "niat" && (
        <div className="px-4 pt-3 space-y-4">
          <div className="card-islamic p-4 bg-emerald-950/5 border-emerald-900/10 text-center">
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Niat Sholat Fardhu 5 Waktu</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {NIAT_SHOLAT.map((niat) => (
              <div key={niat.id} className="card-islamic p-5 animate-fade-up text-left">
                <p className="font-extrabold text-sm text-emerald-950 mb-3 border-b border-gold/15 pb-2">
                  {niat.nama}
                </p>
                <p className="text-arabic text-right text-2xl text-emerald-900 leading-loose mb-3">
                  {niat.arabic}
                </p>
                <p className="text-xs text-emerald-600 italic mb-2 leading-relaxed">
                  "{niat.latin}"
                </p>
                <p className="text-xs text-gray-500 leading-relaxed border-t border-emerald-500/5 pt-2">
                  {niat.arti}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Tata Cara Sholat Tab */}
      {activeTab === "panduan" && (
        <div className="px-4 pt-3 space-y-4">
          <div className="card-islamic p-4 bg-emerald-950/5 border-emerald-900/10 text-center">
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Tuntunan Tata Cara Gerakan Sholat</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {SHOLAT_STEPS.map((step) => (
              <div key={step.id} className="card-islamic p-5 animate-fade-up text-left">
                <p className="font-extrabold text-sm text-emerald-950 mb-2 pb-2 border-b border-gold/15">
                  {step.nama}
                </p>
                <p className="text-xs text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2.5 mb-4 leading-relaxed font-semibold border border-emerald-100/50">
                  💡 {step.instruksi}
                </p>
                <p className="text-arabic text-right text-2xl text-emerald-900 leading-loose mb-3">
                  {step.arabic}
                </p>
                <p className="text-xs text-emerald-600 italic mb-2 leading-relaxed">
                  "{step.latin}"
                </p>
                <p className="text-xs text-gray-500 leading-relaxed border-t border-emerald-500/5 pt-2">
                  {step.arti}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Doa Setelah Sholat Tab */}
      {activeTab === "doa" && (
        <div className="px-4 pt-3 space-y-4">
          <div className="card-islamic p-4 bg-emerald-950/5 border-emerald-900/10 text-center">
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Doa & Dzikir Setelah Sholat Fardhu</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {DOA_SETELAH_SHOLAT.map((item) => (
              <div key={item.id} className="card-islamic p-5 animate-fade-up text-left">
                <p className="font-extrabold text-sm text-emerald-950 mb-3 border-b border-gold/15 pb-2">
                  {item.judul}
                </p>
                <p className="text-arabic text-right text-2xl text-emerald-900 leading-loose mb-3">
                  {item.arabic}
                </p>
                <p className="text-xs text-emerald-600 italic mb-2 leading-relaxed">
                  "{item.latin}"
                </p>
                <p className="text-xs text-gray-500 leading-relaxed border-t border-emerald-500/5 pt-2">
                  {item.arti}
                </p>
                {item.sumber && (
                  <p className="text-[10px] text-gold font-semibold mt-2.5">
                    Sumber: {item.sumber}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Jurnal Ibadah (Habit Tracker) Tab */}
      {activeTab === "jurnal" && jurnalDate && (
        <div className="px-4 pt-3 space-y-5">
          {/* Header & Date Selector */}
          <div className="card-islamic p-4 flex items-center justify-between">
            <button
              onClick={() => changeJurnalDate(-1)}
              className="h-8 w-8 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-800 bg-emerald-50 hover:bg-emerald-100 cursor-pointer text-sm font-bold active:scale-90 transition-transform"
            >
              ←
            </button>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tanggal Jurnal</p>
              <p className="text-sm font-bold text-emerald-950">
                {new Date(jurnalDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <button
              onClick={() => changeJurnalDate(1)}
              className="h-8 w-8 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-800 bg-emerald-50 hover:bg-emerald-100 cursor-pointer text-sm font-bold active:scale-90 transition-transform"
            >
              →
            </button>
          </div>

          {/* Progress Card */}
          <div className="card-islamic p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="font-extrabold text-base text-emerald-950">Progres Ibadah Harian</h3>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Raihlah keistiqomahan dengan mencatat seluruh amalan wajib dan sunnah Anda setiap hari.
              </p>
            </div>
            
            {/* Progress circle */}
            {(() => {
              const checked = Object.values(trackerData).filter(Boolean).length;
              const pct = Math.round((checked / 11) * 100);
              return (
                <div className="relative flex h-24 w-24 items-center justify-center flex-shrink-0">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke={pct === 100 ? "#C9A227" : "#1B4332"}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-xl font-bold text-emerald-950">{pct}%</p>
                    <p className="text-[8px] text-gray-400 uppercase tracking-wider">{checked}/11 Item</p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Checklist Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sholat Wajib */}
            <div className="card-islamic p-4 text-left">
              <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-widest border-b border-emerald-50 pb-2 mb-3">
                🕌 Sholat Wajib
              </h4>
              <div className="space-y-3">
                {[
                  { key: "subuh", label: "Subuh" },
                  { key: "dzuhur", label: "Dzuhur" },
                  { key: "ashar", label: "Ashar" },
                  { key: "maghrib", label: "Maghrib" },
                  { key: "isya", label: "Isya" }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs select-none">
                    <input
                      type="checkbox"
                      checked={trackerData[item.key] || false}
                      onChange={() => handleToggleHabit(item.key)}
                      className="accent-emerald-700 h-4.5 w-4.5 rounded cursor-pointer"
                    />
                    <span className={`font-semibold ${trackerData[item.key] ? "text-emerald-900 line-through opacity-60" : "text-gray-700"}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sholat Sunnah */}
            <div className="card-islamic p-4 text-left">
              <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-widest border-b border-emerald-50 pb-2 mb-3">
                ⭐ Sholat Sunnah
              </h4>
              <div className="space-y-3">
                {[
                  { key: "dhuha", label: "Sholat Dhuha" },
                  { key: "tahajjud", label: "Sholat Tahajjud" },
                  { key: "rawatib", label: "Rawatib Sunnah" }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs select-none">
                    <input
                      type="checkbox"
                      checked={trackerData[item.key] || false}
                      onChange={() => handleToggleHabit(item.key)}
                      className="accent-emerald-700 h-4.5 w-4.5 rounded cursor-pointer"
                    />
                    <span className={`font-semibold ${trackerData[item.key] ? "text-emerald-900 line-through opacity-60" : "text-gray-700"}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ibadah Harian */}
            <div className="card-islamic p-4 text-left">
              <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-widest border-b border-emerald-50 pb-2 mb-3">
                📿 Ibadah Harian
              </h4>
              <div className="space-y-3">
                {[
                  { key: "tilawah", label: "Tilawah Al-Quran" },
                  { key: "dzikirPagi", label: "Dzikir Pagi" },
                  { key: "dzikirPetang", label: "Dzikir Petang" }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs select-none">
                    <input
                      type="checkbox"
                      checked={trackerData[item.key] || false}
                      onChange={() => handleToggleHabit(item.key)}
                      className="accent-emerald-700 h-4.5 w-4.5 rounded cursor-pointer"
                    />
                    <span className={`font-semibold ${trackerData[item.key] ? "text-emerald-900 line-through opacity-60" : "text-gray-700"}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly History (Visual Bar Chart) */}
          <div className="card-islamic p-5 text-left">
            <h4 className="font-extrabold text-sm text-emerald-950 mb-4 pb-2 border-b border-gold/15">
              📊 Riwayat Keistiqomahan (7 Hari Terakhir)
            </h4>
            <div className="flex items-end justify-between gap-1 h-28 pt-2">
              {weeklyHistory.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="text-[9px] font-bold text-emerald-800">{day.percent}%</div>
                  {/* Visual Bar */}
                  <div
                    className="w-full max-w-[28px] rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${Math.max(day.percent * 0.7, 4)}px`,
                      backgroundColor: day.percent === 100 ? "#C9A227" : day.percent >= 50 ? "#2D6A4F" : day.percent > 0 ? "#40916C" : "#e5e7eb"
                    }}
                  />
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">
                    {day.dayLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
