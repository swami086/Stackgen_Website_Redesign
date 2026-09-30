import { DUR, EASE } from "../tokens/motion.js";

function fullyMissing(snap) {
  return !snap || (snap.missing || []).includes("*");
}

async function readSnap(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function loadSnap(id) {
  const urls = [
    `_shared/assets/plates/${id}.snapshot.json`,
    new URL(`../assets/plates/${id}.snapshot.json`, import.meta.url).href,
  ];
  for (const url of urls) {
    const fromFile = await readSnap(url);
    if (!fromFile) continue;
    if (fullyMissing(fromFile)) throw new Error(`plate ${id} missing`);
    return fromFile;
  }
  const embedded = globalThis.SG_DATA?.plates?.[id] ?? null;
  if (!embedded || fullyMissing(embedded)) throw new Error(`plate ${id} missing`);
  return embedded;
}

export async function mountPlate(host, opts = {}) {
  const id = opts.id;
  const x = opts.x ?? 120;
  const y = opts.y ?? 90;
  const width = opts.width ?? 1680;
  const snap = await loadSnap(id);
  const vw = snap.viewport?.w || 1920;
  const vh = snap.viewport?.h || 1080;

  const el = document.createElement("div");
  el.className = "sg-plate";
  el.style.position = "absolute";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.width = width + "px";
  el.style.height = (width * vh / vw) + "px";

  const img = document.createElement("img");
  img.alt = "";
  img.src = `_shared/assets/plates/${id}.png`;
  el.appendChild(img);

  try {
    await img.decode();
  } catch {
    img.src = new URL(`../assets/plates/${id}.png`, import.meta.url).href;
    try {
      await img.decode();
    } catch {
      throw new Error(`plate ${id} missing`);
    }
  }
  host.appendChild(el);

  function box(key) {
    const miss = snap.missing || [];
    const b = snap.boxes?.[key];
    if (miss.includes("*") || miss.includes(key) || !b) {
      throw new Error(`plate ${id} missing box ${key}`);
    }
    const s = width / 1920;
    return { x: x + b.x * s, y: y + b.y * s, w: b.w * s, h: b.h * s };
  }

  function place(key, className) {
    const b = box(key);
    const node = document.createElement("div");
    node.className = className;
    node.style.position = "absolute";
    node.style.left = (b.x - x) + "px";
    node.style.top = (b.y - y) + "px";
    node.style.width = b.w + "px";
    node.style.height = b.h + "px";
    el.appendChild(node);
    return node;
  }

  return {
    el,
    box,
    mask(key) { return place(key, "sg-mask"); },
    overlay(key) { return place(key, "sg-overlay"); },
    enter(tl, t, enterOpts = {}) {
      const from = enterOpts.from ?? "right";
      const dur = enterOpts.dur ?? DUR.enter;
      const gsap = globalThis.gsap;
      const fromVars = {};
      const toVars = { duration: dur, ease: EASE.enter };
      if (from === "left") {
        fromVars.x = -240; toVars.x = 0; fromVars.opacity = 0; toVars.opacity = 1;
      } else if (from === "below") {
        fromVars.y = 120; toVars.y = 0;
      } else if (from === "z") {
        fromVars.scale = 0.86; toVars.scale = 1;
      } else {
        fromVars.x = 240; toVars.x = 0; fromVars.opacity = 0; toVars.opacity = 1;
      }
      gsap.set(el, fromVars);
      tl.to(el, toVars, t);
    },
  };
}
