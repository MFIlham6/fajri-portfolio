Studi kasus · RevoU × Telkom Indonesia · Milestone 2

# 20 klien, 3 segmen, dan hanya volume kirim yang membedakan mereka

Python (pandas, NumPy, SciPy, scikit-learn, seaborn), Google Colab · Dikerjakan sendiri · Python, Statistik Deskriptif, RFM, Clustering, Segmentasi

## 1. Ringkasan

OCA belum tahu klien mana yang berisiko churn, siap di-upsell, atau perlu onboarding ulang. Dengan RFM dan K-Means, 20 klien terbagi ke tiga segmen yang terpisah jauh: Loyal Premium (3 klien, 60% revenue), Mid Tier (5 klien, 25%), dan Potential (12 klien, 15%). Hanya volume kirim yang membedakan mereka. Aturan churn 14 hari dari brief tidak menangkap satu klien pun, jadi saya menambahkan sinyal churn dini yang menandai 6 klien. Rekomendasinya berbeda per segmen, dari Account Manager khusus untuk Loyal Premium sampai onboarding ulang per industri untuk Potential.

## 2. Kenapa laporan ini ada

Lanjutan dari Proyek 1. Semua 20 klien aktif setiap hari di Q1 2025, tetapi revenue per hari terus turun dan revenue bergantung pada tiga klien. Brief meminta tiga jawaban:

1. Klien mana yang paling mungkin churn, dan bagaimana mempertahankannya?
2. Bagaimana onboarding bisa disesuaikan dengan perilaku pemakaian?
3. Klien mana yang siap naik ke paket volume lebih tinggi?

## 3. Data dan batasannya

Satu dataset gabungan berisi 122.749 transaksi dari empat channel yang sudah dihubungkan dengan tabel klien. Dari tahap pertama sampai terakhir tidak ada baris yang dibuang.

| Tahap | Baris | Yang ditemukan | Penanganan dan dampak |
|---|---|---|---|
| Data mentah | 122.749 | 13 kolom, 20 klien, 4 channel | Titik awal |
| Perbaiki format tanggal | 122.749 | Semua 122.749 nilai created_at dan 42.387 nilai receivedTimestamp tertulis tahun 0025 dan berakhiran UTC | Tahun diubah ke 2025 dan akhiran dihapus, lalu dikonversi ke datetime. Tidak ada tanggal yang gagal dibaca, rentangnya 1 Januari sampai 31 Maret 2025 |
| Seragamkan charge | 122.749 | 54.149 true, 18.600 false, dan 50.000 kosong yang semuanya baris WhatsApp | Diubah ke boolean. Baris WhatsApp dibiarkan kosong karena channel ini tidak mencatat charge |
| Cek duplikat | 122.749 | Tidak ada baris kembar penuh. Satu transaction_id dipakai dua transaksi email dengan user, tanggal, status, dan harga berbeda | Keduanya dipertahankan dan dicatat sebagai anomali ID |
| Cek missing value | 122.749 | Kolom kosong mengikuti channel: total_sms hanya terisi di SMS, message_type hanya di WhatsApp, dan receivedTimestamp kosong di 7.613 pesan WhatsApp berstatus rejected atau submitted | Tidak diisi, karena kekosongan ini bagian dari struktur data |
| Cek harga 0 | 122.749 | 18.600 transaksi (15,2%) berharga 0, jumlahnya sama dengan charge false | Dipertahankan, karena transaksi ini memang tidak ditagih |
| Batasi outlier harga | 122.749 | 863 transaksi (0,70%) di atas batas IQR 925, semuanya Call, tertinggi 10.680 | Dibuat kolom price_winsorized untuk clustering. Total revenue di kolom ini Rp 25,42 juta, 1,3% di bawah revenue asli Rp 25,77 juta. Laporan revenue tetap memakai harga asli |
| Feature engineering | 122.749 | 4 fitur baru: is_success, hour, day_of_week, month | Data siap dianalisis tanpa ada baris yang dibuang |

