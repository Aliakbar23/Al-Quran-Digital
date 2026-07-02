# 📖 Panduan Alur Projek: Al-Quran Digital PWA

Dokumen ini ditujukan sebagai panduan cepat untuk AI coding assistant maupun developer agar dapat memahami struktur kode, arsitektur data, dan alur aplikasi ini tanpa harus membaca file satu per satu.

---

## 🚀 Ringkasan Projek

Aplikasi ini adalah **Al-Quran Digital PWA (Progressive Web App)** yang kaya fitur, berbasis **Next.js 14 (App Router)** dan **Tailwind CSS**. Halaman-halaman aplikasi dirancang agar responsif di seluruh perangkat (iOS, Android, macOS, Windows, Linux, Laptop/Desktop) dan dapat diinstal langsung ke perangkat (PWA) dengan mekanisme pembaruan otomatis (auto-update) saat kode sumber diperbarui.

### 🎨 Desain & Estetika
Aplikasi menggunakan skema warna **Hijau Islami & Gold** premium:
- Hijau Emerald (`#0D2818`, `#1B4332`, `#2D6A4F`) melambangkan nuansa tenang dan sakral.
- Gold Aksen (`#C9A227`, `#E8C547`) untuk elemen pembatas (`divider-gold`), tombol aksi, nomor ayat, dan status aktif.
- Background Cream Soft (`#FAF6F0`) untuk kenyamanan mata saat membaca durasi lama.
- Font: **Amiri** (teks Arab) dan **Poppins** (teks Indonesia/navigasi).

---

## 📁 Struktur Folder & File Utama

```text
quran-digital-pwa/
├── BACA_DULU.md                   # Dokumen panduan ini (Root)
└── quran-app/                     # Folder utama aplikasi Next.js
    ├── app/                       # Routing halaman (App Router)
    │   ├── layout.tsx             # Layout utama, sidebar desktop & bottom nav mobile
    │   ├── page.tsx               # Halaman Beranda (dashboard)
    │   ├── globals.css            # Custom CSS & token styling
    │   ├── quran/                 # Halaman Al-Quran
    │   │   ├── page.tsx           # Daftar 114 Surah (fitur pencarian)
    │   │   └── [id]/              # Halaman detail baca Surah
    │   ├── sholat/                # Halaman jadwal sholat berbasis GPS
    │   ├── dzikir/                # Halaman Dzikir Pagi, Petang, & Doa Harian
    │   ├── kiblat/                # Kompas arah Kiblat & jarak Ka'bah
    │   ├── asmaul-husna/          # 99 Nama Allah beserta pencarian
    │   └── tasbih/                # Tasbih digital (progress ring, vibrasi, & preset)
    ├── components/                # Komponen UI Reusable
    │   ├── BottomNav.tsx          # Navigasi bawah untuk perangkat mobile (< md)
    │   ├── PageHeader.tsx         # Header halaman standar
    │   ├── RegisterSW.tsx         # Pendaftaran Service Worker & Auto-Reload
    │   └── AdhanAlarm.tsx         # Fitur Pengingat & Alarm Adzan Global
    ├── lib/                       # Utility & Integrasi Data
    │   ├── api.ts                 # Integrasi API (equran.id & aladhan.com)
    │   └── db.ts                  # Database IndexedDB via Dexie.js (bookmark, last read)
    ├── public/                    # Aset statis & Service Worker PWA
    │   ├── manifest.json          # Konfigurasi manifest PWA
    │   ├── sw.js                  # Service Worker untuk caching offline & skipWaiting
    │   ├── icon-192.png           # Ikon PWA 192px (Gold-Green Theme)
    │   └── icon-512.png           # Ikon PWA 512px (Gold-Green Theme)
    ├── tailwind.config.js         # Konfigurasi utility Tailwind (theme & colors)
    └── package.json               # Dependensi & script build
```

---

## 🔌 Sumber Data & API

