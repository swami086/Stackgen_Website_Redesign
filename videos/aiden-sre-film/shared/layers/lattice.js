import { mulberry32 } from "./prng.js";
import { EASE, DUR, STAGGER } from "../tokens/motion.js";

const SVG = "http://www.w3.org/2000/svg";

export function isoToStage(gx, gy) {
  return { x: 960 + (gx - gy) * 110, y: 300 + (gx + gy) * 64 };
}

function ensureStyles() {
  if (document.getElementById("sg-lattice-css")) return;
  const style = document.createElement("style");
  style.id = "sg-lattice-css";
  style.textContent = [
    ".sg-lat{position:absolute;inset:0;border-radius:0;pointer-events:none}",
    ".sg-lat-svg{position:absolute;inset:0;width:1920px;height:1080px;overflow:visible}",
    ".sg-lat-edge{fill:none;stroke:var(--sg-cyan);stroke-width:1;stroke-opacity:.7}",
    ".sg-lat-node{position:absolute;width:28px;height:28px;margin:-14px 0 0 -14px;transform-origin:50% 50%;border-radius:0}",
    ".sg-lat-diamond{width:28px;height:28px;box-sizing:border-box;border:1px solid var(--sg-violet);background:var(--sg-panel);transform:rotate(45deg);border-radius:0}",
    ".sg-lat-label{position:absolute;left:50%;top:40px;transform:translateX(-50%);font-family:var(--sg-mono);font-size:14px;line-height:1;color:var(--sg-cream);white-space:nowrap;border-radius:0}",
    ".sg-lat-ring{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;box-sizing:border-box;border:1px solid var(--sg-violet);background:transparent;border-radius:0;z-index:2}",
  ].join("");
  document.head.appendChild(style);
}

export function mountLattice(host, { graph, seed }) {
  ensureStyles();
  const byId = new Map(graph.nodes.map(n => [n.id, n]));
  const nodeEls = new Map();
  const diamonds = new Map();
  const rings = new Map();
  const edgeEls = [];

  const root = document.createElement("div");
  root.className = "sg-lat";
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("class", "sg-lat-svg");
  svg.setAttribute("viewBox", "0 0 1920 1080");
  root.appendChild(svg);

  for (const [fromId, toId] of graph.edges) {
    const a = isoToStage(byId.get(fromId).gx, byId.get(fromId).gy);
    const b = isoToStage(byId.get(toId).gx, byId.get(toId).gy);
    const path = document.createElementNS(SVG, "path");
    path.setAttribute("class", "sg-lat-edge");
    path.setAttribute("d", `M ${a.x} ${a.y} L ${b.x} ${b.y}`);
    svg.appendChild(path);
    edgeEls.push(path);
  }

  for (const n of graph.nodes) {
    const p = isoToStage(n.gx, n.gy);
    const wrap = document.createElement("div");
    wrap.className = "sg-lat-node";
    wrap.dataset.id = n.id;
    wrap.dataset.layoutAllowOverflow = "";
    wrap.style.left = `${p.x}px`;
    wrap.style.top = `${p.y}px`;
    const diamond = document.createElement("div");
    diamond.className = "sg-lat-diamond";
    const label = document.createElement("div");
    label.className = "sg-lat-label";
    label.textContent = n.label;
    wrap.appendChild(diamond);
    wrap.appendChild(label);
    const ring = document.createElement("div");
    ring.className = "sg-lat-ring";
    ring.style.left = `${p.x}px`;
    ring.style.top = `${p.y}px`;
    root.appendChild(wrap);
    root.appendChild(ring);
    nodeEls.set(n.id, wrap);
    diamonds.set(n.id, diamond);
    rings.set(n.id, ring);
  }

  host.appendChild(root);

  for (const path of edgeEls) {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  }
  for (const wrap of nodeEls.values()) gsap.set(wrap, { scale: 0, transformOrigin: "50% 50%" });
  for (const ring of rings.values()) {
    gsap.set(ring, { rotation: 45, scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%" });
  }

  function drawIn(tl, t, dur) {
    const ordered = graph.nodes.slice().sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy) || (a.id < b.id ? -1 : 1));
    const nodePhase = dur * 0.45;
    const step = STAGGER.chips;
    const popDur = Math.max(0.16, nodePhase - step * Math.max(0, ordered.length - 1));
    ordered.forEach((n, i) => {
      tl.to(nodeEls.get(n.id), { scale: 1, duration: popDur, ease: EASE.settle }, t + i * step);
    });

    const edgeT = t + nodePhase;
    const edgePhase = dur - nodePhase;
    const rand = mulberry32(seed >>> 0);
    const order = edgeEls.map((path, i) => ({ path, i, k: rand() })).sort((a, b) => a.k - b.k || a.i - b.i);
    const each = order.length ? Math.min(0.45, Math.max(0.2, edgePhase * 0.5)) : 0;
    const gap = order.length > 1 ? Math.max(0, (edgePhase - each) / (order.length - 1)) : 0;
    order.forEach((item, i) => {
      tl.to(item.path, { strokeDashoffset: 0, duration: each, ease: "none" }, edgeT + i * gap);
    });
  }

  function showAll() {
    for (const wrap of nodeEls.values()) gsap.set(wrap, { scale: 1 });
    for (const path of edgeEls) gsap.set(path, { strokeDashoffset: 0 });
  }

  function node(id) {
    const n = byId.get(id);
    if (!n) throw new Error(`lattice missing node ${id}`);
    return isoToStage(n.gx, n.gy);
  }

  function mark(tl, id, t, opts = {}) {
    const color = opts.color ?? "var(--sg-violet)";
    const ring = rings.get(id);
    if (!ring) throw new Error(`lattice missing node ${id}`);
    tl.set(ring, { autoAlpha: 1, borderColor: color }, t);
    tl.to(ring, { scale: 1, duration: DUR.micro, ease: EASE.settle }, t);
  }

  function pulse(tl, id, t) {
    const diamond = diamonds.get(id);
    if (!diamond) throw new Error(`lattice missing node ${id}`);
    tl.set(diamond, { backgroundColor: "var(--sg-cyan)" }, t);
    tl.set(diamond, { backgroundColor: "var(--sg-panel)" }, t + 0.3);
  }

  return { drawIn, showAll, node, mark, pulse };
}
