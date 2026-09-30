import { mulberry32 } from "./prng.js";
export const STAGE = { w: 1920, h: 1080 };
const N = 7;

export function ribbonSeeds(seed, count) {
  const r = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    i, baseY: 120 + r() * 840, amp: r(), freq: 0.002 + r() * 0.004, phase: r() * Math.PI * 2,
    speed: 0.5 + r(), edgeY: r() * STAGE.h, bow: (r() - 0.5) * 360, violet: r() < 0.7,
    width: 10 + r() * 8, alpha: 0.82 + r() * 0.18,
  }));
}

function wave(s, t, ampMax, speedMul) {
  return Array.from({ length: N }, (_, k) => {
    const x = -200 + (k / (N - 1)) * (STAGE.w + 400);
    return { x, y: s.baseY + s.amp * ampMax * Math.sin(s.freq * x + s.phase + s.speed * speedMul * t) };
  });
}

function toward(a, b, s, t) {
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
  return Array.from({ length: N }, (_, k) => {
    const u = k / (N - 1);
    const bow = s.bow * Math.sin(Math.PI * u) * (1 + 0.1 * Math.sin(s.speed * t + s.phase));
    return { x: a.x + dx * u - (dy / len) * bow, y: a.y + dy * u + (dx / len) * bow };
  });
}

export function pointsFor(s, mode, t, target = { x: 1500, y: 540 }) {
  switch (mode) {
    case "dormant": return wave(s, t, 50, 0.25);
    case "storm": return wave(s, t, 220, 1.4);
    case "converge": return toward({ x: -100, y: s.edgeY }, target, s, t);
    case "fan": return toward(target, { x: STAGE.w + 100, y: s.edgeY }, s, t);
    case "rail": return wave({ ...s, baseY: 200 + (s.i % 9) * 85, amp: 0.15 }, t, 40, 0.3);
    default: throw new Error(`unknown ribbon mode ${mode}`);
  }
}

export function modeWeights(modes, t, blend = 0.8) {
  let i = 0;
  while (i < modes.length - 1 && t >= modes[i + 1].t) i++;
  const cur = modes[i], prev = modes[i - 1];
  if (!prev) return [{ ...cur, w: 1 }];
  const u = Math.min(1, (t - cur.t) / blend);
  const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
  return e >= 1 ? [{ ...cur, w: 1 }] : [{ ...prev, w: 1 - e }, { ...cur, w: e }];
}

export function ribbonAt(s, modes, t) {
  const parts = modeWeights(modes, t);
  const pts = pointsFor(s, parts[0].mode, t, parts[0].target).map(p => ({ x: p.x * parts[0].w, y: p.y * parts[0].w }));
  for (const part of parts.slice(1)) {
    pointsFor(s, part.mode, t, part.target).forEach((p, k) => { pts[k].x += p.x * part.w; pts[k].y += p.y * part.w; });
  }
  return { points: pts, opacity: parts.reduce((a, p) => a + (p.opacity ?? 1) * p.w, 0) };
}
