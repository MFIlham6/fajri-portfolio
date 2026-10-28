Studi kasus, RevoU × Telkom Indonesia, Milestone 1

# Volume pesan OCA turun 28% dalam satu kuartal, dan penurunan email menjadi penyebab utamanya

Tableau Public, Dikerjakan sendiri, Dashboard, KPI Reporting, Analisis Channel, Stakeholder Mapping

## 1. Ringkasan

Laporan empat channel OCA Blast masih terpisah, sehingga penurunan volume di Q1 2025 tidak terlihat sumbernya. Saya menyatukan 122.749 transaksi ke satu dashboard Tableau untuk empat kelompok pembaca. Volume turun 28% dari Januari ke Maret, dan 12.000 dari 14.042 pesan yang hilang berasal dari email. Rekomendasinya: penurunan email diselidiki sebelum Q2, Call dibatasi untuk kasus bernilai tinggi karena hanya berhasil 21,87%, dan tingkat keberhasilan per channel masuk KPI Q2.

## 2. Kenapa laporan ini ada

OCA adalah layanan CPaaS (Communication Platform as a Service) milik Telkom Indonesia. Layanan ini dipakai 20 klien korporat dari 9 industri untuk mengirim pesan lewat WhatsApp, SMS, Email, dan Call. Sepanjang Q1 2025, OCA Blast belum mengoptimalkan kinerja channel dan aktivitas penggunanya, sehingga pertumbuhan penggunaan dan monetisasi tertahan.

Dashboard dibuat untuk empat pembaca:

| Pembaca | Keputusan yang dibantu |
|---|---|
| C-level | Arah KPI kuartal berikutnya |
| Product Manager OCA Blast | Perbaikan channel yang bermasalah |
| Marketing dan Campaign Ops | Alokasi channel dan jadwal kampanye |
| Account Manager | Prioritas klien yang perlu dijaga atau dikembangkan |

## 3. Data dan batasannya

Lima tabel untuk periode 1 Januari sampai 31 Maret 2025, total 122.749 transaksi:

| Tabel | Baris | Kolom utama |
|---|---|---|
| wa_transactions | 50.000 | transaction_id, user_id, price, created_at, message_status |
| email_transactions | 40.000 | sama |
| sms_transactions | 20.000 | sama |
| call_transactions | 12.749 | sama |
| users | 20 | user_id, user_name, field_of_business, join_date |

Sebelum dashboard dibangun, keempat tabel channel disatukan menjadi satu tabel transaksi, lalu dihubungkan ke tabel users lewat user_id. Hasil pemeriksaan datanya:

| Pemeriksaan | Hasil |
|---|---|
| Jumlah baris gabungan | 122.749, sama dengan total keempat tabel (50.000 + 40.000 + 20.000 + 12.749) |
| Klien | 20 klien di data transaksi, sama dengan 20 baris tabel users |
| Rentang tanggal | 1 Januari sampai 31 Maret 2025 |
| Baris kembar | Tidak ada baris yang kembar penuh. Satu transaction_id dipakai oleh dua transaksi email yang berbeda |
| Status pesan | 15 status dari 4 channel (Call 3, SMS 2, Email 6, WhatsApp 4), dipetakan menjadi berhasil atau tidak berhasil |
| Transaksi tanpa biaya | 18.600 transaksi (15,2%) berharga 0 dan bertanda charge false. Semuanya pesan yang gagal, belum sampai, atau berstatus clicked |

Data hanya mencakup satu kuartal dan tidak memuat isi pesan, biaya pengiriman di sisi OCA, maupun log teknis email. Karena itu dashboard ini bisa menunjukkan di mana volume dan keberhasilan berubah, tetapi tidak bisa menjelaskan kenapa email turun. Data juga sudah disesuaikan oleh penyelenggara untuk keperluan edukasi dan tidak mencerminkan kondisi bisnis OCA yang asli.

## 4. Yang saya kerjakan

1. Memahami masalah: laporan empat channel masih terpisah, lalu dirumuskan empat pertanyaan bisnis tentang volume, keberhasilan, jam sibuk, dan klien aktif.
2. Menyiapkan data: menyatukan tabel, memeriksa kualitas data (tabel di bagian 3), dan memetakan 15 status pesan menjadi berhasil atau tidak berhasil.
3. Eksplorasi: melihat pola volume, keberhasilan, dan revenue per channel, per bulan, per jam dan hari, serta per klien.
4. Analisis: membandingkan volume, tingkat keberhasilan, dan revenue per pesan antar channel untuk menemukan sumber penurunan dan channel yang kurang dimanfaatkan.
5. Visualisasi: membangun dashboard di Tableau Public dengan kartu KPI, bar chart, heatmap, dan line chart. Ada satu halaman ringkasan untuk C-level dan satu halaman khusus untuk tiap tim.
6. Rekomendasi: menyusun rekomendasi per pembaca, lalu mengurutkannya dengan matriks impact dan effort.

