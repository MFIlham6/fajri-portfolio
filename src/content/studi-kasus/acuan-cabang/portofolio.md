**Dua daftar cabang yang sama-sama benar, satu berkas: menyusun layar yang menyatakan acuannya**

Sebuah distributor suku cadang hendak membagi Rp 6 miliar bonus kepala cabang dan Rp 12 miliar anggaran pemasaran dari peringkat kinerja 24 cabang. Dua peringkat beredar di rapat, keduanya dihitung dengan benar, dan juaranya berbeda. Saya menyusun satu layar yang menyebut acuan setiap panel, memisahkan cabang yang jawabannya sama pada acuan mana pun, dan menunjukkan dari mana perbedaan kedua daftar itu berasal.

Mochamad Fajri Ilham Nurdin, November 2026. Datanya sintetis; nama perusahaan rekaan. Berkas data, skrip hitung, dashboard, dokumen alasan acuan, dan memo: folder proyek di Google Drive.

## Konteks

**Perusahaan.** RodaNusa mendistribusikan suku cadang lewat 24 cabang di empat wilayah. Tahun buku Juli 2025 sampai Juni 2026 ditutup dengan pendapatan Rp 782,0 miliar, naik 12,9% dari Rp 692,5 miliar, dan 98,2% dari target jaringan Rp 796,2 miliar. Ukuran cabang sangat tidak sama: Surabaya membukukan Rp 98.048,5 juta, Kupang Rp 2.260,6 juta.

**Keputusan yang dipertaruhkan.** Bonus kepala cabang Rp 6 miliar dan anggaran pemasaran tahun depan Rp 12 miliar, keduanya diputuskan dari grafik yang ditayangkan di rapat penutupan tahun. Rapat itu berhenti di menit kedua belas: Direktur Penjualan menayangkan peringkat pertumbuhan tahunan dengan Madiun di puncak (+33,4%), Direktur Perencanaan menayangkan peringkat pencapaian target dengan Tasikmalaya di puncak (116,2%).

**Kenapa sulit.** Tidak ada angka yang salah. Kedua grafik memakai bentuk yang sama, batang mendatar terurut dalam persen, sehingga terbaca sebagai dua pendapat tentang satu hal. Keduanya mengukur tiap cabang dari titik nol milik cabang itu sendiri, dan tidak ada judul yang menyebutnya.

**Gambar 1. Dua daftar yang dibawa ke rapat**

![gambar 1](images/gambar-1.png)

*Panel Two lists di halaman Compare: empat teratas menurut pertumbuhan (kiri) dan menurut persen target (kanan). Perhatikan nama yang hanya muncul di satu daftar.*

**Data dan batasnya.** Tiga berkas: pendapatan dan unit terjual bulanan 24 cabang selama 36 bulan (864 baris), kota dan wilayah tiap cabang, serta berkas acuan berisi target tahun berjalan, pendapatan tahun lalu, pendapatan dua tahun lalu, dan tolok ukur pertumbuhan pasar per wilayah. Jumlah 12 bulan di berkas bulanan sama dengan berkas acuan di 72 dari 72 nilai. Tidak ada biaya operasi, harga, data pesaing, atau catatan pergantian kepala cabang. **Peran saya:** memilih acuan tiap panel, bentuk, urutan, dan tanda; pemeriksaan; dokumen alasan acuan; memo satu halaman.

## Kerangka dan pendekatan

Kelima acuan sudah tersedia sebagai kolom. Yang perlu diputuskan adalah acuan mana menjadi bingkai sebuah panel, mana yang menumpang sebagai tanda, dan mana yang tidak digambar karena mengulang panel lain. Sebelum memilih bentuk, saya menjawab satu pertanyaan untuk setiap acuan: apakah 24 batangnya diukur dari titik nol yang sama. Hanya tambahan rupiah yang menjawab ya.

