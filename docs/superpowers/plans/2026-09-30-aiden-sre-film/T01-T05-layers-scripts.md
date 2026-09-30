# T1–T5 — Shared layers and pipeline scripts (Phase 1, parallel)

Part of `docs/superpowers/plans/2026-09-30-aiden-sre-film.md` (read Global Constraints, Amendments, Interfaces first). Each task below is one subagent. They run in parallel with T6–T10; none imports another Phase-1 module.

Demo projects (`shots/D0x-*`) are for visual verification only: commit their `index.html`, never their renders.

---

## T1 — Ribbon field (three.js slice)

**Model:** Sonnet · **Skills:** `hyperframes-animation` (+ its three.js adapter file), `hyperframes-core`, `hyperframes-keyframes`

**Files:** Create `shared/layers/ribbon-math.js`, `shared/layers/ribbons.js`, `shots/D01-ribbons/index.html`; Test `tests/js/ribbon-math.test.mjs`

**Interfaces:** Consumes `mulberry32`, CSS vars `--sg-violet`, `--sg-cyan`. Produces `ribbon-math.js` and `ribbons.js` exactly as in the index Interfaces table.

- [ ] **Step 1: Failing tests** — `tests/js/ribbon-math.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { ribbonSeeds, pointsFor, modeWeights, ribbonAt } from "../../shared/layers/ribbon-math.js";

test("seeds are deterministic", () => {
  assert.deepEqual(ribbonSeeds(5, 4), ribbonSeeds(5, 4));
  assert.notDeepEqual(ribbonSeeds(5, 4), ribbonSeeds(6, 4));
});
test("converge ends at target; fan starts at target", () => {
  const s = ribbonSeeds(1, 1)[0], tgt = { x: 1500, y: 540 };
  const c = pointsFor(s, "converge", 1.2, tgt).at(-1);
  const f = pointsFor(s, "fan", 1.2, tgt)[0];
  for (const p of [c, f]) { assert.ok(Math.abs(p.x - 1500) < 1e-6); assert.ok(Math.abs(p.y - 540) < 1e-6); }
});
test("mode blend weights sum to 1 and settle", () => {
  const modes = [{ t: 0, mode: "dormant" }, { t: 2, mode: "storm" }];
  assert.deepEqual(modeWeights(modes, 1).map(m => m.w), [1]);
  const mid = modeWeights(modes, 2.4);
  assert.equal(mid.length, 2);
  assert.ok(Math.abs(mid[0].w + mid[1].w - 1) < 1e-9);
  assert.deepEqual(modeWeights(modes, 3).map(m => m.mode), ["storm"]);
});
test("ribbonAt is a pure function of (seed, modes, t)", () => {
  const s = ribbonSeeds(9, 1)[0], m = [{ t: 0, mode: "rail" }];
  assert.deepEqual(ribbonAt(s, m, 3.3), ribbonAt(s, m, 3.3));
});
test("unknown mode throws", () => { assert.throws(() => pointsFor(ribbonSeeds(1, 1)[0], "spiral", 0)); });
```

- [ ] **Step 2:** `node --test tests/js/ribbon-math.test.mjs` → FAIL (module not found).

- [ ] **Step 3: `shared/layers/ribbon-math.js`**

```js
import { mulberry32 } from "./prng.js";
export const STAGE = { w: 1920, h: 1080 };
const N = 7;

export function ribbonSeeds(seed, count) {
  const r = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    i, baseY: 120 + r() * 840, amp: r(), freq: 0.002 + r() * 0.004, phase: r() * Math.PI * 2,
    speed: 0.5 + r(), edgeY: r() * STAGE.h, bow: (r() - 0.5) * 360, violet: r() < 0.7,
    width: 2 + r() * 4, alpha: 0.35 + r() * 0.55,
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
```

- [ ] **Step 4:** Rerun → PASS (5 tests).

- [ ] **Step 5: `shared/layers/ribbons.js`.** Follow the three.js adapter file from `hyperframes-animation`; where it prescribes a mount/seek pattern, the adapter wins over this sketch. The math and API are fixed.

