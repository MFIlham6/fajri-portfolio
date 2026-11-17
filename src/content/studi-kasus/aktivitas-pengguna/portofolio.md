**Pemakai fitur sosial di pekan pertama 6,84 poin lebih sering kembali, dan ukuran percobaan menentukan uji mana yang berjalan lebih dulu**

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, kueri lengkap dan berkas pemeriksaan: folder Google Drive, mfajriilhamn@gmail.com

Perusahaan, tokoh, dan datanya rekaan untuk bahan latihan. Pekerjaan ini studi kasus dan tidak berasal dari pengalaman kerja di perusahaan mana pun.

## Konteks

Sebuah layanan tayangan video berlangganan punya 10.000 pengguna terdaftar, dan 2.153 di antaranya beraktivitas selama periode data. Pendapatannya datang dari langganan dan iklan di dalam tayangan. Keduanya bergantung pada seberapa sering orang kembali: pelanggan yang jarang membuka aplikasi tidak merasakan nilai langganannya ketika tagihan datang, dan setiap kunjungan adalah tempat menayangkan iklan.

Karena itu ukuran yang dipantau adalah rasio pengguna aktif harian terhadap pengguna aktif bulanan, yang di industri ini disebut stickiness. Target internalnya 35%, dan angkanya tidak bergerak berbulan-bulan. Kepala produk memegang anggaran pengembangan fitur Rp 500 juta untuk satu kuartal, dengan empat calon yang beredar di rapat: fitur sosial, rekomendasi tayangan, permainan berhadiah, dan menonton luring. Tidak satu pun punya bukti.

## Pertanyaan dan data

Pertanyaannya: fitur mana yang layak dibiayai lebih dulu, dan atas dasar apa. Bahannya satu tabel peristiwa aplikasi, satu baris untuk satu aktivitas satu pengguna pada satu tanggal, 1 Juli 2025 sampai 31 Maret 2026. Ada 60.000 baris mentah, 57.051 sesudah dibersihkan, 2.153 pengguna, dan 274 hari tanpa satu pun hari kosong. Rata-rata tiap pengguna hanya meninggalkan 26,5 aktivitas selama sembilan bulan.

Yang tidak ada di tabel: pendapatan, biaya, status langganan, tanggal pendaftaran, dan hasil percobaan apa pun. Akibatnya tidak ada angka rupiah yang bisa dihitung dari pekerjaan ini, dan tidak ada klaim sebab-akibat yang bisa dibuktikan.

## Pendekatan

Saya memakai rasio harian terhadap bulanan untuk melihat keadaan, lalu membandingkan tingkat kembali dua kelompok pengguna menurut perilaku pekan pertama mereka. Rasio menangkap frekuensi, dan perbandingan kohort menghubungkan frekuensi itu dengan siapa yang kembali. Kurva retensi penuh tidak dipakai karena sembilan bulan hanya cukup untuk kohort paling awal, yang justru paling tidak bisa dipercaya. Durasi sesi dipakai sebagai pelengkap untuk menguji satu dugaan.

Keputusan yang saya tulis sebelum melihat hasil:

Semua cacah pengguna memakai COUNT(DISTINCT UserID), dan pembilang stickiness adalah rata-rata pengguna harian dalam sebulan.

Ditolak: COUNT(*). Rata-rata hariannya jadi 208,2 alih-alih 204,4, rasionya tetap terlihat wajar, dan kesalahannya tidak akan ketahuan.

Dedup memilih satu baris per ActivityID dengan tiga kunci: tanggal paling awal, lalu jenis yang terisi, lalu durasi terpanjang.

Ditolak: memungut salinan sembarang. Cacah barisnya sama, 58.500, tetapi jenis kosong yang lolos jadi 795 alih-alih 779 dan hasilnya tidak bisa diulang.

Sesi berdurasi nol atau negatif dibuang, karena yang diukur keterlibatan, dan membuka aplikasi tanpa menonton apa pun tidak dihitung.

Ditolak: menghitung sesi nol sebagai aktif. Itu sah untuk mengukur jangkauan, tetapi anggaran ini ditujukan untuk membuat orang tinggal lebih lama.

Jendela pemaparan hari ke-0 sampai ke-7 dan jendela kembali hari ke-25 sampai ke-35, dihitung dari aktivitas pertama tiap orang. Batas kelayakan, 24 Februari 2026, diturunkan dari jendela kembali.

