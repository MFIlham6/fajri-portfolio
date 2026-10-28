Studi Kasus · Analisis Retensi Pelanggan Berlangganan

# **Retensi Kohort Baru Tampak Runtuh 50 Poin, dan Penurunan Itu Ternyata Artefak Jendela Pengamatan**

Analisis kohort dan retensi · perusahaan perangkat lunak berlangganan · Spreadsheet · lingkup lebih dari sepuluh ribu pengguna, 15 kohort bulanan

Mochamad Fajri Ilham Nurdin · dikerjakan Oktober 2026 · [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Catatan data: angka-angka di bawah dihitung dari dataset yang dirancang meniru pola langganan perangkat lunak. Ini bukan data sebuah perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## **Konteks**

Sebuah perusahaan perangkat lunak berlangganan untuk usaha kecil-menengah, berumur dua tahun dengan empat tingkat paket dari gratis sampai korporat, sedang menyiapkan penggalangan dana putaran pertama. Pendirinya membutuhkan matriks retensi per kelompok pendaftaran untuk materi presentasi. Angka yang runtuh saat ditanya balik akan merusak kepercayaan pada seluruh materi, dan presentasinya dijadwalkan minggu berikutnya. Data hanya memuat tanggal aktif terakhir, bukan riwayat aktivitas. Karena itu "bertahan" berarti jarak dari tanggal daftar ke tanggal aktif terakhir, dan definisi ini cenderung melebihkan.

## **Pertanyaan**

"Bikin matriks retensi per kohort. Investor mau lihat apakah kohort baru bertahan lebih baik daripada kohort lama."

## **Pendekatan**

Aturan pembersihan ditulis berurutan sebelum menghitung, termasuk pemeriksaan yang hasilnya nol. Kapan data diambil disimpulkan dari sebaran tanggal aktivitas, karena berkasnya tidak mencatatnya. Matriks disusun apa adanya lebih dulu supaya bentuk cacatnya terlihat, lalu sel di luar jendela pengamatan tiap kelompok dikosongkan. Setiap perbedaan antar-kelompok diuji dengan memperketat syarat pembandingnya, dan seluruh perhitungan diulang dengan satuan pendapatan.

Tiga pendekatan ditolak. Yang pertama, membaca satu kolom matriks dari kelompok tertua ke termuda. Cara ini paling alami, tetapi urutannya mengikuti lamanya tiap kelompok diamati, bukan kualitasnya. Yang kedua, menganggap sel terakhir yang terukur di tiap baris sudah final. Pengguna yang masih aktif bisa saja belum sempat tercatat aktif lagi menjelang tanggal potong. Yang ketiga, memakai jumlah pengguna sebagai satu-satunya ukuran. Pengguna gratis dan pelanggan terbesar memberi dampak yang sangat berbeda pada kelangsungan bisnis.

## **Temuan**

1. **Hampir 40% pengguna tercatat aktif terakhir di bulan yang sama.** Bulan itu adalah bulan data diambil, bukan gelombang berhenti. Jumlahnya dua kali lipat bulan sebelumnya, dan tidak ada satu pun aktivitas sesudahnya.  
2. **Matriks apa adanya memuat 47% sel yang tidak pernah diukur, tetapi tertulis sebagai nol.** Nol-nol itu membentuk tangga yang rapi sempurna, keteraturan yang tidak mungkin lahir dari perilaku pelanggan.  
3. **Penurunan retensi bulan ketiga sebesar 50,2 poin antar-kelompok ternyata artefak.** Rentangnya menyusut jadi 17,0, lalu 5,2, lalu 0,8 poin saat pembandingnya dibatasi ke kelompok yang jendelanya setara. Pola yang sama muncul di bulan pertama dan bulan keenam. Selain itu, pada bulan kalender yang sama, laju kepergian hampir identik untuk kelompok tua maupun muda (selisih ≤4 poin). Angkanya bergerak mengikuti bulan kalender.  
4. **Kelompok tertua mempertahankan 52,2% pengguna di bulan kedua belas, tetapi 76,0% pendapatannya.** Selisih itu melebar dari 7,0 poin di bulan ketiga menjadi 23,7 poin di bulan kedua belas, karena 62% pengguna yang pergi berasal dari tingkat gratis.

**Gambar 1. Nol yang membentuk tangga rapi adalah sel yang belum terukur.**

![gambar 1](images/gambar-1.png)

Matriks 15 kelompok × 15 kolom umur. Perhatikan tepi tangganya: tiap baris ke bawah kehilangan tepat satu bulan pengamatan. Sel abu-abu adalah waktu yang belum berjalan, bukan retensi nol persen.

**Gambar 2. Rentangnya menyusut begitu kelompok yang dibandingkan punya jendela setara.**

![gambar 2](images/gambar-2.png)

Rentang retensi bulan ketiga pada empat tingkat keketatan syarat. Perhatikan bahwa rentangnya terus menyusut di setiap tingkat yang lebih ketat, sampai hampir hilang.

**Gambar 3. Dua angka retensi dari kelompok yang sama, dan keduanya benar.**

![gambar 3](images/gambar-3.png)

Yang berbeda hanya penyebutnya, yaitu jumlah orang atau jumlah rupiah. Selisihnya seluruhnya berasal dari siapa yang pergi.

**Gambar 4. Laju kepergian mengikuti kalender, bukan umur kelompok.**

![gambar 4](images/gambar-4.png)

Laju kepergian bulanan gabungan semua kelompok, menurut bulan kalender. Tiga batang terakhir bercampur dengan pengguna yang belum sempat tercatat aktif lagi. Karena itu tiga sel terakhir di setiap baris matriks pun belum boleh dibaca sebagai retensi final.

## **Jawaban**

**Belum bisa dijawab dengan data yang tersedia.** Enam kelompok yang jendelanya setara bertahan 87% sampai 93% di bulan ketiga. Rentangnya 5,2 poin, terlalu sempit untuk menyatakan arah. Perbandingan penuh baru mungkin setelah kelompok paruh kedua mencapai umur yang sebanding, sekitar enam bulan lagi.

## **Rekomendasi**

Sampaikan kedua angka retensi berdampingan, dengan angka yang lebih rendah lebih dulu. Nyatakan syarat perbandingan di materi presentasi sebelum ditanya. Jangan menyimpulkan arah perubahan retensi ke mana pun. Sebelum presentasi, cocokkan kenaikan laju kepergian di tiga bulan terakhir dengan data status langganan. Perbaiki juga pencatatan pendapatan bernilai negatif pada tingkat gratis.

## **Batas**

"Bertahan" diukur dari tanggal aktif terakhir, bukan status langganan, sehingga cenderung melebihkan. Tidak ada riwayat perpindahan paket, jadi tidak bisa dinyatakan berapa pelanggan gratis yang akhirnya berbayar, dan temuan per paket tidak mendukung keputusan menghentikan tingkat gratis. Retensi pendapatan di sini tidak bisa melewati 100%, berbeda dari ukuran yang lazim dipakai di industri ini. Data juga tidak bisa memisahkan pengguna yang benar-benar pergi dari yang belum tercatat aktif lagi menjelang tanggal potong.

## **Telusur**

| Kesimpulan | Kekokohan | Yang akan membatalkannya |
| :---- | :---- | :---- |
| Data dipotong di akhir bulan terakhir | Kokoh | Hampir tidak ada: 38% pengguna menumpuk di satu bulan, 2,1 kali bulan sebelumnya, tanpa satu pun tanggal sesudahnya |
| Penurunan antar-kelompok adalah artefak | Kokoh | Rentang menyusut monoton dari 50,2 ke 0,8 poin, dengan pola yang sama di tiga umur |
| Retensi pendapatan jauh di atas retensi pengguna | Kokoh | Selisihnya melebar konsisten di bulan ke-3, 6, 9, dan 12 |
| Kelompok yang sebanding berperilaku serupa | Rapuh | Hanya enam kelompok, semuanya dari paruh pertama, dan laju kepergiannya ikut naik mengikuti kalender |
| Retensi membaik atau memburuk | Tidak didukung | Cakupan data belum cukup untuk menjawab ke arah mana pun |

Artefak yang tersedia: workbook dengan seluruh rumus terbuka (enam lembar kontrak ditambah lembar validasi, uji pembanding, dan tanggal potong). Catatan pembersihan mencatat delapan aturan berurutan, tiga pemeriksaan bernilai nol, dan dasar penyimpulan tanggal ekstraksi. Matriks tersedia dalam dua versi, sebelum dan sesudah pembatasan jendela, dan tujuh gerbang validasi lolos seluruhnya. Semuanya bisa diberikan atas permintaan, dengan angka mutlak disamarkan.
