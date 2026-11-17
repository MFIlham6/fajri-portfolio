**Verifikasi telepon menahan 6.730 dari 14.874 pendaftar, dan selisih antarplatform terlalu kecil untuk memecah perbaikannya**

Sebuah super-app tahu konversi totalnya 19,88%, tapi tidak tahu di tahap mana pengguna barunya hilang. Saya membangun funnel lima tahap dari 80.000 baris peristiwa untuk menjawabnya.

Mochamad Fajri Ilham Nurdin, dikerjakan Oktober 2026, kueri dan berkas pemeriksaan: folder Google Drive, mfajriilhamn@gmail.com

Catatan data: angka di halaman ini dihitung dari dataset latihan yang dirancang meniru pola peristiwa aplikasi super-app. Ini bukan data perusahaan sungguhan dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.

## Ringkasan

Aplikasi ini menggabungkan transportasi, pesan-antar makanan, dan pembayaran digital, dan membelanjakan Rp 2 miliar per bulan untuk akuisisi pengguna. Dari 20.000 pengguna yang tercatat selama 15 bulan, langkah verifikasi telepon menahan 6.730 dari 14.874 pendaftar (45,25%), sementara tiga langkah lain kehilangan 25,43% sampai 30,60%. Selisih antarplatform di langkah itu hanya 1,82 poin. Saran saya: satu perbaikan di langkah verifikasi untuk semua platform, dijalankan sebagai uji dengan kelompok pembanding sesudah pencatatan peristiwanya diaudit.

## Kenapa laporan ini ada

Tim produknya delapan orang, dan kapasitas perbaikannya satu antrean pekerjaan per kuartal. Di rapat beredar tiga dugaan: formulir pendaftaran terlalu panjang, kode verifikasi sering tidak sampai, atau pesanan pertama membingungkan. Masing-masing menunjuk tahap yang berbeda, dan dasbor yang ada hanya menampilkan konversi total.

Cara tercepat memilih prioritas dari dasbor adalah membandingkan konversi total per platform lalu memperbaiki yang terendah. Cara itu menunjuk Web, 18,88% lawan 20,15% di Android, selisih 1,27 poin. Sementara itu ketiga platform sama-sama kehilangan 44,72% sampai 46,54% pendaftarnya di satu langkah yang sama, dan perbandingan konversi total tidak memperlihatkan langkah itu.

## Data dan batasnya

Satu tabel peristiwa: 80.000 baris, enam kolom (identitas peristiwa, pengguna, nama peristiwa, waktu, platform, kota), 20.000 pengguna, Januari 2025 sampai Maret 2026. Ada sepuluh nama peristiwa; lima di antaranya tahap funnel: kunjungan pertama, daftar akun, verifikasi telepon, pesanan pertama, dan pesanan kedua.

Yang tidak ada di tabel ikut menentukan apa yang boleh saya klaim. Tidak ada hasil percobaan, jadi tidak ada angka kenaikan atau ROI di halaman ini. Tidak ada catatan pengiriman kode verifikasi, jadi dugaan bahwa kodenya tidak sampai tidak bisa dibuktikan atau dibantah dari sini. Tidak ada alasan pengguna berhenti, jadi analisis ini menunjukkan di mana orang berhenti, dan berhenti di situ.

## Yang saya kerjakan

Pekerjaannya enam langkah berurutan: membersihkan peristiwa, memetakan nama peristiwa ke nomor tahap, menyusun satu baris per pengguna per tahap, menghitung konversi, memecah hasilnya per platform dan kota, lalu memvalidasi bentuk funnel sebelum menarik kesimpulan. Pembersihan membuang 3.796 dari 80.000 baris (4,75%) dalam tiga tahap yang masing-masing tercatat: 3.150 baris kembar, 500 tanpa nama peristiwa, dan 146 berstempel waktu sesudah akhir periode data. Tiga keputusan saya tulis sebelum kueri analisis pertama, masing-masing dengan pilihan yang saya tolak.

Yang dihitung adalah orang, sekali per tahap, pada peristiwa pertamanya di tahap itu. Platform dan kota pengguna diambil dari peristiwa yang sama.