1. **Al-Quran & Terjemahan**
   - **Sumber Resmi:** [equran.id API v2](https://equran.id/api/v2) (Terverifikasi Kementerian Agama RI).
   - **Endpoint Daftar Surah:** `GET https://equran.id/api/v2/surat`
   - **Endpoint Detail Surah:** `GET https://equran.id/api/v2/surat/{nomor}`
   - **Kelebihan:** Data gratis, bersumber langsung dari Kemenag RI, tanpa API key, memiliki CDN caching cepat, dan menyertakan file audio per ayat dari 6 qari terkemuka.

2. **Jadwal Sholat**
   - **Sumber:** [Aladhan API](https://api.aladhan.com)
   - **Endpoint:** `GET https://api.aladhan.com/v1/timings/{tanggal}?latitude={lat}&longitude={lng}&method=11`
   - **Keterangan:** Menggunakan koordinat GPS perangkat secara *real-time* (dengan fallback Kota Jakarta) serta menerapkan metode Kemenag RI (Method `11`).

---

## 💾 Penyimpanan Lokal (IndexedDB via Dexie.js)

Aplikasi menyimpan data sensitif secara lokal untuk mendukung penggunaan luring (offline) yang andal:
- **`lastRead`**: Menyimpan riwayat terakhir dibaca (Surah & nomor ayat) secara otomatis saat masuk ke halaman baca. Halaman beranda akan menampilkan widget "Lanjut Membaca".
- **`bookmarks`**: Menyimpan ayat-ayat pilihan pengguna (bisa ditandai/dihapus per ayat).
- **`tasbih`**: Menyimpan hitungan sesi tasbih digital agar progres tidak hilang jika browser ditutup.
- **`cachedSurahs`**: Caching internal data teks ayat untuk mempercepat pemuatan halaman detail surah.

---

## 📱 PWA & Mekanisme Auto-Update (Tanpa Install Ulang)

Untuk menjamin pengguna mendapatkan versi terbaru aplikasi tanpa harus menghapus instalan PWA secara manual:
1. **Service Worker (`public/sw.js`)**:
   - Diatur agar langsung mengaktifkan diri (`self.skipWaiting()`) setelah mendeteksi file service worker baru di server.
   - Menghubungkan seluruh tab aktif secara instan (`self.clients.claim()`) begitu aktif.
2. **Client-Side Auto-Update (`components/RegisterSW.tsx`)**:
   - Mendaftarkan service worker.
   - Memantau perubahan controller (`controllerchange` event). Jika terdeteksi service worker baru mengambil alih kontrol, aplikasi akan melakukan **`window.location.reload()`** secara otomatis untuk memuat file visual, stylesheet, dan script terbaru.

---

## 💻 Tata Letak Responsif (Desktop & Mobile)

Aplikasi memiliki dua mode visual yang menyesuaikan resolusi layar:
- **Mobile Mode (< 768px)**:
  - Layout satu kolom terpusat yang pas di genggaman tangan.
  - Menggunakan navigasi bawah (`BottomNav`) yang menempel di bagian bawah layar.
- **Desktop/Tablet Mode (>= 768px)**:
  - Menampilkan panel navigasi samping (Sidebar) elegan di sisi kiri.
  - Menyembunyikan navigasi bawah (`md:hidden`).
  - Mengubah daftar surah dan menu beranda menjadi grid 2-3 kolom agar area layar laptop/desktop terisi dengan cantik dan proporsional.
  - Membaca Al-Quran menggunakan kolom teks lebar menengah dengan font Amiri besar agar nyaman dibaca di layar monitor.

---

## 🔔 Alarm Adzan & Notifikasi Global

Untuk membantu pengguna mengingat waktu sholat, aplikasi ini dilengkapi sistem alarm adzan terintegrasi:
1. **Penyimpanan Setelan**: Status aktif alarm disimpan di `localStorage` per waktu sholat (`adhanAlarmSettings`), yang diatur pengguna di halaman Jadwal Sholat.
2. **Background Alarm Daemon (`components/AdhanAlarm.tsx`)**:
   - Berjalan secara global di dalam root layout agar terus memantau kecocokan waktu tanpa terputus saat berpindah halaman.
   - Membandingkan jam perangkat lokal dengan jadwal sholat hari ini setiap 30 detik.
3. **Mekanisme Notifikasi & Audio**:
   - Jika waktu sholat tiba dan alarm aktif, aplikasi memicu browser **HTML5 Push Notification** (jika izin disetujui) dan memutar file audio adzan lengkap.
   - Menyediakan tampilan **overlay modal global** yang memberi tahu waktu sholat telah masuk beserta tombol **"Matikan Suara Adzan & Tutup"** untuk menghentikan audio secara instan.
