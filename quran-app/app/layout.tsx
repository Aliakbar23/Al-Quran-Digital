import type { Metadata, Viewport } from "next";
import { Amiri, Poppins } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import RegisterSW from "@/components/RegisterSW";
import AdhanAlarm from "@/components/AdhanAlarm";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Al-Quran Digital",
  description: "Baca Al-Quran, jadwal sholat, dzikir, dan lebih banyak lagi",
  manifest: "/manifest.json",
  referrer: "no-referrer",
  appleWebApp: {
    capable: true,
    title: "Al-Quran",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B4332",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${amiri.variable} ${poppins.variable} font-poppins min-h-screen bg-[#FAF6F0]`}>
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Pendaftaran PWA Service Worker */}
          <RegisterSW />

          {/* Pengingat Alarm Adzan Global */}
          <AdhanAlarm />

          {/* Sidebar khusus Desktop */}
          <Sidebar />

          {/* Kontainer Utama */}
          <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
            <div className="flex-1 max-w-4xl w-full mx-auto p-0 md:p-8 relative">
              {children}
            </div>
            {/* Bottom Nav khusus Mobile */}
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