Ditolak: menilai semua pengguna. Tiga puluh lima pengguna terakhir tidak mungkin terlihat kembali karena datanya berakhir, dan tingkat kembali kedua kelompok turun sekitar satu poin tanpa ada perilaku yang berubah.

Ambang segmen teratas lebih dari 10 aktivitas sebulan, disebut setiap kali angkanya disebut.

Ditolak: memilih ambang sesudah melihat hasil. Pada ambang 8 segmen teratas menyumbang 51,03% aktivitas, pada ambang 12 hanya 9,94%, dari data yang sama.

Sesudah perbandingan utama keluar, saya menambahkan empat pemeriksaan sendiri: memisahkan kohort Juli 2025 yang bercampur pengguna lama, menyamakan jumlah hari aktif di pekan pertama beserta selangnya, menghitung berapa orang yang dibutuhkan sebuah percobaan, dan membandingkan pola pengguna yang pertama terlihat dengan pola yang muncul tanpa pendaftar baru sama sekali.

## Temuan 1

Pengguna yang pertama kali terlihat di data turun dari 340 pada Agustus 2025 menjadi 25 pada Maret 2026, sementara pengguna aktif bulanan tetap di 808 sampai 840. Angka ini belum tentu berarti pendaftar baru berkurang. Tabel tidak memuat tanggal daftar, dan rata-rata tiap pengguna aktif di 38,2% bulan yang ada (7.396 pasangan pengguna dan bulan, dari 2.153 pengguna dan 9 bulan). Sekelompok pengguna lama dengan peluang aktif sebesar itu, tanpa satu pun pendaftar baru, akan pertama kali terlihat sebanyak 515 orang pada Agustus dan 18 orang pada Maret, turun 96,5%. Pola di data mirip pola itu, jadi penurunan 340 ke 25 bisa datang dari pengguna lama yang baru muncul, dari pendaftar yang berkurang, atau dari keduanya.

Akibatnya untuk anggaran: percobaan pada pendaftar baru belum bisa dijadwalkan sebelum tim data menyebut jumlah pendaftar baru per bulan, dan ukurannya lebih besar dari yang terlihat. Untuk menangkap selisih 6,84 poin dari Temuan 3 dengan peluang 80% pada taraf 5%, butuh sekitar 798 orang per kelompok, atau sekitar 1.600 orang. Ajakan berbagi hanya menggerakkan sebagian peserta, jadi efek pada seluruh kelompok akan lebih kecil. Kalau tinggal 2 poin, kebutuhannya sekitar 9.437 orang per kelompok. Selisih mentah 8,46 poin hanya butuh 511 orang per kelompok, tetapi angka itu masih memuat perbedaan jenis pengguna.

**Gambar 1. Pengguna yang pertama kali terlihat di data, per bulan**

![gambar 1](images/gambar-1.png)

Apa yang tergambar. Cacah pengguna yang aktivitas pertamanya di dalam data jatuh pada bulan itu, batang tegak dari nol. Angka ini tidak sama dengan pendaftar baru karena tabel tidak memuat tanggal daftar. Maret 2026 diberi warna merah.

Rentang data. Agustus 2025 sampai Maret 2026, data bersih. Juli 2025 tidak digambar karena siapa pun yang aktif sebelum data dimulai tercatat pertama kali di Juli.

Yang terlihat. Batang menurun tiap bulan, dari 340 ke 25, turun 92,65%, sementara pengguna aktif bulanan pada periode yang sama tetap 808 sampai 840.

## Temuan 2

Stickiness bergerak di antara 24,17% dan 27,08% selama sembilan bulan, rentang 2,91 poin, tanpa arah naik yang bertahan. Maret 2026 24,32%. Target 35% setara 294 pengguna aktif harian dari 838 pengguna bulanan Maret, sedangkan yang tercatat 204, kurang 90 orang setiap hari. Bulan terbaik, Februari 2026, masih 7,92 poin di bawah target. Rata-rata harian Februari 227 orang, sedangkan campuran 8 hari akhir pekan dan 20 hari kerja bulan itu hanya memperkirakan 204,4 (akhir pekan rata-rata 228,8, hari kerja 194,7). Pengguna bulanannya 840, hampir sama dengan Maret, jadi kenaikannya datang dari kunjungan yang lebih sering, dan hari akhir pekan tidak menjelaskannya.

