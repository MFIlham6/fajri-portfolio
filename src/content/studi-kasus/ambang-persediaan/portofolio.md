**Seluruh 361 Ambang Pemesanan Berada di Bawah Rumus Bakunya, dan Selisihnya Setara dengan Satu Tanda Operasi**

Analisis persediaan, jaringan distribusi tiga gudang, Spreadsheet, lingkup 361 SKU bersih dari 401 baris mentah, waktu pengerjaan: 24 jam

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, mfajriilhamn@gmail.com

*Catatan data: angka di bawah dihitung dari dataset simulasi yang meniru pola persediaan jaringan distribusi. Ini bukan data perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## Ringkasan

Sebuah jaringan distribusi menyusun pesanan mingguan dari daftar yang dihasilkan sistem persediaan. Setelah tiga produk kosong di rak hampir seminggu tanpa pernah muncul di daftar, ambang pemesanan dihitung ulang dari bahannya. Ambangnya terlalu rendah pada seluruh barang tanpa satu pun pengecualian: rumusnya menambahkan dua hari pada waktu tunggu, padahal stok pengaman yang dihitung sistem sendiri sebesar satu masa tunggu penuh. Ambang yang rendah membuat barang masuk daftar terlambat; kasus ketiga produk itu tidak bisa diperiksa karena tidak teridentifikasi di berkas. Pekerjaan ini menghasilkan dua daftar tindakan terpisah: barang yang harus ditangani minggu itu, dan satu rumus yang perlu diganti di sistem.

## Kenapa laporan ini ada

Daftar pesanan mingguan menentukan barang apa yang dipesan, dan kekosongan di rak berarti penjualan yang tidak terlayani sekaligus keluhan dari toko. Kepala gudang meminta daftar barang yang stoknya menipis sebelum rapat pengadaan, dengan anggapan cukup menyaring kolom ambang yang sudah tersedia. Yang membuat kejadian sebelumnya membingungkan: ketiga produk yang kosong tidak pernah muncul di daftar dengan peringatan apa pun.

## Data

Ekspor sistem persediaan per satu tanggal: sekitar empat ratus baris, lima belas kolom, tiga gudang, lima kategori produk. Tersisa 361 baris setelah empat puluh baris dibuang karena duplikat, stok negatif, harga kosong atau nol, dan waktu tunggu kosong. Tidak ada biaya penyimpanan, riwayat kehabisan stok, catatan keandalan pemasok, maupun riwayat perubahan sistem, dan penjualan harian sudah berupa rata-rata sehingga sebarannya tidak diketahui.

## Yang dikerjakan

Kolom dipisahkan lebih dulu menjadi dua jenis: yang berisi pengamatan dan yang berisi hasil perhitungan. Kolom jenis kedua dihitung ulang dari bahannya di kolom bantu; kolom aslinya tidak ditimpa, karena perbandingan keduanya adalah temuannya. Setelah terlihat bahwa seluruh baris menyimpang ke arah yang sama, dicari hubungan antar-kolom yang berlaku persis untuk melacak rumus yang dipakai sistem, lalu selisihnya diterjemahkan menjadi jumlah barang yang terdampak dan dipisah menurut seberapa mendesak. Pendekatan yang ditolak: menyimpulkan data bersih karena tiga aturan konsistensi antar-kolom dipatuhi tanpa pelanggaran, karena konsistensi hanya membuktikan semua angka lahir dari satu aturan, bukan bahwa aturannya benar. Juga ditolak: melaporkan rata-rata rasio 1,376 sebagai pengali sistem, karena tidak satu barang pun memakai angka itu, dan memakai peringkat gudang sebagai penjelasan, karena rumusnya sama di ketiga gudang.

**Gambar 1. Tidak ada satu pun barang yang ambangnya pas.**

![gambar 1](images/gambar-1.png)

*Sebaran selisih antara ambang menurut rumus baku dan ambang yang tercatat di sistem, untuk 361 SKU bersih. Perhatikan bahwa seluruh batang berada di kelompok "short by", dan kelompok "equal or above" bernilai nol.*

**Gambar 2. Kekurangannya membesar justru saat waktu tunggu memanjang.**

