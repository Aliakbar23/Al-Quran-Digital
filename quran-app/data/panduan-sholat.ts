export interface SholatStep {
  id: number;
  nama: string;
  arabic: string;
  latin: string;
  arti: string;
  instruksi: string;
}

export interface NiatSholatItem {
  id: number;
  nama: string;
  arabic: string;
  latin: string;
  arti: string;
}

export interface DoaSetelahSholatItem {
  id: number;
  judul: string;
  arabic: string;
  latin: string;
  arti: string;
  sumber?: string;
}

export const NIAT_SHOLAT: NiatSholatItem[] = [
  {
    id: 1,
    nama: "Sholat Shubuh (2 Raka'at)",
    arabic: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhash-shubhi rak'ataini mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat melakukan shalat fardhu Shubuh dua rakaat, sambil menghadap kiblat, saat ini, karena Allah Ta'ala."
  },
  {
    id: 2,
    nama: "Sholat Dzuhur (4 Raka'at)",
    arabic: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhazh-zhuhri arba'a raka'aatim mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat melakukan shalat fardhu Dzuhur empat rakaat, sambil menghadap kiblat, saat ini, karena Allah Ta'ala."
  },
  {
    id: 3,
    nama: "Sholat Ashar (4 Raka'at)",
    arabic: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal-'ashri arba'a raka'aatim mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat melakukan shalat fardhu Ashar empat rakaat, sambil menghadap kiblat, saat ini, karena Allah Ta'ala."
  },
  {
    id: 4,
    nama: "Sholat Maghrib (3 Raka'at)",
    arabic: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal-maghribi tsalaatsa raka'aatim mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat melakukan shalat fardhu Maghrib tiga rakaat, sambil menghadap kiblat, saat ini, karena Allah Ta'ala."
  },
  {
    id: 5,
    nama: "Sholat Isya (4 Raka'at)",
    arabic: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal-'isyaa'i arba'a raka'aatim mustaqbilal qiblati adaa'an lillaahi ta'aalaa",
    arti: "Aku niat melakukan shalat fardhu Isya empat rakaat, sambil menghadap kiblat, saat ini, karena Allah Ta'ala."
  }
];

