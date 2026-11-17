Studi Kasus: Analisis Retensi Pelanggan Berlangganan

**Retensi Kohort Baru Tampak Runtuh 50 Poin, dan Sebagian Besar Penurunan Itu Artefak Jendela Pengamatan**

Analisis kohort dan retensi, perusahaan perangkat lunak berlangganan, Spreadsheet, lingkup lebih dari sepuluh ribu pengguna, 15 kohort bulanan, waktu pengerjaan: 24 jam

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, mfajriilhamn@gmail.com

*Catatan data: angka-angka di bawah dihitung dari dataset yang dirancang meniru pola langganan perangkat lunak. Ini bukan data sebuah perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## Konteks

Sebuah perusahaan perangkat lunak berlangganan untuk usaha kecil-menengah, berumur dua tahun dengan empat paket dari gratis sampai korporat, sedang menyiapkan penggalangan dana putaran pertama. Pendirinya membutuhkan matriks retensi per kohort pendaftaran untuk materi presentasi. Angka yang runtuh saat ditanya balik akan merusak kepercayaan pada seluruh materi, dan presentasinya dijadwalkan minggu berikutnya. Data hanya memuat tanggal aktif terakhir, bukan riwayat aktivitas. Karena itu "bertahan" berarti jarak dari tanggal daftar ke tanggal aktif terakhir, dan definisi ini cenderung melebihkan.

## Pertanyaan

"Bikin matriks retensi per kohort. Investor mau lihat apakah kohort baru bertahan lebih baik daripada kohort lama."

## Pendekatan

Aturan pembersihan ditulis berurutan sebelum menghitung, termasuk pemeriksaan yang hasilnya nol. Kapan data diambil disimpulkan dari sebaran tanggal aktivitas, karena berkasnya tidak mencatatnya. Matriks disusun apa adanya lebih dulu supaya bentuk cacatnya terlihat, lalu sel di luar jendela pengamatan tiap kohort dikosongkan. Setiap perbedaan antar-kohort diuji dengan memperketat syarat pembandingnya, sisa selisihnya diuji secara statistik, dan seluruh perhitungan diulang dengan satuan pendapatan.

Tiga pendekatan ditolak. Yang pertama, membaca satu kolom matriks dari kohort tertua ke termuda. Cara ini paling alami, tetapi urutannya mengikuti lamanya tiap kohort diamati, bukan kualitasnya. Yang kedua, menganggap sel terakhir yang terukur di tiap baris sudah final. Pengguna yang masih aktif bisa saja belum sempat tercatat aktif lagi menjelang tanggal potong. Yang ketiga, memakai jumlah pengguna sebagai satu-satunya ukuran. Pengguna gratis dan pelanggan terbesar memberi dampak yang sangat berbeda pada kelangsungan bisnis.

## Temuan

1. Hampir 40% pengguna tercatat aktif terakhir di bulan yang sama. Bulan itu adalah bulan data diambil, bukan gelombang berhenti. Jumlahnya dua kali lipat bulan sebelumnya, dan tidak ada satu pun aktivitas sesudahnya.
2. Matriks apa adanya memuat 47% sel yang tidak pernah diukur, tetapi tertulis sebagai nol. Nol-nol itu membentuk tangga yang rapi sempurna, keteraturan yang tidak mungkin lahir dari perilaku pelanggan.
3. Sebagian besar penurunan retensi bulan ketiga sebesar 50,2 poin antar-kohort adalah artefak. Rentangnya menyusut jadi 17,0, lalu 5,2, lalu 0,8 poin saat pembandingnya dibatasi ke kohort yang jendelanya setara, dan pola yang sama muncul di bulan pertama dan bulan keenam. Sisa selisihnya nyata: di antara enam kohort yang sebanding, kohort Mei dan Juni 2025 bertahan 87,7% di bulan ketiga, di bawah kohort Januari sampai April (92,1%), dan selisih ini terlalu besar untuk kebetulan (z = 4,5). Selisih itu sejalan dengan laju kepergian yang naik mengikuti bulan kalender. Pada bulan kalender yang sudah mapan, laju kepergian kohort tua dan muda hanya berselisih 4 poin atau kurang.
4. Kohort tertua mempertahankan 52,2% pengguna di bulan kedua belas, tetapi 76,0% pendapatannya. Selisih itu melebar dari 7,0 poin di bulan ketiga menjadi 23,7 poin di bulan kedua belas, karena 62% pengguna yang pergi berasal dari paket gratis. Angka bulan kedua belas masih sementara karena baru berjarak dua bulan dari tanggal potong. Angka bulan kesembilan yang sudah mapan adalah 71,1% pengguna dan 90,8% pendapatan.

**Gambar 1. Matriks retensi apa adanya, 15 kohort × 15 kolom umur.**

![gambar 1](images/gambar-1.png)