```js
import * as THREE from "../vendor/three.module.min.js";
import { ribbonSeeds, ribbonAt, STAGE } from "./ribbon-math.js";

const VERT = `attribute float aU; attribute float aSide; varying float vU; varying float vSide;
void main(){ vU = aU; vSide = aSide; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FRAG = `uniform vec3 uColor; uniform float uOpacity; uniform float uFlow; varying float vU; varying float vSide;
void main(){
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(vSide));
  float band = 0.35 + 0.65 * pow(fract(vU * 2.0 - uFlow), 6.0);
  float fade = smoothstep(0.0, 0.08, vU) * (1.0 - smoothstep(0.92, 1.0, vU));
  gl_FragColor = vec4(uColor, edge * band * fade * uOpacity);
}`;
const SAMPLES = 160;

function cssColor(name) {
  return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

export function mountRibbons(host, { seed, count = 28, modes, split = 0.7 }) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
  host.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(2);
  renderer.setSize(STAGE.w, STAGE.h, false);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, STAGE.w, 0, STAGE.h, -10, 10);
  const violet = cssColor("--sg-violet"), cyan = cssColor("--sg-cyan");
  const ribbons = ribbonSeeds(seed, count).map((s, idx) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SAMPLES * 6), 3));
    const aU = new Float32Array(SAMPLES * 2), aSide = new Float32Array(SAMPLES * 2);
    for (let i = 0; i < SAMPLES; i++) {
      aU[2 * i] = aU[2 * i + 1] = i / (SAMPLES - 1);
      aSide[2 * i] = -1; aSide[2 * i + 1] = 1;
    }
    geo.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
    geo.setAttribute("aSide", new THREE.BufferAttribute(aSide, 1));
    const index = [];
    for (let i = 0; i < SAMPLES - 1; i++) { const a = 2 * i; index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    geo.setIndex(index);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: idx / count < split ? violet : cyan }, uOpacity: { value: s.alpha }, uFlow: { value: 0 } },
    });
    scene.add(new THREE.Mesh(geo, mat));
    return { s, geo, mat };
  });

  function render(t) {
    for (const r of ribbons) {
      const { points, opacity } = ribbonAt(r.s, modes, t);
      const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, p.y, 0)));
      const pos = r.geo.attributes.position.array;
      for (let i = 0; i < SAMPLES; i++) {
        const u = i / (SAMPLES - 1), p = curve.getPoint(u), tan = curve.getTangent(u);
        const nx = -tan.y * r.s.width / 2, ny = tan.x * r.s.width / 2;
        pos.set([p.x + nx, p.y + ny, 0, p.x - nx, p.y - ny, 0], i * 6);
      }
      r.geo.attributes.position.needsUpdate = true;
      r.mat.uniforms.uFlow.value = t * r.s.speed * 0.35;
      r.mat.uniforms.uOpacity.value = r.s.alpha * opacity;
    }
    renderer.render(scene, camera);
  }

  function bind(tl, duration) {
    const proxy = { t: 0 };
    render(0);
    tl.to(proxy, { t: duration, duration, ease: "none", onUpdate: () => render(proxy.t) }, 0);
  }
  return { render, bind };
}
```

- [ ] **Step 6: Visual check.** `scripts/new_shot.sh D01-ribbons S04`, then in SHOT BUILD:

```js
  const { mountRibbons } = await import("./_shared/layers/ribbons.js");
  mountRibbons(bg, { seed: 104, modes: [
    { t: 0, mode: "dormant" },
    { t: 1.2, mode: "converge", target: { x: 1500, y: 540 } },
    { t: 3.0, mode: "storm" },
  ] }).bind(tl, timing.duration);
```

Run: `npx hyperframes check shots/D01-ribbons && npx hyperframes snapshot shots/D01-ribbons --at 0.5,2.0,2.0,3.6`
Expected: 0 findings; stills show sparse violet/cyan waves → ribbons converging right → dense storm; the two 2.0 s stills are byte-identical (`cmp`) — determinism.

- [ ] **Step 7: Commit**

```bash
node --test tests/js/ && .venv/bin/python scripts/lint_brand.py
git add shared/layers/ribbon-math.js shared/layers/ribbons.js tests/js/ribbon-math.test.mjs shots/D01-ribbons/index.html
git commit -m "feat(aiden-sre-film): seeded three.js ribbon field layer"
```

---

## T2 — Kinetic type layer

**Model:** Sonnet · **Skills:** `hyperframes-keyframes`, `masked-reveal`, `staggered-word-reveal`

**Files:** Create `shared/layers/type.js`, `shared/layers/type.css`, `shots/D02-type/index.html`; Test `tests/js/type.test.mjs`

**Interfaces:** Produces `splitWords` + `mountType` API (index table). Consumes `EASE`, `DUR`, `STAGGER`, brand vars.

Behavior contract (spec §3.3, §3.4):

| Method | Default pos (stage px) | Look | Motion |
|---|---|---|---|
| `eyebrow` | x 120, y 120 | Geist Mono 22 px 500, +12% tracking, UPPER, `--sg-mute`; 24×2 px violet rule left of text | rule scaleX 0→1 (0.3 s, `EASE.enter`); text mask-rises yPercent 100→0 (0.5 s) from +0.1 s |
| `headline` | x 120, y 420 | Geist 96 px; `bold` words weight 500, others 300; −2% tracking | each word in an `overflow:hidden` span rises yPercent 110→0 and letter-spacing 0.04em→−0.02em, `STAGGER.words`, 0.7 s, `EASE.enter` |
| `support` | x 120, y 900 | Geist 40 px 400 `--sg-cream` | mask-rise 0.6 s; `append:true` appends ` · ` (`--sg-mute`, fades 0.2 s earlier) + text to the previous support line |
| `callout` | explicit | Geist Mono 20 px 500 +4%; hairline box if `box` given; 1 px leader from box edge to label if `leader` | box border draws clockwise (4 sides, 0.35 s total), label fades + slides 8 px |
| `counter` | x 1560, y 80 | Geist Mono 120 px, tabular nums | integer tween, en-US thousands separators |
| `cta` | centered, y 640 | primary: `--sg-cream-bright` fill, ink text, 0 radius, 20×32 px padding; secondary: transparent, hairline border, four 6 px cream corner ticks | each rises from y+16, 0.5 s `EASE.settle`; micro line 22 px `--sg-mute` below |
| `fromOst(tl, ost, layout)` | `layout[kind]` overrides | routes `eyebrow`, `headline`, `support` (after the first, supports use `append:true` when `layout.support.inline`), `cta` (first = primary, second = secondary, `support` after a cta = micro); skips `callout` and `cue` | uses each item's `t` |

All DOM via `createElement`/`textContent`. Initial states via `gsap.set` or `fromTo` inside the build — never a CSS transform on a tweened property. `type.js` must import in Node: no top-level `document` access.

- [ ] **Step 1: Failing test** `tests/js/type.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { splitWords } from "../../shared/layers/type.js";

