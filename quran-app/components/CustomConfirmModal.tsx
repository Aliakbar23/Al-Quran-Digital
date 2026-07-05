"use client";
import { useEffect, useState } from "react";

interface CustomConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export default function CustomConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Ya, Reset",
  cancelText = "Batal",
  isDanger = false,
}: CustomConfirmModalProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after mount
      const t = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(t);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Dark blur backdrop */}
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-[#0D2818]/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF6F0] p-6 shadow-2xl border border-gold/25 transition-transform duration-300 ease-out ${
          animate ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Islamic Ornament Top Detail */}
        <div className="absolute top-0 left-0 right-0 h-1.5 gradient-green" />
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-gold rounded-full opacity-60" />

        {/* Modal Content */}
        <div className="mt-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold text-2xl animate-pulse">
            ⚠️
          </div>

          <h3 className="mt-4 text-lg font-bold text-emerald-950 tracking-wide font-poppins">
            {title}
          </h3>
          
          <div className="divider-gold w-16 mx-auto my-2" />

          <p className="text-xs text-gray-500 leading-relaxed font-medium px-2">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-emerald-200 bg-white py-3 text-xs font-bold text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all outline-none"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-3 text-xs font-bold text-white shadow-md active:scale-95 transition-all outline-none ${
              isDanger
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/10"
                : "gradient-green hover:brightness-110 shadow-emerald-800/10"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
