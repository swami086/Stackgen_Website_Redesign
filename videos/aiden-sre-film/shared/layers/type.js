import { EASE, DUR, STAGGER } from "../tokens/motion.js";

export function splitWords(text, bold) {
  const words = text.split(" ");
  const b = bold ? bold.split(" ") : [];
  const start = b.length ? words.findIndex((_, i) => b.every((bw, j) => words[i + j] === bw)) : -1;
  return words.map((word, i) => ({ word, bold: start >= 0 && i >= start && i < start + b.length }));
}

function gsap() {
  const g = globalThis.gsap;
  if (!g) throw new Error("gsap missing");
  return g;
}

function place(el, pos, fallback) {
  const x = pos && pos.x != null ? pos.x : fallback.x;
  const y = pos && pos.y != null ? pos.y : fallback.y;
  el.style.left = x + "px";
  el.style.top = y + "px";
}

function masked(text, extra) {
  const mask = document.createElement("span");
  mask.className = "sg-mask";
  mask.setAttribute("data-layout-allow-overflow", "");
  const word = document.createElement("span");
  word.className = extra ? "sg-rise " + extra : "sg-rise";
  word.setAttribute("aria-hidden", "true");
  word.textContent = text;
  mask.appendChild(word);
  return { mask, word };
}

function rise(tl, el, t, dur, fromPercent) {
  gsap().set(el, { yPercent: fromPercent });
  tl.fromTo(el, { yPercent: fromPercent }, {
    yPercent: 0, duration: dur, ease: EASE.enter, immediateRender: false,
  }, t);
}

function rectEdge(box, x, y) {
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const dx = x - cx;
  const dy = y - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: box.y };
  const sx = dx === 0 ? Infinity : (box.w / 2) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (box.h / 2) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