Target berada di luar seluruh rentang yang pernah dicapai, jadi ia tidak akan tercapai lewat perbaikan kecil. Februari adalah satu-satunya contoh kenaikan yang dituju target, dan tim produk perlu ditanya apa yang berjalan bulan itu.

**Gambar 2. Stickiness bulanan terhadap target internal**

![gambar 2](images/gambar-2.png)

Apa yang tergambar. Rata-rata pengguna aktif harian dibagi pengguna aktif bulanan, per bulan, sebagai garis merah, dengan garis putus-putus hitam di target 35%. Sumbu tegak mulai dari 22%.

Rentang data. Juli 2025 sampai Maret 2026, 57.051 baris bersih.

Yang terlihat. Garis merah bergerak di antara 24,17% dan 27,08%, dengan satu puncak di Februari. Jarak titik tertinggi ke garis target 7,92 poin.

## Temuan 3

Dari 2.118 pengguna yang jendela 30 harinya utuh, mereka yang menyentuh berbagi atau komentar dalam tujuh hari pertama kembali 67,22% (687 dari 1.022), dibanding 58,76% (644 dari 1.096) pada yang tidak. Selisihnya 8,46 poin, dengan selang kepercayaan 95% dari 4,37 sampai 12,56 poin, jadi terlalu besar untuk kebetulan. Penyebabnya belum diketahui.

Pemeriksaan tambahan menunjukkan bahwa sebagian selisih ini datang dari jenis penggunanya. Pemakai fitur sosial sudah lebih rajin sejak awal: pada kohort Agustus 2025 dan sesudahnya, mereka aktif rata-rata 3,62 hari di pekan pertama, lawan 2,91 hari. Kalau jumlah hari aktif pekan pertama disamakan, selisihnya menjadi 6,84 poin (rata-rata tertimbang tiga lapisan di Gambar 3, selang 95% 2,72 sampai 10,96 poin). Angka ini kemungkinan masih terlalu tinggi, karena lapisan 3 hari atau lebih menampung orang yang aktif 3 sampai 8 hari, dan pemakai fitur sosial lebih banyak di ujung atasnya. Per lapisan, hanya lapisan 2 hari yang jelas terpisah dari nol (11,40 ± 8,16 poin), sedangkan lapisan 1 hari (3,09 ± 12,05 poin) terlalu kecil untuk dibaca sendiri. Berbagi saja, komentar saja, dan keduanya memberi angka berdekatan, 66,32% sampai 69,89%, sehingga tidak ada satu fitur yang menonjol. Satu hal lagi: 1.997 dari 2.153 pengguna aktif (92,75%) pernah memakai fitur sosial selama sembilan bulan, jadi ruang yang tersisa ada di pekan pertama.

Temuan ini cukup untuk memutuskan apa yang diuji, dan belum cukup untuk membangun fitur dengan seluruh anggaran.

**Gambar 3. Tingkat kembali 30 hari, dengan dan tanpa fitur sosial di pekan pertama**

![gambar 3](images/gambar-3.png)

Apa yang tergambar. Persen pengguna yang aktif lagi pada hari ke-25 sampai ke-35 sejak aktivitas pertamanya, untuk seluruh kohort lalu dipecah menurut jumlah hari aktif di pekan pertama. Sumbu dari nol.

Rentang data. 2.118 pengguna dengan aktivitas pertama paling lambat 24 Februari 2026. 35 pengguna sesudah tanggal itu dikeluarkan.

Yang terlihat. Batang merah lebih panjang di keempat pasang. Jaraknya 8,46 poin untuk seluruh kohort, lalu 3,09, 11,40, dan 5,61 poin setelah jumlah hari aktif disamakan. Gambar ini menunjukkan hubungan dan tidak menunjukkan sebab.

## Temuan 4

