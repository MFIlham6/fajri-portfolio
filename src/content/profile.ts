// About, Experience, and Training & Certificates — from the owner's doc
// (Indonesian source; English is a faithful translation).
import type { L } from "./projects";
import addedExperience from "./data/experience.json";

const t = (en: string, id: string): L => ({ en, id });

export const profile = {
  name: "Mochamad Fajri Ilham Nurdin",
  email: "mfajriilhamn@gmail.com",
  linkedin: "https://www.linkedin.com/in/mfajriilhamn/" as string | undefined,
  /** Portrait in the front polaroid of the About section (public/images/profile). */
  photo: { src: "/images/profile/fajri.jpg", width: 900, height: 1064 },
  tagline: t(
    "An Industrial Engineering graduate who uses data for operational and business decisions.",
    "Lulusan Teknik Industri yang memakai data untuk keputusan operasional dan bisnis.",
  ),
  paragraphs: [
    t(
      "I'm used to taking raw data all the way to a recommendation: cleaning the data, analyzing it with SQL, Python, and spreadsheets, then presenting it as a dashboard or a one-page memo.",
      "Saya terbiasa mengolah data mentah sampai menjadi rekomendasi: membersihkan data, menganalisis dengan SQL, Python, dan spreadsheet, lalu menyajikannya dalam dashboard atau memo satu halaman.",
    ),
    t(
      "From my PPIC internship, I'm also familiar with production planning: preparing BOMs and routings as the basis for MRP and MPS, calculating production capacity, and tracking raw-material inventory against production needs. That's why I'm most interested in operational problems like inventory, production planning, and late deliveries, as well as business strategy decisions that need data behind them.",
      "Dari magang PPIC, saya juga terbiasa dengan perencanaan produksi: menyiapkan BOM dan routing sebagai dasar MRP dan MPS, menghitung kapasitas produksi, dan memantau persediaan bahan baku terhadap kebutuhan produksi. Karena itu saya paling tertarik pada masalah operasional seperti persediaan, perencanaan produksi, dan keterlambatan pengiriman, juga pada keputusan strategi bisnis yang perlu didukung data.",
    ),
  ],
  roles: [
    t("Data Analyst or Business Analyst", "Data Analyst atau Business Analyst"),
    t("Data-driven Business Strategy", "Business Strategy berbasis data"),
    t("Supply Chain, PPIC, or Inventory Control", "Supply Chain, PPIC, atau Inventory Control"),
    t("Purchasing or Procurement", "Purchasing atau Procurement"),
    t("Business Process Improvement", "Business Process Improvement"),
  ],
  // Graduation year filled from the original brief (Sep 2020 – Dec 2024); the doc had [tahun].
  education: {
    degree: t("B.Eng. Industrial Engineering", "S1 Teknik Industri"),
    school: "Telkom University",
    meta: t("GPA 3.51, Cum Laude, Graduated 2024", "IPK 3,51, Cum Laude, Lulus 2024"),
  },
};

// Campus organizations, from the owner's own write-up (October 2026).
export type Organization = {
  role: L;
  date: L;
  bullets: L[];
  chips: L[];
  /** Optional photos from the activity (public/images/organizations), shown side by side. */
  photos?: { src: string; width: number; height: number; alt: L }[];
  /** Optional supporting document (public/files), e.g. the official activity letter. */
  document?: { href: string; label: L };
};

