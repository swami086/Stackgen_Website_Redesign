# Aiden SRE frame polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the held frames of the Aiden for SRE film read as the light Stackgen Alerts product, with metric cards instead of black counter slabs, and no empty overlay boxes.

**Architecture:** Each shot is its own HyperFrames HTML project under `videos/aiden-sre-film/shots/Sxx/index.html`. Shared type and plate helpers live in `videos/aiden-sre-film/shared/layers/`. Shots render as bg/mid/fg passes, then `scripts/composite.sh` and `scripts/master.py` build `renders/master/aiden-sre-full.mp4`. Tasks 1–6 edit different shot files and run in parallel. Tasks 7–10 run after those edits, in order.

**Tech Stack:** HyperFrames `0.8.96` (pinned in `videos/aiden-sre-film/package.json`), GSAP, Geist / Geist Mono, ffmpeg, Python 3.

## Global Constraints

- Product plates stay light. Do not recapture them dark. Do not paint `var(--sg-panel)` (`#211D15`) over a captured list.
- New chrome uses the P01 metric card: fill `#F4EFFA`, hairline `#E3D8F2`, ink `#1C1A22`, label `#6B6280`, Geist Mono, radius 0.
- UI type floor is 20px. Secondary labels use `#6B6280`, not a smaller mute on a dark slab.
- GitLab reference (`source/reference/gitlab.mp4`, YouTube `-5JPZoGeHHs`) is technique only. Never copy its palette, icons, or layouts. Sourcegraph: `github.com/swami086/Stackgen_Website_Redesign` @ `623c77d1af7ab4493be3e316d1bcb258fd6ccb8a`, `docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md` §1 and §3.
- Leave S04, S20, the S01 card column, and the S27 ribbon settle alone. S27 may change CTA times and the opening ribbon opacity only.
- Magenta New Conversation stays. It is on the captured P01 plate.
- Do not commit. Do not upgrade the HyperFrames pin.
- Edit local files. Sourcegraph does not have the uncommitted polish edits.
- Do not load `video-to-article`. Skill-picker’s clueso router returns it for “critique frames”; it writes an article and does not apply here.

## Skills per task

Read the named `SKILL.md` before the task. One member, not the whole pack.

| Task | Read first |
|---|---|
| 1–6 | `~/.cursor/skills/hyperframes/SKILL.md` (row “Specific edit to an existing project”: edit, skip the intent interview). Then `~/.cursor/skills/hyperframes-core/SKILL.md` before changing composition HTML. |
| 1, 4, 5, 6 | Also `~/.cursor/skills/hyperframes-animation/SKILL.md` for the GSAP time change. |
| 10 | `~/.cursor/skills/critique-composition/SKILL.md` and `~/.cursor/skills/critique-visual-hierarchy/SKILL.md` on the extracted stills. Then `~/.cursor/skills/video-production-audit/SKILL.md` only to re-score. It is read-only. |
| 7–9 | `~/.cursor/skills/hyperframes-cli/SKILL.md` for `check` and `render`. |

## File map

