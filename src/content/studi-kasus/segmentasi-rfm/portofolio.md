# Segmentasi Pelanggan Marketplace: Anggaran Retensi Dibagi Rata ke 5.000 Orang, Padahal 8% Memegang 28,7% Nilai

Studi kasus segmentasi pelanggan di marketplace ritel daring dengan lima kategori produk. Alat: SQL. Lingkup: 5.000 pelanggan dan 48.130 transaksi bersih dari 50.980 baris mentah.

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026. Kueri lengkap dan berkas pemeriksaan: https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP. Surel: mfajriilhamn@gmail.com.

Catatan data: angka di bawah dihitung dari dataset yang dirancang meniru pola transaksi marketplace. Ini bukan data perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## 1. Ringkasan

Anggaran retensi Rp 150 juta per kuartal sebaiknya **tidak dibagi rata**. Selama ini anggaran itu dibagi rata ke 5.000 pelanggan. Hasilnya Rp 30.000 per orang, terlalu kecil untuk mengubah perilaku siapa pun. Segmentasi atas 48.130 transaksi bersih menunjukkan 400 pelanggan teratas (8,0% dari 5.000) memegang 28,7% seluruh nilai transaksi. Itu 3,6 kali porsi seimbangnya. Sementara itu, 900 pelanggan yang dulu rajin sudah lebih dari satu kuartal menghilang. Mereka membawa Rp 2,74 miliar nilai historis (24,7% dari total). Rekomendasinya memusatkan anggaran pada apresiasi untuk kelompok teratas dan **uji win-back** terukur untuk kelompok yang menjauh. Seluruh angka per 2026-03-31.

## 2. Kenapa laporan ini ada

Pembagian anggaran kuartal berjalan menunggu keputusan, dan satu orang menanggungnya: pemegang anggaran retensi. Ia harus mempertahankan pembagian itu di depan manajemen, angka demi angka. Pertanyaan paling tajam: kenapa sebagian pelanggan sengaja tidak mendapat apa pun.

Kuartal sebelumnya promosi dikirim ke semua orang. Laporan campaign mencatat open rate 12% dan redemption voucher 3%. Angka itu konteks dari pemangku kepentingan. Angka itu tidak diverifikasi dari data dan tidak menjadi dasar argumen.

Pembagian yang salah arah menghabiskan Rp 150 juta pada kelompok dengan sumbangan terkecil. Kelompok penopang sebagian besar nilai terus diperlakukan sama seperti semua orang.

## 3. Yang dikerjakan

Pekerjaan mengikuti enam langkah tetap: situasi, pertanyaan yang benar, kecukupan data, analisis, bantahan, dan rekomendasi berikut batasnya. Tiga keputusan ditetapkan tertulis sebelum kueri analisis pertama. Masing-masing punya satu pilihan tertolak.

- Definisi transaksi: baris unik, bernilai positif, sampai tanggal acuan. Dari 50.980 baris mentah, 2.850 (5,6%) dibuang dalam empat tahap, dengan angka tiap tahap tercatat. Ditolak: memakai seluruh baris apa adanya. Duplikat menggelembungkan frekuensi. SUM juga melewati nilai kosong secara diam-diam, sehingga dua ukuran memakai dua definisi berbeda.
- Tanggal acuan: 2026-03-31, tanggal terakhir data bersih, dikunci sebagai literal. Ditolak: mengikuti tanggal sistem. Hasilnya berubah tiap hari dan tidak bisa direproduksi.
- Garis antar-segmen: ditetapkan setelah membaca sebaran populasi, lalu diuji kepekaannya. Ditolak: skoring kuintil per ukuran. Skoring itu lebih adaptif, tetapi pada data ini menemukan bentuk yang sama dan jauh lebih sulit dijelaskan kepada pemegang anggaran.

| Tahap pembersihan | Aturan | Dibuang | Sisa baris |
| --- | --- | --- | --- |
| Data mentah | Tabel transaksi, 5 kolom |  | 50.980 |
| Duplikat persis | Kelima kolom identik | 2.400 | 48.580 |
| Nilai kosong | TotalValue NULL (pembayaran gagal) | 350 | 48.230 |
| Nilai tak positif | TotalValue nol atau negatif | 50 | 48.180 |
| Tanggal di luar periode | Setelah 2026-03-31 | 50 | 48.130 |

