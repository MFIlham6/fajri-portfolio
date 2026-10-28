// Full case studies (layer 3). Card copy is taken verbatim from the owner's PROMPT_WEBSITE.md;
// full text lives in ./studi-kasus/<slug>/portofolio.md (Bahasa Indonesia) and portfolio.en.md (English).
// All datasets are simulated — each case's "Catatan data" says so and must stay.

export type CaseStudy = {
  no: number;
  slug: string;
  title: string;
  /** Title of the English version (portfolio.en.md). */
  titleEn: string;
  summary: string;
  tool: string;
  images: string[];
};

export const studiKasus: CaseStudy[] = [
  {
    no: 1,
    slug: "penjualan-ritel",
    title: "Total Penjualan Membengkak 23,6% Sebelum Satu Baris Rusak pun Disentuh",
    titleEn: "Total Sales Were Inflated by 23.6% Before a Single Broken Row Was Touched",
    summary:
      "Ekspor kasir ikut memuat transaksi tahun berikutnya sehingga total membengkak 23,6%; setelah dibersihkan, hanya dua cabang teratas yang cukup terpisah untuk jadi prioritas.",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png", "gambar-4-en.png", "gambar-4.png"],
  },
  {
    no: 2,
    slug: "retensi-karyawan",
    title: "Anggaran Retensi Hendak Dibagi ke Dua Departemen, Padahal Ketujuhnya Hanya Berselisih 7,3 Poin",
    titleEn: "The Retention Budget Was About to Be Split Between Two Departments, Yet All Seven Differ by Only 7.3 Points",
    summary:
      "Tingkat resign tujuh departemen hanya berselisih 7,3 poin, sedangkan jam kerja dan kepuasan memisahkan 7,6 dan 9,4 kali lebih tajam.",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png"],
  },
  {
    no: 3,
    slug: "ramalan-pendapatan",
    title: "Target Pendapatan Hendak Disusun dari Pertumbuhan 24,6%, Padahal Volume Awal Tahun Sudah Berhenti Bertambah",
    titleEn: "A Revenue Target Was About to Be Built on 24.6% Growth, Yet Early-Year Volume Had Already Stopped Rising",
    summary:
      "Pertumbuhan 24,6% seluruhnya datang dari jumlah transaksi, sementara nilai per transaksi turun 1,8%; ramalan disusun sebagai rentang Rp 7,6 sampai 9,7 miliar.",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png"],
  },
  {
    no: 4,
    slug: "ambang-persediaan",
    title: "Seluruh 361 Ambang Pemesanan Berada di Bawah Rumus Bakunya, dan Selisihnya Berasal dari Satu Tanda Operasi",
    titleEn: "All 361 Reorder Points Sit Below Their Standard Formula, and the Gap Comes From a Single Operator",
    summary:
      "Rumus sistem menambahkan dua hari pada waktu tunggu alih-alih mengalikannya dua, sehingga 75 SKU tidak pernah masuk daftar pesanan.",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png"],
  },
  {
    no: 5,
    slug: "efisiensi-iklan",
    title: "Efisiensi Antar-Platform Berselisih 2,4 Kali, tetapi Jenis Kampanye Memisahkan 4,0 Kali",
    titleEn: "Platform Efficiency Differs 2.4 Times, but Campaign Type Separates 4.0 Times",
    summary:
      "Facebook menghasilkan Rp 3,65 per rupiah belanja dan Instagram Rp 1,54, tetapi jenis kampanye memisahkan hasil lebih tajam (4,0 kali).",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png"],
  },
  {
    no: 6,
    slug: "retensi-kohort",
    title: "Retensi Kohort Baru Tampak Runtuh 50 Poin, dan Penurunan Itu Ternyata Artefak Jendela Pengamatan",
    titleEn: "New-Cohort Retention Appears to Collapse by 50 Points, and the Drop Turns Out to Be an Artifact of the Observation Window",
    summary:
      "Penurunan retensi 50,2 poin antar-kohort menyusut ke 0,8 poin begitu kohort dibandingkan pada jendela pengamatan yang setara.",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png", "gambar-4-en.png", "gambar-4.png"],
  },
  {
    no: 7,
    slug: "waktu-tunggu-klinik",
    title: "Peringkat Cabang Tidak Bisa Dibedakan dari Undian, dan Selisih Antar-Tenaga Medis Ternyata Kurang dari Separuh Angka Mentahnya",
    titleEn: "Branch Rankings Can't Be Told Apart From a Lottery, and the Gap Between Medical Staff Turns Out to Be Less Than Half Its Raw Figure",
    summary:
      "Uji pengacakan menunjukkan peringkat waktu tunggu cabang setara dengan undian; selisih antar-tenaga medis tinggal 6,4 menit setelah kelompok kecil dikeluarkan.",
    tool: "Spreadsheet",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png"],
  },
  {
    no: 8,
    slug: "segmentasi-rfm",
    title: "Segmentasi Pelanggan Marketplace: Anggaran Retensi Dibagi Rata ke 5.000 Orang, Padahal 8% Memegang 28,7% Nilai",
    titleEn: "Marketplace Customer Segmentation: The Retention Budget Is Split Evenly Across 5,000 People, Yet 8% Hold 28.7% of the Value",
    summary:
      "Segmentasi RFM atas 48.130 transaksi menunjukkan 400 pelanggan (8%) memegang 28,7% nilai, sehingga anggaran retensi dipusatkan ke dua program.",
    tool: "SQL",
    images: ["gambar-1-en.svg", "gambar-1.svg", "gambar-2-en.svg", "gambar-2.svg", "gambar-3-en.svg", "gambar-3.svg", "gambar-4-en.svg", "gambar-4.svg"],
  },
  {
    no: 9,
    slug: "analisis-keranjang",
    title: "Bundel Musiman E-commerce Kecantikan: Pasangan Berangka Tertinggi Hanya Ada di 146 dari 3.000 Keranjang",
    titleEn: "Seasonal Bundles for a Beauty E-commerce: The Top-Scoring Pair Appears in Only 146 of 3,000 Baskets",
    summary: "Pemilihan tiga bundel produk untuk kampanye Rp 80 juta",
    tool: "SQL",
    images: ["gambar-1-en.svg", "gambar-1.svg"],
  },
  {
    no: 10,
    slug: "analisis-funnel",
    title: "Verifikasi nomor telepon menahan 6.730 dari 14.874 pendaftar, dan selisih antarplatform terlalu kecil untuk memecah perbaikannya",
    titleEn: "Phone Verification Holds Back 6,730 of 14,874 Sign-ups, and the Gap Between Platforms Is Too Small to Split the Fix",
    summary: "Funnel onboarding lima tahap untuk menentukan perbaikan pertama",
    tool: "SQL",
    images: ["fig-1-en.svg", "fig-1.svg", "fig-2-en.svg", "fig-2.svg", "fig-3-en.svg", "fig-3.svg", "fig-4-en.svg", "fig-4.svg"],
  },
  {
    no: 11,
    slug: "deteksi-kecurangan",
    title: "Di balik 1.395 transaksi yang perlu ditinjau ada 56 orang, dan menurunkan ambang akan menyentuh 2.581 orang tanpa menambah satu pemeriksaan",
    titleEn: "Behind 1,395 Transactions That Need Review There Are Only 56 People, and Lowering the Threshold Would Touch 2,581 People Without Adding a Single Check",
    summary: "Antrean prioritas tinjauan untuk tim risiko dompet digital",
    tool: "SQL",
    images: ["fig-1-en.svg", "fig-1.svg", "fig-2-en.svg", "fig-2.svg", "fig-3-en.svg", "fig-3.svg", "fig-4-en.svg", "fig-4.svg"],
  },
  {
    no: 12,
    slug: "rantai-pasok",
    title: "Tiga jalur bervolume besar menyumbang 34,77% denda keterlambatan, dan tidak satu pun termasuk jalur dengan kinerja terendah",
    titleEn: "Three High-Volume Routes Account for 34.77% of Late-Delivery Penalties, and None of Them Is Among the Worst Performers",
    summary: "Mencari sumber denda keterlambatan di perusahaan pengiriman",
    tool: "SQL",
    images: ["fig-1-en.svg", "fig-1.svg", "fig-2-en.svg", "fig-2.svg", "fig-3-en.svg", "fig-3.svg", "fig-4-en.svg", "fig-4.svg", "fig-5-en.svg", "fig-5.svg"],
  },
  {
    no: 13,
    slug: "aktivitas-pengguna",
    title: "Kedatangan pengguna baru turun dari 340 ke 25 orang sebulan saat stickiness diam di 24%, dan itu menentukan percobaan mana yang bisa dijalankan lebih dulu",
    titleEn: "New-User Arrivals Fell From 340 to 25 a Month While Stickiness Sat at 24%, and That Decides Which Experiment Can Run First",
    summary: "Menentukan fitur yang dibiayai lebih dulu dari anggaran Rp 500 juta",
    tool: "SQL",
    images: ["fig-1-en.svg", "fig-1.svg", "fig-2-en.svg", "fig-2.svg", "fig-3-en.svg", "fig-3.svg"],
  },
  {
    no: 14,
    slug: "pertumbuhan-tahunan",
    title: "Pertumbuhan 12,37% Lolos Ambang 10%, Ditopang Volume dan Empat dari Lima Lini Produk",
    titleEn: "12.37% Growth Clears the 10% Bar, Carried by Volume and Four of Five Product Lines",
    summary: "Analisis pertumbuhan tahunan sebelum keputusan pendanaan Rp 12 miliar",
    tool: "SQL",
    images: ["fig-1-en.svg", "fig-1.svg", "fig-2-en.svg", "fig-2.svg", "fig-3-en.svg", "fig-3.svg"],
  },
  {
    no: 15,
    slug: "q-commerce",
    title: "Forecast Stok Agustus 2022 untuk Lima Hub Q-Commerce: Metode Paling Sederhana Ternyata Paling Akurat",
    titleEn: "August 2022 Stock Forecast for Five Q-Commerce Hubs: The Simplest Method Turned Out to Be the Most Accurate",
    summary: "Forecast permintaan mingguan Agustus 2022 untuk lima hub dan target stok produk segar",
    tool: "Python",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png", "gambar-4-en.png", "gambar-4.png"],
  },
  {
    no: 16,
    slug: "dataco",
    title: "Keterlambatan Pengiriman DataCo: Masalahnya di Janji Kirim, Region dan Produk Tidak Berpengaruh",
    titleEn: "DataCo Late Deliveries: The Problem Is the Delivery Promise; Region and Product Make No Difference",
    summary: "Cleaning ulang dataset final project dan mencari penyebab 57% pesanan ritel e-commerce terlambat",
    tool: "Python",
    images: ["gambar-1-en.png", "gambar-1.png", "gambar-2-en.png", "gambar-2.png", "gambar-3-en.png", "gambar-3.png", "gambar-4-en.png", "gambar-4.png", "gambar-5-en.png", "gambar-5.png"],
  },
  {
    no: 17,
    slug: "telkom-m1",
    title: "Volume pesan OCA turun 28% dalam satu kuartal, dan penurunan email menjadi penyebab utamanya",
    titleEn: "OCA Message Volume Fell 28% in One Quarter, and the Drop in Email Was the Main Cause",
    summary: "Dashboard Tableau untuk empat kelompok pembaca dari 122.749 transaksi",
    tool: "Tableau",
    images: [],
  },
  {
    no: 18,
    slug: "telkom-m2",
    title: "20 klien, 3 segmen, dan hanya volume kirim yang membedakan mereka",
    titleEn: "20 Clients, 3 Segments, and Only Sending Volume Tells Them Apart",
    summary: "Segmentasi RFM dan K-Means untuk 20 klien OCA, lengkap dengan sinyal churn dini yang tidak ada di brief",
    tool: "Python",
    images: ["gambar-1.png", "gambar-2.png"],
  },
];

/** Featured on the homepage: the planning-adjacent and SQL cases first. */
export const featuredStudiKasus = ["ambang-persediaan", "ramalan-pendapatan", "penjualan-ritel", "segmentasi-rfm"];

export const imageSrc = (slug: string, file: string) => `/studi-kasus/${slug}/images/${file}`;

export function getStudiKasus(slug: string) {
  return studiKasus.find((c) => c.slug === slug);
}
