import { EASE } from "../tokens/motion.js";

const NS = "http://www.w3.org/2000/svg";

export function arcPoint(a, b, u, bend = 0.12) {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
  const c = { x: (a.x + b.x) / 2 - (dy / d) * bend * d, y: (a.y + b.y) / 2 + (dx / d) * bend * d };
  const v = 1 - u;
  return { x: v * v * a.x + 2 * v * u * c.x + u * u * b.x, y: v * v * a.y + 2 * v * u * c.y + u * u * b.y };
}

function samplesFor(a, b, t0, t1, bend, easeName) {
  const ease = globalThis.gsap.parseEase(easeName);
  const steps = 24;
  const out = [];
  for (let s = 0; s <= steps; s++) {
    const raw = s / steps;
    const p = arcPoint(a, b, ease(raw), bend);
    out.push({ x: p.x, y: p.y, t: t0 + (t1 - t0) * raw });
  }
  return out;
}

function playSamples(tl, el, samples) {
  const gsap = globalThis.gsap;
  gsap.set(el, { x: samples[0].x, y: samples[0].y });
  const frames = [];
  for (let i = 1; i < samples.length; i++) {
    const dt = samples[i].t - samples[i - 1].t;
    if (dt <= 0) continue;
    frames.push({ x: samples[i].x, y: samples[i].y, duration: dt, ease: "none" });
  }
  if (frames.length) tl.to(el, { keyframes: frames, ease: "none" }, samples[0].t);
}

export function mountCursor(host) {
  const gsap = globalThis.gsap;
  const root = document.createElement("div");
  root.className = "sg-cursor";
  root.style.position = "absolute";
  root.style.left = "0";
  root.style.top = "0";

  const arrow = document.createElement("div");
  arrow.className = "sg-cursor-arrow";

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "22");
  svg.setAttribute("height", "22");
  svg.setAttribute("viewBox", "0 0 22 22");
  const pathEl = document.createElementNS(NS, "path");
  pathEl.setAttribute("d", "M1 1 L1 16.5 L5.4 12.4 L8.6 19.2 L11.5 18 L8.2 11.2 L14 11.2 Z");
  svg.appendChild(pathEl);
  arrow.appendChild(svg);
  root.appendChild(arrow);
  host.appendChild(root);
  gsap.set(root, { opacity: 0 });

  return {
    path(tl, points) {
      const samples = [];
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i], b = points[i + 1];
        const seg = samplesFor(a, b, a.t, b.t, 0.12, EASE.camera);
        if (i > 0) seg.shift();
        samples.push(...seg);
      }
      if (!samples.length && points.length) {
        gsap.set(root, { x: points[0].x, y: points[0].y });
        return;
      }
      if (samples.length) playSamples(tl, root, samples);
    },
    click(tl, t) {
      tl.to(arrow, { scale: 0.96, duration: 0.045, ease: "power2.out" }, t);
      tl.to(arrow, { scale: 1, duration: 0.045, ease: "power2.out" }, t + 0.045);
      const ripple = document.createElement("div");
      ripple.className = "sg-ripple";
      root.appendChild(ripple);
      gsap.set(ripple, { scale: 0, opacity: 0 });
      tl.fromTo(ripple,
        { scale: 0, opacity: 0.9 },
        { scale: 1, opacity: 0, duration: 0.35, ease: "none", immediateRender: false },
        t);
    },
    show(tl, t) {
      tl.to(root, { opacity: 1, duration: 0.2, ease: "none" }, t);
    },
    hide(tl, t) {
      tl.to(root, { opacity: 0, duration: 0.2, ease: "none" }, t);
    },
  };
}
