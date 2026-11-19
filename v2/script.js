/* =========================================================
   TokenNyala — interactions
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------------------------------------------------
     Data
     --------------------------------------------------------- */
  const PACKAGES = {
    learn: { id: 'learn', amount: 50000, bonus: 5000, name: 'Mulai', estimate: { id: '20–30 sesi kecil', en: '20–30 small sessions' } },
    prototype: { id: 'prototype', amount: 100000, bonus: 15000, name: 'Bangun', estimate: { id: '40–60 sesi kecil', en: '40–60 small sessions' } },
    work: { id: 'work', amount: 250000, bonus: 50000, name: 'Scale', estimate: { id: '100+ sesi kecil', en: '100+ small sessions' } },
  };
  const PACKAGE_ORDER = ['learn', 'prototype', 'work'];
  const METER_MAX = 300000; // largest package credits (Scale) = full meter

  const SMALL_SESSION = { inputTokens: 40000, outputTokens: 4000 };

  const MODELS = [
    { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'DeepSeek', uses: ['coding', 'chat'], input: 4500, output: 18000, context: '128K' },
    { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google', uses: ['chat', 'analysis'], input: 5000, output: 20000, context: '1M' },
    { id: 'qwen-plus', name: 'Qwen Plus', provider: 'Alibaba', uses: ['chat'], input: 6000, output: 24000, context: '128K' },
    { id: 'gpt-mini', name: 'GPT Mini', provider: 'OpenAI', uses: ['chat'], input: 6500, output: 26000, context: '400K' },
    { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', provider: 'DeepSeek', uses: ['analysis', 'coding'], input: 9000, output: 36000, context: '128K' },
    { id: 'claude-haiku', name: 'Claude Haiku', provider: 'Anthropic', uses: ['chat', 'coding'], input: 15000, output: 75000, context: '200K' },
    { id: 'qwen-max', name: 'Qwen Max', provider: 'Alibaba', uses: ['coding', 'chat'], input: 20000, output: 80000, context: '256K' },
    { id: 'gpt', name: 'GPT', provider: 'OpenAI', uses: ['coding', 'chat'], input: 25000, output: 150000, context: '400K' },
    { id: 'claude-sonnet', name: 'Claude Sonnet', provider: 'Anthropic', uses: ['coding', 'analysis'], input: 31500, output: 157500, context: '1M' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', uses: ['coding', 'analysis'], input: 31500, output: 189000, context: '1M' },
    { id: 'claude-opus', name: 'Claude Opus', provider: 'Anthropic', uses: ['coding'], input: 78750, output: 393750, context: '1M' },
    { id: 'gpt-pro', name: 'GPT Pro', provider: 'OpenAI', uses: ['analysis'], input: 150000, output: 600000, context: '400K' },
  ].map((m) => {
    const sessionCost = (SMALL_SESSION.inputTokens / 1e6) * m.input + (SMALL_SESSION.outputTokens / 1e6) * m.output;
    const level = sessionCost < 1000 ? 'budget' : sessionCost <= 3000 ? 'balanced' : 'premium';
    return { ...m, sessionCost, per10k: Math.floor(10000 / sessionCost), level };
  });
  const PREVIEW_MODELS = ['claude-sonnet', 'gpt', 'gemini-pro', 'deepseek-chat', 'qwen-plus', 'claude-opus'];

  const USAGE = [2600, 3900, 5400, 3300, 7200, 4700, 5500];

  /* ---------------------------------------------------------
     Copy (dynamic strings only — static copy lives in HTML)
     --------------------------------------------------------- */
  const T = {
    id: {
      locale: 'id-ID',
      intents: { learn: 'Belajar', prototype: 'Prototype', work: 'Kerja' },
      fit: { learn: 'Untuk belajar', prototype: 'Untuk prototype', work: 'Untuk kerja' },
      pkgFor: { learn: 'Belajar dan mencoba pertama kali', prototype: 'Membuat satu prototype aktif', work: 'Freelancer atau proyek yang berkelanjutan' },
      pkgHelper: {
        learn: 'Cocok untuk memahami alur atau menyelesaikan satu mini-task.',
        prototype: 'Cocok untuk iterasi tampilan, prompt, dan perbaikan singkat.',
        work: 'Cocok saat kamu mulai mengerjakan kebutuhan klien atau banyak iterasi.',
      },
      estimateLong: { learn: 'Sekitar 20–30 sesi kecil', prototype: 'Sekitar 40–60 sesi kecil', work: '100+ sesi kecil atau beberapa proyek ringan' },
      reco: {
        learn: (p) => `Untuk belajar dan proyek pertama, <b>paket ${p.name}</b> adalah titik awal yang ringan — coba satu proyek kecil.`,
        prototype: (p) => `Untuk prototype, <b>paket ${p.name}</b> paling pas — iterasi satu prototype aktif sampai jadi.`,
        work: (p) => `Untuk kerja, <b>paket ${p.name}</b> memberi ruang untuk kebutuhan proyek berkelanjutan.`,
      },
      badgeReco: 'Paling pas',
      selected: '● Terpilih',
      bonus: (v) => `+ Bonus ${v}`,
      pick: (v) => `Pilih ${v}`,
      continueTo: (v) => `Lanjutkan ${v}`,
      credits: (c) => `${c} kredit (nominal + bonus) · ilustratif`,
      meterLabel: (c) => `Meter saldo: ${c} kredit`,
      payTo: (v) => `Lanjut bayar ${v}`,
      levels: { budget: 'Hemat', balanced: 'Seimbang', premium: 'Premium' },
      uses: { coding: 'Coding', chat: 'Chat & menulis', analysis: 'Analisis dokumen' },
      perUnit: 'sesi kecil / Rp10.000',
      rateDetails: 'Detail tarif',
      ratesPer: 'Tarif per 1 jt token',
      input: 'Input', output: 'Output', context: 'Konteks',
      creditsUnit: 'kredit', tokensUnit: 'token',
      ctx: (c) => c.replace('K', ' rb').replace('M', ' jt'),
      filterUse: 'Kegunaan', filterLevel: 'Level biaya', filterProvider: 'Penyedia',
      showing: (a, b) => `Menampilkan ${a} dari ${b} model`,
      boardStandby: 'Menunggu saldo', boardOn: 'Nyala', boardPick: 'Pilih paket untuk mengisi',
      copy: 'Salin', copied: 'Tersalin', copiedAnnounce: 'Tersalin ke papan klip',
      copyKey: 'Salin API key',
      keyActive: 'Aktif', keyInactive: 'Nonaktif', keyDisable: 'Nonaktifkan', keyEnable: 'Aktifkan',
      keyAnnounce: (on) => (on ? 'API key Laptop kerja aktif' : 'API key Laptop kerja dinonaktifkan'),
      reminderAnnounce: (on) => (on ? 'Pengingat saldo menyala' : 'Pengingat saldo dimatikan'),
      days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      daysLong: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      errContactEmpty: 'Masukkan email atau nomor HP agar bukti pembelian bisa dikirim.',
      errEmail: 'Format email belum sesuai. Coba cek lagi alamatnya.',
      errPhone: 'Nomor HP belum sesuai. Gunakan format 08xx atau +628xx.',
      errPay: 'Pilih satu metode pembayaran untuk melanjutkan.',
      qrisTitle: 'Tunggu konfirmasi QRIS', qrisBody: 'Pindai kode mock untuk melihat alur pembayaran.', qrisAlt: 'Kode QR contoh (bukan QR asli)',
      vaTitle: 'Transfer ke virtual account', vaBody: 'Nomor ini dibuat lokal untuk simulasi. Jangan ditransfer.',
      ewTitle: 'Pilih e-wallet', ewBody: 'Kamu akan diarahkan ke aplikasi e-wallet pada produk nyata.',
      totalPay: 'Total bayar',
      successBody: (pkg, contact) => `Paket ${pkg} sudah tercatat di simulasi ini. Bukti pembelian dikirim ke ${contact}.`,
      menuOpen: 'Buka menu', menuClose: 'Tutup menu',
      csErrName: 'Nama wajib diisi.', csErrOrg: 'Nama tim atau perusahaan wajib diisi.',
      csErrContact: 'Masukkan email atau nomor HP agar kami bisa menghubungimu.',
      csErrSize: 'Pilih ukuran tim.', csErrAgree: 'Centang persetujuan untuk melanjutkan.',
      csSuccess: (c) => `Tim kami menghubungi kamu di ${c} dalam 1 hari kerja.`,
      mockLink: 'Halaman ini contoh (mock) pada prototype.',
      sticker: 'SALDO AI · NYALA SEKARANG · LANJUT BANGUN · ',
      faq: [
        ['Kapan saldo aktif?', 'Pada produk nyata, saldo dapat aktif setelah pembayaran dikonfirmasi. Pada prototype ini, tombol konfirmasi hanya menampilkan status sukses simulasi.'],
        ['Model AI apa saja yang bisa dipakai?', 'Satu saldo bisa dipakai untuk semua model yang tersedia, misalnya Claude, GPT, Gemini, DeepSeek, dan Qwen. Paket apa pun, pilihan modelnya sama. Model hemat membuat saldo lebih awet; model premium lebih kuat untuk tugas rumit.'],
        ['Apakah saldo bisa kedaluwarsa?', 'Tidak. Saldo dan bonus kredit tidak kedaluwarsa. Saldo tidak bisa diuangkan atau dipindahkan ke akun lain.'],
        ['Apakah harga sudah termasuk PPN?', 'Ya. Harga paket sudah termasuk PPN. 1 kredit setara Rp1.'],
        ['Berapa banyak sesi yang bisa digunakan?', 'Tidak ada angka pasti karena panjang prompt, model, dan format output memengaruhi penggunaan. Estimasi di halaman adalah contoh berdasarkan kebutuhan kecil.'],
        ['Apakah saldo terpotong kalau permintaan gagal?', 'Tidak. Permintaan yang gagal dan tidak menghasilkan jawaban tidak memotong saldo.'],
        ['Metode apa yang tersedia?', 'Konsep checkout mencakup QRIS, e-wallet, dan virtual account.'],
        ['Bisakah refund atau batal?', 'Pembayaran yang belum selesai bisa dibatalkan kapan saja. Saldo yang sudah masuk tidak bisa diuangkan. Kebijakan refund lengkap akan ditetapkan sebelum peluncuran; prototype ini tidak memproses transaksi nyata.'],
        ['Ke mana data prompt saya dikirim?', 'Prompt dikirim ke penyedia model yang kamu pilih untuk diproses, dan bisa diproses di pusat data di luar Indonesia. Kami tidak memakai prompt atau hasilnya untuk melatih model. Pada prototype ini tidak ada data yang dikirim.'],
        ['Bagaimana kalau API key saya bocor?', 'Nonaktifkan API key itu dari halaman saldo, lalu buat yang baru. Semua pemakaian lewat API key memotong saldomu, jadi simpan seperti kata sandi.'],
        ['Bisakah membeli untuk tim?', 'Bisa. Untuk tim, kami bantu siapkan invoice atas nama perusahaan, faktur pajak, dan pemantauan pemakaian per anggota. Klik "Konsultasi untuk tim" dan kami hubungi dalam 1 hari kerja.'],
      ],
    },
    en: {
      locale: 'en-US',
      intents: { learn: 'Learn', prototype: 'Prototype', work: 'Work' },
      fit: { learn: 'For learning', prototype: 'For prototypes', work: 'For work' },
      pkgFor: { learn: 'Learning and trying it for the first time', prototype: 'Building one active prototype', work: 'Freelancers or ongoing projects' },
      pkgHelper: {
        learn: 'Good for understanding the flow or finishing one mini task.',
        prototype: 'Good for iterating on layout, prompts, and quick fixes.',
        work: 'Good when you start handling client work or lots of iterations.',
      },
      estimateLong: { learn: 'About 20–30 small sessions', prototype: 'About 40–60 small sessions', work: '100+ small sessions or a few light projects' },
      reco: {
        learn: (p) => `For learning and first projects, the <b>${p.name} package</b> is a light place to start — try one small project.`,
        prototype: (p) => `For prototypes, the <b>${p.name} package</b> fits best — iterate on one active prototype until it ships.`,
        work: (p) => `For work, the <b>${p.name} package</b> gives you room for ongoing project needs.`,
      },
      badgeReco: 'Best fit',
      selected: '● Selected',
      bonus: (v) => `+ ${v} bonus`,
      pick: (v) => `Choose ${v}`,
      continueTo: (v) => `Continue with ${v}`,
      credits: (c) => `${c} credits (price + bonus) · illustrative`,
      meterLabel: (c) => `Balance meter: ${c} credits`,
      payTo: (v) => `Continue to pay ${v}`,
      levels: { budget: 'Budget', balanced: 'Balanced', premium: 'Premium' },
      uses: { coding: 'Coding', chat: 'Chat & writing', analysis: 'Document analysis' },
      perUnit: 'small sessions / Rp10,000',
      rateDetails: 'Rate details',
      ratesPer: 'Rates per 1M tokens',
      input: 'Input', output: 'Output', context: 'Context',
      creditsUnit: 'credits', tokensUnit: 'tokens',
      ctx: (c) => c,
      filterUse: 'Use', filterLevel: 'Cost level', filterProvider: 'Provider',
      showing: (a, b) => `Showing ${a} of ${b} models`,
      boardStandby: 'Waiting for balance', boardOn: 'Nyala', boardPick: 'Pick a package to fill',
      copy: 'Copy', copied: 'Copied', copiedAnnounce: 'Copied to clipboard',
      copyKey: 'Copy API key',
      keyActive: 'Active', keyInactive: 'Disabled', keyDisable: 'Disable', keyEnable: 'Enable',
      keyAnnounce: (on) => (on ? 'Work laptop API key enabled' : 'Work laptop API key disabled'),
      reminderAnnounce: (on) => (on ? 'Balance reminder on' : 'Balance reminder off'),
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      daysLong: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      errContactEmpty: 'Enter your email or phone number so we can send your receipt.',
      errEmail: "That email doesn't look right. Please check it again.",
      errPhone: "That phone number doesn't look right. Use 08xx or +628xx.",
      errPay: 'Choose a payment method to continue.',
      qrisTitle: 'Waiting for QRIS confirmation', qrisBody: 'Scan the mock code to see the payment flow.', qrisAlt: 'Sample QR code (not a real QR)',
      vaTitle: 'Transfer to virtual account', vaBody: 'This number is generated locally for the simulation. Do not transfer.',
      ewTitle: 'Choose an e-wallet', ewBody: 'In the real product you would be sent to the e-wallet app.',
      totalPay: 'Total',
      successBody: (pkg, contact) => `Package ${pkg} is recorded in this simulation. Receipt sent to ${contact}.`,
      menuOpen: 'Open menu', menuClose: 'Close menu',
      csErrName: 'Name is required.', csErrOrg: 'Team or company name is required.',
      csErrContact: 'Enter your email or phone number so we can reach you.',
      csErrSize: 'Choose a team size.', csErrAgree: 'Tick the agreement to continue.',
      csSuccess: (c) => `Our team will contact you at ${c} within 1 business day.`,
      mockLink: 'This page is a mock in the prototype.',
      sticker: 'AI BALANCE · SWITCH ON NOW · KEEP BUILDING · ',
      faq: [
        ['When is my balance active?', 'In the real product, your balance becomes active once payment is confirmed. In this prototype, the confirm button only shows a simulated success state.'],
        ['Which AI models can I use?', 'One balance works with every available model, for example Claude, GPT, Gemini, DeepSeek, and Qwen. Every package gets the same models. Budget models make your balance last longer; premium models are stronger for complex tasks.'],
        ['Does my balance expire?', "No. Balance and bonus credit never expire. Balance can't be cashed out or moved to another account."],
        ['Are prices tax-inclusive?', 'Yes. Package prices include VAT (PPN). 1 credit equals Rp1.'],
        ['How many sessions do I get?', "There's no fixed number: prompt length, model, and output format all affect usage. The estimates on this page are examples based on small tasks."],
        ['Am I charged if a request fails?', "No. Failed requests that don't return an answer don't use your balance."],
        ['Which payment methods are available?', 'The checkout concept covers QRIS, e-wallets, and virtual accounts.'],
        ['Can I get a refund or cancel?', "Unfinished payments can be cancelled anytime. Balance that's already added can't be cashed out. The full refund policy will be set before launch; this prototype processes no real transactions."],
        ['Where is my prompt data sent?', "Prompts are sent to the model provider you choose for processing, and may be processed in data centers outside Indonesia. We don't use prompts or outputs to train models. In this prototype, no data is sent."],
        ['What if my API key leaks?', 'Disable that API key from your balance page, then create a new one. All usage through an API key draws from your balance, so keep it like a password.'],
        ['Can I buy for a team?', 'Yes. For teams we set up invoices in your company\'s name, tax invoices, and per-member usage tracking. Click "Talk to us about your team" and we\'ll reply within 1 business day.'],
      ],
    },
  };

  /* ---------------------------------------------------------
     State + helpers
     --------------------------------------------------------- */
  const state = {
    lang: root.lang === 'en' ? 'en' : 'id',
    intent: 'prototype',
    selected: 'prototype',
    hasPicked: false,
    keyActive: true,
    catalog: { query: '', use: new Set(), level: new Set(), provider: new Set(), limit: 6 },
    checkout: { pkg: 'prototype', contact: '', pay: null, wallet: null, apiKey: '' },
  };
  const t = () => T[state.lang];
  const fmt = (n) => new Intl.NumberFormat(t().locale).format(n);
  const rp = (n) => `Rp${fmt(n)}`;
  const rpShort = (n) => (state.lang === 'en' ? `Rp${n / 1000}K` : `Rp${n / 1000}rb`);
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 2200);
  }

  /* ---------------------------------------------------------
     Language
     --------------------------------------------------------- */
  function setLang(lang, persist = true) {
    state.lang = lang;
    root.lang = lang;
    if (persist) { try { localStorage.setItem('tn-lang', lang); } catch (e) { /* storage unavailable */ } }
    $$('.lang-switch__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('[data-ph-id]').forEach((el) => { el.placeholder = el.dataset[lang === 'en' ? 'phEn' : 'phId']; });
    $$('[data-aria-id]').forEach((el) => el.setAttribute('aria-label', el.dataset[lang === 'en' ? 'ariaEn' : 'ariaId']));
    const sticker = $('.sticker textPath');
    if (sticker) sticker.textContent = t().sticker;
    renderAll();
    document.dispatchEvent(new CustomEvent('tn:lang'));
  }
  $$('.lang-switch__btn').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------------------------------------------------------
     Packages — "The Switch Turns On"
     --------------------------------------------------------- */
  const intentTabs = $$('.intent__tab');
  let shownPrice = null;

  function animatePrice(to) {
    const el = $('#pkgPrice');
    const from = shownPrice;
    shownPrice = to;
    if (from === null || from === to || prefersReducedMotion) { el.textContent = fmt(to); return; }
    const t0 = performance.now(); const dur = 420;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round((from + (to - from) * e) / 1000) * 1000);
      if (p < 1 && shownPrice === to) requestAnimationFrame(step);
      else if (shownPrice === to) el.textContent = fmt(to);
    };
    requestAnimationFrame(step);
  }

  function renderPackages() {
    updatePackageUI(false);
  }

  function updatePackageUI(animate = true) {
    const c = t();
    const reco = state.intent;
    const sel = PACKAGES[state.selected];
    // single package sheet
    $('#pkgFit').textContent = c.fit[sel.id];
    $('#pkgName').textContent = sel.name;
    animatePrice(sel.amount);
    $('#pkgFor').textContent = c.pkgFor[sel.id];
    $('#pkgEst').textContent = c.estimateLong[sel.id];
    $('#pkgBonus').textContent = `+${rp(sel.bonus)}`;
    $('#pkgCredits').textContent = `${fmt(sel.amount + sel.bonus)} ${c.creditsUnit}`;
    // marker
    const idx = PACKAGE_ORDER.indexOf(state.intent);
    $('#intentMarker').style.setProperty('--i', idx);
    intentTabs.forEach((tab) => {
      const on = tab.dataset.intent === state.intent;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    $('#pkgPanel').setAttribute('aria-labelledby', `tab-${state.intent}`);
    // reco line
    const line = $('#recoLine');
    line.innerHTML = `${c.reco[reco](PACKAGES[reco])} ${c.pkgHelper[sel.id]}`;
    const sheet = $('#pkgSheet');
    if (animate) { sheet.classList.remove('is-swapping'); void sheet.offsetWidth; sheet.classList.add('is-swapping'); }
    // meter
    const credits = sel.amount + sel.bonus;
    const v = credits / METER_MAX;
    $('#recoMeter').style.setProperty('--v', v);
    $('#recoSpark').style.left = `${v * 100}%`;
    $('#recoCredits').textContent = c.credits(fmt(credits));
    $('#recoMeterLabel').setAttribute('aria-label', c.meterLabel(fmt(credits)));
    // CTA
    $('#pkgContinue').innerHTML = `${c.continueTo(rp(sel.amount))} <span class="btn__icon" aria-hidden="true">→</span>`;
    $('#pkgContinue').dataset.openCheckout = state.selected;
    updateBoard();
  }

  function selectIntent(intent, focus = false) {
    state.intent = intent;
    state.selected = intent;
    state.hasPicked = true;
    updatePackageUI(true);
    if (focus) $(`#tab-${intent}`).focus();
  }
  intentTabs.forEach((tab) => {
    tab.addEventListener('click', () => selectIntent(tab.dataset.intent));
    tab.addEventListener('keydown', (e) => {
      const i = PACKAGE_ORDER.indexOf(state.intent);
      let next = null;
      if (e.key === 'ArrowRight') next = PACKAGE_ORDER[(i + 1) % 3];
      if (e.key === 'ArrowLeft') next = PACKAGE_ORDER[(i + 2) % 3];
      if (e.key === 'Home') next = PACKAGE_ORDER[0];
      if (e.key === 'End') next = PACKAGE_ORDER[2];
      if (next) { e.preventDefault(); selectIntent(next, true); }
    });
  });

  /* Hero board reacts to the chosen package */
  function updateBoard() {
    const c = t();
    const status = $('[data-board-status]');
    if (!state.hasPicked) {
      $('[data-board-balance]').textContent = 'Rp0';
      $('[data-board-meter]').style.setProperty('--v', 0);
      $('[data-board-estimate]').textContent = c.boardPick;
      $('[data-board-status-text]').textContent = c.boardStandby;
      status.classList.remove('is-on');
      return;
    }
    const p = PACKAGES[state.selected];
    $('[data-board-balance]').textContent = rp(p.amount);
    $('[data-board-meter]').style.setProperty('--v', (p.amount + p.bonus) / METER_MAX);
    $('[data-board-estimate]').textContent = `≈ ${p.estimate[state.lang]}`;
    $('[data-board-status-text]').textContent = c.boardOn;
    status.classList.add('is-on');
  }

  /* ---------------------------------------------------------
     Models
     --------------------------------------------------------- */
  const LEVEL_BADGE = { budget: 'badge--teal', balanced: 'badge--sky', premium: 'badge--yellow' };
  // Product logos (Lobe Icons, MIT) keyed by provider
  const MODEL_LOGOS = { Anthropic: 'claude', OpenAI: 'openai', Google: 'gemini', DeepSeek: 'deepseek', Alibaba: 'qwen' };
  const modelLogo = (m) => `<img src="assets/models/${MODEL_LOGOS[m.provider]}.svg" alt="" width="24" height="24" loading="lazy" decoding="async">`;

  function modelMeta(m) {
    const c = t();
    return `${m.provider} · ${m.uses.map((u) => c.uses[u]).join(' · ')}`;
  }
  function rateList(m) {
    const c = t();
    return `<dt>${c.input}</dt><dd>${fmt(m.input)} ${c.creditsUnit}</dd>
            <dt>${c.output}</dt><dd>${fmt(m.output)} ${c.creditsUnit}</dd>
            <dt>${c.context}</dt><dd>${c.ctx(m.context)} ${c.tokensUnit}</dd>`;
  }

  function renderModelIndex() {
    const c = t();
    $('#modelList').innerHTML = PREVIEW_MODELS.map((id) => MODELS.find((m) => m.id === id)).map((m) => `
      <details class="mrow" role="listitem">
        <summary data-cursor="${state.lang === 'en' ? 'Rates' : 'Tarif'}">
          <span class="mrow__icon" aria-hidden="true">${modelLogo(m)}</span>
          <span class="mrow__name">${m.name}</span>
          <span class="mrow__meta">${modelMeta(m)}</span>
          <span class="badge ${LEVEL_BADGE[m.level]} mrow__badge">${c.levels[m.level]}</span>
          <span class="mrow__per"><strong>≈ ${m.per10k}</strong><span>${c.perUnit}</span></span>
          <span class="mrow__toggle">${c.rateDetails}</span>
        </summary>
        <div class="mrow__rates">
          <p>${c.ratesPer}</p>
          <dl>${rateList(m).replace(/<dt>/g, '<div><dt>').replace(/<\/dd>/g, '</dd></div>')}</dl>
        </div>
      </details>`).join('');
  }

  /* Catalog dialog */
  const catalog = $('#catalog');
  function renderCatalogFilters() {
    const c = t();
    const group = (key, label, values, names) => `
      <div class="cat-group" role="group" aria-label="${label}">
        <span>${label}</span>
        ${values.map((v) => `<button type="button" class="cat-chip" data-filter="${key}" data-value="${v}" aria-pressed="${state.catalog[key].has(v)}">${names ? names[v] : v}</button>`).join('')}
      </div>`;
    $('#catFilters').innerHTML =
      group('use', c.filterUse, ['coding', 'chat', 'analysis'], c.uses) +
      group('level', c.filterLevel, ['budget', 'balanced', 'premium'], c.levels) +
      group('provider', c.filterProvider, ['Anthropic', 'OpenAI', 'Google', 'DeepSeek', 'Alibaba']);
  }
  function filteredModels() {
    const { query, use, level, provider } = state.catalog;
    const q = query.trim().toLowerCase();
    return MODELS.filter((m) =>
      (!q || m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q)) &&
      (!use.size || m.uses.some((u) => use.has(u))) &&
      (!level.size || level.has(m.level)) &&
      (!provider.size || provider.has(m.provider)));
  }
  function renderCatalog(focusFrom = -1) {
    const c = t();
    const list = filteredModels();
    const shown = list.slice(0, state.catalog.limit);
    $('#catGrid').innerHTML = shown.map((m, i) => `
      <article class="mcard" tabindex="-1" data-i="${i}">
        <div class="mcard__top">
          <span class="mrow__icon" aria-hidden="true">${modelLogo(m)}</span>
          <h3>${m.name}</h3>
          <span class="badge ${LEVEL_BADGE[m.level]}">${c.levels[m.level]}</span>
        </div>
        <p class="mcard__meta">${modelMeta(m)}</p>
        <p class="mcard__per"><strong>≈ ${m.per10k}</strong> <span>${c.perUnit}</span></p>
        <details><summary>${c.rateDetails}</summary><p class="mono" style="font-size:.72rem;color:var(--muted);margin-top:4px">${c.ratesPer}</p><dl>${rateList(m)}</dl></details>
      </article>`).join('');
    $('#catCount').textContent = c.showing(shown.length, list.length);
    $('#catEmpty').hidden = list.length > 0;
    $('#catMore').hidden = list.length <= shown.length;
    if (focusFrom >= 0) { const el = $(`.mcard[data-i="${focusFrom}"]`); if (el) el.focus(); }
  }
  $('#catFilters').addEventListener('click', (e) => {
    const chip = e.target.closest('.cat-chip');
    if (!chip) return;
    const set = state.catalog[chip.dataset.filter];
    set.has(chip.dataset.value) ? set.delete(chip.dataset.value) : set.add(chip.dataset.value);
    chip.setAttribute('aria-pressed', String(set.has(chip.dataset.value)));
    state.catalog.limit = 6;
    renderCatalog();
  });
  $('#catSearch').addEventListener('input', (e) => { state.catalog.query = e.target.value; state.catalog.limit = 6; renderCatalog(); });
  $('#catMore').addEventListener('click', () => { const from = state.catalog.limit; state.catalog.limit += 6; renderCatalog(from); });
  $('#catClear').addEventListener('click', () => {
    Object.assign(state.catalog, { query: '', limit: 6 });
    ['use', 'level', 'provider'].forEach((k) => state.catalog[k].clear());
    $('#catSearch').value = '';
    renderCatalogFilters(); renderCatalog();
  });
  $('#openCatalog').addEventListener('click', (e) => openDialog(catalog, e.currentTarget, $('#catSearch')));

  /* ---------------------------------------------------------
     FAQ
     --------------------------------------------------------- */
  function renderFaq() {
    const openIdx = $$('.faq-item').map((d, i) => (d.open ? i : -1)).filter((i) => i >= 0);
    $('#faqList').innerHTML = t().faq.map(([q, a], i) => `
      <details class="faq-item"${openIdx.includes(i) ? ' open' : ''}>
        <summary><span class="faq-item__n">${String(i + 1).padStart(2, '0')}</span><span>${escapeHtml(q)}</span><span class="faq-item__plus" aria-hidden="true"></span></summary>
        <p class="faq-item__a">${escapeHtml(a)}</p>
      </details>`).join('');
  }

  /* ---------------------------------------------------------
     Dashboard (benefit 4)
     --------------------------------------------------------- */
  function renderDashboard() {
    const c = t();
    const max = Math.max(...USAGE);
    const peak = USAGE.indexOf(max);
    $('#usageBars').innerHTML = USAGE.map((v, i) => `
      <div class="bar${i === peak ? ' is-peak' : ''}" style="--h:${(v / max).toFixed(3)}" title="${c.daysLong[i]}: ${rp(v)}">
        <span class="bar__val">${rp(v)}</span><i></i>
      </div>`).join('');
    let days = $('.bars-days');
    if (!days) { days = document.createElement('div'); days.className = 'bars-days'; days.setAttribute('aria-hidden', 'true'); $('#usageBars').after(days); }
    days.innerHTML = c.days.map((d) => `<span>${d}</span>`).join('');
    $('#usageBars').setAttribute('aria-label', state.lang === 'en' ? 'Usage over the last 7 days, highest on Friday' : 'Pemakaian 7 hari terakhir, tertinggi hari Jumat');
    $('#usageList').innerHTML = USAGE.map((v, i) => `<li>${c.daysLong[i]}: ${rp(v)}</li>`).join('');
    renderKey();
  }
  function renderKey() {
    const c = t();
    const badge = $('#keyBadge');
    badge.textContent = state.keyActive ? c.keyActive : c.keyInactive;
    badge.className = `badge ${state.keyActive ? 'badge--teal' : 'badge--gray'}`;
    $('#keyToggle').textContent = state.keyActive ? c.keyDisable : c.keyEnable;
  }
  $('#keyToggle').addEventListener('click', () => {
    state.keyActive = !state.keyActive;
    renderKey();
    $('#dashStatus').textContent = t().keyAnnounce(state.keyActive);
  });
  $('#reminderSwitch').addEventListener('click', (e) => {
    const on = e.currentTarget.getAttribute('aria-checked') !== 'true';
    e.currentTarget.setAttribute('aria-checked', String(on));
    $('#dashStatus').textContent = t().reminderAnnounce(on);
  });

  /* Before / after switch */
  $('#baSwitch').addEventListener('click', (e) => {
    const on = e.currentTarget.getAttribute('aria-checked') !== 'true';
    e.currentTarget.setAttribute('aria-checked', String(on));
    $('#beforeAfter').dataset.state = on ? 'after' : 'before';
  });

  /* ---------------------------------------------------------
     Copy buttons
     --------------------------------------------------------- */
  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.append(ta); ta.select();
      try { document.execCommand('copy'); } catch (e2) { /* ignore */ }
      ta.remove();
    }
    const label = $('.copy-label', btn);
    const c = t();
    label.textContent = c.copied;
    $('#copyStatus').textContent = c.copiedAnnounce;
    setTimeout(() => { label.textContent = btn.id === 'copyKey' ? c.copyKey : c.copy; }, 1800);
  }
  function renderCopyLabels() {
    $$('[data-copy] .copy-label').forEach((l) => { l.textContent = t().copy; });
    $('#copyKey .copy-label').textContent = t().copyKey;
  }
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', () => copyText(btn.dataset.copy, btn)));
  $('#copyKey').addEventListener('click', (e) => copyText(state.checkout.apiKey, e.currentTarget));

  $$('[data-mock-link]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); toast(t().mockLink); }));

  /* ---------------------------------------------------------
     Menu
     --------------------------------------------------------- */
  const menuBtn = $('#menuBtn');
  const menuPanel = $('#menuPanel');
  const header = $('#siteHeader');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    $('#menuBtnLabel').textContent = open ? t().menuClose : t().menuOpen;
    header.classList.toggle('menu-open', open);
    if (open) {
      menuPanel.hidden = false;
      requestAnimationFrame(() => menuPanel.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
      $('a', menuPanel).focus();
    } else {
      menuPanel.classList.remove('is-open');
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
      setTimeout(() => { if (menuBtn.getAttribute('aria-expanded') === 'false') menuPanel.hidden = true; }, prefersReducedMotion ? 0 : 600);
    }
  }
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  $$('a', menuPanel).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  menuPanel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });

  /* ---------------------------------------------------------
     Dialog helpers
     --------------------------------------------------------- */
  const openers = new Map();
  function openDialog(dlg, opener, focusEl) {
    if (menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false);
    $$('dialog[open]').forEach((d) => d.close());
    openers.set(dlg, opener || document.activeElement);
    dlg.showModal();
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = 'hidden';
    (focusEl || $('h2', dlg)).focus();
  }
  $$('dialog').forEach((dlg) => {
    dlg.addEventListener('close', () => {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = '';
      const op = openers.get(dlg);
      if (op && !dlg.dataset.skipRestore && document.contains(op)) op.focus({ preventScroll: true });
      delete dlg.dataset.skipRestore;
    });
    $$('[data-close]', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
    // backdrop click (ignore drags that start inside)
    let downInside = false;
    dlg.addEventListener('pointerdown', (e) => { downInside = e.target !== dlg; });
    dlg.addEventListener('click', (e) => {
      if (e.target !== dlg || downInside) return;
      const r = dlg.getBoundingClientRect();
      const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) dlg.close();
    });
  });

  /* ---------------------------------------------------------
     Checkout
     --------------------------------------------------------- */
  const checkout = $('#checkout');
  const coForm = $('#coForm');
  const contactInput = $('#coContact');
  let contactTouched = false;

  function renderCheckoutPkgs() {
    const isNarrow = window.innerWidth < 640;
    $('#coPkgs').innerHTML = PACKAGE_ORDER.map((id) => {
      const p = PACKAGES[id];
      return `<label class="co-pkg"><input type="radio" name="pkg" value="${id}"${state.checkout.pkg === id ? ' checked' : ''}><span><b>${p.name}</b><small>${isNarrow ? rpShort(p.amount) : rp(p.amount)}</small></span></label>`;
    }).join('');
  }
  function renderCheckoutSummary() {
    const p = PACKAGES[state.checkout.pkg];
    $('[data-co="amount"]').textContent = rp(p.amount);
    $('[data-co="bonus"]').textContent = `+${rp(p.bonus)}`;
    $('[data-co="total"]').textContent = rp(p.amount);
    $('#coSubmit').textContent = t().payTo(rp(p.amount));
  }
  $('#coPkgs').addEventListener('change', (e) => {
    if (e.target.name !== 'pkg') return;
    state.checkout.pkg = e.target.value;
    state.selected = e.target.value;
    state.intent = e.target.value;
    state.hasPicked = true;
    updatePackageUI(false);
    renderCheckoutSummary();
  });

  function showStep(name) {
    $$('.co-step', checkout).forEach((s) => { s.hidden = s.dataset.step !== name; });
    checkout.scrollTop = 0;
  }

  function openCheckout(pkgId, opener) {
    state.checkout.pkg = pkgId && PACKAGES[pkgId] ? pkgId : state.selected;
    if (pkgId && PACKAGES[pkgId]) { state.selected = pkgId; state.intent = pkgId; state.hasPicked = true; updatePackageUI(false); }
    renderCheckoutPkgs();
    renderCheckoutSummary();
    showStep('form');
    openDialog(checkout, opener, $('#coTitle'));
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-checkout]');
    if (!btn) return;
    openCheckout(btn.dataset.openCheckout, btn);
  });

  function validateContact(raw) {
    const c = t();
    const value = raw.trim();
    if (!value) return { ok: false, msg: c.errContactEmpty };
    if (value.includes('@')) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? { ok: true, display: value } : { ok: false, msg: c.errEmail };
    }
    const cleaned = value.replace(/[\s.-]/g, '');
    if (!/^(\+62|62|0)8[1-9][0-9]{7,10}$/.test(cleaned)) return { ok: false, msg: c.errPhone };
    return { ok: true, display: `+62${cleaned.replace(/^(\+62|62|0)/, '')}` };
  }
  function showFieldError(input, errEl, msg) {
    errEl.textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  contactInput.addEventListener('blur', () => {
    if (!contactInput.value.trim() && !contactTouched) return;
    contactTouched = true;
    const r = validateContact(contactInput.value);
    showFieldError(contactInput, $('#coContactErr'), r.ok ? '' : r.msg);
  });
  contactInput.addEventListener('input', () => {
    if (contactInput.getAttribute('aria-invalid') === 'true' && validateContact(contactInput.value).ok) showFieldError(contactInput, $('#coContactErr'), '');
  });
  $('#payGrid').addEventListener('change', () => { $('#coPayErr').textContent = ''; });

  coForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactTouched = true;
    const r = validateContact(contactInput.value);
    showFieldError(contactInput, $('#coContactErr'), r.ok ? '' : r.msg);
    const pay = coForm.querySelector('input[name="pay"]:checked');
    $('#coPayErr').textContent = pay ? '' : t().errPay;
    if (!r.ok) { contactInput.focus(); return; }
    if (!pay) { $('input[name="pay"]', coForm).focus(); return; }
    state.checkout.contact = r.display;
    state.checkout.pay = pay.value;
    renderPayStep();
    showStep('pay');
    $('#payStep h3').focus();
  });

  function mockQrSvg(seed) {
    // decorative pseudo-QR pattern — NOT a scannable code
    let x = seed;
    const rnd = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    const n = 25; const cell = 8;
    let rects = '';
    const finder = (cx, cy) => `<rect x="${cx}" y="${cy}" width="56" height="56" rx="8" fill="#00166A"/><rect x="${cx + 8}" y="${cy + 8}" width="40" height="40" rx="4" fill="#fff"/><rect x="${cx + 16}" y="${cy + 16}" width="24" height="24" rx="3" fill="#00166A"/>`;
    for (let r = 0; r < n; r++) {
      for (let col = 0; col < n; col++) {
        const inFinder = (r < 8 && col < 8) || (r < 8 && col > n - 9) || (r > n - 9 && col < 8);
        if (!inFinder && rnd() > 0.52) rects += `<rect x="${col * cell}" y="${r * cell}" width="${cell}" height="${cell}" fill="#00166A"/>`;
      }
    }
    return `<svg class="qr" viewBox="0 0 200 200" role="img" aria-label="${t().qrisAlt}">${rects}${finder(0, 0)}${finder(144, 0)}${finder(0, 144)}<rect x="84" y="84" width="32" height="32" rx="8" fill="#FFC93C"/></svg>`;
  }

  function renderPayStep() {
    const c = t();
    const p = PACKAGES[state.checkout.pkg];
    const amount = `<p class="mono" style="font-size:.78rem;color:var(--muted)">${c.totalPay}</p><p class="pay-step__amount">${rp(p.amount)}</p>`;
    let html = '';
    if (state.checkout.pay === 'qris') {
      html = `<h3 tabindex="-1">${c.qrisTitle}</h3>${mockQrSvg(Date.now() % 9973)}<p>${c.qrisBody}</p>${amount}<span class="badge badge--yellow">${state.lang === 'en' ? 'Sample QR' : 'QR contoh'}</span>`;
    } else if (state.checkout.pay === 'va') {
      const va = `8808 ${String(Math.floor(1000 + Math.random() * 9000))} ${String(Math.floor(1000 + Math.random() * 9000))} ${String(Math.floor(1000 + Math.random() * 9000))}`;
      html = `<h3 tabindex="-1">${c.vaTitle}</h3><p class="va-number">${va}</p><p>${c.vaBody}</p>${amount}`;
    } else {
      html = `<h3 tabindex="-1">${c.ewTitle}</h3><div class="wallets" role="group">${['DANA', 'GoPay', 'OVO'].map((w) => `<button type="button" data-wallet="${w}" aria-pressed="${state.checkout.wallet === w}">${w}</button>`).join('')}</div><p>${c.ewBody}</p>${amount}`;
    }
    $('#payStep').innerHTML = html;
  }
  $('#payStep').addEventListener('click', (e) => {
    const w = e.target.closest('[data-wallet]');
    if (!w) return;
    state.checkout.wallet = w.dataset.wallet;
    $$('[data-wallet]').forEach((b) => b.setAttribute('aria-pressed', String(b === w)));
  });

  function makeApiKey() {
    const hex = () => Math.floor(Math.random() * 16).toString(16);
    const head = Array.from({ length: 4 }, hex).join('');
    const tail = Array.from({ length: 24 }, hex).join('');
    return { full: `tn-demo-${head}${tail}`, masked: `tn-demo-${head}••••••••••••` };
  }

  $('#coPaid').addEventListener('click', () => {
    showStep('checking');
    setTimeout(() => {
      const key = makeApiKey();
      state.checkout.apiKey = key.full;
      const p = PACKAGES[state.checkout.pkg];
      $('#apiKeyMasked').textContent = key.masked;
      $('#successBody').textContent = t().successBody(rp(p.amount), state.checkout.contact);
      $('#copyKey .copy-label').textContent = t().copyKey;
      const meter = $('#successMeter');
      meter.style.setProperty('--v', 0);
      showStep('success');
      requestAnimationFrame(() => requestAnimationFrame(() => meter.style.setProperty('--v', (p.amount + p.bonus) / METER_MAX)));
      state.selected = state.checkout.pkg; state.intent = state.checkout.pkg; state.hasPicked = true; updatePackageUI(false);
      $('#successTitle').focus();
      burst(checkout.querySelector('.co-success__burst'), 14);
    }, 600);
  });
  $('#coFail').addEventListener('click', () => {
    showStep('checking');
    setTimeout(() => { showStep('failed'); $('#failedTitle').focus(); }, 600);
  });
  $('#coRetry').addEventListener('click', () => { showStep('form'); $('#coTitle').focus(); });
  $('#coBack').addEventListener('click', () => { showStep('form'); $('#coTitle').focus(); });
  $('#seeGuide').addEventListener('click', () => {
    checkout.dataset.skipRestore = '1';
    checkout.close();
    const target = $('#pakai');
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20, immediate: prefersReducedMotion });
    else target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setTimeout(() => $('#toolsTitle').focus({ preventScroll: true }), prefersReducedMotion ? 0 : 900);
  });

  /* ---------------------------------------------------------
     Consult dialog
     --------------------------------------------------------- */
  const consult = $('#consult');
  $('#openConsult').addEventListener('click', (e) => {
    $('#csForm').hidden = false; $('#csSuccess').hidden = true;
    openDialog(consult, e.currentTarget, $('#csTitle'));
  });
  $('#csNeeds').addEventListener('input', (e) => {
    const n = e.target.value.length;
    const counter = $('#csCount');
    counter.textContent = `${n}/500`;
    if (n >= 450) counter.setAttribute('aria-live', 'polite'); else counter.removeAttribute('aria-live');
  });
  $('#csForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const c = t();
    const checks = [];
    const name = $('#csName'); const org = $('#csOrg'); const contact = $('#csContact');
    const nameMsg = name.value.trim() ? '' : c.csErrName;
    showFieldError(name, $('#csNameErr'), nameMsg); checks.push([nameMsg, name]);
    const cr = contact.value.trim() ? validateContact(contact.value) : { ok: false, msg: c.csErrContact };
    showFieldError(contact, $('#csContactErr'), cr.ok ? '' : cr.msg); checks.push([cr.ok ? '' : cr.msg, contact]);
    const orgMsg = org.value.trim() ? '' : c.csErrOrg;
    showFieldError(org, $('#csOrgErr'), orgMsg); checks.push([orgMsg, org]);
    const size = $('input[name="size"]:checked', consult);
    $('#csSizeErr').textContent = size ? '' : c.csErrSize; checks.push([size ? '' : c.csErrSize, $('input[name="size"]', consult)]);
    const agree = $('#csAgree');
    $('#csAgreeErr').textContent = agree.checked ? '' : c.csErrAgree; checks.push([agree.checked ? '' : c.csErrAgree, agree]);
    const firstBad = checks.find(([msg]) => msg);
    if (firstBad) { firstBad[1].focus(); return; }
    $('#csSuccessBody').textContent = c.csSuccess(cr.display);
    $('#csForm').hidden = true; $('#csSuccess').hidden = false;
    $('#csSuccessTitle').focus();
  });

  /* ---------------------------------------------------------
     Switches + sparks
     --------------------------------------------------------- */
  function burst(container, count = 16) {
    if (!container || prefersReducedMotion) return;
    const host = container.closest('.final') ? $('#sparks') : container;
    const hostRect = host.getBoundingClientRect();
    const srcRect = container.getBoundingClientRect();
    const cx = srcRect.left + srcRect.width / 2 - hostRect.left;
    const cy = srcRect.top + srcRect.height / 2 - hostRect.top;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    for (let i = 0; i < count; i++) {
      const s = document.createElement('i');
      s.className = 'spark-dot';
      Object.assign(s.style, {
        position: 'absolute', left: `${cx}px`, top: `${cy}px`, width: `${10 + Math.random() * 18}px`, height: 'auto', aspectRatio: '1',
        background: 'url("assets/spark.svg") center/contain no-repeat', pointerEvents: 'none', zIndex: 5,
      });
      host.append(s);
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 80 + Math.random() * 160;
      s.animate([
        { transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(1) rotate(${Math.random() * 180}deg)`, opacity: 0 },
      ], { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => s.remove();
    }
  }

  $$('[data-hero-switch]').forEach((sw) => sw.addEventListener('click', () => {
    const on = sw.getAttribute('aria-pressed') !== 'true';
    $$('[data-hero-switch]').forEach((s) => s.setAttribute('aria-pressed', String(on)));
    if (on) burst(sw, 12);
  }));

  const mega = $('#megaSwitch');
  mega.addEventListener('click', () => {
    const on = mega.getAttribute('aria-pressed') !== 'true';
    mega.setAttribute('aria-pressed', String(on));
    if (on) {
      burst(mega, 22);
      setTimeout(() => openCheckout(null, mega), prefersReducedMotion ? 0 : 520);
    }
  });

  /* ---------------------------------------------------------
     Live chat Nala — scripted, local only (no AI, no server)
     --------------------------------------------------------- */
  const CHAT_T = {
    id: {
      status: 'Asisten otomatis', inputLabel: 'Pesan', placeholder: 'Tulis pertanyaanmu…', placeholderContact: 'Email atau nomor HP',
      greeting: 'Hai, aku Nala! Mau dibantu pilih paket, atau ada pertanyaan lain?',
      chips: { pick: 'Bantu pilih paket', howto: 'Cara pakai saldo di tool', models: 'Model apa saja?', pay: 'Metode pembayaran', team: 'Bicara dengan tim',
        learn: 'Belajar', prototype: 'Prototype', work: 'Kerja', once: 'Sesekali', weekly: 'Tiap minggu', daily: 'Tiap hari', restart: 'Ulangi' },
      pickQ1: 'Kamu mau pakai AI untuk apa?', pickQ2: 'Seberapa sering kamu akan memakainya?',
      pickResult: (p) => `Paket ${p.name} (${p.price}) paling pas buatmu, ${p.estimate}.`, pickChoose: 'Pilih paket ini',
      howto: 'Setelah top up, salin API key, lalu tempel bersama Base URL di pengaturan tool-mu. Mau lihat panduannya?', howtoBtn: 'Lihat panduan',
      models: 'Satu saldo bisa dipakai di semua model. Model hemat bikin saldo awet, model premium untuk tugas rumit.', modelsBtn: 'Buka katalog model',
      pay: 'Kamu bisa bayar pakai QRIS, e-wallet, atau virtual account. Di prototype ini semuanya simulasi.',
      fallback: 'Maaf, aku belum paham. Coba pilih salah satu topik ini, atau bicara dengan tim.',
      connecting: 'Menghubungkan ke tim…', agentName: 'Sari', agentBadge: 'Tim', agentStatus: 'Sari · Tim TokenNyala',
      agentGreeting: 'Halo, aku Sari dari tim TokenNyala. Ada yang bisa kubantu soal top up?',
      agentReply: 'Pesanmu sudah kami terima. Di produk nyata, tim akan membalas di sini dalam beberapa menit.',
      modeLabel: 'Simulasi, tidak ada agen nyata', hours: 'Tim online Senin–Jumat, 09.00–18.00 WIB',
      offline: 'Tim sedang offline. Tinggalkan email atau nomor HP, kami balas di jam kerja.',
      offlineThanks: (c) => `Terima kasih! Kami balas ke ${c} di jam kerja.`,
      typingNala: 'Nala sedang mengetik…', typingSari: 'Sari sedang mengetik…',
    },
    en: {
      status: 'Automated assistant', inputLabel: 'Message', placeholder: 'Type your question…', placeholderContact: 'Email or phone number',
      greeting: "Hi, I'm Nala! Want help choosing a package, or got another question?",
      chips: { pick: 'Help me pick a package', howto: 'Using credit in my tool', models: 'Which models?', pay: 'Payment methods', team: 'Talk to the team',
        learn: 'Learn', prototype: 'Prototype', work: 'Work', once: 'Occasionally', weekly: 'Every week', daily: 'Every day', restart: 'Start over' },
      pickQ1: 'What will you use AI for?', pickQ2: 'How often will you use it?',
      pickResult: (p) => `The ${p.name} package (${p.price}) fits you best, ${p.estimate}.`, pickChoose: 'Choose this package',
      howto: 'After topping up, copy your API key and paste it with the Base URL into your tool settings. Want to see the guide?', howtoBtn: 'See the guide',
      models: 'One balance works across every model. Budget models make credit last, premium ones handle hard tasks.', modelsBtn: 'Open model catalog',
      pay: 'You can pay with QRIS, e-wallets, or virtual accounts. In this prototype everything is simulated.',
      fallback: "Sorry, I didn't get that. Try one of these topics, or talk to the team.",
      connecting: 'Connecting you to the team…', agentName: 'Sari', agentBadge: 'Team', agentStatus: 'Sari · TokenNyala team',
      agentGreeting: "Hi, I'm Sari from the TokenNyala team. How can I help with your top up?",
      agentReply: 'We got your message. In the real product, the team replies here within a few minutes.',
      modeLabel: 'Simulation, no real agent', hours: 'Team online Mon–Fri, 09:00–18:00 WIB',
      offline: "The team is offline. Leave your email or phone number and we'll reply during working hours.",
      offlineThanks: (c) => `Thanks! We'll reply to ${c} during working hours.`,
      typingNala: 'Nala is typing…', typingSari: 'Sari is typing…',
    },
  };
  const chatDlg = $('#chat');
  const chatLauncher = $('#chatLauncher');
  const chatLog = $('#chatLog');
  const chatInput = $('#chatInput');
  const chatDesktop = window.matchMedia('(min-width: 768px)');
  const CHAT_TYPING_MS = 500;
  const ct = () => CHAT_T[state.lang];
  // Messages store keys (not text) so the whole log re-translates on language change.
  const chat = { messages: [], chips: 'main', mode: 'bot', flow: null, typing: null };
  const PICK_MATRIX = {
    learn: { once: 'learn', weekly: 'learn', daily: 'prototype' },
    prototype: { once: 'learn', weekly: 'prototype', daily: 'work' },
    work: { once: 'prototype', weekly: 'work', daily: 'work' },
  };
  const CHIP_SETS = {
    main: ['pick', 'howto', 'models', 'pay', 'team'],
    goal: ['learn', 'prototype', 'work'],
    freq: ['once', 'weekly', 'daily'],
    result: ['restart', 'team'],
    none: [],
  };
  const KEYWORDS = [ // free text → intent (ID + EN)
    ['team', /\b(tim|team|manusia|human|agen|agent|cs|admin|orang)\b/i],
    ['pick', /\b(paket|package|pilih|choose|berapa|how much|rekomendasi|recommend)\b/i],
    ['howto', /\b(api|key|tool|pasang|setup|cursor|cline|continue|cara pakai)\b/i],
    ['models', /\b(model|claude|gpt|gemini|deepseek|qwen)\b/i],
    ['pay', /\b(bayar|pay|payment|qris|e-?wallet|virtual account|va|dana|gopay|ovo)\b/i],
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

  function messageText(msg) {
    if (msg.text != null) return msg.text;
    const v = ct()[msg.key];
    return typeof v === 'function' ? v(msg.params ? msg.params() : undefined) : v;
  }

  function chatBubble(msg) {
    const row = document.createElement('div');
    if (msg.from === 'system') { row.className = 'chat__system'; row.textContent = messageText(msg); return row; }
    const mine = msg.from === 'user';
    row.className = `chat__msg${mine ? ' chat__msg--user' : ''}`;
    if (!mine) {
      row.insertAdjacentHTML('beforeend', msg.from === 'sari'
        ? '<span class="chat__agent" aria-hidden="true">S</span>'
        : '<img src="assets/tokennyala-mark.svg" alt="" width="28" height="28">');
    }
    const box = document.createElement('div');
    box.className = 'chat__bubble';
    if (msg.from === 'sari') box.insertAdjacentHTML('beforeend', `<span class="chat__tag">${ct().agentName}<small>${ct().agentBadge}</small></span>`);
    const p = document.createElement('p');
    p.textContent = messageText(msg);
    if (!mine) {
      const who = document.createElement('span'); // screen readers: say who is speaking
      who.className = 'sr-only';
      who.textContent = `${msg.from === 'sari' ? ct().agentName : 'Nala'}: `;
      p.prepend(who);
    }
    box.append(p);
    (msg.actions || []).forEach((a) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn--primary';
      b.textContent = ct()[a.key];
      b.addEventListener('click', a.run);
      box.append(b);
    });
    row.append(box);
    return row;
  }

  function renderChat() {
    const c = ct();
    const items = chat.messages.map(chatBubble);
    if (chat.typing) {
      const el = document.createElement('div');
      el.className = 'chat__typing';
      el.textContent = c[chat.typing];
      items.push(el);
    }
    chatLog.replaceChildren(...items);
    $('#chatChips').replaceChildren(...CHIP_SETS[chat.chips].map((key) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat__chip';
      b.textContent = c.chips[key];
      b.addEventListener('click', () => handleChatInput(c.chips[key], key));
      return b;
    }));
    const team = chat.mode === 'team';               // a (simulated) human is in the chat
    const offline = chat.mode.startsWith('offline'); // team unavailable; Nala collects a contact
    const collecting = chat.mode === 'offline';
    $('#chatStatus').textContent = team ? c.agentStatus : c.status;
    const mode = $('#chatMode');
    mode.hidden = !(team || offline);
    mode.textContent = team ? `${c.modeLabel} · ${c.hours}` : c.hours;
    $('#chatInputLabel').textContent = collecting ? c.placeholderContact : c.inputLabel;
    chatInput.placeholder = collecting ? c.placeholderContact : c.placeholder;
    chatInput.setAttribute('inputmode', collecting ? 'email' : 'text');
    // Scroll last: the chip row changes height, which changes the log's height.
    requestAnimationFrame(() => { chatLog.scrollTop = chatLog.scrollHeight; });
  }

  /** Show a typing line, then append the reply. */
  function chatReply(msgs, { chips = 'main', typing = 'typingNala' } = {}) {
    chat.chips = 'none';
    chat.typing = typing;
    renderChat();
    setTimeout(() => {
      chat.typing = null;
      chat.messages.push(...[].concat(msgs));
      chat.chips = chips;
      renderChat();
    }, CHAT_TYPING_MS);
  }

  function startPick() { chat.flow = { name: 'pick' }; chatReply({ from: 'nala', key: 'pickQ1' }, { chips: 'goal' }); }

  function goTeam() {
    chat.flow = null;
    chat.messages.push({ from: 'system', key: 'connecting' });
    if (teamOnline()) {
      chat.mode = 'team';
      chatReply({ from: 'sari', key: 'agentGreeting' }, { chips: 'none', typing: 'typingSari' });
    } else {
      chat.mode = 'offline';
      chatReply({ from: 'nala', key: 'offline' }, { chips: 'none' });
    }
  }

  const leaveChatThen = (fn) => () => { closeChat(false); setTimeout(fn, 0); };
  function goToGuide() {
    const target = $('#pakai');
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20, immediate: prefersReducedMotion });
    else target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setTimeout(() => $('#toolsTitle').focus({ preventScroll: true }), prefersReducedMotion ? 0 : 900);
  }

  function handleChatInput(text, chipKey = null) {
    const value = text.trim();
    if (!value) return;
    chat.messages.push({ from: 'user', text: value });

    if (chat.mode === 'offline') { // the input collects a contact
      const res = validateContact(value);
      if (!res.ok) { chatReply({ from: 'nala', text: res.msg }, { chips: 'none' }); return; }
      chat.mode = 'offline-done';
      chatReply({ from: 'nala', key: 'offlineThanks', params: () => res.display }, { chips: 'main' });
      return;
    }
    if (chat.mode === 'team') { chatReply({ from: 'sari', key: 'agentReply' }, { chips: 'none', typing: 'typingSari' }); return; }

    const has = (re) => re.test(value);
    if (chat.flow && chat.flow.name === 'pick' && !chat.flow.goal) {
      const goal = chipKey === 'learn' || has(/belajar|learn/i) ? 'learn'
        : chipKey === 'prototype' || has(/proto/i) ? 'prototype'
        : chipKey === 'work' || has(/kerja|work|klien|client/i) ? 'work' : null;
      if (goal) { chat.flow.goal = goal; chatReply({ from: 'nala', key: 'pickQ2' }, { chips: 'freq' }); return; }
    } else if (chat.flow && chat.flow.name === 'pick' && chat.flow.goal) {
      const freq = chipKey === 'once' || has(/sesekali|jarang|occasion|once/i) ? 'once'
        : chipKey === 'weekly' || has(/minggu|week/i) ? 'weekly'
        : chipKey === 'daily' || has(/hari|daily|day/i) ? 'daily' : null;
      if (freq) {
        const pkg = PACKAGES[PICK_MATRIX[chat.flow.goal][freq]];
        chat.flow = null;
        chatReply({
          from: 'nala', key: 'pickResult',
          params: () => ({ name: pkg.name, price: rp(pkg.amount), estimate: pkg.estimate[state.lang] }),
          actions: [{ key: 'pickChoose', run: leaveChatThen(() => openCheckout(pkg.id, chatLauncher)) }],
        }, { chips: 'result' });
        return;
      }
    }

    const intent = { pick: 'pick', restart: 'pick', howto: 'howto', models: 'models', pay: 'pay', team: 'team' }[chipKey]
      ?? (KEYWORDS.find(([, re]) => has(re)) || [])[0];
    chat.flow = null;
    if (intent === 'pick') return startPick();
    if (intent === 'team') return goTeam();
    if (intent === 'howto') return chatReply({ from: 'nala', key: 'howto', actions: [{ key: 'howtoBtn', run: leaveChatThen(goToGuide) }] });
    if (intent === 'models') return chatReply({ from: 'nala', key: 'models', actions: [{ key: 'modelsBtn', run: leaveChatThen(() => openDialog(catalog, chatLauncher, $('#catSearch'))) }] });
    if (intent === 'pay') return chatReply({ from: 'nala', key: 'pay' });
    return chatReply({ from: 'nala', key: 'fallback' });
  }

  function resetChat() {
    Object.assign(chat, { messages: [{ from: 'nala', key: 'greeting' }], chips: 'main', mode: 'bot', flow: null, typing: null });
    renderChat();
  }

  function openChat() {
    if (menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false);
    $$('dialog[open]').forEach((d) => { if (d !== chatDlg) d.close(); });
    if (!chat.messages.length) resetChat();
    if (chatDesktop.matches) chatDlg.show(); // non-modal panel: the page stays usable
    else {
      chatDlg.showModal();
      if (window.__lenis) window.__lenis.stop();
      document.body.style.overflow = 'hidden';
    }
    chatLauncher.setAttribute('aria-expanded', 'true');
    renderChat();
    chatInput.focus({ preventScroll: true });
  }
  function closeChat(returnFocus = true) {
    if (!chatDlg.open) return;
    chat.skipFocus = !returnFocus;
    chatDlg.close();
  }
  chatDlg.addEventListener('close', () => {
    chatLauncher.setAttribute('aria-expanded', 'false');
    if (!chat.skipFocus && !document.querySelector('dialog[open]')) chatLauncher.focus({ preventScroll: true });
    chat.skipFocus = false;
  });
  // Escape: native for the modal (phones); handled here for the non-modal panel.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !chatDlg.open || chatDlg.matches(':modal') || document.querySelector('dialog:modal')) return;
    e.preventDefault();
    closeChat();
  });
  $('#chatClose').addEventListener('click', () => closeChat());
  $('#chatRestart').addEventListener('click', () => { resetChat(); chatInput.focus(); });
  $('#chatForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = chatInput.value;
    chatInput.value = '';
    handleChatInput(v);
  });
  // Crossing the phone/desktop breakpoint while open: reopen in the right mode.
  chatDesktop.addEventListener('change', () => { if (chatDlg.open) { chat.skipFocus = true; chatDlg.close(); openChat(); } });
  $$('[data-open-chat]').forEach((b) => b.addEventListener('click', openChat));
  document.addEventListener('tn:lang', () => { if (chat.messages.length) renderChat(); });

  // Phones: the launcher would cover the hero board, so it appears once the hero scrolls away.
  const heroEl = $('#top') || $('.hero');
  if (heroEl && 'IntersectionObserver' in window) {
    const phone = window.matchMedia('(max-width: 639px)');
    let heroVisible = true;
    const syncLauncher = () => {
      const hide = phone.matches && heroVisible;
      chatLauncher.classList.toggle('is-away', hide);
      chatLauncher.inert = hide;
    };
    new IntersectionObserver(([entry]) => { heroVisible = entry.intersectionRatio > 0.35; syncLauncher(); }, { threshold: [0, 0.35, 1] }).observe(heroEl);
    phone.addEventListener('change', syncLauncher);
  }

  /* ---------------------------------------------------------
     Render everything (also on language change)
     --------------------------------------------------------- */
  function renderAll() {
    renderPackages();
    renderModelIndex();
    renderCatalogFilters();
    renderCatalog();
    renderFaq();
    renderDashboard();
    renderCopyLabels();
    $('#menuBtnLabel').textContent = menuBtn.getAttribute('aria-expanded') === 'true' ? t().menuClose : t().menuOpen;
    if (checkout.open) {
      renderCheckoutPkgs(); renderCheckoutSummary();
      const step = $$('.co-step', checkout).find((s) => !s.hidden);
      if (step && step.dataset.step === 'pay') renderPayStep();
      if (step && step.dataset.step === 'success') $('#successBody').textContent = t().successBody(rp(PACKAGES[state.checkout.pkg].amount), state.checkout.contact);
    }
  }
  setLang(state.lang, false);
  window.addEventListener('resize', () => { if (checkout.open) renderCheckoutPkgs(); });

  /* ---------------------------------------------------------
     Header: hide on scroll down, colour by section underneath
     --------------------------------------------------------- */
  let lastY = window.scrollY;
  let ticking = false;
  const darkSel = '.sheet--blue, .sheet--dark, .final, .footer, .stall, .stack-card--white';
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    if (!header.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > lastY && y > 400);
    }
    lastY = y;
    const probeY = 36;
    const els = document.elementsFromPoint(window.innerWidth / 2, probeY);
    const under = els.find((el) => !header.contains(el) && !el.closest('.cursor'));
    header.classList.toggle('on-dark', !!(under && under.closest(darkSel)));
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Typing prompt in hero board
     --------------------------------------------------------- */
  const PROMPTS = {
    id: ['Bikin hero lebih hangat dan simpel', 'Tambah form pendaftaran event', 'Rapikan tampilan mobile'],
    en: ['Make the hero warmer and simpler', 'Add an event sign-up form', 'Polish the mobile view'],
  };
  const typeEl = $('#typePrompt');
  if (prefersReducedMotion) {
    typeEl.textContent = PROMPTS[state.lang][0];
    document.addEventListener('tn:lang', () => { typeEl.textContent = PROMPTS[state.lang][0]; });
  } else {
    let pi = 0; let ci = 0; let deleting = false;
    const tick = () => {
      const list = PROMPTS[state.lang];
      const text = list[pi % list.length];
      if (!deleting) {
        ci++;
        typeEl.textContent = text.slice(0, ci);
        if (ci >= text.length) { deleting = true; return setTimeout(tick, 2200); }
        return setTimeout(tick, 45 + Math.random() * 50);
      }
      ci--;
      typeEl.textContent = text.slice(0, Math.max(ci, 0));
      if (ci <= 0) { deleting = false; pi++; return setTimeout(tick, 350); }
      return setTimeout(tick, 22);
    };
    typeEl.textContent = '';
    setTimeout(tick, 1200);
  }

  /* ---------------------------------------------------------
     Custom cursor + magnetic buttons (fine pointers only)
     --------------------------------------------------------- */
  if (finePointer && !prefersReducedMotion) {
    root.classList.add('has-cursor');
    const cursor = $('#cursor');
    const label = $('#cursorLabel');
    let mx = -100; let my = -100; let cx = -100; let cy = -100;
    window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        label.textContent = target.dataset.cursor;
        cursor.classList.add('is-active');
      } else {
        cursor.classList.remove('is-active');
      }
      cursor.classList.toggle('is-hidden', !!e.target.closest('dialog, input, textarea'));
    });
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('pointerenter', () => cursor.classList.remove('is-hidden'));

    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------
     Stall story: build to 80% → out of credit → switch on → 100%
     --------------------------------------------------------- */
  const stall = $('#stall');
  let stallWasOn = true;
  function renderStall(p) {
    const fill = p < 0.5 ? (p / 0.5) * 0.8 : p < 0.74 ? 0.8 : 0.8 + Math.min(1, (p - 0.74) / 0.2) * 0.2;
    const phase = p < 0.52 ? 'build' : p < 0.7 ? 'stall' : 'on';
    if (stall.dataset.phase !== phase) stall.dataset.phase = phase;
    $('#stallFill').style.setProperty('--f', fill.toFixed(4));
    $('#stallPct').textContent = Math.round(fill * 100);
    $$('#stallTasks li').forEach((li) => li.classList.toggle('is-done', fill + 0.001 >= parseFloat(li.dataset.at)));
    const on = phase === 'on';
    $('#stallSwitch').classList.toggle('big-switch--on', on);
    if (on && !stallWasOn) burst($('#stallSwitch'), 12);
    stallWasOn = on;
  }
  renderStall(1); // complete story at rest (no JS motion / reduced motion)

  /* ---------------------------------------------------------
     "Cara kerja" horizontal scroller: drag, wheel, buttons, rail
     --------------------------------------------------------- */
  (function initStepsScroller() {
    const track = $('#stepsTrack');
    const prev = $('#stepsPrev');
    const next = $('#stepsNext');
    const rail = $('#stepsRail');
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const update = () => {
      const max = maxScroll();
      const p = max > 0 ? track.scrollLeft / max : 0;
      rail.style.setProperty('--p', p.toFixed(3));
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
    };
    const stepWidth = () => { const s = $('.step', track); return s ? s.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
    const go = (dir) => track.scrollBy({ left: dir * stepWidth(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    // Horizontal wheel / trackpad: keep it inside the track (don't let smooth-scroll swallow it)
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.stopPropagation();
        if (e.shiftKey && !e.deltaX) { e.preventDefault(); track.scrollLeft += e.deltaY; }
      }
    }, { passive: false });
    // Mouse drag (touch already swipes natively)
    let startX = 0; let startLeft = 0; let dragging = false; let moved = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add('is-dragging'); }
      if (moved) { e.preventDefault(); track.scrollLeft = startLeft - dx; }
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      if (!moved) return;
      const before = track.scrollLeft;
      track.classList.remove('is-dragging');
      // re-enabling snap jumps instantly; animate from where the drag ended instead
      track.scrollLeft = before;
      const w = stepWidth();
      const dx = startLeft - before;
      let idx = Math.round(before / w);
      if (Math.abs(dx) > 60) idx = dx < 0 ? Math.floor(startLeft / w + 0.01) + 1 : Math.ceil(startLeft / w - 0.01) - 1;
      const target = Math.max(0, Math.min(maxScroll(), idx * w));
      track.scrollTo({ left: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    track.addEventListener('dragstart', (e) => e.preventDefault());
    update();
  })();

  /* ---------------------------------------------------------
     Preloader + scroll motion (GSAP + ScrollTrigger + Lenis)
     --------------------------------------------------------- */
  const loader = $('#loader');
  function runLoader() {
    return new Promise((resolve) => {
      if (!root.classList.contains('is-loading')) return resolve();
      try { sessionStorage.setItem('tn-loaded', '1'); } catch (e) { /* ignore */ }
      const countEl = $('#loaderCount');
      const start = performance.now();
      const dur = 1100;
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        countEl.textContent = String(Math.round(eased * 100)).padStart(3, '0');
        if (p < 1) return requestAnimationFrame(step);
        loader.classList.add('is-on');
        setTimeout(() => {
          const finish = () => { root.classList.remove('is-loading'); loader.remove(); resolve(); };
          if (window.gsap) window.gsap.to(loader, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', onComplete: finish });
          else finish();
        }, 420);
      };
      requestAnimationFrame(step);
    });
  }

  function initMotion() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || prefersReducedMotion) return false;
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add('has-gsap');

    // Smooth scroll
    if (window.Lenis) {
      const lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: id === '#top' ? 0 : -10 });
      }));
    }

    // Split [data-split] headings into words (per language span)
    $$('[data-split] > [data-l]').forEach((span) => {
      const walker = [];
      span.childNodes.forEach((node) => walker.push(node));
      span.innerHTML = '';
      walker.forEach((node) => {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { span.append(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'split-word';
            const inner = document.createElement('span'); inner.textContent = part;
            w.append(inner); span.append(w);
          });
        } else {
          const w = document.createElement('span'); w.className = 'split-word';
          const inner = document.createElement('span'); inner.append(node);
          w.append(inner); span.append(w);
        }
      });
    });
    $$('[data-split]').forEach((h) => {
      gsap.from($$('.split-word > span', h), {
        yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.035,
        scrollTrigger: { trigger: h, start: 'top 85%' },
      });
    });

    // Hero entrance
    const heroTl = gsap.timeline({ paused: true });
    heroTl
      .from('.hero__title .ln > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
      .from('.hero__eyebrow, .hero__copy', { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1 }, '-=0.8')
      .from('.board', { x: 80, opacity: 0, rotate: 4, duration: 0.45 * 2, ease: 'expo.out' }, '-=0.9')
      .from('.sticker', { scale: 0, rotate: -90, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6')
      .add(() => { $$('[data-hero-switch]').forEach((s) => s.setAttribute('aria-pressed', 'true')); burst($('html[lang="en"]') ? $$('[data-hero-switch]')[1] : $$('[data-hero-switch]')[0], 10); }, '-=0.3');
    window.__heroTl = heroTl;

    // Subtle board drift
    gsap.to('.hero__visual', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Stall story: progress scrubbed by scroll
    renderStall(0);
    ScrollTrigger.create({
      trigger: '#stall', start: 'top 90%', end: 'bottom 40%', scrub: 0.4,
      onUpdate: (self) => renderStall(self.progress),
    });

    // Steps: cards slide in (the horizontal scroller itself is native, see initStepsScroller)
    gsap.from('.step', { x: 80, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '#stepsTrack', start: 'top 85%' } });

    // Package cards stagger
    gsap.from('.pkg-sheet__main > *, .pkg-specs > div', { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: '#pkgSheet', start: 'top 85%' } });
    gsap.from('.intent', { scaleX: 0.85, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.intent', start: 'top 90%' } });

    // Model rows slide in
    gsap.from('.mrow', { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '#modelList', start: 'top 85%' } });
    // Yellow marker under "semua"
    $$('.display mark').forEach((m) => gsap.fromTo(m, { '--mark': 0 }, { '--mark': 1, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: m, start: 'top 80%' } }));

    // Cable draw
    const cable = $('#cablePath');
    if (cable) {
      const len = cable.getTotalLength();
      gsap.fromTo(cable, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.tools', start: 'top 70%', end: 'center center', scrub: true } });
    }
    gsap.from('.tool-steps li', { x: -40, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.tool-steps', start: 'top 85%' } });
    gsap.from('.config-card', { y: 60, rotate: 6, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.config-card', start: 'top 85%' } });

    // Benefit stack: earlier cards shrink as the next arrives
    const cards = $$('.stack-card');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.92 + i * 0.015, ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
      });
    });

    // Receipt print-in
    gsap.from('.receipt__paper', { yPercent: -18, opacity: 0, rotate: -3, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.receipt', start: 'top 80%' } });
    gsap.from('.teams__list li', { x: 60, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '.teams__list', start: 'top 85%' } });
    gsap.from('.faq-item', { y: 30, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.04, scrollTrigger: { trigger: '#faqList', start: 'top 85%' } });

    // Final CTA
    gsap.from('.final__title .ln > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.final', start: 'top 60%' } });
    gsap.from('.mega-switch', { scale: 0.6, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.final', start: 'top 55%' } });
    ScrollTrigger.create({
      trigger: '.final', start: 'top 30%', once: true,
      onEnter: () => { if (mega.getAttribute('aria-pressed') !== 'true') { mega.setAttribute('aria-pressed', 'true'); burst(mega, 18); } },
    });

    // Footer giant wordmark
    gsap.from('.footer__giant span', { yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.footer__giant', start: 'top 95%' } });

    // Generic fades
    $$('[data-fade]').forEach((el) => { if (!el.closest('.hero')) gsap.from(el, { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }); });

    // Re-measure after fonts load / language change
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    document.addEventListener('tn:lang', () => ScrollTrigger.refresh());
    return true;
  }

  function start() {
    const motion = initMotion();
    runLoader().then(() => {
      if (motion && window.__heroTl) window.__heroTl.play();
      else $$('[data-hero-switch]').forEach((s) => s.setAttribute('aria-pressed', 'true'));
    });
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
