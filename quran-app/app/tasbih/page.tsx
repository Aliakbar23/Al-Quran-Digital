"use client";
import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import CustomConfirmModal from "@/components/CustomConfirmModal";

const PRESETS = [
  { label: "SubhanAllah", arabic: "سُبْحَانَ اللَّهِ", target: 33 },
  { label: "Alhamdulillah", arabic: "اَلْحَمْدُ لِلَّهِ", target: 33 },
  { label: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", target: 34 },
  { label: "La Ilaha Illallah", arabic: "لَا إِلَهَ إِلَّا اللَّهُ", target: 100 },
  { label: "Istighfar", arabic: "أَسْتَغْفِرُ اللَّهَ", target: 100 },
  { label: "Sholawat", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّد", target: 100 },
];

interface TasbihItemState {
  count: number;
  sessions: number;
}

export default function TasbihPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [vibrate, setVibrate] = useState(false);
  const [data, setData] = useState<Record<number, TasbihItemState>>({});
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isResetAllOpen, setIsResetAllOpen] = useState(false);

  const preset = PRESETS[selectedIdx];
  const currentData = data[selectedIdx] || { count: 0, sessions: 0 };
  const count = currentData.count;
  const sessions = currentData.sessions;

  const progress = Math.min((count / preset.target) * 100, 100);
  const isDone = count >= preset.target;

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIdx = localStorage.getItem("tasbih_selected_idx");
      const savedData = localStorage.getItem("tasbih_data");
      
      if (savedIdx !== null) setSelectedIdx(Number(savedIdx));
      if (savedData !== null) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.error("Gagal memuat tasbih_data:", e);
        }
      }
    }
  }, []);

  const handleTap = () => {
    if (isDone) return;
    
    const nextCount = count + 1;
    const sessionCompleted = nextCount >= preset.target;
    const nextSessions = sessionCompleted ? sessions + 1 : sessions;

    setData((prev) => {
      const updated = {
        ...prev,
        [selectedIdx]: { count: nextCount, sessions: nextSessions },
      };
      localStorage.setItem("tasbih_data", JSON.stringify(updated));
      return updated;
    });

    if (sessionCompleted) {
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    } else {
      if (navigator.vibrate) navigator.vibrate(30);
    }
    
    setVibrate(true);
    setTimeout(() => setVibrate(false), 100);
  };

  const reset = () => {
    setIsResetOpen(true);
  };

  const handleConfirmReset = () => {
    setData((prev) => {
      const updated = {
        ...prev,
        [selectedIdx]: { count: 0, sessions: 0 },
      };
      localStorage.setItem("tasbih_data", JSON.stringify(updated));
      return updated;
    });
    setIsResetOpen(false);
  };

  const resetAll = () => {
    setIsResetAllOpen(true);
  };

  const handleConfirmResetAll = () => {
    setData({});
    localStorage.removeItem("tasbih_data");
    setIsResetAllOpen(false);
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedIdx(idx);
    localStorage.setItem("tasbih_selected_idx", String(idx));
  };

  return (
    <main className="pb-28">
      <PageHeader title="Tasbih Digital" subtitle="Hitung dzikir dengan mudah" />

      <div className="px-4 pt-5 flex flex-col items-center gap-5">
        {/* Pilih dzikir */}
        <div className="w-full">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">Pilih Dzikir</p>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSelectPreset(i)}
                className={`rounded-xl p-3 text-left text-sm transition-colors
                ${selectedIdx === i ? "gradient-green text-white" : "card-islamic text-emerald-900"}`}
              >
                <p className="font-semibold text-xs">{p.label}</p>
                <p className={`font-arabic text-base mt-0.5 ${selectedIdx === i ? "text-gold-light" : "text-emerald-600"}`}>
                  {p.arabic}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Counter utama */}
        <div className="w-full card-islamic p-6 text-center">
          <p className="font-arabic text-2xl text-emerald-700 leading-loose">{preset.arabic}</p>
          <p className="text-sm text-gold font-medium mt-1">{preset.label}</p>

          {/* Progress ring */}
          <div className="relative mx-auto mt-5 flex h-48 w-48 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={isDone ? "#C9A227" : "#1B4332"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>
            <div>
              <p className={`text-6xl font-bold ${isDone ? "text-gold" : "text-emerald-900"}`}>
                {count}
              </p>
              <p className="text-sm text-gray-400">/ {preset.target}</p>
            </div>
          </div>

          {isDone && (
            <div className="mt-3 rounded-xl bg-gold/10 border border-gold/30 p-3">
              <p className="text-sm font-semibold text-gold">🎉 Alhamdulillah! Selesai {sessions} sesi</p>
            </div>
          )}
        </div>

        {/* Tombol tap besar */}
        <button
          onClick={handleTap}
          disabled={isDone}
          className={`h-36 w-36 rounded-full text-4xl font-bold text-white shadow-[0_8px_0_rgba(0,0,0,0.3)]
          transition-all duration-75 active:scale-95 active:shadow-[0_2px_0_rgba(0,0,0,0.3)]
          ${vibrate ? "scale-95" : "scale-100"}
          ${isDone ? "bg-gold cursor-default" : "gradient-green cursor-pointer"}`}
        >
          {isDone ? "✓" : "🤲"}
        </button>
        <p className="text-xs text-gray-400">Ketuk untuk menghitung</p>

        {/* Reset buttons */}
        <div className="flex w-full gap-3">
          <button
            onClick={reset}
            className="flex-1 rounded-xl border-2 border-emerald-200 py-3 text-sm font-semibold text-emerald-700"
          >
            Reset Hitungan
          </button>
          <button
            onClick={resetAll}
            className="flex-1 rounded-xl border-2 border-red-100 py-3 text-sm font-semibold text-red-400"
          >
            Reset Semua
          </button>
        </div>

        {sessions > 0 && (
          <div className="w-full rounded-xl gradient-green p-4 text-center">
            <p className="text-sm text-emerald-300">Total sesi selesai</p>
            <p className="text-3xl font-bold text-white mt-1">{sessions}x</p>
            <p className="text-xs text-gold mt-0.5">{sessions * preset.target} kali dzikir</p>
          </div>
        )}
      </div>

      {/* Custom Confirmation Modals */}
      <CustomConfirmModal
        isOpen={isResetOpen}
        title="Reset Tasbih"
        message={`Apakah Anda yakin ingin me-reset hitungan untuk ${preset.label}? Semua sesi selesai untuk dzikir ini akan dikembalikan ke nol.`}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetOpen(false)}
      />

      <CustomConfirmModal
        isOpen={isResetAllOpen}
        title="Reset Semua Tasbih"
        message="Apakah Anda yakin ingin me-reset semua hitungan tasbih untuk seluruh dzikir? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleConfirmResetAll}
        onCancel={() => setIsResetAllOpen(false)}
        isDanger={true}
        confirmText="Ya, Reset Semua"
      />
    </main>
  );
}