Data hanya berisi 20 klien dan satu kuartal, dan tidak memuat kontrak, harga paket, atau riwayat klien yang berhenti. Karena itu segmentasi ini menggambarkan perilaku Q1 2025 saja, dan sinyal churn dini belum bisa diuji terhadap churn yang benar terjadi.

## 4. Yang saya kerjakan

### Statistik deskriptif

| Statistik | price |
|---|---|
| Rata-rata | 209,9 |
| Median | 150 |
| Simpangan baku | 213,9 |
| Rentang | 0 sampai 10.680 |
| Skewness | 2,92 |
| Kurtosis | 66,5 |

Rata-rata jauh di atas median dan kurtosisnya sangat tinggi, jadi harga punya ekor panjang ke kanan. Setelah ditelusuri, semua nilai ekstrem berasal dari Call. Setelah winsorization, nilai maksimum menjadi 925, rata-rata 207,1, dan simpangan baku 197,5, sementara Q1, median, dan Q3 tidak berubah. Kolom total_sms hanya terisi pada 20.000 baris SMS, dengan median 1 dan maksimum 4 SMS per transaksi.

| Variabel | Temuan |
|---|---|
| channel | WhatsApp 50.000, Email 40.000, SMS 20.000, Call 12.749 |
| field_of_business | 9 industri. Travel, Real Estate, dan Finance masing-masing sekitar 26.000 transaksi, eCommerce sekitar 1.500 |
| charge | True pada 54.149 dari 72.749 baris yang terisi |
| message_type | 3 jenis, terbanyak service (26.681) |
| transaction_id | 122.748 nilai unik dari 122.749 baris |
| join_date | 2022 sampai 2024, jadi semua klien sudah lama bergabung sebelum Q1 2025 |

### Keputusan yang diambil

| Keputusan | Alasan |
|---|---|
| Recency tidak dipakai | Semua klien bertransaksi di hari terakhir kuartal, sehingga Recency bernilai 0 untuk semua |
| Active days dan jumlah channel dibuang | Simpangan bakunya 0: semua klien aktif 90 hari dan memakai 4 channel |
| Success rate dibuang | Rentangnya hanya 78,9% sampai 80,3%. Setelah scaling, selisih ini hanya menjadi noise |
| Pembagian kuantil (pd.qcut) ditolak | Membagi klien ke kelompok berukuran sama, sehingga klien dengan 1.552 dan 6.010 pesan masuk kelompok yang sama. Ambang dipindah ke celah alami data |
| RobustScaler | Uji Shapiro-Wilk p < 0,05 dan skewness 1,73, jadi data tidak normal dan miring ke kanan |
| k = 3 | Inertia turun dari 6,99 di k = 2 ke 0,0067 di k = 3. Silhouette tertinggi di k = 3 (0,985), dibanding 0,913 di k = 2 dan 0,857 di k = 4 |
| Validasi dengan aturan manual | Ambang 5.000 dan 20.000 pesan menghasilkan segmen yang sama untuk 20 dari 20 klien |

## 5. Gambar

**Gambar 1. Jumlah pesan dan revenue per klien menurut segmen, Q1 2025 (slide 10)**

![gambar 1](images/gambar-1.png)

**Gambar 2. Revenue dan harga rata-rata per transaksi per segmen, Januari sampai Maret 2025 (slide 12)**

![gambar 2](images/gambar-2.png)

*Gambar menyusul: grafik bivariat success rate per channel dan volume bulanan per channel dari notebook.*

## 6. Temuan

**Tiga segmen yang terpisah jauh.**

| Segmen | Klien | Ambang pesan per kuartal | Pesan per hari | Porsi revenue |
|---|---|---|---|---|
| Loyal Premium | 3 | 20.000 atau lebih | sekitar 270 | 60% |
| Mid Tier | 5 | 5.000 sampai 19.999 | sekitar 68 | 25% |
| Potential | 12 | di bawah 5.000 | sekitar 17 | 15% |

