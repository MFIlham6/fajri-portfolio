Studi Kasus: Waktu Tunggu Layanan Kesehatan

**Peringkat Cabang Tidak Bisa Dibedakan dari Undian, dan Perbedaan Antar-Tenaga Medis Tidak Bisa Diukur per Orang**

Analisis waktu tunggu pasien, jaringan klinik delapan cabang, Spreadsheet, lingkup 744 kunjungan bersih dari 782 baris mentah, waktu pengerjaan: 24 jam

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, mfajriilhamn@gmail.com

*Catatan data: angka-angka di bawah dihitung dari dataset yang dirancang meniru pola kunjungan klinik. Ini bukan data sebuah perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## Konteks

Sebuah jaringan klinik dengan delapan cabang menerima keluhan berulang mengenai waktu tunggu pasien. Manajemen ingin tahu di mana persoalannya sebelum memutuskan menambah dokter. Ada dua risiko. Pertama, tenaga yang ditempatkan di cabang yang salah menjadi biaya berjalan yang tidak menyelesaikan keluhan. Kedua, analisis waktu tunggu hampir selalu berujung pada pertanyaan tentang tenaga medis tertentu, dan kesimpulan yang keliru di sana menempel pada seseorang. Data tidak mencatat jam kunjungan maupun jumlah dokter bertugas per sesi, padahal keduanya penjelasan paling wajar untuk antrean panjang.

## Pertanyaan

"Cabang mana yang waktu tunggunya paling lama? Kami mau prioritaskan penambahan dokter di situ."

## Pendekatan

Aturan pembersihan ditulis berurutan sebelum menghitung, termasuk pemeriksaan yang hasilnya nol dan pemeriksaan tumpang tindih antar-aturan. Sebaran data diukur lebih dulu untuk mengetahui berapa pengamatan yang dibutuhkan sebelum sebuah rata-rata layak dibandingkan. Setiap rata-rata ditulis bersama jumlah pengamatannya. Perbedaan antar-kelompok diuji dengan mengacak ulang label kelompok sambil mempertahankan ukurannya. Uji yang sama dijalankan pada setiap pengelompokan, termasuk yang hasilnya mendukung temuan. Setelah itu syarat jumlah pengamatan dinaikkan bertahap, dan uji diulang pada kelompok yang tersisa.

Empat pendekatan ditolak. Yang pertama, menyusun peringkat kelompok dan melaporkan yang teratas. Cara ini paling langsung menjawab pertanyaan, tetapi peringkat selalu bisa disusun, bahkan ketika semua kelompok setara. Yang kedua, menerima pengelompokan yang memisahkan paling tajam sebagai temuan. Kelompok yang lebih banyak berarti tiap kelompok lebih kecil, dan kelompok kecil lebih sering menghasilkan nilai ekstrem. Yang ketiga, menghitung hubungan antar-ukuran pada seluruh data. Kelompok kecil ikut menarik hubungan itu, sehingga kaitan semu terdengar seperti hasil pemeriksaan. Yang keempat, menyampaikan kesimpulan yang menyebut individu. Data memungkinkannya, tetapi penyebab perbedaannya tidak diketahui. Kekeliruan tentang anggaran bisa dikoreksi, sedangkan kekeliruan tentang seseorang belum tentu bisa.

## Temuan

1. Peringkat cabang tidak bisa dibedakan dari undian. Selisih cabang tertinggi dan terendah 4,0 menit, dan 31,8% dari 2.000 pengacakan label menghasilkan selisih sebesar itu atau lebih. Departemen menunjukkan pola yang sama (2,6 menit, 33,4%).
2. Dikelompokkan menurut tenaga medis, selisihnya 16,8 menit dan hanya 0,7% pengacakan yang mencapainya, jadi perbedaan antar-tenaga medis memang ada. Tetapi pengacakan murni saja sudah menghasilkan rentang dengan median 11,6 menit, jadi sebagian besar angka mentah itu variasi acak.
3. Lebih dari separuh selisih itu hilang saat yang berkunjungan sedikit dikeluarkan, dan sisanya setara undian. Pada syarat minimal 20 kunjungan, rentangnya 6,4 menit (16 orang, turun 62%), dan keenam nama di kedua ujung peringkat berganti. Diuji ulang pada 16 orang ini, 89% pengacakan mencapai 6,4 menit (median 8,4 menit), dan tidak satu pun individu berbeda dari rata-rata keseluruhan melebihi batas ketidakpastiannya sendiri. Perbedaan yang lolos uji di temuan 2 datang dari lima orang dengan 12 sampai 19 kunjungan, yang rata-ratanya terlalu goyah untuk dinilai sendiri-sendiri.
4. Empat penjelasan diuji, dan tidak satu pun menjelaskan. Korelasi durasi konsultasi dengan waktu tunggu +0,32 pada seluruh tenaga (nyaris tidak lolos uji, p = 0,049) dan −0,38 pada 16 orang berdata memadai (p = 0,15, belum bisa dibedakan dari nol). Jumlah pasien lemah di kedua populasi (−0,22) dan arahnya berlawanan dengan dugaan. Departemen dan cabang sudah gugur di temuan 1.

