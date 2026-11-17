**Usulan 12 Van Senilai Rp 2,1 Miliar Hampir Disetujui, Padahal Tambahan Waktunya Muncul Sebelum Kendaraan Berangkat**

Diagnosis penurunan pengiriman same-day, operator logistik dengan delapan hub, dashboard Power BI, 72.000 order dari 1 Mei sampai 29 Juni 2026

Mochamad Fajri Ilham Nurdin, selesai November 2026, mfajriilhamn@gmail.com

Catatan data: angka di bawah berasal dari dataset simulasi yang meniru pola operasi pengiriman same-day. Ini bukan data perusahaan sungguhan dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## Ringkasan

Sebuah operator pengiriman same-day melihat ketepatan waktunya jatuh dari 94,2% ke 82,6% setelah cut-off pemesanan digeser dua jam, dan Direktur Operasional mengusulkan sewa 12 van tambahan senilai Rp 2,1 miliar per tahun. Angka jaringan itu benar, dan ia tidak menunjuk ke hub, jam, atau tahap proses mana pun. Saya menyusun bukti yang sama dalam urutan yang memisahkan keempatnya: 78,2% tambahan waktu ternyata muncul di antrean dispatch, sedangkan last mile, tahap tempat van bekerja, hanya 3,8%.

## Kenapa laporan ini ada

Pada 17 Juni 2026, cut-off same-day dimundurkan dari 14:00 ke 16:00 supaya pelanggan punya waktu belanja lebih panjang. Tiga belas hari kemudian, rapat persetujuan modal dibuka dengan satu kartu on-time 82,6%. Dari angka itu, "order terlambat berarti kendaraan kurang" adalah dugaan yang wajar, dan keputusan Rp 2,1 miliar per tahun akan diambil besok pagi dengan atau tanpa analisis. Head of Fulfillment butuh satu layar yang argumennya tertangkap dalam 30 detik, dan detailnya bisa dipertahankan baris demi baris ketika ditanya.

## Data

Tiga berkas dengan tingkat rincian berbeda: 72.000 baris order dengan durasi tiap tahap proses (pick, pack, dispatch, transit, last mile), 480 baris ringkasan hub-hari, dan 1.920 baris ringkasan hub-hari-rentang jam. Ketiganya cocok satu sama lain sampai tingkat sel. Sekitar 28% order berlayanan next-day dan tidak pernah terlambat. Data tidak memuat jumlah staf dispatch, kapasitas dok, cuaca, atau utilisasi van per jam.

## Yang saya kerjakan

Saya menulis argumen layar dalam satu kalimat sebelum membuka tool, lalu memberi tiap klausanya satu bentuk: grafik kendali untuk membuktikan pergeseran, dua panel hub untuk beban dan proporsi, heatmap hub kali jam order untuk mencari perpotongan, dan selisih menit per tahap untuk letak waktu yang hilang. Setiap angka punya kontrak tertulis (sumber, tingkat rincian, pembilang, penyebut, pembanding) sebelum digambar.

Pendekatan yang ditolak: dua batang sebelum dan sesudah, karena tidak bisa membedakan pergeseran yang bertahan dari beberapa hari buruk; peringkat hub menurut jumlah order terlambat saja, karena menaruh hub terbesar di puncak apa pun keadaannya; skor prioritas gabungan, karena bobotnya keputusan bisnis yang belum disetujui siapa pun; dan komposisi durasi total per tahap, karena transit (sekitar 110 menit) akan terlihat dominan padahal hampir tidak berubah.

Pemeriksaan yang mengubah pekerjaan: merata-ratakan on-time per hub-hari menghasilkan 84,44%, 1,88 poin di atas rasio jumlah 82,56%, jadi semua rate dihitung ulang sebagai jumlah dibagi jumlah. Draf memo saya sempat menyebut manfaat van paling banyak 3,8%. Kalimat itu saya turunkan, karena antrean dispatch bisa saja menunggu van kosong dan data ini tidak memuat utilisasi per jam. Rancangan uji lalu diubah supaya jumlah van ditahan tetap.

**Gambar 1. Ketiga belas hari sesudah 17 Juni berada di bawah rentang kewajaran baseline**

![gambar 1](images/gambar-1.png)

*On-time harian jaringan, 1 Mei sampai 29 Juni 2026. Pita putus-putus adalah rentang wajar sebelum 17 Juni; garis biru sesudahnya. Perhatikan hari-hari sesudah 17 Juni yang semuanya di bawah batas bawah.*

On-time harian jaringan, 1 Mei sampai 29 Juni 2026, 72.000 order. Pita abu-abu adalah batas kendali yang dihitung dari periode sebelum 17 Juni. Perhatikan letak titik merah terhadap pita itu, dan bahwa tidak satu pun kembali ke dalamnya.

**Gambar 2. Jakarta membawa beban terbesar, Bandung punya late rate tertinggi**

![gambar 2](images/gambar-2.png)

*Atas: jumlah order terlambat per hub sesudah 17 Juni. Bawah: late rate per hub. Perhatikan Jakarta di grafik atas dan Bandung di grafik bawah.*

Delapan hub, 17 sampai 29 Juni 2026, 15.600 order. Kiri jumlah order terlambat, kanan late rate dengan jumlah ordernya, urutan hub sama di kedua panel. Perhatikan bahwa dua baris teratas tidak punya urutan yang sama di kiri dan kanan.