Ditolak: menghitung baris peristiwa. Di data mentah tahap kunjungan berisi 20.808 baris untuk 19.946 orang, 4,32% lebih besar, dan gelembungnya berbeda di tiap tahap sehingga konversinya ikut bergeser.

Konversi tiap langkah dihitung terhadap tahap tepat sebelumnya, dan penyebutnya ditulis di tiap angka.

Ditolak: memakai kunjungan pertama sebagai penyebut semua langkah. Dengan cara itu angkanya turun terus sampai 19,88% di tahap terakhir, dan langkah terakhir yang tampak paling buruk.

Untuk menguji periode terbaru, saya mengambil kohort: pengguna yang pertama kali berkunjung sejak 1 Oktober 2025, diikuti sampai akhir data.

Ditolak: memotong peristiwa per tanggal. Saya mencobanya lebih dulu. Tahap daftar akun jadi berisi 7.507 orang sementara kunjungan hanya 5.917 (konversi 126,87%), karena banyak yang mendaftar di periode itu sudah berkunjung sebelum Oktober. Pemeriksaan pertama, funnel harus menurun, langsung gagal.

Alatnya SQL di ClickHouse, dengan tujuh CTE yang masing-masing bisa dijalankan dan diperiksa sendiri.

## Gambar

**Gambar 1. Pengguna di tiap tahap, dan yang tidak sampai ke tahap berikutnya**

![gambar 1](images/gambar-1.png)

Apa yang tergambar. Lima tahap funnel dari atas ke bawah. Batang abu-abu tua: pengguna unik yang mencapai tahap itu. Bagian di kanannya: pengguna tahap sebelumnya yang tidak sampai, merah di baris verifikasi. Angka di dalam batang: jumlah orang.

Rentang data. 76.204 peristiwa bersih dari 20.000 pengguna, 1 Januari 2025 sampai 31 Maret 2026.

Yang terlihat. Bagian berhenti paling lebar ada di baris verifikasi: 6.730 orang, 45,25% dari 14.874. Bagian berhenti di tiga baris lain 1.686 sampai 5.072 orang.

**Gambar 2. Konversi daftar ke verifikasi per platform**

![gambar 2](images/gambar-2.png)

Apa yang tergambar. Porsi pendaftar yang menyelesaikan verifikasi, dihitung terhadap pendaftar platform itu sendiri. Sumbu mulai dari nol. Batang abu-abu: seluruh periode. Batang merah: kohort yang pertama kali berkunjung sejak 1 Oktober 2025.

Rentang data. 14.874 pendaftar seluruh periode; 4.403 pendaftar di kohort.

Yang terlihat. Ketiga batang abu-abu berakhir di 53,46% sampai 55,28%. Batang merah Web 2,28 poin lebih pendek dari batang abu-abunya; di dua platform lain keduanya hampir sama panjang.

**Gambar 3. Jarak hari dari kunjungan pertama ke pendaftaran**

![gambar 3](images/gambar-3.png)

Apa yang tergambar. Jumlah pendaftar menurut jarak hari antara kunjungan pertama dan pendaftaran. Kelompok hari tidak sama lebar. Batang merah menandai kelompok tempat rata-rata 70,68 hari jatuh.

Rentang data. 14.826 pendaftar yang punya kedua tahap, periode yang sama.

Yang terlihat. Dua kumpulan: 8.159 orang di 0 dan 1 hari, dan 4.411 orang di 31 hari ke atas. Rata-rata 70,68 hari jatuh di kelompok 31 sampai 90 hari yang isinya 758 orang. Bandingkan dengan baris pertama Gambar 4: kohort sejak 1 Oktober 2025, yang paling lama teramati sekitar enam bulan, berhenti di langkah ini dengan porsi hampir sama.

**Gambar 4. Porsi berhenti per langkah di dua jendela waktu**

![gambar 4](images/gambar-4.png)

Apa yang tergambar. Porsi yang tidak lanjut ke tahap berikutnya, terhadap tahap tepat sebelumnya. Batang abu-abu: seluruh periode. Batang merah: kohort sejak 1 Oktober 2025.