| File | Responsibility |
|---|---|
| `videos/aiden-sre-film/shared/layers/type.js` `counter` | Metric card. Already landed. Do not restyle. |
| `videos/aiden-sre-film/shared/layers/type.css` `.sg-counter` | Card chrome. Already landed. |
| `videos/aiden-sre-film/shots/S01/index.html` | Counter call at x 1480 y 96. Already landed. |
| `videos/aiden-sre-film/shots/S02/index.html` | Counter call at x 1480 y 48. Already landed. |
| `videos/aiden-sre-film/shots/S06/index.html` | P01 visible, no list mask. Already landed. |
| `videos/aiden-sre-film/shots/S07/index.html` | Transparent rows, 20px group chips. Already landed. |
| `videos/aiden-sre-film/shots/S25/index.html`, `S26/index.html` | 300×300 product tiles. Already landed. |
| `videos/aiden-sre-film/shots/S09/index.html` | Count falls 4906 → 7. Local black counter override removed. |
| `videos/aiden-sre-film/shots/S12/index.html` | Bars sit beside each hypothesis line. Rail removed. |
| `videos/aiden-sre-film/shots/S14/index.html` | Arrow ends on `marker-downstream`. Support clears y 1010. |
| `videos/aiden-sre-film/shots/S16/index.html` | RCA card is a product card. Cursor tip sits above “Fix”. |
| `videos/aiden-sre-film/shots/S24/index.html` | 420px resolved card, settled before the hold. |
| `videos/aiden-sre-film/shots/S27/index.html` | Both CTAs opaque before the hold. |
| `videos/aiden-sre-film/scripts/render-passes.sh` | One shot, three passes. Do not edit. |
| `videos/aiden-sre-film/scripts/composite.sh` | Passes → `renders/shots/Sxx.mov`. Do not edit. |
| `videos/aiden-sre-film/scripts/master.py` | Concat → `renders/master/aiden-sre-full.mp4`. Do not edit. |

## Already landed — do not redo

Confirm these strings exist. If one is missing, restore it from this block before Task 1. Do not revert them while doing Tasks 1–6.

- `shared/layers/type.js`: `label.textContent = spec.label || "All Active"` and `num.className = "sg-counter-num"`.
- `shared/layers/type.css`: `.sg-counter` background `#F4EFFA`, `.sg-counter-num` font-size `72px`, color `#1C1A22`.
- S01: `type.counter(tl, { from: 0, to: 1284, t: 0.3, dur: D - 0.5, x: 1480, y: 96 });`
- S02: `type.counter(tl, { from: 1284, to: 4906, t: 0, dur: D, x: 1480, y: 48 });`
- S06: no `plate.mask("list")`. Header count `countUp(tl, countEl, 312, 1284, ...)` stays.
- S07: no `plate.mask("list")`. `.s07-row` background `transparent`. `.s07-title, .s07-line { display: none; }`. `.s07-head` background `#F4EFFA`, font-size `20px`.
- S25 and S26: `const TILE = 300`, `const TOP = 200`, `.qtile` background `#F4EFFA`, every tile has a `.qsub` line.

Count arc after Task 1: S01 `0 → 1284`, S02 `1284 → 4906`, S09 `4906 → 7`. There is no 856. Do not add one.

## Wave map

```
Task 1 S09 ──┐
Task 2 S12 ──┤
Task 3 S14 ──┼── parallel, one subagent each
Task 4 S16 ──┤
Task 5 S24 ──┤
Task 6 S27 ──┘
        │
        ▼
Task 7  hyperframes check (parallel across shots)
        ▼
Task 8  render-passes + composite (parallel across shots, 3 at a time)
        ▼
Task 9  master.py full   (one process, after every touched mov exists)
        ▼
Task 10 stills + critique
```

Working directory for every command: `videos/aiden-sre-film`.

---

### Task 1: S09 count continuity and the black counter

**Files:**
- Modify: `videos/aiden-sre-film/shots/S09/index.html:15-50` and `:188`

**Interfaces:**
- Consumes: `mountType(fg).counter(tl, spec)` from `shared/layers/type.js`. `spec` is `{ from, to, t, dur, x, y, label? }`. The shared CSS already draws the card. A local `.sg-counter` rule in this file paints over it.
- Produces: the on-screen number starts at `4,906` and ends at `7`.

- [ ] **Step 1: Confirm the bug is present**

Run: `rg -n "from: 1284, to: 7|background: var\\(--sg-ink\\)" shots/S09/index.html`

Expected: both the counter call and the ink background match.

- [ ] **Step 2: Delete the local counter override and lighten the rows**

Replace the `.s09-row` rule and the `.sg-counter` rule with:

