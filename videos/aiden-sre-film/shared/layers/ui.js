import { DUR, EASE, STAGGER } from "../tokens/motion.js";
import { arcPoint } from "./cursor.js";

function gsap() { return globalThis.gsap; }

function drive(tl, until, paint) {
  const proxy = { p: 0 };
  const end = Math.max(until, 0.001);
  tl.to(proxy, {
    p: 1,
    duration: end,
    ease: "none",
    onUpdate: () => paint(proxy.p * end),
  }, 0);
}

function playArc(tl, el, from, to, t, dur, bend, easeName) {
  const ease = gsap().parseEase(easeName);
  const steps = 24;
  const samples = [];
  for (let s = 0; s <= steps; s++) {
    const raw = s / steps;
    const p = arcPoint(from, to, ease(raw), bend);
    samples.push({ x: p.x, y: p.y, t: t + dur * raw });
  }
  gsap().set(el, { x: samples[0].x, y: samples[0].y });
  const frames = [];
  for (let i = 1; i < samples.length; i++) {
    const dt = samples[i].t - samples[i - 1].t;
    if (dt <= 0) continue;
    frames.push({ x: samples[i].x, y: samples[i].y, duration: dt, ease: "none" });
  }
  if (frames.length) tl.to(el, { keyframes: frames, ease: "none" }, samples[0].t);
}

export function collapseRows(tl, els, t, opts = {}) {
  const stagger = opts.stagger ?? STAGGER.rows;
  els.forEach((el, i) => {
    const at = t + i * stagger;
    el.style.overflow = "hidden";
    tl.to(el, { opacity: 0.25, duration: 0.18, ease: "none" }, at);
    tl.to(el, {
      height: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      duration: 0.42,
      ease: EASE.snap,
    }, at + 0.18);
  });
}

export function flipReorder(tl, els, order, t, opts = {}) {
  const dur = opts.dur ?? DUR.ui;
  const tops = els.map((el) => el.offsetTop);
  els.forEach((el, i) => {
    tl.to(el, { y: tops[order[i]] - tops[i], duration: dur, ease: EASE.snap }, t);
  });
}

export function fillBars(tl, bars, t, opts = {}) {
  const stagger = opts.stagger ?? 0.12;
  bars.forEach((bar, i) => {
    const at = t + i * stagger;
    bar.el.style.transformOrigin = "left center";
    gsap().set(bar.el, { scaleX: 0 });
    tl.to(bar.el, { scaleX: bar.to, duration: 0.8, ease: EASE.enter }, at);
    if (bar.label != null && bar.value != null) {
      bar.label.textContent = "0%";
      drive(tl, at + 0.8, (now) => {
        const u = now <= at ? 0 : Math.min(1, (now - at) / 0.8);
        bar.label.textContent = Math.round(bar.value * u) + "%";
      });
    }
  });
}

export function typewriter(tl, el, text, t, opts = {}) {
  const cps = opts.cps ?? 50;
  const dur = text.length / cps;
  el.textContent = "";
  if (dur <= 0) return;
  drive(tl, t + dur, (now) => {
    const u = now <= t ? 0 : Math.min(1, (now - t) / dur);
    el.textContent = text.slice(0, Math.min(text.length, Math.floor(u * text.length + 1e-6)));
  });
}

export function ringPulse(tl, host, box, t, opts = {}) {
  const color = opts.color ?? "var(--sg-coral)";
  const rings = opts.rings ?? 3;
  for (let i = 0; i < rings; i++) {
    const ring = document.createElement("div");
    ring.className = "sg-ring";
    ring.style.position = "absolute";
    ring.style.left = box.x + "px";
    ring.style.top = box.y + "px";
    ring.style.width = box.w + "px";
    ring.style.height = box.h + "px";
    ring.style.border = "1px solid " + color;
    host.appendChild(ring);
    gsap().set(ring, { scale: 1, opacity: 0 });
    tl.fromTo(ring,
      { scale: 1, opacity: 0.8 },
      { scale: 1.6, opacity: 0, duration: 0.9, ease: "none", immediateRender: false },
      t + i * 0.18);
  }
}

export function strike(tl, el, t) {
  const line = document.createElement("div");
  line.className = "sg-strike";
  if (!el.style.position || el.style.position === "static") el.style.position = "relative";
  el.appendChild(line);
  gsap().set(line, { scaleX: 0 });
  tl.to(line, { scaleX: 1, duration: 0.3, ease: "none" }, t);
  tl.to(el, { opacity: 0.45, duration: 0.2, ease: EASE.snap }, t + 0.3);
}

export function drawPath(tl, pathEl, t, dur) {
  const len = pathEl.getTotalLength();
  pathEl.setAttribute("stroke-dasharray", String(len));
  gsap().set(pathEl, { strokeDashoffset: len });
  tl.to(pathEl, { strokeDashoffset: 0, duration: dur, ease: "none" }, t);
}

export function countUp(tl, el, from, to, t, dur, fmt = (n) => Math.round(n).toLocaleString("en-US")) {
  el.textContent = fmt(from);
  drive(tl, t + dur, (now) => {
    const u = now <= t ? 0 : Math.min(1, (now - t) / dur);
    el.textContent = fmt(from + (to - from) * u);
  });
}

export function chipAlong(tl, host, spec) {
  const bend = spec.bend ?? 0.18;
  const chip = document.createElement("div");
  chip.className = "sg-chip";
  chip.textContent = spec.label;
  host.appendChild(chip);
  playArc(tl, chip, spec.from, spec.to, spec.t, spec.dur, bend, EASE.settle);
  return chip;
}

export function leak(tl, host, t, opts = {}) {
  const img = document.createElement("img");
  img.className = "sg-leak";
  img.alt = "";
  img.src = opts.src ?? "_shared/assets/gen/G02-1.png";
  host.appendChild(img);
  gsap().set(img, { opacity: 0 });
  tl.to(img, { opacity: 0.5, duration: 0.3, ease: "none" }, t);
  tl.to(img, { opacity: 0, duration: 0.6, ease: "none" }, t + 0.3);
}