export const organizations: Organization[] = [
  {
    role: t("Group Leader, Orientation Program", "Group Leader, Program Orientasi"),
    date: t("September – December 2021", "September sampai Desember 2021"),
    bullets: [
      t(
        "Directed a group of 15+ members, achieving a 100% completion rate for all orientation milestones through structured coaching and effective task delegation.",
        "Memimpin kelompok berisi 15+ anggota hingga seluruh milestone orientasi selesai 100%, lewat pendampingan terstruktur dan pembagian tugas yang jelas.",
      ),
      t(
        "Monitored group performance and participation metrics, ensuring all activities were executed on schedule and aligned with program objectives.",
        "Memantau kinerja dan tingkat partisipasi kelompok agar setiap kegiatan berjalan sesuai jadwal dan tujuan program.",
      ),
      t(
        "Facilitated cross-functional communication within the group, effectively resolving internal conflicts and maintaining high engagement levels throughout the program.",
        "Menjembatani komunikasi di dalam kelompok, menyelesaikan konflik internal, dan menjaga keterlibatan anggota tetap tinggi sepanjang program.",
      ),
    ],
    chips: [t("15+ members", "15+ anggota"), t("100% milestones", "100% milestone")],
  },
  {
    role: t("Event Division Staff, PPU HMTI", "Staf Divisi Acara, PPU HMTI"),
    date: t("September – December 2021", "September sampai Desember 2021"),
    photos: [1, 2, 3].map((n) => ({
      src: `/images/organizations/ppu-hmti-2021-${n}.jpg`,
      width: 800,
      height: 800,
      alt: t(`PPU HMTI 2021 committee photo, ${n} of 3`, `Foto panitia PPU HMTI 2021, ${n} dari 3`),
    })),
    document: {
      href: "/files/tak-ppu-hmti-2021.pdf",
      label: t("TAK letter, MPM HMTI 2021 (PDF)", "Surat TAK MPM HMTI 2021 (PDF)"),
    },
    bullets: [
      t(
        "Supervised event operations for over 90 students, ensuring strict adherence to the timeline and achieving a 98% participant satisfaction rating.",
        "Mengawasi jalannya acara untuk lebih dari 90 mahasiswa agar tetap sesuai timeline, dengan tingkat kepuasan peserta 98%.",
      ),
      t(
        "Standardized organizational documentation by developing over 30 technical guidelines, which streamlined the coordination process between the committee and faculty stakeholders.",
        "Menyeragamkan dokumentasi organisasi dengan menyusun lebih dari 30 panduan teknis, sehingga koordinasi antara panitia dan pihak fakultas lebih lancar.",
      ),
      t(
        "Managed data collection and reporting for candidate screening results, ensuring all evaluations were documented transparently and delivered accurately to the board.",
        "Mengelola pengumpulan dan pelaporan data hasil seleksi kandidat, sehingga setiap penilaian tercatat transparan dan sampai ke pengurus dengan akurat.",
      ),
    ],
    chips: [t("90+ students", "90+ mahasiswa"), t("98% satisfaction", "Kepuasan 98%"), t("30+ guidelines", "30+ panduan")],
  },
  {
    role: t("Staff of Funding and Sponsorship, Inauguration HMTI", "Staf Dana dan Sponsorship, Inaugurasi HMTI"),
    date: t("March – June 2021", "Maret sampai Juni 2021"),
    photos: [
      {
        src: "/images/organizations/inaugurasi-hmti-danus.jpg",
        width: 800,
        height: 800,
        alt: t("Inauguration HMTI 2021 poster introducing the Funding and Sponsorship division", "Poster Inaugurasi HMTI 2021 yang memperkenalkan divisi Dana dan Usaha"),
      },
      {
        src: "/images/organizations/inaugurasi-hmti-tim-danus.jpg",
        width: 800,
        height: 800,
        alt: t("Inauguration HMTI 2021 poster of the Funding and Sponsorship team, Nuha and Fajri", "Poster Inaugurasi HMTI 2021 tim Dana dan Usaha, Nuha dan Fajri"),
      },
      {
        src: "/images/organizations/inaugurasi-hmti-tim-danus-2.jpg",
        width: 800,
        height: 800,
        alt: t("Inauguration HMTI 2021 poster of the Funding and Sponsorship team, Ashya, Harun, and Rahmi", "Poster Inaugurasi HMTI 2021 tim Dana dan Usaha, Ashya, Harun, dan Rahmi"),
      },
      {
        src: "/images/organizations/inaugurasi-hmti-tim-danus-3.jpg",
        width: 800,
        height: 800,
        alt: t("Inauguration HMTI 2021 poster of the Funding and Sponsorship team, Fathan, Dhiya (coordinator), and Maulida", "Poster Inaugurasi HMTI 2021 tim Dana dan Usaha, Fathan, Dhiya (koordinator), dan Maulida"),
      },
      {
        src: "/images/organizations/inaugurasi-hmti-tim-danus-4.jpg",
        width: 800,
        height: 800,
        alt: t("Inauguration HMTI 2021 poster of the Funding and Sponsorship team, Zaidan, Mentari, and Abiyoga", "Poster Inaugurasi HMTI 2021 tim Dana dan Usaha, Zaidan, Mentari, dan Abiyoga"),
      },
    ],
    bullets: [
      t(
        "Initiated digital fundraising campaigns via social media platforms, managing promotional content coordination to maximize audience reach and donor participation.",
        "Memulai kampanye penggalangan dana digital lewat media sosial dan mengoordinasikan konten promosinya untuk memperluas jangkauan dan menambah donatur.",
      ),
      t(
        "Optimized the sponsorship and funding documentation system using Google Drive, ensuring all transaction data was transparently recorded and accessible for real-time tracking.",
        "Merapikan sistem dokumentasi sponsorship dan pendanaan di Google Drive agar setiap transaksi tercatat transparan dan bisa dipantau kapan saja.",
      ),
    ],
    chips: [t("Social media", "Media sosial"), t("Google Drive", "Google Drive")],
  },
];