```css
  .s09-row {
    position: absolute;
    box-sizing: border-box;
    left: 0;
    background: #F4EFFA;
    border-bottom: 1px solid #E3D8F2;
    border-radius: 0;
    overflow: hidden;
  }
```

Delete this whole rule:

```css
  .sg-counter {
    font-size: 64px;
    line-height: 1;
    background: var(--sg-ink);
    padding: 8px 12px;
  }
```

In `.s09-title`, set `font-size: 20px` and `color: #1C1A22`.

Delete these three rules so the support line is not a black bar. Shared `.sg-support` already sets cream Geist at 40px.

```css
  .sg-support .sg-mask {
    position: relative;
    background: transparent;
  }
  .sg-support {
    background: var(--sg-ink);
    padding: 6px 14px;
  }
  .sg-support .sg-rise {
    background: var(--sg-ink);
    color: var(--sg-cream);
  }
```

- [ ] **Step 3: Continue the count from S02’s end value**

Replace the counter call with:

```javascript
  type.counter(tl, { from: 4906, to: 7, t: 0.4, dur: 1.6, x: 1480, y: 72 });
```

- [ ] **Step 4: Verify**

Run: `rg -n "from: 4906, to: 7" shots/S09/index.html`

Expected: one match. `rg -n "background: var\\(--sg-ink\\)" shots/S09/index.html` does not match `.sg-counter`.

---

### Task 2: S12 bars beside the hypothesis lines

**Files:**
- Modify: `videos/aiden-sre-film/shots/S12/index.html:77-118`

**Interfaces:**
- Consumes: `plate.box("hyp-N")` returns composition pixels `{ x, y, w, h }` where `x` already includes the plate origin 120 and `y` already includes origin 90. `fillBars(tl, bars, 0.15, { stagger: 0.12 })` from `shared/layers/ui.js`. Each bar is `{ el, to, label, value }` with `to` in 0..1.
- Produces: six bars, no `.s12-rail`.

`plate.box` coordinates are absolute. Children of `plate.el` need plate-local pixels: subtract 120 from x and 90 from y. The current code places every bar at source-x 1220, which is a fixed column, and then covers the plate’s right edge with a 292px white rail.

- [ ] **Step 1: Confirm the rail is present**

Run: `rg -n "s12-rail" shots/S12/index.html`

Expected: a match.

- [ ] **Step 2: Replace the bar loop and delete the rail**

Replace from `const scale = 1680 / 1920;` through the end of the rail `forEach` (the block that ends at `plate.el.appendChild(rail);`) with:

```javascript
  const values = [87, 34, 22, 11, 6, 4];
  const bars = [];
  for (let i = 0; i < 6; i++) {
    const n = i + 1;
    const row = plate.box("hyp-" + n);
    const lead = n === 1;
    const localX = row.x - 120;
    const localY = row.y - 90;

    const track = document.createElement("div");
    track.className = "s12-track";
    track.dataset.key = "hyp-" + n + "-bar";
    track.style.left = (localX + row.w + 16) + "px";
    track.style.top = (localY + (row.h - 6) / 2) + "px";
    track.style.width = "160px";
    const fill = document.createElement("div");
    fill.className = "s12-bar " + (lead ? "is-lead" : "is-rest");
    track.appendChild(fill);
    plate.el.appendChild(track);

    const score = document.createElement("div");
    score.className = "s12-score " + (lead ? "is-lead" : "is-rest");
    score.dataset.key = "hyp-" + n + "-score";
    score.style.left = (localX + row.w + 16 + 160 + 8) + "px";
    score.style.top = (localY + (row.h - 24) / 2) + "px";
    score.style.width = "64px";
    plate.el.appendChild(score);

    bars.push({ el: fill, to: values[i] / 100, label: score, value: values[i] });
  }
  fillBars(tl, bars, 0.15, { stagger: 0.12 });
```

Leave the `s12-rule` block that follows (`const row1 = plate.box("hyp-1")`) in place.

- [ ] **Step 3: Verify**

