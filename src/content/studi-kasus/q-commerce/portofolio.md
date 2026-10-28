Studi kasus forecasting permintaan, Python (Google Colab), data latihan

# Forecast Stok Agustus 2022 untuk Lima Hub Q-Commerce: Metode Paling Sederhana Ternyata Paling Akurat

Permintaan Agustus diperkirakan 394.242 unit dengan 40% di minggu terakhir. SARIMA yang semula dipilih karena MAPE 5,04% meleset 14% sampai 80% saat diuji meramal satu bulan penuh.

Mochamad Fajri Ilham, Team 6, notebook dan berkas pendukung: [folder Google Drive](https://drive.google.com/drive/folders/1jk8wOdxjqNUFT7m-CwR94zbNxKYuf3Tq), mfajriilhamn@gmail.com

Perusahaan dan datanya rekaan untuk latihan. Seluruh angka dihitung dari satu berkas pengiriman yang sama dan bisa dihitung ulang dengan notebooknya.

## 1. Ringkasan

Sebuah perusahaan Q-Commerce menjalankan lima hub baru sejak Januari 2022. Tim operasional butuh angka permintaan mingguan Agustus 2022 per hub untuk menyiapkan stok, terutama untuk Sayur & Buah dan Susu yang cepat rusak. Datanya berisi barang terkirim per bulan, kategori, minggu, dan hub selama tujuh bulan.

Versi pertama analisis ini memilih SARIMA dan menyimpulkan puncak permintaan di minggu ketiga. Saat diperiksa ulang, dua hal ternyata salah: angka "Agustus" bergeser satu bulan, dan data uji yang dipakai memilih model hanya tiga minggu yang sebagian isinya sudah bocor ke data latih. Setelah diuji ulang dengan benar, metode seasonal naive (minggu yang sama di bulan lalu) paling akurat di level hub dan kategori, dengan rata-rata error 9,2%.

Rekomendasinya: siapkan 394.242 unit untuk Agustus, pastikan pesanan minggu keempat menutup 10 hari, beri Susu buffer 12,6% dan Sayur & Buah 8,4%, lalu koreksi pesanan setelah minggu pertama selesai.

## 2. Data dan pemeriksaannya

Berkas Demand_Data.csv berisi 1.400 baris, tepat 7 bulan x 10 kategori x 4 minggu x 5 hub. Tidak ada nilai kosong, tidak ada duplikat, dan tidak ada kuantitas nol atau negatif. Perbaikan yang perlu hanya tipe data: kolom bulan diubah ke tanggal dan Shipped Qty dari teks berkoma ke angka. Minggu W1 sampai W4 dipetakan ke tanggal 1, 8, 15, dan 22, sehingga W4 berisi 7 sampai 10 hari.

Ada 108 nilai di atas batas atas IQR. Sebanyak 94 berasal dari Sayur & Buah dan Susu, dan 55 jatuh di W4. Keduanya pola asli data, jadi semua baris dipertahankan.

## 3. Temuan

**Temuan 1.** Setiap bulan dibagi ke minggu dengan proporsi yang sama. Di semua 350 kombinasi bulan, kategori, dan hub, W1 memegang 15% volume bulan, W2 20%, W3 25%, dan W4 40%, dengan selisih paling besar 0,09 poin akibat pembulatan. Puncak permintaan selalu di W4. Konsekuensi lainnya, data mingguan tidak menambah informasi di atas data bulanan: yang sebenarnya diramal adalah satu angka total Agustus, dengan histori tujuh bulan.

**Temuan 2.** Volume mendatar setelah Ramadan. Total bulanan naik tajam dari Januari sampai April, saat Ramadan 2022 (2 April sampai 1 Mei) mendorong volume ke 446.512 unit. Mei turun 20,8%, lalu Juni naik 8,4% dan Juli 2,8%. Kelima hub bergerak dengan pola yang sama.

**Gambar 1. Shipped Qty bulanan per hub**

![gambar 1](images/gambar-1.png)

Lihat puncak April dan garis yang hampir datar dari Juni ke Juli di semua hub.

**Temuan 3.** Dua kategori segar memegang hampir separuh volume. Sayur & Buah menyumbang 32,7% dan Susu 14,5%, total 47,2% atau 1.015.719 unit. Sayur & Buah 2,26 kali kategori kedua.

**Gambar 2. Total Shipped Qty per kategori, Januari sampai Juli 2022**

![gambar 2](images/gambar-2.png)

Dua batang berwarna adalah kategori yang dibuatkan target stok.

**Temuan 4.** Arah tiap kategori berbeda. Susu naik 6% di Juni dan 9% di Juli, sedangkan Sayur & Buah naik 4% lalu turun 6%. Makanan Beku tumbuh paling cepat, dari 3,3% volume di Februari menjadi 7,1% di Juli. Untuk kategori yang sedang naik, forecast dari bulan lalu cenderung terlalu rendah, dan itu dihitung masuk ke buffer.

## 4. Memilih metode

Enam metode diuji dengan backtest dua lipatan. Lipatan pertama meramal Juni dengan data sampai Mei, lipatan kedua meramal Juli dengan data sampai Juni, masing-masing empat minggu penuh. Pengujian dilakukan di total semua hub dan di 50 deret hub x kategori.

| Metode | MAPE total Juni | MAPE total Juli | Rata-rata 50 deret |
| --- | --- | --- | --- |
| Seasonal naive | 7,8% | 2,7% | 9,2% |
| Rata-rata 3 bulan x profil | 3,1% | 0,1% | 10,3% |
| Holt-Winters multiplikatif | 5,3% | 10,4% | 10,4% |
| Holt-Winters aditif | 48,2% | 26,8% | 23,2% |
| MA 4 minggu | 29,8% | 31,4% | 31,4% |
| SARIMA (1,1,1)(0,1,1,4) | 80,1% | 14,0% | 40,4% |

SARIMA dan Holt-Winters aditif membaca kenaikan Februari sampai April sebagai tren dan memperpanjangnya, sehingga meleset jauh di Juni saat volume justru turun. Rata-rata tiga bulan terlihat paling akurat di level total, tetapi itu karena lonjakan April dan penurunan Mei kebetulan saling menutup di jendela ujinya. Untuk Agustus jendelanya Mei sampai Juli, dan forecastnya akan 4,3% di bawah Juli padahal dua bulan terakhir naik.

Seasonal naive dipilih karena errornya terendah di level yang dipakai untuk menyiapkan stok, yaitu hub x kategori. Metode ini juga mudah dihitung ulang oleh tim operasional tanpa model statistik.

**Gambar 3. MAPE rata-rata backtest, 50 deret hub x kategori**

![gambar 3](images/gambar-3.png)

Bandingkan batang seasonal naive dengan SARIMA di paling bawah.

## 5. Forecast Agustus dan target stok

| Hub | W1 (1-7 Agu) | W2 (8-14 Agu) | W3 (15-21 Agu) | W4 (22-31 Agu) | Total |
| --- | --- | --- | --- | --- | --- |
| Hub A | 9.931 | 13.243 | 16.553 | 26.484 | 66.211 |
| Hub B | 10.210 | 13.616 | 17.020 | 27.231 | 68.077 |
| Hub C | 12.882 | 17.177 | 21.470 | 34.350 | 85.879 |
| Hub D | 12.806 | 17.075 | 21.345 | 34.152 | 85.378 |
| Hub E | 13.306 | 17.739 | 22.173 | 35.479 | 88.697 |
| Total | 59.135 | 78.850 | 98.561 | 157.696 | 394.242 |

**Gambar 4. Shipped Qty mingguan dan forecast Agustus 2022**

![gambar 4](images/gambar-4.png)

Garis putus-putus adalah Holt-Winters multiplikatif sebagai pembanding, 10% di atas Juli.

Safety stock dihitung dari error relatif seasonal naive di Juni dan Juli, lima hub digabung per kategori, dengan service level 95%: buffer 8,4% dari forecast untuk Sayur & Buah dan 12,6% untuk Susu. Karena pola mingguannya tetap, error dalam persen sama untuk keempat minggu, jadi buffer dihitung sebagai persen dari forecast tiap minggu.

Target stok per minggu (forecast ditambah buffer), dalam unit:

| Hub | Sayur & Buah W1 | Sayur & Buah W2 | Sayur & Buah W3 | Sayur & Buah W4 | Susu W1 | Susu W2 | Susu W3 | Susu W4 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hub A | 2.557 | 3.411 | 4.263 | 6.820 | 1.384 | 1.846 | 2.308 | 3.692 |
| Hub B | 2.046 | 2.728 | 3.411 | 5.456 | 1.153 | 1.538 | 1.922 | 3.077 |
| Hub C | 4.263 | 5.684 | 7.104 | 11.367 | 2.308 | 3.077 | 3.845 | 6.152 |
| Hub D | 5.541 | 7.388 | 9.236 | 14.778 | 2.538 | 3.384 | 4.230 | 6.767 |
| Hub E | 5.968 | 7.957 | 9.946 | 15.914 | 2.692 | 3.589 | 4.487 | 7.178 |

## 6. Rekomendasi

- Pesanan W4 menutup 10 hari, 22 sampai 31 Agustus, dengan 40% volume bulan.
- Pakai target stok di atas untuk Sayur & Buah dan Susu, dan kirim Sayur dua sampai tiga kali per minggu agar buffer tidak menumpuk.
- Makanan Beku tahan lama dan masih naik, jadi aman dipesan di atas angka Juli dengan buffer yang lebih tebal.
- Setelah W1 Agustus selesai, bagi angka W1 dengan 0,15 untuk memperkirakan total Agustus dan koreksi pesanan W2 sampai W4.

## 7. Batas analisis

- Histori tujuh bulan, dua di antaranya masa awal hub dan Ramadan. Error hanya diukur dari dua bulan uji.
- Data berisi barang terkirim. Tanpa data stok akhir, barang rusak, kehabisan stok, harga, dan promo, Shipped Qty bisa lebih rendah dari permintaan sebenarnya.
- Safety stock mengasumsikan lead time satu minggu. Kalau lebih lama, buffer perlu dikali akar lead time dalam minggu.
- Hari Kemerdekaan 17 Agustus jatuh di W3. Dampaknya tidak bisa diukur dari data ini.

## 8. Yang diperbaiki dari versi pertama

| Versi pertama | Setelah dihitung ulang |
| --- | --- |
| Sayur & Buah 31,4% dari total pengiriman | 32,7% (703.770 dari 2.152.036 unit) |
| Sayur & Buah + Susu 45,3% | 47,2%. Jumlah unitnya, 1.015.719, sudah benar |
| Volume tumbuh konsisten sejak Januari | Naik sampai April (Ramadan), turun 20,8% di Mei, lalu hanya naik 8,4% dan 2,8% di Juni dan Juli |
| 108 outlier adalah lonjakan akhir bulan | Hanya 55 di W4. Sebanyak 94 berasal dari Sayur & Buah dan Susu, kategori bervolume terbesar |
| Model aditif dipilih karena amplitudo musiman stabil | Amplitudo membesar mengikuti volume. Yang tetap adalah rasionya: W1 15%, W2 20%, W3 25%, W4 40% |
| Moving Average MAPE 91,90% dan 99,67% | 30,6%. Angka lama dihitung di baris data yang belum diagregasi |
| Holt-Winters 9,77%, SARIMA 5,04%, SARIMA terbaik | Dengan uji satu bulan penuh: Holt-Winters aditif 37,5%, SARIMA 47,0% (Juni 80,1%, Juli 14,0%). Terbaik di level hub x kategori: seasonal naive 9,2% |
| Puncak permintaan di W3 (15 sampai 21 Agustus) | Puncak di W4 (22 sampai 31 Agustus), 40% volume bulan |
| Safety stock 52 sampai 124 unit, permintaan Susu stabil | Safety stock 12,6% dari forecast, 345 sampai 804 unit di W4. Susu naik dua bulan berturut-turut |

Berkas: 1-Notebook Forecasting ([Google Colab](https://colab.research.google.com/drive/139ScaFsLvjnVViHmYAI8nyQyrnfzvkdA)), 2-Memo Keputusan, 3-Hasil Forecast, 4-Portofolio, 5-Slide Presentasi. Semua ada di [folder Google Drive](https://drive.google.com/drive/folders/1jk8wOdxjqNUFT7m-CwR94zbNxKYuf3Tq) yang sama.