Dua dugaan yang beredar sebelum analisis belum didukung data. Rata-rata durasi sesi ponsel, web, dan televisi pintar berjarak paling jauh 0,3 menit (26,9 sampai 27,2 menit). Dengan simpangan baku 17,45 menit dan cacah aktivitas sebesar ini, selisih terkecil yang bisa tertangkap sekitar 0,5 menit, jadi tidak ada selisih durasi di atas itu. Durasi juga belum menjawab apakah orang lebih sering kembali di platform tertentu, dan 1.272 dari 2.153 pengguna memakai ketiga platform. Segmen teratas berisi 157 pengguna atau 18,74% dari 838 pengguna Maret dan menyumbang 29,68% aktivitas, angka yang mengikuti definisi segmennya sendiri. Apa yang mereka lakukan berbeda belum diketahui.

Memperbaiki satu platform dan menyasar segmen teratas tidak masuk daftar uji kuartal ini. Dugaan soal platform bisa diuji ulang dengan stickiness per platform kalau diperlukan.

## Rekomendasi dan pembagian anggaran

Langkah pertama tidak butuh biaya: tanyakan ke tim data berapa pendaftar baru per bulan, dan ke tim produk apa yang berjalan pada Februari 2026. Sesudah itu:

| langkah | anggaran | yang diuji dan syaratnya |
|---|---|---|
| uji rekomendasi tayangan pada pengguna lama, diundi, mulai sekarang | Rp 150 juta | apakah rekomendasi yang lebih baik menambah frekuensi kunjungan, bentuk kenaikan yang terjadi di Februari; dipilih karena pesertanya sudah tersedia, dan data ini tidak memuat petunjuk tentang rekomendasi |
| uji ajakan berbagi di pekan pertama pada pendaftar baru, diundi | Rp 150 juta | apakah mendorong berbagi mengubah tingkat kembali; mulai kalau pendaftar baru cukup untuk sekitar 1.600 orang dalam satu kuartal, atau lebih kalau efeknya lebih kecil |
| cadangan perluasan | Rp 200 juta | dilepas hanya untuk percobaan yang lolos ukuran keberhasilan yang ditulis sebelum percobaan berjalan |

Besaran Rp 150 juta per percobaan adalah asumsi biaya membangun dan mengukur satu fitur selama satu kuartal, tidak dihitung dari data. Permainan berhadiah dan menonton luring belum dibiayai karena data tidak memuat petunjuk tentang keduanya. Ukuran keberhasilan sengaja tidak saya tetapkan, karena itu keputusan produk. Yang bisa saya sediakan adalah hitungan berapa orang yang dibutuhkan untuk tiap besaran selisih.

## Batas

- Selisih tingkat kembali, 8,46 poin mentah atau 6,84 poin sesudah disamakan, adalah hubungan. Percobaan diusulkan karena hubungan saja tidak menunjukkan sebab.
- Target 35% dan anggaran Rp 500 juta datang dari keputusan internal, tidak diturunkan dari data.
- Kenaikan pendapatan dan ROI tidak bisa dihitung karena tidak ada satu pun angka rupiah di data, dan pekerjaan ini tidak memuat proyeksi kenaikan stickiness.
- Sembilan bulan berarti tiap bulan muncul sekali, jadi pola musiman tidak bisa dipisahkan dari perubahan sungguhan. Tanpa tanggal daftar, pendaftar baru juga tidak bisa dipisahkan dari pengguna lama yang baru muncul.

## Cara memeriksa

Kuerinya satu berkas berisi delapan belas statement di folder Google Drive, dengan batas tanggal tetap 31 Maret 2026 dan tanpa today(), sehingga siapa pun mendapat angka yang sama. Rangkaian tiga belas tahap bernama dari deduped_activity sampai feature_retention ada di statement pertama, lengkap dengan komentar tiap keputusan. Tujuh pemeriksaan konsistensi dijalankan atas keluaran terakhir dan semuanya lolos: pengguna harian tidak pernah melebihi pengguna bulanan di 274 hari, stickiness berada di 24,17% sampai 27,08%, jumlah bauran aktivitas sama dengan 57.051 baris bersih, tidak ada platform yang penggunanya melebihi 2.153, ketiga segmen tiap bulan berjumlah sama dengan pengguna bulanan bulan itu, tidak ada jenis kosong atau tanggal lewat batas atau durasi nonpositif di data bersih, dan yang kembali tidak pernah melebihi anggota kelompoknya. Angka di balik ketiga gambar ada di lembar 5-Data Grafik di folder yang sama. Ukuran percobaan, selang untuk selisih yang disamakan, dan pembanding pengguna yang pertama terlihat dihitung di luar kueri dari tabel di bawah, dengan rumus yang tertulis di 3-Hasil Kueri.