Run: `rg -n "s12-rail|1220 \\* scale" shots/S12/index.html`

Expected: no matches. `rg -n "localX \\+ row.w \\+ 16" shots/S12/index.html` matches.

---

### Task 3: S14 arrow lands on the downstream marker

**Files:**
- Modify: `videos/aiden-sre-film/shots/S14/index.html` (style block and the arrow block at lines 55–103)

**Interfaces:**
- Consumes: `plate.box("marker-downstream")`, `plate.box("row-symptom")`, `plate.box("row-root")`. Boxes are absolute composition pixels. The SVG is a child of `mid` with `viewBox="0 0 1920 1080"`, so path coordinates stay absolute. `drawPath(tl, node, t, dur)` and `ringPulse` stay.
- Produces: a path whose end point is the marker center, plus a “Downstream” chip.

P08 boxes in source pixels (1920-wide): `marker-downstream` is 16×16 at (332, 384). `row-symptom` and `row-root` are full-bleed rows (w 1572), so `row.x + row.w` is the right edge of the plate. The current path connects those two right edges and never reaches the marker.

- [ ] **Step 1: Confirm the support line is below the safe line**

Run: `rg -n "support: \\{ x: 260, y: 1004 \\}" shots/S14/index.html`

Expected: one match. 40px type at line-height 1.2 ends near y 1052. Title-safe bottom is y 1010.

- [ ] **Step 2: Add the chip style**

Inside the existing `<style>`, after `.s14-arrow`, add:

```css
  .s14-chip {
    position: absolute;
    padding: 6px 10px;
    background: #F4EFFA;
    border: 1px solid #E3D8F2;
    color: #1C1A22;
    font-family: "Geist Mono", monospace;
    font-size: 20px;
    line-height: 1.2;
    border-radius: 0;
    white-space: nowrap;
  }
```

- [ ] **Step 3: Point the arrow at the marker and raise the support line**

Replace from `const marker = plate.box("marker-downstream");` through `mountType(fg).fromOst(...)` with:

```javascript
  const marker = plate.box("marker-downstream");
  const symptom = plate.box("row-symptom");
  const mx = marker.x + marker.w / 2;
  const my = marker.y + marker.h / 2;
  const x1 = symptom.x + 80;
  const y1 = symptom.y + symptom.h / 2;
  const x2 = mx;
  const y2 = my;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 - 36;
  const dx = x2 - cx;
  const dy = y2 - cy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const ah = 16;
  const bx = x2 - ux * ah;
  const by = y2 - uy * ah;
  const px = -uy * 7;
  const py = ux * 7;
  const n = (v) => Math.round(v * 100) / 100;
  const d = "M " + n(x1) + " " + n(y1) + " Q " + n(cx) + " " + n(cy) + " " + n(x2) + " " + n(y2)
    + " M " + n(bx + px) + " " + n(by + py) + " L " + n(x2) + " " + n(y2) + " L " + n(bx - px) + " " + n(by - py);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "s14-arrow");
  svg.setAttribute("viewBox", "0 0 1920 1080");
  svg.setAttribute("data-layout-allow-overflow", "");
  const under = document.createElementNS("http://www.w3.org/2000/svg", "path");
  under.setAttribute("fill", "none");
  under.setAttribute("stroke", "#1C1A22");
  under.setAttribute("stroke-width", "5");
  under.setAttribute("d", d);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "#6B6280");
  path.setAttribute("stroke-width", "3");
  path.setAttribute("d", d);
  svg.appendChild(under);
  svg.appendChild(path);
  mid.appendChild(svg);

  const chip = document.createElement("div");
  chip.className = "s14-chip";
  chip.textContent = "Downstream";
  chip.style.left = (marker.x + 24) + "px";
  chip.style.top = (marker.y - 8) + "px";
  mid.appendChild(chip);

  const tPoint = cueT(timing, "Root signal · downstream effect");
  drawPath(tl, under, tPoint - 0.4, 0.6);
  drawPath(tl, path, tPoint - 0.4, 0.6);
  ringPulse(tl, mid, marker, tPoint, { color: "var(--sg-violet)", rings: 1 });
  mid.querySelectorAll(".sg-ring").forEach((el) => el.setAttribute("data-layout-allow-overflow", ""));
  mountType(fg).fromOst(tl, timing.ost, { support: { x: 260, y: 940 } });
```

