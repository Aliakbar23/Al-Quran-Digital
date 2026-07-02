"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", icon: "🏠", label: "Beranda" },
  { href: "/quran", icon: "📖", label: "Al-Quran" },
  { href: "/sholat", icon: "🕌", label: "Sholat" },
  { href: "/dzikir", icon: "📿", label: "Dzikir" },
  { href: "/tasbih", icon: "🤲", label: "Tasbih" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t border-emerald-800/20 bg-emerald-900 z-50 md:hidden">
      <div className="flex">
        {NAV.map((n) => {
          const active = path === n.href || (n.href !== "/" && path.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors
                ${active ? "text-gold" : "text-emerald-400/70"}`}
            >
              <span className="text-xl leading-none">{n.icon}</span>
              {n.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
