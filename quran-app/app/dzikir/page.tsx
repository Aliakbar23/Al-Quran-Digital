"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { DZIKIR_PAGI, DZIKIR_PETANG, type DzikirItem } from "@/data/dzikir";
import { DOA_HARIAN } from "@/data/doa-harian";
import CustomConfirmModal from "@/components/CustomConfirmModal";

type Tab = "pagi" | "petang" | "doa" | "sholawat";

interface DoaItem {
  id: number;
  judul: string;
  arabic: string;
  latin: string;
  arti: string;
}

const SHOLAWAT_LIST: DzikirItem[] = [
  {
    id: 1001,
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    latin: "Allahumma shalli 'ala sayyidina Muhammadin wa 'ala ali sayyidina Muhammad, kama shallayta 'ala sayyidina Ibrahima wa 'ala ali sayyidina Ibrahim, wa barik 'ala sayyidina Muhammadin wa 'ala ali sayyidina Muhammad, kama barakta 'ala sayyidina Ibrahima wa 'ala ali sayyidina Ibrahim, fil 'alamina innaka hamidun majid.",
    arti: "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan keluarganya, sebagaimana Engkau melimpahkan rahmat kepada Nabi Ibrahim dan keluarganya; dan berkahilah Nabi Muhammad dan keluarganya, sebagaimana Engkau memberkahi Nabi Ibrahim dan keluarganya. Di seluruh alam semesta, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
    count: 11,
    faedah: "Sholawat Ibrahimiyah (Wajib di Tahiyyat Sholat)"
  },
  {
    id: 1002,
    arabic: "اللَّهُمَّ صَلِّ صَلاَةً كَامِلَةً وَسَلِّمْ سَلاَمًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ وَعَلَى آلِهِ وَصَحْبِهِ فِي كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ",
    latin: "Allahumma shalli shalaatan kaamilatan wa sallim salaaman taamman 'ala sayyidina Muhammadinilladzi tanhallu bihil 'uqadu wa tanfariju bihil kurabu wa tuqdha bihil hawaa-iju wa tunaalu bihir raghaa-ibu wa husnul khawaatimi wa yustasqal ghamaamu biwajhihil kariimi wa 'ala aalihi wa shahbihi fii kulli lamhatin wa nafasin bi'adadi kulli ma'luumin lak.",
    arti: "Ya Allah, limpahkanlah shalawat yang sempurna dan keselamatan yang utuh atas junjungan kami Nabi Muhammad, yang dengan perantaraannya segala ikatan kesukaran dapat lepas, segala kesedihan dapat dihilangkan, segala kebutuhan dapat dipenuhi, segala keinginan dapat dicapai, akhir hayat yang baik (husnul khatimah) dapat meraih kemuliaan wajah-Mu yang mulia; juga kepada keluarga dan para sahabatnya di setiap kedipan mata dan hembusan nafas sebanyak bilangan yang Engkau ketahui.",
    count: 11,
    faedah: "Sholawat Nariyah (Tolak Bala & Kelancaran Rezeki)"
  },
  {
    id: 1003,
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ طِبِّ الْقُلُوبِ وَدَوَائِهَا وَعَافِيَةِ الأَبْدَانِ وَشِفَائِهَا وَنُورِ الأَبْصَارِ وَضِيَائِهَا وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
    latin: "Allahumma shalli 'ala sayyidina Muhammadin thibbil quluubi wa dawaa-iha wa 'aafiyatil abdaani wa syifaa-iha wa nuuril abshaari wa dhiyaa-iha wa 'ala aalihi wa shahbihi wa sallim.",
    arti: "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, sang penyembuh hati dan obatnya, kesehatan badan dan kesembuhannya, cahaya pandangan mata dan sinarnya, serta kepada keluarga dan sahabat-sahabatnya sekalian.",
    count: 11,
    faedah: "Sholawat Tibbil Qulub (Syifa / Obat Lahir & Batin)"
  },
  {
    id: 1004,
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ",
    latin: "Allahumma shalli 'ala sayyidina Muhammadinil faatihi limaa ughliqa wal khaatimi limaa sabaqa naashiril haqqi bil haqqi wal haadii ilaa shiraathikal mustaqiimi wa 'ala aalihi haqqa qadrihi wa miqdaarihil 'azhiim.",
    arti: "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, pembuka apa yang terkunci, penutup apa yang terdahulu, penolong kebenaran dengan jalan yang benar, dan penunjuk jalan yang lurus; juga kepada keluarga dan para sahabatnya dengan kemuliaan derajatnya yang agung.",
    count: 11,
    faedah: "Sholawat Fatih (Pembuka Pintu Rahmat & Kemudahan)"
  },
  {
    id: 1005,
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلاَةً تُنْجِيْنَا بِهَا مِنْ جَمِيْعِ الأَهْوَالِ وَالأفَاتِ وَتَقْضِيْ لَنَا بِهَا جَمِيْعَ الْحَاجَاتِ وَتُطَهِّرُنَا بِهَا مِنْ جَمِيْعِ السَّيِّئَاتِ وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ وَتُبَلِّغُنَا بِهَا أَقْصَى الْغَايَاتِ مِنْ جَمِيْعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ",
    latin: "Allahumma shalli 'ala sayyidina Muhammadin shalaatan tunjiina bihaa min jami'il ahwaali wal aafaati wa taqdhii lanaa bihaa jami'al haajaati wa tuthahhirunaa bihaa min jami'is sayyiaati wa tarfa'unaa bihaa 'indaka a'lad darajaati wa tuballighunaa bihaa aqshal ghaayaati min jami'il khayraati fil hayaati wa ba'dal mamaat.",
    arti: "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, yang dengan shalawat itu Engkau akan menyelamatkan kami dari semua keadaan menakutkan dan bencana, memenuhi segala kebutuhan kami, menyucikan kami dari segala keburukan, mengangkat derajat kami ke sisi-Mu yang paling tinggi, dan menyampaikan kami pada tujuan terjauh dari semua kebaikan semasa hidup maupun setelah mati.",
    count: 11,
    faedah: "Sholawat Munjiyat (Penyelamat Dari Segala Kesulitan)"
  }
];