`row-root` is unused after this. Delete the `const root = plate.box("row-root");` line if it remains. Do not leave a reference to `root`.

- [ ] **Step 4: Verify**

Run: `rg -n "y: 940|Downstream" shots/S14/index.html`

Expected: both match. `rg -n "row-root" shots/S14/index.html` has no match.

---

### Task 4: S16 product RCA card and cursor clearance

**Files:**
- Modify: `videos/aiden-sre-film/shots/S16/index.html` styles, the RCA block, and the cursor path at lines 183–189

**Interfaces:**
- Consumes: `mountCursor(mid).path(tl, points)` where each point is `{ t, x, y }` and x/y are the top-left of a 22×22 arrow whose tip is the top-left corner (`M1 1`).
- Produces: the cursor’s last point is above the Fix control, not on the word.

The Fix control is `left: 632px; top: 300px; width: 148px; height: 44px` inside the card. The path currently ends at `(1208, 572)`, inside the empty lower half of the 820×420 dark card. The arrow tip is the SVG origin, so the cursor element’s top-left must sit just above the word.

- [ ] **Step 1: Confirm the end point**

Run: `rg -n "x: 1208, y: 572" shots/S16/index.html`

Expected: one match.

- [ ] **Step 2: Restyle the card and raise the row type**

Replace `.s16-card`, `.s16-title`, `.s16-row`, `.s16-fix`, and `.s16-reply` with:

```css
  .s16-card {
    position: absolute;
    box-sizing: border-box;
    background: #F4EFFA;
    border: 1px solid #E3D8F2;
    border-radius: 0;
    color: #1C1A22;
    overflow: hidden;
  }
  .s16-title {
    font-family: "Geist", sans-serif;
    font-size: 28px;
    line-height: 1.2;
    padding: 28px 32px 12px;
    border-radius: 0;
    color: #1C1A22;
  }
  .s16-row {
    font-family: "Geist Mono", monospace;
    font-size: 20px;
    line-height: 1.35;
    color: #6B6280;
    padding: 6px 32px;
    border-radius: 0;
  }
  .s16-fix {
    position: absolute;
    left: 32px;
    top: 196px;
    width: 148px;
    height: 44px;
    box-sizing: border-box;
    border: 1px solid #E3D8F2;
    background: #ffffff;
    border-radius: 0;
    font-family: "Geist Mono", monospace;
    font-size: 20px;
    line-height: 44px;
    padding-left: 16px;
    color: #1C1A22;
  }
  .s16-reply {
    font-family: "Geist Mono", monospace;
    font-size: 20px;
    line-height: 1.35;
    color: #6B6280;
    padding: 4px 28px;
  }
```

In the RCA element setup, set height to 280:

```javascript
  rca.style.height = "280px";
```

Add these two strings to the `rows` array, after the existing three:

```javascript
    "Last release · worker-service latest_79ece31",
    "Rollback held · error rate back to baseline",
```

- [ ] **Step 3: Park the cursor above the word**

The Fix control’s composition position is card left 560 + control left 32 = 592, card top 260 + control top 196 = 456. The word “Fix” starts 16px into the control. Place the 22px arrow so its tip is at the control’s top-left, not over the glyphs:

```javascript
  cursor.path(tl, [
    { t: 0.4, x: 700, y: 220 },
    { t: 1.05, x: 560, y: 430 },
  ]);
```

- [ ] **Step 4: Verify**

