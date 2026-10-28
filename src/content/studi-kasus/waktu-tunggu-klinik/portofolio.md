Studi Kasus, Waktu Tunggu Layanan Kesehatan

# **Peringkat Cabang Tidak Bisa Dibedakan dari Undian, dan Selisih Antar-Tenaga Medis Ternyata Kurang dari Separuh Angka Mentahnya**

Analisis waktu tunggu pasien, jaringan klinik delapan cabang, Spreadsheet, lingkup 744 kunjungan bersih dari 782 baris mentah

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Catatan data: angka-angka di bawah dihitung dari dataset yang dirancang meniru pola kunjungan klinik. Ini bukan data sebuah perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## **Konteks**

Sebuah jaringan klinik dengan delapan cabang menerima keluhan berulang mengenai waktu tunggu pasien. Manajemen ingin tahu di mana persoalannya sebelum memutuskan menambah dokter. Taruhannya dua lapis. Pertama, tenaga yang ditempatkan di cabang yang salah menjadi biaya berjalan yang tidak menyelesaikan keluhan. Kedua, analisis waktu tunggu hampir selalu berujung pada pertanyaan tentang tenaga medis tertentu, dan kesimpulan yang keliru di sana menempel pada seseorang. Data tidak mencatat jam kunjungan maupun jumlah dokter bertugas per sesi, padahal keduanya penjelasan paling wajar untuk antrean panjang.

## **Pertanyaan**

"Cabang mana yang waktu tunggunya paling lama? Kami mau prioritaskan penambahan dokter di situ."

## **Pendekatan**

Aturan pembersihan ditulis berurutan sebelum menghitung, termasuk pemeriksaan yang hasilnya nol dan pemeriksaan tumpang tindih antar-aturan. Sebaran data diukur lebih dulu untuk mengetahui berapa pengamatan yang dibutuhkan sebelum sebuah rata-rata layak dibandingkan. Setiap rata-rata ditulis bersama jumlah pengamatannya. Perbedaan antar-kelompok diuji dengan mengacak ulang label kelompok sambil mempertahankan ukurannya. Uji yang sama dijalankan pada pengelompokan yang membatalkan maupun yang mendukung, lalu syarat jumlah pengamatan dinaikkan bertahap untuk melihat berapa yang bertahan.

Empat pendekatan ditolak. Yang pertama, menyusun peringkat kelompok dan melaporkan yang teratas. Cara ini paling langsung menjawab pertanyaan, tetapi peringkat selalu bisa disusun, bahkan ketika semua kelompok setara. Yang kedua, menerima pengelompokan yang memisahkan paling tajam sebagai temuan. Kelompok yang lebih banyak berarti tiap kelompok lebih kecil, dan kelompok kecil lebih sering menghasilkan nilai ekstrem. Yang ketiga, menghitung hubungan antar-ukuran pada seluruh data. Kelompok kecil ikut menarik hubungan itu, sehingga kaitan semu terdengar seperti hasil pemeriksaan. Yang keempat, menyampaikan kesimpulan yang menyebut individu. Data memungkinkannya, tetapi penyebab perbedaannya tidak diketahui. Kekeliruan tentang anggaran bisa dikoreksi, sedangkan kekeliruan tentang seseorang belum tentu bisa.

## **Temuan**

1. **Peringkat cabang tidak bisa dibedakan dari undian.** Selisih cabang tertinggi dan terendah 4,0 menit, dan 31,8% dari 2.000 pengacakan label menghasilkan selisih sebesar itu atau lebih. Departemen menunjukkan pola yang sama (2,6 menit, 33,4%).  
2. **Dikelompokkan menurut tenaga medis, selisihnya 16,8 menit dan hanya 0,7% pengacakan yang mencapainya.** Ada perbedaan nyata. Tetapi pengacakan murni saja sudah menghasilkan rentang tengah 11,6 menit, jadi sebagian besar angka mentah itu variasi acak.  
3. **Lebih dari separuh selisih itu hilang saat yang berkunjungan sedikit dikeluarkan.** Pada syarat minimal 20 kunjungan, rentangnya 6,4 menit (16 orang, turun 62%), dan keenam nama di kedua ujung papan berganti. Di kelompok ini, tidak satu pun individu berbeda dari rata-rata keseluruhan melebihi batas ketidakpastiannya sendiri.  
4. **Empat penjelasan diuji, dan tidak satu pun menjelaskan.** Korelasi durasi konsultasi dengan waktu tunggu +0,32 pada seluruh tenaga, tetapi berbalik menjadi −0,38 begitu populasinya disamakan. Jumlah pasien lemah di kedua populasi (−0,22) dan arahnya berlawanan dengan dugaan. Departemen dan cabang sudah gugur di temuan 1.