**Gambar 1. Rentang nyata dan persentil 95 rentang hasil pengacakan, per pengelompokan**

![gambar 1](images/gambar-1.png)

*Batang biru adalah rentang nyata, batang abu-abu batas yang hanya dilampaui 5% pengacakan. Bandingkan panjang keduanya di tiap pengelompokan.*

**Gambar 2. Rentang rata-rata waktu tunggu antar-tenaga medis pada empat ambang jumlah kunjungan**

![gambar 2](images/gambar-2.png)

*Rata-rata dari sedikit kunjungan goyah: pada simpangan baku 11,5 menit, rata-rata dari 12 kunjungan punya ketidakpastian ±6,5 menit. Perhatikan lompatan antara ambang 15 dan 20.*

**Gambar 3. Korelasi durasi konsultasi dan jumlah kunjungan dengan waktu tunggu, per ambang jumlah kunjungan**

![gambar 3](images/gambar-3.png)

*Perhatikan tanda dan tinggi batang di tiap ambang. Dengan 16 orang, korelasi di bawah sekitar 0,5 belum bisa dibedakan dari nol.*

## Jawaban

Tidak ada cabang yang berbeda secara berarti. Perbedaan antar-tenaga medis ada, tetapi tidak bisa diukur per orang: pada yang berdata memadai, sisa selisihnya 6,4 menit dan setara undian. Penyebabnya tidak diketahui.

## Rekomendasi

Jangan memakai peringkat cabang untuk alokasi tenaga, dan jangan menetapkan target waktu tunggu per individu, karena dengan simpangan baku 11,5 menit target itu tercapai atau terlewat karena kebetulan. Catat jam kunjungan dan jumlah dokter bertugas per sesi selama tiga bulan. Dengan sekitar 50 kunjungan per bulan di seluruh jaringan, sebulan terlalu sedikit untuk dibandingkan. Kedua kolom itu murah dan bisa membedakan "seseorang bekerja lebih lambat" dari "sesi itu kekurangan orang". Telusuri juga sepuluh kunjungan yang konsultasinya berjalan tetapi pendapatannya tercatat nol (sekitar Rp1,6 juta bila memang belum dibayar).

## Batas

Penyebab perbedaan antar-tenaga medis tidak diketahui. Satu departemen hanya diwakili dua orang di antara yang datanya memadai, sehingga pengaruh spesialisasi belum tertutup penuh. Rata-rata 24,7 menit belum bisa dinilai wajar atau tidak tanpa pembanding dari luar. Analisis ini sengaja tidak menyusun peringkat individu. Data memungkinkannya, tetapi penjelasan yang belum bisa diuji, yaitu penjadwalan, berada di kolom yang tidak pernah dikumpulkan.

## Telusur

| Kesimpulan | Kekokohan | Yang akan membatalkannya |
|---|---|---|
| Peringkat cabang tidak layak dipakai | Kokoh | Data baru yang membuat kurang dari 5% pengacakan mencapai selisih antar-cabang; sekarang 31,8% |
| Ada perbedaan nyata antar-tenaga medis | Kokoh | Data baru yang membuat lebih dari 5% pengacakan mencapai rentangnya; sekarang 0,7% |
| Perbedaan itu tidak bisa diukur per orang | Kokoh | Kurang dari 5% pengacakan mencapai rentang tenaga berdata memadai; sekarang 89% |
| Durasi konsultasi dan jumlah pasien tidak menjelaskannya | Sedang | Korelasi di atas 0,5 pada tenaga berdata memadai; sekarang −0,38 dan −0,22 dari 16 orang |
| Spesialisasi tidak menjelaskannya | Rapuh | Rata-rata spesialisasi yang terpisah jelas setelah tiap spesialisasi punya minimal lima tenaga berdata memadai; sekarang ada yang hanya dua |
| Penyebab perbedaan | Tidak diketahui | Butuh jam kunjungan dan jumlah tenaga per sesi; keduanya tidak tercatat |

Artefak yang tersedia: workbook tujuh lembar dengan seluruh rumus terbuka. Catatan pembersihannya memuat empat aturan berurutan, tiga pemeriksaan bernilai nol, dan pemeriksaan tumpang tindih. Uji pengacakan berbasis rumus (50 ulangan per pengelompokan, dapat dijalankan ulang) diletakkan di bawah tabel tenaga medis, bersama tabel rentang pada empat ambang dan uji ulang pada tenaga berdata memadai. Semuanya bisa diberikan atas permintaan, dengan nama individu dan lokasi disamarkan.
