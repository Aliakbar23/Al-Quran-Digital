# 🕌 Al-Quran Digital PWA (Offline-First)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-1b4332?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-1b4332?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-1b4332?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-1b4332?style=for-the-badge&logo=progressive-web-apps&logoColor=white)](https://web.dev/progressive-web-apps/)

Sebuah aplikasi web progresif (PWA) Islami modern yang dirancang secara premium dengan pendekatan **Offline-First**, performa tinggi, dan responsivitas penuh di perangkat Mobile, Tablet, maupun Desktop. Aplikasi ini menyatukan Al-Quran digital, pengingat sholat, jurnal amalan harian, dan tuntunan ibadah lengkap dalam satu platform yang aman dan privat.

---

## ✨ Fitur Utama (Features)

### 1. 📖 Al-Quran Digital Premium
* **Tajwid Berwarna Dinamis**: Penandaan hukum tajwid dasar (Ghunnah, Qalqalah, Ikhfa, Idgham, dan Iqlab) secara otomatis menggunakan skema warna standar mushaf cetak internasional.
* **Integrasi Tafsir Kemenag**: Akses penjelasan mendalam per-ayat dari Kementerian Agama RI secara kolapsibel dengan transisi halus.
* **Tahfidz Helper**: Opsi pengulangan audio ayat (1x, 3x, 5x, 10x) untuk membantu mempermudah hafalan secara mandiri.
* **Pilihan Multi-Qari**: Dukungan streaming audio murottal dari 5 Qari ternama dunia (termasuk Misyari Rasyid Al-Afasy, Abdurrahman As-Sudais, dll).
* **Bookmark & Auto-Scroll**: Menandai ayat pilihan ke halaman Bookmark dan dukungan bergulir otomatis langsung ke nomor ayat tujuan melalui tautan hash URL.

### 2. 🕌 Jadwal Sholat & Alarm Adzan
* **Deteksi Lokasi GPS**: Mengkalkulasi jadwal sholat 5 waktu secara presisi berbasis titik koordinat geolokasi pengguna (Metode Kemenag RI).
* **Alarm Adzan Audio**: Pengingat suara adzan yang otomatis berbunyi tepat ketika waktu sholat tiba di dalam browser/PWA Anda.

### 3. 👣 Panduan Sholat & Doa Lengkap
* **Niat Sholat Fardhu**: Tuntunan niat sholat wajib 5 waktu beserta lafal Arab, Latin, dan terjemahannya.
* **Tata Cara Gerakan**: Panduan langkah demi langkah (10 gerakan) sholat yang benar, lengkap dengan bacaan dan instruksi gerakan.
* **Doa & Dzikir Pasca-Sholat**: Rangkaian dzikir utama lengkap setelah melaksanakan sholat fardhu.

### 4. 📿 Dzikir & Kumpulan Doa Offline
* **Dzikir Al-Ma'tsurat**: Bacaan Dzikir Pagi dan Sore lengkap dengan audio serta faedah membacanya.
* **25 Doa Harian Terpopuler**: Database offline doa sehari-hari terpercaya (lengkap dengan sanad hadits) yang dapat diakses instan tanpa koneksi internet.
* **Auto-Reset Sholawat Harian**: Pencatat jumlah sholawat nabi di beranda utama yang otomatis disetel ulang ke angka `0` saat pergantian hari kalender.

### 5. 📊 Jurnal Ibadah Harian (Habit Tracker)
* **Pencatat Amalan**: Lembar checklist harian untuk memantau Sholat Wajib, Sholat Sunnah (Dhuha, Tahajjud, Rawatib), dan Ibadah Harian (Tilawah, Dzikir).
* **Riwayat Keistiqomahan**: Visualisasi statistik perkembangan ibadah pengguna dalam 7 hari terakhir melalui grafik batang (*bar chart*) interaktif.
* **Navigasi Kalender**: Kemudahan untuk mencatat amalan hari ini atau menginspeksi catatan amalan di hari-hari sebelumnya.

### 6. 🤲 Tasbih Digital Persisten
* **Penyimpanan Hitungan**: Menyimpan jumlah ketukan dzikir aktif dan total akumulasi sesi secara otomatis. Hitungan tidak akan ter-reset meskipun aplikasi ditutup.
* **Pilihan Lafal Preset**: Pilihan dzikir populer (SubhanAllah, Alhamdulillah, Allahu Akbar, Istighfar, dll) dengan batas target getaran (*haptic vibration*) bawaan.

---

## 🛠️ Tech Stack & Arsitektur

* **Framework Utama**: Next.js 14 (App Router)
* **Bahasa Pemrograman**: TypeScript (Type-Safe)
* **Desain & Styling**: TailwindCSS (Responsive layout & Modern Glassmorphism)
* **Penyimpanan Lokal (Database)**: 
  * **IndexedDB (via Dexie.js)** untuk manajemen bookmarks dan riwayat bacaan.
  * **LocalStorage** untuk data Tasbih, Sholawat, dan Jurnal Ibadah harian.
* **Keamanan & Privasi**: **100% Client-Side**. Seluruh data masukan pengguna tersimpan di dalam memori fisik perangkat pribadi, menjamin kerahasiaan data tanpa risiko kebocoran server.

---

## 📱 Pemasangan Sebagai Aplikasi PWA

Aplikasi ini mendukung fungsionalitas PWA penuh pada perangkat Android, iOS, maupun Desktop:
1. Buka situs web aplikasi di peramban Anda (gunakan **Google Chrome** di Android/PC atau **Safari** di iOS).
2. Tekan tombol **"Install App"** pada bar pencarian browser (atau pilih menu **"Add to Home Screen"** / **"Tambahkan ke Layar Utama"** pada opsi bagikan Safari iOS).
3. Ikon logo emas-hijau premium aplikasi akan terpasang di menu utama HP Anda dan siap digunakan layaknya aplikasi native tanpa frame peramban.

---

## 🔒 Kepemilikan & Hak Cipta
Aplikasi ini dikembangkan secara pribadi oleh **Aliakbar**. Seluruh kode sumber bersifat tertutup (*proprietary*). Dilarang keras menyalin, mempublikasikan ulang, mendistribusikan, atau memodifikasi kode ini tanpa izin tertulis dari pemilik hak cipta.
