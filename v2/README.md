# TokenNyala — landing page (arah editorial)

Buka `index.html` langsung di browser (double-click), atau jalankan server lokal:

    cd v1 && python3 -m http.server 8000   # lalu buka http://localhost:8000

- `index.html` — markup + copy ID/EN (span `data-l="id|en"`, ditukar lewat CSS)
- `styles.css` — token warna/tipografi, layout, animasi CSS, `prefers-reduced-motion`
- `script.js` — data paket/model/FAQ, picker "The Switch Turns On", checkout (form → bayar → sukses/gagal), katalog model, form tim, switch bahasa (`localStorage` `tn-lang`), GSAP/Lenis
- `assets/` — mark, spark, OG (SVG buatan sendiri); `assets/vendor/` — GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.13 disimpan lokal agar jalan offline

Font: Manrope + IBM Plex Mono dari Google Fonts (fallback ke font sistem bila offline).
Semua transaksi, API key, QR, dan nomor VA adalah simulasi.

Versi online (Artifact): https://claude.ai/artifact/E4WT23KL17sbePq9CBKADE

## Kredit

Logo model di `assets/models/` diambil dari [Lobe Icons](https://github.com/lobehub/lobe-icons) (MIT). Logo tetap merek dagang pemiliknya masing-masing.