Segmentasi memakai RFM (Recency, Frequency, Monetary) dengan empat segmen berbasis ambang. Seluruh hasil keluar dari satu kueri yang tercatat. Tiap temuan diuji terhadap bantahan paling mungkin sebelum dilaporkan.

Garis antar-segmen ditarik setelah membaca sebaran R, F, dan M seluruh pelanggan (per 2026-03-31, 5.000 pelanggan).

| Ukuran | Min | Q1 | Median | Q3 | Maks |
| --- | --- | --- | --- | --- | --- |
| Recency (hari) | 0 | 17 | 61 | 126 | 440 |
| Frequency (transaksi) | 2 | 4 | 7 | 14 | 25 |
| Monetary (Rp) | 44.457 | 650.077 | 1.357.960 | 3.121.369 | 10.878.758 |

Empat segmen memakai ambang berikut. Cabang dibaca dari atas ke bawah, dan urutan itu bagian dari definisi.

| Segmen | Syarat | Alasan |
| --- | --- | --- |
| Champions | R <= 30, F >= 15, dan M > Rp 5.000.000 | Tiga syarat sekaligus, sengaja sempit. M berdiri jauh di atas Q3. |
| Loyal | R <= 90 dan F >= 8 | 90 hari adalah satu kuartal. F >= 8 tepat di atas median (7). |
| At Risk | R > 90 dan F >= 5 | Frekuensinya membuktikan pernah rutin, tetapi sudah lebih dari satu kuartal menghilang. |
| Lost | Sisanya | Jarang dan lama tak terlihat, atau baru dan belum terbentuk kebiasaan. |

## 4. Data

Sumber data hanya satu tabel transaksi. Tabel itu berisi 50.980 baris dan lima kolom: nomor transaksi, pelanggan, tanggal, nilai, dan kategori. Data bersih mencakup Januari 2025 sampai Maret 2026. Data mentah memuat 50 baris bertanggal sampai Desember 2026. Baris itu dikeluarkan.

Tiga hal tidak ada di tabel: hasil campaign, biaya kanal, dan alasan pelanggan berhenti. Karena itu laporan ini tidak memuat angka ROI atau proyeksi pemulihan.

## 5 dan 6. Gambar dan temuan

Nilai terkonsentrasi di kelompok kecil, dan kelompok yang menjauh hampir menyamainya. 400 pelanggan (8,0% dari 5.000) memegang 28,7% nilai transaksi, 3,6 kali porsi seimbangnya. Mereka bermedian 22 transaksi dan Rp 8,06 juta per orang. Kelompok At Risk (900 pelanggan, 18,0%) menyusul dengan 24,7% nilai.

| Segmen (per 2026-03-31) | Pelanggan | Pangsa | Median R (hari) | Median F | Median M (Rp) | Total nilai (Rp) | Pangsa nilai |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Champions | 400 | 8,00% | 3 | 22 | 8.056.861 | 3.183.642.059 | 28,68% |
| Loyal | 1.100 | 22,00% | 19 | 16 | 3.026.085 | 3.353.539.214 | 30,21% |
| At Risk | 900 | 18,00% | 112 | 11 | 3.005.368 | 2.741.303.048 | 24,69% |
| Lost | 2.600 | 52,00% | 90,5 | 4,5 | 669.350 | 1.822.238.246 | 16,42% |
| Jumlah | 5.000 | 100% |  |  |  | 11.100.722.566 | 100,00% |

![gambar 1](images/gambar-1.svg)

*Apa yang tergambar: pangsa pelanggan (abu) dan pangsa nilai transaksi (merah) tiap segmen, dalam persen. Ujung batang merah memuat total nilai segmen (Rp miliar) dan kelipatan pangsa nilai terhadap pangsa pelanggan.*

*Rentang data: 48.130 transaksi bersih dari 5.000 pelanggan, 2025-01-01 sampai 2026-03-31, per 2026-03-31.*