## Laporan data

Seluruh tabel di bawah berasal dari kueri yang dijalankan di ClickHouse Labs pada 17 Oktober 2026, periode 1 Juli 2025 sampai 31 Maret 2026 dengan batas tanggal tetap 31 Maret 2026, dan disusun mengikuti urutan pipeline. Tidak ada penafsiran baru di bagian ini.

## Rekonsiliasi pembersihan

| tahap | sebelum | terbuang | sesudah |
|---|---|---|---|
| dedup ActivityID | 60.000 | 1.500 | 58.500 |
| jenis kosong dan tanggal lewat batas | 58.500 | 973 | 57.527 |
| durasi nol atau negatif | 57.527 | 476 | 57.051 |
| jumlah | 60.000 | 2.949 | 57.051 |

| cacat, dihitung dari hasil dedup | baris | porsi baris mentah |
|---|---|---|
| ActivityType kosong | 779 | 1,30% |
| ActivityDate sesudah 31 Maret 2026 | 195 | 0,33% |
| durasi sesi nol atau negatif | 485 | 0,81% |

Tabel pertama mencatat baris yang terbuang di tiap tahap dan boleh dijumlahkan. Tabel kedua mencatat baris yang memikul tiap cacat dan tidak boleh dijumlahkan: ketiganya berjumlah 1.459, sedangkan yang terbuang sesudah dedup 1.449, karena 10 baris memikul dua cacat sekaligus. Pengguna: 2.167 di data mentah, tetap 2.167 sesudah dedup, 2.153 sesudah pembersihan karena 14 orang seluruh barisnya cacat.

## Cacah baris tiap tahap

| tahap | baris | tahap | baris |
|---|---|---|---|
| deduped_activity | 58.500 | user_monthly | 7.396 |
| clean_activity | 57.051 | power_users | 27 |
| daily_active | 274 | user_cohort | 2.118 |
| monthly_active | 9 | initial_behavior | 2.118 |
| stickiness | 9 | retention_base | 2.118 |
| activity_mix | 6 | feature_retention | 2 |
| platform_split | 3 |  |  |

## Sembilan bulan

| bulan | pengguna bulanan | rata-rata harian | stickiness | harian terendah | harian tertinggi | aktivitas | porsi akhir pekan | pertama terlihat |
|---|---|---|---|---|---|---|---|---|
| Jul 2025 | 780 | 191 | 24,49% | 165 | 235 | 6.030 | 25,81% | 780 |
| Agu 2025 | 808 | 196 | 24,29% | 169 | 225 | 6.196 | 32,26% | 340 |
| Sep 2025 | 840 | 215 | 25,55% | 187 | 274 | 6.557 | 26,67% | 280 |
| Okt 2025 | 818 | 198 | 24,17% | 174 | 234 | 6.242 | 25,81% | 220 |
| Nov 2025 | 818 | 206 | 25,22% | 175 | 249 | 6.302 | 33,33% | 175 |
| Des 2025 | 833 | 205 | 24,62% | 176 | 249 | 6.474 | 25,81% | 145 |
| Jan 2026 | 821 | 200 | 24,42% | 173 | 234 | 6.328 | 29,03% | 120 |
| Feb 2026 | 840 | 227 | 27,08% | 196 | 269 | 6.486 | 28,57% | 68 |
| Mar 2026 | 838 | 204 | 24,32% | 176 | 244 | 6.436 | 29,03% | 25 |
| seluruh | 2.153 berbeda | 204,4 | 24,17 sampai 27,08% | 165 | 274 | 57.051 |  |  |

Pengguna yang pertama terlihat pada Juli 2025 (780) pasti memuat pengguna lama, dan bulan sesudahnya bisa juga, karena tabel tidak memuat tanggal daftar. Rata-rata pengguna harian 194,7 pada 196 hari kerja dan 228,8 pada 78 hari akhir pekan, akhir pekan 17,49% lebih tinggi. Rata-rata harian antarbulan hanya bergerak dari 191 sampai 227.

## Bauran aktivitas

