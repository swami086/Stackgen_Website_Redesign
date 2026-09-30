# AOF Jigsaw Picture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat squares in the built homepage film with the 9 Sept isometric jigsaw, re-timed to the storyboard, and make each product beat fill the frame.

**Architecture:** One existing HyperFrames project. The host clock does not move. `assets/jigsaw-v1.html` is the geometry (`draw`, `PIECES`, `stateAt` fields). Factory, reveal, world, OS, and close call `draw` from one paused GSAP timeline. Product beats stay HTML sheets, cropped large.

**Tech Stack:** HyperFrames 0.8.40, GSAP 3.14.2, IBM Plex Sans from `assets/fonts/IBMPlexSans-Var-Roman.woff2`. Node 22 at `/opt/homebrew/opt/node@22/bin`.

**Worktree:** `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/aof-homepage-launch` on `feat/aof-homepage-launch-video`.

## Global Constraints

- Host `data-start` and `data-duration` stay: factory 0 / 28.455, reveal 28.455 / 5.252, products 33.707 / 77.697, world 111.403 / 11.045, os 122.448 / 11.872, close 134.321 / 4.424. Host duration 138.745.
- On-screen and spoken lines stay the locked spec: `docs/superpowers/specs/2026-09-30-aof-homepage-launch-video-design.md`.
- Canvas `#f7f3ee`. SRE sheet canvas `#f4f5f8`. Approve `#9e33ea`. No `box-shadow`. No side-tab accent. No floating modal. No Inter.
- Font: `@font-face` to `assets/fonts/IBMPlexSans-Var-Roman.woff2`. Family `IBM Plex Sans`.
- One paused GSAP timeline per composition on `window.__timelines[id]`. No `requestAnimationFrame`. No `performance.now`. No `Math.random`. No `repeat: -1`. No `display` or `visibility` tweens. Opacity only.
- Seek by calling `draw` from the timeline `onUpdate`. Positions are constants, not `getBoundingClientRect`.
- Prefix new ids with the composition name so they do not collide (`fj-`, `sre-`).
- No MP4.
- Skills for every task: read `hyperframes-core` non-negotiable rules and `hyperframes-animation` critical constraints before editing. Do not re-run product-launch capture.

---

### Task 1: Factory jigsaw

**Files:**
- Modify: `.worktrees/aof-homepage-launch/videos/aof-homepage/compositions/factory.html`
- Source: `.worktrees/aof-homepage-launch/videos/aof-homepage/assets/jigsaw-v1.html` (already saved; Drive file `260909 - Factory Jigsaw Animation v1.0.html`)
- Test: `.worktrees/aof-homepage-launch/videos/aof-homepage/scripts/check-factory.mjs`

**Interfaces:**
- Consumes: `draw(name, ox, oy, lift, mated)` and the piece table in `jigsaw-v1.html`.
- Produces: `storyState(t)` returning `{halfSep, qSep, hLift, qLift, wholeOp, quadOp}`. Later plates call the same `draw` with `halfSep: 0`, `qSep: 0`, `wholeOp: 1`, `quadOp: 0`.

- [ ] **Step 1: Write the check**

```js
import { readFileSync } from "node:fs";
const html = readFileSync(new URL("../compositions/factory.html", import.meta.url), "utf8");
const need = ["storyState", "fj-token", "fj-rate", "fj-glyph", "Take control of production.", "Delivery got faster. Operations didn't.", "OPERATIONS FACTORY", "Your software factory needs an operations factory."];
for (const s of need) if (!html.includes(s)) { console.error("missing", s); process.exit(1); }
if (/requestAnimationFrame|performance\.now/.test(html)) { console.error("not seek-safe"); process.exit(1); }
console.log("factory ok");
```

- [ ] **Step 2: Run it and confirm it fails**

Run from `videos/aof-homepage` with Node 22: `node scripts/check-factory.mjs`
Expected: exit 1, missing `storyState`.

- [ ] **Step 3: Replace the flat squares**

Keep the composition id, the template wrapper, the font-face, and the 28.455s timeline. Delete `#software` and `#ops` rounded squares. Paste the jigsaw `draw` / piece geometry into the template script. Delete its `requestAnimationFrame` loop and the click-to-pause handler. Drive it with:

```js
function storyState(t) {
  var halfSep = 1, qSep = 1, hLift = 0, qLift = 0, wholeOp = 0, quadOp = 0;
  if (t < 6.493) {
    halfSep = 1; qSep = 0; wholeOp = 0; quadOp = 0;
  } else if (t < 16.297) {
    halfSep = 1; qSep = 1; wholeOp = 0; quadOp = 1;
  } else if (t < 21.962) {
    var p = (t - 16.297) / 5.666;
    var prog = eio(p);
    qSep = 1 - prog; qLift = 10 * bell(prog);
    wholeOp = p > 0.72 ? 1 : 0; quadOp = 1 - wholeOp; halfSep = 1;
  } else {
    var p2 = Math.min(1, (t - 21.962) / 6.493);
    var prog2 = eio(p2);
    halfSep = 1 - prog2; hLift = 12 * bell(prog2);
    wholeOp = 1; quadOp = 0; qSep = 0;
  }
  return { halfSep: halfSep, qSep: qSep, hLift: hLift, qLift: qLift, wholeOp: wholeOp, quadOp: quadOp };
}
```

