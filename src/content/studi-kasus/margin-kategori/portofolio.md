**Margin gabungan naik 4,84 poin sementara margin ketujuh kategorinya turun: menyusun satu layar yang memuat keduanya**

Sebuah marketplace hendak mencairkan insentif Rp 34 miliar dan menaikkan biaya layanan penjual atas dasar margin kotor gabungan yang naik dari 15,58% ke 20,43%. Angka itu dihitung dengan benar. Dipecah per kategori, margin ketujuh kategori penyusunnya turun. Saya menyusun dashboard yang menampilkan kedua fakta itu di satu layar dan menguraikan dari mana kenaikannya datang.

Mochamad Fajri Ilham Nurdin, November 2026. Datanya sintetis; nama perusahaan rekaan. Berkas data, skrip hitung, dashboard, memo, dan catatan validasi: folder proyek di Google Drive.

## Konteks

**Perusahaan.** TokoRame berjualan di tujuh kategori. Dalam 24 bulan (Juli 2024 sampai Juni 2026) GMV bulanannya naik dari Rp 102,8 miliar ke Rp 230,9 miliar, +124,7%, dan ketujuh kategori tumbuh dalam rupiah. Kecepatannya sangat tidak sama: Kecantikan +796,7%, Kesehatan +673,8%, Elektronik +16,4%.

**Keputusan yang dipertaruhkan.** Dua usulan bersandar pada kenaikan margin gabungan: insentif Rp 34 miliar untuk tim pricing, dan kenaikan biaya layanan penjual di ketujuh kategori. Direktur Keuangan meminta pecahan per kategori sebelum keduanya berjalan.

**Kenapa sulit.** Datanya bersih dan tidak ada angka yang salah. Margin gabungan memang naik +4,84 poin, dan margin ketujuh kategori memang turun, antara −1,13 dan −3,00 poin. Arah angka gabungan berlawanan dengan arah semua bagiannya, dan tidak ada satu bentuk grafik baku yang membawa keduanya: kartu angka besar membuang bagian-bagiannya, batang bertumpuk absolut tidak memuat margin, batang bertumpuk 100% membuat Elektronik tampak runtuh, dan garis terindeks membuang ukuran.

**Gambar 1. Angka yang dilihat direksi**

![gambar 1](images/gambar-1.png)

*Margin kotor gabungan per bulan, Juli 2024 sampai Juni 2026, panel pertama halaman Overview di dashboard Power BI. Perhatikan garis yang naik sampai akhir 2025 lalu mendatar.*

**Data dan batasnya.** 168 baris, tujuh kategori × 24 bulan, berisi GMV dan laba kotor. Tidak ada kolom margin, jadi cara menurunkannya adalah keputusan. Tidak ada biaya operasi, harga, promosi, data pesaing, atau catatan kebijakan, jadi pekerjaan ini bisa menunjukkan dari mana kenaikan datang dan tidak bisa menjelaskan kenapa bauran bergeser. **Peran saya:** definisi metrik, pemilihan bentuk, penguraian, pemeriksaan, dan memo satu halaman.

## Kerangka dan pendekatan

Lima keputusan penyajian bisa membalik tanda kesimpulan tanpa satu angka pun diubah. Masing-masing punya setelan bawaan yang terasa netral, jadi masing-masing saya putuskan dan tulis di layar.

| Keputusan | Yang dipilih | Alternatif yang ditolak | Alasan |
|---|---|---|---|
| Definisi margin | SUM(laba)/SUM(GMV), ditulis di layar | AVG(laba/GMV), bawaan banyak alat BI: −1,98 poin | Pertanyaan direksi menyangkut setiap rupiah; hanya margin tertimbang yang bisa dikalikan menjadi laba kotor |
| Tinggi dan bobot | Sebar bergelembung: perubahan margin, margin akhir, luas = GMV | Dua panel batang bersebelahan | Temuannya hubungan keduanya; panel terpisah meminta pembaca memasangkan tujuh baris dari ingatan |
| Jendela | 24 bulan, ditulis di judul, dengan kurva seluruh panjang jendela | 12 bulan terakhir sebagai filter bawaan: −0,25 poin | Tanda berbalik di 13 bulan; jendela yang tersembunyi di filter menyembunyikan bahwa ada pilihan |
| Pengelompokan | Tujuh kategori | Dua super-kategori: Gaya Hidup +1,96, Teknologi −1,42 | Menggabungkan berarti menimbang ulang; Gaya Hidup naik padahal keempat anggotanya turun, dan keputusan diambil per kategori |
| Sumbu small multiples | Lebar 6 poin, dipusatkan per kategori | Satu sumbu bersama, atau sumbu otomatis | Sumbu bersama meratakan penurunan; sumbu otomatis membuat −1,13 dan −3,00 poin tampak sama curam |

