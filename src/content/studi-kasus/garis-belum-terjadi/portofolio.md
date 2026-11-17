**Grafik rapat bilang gudang penuh April 2027, padahal tanggal itu masih tebakan**

Penyajian data untuk keputusan membangun gudang, perusahaan gudang berpendingin, dashboard Power BI satu halaman, data bulanan Januari 2024 sampai Juni 2027

Mochamad Fajri Ilham Nurdin, selesai November 2026, mfajriilhamn@gmail.com

Datanya simulasi dan nama perusahaannya rekaan. Ini studi kasus latihan, bukan pengalaman kerja.

## Ringkasan

Sebuah perusahaan gudang berpendingin hampir kehabisan tempat dan sedang menimbang gudang baru seharga Rp 48 miliar. Di rapat, komite melihat grafik yang menunjukkan gudang akan penuh pada April 2027. Data yang tercatat hanya sampai Juni 2026; sisanya tebakan, dan tebakannya ada tiga versi. Saya menggambar ulang grafiknya tanpa mengubah satu angka pun, supaya terlihat mana yang sudah terjadi dan mana yang masih tebakan. Jawaban "April 2027" berubah menjadi "antara Februari 2027 dan tidak penuh sama sekali, tergantung seberapa cepat pesanan naik".

## Kenapa laporan ini ada

SejukNusantara menyewakan ruang simpan dingin untuk distributor daging, susu, dan sayur beku. Empat gudangnya bisa menampung 6.400 ton per hari. Pada Juni 2026 pesanan sudah 5.921,1 ton per hari, atau 92,5% dari kapasitas.

Gudang baru butuh 14 bulan sampai siap. Kalau gudang penuh 10 bulan lagi, pembangunan sudah terlambat 4 bulan, jadi rapatnya terasa mendesak. Dalam suasana seperti itu, bertanya soal dasar grafiknya terdengar seperti memperlambat. Ketua komite tidak meminta saya memutuskan bangun atau tidak. Ia meminta satu layar yang membuat komite paham apa yang sedang mereka pertaruhkan.

**Gambar 1. Grafik yang dibawa ke rapat**

![gambar 1](images/gambar-1.png)

*Pesanan dan kapasitas gudang per bulan, ton per hari, Januari 2024 sampai Juni 2027. Perhatikan Juni 2026: tidak ada tanda bahwa data asli berhenti di situ.*

Beberapa istilah yang muncul di laporan ini:

| Istilah | Artinya di kasus ini |
|---|---|
| Aktual | Pesanan yang sudah tercatat, Januari 2024 sampai Juni 2026 |
| Proyeksi | Tebakan pesanan ke depan, Juli 2026 sampai Juni 2027, dihitung dari laju pertumbuhan tertentu |
| Skenario | Satu versi tebakan. Ada tiga: pelan (naik 0,8% per bulan), sedang (2,1%), dan cepat (3,8%) |
| Kapasitas rencana | Rak tambahan yang belum dipasang. Kalau jadi, kapasitas naik ke 6.800 mulai Oktober 2026 |
| Target dewan | Angka yang diinginkan direksi untuk Juni 2027 (9.600), tidak dihitung dari data |

## Data

Satu file berisi 42 baris, satu baris per bulan. Januari 2024 sampai Juni 2026 berisi pesanan asli. Juli 2026 sampai Juni 2027 berisi tiga kolom tebakan dari tim perencanaan dan satu kolom target dewan. File ini juga menyimpan ramalan yang dibuat setahun sebelumnya untuk Juli 2025 sampai Juni 2026, yang sekarang bisa dicocokkan dengan kenyataan. Datanya sudah bersih. Saya tidak mengubah, menambah, atau membuang satu nilai pun, dan tidak membuat tebakan sendiri.

## Yang saya kerjakan

Ada tiga keputusan soal cara menggambar, dan masing-masing punya pilihan lain yang saya tolak.

- **Garis batas di Juni 2026, garis tebakan putus-putus.** Garis putus-putus saja tidak cukup: polanya hilang kalau grafik diperkecil jadi tangkapan layar, dan pembaca tidak tahu tanggal batasnya. Beda warna saja juga tidak cukup, karena hilang saat dicetak hitam putih. Dua tanda sekaligus tetap terbaca di kedua keadaan itu.
- **Ketiga tebakan ditampilkan bersama.** Grafik rapat hanya memakai versi sedang. Dengan satu versi, komite tidak tahu ada versi yang membuat gudang tidak penuh sama sekali. Ketiga garis tetap saya bedakan: versi sedang putus-putus tebal, dua lainnya garis tipis.
- **Kapasitas yang sudah ada dibedakan dari yang masih rencana.** Di grafik rapat, garis kapasitas padat sampai ujung, padahal angka 6.800 mulai Oktober 2026 bergantung pada rak yang belum dipasang. Target dewan saya gambar sebagai satu tanda di Juni 2027 supaya tidak terbaca sebagai tebakan keempat.

Waktu mengecek angka, saya menemukan satu hal yang tidak ada di grafik rapat: kalau rak tambahan batal, versi pelan pun membuat gudang penuh di Juni 2027. Hasil itu saya masukkan ke dashboard sebagai tabel.

## Temuan

**Gambar 2. Grafik yang sama setelah digambar ulang**

![gambar 2](images/gambar-2.png)

*Panel utama dashboard. Garis biru padat: pesanan asli sampai Juni 2026. Garis biru putus-putus tebal dan dua garis biru tipis: tiga versi tebakan. Garis hitam: kapasitas, putus-putus untuk yang masih rencana. Titik merah: bulan gudang penuh. Perhatikan garis tipis paling bawah di ujung kanan. Label dashboard berbahasa Inggris: Actual demand = pesanan asli, Forecast fast/medium/slow = tebakan cepat/sedang/pelan, Installed capacity = kapasitas terpasang, Planned capacity = kapasitas rencana, Board target = target dewan.*

