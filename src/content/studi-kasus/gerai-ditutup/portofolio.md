**Tiga daftar tanpa irisan: memilih 20 dari 180 gerai kopi ketika tidak ada grafik baku yang sanggup memuat 180 lintasan**

Jaringan kedai kopi dengan 180 gerai di sepuluh kota harus menutup 20 gerai. Biayanya tetap Rp 17 miliar, apa pun daftarnya. Tiga cara mengurutkan yang sama sahnya memberi tiga daftar tanpa satu nama yang sama, dan pendapatan tahunan yang ikut hilang bergerak dari Rp 4,2 miliar sampai Rp 19 miliar. Saya menyusun layar yang membuat pembacanya melihat apa yang ia pilih ketika memilih salah satu daftar.

Mochamad Fajri Ilham Nurdin, November 2026. Datanya sintetis; nama perusahaan dan gerai rekaan. Berkas data, skrip hitung, dashboard, memo, dan catatan validasi: folder proyek di Google Drive.

## Konteks

**Keputusan.** Dewan SeduhKita sudah memutuskan menutup 20 gerai. Biaya penutupan (penalti sewa, pesangon, pembongkaran) Rp 850 juta per gerai, jadi Rp 17 miliar untuk daftar mana pun. Pertanyaannya tinggal gerai mana, dan yang dipertaruhkan adalah pendapatan yang ikut hilang selamanya. Pendapatan jaringan 12 bulan terakhir Rp 169,8 miliar.

**Daftar awal.** Direktur Keuangan mengirim 20 gerai dengan pendapatan Desember 2025 terendah. Kolom itu ada di setiap laporan bulanan, urutannya bisa diulang siapa pun, dan ia bisa dijelaskan kepada dewan dalam satu kalimat. COO meminta daftar pembanding sebelum menandatangani, dengan satu syarat: layar yang membuat keduanya melihat hal yang sama, tanpa membuktikan siapa pun keliru.

**Kenapa sulit.** Tiap gerai punya 24 titik bulanan. Tabel peringkat membuang lintasan. 180 garis dalam satu grafik memuat semuanya dan tidak ada satu pun yang bisa diikuti. 180 panel kecil tidak muat di satu layar, dan panel dengan sumbu otomatis membuat gerai yang datar terlihat runtuh. Ketiga bentuk baku gagal, dan cara gagalnya berbeda.

**Gambar 1. Siapa yang dipilih tiap cara mengurutkan**

![gambar 1](images/gambar-1.png)

*Halaman Lists: tiap batang adalah 20 gerai yang dipilih satu cara mengurutkan, diwarnai menurut kelompok lintasan (menurun stabil, jatuh April 2025, gerai baru, lainnya). Perhatikan baris pertama (pendapatan terendah, daftar asli) yang hampir seluruhnya gerai baru.*

**Data.** 180 gerai, Januari 2024 sampai Desember 2025, 4.320 baris dengan 3.975 terisi. Sembilan belas gerai dibuka di tengah periode dan tidak punya data sebelum tanggal buka. Datanya hanya pendapatan: tidak ada biaya, laba, pesaing, cuaca, atau perubahan operasional.

## Kerangka dan pendekatan

Pekerjaan ini tidak menuntut angka baru. Yang dikerjakan adalah memutuskan berapa banyak dari 24 titik tiap gerai yang boleh dibuang di tiap elemen, lalu memastikan elemen lain mengembalikan apa yang dibuang. Hasilnya empat elemen dengan empat tingkat pemampatan.

| Elemen | Pemampatan | Yang hilang | Dikembalikan oleh |
|---|---|---|---|
| Peta tingkat lawan arah | 24 titik menjadi 2 angka | bentuk lintasan | tabel sparkline |
| Tabel sparkline | 24 titik menjadi 1 garis kecil | nilai persis dan skala | dua kolom angka di sebelahnya |
| Small multiples | tidak ada, sumbu identik | ruang layar | dibatasi 23 dari 180 gerai, tertulis di judul |
| Strip daftar | 180 gerai menjadi 20 kursi | 160 gerai lain | seluruh 180 tetap tergambar abu-abu |

**Dari satu sumbu ke dua sumbu**

Peringkat pendapatan terendah menjawab "siapa yang paling kecil sekarang", sementara keputusannya menanyakan "siapa yang paling layak ditutup". Saya mempertahankan kolom daftar awal sebagai sumbu mendatar dan menambahkan arah 24 bulan di sumbu tegak, sehingga pembaca daftar awal mulai dari angka yang ia kenal. Skor gabungan ditolak karena enam pasang gerai punya pendapatan Desember dan perubahan 24 bulan yang sama persis; rumus apa pun yang membaca kedua kolom itu memberi mereka nilai yang sama.

**Dari sumbu otomatis ke sumbu bersama**

**Gambar 2. Median pendapatan 23 gerai April dibanding gerai lama lainnya**

![gambar 2](images/gambar-2.png)

*Indeks median pendapatan bulanan, rata-rata 2024 = 100, Januari 2024 sampai Desember 2025. Perhatikan langkah turun di April 2025 yang hanya terjadi pada 23 gerai itu.*

Tiga gerai di baris atas hampir datar. Dengan setelan bawaan tool mereka tergambar sama curamnya dengan tiga gerai di baris bawah yang jatuh 27% sampai 38% dalam sebulan. Bentuk panelnya benar; setelan sumbunya yang menyesatkan.

