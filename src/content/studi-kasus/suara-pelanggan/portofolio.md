**Skor Kepuasan Naik, Niat Berhenti Ikut Naik: Menyajikan Ulang 4.723 Respons Survei**

Sebuah penyedia internet rumahan dengan 180.000 pelanggan hendak membelanjakan Rp 4,8 miliar per tahun untuk 40 teknisi lapangan, dengan anggapan pelanggan pergi karena jaringan. Survei tahunannya sudah dianalisis, tetapi layar rapat hanya menampilkan skor keseluruhan yang naik. Saya menyusun ulang layar itu dari data yang sama, tanpa mengubah satu angka pun, sampai terlihat dimensi mana yang membedakan pelanggan yang berniat berhenti.

Mochamad Fajri Ilham Nurdin, dikerjakan November 2026, dashboard, memo, dan perhitungan: folder Google Drive, mfajriilhamn@gmail.com

Perusahaan, tokoh, dan datanya rekaan, dibuat untuk latihan. Seluruh angka di bawah dihitung dari satu berkas survei yang sama dan bisa dihitung ulang siapa pun.

## Ringkasan

**Kenapa laporan ini ada.** Churn bulanan perusahaan naik dari 1,8% ke 2,6%, sekitar 3.240 menjadi 4.680 pelanggan yang pergi tiap bulan. Rapat anggaran dibuka dengan skor kepuasan keseluruhan yang naik dari 3,40 ke 3,65 sepanjang 2025. Selama angka itu yang terpampang, menambah teknisi terdengar sebagai satu-satunya usulan yang masuk akal, dan analisis tandingan dari tim Customer Experience dua kali tidak mengubah keputusan.

**Data.** Survei pelanggan Januari sampai Desember 2025: 4.723 respons dari enam kota, lima dimensi penilaian bernilai 1 sampai 5, satu skor keseluruhan, satu pertanyaan apakah akan melanjutkan berlangganan, dan kategori keluhan yang diisi 1.564 responden. Tidak ada data yang ditambahkan dari luar berkas itu.

**Yang saya putuskan.** Tiga keputusan penyajian, masing-masing dengan bentuk yang saya tolak:

Skor keseluruhan dipecah menjadi tiga garis dalam satu bidang, dengan layanan pelanggan sebagai satu-satunya garis berwarna.

Ditolak: satu garis skor keseluruhan. Garis itu naik, dan kenaikannya menutupi dimensi yang turun di bawahnya.

Pendorong niat berhenti ditampilkan sebagai selisih skor antara dua kelompok responden.

Ditolak: rata-rata lima dimensi setahun. Bentuk itu tidak membandingkan siapa pun, dan dimensi dengan rata-rata tertinggi justru tampak paling aman.

Kecepatan ditampilkan sebagai sebaran nilai per kota.

Ditolak: kartu rata-rata. Rata-ratanya jatuh di nilai yang paling jarang dipilih responden.

**Gambar 1. Skor rata-rata per bulan: keseluruhan, layanan pelanggan, dan harga**

![gambar 1](images/gambar-1.png)

*Rata-rata skor 1 sampai 5 per bulan, Januari sampai Desember 2025, dari halaman Overview dashboard Power BI. Perhatikan garis layanan pelanggan yang turun sepanjang tahun sementara garis harga melompat saat promo Juli.*

**Gambar 2. Dimensi mana yang membedakan responden yang berniat berhenti**

![gambar 2](images/gambar-2.png)

*Rata-rata skor responden yang akan lanjut dikurangi yang berniat berhenti, per dimensi. Perhatikan panjang batang layanan pelanggan dibanding dimensi lain.*

**Gambar 3. Dari mana belahan nilai kecepatan berasal**

![gambar 3](images/gambar-3.png)

*Komposisi nilai kecepatan per kota dari halaman Diagnosis: emas = nilai 1 sampai 2, abu-abu tua = 4 sampai 5. Perhatikan tiga kota jaringan lama di atas dan tiga kota jaringan baru di bawah.*