![gambar 2](images/gambar-2.png)

*Seberapa jauh ambang tercatat berada di bawah rumus baku, dalam persen dari rumus baku, untuk tiap waktu tunggu, 361 SKU bersih. Perhatikan bahwa batangnya naik dari 16,7% pada 3 hari sampai 40,0% pada 10 hari.*

**Gambar 3. Dua kelompok barang yang butuh tindakan berbeda.**

![gambar 3](images/gambar-3.png)

*Jumlah SKU yang masuk daftar pesanan menurut dua aturan, ditambah kelompok kritis yang dihitung terpisah, dari 361 SKU bersih. Perhatikan batang abu-abu gelap paling bawah: kelompok kritis dihitung dengan aturan lain dan bukan bagian dari selisih 75.*

## Temuan

1. Tiga aturan konsistensi antar-kolom dipatuhi tanpa satu pun pelanggaran, sehingga seluruh pemeriksaan standar melaporkan data yang bersih.
2. Dihitung ulang dengan rumus baku, ambang pemesanan terlalu rendah pada 361 dari 361 barang, rata-rata kurang 24,9 unit, tanpa satu pun pengecualian.
3. Rumus yang dipakai sistem bisa dilacak dan berlaku di seluruh baris: ambang = penjualan harian × (waktu tunggu + 2), sementara rumus baku setara dengan penjualan harian × (waktu tunggu × 2). Celah ambangnya naik dari 16,7% pada waktu tunggu 3 hari menjadi 40,0% pada 10 hari. Porsi barang yang terlewat ikut naik: 26,2% pada waktu tunggu 7 hari ke atas, 15,1% pada 5 hari ke bawah.
4. Akibatnya daftar pesanan berisi 118 barang padahal seharusnya 193, sehingga 75 barang (20,8%) tidak pernah muncul. Terpisah dari itu, 68 barang (18,8%) stoknya sudah di bawah kebutuhan selama waktu tunggu, dan irisan kedua kelompok nol. Penjualan yang tidak tertutup stok pada 68 barang itu selama masa tunggu paling banyak Rp 66,7 juta; angka ini batas atas, bukan kerugian.

## Apa yang berubah pada keputusannya

Sebelum analisis, tim akan memesan dari daftar 118 barang seperti biasa, dan kekosongan berikutnya akan terjadi tanpa peringatan. Sesudahnya, keluarannya menjadi dua pekerjaan dengan penerima berbeda: 68 barang kritis yang butuh percepatan pengiriman atau pemindahan stok minggu itu juga, oleh tim pengadaan, dan satu rumus yang diganti di sistem supaya seluruh barang, termasuk yang belum masuk sistem, terhitung benar, oleh pemilik sistem persediaan. Pemisahan per gudang juga mengubah bentuk tindakannya: porsi barang yang terlewat karena rumus mirip di ketiga gudang (18,5% sampai 23,6%), tetapi gudang Jakarta menampung 32 dari 68 barang kritis, sehingga tindakan mendesak dimulai dari sana tanpa perlu mengaudit rumus per gudang.

## Batas

Data tidak memuat biaya penyimpanan, sehingga menaikkan ambang tidak bisa diklaim sebagai penghematan; pengali 2,0 punya dasar rumus baku, bukan hasil optimasi biaya. Angka Rp 66,7 juta adalah batas atas, karena perilaku pelanggan tidak tercatat. Penjualan harian berupa rata-rata dan waktu tunggu tercatat sebagai angka tetap, sehingga jumlah barang kritis adalah perkiraan, dan kecukupan cadangan untuk permintaan yang tidak stabil tidak bisa dinilai. Penyebab stok yang rendah di gudang Jakarta tidak ada di data.

## Telusur

Berkas kerja tujuh lembar dengan seluruh rumus terbuka, catatan pembersihan yang juga mencatat tiga pemeriksaan konsistensi bernilai nol, kolom ambang asli dan kolom hitungan ulang bersebelahan, dua versi daftar pesanan dengan penanda selisihnya, rumus pengganti yang siap dipasang, dan hasil tujuh pemeriksaan validasi.
