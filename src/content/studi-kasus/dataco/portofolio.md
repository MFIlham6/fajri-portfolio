Studi kasus cleaning dan analisis data · ritel e-commerce, supply chain · Python (pandas, SciPy)

# Keterlambatan Pengiriman DataCo: Masalahnya di Janji Kirim, Region dan Produk Tidak Berpengaruh

57,3% pesanan DataCo tiba lewat janji. First Class dijanjikan 1 hari dan selalu tiba di hari ke-2, sementara Second Class sama lambatnya dengan Standard. Menyesuaikan janji First Class saja menurunkan keterlambatan ke 42,0%.

Mochamad Fajri Ilham · notebook, data bersih, dan berkas pendukung: [folder Google Drive](https://drive.google.com/drive/folders/1duVt4871pYcAj2Dt2-O6mPjqh1F3nz2h) · mfajriilhamn@gmail.com

Dataset DataCo Smart Supply Chain dipublikasikan di Mendeley Data (Constante, Silva, dan Pereira, 2019, CC BY 4.0). Datanya hampir pasti hasil simulasi (lihat Temuan 5), jadi temuan di sini menjelaskan data tersebut, belum tentu operasi perusahaan nyata.

## 1. Ringkasan

Final project saya sebelumnya memakai dataset yang sama dan menyimpulkan keterlambatan 54,83% disebabkan proses logistik internal, infrastruktur di region tertentu, dan stok yang sering habis. Saat dataset dibuka ulang tanpa brief masalah, langkah pertama adalah membersihkan data dan mencatat setiap perubahan. Cleaning itu mengubah hampir semua kesimpulan lama.

Keterlambatan sebenarnya 57,3% per pesanan. Hari kirim aktual hanya bergantung pada mode kirim, dan perbedaan antar region atau kategori yang dulu terlihat hilang setelah dihitung per pesanan. Masalahnya ada di janji: First Class terlambat 100%, Second Class 80%, Same Day 48%, Standard 40%. Pesanan First Class, Second Class, dan Same Day yang terlambat bernilai 10,6 juta, sepertiga dari total penjualan. Rekomendasinya menyesuaikan janji First Class, memberi cut-off pukul 12.00 untuk Same Day, dan memutuskan nasib Second Class.

## 2. Masalah bisnis dan objective

DataCo adalah perusahaan ritel e-commerce perlengkapan olahraga (fan shop, apparel, golf, footwear) yang menjual ke pelanggan perorangan dan korporat dan mengirim ke 164 negara. Analisis ini ada di fungsi supply chain dan logistik pengiriman.

Masalahnya: 57,3% pesanan tiba lewat tanggal yang dijanjikan, dan angkanya tidak membaik selama tiga tahun. Tiga mode yang dibayar pelanggan supaya lebih cepat (First Class, Second Class, Same Day) menyumbang 58,4% dari semua pesanan terlambat, karena janjinya tidak sesuai waktu kirim yang dicapai. Nilai penjualan pesanan itu 10,6 juta atau 33,4% dari total penjualan, sekitar 3,5 juta per tahun. Data tidak memuat ongkos kirim, jadi angka ini adalah nilai pesanan yang terdampak, bukan kerugian.

Objective: menurunkan keterlambatan per pesanan dari 57,3% menjadi maksimal 40% dalam 3 bulan dan maksimal 30% dalam 6 bulan, dengan menyelaraskan janji dan proses kirim ketiga mode itu.

| Kriteria | Isi |
| --- | --- |
| Specific | Fokus ke First Class, Second Class, dan Same Day. Region dan produk tidak disentuh karena tidak berpengaruh. |
| Measurable | Persentase pesanan dengan hari aktual lebih dari hari janji, tanpa pesanan batal, Same Day diukur dalam jam. Metrik pengaman: rata-rata hari kirim aktual tiap mode tidak naik. |
| Achievable | Simulasi: janji First Class 2 hari memberi 42,0%, ditambah cut-off Same Day 39,4%. Second Class dijanjikan 4 hari memberi 31,6%, dipercepat sampai 2 hari memberi 23,8%. |
| Relevant | Ketiga mode menyumbang 58,4% keterlambatan dan merupakan layanan berbayar yang dijual sebagai lebih cepat. |
| Time-bound | 3 bulan untuk perubahan janji dan cut-off, 6 bulan untuk keputusan Second Class yang butuh negosiasi carrier atau perubahan tarif. Jangka ini asumsi, karena data tidak memuat waktu implementasi. |

Target lama di final project (45% dalam 6 bulan) sudah terlampaui hanya dengan menyesuaikan janji First Class, jadi targetnya dinaikkan.

## 3. Data dan cleaning

DataCoSupplyChainDataset.csv berisi 180.519 baris item dari 65.752 pesanan dengan 53 kolom, order 1 Januari 2015 sampai 31 Januari 2018. Tidak ada baris duplikat. Ada 14 langkah cleaning, dan riwayat lengkapnya di 3-Log Cleaning. Yang paling berpengaruh ke angka:

- Encoding latin-1. Berkas gagal dibaca sebagai UTF-8 karena nama tempat beraksen.
- 15 kolom dihapus: lima tanpa informasi (email dan password tersamar, deskripsi produk kosong, Product Status selalu 0, kode pos tujuan 86% kosong), empat berisi data pribadi atau tidak terpakai, dan enam dari pasangan kolom kembar.
- 7.754 item batal dan fraud tercatat tidak terlambat. Setelah dikeluarkan, keterlambatan naik dari 54,83% ke 57,29%.
- Mulai Oktober 2017 tiap pesanan hampir selalu satu item dan produk aktif turun ke 8 sampai 20 per bulan. Periode ini ditandai dan dikeluarkan dari perbandingan produk.
- Item dirangkum menjadi 62.897 pesanan. Satu pesanan rata-rata berisi 2,75 item dengan mode dan status terlambat yang selalu sama, jadi menghitung per item membuat sampel seolah tiga kali lebih besar.

## 4. Temuan

**Temuan 1.** Janji tiap mode tidak sesuai waktu kirim yang dicapai. Janji selalu sama per mode: Same Day 0 hari, First Class 1, Second Class 2, Standard 4. First Class selalu tiba dalam 2 hari. Second Class dan Standard tersebar rata dari 2 sampai 6 hari, masing-masing sekitar 20%, sehingga rata-rata keduanya 4,0 hari.

**Gambar 1. Sebaran hari kirim aktual per mode dan janjinya**

![gambar 1](images/gambar-1.png)

Bandingkan panel Second Class dan Standard Class: batangnya sama, hanya garis janjinya yang berbeda.

| Mode | Porsi pesanan | Janji | Waktu kirim aktual | Terlambat | Porsi dari semua keterlambatan |
| --- | --- | --- | --- | --- | --- |
| Same Day | 5,4% | 0 hari | 0 hari (order sebelum 12.00) atau 1 hari | 48,4% | 4,6% |
| First Class | 15,3% | 1 hari | selalu 2 hari | 100,0% | 26,6% |
| Second Class | 19,5% | 2 hari | 2 sampai 6 hari, rata-rata 4,0 | 80,0% | 27,2% |
| Standard Class | 59,8% | 4 hari | 2 sampai 6 hari, rata-rata 4,0 | 39,8% | 41,6% |
| Semua mode | 100% |  |  | 57,3% | 100% |

**Temuan 2.** Keterlambatan Same Day ditentukan jam order. Semua pesanan Same Day dikirim tepat 12 jam setelah order. Order sebelum pukul 12.00 dikirim di hari yang sama dan tepat waktu. Order pukul 12.00 ke atas dikirim setelah tengah malam, tercatat 1 hari, dan terlambat.

**Gambar 2. Pesanan Same Day yang terlambat menurut jam order**

![gambar 2](images/gambar-2.png)

Perhatikan batas di pukul 12.00.

**Temuan 3.** Region, kategori, segmen, dan metode bayar tidak berpengaruh. Uji chi-square per item membuat region tampak signifikan. Per pesanan, dan di dalam satu mode yang sama, tidak ada faktor dengan p di bawah 0,05. Karena p yang tidak signifikan belum membuktikan efeknya nol, besar efeknya ikut dihitung. Cramér's V mode kirim 0,48, sedangkan faktor lain di bawah 0,03. Di dalam mode yang sama, region dengan minimal 500 pesanan hanya berbeda −3,1 sampai +2,4 poin dari rata-rata mode, dibanding selisih 60 poin antar mode.

| Faktor | p, per item | p, per pesanan | p, pesanan Standard Class | Cramér's V | Rentang keterlambatan per pesanan |
| --- | --- | --- | --- | --- | --- |
| Market | 0,10 | 0,53 | 0,69 | 0,007 | 56,5 sampai 57,7% |
| Region tujuan | < 0,001 | 0,10 | 0,20 | 0,022 | 52,6 sampai 60,0% |
| Kategori | 0,62 | 0,68 | 1,00 | 0,027 | 40,3 sampai 70,0% |
| Departemen | 0,74 | 0,70 | 0,74 | 0,011 | 56,4 sampai 61,4% |
| Segmen pelanggan | 0,35 | 0,59 | 0,13 | 0,004 | 57,2 sampai 57,7% |
| Metode bayar | 0,16 | 0,70 | 0,50 | 0,005 | 56,7 sampai 57,5% |

**Gambar 3. Keterlambatan pesanan Standard Class per region tujuan**

![gambar 3](images/gambar-3.png)

Angka dalam kurung adalah jumlah pesanan. Rentang yang memotong garis rata-rata berarti region itu tidak berbeda dari rata-rata.

**Temuan 4.** Tidak ada perbaikan selama tiga tahun. Keterlambatan bulanan bergerak antara 55,0% dan 59,9%, dan porsi tiap mode hampir tidak berubah dari tahun ke tahun.

**Gambar 4. Keterlambatan pesanan per bulan**

![gambar 4](images/gambar-4.png)

Garis putus-putus adalah target 45% dari final project sebelumnya.

**Temuan 5.** Data ini hampir pasti hasil simulasi. Beberapa pola terlalu rapi untuk operasi nyata, dan ini perlu diketahui sebelum hasilnya dipakai untuk keputusan:

- Hari kirim Standard dan Second Class tersebar 19,9% sampai 20,2% di setiap hari dari 2 sampai 6.
- Semua pesanan Same Day dikirim tepat 12 jam setelah order, dan semua pesanan First Class tepat 2 hari.
- Semua 1.488 pesanan yang dicurigai fraud dibayar lewat transfer, tanpa satu pun dari metode lain.
- Pelanggan hanya di Amerika Serikat dan Puerto Rico, tetapi barang dikirim ke 164 negara dengan tingkat keterlambatan yang sama.
- Keterlambatan per tahun 57,2%, 57,6%, dan 57,0%, dan Cramér's V semua faktor selain mode di bawah 0,03.

Data nyata hampir selalu punya perbedaan antar wilayah, musim, dan carrier. Karena itu rekomendasi di bawah dibaca sebagai cara berpikir yang akan diuji ulang di data operasional, bukan angka yang langsung dipakai.

## 5. Simulasi janji kirim

Karena hari kirim tidak dipengaruhi faktor lain, skenario dihitung ulang dengan hari aktual yang sama dan janji yang diubah. Skenario bertingkat: setiap baris menambah perubahan pada baris sebelumnya.

| Skenario | Pesanan terlambat |
| --- | --- |
| Kondisi sekarang | 57,3% |
| 1. First Class dijanjikan 2 hari | 42,0% |
| 2. + Same Day dengan cut-off pukul 12.00 | 39,4% |
| 3. + Second Class dijanjikan 4 hari (sama dengan Standard) | 31,6% |
| 4. + Second dan Standard dijanjikan 5 hari | 15,9% |

**Gambar 5. Keterlambatan pesanan per skenario**

![gambar 5](images/gambar-5.png)

Batang pertama adalah kondisi sekarang.

Alternatif untuk Second Class adalah mempercepat prosesnya sampai benar-benar 2 hari. Bersama perubahan First Class dan Same Day, keterlambatan turun ke 23,8%. Biayanya tidak bisa dihitung dari data ini.

## 6. Rekomendasi

- First Class dijanjikan 2 hari, atau proses 1 hari dibuktikan dulu sebelum layanan itu dijual lagi. Langkah ini sendiri sudah membawa keterlambatan ke 42,0%, tetapi barangnya tidak jadi lebih cepat. Risikonya pelanggan yang membayar First Class beralih ke Standard, jadi uji dulu di sebagian pesanan dan pantau porsi order First Class serta pembatalan.
- Same Day dengan cut-off pukul 12.00. Order setelahnya dijanjikan besok.
- Second Class dipercepat sampai 2 hari, atau dijanjikan 4 hari dan tidak lagi dijual sebagai layanan lebih cepat. Pilihannya bergantung pada selisih tarif dan biaya carrier.
- Keterlambatan diukur per pesanan, tanpa pesanan batal, dan Same Day dalam jam.
- Sebaran 2 sampai 6 hari di Standard dan Second Class menjadi pekerjaan operasional berikutnya. Bahkan setelah semua janji disesuaikan, ketepatan waktu masih di bawah carrier parsel AS (90% sampai 97%) dan median OTIF APQC (90%).

## 7. Temuan lain

Seluruh 1.488 pesanan yang dicurigai fraud dibayar lewat transfer, 8,2% dari semua pesanan transfer, dengan nilai penjualan 741.492. Metode bayar lain tidak punya satu pun. Di sisi profit, 18,7% item terjual rugi.

## 8. Batas analisis

- Data hampir pasti hasil simulasi (Temuan 5).
- Jangka 3 dan 6 bulan di objective adalah asumsi. Data tidak memuat lama implementasi perubahan janji atau negosiasi carrier.
- Tidak ada kolom tarif kirim, carrier, atau gudang asal, sehingga biaya tiap skenario tidak bisa dihitung.
- Keterlambatan tidak mengubah pembelian ulang (96,3% pelanggan yang pesanan pertamanya terlambat kembali membeli, dibanding 95,8%), jadi dampaknya ke pendapatan tidak bisa diukur.
- Mengubah janji menurunkan angka keterlambatan tanpa mempercepat barang. Pelanggan First Class tetap menerima barang di hari ke-2.

## 9. Yang diperbaiki dari versi pertama

| Versi pertama | Setelah cleaning dan hitung ulang |
| --- | --- |
| Tingkat keterlambatan 54,83% | 57,31% per pesanan. Angka lama dihitung per item dan memasukkan item batal sebagai tepat waktu |
| Periode Desember 2014 sampai Desember 2017 | 1 Januari 2015 sampai 31 Januari 2018. Mulai Oktober 2017 struktur data berubah |
| Central Africa, South Asia, East Africa terlambat di atas 55,94% | Beda antar region tidak signifikan per pesanan (p = 0,10; di dalam Standard Class p = 0,20) |
| Golf Bags & Carts, Soccer, Pet Supplies rata-rata terlambat di atas 0,7 hari | Ketiganya kategori kecil (61, 136, dan 472 item). Rata-rata semua item 0,57 hari dan beda antar kategori tidak signifikan (p = 0,68) |
| 18,68% pesanan mengalami stock-out | Product Status selalu 0, jadi data tidak mencatat stok habis. 18,7% adalah porsi item yang merugi |
| Same Day punya tingkat keterlambatan terendah, 4,50% | 4,50% adalah porsi Same Day dari semua item terlambat. Tingkat keterlambatannya 48,4% per pesanan |
| Standard Class menyumbang 41,45% keterlambatan, jadi perlu diaudit | Benar (41,6% per pesanan), tetapi karena Standard memegang 59,8% pesanan. Tingkat keterlambatannya justru terendah (39,8%) |
| Benefit per order dibaca sebagai profit per pesanan | Nilainya per item. Kalau dibaca per pesanan, profit tercatat 1.388.652 dari 3.966.903 |

Berkas: 1-Notebook Cleaning dan Analisis, 2-Memo Keputusan, 3-Log Cleaning, 4-Data Bersih, 5-Portofolio. Semua ada di [folder Google Drive](https://drive.google.com/drive/folders/1duVt4871pYcAj2Dt2-O6mPjqh1F3nz2h) yang sama.