**Temuan.** (Gambar 1) Skor keseluruhan naik 3,40 ke 3,65 bersamaan dengan lompatan harga 2,91 ke 4,13 saat promo Juli, sementara layanan pelanggan turun setiap bulan, 3,66 ke 2,77. (Gambar 2) Layanan pelanggan berselisih +0,37 antara yang akan lanjut dan yang tidak, kecepatan dan stabilitas +0,06, dan harga −0,12. (Gambar 3 dan 4) Kecepatan rata-rata 3,64 terbelah: 26,9% memberi 1 sampai 2 dan 66,3% memberi 4 sampai 5, dan 1.271 dari 1.272 nilai rendah datang dari Bandung, Medan, dan Balikpapan.

**Apa yang berubah pada keputusannya.** Pertanyaan rapat bergeser dari berapa teknisi yang perlu ditambah menjadi dimensi mana yang membedakan pelanggan yang berniat pergi. Layar ini tidak memutuskan anggarannya. Ia membuat usulan teknisi bisa dinilai terhadap dimensi yang ditunjukkan data.

**Batas.** Survei mengukur niat berhenti (18,3%, 862 responden), bukan pelanggan yang sudah pergi (churn aktual 2,6% per bulan), dan keduanya tidak boleh dikalikan menjadi rupiah. Juni hanya disurvei satu minggu (80 respons, bulan lain rata-rata 422) dan ditandai terpisah. Layar ini tidak menilai apakah perbaikan jaringan layak secara biaya.

**Telusur.** Seluruh angka dihitung dari satu berkas survei 4.723 baris. Skrip hitungnya ada di folder pendukung.

## Konteks

Perusahaan ini melayani rumah tangga di enam kota: Jakarta, Bandung, Surabaya, Semarang, Medan, dan Balikpapan. Sepanjang 2025, angka yang paling sering dibahas manajemen adalah churn, pelanggan yang berhenti berlangganan tiap bulan. Kenaikan dari 1,8% ke 2,6% berarti sekitar 1.440 rumah tangga tambahan pergi setiap bulan.

Direktur Operasional menyimpulkan bahwa penyebabnya jaringan dan mengusulkan 40 teknisi lapangan senilai Rp 4,8 miliar per tahun. Kesimpulan itu wajar dari tempatnya berdiri: ia menerima keluhan teknis dari lapangan, dan pelanggan internet yang kecewa biasanya kecewa pada internetnya. Usulannya konkret, terukur, dan siap dijalankan.

Kepala Customer Experience punya analisis survei yang menunjuk ke arah lain. Dua kali analisis itu dibawa ke rapat dewan direksi, dan dua kali dewan menutup pembahasan dengan menunjuk skor kepuasan keseluruhan yang naik. Masalahnya ada pada apa yang tampil di layar, bukan pada perhitungannya.

**Yang dipertaruhkan.** Kalau layar rapat ketiga tetap menampilkan angka yang sama, anggaran Rp 4,8 miliar dibelanjakan dengan dasar yang belum diuji terhadap data survei.

**Batas proyek.** Pekerjaan ini menyajikan ulang data yang sudah ada untuk satu rapat. Ia tidak mencari pola baru di luar empat pertanyaan rapat, tidak memakai data penagihan, dan tidak menghitung biaya alternatif.

Empat pertanyaan yang harus bisa dijawab dari satu layar, tanpa penyaji yang menjelaskan:

1. Apakah kepuasan pelanggan benar-benar membaik tahun ini?
2. Dimensi layanan mana yang paling menentukan orang bertahan atau pergi?
3. Kota mana yang paling layak ditangani lebih dulu, dan seberapa yakin kita?
4. Apakah menambah 40 teknisi lapangan menjawab masalah yang benar?

## Kerangka kerja

Tiap elemen layar melewati lima langkah yang sama, berurutan, karena tiap langkah menutup pilihan bagi langkah berikutnya.

