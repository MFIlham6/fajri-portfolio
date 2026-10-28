**Anggaran Retensi Hendak Dibagi ke Dua Departemen, Padahal Ketujuhnya Hanya Berselisih 7,3 Poin**

Analisis retensi karyawan, perusahaan teknologi menengah, Spreadsheet, 1.980 karyawan bersih dari 2.010 baris mentah

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, mfajriilhamn@gmail.com

*Catatan data: angka di bawah dihitung dari dataset simulasi yang meniru pola kepegawaian perusahaan teknologi. Ini bukan data perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

**Ringkasan.** Sebuah perusahaan teknologi menengah hendak membagi anggaran retensi ke dua departemen, dan meminta analisis untuk menentukan departemen mana. Analisis itu dikerjakan, dan hasilnya menunjukkan ketujuh departemen berada dalam rentang 7,3 poin persen, terlalu rapat untuk dijadikan dasar pembagian. Pekerjaan ini menyediakan pengelompokan pengganti yang memisahkan 7,6 sampai 9,4 kali lebih tajam.

**Kenapa laporan ini ada.** Anggaran retensi kuartal berikutnya hanya cukup untuk dua departemen, dan CEO akan memutuskan pembagiannya di rapat tinjauan kuartal. Keputusan itu tetap akan diambil, dengan atau tanpa analisis. Tanpa analisis ini, anggaran mengikuti peringkat yang bisa terbalik hanya karena 22 orang berbeda status, dan dua departemen tercap "bermasalah" di depan seluruh organisasi.

**Data.** Ekspor sistem kepegawaian: 2.010 baris, sepuluh kolom, tujuh departemen, potret per 1 April 2026. Setelah pembersihan tersisa 1.980 karyawan. Tidak ada tanggal resign, alasan resign, maupun data atasan langsung, dan kolom tanggal promosi tidak layak dipakai karena 240 tanggalnya jatuh setelah tanggal acuan.

**Yang dikerjakan.** Analisis yang diminta dikerjakan lebih dulu dan lengkap, karena tanpa angkanya pernyataan "tidak layak dipakai" hanya pendapat. Setelah itu empat pengelompokan lain diuji sebagai pembanding, dua yang terkuat disilangkan untuk memeriksa apakah keduanya mengukur hal yang sama, dan beban kerja per departemen diperiksa untuk menutup dugaan bahwa departemen berbeda karena bebannya. Pendekatan yang ditolak: membuang semua baris bersel kosong, yang akan menghapus 32,0% karyawan, padahal tanggal promosi kosong berarti belum pernah dipromosikan, bukan data hilang. Juga ditolak: memeriksa kualitas data hanya lewat sel kosong dan nilai negatif. Keduanya melaporkan bersih, padahal lima karyawan tercatat bekerja 26 sampai 29 jam sehari.

**Gambar 1. Departemen memisahkan 7,3 poin, jam kerja dan kepuasan 7,6 dan 9,4 kali lebih lebar.**  
![gambar 1](images/gambar-1.png)  
*Rentang tingkat resign pada lima cara mengelompokkan 1.980 karyawan bersih. Perhatikan betapa pendek batang oranye departemen dan dua batang abu-abu dibanding dua batang biru.*

**Gambar 2. Nol dari 263 orang, lalu naik di setiap kelompok sampai lebih dari separuh.**  
![gambar 2](images/gambar-2.png)  
*Tingkat resign pada lima kelompok jam kerja per hari, dari 1.980 karyawan bersih. Perhatikan batang pertama yang panjangnya nol, dan panjang batang yang naik di setiap kelompok berikutnya.*

**Gambar 3. Kepuasan masih membedakan setelah jam kerja disamakan.**  
![gambar 3](images/gambar-3.png)  
*Tingkat resign untuk enam gabungan jam kerja dan kepuasan, dari 1.980 karyawan bersih. Perhatikan bahwa di setiap baris batang biru (kepuasan di bawah 3,0) lebih panjang daripada batang abu-abu, dan baris jam pendek tidak punya batang biru karena memang tidak ada karyawannya.*

**Temuan.**

* Ketujuh departemen berada dalam rentang 7,3 poin persen (14,2% sampai 21,5%). Pada departemen teratas, 22 orang berbeda status sudah cukup memindahkannya ke posisi terbawah.  
* Jam kerja memisahkan 56,1 poin dan kepuasan 69,0 poin, yaitu 7,6 dan 9,4 kali rentang departemen. Dari 263 karyawan berjam kerja di bawah delapan jam, tidak seorang pun resign.  
* Kedua faktor terkuat bergerak bersama, tetapi tidak saling menggantikan: pada karyawan berjam kerja 11 jam ke atas, kepuasan di bawah 3,0 berkaitan dengan tingkat resign 48,1 poin lebih tinggi (68,1% dibanding 20,0%).  
* Dua dugaan populer tidak didukung data: karyawan dengan skor performa di atas 4,0 resign 17,2%, hampir sama dengan rata-rata 17,8%, dan kelompok gaji terendah serta tertinggi resign pada tingkat hampir sama (19,0% dan 18,0%).

**Apa yang berubah pada keputusannya.** Sebelum analisis, anggaran akan dibagi ke dua departemen berdasarkan peringkat. Sesudahnya, sasarannya berubah menjadi 360 karyawan berjam kerja 11 jam ke atas, yaitu 18,2% karyawan yang menyumbang 57,4% resign dan ada di setiap departemen (16,1% sampai 20,7% karyawannya), sehingga pembagian per departemen tidak lagi relevan. Program yang disiapkan cukup satu, yang menyasar jam kerja panjang sekaligus kepuasan rendah, karena kedua faktor bertemu pada kelompok yang sama. Selain itu, input jam kerja diberi pemeriksaan batas setelah ditemukan lima catatan yang mustahil.

**Batas.** Seluruh data adalah potret satu waktu tanpa urutan kejadian, sehingga tidak ada kesimpulan sebab-akibat yang sah, hanya kaitan. Faktor ketiga yang tidak tercatat bisa menjelaskan angka yang sama. Tidak ada wawancara keluar, data atasan langsung, maupun pembeda jabatan, dan kolom tanggal promosi tidak dapat dipakai.

**Telusur.** Workbook sembilan tab dengan seluruh rumus terbuka, catatan pembersihan yang juga mencatat keputusan mempertahankan data, tabel pembanding lima pengelompokan, dan catatan keputusan yang memuat asumsi serta dampak tiap keputusan pembersihan.
