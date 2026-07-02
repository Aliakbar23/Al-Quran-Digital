"use client";
import { useEffect, useState, useRef } from "react";
import { fetchPrayerTimes, SHOLAT_NAMES } from "@/lib/api";

const SHOLAT_KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export default function AdhanAlarm() {
  const [activeSholat, setActiveSholat] = useState<string | null>(null);
  const lastTriggeredRef = useRef<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStopAdhan = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {}
      audioRef.current = null;
    }
    setActiveSholat(null);
  };

  // Dengarkan pesan dari Service Worker (misal: notifikasi di-swipe tutup atau di-klik)
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.action === "stopAdhan") {
        console.log("AdhanAlarm: Menerima pesan stopAdhan dari Service Worker");
        handleStopAdhan();
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Muat last triggered dari localStorage jika ada
    const savedLast = localStorage.getItem("adhanLastTriggered");
    if (savedLast) {
      lastTriggeredRef.current = savedLast;
    }

    const checkAlarm = async () => {
      try {
        const todayStr = new Date().toDateString();
        
        // 1. Ambil jadwal sholat dari localStorage cache
        let cached = localStorage.getItem("prayerTimesToday");
        let parsed = cached ? JSON.parse(cached) : null;

        if (!parsed || parsed.date !== todayStr) {
          console.log("AdhanAlarm: Mengambil jadwal sholat hari ini...");
          let coords = { lat: -6.2, lng: 106.8 };
          const savedCoords = localStorage.getItem("userCoordinates");
          if (savedCoords) {
            try { coords = JSON.parse(savedCoords); } catch (e) {}
          }
          const fetchedTimes = await fetchPrayerTimes(coords.lat, coords.lng);
          parsed = { date: todayStr, times: fetchedTimes };
          localStorage.setItem("prayerTimesToday", JSON.stringify(parsed));
        }

        const times = parsed.times;
        if (!times) return;

        // 2. Ambil waktu saat ini (HH:MM)
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, "0");
        const mins = String(now.getMinutes()).padStart(2, "0");
        const timeString = `${hrs}:${mins}`;

        // 3. Muat pengaturan alarm (aktif/nonaktif per sholat)
        const alarmSettingsRaw = localStorage.getItem("adhanAlarmSettings");
        const alarmSettings = alarmSettingsRaw ? JSON.parse(alarmSettingsRaw) : {};

        // 4. Periksa kecocokan waktu sholat
        for (const key of SHOLAT_KEYS) {
          const prayerTime = times[key];
          if (prayerTime && prayerTime === timeString) {
            const alarmId = `${todayStr}-${key}`;
            
            // Cek jika alarm sholat ini belum terbunyi hari ini pada menit ini
            if (lastTriggeredRef.current !== alarmId && alarmSettings[key] === true) {
              lastTriggeredRef.current = alarmId;
              localStorage.setItem("adhanLastTriggered", alarmId);

              const sholatName = SHOLAT_NAMES[key];
              setActiveSholat(sholatName);

              // Kirim Notifikasi Push melalui Service Worker Registration agar terhubung ke listener klik/geser
              if ("serviceWorker" in navigator && "Notification" in window) {
                if (Notification.permission === "granted") {
                  navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification(`Waktu Sholat ${sholatName} Tiba`, {
                      body: `Sudah masuk waktu sholat ${sholatName} (${prayerTime}). Mari tunaikan ibadah tepat waktu.`,
                      icon: "/icon-192.png",
                      tag: "adhan-alarm",
                      requireInteraction: true,
                    });
                  }).catch((err) => console.error("SW ready error:", err));
                }
              }

              // Putar Audio Adzan
              console.log(`AdhanAlarm: Memutar adzan untuk sholat ${sholatName}`);
              const audio = new Audio("https://raw.githubusercontent.com/muhammadyana/sistem-informasi-jadwal-sholat/master/adzan.mp3");
              audio.volume = 0.8;
              audio.loop = false;
              audioRef.current = audio;
              
              audio.play().catch((e) => {
                console.warn("Autoplay adzan diblokir oleh browser. Pengguna harus berinteraksi dulu.", e);
              });
            }
          }
        }
      } catch (err) {
        console.error("AdhanAlarm error:", err);
      }
    };

    const interval = setInterval(checkAlarm, 30000);
    checkAlarm();

    return () => clearInterval(interval);
  }, []);

  if (!activeSholat) return null;

  return (
    <div className="fixed inset-0 bg-emerald-950/90 z-[9999] flex flex-col items-center justify-center p-6 text-center animate-fade-up">
      {/* Ornamen Atas */}
      <div className="text-6xl mb-6 animate-pulse">🕌</div>

      <div className="max-w-md w-full bg-emerald-900 border border-gold/30 rounded-3xl p-8 shadow-gold relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-emerald-950 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
          Waktu Sholat
        </span>

        <h2 className="text-2xl font-bold text-white mt-2">Adzan Berkumandang</h2>
        <p className="text-gold text-lg font-semibold mt-1">Waktu Sholat {activeSholat} Telah Tiba</p>

        {/* Teks Kaligrafi Arab */}
        <div className="my-6 py-4 border-y border-gold/10">
          <p className="font-arabic text-3xl text-gold-light leading-relaxed">
            حَيَّ عَلَى الصَّلَاةِ
          </p>
          <p className="text-xs text-emerald-300 mt-2 italic">"Mari menunaikan shalat"</p>
        </div>

        <p className="text-xs text-emerald-200/80 mb-6 leading-relaxed">
          "Sesungguhnya shalat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman."
          <span className="block mt-0.5 text-gold/70 text-[10px]">— QS. An-Nisa: 103</span>
        </p>

        <button
          onClick={handleStopAdhan}
          className="w-full rounded-2xl bg-gold text-emerald-950 font-bold py-4 hover:bg-gold-light active:scale-95 transition-all text-sm shadow-md"
        >
          Matikan Suara Adzan & Tutup
        </button>
      </div>
    </div>
  );
}