export const SHOLAT_STEPS: SholatStep[] = [
  {
    id: 1,
    nama: "1. Takbiratul Ihram",
    arabic: "اللَّهُ أَكْبَرُ",
    latin: "Allāhu Akbar",
    arti: "Allah Maha Besar",
    instruksi: "Berdiri tegak menghadap kiblat (bagi yang mampu), lalu mengangkat kedua belah tangan sejajar dengan telinga (bagi laki-laki) atau sejajar dada (bagi perempuan) seraya mengucapkan kalimat takbir."
  },
  {
    id: 2,
    nama: "2. Membaca Doa Iftitah",
    arabic: "اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً. إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلاَتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ. لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ",
    latin: "Allaahu akbaru kabiiraw-walhamdu lillaahi katsiiraw-wa subhaanallaahi bukrataw-wa-ashiilaa. Innii wajjahtu wajhiya lilladzii fatharas-samaawaati wal-ardha haniifam-muslimaw-wa maa ana minal musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil-'aalamiin. Laa syariika lahu wa bidzaalika umirtu wa ana minal muslimiin",
    arti: "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan sebanyak-banyaknya, dan Maha Suci Allah di waktu pagi dan petang. Sesungguhnya aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan keadaan lempeng dan berserah diri, dan aku bukanlah dari golongan orang-orang musyrik. Sesungguhnya shalatku, ibadahku, hidupku dan matiku hanyalah untuk Allah Tuhan Semesta Alam. Tidak ada sekutu bagi-Nya, dan demikianlah aku diperintahkan, dan aku termasuk golongan orang muslim.",
    instruksi: "Dibaca setelah takbiratul ihram pada rakaat pertama shalat, sebelum membaca surat Al-Fatihah."
  },
  {
    id: 3,
    nama: "3. Membaca Surat Al-Fatihah",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّhِيمِ (١) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (٢) الرَّحْمَٰنِ الرَّحِيمِ (٣) مَالِكِ يَوْمِ الدِّينِ (٤) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (٥) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (٦) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (٧)",
    latin: "Bismillaahir-rahmaanir-rahiim. Al-hamdu lillaahi rabbil-'aalamiin. Ar-rahmaanir-rahiim. Maaliki yaumid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-shiraathal-mustaqiim. Shiraathal-ladziina an'amta 'alaihim ghairil-maghdhuubi 'alaihim waladh-dhaalliin.",
    arti: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
    instruksi: "Membaca Al-Fatihah adalah rukun shalat yang wajib dibaca pada setiap rakaat shalat. Setelah Al-Fatihah pada rakaat ke-1 dan ke-2, disunnahkan membaca surat pendek pilihan dari Al-Quran."
  },
  {
    id: 4,
    nama: "4. Ruku'",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
    latin: "Subhaana rabbiyal 'azhiimi wa bihamdih (3x)",
    arti: "Maha Suci Tuhanku Yang Maha Agung dan dengan segala puji bagi-Nya.",
    instruksi: "Membungkukkan badan dengan meletakkan kedua telapak tangan di atas lutut, jari-jari direnggangkan. Punggung dan kepala sejajar mendatar, pandangan mata mengarah ke tempat sujud."
  },
  {
    id: 5,
    nama: "5. I'tidal (Bangkit dari Ruku')",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءُ السَّمَاوَاتِ وَمِلْءُ الْأَرْضِ وَمِلْءُ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
    latin: "Sami'allaahu liman hamidah. Rabbanaa lakal hamdu mil'us-samaawaati wa mil'ul-ardhi wa mil'u maa syi'ta min syai'in ba'du",
    arti: "Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji, sepenuh langit dan sepenuh bumi, dan sepenuh apa yang Engkau kehendaki setelah itu.",
    instruksi: "Kembali berdiri tegak lurus setelah ruku', seraya mengangkat kedua tangan sejajar telinga/dada sambil membaca bagian pertama, kemudian melepaskan tangan di samping paha sambil membaca doa tahmid."
  },
  {
    id: 6,
    nama: "6. Sujud",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ وَبِحَمْدِهِ",
    latin: "Subhaana rabbiyal a'laa wa bihamdih (3x)",
    arti: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan segala puji bagi-Nya.",
    instruksi: "Meletakkan tujuh anggota badan di lantai: dahi dan hidung, kedua telapak tangan, kedua lutut, dan jari-jari kedua kaki yang dilipat menghadap kiblat. Sikut diangkat dan direnggangkan dari lambung (bagi laki-laki) atau didekatkan (bagi perempuan)."
  },
  {
    id: 7,
    nama: "7. Duduk di Antara Dua Sujud (Duduk Iftirasy)",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    latin: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii",
    arti: "Ya Tuhanku, ampunilah aku, sayangilah aku, tutuplah kekuranganku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah aku.",
    instruksi: "Bangkit dari sujud pertama lalu duduk di atas telapak kaki kiri, sedangkan telapak kaki kanan ditegakkan dengan jari-jari melipat menghadap kiblat. Kedua telapak tangan diletakkan di atas paha."
  },
  {
    id: 8,
    nama: "8. Duduk Tasyahud Awal",
    arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ",
    latin: "At-tahiyyaatul mubaarakatus-shalawaatut-thayyibaatu lillaah. As-salaamu 'alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh. As-salaamu 'alainaa wa 'ala 'ibaadillaahis-shaalihiin. Asyhadu allaa ilaaha illallaah wa asyhadu anna Muhammadar-rasuulullaah. Allahumma shalli 'ala sayyidinaa Muhammad",
    arti: "Segala penghormatan yang penuh berkah, shalat dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat Allah dan berkah-Nya tetap tercurah kepadamu wahai Nabi. Semoga keselamatan tercurah kepada kami dan atas hamba-hamba Allah yang shalih. Aku bersaksi bahwa tidak ada Tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad.",
    instruksi: "Dilakukan pada rakaat kedua pada shalat Dzuhur, Ashar, Maghrib, dan Isya. Duduk dengan posisi Iftirasy (sama seperti duduk di antara dua sujud) dengan telapak tangan kanan mengepal dan jari telunjuk menunjuk ke kiblat saat mengucapkan syahadat."
  },
  {
    id: 9,
    nama: "9. Duduk Tasyahud Akhir (Duduk Tawarruk)",
    arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ سَيِّدِنَا إِبْرَاهِيمَ وَعَلَىٰ آلِ سَيِّدِنَا إِبْرَاهِيمَ وَبَارِكْ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ سَيِّدِنَا إِبْرَاهِيمَ وَعَلَىٰ آلِ سَيِّدِنَا إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    latin: "At-tahiyyaatul mubaarakatus-shalawaatut-thayyibaatu lillaah... (sama seperti tasyahud awal) ... wa 'ala aali sayyidinaa Muhammad, kamaa shallaita 'ala sayyidinaa Ibraahiim wa 'ala aali sayyidinaa Ibraahiim, wa baarik 'ala sayyidinaa Muhammad wa 'ala aali sayyidinaa Muhammad, kamaa baarakta 'ala sayyidinaa Ibraahiim wa 'ala aali sayyidinaa Ibraahiim, fil 'aalamiina innaka hamiidum-majiid",
    arti: "Segala penghormatan... (sama seperti tasyahud awal)... Ya Allah limpahkanlah rahmat kepada Nabi Muhammad dan keluarganya, sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarganya. Dan berkahilah Nabi Muhammad beserta keluarganya, sebagaimana Engkau memberkahi Nabi Ibrahim beserta keluarganya. Di seluruh alam semesta, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
    instruksi: "Dilakukan pada rakaat terakhir menjelang salam. Posisi duduk Tawarruk: pantat kiri menyentuh lantai, kaki kiri disilangkan di bawah kaki kanan yang ditegakkan, dan telapak tangan kanan menunjuk dengan telunjuk."
  },
  {
    id: 10,
    nama: "10. Salam",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    latin: "As-salaamu 'alaikum wa rahmatullaah",
    arti: "Semoga keselamatan dan rahmat Allah tercurah kepada kalian",
    instruksi: "Memutar kepala ke arah kanan terlebih dahulu hingga pipi kanan terlihat dari belakang, seraya membaca salam. Kemudian memutar kepala ke arah kiri hingga pipi kiri terlihat dari belakang seraya membaca salam kedua."
  }
];

