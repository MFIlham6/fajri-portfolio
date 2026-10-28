# Bundel Musiman E-commerce Kecantikan: Pasangan Berangka Tertinggi Hanya Ada di 146 dari 3.000 Keranjang

Studi kasus analisis keranjang belanja di e-commerce kecantikan dengan lima belas produk di tiga kategori. Alat: SQL. Lingkup: 3.000 keranjang dari 17.259 item bersih, 18.815 baris mentah.

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026. Kueri lengkap dan berkas pemeriksaan: https://drive.google.com/drive/folders/1f3TngZSC0yYUtq99YapCx0EVR-mSsTjG. Surel: mfajriilhamn@gmail.com.

Catatan data: angka di bawah dihitung dari dataset latihan yang dirancang meniru pola transaksi e-commerce kecantikan. Ini bukan data perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## 1. Ringkasan

Kampanye bundel musiman senilai Rp 80 juta hanya bisa menjalankan beberapa bundel, karena tiap bundel memakan porsi anggaran yang sama besar entah laku atau tidak. Analisis atas 3.000 keranjang belanja menemukan tiga pasangan yang lolos tiga syarat sekaligus. Masing-masing ada di 1.231 sampai 1.395 keranjang dan muncul bersama 1,41 sampai 1,68 kali lipat dari yang diharapkan kalau kedua produknya tidak berhubungan. Pasangan dengan angka tertinggi, 13,46 kali lipat dari kebetulan, saya tolak karena hanya ada di 146 keranjang. Rekomendasinya: tiga bundel dijalankan sebagai **uji dengan kelompok pembanding**, dan pasangan yang ditolak dipindah ke rekomendasi otomatis di halaman produk.

## 2. Kenapa laporan ini ada

Tim merchandising meminta daftar pendek pasangan produk untuk dibundel, berikut alasan yang bisa dipertahankan di depan atasan mereka. Dua jalan pintas tersedia, dan keduanya menghasilkan daftar yang tampak masuk akal. Memasangkan dua produk terlaris memberi diskon kepada orang yang memang sudah membeli keduanya. Mengurutkan pasangan dengan satu ukuran kekuatan hubungan lalu mengambil yang teratas menaruh pasangan dengan bukti paling tipis di posisi pertama.

## 3. Data

Satu tabel item order: 18.815 baris, tujuh kolom, 3.000 order dari Januari 2025 sampai Maret 2026, dan 15 produk di tiga kategori (perawatan wajah, bibir, dan mata). Tabel itu tidak memuat hasil kampanye apa pun, margin, maupun alasan orang membeli, jadi laporan ini tidak memuat proyeksi penjualan.

## 4. Yang dikerjakan

Pekerjaan mengikuti enam langkah: situasi, pertanyaan yang benar, kecukupan data, analisis, bantahan, lalu rekomendasi berikut batasnya. Tiga keputusan saya tulis sebelum kueri analisis pertama, masing-masing dengan satu pilihan yang saya tolak.

- Keranjang adalah himpunan produk unik per order, dari item yang lolos empat aturan pembersihan: 1.556 baris (8,3%) dibuang, terdiri dari 835 duplikat persis, 374 tanpa kode produk, 200 retur, dan 147 sampel gratis. Ditolak: keranjang dari baris apa adanya. Pasangan dibentuk dengan menggabungkan tabel ke dirinya sendiri, dan di sana baris ganda mengalikan hitungan. Di tabel mentah jumlah baris pasangan 14,2% lebih banyak, dan kenaikannya tidak merata.
- Tiga ukuran dihitung berdampingan: seberapa sering kedua produk muncul bersama, seberapa sering produk kedua ikut kalau produk pertama dibeli, dan berapa kali lipat kemunculan bersama dibanding kebetulan. Ditolak: mengurutkan dengan satu ukuran lalu mengambil sepuluh teratas, yang pada data ini menaruh pasangan dengan 146 keranjang di posisi pertama.
- Saringan memakai tiga syarat sekaligus: lebih sering dari kebetulan, ada di minimal 200 keranjang, dan selisihnya terlalu besar untuk kebetulan. Ditolak: ambang yang dipakai tanpa diuji. Tiga bundel yang sama keluar untuk ambang mana pun dari 147 sampai 1.231 keranjang.

## 5. Gambar

![Sebaran 105 pasangan produk: kali lipat dari kebetulan lawan jumlah keranjang](images/gambar-1.svg)

