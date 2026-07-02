// ---- Al-Quran equran.id API v2 (Kemenag RI) ----
const QURAN_BASE = "https://equran.id/api/v2";

export interface SurahMeta {
  number: number;
  name: string;         // Arab
  englishName: string;  // namaLatin
  englishNameTranslation: string; // arti
  numberOfAyahs: number;
  revelationType: string; // tempatTurun ("Mekah" / "Madinah")
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;         // teks Arab
  translation?: string; // terjemahan ID
  juz: number;
  page: number;
  audio: Record<string, string>;
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

// Ambil daftar semua surah
export async function fetchSurahList(): Promise<SurahMeta[]> {
  const res = await fetch(`${QURAN_BASE}/surat`);
  const json = await res.json();
  const list = json.data || [];
  return list.map((item: any) => ({
    number: item.nomor,
    name: item.nama,
    englishName: item.namaLatin,
    englishNameTranslation: item.arti,
    numberOfAyahs: item.jumlahAyat,
    revelationType: item.tempatTurun === "Mekah" ? "Meccan" : "Medinan",
  }));
}

// Ambil surah lengkap
export async function fetchSurah(surahNumber: number): Promise<SurahDetail> {
  const res = await fetch(`${QURAN_BASE}/surat/${surahNumber}`);
  const json = await res.json();
  const data = json.data;

  const ayahs: Ayah[] = data.ayat.map((a: any) => ({
    number: a.nomorAyat,
    numberInSurah: a.nomorAyat,
    text: a.teksArab,
    translation: a.teksIndonesia,
    juz: 1,
    page: 1,
    audio: a.audio || {},
  }));

  return {
    number: data.nomor,
    name: data.nama,
    englishName: data.namaLatin,
    englishNameTranslation: data.arti,
    numberOfAyahs: data.jumlahAyat,
    ayahs,
  };
}

// ---- Aladhan API — Jadwal Sholat ----
export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  date: string;
  hijriDate: string;
  location: string;
}

export async function fetchPrayerTimes(lat: number, lng: number): Promise<PrayerTimes> {
  const today = new Date();
  const d = String(today.getDate()).padStart(2, "0");
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const y = today.getFullYear();

  const res = await fetch(
    `https://api.aladhan.com/v1/timings/${d}-${m}-${y}?latitude=${lat}&longitude=${lng}&method=11`
  );
  const json = await res.json();
  const t = json.data.timings;
  const dateData = json.data.date;

  return {
    Fajr: t.Fajr,
    Dhuhr: t.Dhuhr,
    Asr: t.Asr,
    Maghrib: t.Maghrib,
    Isha: t.Isha,
    date: dateData.readable,
    hijriDate: `${dateData.hijri.day} ${dateData.hijri.month.en} ${dateData.hijri.year} H`,
    location: `${lat.toFixed(2)}, ${lng.toFixed(2)}`,
  };
}

// Nama sholat Indonesia
export const SHOLAT_NAMES: Record<string, string> = {
  Fajr: "Subuh",
  Dhuhr: "Dzuhur",
  Asr: "Ashar",
  Maghrib: "Maghrib",
  Isha: "Isya",
};

export const SHOLAT_ICONS: Record<string, string> = {
  Fajr: "🌙",
  Dhuhr: "☀️",
  Asr: "🌤️",
  Maghrib: "🌅",
  Isha: "⭐",
};

export interface AyahTafsir {
  ayat: number;
  teks: string;
}

export async function fetchSurahTafsir(surahNumber: number): Promise<Record<number, string>> {
  const res = await fetch(`https://equran.id/api/v2/tafsir/${surahNumber}`);
  const json = await res.json();
  const list = json.data.tafsir || [];
  const mapping: Record<number, string> = {};
  list.forEach((t: any) => {
    mapping[t.ayat] = t.teks;
  });
  return mapping;
}
