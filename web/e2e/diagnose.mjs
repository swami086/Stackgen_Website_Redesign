// One-off parity diagnostic: overlapping SVG text, invisible logos, overflow.
// Run: node e2e/diagnose.mjs   (dev server must be on :3000)
import { chromium } from '@playwright/test';

const ROUTES = [
  '/',
  '/product/aiden-for-infrastructure',
  '/product/aiden-for-automation',
  '/product/aiden-for-observability',
  '/product/aiden-for-sre',
  '/platform',
  '/case-studies',
  '/case-studies/greythr',
  '/case-studies/innovaccer',
  '/schedule-demo',
];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1024 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const probe = () => {
  const srgb = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  const parse = (s) => (s.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);

  const overlaps = [];
  document.querySelectorAll('svg').forEach((svg) => {
    const label = svg.querySelector('title')?.textContent || '(untitled svg)';
    const boxes = [...svg.querySelectorAll('text')]
      .map((t) => {
        const r = t.getBoundingClientRect();
        return { t: (t.textContent || '').trim().slice(0, 40), x: r.x, y: r.y, w: r.width, h: r.height };
      })
      .filter((b) => b.w > 0 && b.h > 0);
    const pairs = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox > 2 && oy > 2) pairs.push(`"${a.t}" ×  "${b.t}" (${Math.round(ox)}px)`);
      }
    }
    if (pairs.length) overlaps.push({ label, texts: boxes.length, count: pairs.length, pairs: pairs.slice(0, 6) });
  });

  // SVG text escaping its own viewBox-scaled container
  const overflow = [];
  document.querySelectorAll('svg').forEach((svg) => {
    const sr = svg.getBoundingClientRect();
    [...svg.querySelectorAll('text')].forEach((t) => {
      const r = t.getBoundingClientRect();
      if (r.width > 0 && (r.right > sr.right + 1 || r.left < sr.left - 1)) {
        overflow.push({
          svg: svg.querySelector('title')?.textContent || '(untitled)',
          t: (t.textContent || '').trim().slice(0, 40),
          over: Math.round(Math.max(r.right - sr.right, sr.left - r.left)),
        });
      }
    });
  });

  // Logos that are effectively invisible against their backdrop
  const logos = [];
  document.querySelectorAll('img').forEach((img) => {
    if (!/\/logos\//.test(img.currentSrc || img.src)) return;
    let el = img.parentElement;
    let bg = 'rgba(0, 0, 0, 0)';
    while (el && bg === 'rgba(0, 0, 0, 0)') {
      bg = getComputedStyle(el).backgroundColor;
      el = el.parentElement;
    }
    logos.push({
      alt: img.alt,
      src: (img.currentSrc || img.src).split('/').pop().split('?')[0],
      bg,
      bgLum: +lum(parse(bg)).toFixed(3),
      filter: getComputedStyle(img).filter,
      broken: img.naturalWidth === 0,
    });
  });

  const viewportOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
  const offscreen = [...document.querySelectorAll('main h1, main h2, main p, main a, main button, nav a, nav button')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      const scroller = el.closest('[style*="overflow-x"], [class*="overflow-x-auto"], [class*="overflow-x-scroll"]');
      return { tag: el.tagName, text: (el.textContent || '').trim().slice(0, 40), left: r.left, right: r.right, scroller: Boolean(scroller) };
    })
    .filter((box) => !box.scroller && (box.right > innerWidth + 1 || box.left < -1))
    .slice(0, 12);
  return {
    height: document.documentElement.scrollHeight,
    viewportOverflow,
    offscreen,
    overlaps,
    overflow: overflow.slice(0, 12),
    logos,
  };
};

const browser = await chromium.launch();
const report = {};
for (const viewport of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  for (const route of ROUTES) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
    report[`${viewport.name} ${route}`] = await page.evaluate(probe);
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 2));