| jenis | aktivitas | porsi aktivitas | pengguna unik | rata-rata per pengguna |
|---|---|---|---|---|
| Watch | 20.096 | 35,22% | 2.135 | 9,41 |
| Search | 10.170 | 17,83% | 2.013 | 5,05 |
| Share | 8.680 | 15,21% | 1.824 | 4,76 |
| Like | 7.530 | 13,20% | 1.888 | 3,99 |
| Comment | 7.016 | 12,30% | 1.712 | 4,10 |
| Download | 3.559 | 6,24% | 1.503 | 2,37 |
| jumlah | 57.051 | 100,00% |  |  |

Share lebih tinggi dari Like menurut cacah aktivitas dan lebih rendah menurut pengguna unik.

## Platform

| platform | pengguna unik | aktivitas | rata-rata durasi sesi |
|---|---|---|---|
| Mobile | 1.887 | 28.619 | 26,9 menit |
| Web | 1.729 | 17.843 | 27,2 menit |
| SmartTV | 1.651 | 10.589 | 27,0 menit |

Pengguna unik tidak boleh dijumlahkan: 311 pengguna memakai satu platform, 570 dua platform, 1.272 ketiganya. Durasi rata-rata seluruh baris 27,0 menit, simpangan baku 17,45 menit.

## Segmen pengguna, Maret 2026

| segmen | aktivitas sebulan | pengguna | porsi pengguna | aktivitas | porsi aktivitas |
|---|---|---|---|---|---|
| Power | lebih dari 10 | 157 | 18,74% | 1.910 | 29,68% |
| Middle | 5 sampai 10 | 573 | 68,38% | 4.154 | 64,54% |
| Casual | kurang dari 5 | 108 | 12,89% | 372 | 5,78% |
| jumlah |  | 838 | 100,00% | 6.436 | 100,00% |

| ambang segmen teratas | pengguna | porsi pengguna | porsi aktivitas |
|---|---|---|---|
| lebih dari 8 | 302 | 36,04% | 51,03% |
| lebih dari 10 | 157 | 18,74% | 29,68% |
| lebih dari 12 | 45 | 5,37% | 9,94% |

## Kohort tingkat kembali

| kelompok | pengguna | kembali | tingkat kembali |
|---|---|---|---|
| Social Early | 1.022 | 687 | 67,22% |
| berbagi dan berkomentar | 186 | 130 | 69,89% |
| hanya berkomentar | 358 | 240 | 67,04% |
| hanya berbagi | 478 | 317 | 66,32% |
| No Social Early | 1.096 | 644 | 58,76% |

Selisih 8,46 poin, selang kepercayaan 95% 4,37 sampai 12,56 poin (pendekatan normal untuk selisih dua proporsi). Tanpa batas kelayakan: 66,44% dari 1.034 lawan 57,55% dari 1.119.

| kohort dan kelompok | pengguna | kembali | tingkat kembali | hari aktif pekan pertama |
|---|---|---|---|---|
| kohort Juli 2025, No Social Early | 392 | 239 | 60,97% | 2,52 |
| kohort Juli 2025, Social Early | 388 | 253 | 65,21% | 2,81 |
| kohort Agustus 2025 dst, No Social Early | 704 | 405 | 57,53% | 2,91 |
| kohort Agustus 2025 dst, Social Early | 634 | 434 | 68,45% | 3,62 |

Kohort Juli 2025 pasti bercampur pengguna lama, dan kohort sesudahnya bisa juga. Selisihnya 4,24 poin pada kohort Juli dan 10,92 poin pada kohort sesudahnya. Selang 95% tiap lapisan pada tabel berikut: 1 hari ± 12,05 poin, 2 hari ± 8,16 poin, 3 hari atau lebih ± 5,18 poin. Rata-rata tertimbangnya 6,84 poin, selang 2,72 sampai 10,96 poin.

| hari aktif pekan pertama | pengguna tanpa sosial | tingkat kembali | pengguna dengan sosial | tingkat kembali | selisih |
|---|---|---|---|---|---|
| 1 hari | 189 | 52,91% | 100 | 56,00% | 3,09 poin |
| 2 hari | 328 | 51,52% | 240 | 62,92% | 11,40 poin |
| 3 hari atau lebih | 579 | 64,77% | 682 | 70,38% | 5,61 poin |
