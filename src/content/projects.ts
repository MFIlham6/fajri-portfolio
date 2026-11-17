// Projects, from the owner's "Draf Website Portofolio Data Analyst" doc (Indonesian
// source; English is a faithful translation). `[[...]]` = detail still to be supplied.
// Layer 1 = card, layer 2 = summary page, layer 3 = full case study (only where the
// owner's full portfolio file exists — see `fullCase`).

import type { Lang } from "./i18n";
import addedProjects from "./data/projects.json";

export type L = Record<Lang, string>;
export type ProjectCategory = "data" | "bsa";

export type Project = {
  slug: string;
  code: string;
  /** Project name, shown as the main title in lists and cards (e.g. the Windata course name for "CASE 9"). */
  name?: L;
  /** Industry of the business in the case, shown in lists and cards and used as a filter. */
  industry?: L;
  /** Business area the case is about (sales, supply chain, HR…), shown beside the industry and used as a filter. */
  field?: L;
  /** Tools used, for the tool filter. Proper names, the same in both languages. */
  tools?: string[];
  category: ProjectCategory;
  featured?: boolean;
  title: L;
  sentence: L;
  tags: L[];
  info: L[];
  /** `srcEn`: English version of the chart, shown on English pages when it exists. */
  figure: { src?: string; srcEn?: string; label: L };
  summary: L;
  data: L;
  decisions: L[];
  findings: L[];
  recommendation: L;
  limits: L;
  files: { label: L; href?: string; note?: L }[];
  /** Slug of the full case study page (layer 3), when the full file exists. */
  fullCase?: string;
  /** Business & System Analyst format; when present the summary page uses its sections instead of the data-analysis ones. */
  bsa?: BsaDetail;
};

/** Two-cell table row: `label` on the left (role, feedback, test aspect, next step), `text` on the right. */
export type BsaRow = { label: L; text: L };

/** How a system was scoped, built, and accepted. `data` then reads as the requirement sources,
    `decisions` as design decisions, `findings` as the main results, and `recommendation` as the lead-in to `roadmap`. */
export type BsaDetail = {
  /** How the process ran before the system. */
  asIs: L;
  rootCauses: L[];
  /** Role → what they need from the system. */
  stakeholders: BsaRow[];
  /** User feedback → what changed, in iteration order. */
  iterations: BsaRow[];
  modules: L[];
  /** How the system was tested and by whom. */
  testing: L;
  /** Test aspect → score. */
  acceptance: BsaRow[];
  /** Next step → why, in priority order. */
  roadmap: BsaRow[];
};

const t = (en: string, id: string): L => ({ en, id });
const tag = {
  python: t("Python", "Python"),
  sql: t("SQL", "SQL"),
  spreadsheet: t("Spreadsheet", "Spreadsheet"),
  stats: t("Statistics", "Statistik"),
  clustering: t("Clustering", "Clustering"),
  dashboard: t("Dashboard", "Dashboard"),
  kpi: t("KPI", "KPI"),
  stakeholder: t("Stakeholder", "Stakeholder"),
  finance: t("Financial Analysis", "Analisis Keuangan"),
  basket: t("Market Basket", "Market Basket"),
  cleaning: t("Data Cleaning", "Data Cleaning"),
  hr: t("HR Analytics", "HR Analytics"),
  forecasting: t("Forecasting", "Forecasting"),
  inventory: t("Inventory", "Inventory"),
  marketing: t("Marketing Analytics", "Marketing Analytics"),
  cohort: t("Cohort", "Kohort"),
  segmentation: t("Segmentation", "Segmentasi"),
  funnel: t("Funnel", "Funnel"),
  rules: t("Rule-based Scoring", "Rule-based Scoring"),
  supplyChain: t("Supply Chain", "Supply Chain"),
  experiment: t("Experimentation", "Eksperimen"),
  systems: t("Systems Analysis", "Analisis Sistem"),
  powerbi: t("Power BI", "Power BI"),
  viz: t("Data Visualization", "Visualisasi Data"),
};
/** Business areas, shared so the field filter groups projects under one label. */
const field = {
  sales: t("Sales", "Penjualan"),
  marketing: t("Digital marketing", "Pemasaran digital"),
  customer: t("Customer analytics", "Analitik pelanggan"),
  finance: t("Finance", "Keuangan"),
  hr: t("Human resources", "SDM"),
  supplyChain: t("Supply chain & inventory", "Rantai pasok & persediaan"),
  operations: t("Service operations", "Operasional layanan"),
  risk: t("Risk & fraud", "Risiko & fraud"),
  product: t("Product analytics", "Analitik produk"),
  reporting: t("Performance reporting", "Pelaporan kinerja"),
  asset: t("Asset management", "Manajemen aset"),
};
const windata = t("Windata Academy", "Windata Academy");
const windataMeta = [windata, t("October 2026", "Oktober 2026"), t("Simulated data", "Data simulasi")];
const vizMeta = [windata, t("November 2026", "November 2026"), t("Simulated data", "Data simulasi")];
const img = (folder: string, file: string) => `/studi-kasus/${folder}/images/${file}`;
const folderNote = (en: string, id: string) => t(en, id);