*Yang terlihat: batang merah segmen berisi 400 orang 3,6 kali batang abunya. Batang merah segmen berisi 2.600 orang sepertiganya. Batang merah segmen berisi 900 orang yang menjauh hanya 4,0 poin persentase di bawah segmen berisi 400 orang.*

Kelompok yang menjauh memegang nilai hampir sebesar kelompok teratas. 900 pelanggan (18,0%) bermedian 11 transaksi, tanda mereka pernah rutin. Kini mereka bermedian 112 hari tanpa transaksi. Nilai historis kelompok ini Rp 2,74 miliar (24,7% dari total). Berapa yang bisa dipulihkan tidak diketahui dari data transaksi. Mayoritas pelanggan (2.600 orang, 52,0%) adalah pembeli ringan, bukan pelanggan setia yang hilang. Mereka bermedian 4,5 transaksi dan Rp 0,67 juta per orang.

![gambar 2](images/gambar-2.svg)

*Apa yang tergambar: median hari sejak transaksi terakhir (mendatar) dan median jumlah transaksi (tegak) tiap segmen. Luas bulatan mengikuti jumlah pelanggan, tetapi sengaja dimampatkan. Luas bulatan bukan perbandingan luas.*

*Rentang data: 5.000 pelanggan, per 2026-03-31.*

*Yang terlihat: bulatan kelompok yang menjauh berada di kanan garis 90 hari, pada tinggi 11 transaksi. Bulatan kelompok terbawah berada tepat di garis itu, pada tinggi 4,5 transaksi.*

Konsentrasi nilai nyata, tetapi lebih sedang daripada asumsi umum. 20% pelanggan teratas memegang 49,2% nilai, bukan 80%. Konsentrasi ini sifat sebaran data, bukan artefak garis segmen. Nilai per pelanggan membentang dari Rp 44.457 sampai Rp 10.878.758, dengan median Rp 1.357.960.

![gambar 3](images/gambar-3.svg)

*Apa yang tergambar: persentase nilai transaksi kumulatif (tegak) yang dipegang pelanggan teratas (mendatar). Garis putus-putus menunjukkan pembagian merata.*

*Rentang data: 5.000 pelanggan dan Rp 11,10 miliar nilai transaksi bersih, per 2026-03-31.*

*Yang terlihat: kurva merah berada di 28,7% pada 8% pelanggan teratas dan 49,2% pada 20%. Pada 20% pelanggan teratas, kurva berada di bawah 80%.*

Ukuran segmen bergantung pada tanggal acuan, tetapi arah rekomendasi tidak. Analisis tiga bulan lebih awal (data dan acuan 2025-12-31) menghasilkan Champions 83, Loyal 2.222, At Risk 226, dan Lost 2.469, dari 5.000 pelanggan. Dari 2.222 Loyal itu, 857 menjadi At Risk pada 2026-03-31. Jumlah itu 95% dari 900 At Risk saat ini. Dugaan saya sebelum menjalankan, bahwa Loyal menyusut, ternyata salah. Saya menghitung efek frekuensi dari riwayat lebih pendek dan melupakan efek recency.

| Jumlah pelanggan (dari 5.000) | Champions | Loyal | At Risk | Lost |
| --- | --- | --- | --- | --- |
| Acuan 2025-12-31 | 83 | 2.222 | 226 | 2.469 |
| Acuan 2026-03-31 | 400 | 1.100 | 900 | 2.600 |

| Segmen 2025-12-31 (baris) ke segmen 2026-03-31 (kolom) | Champions | Loyal | At Risk | Lost | Jumlah |
| --- | --- | --- | --- | --- | --- |
| Champions | 83 | 0 | 0 | 0 | 83 |
| Loyal | 305 | 1.060 | 857 | 0 | 2.222 |
| At Risk | 11 | 40 | 43 | 132 | 226 |
| Lost | 1 | 0 | 0 | 2.468 | 2.469 |
| Jumlah | 400 | 1.100 | 900 | 2.600 | 5.000 |

| Pelanggan aktif per kuartal (data bersih) | 2025 Q1 | 2025 Q2 | 2025 Q3 | 2025 Q4 | 2026 Q1 |
| --- | --- | --- | --- | --- | --- |
| Pelanggan aktif | 3.953 | 3.935 | 4.013 | 3.954 | 2.789 |
| Total nilai (Rp miliar) | 2,19 | 2,21 | 2,28 | 2,24 | 2,18 |