test("marks bold substring words", () => {
  assert.deepEqual(splitWords("Your AI SRE teammate.", "AI SRE"), [
    { word: "Your", bold: false }, { word: "AI", bold: true },
    { word: "SRE", bold: true }, { word: "teammate.", bold: false }]);
});
test("no bold", () => { assert.equal(splitWords("One two", null).every(w => !w.bold), true); });
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `type.js` + `type.css` per contract. `splitWords`:

```js
export function splitWords(text, bold) {
  const words = text.split(" ");
  const b = bold ? bold.split(" ") : [];
  const start = b.length ? words.findIndex((_, i) => b.every((bw, j) => words[i + j] === bw)) : -1;
  return words.map((word, i) => ({ word, bold: start >= 0 && i >= start && i < start + b.length }));
}
```

- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Visual check.** `scripts/new_shot.sh D02-type S03`; SHOT BUILD: `const { mountType } = await import("./_shared/layers/type.js"); const type = mountType(fg); type.fromOst(tl, timing.ost, {}); type.counter(tl, { from: 0, to: 1284, t: 0.2, dur: 3 });`. Run `npx hyperframes check shots/D02-type` (0 findings incl. contrast) and `npx hyperframes snapshot shots/D02-type --at 0.3,1.2,3.0`. Expected: eyebrow + violet rule; "Your **AI SRE** teammate." mid-reveal then settled; counter "1,284".
- [ ] **Step 6: Commit** `shared/layers/type.js shared/layers/type.css tests/js/type.test.mjs shots/D02-type/index.html` → `git commit -m "feat(aiden-sre-film): kinetic type layer"`

---

## T3 — UI plate, cursor and UI animation helpers

**Model:** Sonnet · **Skills:** `motion-graphics`, `hyperframes-keyframes`, `ui-concept-animation` (choreography reference only)

**Files:** Create `shared/layers/plate.js`, `shared/layers/cursor.js`, `shared/layers/ui.js`, `shared/layers/ui.css`, `shared/assets/plates/_fixture.png`, `shared/assets/plates/_fixture.snapshot.json`, `shots/D03-ui/index.html`; Test `tests/js/ui.test.mjs`

**Interfaces:** Produces `plate.js`, `cursor.js`, `ui.js` (index table + signatures below). Consumes `SG_DATA.plates`, tokens.

**`plate.js`**
- `mountPlate(host, {id, x = 120, y = 90, width = 1680})`: wrapper div (1 px `--sg-hairline` border, 0 radius, `box-shadow: 0 40px 120px rgba(0,0,0,.55)`) containing `<img src="_shared/assets/plates/<id>.png">` at `width` stage px. Resolves after `img.decode()`.
- `box(key)` → snapshot box (CSS px of a 1920-wide viewport) × `width/1920`, offset by `x, y` → stage px. Missing key (absent or in `missing`, or `missing` contains `"*"`) throws `Error("plate P07 missing box hyp-3")` so shot agents know to mock.
- `mask(key)` → `--sg-panel` rect covering the box (hides static pixels under an overlay).
- `overlay(key)` → empty absolutely positioned container sized to the box; the caller appends children.
- `enter(tl, t, {from = "right", dur = DUR.enter})`: `right`/`left` x ±240→0 + opacity 0→1; `below` y +120→0; `z` scale 0.86→1. `EASE.enter`.
- If `SG_DATA.plates[id]` is absent or fully missing, `mountPlate` rejects; shots then build a DOM mock panel with the same box keys (see shots file "Mock rule").

