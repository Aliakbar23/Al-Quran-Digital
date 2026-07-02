# 📖 Al-Quran Digital — PWA

PWA Islami lengkap dengan Al-Quran, jadwal sholat, dzikir, kiblat, Asmaul Husna, dan tasbih digital.

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS** (tema hijau-gold islami)
- **Dexie.js** (IndexedDB — bookmark & last read)
- **Al-Quran Cloud API** — data Al-Quran + terjemahan ID
- **Aladhan API** — jadwal sholat berbasis GPS

---

## Cara Jalankan

```bash
# 1. Install
npm install

# 2. Dev
npm run dev

# 3. Build + deploy
npm run build
vercel
```

---

## Struktur Halaman

| Route | Halaman |
|---|---|
| `/` | Beranda (dashboard, last read, jam, hijriah) |
| `/quran` | Daftar 114 surah |
| `/quran/[id]` | Baca surah (Arab + terjemahan, bookmark) |
| `/sholat` | Jadwal sholat 5 waktu (GPS) |
| `/dzikir` | Dzikir pagi, petang & doa harian |
| `/kiblat` | Kompas arah kiblat |
| `/asmaul-husna` | 99 nama Allah |
| `/tasbih` | Tasbih digital dengan progress ring |

---

## Fitur Per Halaman

### Beranda
- Jam + kalender Hijriah otomatis
- Widget "Lanjut Membaca" (tersimpan di Dexie)
- Quote Al-Quran

### Al-Quran
- Fetch dari alquran.cloud API
- Teks Arab font Amiri + terjemahan Bahasa Indonesia
- Ukuran font bisa diatur (A- / A+)
- Toggle tampilkan/sembunyikan terjemahan
- Bookmark per ayah (simpan ke Dexie)
- Navigasi surah prev/next
- Last read otomatis tersimpan

### Jadwal Sholat
- Deteksi GPS otomatis (fallback Jakarta)
- Highlight sholat berikutnya
- Countdown real-time
- Tanggal Hijriah

### Dzikir & Doa
- Dzikir pagi & petang dengan counter per dzikir
- Doa harian 10 doa (accordion expand)
- Counter +1 per tap, progress ke target

### Kiblat
- Kalkulasi sudut kiblat dari koordinat GPS
- Kompas visual dengan jarum bergerak
- Jarak ke Ka'bah dalam km
- Integrasi DeviceOrientation API

### Asmaul Husna
- 99 nama dengan teks Arab, latin, arti
- Tap kartu untuk expand detail
- Search by nama/arti

### Tasbih
- 6 preset dzikir populer
- Progress ring visual
- Hitung sesi selesai
- Vibrate feedback
- Reset hitungan / reset semua

---

## Tambah Ikon PWA
Letakkan `icon-192.png` dan `icon-512.png` di folder `/public/`
