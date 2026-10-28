**Total Penjualan Membengkak 23,6% Sebelum Satu Baris Rusak pun Disentuh**

Analisis penjualan ritel, jaringan sepuluh cabang, Spreadsheet, 4.112 transaksi bersih 2025 dari 5.145 baris mentah

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, mfajriilhamn@gmail.com

*Catatan data: angka di bawah dihitung dari dataset simulasi yang meniru pola penjualan ritel multi-cabang. Ini bukan data perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

**Ringkasan.** Sebuah jaringan ritel sepuluh cabang menyiapkan periode belanja terbesarnya dari satu ekspor mentah sistem kasir. Menjumlahkan berkas apa adanya membuat total 23,6% lebih tinggi, karena ekspor ikut memuat transaksi tahun berikutnya. Analisis ini memisahkan masalah cakupan dari masalah kualitas data, lalu menguji kesimpulan mana yang tetap berdiri setelah keduanya dibereskan.

**Kenapa laporan ini ada.** Kepala operasional harus memutuskan cabang mana yang mendapat stok dan staf tambahan lebih dulu, serta kapan promo dilepas. Waktunya satu malam, tanpa tim analis dan tanpa laporan pembanding. Keputusan itu akan tetap diambil. Tanpa analisis ini, urutannya akan dibaca dari total mentah, yang memasukkan Rp 4,99 miliar transaksi di luar periode dan menempatkan cabang yang salah di peringkat 3.

**Data.** Ekspor sistem kasir: 5.145 baris, sembilan kolom, sepuluh cabang, empat kategori produk. Rentang tanggalnya melewati periode yang ditanyakan, sampai 2026. Tidak ada kolom biaya, tidak ada penanda promo, dan hanya satu tahun data yang relevan.

**Yang dikerjakan.** Periode dibatasi lebih dulu, sebelum memeriksa kualitas data. Alasannya terukur: kesalahan cakupan menggeser total 23,6%, sedangkan seluruh baris rusak di dalam 2025 hanya 1,09%. Setelah itu anomali diperiksa lewat kolom penyusun, yaitu Qty × Price dibandingkan TotalSales. Pendekatan yang ditolak: memeriksa anomali dari kolom TotalSales saja. Di berkas ini kolom itu tidak memuat satu pun nilai negatif, padahal tujuh baris punya Qty atau Price minus. Juga ditolak: membandingkan bulan dengan total bulanan, karena Februari hanya 28 hari. Terakhir, setiap kesimpulan diuji ulang, termasuk memecah rata-rata setahun per bulan untuk melihat apakah polanya berulang.

**Gambar 1. Angkanya membengkak hampir seperempat karena periodenya tidak dibatasi.**  
![gambar 1](images/gambar-1.png)  
 *Total nilai transaksi dari 5.145 baris ekspor dibandingkan 4.145 baris yang jatuh di 2025. Perhatikan bahwa selisihnya muncul sebelum satu baris rusak pun dibuang.*

**Gambar 2. Hanya dua cabang teratas yang terpisah jelas dari cabang lain.**

![gambar 2](images/gambar-2.png)  
 *Kesepuluh cabang pada sumbu penjualan bersih 2025, dari 4.112 baris. Perhatikan lebar celah di kanan dibandingkan lebar gumpalan lima titik di tengah.*

**Gambar 3. Sebelas dari dua belas posisi berpindah begitu penyebutnya disetarakan.**

![gambar 3](images/gambar-3.png)  
 *Peringkat dua belas bulan 2025 menurut total dan menurut rata-rata per hari kalender, dari 4.112 baris. Perhatikan garis oranye Februari dan satu-satunya garis mendatar.*

**Gambar 4. Efek awal bulan hanya muncul jelas di Februari dan November.**

**![gambar 4](images/gambar-4.png)**

*Selisih rata-rata harian tanggal 1-5 dibandingkan sisa bulan, untuk tiap bulan 2025, dari 4.112 baris. Perhatikan tinggi batang Februari dan November dibandingkan sepuluh bulan lainnya.* 

**Temuan.**

1. Dari 5.145 baris, 1.000 di luar periode senilai Rp 4.776.925.000: 995 transaksi Januari sampai Maret 2026 dan 5 baris bertanggal tersebar.  
2. Tujuh baris 2025 punya Qty atau Price negatif tapi TotalSales tetap positif, senilai Rp 144.287.500. Anomali ini tidak terlihat dari kolom TotalSales.  
3. Pembersihan hanya menggeser total 1,09%, tapi cukup untuk menukar dua pasang peringkat cabang yang berselisih Rp 31,4 juta dan Rp 18,6 juta.  
4. Tanggal 1 sampai 5 rata-rata 13,7% lebih ramai dari sisa bulan, sedangkan efek akhir pekan hanya 4,0%.

**Apa yang berubah pada keputusannya.** Sebelum analisis, sepuluh cabang akan diurutkan sebagai sepuluh tingkat dari total mentah, dan Februari dianggap bulan sepi. Sesudahnya, hanya dua cabang teratas yang cukup jauh untuk jadi dasar prioritas, dengan jarak Rp 321,9 juta ke peringkat 3. Lima cabang di tengah berimpit dalam Rp 119,4 juta, lebih sempit dari celah yang mengapitnya, jadi diperlakukan setara. Waktu promo bergeser dari akhir pekan ke sebelum tanggal 1, karena efek gajian tiga kali lebih besar.

**Batas.** Tidak ada data biaya, jadi tidak ada kesimpulan soal profitabilitas. Tidak ada penanda promo, jadi penyebab lonjakan Februari dan November tidak bisa dipastikan. Satu tahun data tidak cukup untuk menyatakan pola musiman. Baris negatif diasumsikan salah input; kalau ternyata retur sah, urutan peringkat 3 dan 4 bisa berbalik. 

**Telusur.** Workbook lima lembar dengan seluruh rumus terbuka, catatan pembersihan dengan dampak rupiah tiap keputusan, dan catatan keputusan yang memuat asumsi serta data yang dibuang.
