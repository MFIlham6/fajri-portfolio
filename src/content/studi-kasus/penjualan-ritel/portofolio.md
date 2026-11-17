**Menentukan Prioritas Cabang dari Data Kasir yang Belum Bersih**

Analisis penjualan ritel, jaringan sepuluh cabang, Spreadsheet, 4.112 transaksi bersih 2025 dari 5.145 baris mentah

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, mfajriilhamn@gmail.com

*Catatan data: angka di bawah dihitung dari dataset simulasi yang meniru pola penjualan ritel multi-cabang. Ini bukan data perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## Ringkasan

Jaringan ritel sepuluh cabang perlu menentukan cabang mana yang disiapkan lebih dulu untuk periode belanja terbesarnya. Bahannya satu ekspor mentah dari sistem kasir. Kalau berkas itu langsung dijumlahkan, total penjualan 2025 terbaca 23,6% lebih tinggi, karena ekspor ikut memuat transaksi 2026. Analisis ini memisahkan masalah periode dari masalah kualitas data, lalu mengecek kesimpulan mana yang tetap berlaku setelah keduanya dibereskan. Hasilnya, hanya dua cabang yang unggul cukup jelas untuk diprioritaskan.

## Konteks bisnis

Dalam skenario kasus ini, kepala operasional harus memutuskan cabang mana yang mendapat stok dan staf tambahan lebih dulu, serta kapan promo dijalankan. Waktunya satu malam, tanpa tim analis dan tanpa laporan pembanding. Kalau urutannya dibaca dari total mentah, hasilnya ikut memasukkan Rp 4,78 miliar transaksi di luar periode dan menempatkan cabang yang salah di peringkat 3.

## Data

Ekspor sistem kasir: 5.145 baris, sembilan kolom, sepuluh cabang, empat kategori produk. Tanggalnya mencakup sampai 2026, melewati periode yang ditanyakan. Tidak ada kolom biaya, tidak ada penanda promo, dan data yang relevan hanya satu tahun.

## Cara kerja

1. Periode dibatasi lebih dulu, baru kualitas data diperiksa. Alasannya: transaksi di luar periode menambah total 23,6%, sedangkan seluruh baris rusak di dalam 2025 hanya 1,09% (keduanya dihitung terhadap total mentah 2025).
2. Anomali dicek dengan membandingkan Qty × Price dengan TotalSales. Kolom TotalSales tidak memuat satu pun nilai minus, padahal tujuh baris punya Qty atau Price minus. Kalau hanya TotalSales yang dicek, ketujuh baris itu lolos.
3. Bulan dibandingkan dengan rata-rata per hari kalender. Total bulanan tidak adil untuk Februari yang hanya 28 hari.
4. Setiap kesimpulan dicek ulang, termasuk memecah efek awal bulan per bulan untuk melihat apakah polanya muncul di banyak bulan atau hanya di sebagian.

**Gambar 1. Total membengkak hampir seperempat karena periodenya tidak dibatasi.**

![gambar 1](images/gambar-1.png)

*Langkah dari total ekspor mentah 5.145 baris ke total bersih 2025 (Rp juta). Batang transaksi di luar 2025 jauh lebih tinggi daripada dua batang baris rusak.*

**Gambar 2. Hanya dua cabang teratas yang terpisah jelas dari cabang lain.**

![gambar 2](images/gambar-2.png)

*Penjualan bersih 2025 per cabang, satu titik per cabang, dari 4.112 baris. Jarak antara titik biru Medan dan titik abu-abu tertinggi, Surabaya Central, jauh lebih lebar daripada jarak antartitik abu-abu.*

**Gambar 3. Februari tampak lemah dari total bulanan, tapi kuat dari rata-rata harian.**

![gambar 3](images/gambar-3.png)

*Selisih tiap bulan 2025 terhadap rata-ratanya, dihitung dari total bulanan dan dari rata-rata per hari kalender, dari 4.112 baris. Februari ada di bawah nol menurut total (batang abu-abu), tapi di atas nol menurut rata-rata harian (batang biru). Sebelas dari dua belas bulan berganti peringkat, tapi selain Februari, pergeserannya hanya satu atau dua posisi. Peringkat lengkap ada di tabel bawah tab Dashboard.*

**Gambar 4. Lonjakan awal bulan hanya muncul jelas di Februari dan November.**

![gambar 4](images/gambar-4.png)

*Selisih rata-rata harian tanggal 1 sampai 5 dibandingkan sisa bulan, untuk tiap bulan 2025, dari 4.112 baris. Batang Februari dan November jauh lebih tinggi daripada sepuluh bulan lainnya.*

## Temuan

1. Yogyakarta (Rp 2.456,3 juta) dan Medan (Rp 2.392,3 juta) unggul Rp 321,9 juta dari peringkat 3. Lima cabang berikutnya hanya terpaut Rp 119,4 juta, lebih sempit dari celah di atas dan di bawahnya.
2. Dari 5.145 baris, 1.000 berada di luar periode, senilai Rp 4.776.925.000: 995 transaksi Januari sampai Maret 2026 dan 5 baris bertanggal tersebar.
3. Tujuh baris 2025 punya Qty atau Price minus, tapi TotalSales tetap positif, senilai Rp 144.287.500. Anomali ini tidak terlihat kalau hanya kolom TotalSales yang diperiksa.
4. Pembersihan hanya mengubah total 1,09%, tapi cukup untuk menukar dua pasang peringkat cabang yang berselisih Rp 31,4 juta dan Rp 18,6 juta.
5. Februari ada di peringkat 9 menurut total bulanan, tapi di peringkat 2 menurut rata-rata harian.
6. Tanggal 1 sampai 5 rata-rata 13,7% lebih ramai dari sisa bulan, sedangkan efek akhir pekan hanya 4,0%. Lonjakan awal bulan ini hampir seluruhnya berasal dari Februari dan November. Tanpa dua bulan itu, awal bulan 2,5% lebih rendah.

## Dampak pada keputusan

Kalau dibaca dari total mentah, sepuluh cabang akan diurutkan sebagai sepuluh tingkat prioritas, Surabaya East ada di peringkat 3, dan Februari terlihat seperti bulan sepi. Setelah data dibersihkan, hanya dua cabang teratas yang cukup jauh untuk jadi dasar prioritas. Lima cabang di tengah diperlakukan setara. Untuk promo, awal bulan layak diuji coba, tapi belum cukup kuat untuk dijadikan aturan karena lonjakannya hanya terjadi di dua bulan.

## Batas

Tidak ada data biaya, jadi tidak ada kesimpulan soal profitabilitas. Tidak ada penanda promo, jadi penyebab lonjakan Februari dan November tidak bisa dipastikan. Minggu menjelang Lebaran 2025 belum dianalisis terpisah. Satu tahun data belum cukup untuk menyatakan pola musiman. Baris minus diasumsikan salah input. Kalau ternyata retur sah, nilainya harus dicatat minus, dan Surabaya East turun dari peringkat 4 ke peringkat 7. Dua cabang teratas tidak berubah.

## Lampiran

Workbook enam tab dengan seluruh rumus terbuka, termasuk Cleaning Log yang mencatat dampak rupiah tiap langkah pembersihan dan tab Dashboard. Catatan keputusan memuat asumsi dan data yang dikeluarkan.