Apa yang tergambar: seluruh 105 pasangan produk. Mendatar: jumlah keranjang yang memuat kedua produk. Tegak: berapa kali lipat kemunculan bersama dibanding kebetulan, skala logaritmik. Garis putus-putus di 1,00 (setara kebetulan), garis titik di ambang 200 keranjang. Rentang data: 3.000 keranjang dari 17.259 item bersih, order Januari 2025 sampai Maret 2026. Yang terlihat: satu lingkaran hitam sendirian di kiri atas, di 146 keranjang dan 13,46 kali lipat; tiga titik merah di kanan, di 1.231 sampai 1.395 keranjang dan 1,41 sampai 1,68 kali lipat; sisa 101 titik abu-abu menempel di sekitar garis 1,00.

## 6. Temuan

1. **Tiga pasangan muncul bersama jauh lebih sering daripada yang bisa dijelaskan larisnya produk.** Masing-masing ada di 1.231 sampai 1.395 dari 3.000 keranjang (41,0% sampai 46,5%) dan muncul bersama 1,41 sampai 1,68 kali lipat dari kebetulan. Satu di antaranya menyeberangkan kategori, dari perawatan wajah ke perawatan mata.
2. **Pasangan dengan angka paling tinggi tidak layak dikampanyekan.** Ia muncul bersama 13,46 kali lipat dari kebetulan, delapan kali pasangan terbaik berikutnya, dan hubungannya nyata: selisihnya 41 simpangan baku dari kebetulan. Masalahnya jangkauan, hanya 146 dari 3.000 keranjang (4,9%). Dengan biaya tetap per bundel, pasangan ini membayar biaya penuh untuk sekitar sepersepuluh jangkauan bundel lain.
3. **Hampir separuh pasangan tampak berhubungan padahal tidak.** Sebanyak 47 dari 105 pasangan muncul bersama lebih sering daripada kebetulan, jumlah yang wajar muncul bahkan kalau tidak ada hubungan sama sekali. Hanya 4 dari 47 yang selisihnya terlalu besar untuk kebetulan.
4. **Hasilnya bertahan saat periodenya dipendekkan.** Pada enam bulan terakhir (1.218 keranjang, ambang diturunkan sebanding menjadi 81) tiga bundel yang sama lolos dengan urutan yang sama, dan pasangan yang ditolak tetap tertolak dengan 56 keranjang.

## 7. Apa yang berubah pada keputusannya

Daftar bundel yang tadinya akan dipilih dari peringkat satu ukuran sekarang disaring tiga syarat, dan pasangan yang akan menempati posisi pertama dikeluarkan. Tiga bundel diusulkan sebagai uji: sebagian pembeli melihat bundel, sebagian tidak, lalu penjualan pasangan di kedua kelompok dibandingkan. Pasangan yang ditolak diarahkan ke rekomendasi otomatis di halaman produk, yang biayanya hampir nol per pasangan. Usulan ditinjau ulang kalau uji menunjukkan penjualan di kedua kelompok sama saja, atau kalau data baru menurunkan salah satu bundel mendekati 1,00 kali lipat.

## 8. Batas dan telusur

- Data tidak memuat satu pun percobaan promosi, jadi penjualan tambahan dari bundel tidak bisa diperkirakan dari sini. Itu sebabnya rekomendasinya berbentuk uji.
- Membuang retur dan sampel gratis adalah keputusan definisi. Saya menjalankan ulang tanpa kedua aturan itu, dan tiga bundel yang sama tetap lolos.
- Margin dan biaya diskon tidak ada di data.

| Angka | Asalnya |
|---|---|
| 17.259 item, 3.000 order | Empat tahap pembersihan atas 18.815 baris mentah |
| 105 pasangan | Semua kombinasi dua dari 15 produk; tiap pasangan muncul bersama setidaknya sekali |
| 1.231 sampai 1.395 | Jumlah keranjang yang memuat kedua produk, per bundel |
| 1,41 sampai 1,68 kali | Kemunculan bersama dibagi yang diharapkan dari popularitas masing-masing produk |
| 146 keranjang, 13,46 kali | Pasangan yang ditolak; kedua produknya paling jarang dibeli dari 15 produk |
| 47 dari 105; 4 dari 47 | Pasangan di atas kebetulan; yang selisihnya lebih dari 1,96 simpangan baku |
| 1.218 keranjang | Order sejak 1 Oktober 2025, dibersihkan dengan aturan yang sama |
