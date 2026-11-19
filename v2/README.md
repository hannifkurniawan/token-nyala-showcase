# TokenNyala — v3 (mobile first, Tailwind v4)

Versi aktif. Aturan membangun: `../docs/v3-ground-rules.md`. Spesifikasi: `../docs/technical-spec.md`.

## Struktur

```text
v3/
├── index.html   # markup + utility Tailwind + token @theme
├── styles.css   # hanya ilustrasi/animasi (< 100 baris)
├── script.js    # copy ID/EN, interaksi
├── motion.js    # animasi: reveal, parallax, smooth scroll (GSAP + ScrollTrigger + Lenis)
└── assets/
    └── vendor/  # gsap 3.12.5, ScrollTrigger, lenis 1.1.13 (lokal, jalan offline)
```

## Menjalankan

```bash
cd v3
python3 -m http.server 4175
# buka http://127.0.0.1:4175/
```

## QA responsif (wajib setelah setiap section)

```bash
python3 tools/qa_v3.py --interactive --out /tmp/qa-v3
```

Mengecek 320, 375, 768, 1024, 1440, dan 667×375 landscape: overflow horizontal, touch target ≥ 44px, console error, menu mobile, dan language switch. Screenshot disimpan di folder `--out`.

## Audit lain

```bash
python3 tools/i18n_check.py   # kelengkapan ID/EN, kunci mati, teks belum diterjemahkan
python3 tools/audit_v3.py     # axe-core WCAG 2.1 AA + DoD: file://, reduced motion, storage, ukuran
```

QA chat: `?chat=online` / `?chat=offline` memaksa jam layanan tim.

## Progres build

- [x] 1. Shell — head, token, header + menu mobile, language switch, footer
- [x] 2. Hero — copy ID/EN, board ilustrasi, status saldo menyala lewat `TokenNyala.selectPackage(id)`
- [x] 3. Cara kerja — 1 kolom (mobile), kartu baris (md), 3 kolom (lg)
- [x] 4. Package picker — tab intent (keyboard), baris rekomendasi, 3 kartu, `selectPackage` menyalakan hero
- [x] 5. Checkout — bottom sheet/dialog, email atau HP, QRIS/E-Wallet/VA mock, sukses dengan API key contoh, state gagal
- [x] 6. Model AI + katalog — 6 kartu, dialog katalog (search, filter, tampilkan lebih banyak, empty state)
- [x] 7. Pakai di tool — 3 langkah, contoh konfigurasi + salin, CTA isi saldo; tersambung dari sukses checkout
- [x] 8. Benefit + dashboard + contoh — 4 kartu manfaat, mock dashboard (grafik 7 hari, switch, key), contoh landing page event + CTA Mulai
- [x] 9. Tim & bisnis + konsultasi — strip tim, dialog 5 field + 2 checkbox, sukses, reset
- [x] 10. FAQ + final CTA — 11 pertanyaan (details/summary), banner “Nyala sekarang.”
- [x] 11. Live chat Nala — pill, skrip + kata kunci, pilih paket → checkout, tim online/offline, ganti bahasa, titik masuk dari FAQ & checkout
- [x] 12. ID/EN lengkap — `tools/i18n_check.py`: 333 kunci ID = EN, 0 hilang, 0 kunci mati, 576 string dibandingkan, 0 belum diterjemahkan
- [x] 13. QA penuh — DoD 21/21 (lihat `docs/technical-spec.md`), axe 0 pelanggaran, checkout & katalog dipindah ke `setupModal()`

## Motion (motion.js)

- Hero: intro bertahap (judul per kata, board masuk 3D), parallax blob + dekor melayang, tilt board mengikuti pointer (desktop).
- Saldo hero: `off` → `ready` (paket dipilih, belum bayar) → `on` (setelah bayar). `script.js` mengirim event `tn:balance`, motion memutar efek "nyala".
- Tiap section: kicker → judul per kata → lead; kartu muncul stagger; parallax ringan di paket, konfigurasi, contoh, banner tim (unmask), CTA akhir.
- Dashboard: meter, bar grafik, dan angka saldo dihitung naik saat terlihat.
- Header: bayangan saat scroll + progress bar. Lenis hanya untuk pointer halus (mouse/trackpad); dialog memakai `data-lenis-prevent` dan Lenis berhenti saat modal terbuka.
- `prefers-reduced-motion` atau GSAP gagal dimuat: semua konten tampil statis (gate `motion-ok` + failsafe 2,5 detik di `<head>`).

