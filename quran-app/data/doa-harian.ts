export interface DoaHarianItem {
  id: number;
  judul: string;
  arabic: string;
  latin: string;
  arti: string;
  sumber?: string;
}

export const DOA_HARIAN: DoaHarianItem[] = [
  {
    id: 1,
    judul: "Doa Sebelum Makan",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma baarik lanaa fiimaa razaqtanaa waqinaa 'adzaaban-naar",
    arti: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa neraka.",
    sumber: "HR. Ibnu Sunni"
  },
  {
    id: 2,
    judul: "Doa Setelah Makan",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin: "Alhamdu lillahil-ladzi ath'amanaa wa saqaanaa wa ja'alanaa muslimiin",
    arti: "Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami termasuk golongan orang-orang muslim.",
    sumber: "HR. Abu Dawud"
  },
  {
    id: 3,
    judul: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
    latin: "Bismika Allahumma ahyaa wa amuutu",
    arti: "Dengan nama-Mu ya Allah aku hidup dan dengan nama-Mu aku mati.",
    sumber: "HR. Bukhari & Muslim"
  },
  {
    id: 4,
    judul: "Doa Bangun Tidur",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَشْهَدَ أَنَّا أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdu lillahil-ladzi ahyaanaa ba'da maa amaatanaa wa ilaihinnusyuur",
    arti: "Segala puji bagi Allah yang telah menghidupkan kami kembali setelah mematikan kami (tidur) dan hanya kepada-Nya kami dibangkitkan.",
    sumber: "HR. Bukhari"
  },
  {
    id: 5,
    judul: "Doa Kedua Orang Tua (Ibu Bapak)",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    latin: "Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa",
    arti: "Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah keduanya sebagaimana mereka berdua telah mendidik aku di waktu kecil.",
    sumber: "QS. Al-Isra': 24"
  },
  {
    id: 6,
    judul: "Doa Sapu Jagat (Kebaikan Dunia Akhirat)",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid-dunyaa hasanataw wa fil-aakhirati hasanataw wa qinaa 'adzaaban-naar",
    arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
    sumber: "QS. Al-Baqarah: 201"
  },
  {
    id: 7,
    judul: "Doa Masuk Kamar Mandi / WC",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allahumma innii a'uudzu bika minal khubutsi wal khabaa'its",
    arti: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.",
    sumber: "HR. Bukhari & Muslim"
  },
  {
    id: 8,
    judul: "Doa Keluar Kamar Mandi / WC",
    arabic: "غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَىٰ وَعَافَانِي",
    latin: "Ghufranakal hamdu lillahil-ladzi adzhaba 'annil adzaa wa 'aafaanii",
    arti: "Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan penyakit dari tubuhku dan menjaga kesehatanku.",
    sumber: "HR. Abu Dawud"
  },
  {
    id: 9,
    judul: "Doa Masuk Masjid",
    arabic: "اللَّهُمَّ افتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaftah lii abwaaba rahmatik",
    arti: "Ya Allah, bukakanlah bagiku pintu-pintu rahmat-Mu.",
    sumber: "HR. Muslim"
  },
  {
    id: 10,
    judul: "Doa Keluar Masjid",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma innii as'aluka min fadhlik",
    arti: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.",
    sumber: "HR. Muslim"
  },
  {
    id: 11,
    judul: "Doa Keluar Rumah",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    latin: "Bismillaahi tawakkaltu 'alallaahi laa haula wa laa quwwata illaa billaah",
    arti: "Dengan nama Allah, aku berserah diri kepada Allah. Tiada daya dan kekuatan melainkan dengan pertolongan Allah.",
    sumber: "HR. Abu Dawud & Tirmidzi"
  },
  {
    id: 12,
    judul: "Doa Masuk Rumah",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    latin: "Bismillaahi walajnaa wa bismillaahi kharajnaa wa 'alallaahi rabbinaa tawakkalnaa",
    arti: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, dan kepada Allah Tuhan kami, kami berserah diri.",
    sumber: "HR. Abu Dawud"
  },
  {
    id: 13,
    judul: "Doa Sebelum Belajar",
    arabic: "رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
    latin: "Rabbi zidnii 'ilmaa warzuqnii fahmaa",
    arti: "Ya Tuhanku, tambahkanlah ilmu kepadaku dan berilah aku karunia untuk memahaminya.",
    sumber: "QS. Thaha: 114"
  },
  {
    id: 14,
    judul: "Doa Setelah Belajar (Memohon Manfaat Ilmu)",
    arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا",
    latin: "Allahummanfa'nii bimaa 'allamtanii wa 'allimnii maa yanfa'unii wa zidnii 'ilmaa",
    arti: "Ya Allah, berilah manfaat atas apa yang Engkau ajarkan kepadaku, ajarkanlah kepadaku apa yang bermanfaat bagiku, dan tambahkanlah ilmu kepadaku.",
    sumber: "HR. Tirmidzi & Ibnu Majah"
  },
  {
    id: 15,
    judul: "Doa Memohon Kemudahan",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    latin: "Allahumma laa sahla illaa maa ja'altahu sahlaa wa anta taj'alul hazna idzaa syi'ta sahlaa",
    arti: "Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah. Dan Engkau dapat menjadikan kesedihan/kesulitan itu mudah jika Engkau menghendaki.",
    sumber: "HR. Ibnu Hibban"
  },
  {
    id: 16,
    judul: "Doa Penerang Hati (Kelapangan Dada)",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    latin: "Rabbisyrah lii shadrii wa yassir lii amrii wahlul 'uqdatam mil lisaanii yafqahuu qaulii",
    arti: "Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku agar mereka mengerti perkataanku.",
    sumber: "QS. Thaha: 25-28"
  },
  {
    id: 17,
    judul: "Doa Ketika Naik Kendaraan",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
    latin: "Subhaanalladzii sakhkhara lanaa haadzaa wa maa kunnaa lahu muqriniin wa innaa ilaa rabbinaa lamunqalibuun",
    arti: "Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.",
    sumber: "QS. Az-Zukhruf: 13-14"
  },
  {
    id: 18,
    judul: "Doa Ketika Turun Hujan",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    latin: "Allahumma shayyiban naa-fi'aa",
    arti: "Ya Allah, turunkanlah hujan yang lebat lagi bermanfaat.",
    sumber: "HR. Bukhari"
  },
  {
    id: 19,
    judul: "Doa Setelah Hujan Reda",
    arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
    latin: "Muthirnaa bifadhlillaahi wa rahmatih",
    arti: "Kita diberi hujan karena karunia Allah dan rahmat-Nya.",
    sumber: "HR. Bukhari"
  },
  {
    id: 20,
    judul: "Doa Ketika Bercermin",
    arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    latin: "Allahumma kamaa hassanta khalqii fahassin khuluqii",
    arti: "Ya Allah, sebagaimana Engkau telah membaguskan penciptaan (fisik) diriku, maka baguskanlah pula akhlakku.",
    sumber: "HR. Ahmad"
  },
  {
    id: 21,
    judul: "Doa Terhindar dari Penyakit Buruk",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ وَالْجُنُونِ وَالْجُذَامِ وَمِنْ سَيِّئْ الْأَسْقَامِ",
    latin: "Allahumma innii a'uudzu bika minal barashi wal junuuni wal judzaami wa min sayyi'il asqaam",
    arti: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari penyakit sopak (belang), gila, kusta, dan dari segala penyakit yang buruk.",
    sumber: "HR. Abu Dawud"
  },
  {
    id: 22,
    judul: "Doa Keteguhan Iman",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ",
    latin: "Yaa muqallibal quluubi tsabbit qalbii 'ala diinik",
    arti: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
    sumber: "HR. Tirmidzi"
  },
  {
    id: 23,
    judul: "Doa Menjenguk Orang Sakit",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا",
    latin: "Allahumma rabban-naasi adzhibil ba'sa isyfi antasy-syaafii laa syifaa-a illaa syifaa-uka syifaa-an laa yughaadiru saqamaa",
    arti: "Ya Allah, Tuhan seluruh manusia, hilangkanlah penyakit ini. Sembuhkanlah, Engkaulah Yang Maha Penyembuh, tidak ada kesembuhan melainkan kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan penyakit sedikit pun.",
    sumber: "HR. Bukhari & Muslim"
  },
  {
    id: 24,
    judul: "Doa Memohon Perlindungan dari Setan",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    latin: "A'uudzu bikalimaatillaahit-taammaati min syarri maa khalaq",
    arti: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan.",
    sumber: "HR. Muslim"
  },
  {
    id: 25,
    judul: "Doa Sebelum Membuka Pakaian",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ",
    latin: "Bismillaahilladzii laa ilaaha illaa huw",
    arti: "Dengan nama Allah yang tiada Tuhan selain Dia.",
    sumber: "HR. Ibnu Sunni"
  }
];