**`cursor.js`**
- `arcPoint(a, b, u, bend = 0.12)` (code below).
- `mountCursor(host)`: 22×22 SVG arrow, `--sg-cream` fill, 1 px ink stroke, hidden until `show`.
- `path(tl, points)`: consecutive `{t,x,y}` points; each segment follows `arcPoint` over `[t_i, t_{i+1}]` with `EASE.camera`.
- `click(tl, t)`: scale 1→0.96 (0.045 s) →1 (0.045 s); ripple = square 1 px cream-border box at the tip, 0→48 px, opacity 0.9→0 over 0.35 s.
- `show`/`hide`: opacity 0↔1 over 0.2 s.

**`ui.js`** (all return nothing; add tweens to `tl`)
- `collapseRows(tl, els, t, {stagger = STAGGER.rows})`: opacity →0.25 (0.18 s) then height/margin/padding →0 (0.42 s, `EASE.snap`).
- `flipReorder(tl, els, order, t, {dur = DUR.ui})`: measure `offsetTop`s, animate each `els[i]` `y` to slot `order[i]`, `EASE.snap`.
- `fillBars(tl, bars, t, {stagger = 0.12})`: `bars = [{el, to, label?, value?}]`; `scaleX` 0→`to` from left, 0.8 s `EASE.enter`; `label` counts to `value` + "%".
- `typewriter(tl, el, text, t, {cps = 50})`: `textContent` slice driven by a proxy tween (deterministic).
- `ringPulse(tl, host, box, t, {color = "var(--sg-coral)", rings = 3})`: square 1 px rings around `box`, each scale 1→1.6 + opacity 0.8→0 over 0.9 s, 0.18 s apart.
- `strike(tl, el, t)`: 1 px cream line scaleX 0→1 over 0.3 s, then `el` opacity →0.45.
- `drawPath(tl, pathEl, t, dur)`: dasharray = length, dashoffset length→0.
- `countUp(tl, el, from, to, t, dur, fmt = n => Math.round(n).toLocaleString("en-US"))`.
- `chipAlong(tl, host, {label, from, to, t, dur, bend = 0.18})`: square chip (hairline, `--sg-panel`, Geist Mono 18 px) along `arcPoint` arc; lands `EASE.settle`; returns the chip element.
- `leak(tl, host, t, {src = "_shared/assets/gen/G02-1.png"})`: full-bleed `<img>`, `mix-blend-mode: screen`, opacity 0→0.5 (0.3 s) →0 by t+0.9.

