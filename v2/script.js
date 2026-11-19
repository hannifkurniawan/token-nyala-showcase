/* TokenNyala v3 — interactions. See docs/technical-spec.md */
(() => {
  'use strict';

  const LANG_KEY = 'tn-lang';

  /* ---------- Copy (ID default, EN) ---------- */
  const copy = {
    id: {
      skipLink: 'Lewati ke konten utama',
      brandAria: 'TokenNyala — kembali ke atas',
      navAria: 'Navigasi utama',
      navMobileAria: 'Navigasi mobile',
      navHow: 'Cara kerja',
      navPackages: 'Paket',
      navModels: 'Model AI',
      navFaq: 'FAQ',
      navCta: 'Isi saldo',
      langAria: 'Pilih bahasa',
      langLabel: 'Bahasa',
      menuOpen: 'Buka menu',
      menuClose: 'Tutup menu',
      footerTagline: 'Saldo AI untuk ide yang siap menjadi proyek.',
      footerExplore: 'Jelajahi',
      footerLegal: 'Bantuan & legal',
      footerTerms: 'Syarat & Ketentuan',
      footerPrivacy: 'Kebijakan Privasi',
      footerContact: 'Hubungi kami',
      footerPrototype: 'Konsep interaktif — tidak ada transaksi nyata. Tautan legal adalah contoh.',

      heroEyebrow: 'Untuk ide, prototype, dan proyekmu',
      heroTitleA: 'Mulai vibecoding.',
      heroTitleB: 'Jangan berhenti di tengah jalan.',
      heroLead: 'Isi saldo AI dengan mudah, pilih nominal sesuai proyek, dan lanjutkan membangun—tanpa harus memahami istilah teknis dulu.',
      heroCta: 'Isi saldo',
      heroSecondary: 'Lihat cara kerjanya',
      heroTrustAria: 'Keunggulan',
      trustLocal: 'Bayar lokal',
      trustFast: 'Saldo aktif cepat',
      trustReceipt: 'Lihat bukti transaksi',
      boardCaption: 'Ilustrasi: proyek sedang dibangun dengan bantuan AI, saldo menunjukkan status.',
      boardProject: 'Event Landing Page',
      boardTag: 'Proyek',
      boardPrompt: 'Buat hero lebih hangat dan sederhana',
      boardCoding: 'Menulis komponen…',
      boardPreview: 'Halaman event siap',
      boardBalance: 'Saldo aktif',
      boardStatusOff: 'Belum nyala',
      boardStatusOn: 'Nyala',
      boardStatusReady: 'Siap dinyalakan',
      boardBalanceReady: 'Saldo setelah top up',
      boardEstimateOff: 'Pilih paket untuk menyalakan saldo',
      boardEstimateOn: 'Estimasi: {estimate}',

      howKicker: 'Cara kerja',
      howTitle: 'Dari ide ke proyek, tanpa langkah yang membingungkan.',
      howStepsAria: 'Tiga langkah',
      step1Title: 'Pilih tujuanmu',
      step1Body: 'Belajar, bikin prototype, atau kerjakan proyek. Kami sarankan paket yang pas.',
      step1ChipsAria: 'Pilihan tujuan',
      intentLearn: 'Belajar',
      intentPrototype: 'Prototype',
      intentWork: 'Kerja',
      step2Title: 'Bayar dengan mudah',
      step2Body: 'Gunakan QRIS, e-wallet, atau virtual account. Rincian biaya terlihat sebelum bayar.',
      step2ChipsAria: 'Keunggulan pembayaran',
      step2Chip1: 'Nominal jelas',
      step2Chip2: 'Biaya tambahan Rp0',
      step2Chip3: 'Metode lokal',
      step3Title: 'Lanjutkan membangun',
      step3Body: 'Saldo siap dipakai dan momentum proyek tidak terputus.',
      step3ChipsAria: 'Setelah top up',
      step3Chip1: 'Status saldo',
      step3Chip2: 'Riwayat pembelian',
      step3Chip3: 'Kembali ke proyek',

      pkgKicker: 'Paket',
      pkgTitle: 'Berapa yang ingin kamu nyalakan?',
      pkgLead: 'Pilih tujuanmu, kami tunjukkan paket yang paling pas. Semua paket bisa dipakai untuk semua model AI.',
      intentTabsAria: 'Pilih tujuan',
      pkgListAria: 'Pilihan paket',
      recoTitle: 'Paling pas untuk {intent}: {name} · {price}',
      recoIntent_learn: 'belajar',
      recoIntent_prototype: 'prototype',
      recoIntent_work: 'kerja',
      reco_learn: 'Titik awal yang ringan untuk belajar dan proyek pertama.',
      reco_prototype: 'Cukup untuk iterasi satu prototype aktif.',
      reco_work: 'Untuk proyek berkelanjutan dan kebutuhan klien.',
      pkgChoose: 'Pilih {price}',
      pkgChosen: 'Paket {price} dipilih',
      badgeRecommended: 'Paling pas',
      badgeSelected: 'Dipilih',
      pkgFor_learn: 'Belajar dan mencoba pertama kali',
      pkgFor_prototype: 'Membuat satu prototype aktif',
      pkgFor_work: 'Freelancer atau proyek berkelanjutan',
      pkgHelper_learn: 'Cocok untuk memahami alur atau menyelesaikan satu mini-task.',
      pkgHelper_prototype: 'Cocok untuk iterasi tampilan, prompt, dan perbaikan singkat.',
      pkgHelper_work: 'Cocok saat kamu mulai mengerjakan kebutuhan klien atau banyak iterasi.',
      pkgBonus: 'Bonus',
      pkgTotal: 'Total saldo',
      pkgCredits: 'kredit',
      estimateLabel: 'Estimasi',
      pkgSessions_learn: '20–30 sesi kecil',
      pkgSessions_prototype: '40–60 sesi kecil',
      pkgSessions_work: '100+ sesi kecil',
      creditRules: '1 kredit = Rp1 · Sudah termasuk PPN · Tidak kedaluwarsa',
      seeModels: 'Lihat model yang bisa dipakai',
      estimateDisclaimer: 'Estimasi bergantung pada model, panjang prompt, tipe tugas, dan format output.',
      pkgAnnounce: 'Paket {name} dipilih. Saldo {credit} kredit.',

      coTitle: 'Ringkas top up',
      coClose: 'Tutup checkout',
      coNotice: 'Ini adalah checkout simulasi. Tidak ada transaksi atau penarikan dana nyata.',
      coPackageLegend: 'Paket',
      coBreakdownAria: 'Rincian biaya',
      coNominal: 'Nominal paket',
      coBonus: 'Bonus kredit',
      coFee: 'Biaya tambahan',
      coTotal: 'Total bayar',
      coCreditNote: 'Saldo masuk {credit} kredit · 1 kredit = Rp1 · Sudah termasuk PPN',
      coContactLabel: 'Email atau nomor HP',
      coContactHelp: 'Bukti pembelian dikirim ke sini.',
      coContactPlaceholder: 'nama@email.com atau 0812xxxxxxxx',
      errContactEmpty: 'Masukkan email atau nomor HP agar bukti pembelian bisa dikirim.',
      errEmailInvalid: 'Format email belum sesuai. Coba cek lagi alamatnya.',
      errPhoneInvalid: 'Nomor HP belum sesuai. Gunakan format 08xx atau +628xx.',
      coMethodLegend: 'Pilih metode pembayaran',
      methodQrisHint: 'Pindai dari aplikasi bank atau e-wallet',
      methodEwalletHint: 'DANA, GoPay, OVO',
      methodVaHint: 'Transfer dari bank mana pun',
      errMethod: 'Pilih satu metode pembayaran untuk melanjutkan.',
      coSubmit: 'Lanjut bayar {total}',
      coPayTitle_qris: 'Pindai QRIS',
      coPayBody_qris: 'Pindai kode contoh ini untuk melihat alurnya. Kode ini tidak bisa dipakai membayar.',
      coPayTitle_va: 'Transfer ke virtual account',
      coPayBody_va: 'Nomor contoh dibuat di perangkatmu dan tidak terhubung ke bank.',
      coPayTitle_ewallet: 'Bayar dengan e-wallet',
      coPayBody_ewallet: 'Pilih aplikasi untuk menyetujui pembayaran (simulasi).',
      coWaiting: 'Menunggu pembayaran {total}',
      coQrAria: 'Kode QR contoh, tidak bisa dipindai',
      coVaLabel: 'Nomor virtual account',
      coPaid: 'Saya sudah bayar',
      coChecking: 'Memeriksa pembayaran…',
      coSimFail: 'Simulasikan pembayaran gagal',
      coBack: 'Ubah data',
      coCopy: 'Salin',
      coCopied: 'Tersalin',
      successTitle: 'Saldo nyala!',
      successBody: 'Paket {name} ({price}) sudah tercatat di simulasi ini. Bukti pembelian dikirim ke {contact}.',
      successKeyLabel: 'API key kamu',
      successCopyKey: 'Salin API key',
      successGuide: 'Lihat panduan pasang',
      successWarning: 'Simpan API key seperti kata sandi. Jangan dibagikan.',
      successNotice: 'Prototype — tidak ada transaksi nyata.',
      failTitle: 'Pembayaran belum berhasil',
      failBody: 'Tidak ada saldo yang terpotong pada prototipe ini. Pilih metode lain atau coba lagi.',
      failRetry: 'Coba lagi',

      modelsKicker: 'Model AI',
      modelsTitle: 'Satu saldo untuk semua model.',
      modelsBody: 'Paket apa pun, pilihan modelnya sama. Pilih model hemat untuk tugas ringan, model premium untuk pekerjaan rumit.',
      modelsCta: 'Lihat semua model & tarif',
      modelsNote: '1 sesi kecil ≈ satu permintaan perbaikan komponen di tool coding (±40 rb token masuk, ±4 rb token keluar). Contoh — daftar dan tarif dapat berubah.',
      modelListAria: 'Model pilihan',
      tier_hemat: 'Hemat',
      tier_seimbang: 'Seimbang',
      tier_premium: 'Premium',
      modelSessions: '≈ {n}',
      modelSessionsUnit: 'sesi kecil / {price}',
      modelRates: 'Detail tarif',
      rateInput: 'Input',
      rateOutput: 'Output',
      rateContext: 'Konteks',
      rateUnit: '{n} kredit',
      rateCaption: 'Tarif per 1 jt token',
      contextUnit: '{n} token',
      use_coding: 'Coding',
      use_chat: 'Chat & menulis',
      use_analysis: 'Analisis dokumen',
      catTitle: 'Model AI yang tersedia',
      catSubtitle: 'Satu saldo untuk semua model. Paket apa pun, pilihan modelnya sama.',
      catClose: 'Tutup katalog model',
      catSearchLabel: 'Cari model',
      catSearchPlaceholder: 'Cari model, misalnya Claude',
      catFilterToggle: 'Filter',
      filterUse: 'Kegunaan',
      filterTier: 'Level biaya',
      filterProvider: 'Penyedia',
      catCount: 'Menampilkan {a} dari {b} model',
      catMore: 'Tampilkan lebih banyak',
      catEmpty: 'Model tidak ditemukan. Coba kata kunci atau filter lain.',
      catClear: 'Hapus filter',

      useKicker: 'Panduan pasang',
      useTitle: 'Pakai di tool favoritmu.',
      useBody: 'API key adalah kunci yang menghubungkan tool-mu ke saldo TokenNyala.',
      useStepsAria: 'Langkah pemasangan',
      use1Title: 'Salin API key',
      use1Body: 'Ada di halaman saldo setelah top up.',
      use2Title: 'Tempel di tool',
      use2Body: 'Isi Base URL dan API key di pengaturan tool.',
      use3Title: 'Pilih model & mulai',
      use3Body: 'Semua model memakai saldo yang sama.',
      useConfigTitle: 'Contoh konfigurasi',
      useConfigTag: 'contoh',
      useCompat: 'Bisa dipakai di tool yang mendukung OpenAI API, contoh:',
      useToolsAria: 'Contoh tool',
      useConfigNote: 'Contoh — bukan endpoint atau kunci asli.',
      useNoKey: 'Belum punya API key? Isi saldo dulu, kuncinya langsung muncul.',

      benefitKicker: 'Kenapa TokenNyala',
      benefitTitle: 'Jangan hanya beli saldo. Pastikan proyekmu punya waktu untuk jadi.',
      ben1Title: 'Pilihan yang bisa kamu pahami',
      ben1Body: 'Nominal dan estimasi dijelaskan dari kebutuhan proyek, bukan dari nama model dan istilah teknis.',
      ben2Title: 'Satu saldo untuk lanjut',
      ben2Body: 'Isi sekali, lalu pakai untuk semua model AI yang tersedia.',
      ben3Title: 'Bayar dengan cara yang familiar',
      ben3Body: 'QRIS, e-wallet, dan virtual account — metode yang sehari-hari dipakai di Indonesia.',
      ben4Title: 'Pantau dan kendalikan',
      ben4Body: 'Lihat sisa saldo, pemakaian harian, dan matikan API key kapan saja.',
      sampleView: 'Contoh tampilan',
      dashBalance: 'Saldo tersisa',
      dashOf: 'dari',
      dashUsage: 'Pemakaian 7 hari',
      dashUsageAria: 'Pemakaian 7 hari terakhir, tertinggi hari Jumat',
      dashDays: 'Sen,Sel,Rab,Kam,Jum,Sab,Min',
      dashDaysLong: 'Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
      dashRemind: 'Ingatkan saat saldo < Rp20.000',
      dashRemindOn: 'Pengingat saldo aktif',
      dashRemindOff: 'Pengingat saldo mati',
      dashKeyName: 'Laptop kerja',
      dashKeyActive: 'Aktif',
      dashKeyInactive: 'Nonaktif',
      dashKeyDisable: 'Nonaktifkan',
      dashKeyEnable: 'Aktifkan',
      dashKeyAnnounce: 'API key Laptop kerja {status}',
      exKicker: 'Contoh penggunaan',
      exTitle: 'Satu landing page event, kira-kira butuh berapa?',
      exBody: 'Begini perkiraan pemakaian saat kamu membangun satu halaman dengan bantuan AI, memakai model level Seimbang.',
      exProject: 'Proyek: Event Landing Page',
      exTask1: 'Buat layout awal halaman',
      exTask2: 'Rapikan tampilan mobile',
      exTask3: 'Tambah form pendaftaran',
      exTask4: 'Perbaiki copy dan warna',
      exTotal: 'Total sesi kecil',
      exCostLabel: 'Perkiraan biaya:',
      exFit: 'Paket Mulai (55.000 kredit) cukup, masih ada sisa untuk iterasi.',
      exCta: 'Pilih paket Mulai',

      teamKicker: 'Untuk tim & bisnis',
      teamTitle: 'Butuh untuk tim atau perusahaan?',
      teamPt1: 'Invoice atas nama perusahaan',
      teamPt2: 'Faktur pajak',
      teamPt3: 'Bayar lewat transfer bank',
      teamPt4: 'Pantau pemakaian tiap anggota',
      teamCta: 'Konsultasi untuk tim',
      teamReply: 'Kami balas dalam 1 hari kerja.',
      csTitle: 'Konsultasi untuk tim',
      csIntro: 'Ceritakan kebutuhan timmu. Kami hubungi dalam 1 hari kerja.',
      csClose: 'Tutup konsultasi',
      csName: 'Nama',
      csOrg: 'Nama tim atau perusahaan',
      csSize: 'Ukuran tim',
      csNeed: 'Ceritakan kebutuhanmu (opsional)',
      csCountLive: '{n} dari 500 karakter',
      csInvoice: 'Butuh invoice perusahaan / faktur pajak',
      csConsent: 'Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi',
      csSubmit: 'Kirim',
      errName: 'Nama wajib diisi.',
      errOrg: 'Nama tim atau perusahaan wajib diisi.',
      errTeamSize: 'Pilih ukuran tim.',
      errConsent: 'Centang persetujuan untuk melanjutkan.',
      errCsContactEmpty: 'Masukkan email atau nomor HP agar kami bisa menghubungimu.',
      csSuccessTitle: 'Terima kasih!',
      csSuccessBody: 'Tim kami menghubungi kamu di {contact} dalam 1 hari kerja.',
      csSuccessNotice: 'Simulasi — tidak ada data yang dikirim.',
      csDone: 'Selesai',

      faqKicker: "FAQ",
      faqTitle: "Pertanyaan yang sering muncul.",
      faqBody: "Belum menemukan jawabannya? Tim kami siap membantu.",
      faqQ1: "Kapan saldo aktif?",
      faqA1: "Pada produk nyata, saldo aktif setelah pembayaran dikonfirmasi — biasanya dalam hitungan menit. Pada prototype ini, konfirmasi hanya menampilkan status sukses simulasi.",
      faqQ2: "Model AI apa saja yang bisa dipakai?",
      faqA2: "Satu saldo bisa dipakai untuk semua model yang tersedia, misalnya Claude, GPT, Gemini, DeepSeek, dan Qwen. Paket apa pun, pilihan modelnya sama. Model hemat membuat saldo lebih awet; model premium lebih kuat untuk tugas rumit.",
      faqQ3: "Apakah saldo bisa kedaluwarsa?",
      faqA3: "Tidak. Saldo dan bonus kredit tidak kedaluwarsa. Saldo tidak bisa diuangkan atau dipindahkan ke akun lain.",
      faqQ4: "Apakah harga sudah termasuk PPN?",
      faqA4: "Ya. Harga paket sudah termasuk PPN, tanpa biaya tambahan. 1 kredit setara Rp1.",
      faqQ5: "Apakah estimasi jumlah sesi pasti?",
      faqA5: "Tidak. Panjang prompt, model, dan format output memengaruhi pemakaian. Estimasi di halaman ini memakai satu “sesi kecil” (±40 rb token masuk, ±4 rb token keluar) sebagai patokan.",
      faqQ6: "Apakah saldo terpotong kalau permintaan gagal?",
      faqA6: "Tidak. Permintaan yang gagal dan tidak menghasilkan jawaban tidak memotong saldo.",
      faqQ7: "Metode pembayaran apa saja?",
      faqA7: "QRIS, e-wallet (DANA, GoPay, OVO), dan virtual account. Di prototype ini semuanya simulasi.",
      faqQ8: "Bisakah refund atau batal?",
      faqA8: "Pembayaran yang belum selesai bisa dibatalkan kapan saja. Saldo yang sudah masuk tidak bisa diuangkan. Kebijakan refund lengkap akan ditetapkan sebelum peluncuran; prototype ini tidak memproses transaksi nyata.",
      faqQ9: "Ke mana data prompt saya dikirim?",
      faqA9: "Prompt dikirim ke penyedia model yang kamu pilih untuk diproses, dan bisa diproses di pusat data di luar Indonesia. Kami tidak memakai prompt atau hasilnya untuk melatih model. Pada prototype ini tidak ada data yang dikirim.",
      faqQ10: "Bagaimana kalau API key saya bocor?",
      faqA10: "Nonaktifkan API key itu dari halaman saldo, lalu buat yang baru. Semua pemakaian lewat API key memotong saldomu, jadi simpan seperti kata sandi.",
      faqQ11: "Bisakah membeli untuk tim dan meminta invoice perusahaan?",
      faqA11: "Bisa. Kami bantu siapkan invoice atas nama perusahaan, faktur pajak, dan pemantauan pemakaian per anggota. Klik “Konsultasi untuk tim” dan kami hubungi dalam 1 hari kerja.",
      finalTitle: "Nyala sekarang.",
      finalBody: "Isi saldo AI dalam hitungan menit, pahami apa yang bisa dikerjakan paketmu, lalu lanjut membangun.",
      finalTrust: "Biaya tambahan Rp0 · Bayar lokal · Saldo tidak kedaluwarsa",
      finalSecondary: "Lihat paket",

      chatLauncher: "Butuh bantuan?",
      faqAsk: "Tanya Nala",
      chatName: "Nala",
      chatStatus: "Asisten otomatis",
      chatRestart: "Mulai ulang percakapan",
      chatClose: "Tutup chat",
      chatLogAria: "Percakapan",
      chatInputLabel: "Pesan",
      chatPlaceholder: "Tulis pertanyaanmu…",
      chatPlaceholderContact: "Email atau nomor HP",
      chatSend: "Kirim pesan",
      chatDisclaimer: "Nala adalah asisten otomatis (simulasi). Jawaban bisa kurang tepat.",
      chatGreeting: "Hai, aku Nala! Mau dibantu pilih paket, atau ada pertanyaan lain?",
      chipPick: "Bantu pilih paket",
      chipHowto: "Cara pakai saldo di tool",
      chipModels: "Model apa saja?",
      chipPay: "Metode pembayaran",
      chipTeam: "Bicara dengan tim",
      freqOnce: "Sesekali",
      freqWeekly: "Tiap minggu",
      freqDaily: "Tiap hari",
      chipRestartFlow: "Ulangi",
      pickQ1: "Kamu mau pakai AI untuk apa?",
      pickQ2: "Seberapa sering kamu akan memakainya?",
      pickResult: "Paket {name} ({price}) paling pas buatmu — {estimate}.",
      pickChoose: "Pilih paket ini",
      ansHowto: "Setelah top up, salin API key, lalu tempel bersama Base URL di pengaturan tool-mu. Mau lihat panduannya?",
      ansModels: "Satu saldo bisa dipakai di semua model. Model hemat bikin saldo awet, model premium untuk tugas rumit.",
      ansModelsBtn: "Buka katalog model",
      ansPay: "Kamu bisa bayar pakai QRIS, e-wallet, atau virtual account. Di prototype ini semuanya simulasi.",
      ansFallback: "Maaf, aku belum paham. Coba pilih salah satu topik ini, atau bicara dengan tim.",
      teamConnecting: "Menghubungkan ke tim…",
      agentName: "Sari",
      agentBadge: "Tim",
      agentStatus: "Sari · Tim TokenNyala",
      agentGreeting: "Halo, aku Sari dari tim TokenNyala. Ada yang bisa kubantu soal top up?",
      agentReply: "Pesanmu sudah kami terima. Di produk nyata, tim akan membalas di sini dalam beberapa menit.",
      teamModeLabel: "Simulasi — tidak ada agen nyata",
      teamHours: "Tim online Senin–Jumat, 09.00–18.00 WIB",
      teamOffline: "Tim sedang offline. Tinggalkan email atau nomor HP, kami balas di jam kerja.",
      teamOfflineThanks: "Terima kasih! Kami balas ke {contact} di jam kerja.",
      typingNala: "Nala sedang mengetik…",
      typingSari: "Sari sedang mengetik…",

      pkgEstimate_learn: 'sekitar 20–30 sesi kecil',
      pkgEstimate_prototype: 'sekitar 40–60 sesi kecil',
      pkgEstimate_work: '100+ sesi kecil'
    },
    en: {
      skipLink: 'Skip to main content',
      brandAria: 'TokenNyala — back to top',
      navAria: 'Main navigation',
      navMobileAria: 'Mobile navigation',
      navHow: 'How it works',
      navPackages: 'Packages',
      navModels: 'AI models',
      navFaq: 'FAQ',
      navCta: 'Top up',
      langAria: 'Choose language',
      langLabel: 'Language',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      footerTagline: 'AI balance for ideas that are ready to become projects.',
      footerExplore: 'Explore',
      footerLegal: 'Help & legal',
      footerTerms: 'Terms',
      footerPrivacy: 'Privacy Policy',
      footerContact: 'Contact us',
      footerPrototype: 'Interactive concept — no real transactions. Legal links are placeholders.',

      heroEyebrow: 'For ideas, prototypes, and projects',
      heroTitleA: 'Start vibe\u2011coding.', // non-breaking hyphen
      heroTitleB: 'Keep building without interruptions.',
      heroLead: 'Top up AI credit in a simple flow, choose an amount that fits your project, and keep moving—without learning technical terms first.',
      heroCta: 'Top up balance',
      heroSecondary: 'How it works',
      heroTrustAria: 'Highlights',
      trustLocal: 'Local payment',
      trustFast: 'Fast activation',
      trustReceipt: 'Clear receipts',
      boardCaption: 'Illustration: a project being built with AI, with the balance showing its status.',
      boardProject: 'Event Landing Page',
      boardTag: 'Project',
      boardPrompt: 'Make the hero warmer and simpler',
      boardCoding: 'Writing component…',
      boardPreview: 'Event page ready',
      boardBalance: 'Active balance',
      boardStatusOff: 'Not on yet',
      boardStatusOn: 'On',
      boardStatusReady: 'Ready to switch on',
      boardBalanceReady: 'Balance after top up',
      boardEstimateOff: 'Choose a package to switch your balance on',
      boardEstimateOn: 'Estimate: {estimate}',

      howKicker: 'How it works',
      howTitle: 'From idea to project, without confusing steps.',
      howStepsAria: 'Three steps',
      step1Title: 'Choose your goal',
      step1Body: 'Learn, build a prototype, or work on a project. We suggest the right package.',
      step1ChipsAria: 'Goal options',
      intentLearn: 'Learn',
      intentPrototype: 'Prototype',
      intentWork: 'Work',
      step2Title: 'Pay easily',
      step2Body: 'Use QRIS, e-wallet, or virtual account. See every fee before you pay.',
      step2ChipsAria: 'Payment highlights',
      step2Chip1: 'Clear amounts',
      step2Chip2: 'Rp0 extra fees',
      step2Chip3: 'Local methods',
      step3Title: 'Keep building',
      step3Body: 'Your balance is ready and your project keeps its momentum.',
      step3ChipsAria: 'After topping up',
      step3Chip1: 'Balance status',
      step3Chip2: 'Purchase history',
      step3Chip3: 'Back to your project',

      pkgKicker: 'Packages',
      pkgTitle: 'How much do you want to switch on?',
      pkgLead: "Pick your goal and we'll show the package that fits. Every package works with every AI model.",
      intentTabsAria: 'Choose your goal',
      pkgListAria: 'Package options',
      recoTitle: 'Best fit for {intent}: {name} · {price}',
      recoIntent_learn: 'learning',
      recoIntent_prototype: 'prototyping',
      recoIntent_work: 'work',
      reco_learn: 'A light start for learning and your first project.',
      reco_prototype: 'Enough to iterate on one active prototype.',
      reco_work: 'For ongoing projects and client work.',
      pkgChoose: 'Choose {price}',
      pkgChosen: '{price} package selected',
      badgeRecommended: 'Best fit',
      badgeSelected: 'Selected',
      pkgFor_learn: 'Learning and first tries',
      pkgFor_prototype: 'Building one active prototype',
      pkgFor_work: 'Freelancers and ongoing projects',
      pkgHelper_learn: 'Good for understanding the flow or finishing one mini-task.',
      pkgHelper_prototype: 'Good for iterating on UI, prompts, and quick fixes.',
      pkgHelper_work: 'Good when you start client work or need many iterations.',
      pkgBonus: 'Bonus',
      pkgTotal: 'Total balance',
      pkgCredits: 'credits',
      estimateLabel: 'Estimate',
      pkgSessions_learn: '20–30 small sessions',
      pkgSessions_prototype: '40–60 small sessions',
      pkgSessions_work: '100+ small sessions',
      creditRules: '1 credit = Rp1 · Tax included · Never expires',
      seeModels: 'See available models',
      estimateDisclaimer: 'Estimates depend on the model, prompt length, task type, and output format.',
      pkgAnnounce: '{name} package selected. Balance {credit} credits.',

      coTitle: 'Top-up summary',
      coClose: 'Close checkout',
      coNotice: 'This is a simulated checkout. No real transaction or charge happens.',
      coPackageLegend: 'Package',
      coBreakdownAria: 'Price breakdown',
      coNominal: 'Package price',
      coBonus: 'Bonus credit',
      coFee: 'Extra fees',
      coTotal: 'Total to pay',
      coCreditNote: 'You receive {credit} credits · 1 credit = Rp1 · Tax included',
      coContactLabel: 'Email or phone number',
      coContactHelp: "We'll send your receipt here.",
      coContactPlaceholder: 'name@email.com or 0812xxxxxxxx',
      errContactEmpty: 'Enter your email or phone number so we can send your receipt.',
      errEmailInvalid: "That email doesn't look right. Please check it again.",
      errPhoneInvalid: "That phone number doesn't look right. Use 08xx or +628xx.",
      coMethodLegend: 'Choose a payment method',
      methodQrisHint: 'Scan from any bank or e-wallet app',
      methodEwalletHint: 'DANA, GoPay, OVO',
      methodVaHint: 'Transfer from any bank',
      errMethod: 'Choose a payment method to continue.',
      coSubmit: 'Continue to pay {total}',
      coPayTitle_qris: 'Scan the QRIS code',
      coPayBody_qris: "Scan this sample code to see the flow. It can't be used to pay.",
      coPayTitle_va: 'Transfer to the virtual account',
      coPayBody_va: "This sample number is generated on your device and isn't linked to a bank.",
      coPayTitle_ewallet: 'Pay with an e-wallet',
      coPayBody_ewallet: 'Choose an app to approve the payment (simulation).',
      coWaiting: 'Waiting for a payment of {total}',
      coQrAria: 'Sample QR code, cannot be scanned',
      coVaLabel: 'Virtual account number',
      coPaid: "I've paid",
      coChecking: 'Checking payment…',
      coSimFail: 'Simulate a failed payment',
      coBack: 'Edit details',
      coCopy: 'Copy',
      coCopied: 'Copied',
      successTitle: 'Your balance is on!',
      successBody: '{name} package ({price}) is recorded in this simulation. Receipt sent to {contact}.',
      successKeyLabel: 'Your API key',
      successCopyKey: 'Copy API key',
      successGuide: 'See setup guide',
      successWarning: "Keep your API key like a password. Don't share it.",
      successNotice: 'Prototype — no real transaction.',
      failTitle: "Payment didn't go through",
      failBody: 'Nothing was charged in this prototype. Choose another method or try again.',
      failRetry: 'Try again',

      modelsKicker: 'AI models',
      modelsTitle: 'One balance for every model.',
      modelsBody: 'Every package unlocks the same models. Pick a budget model for light tasks and a premium one for hard problems.',
      modelsCta: 'See all models & rates',
      modelsNote: '1 small session ≈ one component fix request in a coding tool (~40K tokens in, ~4K out). Example only — models and rates may change.',
      modelListAria: 'Featured models',
      tier_hemat: 'Budget',
      tier_seimbang: 'Balanced',
      tier_premium: 'Premium',
      modelSessions: '≈ {n}',
      modelSessionsUnit: 'small sessions / {price}',
      modelRates: 'Rate details',
      rateInput: 'Input',
      rateOutput: 'Output',
      rateContext: 'Context',
      rateUnit: '{n} credits',
      rateCaption: 'Rates per 1M tokens',
      contextUnit: '{n} tokens',
      use_coding: 'Coding',
      use_chat: 'Chat & writing',
      use_analysis: 'Document analysis',
      catTitle: 'Available AI models',
      catSubtitle: 'One balance for every model, whichever package you choose.',
      catClose: 'Close model catalog',
      catSearchLabel: 'Search models',
      catSearchPlaceholder: 'Search models, e.g. Claude',
      catFilterToggle: 'Filters',
      filterUse: 'Use',
      filterTier: 'Cost level',
      filterProvider: 'Provider',
      catCount: 'Showing {a} of {b} models',
      catMore: 'Show more',
      catEmpty: 'No models found. Try another keyword or filter.',
      catClear: 'Clear filters',

      useKicker: 'Setup guide',
      useTitle: 'Use it in your favorite tools.',
      useBody: 'An API key connects your tools to your TokenNyala balance.',
      useStepsAria: 'Setup steps',
      use1Title: 'Copy your API key',
      use1Body: 'Find it on your balance page after topping up.',
      use2Title: 'Paste it into your tool',
      use2Body: 'Fill in the Base URL and API key in settings.',
      use3Title: 'Pick a model & build',
      use3Body: 'Every model uses the same balance.',
      useConfigTitle: 'Sample configuration',
      useConfigTag: 'example',
      useCompat: 'Works with tools that support the OpenAI API, for example:',
      useToolsAria: 'Example tools',
      useConfigNote: 'Example only — not a real endpoint or key.',
      useNoKey: 'No API key yet? Top up first and your key appears right away.',

      benefitKicker: 'Why TokenNyala',
      benefitTitle: "Don't just buy credit. Give your project the time it needs to ship.",
      ben1Title: 'Choices you can understand',
      ben1Body: 'Amounts and estimates are explained by what your project needs, not by model names and jargon.',
      ben2Title: 'One balance to keep going',
      ben2Body: 'Top up once, then use it with every available AI model.',
      ben3Title: 'Pay the way you already do',
      ben3Body: 'QRIS, e-wallets, and virtual accounts — the methods people in Indonesia use every day.',
      ben4Title: 'Track and stay in control',
      ben4Body: 'See your balance, daily usage, and switch off any API key anytime.',
      sampleView: 'Sample view',
      dashBalance: 'Balance left',
      dashOf: 'of',
      dashUsage: 'Last 7 days',
      dashUsageAria: 'Usage over the last 7 days, highest on Friday',
      dashDays: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
      dashDaysLong: 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
      dashRemind: 'Remind me when balance < Rp20,000',
      dashRemindOn: 'Balance reminder on',
      dashRemindOff: 'Balance reminder off',
      dashKeyName: 'Work laptop',
      dashKeyActive: 'Active',
      dashKeyInactive: 'Disabled',
      dashKeyDisable: 'Disable',
      dashKeyEnable: 'Enable',
      dashKeyAnnounce: 'Work laptop API key {status}',
      exKicker: 'Example',
      exTitle: 'One event landing page — how much does it take?',
      exBody: 'Here is a rough estimate for building one page with AI help, using a Balanced-level model.',
      exProject: 'Project: Event Landing Page',
      exTask1: 'Build the first page layout',
      exTask2: 'Polish the mobile view',
      exTask3: 'Add a sign-up form',
      exTask4: 'Fix copy and colours',
      exTotal: 'Total small sessions',
      exCostLabel: 'Estimated cost:',
      exFit: 'The Mulai package (55,000 credits) is enough, with room left to iterate.',
      exCta: 'Choose the Mulai package',

      teamKicker: 'For teams & business',
      teamTitle: 'Buying for a team or company?',
      teamPt1: "Invoices in your company's name",
      teamPt2: 'Tax invoices',
      teamPt3: 'Pay by bank transfer',
      teamPt4: "Track each member's usage",
      teamCta: 'Talk to us about your team',
      teamReply: 'We reply within 1 business day.',
      csTitle: 'Team consultation',
      csIntro: "Tell us what your team needs. We'll reply within 1 business day.",
      csClose: 'Close consultation',
      csName: 'Name',
      csOrg: 'Team or company name',
      csSize: 'Team size',
      csNeed: 'Tell us what you need (optional)',
      csCountLive: '{n} of 500 characters',
      csInvoice: 'I need a company invoice / tax invoice',
      csConsent: 'I agree to the Terms and Privacy Policy',
      csSubmit: 'Send',
      errName: 'Please enter your name.',
      errOrg: 'Please enter your team or company name.',
      errTeamSize: 'Choose a team size.',
      errConsent: 'Tick the agreement to continue.',
      errCsContactEmpty: 'Enter your email or phone number so we can reach you.',
      csSuccessTitle: 'Thank you!',
      csSuccessBody: 'Our team will contact you at {contact} within 1 business day.',
      csSuccessNotice: 'Simulation — no data is sent.',
      csDone: 'Done',

      faqKicker: "FAQ",
      faqTitle: "Frequently asked questions.",
      faqBody: "Still looking for an answer? Our team is here to help.",
      faqQ1: "When is my balance active?",
      faqA1: "In the real product, your balance is active once payment is confirmed — usually within minutes. In this prototype, confirming only shows a simulated success state.",
      faqQ2: "Which AI models can I use?",
      faqA2: "One balance works with every available model, such as Claude, GPT, Gemini, DeepSeek, and Qwen. Every package unlocks the same models. Budget models make your balance last longer; premium models handle harder tasks.",
      faqQ3: "Does my balance expire?",
      faqA3: "No. Your balance and bonus credit never expire. Balance can't be cashed out or moved to another account.",
      faqQ4: "Is tax included in the price?",
      faqA4: "Yes. Package prices include VAT, with no extra fees. 1 credit equals Rp1.",
      faqQ5: "Are the session estimates exact?",
      faqA5: "No. Prompt length, model, and output format all affect usage. Estimates on this page use one “small session” (~40K tokens in, ~4K out) as the yardstick.",
      faqQ6: "Am I charged when a request fails?",
      faqA6: "No. A failed request that returns no output doesn't use your balance.",
      faqQ7: "Which payment methods are available?",
      faqA7: "QRIS, e-wallets (DANA, GoPay, OVO), and virtual accounts. In this prototype they are all simulated.",
      faqQ8: "Can I get a refund or cancel?",
      faqA8: "You can cancel a payment that hasn't completed at any time. Balance that has been credited can't be cashed out. The full refund policy will be set before launch; this prototype doesn't process real transactions.",
      faqQ9: "Where is my prompt data sent?",
      faqA9: "Prompts go to the provider of the model you choose and may be processed in data centres outside Indonesia. We don't use your prompts or outputs to train models. This prototype sends no data.",
      faqQ10: "What if my API key leaks?",
      faqA10: "Disable that key from your balance page and create a new one. Every request made with your key uses your balance, so keep it like a password.",
      faqQ11: "Can I buy for a team and get a company invoice?",
      faqA11: "Yes. We can set up invoices in your company's name, tax invoices, and per-member usage tracking. Choose “Talk to us about your team” and we'll reply within 1 business day.",
      finalTitle: "Switch on now.",
      finalBody: "Top up AI credit in minutes, see what your package can do, and keep building.",
      finalTrust: "Rp0 extra fees · Local payment · Balance never expires",
      finalSecondary: "See packages",

      chatLauncher: "Need help?",
      faqAsk: "Ask Nala",
      chatName: "Nala",
      chatStatus: "Automated assistant",
      chatRestart: "Restart conversation",
      chatClose: "Close chat",
      chatLogAria: "Conversation",
      chatInputLabel: "Message",
      chatPlaceholder: "Type your question…",
      chatPlaceholderContact: "Email or phone number",
      chatSend: "Send message",
      chatDisclaimer: "Nala is an automated assistant (simulation). Answers may be inaccurate.",
      chatGreeting: "Hi, I'm Nala! Want help choosing a package, or got another question?",
      chipPick: "Help me choose",
      chipHowto: "Using my balance in tools",
      chipModels: "Which models?",
      chipPay: "Payment methods",
      chipTeam: "Talk to the team",
      freqOnce: "Occasionally",
      freqWeekly: "Weekly",
      freqDaily: "Daily",
      chipRestartFlow: "Start over",
      pickQ1: "What will you use AI for?",
      pickQ2: "How often will you use it?",
      pickResult: "{name} ({price}) fits you best — {estimate}.",
      pickChoose: "Choose this package",
      ansHowto: "After topping up, copy your API key and paste it with the Base URL into your tool's settings. Want to see the guide?",
      ansModels: "One balance works with every model. Budget models make it last; premium models handle hard tasks.",
      ansModelsBtn: "Open model catalog",
      ansPay: "You can pay with QRIS, e-wallets, or virtual accounts. In this prototype they're all simulated.",
      ansFallback: "Sorry, I didn't get that. Pick one of these topics, or talk to the team.",
      teamConnecting: "Connecting you to the team…",
      agentName: "Sari",
      agentBadge: "Team",
      agentStatus: "Sari · TokenNyala team",
      agentGreeting: "Hi, I'm Sari from the TokenNyala team. How can I help with your top-up?",
      agentReply: "We've got your message. In the real product, the team replies here within a few minutes.",
      teamModeLabel: "Simulation — no real agent",
      teamHours: "Team online Mon–Fri, 09:00–18:00 WIB",
      teamOffline: "The team is offline. Leave your email or phone number and we'll reply during business hours.",
      teamOfflineThanks: "Thanks! We'll reply to {contact} during business hours.",
      typingNala: "Nala is typing…",
      typingSari: "Sari is typing…",

      pkgEstimate_learn: 'about 20–30 small sessions',
      pkgEstimate_prototype: 'about 40–60 small sessions',
      pkgEstimate_work: '100+ small sessions'
    }
  };

  /* ---------- Data (docs/technical-spec.md → Interactive Data Model) ---------- */
  const packages = {
    learn: { id: 'learn', name: 'Mulai', amount: 50000, bonus: 5000 },
    prototype: { id: 'prototype', name: 'Bangun', amount: 100000, bonus: 15000 },
    work: { id: 'work', name: 'Scale', amount: 250000, bonus: 50000 }
  };
  const METER_MAX_CREDIT = 300000; // largest package incl. bonus → 100%

  /* Model catalog mock (docs/technical-spec.md → Katalog Model Mock). Rates: credits per 1M tokens, 1 credit = Rp1. */
  const SMALL_SESSION = { inputTokens: 40000, outputTokens: 4000 };
  const models = [
    { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'DeepSeek', uses: ['coding', 'chat'], in: 4500, out: 18000, ctx: 128000 },
    { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google', uses: ['chat', 'analysis'], in: 5000, out: 20000, ctx: 1000000 },
    { id: 'qwen-plus', name: 'Qwen Plus', provider: 'Alibaba', uses: ['chat'], in: 6000, out: 24000, ctx: 128000 },
    { id: 'gpt-mini', name: 'GPT Mini', provider: 'OpenAI', uses: ['chat'], in: 6500, out: 26000, ctx: 400000 },
    { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', provider: 'DeepSeek', uses: ['analysis', 'coding'], in: 9000, out: 36000, ctx: 128000 },
    { id: 'claude-haiku', name: 'Claude Haiku', provider: 'Anthropic', uses: ['chat', 'coding'], in: 15000, out: 75000, ctx: 200000 },
    { id: 'qwen-max', name: 'Qwen Max', provider: 'Alibaba', uses: ['coding', 'chat'], in: 20000, out: 80000, ctx: 256000 },
    { id: 'gpt', name: 'GPT', provider: 'OpenAI', uses: ['coding', 'chat'], in: 25000, out: 150000, ctx: 400000 },
    { id: 'claude-sonnet', name: 'Claude Sonnet', provider: 'Anthropic', uses: ['coding', 'analysis'], in: 31500, out: 157500, ctx: 1000000 },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', uses: ['coding', 'analysis'], in: 31500, out: 189000, ctx: 1000000 },
    { id: 'claude-opus', name: 'Claude Opus', provider: 'Anthropic', uses: ['coding'], in: 78750, out: 393750, ctx: 1000000 },
    { id: 'gpt-pro', name: 'GPT Pro', provider: 'OpenAI', uses: ['analysis'], in: 150000, out: 600000, ctx: 400000 }
  ].map((m) => {
    const sessionCost = (SMALL_SESSION.inputTokens / 1e6) * m.in + (SMALL_SESSION.outputTokens / 1e6) * m.out;
    const tier = sessionCost < 1000 ? 'hemat' : sessionCost <= 3000 ? 'seimbang' : 'premium';
    return { ...m, sessionCost, tier, per10k: Math.floor(10000 / sessionCost) };
  });
  const PREVIEW_MODELS = ['claude-sonnet', 'gpt', 'gemini-pro', 'deepseek-chat', 'qwen-plus', 'claude-opus'];
  // Model family icons (assets/models/SOURCE.md). One icon per family: Claude, GPT, Gemini, DeepSeek, Qwen.
  const PROVIDER_ICON = {
    Anthropic: 'assets/models/claude.svg',
    OpenAI: 'assets/models/openai.svg',
    Google: 'assets/models/gemini.svg',
    DeepSeek: 'assets/models/deepseek.svg',
    Alibaba: 'assets/models/qwen.svg'
  };
  const TIER_STYLE = {
    hemat: 'bg-xl-teal/15 text-teal-ink',
    seimbang: 'bg-xl-sky/20 text-xl-dark',
    premium: 'bg-xl-yellow/35 text-xl-dark'
  };

  const state = { lang: 'id', menuOpen: false, intent: 'learn', selectedPackage: null, paidPackage: null };
  const t = (key) => copy[state.lang][key] ?? copy.id[key] ?? key;

  /* ---------- Storage (wrapped: may be unavailable) ---------- */
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } }
  };

  /* ---------- Language ---------- */
  function setLanguage(lang) {
    if (!copy[lang]) return;
    state.lang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    syncMenuLabel();
    renderPrices();
    renderPackages();
    renderHeroBalance();
    renderCheckout();
    renderModels();
    renderDashboard();
    renderConsult();
    renderChat();
    storage.set(LANG_KEY, lang);
  }

  /* ---------- Formatting ---------- */
  const number = (n) => new Intl.NumberFormat(state.lang === 'en' ? 'en-US' : 'id-ID').format(n);
  const rupiah = (n) => 'Rp' + number(n);

  function renderPrices() {
    document.querySelectorAll('[data-price]').forEach((el) => { el.textContent = rupiah(Number(el.dataset.price)); });
    document.querySelectorAll('[data-credit]').forEach((el) => { el.textContent = number(Number(el.dataset.credit)); });
    // Compact form for tight spaces (<640px): Rp100rb / Rp100K
    document.querySelectorAll('[data-price-short]').forEach((el) => {
      el.textContent = 'Rp' + number(Number(el.dataset.priceShort) / 1000) + (state.lang === 'en' ? 'K' : 'rb');
    });
  }
  const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');

  /* ---------- Hero balance board ----------
     Off until a package is chosen (docs/hero-and-journey-spec.md → Visual Animation).
     Call selectPackage(id) from the package picker / checkout. */
  /* States: off (nothing chosen) → ready (package chosen, not paid yet) → on (paid in checkout).
     The meter fills on selection (spec), but "Nyala" and "Saldo aktif" only appear after payment. */
  function renderHeroBalance() {
    const root = document.querySelector('[data-hero-balance]');
    if (!root) return;
    const paid = packages[state.paidPackage];
    const pkg = paid || packages[state.selectedPackage];
    const credit = pkg ? pkg.amount + pkg.bonus : 0;
    const next = paid ? 'on' : pkg ? 'ready' : 'off';
    const previous = root.dataset.state;

    root.dataset.state = next;
    root.querySelector('[data-hero-label]').textContent = t(next === 'ready' ? 'boardBalanceReady' : 'boardBalance');
    root.querySelector('[data-hero-amount]').textContent = rupiah(credit);
    root.querySelector('[data-hero-status]').textContent = t({ off: 'boardStatusOff', ready: 'boardStatusReady', on: 'boardStatusOn' }[next]);
    root.querySelector('[data-hero-meter]').style.width = pkg ? `${Math.round((credit / METER_MAX_CREDIT) * 100)}%` : '0%';
    root.querySelector('[data-hero-estimate]').textContent = pkg
      ? fill(t('boardEstimateOn'), { estimate: t(`pkgEstimate_${pkg.id}`) })
      : t('boardEstimateOff');
    // motion.js listens for this to play the "switch on" moment
    if (previous !== next) document.dispatchEvent(new CustomEvent('tn:balance', { detail: { state: next, previous, credit } }));
  }

  /* ---------- Package picker ---------- */
  const tabs = [...document.querySelectorAll('[role="tab"][data-intent]')];
  const panel = document.getElementById('paket-panel');
  const announcer = document.querySelector('[data-pkg-announce]');

  function renderPackages() {
    const reco = packages[state.intent];

    tabs.forEach((tab) => {
      const active = tab.dataset.intent === state.intent;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) panel?.setAttribute('aria-labelledby', tab.id);
    });

    document.querySelectorAll('[data-package]').forEach((card) => {
      const id = card.dataset.package;
      card.dataset.recommended = String(id === reco.id);
      card.dataset.selected = String(id === state.selectedPackage);
      // Blue border = the chosen card; before any choice, the recommended one.
      card.dataset.highlight = String(id === (state.selectedPackage ?? reco.id));
      const cta = card.querySelector('[data-pkg-cta]');
      if (cta) {
        cta.textContent = fill(t(id === state.selectedPackage ? 'pkgChosen' : 'pkgChoose'), { price: rupiah(packages[id].amount) });
      }
    });

    const set = (sel, text) => { const el = document.querySelector(sel); if (el) el.textContent = text; };
    set('[data-reco-title]', fill(t('recoTitle'), { intent: t(`recoIntent_${reco.id}`), name: reco.name, price: rupiah(reco.amount) }));
    set('[data-reco-body]', t(`reco_${reco.id}`));
    set('[data-reco-cta]', fill(t(reco.id === state.selectedPackage ? 'pkgChosen' : 'pkgChoose'), { price: rupiah(reco.amount) }));
  }

  function setIntent(id, { focus = false } = {}) {
    if (!packages[id]) return;
    state.intent = id;
    renderPackages();
    if (focus) tabs.find((tab) => tab.dataset.intent === id)?.focus();
  }

  function selectPackage(id, { announce = true } = {}) {
    if (!packages[id]) return;
    state.selectedPackage = id;
    renderPackages();
    renderHeroBalance();
    renderCheckout();
    const pkg = packages[id];
    if (announce && announcer) announcer.textContent = fill(t('pkgAnnounce'), { name: pkg.name, credit: number(pkg.amount + pkg.bonus) });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setIntent(tab.dataset.intent));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const target = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      setIntent(tabs[target].dataset.intent, { focus: true });
    });
  });

  // Clicking anywhere on a card selects it (without opening checkout); its button selects + opens checkout.
  document.querySelectorAll('article[data-package]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('button, a')) return;
      selectPackage(card.dataset.package);
    });
  });

  document.querySelectorAll('[data-choose-package]').forEach((btn) => {
    btn.addEventListener('click', () => openCheckout(btn.dataset.choosePackage, btn));
  });
  document.querySelector('[data-choose-recommended]')?.addEventListener('click', (event) => openCheckout(state.intent, event.currentTarget));

  /** Return focus to an opener only if focus is not already somewhere meaningful
      (e.g. another overlay such as the chat took it on purpose). */
  function focusIsFree(dlg) {
    const a = document.activeElement;
    return !a || a === document.body || dlg.contains(a);
  }

  /* ---------- Shared modal behaviour (checkout, catalog, consultation) ----------
     showModal + focus heading, scroll lock, backdrop click (press must start and end on the backdrop),
     focus back to the opener when focus is free (menu button if the opener is hidden). */
  function setupModal(dlg, { focus, onClose } = {}) {
    let opener = null;
    let skipFocus = false;
    let pressedBackdrop = false;
    const visible = (el) => el && document.contains(el) && el.getClientRects().length > 0;
    dlg.addEventListener('pointerdown', (e) => { pressedBackdrop = e.target === dlg; });
    dlg.addEventListener('click', (e) => { if (pressedBackdrop && e.target === dlg) dlg.close(); pressedBackdrop = false; });
    dlg.addEventListener('close', () => {
      document.documentElement.classList.remove('overflow-hidden');
      onClose?.();
      const target = skipFocus ? null : opener;
      skipFocus = false;
      if (!target || !focusIsFree(dlg)) return;
      if (visible(target)) target.focus();
      else if (visible(menuButton)) menuButton.focus();
    });
    return {
      open(from = document.activeElement) {
        if (state.menuOpen) setMenu(false);
        opener = from;
        if (!dlg.open) dlg.showModal();
        document.documentElement.classList.add('overflow-hidden');
        dlg.querySelector(focus)?.focus();
      },
      close({ returnFocus = true } = {}) {
        skipFocus = !returnFocus;
        if (dlg.open) dlg.close();
      }
    };
  }

  /* ---------- Checkout (docs/technical-spec.md → Checkout Modal, Form Validation) ---------- */
  const dialog = document.getElementById('checkout');
  const form = dialog?.querySelector('form');
  const contactInput = document.getElementById('co-contact');
  const PAY_DELAY = 600; // spec: no simulated delay above 600ms
  const checkout = { step: 'form', method: null, contact: '', apiKey: '', va: '' };

  const randomDigits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
  const randomHex = (n) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => (b % 16).toString(16)).join('');

  /** Email or Indonesian mobile number. Returns { ok, type, value, error }. */
  function parseContact(raw) {
    const value = raw.trim();
    if (!value) return { ok: false, error: 'errContactEmpty' };
    if (value.includes('@')) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? { ok: true, type: 'email', value }
        : { ok: false, error: 'errEmailInvalid' };
    }
    const digits = value.replace(/[\s.-]/g, '');
    if (!/^(\+62|62|0)8[1-9][0-9]{7,10}$/.test(digits)) return { ok: false, error: 'errPhoneInvalid' };
    return { ok: true, type: 'phone', value: '+62' + digits.replace(/^(\+62|62|0)/, '') };
  }

  function setFieldError(name, key) {
    const message = dialog.querySelector(`[data-error-for="${name}"]`);
    if (message) {
      message.textContent = key ? t(key) : '';
      message.dataset.key = key || '';
      message.classList.toggle('hidden', !key);
    }
    if (name === 'contact') contactInput?.setAttribute('aria-invalid', String(Boolean(key)));
    if (name === 'method') dialog.querySelectorAll('[name="co-method"]').forEach((r) => r.setAttribute('aria-invalid', String(Boolean(key))));
  }

  function renderQr() {
    const svg = dialog.querySelector('[data-co-qr]');
    if (!svg || svg.childElementCount) return;
    const size = 25; let seed = 7; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="currentColor"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="currentColor"/>`;
    const inFinder = (x, y) => (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
    let cells = '';
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!inFinder(x, y) && rnd() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1" fill="currentColor"/>`;
    svg.classList.add('text-xl-dark');
    svg.innerHTML = cells + finder(0, 0) + finder(18, 0) + finder(0, 18);
  }

  function renderCheckout() {
    if (!dialog) return;
    const pkg = packages[state.selectedPackage] || packages[state.intent];
    const total = rupiah(pkg.amount);
    const set = (sel, text) => { const el = dialog.querySelector(sel); if (el) el.textContent = text; };

    dialog.querySelectorAll('[name="co-package"]').forEach((r) => { r.checked = r.value === pkg.id; });
    set('[data-co-nominal]', total);
    set('[data-co-bonus]', '+' + rupiah(pkg.bonus));
    set('[data-co-total]', total);
    set('[data-co-credit-note]', fill(t('coCreditNote'), { credit: number(pkg.amount + pkg.bonus) }));
    set('[data-co-submit]', fill(t('coSubmit'), { total }));
    set('[data-co-title]', t('coTitle'));

    const m = checkout.method;
    if (m) {
      set('[data-co-pay-title]', t(`coPayTitle_${m}`));
      set('[data-co-pay-body]', t(`coPayBody_${m}`));
    }
    set('[data-co-waiting]', fill(t('coWaiting'), { total }));
    set('[data-co-va]', checkout.va.replace(/(\d{4})(?=\d)/g, '$1 '));
    set('[data-co-key]', checkout.apiKey ? checkout.apiKey.slice(0, 8) + '••••••••••••' + checkout.apiKey.slice(-4) : '');
    set('[data-co-success-body]', fill(t('successBody'), { name: pkg.name, price: total, contact: checkout.contact }));
    // re-translate visible error messages
    dialog.querySelectorAll('[data-error-for]').forEach((el) => { if (el.dataset.key) el.textContent = t(el.dataset.key); });
  }

  function showStep(step) {
    checkout.step = step;
    dialog.dataset.step = step;
    dialog.querySelectorAll('[data-step-panel]').forEach((panel) => { panel.hidden = panel.dataset.stepPanel !== step; });
    if (step === 'pay') {
      dialog.querySelectorAll('[data-pay-method]').forEach((el) => { el.hidden = el.dataset.payMethod !== checkout.method; });
      dialog.querySelector('[data-pay-footer]').hidden = checkout.method === 'ewallet';
      if (checkout.method === 'qris') renderQr();
    }
    renderCheckout();
    const focusTarget = { form: '#co-title', pay: '#co-pay-title', success: '#co-success-title', failed: '#co-failed-title' }[step];
    const el = dialog.querySelector(focusTarget);
    if (el) { if (!el.hasAttribute('tabindex')) el.tabIndex = -1; el.focus(); }
  }

  const checkoutModal = dialog && setupModal(dialog, {
    focus: '#co-title',
    onClose: () => {
      if (checkout.step !== 'form') { // fresh form next time; keep contact
        checkout.method = null;
        dialog.querySelectorAll('[name="co-method"]').forEach((r) => { r.checked = false; });
      }
    }
  });

  function openCheckout(packageId, opener = document.activeElement) {
    if (!dialog) return;
    selectPackage(packageId || state.selectedPackage || state.intent, { announce: false });
    showStep('form');
    checkoutModal.open(opener);
  }

  const closeCheckout = (opts) => checkoutModal?.close(opts);
  dialog?.querySelector('[data-co-close]')?.addEventListener('click', () => closeCheckout());

  dialog?.querySelectorAll('[name="co-package"]').forEach((radio) => {
    radio.addEventListener('change', () => selectPackage(radio.value, { announce: false }));
  });
  dialog?.querySelectorAll('[name="co-method"]').forEach((radio) => {
    radio.addEventListener('change', () => { checkout.method = radio.value; setFieldError('method', null); });
  });
  contactInput?.addEventListener('blur', () => {
    if (!contactInput.value.trim()) return; // don't scold an untouched field
    const result = parseContact(contactInput.value);
    setFieldError('contact', result.ok ? null : result.error);
  });
  contactInput?.addEventListener('input', () => {
    if (contactInput.getAttribute('aria-invalid') === 'true' && parseContact(contactInput.value).ok) setFieldError('contact', null);
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const contact = parseContact(contactInput.value);
    setFieldError('contact', contact.ok ? null : contact.error);
    setFieldError('method', checkout.method ? null : 'errMethod');
    if (!contact.ok) { contactInput.focus(); return; }
    if (!checkout.method) { dialog.querySelector('[name="co-method"]')?.focus(); return; }
    checkout.contact = contact.value;
    checkout.va = '8808' + randomDigits(12);
    showStep('pay');
  });

  dialog?.querySelectorAll('[data-co-paid]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dialog.querySelectorAll('[data-co-paid]').forEach((b) => { b.disabled = true; });
      dialog.querySelector('[data-co-live]').textContent = t('coChecking');
      const label = dialog.querySelector('[data-pay-footer] [data-co-paid]');
      if (label && btn === label) label.textContent = t('coChecking');
      setTimeout(() => {
        dialog.querySelectorAll('[data-co-paid]').forEach((b) => { b.disabled = false; });
        if (label) label.textContent = t('coPaid');
        checkout.apiKey = 'tn-demo-' + randomHex(24);
        state.paidPackage = state.selectedPackage;
        renderHeroBalance();
        showStep('success');
        dialog.querySelector('[data-co-live]').textContent = t('successTitle');
      }, PAY_DELAY);
    });
  });
  dialog?.querySelector('[data-co-fail]')?.addEventListener('click', () => showStep('failed'));
  dialog?.querySelectorAll('[data-co-back]').forEach((btn) => btn.addEventListener('click', () => showStep('form')));
  // "Lihat panduan pasang": close first, then scroll + focus. Closing a modal restores focus to the
  // previously focused element, which would cancel a normal anchor jump.
  dialog?.querySelector('[data-co-guide]')?.addEventListener('click', (event) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('href').slice(1);
    closeCheckout({ returnFocus: false });
    setTimeout(() => goToSection(id), 0);
  });

  function goToSection(id) {
    const section = document.getElementById(id);
    if (!section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.TokenNyalaMotion?.scrollTo) window.TokenNyalaMotion.scrollTo(section);
    else section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    const heading = section.querySelector('h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    history.replaceState(null, '', '#' + id);
  }

  /* ---------- Copy to clipboard ---------- */
  async function copyText(text, button) {
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard unavailable: text stays selectable */ }
    const original = button.textContent;
    button.textContent = t('coCopied');
    const live = button.closest('dialog')?.querySelector('[aria-live]') ?? document.querySelector('[data-page-live]');
    if (live) { live.textContent = ''; requestAnimationFrame(() => { live.textContent = t('coCopied'); }); }
    setTimeout(() => { button.textContent = original; }, 1500);
  }
  document.querySelectorAll('[data-copy-target], [data-copy-value]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copyValue ?? document.querySelector(btn.dataset.copyTarget)?.textContent.replace(/\s/g, '') ?? '';
      copyText(text, btn);
    });
  });
  dialog?.querySelector('[data-copy-key]')?.addEventListener('click', (event) => copyText(checkout.apiKey, event.currentTarget));

  /* ---------- Models: preview cards + catalog ---------- */
  const modelTemplate = document.getElementById('model-card');
  const catalogDialog = document.getElementById('catalog');
  const catalog = { query: '', filters: { use: new Set(), tier: new Set(), provider: new Set() }, visible: 6 };
  const CATALOG_STEP = 6;

  function compact(n) { // 128000 → "128 rb" / "128K", 1000000 → "1 jt" / "1M"
    const en = state.lang === 'en';
    if (n >= 1e6) return number(n / 1e6) + (en ? 'M' : ' jt');
    return number(n / 1e3) + (en ? 'K' : ' rb');
  }

  function modelCard(m) {
    const node = modelTemplate.content.firstElementChild.cloneNode(true);
    const q = (sel) => node.querySelector(sel);
    q('[data-m-icon]').src = PROVIDER_ICON[m.provider];
    q('[data-m-name]').textContent = m.name;
    q('[data-m-meta]').textContent = [m.provider, ...m.uses.map((u) => t(`use_${u}`))].join(' · ');
    q('[data-m-tier]').textContent = t(`tier_${m.tier}`);
    q('[data-m-tier]').className += ' ' + TIER_STYLE[m.tier];
    q('[data-m-sessions]').textContent = fill(t('modelSessions'), { n: m.per10k });
    q('[data-m-sessions-unit]').textContent = fill(t('modelSessionsUnit'), { price: rupiah(10000) });
    q('[data-m-rates-label]').textContent = t('modelRates');
    q('[data-m-rate-caption]').textContent = t('rateCaption');
    node.querySelectorAll('[data-m-k]').forEach((el) => { el.textContent = t(el.dataset.mK); });
    q('[data-m-in]').textContent = fill(t('rateUnit'), { n: number(m.in) });
    q('[data-m-out]').textContent = fill(t('rateUnit'), { n: number(m.out) });
    q('[data-m-ctx]').textContent = fill(t('contextUnit'), { n: compact(m.ctx) });
    return node;
  }

  function filteredModels() {
    const q = catalog.query.trim().toLowerCase();
    const { use, tier, provider } = catalog.filters;
    return models.filter((m) =>
      (!q || `${m.name} ${m.provider}`.toLowerCase().includes(q)) &&
      (!use.size || m.uses.some((u) => use.has(u))) &&
      (!tier.size || tier.has(m.tier)) &&
      (!provider.size || provider.has(m.provider)));
  }

  function renderModels() {
    const preview = document.querySelector('[data-model-preview]');
    if (preview && modelTemplate) {
      preview.replaceChildren(...PREVIEW_MODELS.map((id) => modelCard(models.find((m) => m.id === id))));
    }
    renderCatalog();
  }

  function renderCatalog() {
    if (!catalogDialog || !modelTemplate) return;
    const list = catalogDialog.querySelector('[data-cat-list]');
    const results = filteredModels();
    const shown = results.slice(0, catalog.visible);
    list.replaceChildren(...shown.map(modelCard));
    const count = catalogDialog.querySelector('[data-cat-count]');
    count.textContent = results.length ? fill(t('catCount'), { a: shown.length, b: results.length }) : '';
    count.hidden = !results.length;
    catalogDialog.querySelector('[data-cat-empty]').dataset.show = String(results.length === 0);
    catalogDialog.querySelector('[data-cat-more]').dataset.show = String(results.length > shown.length);

    const active = Object.values(catalog.filters).reduce((n, set) => n + set.size, 0);
    const toggleLabel = catalogDialog.querySelector('[data-filter-toggle-label]');
    if (toggleLabel) toggleLabel.textContent = t('catFilterToggle') + (active ? ` (${active})` : '');
    catalogDialog.querySelectorAll('[data-filter]').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(catalog.filters[chip.dataset.filter].has(chip.dataset.value)));
    });
  }

  const catalogModal = catalogDialog && setupModal(catalogDialog, { focus: '#cat-title' });

  function openCatalog(opener = document.activeElement) {
    if (!catalogDialog) return;
    catalog.visible = CATALOG_STEP;
    renderCatalog();
    catalogModal.open(opener);
  }
  catalogDialog?.querySelector('[data-cat-close]')?.addEventListener('click', () => catalogModal.close());

  catalogDialog?.querySelector('#cat-search')?.addEventListener('input', (e) => {
    catalog.query = e.target.value;
    catalog.visible = CATALOG_STEP;
    renderCatalog();
  });
  catalogDialog?.querySelectorAll('[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const set = catalog.filters[chip.dataset.filter];
      set.has(chip.dataset.value) ? set.delete(chip.dataset.value) : set.add(chip.dataset.value);
      catalog.visible = CATALOG_STEP;
      renderCatalog();
    });
  });
  catalogDialog?.querySelector('[data-cat-more]')?.addEventListener('click', () => {
    const firstNew = catalog.visible;
    catalog.visible += CATALOG_STEP;
    renderCatalog();
    // Move focus to the first newly shown card so keyboard users continue from there.
    catalogDialog.querySelectorAll('[data-cat-list] summary')[firstNew]?.focus();
  });
  catalogDialog?.querySelector('[data-cat-clear]')?.addEventListener('click', () => {
    Object.values(catalog.filters).forEach((set) => set.clear());
    catalog.query = '';
    const search = catalogDialog.querySelector('#cat-search');
    if (search) { search.value = ''; search.focus(); }
    renderCatalog();
  });
  const filterToggle = catalogDialog?.querySelector('[data-filter-toggle]');
  filterToggle?.addEventListener('click', () => {
    const panel = document.getElementById('cat-filters');
    const open = panel.dataset.open !== 'true';
    panel.dataset.open = String(open);
    filterToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-open-catalog]').forEach((btn) => btn.addEventListener('click', () => openCatalog(btn)));

  /* ---------- Mock dashboard (benefit 4) ----------
     Daily usage in credits; sums to 32.600 so 115.000 − 32.600 = 82.400 left (Bangun package). */
  const USAGE_7D = [2600, 3900, 5400, 3300, 7200, 4700, 5500];
  const dash = { remind: true, keyActive: true };

  function renderDashboard() {
    const chart = document.querySelector('[data-usage-chart]');
    const daysRow = document.querySelector('[data-usage-days]');
    if (chart && daysRow) {
      const short = t('dashDays').split(',');
      const long = t('dashDaysLong').split(',');
      const max = Math.max(...USAGE_7D);
      chart.replaceChildren(...USAGE_7D.map((v, i) => {
        const li = document.createElement('li');
        li.className = 'group/bar relative flex h-full flex-1 items-end';
        li.dataset.decorOverflow = ''; // value tooltip is intentionally wider than a thin bar
        const peak = v === max;
        // Bar: single hue, 4px rounded data-end anchored to the baseline; peak gets the full tone + a direct label.
        li.innerHTML = `<span class="sr-only">${long[i]}: ${rupiah(v)}</span>
          <span aria-hidden="true" class="mx-auto block w-full max-w-7 rounded-t-[4px] ${peak ? 'bg-xl-blue' : 'bg-xl-blue/55 group-hover/bar:bg-xl-blue/80'}" style="height:${Math.round((v / max) * 100)}%"></span>
          <span aria-hidden="true" class="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-1.5 py-0.5 font-mono text-[11px] text-white
                ${peak ? '' : 'opacity-0 transition-opacity group-hover/bar:opacity-100'}" style="bottom:calc(${Math.round((v / max) * 100)}% + 4px)">${rupiah(v)}</span>`;
        return li;
      }));
      daysRow.replaceChildren(...short.map((d) => {
        const li = document.createElement('li');
        li.className = 'flex-1 text-center text-[11px] font-semibold text-muted';
        li.textContent = d;
        return li;
      }));
    }
    const sw = document.querySelector('[data-switch]');
    if (sw) sw.setAttribute('aria-checked', String(dash.remind));
    const row = document.querySelector('[data-key-row]');
    if (row) {
      row.dataset.active = String(dash.keyActive);
      const status = row.querySelector('[data-key-status]');
      status.textContent = t(dash.keyActive ? 'dashKeyActive' : 'dashKeyInactive');
      status.className = 'rounded-full px-2 py-0.5 text-xs font-extrabold ' + (dash.keyActive ? 'bg-xl-teal/15 text-teal-ink' : 'bg-line text-muted');
      row.querySelector('[data-key-toggle]').textContent = t(dash.keyActive ? 'dashKeyDisable' : 'dashKeyEnable');
    }
  }

  const dashLive = (text) => { const el = document.querySelector('[data-dash-live]'); if (el) el.textContent = text; };
  document.querySelector('[data-switch]')?.addEventListener('click', () => {
    dash.remind = !dash.remind;
    renderDashboard();
    dashLive(t(dash.remind ? 'dashRemindOn' : 'dashRemindOff'));
  });
  document.querySelector('[data-key-toggle]')?.addEventListener('click', () => {
    dash.keyActive = !dash.keyActive;
    renderDashboard();
    dashLive(fill(t('dashKeyAnnounce'), { status: t(dash.keyActive ? 'dashKeyActive' : 'dashKeyInactive').toLowerCase() }));
  });

  /* ---------- Team consultation (G7) ---------- */
  const consultDialog = document.getElementById('consult');
  const consultForm = consultDialog?.querySelector('form');
  const consult = { contact: '' };
  // Use elements.namedItem: `form.name` would return the form's own name attribute, not the input.
  const csField = (n) => consultForm?.elements.namedItem(n);

  function setConsultError(name, key) {
    const msg = consultDialog.querySelector(`[data-cerr="${name}"]`);
    if (msg) { msg.textContent = key ? t(key) : ''; msg.dataset.key = key || ''; msg.classList.toggle('hidden', !key); }
    consultForm.querySelectorAll(`[name="${name}"]`).forEach((el) => el.setAttribute('aria-invalid', String(Boolean(key))));
  }

  function renderConsult() {
    if (!consultDialog) return;
    consultDialog.querySelectorAll('[data-cerr]').forEach((el) => { if (el.dataset.key) el.textContent = t(el.dataset.key); });
    const body = consultDialog.querySelector('[data-cs-success-body]');
    if (body) body.textContent = fill(t('csSuccessBody'), { contact: consult.contact });
  }

  function showConsultPanel(name) {
    consultDialog.querySelectorAll('[data-cs-panel]').forEach((el) => { el.hidden = el.dataset.csPanel !== name; });
    renderConsult();
  }

  const consultModal = consultDialog && setupModal(consultDialog, {
    focus: '#cs-title',
    onClose: () => { if (!consultDialog.querySelector('[data-cs-panel="success"]').hidden) { consultForm.reset(); updateCount(); showConsultPanel('form'); } }
  });

  function updateCount() {
    const n = csField('need').value.length;
    consultDialog.querySelector('[data-cs-count]').textContent = `${n}/500`;
    const live = consultDialog.querySelector('[data-cs-count-live]');
    // Announce only near the limit, not on every keystroke.
    live.textContent = n >= 450 ? fill(t('csCountLive'), { n }) : '';
  }

  csField('need')?.addEventListener('input', updateCount);
  csField('contact')?.addEventListener('blur', () => {
    if (!csField('contact').value.trim()) return;
    const r = parseContact(csField('contact').value);
    setConsultError('contact', r.ok ? null : r.error);
  });
  consultForm?.addEventListener('change', (e) => {
    if (e.target.name === 'teamSize') setConsultError('teamSize', null);
    if (e.target.name === 'consent' && e.target.checked) setConsultError('consent', null);
  });
  consultForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const f = consultForm;
    const contact = parseContact(csField('contact').value);
    const checks = [
      // Same order as on screen, so focus lands on the topmost invalid field.
      ['name', csField('name').value.trim() ? null : 'errName'],
      ['org', csField('org').value.trim() ? null : 'errOrg'],
      ['contact', contact.ok ? null : (contact.error === 'errContactEmpty' ? 'errCsContactEmpty' : contact.error)],
      ['teamSize', csField('teamSize').value ? null : 'errTeamSize'],
      ['consent', csField('consent').checked ? null : 'errConsent']
    ];
    checks.forEach(([name, key]) => setConsultError(name, key));
    const firstBad = checks.find(([, key]) => key);
    if (firstBad) {
      const el = f.querySelector(`[name="${firstBad[0]}"]`);
      el?.focus();
      return;
    }
    consult.contact = contact.value;
    showConsultPanel('success');
    consultDialog.querySelector('#cs-success-title')?.focus();
  });
  consultDialog?.querySelectorAll('[data-cs-close]').forEach((b) => b.addEventListener('click', () => consultModal.close()));
  document.querySelectorAll('[data-open-consult]').forEach((b) => b.addEventListener('click', () => consultModal.open(b)));

  /* ---------- Live chat Nala (G4) — scripted, local only ---------- */
  const chatDialog = document.getElementById('chat');
  const chatLauncher = document.getElementById('chat-launcher');
  const chatLog = chatDialog?.querySelector('[data-chat-log]');
  const chatInput = document.getElementById('chat-input');
  const chatDesktop = window.matchMedia('(min-width: 48rem)'); // Tailwind md
  const TYPING_DELAY = 500; // spec: ≤ 600ms
  // Messages: { from: 'nala'|'sari'|'user'|'system', key?, params?, text?, actions?: [{ key, run }] }
  const chat = { messages: [], chips: 'main', mode: 'bot', flow: null, typing: null, opener: null };

  // Recommendation matrix (docs/technical-spec.md → Live Chat Mock)
  const PICK_MATRIX = {
    learn: { once: 'learn', weekly: 'learn', daily: 'prototype' },
    prototype: { once: 'learn', weekly: 'prototype', daily: 'work' },
    work: { once: 'prototype', weekly: 'work', daily: 'work' }
  };
  const CHIP_SETS = {
    main: ['chipPick', 'chipHowto', 'chipModels', 'chipPay', 'chipTeam'],
    goal: ['intentLearn', 'intentPrototype', 'intentWork'],
    freq: ['freqOnce', 'freqWeekly', 'freqDaily'],
    result: ['chipRestartFlow', 'chipTeam'],
    none: []
  };
  const KEYWORDS = [ // free text → intent (ID + EN)
    ['team', /\b(tim|team|manusia|human|agen|agent|cs|admin|orang)\b/i],
    ['pick', /\b(paket|package|pilih|choose|berapa|how much|rekomendasi|recommend)\b/i],
    ['howto', /\b(api|key|tool|pasang|setup|cursor|cline|continue|cara pakai)\b/i],
    ['models', /\b(model|claude|gpt|gemini|deepseek|qwen)\b/i],
    ['pay', /\b(bayar|pay|payment|qris|e-?wallet|virtual account|va|dana|gopay|ovo)\b/i]
  ];

  function teamOnline() {
    const forced = new URLSearchParams(location.search).get('chat'); // QA override: ?chat=online|offline
    if (forced === 'online') return true;
    if (forced === 'offline') return false;
    const now = new Date();
    const wib = new Date(now.getTime() + (now.getTimezoneOffset() + 7 * 60) * 60000); // UTC+7
    const day = wib.getDay();
    const hour = wib.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

  function bubble(msg) {
    const li = document.createElement('div');
    const text = msg.text ?? fill(t(msg.key), Object.fromEntries(Object.entries(msg.params || {}).map(([k, v]) => [k, typeof v === 'function' ? v() : v])));
    if (msg.from === 'system') {
      li.className = 'text-center text-xs font-semibold text-muted';
      li.textContent = text;
      return li;
    }
    const mine = msg.from === 'user';
    li.className = `flex ${mine ? 'justify-end' : 'items-end gap-2'}`;
    if (!mine) {
      const av = msg.from === 'sari'
        ? '<span aria-hidden="true" class="grid size-7 shrink-0 place-items-center rounded-full bg-xl-teal text-xs font-extrabold text-xl-dark">S</span>'
        : '<img src="assets/tokennyala-mark.svg" alt="" width="28" height="28" class="size-7 shrink-0 rounded-full">';
      li.insertAdjacentHTML('beforeend', av);
    }
    const box = document.createElement('div');
    box.className = `max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${mine ? 'rounded-br-md bg-xl-blue text-white' : 'rounded-bl-md border border-line bg-white text-ink'}`;
    if (msg.from === 'sari') {
      box.insertAdjacentHTML('beforeend', `<span class="mb-1 flex items-center gap-1.5 text-xs font-extrabold text-xl-dark">${t('agentName')}<span class="rounded-full bg-xl-teal/15 px-1.5 py-px text-[10px] text-teal-ink">${t('agentBadge')}</span></span>`);
    }
    const p = document.createElement('p');
    p.textContent = text;
    // Screen readers: say who is speaking
    const who = document.createElement('span');
    who.className = 'sr-only';
    who.textContent = mine ? '' : (msg.from === 'sari' ? `${t('agentName')}: ` : `${t('chatName')}: `);
    p.prepend(who);
    box.append(p);
    (msg.actions || []).forEach((a) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-primary mt-2.5 min-h-11 w-full text-sm';
      b.textContent = t(a.key);
      b.addEventListener('click', a.run);
      box.append(b);
    });
    li.append(box);
    return li;
  }

  function renderChat() {
    if (!chatDialog) return;
    const items = chat.messages.map(bubble);
    if (chat.typing) {
      const li = document.createElement('div');
      li.className = 'text-xs font-semibold text-muted';
      li.textContent = t(chat.typing);
      items.push(li);
    }
    chatLog.replaceChildren(...items);

    const chips = chatDialog.querySelector('[data-chat-chips]');
    chips.replaceChildren(...CHIP_SETS[chat.chips].map((key) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-xl-blue/40 bg-white px-3.5 text-sm font-bold text-xl-blue hover:bg-xl-blue hover:text-white';
      b.textContent = t(key);
      b.addEventListener('click', () => handleUser(t(key), key));
      return b;
    }));

    const team = chat.mode === 'team';               // a (simulated) human is in the chat
    const offline = chat.mode.startsWith('offline'); // team unavailable; Nala collects a contact
    chatDialog.querySelector('[data-chat-title]').textContent = t('chatName');
    chatDialog.querySelector('[data-chat-status]').textContent = team ? t('agentStatus') : t('chatStatus');
    const label = chatDialog.querySelector('[data-chat-mode-label]');
    label.dataset.show = String(team || offline);
    label.textContent = team ? `${t('teamModeLabel')} · ${t('teamHours')}` : t('teamHours');
    chatDialog.querySelector('[data-chat-input-label]').textContent = chat.mode === 'offline' ? t('chatPlaceholderContact') : t('chatInputLabel');
    chatInput.placeholder = chat.mode === 'offline' ? t('chatPlaceholderContact') : t('chatPlaceholder');
    chatInput.setAttribute('inputmode', chat.mode === 'offline' ? 'email' : 'text');
    // Scroll last: the chip row above the input changes height, which changes the log's height.
    requestAnimationFrame(() => { chatLog.scrollTop = chatLog.scrollHeight; });
  }

  /** Show a typing line, then append the reply. */
  function reply(msgs, { chips = 'main', typing = 'typingNala' } = {}) {
    chat.chips = 'none';
    chat.typing = typing;
    renderChat();
    setTimeout(() => {
      chat.typing = null;
      chat.messages.push(...[].concat(msgs));
      chat.chips = chips;
      renderChat();
    }, TYPING_DELAY);
  }

  function startPick() { chat.flow = { name: 'pick' }; reply({ from: 'nala', key: 'pickQ1' }, { chips: 'goal' }); }

  function goTeam() {
    chat.flow = null;
    chat.messages.push({ from: 'system', key: 'teamConnecting' });
    if (teamOnline()) {
      chat.mode = 'team';
      reply({ from: 'sari', key: 'agentGreeting' }, { chips: 'none', typing: 'typingSari' });
    } else {
      chat.mode = 'offline';
      reply({ from: 'nala', key: 'teamOffline' }, { chips: 'none' });
    }
  }

  const leaveChatThen = (fn) => () => { closeChat({ returnFocus: false }); setTimeout(fn, 0); };

  function handleUser(text, chipKey = null) {
    const value = text.trim();
    if (!value) return;
    chat.messages.push({ from: 'user', text: value });

    // Offline: the input collects a contact
    if (chat.mode === 'offline') {
      const c = parseContact(value);
      if (!c.ok) { reply({ from: 'nala', key: c.error === 'errContactEmpty' ? 'errCsContactEmpty' : c.error }, { chips: 'none' }); return; }
      chat.mode = 'offline-done';
      reply({ from: 'nala', key: 'teamOfflineThanks', params: { contact: c.value } }, { chips: 'main' });
      return;
    }
    if (chat.mode === 'team') { reply({ from: 'sari', key: 'agentReply' }, { chips: 'none', typing: 'typingSari' }); return; }

    const has = (re) => re.test(value);
    // Inside the "Bantu pilih paket" flow
    if (chat.flow?.name === 'pick' && !chat.flow.goal) {
      const goal = chipKey === 'intentLearn' || has(/belajar|learn/i) ? 'learn'
        : chipKey === 'intentPrototype' || has(/proto/i) ? 'prototype'
        : chipKey === 'intentWork' || has(/kerja|work|klien|client/i) ? 'work' : null;
      if (goal) { chat.flow.goal = goal; reply({ from: 'nala', key: 'pickQ2' }, { chips: 'freq' }); return; }
    } else if (chat.flow?.name === 'pick' && chat.flow.goal) {
      const freq = chipKey === 'freqOnce' || has(/sesekali|jarang|occasion|once/i) ? 'once'
        : chipKey === 'freqWeekly' || has(/minggu|week/i) ? 'weekly'
        : chipKey === 'freqDaily' || has(/hari|daily|day/i) ? 'daily' : null;
      if (freq) {
        const pkg = packages[PICK_MATRIX[chat.flow.goal][freq]];
        chat.flow = null;
        reply({
          from: 'nala', key: 'pickResult',
          params: { name: pkg.name, price: () => rupiah(pkg.amount), estimate: () => t(`pkgEstimate_${pkg.id}`) },
          actions: [{ key: 'pickChoose', run: leaveChatThen(() => openCheckout(pkg.id, chatLauncher)) }]
        }, { chips: 'result' });
        return;
      }
    }

    const intent = { chipPick: 'pick', chipRestartFlow: 'pick', chipHowto: 'howto', chipModels: 'models', chipPay: 'pay', chipTeam: 'team' }[chipKey]
      ?? KEYWORDS.find(([, re]) => has(re))?.[0];
    chat.flow = null;
    if (intent === 'pick') return startPick();
    if (intent === 'team') return goTeam();
    if (intent === 'howto') return reply({ from: 'nala', key: 'ansHowto', actions: [{ key: 'successGuide', run: leaveChatThen(() => goToSection('pakai')) }] });
    if (intent === 'models') return reply({ from: 'nala', key: 'ansModels', actions: [{ key: 'ansModelsBtn', run: leaveChatThen(() => openCatalog(chatLauncher)) }] });
    if (intent === 'pay') return reply({ from: 'nala', key: 'ansPay' });
    reply({ from: 'nala', key: 'ansFallback' });
  }

  function resetChat() {
    chat.messages = [{ from: 'nala', key: 'chatGreeting' }];
    chat.chips = 'main'; chat.mode = 'bot'; chat.flow = null; chat.typing = null;
    renderChat();
  }

  function openChat(opener = document.activeElement) {
    if (!chatDialog) return;
    // Only one overlay at a time: close any open modal first (checkout keeps its package choice).
    document.querySelectorAll('dialog[open]').forEach((d) => { if (d !== chatDialog) d.close(); });
    if (state.menuOpen) setMenu(false);
    chat.opener = opener;
    if (!chat.messages.length) resetChat();
    if (chatDesktop.matches) chatDialog.show(); // non-modal panel: page stays usable
    else { chatDialog.showModal(); document.documentElement.classList.add('overflow-hidden'); }
    chatLauncher?.setAttribute('aria-expanded', 'true');
    renderChat();
    chatInput?.focus();
  }

  function closeChat({ returnFocus = true } = {}) {
    if (!chatDialog?.open) return;
    chat.skipFocusReturn = !returnFocus;
    chatDialog.close();
  }

  chatDialog?.addEventListener('close', () => {
    document.documentElement.classList.remove('overflow-hidden');
    chatLauncher?.setAttribute('aria-expanded', 'false');
    if (!chat.skipFocusReturn && focusIsFree(chatDialog)) chatLauncher?.focus();
    chat.skipFocusReturn = false;
  });
  // Escape: native for the modal (mobile); handle it for the non-modal panel (desktop).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !chatDialog?.open || chatDialog.matches(':modal')) return;
    if (document.querySelector('dialog:modal') || state.menuOpen) return; // let the topmost layer handle it
    e.preventDefault();
    closeChat();
  });
  chatDialog?.querySelector('[data-chat-close]')?.addEventListener('click', () => closeChat());
  chatDialog?.querySelector('[data-chat-restart]')?.addEventListener('click', () => { resetChat(); chatInput.focus(); });
  chatDialog?.querySelector('[data-chat-form]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = chatInput.value;
    chatInput.value = '';
    handleUser(v);
  });
  // Switching between phone and desktop layouts while open: reopen in the right mode.
  chatDesktop.addEventListener('change', () => { if (chatDialog?.open) { chat.skipFocusReturn = true; chatDialog.close(); openChat(chat.opener); } });
  document.querySelectorAll('[data-open-chat]').forEach((b) => b.addEventListener('click', () => openChat(b)));

  // On phones the floating launcher covers the hero board, so it appears once the hero scrolls away.
  // FAQ ("Tanya Nala") and checkout keep their own entry points meanwhile.
  const hero = document.querySelector('section[aria-labelledby="hero-title"]');
  if (chatLauncher && hero && 'IntersectionObserver' in window) {
    const phone = window.matchMedia('(max-width: 39.99rem)'); // below Tailwind sm
    let heroVisible = true;
    const syncLauncher = () => {
      const hide = phone.matches && heroVisible;
      chatLauncher.dataset.offscreen = String(hide);
      chatLauncher.inert = hide;
    };
    new IntersectionObserver(([entry]) => { heroVisible = entry.intersectionRatio > 0.35; syncLauncher(); }, { threshold: [0, 0.35, 1] }).observe(hero);
    phone.addEventListener('change', syncLauncher);
  }

  document.querySelectorAll('[data-open-checkout]').forEach((btn) => {
    btn.addEventListener('click', () => openCheckout(null, btn));
  });

  // Exposed for upcoming sections and manual testing in the console.
  window.TokenNyala = { selectPackage, setIntent, openCheckout, openCatalog, openConsult: (from) => consultModal?.open(from), openChat, packages, models };

  /* ---------- Mobile menu ---------- */
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('mobile-menu');
  const desktopQuery = window.matchMedia('(min-width: 64rem)'); // Tailwind lg

  function syncMenuLabel() {
    if (!menuButton) return;
    menuButton.setAttribute('aria-label', state.menuOpen ? t('menuClose') : t('menuOpen'));
  }

  function setMenu(open, { returnFocus = false } = {}) {
    if (!menuButton || !menu) return;
    state.menuOpen = open;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.menu-icon-open')?.classList.toggle('hidden', open);
    menuButton.querySelector('.menu-icon-close')?.classList.toggle('hidden', !open);
    syncMenuLabel();
    if (!open && returnFocus) menuButton.focus();
  }

  menuButton?.addEventListener('click', () => setMenu(!state.menuOpen));

  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.menuOpen) setMenu(false, { returnFocus: true });
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches && state.menuOpen) setMenu(false);
  });

  /* ---------- Language buttons ---------- */
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  /* ---------- Placeholder legal links ---------- */
  document.querySelectorAll('[data-mock-link]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  /* ---------- Init ---------- */
  const saved = storage.get(LANG_KEY);
  setLanguage(saved && copy[saved] ? saved : 'id');
})();