### Metrik dan alasannya

| Metrik | Alasan dipilih |
|---|---|
| Total pesan terkirim | Melihat beban dan pemakaian keseluruhan |
| Tingkat keberhasilan dan kegagalan | Menilai keandalan tiap channel |
| Porsi volume per channel | Melihat channel mana yang dominan |
| Tren volume bulanan | Melacak pertumbuhan atau penurunan |
| Pengguna aktif | Memantau adopsi |
| Jam dan hari tersibuk | Bahan penjadwalan kampanye |
| Total revenue | Menilai dampak ke monetisasi |

Definisi "berhasil" berbeda untuk setiap channel: WhatsApp dihitung berhasil jika delivered atau read, SMS jika sent, Email jika delivered, opened, atau clicked, dan Call jika answered. Email berstatus clicked ikut dihitung berhasil karena klik hanya terjadi setelah email terbuka, walaupun 1.102 baris clicked tercatat tanpa biaya. Dengan definisi ini tingkat keberhasilan keseluruhan 79,54%. Kalau clicked tidak dihitung, angkanya menjadi 78,65%.

## 5. Gambar

*Gambar menyusul: slide 14, grafik volume per channel Januari sampai Maret.*

*Gambar menyusul: tangkapan layar halaman utama dashboard.*

## 6. Temuan

**Email menjadi sumber penurunan volume.** Volume total turun 28% dari Januari ke Maret (49.534 menjadi 35.492 pesan). Email turun 60% (20.000 menjadi 8.000) dan menyumbang 12.000 dari 14.042 pesan yang hilang, sementara WhatsApp dan SMS relatif datar. Penurunan ini terjadi di satu channel, sehingga penyebabnya perlu dicari di sisi email.

**Channel yang paling andal justru jarang dipakai.**

| Channel | Tingkat keberhasilan | Revenue per pesan |
|---|---|---|
| SMS | 99,67% | Rp 498 |
| WhatsApp | 84,77% | Rp 238 |
| Email | 81,32% | Rp 39 |
| Call | 21,87% | Rp 180 |

SMS hampir selalu berhasil dan menyumbang 38,7% revenue, tetapi hanya memegang 16% volume. Call gagal pada 78,13% percobaan tetapi masih memegang 10% volume.

**Revenue bergantung pada sedikit klien.** Tiga klien teratas menyumbang sekitar 60% dari total revenue Rp 25,77 juta. Kehilangan satu dari mereka berarti revenue turun sekitar 20%.

## 7. Apa yang berubah pada keputusannya

| Prioritas | Rekomendasi | Pemilik |
|---|---|---|
| Quick win | Menyelidiki penurunan email sebelum Q2 dimulai | Product Manager |
| Quick win | Membatasi Call untuk kasus bernilai tinggi saja | Product Manager |
| Quick win | Menetapkan tingkat keberhasilan minimal 85% per channel sebagai KPI Q2, di samping volume | C-level |
| Proyek besar | Menyiapkan rencana khusus untuk tiga klien teratas | Account Manager |
| Proyek besar | Memperbaiki pengiriman email (bounce, reputasi pengirim, kebersihan daftar) | Tim Teknis |

## 8. Batas dan telusur

Data hanya mencakup satu kuartal, jadi belum bisa dibedakan apakah penurunan email bersifat musiman atau berasal dari masalah teknis. Penyebab pastinya juga tidak terlihat dari data transaksi saja dan membutuhkan log pengiriman email.

Telusur: [Dashboard Tableau Public](https://public.tableau.com/views/OCAIndonesia-UnifiedChannelPerformance/OCAIndonesia-UnifiedChannelPerformance), Slide presentasi ke stakeholder, 18 slide, PDF (link menyusul)

### Kalau diulang

1. Saya akan menghitung volume per hari, karena Februari hanya 28 hari dan sebagian penurunan bulanan berasal dari jumlah hari. Koreksi ini baru saya lakukan di Milestone 2.
2. Saya akan menguji kekuatan jam sibuk sebelum menyarankan jadwal kampanye. Di Milestone 2 terlihat jam tersibuk hanya memegang 8% pesan, sedikit di atas rata-rata 7,7% per jam.
3. Usulan memindahkan volume email ke SMS akan saya hitung bersama biayanya, karena SMS sekitar 12 kali lebih mahal per pesan bagi klien.

Lanjut ke: [Milestone 2, segmentasi klien OCA](/id/projects/telkom-m2/full)