**Pemeriksaan yang mengubah desain.** Uji pertama tiap versi adalah aritmetika: +7,02 dari bobot, −1,84 dari kinerja, dan −0,34 dari interaksi harus menjumlah ke +4,84. Uji itu menghasilkan temuan, yaitu tanda interaksi yang negatif, dan karena itu panel penguraian menampilkan ketiga suku. Uji kedua mengulang penguraian untuk setiap panjang jendela. Hasilnya: di setiap jendela 4 sampai 24 bulan ketujuh kategori turun dan suku kinerja negatif, sedangkan suku bobot menyusut dari +7,02 ke sekitar nol. Uji ketiga membagi suku bobot per kategori; tanda Elektronik berbalik (−1,94 atau +1,24 poin) menurut patokan, jadi rincian itu tidak dipasang.

**Gambar 2. Kurva jendela: perubahan total dan kedua sukunya untuk setiap panjang jendela**

![gambar 2](images/gambar-2.png)

*Perubahan margin menurut jarak dua periode yang dibandingkan, 3 sampai 24 bulan. Perhatikan garis efek margin (Rate effect, merah) yang di bawah nol di seluruh rentang, dan garis perubahan total yang baru melewati nol pada jarak 13 bulan.*

**Gambar 3. Pangsa penjualan disandingkan dengan GMV rupiah**

![gambar 3](images/gambar-3.png)

*Halaman Categories: pangsa nilai penjualan per kategori (kiri) dan GMV per bulan dalam Rp miliar (kanan), Juli sampai September 2024 dibanding April sampai Juni 2026. Perhatikan Elektronik: pangsanya turun dari 42,4% ke 22,0% sementara rupiahnya naik.*

## Temuan dan rekomendasi

1. **Ketujuh kategori kehilangan margin.** Tiga bulan terakhir dibanding tiga bulan pertama: Kecantikan −3,00, Kesehatan −2,39, Fesyen −2,12, Rumah Tangga −1,99, Elektronik −1,63, Gawai & Aksesori −1,62, Otomotif −1,13 poin. Ini hitungan tujuh baris pada satu jendela dan satu definisi; ia tidak menilai kinerja siapa pun.
2. **Margin gabungan naik karena bauran bergeser.** Kenaikan +4,84 poin terdiri dari +7,02 poin efek bauran (mix effect), −1,84 poin efek margin (rate effect), dan −0,34 poin interaksi. Interaksinya negatif karena bobot mengalir ke kategori yang marginnya turun paling dalam: Kecantikan tumbuh paling cepat dan kehilangan margin paling banyak.
3. **Sumber kenaikan itu sudah habis.** Margin gabungan memuncak pada November 2025 (21,17%) dan mendatar sesudahnya, pangsa Kecantikan berhenti di sekitar 26%, dan efek bauran dalam 6 bulan terakhir hampir nol. Yang tersisa adalah penurunan margin kategori, yang negatif di setiap panjang jendela.
4. **Pangsa yang turun tidak berarti kategori menyusut.** Pangsa Elektronik turun dari 42,4% ke 22,0%, sementara GMV bulanannya naik 16,4% dan ia masih terbesar kedua. Usulan biaya layanan berlaku untuk ketujuh kategori, termasuk kategori besar yang masih tumbuh ini.

**Gambar 4. Perubahan margin tiap kategori**

![gambar 4](images/gambar-4.png)

