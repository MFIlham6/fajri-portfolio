Studi kasus, SQL, ketepatan waktu pengiriman

# Tiga jalur bervolume besar menyumbang 34,77% denda keterlambatan, dan tidak satu pun termasuk jalur dengan kinerja terendah

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, kueri dan berkas pemeriksaan: [folder Google Drive](https://drive.google.com/drive/folders/1z1ksCqZQyWMhGfFgOlkHnpAUVc1-hwCC), mfajriilhamn@gmail.com

Penafian: perusahaan dan datanya rekaan. Pekerjaan ini studi kasus latihan dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## Konteks

Sebuah perusahaan pengiriman barang antarkota menandatangani kontrak yang menjanjikan tanggal tiba untuk tiap paket, dan membayar denda tetap untuk tiap paket yang tiba melewati janjinya. Kepala operasionalnya tahu berapa denda yang dibayar setiap bulan. Yang belum ia ketahui adalah di mana keterlambatan itu terkumpul, padahal kapasitas perbaikannya terbatas dan pembaruan kontrak tinggal beberapa bulan lagi.

Pekerjaan ini menjawab pertanyaan itu dari catatan pengiriman lima belas bulan: satu tabel, delapan kolom, sekitar dua puluh lima ribu baris. Tidak ada satu pun kolom yang mencatat penyebab keterlambatan, jadi analisis ini bisa menunjukkan di mana keterlambatan terkumpul dan tidak bisa menjelaskan kenapa ia terjadi.

## Pendekatan

Langkahnya: memberi nomor urut per nomor kiriman, menyingkirkan tiga golongan baris yang tidak menggambarkan kejadian nyata, memisahkan kiriman yang belum tiba ke aliran sendiri, menandai tiap kiriman yang tersisa terlambat atau tidak, lalu memecah hasilnya tiga cara (jalur, hari pengambilan, kurir) dan menerjemahkan cacah keterlambatan ke rupiah. Empat keputusan saya tulis sebelum kueri analisis pertama dijalankan.

**Penentu terlambat: tanggal tiba melewati tanggal janji milik kiriman itu sendiri.**

Ditolak: satu batas lama perjalanan untuk semua jalur. Janji antarkota dekat dan antarpulau berbeda, jadi batas tunggal akan menghasilkan peringkat yang berurutan menurut jarak.

**Kiriman yang belum tiba dipisahkan dan cacahnya dilaporkan, tidak dibuang dan tidak dihitung.**

Ditolak: menghitungnya sebagai terlambat. Angka yang dihasilkan akan terus memburuk tiap kali data diambil lebih dekat ke hari ini, tanpa ada yang berubah di lapangan. Cara itu baru tepat untuk pertanyaan lain, yaitu berapa paket yang saat ini sedang ditunggu melewati janji.

**Tiga pemecahan ditetapkan di muka, masing-masing sesuai satu jenis tindakan perusahaan: jalur bisa diubah rutenya, kurir bisa ditinjau, dan hari ambil bisa dijadwal ulang.**

Ditolak: mencoba banyak pemecahan lalu melaporkan yang hasilnya paling mencolok. Dengan cukup banyak percobaan, cara itu pasti menemukan pola di dalam derau.

**Kurir baru dinilai kalau punya sedikitnya tiga puluh kiriman terukur, ditulis sebelum peringkatnya dilihat. Tiap kurir disertai selang kepercayaan 95%.**

Ditolak: menyetel ambang sesudah melihat daftar terbawah, cara yang membuat ambang berhenti menjadi aturan.

Pembersihan berjalan empat tahap. Tiap tahap tercatat berapa baris keluar dan sifatnya, dibuang atau dipisahkan, sehingga jumlah akhirnya bisa direkonsiliasi ke baris mentah tanpa harus mempercayai satu angka pun begitu saja.

## Temuan

1. **Keterlambatan terkumpul di jalur bervolume besar, bukan di jalur berkinerja terendah.** Dari 22.614 kiriman yang sudah selesai perjalanannya, 1.809 tiba melewati janjinya, sehingga ketepatan waktu 92,00%. Tiga jalur dari Jakarta menyumbang 34,77% denda periode dengan 245, 217, dan 167 keterlambatan, dari 3.141, 2.687, dan 2.085 kiriman. Ketepatan ketiganya 91,92% sampai 92,20%, di sekitar rata-rata perusahaan. Urutan prioritas perbaikan karena itu diturunkan dari volume.
2. **Tidak ada jalur yang kinerjanya jauh berbeda dari yang lain.** Kelima belas jalur berada dalam rentang 2,53 poin, dari 90,32% sampai 92,86%, dengan 906 sampai 3.141 kiriman per jalur. Uji chi-kuadrat atas kelima belas jalur memberi p = 0,62, jadi rentang ini tidak bisa dibedakan dari kebetulan, dan peringkat ketepatan tidak bisa dipakai menentukan jalur mana yang dikerjakan dulu.
3. **Peringkat kurir belum bisa dipakai menjatuhkan penilaian atas seseorang.** Kurir dengan ketepatan terendah tercatat 78,57% dari 42 kiriman, dan selang kepercayaan 95% untuk angka itu membentang dari 64,06% sampai 88,29%. Cukup untuk menyatakan kurir ini di bawah rata-rata perusahaan, tidak cukup untuk menyebutnya yang terburuk dari 500. Sebagai kelompok, sepuluh kurir terbawah tercatat 81,53% dari 406 kiriman, terpisah jelas dari 490 kurir lain (92,19% dari 22.208), dan layak ditinjau bersama.
4. **Hari pengambilan tidak menentukan ketepatan waktu.** Hari terbaik dan terburuk berselisih 0,97 poin, dari 91,50% sampai 92,47%, atas 3.145 sampai 3.283 kiriman per hari. Uji chi-kuadrat memberi p = 0,87. Menjadwal ulang pengambilan karena itu tidak menjanjikan penurunan denda.

**Gambar 1. Dari mana denda periode datang**

![gambar 1](images/fig-1.svg)

*Apa yang tergambar: Denda periode tiap jalur dalam juta rupiah, diurutkan menurut denda, dengan ketepatan dan cacah kiriman di sampingnya. Sumbu mulai dari nol.*

*Rentang data: 22.614 kiriman terukur, 1.809 terlambat, Januari 2025 sampai Maret 2026.*

*Yang terlihat: Tiga batang teratas berwarna hijau, semuanya jalur dari Jakarta. Ketepatan di sampingnya berada di 91,92% sampai 92,20%. Makassar ke Pontianak, jalur dengan ketepatan terendah, ada di urutan kesepuluh. Menopang temuan 1.*

**Gambar 2. Kelima belas jalur pada sumbu penuh nol sampai seratus**

![gambar 2](images/fig-2.svg)

*Apa yang tergambar: Ketepatan tiap jalur sebagai satu titik pada sumbu 0% sampai 100%.*

*Rentang data: Sama seperti Gambar 1.*

*Yang terlihat: Kelima belas titik berimpit di satu tempat. Gambar ini sengaja memakai sumbu penuh karena klaim yang ditopangnya adalah tidak ada jalur yang jauh berbeda. Menopang temuan 2.*

**Gambar 3. Sepuluh kurir terbawah dan lebar ketidakpastiannya**

![gambar 3](images/fig-3.svg)

*Apa yang tergambar: Ketepatan tercatat sepuluh kurir terbawah dengan selang kepercayaan Wilson 95%, garis putus di 92,00% untuk seluruh perusahaan, dan selang gabungan 490 kurir lain di baris terakhir.*

*Rentang data: 500 kurir, 33 sampai 52 kiriman per kurir, periode yang sama.*

*Yang terlihat: Kesepuluh selang berada di kiri garis putus dan saling bertumpang tindih. Sumbu dipotong pada 60% dan pemotongannya disebut di bawah gambar. Menopang temuan 3.*

**Gambar 4. Ketepatan menurut hari pengambilan**

![gambar 4](images/fig-4.svg)

*Apa yang tergambar: Ketepatan tiap hari pengambilan, Senin sampai Minggu, dengan sumbu tegak dari nol.*

*Rentang data: 22.614 kiriman terukur, 3.145 sampai 3.283 per hari.*

*Yang terlihat: Ketujuh batang hampir sama tinggi. Memotong sumbu di 91% akan membuat Rabu tampak jauh lebih rendah, dan gambar itu akan menyesatkan. Menopang temuan 4.*

## Usul

Arahkan perbaikan ke tiga jalur bervolume terbesar. Kalau ketiganya mencapai ketepatan 97%, denda periode turun Rp 19.550.000. Seandainya kelima belas jalur mencapainya, penurunannya Rp 56.400.000, sehingga tiga jalur saja mencakup 34,66% dari yang tersedia. Target 97% diambil dari luar data: ketepatan tertinggi yang pernah tercatat di jalur mana pun 92,86%. Tinjau sepuluh kurir terbawah sebagai satu kelompok, dan jangan pakai peringkat untuk menilai perorangan. Mulai catat alasan pada setiap kiriman yang meleset, karena tanpa catatan itu pertanyaan tentang penyebab tidak akan pernah bisa dijawab dari data ini.

Yang berubah karena pekerjaan ini ada tiga. Urutan prioritas pindah dari peringkat kinerja ke volume. Menjadwal ulang pengambilan dicoret dari daftar perbaikan. Rencana memakai peringkat kurir untuk menilai orang ditunda, dengan alasan yang berupa angka.

## Di luar perhitungan

2.126 kiriman belum punya tanggal tiba saat data ditutup dan tidak masuk hitungan mana pun di atas. Dari jumlah itu, 2.113 sudah lewat tanggal janjinya pada 31 Maret 2026, rata-rata 222,0 hari. Angka ini tidak dijumlahkan dengan 1.809 dan tidak dikalikan denda.

Kelompok ini ternyata tidak sedang dalam perjalanan. Kiriman tanpa tanggal tiba tersebar rata di kelima belas bulan ambil, 117 sampai 163 per bulan, dan 1.951 sudah lewat janji lebih dari 30 hari. Data tidak bisa membedakan barang hilang dari pemindaian tiba yang tidak tercatat, jadi status fisiknya perlu dicek sebelum angka apa pun dihitung ulang.

**Gambar 5. Kiriman tanpa tanggal tiba menurut bulan ambil**

![gambar 5](images/fig-5.svg)

*Apa yang tergambar: Cacah kiriman tanpa tanggal tiba per bulan barangnya diambil, dipisah antara yang janjinya sudah lewat dan belum.*

*Rentang data: 2.126 kiriman sah tanpa tanggal tiba, diambil Januari 2025 sampai Maret 2026.*

*Yang terlihat: Kelima belas batang hampir sama tinggi. Bagian abu-abu cuma muncul di Maret 2026, sebanyak 13 kiriman.*

## Lapisan bukti

Keterangan untuk semua tabel: periode 2025-01-01 sampai 2026-03-31, tanggal batas 2026-03-31 ditulis harfiah, 2.126 kiriman yang belum tiba dipisahkan, berat nol atau negatif dibuang, ambang kurir 30 kiriman. Denda Rp 50.000 per kiriman terlambat, dihitung dari cacah.

### Rekonsiliasi empat tahap

| tahap | sebelum | keluar | sifat | sesudah |
| --- | --- | --- | --- | --- |
| kiriman kembar dari pemindaian ulang | 25.800 | 800 | dibuang | 25.000 |
| tanggal ambil sesudah 31 Maret 2026 | 25.000 | 160 | dibuang | 24.840 |
| berat nol atau negatif | 24.840 | 100 | dibuang | 24.740 |
| belum tiba | 24.740 | 2.126 | dipisahkan | 22.614 |

Yang dibuang 1.060 baris, yang dipisahkan 2.126. Tanggal ambil dibandingkan sebagai toDate(PickupDate). Tanpa toDate() di sisi kiri, tahap kedua mengeluarkan 24.804 baris karena seluruh kiriman sepanjang 31 Maret ikut terbuang.

### Ketepatan per jalur, urut menurut ketepatan

| jalur | kiriman | terlambat | ketepatan | denda |
| --- | --- | --- | --- | --- |
| Makassar ke Pontianak | 930 | 90 | 90,32 | 4.500.000 |
| Jakarta ke Medan | 1.528 | 139 | 90,90 | 6.950.000 |
| Surabaya ke Balikpapan | 1.114 | 98 | 91,20 | 4.900.000 |
| Surabaya ke Malang | 1.386 | 120 | 91,34 | 6.000.000 |
| Jakarta ke Surabaya | 2.687 | 217 | 91,92 | 10.850.000 |
| Jakarta ke Semarang | 2.085 | 167 | 91,99 | 8.350.000 |
| Medan ke Palembang | 1.124 | 89 | 92,08 | 4.450.000 |
| Jakarta ke Bandung | 3.141 | 245 | 92,20 | 12.250.000 |
| Jakarta ke Bogor | 1.357 | 105 | 92,26 | 5.250.000 |
| Surabaya ke Denpasar | 1.599 | 122 | 92,37 | 6.100.000 |
| Jakarta ke Cirebon | 1.123 | 85 | 92,43 | 4.250.000 |
| Semarang ke Yogyakarta | 906 | 68 | 92,49 | 3.400.000 |
| Jakarta ke Makassar | 1.386 | 103 | 92,57 | 5.150.000 |
| Semarang ke Solo | 1.156 | 83 | 92,82 | 4.150.000 |
| Bandung ke Yogyakarta | 1.092 | 78 | 92,86 | 3.900.000 |
| jumlah | 22.614 | 1.809 | 92,00 | 90.450.000 |

### Ketepatan per hari pengambilan

| hari | kiriman | terlambat | ketepatan |
| --- | --- | --- | --- |
| Senin | 3.213 | 242 | 92,47 |
| Selasa | 3.145 | 252 | 91,99 |
| Rabu | 3.235 | 275 | 91,50 |
| Kamis | 3.275 | 253 | 92,27 |
| Jumat | 3.283 | 268 | 91,84 |
| Sabtu | 3.271 | 262 | 91,99 |
| Minggu | 3.192 | 257 | 91,95 |
| jumlah | 22.614 | 1.809 | 92,00 |

### Sepuluh kurir dengan ketepatan terendah

Ambang 30 kiriman. Yang dinilai 500 dari 500 kurir, 0 tersingkir, paling sedikit 33 kiriman, rata-rata 45,2. Kurir ke-11 tercatat 91,30%.

| kurir | kiriman | terlambat | ketepatan | selang 95% |
| --- | --- | --- | --- | --- |
| CRR-395 | 42 | 9 | 78,57 | 64,06 sampai 88,29 |
| CRR-485 | 39 | 8 | 79,49 | 64,47 sampai 89,22 |
| CRR-254 | 41 | 8 | 80,49 | 65,99 sampai 89,77 |
| CRR-281 | 36 | 7 | 80,56 | 64,97 sampai 90,25 |
| CRR-229 | 33 | 6 | 81,82 | 65,61 sampai 91,39 |
| CRR-226 | 46 | 8 | 82,61 | 69,28 sampai 90,91 |
| CRR-033 | 52 | 9 | 82,69 | 70,27 sampai 90,62 |
| CRR-131 | 35 | 6 | 82,86 | 67,32 sampai 91,90 |
| CRR-224 | 41 | 7 | 82,93 | 68,74 sampai 91,47 |
| CRR-357 | 41 | 7 | 82,93 | 68,74 sampai 91,47 |

### Skenario target 97%

| pilihan | kiriman | terlambat | dicegah | penghematan bila 97% tercapai |
| --- | --- | --- | --- | --- |
| tiga terburuk menurut ketepatan | 3.572 | 327 | 220 | Rp 11.000.000 |
| tiga termahal menurut denda | 7.913 | 629 | 391 | Rp 19.550.000 |
| seluruh lima belas jalur | 22.614 | 1.809 | 1.128 | Rp 56.400.000 |

Semua angka di tabel ini berlaku hanya kalau ketepatan jalur yang dipilih mencapai 97%. Sisa keterlambatan pada target dihitung dari volume × 3%, dibulatkan ke bilangan bulat terdekat. Pada pilihan ketiga masih tersisa 681 keterlambatan atau Rp 34.050.000, karena target 97% tidak berarti nol denda.

### Pemeriksaan

| pemeriksaan | jenis | diharapkan | hasil |
| --- | --- | --- | --- |
| rekonsiliasi tertutup di tiap tahap | kebenaran | ya | ya |
| jalur, hari, dan kurir penuh berjumlah sama | kebenaran | 22.614 dan 1.809 | ya, di ketiganya |
| nilai mustahil di ketiga tabel | kebenaran | 0 baris | 0 baris |
| tanggal tiba kosong di penyebut | kebenaran | 0 dari 22.614 | 0 dari 22.614 |
| jumlah denda per jalur sama dengan denda periode | kebenaran | 90.450.000 | 90.450.000 |
| sebaran antarhari cukup lebar untuk menopang kesimpulan | kekuatan | belum diketahui | tidak, 0,97 poin |

Lima pemeriksaan pertama punya jawaban pasti kalau pipeline-nya benar. Yang keenam menilai kekuatan kesimpulan. Pemetaan toDayOfWeek juga dicocokkan dengan tanggal yang harinya diketahui, karena label hari yang tertukar tidak tertangkap pemeriksaan penjumlahan.

### Variasi: Januari sampai Maret 2026 saja

Pada potongan ini (4.401 kiriman terukur, 387 terlambat, ketepatan 91,21%), tiga jalur Jakarta tetap menyumbang denda terbesar dengan 49, 47, dan 45 keterlambatan (36,43% denda triwulan), dan hari pengambilan tetap tidak bisa dibedakan dari kebetulan (rentang 4,62 poin dari sekitar 600 kiriman per hari, p = 0,11). Pernyataan tentang peringkat tidak bertahan. Rentang antarjalur melebar jadi 7,20 poin dan Surabaya ke Balikpapan pindah dari tiga terburuk ke yang terbaik. Jakarta ke Semarang turun ke 88,69%, di bawah rata-rata triwulan. Peringkat kurir tidak bisa disusun sama sekali, karena kurir dengan kiriman terbanyak cuma memegang 16 kiriman dan ambang 30 menyingkirkan ke-500 kurir.

### Kueri yang dijalankan

Pipeline lengkap dengan komentar di tiap keputusan. Berkas 1-Kueri SQL.sql di folder Drive memuat 14 statement, semuanya sudah dijalankan ulang dan menghasilkan angka di halaman ini.

```sql
WITH kiriman_bernomor AS (
    -- Keputusan 1. Salinan lahir dari pemindaian ulang di gudang, berjarak beberapa
    -- detik sampai dua menit. Tidak ada kolom waktu pembuatan baris, jadi yang
    -- disimpan salinan dengan PickupDate paling awal (pemindaian pertama).
    -- Ditolak: DISTINCT, karena salinan berbeda di kolom PickupDate dan tidak
    -- akan terbuang. Di data ini memilih salinan terakhir memberi angka akhir sama.
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY ShipmentID ORDER BY PickupDate ASC) AS urutan
    FROM supply_chain.shipments
),

kiriman_sah AS (
    -- Keputusan 2. Tiga pembuangan bertingkat di satu penyaringan.
    -- toDate(PickupDate) di sisi kiri: PickupDate memuat jam, jadi tanpa toDate()
    -- seluruh kiriman sepanjang 31 Maret ikut terbuang (24.804 alih-alih 24.840).
    -- Tanggal batas ditulis harfiah, bukan today(), supaya hasilnya tetap.
    -- Keputusan 3. Berat nol (58 baris) ikut dibuang bersama berat negatif (42).
    -- Berat tidak dipakai di analisis mana pun. Berat nol dibuang karena barisnya
    -- diisi tanpa penimbangan. Alasan ini lebih lemah daripada untuk berat negatif.
    SELECT *
    FROM kiriman_bernomor
    WHERE urutan = 1
      AND toDate(PickupDate) <= toDate('2026-03-31')
      AND Weight_kg > 0
),

masih_jalan AS (
    -- Keputusan 4. Belum tiba berarti belum bisa dinilai. Dipisahkan, tidak dibuang
    -- dan tidak dihitung. Penyaringnya IS NULL, bukan perbandingan tanggal,
    -- karena perbandingan dengan NULL menghilangkan baris di kedua arah.
    SELECT * FROM kiriman_sah WHERE DeliveryDate IS NULL
),

kiriman_terukur AS (
    -- Satu-satunya dasar seluruh persentase. Dibaca dari kiriman_sah (bercabang),
    -- bukan dari masih_jalan.
    SELECT * FROM kiriman_sah WHERE DeliveryDate IS NOT NULL
),

penanda_lambat AS (
    -- Keputusan 5. Terlambat = DeliveryDate melewati PromisedDate milik kiriman itu.
    -- Ditolak: satu batas lama perjalanan untuk semua jalur, yang menghukum jalur
    -- jauh atas jaraknya. meleset_hari cuma keterangan, bukan penentu.
    SELECT *,
        CASE WHEN DeliveryDate > PromisedDate THEN 1 ELSE 0 END AS terlambat,
        dateDiff('day', PromisedDate, DeliveryDate) AS meleset_hari
    FROM kiriman_terukur
),

per_jalur AS (
    -- Denda dihitung dari CACAH (lambat * 50000), bukan dari persen yang sudah
    -- dibulatkan. Pembulatan persen dilakukan sekali, di akhir.
    SELECT
        concat(OriginCity, ' ke ', DestCity) AS jalur,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan,
        countIf(terlambat = 1) * 50000 AS denda
    FROM penanda_lambat
    GROUP BY jalur
),

per_hari AS (
    -- toDayOfWeek: 1 Senin sampai 7 Minggu. Sudah dicocokkan dengan
    -- tanggal yang harinya diketahui: 2025-01-06 = 1 (Senin), 2026-03-29 = 7 (Minggu),
    -- 2026-03-31 = 2 (Selasa). Tidak ada kolom denda, karena hari ambil tidak bisa
    -- ditindaklanjuti.
    SELECT
        toDayOfWeek(PickupDate) AS hari,
        ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'][toDayOfWeek(PickupDate)] AS nama_hari,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan
    FROM penanda_lambat
    GROUP BY hari, nama_hari
),

per_kurir_penuh AS (
    -- Tabel penuh tanpa ambang dan tanpa LIMIT, dipakai pemeriksaan penjumlahan.
    SELECT
        CourierID,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan
    FROM penanda_lambat
    GROUP BY CourierID
),

per_kurir AS (
    -- Keputusan 6. Ambang kelayakan 30 kiriman, ditulis SEBELUM peringkat dilihat.
    -- Di data penuh ia tidak menyingkirkan seorang pun (paling sedikit 33 kiriman),
    -- dan tetap ditulis. Selang Wilson 95% menyertai tiap baris karena tiap kurir
    -- cuma memegang sekitar 45 kiriman.
    SELECT
        CourierID,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan,
        countIf(terlambat = 0) / count() AS p_tepat,
        round((p_tepat + 1.96 * 1.96 / (2 * kiriman)
            - 1.96 * sqrt(p_tepat * (1 - p_tepat) / kiriman + 1.96 * 1.96 / (4 * kiriman * kiriman)))
            / (1 + 1.96 * 1.96 / kiriman) * 100, 2) AS selang_bawah,
        round((p_tepat + 1.96 * 1.96 / (2 * kiriman)
            + 1.96 * sqrt(p_tepat * (1 - p_tepat) / kiriman + 1.96 * 1.96 / (4 * kiriman * kiriman)))
            / (1 + 1.96 * 1.96 / kiriman) * 100, 2) AS selang_atas
    FROM penanda_lambat
    GROUP BY CourierID
    HAVING count() >= 30
    ORDER BY ketepatan ASC, CourierID ASC
    LIMIT 10
),

kiriman_berisiko AS (
    -- TANTANGAN C. Keputusan 7. Sudah lewat janji = tanggal janji jatuh pada atau
    -- sebelum 2026-03-31 (toDate di sisi kiri, sama dengan aturan tanggal ambil,
    -- jadi janji sepanjang 31 Maret dihitung sudah lewat). Kalau dibuat ketat
    -- (sebelum 31 Maret), cacahnya 2.108.
    -- Jarak hari dihitung dari tanggal janji ke tanggal batas 2026-03-31, dalam
    -- hari kalender. Bukan dari tanggal ambil, karena yang diukur lewatnya janji.
    -- ATURAN: cacah ini TIDAK dijumlahkan dengan 1.809 dan TIDAK dikalikan 50000.
    SELECT
        count() AS berisiko,
        round(avg(dateDiff('day', toDate(PromisedDate), toDate('2026-03-31'))), 1) AS rata_hari_lewat
    FROM masih_jalan
    WHERE toDate(PromisedDate) <= toDate('2026-03-31')
)

SELECT jalur, kiriman, lambat AS terlambat, ketepatan, denda
FROM per_jalur
ORDER BY ketepatan ASC;
```