Rentang data. 19.946 pengunjung seluruh periode; 5.917 pengunjung di kohort.

Yang terlihat. Di keempat langkah kedua batang berselisih kurang dari 1,3 poin, dan pasangan batang verifikasi tetap yang terpanjang (45,25% dan 45,88%).

## Temuan

1. Satu langkah kehilangan lebih banyak orang daripada dua langkah terakhir digabung. Dari 14.874 pendaftar, 6.730 tidak pernah menyelesaikan verifikasi telepon (45,25%). Langkah sebelumnya kehilangan 25,43% dari 19.946 pengunjung, dua langkah sesudahnya 30,60% dan 29,83%. Pesanan pertama dan kedua bersama-sama kehilangan 4.178 orang.
2. Web memang paling rendah, tapi selisihnya tidak cukup untuk memecah antrean. Di langkah verifikasi, Web 53,46% (1.570 dari 2.937), Android 54,91% (3.683 dari 6.707), iOS 55,28% (2.891 dari 5.230). Ketiga platform turun paling tajam di langkah yang sama, dan menaikkan Web ke tingkat iOS hanya menambah sekitar 53 orang dalam 15 bulan, dibanding 6.730 yang berhenti di langkah ini. Jarak 1,82 poin itu juga belum bisa dibedakan dari kebetulan (z 1,59; batas lazim 1,96). Per kota rentangnya 53,20% sampai 56,35%. Data tidak memuat apa pun yang menjelaskan selisih itu, jadi saya hanya melaporkan ukurannya.
3. Jarak dari kunjungan ke pendaftaran tampak terbelah dua, tapi bagian panjangnya kemungkinan cacat stempel waktu. 8.159 dari 14.826 pendaftar mendaftar di hari yang sama atau sehari sesudah kunjungan pertama, sedangkan 2.617 (17,65%) baru mendaftar lebih dari 180 hari kemudian. Kalau jarak sepanjang itu nyata, kohort sejak 1 Oktober 2025, yang paling lama teramati sekitar enam bulan, seharusnya kehilangan sebagian besar pendaftar itu, dan konversi kunjungan ke daftarnya paling tinggi sekitar 61,4%. Hasilnya 74,41%, hampir sama dengan seluruh periode (74,57%). Jadi stempel kunjungan pertama sebagian pengguna saya masukkan ke daftar audit. Konversi per langkah tidak terpengaruh, karena dihitung dari siapa yang sampai, bukan kapan.
4. Pencatatan peristiwanya belum bersih. Ada 159 catatan loncat tahap, yaitu pengguna yang tercatat di sebuah tahap tanpa tercatat di tahap tepat sebelumnya, misalnya 57 orang yang tercatat verifikasi tanpa pernah tercatat mendaftar. 35 dari 32.477 perpindahan antar-tahap bertetangga stempel waktunya mundur (0,11%). Kalau 57 orang tadi dikeluarkan, konversi langkah verifikasi menjadi 54,37% (8.087 dari 14.874) dan tetap yang terendah.
5. Hasilnya bertahan pada kohort sejak 1 Oktober 2025, dengan satu hal yang perlu dipantau. Pada 5.917 orang yang pertama kali berkunjung sejak 1 Oktober 2025, 2.020 dari 4.403 pendaftar berhenti di verifikasi (45,88%). Selisih Web dengan iOS di langkah ini melebar ke 3,98 poin, tapi pendaftar Web di kohort itu hanya 848 orang dan selisihnya belum melewati batas tadi (z 1,87).

## Apa yang berubah pada keputusannya, dan yang saya ukur sesudahnya

Pilihan prioritas bergeser dari "platform mana yang paling buruk" ke "langkah mana yang paling bocor". Satu perbaikan di langkah verifikasi, berlaku untuk ketiga platform, menggantikan tiga antrean per platform. Dari tiga dugaan yang beredar, hanya dugaan soal kode verifikasi yang menunjuk langkah ini. Catatan pengiriman kode tidak ada di data, jadi audit pencatatan sebaiknya dimulai dengan menarik catatan pengiriman kode itu, lalu perbaikannya dijalankan sebagai uji dengan kelompok pembanding.