*Perhatikan tepi tangganya: tiap baris ke bawah kehilangan tepat satu bulan pengamatan. Sel abu-abu adalah waktu yang belum berjalan, bukan retensi nol persen.*

**Gambar 2. Rentang retensi bulan ketiga antar-kohort pada empat tingkat syarat.**

![gambar 2](images/gambar-2.png)

*Tiap batang adalah selisih kohort tertinggi dan terendah. Perhatikan seberapa jauh rentangnya menyusut di tiap tingkat yang lebih ketat, dan sisa 5,2 poin pada syarat enam bulan yang dipakai di jawaban.*

**Gambar 3. Retensi pengguna dan retensi pendapatan kohort Januari 2025.**

![gambar 3](images/gambar-3.png)

*Yang berbeda hanya penyebutnya, yaitu jumlah orang atau jumlah rupiah. Perhatikan selisihnya melebar dari bulan ketiga ke bulan kedua belas, seiring makin banyak pengguna gratis yang pergi.*

**Gambar 4. Laju kepergian bulanan gabungan semua kohort, menurut bulan kalender.**

![gambar 4](images/gambar-4.png)

*Tiga batang terakhir bercampur dengan pengguna yang belum sempat tercatat aktif lagi. Karena itu tiga sel terakhir di setiap baris matriks pun belum boleh dibaca sebagai retensi final.*

## Jawaban

Belum bisa dijawab dengan data yang tersedia, dan data yang ada tidak menunjukkan kohort baru lebih baik. Enam kohort yang jendelanya setara bertahan 87% sampai 93% di bulan ketiga, dan kohort Mei dan Juni 2025 berada 4 sampai 5 poin di bawah kohort Januari sampai April. Selisih itu belum bisa dipisahkan dari kenaikan laju kepergian menurut bulan kalender. Perbandingan penuh baru mungkin setelah kohort paruh kedua mencapai umur yang sebanding, sekitar enam bulan lagi.

## Rekomendasi

Sampaikan kedua angka retensi berdampingan, dengan angka yang lebih rendah lebih dulu, dan tandai angka bulan kedua belas sebagai sementara. Nyatakan syarat perbandingan di materi presentasi sebelum ditanya. Jangan menyatakan retensi membaik, dan sebutkan bahwa selisih antar-kohort yang tersisa belum terpisah dari efek kalender. Sebelum presentasi, cocokkan kenaikan laju kepergian di tiga bulan terakhir dengan data status langganan. Minta tim pencatat menjelaskan sepuluh baris MRR negatif, enam di antaranya pada paket gratis.

## Batas

"Bertahan" diukur dari tanggal aktif terakhir, bukan status langganan, sehingga cenderung melebihkan. Tidak ada riwayat perpindahan paket, jadi tidak bisa dinyatakan berapa pelanggan gratis yang akhirnya berbayar, dan temuan per paket tidak mendukung keputusan menghentikan paket gratis. Retensi pendapatan di sini tidak bisa melewati 100%, berbeda dari ukuran yang lazim dipakai di industri ini. Data juga tidak bisa memisahkan pengguna yang benar-benar pergi dari yang belum tercatat aktif lagi menjelang tanggal potong.

## Telusur

| Kesimpulan | Kekokohan | Yang akan membatalkannya |
|---|---|---|
| Data dipotong di akhir bulan terakhir | Kokoh | Log ekspor menyebut tanggal lain, atau ekspor ulang memunculkan tanggal aktif sesudah 31 Maret 2026 pada pengguna yang sama |
| Sebagian besar penurunan antar-kohort adalah artefak | Kokoh | Kohort Juli sampai Desember 2025, setelah jendelanya setara pada data September 2026, tetap berselisih puluhan poin dari kohort paruh pertama |
| Retensi pendapatan jauh di atas retensi pengguna | Kokoh | MRR yang tercatat bukan MRR saat pengguna pergi, misalnya pengguna gratis yang pergi ternyata dulunya berbayar |
| Kohort Mei dan Juni 2025 lebih rendah karena efek kalender | Rapuh | Pada bulan kalender yang sama, laju kepergian kohort Mei dan Juni tetap lebih tinggi dari kohort Januari sampai April |
| Retensi membaik atau memburuk | Tidak didukung | Data status langganan akhir 2025 sampai awal 2026, yang bisa memisahkan efek kalender dari kualitas kohort |

Artefak yang tersedia: workbook 12 lembar dengan seluruh rumus terbuka, dari data mentah, pembersihan, dan matriks sampai validasi, uji pembanding, tanggal potong, dan pemeriksaan tepi jendela. Catatan pembersihan mencatat delapan aturan berurutan, empat pemeriksaan bernilai nol, dan dasar penyimpulan tanggal ekstraksi. Matriks tersedia dalam dua versi, sebelum dan sesudah pembatasan jendela, dan 18 pemeriksaan validasi lolos seluruhnya. Semuanya bisa diberikan atas permintaan, dengan angka mutlak disamarkan.