1. **Pertanyaan.** Satu pertanyaan utuh yang dijawab elemen itu. Ujinya: bisakah dua jawaban yang berlawanan dibayangkan? Kalau tidak, yang tertulis baru topik.
2. **Metrik.** Rata-rata, proporsi, selisih antarkelompok, atau sebaran penuh. Keempatnya dihitung dari data yang sama dan bisa menghasilkan kesimpulan berbeda, jadi pilihan metrik dicatat sebagai keputusan, berikut jumlah responden di belakangnya.
3. **Bentuk.** Pesan ditulis sebagai kalimat dulu, lalu kata kuncinya menentukan hubungan data: naik dan turun berarti deret waktu, selisih berarti deviasi, lebih besar dari berarti peringkat, sebaran berarti distribusi. Bentuk yang ditolak ikut dicatat dengan alasannya.
4. **Layar.** Posisi dan ukuran. Ringkasan di kiri atas, elemen yang membalik kesimpulan lama mendapat ruang terbesar, semuanya muat tanpa gulir.
5. **Kesimpulan.** Satu kalimat yang menempel di elemen, menyatakan temuan dengan angka, tidak mengklaim sebab yang tidak bisa ditunjukkan data, dan muat satu baris.

**Aturan yang saya pegang di seluruh layar.** Setiap angka tampil dengan jumlah respondennya. Bulan yang tidak sebanding ditandai. Sumbu batang mulai dari nol. Satu warna sorotan per elemen, dan warna itu selalu berarti hal yang sama. Dua metrik yang berbeda tidak memakai satu nama. Tidak ada filter yang bisa menghilangkan kesimpulan utama. Tidak ada pie, efek tiga dimensi, atau sumbu ganda.

**Cara memvalidasi.** Setiap angka di layar dihitung ulang dari berkas mentah oleh skrip, bukan diketik dari gambar. Layar kemudian diuji ke satu orang yang tidak terlibat: ia melihat selama sepuluh detik, lalu menyebut apa yang ia baca lebih dulu dan kesimpulan apa yang ia bawa.

## Temuan dan rekomendasi

**Kepuasan tidak membaik di dimensi layanan**

Skor keseluruhan naik dari 3,40 di Januari ke 3,65 di Desember. Kenaikannya terjadi bersamaan dengan satu dimensi: harga, dari 2,91 di Mei ke 4,13 di Juli, bulan promo diskon dimulai, lalu bertahan di 4,08 sampai 4,14. Layanan pelanggan turun setiap bulan tanpa sekali pun berbalik, dari 3,66 ke 2,77, turun 0,89 poin. Dalam periode yang sama, porsi responden yang menyatakan tidak akan lanjut naik dari 11,3% ke 22,1% (Gambar 1).

**Layanan pelanggan satu-satunya dimensi yang membedakan**

Responden yang akan lanjut memberi layanan pelanggan 3,28, yang tidak memberi 2,91, selisih +0,37. Kecepatan dan stabilitas masing-masing +0,06, pemasangan 0,00, harga −0,12 (Gambar 2). Saya memeriksa apakah pola ini hanya efek promo dengan membelah tahun: Januari sampai Juni layanan pelanggan +0,34 dan kecepatan +0,16, Juli sampai Desember layanan pelanggan +0,30 dan kecepatan −0,01. Layanan pelanggan memimpin di kedua paruh.

**Gambar 4. Niat berhenti menurut nilai yang diberikan responden**

![gambar 4](images/gambar-4.png)

*Persen responden yang berniat berhenti menurut nilai yang mereka berikan (1 = terburuk). Perhatikan garis layanan pelanggan yang turun tajam dibanding garis kecepatan yang datar.*

Gambar 6 membaca hubungan yang sama dari arah sebaliknya. Di antara responden yang memberi layanan pelanggan nilai 1, 32,6% menyatakan tidak akan lanjut, dan di antara yang memberi 5 hanya 4,2%. Menurut nilai kecepatan, angkanya datar di 17,3% sampai 20,9%.

**Masalah jaringan nyata, tetapi bukan pembeda**