**Gambar 3. Keterlambatan menumpuk pada order pukul 15:00 sampai 17:59 di dua hub**

![gambar 3](images/gambar-3.png)

*Persen order terlambat sesudah 17 Juni per hub dan rentang jam order. Makin terang makin tinggi. Perhatikan kolom 15:00 sampai 17:59 di baris Jakarta dan Bandung.*

Late rate per hub dan rentang jam order, 17 sampai 29 Juni 2026, dengan jumlah order di tiap sel. Perhatikan dua sel berbingkai, dan sel pagi kedua hub yang sama yang tidak berbeda dari hub lain.

**Gambar 4. Antrean dispatch membawa 78,2% tambahan menit, last mile 3,8%**

![gambar 4](images/gambar-4.png)

*Tambahan menit per order di atas waktu standar, sesudah dikurangi keadaan sebelum 17 Juni, menurut tahap proses. Perhatikan batang Dispatch dibanding Last mile.*

Menit kelebihan per order di atas waktu standar tiap tahap, sesudah dikurangi sebelum 17 Juni, dalam urutan proses. Perhatikan satu batang yang jauh meninggalkan empat lainnya, dan letaknya sebelum transit dan last mile.

**Gambar 5. Tidak ada hub yang mendekati kapasitas van penuh menurut rata-rata harian**

![gambar 5](images/gambar-5.png)

*Rata-rata utilisasi van per hub sesudah 17 Juni; 100% berarti semua van terpakai sepanjang hari. Perhatikan jarak batang tertinggi ke 100%.*

Rata-rata utilisasi van per hub, 17 sampai 29 Juni 2026, sumbu 0% sampai 100%. Perhatikan jarak batang tertinggi ke garis kapasitas penuh.

## Temuan

1. On-time turun 11,6 poin, dari 94,2% ke 82,6% (12.880 dari 15.600 order). Ketiga belas hari sesudah perubahan berada di bawah batas bawah 92,2%, tanpa satu pun kembali ke rentang.
2. Jakarta membawa 945 order terlambat (24,2% dari 3.900), Bandung punya late rate tertinggi 26,8% (523 dari 1.950). Dihitung terhadap kebiasaan masing-masing sebelum 17 Juni, dua hub ini membawa 64,1% tambahan keterlambatan jaringan.
3. Di dua hub itu, order pukul 15:00 sampai 17:59 terlambat 59,9% (Bandung, 397 dari 663) dan 49,5% (Jakarta, 656 dari 1.326), sedangkan order pagi kedua hub 7,0% sampai 8,5%.
4. Tambahan waktu 5,93 menit per order, dan 4,63 menit di antaranya (78,2%) terbentuk di antrean dispatch. Last mile menyumbang 0,23 menit (3,8%), dan utilisasi van rata-rata 65,1%, per hub 58,9% sampai 69,9%.
5. Porsi order pukul 15:00 sampai 17:59 tetap 34% di kedua periode. Yang berubah adalah lama order same-day di jam itu menunggu di dispatch, rata-rata 31,0 menit sebelum 17 Juni dan 54,1 menit sesudahnya.

## Apa yang berubah pada keputusannya

Sebelum analisis, rapat akan memutuskan berapa van yang perlu ditambah. Sesudahnya, pertanyaannya menjadi di tahap mana waktu bertambah dan apakah kapasitas tahap itu yang kurang. Rekomendasinya: tunda kontrak 12 van selama dua minggu dan uji tambahan kapasitas dispatch pukul 15:00 sampai 18:00 di Jakarta dan Bandung, atau kembalikan cut-off 14:00 untuk kelompok uji kalau kapasitas tambahan tidak tersedia, dengan jumlah van ditahan tetap. Berhasil kalau on-time kelompok uji kembali ke 92,2% atau lebih, menit kelebihan dispatch turun minimal 50%, dan pembatalan tidak naik berarti. Usulan van tidak dibuang; ia diputuskan ulang dari hasil uji.

**Gambar 6. Halaman Overview pada dashboard Power BI**

![gambar 6](images/gambar-6.png)

Satu layar 16:9 yang dibaca dari atas ke bawah: pergeseran, lokasi, jam, tahap, pemeriksa, lalu tindakan. Perhatikan bahwa layar ini tidak punya kartu KPI di sudut kiri atas, dan rekomendasinya ada di baris terakhir.

## Batas

Analisis ini observasional. Perubahan cut-off bertepatan dengan penurunan dan belum terbukti sebagai satu-satunya sebab, karena jumlah staf, kapasitas dok, dan komposisi order belum dipisahkan. Utilisasi 65,1% adalah rata-rata harian dan bisa menyembunyikan puncak per rute atau per jam. Angka jaringan memasukkan order next-day; kalau hanya order same-day yang dihitung, on-time turun dari 91,9% ke 75,9%, dengan hub, jam, dan tahap yang sama. Rp 2,1 miliar adalah nilai kontrak yang ditunda, belum penghematan.

## Telusur

Skrip hitung yang membaca ketiga berkas mentah dan menghasilkan semua angka di atas; catatan keputusan desain dengan satu baris per elemen, kontrak metrik, dan bentuk yang ditolak; catatan validasi dengan lima audit, termasuk lima pemeriksaan yang gagal lalu diperbaiki dan diuji ulang; memo keputusan satu halaman; dan dashboard Power BI. Semua ada di folder proyek.