Run: `rg -n "x: 560, y: 430" shots/S16/index.html`

Expected: one match. `rg -n "height: \\"280px\\"" shots/S16/index.html` matches. `rg -n "background: var\\(--sg-panel\\)" shots/S16/index.html` has no match.

---

### Task 5: S24 resolved tile settled before the hold

**Files:**
- Modify: `videos/aiden-sre-film/shots/S24/index.html`

**Interfaces:**
- Consumes: shot duration 3.065s, cue `world` at t 2.17 (`build/timing.full.json`). The 62% hold is about 1.90s. The current tween starts at `world - 0.6` (1.57s) from a 1680×945 plate, so the hold is still a huge plate.
- Produces: a 420×420 card that has reached scale 1 before t 1.2.

Do not mount P12 here. S20 already shows that plate. This shot is the handoff tile.

- [ ] **Step 1: Confirm the full-bleed tween**

Run: `rg -n "scale: 420 / 945" shots/S24/index.html`

Expected: one match.

- [ ] **Step 2: Replace the plate CSS**

Replace `.s24-kicker`, `.s24-title`, `.s24-line`, `.s24-frame`, and `.s24-label` with:

```css
  .s24-kicker, .s24-line, .s24-label {
    font-family: "Geist Mono", monospace;
    border-radius: 0;
  }
  .s24-card {
    position: absolute;
    left: 750px;
    top: 280px;
    width: 420px;
    height: 300px;
    box-sizing: border-box;
    background: #F4EFFA;
    border: 1px solid #E3D8F2;
    border-radius: 0;
    overflow: hidden;
  }
  .s24-kicker {
    font-size: 20px;
    color: #6B6280;
    padding: 28px 32px 8px;
  }
  .s24-title {
    font-family: "Geist", sans-serif;
    font-size: 40px;
    line-height: 1.15;
    color: #1C1A22;
    padding: 0 32px 12px;
    border-radius: 0;
  }
  .s24-line {
    font-size: 20px;
    line-height: 1.4;
    color: #1C1A22;
    padding: 4px 32px;
  }
  .s24-resolved {
    display: inline-block;
    margin: 8px 32px 0;
    padding: 4px 10px;
    background: #E5F8EC;
    color: #146C36;
    font-family: "Geist Mono", monospace;
    font-size: 20px;
    line-height: 1.2;
    border-radius: 0;
  }
  .s24-label {
    position: absolute;
    left: 640px;
    top: 600px;
    width: 640px;
    text-align: center;
    font-size: 20px;
    line-height: 1.2;
    color: var(--sg-cream);
  }
```

Delete `.s24-frame`.

- [ ] **Step 3: Replace the plate script**

Delete `mockPlate`, the `mountPlate` try/catch, the `s24-frame` element, and the `clipPath` tween.

Build the card and a short settle that finishes before the hold:

```javascript
  const card = document.createElement("div");
  card.className = "s24-card";
  card.dataset.key = "resolved";
  const kicker = document.createElement("div");
  kicker.className = "s24-kicker";
  kicker.textContent = "checkout-svc";
  const title = document.createElement("div");
  title.className = "s24-title";
  title.textContent = "Incident resolved";
  const pill = document.createElement("div");
  pill.className = "s24-resolved";
  pill.textContent = "Resolved";
  card.appendChild(kicker);
  card.appendChild(title);
  card.appendChild(pill);
  for (const text of ["Error rate back to baseline", "Rollback held"]) {
    const line = document.createElement("div");
    line.className = "s24-line";
    line.textContent = text;
    card.appendChild(line);
  }
  mid.appendChild(card);

  const label = document.createElement("div");
  label.className = "s24-label";
  label.textContent = "REMEDIATE · Aiden for SRE";
  mid.appendChild(label);

  tl.fromTo(card, { scale: 0.92, opacity: 0 }, {
    scale: 1, opacity: 1, duration: 0.6, ease: EASE.enter,
  }, 0.2);
  tl.fromTo(label, { opacity: 0, y: 10 }, {
    opacity: 1, y: 0, duration: 0.45, ease: EASE.enter,
  }, 0.7);
```

