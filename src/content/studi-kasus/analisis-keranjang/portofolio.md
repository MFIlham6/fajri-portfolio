**Pasangan produk dengan angka tertinggi hanya ada di 146 dari 3.000 keranjang, jadi saya tidak mengusulkannya sebagai bundel**

Sebuah e-commerce kecantikan dengan lima belas produk menyiapkan kampanye bundel musiman senilai Rp 80 juta. Dari 105 pasangan produk yang mungkin, tiga lolos sebagai kandidat bundel.

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026 dengan SQL di ClickHouse, kueri dan berkas pemeriksaan: folder Google Drive, mfajriilhamn@gmail.com

Catatan data: angka di halaman ini dihitung dari dataset latihan yang dirancang meniru pola transaksi e-commerce kecantikan. Ini bukan data perusahaan sungguhan dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## Ringkasan

Tiap bundel dalam kampanye ini memakan porsi anggaran yang sama besar, untuk materi visual, penempatan di halaman depan, dan potongan harga, entah bundelnya laku atau tidak. Jadi hanya beberapa bundel yang bisa dijalankan. Analisis atas 3.000 keranjang belanja menemukan tiga pasangan yang lolos tiga syarat sekaligus. Masing-masing ada di 1.231 sampai 1.395 keranjang dan muncul bersama 1,41 sampai 1,68 kali lipat dari yang diharapkan kalau kedua produknya tidak berhubungan. Keenam produknya adalah enam produk terlaris, jadi sebagian besar pembelinya sudah membeli keduanya tanpa bundel. Pasangan dengan angka tertinggi, 13,46 kali lipat dari kebetulan, saya tolak karena hanya ada di 146 keranjang. Rekomendasinya: tiga bundel dijalankan sebagai uji dengan kelompok pembanding, dan pasangan yang ditolak dipindah ke rekomendasi otomatis di halaman produk.

## Kenapa laporan ini ada

Tim merchandising meminta daftar pendek pasangan produk untuk dibundel, berikut alasan yang bisa dipertahankan di depan atasan mereka. Ada dua cara cepat yang hasilnya tampak masuk akal. Cara pertama memasangkan produk laris tanpa memeriksa apakah keduanya memang dibeli bersama. Dua produk terlaris di data ini, Daily Moisturizer dan Eye Cream, ada bersama di 1.066 keranjang, tetapi jumlah itu sama dengan yang diharapkan dari larisnya masing-masing (0,99 kali). Cara kedua mengurutkan pasangan menurut kekuatan hubungan lalu mengambil yang teratas, dan itu menaruh pasangan dengan bukti paling tipis, 146 keranjang, di posisi pertama. Pasangan yang lolos dari kedua jebakan itu pun membawa masalah ketiga: kalau pasangannya sudah sering dibeli bersama, diskon bundel sebagian besar jatuh ke belanja yang memang akan terjadi.

## Data

Satu tabel item order: 18.815 baris, tujuh kolom, 3.000 order dari Januari 2025 sampai Maret 2026, dan 15 produk di tiga kategori (perawatan wajah, bibir, dan mata). Tabel itu tidak memuat hasil kampanye apa pun, margin, maupun alasan orang membeli. Karena itu halaman ini tidak memuat satu pun proyeksi penjualan.

## Yang dikerjakan

Tiga keputusan menentukan hasilnya. Masing-masing saya tulis bersama satu pilihan yang saya tolak.

Keranjang adalah himpunan produk unik per order. Itemnya lolos empat aturan pembersihan; 1.556 baris (8,3%) dibuang: 835 duplikat persis, 374 tanpa kode produk, 200 retur, dan 147 sampel gratis.

Ditolak: keranjang dari baris apa adanya. Pasangan dibentuk dengan menggabungkan tabel ke dirinya sendiri, dan di sana baris ganda mengalikan hitungan. Di tabel mentah jumlah baris pasangan 14,2% lebih banyak, dan kenaikannya tidak merata antar pasangan.

Tiga ukuran dihitung berdampingan. Seberapa sering kedua produk muncul bersama, seberapa sering produk kedua ikut kalau produk pertama dibeli, dan berapa kali lipat kemunculan bersama dibanding kebetulan.

Ditolak: mengurutkan dengan satu ukuran lalu mengambil sepuluh teratas. Menurut kali lipat atau peluang ikut dibeli, pasangan dengan 146 keranjang ada di posisi pertama. Menurut jumlah keranjang, tiga teratas sama dengan tiga bundel ini, tetapi posisi keempat dan kelima diisi dua pasangan yang tidak lebih sering dari kebetulan.

Saringan memakai tiga syarat sekaligus. Lebih sering dari kebetulan, ada di minimal 200 keranjang, dan selisihnya terlalu besar untuk dijelaskan kebetulan. Ambang 200 saya uji dengan menggesernya dari 0 sampai 1.500 keranjang.

Ditolak: ambang yang dipakai tanpa diuji. Di sini tiga bundel yang sama keluar untuk ambang mana pun dari 147 sampai 1.231 keranjang.

Alatnya SQL di ClickHouse. Semua angka di halaman ini keluar dari satu kueri yang tercatat dan bisa dijalankan ulang.

## Gambar

**Gambar 1. Kali lipat kemunculan bersama dan jumlah keranjang, 105 pasangan produk**

![gambar 1](images/gambar-1.png)

Apa yang tergambar. Seluruh 105 pasangan produk. Mendatar: jumlah keranjang yang memuat kedua produk. Tegak: berapa kali lipat kemunculan bersama dibanding kebetulan. Garis putus-putus di 1,00 (setara kebetulan), garis titik di ambang 200 keranjang.

