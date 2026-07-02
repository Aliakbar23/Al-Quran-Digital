"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", icon: "🏠", label: "Beranda" },
  { href: "/quran", icon: "📖", label: "Al-Quran" },
  { href: "/sholat", icon: "🕌", label: "Jadwal Sholat" },
  { href: "/dzikir", icon: "📿", label: "Dzikir & Doa" },
  { href: "/tasbih", icon: "🤲", label: "Tasbih Digital" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-emerald-900 border-r border-emerald-800/20 text-white z-40">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gold flex items-center gap-2">
          <span>📖</span> Al-Quran Digital
        </h1>
        <p className="text-xs text-emerald-300 mt-1">Aplikasi Al-Quran Digital</p>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-1">
        {NAV.map((n) => {
          const active = path === n.href || (n.href !== "/" && path.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${active ? "bg-emerald-800 text-gold shadow-md" : "text-emerald-300/80 hover:bg-emerald-800/40 hover:text-white"}`}
            >
              <span className="text-lg leading-none">{n.icon}</span>
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-emerald-800/20 text-center">
        <p className="text-[10px] text-emerald-400">© Kemenag RI Database</p>
        <p className="text-[9px] text-gold-light/60 mt-0.5 font-medium">PWA Auto-Update</p>
      </div>
    </aside>
  );
}