Keep the ribbon mount, including the fan at `world - 0.4`. Keep `void fg;` and `applyCamera`. Remove the unused import `import { mountPlate } from "./_shared/layers/plate.js";`.

- [ ] **Step 4: Verify**

Run: `rg -n "s24-card|scale: 420" shots/S24/index.html`

Expected: `s24-card` matches, `scale: 420` does not.

---

### Task 6: S27 both buttons visible at the hold

**Files:**
- Modify: `videos/aiden-sre-film/shots/S27/index.html:60-79`

**Interfaces:**
- Consumes: `type.cta(tl, spec, tPrimary, tSecondary)`. `spec.secondary` and `spec.micro` already render. Times today are cue `Book a demo` at 2.693 and `Try Community Edition` at 4.051. The button fade is 0.5s, so the second button is still fading at the 62% hold (about 4.19s of a 6.766s shot).
- Produces: both buttons at opacity 1 by t 2.7. Ribbon opening opacity 0.35 so the wordmark is not on a full-strength rail.

- [ ] **Step 1: Confirm the late cue**

Run: `rg -n "cueT\\(timing, \\"Try Community Edition\\"\\)" shots/S27/index.html`

Expected: one match.

- [ ] **Step 2: Bring the buttons forward and drop the opening ribbon**

Change the first ribbon mode from `opacity: 1` to `opacity: 0.35`. Leave the second mode `{ t: 0.6, mode: "dormant", opacity: 0.4 }` as it is.

Replace the `type.cta(...)` call with:

```javascript
  type.cta(tl, {
    primary: "Book a demo",
    secondary: "Try Community Edition",
    micro: "free for up to two users",
    y: 620,
  }, 1.2, 2.0);
```

- [ ] **Step 3: Verify**

Run: `rg -n "}, 1.2, 2.0\\);" shots/S27/index.html`

Expected: one match. `rg -n "opacity: 0.35" shots/S27/index.html` matches.

---

### Task 7: Check every touched shot

**Files:** none.

**Interfaces:**
- Consumes: Tasks 1–6 saved, plus the already-landed shots.
- Produces: exit 0 from `hyperframes check` for each id below.

Run these in parallel. Working directory `videos/aiden-sre-film`.

- [ ] **Step 1: Check**

```bash
for S in S01 S02 S06 S07 S09 S12 S14 S16 S24 S25 S26 S27; do
  npx --yes hyperframes@0.8.96 check "shots/$S" || echo "FAIL $S"
done
```

Expected: no `FAIL` line, exit 0 for each check. If a check fails, fix that shot only and re-check it. Do not start Task 8 on a failing shot.

---

### Task 8: Render and composite the touched shots

**Files:** writes `renders/passes/Sxx-bg.mov`, `Sxx-mid.mov`, `Sxx-fg.mov`, and `renders/shots/Sxx.mov`.

**Interfaces:**
- Consumes: Task 7 passed.
- Produces: a `renders/shots/Sxx.mov` for each id, newer than that shot’s `index.html`.

Do not re-render S03, S04, S05, S08, S10, S11, S13, S15, S17–S23. `master.py` reuses the movs already on disk.

Run at most 3 shots at a time. Each shot is one process. Passes inside `render-passes.sh` stay sequential.

- [ ] **Step 1: Render and composite**

```bash
for S in S01 S02 S06 S07 S09 S12 S14 S16 S24 S25 S26 S27; do
  bash scripts/render-passes.sh "$S" full delivery
  bash scripts/composite.sh "$S"
done
```

Expected: each command prints nothing on stderr (ffmpeg is `-loglevel error`) and leaves `renders/shots/$S.mov`.

- [ ] **Step 2: Confirm the files exist**