Tiga ukuran saya tetapkan sebelum perbaikan dikerjakan, dan ketiganya sudah punya nilai awal: konversi daftar ke verifikasi dengan penyebut pendaftar (54,37%, hanya pengguna yang tercatat di kedua tahap), jumlah pendaftar yang menyelesaikan verifikasi (8.087), dan jumlah catatan loncat tahap (159). Uji sekuartal cukup untuk membaca kenaikan sekitar 5 poin ke atas: kenaikan 5 poin butuh sekitar 1.540 pendaftar per kelompok, kira-kira 2,5 bulan pada laju pendaftaran Oktober 2025 sampai Maret 2026, sedangkan kenaikan 3 poin butuh hampir 7 bulan. Saran ini saya tinjau ulang kalau audit menemukan sebagian besar dari 6.730 orang itu sudah verifikasi tapi tidak tercatat, atau kalau konversi kelompok uji tidak berbeda dari kelompok pembanding.

## Batas, telusur, dan cara menjalankan ulang

- Tanpa data percobaan, berapa pendaftar tambahan yang dihasilkan perbaikan tidak bisa diperkirakan. Target kenaikan 5 poin yang beredar di rapat tidak saya ubah menjadi proyeksi.
- Membuang 146 baris berstempel masa depan saya uji: dengan atau tanpa baris itu, kelima angka funnel dan tabel jarak waktu tidak berubah, karena tiap pengguna diambil dari peristiwa pertamanya.
- Kolom di tabel sumber bertipe Nullable. Contoh kueri pemeriksaan bersarang yang memakai UserID = '' menghasilkan 0 di tabel ini; versi yang memakai IS NULL menghasilkan 159, dan cara kedua tanpa JOIN memberi angka yang sama.
- Kohort sejak 1 Oktober 2025 punya waktu lebih pendek untuk menyelesaikan tahap. Rata-rata jarak kunjungan ke pendaftaran di kohort itu 10,86 hari karena jarak terpanjang yang bisa teramati sekitar enam bulan (yang tercatat 175 hari).
- Pengunjung baru per bulan turun 37% sejak Oktober 2025 (986 lawan 1.559 di Januari sampai September 2025). Porsi berhenti per langkah tidak berubah, tapi jumlah orang yang terbantu oleh perbaikan ikut mengecil, dan data ini tidak memuat belanja akuisisi per bulan untuk menjelaskan sebabnya.

| Angka | Asalnya |
|---|---|
| 76.204 baris bersih | 80.000 baris mentah dikurangi 3.150 kembar, 500 tanpa nama, dan 146 stempel masa depan; pengguna tetap 20.000 |
| 19.946 sampai 3.966 | Pengguna unik per tahap dari 52.582 baris tahap per pengguna |
| 45,25%, 6.730 orang | 14.874 pendaftar dikurangi 8.144 yang tercatat verifikasi, dibagi 14.874 |
| 1,82 poin, z 1,59 | iOS 55,28% dikurangi Web 53,46%; uji dua proporsi dengan penyebut pendaftar per platform |
| 70,68 hari, median 1 | 14.826 perpindahan kunjungan ke pendaftaran milik pengguna yang punya kedua tahap |
| 159; 35 dari 32.477 | Pemeriksaan kelima dan ketiga dari lima pemeriksaan validasi |
| 5.917 orang | Pengguna yang kunjungan pertamanya jatuh 1 Oktober 2025 sampai 31 Maret 2026 |

Seluruh angka keluar dari 1-Kueri SQL.sql, yang berjalan apa adanya di ClickHouse: satu kueri pipeline utama, satu kueri dampak pembersihan, lima kueri validasi, dan kueri pendukung untuk kota, jarak waktu, dan kohort.

Kueri lengkap, catatan keputusan, memo satu halaman, dan lampiran bukti tersedia di folder yang ditautkan di bagian atas.