export function mountType(host) {
  let supportLine = null;

  function eyebrow(tl, text, t, pos) {
    const root = document.createElement("div");
    root.className = "sg-eyebrow";
    root.setAttribute("aria-label", text);
    place(root, pos, { x: 120, y: 120 });
    const rule = document.createElement("span");
    rule.className = "sg-rule";
    root.appendChild(rule);
    const { mask, word } = masked(text);
    root.appendChild(mask);
    host.appendChild(root);
    gsap().set(rule, { scaleX: 0, transformOrigin: "left center" });
    tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: EASE.enter, immediateRender: false }, t);
    rise(tl, word, t + 0.1, 0.5, 100);
  }

  function headline(tl, spec, t, pos) {
    const root = document.createElement("div");
    root.className = "sg-headline";
    root.setAttribute("aria-label", spec.text);
    place(root, pos, { x: 120, y: 420 });
    const glyphs = [];
    const parts = splitWords(spec.text, spec.bold);
    parts.forEach((part, i) => {
      const { mask, word } = masked(part.word, part.bold ? "sg-bold" : "");
      root.appendChild(mask);
      glyphs.push(word);
      if (i < parts.length - 1) root.appendChild(document.createTextNode(" "));
    });
    host.appendChild(root);
    gsap().set(glyphs, { yPercent: 110, letterSpacing: "0.04em" });
    tl.fromTo(glyphs, { yPercent: 110, letterSpacing: "0.04em" }, {
      yPercent: 0,
      letterSpacing: "-0.02em",
      duration: DUR.enter,
      ease: EASE.enter,
      stagger: STAGGER.words,
      immediateRender: false,
    }, t);
  }

  function support(tl, text, t, opts = {}) {
    const append = !!opts.append && supportLine;
    let line = supportLine;
    if (!append) {
      line = document.createElement("div");
      line.className = "sg-support";
      line.setAttribute("aria-label", text);
      place(line, opts, { x: 120, y: 900 });
      host.appendChild(line);
      supportLine = line;
    } else {
      const sep = document.createElement("span");
      sep.className = "sg-sep";
      sep.textContent = " · ";
      line.appendChild(sep);
      line.setAttribute("aria-label", (line.getAttribute("aria-label") || "") + " · " + text);
      gsap().set(sep, { opacity: 0 });
      tl.fromTo(sep, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: EASE.enter, immediateRender: false }, t - 0.2);
    }
    const { mask, word } = masked(text);
    line.appendChild(mask);
    rise(tl, word, t, 0.6, 110);
  }

  function callout(tl, text, t, opts = {}) {
    const label = document.createElement("div");
    label.className = "sg-callout";
    label.textContent = text;
    place(label, opts, { x: 0, y: 0 });
    host.appendChild(label);
    gsap().set(label, { opacity: 0, y: 8 });
    tl.fromTo(label, { opacity: 0, y: 8 }, {
      opacity: 1, y: 0, duration: 0.4, ease: EASE.enter, immediateRender: false,
    }, t);
    if (opts.box) {
      const box = opts.box;
      const sides = [
        { left: box.x, top: box.y, width: box.w, height: 1, origin: "0% 50%", prop: "scaleX" },
        { left: box.x + box.w - 1, top: box.y, width: 1, height: box.h, origin: "50% 0%", prop: "scaleY" },
        { left: box.x, top: box.y + box.h - 1, width: box.w, height: 1, origin: "100% 50%", prop: "scaleX" },
        { left: box.x, top: box.y, width: 1, height: box.h, origin: "50% 100%", prop: "scaleY" },
      ];
      const step = 0.35 / 4;
      sides.forEach((side, i) => {
        const el = document.createElement("div");
        el.className = "sg-edge";
        el.style.left = side.left + "px";
        el.style.top = side.top + "px";
        el.style.width = side.width + "px";
        el.style.height = side.height + "px";
        host.appendChild(el);
        const hidden = { transformOrigin: side.origin };
        hidden[side.prop] = 0;
        const shown = { duration: step, ease: EASE.enter, immediateRender: false };
        shown[side.prop] = 1;
        gsap().set(el, { ...hidden });
        tl.fromTo(el, hidden, shown, t + i * step);
      });
      if (opts.leader) {
        const end = { x: opts.x, y: opts.y + 10 };
        const start = rectEdge(box, end.x, end.y);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const len = Math.hypot(dx, dy);
        if (len >= 1) {
          const leader = document.createElement("div");
          leader.className = "sg-leader";
          leader.style.left = start.x + "px";
          leader.style.top = start.y + "px";
          leader.style.width = len + "px";
          host.appendChild(leader);
          const rotation = Math.atan2(dy, dx) * 180 / Math.PI;
          gsap().set(leader, { scaleX: 0, rotation, transformOrigin: "0% 50%" });
          tl.fromTo(leader, { scaleX: 0, rotation }, {
            scaleX: 1, rotation, duration: 0.35, ease: EASE.enter, immediateRender: false,
          }, t);
        }
      }
    }
  }

  function counter(tl, spec) {
    const el = document.createElement("div");
    el.className = "sg-counter";
    const y = spec.y != null ? spec.y : 80;
    if (spec.x == null) {
      el.style.right = "120px";
      el.style.top = y + "px";
      el.style.textAlign = "right";
    } else {
      place(el, { x: spec.x, y }, { x: 1560, y: 80 });
    }
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    el.textContent = fmt(spec.from);
    host.appendChild(el);
    const proxy = { n: spec.from };
    tl.fromTo(proxy, { n: spec.from }, {
      n: spec.to,
      duration: spec.dur,
      ease: EASE.snap,
      immediateRender: false,
      onUpdate: () => { el.textContent = fmt(proxy.n); },
    }, spec.t);
  }

  function cta(tl, spec, tPrimary, tSecondary) {
    const wrap = document.createElement("div");
    wrap.className = "sg-cta";
    if (spec.x != null) {
      wrap.style.left = spec.x + "px";
      wrap.style.width = "auto";
      wrap.style.alignItems = "flex-start";
    }
    wrap.style.top = (spec.y != null ? spec.y : 640) + "px";
    const row = document.createElement("div");
    row.className = "sg-cta-row";
    wrap.appendChild(row);

    function button(className, text, t) {
      const el = document.createElement("div");
      el.className = className;
      el.textContent = text;
      if (className === "sg-cta-secondary") {
        for (const which of ["tl", "tr", "bl", "br"]) {
          const tick = document.createElement("span");
          tick.className = "sg-tick sg-tick-" + which;
          const h = document.createElement("span");
          h.className = "sg-tick-h";
          const v = document.createElement("span");
          v.className = "sg-tick-v";
          tick.appendChild(h);
          tick.appendChild(v);
          el.appendChild(tick);
        }
      }
      row.appendChild(el);
      gsap().set(el, { y: 16, opacity: 0 });
      tl.fromTo(el, { y: 16, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: EASE.settle, immediateRender: false,
      }, t);
    }

    if (spec.primary) button("sg-cta-primary", spec.primary, tPrimary);
    if (spec.secondary) button("sg-cta-secondary", spec.secondary, tSecondary ?? tPrimary);
    if (spec.micro) {
      const micro = document.createElement("div");
      micro.className = "sg-micro";
      micro.textContent = spec.micro;
      wrap.appendChild(micro);
      const at = tSecondary ?? tPrimary;
      gsap().set(micro, { y: 16, opacity: 0 });
      tl.fromTo(micro, { y: 16, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: EASE.settle, immediateRender: false,
      }, at);
    }
    host.appendChild(wrap);
  }

  function fromOst(tl, ost, layout = {}) {
    let supports = 0;
    let sawCta = false;
    const spec = { primary: "", secondary: "", micro: "" };
    let tPrimary = 0;
    let tSecondary = 0;
    for (const item of ost) {
      if (item.kind === "cue" || item.kind === "callout") continue;
      if (item.kind === "eyebrow") eyebrow(tl, item.text, item.t, layout.eyebrow);
      else if (item.kind === "headline") headline(tl, { text: item.text, bold: item.bold }, item.t, layout.headline);
      else if (item.kind === "support") {
        if (sawCta) {
          spec.micro = item.text;
          continue;
        }
        const pos = layout.support || {};
        support(tl, item.text, item.t, { x: pos.x, y: pos.y, append: supports > 0 && !!pos.inline });
        supports += 1;
      } else if (item.kind === "cta") {
        sawCta = true;
        if (!spec.primary) {
          spec.primary = item.text;
          tPrimary = item.t;
        } else if (!spec.secondary) {
          spec.secondary = item.text;
          tSecondary = item.t;
        }
      }
    }
    if (spec.primary) cta(tl, { ...spec, ...layout.cta }, tPrimary, spec.secondary ? tSecondary : tPrimary);
  }

  return { eyebrow, headline, support, callout, counter, cta, fromOst };
}
