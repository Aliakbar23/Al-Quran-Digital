export interface DzikirItem {
  id: number;
  arabic: string;
  latin: string;
  arti: string;
  count: number; // berapa kali dibaca
  faedah?: string;
}

export interface DoaItem {
  id: number;
  judul: string;
  arabic: string;
  latin: string;
  arti: string;
}

export const DZIKIR_PAGI: DzikirItem[] = [
  {
    id: 1,
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    latin: "Ashbahnaa wa ashbahal mulku lillaah, walhamdulillaah, laa ilaaha illallaahu wahdahu laa syariika lah",
    arti: "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya.",
    count: 1,
    faedah: "Dibaca saat pagi hari",
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    latin: "Allaahumma bika ashbahnaa, wa bika amsaynaa, wa bika nahyaa, wa bika namuutu, wa ilaykan nusyuur",
    arti: "Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang. Dengan rahmat dan pertolongan-Mu kami hidup dan dengan kehendak-Mu kami mati. Dan kepada-Mu kebangkitan (kami).",
    count: 1,
  },
  {
    id: 3,
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    latin: "Subhaanallaahi wa bihamdih",
    arti: "Maha Suci Allah dan segala puji bagi-Nya.",
    count: 100,
    faedah: "Dibaca 100x",
  },
  {
    id: 4,
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    latin: "A'uudzu billaahi minasy-syaythaanir rajiim",
    arti: "Aku berlindung kepada Allah dari godaan setan yang terkutuk.",
    count: 3,
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka",
    arti: "Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu.",
    count: 1,
    faedah: "Sayyidul Istighfar",
  },
];

export const DZIKIR_PETANG: DzikirItem[] = [
  {
    id: 1,
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    latin: "Amsaynaa wa amsal mulku lillaah, walhamdulillaah, laa ilaaha illallaahu wahdahu laa syariika lah",
    arti: "Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya.",
    count: 1,
    faedah: "Dibaca saat petang hari",
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    latin: "Allaahumma bika amsaynaa, wa bika ashbahnaa, wa bika nahyaa, wa bika namuutu, wa ilaykal mashiir",
    arti: "Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi. Dengan rahmat dan pertolongan-Mu kami hidup dan dengan kehendak-Mu kami mati. Dan kepada-Mu (kami) kembali.",
    count: 1,
  },
  {
    id: 3,
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    latin: "Subhaanallaahi wa bihamdih",
    arti: "Maha Suci Allah dan segala puji bagi-Nya.",
    count: 100,
    faedah: "Dibaca 100x",
  },
];

export const DOA_HARIAN: DoaItem[] = [
  {
    id: 1,
    judul: "Doa Sebelum Makan",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    latin: "Bismillaahi wa 'alaa barakatillaah",
    arti: "Dengan nama Allah dan atas berkah Allah.",
  },
  {
    id: 2,
    judul: "Doa Sesudah Makan",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin: "Alhamdulillaahil ladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin",
    arti: "Segala puji bagi Allah yang telah memberi kami makan, memberi kami minum, dan menjadikan kami orang Islam.",
  },
  {
    id: 3,
    judul: "Doa Masuk Kamar Mandi",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allaahumma innii a'uudzu bika minal khubutsi wal khabaa-its",
    arti: "Ya Allah, aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan.",
  },
  {
    id: 4,
    judul: "Doa Keluar Kamar Mandi",
    arabic: "غُفْرَانَكَ",
    latin: "Ghufraanaka",
    arti: "Aku memohon ampunan-Mu.",
  },
  {
    id: 5,
    judul: "Doa Masuk Rumah",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ",
    latin: "Allaahumma innii as-aluka khayral mawlaji wa khayral makhraji",
    arti: "Ya Allah, aku memohon kepada-Mu kebaikan waktu masuk dan kebaikan waktu keluar.",
  },
  {
    id: 6,
    judul: "Doa Keluar Rumah",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    latin: "Bismillaahi tawakkaltu 'alallaahi, wa laa hawla wa laa quwwata illaa billaah",
    arti: "Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan Allah.",
  },
  {
    id: 7,
    judul: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    latin: "Bismikallaahumma amuutu wa ahyaa",
    arti: "Dengan nama-Mu ya Allah, aku mati dan aku hidup.",
  },
  {
    id: 8,
    judul: "Doa Bangun Tidur",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdulillaahil ladzii ahyaanaa ba'da maa amaatanaa wa ilayhin nusyuur",
    arti: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan.",
  },
  {
    id: 9,
    judul: "Doa Naik Kendaraan",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    latin: "Subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
    arti: "Maha suci Tuhan yang telah menundukkan semua ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.",
  },
  {
    id: 10,
    judul: "Doa Bercermin",
    arabic: "اللَّهُمَّ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    latin: "Allaahumma hassanta khalqii fahassin khuluqii",
    arti: "Ya Allah, sebagaimana Engkau telah memperindah fisikku, maka perindahlah pula akhlakku.",
  },
];