- **Tanggal penuhnya tergantung tebakan yang dipakai.** Versi cepat penuh Februari 2027, 8 bulan setelah data terakhir. Versi sedang penuh April 2027, 10 bulan setelahnya. Versi pelan belum penuh sampai Juni 2027. Dua tanggal pertama lebih dekat dari 14 bulan waktu bangun gudang.

**Gambar 3. Ramalan setahun lalu dibandingkan kenyataan**

![gambar 3](images/gambar-3.png)

*Garis putus-putus: ramalan yang dibuat Juni 2025. Garis biru: pesanan yang terjadi, Juli 2025 sampai Juni 2026. Perhatikan jarak kedua garis sepanjang tahun.*

- **Ramalan sejenis pernah meleset cukup jauh.** Ramalan setahun lalu terlalu tinggi rata-rata 17,1% (forecast bias), paling jauh 23,6% di April 2026. Itu lebih besar dari jarak versi sedang dan versi pelan di April 2027 (13,7%), jadi meleset sebesar tahun lalu saja sudah cukup untuk memindahkan jawaban dari satu versi ke versi lain.

**Gambar 4. Bulan gudang penuh, dengan dan tanpa rak tambahan**

![gambar 4](images/gambar-4.png)

*Tabel dari dashboard. Perhatikan baris Slow 0.8%.*

- **Jawaban "tidak penuh" bergantung pada rak tambahan.** Tanpa rak itu kapasitas tetap 6.400, dan versi pelan pun penuh di Juni 2027. Dengan rak, sisa ruang versi pelan di Juni 2027 hanya 284,8 ton per hari (4,2% dari kapasitas). Grafik rapat menunjukkan pertemuan dua garis yang sama-sama belum terjadi: pesanan tebakan dan kapasitas rencana.
- **Hampir sepertiga grafik adalah tebakan.** 12 dari 42 bulan di grafik belum terjadi. Target dewan untuk Juni 2027 (9.600 ton per hari) bahkan lebih tinggi dari versi tebakan paling cepat (9.263,5).

## Apa yang berubah pada keputusannya

Grafik rapat hanya memberi dua pilihan: tanda tangan atau tunda. Grafik baru memperlihatkan dua hal lagi. Gudang yang diputuskan sekarang baru siap setelah Juni 2027, jadi pada versi sedang dan cepat gudang lama tetap penuh sebelum gudang baru jadi. Sampai Juni 2027, itu berarti 3 bulan sewa gudang darurat (Rp 5,7 miliar) pada versi sedang dan 5 bulan (Rp 9,5 miliar) pada versi cepat. Grafik baru juga membuka pilihan ketiga: mulai pekerjaan yang murah kalau dibatalkan, seperti izin dan pemilihan lahan, sambil menunggu data tiga bulan ke depan untuk melihat versi mana yang sedang terjadi. Keputusannya tetap di tangan komite.

## Bukti: dashboard dan lima pemeriksaan

**Gambar 5. Dashboard Power BI satu halaman**

![gambar 5](images/gambar-5.png)

*Pita atas: jawaban untuk komite, bulan gudang penuh untuk tiap versi (Feb 2027 / Apr 2027 / no), sisa bulan sebelum penuh, dan jumlah bulan tebakan. Perhatikan label di ujung kanan tiap garis: label itu menyebut apakah garisnya asli, tebakan, atau rencana.*

Sebelum dashboard dianggap selesai, saya menjalankan lima pemeriksaan. Grafik rapat gagal di kelimanya.

| Pemeriksaan | Yang saya temukan | Yang saya ubah |
|---|---|---|
| Apakah tiap garis menyebut statusnya (asli, tebakan, rencana, target)? | Grafik rapat tidak menyebut status apa pun | Tiap garis diberi label di ujungnya |
| Apakah ketiga versi tebakan terlihat? | Grafik rapat hanya memakai versi sedang | Ketiganya ditampilkan, lajunya ditulis di label |
| Apakah terlihat garis mana yang melewati Juni 2026? | 4 dari 6 garis melewati Juni 2026; kapasitas rencana digambar padat | Kapasitas rencana dibuat putus-putus |
| Apakah tanggal penuh ditulis bersama jaraknya? | Grafik rapat hanya menyebut April 2027 | Kartu jarak menulis 8 sampai 10 bulan di samping waktu bangun 14 bulan |
| Apakah target berbeda bentuk dengan tebakan? | Di file, target berupa garis naik yang mirip versi cepat | Target jadi satu tanda di Juni 2027 |

## Batas

Laporan ini tidak menjawab versi tebakan mana yang paling mungkin terjadi. Ketiganya disusun tim perencanaan dari data yang sama, dan menilainya butuh analisis peramalan yang tidak saya lakukan di sini. Jarak antara versi pelan dan cepat juga bukan rentang statistik; itu hanya jarak antara dua laju yang dipilih orang. Hitungan sewa darurat berhenti di Juni 2027 karena data berhenti di situ. Dashboard ini baru saya uji sendiri, belum ke orang yang paham bisnisnya tapi belum melihat datanya.

## Telusur

Semua angka dihitung dari file permintaan_gudang.csv oleh skrip yang membaca file itu langsung; tidak ada angka yang saya ketik dari gambar. File data, skrip, dashboard Power BI, catatan keputusan desain, catatan validasi, dan memo ada di folder proyek di Google Drive.
