Studi kasus analisis pertumbuhan tahun ke tahun, SQL, data latihan

# Pertumbuhan 12,37% Lolos Ambang 10%, Ditopang Volume dan Empat dari Lima Lini Produk

Pendapatan distributor fiktif RetailMax naik dari 5.120,15 juta menjadi 5.753,58 juta rupiah. Angka itu bertahan setelah 2.020 baris kotor dibuang, tetapi hanya enam dari dua belas bulan 2025 yang benar-benar melewati ambang.

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, kueri lengkap dan hasilnya: [folder Google Drive](https://drive.google.com/drive/folders/1KmSMKyHa7fL0Gdp-20WZ4ePFMs4QqNUi), mfajriilhamn@gmail.com

Perusahaan dan datanya rekaan, dibuat untuk latihan Windata Academy. Seluruh angka di bawah dihitung dari satu berkas transaksi yang sama dan bisa dihitung ulang siapa pun.

## 1. Ringkasan

**Persoalannya.** RetailMax menjual barang konsumsi ke 200 outlet pengecer di lima wilayah niaga. Kepala keuangannya akan membahas pendanaan pertumbuhan Rp 12 miliar, dan lembar ketentuannya memuat satu syarat angka: pendapatan tahunan harus tumbuh di atas 10%. Yang perlu dijawab adalah apakah angka pertumbuhan itu masih bertahan setelah data dibersihkan dan dipecah per bulan, per lini produk, dan per wilayah.

**Temuan intinya.** Pendapatan 2025 tumbuh 12,37% dari 2024, 2,37 poin di atas ambang. Marjin kotor ikut naik dari 26,48% ke 26,99%. Pertumbuhannya datang dari volume: unit terjual naik 15,57% sementara rupiah per unit di tiap lini hampir tetap. Ketidakrataannya ada di dua tempat. Hanya enam dari dua belas bulan 2025 yang melewati 10%, dan Grocery, lini terbesar dengan 24,98% pendapatan, menyusut 1,67%. Kelima wilayah tumbuh di rentang sempit 9,88% sampai 15,04%.

**Rekomendasinya.** Angka 12,37% layak dibawa ke rapat bersama pemecahan bulanan dan per lini. Penyusutan Grocery perlu disiapkan jawabannya sebelum ditanya, karena ia menyentuh hampir seperempat pendapatan. Layak tidaknya pendanaan sendiri adalah keputusan yang butuh bahan di luar data ini.

## 2. Cara data ini dibersihkan

Berkas mentah berisi 40.800 baris. Yang dipakai menghitung pertumbuhan 38.780 baris. Selisihnya, 2.020 baris atau 4,95% dari berkas, keluar lewat empat langkah berurutan.

| Langkah | Sisa baris | Keluar | Alasannya |
| --- | --- | --- | --- |
| Berkas mentah | 40.800 |  | Isi berkas apa adanya. |
| 1. Pesanan ganda | 40.000 | 800 | Pesanan yang sama terkirim lebih dari sekali oleh mesin kasir. Salinannya bukan penjualan baru. |
| 2. Nilai pesanan kosong | 39.515 | 485 | Baris tanpa nilai rupiah. Kalau dianggap nol, jumlah pesanan ikut bertambah tanpa ada penjualan. |
| 3. Retur dipisahkan | 38.922 | 593 | Barang yang dikembalikan, bernilai negatif. Disimpan di tabel sendiri dan tidak dihitung sebagai penjualan. |
| 4. Setelah tanggal batas | 38.780 | 142 | Pesanan bertanggal setelah 31 Maret 2026, tanggal terakhir yang datanya lengkap. |

Ada 148 baris bertanggal setelah batas, tetapi di langkah keempat yang keluar hanya 142. Enam sisanya sudah keluar di langkah dua dan tiga karena nilainya kosong atau negatif. Dua angka itu sama-sama benar dan menjawab pertanyaan yang berbeda.

Urutan langkah pertama ikut menentukan hasil. Ada 120 nomor pesanan yang punya percobaan gagal bernilai kosong di tanggal yang sama dengan transaksi sebenarnya. Saya menomori baris di atas tabel mentah dengan urutan tanggal paling awal, lalu baris yang nilainya terisi, lalu baris bernilai positif, supaya transaksi yang sebenarnya yang tersimpan.

Kalau pembersihan dilewati, pertumbuhannya terbaca 13,09%. Kesalahannya condong ke atas karena nilai duplikat 2025 (113,50 juta) hampir dua kali nilai duplikat 2024 (63,83 juta). Jarak terhadap ambang jadi terlihat lebih longgar dari kenyataannya.

## 3. Temuan

**Temuan 1. Setengah tahun 2025 tumbuh di bawah 10%.** Angka tahunan 12,37% tersusun dari bulan yang sangat berbeda: Juni hanya 3,83% dan November 24,31%. Januari, Februari, Mei, Juni, Juli, dan Desember berada di bawah ambang. Pembaca yang hanya melihat angka tahunan akan mengira pertumbuhannya merata sepanjang tahun.

**Gambar 1. Pertumbuhan tahun ke tahun, dua belas bulan 2025**

![gambar 1](images/fig-1.svg)

*Apa yang tergambar: Pertumbuhan pendapatan tiap bulan 2025 terhadap bulan yang sama 2024, dengan garis putus-putus di 10%.*

*Rentang data: 38.780 pesanan bersih dari 200 outlet, Januari 2024 sampai Desember 2025.*

*Yang terlihat: Enam batang hijau melewati garis dan enam batang abu-abu berhenti di bawahnya.*

**Temuan 2. Empat lini tumbuh, lini terbesar menyusut.** Snacks tumbuh 32,49%, Beverages 19,21%, PersonalCare 15,52%, dan Household 9,43%. Grocery turun 1,67%, padahal ia menyumbang 24,98% pendapatan 2025, porsi terbesar dari kelima lini. Kalau penyusutan itu berlanjut, empat lini lainnya harus menutup lubang yang makin besar. Pecahan per wilayah menunjukkan Grocery turun di empat dari lima wilayah, paling dalam di Kalimantan (−5,16%) dan JawaBarat (−4,35%), dan jumlah pesanannya turun di kelima wilayah.

**Gambar 2. Pertumbuhan per lini produk, 2025 terhadap 2024**

![gambar 2](images/fig-2.svg)

*Apa yang tergambar: Pertumbuhan pendapatan tiap lini dalam persen, diurutkan dari yang tercepat, dengan nol di tengah dan pangsa 2025 di kolom kanan.*

*Rentang data: Dua tahun penuh, 2024 dan 2025. Kuartal pertama 2026 tidak ikut.*

*Yang terlihat: Satu batang mengarah ke kiri, dan batang itu milik lini dengan pangsa terbesar.*

**Temuan 3. Pertumbuhannya datang dari volume, dan tersebar di jaringan.** Unit terjual naik dari 304.245 menjadi 351.627 (15,57%) dan unit per pesanan dari 18,08 menjadi 19,95. Rupiah per unit di tiap lini hanya bergeser −0,11% sampai +0,05%, jadi kenaikan pendapatan tidak datang dari harga. Marjin tiap lini juga naik dengan besar yang mirip, sekitar setengah poin. Di sisi pengecer, ke-200 outlet memesan di kedua tahun tanpa outlet baru atau yang berhenti, 112 di antaranya tumbuh di atas 10%, dan median pertumbuhan per outlet 13,65%. Angka 12,37% tidak bergantung pada segelintir pengecer besar. Pertumbuhan yang berasal dari volume menuntut gudang dan pengiriman ikut tumbuh, dan itu perlu masuk pembahasan penggunaan dana.

**Temuan 4. Pola musim tidak dipakai untuk mengoreksi pertumbuhan.** Desember (1,178) dan Maret (1,167) adalah bulan paling ramai, Februari (0,874) paling sepi. Indeks ini menjelaskan pola tingkat pendapatan, bukan pertumbuhan yang sudah dikoreksi. Perbandingan tahun ke tahun sudah membandingkan bulan yang sama, sehingga membaginya dengan indeks ini menghitung ganda hal yang sama. Tidak ada angka di berkas ini yang disebut pertumbuhan yang disesuaikan musim.

**Gambar 3. Indeks musiman dua belas bulan kalender**

![gambar 3](images/fig-3.svg)

*Apa yang tergambar: Rata-rata pendapatan tiap bulan kalender dibagi rata-rata seluruh bulan, dengan garis putus-putus di 1.*

*Rentang data: 27 bulan, Januari 2024 sampai Maret 2026. Pembaginya 459,06 juta rupiah per bulan.*

*Yang terlihat: Dua batang hijau, Maret dan Desember, paling jauh di atas garis. Februari paling pendek.*

**Temuan 5. Risiko wilayah tertutup.** Kelima wilayah tumbuh 9,88% sampai 15,04%, jauh lebih rapat daripada rentang antar lini, dan tidak ada yang menyusut. Jabodetabek tumbuh paling cepat (15,04%) dengan pangsa 33,13%. JawaBarat satu-satunya di bawah ambang, tipis di 9,88%. Pertumbuhan gabungan tidak bergantung pada satu pasar.

## 4. Batas kesimpulan

Data yang tersedia satu tabel dengan sepuluh kolom: nomor pesanan, tanggal, outlet, kota, wilayah, lini produk, produk, jumlah unit, nilai pesanan, dan harga pokok. Dari situ ada beberapa pertanyaan yang berkas ini tidak berhak menjawab.

- Penyusutan Grocery terbukti dan lokasinya terlihat, tetapi sebabnya tidak. Tidak ada kolom tentang pesaing, harga di pasar, potongan, peluncuran produk, perubahan rak, atau pemasaran.
- Data berhenti 31 Maret 2026. Kuartal pertama 2026 tumbuh 12,79% terhadap kuartal pertama 2025, tetapi satu kuartal belum cukup untuk proyeksi. Membandingkan 2026 berjalan dengan 2025 penuh memberi −73,57%, angka yang tidak berarti karena membandingkan tiga bulan dengan dua belas bulan.
- Kenaikan marjin sekitar setengah poin di semua lini terukur, tetapi apakah ia datang dari harga beli yang lebih murah atau perubahan pemasok tidak bisa dilihat dari data ini.
- Syarat pertumbuhan terpenuhi. Kelayakan pendanaan Rp 12 miliar adalah keputusan yang butuh arus kas, kewajiban, dan rencana penggunaan dana.

## 5. Lampiran kueri

Potongan yang menghasilkan angka utama. Bisa dijalankan apa adanya.

```sql
WITH deduped_sales AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY TxnID
            ORDER BY TxnDate ASC, Revenue IS NULL ASC, Revenue <= 0 ASC
        ) AS rn
    FROM yoy_growth.sales                 -- tabel mentah, belum disaring
),
clean_sales AS (
    SELECT *
    FROM deduped_sales
    WHERE rn = 1
      AND Revenue IS NOT NULL
      AND Revenue > 0
      AND TxnDate <= toDate('2026-03-31')  -- batas ditulis tetap
),
monthly_revenue AS (
    SELECT
        toStartOfMonth(TxnDate) AS month,
        ROUND(SUM(toFloat64(Revenue)), 2) AS total_revenue,
        ROUND(SUM(toFloat64(COGS)), 2) AS total_cogs,
        count() AS txn_count
    FROM clean_sales
    GROUP BY month
)
SELECT
    curr.month AS month,
    curr.total_revenue AS current_revenue,
    prev.total_revenue AS previous_revenue,
    ROUND((curr.total_revenue - prev.total_revenue) * 100
          / nullIf(prev.total_revenue, 0), 2) AS yoy_growth_pct
FROM monthly_revenue curr
INNER JOIN monthly_revenue prev
    ON curr.month = addMonths(prev.month, 12)
ORDER BY month ASC
```

Kueri pemecahan per lini dan wilayah, marjin, indeks musiman, dan enam pemeriksaan konsistensi ada di berkas kueri lengkap. Keenam pemeriksaan lolos: rentang pertumbuhan bulanan, jumlah kuartal sama dengan jumlah bulan, harga pokok tidak melebihi nilai pesanan, tidak ada lompatan bulan ke bulan di luar 0,33 sampai 3 kali, jumlah lima wilayah sama dengan pendapatan 2025, dan tidak ada baris yang melanggar aturan pembersihan.

## 6. Laporan data

### Pendapatan bulanan dan pertumbuhan tahun ke tahun

| Bulan | Pendapatan (juta) | Harga pokok (juta) | Pesanan | Unit | Marjin | Tumbuh YoY |
| --- | --- | --- | --- | --- | --- | --- |
| Jan 2024 | 388,11 | 286,43 | 1.274 | 23.241 | 26,20% |  |
| Feb 2024 | 369,90 | 271,46 | 1.240 | 22.111 | 26,61% |  |
| Mar 2024 | 472,33 | 345,14 | 1.550 | 28.826 | 26,93% |  |
| Apr 2024 | 437,99 | 322,05 | 1.540 | 25.091 | 26,47% |  |
| Mei 2024 | 426,87 | 313,64 | 1.400 | 26.076 | 26,53% |  |
| Jun 2024 | 420,80 | 309,61 | 1.324 | 24.876 | 26,42% |  |
| Jul 2024 | 414,04 | 303,56 | 1.276 | 24.254 | 26,68% |  |
| Agu 2024 | 403,85 | 297,84 | 1.315 | 23.907 | 26,25% |  |
| Sep 2024 | 393,37 | 290,28 | 1.322 | 23.010 | 26,21% |  |
| Okt 2024 | 433,69 | 318,98 | 1.451 | 25.577 | 26,45% |  |
| Nov 2024 | 430,78 | 317,95 | 1.430 | 25.667 | 26,19% |  |
| Des 2024 | 528,42 | 387,59 | 1.704 | 31.609 | 26,65% |  |
| Jan 2025 | 407,80 | 295,71 | 1.291 | 25.079 | 27,49% | 5,07% |
| Feb 2025 | 392,72 | 285,84 | 1.228 | 24.043 | 27,22% | 6,17% |
| Mar 2025 | 547,81 | 400,44 | 1.691 | 33.789 | 26,90% | 15,98% |
| Apr 2025 | 543,85 | 398,27 | 1.698 | 33.398 | 26,77% | 24,17% |
| Mei 2025 | 469,10 | 345,38 | 1.422 | 28.024 | 26,37% | 9,89% |
| Jun 2025 | 436,92 | 318,18 | 1.318 | 26.829 | 27,18% | 3,83% |
| Jul 2025 | 448,00 | 325,73 | 1.347 | 26.870 | 27,29% | 8,20% |
| Agu 2025 | 475,94 | 347,02 | 1.454 | 29.505 | 27,09% | 17,85% |
| Sep 2025 | 445,03 | 323,83 | 1.353 | 26.998 | 27,23% | 13,13% |
| Okt 2025 | 497,45 | 364,59 | 1.492 | 30.768 | 26,71% | 14,70% |
| Nov 2025 | 535,49 | 388,78 | 1.603 | 33.068 | 27,40% | 24,31% |
| Des 2025 | 553,47 | 406,73 | 1.724 | 33.256 | 26,51% | 4,74% |
| Jan 2026 | 493,45 | 356,46 | 1.452 | 29.571 | 27,76% | 21,00% |
| Feb 2026 | 441,00 | 320,23 | 1.241 | 26.622 | 27,39% | 12,29% |
| Mar 2026 | 586,39 | 426,86 | 1.640 | 34.705 | 27,21% | 7,04% |

Dua belas bulan 2024 tidak punya pembanding, jadi kolom pertumbuhannya kosong. Jumlah 27 bulan: 38.780 pesanan dan 746.770 unit.

### Rollup kuartal

| Kuartal | Pendapatan (juta) | Harga pokok (juta) | Pesanan |
| --- | --- | --- | --- |
| 2024 K1 | 1.230,34 | 903,03 | 4.064 |
| 2024 K2 | 1.285,66 | 945,30 | 4.264 |
| 2024 K3 | 1.211,26 | 891,68 | 3.913 |
| 2024 K4 | 1.392,89 | 1.024,52 | 4.585 |
| 2025 K1 | 1.348,33 | 981,99 | 4.210 |
| 2025 K2 | 1.449,87 | 1.061,83 | 4.438 |
| 2025 K3 | 1.368,97 | 996,58 | 4.154 |
| 2025 K4 | 1.586,41 | 1.160,10 | 4.819 |
| 2026 K1 | 1.520,84 | 1.103,55 | 4.333 |

Dirakit dari tabel bulanan. Jumlah sembilan kuartal sama dengan jumlah 27 bulan pada nilai penuh, dengan toleransi satu sen.

### Lini produk dan wilayah, 2025 terhadap 2024

| Lini atau wilayah | 2024 (juta) | 2025 (juta) | Tumbuh | Pangsa 2025 | Unit tumbuh |
| --- | --- | --- | --- | --- | --- |
| Snacks | 675,64 | 895,16 | 32,49% | 15,56% | 32,46% |
| Beverages | 1.024,65 | 1.221,49 | 19,21% | 21,23% | 19,22% |
| PersonalCare | 933,36 | 1.078,22 | 15,52% | 18,74% | 15,65% |
| Household | 1.024,74 | 1.121,37 | 9,43% | 19,49% | 9,38% |
| Grocery | 1.461,76 | 1.437,34 | -1,67% | 24,98% | -1,66% |
| Jabodetabek | 1.657,12 | 1.906,35 | 15,04% | 33,13% |  |
| JawaTimur | 1.144,90 | 1.290,53 | 12,72% | 22,43% |  |
| Kalimantan | 504,25 | 559,82 | 11,02% | 9,73% |  |
| Bali | 773,09 | 853,26 | 10,37% | 14,83% |  |
| JawaBarat | 1.040,79 | 1.143,62 | 9,88% | 19,88% |  |

Unit tumbuh hanya dihitung per lini. Jumlah kelima lini dan kelima wilayah masing-masing 5.753,58 juta.