const builtInProjects: Project[] = [
  /* ---------------- Featured ---------------- */
  {
    slug: "telkom-m2",
    fullCase: "telkom-m2",
    code: "Telkom M2",
    name: t("OCA Client Segmentation", "Segmentasi Klien OCA"),
    industry: t("Telecommunications", "Telekomunikasi"),
    field: field.customer,
    tools: ["Python"],
    category: "data",
    featured: true,
    title: t("20 clients, 3 segments, and only sending volume tells them apart", "20 klien, 3 segmen, dan hanya volume kirim yang membedakan mereka"),
    sentence: t(
      "RFM and K-Means segmentation of OCA's 20 clients, with an early churn signal the brief didn't ask for",
      "Segmentasi RFM dan K-Means untuk 20 klien OCA, lengkap dengan sinyal churn dini yang tidak ada di brief",
    ),
    tags: [tag.python, tag.stats, tag.clustering],
    info: [t("Python, Google Colab", "Python, Google Colab"), t("Solo", "Dikerjakan sendiri"), t("RevoU x Telkom Indonesia", "RevoU x Telkom Indonesia")],
    figure: { src: img("telkom-m2", "gambar-1.png"), label: t("Figure 1: messages vs revenue per client, by segment (slide 10)", "Gambar 1: pesan dan revenue per klien menurut segmen (slide 10)") },
    summary: t(
      "OCA didn't know which clients were at risk of churning, ready for an upsell, or in need of re-onboarding. With RFM and K-Means, the 20 clients split into three clearly separated segments. The brief's churn rule didn't catch a single client, so I added an early churn signal.",
      "OCA belum tahu klien mana yang berisiko churn, siap di-upsell, atau perlu onboarding ulang. Dengan RFM dan K-Means, 20 klien terbagi ke tiga segmen yang terpisah jauh. Aturan churn dari brief tidak menangkap satu klien pun, jadi saya menambahkan sinyal churn dini.",
    ),
    data: t(
      "122,749 transactions across four channels, January to March 2025. No rows were dropped. Years recorded as \"0025\" were fixed, the charge column was standardized, and 863 extreme Call prices were capped at 925 for clustering only.",
      "122.749 transaksi dari empat channel, Januari sampai Maret 2025. Tidak ada baris yang dibuang. Tahun yang tercatat \"0025\" diperbaiki, kolom charge diseragamkan, dan 863 harga ekstrem dari Call dibatasi di 925 khusus untuk clustering.",
    ),
    decisions: [
      t("Recency, active days, and channel count were left out because they were identical for every client.", "Recency, hari aktif, dan jumlah channel tidak dipakai karena nilainya sama untuk semua klien."),
      t("Quantile splits were rejected because they put clients with 1,552 and 6,010 messages in the same group. The cut-offs were moved to the data's natural gaps.", "Pembagian kuantil ditolak karena memasukkan klien dengan 1.552 dan 6.010 pesan ke kelompok yang sama. Ambang dipindah ke celah alami data."),
      t("The K-Means result (k = 3, silhouette 0.985) was cross-checked against manual rules, and 20 of 20 clients landed in the same segment.", "Hasil K-Means (k = 3, silhouette 0,985) dicek ulang dengan aturan manual, dan 20 dari 20 klien mendapat segmen yang sama."),
    ],
    findings: [
      t("Loyal Premium: 3 clients, 60% of revenue. Mid Tier: 5 clients, 25%. Potential: 12 clients, 15%.", "Loyal Premium: 3 klien, 60% revenue. Mid Tier: 5 klien, 25%. Potential: 12 klien, 15%."),
      t("Send times, channel choice, and success rates were the same across segments. Only volume differed.", "Waktu kirim, pilihan channel, dan tingkat keberhasilan sama di semua segmen. Yang berbeda hanya volume."),
      t("Revenue fell 10% from January to March in every segment, and no client stopped.", "Revenue turun 10% dari Januari ke Maret di semua segmen, dan tidak ada klien yang berhenti."),
    ],
    recommendation: t(
      "A dedicated Account Manager for Loyal Premium, volume discounts for Mid Tier, and industry-specific re-onboarding for Potential, starting with Hospitality. Six clients whose daily non-email messages dropped by more than 10% get contacted in April.",
      "Account Manager khusus untuk Loyal Premium, diskon volume untuk Mid Tier, dan onboarding ulang per industri untuk Potential, dimulai dari Hospitality. Enam klien yang pesan non-email per harinya turun lebih dari 10% dihubungi pada April.",
    ),
    limits: t(
      "Only 20 clients and one quarter, so the early churn signal can't yet be tested against churn that actually happened.",
      "Hanya 20 klien dan satu kuartal, jadi sinyal churn dini belum bisa diuji terhadap churn yang benar terjadi.",
    ),
    files: [
      { label: t("Telkom OCA portfolio draft", "Draf Portofolio Telkom OCA"), href: "https://docs.google.com/document/d/1N3b0rFtYR_GkUegV0S4qsOpnzbfs6ruBC1LwkiVYz6U/edit" },
      { label: t("Notebook (GitHub)", "Notebook (GitHub)") },
      { label: t("Presentation slides, PDF", "Slide presentasi, PDF") },
    ],
  },
  {
    slug: "telkom-m1",
    fullCase: "telkom-m1",
    code: "Telkom M1",
    name: t("OCA Messaging Performance Dashboard", "Dashboard Kinerja Pesan OCA"),
    industry: t("Telecommunications", "Telekomunikasi"),
    field: field.reporting,
    tools: ["Tableau"],
    category: "data",
    featured: true,
    title: t("OCA's message volume fell 28%, and email was the main cause", "Volume pesan OCA turun 28%, dan email jadi penyebab utamanya"),
    sentence: t("A Tableau dashboard for four reader groups, built from 122,749 transactions", "Dashboard Tableau untuk empat kelompok pembaca dari 122.749 transaksi"),
    tags: [tag.dashboard, tag.kpi, tag.stakeholder],
    info: [t("Tableau Public", "Tableau Public"), t("Solo", "Dikerjakan sendiri"), t("RevoU x Telkom Indonesia", "RevoU x Telkom Indonesia")],
    figure: { label: t("Screenshot of the dashboard's main page", "Tangkapan layar halaman utama dashboard") },
    summary: t(
      "OCA Blast's four channel reports were still separate, so the source of the Q1 2025 volume drop wasn't visible. I brought 122,749 transactions into one Tableau dashboard for four reader groups. Result: 12,000 of the 14,042 lost messages came from email.",
      "Laporan empat channel OCA Blast masih terpisah, jadi penurunan volume di Q1 2025 tidak terlihat sumbernya. Saya menyatukan 122.749 transaksi ke satu dashboard Tableau untuk empat kelompok pembaca. Hasilnya, 12.000 dari 14.042 pesan yang hilang berasal dari email.",
    ),
    data: t(
      "Four channel tables and one client table, January to March 2025. The four tables were combined, joined to the client table, and 15 message statuses were mapped to successful or unsuccessful.",
      "Empat tabel channel dan satu tabel klien, Januari sampai Maret 2025. Keempat tabel disatukan, dihubungkan ke tabel klien, lalu 15 status pesan dipetakan menjadi berhasil atau tidak berhasil.",
    ),
    decisions: [
      t("The dashboard is split by reader: one summary page for C-level and one page for each team.", "Dashboard dibagi per pembaca: satu halaman ringkasan untuk C-level dan satu halaman untuk tiap tim."),
      t("Emails with a clicked status count as successful. With this definition the overall success rate is 79.54%; without clicked it's 78.65%.", "Email berstatus clicked dihitung berhasil. Dengan definisi ini tingkat keberhasilan keseluruhan 79,54%. Tanpa clicked angkanya 78,65%."),
    ],
    findings: [
      t("Volume fell 28% (49,534 to 35,492 messages), and email alone fell 60%.", "Volume turun 28% (49.534 menjadi 35.492 pesan), dan email sendiri turun 60%."),
      t("SMS succeeded 99.67% of the time and brought 38.7% of revenue, but held only 16% of volume. Call succeeded only 21.87%.", "SMS berhasil 99,67% dan menyumbang 38,7% revenue, tapi hanya memegang 16% volume. Call hanya berhasil 21,87%."),
      t("The top three clients brought about 60% of revenue.", "Tiga klien teratas menyumbang sekitar 60% revenue."),
    ],
    recommendation: t(
      "Investigate the email drop before Q2. Limit Call to high-value cases. Add a minimum 85% success rate per channel to the Q2 KPIs.",
      "Penurunan email diselidiki sebelum Q2. Call dibatasi untuk kasus bernilai tinggi. Tingkat keberhasilan minimal 85% per channel masuk KPI Q2.",
    ),
    limits: t(
      "The data covers one quarter and has no technical email logs, so the cause of the email drop can't be confirmed yet.",
      "Data hanya satu kuartal dan tidak memuat log teknis email, jadi penyebab penurunan email belum bisa dipastikan.",
    ),
    files: [
      { label: t("Telkom OCA portfolio draft", "Draf Portofolio Telkom OCA"), href: "https://docs.google.com/document/d/1N3b0rFtYR_GkUegV0S4qsOpnzbfs6ruBC1LwkiVYz6U/edit" },
      { label: t("Tableau Public dashboard", "Dashboard Tableau Public"), href: "https://public.tableau.com/views/OCAIndonesia-UnifiedChannelPerformance/OCAIndonesia-UnifiedChannelPerformance" },
      { label: t("Presentation slides, PDF", "Slide presentasi, PDF") },
    ],
  },
  {
    slug: "case-14",
    fullCase: "pertumbuhan-tahunan",
    code: "CASE 14",
    name: t("YoY Growth Analysis", "YoY Growth Analysis"),
    industry: t("Distribution", "Distribusi"),
    field: field.sales,
    tools: ["SQL"],
    category: "data",
    featured: true,
    title: t("12.37% growth clears the 10% bar, carried by larger orders in four of five product lines", "Pertumbuhan 12,37% lolos ambang 10%, ditopang pesanan yang lebih besar di empat dari lima lini produk"),
    sentence: t("Year-on-year growth analysis ahead of a Rp 12 billion funding decision", "Analisis pertumbuhan tahunan sebelum keputusan pendanaan Rp 12 miliar"),
    tags: [tag.sql, tag.finance],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("pertumbuhan-tahunan", "gambar-1.png"), label: t("Figure 1: year-on-year revenue growth by month, 2025", "Gambar 1: pertumbuhan pendapatan tahun ke tahun per bulan 2025") },
    summary: t(
      "A distributor needed proof of growth above 10% to apply for Rp 12 billion in funding. 2025 revenue grew 12.37% over 2024, held up after cleaning, and stayed above 10% in three of four quarters. The growth came from larger orders, while Grocery, the largest line, lost orders.",
      "Sebuah distributor butuh bukti pertumbuhan di atas 10% untuk mengajukan pendanaan Rp 12 miliar. Pendapatan 2025 naik 12,37% dari 2024, bertahan setelah data dibersihkan, dan tetap di atas 10% pada tiga dari empat kuartal. Pertumbuhannya datang dari pesanan yang lebih besar, sedangkan Grocery, lini terbesar, kehilangan pesanan.",
    ),
    data: t(
      "40,800 raw rows, 38,780 used. Dropped: 800 duplicate orders, 485 with no value, 593 returns, and 142 orders after the cut-off date. Without cleaning, growth reads 13.09%.",
      "40.800 baris mentah, 38.780 dipakai. Yang dibuang: 800 pesanan ganda, 485 tanpa nilai, 593 retur, dan 142 pesanan setelah tanggal batas. Tanpa pembersihan, pertumbuhan terbaca 13,09%.",
    ),
    decisions: [
      t("For duplicate orders, I kept the earliest-dated row with a value filled in. 120 order numbers had failed attempts on the same date.", "Untuk pesanan ganda, yang disimpan adalah baris tanggal paling awal yang nilainya terisi. Ada 120 nomor pesanan yang punya percobaan gagal di tanggal yang sama."),
      t("No seasonal index was used to adjust growth, because a year-on-year comparison already compares the same months.", "Indeks musim tidak dipakai untuk mengoreksi pertumbuhan, karena perbandingan tahun ke tahun sudah membandingkan bulan yang sama."),
    ],
    findings: [
      t("Quarterly growth was 9.59% to 13.89%. Six months fell below 10%, but with a 7.24-point monthly spread that isn't yet a sign of weakening.", "Pertumbuhan per kuartal 9,59% sampai 13,89%. Enam bulan jatuh di bawah 10%, tapi dengan simpangan bulanan 7,24 poin itu belum menjadi tanda melemah."),
      t("Grocery, the largest line with 24.98% of revenue, fell 1.67%, and its orders fell 8.35% in all five regions.", "Grocery, lini terbesar dengan 24,98% pendapatan, turun 1,67%, dan pesanannya turun 8,35% di kelima wilayah."),
      t("Units per order rose from 18.08 to 19.95 while rupiah per unit in each line stayed almost flat. All 200 outlets ordered in both years, and 112 grew above 10%.", "Unit per pesanan naik dari 18,08 ke 19,95 sementara rupiah per unit di tiap lini hampir tetap. Ke-200 outlet memesan di kedua tahun, dan 112 tumbuh di atas 10%."),
    ],
    recommendation: t(
      "Take the 12.37% figure to the meeting together with the quarterly and per-line breakdown. Prepare an answer on Grocery orders before anyone asks, since that line holds almost a quarter of revenue.",
      "Bawa angka 12,37% ke rapat bersama rincian per kuartal dan per lini. Siapkan jawaban soal pesanan Grocery sebelum ditanya, karena lini ini memegang hampir seperempat pendapatan.",
    ),
    limits: t(
      "The data only covers sales, so the cause of the Grocery drop isn't known. Whether the funding makes sense needs cash flow and liabilities beyond this data.",
      "Data hanya berisi penjualan, jadi penyebab turunnya Grocery belum diketahui. Layak tidaknya pendanaan butuh arus kas dan kewajiban di luar data ini.",
    ),
    files: [
      {
        label: t("CASE 14 folder", "Folder CASE 14"),
        href: "https://drive.google.com/drive/folders/1KmSMKyHa7fL0Gdp-20WZ4ePFMs4QqNUi",
        note: folderNote("decision memo, SQL queries, and query results", "memo keputusan, kueri SQL, dan hasil kueri"),
      },
    ],
  },
  {
    slug: "case-9",
    fullCase: "analisis-keranjang",
    code: "CASE 9",
    name: t("Market Basket Analysis", "Market Basket Analysis"),
    industry: t("Beauty e-commerce", "E-commerce kecantikan"),
    field: field.sales,
    tools: ["SQL"],
    category: "data",
    featured: true,
    title: t("The top-scoring product pair appears in only 146 of 3,000 baskets", "Pasangan produk dengan angka tertinggi hanya ada di 146 dari 3.000 keranjang"),
    sentence: t("Choosing three product bundles for an Rp 80 million campaign", "Pemilihan tiga bundel produk untuk kampanye Rp 80 juta"),
    tags: [tag.sql, tag.stats, tag.basket],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("analisis-keranjang", "gambar-1.png"), label: t("Figure 1: times-chance co-occurrence and basket count, 105 product pairs", "Gambar 1: kali lipat kemunculan bersama dan jumlah keranjang, 105 pasangan produk") },
    summary: t(
      "A beauty e-commerce business was preparing an Rp 80 million bundle campaign. Of 105 product pairs, three qualified as bundles, but most of their buyers already buy both. I rejected the pair with the highest association score because too few customers bought it.",
      "Sebuah e-commerce kecantikan menyiapkan kampanye bundel Rp 80 juta. Dari 105 pasangan produk, tiga lolos sebagai bundel, tetapi sebagian besar pembelinya sudah membeli keduanya. Pasangan dengan angka hubungan tertinggi saya tolak karena terlalu sedikit pembelinya.",
    ),
    data: t(
      "18,815 order-item rows, 3,000 baskets, January 2025 to March 2026. 1,556 rows (8.3%) were dropped: 835 duplicates, 374 with no product code, 200 returns, and 147 free samples.",
      "18.815 baris item order, 3.000 keranjang, Januari 2025 sampai Maret 2026. Sebanyak 1.556 baris (8,3%) dibuang: 835 duplikat, 374 tanpa kode produk, 200 retur, dan 147 sampel gratis.",
    ),
    decisions: [
      t("Baskets are counted from unique products per order. Using raw rows raises the pair count by 14.2%, and unevenly.", "Keranjang dihitung dari produk unik per order. Kalau baris mentah dipakai, jumlah pasangan naik 14,2% dan kenaikannya tidak merata."),
      t("A pair has to pass three tests at once: more frequent than chance, present in at least 200 baskets, and a significant difference. Ranking by a single measure would put the 146-basket pair first.", "Pasangan harus lolos tiga syarat sekaligus: lebih sering dari kebetulan, ada di minimal 200 keranjang, dan selisihnya signifikan. Mengurutkan dengan satu ukuran saja akan menaruh pasangan 146 keranjang di posisi pertama."),
      t("The 200-basket threshold was tested from 0 to 1,500. The same three bundles come out for thresholds from 147 to 1,231, and again on the last six months alone.", "Ambang 200 keranjang diuji dari 0 sampai 1.500. Tiga bundel yang sama keluar untuk ambang 147 sampai 1.231, dan juga pada enam bulan terakhir saja."),
    ],
    findings: [
      t("The three bundles appear in 1,231 to 1,395 baskets and occur together 1.41 to 1.68 times more often than chance. Their six products are the six best sellers, with 2.1 to 2.4 baskets holding both for every basket holding one.", "Tiga bundel ada di 1.231 sampai 1.395 keranjang dan muncul bersama 1,41 sampai 1,68 kali lipat dari kebetulan. Keenam produknya enam produk terlaris, dengan 2,1 sampai 2,4 keranjang berisi keduanya untuk tiap keranjang berisi salah satu."),
      t("The rejected pair occurs together 13.46 times more often than chance, but appears in only 146 baskets (4.9%).", "Pasangan yang ditolak muncul bersama 13,46 kali lipat dari kebetulan, tapi hanya ada di 146 keranjang (4,9%)."),
      t("47 of 105 pairs look associated, but only 4 have a difference too large to be chance.", "47 dari 105 pasangan tampak berhubungan, tapi hanya 4 yang selisihnya terlalu besar untuk kebetulan."),
    ],
    recommendation: t(
      "Run the three bundles as a test with a comparison group, because only the gap between groups shows extra sales. Move the rejected pair to automatic recommendations on the product page, which cost almost nothing.",
      "Jalankan tiga bundel sebagai uji dengan kelompok pembanding, karena hanya selisih antarkelompok yang menunjukkan penjualan tambahan. Pasangan yang ditolak dipindah ke rekomendasi otomatis di halaman produk, yang biayanya hampir nol.",
    ),
    limits: t(
      "The data has no promotion results or margins, so the bundles' added sales and profit can't be estimated. Ramadan pair patterns weren't checked separately.",
      "Data tidak memuat hasil promosi atau margin, jadi tambahan penjualan dan untung bundel tidak bisa diperkirakan. Pola pasangan selama Ramadan belum diperiksa terpisah.",
    ),
    files: [
      {
        label: t("CASE 9 folder", "Folder CASE 9"),
        href: "https://drive.google.com/drive/folders/1f3TngZSC0yYUtq99YapCx0EVR-mSsTjG",
        note: folderNote("decision memo, evidence appendix, and SQL queries", "memo keputusan, lampiran bukti, dan kueri SQL"),
      },
    ],
  },

  /* ---------------- CASE 1–8 (full case studies available) ---------------- */
  {
    slug: "case-1",
    code: "CASE 1",
    name: t("Retail Sales Analysis", "Analisis Penjualan Ritel"),
    industry: t("Retail", "Ritel"),
    field: field.sales,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("Total sales were inflated 23.6% before a single broken row was touched", "Total penjualan membengkak 23,6% sebelum satu baris rusak pun disentuh"),
    sentence: t("Cleaning a ten-branch POS export before deciding stock priorities", "Membersihkan ekspor kasir sepuluh cabang sebelum menentukan prioritas stok"),
    tags: [tag.spreadsheet, tag.cleaning],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("penjualan-ritel", "gambar-2.png"), label: t("Figure 2: clean 2025 net sales by branch", "Gambar 2: penjualan bersih 2025 per cabang") },
    summary: t(
      "A ten-branch retail chain needed to decide which branches to prepare first for its biggest shopping period. Its POS export also contained 2026 transactions, so 2025 sales read 23.6% too high. After cleaning, only the top two branches led clearly enough to be prioritized.",
      "Jaringan ritel sepuluh cabang perlu menentukan cabang mana yang disiapkan lebih dulu untuk periode belanja terbesarnya. Ekspor kasirnya ikut memuat transaksi 2026, sehingga penjualan 2025 terbaca 23,6% terlalu tinggi. Setelah dibersihkan, hanya dua cabang teratas yang unggul cukup jelas untuk diprioritaskan.",
    ),
    data: t(
      "5,145 POS export rows, 4,112 clean 2025 transactions. 1,000 rows fell outside the period (Rp 4.78 billion), and 7 rows had negative Qty or Price worth Rp 144.3 million.",
      "5.145 baris ekspor kasir, 4.112 transaksi bersih 2025. Sebanyak 1.000 baris jatuh di luar periode (Rp 4,78 miliar), dan 7 baris punya Qty atau Price minus senilai Rp 144,3 juta.",
    ),
    decisions: [
      t("The period was limited first, because out-of-period transactions added 23.6% to the total while the broken rows were only 1.09%.", "Periode dibatasi lebih dulu, karena transaksi di luar periode menambah total 23,6%, sedangkan baris rusak hanya 1,09%."),
      t("Anomalies were checked from Qty × Price. The TotalSales column held no negative values at all, even though seven rows were wrong.", "Anomali dicek dari Qty × Price. Kolom TotalSales tidak memuat satu pun nilai minus, padahal tujuh barisnya bermasalah."),
      t("Months were compared on the average per calendar day, because February has only 28 days.", "Bulan dibandingkan dengan rata-rata per hari kalender, karena Februari hanya 28 hari."),
    ],
    findings: [
      t("Yogyakarta and Medan lead third place by Rp 321.9 million, while the next five branches sit within Rp 119.4 million of each other.", "Yogyakarta dan Medan unggul Rp 321,9 juta dari peringkat 3, sedangkan lima cabang berikutnya hanya terpaut Rp 119,4 juta."),
      t("Cleaning moved the total by only 1.09%, but that was enough to swap two pairs of branch rankings.", "Pembersihan hanya mengubah total 1,09%, tapi cukup untuk menukar dua pasang peringkat cabang."),
      t("February ranks 9th by monthly total but 2nd by daily average. The 13.7% start-of-month surge comes almost entirely from February and November.", "Februari ada di peringkat 9 menurut total bulanan, tapi peringkat 2 menurut rata-rata harian. Lonjakan awal bulan 13,7% hampir seluruhnya berasal dari Februari dan November."),
    ],
    recommendation: t(
      "Prioritize the top two branches and treat the five middle branches as equal. A start-of-month promotion is worth a trial, but not yet a rule, because the surge happened in only two months.",
      "Prioritaskan dua cabang teratas dan perlakukan lima cabang tengah setara. Promo awal bulan layak diuji coba, tapi belum dijadikan aturan, karena lonjakannya hanya terjadi di dua bulan.",
    ),
    limits: t(
      "There is no cost data or promotion flag, and only one year of data. If the negative rows are valid returns, Surabaya East drops from 4th to 7th; the top two branches don't change.",
      "Tidak ada data biaya dan penanda promo, dan data hanya satu tahun. Kalau baris minus ternyata retur sah, Surabaya East turun dari peringkat 4 ke 7; dua cabang teratas tidak berubah.",
    ),
    files: [
      { label: t("CASE 1 folder", "Folder CASE 1"), href: "https://drive.google.com/drive/folders/1o_GxkwEQzL3tGqDM0sd5p1mxmnrChTwD", note: folderNote("workbook, memo, and decision log", "workbook, memo, dan catatan keputusan") },
    ],
    fullCase: "penjualan-ritel",
  },
  {
    slug: "case-2",
    code: "CASE 2",
    name: t("Employee Retention Analysis", "Analisis Retensi Karyawan"),
    industry: t("Technology", "Teknologi"),
    field: field.hr,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("Seven departments differ by only 7.3 points, so the retention budget can't be split by department", "Tujuh departemen hanya berselisih 7,3 poin, jadi anggaran retensi tidak bisa dibagi per departemen"),
    sentence: t("Finding the employee groups that resign the most", "Mencari kelompok karyawan yang paling banyak resign"),
    tags: [tag.spreadsheet, tag.hr],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("retensi-karyawan", "gambar-1.png"), label: t("Figure 1: resignation range across five ways of grouping", "Gambar 1: rentang resign pada lima cara pengelompokan") },
    summary: t(
      "A tech company wanted to split its retention budget between two departments. All seven departments sit within 7.3 points, a gap that can still arise by chance. Working hours and satisfaction separate employees 7.6 and 9.4 times more sharply.",
      "Sebuah perusahaan teknologi ingin membagi anggaran retensi ke dua departemen. Ketujuh departemen berada dalam rentang 7,3 poin, selisih yang masih bisa muncul secara kebetulan. Jam kerja dan kepuasan memisahkan karyawan 7,6 dan 9,4 kali lebih tajam.",
    ),
    data: t(
      "2,010 rows of HR data, 1,980 clean employees, snapshot as of 1 April 2026. Five employees were recorded working 26 to 29 hours a day, and 240 promotion dates fell after the reference date.",
      "2.010 baris data kepegawaian, 1.980 karyawan bersih, potret per 1 April 2026. Lima karyawan tercatat bekerja 26 sampai 29 jam sehari, dan 240 tanggal promosi jatuh setelah tanggal acuan.",
    ),
    decisions: [
      t("Rows with an empty promotion date were kept, because empty means never promoted. Dropping them would remove 32.0% of employees.", "Baris dengan tanggal promosi kosong dipertahankan, karena kosong berarti belum pernah dipromosikan. Membuangnya akan menghapus 32,0% karyawan."),
      t("The per-department analysis was still done in full, tested with chi-square, then compared with four other groupings.", "Analisis per departemen tetap dikerjakan lengkap, diuji dengan chi-square, lalu dibandingkan dengan empat pengelompokan lain."),
    ],
    findings: [
      t("Resignation by department ranges from 14.2% to 21.5% (chi-square p = 0.30). Just 22 people with a different status would move HR from the top to the bottom.", "Resign per departemen berkisar 14,2% sampai 21,5% (chi-square p = 0,30). Cukup 22 orang berbeda status untuk memindahkan HR dari posisi teratas ke terbawah."),
      t("Of the 263 employees working under 8 hours a day, none resigned.", "Dari 263 karyawan yang bekerja di bawah 8 jam sehari, tidak ada yang resign."),
      t("Among employees working 11 hours or more, satisfaction below 3.0 goes with 68.1% resignation, versus 20.0%.", "Pada karyawan yang bekerja 11 jam ke atas, kepuasan di bawah 3,0 berkaitan dengan resign 68,1%, dibanding 20,0%."),
      t("Performance scores and salary don't distinguish who resigns.", "Skor performa dan gaji tidak membedakan siapa yang resign."),
    ],
    recommendation: t(
      "Target the 360 employees who work 11 hours or more: 18.2% of staff, 57.4% of resignations, present in every department. One program is enough, starting with low satisfaction. Test whether shorter hours lower resignations in one group first, and add a range check on working-hours input.",
      "Sasar 360 karyawan yang bekerja 11 jam ke atas: 18,2% karyawan, 57,4% resign, ada di setiap departemen. Cukup satu program, dimulai dari kepuasan rendah. Uji dulu di satu kelompok apakah jam kerja yang lebih pendek menurunkan resign, dan tambahkan pemeriksaan batas pada input jam kerja.",
    ),
    limits: t(
      "The data is a single snapshot, so it shows association only, not cause and effect. There are no exit interviews or direct-manager data.",
      "Data adalah potret satu waktu, jadi yang terlihat hanya kaitan, belum sebab akibat. Tidak ada wawancara keluar maupun data atasan langsung.",
    ),
    files: [
      { label: t("CASE 2 folder", "Folder CASE 2"), href: "https://drive.google.com/drive/folders/1SIBIEpJSDc2486DC2OuuOqIV4GWfMd3r", note: folderNote("workbook, memo, and decision log", "workbook, memo, dan catatan keputusan") },
    ],
    fullCase: "retensi-karyawan",
  },
  {
    slug: "case-3",
    code: "CASE 3",
    name: t("Revenue Forecasting", "Ramalan Pendapatan"),
    industry: t("Mid-sized business", "Usaha menengah"),
    field: field.finance,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("24.6% growth came from volume, and early-year volume has already stopped rising", "Pertumbuhan 24,6% datang dari volume, dan volume awal tahun sudah berhenti naik"),
    sentence: t("A revenue forecast as a range, for the budget meeting", "Ramalan pendapatan berbentuk rentang untuk rapat anggaran"),
    tags: [tag.spreadsheet, tag.forecasting],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("ramalan-pendapatan", "gambar-1.png"), label: t("Figure 1: change in revenue, transaction count, and value per transaction", "Gambar 1: perubahan pendapatan, jumlah transaksi, dan nilai per transaksi") },
    summary: t(
      "The finance lead wanted to set the annual target by extending 24.6% growth. All of that growth came from the number of transactions, and in the first quarter of the current year that number had stopped rising. I built a forecast as a range, one budget figure with its reasoning, and monthly indicators to track.",
      "Pimpinan keuangan ingin menyusun target tahunan dengan melanjutkan pertumbuhan 24,6%. Seluruh kenaikan itu ternyata datang dari jumlah transaksi, dan di kuartal pertama tahun berjalan jumlah itu sudah tidak bertambah. Saya menyusun ramalan berbentuk rentang, satu angka anggaran beserta alasannya, dan indikator yang bisa dipantau bulanan.",
    ),
    data: t(
      "500 rows of financial records over 27 months, 482 clean. The last period contains only three months.",
      "500 baris catatan keuangan selama 27 bulan, 482 bersih. Periode terakhir hanya berisi tiga bulan.",
    ),
    decisions: [
      t("The last three months weren't treated as a yearly point, since that would show a 74.3% drop. I compared January–March with the same period last year.", "Tiga bulan terakhir tidak dijadikan titik tahunan, karena hasilnya akan tampak turun 74,3%. Yang dipakai adalah perbandingan Januari sampai Maret dengan periode yang sama tahun lalu."),
      t("Cleaning was still done even though the total moved only 1.4%, because eleven of twelve monthly figures shifted too, the largest by 18.7%.", "Pembersihan tetap dilakukan walaupun total hanya bergeser 1,4%, karena sebelas dari dua belas angka bulanan ikut bergeser, terbesar 18,7%."),
    ],
    findings: [
      t("Revenue rose 24.6%, transaction count rose 26.9%, and value per transaction fell 1.8%.", "Pendapatan naik 24,6%, jumlah transaksi naik 26,9%, dan nilai per transaksi turun 1,8%."),
      t("Monthly revenue correlates 0.967 with transaction count. Value per transaction has no trend (r = −0.194) and stays around Rp 32.3 million.", "Pendapatan bulanan berkorelasi 0,967 dengan jumlah transaksi. Nilai per transaksi tidak punya tren (r = −0,194) dan bertahan di sekitar Rp 32,3 juta."),
      t("On a like-for-like period, revenue fell 12.8% and transaction count fell 10.4%.", "Pada periode yang setara, pendapatan turun 12,8% dan jumlah transaksi turun 10,4%."),
    ],
    recommendation: t(
      "Build the target from the stable value per transaction times a varied transaction count. The range is Rp 7.6 to 9.7 billion. The proposed budget figure is Rp 7.6 billion, matching the first-quarter transaction pace. Track monthly transaction count as the indicator.",
      "Target disusun dari nilai per transaksi yang stabil dikali jumlah transaksi yang divariasikan. Rentangnya Rp 7,6 sampai 9,7 miliar. Angka anggaran yang diusulkan Rp 7,6 miliar, sesuai laju transaksi kuartal pertama. Jumlah transaksi per bulan dijadikan indikator yang dipantau.",
    ),
    limits: t(
      "There's no customer or unit data, so the cause of the volume increase can't be confirmed, and 27 months is too short to separate seasonal patterns. If last year's strong first quarter repeats, the current pace equals about Rp 6.8 billion, below the budget figure.",
      "Tidak ada data pelanggan dan unit, jadi penyebab naiknya volume tidak bisa dipastikan, dan 27 bulan terlalu pendek untuk memisahkan pola musim. Kalau kuartal pertama yang kuat tahun lalu berulang, laju sekarang setara sekitar Rp 6,8 miliar, di bawah angka anggaran.",
    ),
    files: [
      { label: t("CASE 3 folder", "Folder CASE 3"), href: "https://drive.google.com/drive/folders/17GkkMEL0L_JaDW4AVMdL2ABWmmkXfwPR", note: folderNote("workbook, memo, and decision log", "workbook, memo, dan catatan keputusan") },
    ],
    fullCase: "ramalan-pendapatan",
  },
  {
    slug: "case-4",
    code: "CASE 4",
    name: t("Inventory Analysis", "Analisis Persediaan"),
    industry: t("Distribution", "Distribusi"),
    field: field.supplyChain,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("All 361 reorder points were too low because of one operator in the formula", "Seluruh 361 ambang pemesanan terlalu rendah karena satu tanda operasi di rumus"),
    sentence: t("Finding the wrong reorder-point formula in an inventory system", "Menemukan rumus ambang stok yang salah di sistem persediaan"),
    tags: [tag.spreadsheet, tag.inventory],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("ambang-persediaan", "gambar-2.png"), label: t("Figure 2: how far the recorded reorder point sits below the standard formula, by lead time", "Gambar 2: seberapa jauh ambang tercatat di bawah rumus baku, per waktu tunggu") },
    summary: t(
      "Three products sat empty on the shelf for almost a week without ever appearing on the order list. After recalculating the reorder points, every threshold in the system turned out to be too low. The system formula adds two days to the lead time, while its own safety stock equals one full lead time.",
      "Tiga produk sempat kosong di rak hampir seminggu tanpa pernah muncul di daftar pesanan. Setelah ambang pemesanan dihitung ulang, semua ambang di sistem ternyata terlalu rendah. Rumus sistem menambahkan dua hari pada waktu tunggu, padahal stok pengaman yang dihitung sistem sendiri sebesar satu masa tunggu penuh.",
    ),
    data: t(
      "401 rows of inventory data from three warehouses, 361 clean SKUs. Dropped: duplicates, negative stock, empty or zero prices, and empty lead times.",
      "401 baris data persediaan dari tiga gudang, 361 SKU bersih. Yang dibuang: duplikat, stok negatif, harga kosong atau nol, dan waktu tunggu kosong.",
    ),
    decisions: [
      t("The system's calculated columns were recomputed from their inputs. The original columns weren't overwritten, so the two can be compared.", "Kolom hasil hitungan sistem dihitung ulang dari bahannya. Kolom aslinya tidak ditimpa supaya bisa dibandingkan."),
      t("The data wasn't assumed correct just because three cross-column consistency rules passed. Consistency only proves every number came from the same rule.", "Data tidak dianggap benar hanya karena tiga aturan konsistensi antarkolom lolos. Konsistensi hanya membuktikan semua angka lahir dari satu aturan."),
    ],
    findings: [
      t("Reorder points were too low on 361 of 361 items, short by 24.9 units on average.", "Ambang terlalu rendah pada 361 dari 361 barang, rata-rata kurang 24,9 unit."),
      t("System formula: daily sales × (lead time + 2). Standard formula: daily sales × (lead time × 2). The gap grows from 16.7% at a 3-day lead time to 40.0% at 10 days.", "Rumus sistem: penjualan harian × (waktu tunggu + 2). Rumus baku: penjualan harian × (waktu tunggu × 2). Celahnya naik dari 16,7% pada waktu tunggu 3 hari sampai 40,0% pada 10 hari."),
      t("The order list held 118 items when it should have held 193. Separately, 68 items already had stock below their lead-time requirement.", "Daftar pesanan berisi 118 barang, padahal seharusnya 193. Terpisah dari itu, 68 barang stoknya sudah di bawah kebutuhan selama waktu tunggu."),
    ],
    recommendation: t(
      "Two jobs for two owners. Procurement expedites or transfers stock for the 68 critical items that week, starting with the Jakarta warehouse, which holds 32 of them. The system owner replaces the reorder formula.",
      "Dua pekerjaan untuk dua penerima. Tim pengadaan mempercepat pengiriman atau memindahkan stok 68 barang kritis minggu itu, dimulai dari gudang Jakarta yang menampung 32 di antaranya. Pemilik sistem mengganti rumus ambang.",
    ),
    limits: t(
      "There's no holding cost, so higher reorder points can't be claimed as savings. The Rp 66.7 million in sales not covered by stock during the lead time is an upper bound.",
      "Tidak ada biaya penyimpanan, jadi kenaikan ambang tidak bisa diklaim sebagai penghematan. Penjualan yang tidak tertutup stok selama masa tunggu, Rp 66,7 juta, adalah batas atas.",
    ),
    files: [
      { label: t("CASE 4 folder", "Folder CASE 4"), href: "https://drive.google.com/drive/folders/1YP0nuLTLPG2U77QK-MOC3pW7INbgHFgy", note: folderNote("workbook, memo, and decision log", "workbook, memo, dan catatan keputusan") },
    ],
    fullCase: "ambang-persediaan",
  },
  {
    slug: "case-5",
    code: "CASE 5",
    name: t("Digital Ad Spend Efficiency", "Efisiensi Belanja Iklan Digital"),
    industry: t("Advertising agency", "Agensi periklanan"),
    field: field.marketing,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("Platforms differ 2.4 times, campaign types differ 4.0 times", "Platform berselisih 2,4 kali, jenis kampanye berselisih 4,0 kali"),
    sentence: t("Splitting an Rp 200 million Lebaran ad budget across three platforms", "Pembagian anggaran iklan Lebaran Rp 200 juta di tiga platform"),
    tags: [tag.spreadsheet, tag.marketing],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("efisiensi-iklan", "gambar-1.png"), label: t("Figure 1: share of spend and share of revenue for three platforms", "Gambar 1: porsi belanja dan porsi pendapatan tiga platform") },
    summary: t(
      "The marketing manager wanted to put the Rp 200 million Lebaran budget on the most efficient ad platform. Facebook is indeed 2.4 times more efficient than Instagram, with the same share of spend. But campaign type separates results more sharply, at 4.0 times.",
      "Manajer pemasaran ingin menaruh anggaran Lebaran Rp 200 juta di platform iklan paling efisien. Facebook memang 2,4 kali lebih efisien dari Instagram, dengan porsi belanja yang sama. Tapi jenis kampanye memisahkan hasil lebih tajam, 4,0 kali.",
    ),
    data: t(
      "1,012 campaign rows on Facebook, Instagram, and TikTok, 975 clean. Five campaigns are dated after the 1 April 2026 data position even though their results are recorded, so the trend stops at March 2026.",
      "1.012 baris kampanye di Facebook, Instagram, dan TikTok, 975 bersih. Lima kampanye bertanggal sesudah posisi data 1 April 2026 padahal hasilnya sudah tercatat, jadi tren dibatasi sampai Maret 2026.",
    ),
    decisions: [
      t("Efficiency is total revenue divided by total spend. The per-campaign average wasn't used because it weights small and large campaigns equally.", "Efisiensi dihitung dari total pendapatan dibagi total belanja. Rata-rata per kampanye tidak dipakai karena memberi bobot sama pada kampanye kecil dan besar."),
      t("The budget wasn't split in straight proportion to efficiency, because the data shows no saturation point.", "Anggaran tidak dibagi sebanding lurus dengan efisiensi, karena data tidak menunjukkan titik jenuh."),
    ],
    findings: [
      t("Facebook returns Rp 3.65 per rupiah, Instagram Rp 1.54. Both received the same share of spend, 31.5%. The order is the same in the last year alone.", "Facebook menghasilkan Rp 3,65 per rupiah, Instagram Rp 1,54. Keduanya menerima porsi belanja yang sama, 31,5%. Urutannya sama bila dibatasi ke setahun terakhir."),
      t("Retargeting returns Rp 4.51 per rupiah, Brand Awareness Rp 1.13.", "Retargeting menghasilkan Rp 4,51 per rupiah, Brand Awareness Rp 1,13."),
      t("Facebook leads in four of five campaign types. In Traffic, TikTok leads narrowly (1.84 vs 1.66).", "Facebook unggul di empat dari lima jenis kampanye. Di Traffic, TikTok unggul tipis (1,84 lawan 1,66)."),
    ],
    recommendation: t(
      "Facebook Rp 80 million, TikTok Rp 70 million, Instagram Rp 50 million. Put Conversion and Retargeting first, and stop Brand Awareness and Engagement on Instagram.",
      "Facebook Rp 80 juta, TikTok Rp 70 juta, Instagram Rp 50 juta. Dahulukan Conversion dan Retargeting, dan hentikan Brand Awareness serta Engagement di Instagram.",
    ),
    limits: t(
      "ROAS isn't a profit measure because margins weren't recorded. There's no cross-campaign attribution data.",
      "ROAS bukan ukuran untung karena margin tidak tercatat. Tidak ada data atribusi antarkampanye.",
    ),
    files: [
      { label: t("CASE 5 folder", "Folder CASE 5"), href: "https://drive.google.com/drive/folders/17gX1c7eC_3dxxsFRGVF7r2Zfqr4Oe-uZ", note: folderNote("workbook, memo, and scope notes", "workbook, memo, dan catatan cakupan") },
    ],
    fullCase: "efisiensi-iklan",
  },
  {
    slug: "case-6",
    code: "CASE 6",
    name: t("Subscription Retention Analysis", "Analisis Retensi Pelanggan Berlangganan"),
    industry: t("Subscription software", "Software berlangganan"),
    field: field.customer,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("New-cohort retention appears to drop 50 points, and most of that drop comes from the observation window", "Retensi kohort baru tampak turun 50 poin, dan sebagian besar penurunan itu berasal dari jendela pengamatan"),
    sentence: t("A retention matrix for fundraising material", "Matriks retensi untuk materi penggalangan dana"),
    tags: [tag.spreadsheet, tag.cohort],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("retensi-kohort", "gambar-2.png"), label: t("Figure 2: month-3 retention range at four levels of conditions", "Gambar 2: rentang retensi bulan ketiga pada empat tingkat syarat") },
    summary: t(
      "A software company founder needed a retention matrix for an investor presentation. The matrix as-is showed new cohorts doing much worse. Most of that drop appeared because new cohorts hadn't been observed long enough; a smaller gap of 4 to 5 points remains real.",
      "Pendiri perusahaan perangkat lunak butuh matriks retensi untuk presentasi ke investor. Matriks apa adanya menunjukkan kohort baru jauh lebih buruk. Sebagian besar penurunan itu muncul karena kohort baru belum cukup lama diamati; sisa selisih 4 sampai 5 poin tetap nyata.",
    ),
    data: t(
      "More than 10,000 users in 15 monthly cohorts. The data only holds the last-active date, so \"retained\" is measured from the gap between sign-up date and last-active date.",
      "Lebih dari 10.000 pengguna dalam 15 kohort bulanan. Data hanya memuat tanggal aktif terakhir, jadi \"bertahan\" diukur dari jarak tanggal daftar ke tanggal aktif terakhir.",
    ),
    decisions: [
      t("Cells that couldn't be measured yet were left empty, not written as zero.", "Sel yang belum sempat diukur dikosongkan, tidak ditulis nol."),
      t("Cohorts are only compared with cohorts observed for an equal length of time, and the remaining gap was tested statistically.", "Kohort hanya dibandingkan dengan kohort yang lama pengamatannya setara, dan sisa selisihnya diuji secara statistik."),
      t("Retention was calculated twice: by user count and by revenue.", "Retensi dihitung dua kali: dari jumlah pengguna dan dari pendapatan."),
    ],
    findings: [
      t("Almost 40% of users were last active in the month the data was pulled. That's the data cut-off date, not a wave of churn.", "Hampir 40% pengguna tercatat aktif terakhir di bulan data diambil. Itu tanggal potong data, bukan gelombang berhenti."),
      t("47% of matrix cells had never been measured but were written as zero.", "47% sel matriks belum pernah diukur tapi tertulis nol."),
      t("The month-3 retention gap shrinks from 50.2 points to 0.8 points as cohorts are made comparable. Among six comparable cohorts, May and June 2025 sit at 87.7% versus 92.1% (z = 4.5).", "Selisih retensi bulan ketiga menyusut dari 50,2 poin ke 0,8 poin saat kohortnya dibuat setara. Di antara enam kohort yang sebanding, Mei dan Juni 2025 berada di 87,7% lawan 92,1% (z = 4,5)."),
      t("The oldest cohort keeps 52.2% of users at month 12, but 76.0% of its revenue (provisional). The settled month-9 figures are 71.1% and 90.8%.", "Kohort tertua mempertahankan 52,2% pengguna di bulan ke-12, tapi 76,0% pendapatannya (sementara). Angka bulan ke-9 yang sudah mapan 71,1% dan 90,8%."),
    ],
    recommendation: t(
      "Show both retention figures side by side, the lower one first, and state the comparison conditions. Don't claim retention is improving; the remaining gap isn't yet separated from the calendar effect. A full comparison needs about six more months.",
      "Tampilkan kedua angka retensi berdampingan, yang lebih rendah lebih dulu, dan tulis syarat perbandingannya. Jangan klaim retensi membaik; sisa selisihnya belum terpisah dari efek kalender. Perbandingan penuh butuh sekitar enam bulan lagi.",
    ),
    limits: t(
      "Last-active date tends to overstate retention compared with subscription status. There's no plan-change history.",
      "Tanggal aktif terakhir cenderung melebihkan retensi dibanding status langganan. Tidak ada riwayat perpindahan paket.",
    ),
    files: [
      { label: t("CASE 6 folder", "Folder CASE 6"), href: "https://drive.google.com/drive/folders/1MrsKzDPVZl6rTDuOw3PV4CsxC0IoSgYe", note: folderNote("workbook, memo, and recording notes", "workbook, memo, dan catatan pencatatan") },
    ],
    fullCase: "retensi-kohort",
  },
  {
    slug: "case-7",
    code: "CASE 7",
    name: t("Healthcare Wait Time Analysis", "Analisis Waktu Tunggu Layanan Kesehatan"),
    industry: t("Healthcare", "Kesehatan"),
    field: field.operations,
    tools: ["Spreadsheet"],
    category: "data",
    title: t("Clinic branch rankings are no different from a lottery draw", "Peringkat cabang klinik tidak berbeda dari hasil undian"),
    sentence: t("Testing where long patient waiting times come from", "Menguji dari mana waktu tunggu pasien yang panjang berasal"),
    tags: [tag.spreadsheet, tag.stats],
    info: [t("Spreadsheet", "Spreadsheet"), ...windataMeta],
    figure: { src: img("waktu-tunggu-klinik", "gambar-1.png"), label: t("Figure 1: actual range and reshuffled range by grouping", "Gambar 1: rentang nyata dan rentang hasil pengacakan per pengelompokan") },
    summary: t(
      "An eight-branch clinic network wanted to add doctors at the branch with the longest waiting time. The gap between branches is no larger than chance alone would produce. Differences between clinicians exist, but among those with enough data the remaining gap is also equal to chance.",
      "Jaringan klinik delapan cabang ingin menambah dokter di cabang dengan waktu tunggu terlama. Selisih antarcabang tidak lebih besar dari yang bisa muncul karena kebetulan. Perbedaan antartenaga medis ada, tetapi pada yang berdata memadai sisa selisihnya juga setara kebetulan.",
    ),
    data: t(
      "782 visit rows, 744 clean. The data doesn't record visit time or the number of doctors per session.",
      "782 baris kunjungan, 744 bersih. Data tidak mencatat jam kunjungan dan jumlah dokter per sesi.",
    ),
    decisions: [
      t("Every difference was tested by reshuffling group labels 2,000 times.", "Setiap perbedaan diuji dengan mengacak ulang label kelompok 2.000 kali."),
      t("Clinicians with few visits were excluded step by step and the test was repeated, because averages from few visits easily go extreme.", "Tenaga medis dengan kunjungan sedikit dikeluarkan bertahap dan ujinya diulang, karena rata-rata dari sedikit kunjungan mudah ekstrem."),
      t("I didn't build individual rankings, because the cause of the differences isn't known.", "Saya tidak menyusun peringkat individu, karena penyebab perbedaannya tidak diketahui."),
    ],
    findings: [
      t("The highest and lowest branches differ by 4.0 minutes. 31.8% of reshuffles produced a gap that large.", "Cabang tertinggi dan terendah berselisih 4,0 menit. Sebanyak 31,8% pengacakan menghasilkan selisih sebesar itu."),
      t("Between clinicians the gap is 16.8 minutes, and only 0.7% of reshuffles reach it.", "Antartenaga medis selisihnya 16,8 menit, dan hanya 0,7% pengacakan yang mencapainya."),
      t("With a minimum of 20 visits, the gap shrinks to 6.4 minutes, and 89% of reshuffles reach that.", "Dengan syarat minimal 20 kunjungan, selisihnya tinggal 6,4 menit, dan 89% pengacakan mencapainya."),
    ],
    recommendation: t(
      "Don't use branch rankings to place doctors, and don't set per-person waiting-time targets. Record visit times and doctors per session for three months.",
      "Jangan pakai peringkat cabang untuk menempatkan dokter, dan jangan buat target waktu tunggu per orang. Catat jam kunjungan dan jumlah dokter per sesi selama tiga bulan.",
    ),
    limits: t(
      "The cause of the differences between clinicians is unknown. The most likely explanation, scheduling, isn't in the data.",
      "Penyebab perbedaan antartenaga medis belum diketahui. Penjelasan yang paling mungkin, yaitu jadwal, tidak ada di data.",
    ),
    files: [
      { label: t("CASE 7 folder", "Folder CASE 7"), href: "https://drive.google.com/drive/folders/1KcbA2BdzrKAk2l4nnO8rOKA1IBGcFwLU", note: folderNote("workbook, memo, and recording notes", "workbook, memo, dan catatan pencatatan") },
    ],
    fullCase: "waktu-tunggu-klinik",
  },
  {
    slug: "case-8",
    code: "CASE 8",
    name: t("RFM Customer Segmentation", "Segmentasi Pelanggan RFM"),
    industry: t("E-commerce marketplace", "Marketplace e-commerce"),
    field: field.customer,
    tools: ["SQL"],
    category: "data",
    title: t("8% of customers hold 28.7% of value, yet the retention budget is split evenly", "8% pelanggan memegang 28,7% nilai, tapi anggaran retensi dibagi rata"),
    sentence: t("RFM segmentation for an Rp 150 million quarterly retention budget", "Segmentasi RFM untuk anggaran retensi Rp 150 juta per kuartal"),
    tags: [tag.sql, tag.segmentation],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("segmentasi-rfm", "gambar-1.png"), label: t("Figure 1: customer share and value share by segment", "Gambar 1: pangsa pelanggan dan pangsa nilai per segmen") },
    summary: t(
      "The Rp 150 million quarterly retention budget had been split evenly across 5,000 customers, about Rp 30,000 each. RFM segmentation shows 400 customers hold 28.7% of transaction value, and 900 customers who used to be regulars have not transacted for more than a quarter.",
      "Anggaran retensi Rp 150 juta per kuartal selama ini dibagi rata ke 5.000 pelanggan, sekitar Rp 30.000 per orang. Segmentasi RFM menunjukkan 400 pelanggan memegang 28,7% nilai transaksi, dan 900 pelanggan yang dulu rajin sudah lebih dari satu kuartal tidak bertransaksi.",
    ),
    data: t(
      "50,980 transaction rows, 48,130 clean. Dropped: 2,400 duplicates, 350 empty values, 50 non-positive values, and 50 rows after 31 March 2026.",
      "50.980 baris transaksi, 48.130 bersih. Yang dibuang: 2.400 duplikat, 350 nilai kosong, 50 nilai tidak positif, dan 50 baris setelah 31 Maret 2026.",
    ),
    decisions: [
      t("The reference date is locked at 31 March 2026 so the results can be reproduced.", "Tanggal acuan dikunci di 31 Maret 2026 supaya hasilnya bisa diulang."),
      t("Segment cut-offs were set after reading the R, F, and M distributions, then sensitivity-tested. Quintile scoring wasn't used because it's harder to explain to the budget owner.", "Ambang segmen ditetapkan setelah membaca sebaran R, F, dan M, lalu diuji kepekaannya. Skoring kuintil tidak dipakai karena lebih sulit dijelaskan ke pemegang anggaran."),
    ],
    findings: [
      t("Champions: 400 customers, 28.7% of value. Loyal: 1,100 customers, 30.2%. At Risk: 900 customers, 24.7% or Rp 2.74 billion. Lost: 2,600 customers, 16.4%.", "Champions: 400 pelanggan, 28,7% nilai. Loyal: 1.100 pelanggan, 30,2%. At Risk: 900 pelanggan, 24,7% atau Rp 2,74 miliar. Lost: 2.600 pelanggan, 16,4%."),
      t("The Loyal cut-off is the most sensitive: lowering frequency from 8 to 6 moves 824 customers. The Champions recency cut-off moves no one.", "Ambang Loyal paling peka: menurunkan frekuensi dari 8 ke 6 memindahkan 824 pelanggan. Ambang Recency Champions tidak memindahkan siapa pun."),
      t("Of 2,222 Loyal customers as of December 2025, 857 had become At Risk by March 2026, 95% of today's At Risk group.", "Dari 2.222 pelanggan Loyal per Desember 2025, 857 sudah menjadi At Risk pada Maret 2026, 95% dari At Risk saat ini."),
    ],
    recommendation: t(
      "Concentrate the budget instead of splitting it evenly: 40% on non-discount appreciation for Champions, 40% on a win-back test for At Risk with a 20% comparison group that gets nothing, 15% to keep Loyal, 5% for measurement.",
      "Pusatkan anggaran, tidak lagi dibagi rata: 40% untuk apresiasi non-diskon bagi Champions, 40% untuk uji win-back At Risk dengan 20% kelompok pembanding yang tidak dikirimi apa pun, 15% menjaga Loyal, 5% untuk pengukuran.",
    ),
    limits: t(
      "There are no campaign results or channel costs, so there's no ROI figure. Champions status rests on a March 2026 surge (without it only 285 qualify), and At Risk formed while January and February 2026 transactions fell sharply.",
      "Tidak ada hasil kampanye dan biaya kanal, jadi tidak ada angka ROI. Status Champions bertumpu pada lonjakan Maret 2026 (tanpanya hanya 285 yang lolos), dan At Risk terbentuk saat transaksi Januari dan Februari 2026 turun tajam.",
    ),
    files: [
      { label: t("CASE 8 folder", "Folder CASE 8"), href: "https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP", note: folderNote("decision memo, evidence appendix, and SQL queries", "memo keputusan, lampiran bukti, dan kueri SQL") },
    ],
    fullCase: "segmentasi-rfm",
  },

  /* ---------------- CASE 10–13 ---------------- */
  {
    slug: "case-10",
    fullCase: "analisis-funnel",
    code: "CASE 10",
    name: t("Funnel Analysis", "Funnel Analysis"),
    industry: t("Super-app", "Super-app"),
    field: field.product,
    tools: ["SQL"],
    category: "data",
    title: t("Phone verification holds back 6,730 of 14,874 sign-ups", "Verifikasi nomor telepon menahan 6.730 dari 14.874 pendaftar"),
    sentence: t("A five-stage onboarding funnel to pick the first fix", "Funnel onboarding lima tahap untuk menentukan perbaikan pertama"),
    tags: [tag.sql, tag.funnel, tag.cohort],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("analisis-funnel", "gambar-1.png"), label: t("Figure 1: users at each funnel stage, and those who don't reach the next", "Gambar 1: pengguna di tiap tahap funnel, dan yang tidak sampai ke tahap berikutnya") },
    summary: t(
      "A super-app knew its total conversion was 19.88%, but not at which stage new users were lost. A five-stage funnel shows the phone verification step loses 45.25% of sign-ups. The difference between platforms at that step is too small to split the fix by.",
      "Sebuah super-app tahu konversi totalnya 19,88%, tapi tidak tahu di tahap mana pengguna baru hilang. Funnel lima tahap menunjukkan langkah verifikasi telepon kehilangan 45,25% pendaftar. Selisih antarplatform di langkah itu terlalu kecil untuk memecah perbaikannya.",
    ),
    data: t(
      "80,000 event rows from 20,000 users, 76,204 clean. Dropped: 3,150 duplicate rows, 500 with no event name, and 146 timestamped after the end of the data.",
      "80.000 baris peristiwa dari 20.000 pengguna, 76.204 bersih. Yang dibuang: 3.150 baris kembar, 500 tanpa nama peristiwa, dan 146 berstempel waktu setelah akhir data.",
    ),
    decisions: [
      t("People are counted, once per stage. Counting rows inflates the first stage by 4.32%.", "Yang dihitung adalah orang, sekali per tahap. Kalau baris yang dihitung, tahap pertama membengkak 4,32%."),
      t("Each step's conversion is measured against the stage directly before it.", "Konversi tiap langkah dihitung terhadap tahap tepat sebelumnya."),
      t("The recent-period test uses a cohort of new visitors since 1 October 2025. Cutting by date was rejected because it produced 126.87% conversion.", "Uji periode terbaru memakai kohort pengunjung baru sejak 1 Oktober 2025. Potongan per tanggal ditolak karena menghasilkan konversi 126,87%."),
    ],
    findings: [
      t("Verification loses 6,730 of 14,874 sign-ups, more than the last two steps combined. The other three steps lose 25.43% to 30.60%.", "Verifikasi kehilangan 6.730 dari 14.874 pendaftar, lebih banyak dari dua langkah terakhir digabung. Tiga langkah lain kehilangan 25,43% sampai 30,60%."),
      t("Verification conversion by platform is 53.46% to 55.28%. The 1.82-point gap can't yet be told apart from chance (z 1.59).", "Konversi verifikasi per platform 53,46% sampai 55,28%. Selisih 1,82 poin belum bisa dibedakan dari kebetulan (z 1,59)."),
      t("159 stage records skip the previous stage, and some first-visit timestamps look defective, so event logging isn't clean yet.", "159 catatan melompati tahap sebelumnya, dan sebagian stempel kunjungan pertama tampak cacat, jadi pencatatan peristiwanya belum bersih."),
    ],
    recommendation: t(
      "One fix at the verification step for all platforms. Audit the logging first, starting with the code-delivery records, then run the fix as a test with a comparison group. Baseline to track: 54.37% verification conversion.",
      "Satu perbaikan di langkah verifikasi untuk semua platform. Audit pencatatan dulu, dimulai dari catatan pengiriman kode, lalu jalankan perbaikannya sebagai uji dengan kelompok pembanding. Nilai awal yang dipantau: konversi verifikasi 54,37%.",
    ),
    limits: t(
      "There are no records of verification codes being sent and no experiment data, so the cause and size of any improvement can't be estimated yet. New visitors per month fell 37% from October 2025.",
      "Tidak ada catatan pengiriman kode verifikasi dan tidak ada data percobaan, jadi penyebab dan besar kenaikannya belum bisa diperkirakan. Pengunjung baru per bulan turun 37% sejak Oktober 2025.",
    ),
    files: [
      { label: t("CASE 10 folder", "Folder CASE 10"), href: "https://drive.google.com/drive/folders/1G4zWKbhuikCkt27hnz621Ik5kkPo6I1O", note: folderNote("decision memo, evidence appendix, and SQL queries", "memo keputusan, lampiran bukti, dan kueri SQL") },
    ],
  },
  {
    slug: "case-11",
    fullCase: "deteksi-kecurangan",
    code: "CASE 11",
    name: t("Fraud Detection", "Fraud Detection"),
    industry: t("Digital wallet", "Dompet digital"),
    field: field.risk,
    tools: ["SQL"],
    category: "data",
    title: t("Behind 1,395 suspicious transactions there are only 56 people", "Di balik 1.395 transaksi mencurigakan hanya ada 56 orang"),
    sentence: t("A review priority queue for a digital wallet's risk team", "Antrean prioritas tinjauan untuk tim risiko dompet digital"),
    tags: [tag.sql, tag.rules],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("deteksi-kecurangan", "gambar-3.png"), label: t("Figure 3: users touched at three threshold positions", "Gambar 3: pengguna yang tersentuh pada tiga posisi ambang") },
    summary: t(
      "A digital wallet's risk team can only review 200 cases a day. Four behavioral signals produce a queue of 1,395 transactions belonging to 56 users over 15 months. At full volume that becomes about 705 transactions from about 108 users a day, which only fits if reviewed by user. Lowering the threshold would touch 2,581 people without adding a single check.",
      "Tim risiko dompet digital hanya sanggup meninjau 200 kasus sehari. Empat isyarat perilaku menghasilkan antrean 1.395 transaksi milik 56 pengguna selama 15 bulan. Pada volume penuh itu menjadi sekitar 705 transaksi dari sekitar 108 pengguna sehari, yang hanya muat kalau ditinjau per pengguna. Menurunkan ambang akan menyentuh 2.581 orang tanpa menambah satu pemeriksaan pun.",
    ),
    data: t(
      "101,039 transaction rows from 8,000 users, 98,897 clean. Dropped: 1,200 copies, 148 timestamped after the end of the period, and 794 refunds kept separately.",
      "101.039 baris transaksi dari 8.000 pengguna, 98.897 bersih. Yang dibuang: 1.200 salinan, 148 berstempel setelah akhir periode, dan 794 pengembalian dana yang dipisahkan.",
    ),
    decisions: [
      t("The output is a review priority level (Low, Medium, High), organized by user. A fraud label isn't used because the data contains no review outcomes.", "Keluarannya tingkat prioritas tinjauan (Rendah, Sedang, Tinggi), disusun per pengguna. Label curang tidak dipakai karena data tidak memuat hasil pemeriksaan."),
      t("The score is rule-based. A machine learning model was rejected because there isn't a single labeled example.", "Skornya berbasis aturan. Model machine learning ditolak karena tidak ada satu pun contoh berlabel."),
      t("Thresholds and weights are marked as not yet calibrated everywhere the numbers appear.", "Ambang dan bobot ditandai belum dikalibrasi di setiap tempat angkanya muncul."),
    ],
    findings: [
      t("At most 3 people enter the queue in a day, with a peak of 14 transactions. Capacity is 200.", "Dalam sehari paling banyak 3 orang masuk antrean, dengan puncak 14 transaksi. Kapasitasnya 200."),
      t("A lowered threshold raises the queue to 4,872 transactions and 2,581 people.", "Ambang yang diturunkan menaikkan antrean menjadi 4.872 transaksi dan 2.581 orang."),
      t("Different weights only change the order inside Medium. The level is decided by how many signals fire.", "Bobot yang berbeda hanya mengubah urutan di dalam Sedang. Tingkat ditentukan oleh berapa isyarat yang menyala."),
      t("1,474 of 1,616 amount signals occurred from November 2025 to March 2026, all on transactions above Rp 2 million.", "1.474 dari 1.616 isyarat jumlah terjadi November 2025 sampai Maret 2026, semuanya pada transaksi di atas Rp 2 juta."),
    ],
    recommendation: t(
      "Review by user, one person one case carrying earlier results. Record every review outcome as a label from day one, plus 20 random transactions a day from outside the queue. Don't change thresholds before labels are collected, and don't use this list to freeze accounts automatically.",
      "Tinjau per pengguna, satu orang satu kasus yang membawa hasil tinjauan sebelumnya. Catat hasil tiap tinjauan sebagai label sejak hari pertama, ditambah 20 transaksi acak sehari dari luar antrean. Jangan ubah ambang sebelum label terkumpul, dan jangan pakai daftar ini untuk menahan akun otomatis.",
    ),
    limits: t(
      "The queue's accuracy can't be calculated yet because there are no human review outcomes. Full-volume figures are scaled up from a dataset about 1/230 of daily volume.",
      "Ketepatan antrean belum bisa dihitung karena belum ada hasil tinjauan manusia. Angka volume penuh adalah hasil perkalian dari dataset yang kira-kira 1/230 volume harian.",
    ),
    files: [
      { label: t("CASE 11 folder", "Folder CASE 11"), href: "https://drive.google.com/drive/folders/1dNayzpUA-FOX7Diu8NGoEzT-vdKCQ91R", note: folderNote("decision memo, decision log, and SQL queries", "memo keputusan, catatan keputusan, dan kueri SQL") },
    ],
  },
  {
    slug: "case-12",
    fullCase: "rantai-pasok",
    code: "CASE 12",
    name: t("Supply Chain Analysis", "Supply Chain Analysis"),
    industry: t("Logistics", "Logistik"),
    field: field.supplyChain,
    tools: ["SQL"],
    category: "data",
    title: t("Three high-volume routes account for 34.77% of late-delivery penalties", "Tiga jalur bervolume besar menyumbang 34,77% denda keterlambatan"),
    sentence: t("Finding the source of late-delivery penalties at a courier company", "Mencari sumber denda keterlambatan di perusahaan pengiriman"),
    tags: [tag.sql, tag.stats, tag.supplyChain],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("rantai-pasok", "gambar-1.png"), label: t("Figure 1: the period's penalties by route", "Gambar 1: denda periode per jalur") },
    summary: t(
      "An intercity delivery company pays an Rp 50,000 penalty for every late parcel. Penalties pile up on three high-volume routes out of Jakarta, whose on-time rates sit around the company average. So the improvement priority is taken from volume.",
      "Perusahaan pengiriman antarkota membayar denda Rp 50.000 untuk tiap paket yang terlambat. Denda terkumpul di tiga jalur bervolume besar dari Jakarta, yang ketepatannya di sekitar rata-rata perusahaan. Prioritas perbaikan karena itu diambil dari volume.",
    ),
    data: t(
      "25,800 shipment rows over 15 months, 24,740 valid shipments. 2,126 shipments had no arrival date yet and were kept separate, so 22,614 shipments were measured.",
      "25.800 baris pengiriman selama 15 bulan, 24.740 kiriman sah. Sebanyak 2.126 kiriman belum punya tanggal tiba dan dipisahkan, jadi yang diukur 22.614 kiriman.",
    ),
    decisions: [
      t("Late means arriving after that shipment's own promised date. A single travel-time limit for all routes was rejected because route distances differ.", "Terlambat berarti tiba setelah tanggal janji kiriman itu sendiri. Satu batas lama perjalanan untuk semua jalur ditolak karena jarak antarjalur berbeda."),
      t("Shipments not yet delivered were kept separate, not counted as late.", "Kiriman yang belum tiba dipisahkan, tidak dihitung terlambat."),
      t("Couriers are only rated with at least 30 shipments, and every figure comes with a 95% confidence interval.", "Kurir baru dinilai kalau punya minimal 30 kiriman, dan setiap angka disertai selang kepercayaan 95%."),
    ],
    findings: [
      t("1,809 late shipments, 92.00% on time, Rp 90.45 million in total penalties.", "1.809 kiriman terlambat, ketepatan 92,00%, total denda Rp 90,45 juta."),
      t("All fifteen routes sit between 90.32% and 92.86%. That range can't be told apart from chance (p = 0.62), and neither can pickup days (p = 0.87).", "Kelima belas jalur berada di 90,32% sampai 92,86%. Rentang ini tidak bisa dibedakan dari kebetulan (p = 0,62), begitu juga hari pengambilan (p = 0,87)."),
      t("The lowest courier recorded 78.57% from 42 shipments, but its confidence interval is 64.06% to 88.29%. As a group, the bottom ten couriers are at 81.53%.", "Kurir terendah tercatat 78,57% dari 42 kiriman, tapi selang kepercayaannya 64,06% sampai 88,29%. Sebagai kelompok, sepuluh kurir terbawah 81,53%."),
      t("2,113 shipments without an arrival date are already past their promise by 222 days on average. If they all arrived late, on-time delivery would be 84.14%.", "2.113 kiriman tanpa tanggal tiba sudah lewat janji rata-rata 222 hari. Kalau semuanya ternyata tiba terlambat, ketepatan menjadi 84,14%."),
    ],
    recommendation: t(
      "Focus improvement on the three Jakarta routes. If all three reach 97%, penalties drop by Rp 19.55 million. Review the bottom ten couriers as a group. Check the physical status of the 2,113 undelivered shipments already past their promised date, and start recording the reason for every delay.",
      "Fokus perbaikan di tiga jalur Jakarta. Kalau ketiganya mencapai 97%, denda turun Rp 19,55 juta. Tinjau sepuluh kurir terbawah sebagai kelompok. Cek status fisik 2.113 kiriman belum tiba yang sudah lewat tanggal janji, dan mulai catat alasan setiap keterlambatan.",
    ),
    limits: t(
      "There's no delay-cause column, so this analysis shows where delays pile up, not why. The 97% target comes from outside the data.",
      "Tidak ada kolom penyebab keterlambatan, jadi analisis ini menunjukkan di mana keterlambatan terkumpul, belum kenapa. Target 97% diambil dari luar data.",
    ),
    files: [
      { label: t("CASE 12 folder", "Folder CASE 12"), href: "https://drive.google.com/drive/folders/1z1ksCqZQyWMhGfFgOlkHnpAUVc1-hwCC", note: folderNote("decision memo, data reconciliation, query results, and SQL queries", "memo keputusan, rekonsiliasi data, hasil kueri, dan kueri SQL") },
    ],
  },
  {
    slug: "case-13",
    fullCase: "aktivitas-pengguna",
    code: "CASE 13",
    name: t("User Activity Analysis", "User Activity Analysis"),
    industry: t("Video streaming", "Streaming video"),
    field: field.product,
    tools: ["SQL"],
    category: "data",
    title: t("First-week users of social features return 6.84 points more often, and experiment size decides which test runs first", "Pemakai fitur sosial di pekan pertama 6,84 poin lebih sering kembali, dan ukuran percobaan menentukan uji mana yang berjalan lebih dulu"),
    sentence: t("Deciding which feature to fund first from an Rp 500 million budget", "Menentukan fitur yang dibiayai lebih dulu dari anggaran Rp 500 juta"),
    tags: [tag.sql, tag.stats, tag.experiment],
    info: [t("SQL", "SQL"), ...windataMeta],
    figure: { src: img("aktivitas-pengguna", "gambar-3.png"), label: t("Figure 3: 30-day return rate with and without social features in the first week", "Gambar 3: tingkat kembali 30 hari dengan dan tanpa fitur sosial di pekan pertama") },
    summary: t(
      "The head of product at a video subscription service had to pick which feature to fund from an Rp 500 million budget. Stickiness had sat around 24% for months, far from the 35% target. First-week social-feature users return more often, but how many people each experiment needs decides which test can start now.",
      "Kepala produk layanan video berlangganan harus memilih fitur yang dibiayai dari anggaran Rp 500 juta. Stickiness berbulan-bulan di sekitar 24%, jauh dari target 35%. Pemakai fitur sosial di pekan pertama lebih sering kembali, tetapi berapa orang yang dibutuhkan tiap percobaan menentukan uji mana yang bisa dimulai sekarang.",
    ),
    data: t(
      "60,000 activity rows, 57,051 clean, from 2,153 active users, July 2025 to March 2026. The data has no revenue, subscription status, sign-up date, or experiment results.",
      "60.000 baris aktivitas, 57.051 bersih, dari 2.153 pengguna aktif, Juli 2025 sampai Maret 2026. Data tidak memuat pendapatan, status langganan, tanggal daftar, atau hasil percobaan.",
    ),
    decisions: [
      t("Every user count uses COUNT(DISTINCT). COUNT(*) gives a daily average of 208.2 instead of 204.4, and the error wouldn't be visible.", "Semua cacah pengguna memakai COUNT(DISTINCT). COUNT(*) memberi rata-rata harian 208,2 alih-alih 204,4, dan kesalahannya tidak akan terlihat."),
      t("A full retention curve wasn't used because nine months is only enough for the earliest cohort.", "Kurva retensi penuh tidak dipakai karena sembilan bulan hanya cukup untuk kohort paling awal."),
      t("First-week active days were matched before comparing return rates, because social-feature users were already more active from the start.", "Jumlah hari aktif pekan pertama disamakan sebelum tingkat kembali dibandingkan, karena pemakai fitur sosial sudah lebih rajin sejak awal."),
    ],
    findings: [
      t("Users first seen in the data fell from 340 in August 2025 to 25 in March 2026. Without a sign-up date this may be existing users appearing, not fewer sign-ups.", "Pengguna yang pertama terlihat di data turun dari 340 di Agustus 2025 ke 25 di Maret 2026. Tanpa tanggal daftar, ini bisa jadi pengguna lama yang baru muncul, belum tentu pendaftar berkurang."),
      t("Stickiness is 24.17% to 27.08%. Reaching 35% needs 90 extra daily active users every day.", "Stickiness 24,17% sampai 27,08%. Untuk mencapai 35%, butuh 90 pengguna aktif harian tambahan setiap hari."),
      t("First-week social-feature users came back 67.22% of the time, versus 58.76%. After matching first-week activity, the gap is 6.84 points (2.72 to 10.96).", "Pemakai fitur sosial di pekan pertama kembali 67,22%, dibanding 58,76%. Setelah keaktifan pekan pertama disamakan, selisihnya 6,84 poin (2,72 sampai 10,96)."),
    ],
    recommendation: t(
      "First ask the data team for new sign-ups per month and the product team what ran in February 2026. Rp 150 million to test viewing recommendations on existing users now, Rp 150 million to test a share prompt once new sign-ups reach about 1,600 a quarter, and Rp 200 million in reserve.",
      "Tanyakan dulu ke tim data jumlah pendaftar baru per bulan dan ke tim produk apa yang berjalan pada Februari 2026. Rp 150 juta untuk uji rekomendasi tayangan pada pengguna lama mulai sekarang, Rp 150 juta untuk uji ajakan berbagi saat pendaftar baru cukup sekitar 1.600 orang sekuartal, dan Rp 200 juta sebagai cadangan.",
    ),
    limits: t(
      "The social-feature gap is an association, not cause and effect. Revenue uplift can't be calculated because there are no rupiah figures in the data.",
      "Selisih fitur sosial adalah hubungan, belum sebab akibat. Kenaikan pendapatan tidak bisa dihitung karena tidak ada angka rupiah di data.",
    ),
    files: [
      { label: t("CASE 13 folder", "Folder CASE 13"), href: "https://drive.google.com/drive/folders/1SLtnN9fwUOx-oeWT-u6vaY2YYvxaiatJ", note: folderNote("decision memo, query results, and SQL queries", "memo keputusan, hasil kueri, dan kueri SQL") },
    ],
  },

  /* ---------------- CASE 15–21 (visualization) ---------------- */
  {
    slug: "case-15",
    code: "CASE 15",
    name: t("Customer Survey Dashboard", "Dashboard Suara Pelanggan"),
    industry: t("Telecommunications", "Telekomunikasi"),
    field: field.customer,
    tools: ["Power BI"],
    category: "data",
    title: t("Satisfaction scores rose while the intent to leave rose too", "Skor kepuasan naik, niat berhenti ikut naik"),
    sentence: t("Rebuilding a board-meeting screen from 4,723 survey responses before a Rp 4.8 billion technician decision", "Menyusun ulang layar rapat dari 4.723 respons survei sebelum keputusan teknisi Rp 4,8 miliar"),
    tags: [tag.powerbi, tag.viz, tag.dashboard],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("suara-pelanggan", "gambar-6.png"), label: t("Figure 6: the Overview page of the Power BI dashboard", "Gambar 6: halaman Overview dashboard Power BI") },
    summary: t(
      "A home internet provider was about to spend Rp 4.8 billion a year on 40 field technicians, assuming customers leave because of the network. The meeting screen only showed the overall score going up. I rebuilt that screen from the same survey data until it showed which dimension sets apart the customers who intend to leave.",
      "Sebuah penyedia internet rumahan hendak membelanjakan Rp 4,8 miliar per tahun untuk 40 teknisi lapangan, dengan anggapan pelanggan pergi karena jaringan. Layar rapat hanya menampilkan skor keseluruhan yang naik. Saya menyusun ulang layar itu dari data survei yang sama sampai terlihat dimensi mana yang membedakan pelanggan yang berniat berhenti.",
    ),
    data: t(
      "4,723 survey responses from six cities, January to December 2025: five rated dimensions, an overall score, intent to continue, and complaint categories from 1,564 respondents. June was only surveyed for one week.",
      "4.723 respons survei dari enam kota, Januari sampai Desember 2025: lima dimensi penilaian, skor keseluruhan, niat melanjutkan, dan kategori keluhan dari 1.564 responden. Juni hanya disurvei satu minggu.",
    ),
    decisions: [
      t("The overall score was split into three lines, with customer service the only colored one. A single overall line was rejected because its rise hides the dimension falling beneath it.", "Skor keseluruhan dipecah menjadi tiga garis, dengan layanan pelanggan satu-satunya yang berwarna. Satu garis keseluruhan ditolak karena kenaikannya menutupi dimensi yang turun di bawahnya."),
      t("Drivers are shown as the score gap between those who stay and those who intend to leave, not as yearly averages.", "Pendorong ditampilkan sebagai selisih skor antara yang bertahan dan yang berniat berhenti, bukan rata-rata setahun."),
      t("Speed is shown as the spread of ratings per city, because its average falls on the rating respondents chose least often.", "Kecepatan ditampilkan sebagai sebaran nilai per kota, karena rata-ratanya jatuh di nilai yang paling jarang dipilih responden."),
    ],
    findings: [
      t("The overall score rose from 3.40 to 3.65 with the July price promotion, while customer service fell every month, from 3.66 to 2.77.", "Skor keseluruhan naik dari 3,40 ke 3,65 bersama promo harga Juli, sementara layanan pelanggan turun setiap bulan, dari 3,66 ke 2,77."),
      t("Customer service differs by +0.37 between those who stay and those who intend to leave; speed and stability only +0.06.", "Layanan pelanggan berselisih +0,37 antara yang bertahan dan yang berniat berhenti; kecepatan dan stabilitas hanya +0,06."),
      t("1,271 of 1,272 low speed ratings come from Bandung, Medan, and Balikpapan. The network problem is real, but it isn't what sets leavers apart.", "1.271 dari 1.272 nilai kecepatan rendah datang dari Bandung, Medan, dan Balikpapan. Masalah jaringan nyata, tetapi bukan pembeda yang berniat pergi."),
    ],
    recommendation: t(
      "Postpone the 40 technicians until the next meeting and decide again alongside a customer service plan. Shift this quarter's priority to customer service in Jakarta, and keep network work in the three legacy cities as a separate, costed proposal.",
      "Tunda 40 teknisi sampai rapat berikutnya dan putuskan ulang berdampingan dengan rencana layanan pelanggan. Ubah prioritas kuartal ini ke layanan pelanggan Jakarta, dan jadikan perbaikan jaringan di tiga kota lama usulan terpisah dengan hitungan biayanya sendiri.",
    ),
    limits: t(
      "The survey measures intent to leave (18.3%), not actual churn (2.6% a month), and the two aren't multiplied into rupiah. The relationships shown are associations, not causes.",
      "Survei mengukur niat berhenti (18,3%), bukan churn aktual (2,6% per bulan), dan keduanya tidak dikalikan menjadi rupiah. Hubungan yang ditunjukkan bersifat asosiasi, bukan sebab.",
    ),
    files: [
      { label: t("CASE 15 folder", "Folder CASE 15"), href: "https://drive.google.com/drive/folders/1x2iE7gseqa-SZi07KUkPvKSEuRGiA7pC", note: folderNote("Power BI dashboard, form rationale, decision memo, and test notes", "dashboard Power BI, alasan bentuk, memo keputusan, dan catatan uji") },
    ],
    fullCase: "suara-pelanggan",
  },
  {
    slug: "case-16",
    code: "CASE 16",
    name: t("Same-Day Delivery Decline Diagnosis", "Diagnosis Penurunan Pengiriman Same-Day"),
    industry: t("Logistics", "Logistik"),
    field: field.supplyChain,
    tools: ["Power BI"],
    category: "data",
    title: t("78.2% of the extra time appears in the dispatch queue, so the 12-van proposal targets a stage that barely changed", "78,2% tambahan waktu muncul di antrean dispatch, jadi usulan 12 van menyasar tahap yang hampir tidak berubah"),
    sentence: t("Diagnosing an on-time drop before a Rp 2.1 billion van lease", "Mendiagnosis turunnya ketepatan waktu sebelum sewa van Rp 2,1 miliar"),
    tags: [tag.powerbi, tag.viz, tag.supplyChain],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("pengiriman-same-day", "gambar-4.png"), label: t("Figure 4: extra minutes per order by process stage", "Gambar 4: tambahan menit per order menurut tahap proses") },
    summary: t(
      "A same-day delivery operator was about to lease 12 vans worth Rp 2.1 billion a year after on-time fell from 94.2% to 82.6%. The extra time turns out to appear before the vehicles leave: the dispatch queue accounts for 78.2%, last mile for 3.8%.",
      "Sebuah operator pengiriman same-day hendak menyewa 12 van senilai Rp 2,1 miliar per tahun setelah on-time turun dari 94,2% ke 82,6%. Tambahan waktunya ternyata muncul sebelum kendaraan berangkat: antrean dispatch menyumbang 78,2%, last mile 3,8%.",
    ),
    data: t(
      "72,000 orders from 1 May to 29 June 2026 across eight hubs, with the duration of each process stage, plus hub-day and hub-day-hour summaries. The same-day cut-off moved from 14:00 to 16:00 on 17 June.",
      "72.000 order dari 1 Mei sampai 29 Juni 2026 di delapan hub, dengan durasi tiap tahap proses, ditambah ringkasan hub-hari dan hub-hari-jam. Cut-off same-day digeser dari 14:00 ke 16:00 pada 17 Juni.",
    ),
    decisions: [
      t("The decline is shown as a daily control chart, because two before-and-after bars can't tell a lasting shift from a few bad days.", "Penurunan ditampilkan sebagai grafik kendali harian, karena dua batang sebelum dan sesudah tidak bisa membedakan pergeseran yang bertahan dari beberapa hari buruk."),
      t("Hubs are shown with late count and late rate in two panels, because a count ranking always puts the biggest hub on top.", "Hub ditampilkan dengan jumlah terlambat dan late rate di dua panel, karena peringkat jumlah saja selalu menaruh hub terbesar di puncak."),
      t("Every rate is a total divided by a total. Averaging per hub-day overstated on-time by 1.88 points.", "Setiap rate dihitung sebagai jumlah dibagi jumlah. Rata-rata per hub-hari melebihkan on-time 1,88 poin."),
    ],
    findings: [
      t("All thirteen days after the change sit below the baseline's lower limit of 92.2%.", "Ketiga belas hari sesudah perubahan berada di bawah batas bawah baseline 92,2%."),
      t("Jakarta and Bandung carry 64.1% of the extra lateness. Their orders placed 15:00 to 17:59 were late 49.5% and 59.9% of the time.", "Jakarta dan Bandung membawa 64,1% tambahan keterlambatan. Order mereka pukul 15:00 sampai 17:59 terlambat 49,5% dan 59,9%."),
      t("Same-day orders in that window now wait 54.1 minutes at dispatch instead of 31.0. Average van utilization is 65.1%, and no hub is above 69.9%.", "Order same-day di jam itu kini menunggu 54,1 menit di dispatch, bukan 31,0. Utilisasi van rata-rata 65,1%, dan tidak ada hub di atas 69,9%."),
    ],
    recommendation: t(
      "Hold the 12-van contract for two weeks. Test extra dispatch capacity from 15:00 to 18:00 in Jakarta and Bandung with the number of vans held fixed. It succeeds if the test group's on-time returns to 92.2% or higher and dispatch excess minutes fall by at least 50%.",
      "Tunda kontrak 12 van selama dua minggu. Uji tambahan kapasitas dispatch pukul 15:00 sampai 18:00 di Jakarta dan Bandung dengan jumlah van ditahan tetap. Berhasil kalau on-time kelompok uji kembali ke 92,2% atau lebih dan menit kelebihan dispatch turun minimal 50%.",
    ),
    limits: t(
      "This analysis is observational, so the cut-off change coincides with the decline but isn't proven as the cause. Utilization is a daily average and could hide hourly peaks. Rp 2.1 billion is a contract on hold, not a saving.",
      "Analisis ini observasional, jadi perubahan cut-off bertepatan dengan penurunan tetapi belum terbukti sebagai sebab. Utilisasi adalah rata-rata harian dan bisa menyembunyikan puncak per jam. Rp 2,1 miliar adalah nilai kontrak yang ditunda, belum penghematan.",
    ),
    files: [
      { label: t("CASE 16 folder", "Folder CASE 16"), href: "https://drive.google.com/drive/folders/1QJ--OCQC5WO2xKShJ7HGPMlFzLFvxAov", note: folderNote("Power BI dashboard, design decisions, validation notes, and decision memo", "dashboard Power BI, catatan keputusan desain, catatan validasi, dan memo keputusan") },
    ],
    fullCase: "pengiriman-same-day",
  },
  {
    slug: "case-17",
    code: "CASE 17",
    name: t("Choosing Outlets to Close", "Pemilihan Gerai yang Ditutup"),
    industry: t("Food & beverage", "Makanan & minuman"),
    field: field.sales,
    tools: ["Power BI"],
    category: "data",
    title: t("The cheapest closure list would close fifteen outlets that are still growing", "Daftar penutupan termurah ternyata menutup lima belas gerai yang sedang tumbuh"),
    sentence: t("Choosing 20 of 180 coffee outlets to close from 24 months of revenue", "Memilih 20 dari 180 gerai kopi yang ditutup dari pendapatan 24 bulan"),
    tags: [tag.powerbi, tag.viz, tag.dashboard],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("gerai-ditutup", "gambar-1.png"), label: t("Figure 1: who each ranking method picks, by trajectory group", "Gambar 1: siapa yang dipilih tiap cara mengurutkan, menurut kelompok lintasan") },
    summary: t(
      "A coffee chain had to close 20 of 180 outlets at a fixed cost of Rp 17 billion. The proposed list held the 20 outlets with the lowest latest-month revenue. Splitting that list by each outlet's 24-month trajectory showed 15 of the 20 were newly opened outlets still growing.",
      "Sebuah jaringan kedai kopi harus menutup 20 dari 180 gerai dengan biaya tetap Rp 17 miliar. Daftar usulan berisi 20 gerai dengan pendapatan bulan terakhir terendah. Setelah isinya dipecah menurut lintasan 24 bulan tiap gerai, 15 dari 20 namanya ternyata gerai baru yang masih tumbuh.",
    ),
    data: t(
      "Monthly revenue for 180 outlets, January 2024 to December 2025, 3,975 filled rows. 19 outlets opened mid-period. Revenue only: no costs, profit, or events.",
      "Pendapatan bulanan 180 gerai, Januari 2024 sampai Desember 2025, 3.975 baris terisi. 19 gerai dibuka di tengah periode. Hanya pendapatan: tanpa biaya, laba, atau peristiwa.",
    ),
    decisions: [
      t("Level and direction are drawn on two axes. A combined score was rejected because six pairs of outlets have identical figures in both columns and only their trajectory tells them apart.", "Tingkat dan arah digambar di dua sumbu. Skor gabungan ditolak karena enam pasang gerai punya angka sama persis di kedua kolom dan hanya lintasannya yang memisahkan mereka."),
      t("All three rankings are shown side by side, so the reader sees that equally valid rankings give different lists.", "Ketiga peringkat ditampilkan berdampingan, supaya pembaca melihat bahwa peringkat yang sama sahnya memberi daftar berbeda."),
      t("Small-multiple panels share a fixed axis, because automatic axes made flat outlets look as steep as ones that fell 38%.", "Panel kecil memakai sumbu tetap yang sama, karena sumbu otomatis membuat gerai datar tampak securam gerai yang jatuh 38%."),
    ],
    findings: [
      t("Three valid rankings give three lists with no shared outlet; lost revenue ranges from Rp 4.22 billion to Rp 19.02 billion.", "Tiga peringkat yang sama sahnya memberi tiga daftar tanpa gerai yang sama; pendapatan yang ikut hilang berkisar Rp 4,22 miliar sampai Rp 19,02 miliar."),
      t("15 of the 20 cheapest outlets opened between May and September 2025, and their revenue has risen 38% to 120% since their first month.", "15 dari 20 gerai termurah dibuka Mei sampai September 2025, dan pendapatannya sudah naik 38% sampai 120% sejak bulan pertama."),
      t("23 outlets fell together from March to April 2025 while 122 other established outlets rose 5.5%.", "23 gerai turun bersama dari Maret ke April 2025, sementara 122 gerai lama lain naik 5,5%."),
    ],
    recommendation: t(
      "Close the 16 outlets declining gradually. Investigate the 23 April outlets as one question for two weeks before filling the remaining four seats, and review the 19 new outlets after 12 months of full operation.",
      "Tutup 16 gerai yang menurun bertahap. Telusuri 23 gerai April sebagai satu pertanyaan selama dua minggu sebelum mengisi empat kursi sisanya, dan tinjau ulang 19 gerai baru sesudah 12 bulan beroperasi penuh.",
    ),
    limits: t(
      "The data only holds revenue, so nothing is said about which outlets lose money, and the cause of the April 2025 drop isn't in the data. The Rp 17 billion cost isn't claimed as a saving.",
      "Data hanya memuat pendapatan, jadi tidak ada pernyataan tentang gerai mana yang merugi, dan sebab penurunan April 2025 tidak ada di data. Biaya Rp 17 miliar tidak diklaim sebagai penghematan.",
    ),
    files: [
      { label: t("CASE 17 folder", "Folder CASE 17"), href: "https://drive.google.com/drive/folders/1zeqrcmc0G5HRuh0ePB65YKEn2-bdkypm", note: folderNote("Power BI dashboard, design decisions, validation notes, and closure memo", "dashboard Power BI, catatan keputusan desain, catatan validasi, dan memo penutupan") },
    ],
    fullCase: "gerai-ditutup",
  },
  {
    slug: "case-18",
    code: "CASE 18",
    name: t("Category Margin Analysis", "Analisis Margin Kategori"),
    industry: t("E-commerce", "E-commerce"),
    field: field.finance,
    tools: ["Power BI"],
    category: "data",
    title: t("Combined margin rose 4.84 points while all seven categories fell", "Margin gabungan naik 4,84 poin sementara ketujuh kategori turun"),
    sentence: t("Splitting a combined margin before a Rp 34 billion incentive and a fee increase", "Memecah margin gabungan sebelum insentif Rp 34 miliar dan kenaikan biaya layanan"),
    tags: [tag.powerbi, tag.viz, tag.finance],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("margin-kategori", "gambar-5.png"), label: t("Figure 5: breaking down the +4.84-point rise", "Gambar 5: penguraian kenaikan +4,84 poin") },
    summary: t(
      "A marketplace was about to pay a Rp 34 billion incentive to its pricing team and raise seller fees in every category, because combined gross margin rose from 15.58% to 20.43%. That figure is correct. Split by category without changing a number, all seven category margins moved the other way.",
      "Sebuah marketplace hendak mencairkan insentif Rp 34 miliar untuk tim penetapan harga dan menaikkan biaya layanan penjual di semua kategori, karena margin kotor gabungan naik dari 15,58% ke 20,43%. Angka itu benar. Dipecah per kategori tanpa mengubah satu angka pun, margin ketujuh kategori bergerak ke arah sebaliknya.",
    ),
    data: t(
      "Monthly GMV and gross profit for seven categories, July 2024 to June 2026, 168 rows. No margin column, operating costs, prices, or promotions.",
      "GMV dan laba kotor bulanan tujuh kategori, Juli 2024 sampai Juni 2026, 168 baris. Tanpa kolom margin, biaya operasi, harga, atau promosi.",
    ),
    decisions: [
      t("Margin is SUM(profit)/SUM(GMV), written on screen. The unweighted average many BI tools default to gives −1.98 points instead.", "Margin dihitung SUM(laba)/SUM(GMV) dan ditulis di layar. Rata-rata tak tertimbang yang jadi bawaan banyak alat BI memberi −1,98 poin."),
      t("The rise is broken into a mix effect and a rate effect, rather than showing each category's ending margin alone.", "Kenaikan diurai menjadi efek bauran dan efek margin, tidak hanya menampilkan margin akhir tiap kategori."),
      t("The 24-month window is written in the title with a curve for every window length, because a 12-month window gives −0.25 points.", "Jendela 24 bulan ditulis di judul beserta kurva untuk setiap panjang jendela, karena jendela 12 bulan memberi −0,25 poin."),
    ],
    findings: [
      t("All seven category margins fell, by −1.13 to −3.00 points.", "Margin ketujuh kategori turun, antara −1,13 dan −3,00 poin."),
      t("The +4.84-point rise is +7.02 points of mix effect, −1.84 of rate effect, and −0.34 of interaction. The rate effect is negative at every window length.", "Kenaikan +4,84 poin terdiri dari efek bauran +7,02 poin, efek margin −1,84, dan interaksi −0,34. Efek margin negatif di setiap panjang jendela."),
      t("Combined margin peaked in November 2025 and the mix effect over the last six months is almost zero, so the source of the rise has run out.", "Margin gabungan memuncak pada November 2025 dan efek bauran enam bulan terakhir hampir nol, jadi sumber kenaikannya sudah habis."),
    ],
    recommendation: t(
      "Separate the two decisions attached to one figure. Postpone the incentive one meeting and judge it against the per-category breakdown, and calculate the service fee proposal per category before deciding.",
      "Pisahkan dua keputusan yang menempel pada satu angka. Tunda insentif satu rapat dan nilai terhadap pecahan per kategori, dan hitung usulan biaya layanan per kategori sebelum diputuskan.",
    ),
    limits: t(
      "The breakdown is arithmetic on the data: it shows where the rise comes from, not why the mix shifted or whether the margin decline was deliberate. There is no claim about net profit.",
      "Penguraian ini aritmetika atas data: ia menunjukkan dari mana kenaikan berasal, bukan kenapa bauran bergeser atau apakah penurunan margin disengaja. Tidak ada klaim tentang laba bersih.",
    ),
    files: [
      { label: t("CASE 18 folder", "Folder CASE 18"), href: "https://drive.google.com/drive/folders/1D1KzbcM_rOj1ptBoQqHtrWSUsoYL9Y6z", note: folderNote("Power BI dashboard, design decisions, validation notes, and incentive memo", "dashboard Power BI, catatan keputusan desain, catatan validasi, dan memo penundaan insentif") },
    ],
    fullCase: "margin-kategori",
  },
  {
    slug: "case-19",
    code: "CASE 19",
    name: t("Benchmarking 24 Branches", "Acuan Penilaian 24 Cabang"),
    industry: t("Distribution", "Distribusi"),
    field: field.reporting,
    tools: ["Power BI"],
    category: "data",
    title: t("The target-achievement winner ranks 17th of 24 in rupiah", "Juara pencapaian target berada di peringkat 17 dari 24 dalam rupiah"),
    sentence: t("Rereading 24 branches from the same zero before a Rp 6 billion bonus and a Rp 12 billion budget", "Membaca ulang 24 cabang dari nol yang sama sebelum bonus Rp 6 miliar dan anggaran Rp 12 miliar"),
    tags: [tag.powerbi, tag.viz, tag.kpi],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("acuan-cabang", "gambar-5.png"), label: t("Figure 5: the 24-branch table on the same zero", "Gambar 5: tabel 24 cabang pada nol yang sama") },
    summary: t(
      "An auto parts distributor rated 24 branches by percent of target to split a Rp 6 billion bonus and a Rp 12 billion marketing budget. Each bar was measured from the branch's own target, and the largest target is 46 times the smallest. I re-presented the same branches on references with the same zero for all.",
      "Sebuah distributor suku cadang menilai 24 cabang dari persen pencapaian target untuk membagi Rp 6 miliar bonus dan Rp 12 miliar anggaran pemasaran. Tiap batang diukur dari target cabangnya sendiri, dan target terbesar 46 kali target terkecil. Saya menyajikan ulang cabang yang sama pada acuan yang nolnya sama untuk semua.",
    ),
    data: t(
      "Monthly revenue and units for 24 branches over 36 months (864 rows), plus a reference file with targets, prior-year revenue, and regional market benchmarks.",
      "Pendapatan dan unit bulanan 24 cabang selama 36 bulan (864 baris), ditambah berkas acuan berisi target, pendapatan tahun sebelumnya, dan tolok ukur pasar per wilayah.",
    ),
    decisions: [
      t("The main panel is framed in added rupiah against last year, the only reference where all 24 bars start from the same zero.", "Panel utama dibingkai dengan tambahan rupiah terhadap tahun lalu, satu-satunya acuan yang ke-24 batangnya mulai dari nol yang sama."),
      t("Agreement is shown as a 24 x 5 matrix cut at each reference's median, instead of five bar charts in five different orders.", "Kesepakatan ditampilkan sebagai matriks 24 x 5 dengan batas median tiap acuan, bukan lima grafik batang dengan lima urutan berbeda."),
      t("All panels share one row order and have no reference picker or region filter, so no setting silently changes the winner.", "Semua panel memakai satu urutan baris tanpa pemilih acuan atau filter wilayah, supaya tidak ada setelan yang diam-diam mengganti juara."),
    ],
    findings: [
      t("Ten of 24 branches agree on all five references; the debate is about 14.", "Sepuluh dari 24 cabang sepakat pada kelima acuan; perdebatannya menyangkut 14 cabang."),
      t("21 of 24 targets are last year × 1.15, so the two lists only differ because of three hand-set targets.", "21 dari 24 target adalah tahun lalu × 1,15, jadi kedua daftar hanya berbeda karena tiga target yang disetel tangan."),
      t("Tasikmalaya leads on target but ranks 17th in added rupiah, while four of the six biggest contributors read as missing their targets.", "Tasikmalaya memimpin pencapaian target tetapi peringkat 17 dalam tambahan rupiah, sementara empat dari enam penambah terbesar terbaca meleset dari target."),
    ],
    recommendation: t(
      "Split the bonus by target achievement with the target method written on the panel, and decide openly how the three hand-set targets are paid. Read the marketing budget from the revenue index against FY24 together with added rupiah, not from annual growth.",
      "Bagi bonus menurut pencapaian target dengan cara penyusunan target tertulis di panelnya, dan putuskan secara terbuka cara membayar tiga target yang disetel tangan. Baca anggaran pemasaran dari indeks pendapatan terhadap FY24 bersama tambahan rupiah, bukan dari pertumbuhan tahunan.",
    ),
    limits: t(
      "The data holds no costs, so there's no claim about which branch is most profitable. Targets are a planning decision; this work shows their effect, not whether they are fair.",
      "Data tidak memuat biaya, jadi tidak ada klaim tentang cabang yang paling menguntungkan. Target adalah keputusan perencanaan; pekerjaan ini menunjukkan akibatnya, bukan kewajarannya.",
    ),
    files: [
      { label: t("CASE 19 folder", "Folder CASE 19"), href: "https://drive.google.com/drive/folders/1E1jwTAQzrSVMTtqfoxx9UFmrMG0B3HCD", note: folderNote("Power BI dashboard, reference rationale, and recommendation memo", "dashboard Power BI, dokumen alasan acuan, dan memo rekomendasi") },
    ],
    fullCase: "acuan-cabang",
  },
  {
    slug: "case-20",
    code: "CASE 20",
    name: t("Two-System Marketing Channel Attribution", "Atribusi Kanal Pemasaran Dua Sistem"),
    industry: t("Software (B2B)", "Perangkat lunak (B2B)"),
    field: field.marketing,
    tools: ["Power BI"],
    category: "data",
    title: t("The number two channel by volume is at the bottom in efficiency", "Kanal nomor dua dalam volume berada di dasar dalam efisiensi"),
    sentence: t("Re-presenting six acquisition channels for an Rp 14.4 billion budget meeting", "Menyajikan ulang enam kanal akuisisi untuk rapat anggaran Rp 14,4 miliar"),
    tags: [tag.powerbi, tag.viz, tag.marketing],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("dua-sistem", "gambar-3.png"), label: t("Figure 3: revenue per session by channel, two ways", "Gambar 3: pendapatan per sesi per kanal, dua cara hitung") },
    summary: t(
      "A software company was about to reallocate its marketing budget, and the meeting opened with a dual-axis chart showing traffic and revenue rising together. Over 24 months, organic sessions rose 2.4× while deal value rose 1.3×, and the ad channel with the second-most visits produced the lowest value per visit. I re-presented the same figures with a frame that separates the three recording systems.",
      "Sebuah perusahaan perangkat lunak hendak membagi ulang anggaran pemasarannya, dan rapatnya dibuka dengan grafik bersumbu ganda yang memperlihatkan trafik dan pendapatan naik bersama. Selama 24 bulan, sesi organik naik 2,4× sementara nilai deal naik 1,3×, dan kanal iklan dengan kunjungan terbanyak kedua menghasilkan nilai per kunjungan terendah. Saya menyajikan ulang angka yang sama dengan bingkai yang memisahkan tiga sistem pencatatnya.",
    ),
    data: t(
      "One table of 24 months × 6 channels (1,034,769 sessions, 907 deals worth Rp 12,173 million, Rp 1,188 million of ad spend) and its three raw exports from analytics, the ad platform, and the CRM.",
      "Satu tabel 24 bulan × 6 kanal (1.034.769 sesi, 907 deal senilai Rp 12.173 juta, belanja iklan Rp 1.188 juta) dan tiga ekspor mentahnya dari analytics, platform iklan, dan CRM.",
    ),
    decisions: [
      t("Traffic and revenue are two stacked panels, each from zero. The dual-axis chart was rejected because right-axis limits of Rp 500, 900, and 1,400 million give 2, 7, and 0 crossings from the same figures.", "Trafik dan pendapatan dibuat dua panel bertumpuk, masing-masing dari nol. Grafik dua sumbu ditolak karena batas kanan Rp 500, 900, dan 1.400 juta memberi 2, 7, dan 0 persilangan dari angka yang sama."),
      t("Untraceable revenue is a named, hatched slice, so a filtered stack can't look whole while Rp 2,794 million goes missing.", "Pendapatan tak terlacak ditampilkan sebagai potongan bernama dan diarsir, supaya tumpukan tersaring tidak tampak utuh sementara Rp 2.794 juta hilang."),
      t("Cost per acquisition shows two ratios with the denominator in the label, because swapping it reverses the order of the two paid channels.", "Biaya per akuisisi menampilkan dua rasio dengan penyebut di label, karena menukar penyebut membalik urutan dua kanal berbayar."),
    ],
    findings: [
      t("Social Ads ranks 2nd in sessions but produces Rp 5,868 per session; Partner Referral produces Rp 28,339, 4.8× higher, on any calculation.", "Iklan Media Sosial peringkat 2 dalam sesi tetapi menghasilkan Rp 5.868 per sesi; Rujukan Mitra Rp 28.339, 4,8× lebih tinggi, pada cara hitung mana pun."),
      t("The April 2025 campaign reads as a failure by signing month and a success by first-visit month: 52 deals against 38 and 39 in the months beside it.", "Kampanye April 2025 terbaca gagal menurut bulan tanda tangan dan berhasil menurut bulan kunjungan pertama: 52 deal dibanding 38 dan 39 di bulan sebelahnya."),
      t("202 of 907 deals (Rp 2,794 million, 23.0% of value) have no source in the CRM.", "202 dari 907 deal (Rp 2.794 juta, 23,0% nilai) tidak punya sumber di CRM."),
    ],
    recommendation: t(
      "Start cuts with Social Ads spend, gradually, reassessed after at least one quarter because the visit-to-contract lag has a median of 75 days. Paid ad spend is only Rp 542 million a year against a Rp 2,880 million cut, so people and time costs per channel need splitting before the rest is allocated.",
      "Mulai pemotongan dari belanja Iklan Media Sosial secara bertahap, dinilai ulang paling cepat satu kuartal kemudian karena jeda kunjungan ke kontrak bermedian 75 hari. Belanja iklan berbayar hanya Rp 542 juta setahun dibanding pemotongan Rp 2.880 juta, jadi biaya orang dan waktu per kanal perlu dipecah sebelum sisanya dibagi.",
    ),
    limits: t(
      "There is no cause-and-effect claim: the April cohort is one event without a controlled comparison. Revenue per session is past efficiency, not a promise for extra spend, and the attribution model is taken as given.",
      "Tidak ada klaim sebab-akibat: kohort April adalah satu peristiwa tanpa pembanding terkendali. Pendapatan per sesi adalah efisiensi masa lalu, bukan janji untuk belanja tambahan, dan model penelusuran diterima apa adanya.",
    ),
    files: [
      { label: t("CASE 20 folder", "Folder CASE 20"), href: "https://drive.google.com/drive/folders/18u1VnHJBnp1iKX6jpdPlNmPTnFRk7z-E", note: folderNote("Power BI dashboard, conclusion sentences, form rationale, and recommendation memo", "dashboard Power BI, kalimat kesimpulan, dokumen alasan bentuk, dan memo rekomendasi") },
    ],
    fullCase: "dua-sistem",
  },
  {
    slug: "case-21",
    code: "CASE 21",
    name: t("Fifth Warehouse Capacity Projection", "Proyeksi Kapasitas Gudang Kelima"),
    industry: t("Cold-chain logistics", "Logistik rantai dingin"),
    field: field.supplyChain,
    tools: ["Power BI"],
    category: "data",
    title: t("The meeting chart said the warehouse fills in April 2027, but that date is still a guess", "Grafik rapat bilang gudang penuh April 2027, padahal tanggal itu masih tebakan"),
    sentence: t("Separating fact from forecast before a Rp 48 billion warehouse decision", "Memisahkan fakta dari tebakan sebelum keputusan gudang Rp 48 miliar"),
    tags: [tag.powerbi, tag.viz, tag.forecasting],
    info: [t("Power BI", "Power BI"), ...vizMeta],
    figure: { src: img("garis-belum-terjadi", "gambar-2.png"), label: t("Figure 2: the same chart after redrawing, with three forecast versions", "Gambar 2: grafik yang sama setelah digambar ulang, dengan tiga versi tebakan") },
    summary: t(
      "A cold-storage company was about to build a new Rp 48 billion warehouse. The meeting chart showed the warehouse full in April 2027, though real data only ran to June 2026 and the rest was a guess. I redrew the chart without changing a figure, so the committee can see what is fact and what is still a guess.",
      "Sebuah perusahaan gudang berpendingin hendak membangun gudang baru seharga Rp 48 miliar. Grafik di rapat menunjukkan gudang penuh April 2027, padahal data asli hanya sampai Juni 2026 dan sisanya tebakan. Saya menggambar ulang grafiknya tanpa mengubah angka, supaya komite bisa melihat mana yang fakta dan mana yang tebakan.",
    ),
    data: t(
      "42 months of warehouse orders (30 real, 12 guessed in three versions), capacity, last year's forecast, and the board target. Simulated data.",
      "42 bulan pesanan gudang (30 asli, 12 tebakan dalam tiga versi), kapasitas, ramalan tahun lalu, dan target direksi. Data simulasi.",
    ),
    decisions: [
      t("A dated boundary line at June 2026 and dashed guess lines, because dashes alone disappear when the chart is shrunk.", "Garis batas bertanggal di Juni 2026 dan garis tebakan putus-putus, karena garis putus-putus saja hilang kalau grafiknya diperkecil."),
      t("All three guess versions are shown, because the meeting chart only used the medium one.", "Ketiga versi tebakan ditampilkan, karena grafik rapat hanya memakai versi sedang."),
      t("Existing capacity is separated from extra racks that aren't installed yet.", "Kapasitas yang sudah ada dipisahkan dari rak tambahan yang belum dipasang."),
    ],
    findings: [
      t("The warehouse fills in February 2027 (fast), April 2027 (medium), or isn't full by June 2027 (slow).", "Gudang penuh Februari 2027 (versi cepat), April 2027 (versi sedang), atau belum penuh sampai Juni 2027 (versi pelan)."),
      t("If the extra racks are cancelled, even the slow version fills in June 2027.", "Kalau rak tambahan batal, versi pelan pun penuh di Juni 2027."),
      t("Last year's similar forecast was too high by 17.1% on average, more than the gap between the medium and slow versions.", "Ramalan sejenis tahun lalu terlalu tinggi rata-rata 17,1%, lebih besar dari jarak versi sedang dan versi pelan."),
    ],
    recommendation: t(
      "The committee no longer only chooses between signing and postponing. A third option: start work that is cheap to cancel, such as permits and site selection, while waiting three more months of data to see which version is happening.",
      "Komite tidak lagi hanya memilih tanda tangan atau tunda. Ada pilihan ketiga: mulai pekerjaan yang murah kalau dibatalkan, seperti izin dan pemilihan lahan, sambil menunggu tiga bulan data untuk melihat versi mana yang terjadi.",
    ),
    limits: t(
      "This work doesn't judge which guess is most likely; the gap between versions is not a statistical range. The emergency rental figures stop at June 2027 because the data does.",
      "Pekerjaan ini tidak menilai versi tebakan mana yang paling mungkin; jarak antarversi bukan rentang statistik. Hitungan sewa darurat berhenti di Juni 2027 karena datanya berhenti di situ.",
    ),
    files: [
      { label: t("CASE 21 folder", "Folder CASE 21"), href: "https://drive.google.com/drive/folders/1PvX-B1ly-Fcafq6_kds5Z9JRw26iFyu8", note: folderNote("Power BI dashboard, design decisions, validation notes, and investment committee memo", "dashboard Power BI, catatan keputusan desain, catatan validasi, dan memo komite investasi") },
    ],
    fullCase: "garis-belum-terjadi",
  },
  /* ---------------- Q-Commerce & DataCo ---------------- */
  {
    slug: "q-commerce",
    fullCase: "q-commerce",
    code: "Q-Commerce",
    name: t("Analyzing and Planning Stock for Q-Commerce", "Analisis dan Perencanaan Stok Q-Commerce"),
    industry: t("Quick commerce", "Quick commerce"),
    field: field.supplyChain,
    tools: ["Python", "Canva"],
    category: "data",
    title: t("SARIMA scored as most accurate, but missed by 14% to 80% when tested on a full month", "SARIMA tercatat paling akurat, tapi meleset 14% sampai 80% saat diuji satu bulan penuh"),
    sentence: t("Weekly demand forecast for August 2022 across five hubs, with stock targets for fresh products", "Forecast permintaan mingguan Agustus 2022 untuk lima hub dan target stok produk segar"),
    tags: [tag.python, tag.forecasting, tag.inventory],
    info: [t("Python, Google Colab, Canva", "Python, Google Colab, Canva"), t("Solo (RevoU group Team 6)", "Dikerjakan sendiri (kelompok RevoU Team 6)"), t("February to May 2025, redone October 2026", "Februari sampai Mei 2025, dikerjakan ulang Oktober 2026"), t("Forecasting, Inventory", "Forecasting, Inventory")],
    figure: { src: img("q-commerce", "grafik-forecast-en.png"), label: t("Weekly Shipped Qty and the August forecast (Figure 4 in the full case study)", "Grafik Shipped Qty mingguan dan forecast Agustus, Gambar 4 di studi kasus lengkap") },
    summary: t(
      "The operations team for five Q-Commerce hubs needed weekly demand figures for August 2022 to prepare stock. The first version picked SARIMA with a 5.04% MAPE and concluded demand would peak in week three. On re-checking, that \"August\" turned out to be shifted by one month, and the correct test picked seasonal naive. The August forecast is 394,242 units, 40% of it in the last week.",
      "Tim operasional lima hub Q-Commerce butuh angka permintaan mingguan Agustus 2022 untuk menyiapkan stok. Versi pertama memilih SARIMA dengan MAPE 5,04% dan menyimpulkan puncak di minggu ketiga. Setelah diperiksa ulang, angka \"Agustus\" itu ternyata bergeser satu bulan, dan uji yang benar memilih seasonal naive. Forecast Agustus 394.242 unit, 40% di antaranya di minggu terakhir.",
    ),
    data: t(
      "1,400 shipment rows, exactly 7 months × 10 categories × 4 weeks × 5 hubs, January to July 2022. No missing values or duplicates. Every month always splits into W1 to W4 at 15%, 20%, 25%, and 40%.",
      "1.400 baris pengiriman, tepat 7 bulan x 10 kategori x 4 minggu x 5 hub, Januari sampai Juli 2022. Tidak ada missing value atau duplikat. Setiap bulan selalu terbagi ke W1 sampai W4 dengan porsi 15%, 20%, 25%, dan 40%.",
    ),
    decisions: [
      t("The model was retrained through July W4 before forecasting August. The old model stopped at 1 July, so its four forecast steps landed on July W2 to August W1.", "Model dilatih ulang sampai Juli W4 sebelum meramal Agustus. Model lama berhenti di 1 Juli, jadi empat langkah ramalannya jatuh di Juli W2 sampai Agustus W1."),
      t("The three-week test was replaced by a full-month backtest (June and July) at total level, per hub, and across 50 hub × category series.", "Uji tiga minggu diganti backtest satu bulan penuh (Juni dan Juli) di level total, per hub, dan 50 deret hub x kategori."),
      t("Stock targets are detailed for Fruit & Vegetables and Dairy, which hold 47.2% of volume and spoil fastest. The other eight categories are forecast per hub only.", "Target stok dirinci untuk Sayur & Buah dan Susu, yang memegang 47,2% volume dan paling cepat rusak. Delapan kategori lain cukup diramal per hub."),
    ],
    findings: [
      t("Seasonal naive is most accurate at hub × category level (MAPE 9.2%). SARIMA missed by 80.1% in June and 14.0% in July because it extended the February–April surge.", "Seasonal naive paling akurat di level hub x kategori (MAPE 9,2%). SARIMA meleset 80,1% di Juni dan 14,0% di Juli karena memperpanjang lonjakan Februari sampai April."),
      t("Volume rose to the Ramadan peak in April, fell 20.8% in May, then rose only 8.4% and 2.8% in June and July.", "Volume naik sampai puncak Ramadan di April, turun 20,8% di Mei, lalu hanya naik 8,4% dan 2,8% di Juni dan Juli."),
      t("Dairy rose two months in a row, so its buffer is 12.6% of forecast, thicker than Fruit & Vegetables (8.4%).", "Susu naik dua bulan berturut-turut, jadi buffernya 12,6% dari forecast, lebih tebal dari Sayur & Buah (8,4%)."),
    ],
    recommendation: t(
      "The W4 order covers 10 days, 22 to 31 August. Fruit & Vegetables ship two to three times a week against the stock target. Once August W1 is done, divide the W1 figure by 0.15 to estimate the month's total and correct the W2–W4 orders.",
      "Pesanan W4 menutup 10 hari, 22 sampai 31 Agustus. Sayur & Buah dikirim dua sampai tiga kali per minggu sesuai target stok. Setelah W1 Agustus selesai, angka W1 dibagi 0,15 untuk memperkirakan total bulan dan mengoreksi pesanan W2 sampai W4.",
    ),
    limits: t(
      "Only seven months of history with two test months. The data holds shipped goods only, with no closing stock, spoilage, or lead time, so safety stock assumes a one-week lead time.",
      "Histori hanya tujuh bulan dengan dua bulan uji. Data berisi barang terkirim saja, tanpa stok akhir, barang rusak, atau lead time, jadi safety stock memakai asumsi lead time satu minggu.",
    ),
    files: [
      {
        label: t("Stock Planning Q-Commerce folder", "Folder Stock Planning Q-Commerce"),
        href: "https://drive.google.com/drive/folders/1jk8wOdxjqNUFT7m-CwR94zbNxKYuf3Tq",
        note: folderNote("Colab notebook, decision memo, and forecast results", "notebook Colab, memo keputusan, dan hasil forecast"),
      },
      { label: t("Presentation slides (PDF)", "Slide presentasi (PDF)"), href: "/files/q-commerce-slides.pdf" },
    ],
  },
  {
    slug: "dataco",
    fullCase: "dataco",
    code: "DataCo",
    name: t("Late Delivery Analysis", "Analisis Keterlambatan Pengiriman"),
    industry: t("Sporting goods e-commerce", "E-commerce perlengkapan olahraga"),
    field: field.supplyChain,
    tools: ["Python"],
    category: "data",
    title: t("First Class promises 1 day, and 100% of its orders arrive on day 2", "First Class dijanjikan 1 hari dan 100% pesanannya tiba di hari ke-2"),
    sentence: t(
      "Re-cleaning a final-project dataset and finding why 57% of e-commerce retail orders arrive late",
      "Cleaning ulang dataset final project dan mencari penyebab 57% pesanan ritel e-commerce terlambat",
    ),
    tags: [tag.python, tag.cleaning, tag.stats, tag.supplyChain],
    info: [t("Python (pandas, SciPy), Google Colab", "Python (pandas, SciPy), Google Colab"), t("Solo", "Dikerjakan sendiri"), t("February to May 2025, redone October 2026", "Februari sampai Mei 2025, dikerjakan ulang Oktober 2026"), t("Data Cleaning, Supply Chain", "Data Cleaning, Supply Chain")],
    figure: { src: img("dataco", "grafik-mode-en.png"), label: t("Actual shipping days by mode vs the promise (Figure 1 in the full case study)", "Sebaran hari kirim aktual per mode dan janjinya, Gambar 1 di studi kasus lengkap") },
    summary: t(
      "I reopened my RevoU final-project dataset without a brief. The first version concluded that the 54.83% late rate came from region, product, and stockouts. After cleaning, the real late rate is 57.3% per order and is almost entirely decided by shipping mode. Region and product have no effect, and the data doesn't record stockouts.",
      "Dataset final project RevoU saya dibuka ulang tanpa brief. Versi pertama menyimpulkan keterlambatan 54,83% berasal dari region, produk, dan stok habis. Setelah cleaning, keterlambatan sebenarnya 57,3% per pesanan dan hampir seluruhnya ditentukan mode kirim. Region dan produk tidak berpengaruh, dan data tidak mencatat stok habis.",
    ),
    data: t(
      "180,519 items from 65,752 orders at a sporting-goods e-commerce retailer, 2015 to 2018. A 14-step cleaning process was logged with its impact, including separating 7,754 canceled items recorded as on time and rolling items up into 62,897 orders.",
      "180.519 item dari 65.752 pesanan ritel e-commerce perlengkapan olahraga, 2015 sampai 2018. Cleaning 14 langkah dicatat beserta dampaknya, termasuk memisahkan 7.754 item batal yang tercatat tepat waktu dan merangkum item menjadi 62.897 pesanan.",
    ),
    decisions: [
      t("Lateness is counted per order. Per item, region looks significant (p < 0.001) because one order holds 2.75 items with the same status on average. Per order, p = 0.10.", "Keterlambatan dihitung per pesanan. Per item, region tampak signifikan (p < 0,001) karena satu pesanan berisi rata-rata 2,75 item berstatus sama. Per pesanan, p = 0,10."),
      t("Effect size is measured with Cramér's V, because a non-significant p doesn't prove the effect is zero.", "Besar efek diukur dengan Cramér's V, karena p yang tidak signifikan belum membuktikan efeknya nol."),
    ],
    findings: [
      t("First Class always arrives on day 2. Second Class is as slow as Standard (2 to 6 days) but is promised 2 days, so 80% are late.", "First Class selalu tiba di hari ke-2. Second Class sama lambatnya dengan Standard (2 sampai 6 hari) tetapi dijanjikan 2 hari, sehingga 80% terlambat."),
      t("Same Day ships exactly 12 hours after the order, so orders placed from 12:00 onward are always recorded as late.", "Same Day dikirim tepat 12 jam setelah order, jadi order dari pukul 12.00 ke atas selalu tercatat terlambat."),
      t("Cramér's V is 0.48 for shipping mode and 0.02 for region. Late express-service orders are worth a third of sales.", "Cramér's V mode kirim 0,48, region 0,02. Pesanan layanan cepat yang terlambat bernilai sepertiga penjualan."),
    ],
    recommendation: t(
      "Test a 2-day First Class promise while watching the First Class order share, give Same Day a 12:00 cut-off, then speed up Second Class or align its promise with Standard. Lateness drops to between 39.4% and 23.8%.",
      "Uji janji First Class 2 hari sambil memantau porsi order First Class, beri Same Day cut-off pukul 12.00, lalu percepat Second Class atau samakan janjinya dengan Standard. Keterlambatan turun ke 39,4% sampai 23,8%.",
    ),
    limits: t(
      "The data is almost certainly simulated: shipping days spread exactly 20% per day and every fraud case uses transfer. Without shipping costs and carriers, the cost of each scenario can't be calculated.",
      "Data hampir pasti hasil simulasi: hari kirim tersebar tepat 20% per hari dan semua fraud memakai transfer. Tanpa ongkos kirim dan carrier, biaya tiap skenario tidak bisa dihitung.",
    ),
    files: [
      {
        label: t("Retail E-Commerce folder", "Folder Retail E-Commerce"),
        href: "https://drive.google.com/drive/folders/1duVt4871pYcAj2Dt2-O6mPjqh1F3nz2h",
        note: folderNote("Colab notebook, decision memo, cleaning log, and clean data", "notebook Colab, memo keputusan, log cleaning, dan data bersih"),
      },
    ],
  },

  /* ---------------- Business & System Analyst ---------------- */
  {
    slug: "asset-management-system",
    code: "Thesis",
    name: t("Asset Management Information System", "Sistem Informasi Manajemen Aset"),
    industry: t("Higher education", "Pendidikan tinggi"),
    field: field.asset,
    tools: ["Laravel"],
    category: "bsa",
    title: t(
      "Asset proposals moved from Excel files on OneDrive into one web system, accepted at 88.35% in UAT",
      "Usulan aset pindah dari file Excel di OneDrive ke satu sistem web, diterima 88,35% pada UAT",
    ),
    sentence: t(
      "Thesis (2024): a web system for Telkom University's Faculty of Industrial Engineering, from asset investment proposals to asset monitoring",
      "Skripsi (2024): sistem web untuk Fakultas Rekayasa Industri Telkom University, dari usulan investasi aset sampai pemantauan aset",
    ),
    tags: [tag.systems, t("RAD", "RAD"), t("UML / ERD", "UML / ERD"), t("UAT", "UAT")],
    info: [
      t("Laravel, RAD, UML, ERD, UAT", "Laravel, RAD, UML, ERD, UAT"),
      t("Thesis, 2024", "Skripsi, 2024"),
      t("Solo, with two advisors", "Dikerjakan sendiri, dengan dua pembimbing"),
      t("Telkom University", "Telkom University"),
    ],
    figure: {
      src: "/images/projects/asset-management-login.png",
      label: t("Login page of the system. Other screens and the diagrams are not published.", "Halaman login sistem. Layar lain dan diagramnya tidak dipublikasikan."),
    },
    summary: t(
      "Each unit in the Faculty of Industrial Engineering (FRI) planned its asset investments in an Excel file on OneDrive. Proposals changed after the deadline, data sat in separate files, and the Vice Dean for Finance and Resources could not see asset status in real time. I gathered requirements from the people who run the process, designed a web system with access rights per role using Rapid Application Development, and revised it over two iterations of user feedback. It scored 88.35% in user acceptance testing, and every black-box test scenario passed.",
      "Setiap unit di Fakultas Rekayasa Industri (FRI) menyusun rencana investasi aset dalam file Excel di OneDrive. Usulan berubah di luar jadwal, data tersebar di banyak file, dan Wakil Dekan Bidang Keuangan dan Sumber Daya tidak bisa memantau kondisi aset secara real-time. Saya menggali kebutuhan dari pihak yang menjalankan prosesnya, merancang sistem web dengan hak akses per peran memakai Rapid Application Development, lalu merevisinya dalam dua iterasi umpan balik pengguna. Sistem mendapat skor 88,35% pada user acceptance testing, dan semua skenario black-box testing lolos.",
    ),
    data: t(
      "Structured interviews with the Vice Dean for Finance and Resources (Wakil Dekan 2) and the Head of Finance and Resources Affairs. Official asset records as secondary data, for example the LAA office: 14 asset types, 37 units, each with a specification and an asset code.",
      "Wawancara terstruktur dengan Wakil Dekan Bidang Keuangan dan Sumber Daya (Wakil Dekan 2) dan Kepala Urusan Keuangan dan Sumber Daya. Catatan aset resmi sebagai data sekunder, misalnya kantor LAA: 14 jenis aset, 37 unit, masing-masing dengan spesifikasi dan kode aset.",
    ),
    decisions: [
      t(
        "Rapid Application Development instead of one fixed plan: users tried working versions early, and their feedback changed the access rules and added a feature before release.",
        "Rapid Application Development, bukan satu rencana kaku: pengguna mencoba versi yang sudah jalan sejak awal, dan umpan balik mereka mengubah aturan akses serta menambah fitur sebelum rilis.",
      ),
      t(
        "Access rights per role. The Vice Dean sees every menu, including approval, asset categories, and user management. Finance and Resources handles asset realization and asset data. Unit and study program heads submit proposals and follow their realization.",
        "Hak akses per peran. Wakil Dekan melihat semua menu, termasuk persetujuan, kategori aset, dan manajemen pengguna. Keuangan dan Sumber Daya mengelola realisasi aset dan data aset. Kepala urusan dan kepala program studi mengajukan usulan dan memantau realisasinya.",
      ),
      t(
        "The proposed process follows the faculty's real flow: units submit, the Vice Dean reviews and approves, central logistics checks the budget, negotiates with vendors, and buys, then Finance and Resources inspects each asset before it is distributed and recorded.",
        "Proses usulan mengikuti alur nyata fakultas: unit mengajukan, Wakil Dekan mengkaji dan menyetujui, logistik pusat mengecek anggaran, bernegosiasi dengan vendor, dan membeli, lalu Keuangan dan Sumber Daya memeriksa setiap aset sebelum didistribusikan dan dicatat.",
      ),
      t(
        "Modeled before coding: an ERD for the data, use case, activity, and sequence diagrams for each role, and a mockup of every page.",
        "Dimodelkan sebelum coding: ERD untuk data, diagram use case, activity, dan sequence untuk setiap peran, serta mockup setiap halaman.",
      ),
      t("Web-based, so every role opens it in a browser without installing anything.", "Berbasis web, jadi setiap peran cukup membukanya di browser tanpa instalasi."),
    ],
    findings: [
      t("Eight modules in one web system, replacing the separate Excel files.", "Delapan modul dalam satu sistem web, menggantikan file Excel yang terpisah-pisah."),
      t("88.35% in user acceptance testing across five ISO 9126 aspects, in the “Very good” band.", "88,35% pada user acceptance testing di lima aspek ISO 9126, masuk kategori “Sangat Baik”."),
      t("All black-box scenarios passed, from the login page to report download.", "Semua skenario black-box testing lolos, dari halaman login sampai unduh laporan."),
      t(
        "The system calculates investment costs and keeps asset data in one place, the two advantages over the manual process that the thesis names.",
        "Sistem menghitung biaya investasi dan menyimpan data aset di satu tempat, dua kelebihan dibanding proses manual yang disebut di skripsi.",
      ),
    ],
    recommendation: t("The thesis names the gaps. My order for the next release, with the reason for each:", "Skripsi menyebut celahnya. Urutan saya untuk rilis berikutnya, beserta alasannya:"),
    limits: t(
      "UAT had 3 respondents, so 88.35% shows that these users accepted the system, not how the whole faculty would rate it. Time and errors were not measured before and after, so the efficiency gain is what users reported, not a measured figure. The scope runs from investment proposal to asset monitoring; maintenance and disposal are outside it. The system was built and tested for one faculty.",
      "UAT diisi 3 responden, jadi 88,35% menunjukkan pengguna ini menerima sistemnya, bukan penilaian seluruh fakultas. Waktu dan kesalahan tidak diukur sebelum dan sesudah, jadi efisiensi yang naik adalah yang dirasakan pengguna, bukan angka terukur. Cakupannya dari usulan investasi sampai pemantauan aset; pemeliharaan dan penghapusan aset di luar cakupan. Sistem dibangun dan diuji untuk satu fakultas.",
    ),
    files: [],
    bsa: {
      asIs: t(
        "Every unit filled in its asset investment proposal in an Excel template on Microsoft OneDrive by a set deadline. Proposals were often changed after the deadline, so the data stopped being accurate and was hard for the Vice Dean to follow. With no integrated system, asset condition could not be tracked in real time, data was spread across files, and older records were hard to find. Manual work also left room for mistakes, such as forgetting to save data or losing information.",
        "Setiap unit mengisi rencana usulan investasi aset di template Excel pada Microsoft OneDrive sesuai tenggat. Usulan sering berubah di luar jadwal, sehingga data tidak lagi akurat dan sulit dipantau Wakil Dekan. Tanpa sistem terintegrasi, kondisi aset tidak bisa dilacak secara real-time, data tersebar di banyak file, dan data lama sulit dicari. Pekerjaan manual juga rawan salah, misalnya lupa menyimpan data atau kehilangan informasi.",
      ),
      rootCauses: [
        t("No integrated system", "Tidak tersedia sistem yang terintegrasi"),
        t("Records kept by hand", "Pencatatan masih manual"),
        t("Data not centralized", "Data tidak terpusat"),
        t("Inaccurate data", "Data tidak akurat"),
        t("Asset status not visible in real time", "Data tidak teridentifikasi secara real-time"),
        t("Files saved in places people forget", "Lupa posisi penyimpanan data"),
      ],
      stakeholders: [
        {
          label: t("Vice Dean for Finance and Resources – problem owner", "Wakil Dekan Bidang Keuangan dan Sumber Daya – problem owner"),
          text: t(
            "Different access rights per user, password change, a view of all asset data, approval of investment proposals, management of asset categories and users, and downloadable reports on planned and realized investments.",
            "Hak akses berbeda per pengguna, ganti password, tampilan seluruh data aset, persetujuan usulan investasi, pengelolaan kategori aset dan pengguna, serta laporan rencana dan realisasi investasi yang bisa diunduh.",
          ),
        },
        {
          label: t("Finance and Resources – user", "Keuangan dan Sumber Daya – user"),
          text: t("Record asset realization and add assets, see approved proposals, and get accurate reports.", "Mencatat realisasi aset dan menambah aset, melihat usulan yang sudah disetujui, dan mendapat laporan yang akurat."),
        },
        {
          label: t("Unit heads and study program heads – user", "Kepala urusan dan kepala program studi – user"),
          text: t("Submit and manage investment proposals, report on them, and follow their realization.", "Mengajukan dan mengelola usulan investasi, melaporkannya, dan memantau realisasinya."),
        },
        {
          label: t("Faculty of Industrial Engineering – problem customer", "Fakultas Rekayasa Industri – problem customer"),
          text: t("Gets asset planning and monitoring that is structured and up to date.", "Mendapat perencanaan dan pemantauan aset yang terstruktur dan selalu terbaru."),
        },
      ],
      iterations: [
        {
          label: t(
            "Iteration 1: Finance and Resources could not see the initial proposals, but they review proposals in the meeting before the Vice Dean approves.",
            "Iterasi 1: Keuangan dan Sumber Daya tidak bisa melihat usulan awal, padahal mereka mengkaji usulan di rapat sebelum Wakil Dekan menyetujui.",
          ),
          text: t("Finance and Resources can now view and edit proposals after the meeting.", "Keuangan dan Sumber Daya kini bisa melihat dan mengedit usulan setelah rapat."),
        },
        {
          label: t(
            "Iteration 2: Finance and Resources could only view, add, and edit realizations, and needed the evidence behind past ones.",
            "Iterasi 2: Keuangan dan Sumber Daya hanya bisa melihat, menambah, dan mengedit realisasi, dan butuh bukti dari realisasi sebelumnya.",
          ),
          text: t("Added a realization history with photo evidence and the handover document (BAST).", "Ditambahkan riwayat realisasi aset dengan bukti foto dan dokumen BAST."),
        },
        {
          label: t("Other review notes", "Catatan review lainnya"),
          text: t(
            "Added report downloads, reworked the dashboard, and improved access to asset category and user management.",
            "Ditambahkan unduh laporan, tampilan dashboard diubah, dan akses ke manajemen kategori aset serta pengguna diperbaiki.",
          ),
        },
      ],
      modules: [
        t("Login with access rights per role, and password reset", "Login dengan hak akses per peran, dan reset password"),
        t("Dashboard with a summary and the main navigation", "Dashboard berisi ringkasan dan navigasi utama"),
        t("Asset investment proposals: submit, edit, approve", "Rencana usulan investasi aset: ajukan, edit, setujui"),
        t("Asset realization, with its history, photos, and BAST", "Realisasi aset, beserta riwayat, foto, dan BAST"),
        t("Asset data", "Data aset"),
        t("Reports: initial proposals, approved proposals, asset realization, and asset data, all downloadable", "Laporan: usulan awal, usulan disetujui, realisasi aset, dan data aset, semuanya bisa diunduh"),
        t("Asset categories", "Kategori aset"),
        t("User management", "Manajemen pengguna"),
      ],
      testing: t(
        "Black-box testing on every function, from the login page, authentication, and password reset to user management and report download: every scenario gave the expected result. User acceptance testing with a 4-point Likert questionnaire on five ISO 9126 aspects, answered by 3 users: the Vice Dean, the Head of Finance and Resources Affairs, and a finance staff member.",
        "Black-box testing untuk setiap fungsi, dari halaman login, autentikasi, dan reset password sampai manajemen pengguna dan unduh laporan: semua skenario memberi hasil yang diharapkan. User acceptance testing dengan kuesioner skala Likert 4 poin pada lima aspek ISO 9126, diisi 3 pengguna: Wakil Dekan, Kepala Urusan Keuangan dan Sumber Daya, dan staf keuangan.",
      ),
      acceptance: [
        { label: t("Functionality", "Functionality"), text: t("87.5%", "87,5%") },
        { label: t("Reliability", "Reliability"), text: t("87.5%", "87,5%") },
        { label: t("Usability", "Usability"), text: t("91.75%", "91,75%") },
        { label: t("Efficiency", "Efficiency"), text: t("91.75%", "91,75%") },
        { label: t("Portability", "Portability"), text: t("83.25%", "83,25%") },
        { label: t("**Average**", "**Rata-rata**"), text: t("**88.35%**", "**88,35%**") },
      ],
      roadmap: [
        {
          label: t("Asset repair history", "Riwayat perbaikan aset"),
          text: t(
            "The system follows an asset from proposal to realization and stops there. Repair records show which assets keep failing, and that is what the next investment proposal should be based on.",
            "Sistem mengikuti aset dari usulan sampai realisasi, lalu berhenti. Catatan perbaikan menunjukkan aset mana yang terus rusak, dan itulah dasar usulan investasi berikutnya.",
          ),
        },
        {
          label: t("Barcode label on every asset", "Label barcode di setiap aset"),
          text: t(
            "Asset codes already exist (PC01, PR01, and so on). Printing them as barcodes lets staff check rooms and labs by scanning instead of typing codes by hand.",
            "Kode aset sudah ada (PC01, PR01, dan seterusnya). Mencetaknya sebagai barcode membuat staf bisa mengecek ruangan dan lab dengan memindai, bukan mengetik kode satu per satu.",
          ),
        },
        {
          label: t("Testing on more browsers and devices", "Uji di lebih banyak browser dan perangkat"),
          text: t("Portability had the lowest UAT score (83.25%).", "Portability punya skor UAT terendah (83,25%)."),
        },
        {
          label: t("A cleaner, more intuitive interface", "Antarmuka yang lebih rapi dan intuitif"),
          text: t(
            "Asked for in the thesis, but usability already scored 91.75%, so it comes after the two data gaps above.",
            "Disarankan di skripsi, tetapi usability sudah 91,75%, jadi dikerjakan setelah dua celah data di atas.",
          ),
        },
      ],
    },
  },
];