Rentang data. 3.000 keranjang dari 17.259 item bersih, order Januari 2025 sampai Maret 2026.

Yang terlihat. Satu titik hitam sendirian di kiri atas, di 146 keranjang dan 13,46 kali lipat. Tiga titik merah di kanan, di 1.231 sampai 1.395 keranjang dan 1,41 sampai 1,68 kali lipat. Sisa 101 titik abu-abu menempel di sekitar garis 1,00.

## Temuan

1. Tiga pasangan muncul bersama lebih sering daripada yang bisa dijelaskan larisnya produk, tetapi sebagian besar pembelinya sudah membeli keduanya. Masing-masing ada di 1.231 sampai 1.395 dari 3.000 keranjang (41,0% sampai 46,5%) dan muncul bersama 1,41 sampai 1,68 kali lipat dari kebetulan, dengan selisih 15,6 sampai 21,1 simpangan baku. Satu di antaranya menyeberangkan kategori, dari perawatan wajah ke perawatan mata. Keenam produknya adalah enam produk terlaris dari 15. Untuk tiap keranjang yang baru memuat salah satu produk, sudah ada 2,1 sampai 2,4 keranjang yang memuat keduanya.
2. Pasangan dengan angka paling tinggi tidak layak dikampanyekan. Ia muncul bersama 13,46 kali lipat dari kebetulan, delapan kali pasangan terbaik berikutnya, dan lebih dari sembilan dari sepuluh pembeli produk pertamanya juga mengambil produk kedua. Hubungannya nyata: selisihnya 41 simpangan baku dari kebetulan. Masalahnya jangkauan, hanya 146 dari 3.000 keranjang (4,9%). Dengan biaya tetap per bundel, pasangan ini membayar biaya penuh untuk 146 keranjang, sementara tiap bundel lain menjangkau 1.231 sampai 1.395.
3. Hampir separuh pasangan tampak berhubungan, tetapi sebagian besar tidak bisa dibedakan dari kebetulan. Sebanyak 47 dari 105 pasangan muncul bersama lebih sering daripada kebetulan. Itu kira-kira separuh, jumlah yang wajar muncul bahkan kalau tidak ada hubungan sama sekali. Hanya 4 dari 47 yang selisihnya terlalu besar untuk kebetulan.
4. Hasilnya sama pada enam bulan terakhir. Dengan 1.218 keranjang dan ambang diturunkan sebanding menjadi 81, tiga bundel yang sama lolos dengan urutan yang sama, dan pasangan yang ditolak tetap tertolak dengan 56 keranjang.

## Apa yang berubah pada keputusannya

Pasangan yang paling meyakinkan menurut kali lipat, Eye Primer + Eyeliner Pen, keluar dari daftar bundel dan diarahkan ke rekomendasi otomatis di halaman produk, yang biayanya hampir nol per pasangan. Tiga bundel diusulkan sebagai uji dan tidak langsung ditampilkan ke semua pembeli: sebagian pembeli melihat bundel, sebagian tidak, lalu penjualan pasangan di kedua kelompok dibandingkan. Karena sebagian besar pembelinya sudah membeli kedua produk, hanya selisih antara dua kelompok itu yang menunjukkan apakah diskonnya menghasilkan penjualan tambahan.

Usulan ini ditinjau ulang kalau uji menunjukkan penjualan pasangan di kedua kelompok sama saja, atau kalau data order baru menurunkan salah satu bundel mendekati 1,00 kali lipat.

## Batas dan telusur

- Data tidak memuat satu pun percobaan promosi, jadi penjualan tambahan dari bundel tidak bisa diperkirakan dari sini. Itu sebabnya rekomendasinya berbentuk uji.
- Membuang retur dan sampel gratis adalah keputusan definisi. Saya menjalankan ulang tanpa kedua aturan itu, dan tiga bundel yang sama tetap lolos.
- Margin dan biaya diskon tidak ada di data. Untung atau tidaknya bundel setelah diskon di luar cakupan analisis ini.
- Pola pasangan selama Ramadan 2025 dan 2026 tidak diperiksa terpisah. Order per kuartal 551 sampai 625 tanpa lonjakan di kuartal pertama, tetapi itu tidak menunjukkan apakah pasangannya berubah saat Ramadan. Kueri untuk memeriksanya ada di catatan keputusan.

| Angka | Asalnya |
|---|---|
| 17.259 item, 3.000 order | Empat tahap pembersihan atas 18.815 baris mentah; hitungan tiap tahap tercatat di catatan keputusan |
| 105 pasangan | Semua kombinasi dua dari 15 produk; tiap pasangan muncul bersama setidaknya sekali |
| 1.231 sampai 1.395 | Jumlah keranjang yang memuat kedua produk, per bundel |
| 1,41 sampai 1,68 kali | Kemunculan bersama dibagi yang diharapkan dari popularitas masing-masing produk |
| 2,1 sampai 2,4 | Keranjang berisi kedua produk dibagi keranjang berisi salah satu saja, per bundel (1.231 / 507, 1.333 / 630, 1.395 / 672); keenam produknya enam produk terlaris dari 15 |
| 146 keranjang, 13,46 kali | Pasangan yang ditolak; kedua produknya paling jarang dibeli dari 15 produk, sehingga angka kali lipatnya mudah melonjak |
| 47 dari 105; 4 dari 47 | Pasangan di atas kebetulan; yang selisihnya lebih dari 1,96 simpangan baku |
| 1.218 keranjang | Order sejak 1 Oktober 2025, dibersihkan dengan empat aturan yang sama sebelum keranjang dibentuk |

Kueri lengkap, catatan keputusan, memo satu halaman, dan lampiran bukti tersedia di folder yang ditautkan di bagian atas.