| Keputusan | Yang dipilih | Alternatif yang ditolak | Alasan |
|---|---|---|---|
| Bingkai panel utama | Tambahan rupiah terhadap tahun lalu | Pencapaian target sendirian | Target terbesar 46 kali terkecil; tanpa pendamping rupiah, empat dari enam penambah terbesar tergambar gagal |
| Kesepakatan | Matriks 24 x 5, batas median tiap acuan | Lima grafik batang setara | Lima urutan berbeda tidak bisa ditelusuri lintas panel; matriks membuang besaran untuk mendapat pola per baris |
| Bentuk deviasi target | Panjang = persen, label = rupiah | Batang aktual dan target bersanding | Selisih Rp 4.719,9 juta Surabaya dan Rp 25,1 juta Kupang sama-sama tampak celah tipis |
| Urutan baris | Satu urutan untuk keempat panel: kelompok, lalu tambahan rupiah | Urutan per panel menurut nilainya | Satu urutan membuat satu baris per cabang terbaca lintas panel |
| Kontrol | Tidak ada | Pemilih acuan, filter wilayah | Enam kombinasi acuan dan satuan menempatkan tiga nama berbeda di puncak; filter mengubah median diam-diam |

**Pemeriksaan yang mengubah desain.** Pertama, urutan daftar pertumbuhan dan daftar pencapaian target saya bandingkan sebelum memasang keduanya. Untuk 21 cabang yang targetnya pendapatan tahun lalu × 1,15, keduanya identik (korelasi 1,000), jadi panel pertumbuhan dibatalkan dan diganti grafik dua daftar di atas. Kedua, selisih tolok ukur pasar berkorelasi 0,930 dengan pertumbuhan, jadi ia hanya tinggal sebagai kolom matriks. Ketiga, korelasi 0,015 antara pertumbuhan dan indeks pendapatan terhadap FY24, angka yang biasa dipakai sebagai alasan memberi indeks panel sendiri, ternyata dibentuk tiga titik. Keempat, sorotan merah di panel rupiah hilang saat dicetak abu-abu, dan batang lain saya buat lebih terang.

**Gambar 2. Nol dari setiap batang persen target**

![gambar 2](images/gambar-2.png)

**Gambar 3. Dua uji sebar sebelum memasang panel kedua**

![gambar 3](images/gambar-3.png)

*Lihat dua batang hitam di ujung kiri dan kanan grafik target; di grafik sebar kanan, tiga titik bernama yang berada jauh dari pita titik lainnya.*

## Temuan dan rekomendasi

1. **Sepuluh dari 24 cabang sepakat pada kelima acuan.** Bandung, Medan, Bekasi, Palembang, dan Bogor di atas median jaringan pada kelimanya; Banjarmasin, Cirebon, Samarinda, Jember, dan Manado di bawah median pada kelimanya. Perdebatan menyangkut 14 cabang.
2. **Kedua daftar berbeda karena tiga target yang disetel tangan.** 21 dari 24 target sama dengan pendapatan tahun lalu × 1,15, sehingga kedua daftar identik dari baris 5 sampai 24. Tasikmalaya (×1,020), Madiun (×1,280), dan Kupang (×1,240) yang membuat puncaknya berbeda. Dengan ×1,15, Tasikmalaya berada di 103,1% dan Madiun memimpin kedua daftar.
3. **Juara pencapaian target berada di peringkat 17 dari 24 dalam rupiah.** Tasikmalaya menambah Rp 1.113,1 juta, peringkat 17 dari 24. Bandung, Surabaya, Palembang, dan Bogor terbaca meleset dari target padahal termasuk enam penambah terbesar; bersama mereka menambah Rp 30.433,9 juta, 34,0% dari pertumbuhan jaringan.
4. **Indeks pendapatan terhadap FY24 dan pertumbuhan berbeda di tiga cabang saja, dan justru di sana keputusannya.** Korelasinya 0,015 pada 24 cabang dan 0,882 tanpa Cirebon, Madiun, dan Kupang, yang pendapatannya turun tahun lalu (−6,9%, −21,9%, −30,5%). Madiun tumbuh +33,4% dan berindeks 104,3; Kupang +25,4% dan 87,2. Cirebon tumbuh +0,6%, berindeks 93,7, semester keduanya −0,6%, dan unit terjualnya −5,5%.

**Gambar 4. Peringkat yang dipakai rapat: % target**

![gambar 4](images/gambar-4.png)

