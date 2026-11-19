/*
  TokenNyala v2 — motion layer.
  GSAP + ScrollTrigger for reveals and parallax, Lenis for smooth wheel scrolling (desktop pointer only).
  Everything here is decorative: with prefers-reduced-motion or without GSAP the page is fully usable as is.
*/
(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap, ScrollTrigger, Lenis } = window;

  if (reduce || !gsap || !ScrollTrigger) {
    root.classList.remove('motion-ok');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out', duration: 0.9 });

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const header = $('#top');
  const headerOffset = () => (header ? header.offsetHeight : 64) + 8;

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (Lenis && finePointer) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Modals lock the page (script.js toggles html.overflow-hidden): pause Lenis meanwhile.
    new MutationObserver(() => {
      if (root.classList.contains('overflow-hidden')) lenis.stop(); else lenis.start();
    }).observe(root, { attributes: true, attributeFilter: ['class'] });
  }

  /** Scroll to a section and move focus to its heading (same contract as script.js → goToSection). */
  function scrollToSection(target, { focus = true } = {}) {
    const done = () => {
      if (!focus) return;
      const heading = target.matches('h1, h2') ? target : target.querySelector('h1, h2') || target;
      if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    };
    if (lenis) lenis.scrollTo(target, { offset: target.id === 'top' ? -9999 : -headerOffset(), onComplete: done });
    else { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); done(); }
  }
  window.TokenNyalaMotion = { scrollTo: (el) => scrollToSection(el), lenis };

  // In-page links (nav, hero "Lihat cara kerjanya", footer, final CTA)
  if (lenis) {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.closest('dialog') || event.defaultPrevented) return;
      const id = link.getAttribute('href').slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (id === 'top' || id === 'main-content') { lenis.scrollTo(0); if (id === 'main-content') target.focus({ preventScroll: true }); return; }
      scrollToSection(target, { focus: link.closest('#mobile-menu, nav, footer') !== null });
      history.replaceState(null, '', '#' + id);
    });
  }

  /* ---------- Helpers ---------- */

  // .btn has a CSS transition on transform; it fights GSAP and can leave a button stuck mid-offset.
  // Clearing the inline props after a reveal hands the element back to its CSS (hover/active states).
  const CLEAR = 'transform,opacity,visibility';
  const hasButton = (els) => els.some((el) => el.matches('.btn, button'));

  /** Wrap each word of an element in a mask so it can slide up. Safe with i18n: setLanguage() replaces textContent. */
  function splitWords(el) {
    if (!el || el.dataset.split === 'done') return el ? $$('.split-w > span', el) : [];
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const mask = document.createElement('span');
      mask.className = 'split-w';
      const inner = document.createElement('span');
      inner.textContent = word;
      mask.append(inner);
      el.append(mask);
      if (i < words.length - 1) el.append(' ');
    });
    el.dataset.split = 'done';
    return $$('.split-w > span', el);
  }

  /** Reveal targets once when the trigger enters the viewport.
      Each element is revealed by one tween only (a second `from` would read the hidden state as its end). */
  const claimed = new WeakSet();
  const claim = (els) => els.filter((el) => el && !claimed.has(el) && !el.closest('dialog') && (claimed.add(el), true));
  function reveal(targets, vars = {}, trigger) {
    const list = claim(gsap.utils.toArray(targets));
    if (!list.length) return;
    const { start = 'top 86%', ...tween } = vars;
    gsap.from(list, {
      y: 40, autoAlpha: 0, stagger: 0.08, ...(hasButton(list) ? { clearProps: CLEAR } : {}), ...tween,
      scrollTrigger: { trigger: trigger || list[0], start, once: true }
    });
  }

  /** Scrubbed parallax between "enters viewport" and "leaves viewport".
      Uses yPercent/xPercent so it composes with reveal tweens, which animate y/x. */
  function parallax(el, from, to, trigger) {
    if (!el) return;
    gsap.fromTo(el, from, { ...to, ease: 'none', scrollTrigger: { trigger: trigger || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- Header: shadow + scroll progress ---------- */
  const progress = $('[data-scroll-progress]');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => {
      if (progress) gsap.set(progress, { scaleX: self.progress });
      if (header) header.dataset.scrolled = String(self.scroll() > 8);
    }
  });

  /* ---------- Hero ---------- */
  const hero = $('section[aria-labelledby="hero-title"]');
  const heroCopy = $('[data-intro="copy"]', hero);
  const heroBoard = $('[data-intro="board"]', hero);
  const board = $('[data-board]', hero);

  function heroIntro() {
    const titleWords = $$('#hero-title > span', hero).flatMap(splitWords);
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(heroCopy.children[0], { y: 16, autoAlpha: 0, duration: 0.7 })
      .from(titleWords, { yPercent: 115, duration: 1.05, stagger: 0.045 }, 0.05)
      .from(heroCopy.children[2], { y: 24, autoAlpha: 0, duration: 0.8 }, 0.35)
      .from(heroCopy.children[3].children, { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.08, clearProps: CLEAR }, 0.45)
      .from(heroCopy.children[4].children, { x: -12, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.6)
      .from(board, { x: 70, rotationY: -14, rotationX: 4, autoAlpha: 0, duration: 1.2, transformOrigin: '100% 50%' }, 0.15)
      .from($$('[data-board] > *', hero), { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.45)
      .from($$('[data-board-pane]', hero), { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.6)
      .from($$('[data-code-lines] > i', hero), { scaleX: 0, transformOrigin: '0 50%', duration: 0.6, stagger: 0.07, ease: 'power3.out' }, 0.8)
      .from($$('[data-float]', hero), { scale: 0, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(2)' }, 0.9);
    // Children are now held at their start values: show the containers.
    root.classList.add('motion-ready');
  }

  if (hero && heroCopy && heroBoard && board) {
    if (root.classList.contains('motion-ok')) heroIntro(); // failsafe already showed it → skip the intro
    root.classList.add('motion-ready');

    // Parallax depth while scrolling out of the hero
    const heroScroll = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero-blob]', { yPercent: 35, scale: 1.15, ease: 'none', scrollTrigger: heroScroll });
    gsap.to('[data-hero-blob-2]', { yPercent: -60, ease: 'none', scrollTrigger: heroScroll });
    gsap.to(heroCopy, { y: 70, autoAlpha: 0.25, ease: 'none', scrollTrigger: { ...heroScroll, start: 'top+=60 top' } });
    gsap.to(heroBoard, { y: -50, ease: 'none', scrollTrigger: heroScroll });
    $$('[data-float]', hero).forEach((el) => {
      gsap.to(el, { y: Number(el.dataset.speed) || -80, rotation: '+=25', ease: 'none', scrollTrigger: heroScroll });
    });
    $$('[data-board-pane]', hero).forEach((el, i) => {
      gsap.to(el, { yPercent: i ? -14 : 8, ease: 'none', scrollTrigger: heroScroll });
    });

    // Pointer tilt on the board (desktop)
    if (finePointer) {
      const rx = gsap.quickTo(board, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(board, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      hero.addEventListener('pointermove', (e) => {
        const r = heroBoard.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        ry(gsap.utils.clamp(-8, 8, dx * 16));
        rx(gsap.utils.clamp(-6, 6, -dy * 12));
      });
      hero.addEventListener('pointerleave', () => { rx(0); ry(0); });
    }
  } else {
    root.classList.add('motion-ready');
  }

  /* Balance "switch on" moment (script.js dispatches tn:balance on state change) */
  document.addEventListener('tn:balance', ({ detail }) => {
    const balance = $('[data-hero-balance]');
    if (!balance || !board) return;
    const pill = $('[data-hero-pill]', balance);
    const amount = $('[data-hero-amount]', balance);
    gsap.fromTo(pill, { scale: 0.8 }, { scale: 1, duration: 0.6, ease: 'back.out(3)' });
    if (detail.state === 'on') {
      gsap.fromTo(board, { boxShadow: '0 0 0 0 rgba(0,210,160,.55), 0 24px 60px rgba(0,22,106,.12)' },
        { boxShadow: '0 0 0 18px rgba(0,210,160,0), 0 24px 60px rgba(0,22,106,.12)', duration: 1.2, ease: 'power2.out', clearProps: 'boxShadow' });
      gsap.fromTo(balance, { backgroundColor: 'rgba(0,210,160,.22)' }, { backgroundColor: 'rgba(247,248,252,.6)', duration: 1.4, clearProps: 'backgroundColor' });
    }
    if (detail.state !== 'off' && amount) {
      const text = amount.textContent;
      const counter = { v: 0 };
      const fmt = new Intl.NumberFormat(root.lang === 'en' ? 'en-US' : 'id-ID');
      gsap.to(counter, {
        v: detail.credit, duration: 0.9, ease: 'power2.out',
        onUpdate: () => { amount.textContent = 'Rp' + fmt.format(Math.round(counter.v)); },
        onComplete: () => { amount.textContent = text; }
      });
    }
  });

  /* ---------- Section headings (kicker → title words → lead) ---------- */
  $$('main section[id] h2').forEach((h2) => {
    if (h2.closest('dialog')) return;
    const block = h2.parentElement;
    const kicker = h2.previousElementSibling;
    const lead = h2.nextElementSibling?.tagName === 'P' ? h2.nextElementSibling : null;
    const words = splitWords(h2);
    claim([kicker, h2, lead]);
    const tl = gsap.timeline({ scrollTrigger: { trigger: block, start: 'top 85%', once: true } });
    if (kicker) tl.from(kicker, { x: -24, autoAlpha: 0, duration: 0.7 });
    tl.from(words, { yPercent: 115, duration: 1, stagger: 0.035 }, 0.05);
    if (lead) tl.from(lead, { y: 24, autoAlpha: 0, duration: 0.8 }, 0.3);
  });

  /* ---------- Cara kerja ---------- */
  const steps = $$('#cara-kerja ol > li');
  reveal(steps, { y: 70, rotation: 1.5, stagger: 0.12, duration: 1 });
  reveal($$('#cara-kerja ol > li span.font-mono'), { y: 0, scale: 0.4, ease: 'back.out(2.2)', stagger: 0.12, duration: 0.7, start: 'top 80%' }, steps[0]);

  /* ---------- Paket ---------- */
  const pkgPanel = $('#paket-panel');
  if (pkgPanel) {
    reveal(pkgPanel.firstElementChild, { y: 30, scaleX: 0.94, duration: 1 });
    const pkgItems = $$('ul > li', pkgPanel);
    reveal(pkgItems, { y: 90, stagger: 0.12, duration: 1.1 }, pkgItems[0]);
    gsap.matchMedia().add('(min-width: 64rem)', () => {
      // Middle card floats against the others → layered depth
      const cards = pkgItems.map((li) => li.firstElementChild);
      parallax(cards[1], { yPercent: 8 }, { yPercent: -8 }, pkgPanel);
      parallax(cards[0], { yPercent: 2 }, { yPercent: -2 }, pkgPanel);
      parallax(cards[2], { yPercent: 2 }, { yPercent: -2 }, pkgPanel);
    });
  }

  /* ---------- Model AI ---------- */
  reveal('[data-model-preview] > *', { y: 50, scale: 0.96, stagger: 0.07 }, '[data-model-preview]');
  reveal('#model .shell > div:last-child', { y: 20 });

  /* ---------- Pakai di tool ---------- */
  reveal('#pakai ol > li', { x: -40, y: 0, stagger: 0.12 }, '#pakai ol');
  const config = $('#pakai figure');
  reveal(config, { y: 80, rotation: 3, duration: 1.2, transformOrigin: '0% 100%' });
  reveal($$('#pakai figure dl > div, #pakai figure ul > li'), { y: 16, stagger: 0.06, start: 'top 80%' }, config);
  reveal(config?.nextElementSibling, { y: 30 });
  gsap.matchMedia().add('(min-width: 64rem)', () => parallax(config?.parentElement, { yPercent: 8 }, { yPercent: -8 }, '#pakai'));

  /* ---------- Manfaat + dashboard ---------- */
  reveal('#manfaat article', { y: 60, stagger: 0.1 }, '#manfaat .grid');
  const chart = $('[data-usage-chart]');
  if (chart) {
    const bars = $$('li > span[aria-hidden="true"]:not(.absolute)', chart);
    const tips = $$('li > span.absolute', chart);
    const meter = chart.closest('article')?.querySelector('[role="presentation"] > div');
    const amount = $('#manfaat [data-price="82400"]');
    const tl = gsap.timeline({ scrollTrigger: { trigger: chart, start: 'top 82%', once: true } });
    if (meter) tl.from(meter, { scaleX: 0, transformOrigin: '0 50%', duration: 1.2, ease: 'power3.out' });
    tl.from(bars, { scaleY: 0, transformOrigin: '50% 100%', duration: 0.9, stagger: 0.07, ease: 'power3.out' }, 0.1)
      .from(tips.filter((t) => !t.classList.contains('opacity-0')), { y: 8, autoAlpha: 0, duration: 0.5 }, 0.7);
    if (amount) {
      const counter = { p: 0 };
      tl.to(counter, {
        p: 1, duration: 1.2, ease: 'power2.out',
        onUpdate: () => {
          const fmt = new Intl.NumberFormat(root.lang === 'en' ? 'en-US' : 'id-ID');
          amount.textContent = 'Rp' + fmt.format(Math.round(Number(amount.dataset.price) * counter.p));
        }
      }, 0);
    }
  }

  /* ---------- Contoh ---------- */
  const example = $('#contoh figure');
  reveal(example, { y: 60, duration: 1.1 });
  reveal($$('#contoh dl > div'), { x: 30, y: 0, stagger: 0.07, start: 'top 80%' }, example);
  gsap.matchMedia().add('(min-width: 64rem)', () => parallax(example, { yPercent: 10 }, { yPercent: -10 }, '#contoh'));

  /* ---------- Tim & bisnis: banner unmasks while scrolling ---------- */
  const team = $('#tim .shell > div');
  if (team) {
    gsap.fromTo(team, { clipPath: 'inset(8% 6% 8% 6% round 28px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none',
      scrollTrigger: { trigger: team, start: 'top 95%', end: 'top 45%', scrub: true }
    });
    reveal($$('ul > li', team), { x: 30, y: 0, stagger: 0.07, start: 'top 75%' }, team);
    reveal(team.lastElementChild, { y: 20, start: 'top 75%' }, team);
  }

  /* ---------- FAQ ---------- */
  reveal('#faq details', { y: 24, stagger: 0.04, duration: 0.7 }, '#faq details');
  reveal('#faq .shell > div:first-child > button', { y: 16 });

  /* ---------- Final CTA ---------- */
  const final = $('#mulai .shell > div');
  if (final) {
    gsap.fromTo(final, { scale: 0.92, borderRadius: 40 }, {
      scale: 1, borderRadius: 20, ease: 'none',
      scrollTrigger: { trigger: final, start: 'top bottom', end: 'top 55%', scrub: true }
    });
    const [c1, c2] = $$(':scope > div[aria-hidden="true"]', final);
    parallax(c1, { yPercent: -30, xPercent: 10 }, { yPercent: 40, xPercent: -10 }, final);
    parallax(c2, { yPercent: 40 }, { yPercent: -50 }, final);
    reveal($$('.relative > *', final).filter((el) => el.id !== 'final-title'), { y: 24, stagger: 0.08, start: 'top 75%' }, final);
  }

  /* ---------- Footer ---------- */
  reveal('footer .shell > *', { y: 30, stagger: 0.08, start: 'top 95%' }, 'footer');

  /* ---------- Keep triggers in sync with late layout changes ---------- */
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);
  setTimeout(refresh, 600); // Tailwind browser build injects its CSS after parse
})();