*Perubahan margin tiap kategori dalam poin, Juli sampai September 2024 dibanding April sampai Juni 2026. Perhatikan bahwa ketujuh batang berada di sisi negatif.*

**Gambar 5. Penguraian +4,84 poin**

![gambar 5](images/gambar-5.png)

*Efek bauran (Mix) +7,02, efek margin (Rate) −1,84, dan interaksi −0,34 poin. Perhatikan batang Mix yang lebih tinggi daripada kenaikan totalnya.*

**Rekomendasi.** Pisahkan dua keputusan yang menempel pada satu angka. Insentif ditunda satu rapat dan dinilai terhadap pecahan per kategori; kalau aturan insentif sejak awal mengukur pergeseran bauran, insentif bisa dibayar atas dasar itu dengan dasar yang ditulis. Usulan biaya layanan dihitung per kategori sebelum diputuskan. Sebagai perbandingan tandingan: seandainya margin tiap kategori bertahan dan hanya bauran yang bergeser, margin gabungan hari ini 22,60%, atau Rp 5.030 juta sebulan (sekitar Rp 60,4 miliar setahun) di atas laba kotor yang tercatat. Angka itu selisih terhadap perbandingan tandingan, tidak dapat dibaca sebagai kerugian atau penghematan.

**Batas.** Data hanya memuat GMV dan laba kotor. Untuk menjelaskan kenapa margin kategori menipis dibutuhkan harga, promosi, dan target margin per kategori, yang tidak ada di berkas ini. Penurunan itu bisa saja disengaja; kalau begitu, kenaikan gabungan tetap tidak berasal dari kinerja kategori. Tidak ada klaim tentang laba bersih karena biaya operasi tidak tersedia.

## Lapisan bukti

**Gambar 6. Halaman Overview pada dashboard Power BI**

![gambar 6](images/gambar-6.png)

**Urutan baca.** A menampilkan angka yang dilihat direksi dalam bentuk yang mereka kenal. B adalah panel utama: tujuh gelembung, semuanya di kiri garis nol. C membuktikan tidak ada pengecualian bulan demi bulan. D dan E dibuka ketika pertanyaan "kenapa gabungannya naik" dan "apakah Elektronik menyusut" muncul. F menyatakan jendela, pengelompokan, dan batas klaim, ditambah kurva seluruh panjang jendela.

| Pemeriksaan | Hasil | Yang teramati dan diperbaiki |
|---|---|---|
| 20 angka acuan dihitung ulang | Lulus | 20 dari 20 sama |
| Penguraian menutup | Lulus | +7,02 −1,84 −0,34 = +4,84, juga terlihat di gambar air terjun |
| Label angka panel A | Gagal, diperbaiki | Rata-rata tiga bulan (102,8) sempat ditempel di batang Juli 2024 yang nilainya 96,1 |
| Render abu-abu | Gagal, diperbaiki | Elektronik dan Gawai & Aksesori menjadi dua abu-abu yang hampir sama di elemen E |
| Pembagian suku bobot per kategori | Gagal, dibatalkan | Tanda Elektronik berbalik menurut patokan |
| Gelembung sebanding luas | Lulus | Jari-jari 5,17 banding 1, akar rasio GMV 5,16 |

**Serah terima.** Tiga hal tidak boleh diubah tanpa mengubah judul panelnya: jendela (24 bulan ke 12 bulan mengubah +4,84 menjadi −0,25 poin), pengelompokan (tujuh kategori ke dua super-kategori membalik tanda Gaya Hidup), dan definisi margin (AVG memberi −1,98 poin). Setiap kuartal, periksa apakah puncak November 2025 masih puncak dan ulangi penguraian pada jendela yang sama panjang.

Mengurai kenaikan margin gabungan +4,84 poin menjadi +7,02 poin pergeseran bauran dan −1,84 poin kinerja, menunjukkan margin ketujuh kategori turun di setiap panjang jendela (tertimbang, 24 bulan), lalu mengusulkan keputusan insentif Rp 34 miliar dipisahkan dari kenaikan biaya layanan dan ditunda satu rapat.