- [ ] **Step 1: Failing test** `tests/js/ui.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { arcPoint } from "../../shared/layers/cursor.js";

test("arc endpoints are exact", () => {
  assert.deepEqual(arcPoint({ x: 0, y: 0 }, { x: 100, y: 0 }, 0), { x: 0, y: 0 });
  assert.deepEqual(arcPoint({ x: 0, y: 0 }, { x: 100, y: 0 }, 1), { x: 100, y: 0 });
});
test("arc bows perpendicular at midpoint", () => {
  const m = arcPoint({ x: 0, y: 0 }, { x: 100, y: 0 }, 0.5, 0.12);
  assert.equal(m.x, 50);
  assert.ok(Math.abs(Math.abs(m.y) - 6) < 1e-9);
});
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement the three modules + `ui.css`. `arcPoint`:

```js
export function arcPoint(a, b, u, bend = 0.12) {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
  const c = { x: (a.x + b.x) / 2 - (dy / d) * bend * d, y: (a.y + b.y) / 2 + (dx / d) * bend * d };
  const v = 1 - u;
  return { x: v * v * a.x + 2 * v * u * c.x + u * u * b.x, y: v * v * a.y + 2 * v * u * c.y + u * u * b.y };
}
```

- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Fixture + visual check.**

```bash
ffmpeg -loglevel error -y -f lavfi -i "color=c=0x211D15:s=3840x2160,drawbox=x=160:y=300:w=3520:h=2:color=0x3F3B39:t=fill,drawbox=x=160:y=500:w=3520:h=2:color=0x3F3B39:t=fill,drawbox=x=160:y=700:w=3520:h=2:color=0x3F3B39:t=fill" -frames:v 1 shared/assets/plates/_fixture.png
```

`_fixture.snapshot.json`: `{"id":"_fixture","viewport":{"w":1920,"h":1080,"dpr":2},"image":"_fixture.png","boxes":{"panel":{"x":0,"y":0,"w":1920,"h":1080},"row-1":{"x":80,"y":150,"w":1760,"h":90},"row-2":{"x":80,"y":250,"w":1760,"h":90},"row-3":{"x":80,"y":350,"w":1760,"h":90},"row-4":{"x":80,"y":450,"w":1760,"h":90},"row-5":{"x":80,"y":550,"w":1760,"h":90},"row-6":{"x":80,"y":650,"w":1760,"h":90},"btn":{"x":1600,"y":960,"w":200,"h":60}},"missing":[]}` (add `label` fields as `""`). Rerun `.venv/bin/python scripts/build_data.py --placeholder` so `SG_DATA.plates._fixture` is embedded.
`scripts/new_shot.sh D03-ui S07`: mount plate `_fixture`, `enter` from right at 0.2; overlays on rows 1–6 (plain DOM rows) with `collapseRows` on rows 2/4/5 at 1.0; `flipReorder` at 1.6; cursor path to `btn` center, click at 2.6; `ringPulse` on `row-1` at 3.0. `npx hyperframes check shots/D03-ui`; `snapshot --at 0.4,1.3,2.7,3.3`. Expected: panel entering, rows collapsing, cursor arc + ripple at 2.7, coral square rings at 3.3.
- [ ] **Step 6: Commit** `shared/layers/{plate,cursor,ui}.js shared/layers/ui.css shared/assets/plates/_fixture.* tests/js/ui.test.mjs shots/D03-ui/index.html` → `git commit -m "feat(aiden-sre-film): UI plate, cursor, UI animation helpers"`

---

## T4 — Isometric service map (lattice)

**Model:** Sonnet · **Skills:** `hyperframes-keyframes`, `motion-graphics` (picker gap)

**Files:** Create `data/graph.json`, `shared/layers/lattice.js`, `shots/D04-lattice/index.html`; Test `tests/js/lattice.test.mjs`

**Interfaces:** Produces `Graph` and `lattice.js` API. Consumes `mulberry32`, tokens. Implements its own path-draw (does not import `ui.js`, which is written in parallel).

- `data/graph.json`: 14 nodes, ~18 edges; labels **must include** `checkout-svc`, `payments-api`, `cart-svc`, `inventory-db`, `auth-svc`, `api-gateway`, `k8s-cluster`, `redis-cache`, `orders-svc`, `notification-svc`, `search-svc`, `postgres-main`, `kafka`, `frontend-web`; `gx` 0–6, `gy` 0–4, no two nodes on one cell; `checkout-svc` near center. If T6's P13 shows different service names, a follow-up swaps labels (orchestrator decides).
- `isoToStage(gx, gy) = { x: 960 + (gx - gy) * 110, y: 300 + (gx + gy) * 64 }` (exported).
- Node: 28×28 square rotated 45°, 1 px `--sg-violet` stroke, `--sg-panel` fill; Geist Mono 14 px label below. Edge: SVG path, 1 px `--sg-cyan` at 70% opacity.
- `drawIn(tl, t, dur)`: nodes pop (scale 0→1, `EASE.settle`) ordered by `gx+gy` with `STAGGER.chips` during the first 45% of `dur`; edges draw (dashoffset) during the rest.
- `showAll()`: final state immediately. `node(id)` → stage center. `mark(tl, id, t, {color = "var(--sg-violet)"})`: 44 px square ring, scale 0.6→1 `EASE.settle`, stays. `pulse(tl, id, t)`: fill flashes `--sg-cyan` for 0.3 s.

- [ ] **Step 1: Failing test** `tests/js/lattice.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { isoToStage } from "../../shared/layers/lattice.js";

test("iso projection", () => {
  assert.deepEqual(isoToStage(0, 0), { x: 960, y: 300 });
  assert.deepEqual(isoToStage(2, 1), { x: 1070, y: 492 });
});
```

Plus a data check in the same file:

```js
import { readFileSync } from "node:fs";
test("graph has required services, unique cells, valid edges", () => {
  const g = JSON.parse(readFileSync(new URL("../../data/graph.json", import.meta.url)));
  const ids = new Set(g.nodes.map(n => n.id));
  for (const need of ["checkout-svc", "payments-api", "api-gateway", "kafka"]) assert.ok(ids.has(need));
  assert.equal(new Set(g.nodes.map(n => `${n.gx},${n.gy}`)).size, g.nodes.length);
  for (const [a, b] of g.edges) { assert.ok(ids.has(a)); assert.ok(ids.has(b)); }
});
```

- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement `graph.json` + `lattice.js`. **Step 4:** Run → PASS.
- [ ] **Step 5: Visual check.** `scripts/new_shot.sh D04-lattice S05`; rerun `build_data.py --placeholder` (embeds graph); SHOT BUILD: `drawIn(tl, 0.2, 2.6)`, `mark(tl, "checkout-svc", 2.9)`. `check` + `snapshot --at 1.0,2.2,3.1`.
- [ ] **Step 6: Commit** `data/graph.json shared/layers/lattice.js tests/js/lattice.test.mjs shots/D04-lattice/index.html` → `git commit -m "feat(aiden-sre-film): isometric service map layer"`

---

## T5 — Render, composite, conform and mix scripts

**Model:** Sonnet · **Skills:** superpowers `test-driven-development`, `hyperframes-cli` (picker gap)

**Files:** Create `scripts/render-passes.sh`, `scripts/composite.sh`, `scripts/master.py`, `scripts/mix.py`; Test `tests/test_composite.py`, `tests/test_master.py`, `tests/test_mix.py`

**Interfaces:** Script contracts in the index "Scripts" table; cue sheet schema `[{file, shot, t, gain_db}]`.

- [ ] **Step 1: Failing tests**

`tests/test_composite.py`:

```python
import json, os, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]