**Jendela waktu yang tertulis**

**Gambar 3. Pendapatan yang ikut hilang dan irisan tiap daftar**

![gambar 3](images/gambar-3.png)

*Pendapatan 2025 dari 20 gerai di tiap daftar (Rp miliar) dan jumlah gerai yang juga ada di daftar asli. Perhatikan baris tren 3 bulan dan 6 bulan.*

## Temuan dan rekomendasi

1. **Gerai kecil dan gerai yang menurun hampir tidak beririsan.** Daftar pendapatan terendah dan daftar penurunan 24 bulan terbesar hanya sama di satu gerai. 15 dari 20 nama di daftar awal dibuka Mei sampai September 2025 dan pendapatannya sudah naik 38% sampai 120% sejak bulan pertama; menutupnya memakan Rp 12,75 miliar dari Rp 17 miliar.
2. **Dua angka yang sama, dua keputusan.** G108 dan G124 sama-sama berakhir di Rp 56,8 juta dengan perubahan 24 bulan −23,1%. G108 turun sedikit demi sedikit; G124 datar 15 bulan lalu jatuh pada April 2025. Ada enam pasang seperti itu, dan di tiap pasang satu anggota menurun bertahap, satu jatuh pada bulan yang sama.
3. **23 gerai turun pada bulan yang sama.** Dari Maret ke April 2025, 23 gerai turun 16% sampai 42% lalu bertahan di tingkat baru, sementara total pendapatan 122 gerai lama lainnya naik 5,5%. Mereka tersebar di 10 kota dan 5 jenis lokasi. Hitungan dengan ambang turun lebih dari 20% dalam sebulan memberi 22, karena ambang itu melewatkan dua anggota (turun 16,4% dan 17,0%) dan memasukkan satu gerai yang pulih bulan berikutnya.
4. **Kuota 20 lebih besar dari kelompok yang jelas.** Kelompok yang menurun bertahap tanpa ikut jatuh pada April berisi 16 gerai. Gerai lama berikutnya di luar kelompok April hanya turun 3,8% dari 2024 ke 2025. Di strip 12 bulan, gerai ke-20 dan ke-21 berselisih 0,28 poin, jadi angka 20 adalah kuota dewan dan tidak menandai patahan apa pun di data.

Kelompok-kelompok itu saya susun dari lintasan dengan aturan yang bisa diulang, tanpa kolom pola_sebenarnya yang ikut tersedia di berkas. Sesudahnya hasilnya dicocokkan ke kolom itu sebagai audit: 19, 23, dan 16 gerai, cocok seluruhnya.

**Rekomendasi**

Tutup 16 gerai yang menurun bertahap (pendapatan 12 bulan terakhir Rp 11,93 miliar). Telusuri 23 gerai April sebagai satu pertanyaan selama dua minggu sebelum menutup satu pun di antaranya; kalau tidak ditemukan sebab bersama yang bisa diperbaiki, empat kursi sisanya diisi empat gerai April yang turun paling dalam dalam 12 bulan (Rp 3,54 miliar). Keluarkan 19 gerai baru dan tinjau ulang sesudah 12 bulan beroperasi penuh.

**Batas**

- Data hanya memuat pendapatan, jadi "menurun" berarti pendapatannya turun. Tidak ada yang bisa dikatakan tentang laba atau rugi gerai mana pun.
- Data tidak memuat peristiwa. Penurunan April 2025 adalah pola; untuk mengetahui sebabnya diperlukan data operasional yang tidak ada di berkas ini.
- Rp 17 miliar adalah biaya penutupan yang sama untuk semua daftar dan tidak dihitung sebagai penghematan.

## Lapisan bukti

**Gambar 4. Halaman Overview pada dashboard Power BI**

![gambar 4](images/gambar-4.png)

*Tiga angka keputusan di atas (16 tutup sekarang, 4 kursi cadangan, 23 gerai April diselidiki), sebaran 180 gerai menurut pendapatan dan pertumbuhan, daftar usulan di bawah, dan ringkasan untuk direksi di kanan. Halaman Lists, Sudden drop, dan Quota memuat rinciannya.*

| Uji | Yang terlihat | Perbaikan | Hasil |
|---|---|---|---|
| Bulan kosong | hitungan baris 4.320, seharusnya 3.975 | bulan sebelum buka dibiarkan kosong, garis diputus | 3.975 baris; tidak ada gerai yang melonjak dari nol |
| Sumbu panel | dengan sumbu otomatis gerai datar tergambar setajam gerai yang jatuh 38% | rentang tetap 40 sampai 140 di semua panel | gerai datar tergambar datar |
| Jendela | mengganti 6 bulan menjadi 3 bulan mengganti 20 dari 20 nama | periode dicetak di tiap elemen; tiga jendela ditandai berdampingan | pembaca bisa melihat pasangan berpindah daftar |
| Warna | dalam abu-abu, strip dan tabel kehilangan tanda usulan tutup | ketebalan batang dan kata "tutup" ditambahkan | terbaca tanpa warna |
| Batas klaim | label data "Guncangan bersama" menyiratkan peristiwa | judul memakai "turun pada bulan yang sama" | tidak ada klaim sebab di layar |

Uji 30 detik dengan pembaca yang tidak ikut membangun belum dijalankan dan dicatat sebagai BELUM di catatan validasi.