`eio` and `bell` are the functions already in `jigsaw-v1.html`. In `draw`’s caller, skip the ops whole piece and the four quarters when `wholeOp` and `quadOp` are 0, using opacity, never `style.display`.

Add eight `fj-token` squares that travel from the violet piece’s right edge off-screen during 0–6.493s, and again through both halves after 21.962s. Add `fj-rate`, a 2px line whose scaleX runs 0 to 1 over 0–6.493s. Add `fj-glyph`, a 28px circle that crosses the gap once between 8s and 14s.

On-screen lines, opacity swaps only: “Take control of production.” at 0, “Delivery got faster. Operations didn't.” at 6.493, “OPERATIONS FACTORY” at 16.297, “Your software factory needs an operations factory.” at 21.962. One visible at a time.

Timeline `onUpdate` calls `draw` with `storyState(tl.time())`.

- [ ] **Step 4: Check**

`node scripts/check-factory.mjs` exits 0. `npx hyperframes check` reports 0 errors. Snapshot at local 3s shows the isometric violet piece, not a rounded square.

- [ ] **Step 5: Commit**

```bash
git add videos/aof-homepage/compositions/factory.html videos/aof-homepage/assets/jigsaw-v1.html videos/aof-homepage/scripts/check-factory.mjs
git commit -m "Re-time the factory jigsaw to the storyboard."
```

### Task 2: Reveal push

**Files:**
- Modify: `videos/aof-homepage/compositions/reveal.html`

Keep duration 5.252s. The picture is the joined jigsaw (`halfSep` 0, `wholeOp` 1), not four flat cells. Push scale 1.15 on an inner wrapper, not the composition root. Seams fade in and each quarter pulses once. On screen: “Autonomous Operations Factory.” Commit: `Show the joined jigsaw in the category reveal.`

### Task 3: SRE sheet fills the frame

**Files:**
- Modify: `videos/aof-homepage/compositions/products.html` (SRE block only)

Prefix SRE ids with `sre-`. The investigation sheet is at least 1400px wide on `#f4f5f8`, hairline `1px solid #e6eaee`. Visible: title “REMEDIATE · Aiden for SRE.”, queue count, stage words Discover, Triage, Root cause, Remediate, Learn, confidence 99%, 461.8 ms, threshold 400 ms, the `CACHE_TTL_SECONDS` sentence, Approve `#9e33ea`, then Approved and “Rollback queued.” Delete filler strings “Alert queue”, “Awaiting check”, “What changed in this service?”, “A recent change” if they are still the only body copy. Commit: `Fill the SRE beat with the investigation sheet.`

### Task 4: InfraOps, DevOps, Observability surfaces

**Files:**
- Modify: `videos/aof-homepage/compositions/products.html` (the other three quarters)

Each surface is a sheet at least 1200px wide, not a caption in an empty frame. InfraOps shows a plain-language request, a Terraform block, a green policy row, and an approval queue. DevOps shows one skill card, copies fanning to three avatars, and two task cards: cost report, cluster health. Observability shows an integrations grid, a dashboard of four panels, a cloud outline, and a likely-cause card. Outcome lines stay “Ship infra at AI speed.”, “Scale impact, not tickets.”, “Observability without the upkeep.” Commit: `Give the other three products a surface.`

### Task 5: World model and Aiden OS on the jigsaw

**Files:**
- Modify: `videos/aof-homepage/compositions/world.html`
- Modify: `videos/aof-homepage/compositions/os.html`

Both show the joined jigsaw above the plate, not a new set of squares. World: plate “AIDEN WORLD MODEL”, the four clauses, connectors that meet the chip, chip text “rollback fixed checkout” traveling under InfraOps. OS: pills Policy, Approvals, Identity, Audit, Cost controls, Integrations. The action token’s tip lands on the Approve centroid. Approve on this plate stays `#6d28d9`. SRE Approve stays `#9e33ea`. Commit: `Set the plates under the joined jigsaw.`

### Task 6: Close holds the joined pair

**Files:**
- Modify: `videos/aof-homepage/compositions/close.html`

The two isometric pieces are flush (`halfSep` 0). No 48px gap. Lower third: “AUTONOMOUS OPERATIONS FACTORY”, “Start anywhere.”, button “Schedule a demo.” No “Explore the products.” Commit: `Hold the joined jigsaw on the end card.`

### Task 7: Snapshots

From `videos/aof-homepage`, with Node 22:

```bash
npx hyperframes snapshot --at 3,50.4,136
```

3s is the violet piece and the hook line. 50.4s is the SRE sheet with Approved. 136s is the joined pair and Schedule a demo. `npx hyperframes check` exits 0. Do not render an MP4. Commit: `Snapshot the jigsaw, the approval, and the end card.`