Klien Potential terbesar mengirim 1.593 pesan, sedangkan Mid Tier terkecil 6.010. Celahnya lebar, jadi ambang di mana pun di dalam celah memberi hasil yang sama.

**Hanya volume yang membedakan klien.** Setiap klien menghasilkan sekitar Rp 210 per pesan, sehingga Monetary hampir sama dengan Frequency. Porsi weekend sekitar 29% di semua segmen (2 dari 7 hari sama dengan 28,6%), jam tersibuk hanya memegang sekitar 8% pesan, dan semua segmen memakai channel dengan proporsi yang sama (sekitar 41% WhatsApp, 33% email, 16% SMS, 10% call).

**Revenue turun 10% dari Januari ke Maret di semua segmen.** Tidak ada klien yang berhenti. Semua mengirim lebih sedikit, terutama email. Revenue per hari Loyal Premium turun dari sekitar Rp 180 ribu ke Rp 172 ribu lalu Rp 163 ribu. Harga rata-rata per transaksi naik sekitar 25% karena porsi email yang murah mengecil.

### Temuan yang tidak diminta

1. Aturan churn dari brief tidak menangkap siapa pun. Brief menandai churn jika klien tidak aktif 14 hari, tetapi semua klien aktif 90 dari 90 hari. Saya menambahkan sinyal yang lebih dini: pesan non-email per hari turun lebih dari 10% dari Januari ke Maret. Email dikeluarkan karena turun 60% di semua klien bersamaan, yang lebih mirip perubahan di sisi platform. Hasilnya 6 klien tertandai, 5 di antaranya dari segmen Potential.
2. Saran trial channel tidak relevan. Brief menyarankan trial untuk klien yang hanya memakai satu channel, padahal semua klien sudah memakai keempatnya.
3. Industri tidak menentukan tier. Travel, Real Estate, dan Finance masing-masing punya satu klien Loyal Premium dan satu klien Potential. Keempat klien Hospitality ada di Potential walaupun konfirmasi booking dan pengingat memberi mereka alasan untuk mengirim lebih banyak.

## 7. Apa yang berubah pada keputusannya

| Segmen | Rekomendasi | Pemilik |
|---|---|---|
| Loyal Premium | Account Manager khusus per klien dan peringatan otomatis saat volume bulanan turun | Account Manager |
| Mid Tier | Diskon volume mulai 2.500 pesan per bulan (sekitar 20% di atas rata-rata sekarang) | Product Manager |
| Potential | Onboarding ulang dengan template per industri, dimulai dari Hospitality, target 600 pesan per bulan per klien pada Juni | Marketing Ops |
| 6 klien tertandai | Dihubungi pada April untuk menanyakan penyebab penurunan | Account Manager |
| Semua | Aturan 14 hari dipasang sebagai peringatan otomatis di dashboard | Product Manager |

## 8. Batas dan telusur

Silhouette yang sangat tinggi menunjukkan kelompoknya memang terpisah jauh, tetapi dengan data sekecil ini aturan manual sudah cukup, sehingga K-Means berfungsi sebagai konfirmasi. Sinyal churn dini belum bisa diuji ketepatannya karena belum ada data Q2.

Telusur: Notebook (link GitHub menyusul) · Slide presentasi ke stakeholder, 18 slide, PDF (link menyusul)

### Kalau diulang

1. Saya akan memulai dari aturan manual di celah data, lalu memakai K-Means sebagai pembanding, karena dengan 20 klien dan satu dimensi pembeda hasilnya sudah terlihat dari histogram.
2. Saya akan meminta data minimal dua kuartal agar sinyal churn dini bisa diuji terhadap klien yang akhirnya berhenti.
3. Saya akan meminta log pengiriman email untuk memastikan apakah penurunan 60% berasal dari klien atau dari platform.

Kembali ke: [Milestone 1, dashboard channel OCA](/id/projects/telkom-m1/full)
