Studi kasus antrean prioritas tinjauan, dikerjakan dengan SQL

# Di balik 1.395 transaksi yang perlu ditinjau ada 56 orang, dan menurunkan ambang akan menyentuh 2.581 orang tanpa menambah satu pemeriksaan

Tim risiko sebuah dompet digital hanya sanggup meninjau 200 kasus sehari dari sekitar 50.000 transaksi. Saya membangun antrean prioritas dari empat isyarat perilaku dan memeriksa apa saja yang ditentukan oleh ambang dan bobotnya.

Mochamad Fajri Ilham Nurdin · dikerjakan Oktober 2026 · kueri dan berkas pemeriksaan: [folder Google Drive](https://drive.google.com/drive/folders/1dNayzpUA-FOX7Diu8NGoEzT-vdKCQ91R) · mfajriilhamn@gmail.com

Catatan data: angka di halaman ini dihitung dari dataset latihan yang dirancang meniru pola transaksi dompet digital. Perusahaan dan datanya rekaan, dan pekerjaan ini tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## 1. Ringkasan

Dengan kapasitas tinjauan 200 kasus per hari dan volume sekitar 50.000 transaksi, hanya 0,4% transaksi yang bisa dilihat manusia, sehingga urutan pemeriksaan menentukan siapa yang diperiksa. Empat isyarat perilaku menghasilkan antrean 1.395 transaksi milik 56 pengguna selama 15 bulan, dengan puncak 14 transaksi (satu pengguna) dalam sehari. Saran saya: tinjau per pengguna, catat hasil tiap tinjauan sebagai label, dan biarkan ambangnya, karena menurunkannya menaikkan jumlah orang yang tersentuh 46 kali lipat sementara kapasitasnya tetap.

## 2. Kenapa laporan ini ada

Hanya 0,4% transaksi yang bisa diperiksa manusia, dan belum ada cara tertulis untuk memutuskan mana yang diperiksa. Daftar yang dibutuhkan harus terbit tiap pagi dengan cara yang sama, diurutkan, dengan alasan untuk tiap baris, dan bisa dihitung ulang orang lain.

Jalan pintas yang paling wajar adalah menurunkan ambang supaya lebih banyak transaksi masuk daftar. Kapasitas tinjauan tidak ikut naik, jadi daftar yang lebih panjang tidak menambah pemeriksaan. Yang berubah hanya siapa yang mengisi dua ratus baris teratas, dan siapa yang masuk daftar tanpa pernah dibuka. Jalan pintas kedua, memeriksa dari transaksi bernilai terbesar, mengabaikan bahwa yang dicari adalah pola perilaku, bukan nominal.

## 3. Data dan batasnya

Satu tabel transaksi: 101.039 baris dari 8.000 pengguna, Januari 2025 sampai Maret 2026, tujuh kolom (identitas transaksi, pengguna, waktu, nilai, kota, pedagang, perangkat). Pembersihan mengeluarkan 2.142 baris (2,12%) dalam tiga tahap yang masing-masing tercatat: 1.200 salinan dari kiriman ulang, 148 berstempel sesudah akhir periode, dan 794 pengembalian dana yang dipisahkan. 492 transaksi tanpa pedagang tetap dinilai. Pengguna unik tetap 8.000 di setiap tahap.

Yang tidak ada di data menentukan apa yang boleh saya klaim. Tidak ada hasil tinjauan manusia, jadi ketepatan, keterjaringan, dan laju positif palsu tidak bisa dihitung, dan tidak ada angka seperti itu di halaman ini. Tidak ada keluhan pelanggan, alasan transaksi, jarak antarkota, atau kategori pedagang.

## 4. Yang saya kerjakan

Pekerjaannya tujuh langkah tetap: membersihkan transaksi, menghitung empat isyarat perilaku satu per satu, menggabungkannya menjadi satu skor berbobot, menerjemahkan skor menjadi tingkat prioritas, lalu memvalidasi bentuk keluarannya sebelum daftar apa pun diserahkan. Keempat isyarat bisa dijelaskan dalam satu kalimat sehari-hari: transaksi beruntun yang terlalu cepat, nilai yang jauh di atas kebiasaan pemiliknya, perpindahan kota yang terlalu cepat, dan terlalu banyak perangkat dalam sehari. Pembersihan berjalan empat tahap, tiga mengeluarkan baris dan satu menahan serta menandai, dan tiap tahap tercatat angkanya. Setiap lapisan kueri hanya menambah satu kolom, sehingga cacah barisnya wajib sama dan penyaringan yang tidak disengaja langsung terlihat. Tiga keputusan saya tulis sebelum kueri analisis pertama.

**Yang dihasilkan adalah urutan prioritas tinjauan dengan tingkat Rendah, Sedang, dan Tinggi.** Nama kolomnya menyebut apa yang diukur (velocity_flag, risk_score, risk_level), dan antreannya disusun per pengguna: satu orang menjadi satu kasus, dengan isyarat mana yang menyala.

Ditolak: penanda curang atau tidak curang. Data tidak memuat satu pun hasil pemeriksaan yang bisa menopangnya, dan label seperti itu akan dibaca sebagai daftar tersangka.

**Isyarat digabungkan dengan bobot yang dijumlahkan, lalu dipotong dua ambang.** Keempat aturan saya terjemahkan persis seperti diberikan tim risiko. Kecepatan memakai jendela lima baris, bukan jendela sepuluh menit, karena aturannya berbunyi lima transaksi, dan rata-rata untuk isyarat jumlah tidak menyertakan transaksi yang sedang diukur.

Ditolak: model yang dilatih dari data. Melatih model menuntut contoh berlabel, dan data ini tidak punya satu pun. Tanpa label, model hanya akan mempelajari ulang aturan yang sama dalam bentuk yang jauh lebih sulit dijelaskan kepada pemeriksa kepatuhan. Penolakan ini berlaku sampai hasil tinjauan terkumpul.

**Ambang dan bobot berstatus aturan latihan yang belum dikalibrasi, dan status itu saya tulis di setiap tempat angkanya muncul.**

Ditolak: menyetel ambang sampai jumlah keluarannya terasa pas. Cara itu paling lazim, dan hasilnya angka tanpa dasar yang mengubah siapa yang diperiksa.

## 5. Gambar

**Gambar 1. Beban harian antrean dibandingkan kapasitas tinjauan**

![gambar 1](images/fig-1.svg)

*Apa yang tergambar: Pengguna terbanyak dan transaksi terbanyak yang masuk antrean dalam satu hari, di samping kapasitas tim, semuanya dalam kasus per hari.*

*Rentang data: 98.897 transaksi bersih dari 8.000 pengguna, 1 Januari 2025 sampai 31 Maret 2026.*

*Yang terlihat: Dua batang atas berhenti di 3 dan 14. Batang bawah mencapai 200, ujung sumbu.*

**Gambar 2. Kombinasi isyarat yang menyusun antrean**

![gambar 2](images/fig-2.svg)

*Apa yang tergambar: Cacah transaksi tiap kombinasi isyarat yang masuk antrean, dengan jumlah penggunanya.*

*Rentang data: 1.395 transaksi di antrean, milik 56 pengguna, periode yang sama.*

*Yang terlihat: Batang lokasi + perangkat berhenti di 1.279 dan memuat ke-56 pengguna. Empat batang lain berhenti di 42, 34, 31, dan 9.*

**Gambar 3. Pengguna yang tersentuh pada tiga posisi ambang**

![gambar 3](images/fig-3.svg)

*Apa yang tergambar: Jumlah pengguna dengan sedikitnya satu transaksi di antrean, pada ambang Sedang 60, 40 (dipakai), dan 25. Aturan isyarat dan bobotnya sama.*

*Rentang data: Sama seperti Gambar 1.*

*Yang terlihat: Batang bawah berhenti di 2.581, hampir di ujung sumbu. Batang tengah berhenti di 56 dan batang atas di 9.*

**Gambar 4. Isyarat jumlah dan transaksi di atas Rp 2 juta, per bulan**

![gambar 4](images/fig-4.svg)

*Apa yang tergambar: Per bulan, transaksi yang menyalakan isyarat jumlah (hijau) dan transaksi bernilai di atas Rp 2 juta (abu-abu).*

*Rentang data: Sama seperti Gambar 1.*

*Yang terlihat: Kedua batang hampir sama tinggi di setiap bulan. Sampai Oktober 2025 keduanya di bawah 40, lalu naik setiap bulan sampai 674 pada Maret 2026.*

## 6. Temuan

1. **Antrean terkonsentrasi pada sedikit orang.** Dari 98.897 transaksi bersih, 1.395 masuk antrean, dan seluruhnya milik 56 pengguna: median 28 transaksi per orang, tersebar di 2 sampai 7 hari. Dalam satu hari paling banyak 3 orang masuk antrean, dengan puncak 14 transaksi milik satu orang. Antrean ini muat jauh di bawah kapasitas, jadi yang perlu diatur adalah cara membukanya: per pengguna, bukan per transaksi.
2. **Menurunkan ambang menambah orang, tidak menambah pemeriksaan.** Ambang Sedang yang diturunkan lima belas poin menaikkan antrean menjadi 4.872 transaksi, dan pengguna yang tersentuh dari 56 menjadi 2.581. Kapasitas tetap 200 kasus per hari, jadi tidak satu pun pemeriksaan bertambah. Menaikkan ambang ke tiga isyarat menyisakan 9 transaksi milik 9 pengguna.
3. **Bobot yang berbeda-beda belum membedakan apa pun.** Tingkat ditentukan sepenuhnya oleh berapa isyarat yang menyala: satu isyarat Rendah, dua Sedang, tiga Tinggi. Bobot yang disamakan untuk keempat isyarat menghasilkan antrean yang sama persis. Skor yang mungkin hanya sebelas nilai, sehingga ambang bekerja seperti sakelar tiga posisi.
4. **Cacah tiap isyarat tidak sebanding satu sama lain.** Isyarat perangkat menyala 8.314 kali (1.032 pengguna) dan kecepatan 371 kali (149 pengguna), tapi isyarat perangkat menandai seluruh transaksi seseorang pada hari bermasalah, sedangkan yang lain menandai per transaksi. Isyarat jumlah juga mulai bergeser: seluruh 1.616 nyalanya (1.185 pengguna) jatuh pada transaksi di atas Rp 2 juta, dan 1.474 di antaranya (1.155 pengguna) terjadi November 2025 sampai Maret 2026, sementara median nilai transaksi hampir tidak bergerak. Dihitung ulang untuk Maret 2026 saja, urutan keempat isyarat tetap sama, dan antreannya 95 transaksi milik 13 pengguna.
5. **Ketepatan sistem ini tidak bisa dihitung.** Data tidak memuat satu pun hasil pemeriksaan manual, sehingga tidak ada pembanding untuk ketepatan, keterjaringan, maupun laju positif palsu. Porsi kecil yang masuk antrean (1,41%) juga bukan bukti ketepatan: daftar acak dengan ukuran sama akan punya porsi yang sama. Angka itu baru bisa dihitung sesudah hasil tinjauan dicatat sebagai label.

**Rekomendasi.** Pakai antrean ini sebagai urutan kerja harian, satu kasus per pengguna. Catat hasil tiap tinjauan sebagai label sejak hari pertama. Jangan ubah ambang atau bobot mana pun sampai label terkumpul cukup untuk membandingkannya. Daftar ini tidak dipakai untuk menahan akun secara otomatis.

## 7. Apa yang berubah pada keputusannya, dan yang saya ukur sesudahnya

Antrean yang tadinya belum punya urutan kini punya urutan yang bisa dihitung ulang siapa pun: skor menurun, lalu yang menunggu paling lama, lalu identitas transaksi sebagai pemutus. Cara kerjanya berubah dari per transaksi menjadi per pengguna. Satu keputusan yang tadinya akan diambil, menurunkan ambang, ditunda dengan alasan berupa angka. Satu pertanyaan baru dibawa ke tim produk: apa yang berubah pada transaksi besar sejak November 2025.

Tiga ukuran, dua di antaranya sudah punya nilai awal: transaksi masuk antrean per hari (rata-rata 7,58 pada hari yang terisi, puncak 14) dan pengguna tersentuh per bulan (6 sampai 17). Yang ketiga, porsi kasus yang sesudah ditinjau ternyata wajar, belum punya nilai awal sama sekali, dan karena itu hasil tinjauan perlu dicatat sejak hari pertama, ditambah sampel acak sepuluh transaksi di luar antrean tiap minggu sebagai pembanding.

## 8. Batas, telusur, dan cara menjalankan ulang

- Keempat ambang dan bobot adalah aturan latihan yang belum pernah dibandingkan dengan hasil tinjauan. Antrean ini menunjukkan ke mana perhatian diarahkan, dan kesimpulan tentang orangnya tetap pekerjaan peninjau.
- Isyarat lokasi tidak bisa membedakan kota yang bersebelahan dari kota yang berjauhan karena data jarak tidak ada.
- Keputusan menahan 492 transaksi tanpa pedagang belum diuji. Kalau sebagian adalah kegagalan pencatatan, transaksi itu dinilai tanpa konteks pedagangnya.
- Di tabel sumber semua kolom bertipe Nullable, dan pedagang yang kosong tersimpan sebagai NULL. Syarat "pedagang tidak kosong" yang ditulis sebagai perbandingan dengan teks kosong menghasilkan NULL, jadi saya menuliskannya dengan nilai pengganti 0.
- Isyarat jumlah pada potongan satu bulan membandingkan dengan riwayat yang ikut terpotong, sehingga angkanya tidak saya bandingkan langsung dengan periode penuh.

### Lapisan bukti: pembersihan

| Tahap | Baris keluar | Porsi dari mentah | Sisa |
| --- | --- | --- | --- |
| baris mentah |  |  | 101.039 |
| salinan dari kiriman ulang | 1.200 | 1,19% | 99.839 |
| stempel waktu sesudah akhir periode | 148 | 0,15% | 99.691 |
| nilai negatif, dipisahkan sebagai pengembalian dana | 794 | 0,79% | 98.897 |
| total keluar dari penilaian | 2.142 | 2,12% | 98.897 |

492 transaksi tanpa identitas pedagang ditahan, ditandai, dan ikut dinilai, karena transfer antarpengguna adalah kanal yang tetap perlu diawasi. Pengguna unik 8.000 di setiap tahap.

### Lapisan bukti: empat isyarat dan bobotnya

| Isyarat | Aturan | Bobot | Menyala | Porsi | Pengguna |
| --- | --- | --- | --- | --- | --- |
| kecepatan | 5 transaksi dalam 10 menit | 30 | 371 | 0,38% | 149 |
| jumlah | di atas 3 kali rata-rata historis | 25 | 1.616 | 1,63% | 1.185 |
| lokasi | 2 kota dalam kurang dari 60 menit | 25 | 2.959 | 2,99% | 1.543 |
| perangkat | lebih dari 3 perangkat sehari | 20 | 8.314 | 8,41% | 1.032 |

Cacah keempatnya tidak sebanding: isyarat perangkat menandai seluruh transaksi seseorang pada hari bermasalah, sedangkan tiga lainnya menandai per transaksi.

### Lapisan bukti: sebaran tingkat

| Tingkat | Isyarat menyala | Transaksi | Porsi | Pengguna |
| --- | --- | --- | --- | --- |
| Rendah | 0 atau 1 | 97.502 | 98,59% | 8.000 |
| Sedang | 2 | 1.386 | 1,40% | 56 |
| Tinggi | 3 atau 4 | 9 | 0,01% | 9 |

Dengan bobot 30, 25, 25, 20 dan ambang 70 serta 40, tingkat ditentukan sepenuhnya oleh cacah isyarat yang menyala. Tidak satu pun dari enam belas kombinasi melanggarnya, dan bobot rata 25 dengan ambang 50 serta 75 menghasilkan antrean yang identik.

### Lapisan bukti: validasi

| # | Pemeriksaan | Hasil | Catatan |
| --- | --- | --- | --- |
| 1 | skor berada di sebelas nilai yang mungkin | lolos | nol baris di luar |
| 2 | keempat isyarat menyala pada besaran yang wajar | lolos | perangkat perlu penjelasan bentuk aturannya |
| 3 | ketiga tingkat berjumlah seluruh baris bersih | lolos | 97.502 + 1.386 + 9 = 98.897 |
| 4 | tidak ada baris yang seharusnya sudah dibuang | lolos | nilai tidak positif, stempel masa depan, dan identitas berulang: nol |
| 5 | ambang menghasilkan daftar yang layak | tidak lolos | tidak ada hasil tinjauan untuk dibandingkan |

Seluruh angka keluar dari `1-Kueri SQL.sql`, sepuluh statement yang masing-masing memuat rantai lengkap dan berjalan apa adanya: antrean harian, pengelompokan per pengguna, rekonsiliasi pembersihan, tabel isyarat per transaksi, sebaran tingkat dan kombinasi, lima pemeriksaan validasi, beban harian, simulasi ambang, dan potongan satu bulan. Tabel isyarat per transaksi dan antrean harian tersedia atas permintaan, karena berisi identitas pengguna.
