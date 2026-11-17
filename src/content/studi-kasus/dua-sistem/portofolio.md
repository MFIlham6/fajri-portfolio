**Dua sistem, satu bingkai: menyusun layar rapat anggaran yang tidak menjanjikan perbandingan yang tidak ada di data**

Sebuah perusahaan perangkat lunak hendak membagi ulang anggaran pemasaran Rp 14,4 miliar ke enam kanal akuisisi. Rapatnya dibuka dengan satu grafik bersumbu ganda yang memperlihatkan trafik dan pendapatan naik bersama. Angkanya benar; bingkainya menjanjikan perbandingan antara dua sistem yang menghitung benda berbeda. Saya menyusun satu layar enam elemen yang memisahkan bingkainya, menyebut penyebut setiap rasio, dan menampilkan pendapatan yang tidak punya sumber.

Mochamad Fajri Ilham Nurdin, November 2026. Datanya sintetis; nama perusahaan rekaan. Berkas data, skrip hitung, dashboard, kalimat kesimpulan, dokumen alasan bentuk, dan memo: folder proyek di Google Drive.

## Konteks

**Perusahaan.** AturNiaga menjual perangkat lunak operasional berlangganan untuk ritel kecil dan menengah. Pelanggannya perusahaan, dan kontraknya ditandatangani berbulan-bulan sesudah kunjungan pertama. Selama Juli 2024 sampai Juni 2026 tercatat 1.034.769 sesi kunjungan dan 907 deal tutup senilai Rp 12.173 juta. Dua dari enam kanal dibeli dengan iklan (belanja Rp 1.188 juta dalam 24 bulan); empat lainnya berbiaya orang dan waktu yang tidak tercatat di data.

**Keputusan yang dipertaruhkan.** Kepala Pemasaran membawa empat pertanyaan ke rapat anggaran: kanal mana yang menutup biayanya, apakah kampanye April 2025 berhasil, berapa pendapatan yang tidak bisa ditelusuri, dan kalau anggaran dipotong 20%, dari kanal mana.

**Kenapa sulit.** Angkanya datang dari tiga sistem yang masing-masing benar. Analytics menghitung sesi per perangkat, dicap saat kunjungan. Platform iklan menghitung pendaftar percobaan, dicap saat klik. CRM menghitung perusahaan yang menandatangani kontrak, dicap saat tanda tangan. Grafik rapat menaruh sesi organik di sumbu kiri dan nilai deal di sumbu kanan, dan posisi kedua garis ditentukan oleh batas sumbu kanan yang dipilih alat gambar.

**Gambar 1. Grafik rapat yang sama pada tiga batas sumbu kanan**

![gambar 1](images/gambar-1.png)

*Lihat garis biru di ketiga panel, lalu jumlah persilangan di judul tiap panel.*

**Data dan batasnya.** Satu tabel gabungan 144 baris (24 bulan × 6 kanal) berisi sesi, belanja, konversi platform, deal tutup, dan nilai deal, beserta tiga ekspor mentahnya. Kolom gabungan cocok dengan ketiga ekspor di seluruh baris. 202 deal tidak punya sumber prospek di CRM, dan tabel gabungan sudah membagi deal itu ke kanal dengan model penelusuran yang diterima apa adanya. **Peran saya:** memilih bingkai, bentuk, dan urutan baca enam elemen; enam kalimat kesimpulan; dokumen alasan bentuk; memo satu halaman.

## Kerangka dan pendekatan

Sebelum memilih bentuk, setiap angka saya catat dengan tiga hal: satuannya, kapan sistemnya mencap waktu, dan populasi apa yang dihitungnya. Dua angka hanya boleh berbagi satu bidang bila ketiganya sama. Sesi lawan rupiah gagal pada ketiganya, sehingga layar baru berisi enam bidang, masing-masing satu satuan, tiga lebih banyak dari layar rapat lama.

| Keputusan | Yang dipilih | Alternatif yang ditolak | Alasan |
|---|---|---|---|
| Trafik dan pendapatan | Dua panel bertumpuk, sumbu-x identik, masing-masing dari 0 | Satu grafik dua sumbu | Batas kanan Rp 500, 900, 1.400 juta memberi 2, 7, 0 persilangan dari angka yang sama |
| Efisiensi dan volume | Dua batang mendatar, urutan baris dikunci sama | Sesi sebagai deret kedua di panel efisiensi | Kesejajaran baris menggantikan sumbu kedua tanpa dua satuan di satu bidang |
| Pendapatan tak terlacak | Potongan bernama dan diarsir, duduk di garis nol | Tumpukan sumber terlacak saja | Tumpukan tersaring tetap tampak utuh sementara Rp 2.794 juta hilang |
| Biaya per akuisisi (CPA) | Dua rasio per kanal, penyebut di label | Kartu biaya per konversi | Penukaran penyebut membalik urutan dua kanal berbayar |
| Kontrol | Tidak ada | Filter sumber, pemilih tanggal | Filter bisa mematikan potongan tak terlacak; jendela tiga bulan menghapus perbandingan 24 bulan |