Kecepatan di Bandung 1,73, Medan 1,72, dan Balikpapan 1,76, sementara Jakarta, Surabaya, dan Semarang 4,43 sampai 4,45 (Gambar 4). Skor serendah itu tetap tampil di layar, karena menyembunyikannya akan meruntuhkan seluruh argumen pada pertanyaan pertama dari pihak operasional. Yang tidak didukung data adalah anggapan bahwa perbaikan jaringan akan menahan pelanggan yang sedang berniat pergi.

Satu angka mendukung sebagian usulan teknisi. Di antara 1.564 responden yang mengisi kategori keluhan, yang mengeluh teknisi lama datang menyatakan tidak akan lanjut 23,0% (343 orang), di atas rata-rata 18,3%. Yang tertinggi adalah sulit menghubungi CS, 27,1% (340 orang).

**Jakarta lebih dulu**

**Gambar 5. Persen responden yang menyatakan tidak akan lanjut, per kota**

![gambar 5](images/gambar-5.png)

*Persen berniat berhenti per kota; label memuat jumlah yang berniat berhenti dan jumlah responden. Perhatikan Jakarta, yang persennya tertinggi dan respondennya terbanyak.*

Jakarta menyumbang 1.850 responden, niat berhenti 20,2%, dan 374 dari 862 responden yang berniat berhenti. Skor layanan pelanggannya turun dari 3,37 di Januari ke 2,50 di Desember. Balikpapan punya skor layanan terendah (2,80) tetapi dari 45 responden, di bawah ambang 100 yang saya tetapkan untuk pemeringkatan.

**Rekomendasi**

- **Tunda** pengadaan 40 teknisi sampai rapat berikutnya, lalu putuskan ulang berdampingan dengan rencana perbaikan layanan pelanggan.
- **Ubah** prioritas kuartal ini ke layanan pelanggan Jakarta. Tim Customer Experience menyusun target skor dan waktu tanggap dalam dua minggu.
- **Lanjutkan** perbaikan jaringan di Bandung, Medan, dan Balikpapan sebagai usulan terpisah dengan hitungan biayanya sendiri. Kalau teknisi tetap ditambah, ukur hasilnya dari waktu kedatangan teknisi.

**Batas kesimpulan**

- Niat berhenti 18,3% (862 dari 4.723 responden) adalah jawaban survei. Churn aktual 2,6% per bulan berasal dari penagihan. Keduanya tidak dibandingkan di satu sumbu dan tidak dikalikan menjadi rupiah.
- Hubungan yang ditunjukkan bersifat asosiasi. Data tidak membuktikan bahwa layanan yang buruk menyebabkan pelanggan pergi.
- Juni hanya disurvei 1 sampai 7 Juni (80 respons) dan tidak dipakai untuk membaca tren.
- Survei tidak memuat umur infrastruktur maupun biaya perbaikan. Belahan kecepatan mengikuti kota, dan penjelasannya ada di luar data ini.

## Bukti

**Dashboard satu layar**

**Gambar 6. Halaman Overview pada dashboard Power BI**

![gambar 6](images/gambar-6.png)

*Tiga kartu di atas: niat berhenti, skor layanan pelanggan, dan skor keseluruhan. Di bawahnya empat grafik dengan judul berupa kesimpulan. Halaman Diagnosis menguji dugaan bahwa jaringan lambat adalah penyebabnya.*

Tujuh elemen tanpa gulir: kalimat utama, tren tiga dimensi, selisih pendorong, sebaran kecepatan per kota, niat berhenti per kota, niat berhenti menurut nilai, dan catatan metode. Tanpa filter, supaya gambaran penuh selalu tampil.

**Alasan bentuk, ringkas**