*Persen pencapaian target, urutan yang dibawa ke rapat. Perhatikan batang merah Tasikmalaya.*

**Gambar 5. Cabang yang sama, nol yang sama: tabel 24 cabang di dashboard**

![gambar 5](images/gambar-5.png)

*Halaman Compare, urutan baris tetap. Kolom pertama: tambahan rupiah terhadap tahun lalu; kolom kedua: jarak dari target sendiri, merah berarti di bawah target. Perhatikan baris Tasikmalaya (ungu) di kedua kolom, dan empat cabang di bawah 0 pada kolom kedua yang berada di enam teratas pada kolom pertama.*

**Rekomendasi.** Bonus dibagi menurut pencapaian target, dengan cara target disusun tertulis di panelnya, dan rapat memutuskan secara terbuka apakah tiga target yang disetel tangan dibayar menurut target tertulis atau menurut dasar ×1,15; kedua cara membuat ketiganya melampaui target, yang berubah urutannya. Anggaran pemasaran dibaca dari indeks pendapatan terhadap FY24 (FY24 = 100) bersama tambahan rupiah. Pertumbuhan tahunan tidak dipakai untuk anggaran karena menyesatkan tepat pada cabang yang tahun lalu turun. Surabaya (meleset Rp 4.719,9 juta dari target terbesar, indeks 119,5) dan Cirebon (indeks 93,7 dan masih turun) memerlukan dua jenis perhatian yang berbeda.

**Batas.** Data tidak menjelaskan sebab dan tidak memuat biaya, jadi tidak ada klaim tentang cabang yang paling menguntungkan. Target adalah keputusan perencanaan; pekerjaan ini menunjukkan akibat pengalinya pada gambar dan tidak menilai kewajarannya. Pendapatan jaringan naik 12,9% sementara unit terjual naik 5,5%, dan data tidak memisahkan harga dari pergeseran jenis barang.

## Lapisan bukti

**Gambar 6. Halaman Overview pada dashboard Power BI**

![gambar 6](images/gambar-6.png)

**Urutan baca.** Judul layar menyebut jumlah cabang yang sepakat: 10 dari 24. Kolom kiri memuat dua angka jaringan (10 dari 24 cabang sepakat, pencapaian target 98,2%) dan tiga hal yang perlu dicek sebelum memutuskan. Matriks di kanan memberi satu baris per cabang dan satu kolom per acuan: biru di atas median, kuning di bawah, merah enam terbawah. Halaman Compare memuat angka tiap acuan dan alasan dua daftar rapat berbeda; halaman Branch merinci satu cabang.

| Pemeriksaan | Hasil | Yang teramati dan diperbaiki |
|---|---|---|
| Angka acuan dihitung ulang dari data bulanan | Lulus | 72 dari 72 nilai sama; seluruh angka materi kasus yang dikutip cocok |
| Acuan dan satuan di judul tiap panel | Lulus | Panel 3 dan 4 memuat peringatan nol per cabang |
| Korelasi panel berdampingan | Lulus, dengan catatan | 0,015 peka terhadap tiga cabang; dicatat di dokumen alasan acuan |
| Render abu-abu | Gagal, diperbaiki | Sorotan Tasikmalaya di panel 2 sama gelap dengan batang lain |
| Uji "sebut acuannya" pada pembaca baru | Belum | Menunggu pembaca yang tidak ikut membangun |

**Serah terima.** Dua hal tidak boleh diubah tanpa mengubah judul panelnya: urutan baris bersama (kalau tiap panel diurutkan sendiri, keempat panel kembali menjadi empat daftar), dan batas median jaringan (filter wilayah mengubahnya). Setiap tahun buku, periksa lagi berapa target yang memakai pengali baku; kalau semua target memakai rumus yang sama, daftar pertumbuhan dan daftar target akan identik seluruhnya.

Menyusun ulang 24 cabang pada acuan yang nolnya sama, menunjukkan bahwa 10 cabang sepakat pada kelima acuan dan bahwa dua daftar yang memacetkan rapat hanya berbeda karena tiga target yang disetel tangan, lalu memasangkan satu acuan untuk bonus Rp 6 miliar dan satu untuk anggaran Rp 12 miliar.