**Pemeriksaan yang mengubah desain.** Pertama, lonjakan sesi April 2025 saya pecah per kanal: Iklan Media Sosial +13.373 sesi dan Iklan Pencarian +5.355 terhadap rata-rata Maret dan Mei, Pencarian Organik −409. Panel trafik karena itu mendapat deret ketiga, sesi dua kanal berbayar, supaya lonjakan tidak terbaca sebagai pertumbuhan organik. Kedua, panel efisiensi saya uji terhadap model penelusuran. Model itu memberi Rujukan Mitra 31,0% nilainya dari deal tak terlacak dan Iklan Media Sosial 13,1%; dengan nilai terlacak saja urutan keenam kanal tetap sama, dan bila seluruh Rp 2.794 juta diberikan kepada Iklan Media Sosial, kanal itu masih di bawah Rujukan Mitra. Ketiga, deret deal yang digeser dua bulan saya tolak: korelasi sesi dengan deal 0,59 pada geser satu bulan dan 0,55 pada dua bulan, jadi data tidak memilih dua bulan dengan tegas, dan jaraknya cukup dinyatakan di anotasi.

**Gambar 2. Kelipatan terhadap Juli 2024 dan sesi serta nilai deal per bulan**

![gambar 2](images/gambar-2.png)

*Halaman Trend pada dashboard Power BI. Kartu atas: sesi organik 2,4 kali dan nilai deal 1,3 kali dibanding Juli 2024. Grafik atas: sesi per bulan; grafik bawah: nilai deal per bulan tanda tangan, Rp juta. Perhatikan lonjakan April 2025 di grafik atas yang tidak muncul di grafik bawah.*

**Gambar 3. Pendapatan per sesi tanpa dan dengan deal yang dibagi model**

![gambar 3](images/gambar-3.png)

*Pendapatan per sesi tiap kanal dengan dua cara hitung. Batang tua: semua deal, termasuk deal tanpa sumber yang dibagi ke kanal. Batang muda: hanya deal yang tercatat sumbernya. Perhatikan urutan kanal yang sama pada kedua hitungan.*

## Temuan dan rekomendasi

1. **Kanal nomor dua dalam volume berada di dasar dalam efisiensi.** Iklan Media Sosial membawa 263.317 sesi, peringkat 2 dari 6, dan menghasilkan Rp 5.868 nilai deal per sesi. Rujukan Mitra menghasilkan Rp 28.339 dari 32.584 sesi, 4,8× lebih tinggi. Urutannya sama pada deal per 1.000 sesi (2,1 lawan 0,4) dan pada nilai terlacak saja (Rp 19.543 lawan Rp 5.098).
2. **Sesi organik tumbuh 2,4×, nilai deal 1,3×, dan selisih itu bertahan pada basis mana pun.** Angka 2,4× dan 1,3× membandingkan dua bulan tunggal, sementara nilai deal bulanan bergerak rata-rata 21,2% dari bulan ke bulan. Dengan rata-rata tiga bulan pertama dan terakhir: 2,3× lawan 1,4×. Dengan jumlah setahun terhadap setahun: sesi organik +57,1%, nilai deal +13,3%.
3. **Kampanye April 2025 terbaca gagal di bulan tanda tangan dan berhasil di bulan kunjungan pertama.** Pada bulan tanda tangan, April membukukan 37 deal, turun dari 42. Bila setiap deal dikembalikan ke bulan sesi pertamanya, kunjungan pertama April 2025 menghasilkan 52 deal senilai Rp 651,8 juta, sementara Maret dan Mei menghasilkan 38 dan 39 deal. Tambahannya sekitar Rp 153 juta nilai deal untuk sekitar Rp 58 juta belanja iklan di atas bulan tetangga. Deal per 1.000 sesi pada kohort April 0,88, dekat dengan 0,95 di bulan tetangga.
4. **Rp 2.794 juta tidak punya sumber.** 202 dari 907 deal (22,3%), 23,0% dari nilai. Dalam bingkai sumber prospek CRM, potongan ini hanya kalah dari Pencarian Organik. Rata-rata nilai deal tak terlacak Rp 13,8 juta, di atas deal terlacak Rp 13,3 juta.
5. **Biaya per akuisisi (CPA) membalik urutan dua kanal berbayar.** Per pendaftar percobaan, Iklan Media Sosial Rp 844 ribu dan Iklan Pencarian Rp 1.839 ribu. Per perusahaan berkontrak, Rp 4.220 ribu lawan Rp 3.425 ribu. Pelebarannya 5,0× lawan 1,9×.