def ff(*args):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *args], check=True)


def probe(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=pix_fmt,r_frame_rate,nb_frames",
                          "-of", "json", str(p)], capture_output=True, text=True, check=True).stdout
    return json.loads(out)["streams"][0]


def test_composite_60_to_30_10bit(tmp_path):
    P = tmp_path / "renders/passes"
    P.mkdir(parents=True)
    ff("-f", "lavfi", "-i", "color=c=0x14110C:s=640x360:r=60:d=1", "-c:v", "prores_ks", "-profile:v", "4", str(P / "SX-bg.mov"))
    ff("-f", "lavfi", "-i", "testsrc2=s=640x360:r=60:d=1,format=yuva444p10le", "-c:v", "prores_ks", "-profile:v", "4",
       "-pix_fmt", "yuva444p10le", str(P / "SX-mid.mov"))
    ff("-i", str(P / "SX-mid.mov"), "-c", "copy", str(P / "SX-fg.mov"))
    (P / "SX.fps").write_text("60\n")
    subprocess.run([str(ROOT / "scripts/composite.sh"), "SX"], check=True, env={**os.environ, "SG_ROOT": str(tmp_path)})
    s = probe(tmp_path / "renders/shots/SX.mov")
    assert s["pix_fmt"] == "yuv422p10le" and s["r_frame_rate"] == "30/1" and int(s["nb_frames"]) == 30
```

`tests/test_master.py`:

```python
import json, os, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]


def test_master_concats_to_timing_duration(tmp_path):
    for d in ("renders/shots", "renders/master", "build"):
        (tmp_path / d).mkdir(parents=True)
    for sid in ("SA", "SB"):
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "color=c=0x14110C:s=640x360:r=30:d=1",
                        "-c:v", "prores_ks", "-profile:v", "3", "-pix_fmt", "yuv422p10le",
                        str(tmp_path / f"renders/shots/{sid}.mov")], check=True)
    (tmp_path / "build/timing.full.json").write_text(json.dumps({"mode": "full", "duration": 2.0, "lines": {},
        "shots": [{"id": "SA", "start": 0, "duration": 1.0}, {"id": "SB", "start": 1.0, "duration": 1.0}]}))
    subprocess.run([str(ROOT / ".venv/bin/python"), str(ROOT / "scripts/master.py"), "full"], check=True,
                   env={**os.environ, "SG_ROOT": str(tmp_path)})
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                          str(tmp_path / "renders/master/aiden-sre-full.mp4")], capture_output=True, text=True, check=True).stdout
    assert abs(float(out) - 2.0) < 0.05
```

`tests/test_mix.py`:

```python
import json, os, re, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]


def tone(path, freq, dur):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", f"sine=frequency={freq}:duration={dur}",
                    "-ar", "48000", str(path)], check=True)