```bash
for S in S01 S02 S06 S07 S09 S12 S14 S16 S24 S25 S26 S27; do
  test -f "renders/shots/$S.mov" && echo "ok $S" || echo "MISSING $S"
done
```

Expected: twelve `ok` lines.

---

### Task 9: Master

**Files:** writes `renders/master/aiden-sre-full.mp4`.

**Interfaces:**
- Consumes: every shot mov listed in `build/timing.full.json`, including the twelve from Task 8 and the untouched movs already in `renders/shots/`.
- Produces: one 1920×1080 30fps H.264 file whose duration matches `build/timing.full.json` (`duration` field, about 112.115s).

- [ ] **Step 1: Concat and encode**

```bash
python3 scripts/master.py full
```

Expected: a line like `.../renders/master/aiden-sre-full.mp4  112.115s  27 shots`.

- [ ] **Step 2: Probe**

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,avg_frame_rate -show_entries format=duration -of default=nw=1 renders/master/aiden-sre-full.mp4
```

Expected: `width=1920`, `height=1080`, `avg_frame_rate=30/1`, duration within 0.2s of the timing file.

---

### Task 10: Still proof

**Files:** writes `/tmp/aiden-polish/Sxx.png`. No composition edits in this task unless a still fails a check below. A failure goes back to that shot’s task.

**Interfaces:**
- Consumes: `renders/master/aiden-sre-full.mp4`.
- Produces: one PNG per hold. Holds are 62% of each shot, absolute seconds from `build/timing.full.json`.

| Shot | Seek seconds | Pass condition |
|---|---|---|
| S01 | 2.64 | Lavender “All Active” card, not cream 120px type across the cards |
| S02 | 6.30 | Same card, number climbing from 1,284 |
| S06 | 19.59 | P01 table visible, no dark list slab |
| S07 | 24.10 | P01 table visible, group chips `#F4EFFA` |
| S09 | 32.85 | Card shows a number falling toward 7, rows are `#F4EFFA` |
| S12 | 48.24 | Bars start to the right of each hypothesis sentence, no white rail |
| S14 | 55.20 | Arrowhead on the downstream marker, “Downstream” chip, support baseline above y 1010 |
| S16 | 63.53 | “Fix” fully readable, cursor tip above that control, card is `#F4EFFA` |
| S24 | 95.68 | 420-wide resolved card, “Resolved” pill, not a 1680px plate |
| S25 | 99.69 | Four 300px tiles inside the frame, each with a 20px line |
| S26 | 103.86 | Same tiles |
| S27 | 109.54 | “Book a demo” and “Try Community Edition” both opaque, microcopy “free for up to two users” |

- [ ] **Step 1: Extract**

```bash
mkdir -p /tmp/aiden-polish
ffmpeg -y -ss 2.64 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S01.png
ffmpeg -y -ss 6.30 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S02.png
ffmpeg -y -ss 19.59 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S06.png
ffmpeg -y -ss 24.10 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S07.png
ffmpeg -y -ss 32.85 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S09.png
ffmpeg -y -ss 48.24 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S12.png
ffmpeg -y -ss 55.20 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S14.png
ffmpeg -y -ss 63.53 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S16.png
ffmpeg -y -ss 95.68 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S24.png
ffmpeg -y -ss 99.69 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S25.png
ffmpeg -y -ss 103.86 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S26.png
ffmpeg -y -ss 109.54 -i renders/master/aiden-sre-full.mp4 -frames:v 1 /tmp/aiden-polish/S27.png
```

- [ ] **Step 2: Read each PNG**

Open the twelve files. Apply `critique-composition` (boxes, gaps) and `critique-visual-hierarchy` (entry point, type size) to each. A shot fails if its pass condition in the table is false. Fix only the failing shot, then repeat Tasks 7–10 for that shot id and Task 9 once at the end.

- [ ] **Step 3: Do not commit**

Leave the working tree dirty.