export const DOA_SETELAH_SHOLAT: DoaSetelahSholatItem[] = [
  {
    id: 1,
    judul: "1. Membaca Istighfar (3x)",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
    latin: "Astaghfirullaahal-'azhiim, alladzii laa ilaaha illaa huwal-hayyul-qayyuum wa atuubu ilaih (3x)",
    arti: "Aku memohon ampunan kepada Allah Yang Maha Agung, tiada Tuhan selain Dia Yang Maha Hidup lagi Maha Mandiri, dan aku bertobat kepada-Nya."
  },
  {
    id: 2,
    judul: "2. Membaca Kalimat Tauhid & Pujian",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu yuhyii wa yumiitu wa huwa 'ala kulli syai'in qadiir",
    arti: "Tiada Tuhan selain Allah Yang Esa, tiada sekutu bagi-Nya. Bagi-Nya segala kerajaan dan bagi-Nya segala puji. Dia Yang menghidupkan dan Yang mematikan, dan Dia Maha Kuasa atas segala sesuatu."
  },
  {
    id: 3,
    judul: "3. Doa Perlindungan dari Neraka (3x / 7x)",
    arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    latin: "Allahumma ajirnii minan-naar (3x / 7x)",
    arti: "Ya Allah, lindungilah aku dari siksaan api neraka.",
    sumber: "HR. Ahmad & Abu Dawud"
  },
  {
    id: 4,
    judul: "4. Doa Keselamatan & Keberkahan",
    arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Allahumma antas-salaam wa minkas-salaam tabaarakta yaa dzal-jalaali wal-ikraam",
    arti: "Ya Allah, Engkaulah keselamatan (kesejahteraan), dan dari-Mulah segala keselamatan. Maha Suci Engkau wahai Yang Pemilik Kebesaran dan Kemuliaan.",
    sumber: "HR. Muslim"
  },
  {
    id: 5,
    judul: "5. Membaca Tasbih, Tahmid, dan Takbir",
    arabic: "سُبْحَانَ اللَّهِ (٣٣x) · الْحَمْدُ لِلَّهِ (٣٣x) · اللَّهُ أَكْبَرُ (٣٣x)",
    latin: "Subhaanallah (33x) · Alhamdulillah (33x) · Allaahu Akbar (33x)",
    arti: "Maha Suci Allah (33x) · Segala puji bagi Allah (33x) · Allah Maha Besar (33x)",
    sumber: "HR. Bukhari & Muslim"
  },
  {
    id: 6,
    judul: "6. Doa Lengkap Setelah Sholat (Doa Utama)",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ حَمْدًا يُوَافِي نِعَمَهُ وَيُكَافِئُ مَزِيدَهُ. يَا رَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ وَعَظِيمِ سُلْطَانِكَ. اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ. اللَّهُمَّ إِنَّا نَسْأَلُكَ سَلَامَةً فِي الدِّينِ وَعَافِيَةً فِي الْجَسَدِ وَزِيَادَةً فِي الْعِلْمِ وَبَرَكَةً فِي الرِّزْقِ وَتَوْبَةً قَبْلَ الْمَوْتِ وَرَحْمَةً عِنْدَ الْمَوْتِ وَمَغْفِرَةً بَعْدَ الْمَوْتِ. اللَّهُمَّ هَوِّنْ عَلَيْنَا فِي سَكَرَاتِ الْمَوْتِ وَالنَّجَاةَ مِنَ النَّارِ وَالْعَفْوَ عِنْدَ الْحِسَابِ. رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
    latin: "Alhamdu lillaahi rabbil 'aalamiin, hamday yuwaafii ni'amahuu wa yukaafii'u maziidah. Yaa rabbanaa lakal hamdu kamaa yambaghii lijalaali wajhika wa 'azhiimi sulthaanik. Allahumma shalli 'ala sayyidinaa Muhammadin wa 'ala ali sayyidinaa Muhammad. Allahumma innaa nas'aluka salaamatan fid-diini wa 'aafiyatan fil jasadi wa ziyaadatan fil 'ilmi wa barakatan fir-rizqi wa taubatan qablal maut wa rahmatan 'indal maut wa maghfiratan ba'dal maut. Allahumma hawwin 'alainaa fii sakaraatil mauti wan-najaata minan-naari wal-'afwa 'indal hisaab. Rabbanaa laa tuzigh quluubanaa ba'da idz hadaitanaa wa hab lanaa mil ladunka rahmatan innaka antal-wahhaab.",
    arti: "Segala puji bagi Allah Tuhan Semesta Alam, pujian yang sebanding dengan nikmat-nikmat-Nya dan menjamin tambahannya. Wahai Tuhan kami, bagi-Mu lah segala puji sebagaimana layaknya bagi keagungan zat-Mu dan kebesaran kekuasaan-Mu. Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad beserta keluarganya. Ya Allah, sesungguhnya kami memohon kepada-Mu keselamatan dalam agama, kesehatan jasmani, bertambahnya ilmu, keberkahan dalam rezeki, tobat sebelum mati, rahmat ketika mati, dan ampunan setelah mati. Ya Allah, mudahkanlah bagi kami dalam menghadapi sakaratul maut, selamatkanlah kami dari api neraka, dan berilah kami ampunan pada saat perhitungan amal. Ya Tuhan kami, janganlah Engkau condongkan hati kami kepada kesesatan setelah Engkau berikan petunjuk kepada kami, dan karuniakanlah kepada kami rahmat dari sisi-Mu, sesungguhnya Engkau Maha Pemberi."
  }
];