| Elemen | Bentuk dipilih | Bentuk ditolak | Alasan utama |
|---|---|---|---|
| Kalimat utama | Kalimat temuan di kiri atas dengan periode dan n | Kartu skor keseluruhan 3,65 | Kiri atas dibaca paling dulu; kartu itu mengulang angka yang membuat dua rapat sebelumnya buntu. |
| Tren | Garis tiga seri, Juni titik kosong, penanda promo Juli | Garis keseluruhan saja; kartu Januari lawan Desember | Garis tunggal menutupi penurunan; kartu dua titik menghapus sebelas bulan di antaranya. |
| Pendorong | Batang selisih terurut, nol di dalam bidang | Rata-rata per dimensi; radar | Rata-rata tidak membandingkan dua kelompok; radar memakai sudut dan luas yang dibaca kurang akurat daripada panjang. |
| Kecepatan | Batang 100% bertumpuk per kota | Kartu rata-rata; pie | Rata-rata jatuh di nilai yang dipilih 6,7% responden; pie tidak bisa menjajarkan enam kota. |
| Kota | Batang terurut dengan n, kota n<100 tidak diperingkat | Peta bergradasi; peringkat tanpa n | Peta memberi bobot lewat luas wilayah; tanpa n, kota 45 responden naik ke puncak. |
| Niat per nilai | Garis dua seri, sumbu dari 0% | Pencar per responden; tabel | Nilai bulat menumpuk 4.723 titik di 25 posisi; tabel memaksa pembaca menghitung kemiringan. |
| Catatan metode | Tiga kolom teks di dasar layar | Dihapus atau dipindah ke halaman kedua | Tanpa catatan, setiap keberatan harus dijawab lisan. |

Versi lengkap dengan kolom pertanyaan dan hubungan data ada di dokumen alasan bentuk.

**Data bulanan**

| Bulan | n | Keseluruhan | Layanan | Harga | Kecepatan | Niat berhenti |
|---|---|---|---|---|---|---|
| Januari | 415 | 3,40 | 3,66 | 2,95 | 3,62 | 11,3% |
| Februari | 415 | 3,30 | 3,60 | 2,92 | 3,60 | 16,6% |
| Maret | 435 | 3,29 | 3,48 | 2,92 | 3,66 | 15,2% |
| April | 415 | 3,33 | 3,44 | 2,91 | 3,62 | 16,9% |
| Mei | 435 | 3,29 | 3,37 | 2,91 | 3,64 | 15,6% |
| Juni (1 sampai 7 Juni) | 80 | 4,06 | 3,21 | 2,80 | 3,56 | 8,8% |
| Juli | 435 | 3,73 | 3,17 | 4,13 | 3,62 | 22,5% |
| Agustus | 415 | 3,71 | 3,09 | 4,11 | 3,67 | 18,1% |
| September | 435 | 3,65 | 3,05 | 4,11 | 3,67 | 20,0% |
| Oktober | 415 | 3,59 | 2,89 | 4,08 | 3,65 | 21,4% |
| November | 435 | 3,69 | 2,83 | 4,14 | 3,63 | 22,8% |
| Desember | 393 | 3,65 | 2,77 | 4,14 | 3,63 | 22,1% |

Rata-rata skor 1 sampai 5. Rata-rata respons bulan selain Juni 422, skor keseluruhan bulan selain Juni 3,51.

**Data per kota**

| Kota | n | Layanan | Kecepatan | Kecepatan 1 sampai 2 | Niat berhenti | Orang |
|---|---|---|---|---|---|---|
| Jakarta | 1.850 | 2,98 | 4,44 | 0,0% | 20,2% | 374 |
| Bandung | 1.089 | 3,34 | 1,73 | 89,9% | 19,3% | 210 |
| Surabaya | 944 | 3,47 | 4,45 | 0,1% | 14,3% | 135 |
| Semarang | 522 | 3,18 | 4,43 | 0,0% | 16,1% | 84 |
| Medan | 273 | 3,57 | 1,72 | 92,7% | 19,0% | 52 |
| Balikpapan | 45 | 2,80 | 1,76 | 86,7% | 15,6% | 7 |

**Kategori keluhan**

| Kategori | Responden | Niat berhenti |
|---|---|---|
| Koneksi putus-putus | 381 | 18,4% |
| Kecepatan tidak sesuai paket | 376 | 16,8% |
| Teknisi lama datang | 343 | 23,0% |
| Sulit menghubungi CS | 340 | 27,1% |
| Tagihan tidak sesuai | 62 | 21,0% |
| Proses pemasangan lambat | 62 | 19,4% |

Diisi 1.564 dari 4.723 responden; 3.159 tidak mengisi kategori keluhan.
