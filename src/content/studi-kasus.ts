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
    title: "Menentukan Prioritas Cabang dari Data Kasir yang Belum Bersih",
    titleEn: "Setting Branch Priorities from Point-of-Sale Data That Had Not Been Cleaned",
    summary:
      "Ekspor kasir ikut memuat transaksi 2026 sehingga total 2025 terbaca 23,6% terlalu tinggi; setelah dibersihkan, hanya dua cabang teratas yang unggul cukup jelas untuk diprioritaskan.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png"],
  },
  {
    no: 2,
    slug: "retensi-karyawan",
    title: "Anggaran Retensi Hendak Dibagi ke Dua Departemen, Padahal Ketujuhnya Hanya Berselisih 7,3 Poin",
    titleEn: "The Retention Budget Was About to Be Split Between Two Departments, Yet All Seven Differ by Only 7.3 Points",
    summary:
      "Tingkat resign tujuh departemen hanya berselisih 7,3 poin dan tidak melampaui kebetulan (p = 0,30), sedangkan jam kerja dan kepuasan memisahkan 7,6 dan 9,4 kali lebih tajam.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 3,
    slug: "ramalan-pendapatan",
    title: "Target Pendapatan Hendak Disusun dari Pertumbuhan 24,6%, Padahal Volume Awal Tahun Sudah Berhenti Bertambah",
    titleEn: "The Revenue Target Was About to Be Built from 24.6% Growth, Yet Early-Year Volume Had Already Stopped Rising",
    summary:
      "Pertumbuhan 24,6% seluruhnya datang dari jumlah transaksi, dan di kuartal pertama jumlah itu turun 10,4%; ramalan disusun sebagai rentang Rp 7,6 sampai 9,7 miliar dengan angka anggaran Rp 7,6 miliar.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 4,
    slug: "ambang-persediaan",
    title: "Seluruh 361 Ambang Pemesanan Berada di Bawah Rumus Bakunya, dan Selisihnya Setara dengan Satu Tanda Operasi",
    titleEn: "All 361 Reorder Points Sit Below Their Standard Formula, and the Gap Comes Down to One Operator",
    summary:
      "Rumus sistem menambahkan dua hari pada waktu tunggu, padahal seharusnya dikali dua; akibatnya 75 barang tidak pernah masuk daftar pesanan dan 68 barang sudah kritis.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 5,
    slug: "efisiensi-iklan",
    title: "Efisiensi Antar-Platform Berselisih 2,4 Kali, tetapi Jenis Kampanye Memisahkan 4,0 Kali",
    titleEn: "Platforms Differ in Efficiency by 2.4 Times, but Campaign Type Separates Them by 4.0 Times",
    summary:
      "Facebook 2,4 kali lebih efisien dari Instagram dengan porsi belanja yang sama, tetapi jenis kampanye memisahkan hasil 4,0 kali; anggaran Lebaran dibagi Rp 80/70/50 juta.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 6,
    slug: "retensi-kohort",
    title: "Retensi Kohort Baru Tampak Runtuh 50 Poin, dan Sebagian Besar Penurunan Itu Artefak Jendela Pengamatan",
    titleEn: "New-Cohort Retention Appears to Collapse by 50 Points, and Most of the Drop Is an Artifact of the Observation Window",
    summary:
      "Sebagian besar penurunan retensi 50,2 poin antar-kohort berasal dari jendela pengamatan yang belum setara; sisa selisih 4 sampai 5 poin nyata tetapi belum terpisah dari efek bulan kalender.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png"],
  },
  {
    no: 7,
    slug: "waktu-tunggu-klinik",
    title: "Peringkat Cabang Tidak Bisa Dibedakan dari Undian, dan Perbedaan Antar-Tenaga Medis Tidak Bisa Diukur per Orang",
    titleEn: "Branch Rankings Can't Be Told Apart from a Lottery, and Differences Between Clinicians Can't Be Measured Person by Person",
    summary:
      "Selisih antarcabang 4,0 menit dicapai 31,8% pengacakan; perbedaan antartenaga medis ada, tetapi pada yang berdata memadai sisa 6,4 menit setara undian, jadi tidak bisa dinilai per orang.",
    tool: "Spreadsheet",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 8,
    slug: "segmentasi-rfm",
    title: "Segmentasi Pelanggan Marketplace: Anggaran Retensi Dibagi Rata ke 5.000 Orang, Padahal 8% Memegang 28,7% Nilai",
    titleEn: "Marketplace Customer Segmentation: The Retention Budget Is Split Evenly Across 5,000 People, Yet 8% Hold 28.7% of Value",
    summary:
      "400 Champions (8%) memegang 28,7% nilai dan 900 At Risk membawa Rp 2,74 miliar nilai historis; anggaran retensi dipusatkan ke apresiasi Champions dan uji win-back terukur.",
    tool: "SQL",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png"],
  },
  {
    no: 9,
    slug: "analisis-keranjang",
    title: "Pasangan produk dengan angka tertinggi hanya ada di 146 dari 3.000 keranjang, jadi saya tidak mengusulkannya sebagai bundel",
    titleEn: "The top-scoring product pair appears in only 146 of 3,000 baskets, so I did not propose it as a bundle",
    summary:
      "Tiga pasangan lolos sebagai bundel di 1.231 sampai 1.395 keranjang, sedangkan pasangan dengan angka tertinggi (13,46 kali) ditolak karena hanya ada di 146 keranjang; bundel dijalankan sebagai uji.",
    tool: "SQL",
    images: ["gambar-1.png"],
  },
  {
    no: 10,
    slug: "analisis-funnel",
    title: "Verifikasi telepon menahan 6.730 dari 14.874 pendaftar, dan selisih antarplatform terlalu kecil untuk memecah perbaikannya",
    titleEn: "Phone verification holds back 6,730 of 14,874 sign-ups, and the gap between platforms is too small to split the fix by platform",
    summary:
      "Langkah verifikasi telepon kehilangan 45,25% pendaftar di ketiga platform, dan selisih antarplatform 1,82 poin belum bisa dibedakan dari kebetulan; satu perbaikan untuk semua platform, diuji sesudah audit pencatatan.",
    tool: "SQL",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png"],
  },
  {
    no: 11,
    slug: "deteksi-kecurangan",
    title: "Antrean tinjauan dompet digital: 56 orang di balik 1.395 transaksi, dan ambang yang belum diturunkan",
    titleEn: "A digital wallet review queue: 56 people behind 1,395 transactions, and a threshold that hasn't been lowered",
    summary:
      "Empat isyarat perilaku menghasilkan antrean 1.395 transaksi milik 56 pengguna; menurunkan ambang menyentuh 2.581 orang tanpa menambah pemeriksaan, jadi antrean ditinjau per pengguna dan hasilnya dicatat sebagai label.",
    tool: "SQL",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png"],
  },
  {
    no: 12,
    slug: "rantai-pasok",
    title: "Denda keterlambatan mengikuti volume: tiga jalur Jakarta memegang 34,99% kiriman dan 34,77% denda",
    titleEn: "Late-delivery penalties follow volume: three Jakarta routes hold 34.99% of shipments and 34.77% of penalties",
    summary:
      "Tiga jalur Jakarta memegang 34,99% kiriman dan 34,77% denda dengan ketepatan di sekitar rata-rata; kelima belas jalur tidak bisa dibedakan dari kebetulan, jadi prioritas perbaikan diambil dari volume.",
    tool: "SQL",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png"],
  },
  {
    no: 13,
    slug: "aktivitas-pengguna",
    title: "Pemakai fitur sosial di pekan pertama 6,84 poin lebih sering kembali, dan ukuran percobaan menentukan uji mana yang berjalan lebih dulu",
    titleEn: "First-week users of social features return 6.84 points more often, and experiment size decides which test runs first",
    summary:
      "Pemakai fitur sosial di pekan pertama kembali 6,84 poin lebih sering setelah keaktifan disamakan; uji rekomendasi pada pengguna lama dimulai lebih dulu karena uji pada pendaftar baru butuh sekitar 1.600 orang.",
    tool: "SQL",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 14,
    slug: "pertumbuhan-tahunan",
    title: "Pendapatan RetailMax tumbuh 12,37% dan lolos ambang 10%, ditopang pesanan yang lebih besar di empat dari lima lini produk",
    titleEn: "RetailMax revenue grew 12.37% and cleared the 10% bar, carried by larger orders in four of five product lines",
    summary:
      "Pendapatan tumbuh 12,37% dan bertahan setelah pembersihan, di atas 10% pada tiga dari empat kuartal, ditopang unit per pesanan yang naik; Grocery, lini terbesar, kehilangan 8,35% pesanannya.",
    tool: "SQL",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png"],
  },
  {
    no: 19,
    slug: "suara-pelanggan",
    title: "Skor Kepuasan Naik, Niat Berhenti Ikut Naik: Menyajikan Ulang 4.723 Respons Survei",
    titleEn: "Satisfaction Scores Rose, and So Did the Intent to Leave: Re-presenting 4,723 Survey Responses",
    summary:
      "Skor kepuasan keseluruhan naik karena promo harga, sementara layanan pelanggan turun setiap bulan dan menjadi satu-satunya dimensi yang membedakan responden yang berniat berhenti.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png", "gambar-6.png"],
  },
  {
    no: 20,
    slug: "pengiriman-same-day",
    title: "Usulan 12 Van Senilai Rp 2,1 Miliar Hampir Disetujui, Padahal Tambahan Waktunya Muncul Sebelum Kendaraan Berangkat",
    titleEn: "A Proposal for 12 Vans Worth Rp 2.1 Billion Was Nearly Approved, Yet the Extra Time Appears Before the Vehicles Leave",
    summary:
      "On-time turun dari 94,2% ke 82,6% setelah cut-off digeser, dan 78,2% tambahan waktunya muncul di antrean dispatch, bukan di last mile tempat van bekerja.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png", "gambar-6.png"],
  },
  {
    no: 21,
    slug: "gerai-ditutup",
    title: "Tiga daftar tanpa irisan: memilih 20 dari 180 gerai kopi ketika tidak ada grafik baku yang sanggup memuat 180 lintasan",
    titleEn: "Three lists with no overlap: choosing 20 of 180 coffee outlets when no standard chart can hold 180 trajectories",
    summary:
      "Tiga cara mengurutkan yang sama sahnya memberi tiga daftar tanpa irisan; daftar termurah memuat 15 gerai baru yang sedang tumbuh, jadi usulannya menutup 16 gerai yang menurun bertahap.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png"],
  },
  {
    no: 22,
    slug: "margin-kategori",
    title: "Margin gabungan naik 4,84 poin sementara margin ketujuh kategorinya turun: menyusun satu layar yang memuat keduanya",
    titleEn: "Combined margin rose 4.84 points while all seven category margins fell: building one screen that holds both",
    summary:
      "Margin gabungan naik +4,84 poin karena bauran bergeser (+7,02 poin), sementara margin ketujuh kategori turun di setiap panjang jendela; keputusan insentif Rp 34 miliar diusulkan dipisah dan ditunda.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png", "gambar-6.png"],
  },
  {
    no: 23,
    slug: "acuan-cabang",
    title: "Dua daftar cabang yang sama-sama benar, satu berkas: menyusun layar yang menyatakan acuannya",
    titleEn: "Two branch lists, both correct, one file: building a screen that states its reference",
    summary:
      "Peringkat pertumbuhan dan peringkat pencapaian target hanya berbeda karena tiga target yang disetel tangan; 10 dari 24 cabang sepakat pada kelima acuan, dan juara pencapaian target berada di peringkat 17 dalam rupiah.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png", "gambar-6.png"],
  },
  {
    no: 24,
    slug: "dua-sistem",
    title: "Dua sistem, satu bingkai: menyusun layar rapat anggaran yang tidak menjanjikan perbandingan yang tidak ada di data",
    titleEn: "Two systems, one frame: building a budget-meeting screen that doesn't promise a comparison the data doesn't have",
    summary:
      "Grafik dua sumbu menyatukan sesi dan rupiah dari dua sistem berbeda; dipisahkan, kanal nomor dua dalam volume ternyata terendah dalam pendapatan per sesi, dan Rp 2.794 juta pendapatan tidak punya sumber.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png", "gambar-6.png"],
  },
  {
    no: 25,
    slug: "garis-belum-terjadi",
    title: "Grafik rapat bilang gudang penuh April 2027, padahal tanggal itu masih tebakan",
    titleEn: "The meeting chart said the warehouse fills in April 2027, but that date is still a guess",
    summary:
      "Grafik rapat menunjukkan gudang penuh April 2027 dari satu versi tebakan; digambar ulang, tanggal penuhnya berkisar Februari 2027 sampai tidak penuh, dan jawaban tidak penuh bergantung pada rak yang belum dipasang.",
    tool: "Power BI",
    images: ["gambar-1.png", "gambar-2.png", "gambar-3.png", "gambar-4.png", "gambar-5.png"],
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