/** Built-in projects, then the ones added from /admin (data/projects.json). */
export const projects: Project[] = [...builtInProjects, ...(addedProjects as Project[])];
export const builtInProjectSlugs = builtInProjects.map((p) => p.slug);

export const dataProjects = projects.filter((p) => p.category === "data");
export const bsaProjects = projects.filter((p) => p.category === "bsa");
export const featuredProjects = projects.filter((p) => p.featured);

/** What a project card needs. Client components get only this, so the rest of the content (Drive links
    included) stays out of the page payload. */
export type ProjectCardData = Pick<Project, "slug" | "code" | "name" | "industry" | "field" | "tools" | "featured" | "title" | "tags" | "figure">;
export const toCardData = ({ slug, code, name, industry, field, tools, featured, title, tags, figure }: Project): ProjectCardData =>
  ({ slug, code, name, industry, field, tools, featured, title, tags, figure: { src: figure.src, srcEn: figure.srcEn, label: figure.label } });

/** The chart for a language: the English version on English pages when there is one. */
export function figureSrc(p: Pick<Project, "figure">, lang: Lang) {
  return (lang === "en" && p.figure.srcEn) || p.figure.src;
}

/** "Industry, Field" for lists and cards; the field is left out when it is the same word as the industry. */
export function projectContext(p: Pick<Project, "industry" | "field">, lang: Lang) {
  const parts = [p.industry, p.field && p.field.en !== p.industry?.en ? p.field : undefined];
  return parts.filter((x): x is L => !!x).map((x) => x[lang]);
}