// Web Audio API Synthesizer (Lonceng Bel Spiritual)
const playChime = () => {
  if (typeof window !== "undefined") {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      try {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
      } catch (e) {
        console.warn("AudioContext blocked/failed:", e);
      }
    }
  }
};

function DzikirCard({
  item,
  count,
  onUpdate,
}: {
  item: DzikirItem;
  count: number;
  onUpdate: (val: number) => void;
}) {
  const done = count >= item.count;

  const handleIncrement = () => {
    const next = Math.min(count + 1, item.count);
    playChime();
    onUpdate(next);
  };

  return (
    <div className={`card-islamic p-4 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-gold
      ${done ? "border-gold bg-gold/5" : ""}`}>
      {item.faedah && (
        <span className="mb-2 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          {item.faedah}
        </span>
      )}
      <p className="text-arabic text-right text-2xl text-emerald-900 leading-loose mb-3">
        {item.arabic}
      </p>
      <p className="text-xs text-emerald-600 italic mb-1 leading-relaxed">{item.latin}</p>
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.arti}</p>

      <div className="flex items-center justify-between border-t border-emerald-500/10 pt-3">
        <span className={`text-xs font-bold uppercase tracking-wider ${done ? "text-gold" : "text-emerald-600"}`}>
          {done ? "✓ Selesai" : `${count} / ${item.count}x`}
        </span>
        <div className="flex gap-2">
          {count > 0 && (
            <button
              onClick={() => onUpdate(0)}
              className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-2 text-xs font-bold text-red-600 active:scale-95 transition-all"
              title="Reset Lafadz Ini"
            >
              ⟳ Reset
            </button>
          )}
          {!done ? (
            <button
              onClick={handleIncrement}
              className="rounded-xl gradient-green px-4 py-2 text-xs font-bold text-white shadow-soft active:scale-95 transition-all"
            >
              +1 Hitung
            </button>
          ) : (
            <button
              onClick={() => onUpdate(0)}
              className="rounded-xl bg-gray-100 px-4 py-2 text-xs text-gray-500 hover:bg-gray-200 transition-colors"
            >
              Ulangi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DoaCard({ item }: { item: DoaItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-islamic w-full p-4 transition-all hover:border-gold/30">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left flex items-center justify-between focus:outline-none"
      >
        <p className="font-bold text-sm text-emerald-900 pr-2">{item.judul}</p>
        <span className="text-emerald-500 text-xs font-bold flex-shrink-0 bg-emerald-50 rounded-lg px-2.5 py-1 border border-emerald-100 hover:bg-emerald-100 transition-colors">
          {expanded ? "▲ Tutup" : "▼ Detail"}
        </span>
      </button>
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-gold/20 pt-3 animate-fade-up">
          <p className="text-arabic text-right text-2xl text-emerald-900 leading-loose">{item.arabic}</p>
          {item.latin && <p className="text-xs text-emerald-600 italic leading-relaxed">{item.latin}</p>}
          <p className="text-xs text-gray-500 leading-relaxed">{item.arti}</p>
        </div>
      )}
    </div>
  );
}

export default function DzikirPage() {
  const [tab, setTab] = useState<Tab>("pagi");
  const [doaSearch, setDoaSearch] = useState("");
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [isResetOpen, setIsResetOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dzikir_counts");
    if (saved) {
      try {
        setCounts(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal memuat dzikir_counts:", e);
      }
    }
  }, []);

  const handleUpdateCount = (id: number, val: number) => {
    setCounts((prev) => {
      const next = { ...prev, [id]: val };
      localStorage.setItem("dzikir_counts", JSON.stringify(next));
      return next;
    });
  };

  const handleResetAll = () => {
    setIsResetOpen(true);
  };

  const handleConfirmReset = () => {
    setCounts({});
    localStorage.removeItem("dzikir_counts");
    setIsResetOpen(false);
  };

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "pagi", label: "Dzikir Pagi", icon: "🌅" },
    { key: "petang", label: "Dzikir Petang", icon: "🌙" },
    { key: "doa", label: "Doa Harian", icon: "🤲" },
    { key: "sholawat", label: "Sholawat", icon: "✨" },
  ];

  // Pencarian doa harian lokal real-time
  const filteredDoas = DOA_HARIAN.filter(
    (d) =>
      d.judul.toLowerCase().includes(doaSearch.toLowerCase()) ||
      d.arti.toLowerCase().includes(doaSearch.toLowerCase()) ||
      d.latin.toLowerCase().includes(doaSearch.toLowerCase())
  );

  return (
    <main className="pb-28">
      <PageHeader title="Dzikir & Doa" subtitle="Koleksi dzikir pagi, sore, doa sehari-hari, dan sholawat nabi resmi" />

      {/* Tab Selector */}
      <div className="sticky top-0 z-10 bg-cream border-b border-emerald-100 px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-grow">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300
              ${tab === t.key ? "gradient-green text-white shadow-soft" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/50"}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        {tab !== "doa" && (
          <button
            onClick={handleResetAll}
            className="flex-shrink-0 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-2 text-xs font-bold text-red-600 active:scale-95 transition-all flex items-center gap-1"
          >
            🗑️ Reset Semua
          </button>
        )}
      </div>

      {/* Search Input khusus Tab Doa */}
      {tab === "doa" && (
        <div className="px-4 py-3 bg-cream border-b border-emerald-100">
          <input
            type="search"
            placeholder="Cari dari 25+ doa sehari-hari populer..."
            value={doaSearch}
            onChange={(e) => setDoaSearch(e.target.value)}
            className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>
      )}

      {/* Konten Halaman */}
      <div className="px-4 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {tab === "pagi" &&
          DZIKIR_PAGI.map((d) => (
            <DzikirCard
              key={d.id}
              item={d}
              count={counts[d.id] || 0}
              onUpdate={(val) => handleUpdateCount(d.id, val)}
            />
          ))}
        {tab === "petang" &&
          DZIKIR_PETANG.map((d) => (
            <DzikirCard
              key={d.id}
              item={d}
              count={counts[d.id] || 0}
              onUpdate={(val) => handleUpdateCount(d.id, val)}
            />
          ))}
        {tab === "sholawat" &&
          SHOLAWAT_LIST.map((s) => (
            <DzikirCard
              key={s.id}
              item={s}
              count={counts[s.id] || 0}
              onUpdate={(val) => handleUpdateCount(s.id, val)}
            />
          ))}

        {tab === "doa" &&
          filteredDoas.map((d) => <DoaCard key={d.id} item={d} />)}

        {tab === "doa" && filteredDoas.length === 0 && (
          <p className="col-span-full text-center text-xs text-gray-400 py-10">Doa tidak ditemukan</p>
        )}
      </div>

      {/* Custom Confirmation Modal */}
      <CustomConfirmModal
        isOpen={isResetOpen}
        title="Reset Hitungan Dzikir"
        message="Apakah Anda yakin ingin me-reset semua hitungan dzikir pagi, sore, dan sholawat Anda? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetOpen(false)}
        isDanger={true}
        confirmText="Ya, Reset Semua"
      />
    </main>
  );
}
