"use client";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Start fading out after 1.2 seconds
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 1300);

    // Completely unmount after transition completes (500ms duration)
    const unmountTimeout = setTimeout(() => {
      setIsMounted(false);
    }, 1800);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(unmountTimeout);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF6F0] transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Container for Loader Graphic */}
      <div className="relative flex items-center justify-center">
        
        {/* Animated Islamic Mandala Ring */}
        <div 
          className="absolute w-36 h-36 opacity-30 animate-spin"
          style={{ animationDuration: "12s" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#C9A227] stroke-[1.5]">
            {/* 8-point Islamic Star / Mandala Geometry */}
            <path d="M 50 5 L 63 37 L 95 50 L 63 63 L 50 95 L 37 63 L 5 50 L 37 37 Z" />
            <path d="M 50 12 L 60 40 L 88 50 L 60 60 L 50 88 L 40 60 L 12 50 L 40 40 Z" />
            <circle cx="50" cy="50" r="44" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Pulsing Gold Logo */}
        <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-white/60 rounded-full shadow-lg border border-gold/15 backdrop-blur-sm p-3">
          <img
            src="/icon-512x512.png"
            alt="Al-Quran Logo"
            className="w-full h-full object-contain animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center animate-fade-in">
        <h2 className="text-lg font-bold tracking-wider text-[#1B4332] uppercase">
          Al-Quran Digital
        </h2>
        <div className="divider-gold w-24 mx-auto my-2" />
        <p className="text-[10px] text-gold font-semibold uppercase tracking-widest animate-pulse">
          Memuat Keberkahan...
        </p>
      </div>
    </div>
  );
}