/** Display label: the project name when it has one, otherwise its code. */
export function projectLabel(p: Pick<Project, "name" | "code">, lang: Lang) {
  return p.name?.[lang] ?? p.code;
}

/** Google Drive folders (each case's working files) are hidden on the site for now. The links stay in the
    content, so setting this to true shows them again: the project's supporting files and the mentions in the
    full case studies. */
export const SHOW_DRIVE_FOLDERS = false;

const DRIVE_FOLDER = String.raw`https:\/\/drive\.google\.com\/drive\/folders\/[\w-]+`;
const isDriveFolder = (href?: string) => !!href && new RegExp(`^${DRIVE_FOLDER}`).test(href);

/** The supporting files a visitor sees: everything except Drive folders while they are hidden. */
export const publicFiles = (p: Project) => (SHOW_DRIVE_FOLDERS ? p.files : p.files.filter((f) => !isDriveFolder(f.href)));

/** Takes the Drive folder mentions out of a full case study while they are hidden, keeping the sentences
    whole: the "files: [folder]" part of the byline, "All are in the same [folder]." sentences, sentences that
    end in a bare folder URL, and "in the [folder]" phrases. */
export function hideDriveFolders(markdown: string) {
  if (SHOW_DRIVE_FOLDERS) return markdown;
  const rules: [string, string][] = [
    [String.raw`\s*,\s*(?:notebook,[^:\n]*|[^,:\n]*):\s*\[[^\]]*\]\(${DRIVE_FOLDER}\)`, ""],
    [String.raw`\s*(?:Semua ada di|All are in the same) \[[^\]]*\]\(${DRIVE_FOLDER}\)[^.\n]*\.`, ""],
    [String.raw`[ \t]*[^.\n]*?(?::|\bdi|\bat)\s+${DRIVE_FOLDER}\.?`, ""],
    [String.raw`\s(?:di|in the|in)\s\[[^\]]*\]\(${DRIVE_FOLDER}\)`, ""],
    [String.raw`\[[^\]]*\]\(${DRIVE_FOLDER}\)`, ""],
    [DRIVE_FOLDER, ""],
  ];
  return rules.reduce((text, [pattern, to]) => text.replace(new RegExp(pattern, "g"), to), markdown);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