export type Experience = {
  id: string;
  org: string;
  role: L;
  date: L;
  intro?: L;
  bullets: L[];
  related: string[];
  /** Optional photo label (placeholder until the photo arrives). */
  photo?: L;
};

const builtInExperience: Experience[] = [
  {
    id: "revou",
    org: "RevoU × Telkom Indonesia",
    role: t("Virtual Data Analyst Intern, Remote", "Virtual Data Analyst Intern, Remote"),
    date: t("August – October 2025", "Agustus sampai Oktober 2025"),
    intro: t(
      "A project-based virtual internship mentored by the RevoU and Telkom teams. I analyzed OCA Indonesia's WhatsApp, SMS, Email, and Voice Call transaction data, then completed two end-to-end projects with recommendations for the Product and Business teams.",
      "Virtual internship berbasis proyek yang dibimbing tim RevoU dan Telkom. Menganalisis data transaksi channel WhatsApp, SMS, Email, dan Voice Call milik OCA Indonesia, lalu menyelesaikan dua proyek dari awal sampai akhir beserta rekomendasi untuk tim Product dan Business.",
    ),
    bullets: [
      t(
        "Built a unified Tableau dashboard for more than 122 thousand transactions and Rp 25.77 million in revenue, with separate pages for C-level, Product Managers, Marketing and Campaign Ops, and Account Managers.",
        "Membangun dashboard Tableau terpadu untuk lebih dari 122 ribu transaksi dan revenue Rp 25,77 juta, dengan halaman terpisah untuk C-level, Product Manager, Marketing dan Campaign Ops, serta Account Manager.",
      ),
      t(
        "Found the source of the 28% volume drop: 85% of the lost messages came from email, which fell 60%. Three clients also held about 60% of revenue.",
        "Menemukan sumber penurunan volume 28%: 85% pesan yang hilang berasal dari email, yang turun 60%. Tiga klien juga memegang sekitar 60% revenue.",
      ),
      t(
        "Recommended limiting Voice Call (21.87% success) to high-value cases, and a minimum 85% success rate per channel as a Q2 KPI.",
        "Merekomendasikan pembatasan Voice Call (keberhasilan 21,87%) untuk kasus bernilai tinggi, dan tingkat keberhasilan minimal 85% per channel sebagai KPI Q2.",
      ),
      t(
        "Grouped 20 B2B clients from more than 122 thousand transactions with RFM and K-Means (silhouette 0.985) into Loyal Premium, Mid Tier, and Potential, then added an early churn signal that flagged 6 clients for follow-up.",
        "Mengelompokkan 20 klien B2B dari lebih dari 122 ribu transaksi dengan RFM dan K-Means (silhouette 0,985) menjadi Loyal Premium, Mid Tier, dan Potential, lalu menambahkan sinyal churn dini yang menandai 6 klien untuk ditindaklanjuti.",
      ),
    ],
    related: ["telkom-m1", "telkom-m2"],
  },
  {
    id: "duniatex",
    org: "PT Duniatex",
    role: t("Production Planning and Inventory Control (PPIC) Intern, Ungaran", "Production Planning and Inventory Control (PPIC) Intern, Ungaran"),
    date: t("July – October 2023", "Juli sampai Oktober 2023"),
    bullets: [
      t(
        "Prepared and maintained Bills of Materials, Production Versions, and Routings for several fabric products as the basis for MRP and MPS.",
        "Menyiapkan dan memelihara Bill of Materials, Production Version, dan Routing untuk beberapa produk kain sebagai dasar MRP dan MPS.",
      ),
      t(
        "Calculated production capacity at each process to support capacity planning and production readiness.",
        "Menghitung kapasitas produksi di tiap proses untuk mendukung perencanaan kapasitas dan kesiapan produksi.",
      ),
      t(
        "Tracked daily raw-material inventory in Excel against production needs, to spot shortages early and support timely replenishment.",
        "Memantau persediaan bahan baku harian di Excel terhadap kebutuhan produksi, untuk mendeteksi kekurangan lebih awal dan mendukung pengisian ulang tepat waktu.",
      ),
      t(
        "Coordinated with Marketing, SCM, and Production to align customer orders, material availability, schedules, and order lead times.",
        "Berkoordinasi dengan Marketing, SCM, dan Produksi untuk menyelaraskan pesanan pelanggan, ketersediaan bahan, jadwal, dan lead time pesanan.",
      ),
    ],
    related: [],
    // Optional photo: in front of the company gate or sign. No production areas, documents, or system screens.
    photo: t("Photo at the company gate or sign (optional)", "Foto di depan gerbang atau papan nama perusahaan (opsional)"),
  },
];