def test_mix_duration_loudness_stems(tmp_path):
    for d in ("build", "renders/master", "shared/assets/audio/vo", "shared/assets/audio/sfx", "shared/assets/audio/music"):
        (tmp_path / d).mkdir(parents=True)
    tone(tmp_path / "shared/assets/audio/vo/L01.wav", 220, 2)
    tone(tmp_path / "shared/assets/audio/music/bed.wav", 110, 3)
    tone(tmp_path / "shared/assets/audio/sfx/click.wav", 2000, 0.1)
    (tmp_path / "shared/assets/audio/sfx/cues.json").write_text(json.dumps([{"file": "click.wav", "shot": "SA", "t": 1.0}]))
    (tmp_path / "build/timing.full.json").write_text(json.dumps(
        {"mode": "full", "duration": 5.0, "lines": {"L01": 0.8}, "shots": [{"id": "SA", "start": 0, "duration": 5.0}]}))
    subprocess.run([str(ROOT / ".venv/bin/python"), str(ROOT / "scripts/mix.py"), "full"], check=True,
                   env={**os.environ, "SG_ROOT": str(tmp_path)})
    mix = tmp_path / "renders/master/mix-full.wav"
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mix)],
                               capture_output=True, text=True, check=True).stdout)
    assert abs(dur - 5.0) < 0.05
    log = subprocess.run(["ffmpeg", "-nostats", "-i", str(mix), "-af", "ebur128", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    lufs = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", log)[-1])
    assert -16.0 <= lufs <= -12.0
    for stem in ("vo", "music", "sfx"):
        assert (tmp_path / f"renders/master/{stem}-full.wav").exists()
```

- [ ] **Step 2:** `.venv/bin/pytest -q tests/test_composite.py tests/test_master.py tests/test_mix.py` → FAIL (scripts missing).

- [ ] **Step 3: `scripts/composite.sh`** (spec §9 graph, verified on synthetic passes 2026-09-30)

```bash
#!/usr/bin/env bash
# Composite bg/mid/fg passes of one shot into a 30 fps shot file. Usage: scripts/composite.sh S12 | S23-cut
set -euo pipefail
ROOT="${SG_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
S="$1"
P="$ROOT/renders/passes/$S"
FPS_IN=$(cat "$P.fps")
N=$(( FPS_IN / 30 ))
WEIGHTS=$(printf '1 %.0s' $(seq 1 "$N"))
BLOOM_MID="${BLOOM_MID:-0.35}"; BLOOM_FG="${BLOOM_FG:-0.25}"; GRAIN="${GRAIN:-4}"
mkdir -p "$ROOT/renders/shots"
ffmpeg -loglevel error -y -i "$P-bg.mov" -i "$P-mid.mov" -i "$P-fg.mov" -filter_complex "
 [0:v]format=rgba64le[bg];
 [1:v]format=rgba64le,split[mid][midb];
 [midb]colorlevels=rimin=0.78:gimin=0.78:bimin=0.78,gblur=sigma=14[midglow];
 [2:v]format=rgba64le,split[fg][fgb];
 [fgb]colorlevels=rimin=0.82:gimin=0.82:bimin=0.82,gblur=sigma=10[fgglow];
 [bg][mid]overlay=format=auto[a];
 [a][midglow]blend=all_mode=screen:all_opacity=$BLOOM_MID[b];
 [b][fg]overlay=format=auto[c];
 [c][fgglow]blend=all_mode=screen:all_opacity=$BLOOM_FG[d];
 [d]tmix=frames=$N:weights='$WEIGHTS',fps=30,vignette=angle=PI/5:mode=backward,noise=c0s=$GRAIN:c0f=t+u,format=yuv422p10le[out]" \
 -map "[out]" -c:v prores_ks -profile:v 3 -vendor apl0 "$ROOT/renders/shots/$S.mov"
```

T11 freezes the `BLOOM_MID`/`BLOOM_FG`/`GRAIN` defaults; no per-shot overrides without a `shots/QA.md` note.

- [ ] **Step 4: `scripts/render-passes.sh`**

```bash
#!/usr/bin/env bash
# Render the three passes of one shot. Usage: scripts/render-passes.sh S12 [full|cut] [draft|delivery]
set -euo pipefail
cd "$(dirname "$0")/.."
S="$1"; MODE="${2:-full}"; Q="${3:-delivery}"
SUF=""; [[ "$MODE" == cut ]] && SUF="-cut"
BLUR=$(python3 -c "import json,sys;print(next(s['blur'] for s in json.load(open('data/shots.json')) if s['id']==sys.argv[1]))" "$S")
if [[ "$BLUR" == heavy && "${HF_CLOUD:-0}" == 1 && -x scripts/render-cloud.sh ]]; then
  exec scripts/render-cloud.sh "$S" "$MODE"
fi
mkdir -p renders/passes
npx hyperframes check "shots/$S"
for P in bg mid fg; do
  npx hyperframes render "shots/$S" --variables "{\"pass\":\"$P\",\"mode\":\"$MODE\"}" --strict-variables \
    --format mov --fps 60 --quality "$Q" --output "renders/passes/$S$SUF-$P.mov"
done
echo 60 > "renders/passes/$S$SUF.fps"
```

- [ ] **Step 5: `scripts/master.py`**

```python
"""Conform composited shots into masters (D1-D3). Usage: master.py full|cut [--audio path.wav]"""
import json, os, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))


def ff(*args):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args], check=True)


def shot_file(sid, mode):
    cut = ROOT / f"renders/shots/{sid}-cut.mov"
    return cut if mode == "cut" and cut.exists() else ROOT / f"renders/shots/{sid}.mov"


def main(argv):
    mode = argv[0]
    audio = argv[argv.index("--audio") + 1] if "--audio" in argv else None
    t = json.loads((ROOT / f"build/timing.{mode}.json").read_text())
    files = [shot_file(s["id"], mode) for s in t["shots"]]
    missing = [f.name for f in files if not f.exists()]
    if missing:
        sys.exit(f"missing shots: {missing}")
    out = ROOT / f"renders/master/aiden-sre-{mode}"
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as fh:
        fh.writelines(f"file '{f}'\n" for f in files)
    ff("-f", "concat", "-safe", "0", "-i", fh.name, "-c", "copy", f"{out}-silent.mov")
    mez = ["-i", f"{out}-silent.mov"] + (["-i", audio, "-map", "0:v", "-map", "1:a", "-c:a", "pcm_s24le"] if audio else [])
    ff(*mez, "-c:v", "copy", "-t", str(t["duration"]), f"{out}.mov")
    enc = ["-c:a", "aac", "-b:a", "320k"] if audio else ["-an"]
    ff("-i", f"{out}.mov", "-c:v", "libx264", "-profile:v", "high", "-crf", "16", "-preset", "slow",
       "-pix_fmt", "yuv420p", "-movflags", "+faststart", *enc, f"{out}.mp4")
    print(f"{out}.mp4  {t['duration']}s  {len(files)} shots")