**Gambar 1. Hanya selisih antar-tenaga medis yang bertahan saat diuji; selisih cabang dan departemen setara dengan hasil undian.**

![gambar 1](images/gambar-1.png)

Prosedur yang sama dipakai untuk ketiga pengelompokan, dan prosedur itu juga yang membatalkan temuan cabang.

**Gambar 2. Lebih dari separuh selisihnya hilang begitu yang berkunjungan sedikit dikeluarkan.**

![gambar 2](images/gambar-2.png)

Rata-rata dari sedikit kunjungan goyah: pada simpangan baku 11,5 menit, rata-rata dari 12 kunjungan punya ketidakpastian ±6,5 menit. Selisih yang tersisa 6,4 menit.

**Gambar 3. Penjelasan yang paling meyakinkan hilang saat dihitung ulang.**

![gambar 3](images/gambar-3.png)

Korelasi durasi konsultasi dengan waktu tunggu berganti tanda, dari +0,32 menjadi −0,38, begitu populasinya disamakan, sehingga kaitan ini tidak bisa dipakai sebagai penjelasan.

## **Jawaban**

Tidak ada cabang yang berbeda secara berarti. Yang berbeda adalah antar-tenaga medis, 6,4 menit pada kelompok berpengamatan memadai, dan penyebabnya tidak diketahui.

## **Rekomendasi**

Jangan memakai peringkat cabang untuk alokasi tenaga, dan jangan menetapkan target waktu tunggu per individu, karena dengan variasi 11,5 menit target itu tercapai atau terlewat karena kebetulan. Catat jam kunjungan dan jumlah dokter bertugas per sesi selama sebulan. Keduanya murah dan langsung membedakan "seseorang bekerja lebih lambat" dari "sesi itu kekurangan orang". Telusuri juga sepuluh kunjungan yang konsultasinya berjalan tetapi pendapatannya tercatat nol (sekitar Rp1,6 juta bila memang belum dibayar).

## **Batas**

Penyebab selisih 6,4 menit tidak diketahui. Satu departemen hanya diwakili dua orang di antara yang datanya memadai, sehingga pengaruh spesialisasi belum tertutup penuh. Rata-rata 24,7 menit belum bisa dinilai wajar atau tidak tanpa pembanding dari luar. Analisis ini sengaja tidak menyusun peringkat individu. Data memungkinkannya, tetapi penjelasan yang paling mungkin, yaitu penjadwalan, berada di kolom yang tidak pernah dikumpulkan.

## **Telusur**

| Kesimpulan | Kekokohan | Yang akan membatalkannya |
| :---- | :---- | :---- |
| Peringkat cabang tidak layak dipakai | Kokoh | Hampir tidak ada: 31,8% pengacakan mencapai selisih yang sama |
| Ada perbedaan nyata antar-tenaga medis | Kokoh | Hanya 0,7% pengacakan mencapai rentangnya |
| Besarannya 6,4 menit, bukan 16,8 | Kokoh | Dua pendekatan berbeda, pengacakan dan penaikan ambang, sampai pada arah yang sama |
| Durasi konsultasi dan jumlah pasien tidak menjelaskannya | Kokoh | Keduanya lemah atau berganti tanda pada kelompok berpengamatan memadai |
| Spesialisasi tidak menjelaskannya | Rapuh | Satu spesialisasi hanya diwakili dua orang |
| Penyebab perbedaan | Tidak diketahui | Butuh jam kunjungan dan jumlah tenaga per sesi; keduanya tidak tercatat |

Artefak yang tersedia: workbook enam lembar dengan seluruh rumus terbuka. Catatan pembersihannya memuat empat aturan berurutan, tiga pemeriksaan bernilai nol, dan pemeriksaan tumpang tindih. Uji pengacakan berbasis rumus (50 ulangan per pengelompokan, dapat dijalankan ulang) diletakkan di bawah tabel tenaga medis, bersama tabel rentang pada lima ambang. Semuanya bisa diberikan atas permintaan, dengan nama individu dan lokasi disamarkan.