![gambar 4](images/gambar-4.svg)

*Apa yang tergambar: jumlah pelanggan tiap segmen dengan pipeline dan aturan identik pada dua tanggal acuan, 2025-12-31 (abu) dan 2026-03-31 (merah).*

*Rentang data: 5.000 pelanggan di kedua tanggal. Transaksi bersih sampai masing-masing tanggal.*

*Yang terlihat: batang abu segmen teratas (83) dan segmen yang menjauh (226) jauh lebih pendek daripada batang merahnya (400 dan 900). Batang segmen tengah berbalik arah (2.222 menjadi 1.100).*

## 7. Apa yang berubah pada keputusannya

Pertanyaan rapat bergeser. Sebelumnya: berapa besar voucher untuk semua orang. Sekarang: kelompok mana yang menerima anggaran terpusat, dan atas dasar apa. Anggaran yang sama kini membiayai dua program.

Program pertama: apresiasi non-diskon untuk 400 pelanggan teratas. Mereka bermedian 3 hari sejak transaksi terakhir, jadi sudah aktif tanpa dibayar. Bila seluruh anggaran diarahkan ke sana, tiap orang menerima Rp 375.000, dibanding Rp 30.000 pada bagi rata. Usulan awal porsinya 40% anggaran.

Program kedua: uji win-back terukur untuk 900 pelanggan yang menjauh. Sebagian kecil (20%) sengaja tidak dikirimi apa pun sebagai pembanding. Usulan awal porsinya 40% anggaran. Hasil uji menentukan skala kuartal berikutnya.

Kelompok tengah (1.100 orang) dijaga minimal dengan 15% anggaran. Cadangan pengukuran 5%. Sebanyak 2.600 pelanggan terbawah tidak mendapat anggaran kampanye. Porsi ini usulan awal, bukan hasil hitungan data. Segmentasi dijalankan ulang tiap kuartal dengan pipeline identik.

| Segmen (per 2026-03-31) | Pelanggan | Peran dalam anggaran | Porsi usulan | Per kepala |
| --- | --- | --- | --- | --- |
| Champions | 400 (8,0%) | Apresiasi non-diskon: akses awal produk, layanan prioritas | Rp 60 jt (40%) | Rp 150.000 |
| At Risk | 900 (18,0%) | Uji win-back. 180 orang (20%) tidak dikirimi apa pun sebagai pembanding | Rp 60 jt (40%) | Rp 83.333 per penerima (720) |
| Loyal | 1.100 (22,0%) | Dijaga dengan usaha minimal (komunikasi rutin) | Rp 22,5 jt (15%) | Rp 20.455 |
| Lost | 2.600 (52,0%) | Tidak mendapat anggaran kampanye | Rp 0 | Rp 0 |
| Cadangan |  | Pengukuran hasil uji | Rp 7,5 jt (5%) |  |

Yang akan saya ukur sesudahnya. Rekomendasi ini belum punya hasil, jadi saya menyatakan cara mengetahuinya. Tiga ukuran ditetapkan sekarang, sebelum program berjalan.

- Pertama, berapa dari 900 pelanggan yang menjauh kembali bertransaksi dalam satu kuartal setelah uji dikirim. Hasilnya dibaca terhadap kelompok pembanding tanpa kiriman.
- Kedua, berapa dari 400 pelanggan teratas masih berada di segmen yang sama saat segmentasi diulang di akhir kuartal berikutnya.
- Ketiga, biaya per pelanggan yang kembali. Angka ini baru ada setelah ukuran pertama terbaca.

Ketiganya dibaca pada tanggal yang ditetapkan bersama programnya, bukan dipilih setelah angka terlihat.

## 8. Batas dan telusur