if __name__ == "__main__":
    main(sys.argv[1:])
```

- [ ] **Step 6: `scripts/mix.py`**

```python
"""Mix VO + music + SFX (spec §8.2). Usage: mix.py full|cut. Writes mix + vo/music/sfx stems."""
import json, os, subprocess, sys
from pathlib import Path

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))
A = ROOT / "shared/assets/audio"
ST = "aformat=sample_rates=48000:channel_layouts=stereo"


def build_cmd(mode):
    t = json.loads((ROOT / f"build/timing.{mode}.json").read_text())
    dur = t["duration"]
    starts = {s["id"]: s["start"] for s in t["shots"]}
    cues = json.loads((A / "sfx/cues.json").read_text())
    sfx = [(A / "sfx" / c["file"], starts[c["shot"]] + c["t"], c.get("gain_db", 0)) for c in cues if c["shot"] in starts]
    cmd, fg, n, vo, sx = ["ffmpeg", "-y", "-loglevel", "error"], [], 0, [], []
    for lid, off in t["lines"].items():
        cmd += ["-i", str(A / f"vo/{lid}.wav")]
        fg.append(f"[{n}:a]{ST},loudnorm=I=-16:TP=-1.5:LRA=7,adelay={int(off * 1000)}:all=1[v{n}]")
        vo.append(f"[v{n}]"); n += 1
    fg.append(f"{''.join(vo)}amix=inputs={len(vo)}:normalize=0,apad=whole_dur={dur},atrim=0:{dur}[vobus]")
    fg.append("[vobus]asplit=3[vo][vokey][vostem]")
    for path, at, gain in sfx:
        cmd += ["-i", str(path)]
        fg.append(f"[{n}:a]{ST},volume={gain}dB,adelay={int(at * 1000)}:all=1[s{n}]")
        sx.append(f"[s{n}]"); n += 1
    if sx:
        fg.append(f"{''.join(sx)}amix=inputs={len(sx)}:normalize=0,apad=whole_dur={dur},atrim=0:{dur}[sfxbus]")
    else:
        fg.append(f"anullsrc=r=48000:cl=stereo,atrim=0:{dur}[sfxbus]")
    fg.append("[sfxbus]asplit=2[sfx][sfxstem]")
    cmd += ["-stream_loop", "-1", "-i", str(A / "music/bed.wav")]
    fg.append(f"[{n}:a]{ST},atrim=0:{dur},loudnorm=I=-22:TP=-2,afade=t=out:st={max(dur - 3, 0)}:d=3[mus]")
    fg.append("[mus][vokey]sidechaincompress=threshold=0.03:ratio=6:attack=120:release=400[musduck]")
    fg.append("[musduck]asplit=2[mus][musstem]")
    fg.append(f"[vo][mus][sfx]amix=inputs=3:normalize=0,atrim=0:{dur},loudnorm=I=-14:TP=-1.0:LRA=9[out]")
    o = ROOT / "renders/master"
    cmd += ["-filter_complex", ";".join(fg)]
    for label, name in (("out", "mix"), ("vostem", "vo"), ("musstem", "music"), ("sfxstem", "sfx")):
        cmd += ["-map", f"[{label}]", "-ar", "48000", "-c:a", "pcm_s24le", str(o / f"{name}-{mode}.wav")]
    return cmd


if __name__ == "__main__":
    (ROOT / "renders/master").mkdir(parents=True, exist_ok=True)
    subprocess.run(build_cmd(sys.argv[1]), check=True)
```

- [ ] **Step 7: Run tests; verify the cloud path**

```bash
chmod +x scripts/*.sh
.venv/bin/pytest -q tests/test_composite.py tests/test_master.py tests/test_mix.py
npx hyperframes cloud render --help
```

Expected: 3 pass. Cloud: only if `--help` shows project-dir selection **and** `--variables` **and** `--format mov` **and** `--fps` ≥ 120 **and** a way to download output, write `scripts/render-cloud.sh` (3 passes at 120 fps → same output paths, writes `120` to the `.fps` file). Otherwise do not create it; report "60 fps everywhere". Do not guess flags.

- [ ] **Step 8: Commit** `scripts/render-passes.sh scripts/composite.sh scripts/master.py scripts/mix.py tests/test_composite.py tests/test_master.py tests/test_mix.py` (+ `scripts/render-cloud.sh` if created) → `git commit -m "feat(aiden-sre-film): pass render, composite, conform and mix scripts"`
