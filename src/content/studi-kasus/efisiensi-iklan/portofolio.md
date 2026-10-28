**Studi Kasus · Efisiensi Belanja Iklan Digital**

# **Efisiensi Antar-Platform Berselisih 2,4 Kali, tetapi Jenis Kampanye Memisahkan 4,0 Kali**

Analisis efisiensi belanja iklan · agensi pemasaran digital, tiga platform · Spreadsheet · lingkup 975 kampanye bersih dari 1.012 baris mentah

Mochamad Fajri Ilham Nurdin · dikerjakan Oktober 2026 · [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Catatan data: angka-angka di bawah dihitung dari dataset yang dirancang meniru pola belanja iklan digital. Ini bukan data sebuah perusahaan sungguhan, dan tidak disajikan sebagai pengalaman kerja di perusahaan mana pun.*

## **Konteks**

Sebuah agensi pemasaran digital mengelola kampanye e-commerce di tiga platform iklan: Facebook, Instagram, dan TikTok. Manajer pemasaran klien memegang anggaran Rp 200 juta untuk kampanye Lebaran, dan harus memutuskan pembagiannya dalam satu minggu, karena penyiapan kampanye butuh dua minggu sebelum peluncuran. ROAS (pendapatan dibagi belanja iklan) bukan ukuran keuntungan, karena margin produk dan biaya di luar iklan tidak tercatat. Batas ini berlaku untuk seluruh angka di bawah.

## **Pertanyaan**

*"Dari data setahun terakhir, channel mana yang paling efisien? Saya mau taruh anggaran terbesar di situ."*

## **Pendekatan**

Aturan pembersihan ditetapkan berurutan sebelum menghitung apa pun, dan pemeriksaan yang hasilnya nol tetap dicatat. Pertanyaan yang diajukan, yaitu efisiensi per platform, dijawab lebih dulu. Setelah itu diuji satu pengelompokan yang tersedia di data tetapi tidak disebut dalam permintaan, yaitu jenis kampanye. Keduanya lalu disilangkan untuk memastikan tidak ada temuan yang dihitung dua kali. Kepadatan data per bulan diperiksa sebelum tren apa pun digambar.

Ada tiga pendekatan yang ditolak. Pertama, efisiensi sebagai rata-rata per kampanye. Cara ini terlihat adil, tetapi memberi bobot sama pada kampanye kecil dan besar, padahal keputusannya tentang ke mana rupiah berikutnya pergi. Kedua, membagi anggaran sebanding lurus dengan efisiensi, yang mengasumsikan efisiensi tetap pada tingkat belanja berapa pun. Ketiga, menghaluskan grafik tren untuk meredam lonjakan, karena lonjakannya berasal dari cakupan data yang tidak seragam, bukan dari keriuhan.

## **Temuan**

1. **Selisih efisiensi antar-platform 2,4 kali**: Rp 3,65 di Facebook lawan Rp 1,54 di Instagram per rupiah belanja. Kedua platform itu menerima porsi belanja yang sama persis (31,5%). TikTok justru menyerap porsi terbesar (37,0%).  
2. **Dikelompokkan menurut jenis kampanye, selisihnya 4,0 kali**: Retargeting Rp 4,51, Brand Awareness Rp 1,13. Pemisahan ini 1,7 kali lebih tajam, dan berasal dari kolom yang tidak disebut dalam permintaan.  
3. **Disilangkan, keunggulan Facebook bertahan di empat dari lima jenis kampanye**, sehingga bukan akibat komposisi. Satu pengecualian dilaporkan: pada jenis Traffic, TikTok unggul tipis (1,84 lawan 1,66). Di Instagram, dua jenis kampanye mengembalikan kurang dari Rp 1 per rupiah.  
4. **Pencatatan hampir berhenti setelah Maret 2026.** Delapan bulan berikutnya hanya berisi lima kampanye, dan tiga bulan kosong sama sekali. Temuan ini tidak mengubah angka di atas (selisihnya di bawah 0,01), tetapi membatasi periode yang sah untuk tren.

**Gambar 1. Platform terboros menerima porsi belanja yang sama dengan yang paling efisien.**

![gambar 1](images/gambar-1.png)  
*Efisiensi dan porsi belanja ketiga platform, dari 975 kampanye bersih. Bandingkan batang berwarna dan batang abu dalam satu baris, lalu antar-baris: batang oranye Instagram yang terpendek, tetapi batang abunya sama panjang dengan Facebook.*

**Gambar 2. Facebook unggul di empat dari lima jenis kampanye; pengecualiannya ditandai.**

![gambar 2](images/gambar-2.png)  
*Efisiensi lima belas gabungan jenis kampanye dan platform, beserta jumlah kampanyenya. Baca mendatar: dalam satu baris jenisnya sama, jadi perbedaan yang tersisa murni datang dari platform. Bingkai oranye menandai satu-satunya baris yang tidak dimenangkan Facebook.*

**Gambar 3. Rentangnya 23 bulan, tetapi kepadatannya berhenti di bulan ke-15.**

![gambar 3](images/gambar-3.png)  
*Jumlah kampanye tercatat per bulan, Januari 2025 sampai November 2026. Di kanan Maret 2026, tiga bulan kosong dan lima lainnya masing-masing berisi satu kampanye. Satu kampanye senilai Rp 0,4 juta akan tampil sebagai ROAS 12,00 kalau seluruh rentang digambar.*

## **Rekomendasi**

Geser porsi anggaran ke Facebook dan kurangi Instagram tanpa menghentikannya: Facebook Rp 80 juta, TikTok Rp 70 juta, Instagram Rp 50 juta. Di dalam tiap platform, dahulukan Conversion dan Retargeting, dan hentikan Brand Awareness serta Engagement di Instagram. Lima belas kampanye yang berpendapatan tanpa biaya perlu diperiksa, dan sebelum data periode terbaru dipakai, perlu dipastikan dulu apakah yang berhenti adalah kampanyenya atau pencatatannya.

## **Batas**

Data hanya membandingkan pendapatan dengan belanja iklan; margin produk tidak tercatat, sehingga ini bukan ukuran keuntungan. Seluruh angka mengukur hasil pada tingkat belanja yang sudah terjadi dan tidak memuat titik jenuh, sehingga pergeseran anggaran adalah keputusan berdasarkan bukti masa lalu, bukan ramalan hasil. Tidak ada data atribusi, jadi pendapatan satu kampanye bisa saja dibantu kampanye lain.

## **Telusur**

| Kesimpulan | Kekokohan | Yang akan membatalkannya |
| :---- | :---- | :---- |
| Facebook lebih efisien daripada Instagram | Kokoh | Hampir tidak ada; urutan sama di 64 dari 64 kombinasi pembersihan, Facebook di atas Instagram di kelima jenis, dan urutan sama di Ramadan 2025 dan 2026 |
| Jenis kampanye memisahkan lebih tajam daripada platform | Kokoh | Di 64 kombinasi pembersihan, rasio jenis selalu 3,67 sampai 4,02× lawan rasio platform 2,30 sampai 2,44×; jaraknya tidak pernah tertutup |
| TikTok lebih baik untuk Traffic | Rapuh | Selisih 1,84 lawan 1,66 dari 68 dan 42 kampanye; bisa berbalik dengan sedikit data tambahan |
| Menggeser anggaran akan menaikkan hasil | Tidak didukung data | Tidak ada titik jenuh yang terukur; Rp 80 juta untuk Facebook sudah di batas atas belanja bulanan historisnya (maks Rp 80,6 juta) |

Artefak yang tersedia: workbook tujuh lembar dengan seluruh rumus terbuka, catatan pembersihan yang juga mencatat tiga pemeriksaan bernilai nol, tabel silang lima belas sel beserta jumlah kampanye tiap sel, tabel kepadatan per bulan, dan hasil tujuh gerbang validasi.