**Gambar 4. Deal menurut bulan sesi pertama**

![gambar 4](images/gambar-4.png)

*Deal per bulan sesi pertama, Oktober 2024 sampai Desember 2025. Perhatikan batang April 2025 (52 deal) dibanding bulan di sebelahnya (38 dan 39).*

**Gambar 5. Dua penyebut untuk belanja yang sama**

![gambar 5](images/gambar-5.png)

*Biaya per pendaftar percobaan (platform iklan) dan per perusahaan berkontrak (CRM), Search Ads dan Social Ads, Rp ribu. Perhatikan urutan kedua kanal yang terbalik di antara dua penyebut.*

**Rekomendasi.** Pemotongan dimulai dari belanja Iklan Media Sosial, bertahap mulai kuartal depan, dinilai ulang paling cepat satu kuartal sesudahnya karena jeda kunjungan ke kontrak bermedian 75 hari. Dana yang dilepas tidak dipindah seluruhnya ke Rujukan Mitra, yang hanya membawa 32.584 sesi dalam dua tahun. Ukurannya perlu dinyatakan: seluruh belanja iklan dua kanal berbayar pada tahun kedua Rp 542 juta, sedangkan 20% dari Rp 14,4 miliar adalah Rp 2.880 juta. Sisa pemotongan harus datang dari biaya orang dan waktu yang tidak tercatat per kanal, jadi sebelum sisanya dibagi, biaya itu perlu dipecah per kanal.

**Batas.** Tidak ada klaim sebab-akibat: kohort April adalah satu peristiwa tanpa pembanding terkendali, dan tanggal sesi pertama tidak menyatakan kanal mana yang meyakinkan pembeli. Pendapatan per sesi adalah efisiensi masa lalu, bukan janji untuk belanja tambahan. Model penelusuran diterima apa adanya. Pengenalan merek tidak terukur di ketiga sistem.

## Lapisan bukti

**Gambar 6. Halaman Channels pada dashboard Power BI**

![gambar 6](images/gambar-6.png)

**Urutan baca.** Judul halaman menjawab pertanyaan rapat: pemotongan dimulai dari Social Ads. Kartu kiri memberi rasio pendapatan per sesi kanal teratas terhadap terbawah (4,8 kali) dan porsi nilai deal tanpa sumber (23%). Tabel di tengah mengurutkan kanal dari pendapatan per sesi tertinggi, dengan tombol All deals dan Tracked only untuk dua cara hitung. Panel kanan menampilkan kanal yang dipilih dan nilai deal per sumber di CRM. Halaman Trend dan Systems memuat rincian waktu dan perbedaan antarsistem.

| Pemeriksaan | Hasil | Yang teramati dan diperbaiki |
|---|---|---|
| Gabungan dicocokkan dengan ekspor mentah | Lulus | Sesi, belanja, konversi, deal dan nilai terlacak sama di seluruh baris; deal tak terlacak per bulan sama dengan baris CRM tanpa sumber |
| Angka materi kasus dihitung ulang | Lulus | 2,4× dan 1,3×; 4,8×; 22,3% dan Rp 2.794 juta; 5,0× dan 1,9×; persilangan 2, 7, 0; jeda 75 hari (52 sampai 101) |
| Lima pemeriksaan bingkai | Lulus | Satuan di sumbu, satu satuan per bidang, penyebut di label, tumpukan menjumlah, kalimat di tiap elemen |
| Kalimat yang melampaui elemennya | Gagal, diperbaiki | Kalimat elemen 4 menyebut sesi; jaraknya dipindah ke anotasi |
| Uji sepuluh detik pada pembaca baru | Belum | Menunggu pembaca yang tidak ikut membangun |

**Serah terima.** Dua hal tidak boleh diubah tanpa mengubah judul elemennya: urutan baris elemen 2 yang mengikuti elemen 1, dan potongan tak terlacak di elemen 5. Kalau model penelusuran diganti, ulangi uji pada elemen 1 dengan nilai terlacak saja. Kalau biaya orang per kanal tersedia, rasio biaya bisa dihitung untuk keenam kanal dan elemen 6 diganti.

Memisahkan dua deret yang sebelumnya berbagi satu bidang bersumbu ganda, mengganti dasar perbandingan kanal dari volume ke pendapatan per sesi, dan menampilkan Rp 2.794 juta pendapatan tanpa sumber, sehingga terlihat bahwa kanal nomor dua dalam volume berada di dasar dalam efisiensi.