/** Entries added from /admin (newest first) come before the built-in ones. */
export const experience: Experience[] = [...(addedExperience as Experience[]), ...builtInExperience];
export const builtInExperienceIds = builtInExperience.map((e) => e.id);

export type Cert = {
  id: string;
  title: string;
  issuer: string;
  /** Short text in the hexagon badge. */
  badge: string;
  meta: L;
  description: L;
  modules?: L[];
  afterModules?: L;
  skills: L;
  related?: L;
  relatedSlugs?: string[];
  /** Public links to the certificate itself (PDF or verification page). */
  links?: { label: L; href: string }[];
};

/** Google Drive viewer link for a certificate PDF shared as "anyone with the link". */
const drivePdf = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const viewCert = t("View certificate", "Lihat sertifikat");

/** Certificates kept here but not shown on the site for now (by id). */
const HIDDEN_CERTS = new Set(["windata"]);

const allCertifications: Cert[] = [
  {
    id: "windata",
    title: "30 Days 30 Case Studies",
    issuer: "Windata Academy",
    badge: "30/30",
    meta: t("October 2026, In progress, 14 of 30 case studies done", "Oktober 2026, Sedang berjalan, 14 dari 30 studi kasus selesai"),
    description: t(
      "A program of one business case study per day. I work each case from raw data to a one-page decision memo and a portfolio, then a mentor grades it. The first seven cases use spreadsheets and the next seven use SQL. Topics range from retail sales and inventory to fraud detection and logistics.",
      "Program satu studi kasus bisnis per hari. Setiap kasus saya kerjakan dari data mentah sampai memo keputusan satu halaman dan portofolio, lalu dinilai mentor. Tujuh kasus pertama memakai spreadsheet dan tujuh berikutnya SQL. Topiknya beragam, dari penjualan ritel dan persediaan sampai deteksi kecurangan dan logistik.",
    ),
    skills: t(
      "SQL, Spreadsheets (array formulas and validation), Statistics (z-test, confidence intervals, permutation tests), RFM segmentation, Funnels, Cohort analysis, Decision-memo writing",
      "SQL, Spreadsheet (rumus array dan validasi), Statistik (uji z, selang kepercayaan, uji acak), Segmentasi RFM, Funnel, Analisis kohort, Penulisan memo keputusan",
    ),
    related: t("All 14 case studies are listed under Data Analyst projects.", "Ke-14 studi kasusnya ada di proyek Data Analyst."),
  },
  {
    id: "unilever",
    title: "Supply Chain Management and Analytics",
    issuer: "Unilever via Coursera",
    badge: "SCM",
    meta: t("Completed 24 September 2026, Final grade 91.87%, 5 modules, about 30 hours", "Selesai 24 September 2026, Nilai akhir 91,87%, 5 modul, sekitar 30 jam"),
    description: t(
      "The first of four courses in the Unilever Supply Chain Data Analyst Professional Certificate.",
      "Kursus pertama dari empat dalam Unilever Supply Chain Data Analyst Professional Certificate.",
    ),
    modules: [
      t(
        "Module 1, supply chain management basics: the main processes and partners in a supply chain, history and major events that shaped customer value, supply chain components, and future technology trends.",
        "Modul 1, dasar manajemen supply chain: proses dan mitra utama dalam supply chain, sejarah dan peristiwa besar yang memengaruhi nilai bagi pelanggan, komponen supply chain, serta tren teknologi ke depan.",
      ),
      t(
        "Module 2, planning analytics: the supply chain analyst's role, inventory control and policy, quantitative and qualitative forecasting methods, and how to measure forecast error. The practice task: finding ways to reduce product waste in Prosacco's supply chain.",
        "Modul 2, analitik perencanaan: peran analis supply chain, kontrol dan kebijakan persediaan, metode peramalan kuantitatif dan kualitatif, serta cara mengukur kesalahan peramalan. Tugas praktiknya mencari cara mengurangi limbah produk di rantai pasok Prosacco.",
      ),
      t(
        "Module 3, demand planning, scheduling, and manufacturing: demand planning vs demand sensing, on-time in-full delivery, production scheduling and its risks, manufacturing strategy and quality, and scenario planning for customer priorities. The practice task: building a PSI (purchase, sales, inventory) plan for Prosacco.",
        "Modul 3, demand planning, penjadwalan, dan manufaktur: perbedaan demand planning dan demand sensing, pengiriman penuh dan tepat waktu, penjadwalan produksi beserta risikonya, strategi dan kualitas manufaktur, serta perencanaan skenario untuk prioritas pelanggan. Tugas praktiknya menyusun rencana PSI (purchase, sales, inventory) untuk Prosacco.",
      ),
      t(
        "Module 4, finance and logistics: cost control, inbound and outbound transport, warehouse activities, and optimizing resources under constraints. The practice task: choosing transport alternatives so demand is met on time, and planning Prosacco's seasonal execution from the finance and logistics side.",
        "Modul 4, keuangan dan logistik: pengendalian biaya, transportasi masuk dan keluar, aktivitas gudang, dan optimasi sumber daya dengan batasan yang ada. Tugas praktiknya memilih alternatif transportasi supaya permintaan terpenuhi tepat waktu dan merencanakan eksekusi musiman Prosacco dari sisi keuangan dan logistik.",
      ),
      t(
        "Module 5, security and sustainability: physical and cyber security in the supply chain, monitoring security risks, the supply chain network's impact on sustainability targets, and using data to improve processes. The practice task: a supply chain security risk assessment.",
        "Modul 5, keamanan dan keberlanjutan: keamanan fisik dan siber di supply chain, pemantauan risiko keamanan, dampak jaringan supply chain pada target keberlanjutan, dan pemakaian data untuk perbaikan proses. Tugas praktiknya melakukan penilaian risiko keamanan rantai pasok.",
      ),
    ],
    afterModules: t("Prosacco practice task scores: 95% to 100%.", "Nilai tugas praktik Prosacco 95% sampai 100%."),
    skills: t(
      "Demand planning, Forecasting, Inventory control, PSI planning, Production scheduling, Logistics, Risk management",
      "Demand planning, Peramalan, Kontrol persediaan, Rencana PSI, Penjadwalan produksi, Logistik, Manajemen risiko",
    ),
    related: t("Projects on similar topics: Inventory Analysis, Supply Chain Analysis and DataCo (late deliveries), Q-Commerce (stock forecast)", "Proyek dengan topik serupa: Analisis Persediaan, Supply Chain Analysis dan DataCo (keterlambatan pengiriman), Q-Commerce (forecast stok)"),
    relatedSlugs: ["case-4", "case-12", "dataco", "q-commerce"],
    links: [{ label: viewCert, href: "https://coursera.org/share/be54ed5788a53d97e88f590169b210bd" }],
  },
  {
    id: "sap",
    title: "The Ultimate SAP S/4HANA Course 2026: From Zero to Expert",
    issuer: "Udemy",
    badge: "SAP",
    meta: t("September 2026, 36 sections across 12 topics", "September 2026, 36 section dalam 12 topik"),
    description: t(
      "An SAP S/4HANA course from ERP basics to the main business modules, with case studies in the key modules.",
      "Kursus SAP S/4HANA dari dasar ERP sampai modul bisnis utama, dengan studi kasus di modul-modul utamanya.",
    ),
    modules: [
      t("SAP and ERP basics: ERP concepts and connected business processes, SAP GUI and Fiori navigation, organizational structure (company code, plant, sales org), and master data vs transaction data.", "Dasar SAP dan ERP: konsep ERP dan keterkaitan proses bisnis, navigasi SAP GUI dan Fiori, struktur organisasi (company code, plant, sales org), serta perbedaan master data dan transaction data."),
      t("Sales and Distribution (order-to-cash): sales order, delivery, and billing flow, with a sales operations case study.", "Sales and Distribution (order-to-cash): alur sales order, delivery, sampai billing, dengan studi kasus operasional penjualan."),
      t("Materials Management (procure-to-pay): material master, supplier, and purchasing info record; the purchase requisition, PO, goods receipt, and invoice verification (MIRO) flow; goods movements and stock updates; standard reports and T-codes; an introduction to SAP Ariba and Fieldglass; a purchasing case study.", "Materials Management (procure-to-pay): material master, supplier, dan purchasing info record; alur purchase requisition, PO, goods receipt, sampai invoice verification (MIRO); goods movement dan update stok; laporan standar dan T-code; pengenalan SAP Ariba dan Fieldglass; studi kasus pembelian."),
      t("Production Planning (plan-to-produce): MRP runs and production order execution, with a manufacturing case study.", "Production Planning (plan-to-produce): MRP run dan eksekusi production order, dengan studi kasus manufaktur."),
      t("Financial Accounting (record-to-report): general ledger, accounts receivable, accounts payable, and fixed assets.", "Financial Accounting (record-to-report): general ledger, accounts receivable, accounts payable, dan fixed asset."),
      t("Controlling: cost centers, profit centers, product costing, and cost and profitability analysis.", "Controlling: cost center, profit center, product costing, serta analisis biaya dan profitabilitas."),
      t("SAP S/4HANA Cloud: business value and cloud licensing models, with a purchasing case study in the Public Edition.", "SAP S/4HANA Cloud: nilai bisnis dan model lisensi cloud, dengan studi kasus pembelian di Public Edition."),
      t("HCM and SuccessFactors: the hire-to-retire process, employee data, organizational structure, and on-premise vs cloud HR.", "HCM dan SuccessFactors: proses hire-to-retire, data karyawan, struktur organisasi, dan perbandingan HR on-premise dengan cloud."),
      t("AI, Fiori, and analytics: SAP Business AI and Joule, Fiori Launchpad, embedded analytics, SAP Datasphere, SAP Analytics Cloud, plus data export and data quality checks.", "AI, Fiori, dan analytics: SAP Business AI dan Joule, Fiori Launchpad, embedded analytics, SAP Datasphere, SAP Analytics Cloud, serta export data dan cek kualitas data."),
      t("Automation and SAP HANA: background jobs, batch input, and HANA's in-memory architecture.", "Otomasi dan SAP HANA: background job, batch input, dan arsitektur in-memory HANA."),
      t("Transformation and implementation: RISE with SAP, migrating from ECC to S/4HANA, and the SAP Activate methodology.", "Transformasi dan implementasi: RISE with SAP, migrasi dari ECC ke S/4HANA, dan metodologi SAP Activate."),
      t("Basis and security: system monitoring, user and role management, and security controls.", "Basis dan security: monitoring sistem, manajemen user dan role, serta kontrol keamanan."),
    ],
    afterModules: t(
      "Most relevant for PPIC, purchasing, and inventory control: Materials Management, Production Planning, and Sales and Distribution.",
      "Paling relevan untuk PPIC, purchasing, dan inventory control: Materials Management, Production Planning, dan Sales and Distribution.",
    ),
    skills: t(
      "Procure-to-pay and order-to-cash flows, MRP runs, Material master data, Goods movements, SAP GUI and Fiori navigation",
      "Alur procure-to-pay dan order-to-cash, MRP run, Master data material, Goods movement, Navigasi SAP GUI dan Fiori",
    ),
    links: [{ label: viewCert, href: drivePdf("1yO_ZOnvvYP-uzKrLoTHZ-69BPuFOmtv_") }],
  },
  {
    id: "revou",
    title: "Full-Stack Data Analytics",
    issuer: "RevoU",
    badge: "FSDA",
    meta: t("February 2025 batch, completed June 2025, Certificate of Excellence, issued October 2025", "Batch Februari 2025, selesai Juni 2025, Certificate of Excellence, terbit Oktober 2025"),
    description: t("A project-based data analytics program of about four months.", "Program data analytics berbasis proyek sekitar empat bulan."),
    modules: [
      t("Thinking about business with data: defining and communicating problems, business metrics across industries, and funnel analysis.", "Berpikir bisnis dengan data: mendefinisikan dan mengomunikasikan masalah, business metrics di berbagai industri, dan funnel analysis."),
      t("Statistics: data cleaning, descriptive statistics and EDA, correlation, hypothesis testing, A/B testing, and regression.", "Statistik: data cleaning, statistik deskriptif dan EDA, korelasi, hypothesis testing, A/B testing, dan regresi."),
      t("SQL: from database concepts and basic queries to subqueries, CTEs, and window functions, with several case studies.", "SQL: dari konsep database dan query dasar sampai subquery, CTE, dan window function, dengan beberapa studi kasus."),
      t("Python: data cleaning and EDA, customer segmentation with RFM and K-Means, linear and logistic regression, time series, and propensity models with their evaluation.", "Python: data cleaning dan EDA, segmentasi pelanggan dengan RFM dan K-Means, regresi linear dan logistik, time series, serta propensity model beserta evaluasinya."),
      t("Visualization: data visualization principles, Tableau from basics to calculated fields, maps, dashboards, and stories, then an introduction to Power BI and DAX.", "Visualisasi: prinsip visualisasi data, Tableau dari dasar sampai calculated field, peta, dashboard, dan story, lalu pengenalan Power BI dan DAX."),
      t("AI for analysis: generative AI, AI as a co-worker, and using AI to produce business insights.", "AI untuk analisis: generative AI, AI sebagai rekan kerja, dan pemakaian AI untuk menghasilkan insight bisnis."),
      t("Communication: storytelling with data, building slides, and presenting.", "Komunikasi: storytelling with data, menyusun slide, dan presentasi."),
    ],
    afterModules: t(
      "The final project analyzed late deliveries in the DataCo e-commerce retail data, from data cleaning to recommendations, then was presented to the team lead and instructors.",
      "Final project-nya analisis keterlambatan pengiriman di data ritel e-commerce DataCo, dari pembersihan data sampai rekomendasi, lalu dipresentasikan ke team lead dan instruktur.",
    ),
    skills: t(
      "SQL (subqueries, CTEs, window functions), Python (pandas, scikit-learn), Statistics (hypothesis testing, A/B testing, regression), Tableau, Power BI, Storytelling with data",
      "SQL (subquery, CTE, window function), Python (pandas, scikit-learn), Statistik (hypothesis testing, A/B testing, regresi), Tableau, Power BI, Storytelling with data",
    ),
    related: t("Related project: DataCo. I also used the Tableau and RFM-with-K-Means material in Telkom M1 and M2.", "Proyek terkait: DataCo. Materi Tableau dan RFM dengan K-Means juga saya pakai di Telkom M1 dan M2."),
    relatedSlugs: ["dataco", "telkom-m1", "telkom-m2"],
    links: [{ label: viewCert, href: drivePdf("10Yrr7vdVjqgaTBFGnPmPfu9TVXDpZRF3") }],
  },
];

export const certifications = allCertifications.filter((c) => !HIDDEN_CERTS.has(c.id));

export const otherCertificates: { text: L; href?: string }[] = [
  {
    text: t("SQL (Intermediate), HackerRank, March 2025, 35-minute test, 2 problems, including complex joins", "SQL (Intermediate), HackerRank, Maret 2025, Tes 35 menit, 2 soal, termasuk complex joins"),
    href: "https://www.hackerrank.com/certificates/8048624cf458",
  },
  { text: t("EPrT English Proficiency Test, Telkom University, July 2024, Score 523", "EPrT English Proficiency Test, Telkom University, Juli 2024, Skor 523"), href: drivePdf("1tZjj22rHik3iHCD-9ar26BWm-WvH6aHV") },
];