- Seluruh angka menggambarkan perilaku sampai 2026-03-31. Rekomendasi mengasumsikan kuartal berikutnya menyerupai kuartal lalu. Data transaksi tidak bisa menguji asumsi itu, dan datanya sendiri menggoyahkannya. Pelanggan aktif turun dari 3.954 di kuartal terakhir 2025 ke 2.789 di kuartal pertama 2026 (turun 29,5%). Total nilai hampir sama. Penyebabnya tidak diketahui.
- Rp 2,74 miliar adalah nilai historis, bukan proyeksi pemulihan.
- Garis antar-segmen adalah keputusan analisis. Menggeser ambang frekuensi dua langkah memindahkan 824 pelanggan. Menggeser ambang hari setengah kali lipat memindahkan nol pelanggan.

| Ambang digeser (jumlah pelanggan per segmen) | Champions | Loyal | At Risk | Lost | Berpindah |
| --- | --- | --- | --- | --- | --- |
| Resmi | 400 | 1.100 | 900 | 2.600 |  |
| Recency Champions 30 ke 45 hari | 400 | 1.100 | 900 | 2.600 | 0 |
| Frequency Loyal 8 ke 6 transaksi | 400 | 1.924 | 900 | 1.776 | 824 |
| Monetary Champions Rp 5 jt ke Rp 4 jt | 452 | 1.048 | 900 | 2.600 | 52 |
| Frequency At Risk 5 ke 4 transaksi | 400 | 1.100 | 1.289 | 2.211 | 389 |

| Angka | Asalnya |
| --- | --- |
| 48.130 transaksi bersih | Pipeline empat tahap atas tabel transaksi: 50.980 ke 48.580 ke 48.230 ke 48.180 ke 48.130. Dibuang: duplikat 2.400, nilai kosong 350, tak positif 50, melewati acuan 50. |
| 400 / 1.100 / 900 / 2.600 | Agregasi per pelanggan lalu klasifikasi ambang. Kueri inti ditampilkan utuh di bawah. |
| 28,7% dan 24,7% pangsa nilai | Jumlah nilai transaksi per segmen dibagi total Rp 11,10 miliar. |
| Median 3 / 112 hari; 22 / 11 transaksi | Median per segmen atas kolom Recency dan Frequency per pelanggan. |
| 49,2% pada 20% teratas | Nilai kumulatif pelanggan yang diurutkan dari belanja terbesar. |
| Rp 375.000 dan Rp 30.000 per orang | Aritmetika: Rp 150 juta dibagi 400 dan dibagi 5.000. Ini bukan temuan data. |

```sql
WITH deduped AS (
  SELECT DISTINCT TransactionID, CustomerID, TransactionDate, TotalValue, ProductCategory
  FROM transactions                                     -- 50.980 -> 48.580
), bernilai AS (
  SELECT * FROM deduped WHERE TotalValue IS NOT NULL    -- 48.580 -> 48.230
), positif AS (
  SELECT * FROM bernilai WHERE TotalValue > 0            -- 48.230 -> 48.180
), bersih AS (
  SELECT * FROM positif
  WHERE TransactionDate <= toDate('2026-03-31')         -- 48.180 -> 48.130
), profil AS (
  SELECT CustomerID,
         dateDiff('day', max(TransactionDate), toDate('2026-03-31')) AS recency,
         count() AS frequency, sum(TotalValue) AS monetary
  FROM bersih GROUP BY CustomerID                       -- 5.000 pelanggan
)
SELECT
  multiIf(                                              -- urutan cabang disengaja
    recency <= 30 AND frequency >= 15 AND monetary > 5000000, 'Champions',
    recency <= 90 AND frequency >= 8,                        'Loyal',
    recency > 90  AND frequency >= 5,                        'At Risk',
                                                          'Lost') AS segmen,
  count() AS pelanggan, sum(monetary) AS nilai
FROM profil GROUP BY segmen ORDER BY pelanggan DESC
```

Menjalankan ulang. Kueri lengkap, berkas data, dan catatan keputusan tersimpan di https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP. Ada tiga langkah. Muat transactions.csv ke tabel transactions. Jalankan kueri di atas (atau rfm_challenge_2026-10-12.sql) apa adanya. Cocokkan angka tiap tahap pembersihan dengan 50.980 ke 48.580 ke 48.230 ke 48.180 ke 48.130, dan keempat segmen dengan 400, 1.100, 900, dan 2.600. Tanggal acuan terkunci sebagai literal di dalam kueri, jadi hasilnya sama kapan pun dijalankan.
