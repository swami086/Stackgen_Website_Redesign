# AOF Homepage Launch Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 138.745s homepage launch film as one HyperFrames project with six sub-compositions and the locked lines from the spec.

**Architecture:** `videos/aof-homepage/index.html` is the master clock. Each act is a `<template>` sub-composition mounted with `data-composition-src`. Spoken lines live in `lines.json` and must fit their beats at or under 140 words a minute. The SRE quarter is authored HTML of the Auth Validation investigation. The other acts are designed motion. No MP4 in this plan.

**Tech Stack:** HyperFrames `0.8.40`, GSAP `3.14.2`, Node 22 (`/opt/homebrew/opt/node@22/bin`), IBM Plex Sans.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-30-aof-homepage-launch-video-design.md`. The composition table in that file is the master clock.
- Project: `videos/aof-homepage/`. Pin `hyperframes@0.8.40`. Frame `1920×1080`. Master duration `138.745`.
- Workflow: `product-launch-video`. Promo, not a site tour. Do not crawl the marketing site and do not replace these scenes with captured screenshots.
- Font: IBM Plex Sans. Do not use Inter.
- SRE Approve button: `#9e33ea`. Confirmation is a label and status swap. No green fill, no `#15803d`, no floating modal, no `box-shadow`, no side-tab accent, no whole-card scale punch.
- End card button text is exactly `Schedule a demo`. The string `Explore the products` must not appear.
- No logo wall. No customer quote. No named customer.
- DevOps on-screen outcome stays `Scale impact, not tickets.`
- World-model chip text stays `rollback fixed checkout`, and `BRIEF.md` keeps the verify flag.
- Spoken lines at or under 140 words a minute for their beat. If a line is over, cut words. Do not speed the read.
- `videos/aof-remediation-card` is reference only. Do not mount it.
- Do not render an MP4. Stop after `hyperframes check` and the three snapshots.
- Every command below assumes `export PATH="/opt/homebrew/opt/node@22/bin:$PATH"` first.
- Before the first step of a task, read that task's skills. The code in the task is the contract. The skill is how to write it. Do not start the step from this plan alone.

## Skills by task

Skill picker, 30 Sept 2026. HyperFrames skills have no author-pack router. `hyperframes` is the entry. One specialist after that. Where a pack router applied, the member is the router's job match, not the first search hit.

| Task | Read, in order | Why this one |
|---|---|---|
| 1 | `hyperframes`, then `product-launch-video` | Entry, then the launch workflow. Setup owns `init` and `BRIEF.md`. |
| 1 lines | `marketing-skills`, then `copywriting` | Homepage lines and a single CTA. The picker also returned `webinar-marketing`. The router table sends page and CTA copy to `copywriting`. Do not load the webinar skill. |
| 2 | `hyperframes-core` | `data-start`, `data-duration`, `data-composition-src`, `<template>` sub-compositions. |
| 3, 6, 7 | `hyperframes-animation` | Seek-safe GSAP. Plates, locks, opacity swaps. |
| 4 | `hyperframes-keyframes`, then `hyperframes-animation` | The beat is a push-in. Keyframes owns the camera. Animation owns the seam pulses. |
| 5 | `hyperframes-registry`, then `hyperframes-animation` | Search the registry for a cursor-click block before drawing one. The click itself follows `hyperframes-animation` `rules/cursor-click-ripple.md`. |
| 5 UI | `hyperframes-creative` | Palette, type, and the product-document look. IBM Plex Sans, `#9e33ea`, no card shadow. |
| 8 | `marketing-skills`, then `copywriting`, then `hyperframes-creative` | The button is the homepage CTA. Creative owns the end-card frame. |
| 9 | `hyperframes-cli` | `check` and `snapshot`. Render stays out. |
| Any `hyperframes check` step | `hyperframes-cli` | Same CLI skill. Read it once per session, not once per file. |

Do not load `general-video` (a launch workflow already fits), `ui-concept-animation` or `screenshots-to-walkthrough` (those run in Clueso, and this film is HyperFrames HTML), or `video-gated-product-demo` (this spec authors the SRE document and does not send it through Gate F).

---

### Task 1: Scaffold, brief, and the spoken-line check

**Skills:** Read `~/.cursor/skills/hyperframes/SKILL.md`, then `~/.cursor/skills/product-launch-video/SKILL.md` through Setup. For `lines.json` and the CTA rule, read `~/.cursor/skills/marketing-skills/SKILL.md` and follow it to `~/.cursor/skills/copywriting/SKILL.md`. Do not rewrite the locked lines.

**Files:**
- Create: `videos/aof-homepage/` via init
- Create: `videos/aof-homepage/BRIEF.md`
- Create: `videos/aof-homepage/lines.json`
- Create: `videos/aof-homepage/scripts/check-wpm.mjs`
- Create: `videos/aof-homepage/capture/extracted/tokens.json`
- Create: `videos/aof-homepage/capture/extracted/visible-text.txt`
- Create: `videos/aof-homepage/capture/extracted/asset-descriptions.md`
- Create: `videos/aof-homepage/capture/assets/.gitkeep`
- Modify: `videos/aof-homepage/hyperframes.json` (`authoringSkill` already set by `--skill=product-launch-video`)

**Interfaces:**
- Consumes: the spec's spoken lines and beat durations
- Produces: `lines.json` array of `{ id, dur, text }`. `check-wpm.mjs` exits 0 only when every line's word count is `<= dur / 60 * 140`. Later tasks must use these exact `text` strings for voiceover.

- [ ] **Step 1: Init, then write the failing check**

From the repo root. The directory must be absent. `init` refuses a non-empty directory.

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npx --yes hyperframes@0.8.40 init "videos/aof-homepage" --non-interactive --example=blank --skill=product-launch-video
```

Then create `videos/aof-homepage/scripts/check-wpm.mjs`. Do not create `lines.json` yet. The checker:

```js
import { readFileSync } from "node:fs";
const lines = JSON.parse(readFileSync(new URL("../lines.json", import.meta.url), "utf8"));
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
let failed = 0;
for (const line of lines) {
  const max = (line.dur / 60) * 140;
  const n = words(line.text);
  if (n > max) {
    failed += 1;
    console.error(`${line.id}: ${n} words > ${max.toFixed(1)} allowed in ${line.dur}s`);
  }
}
if (failed) process.exit(1);
console.log(`wpm ok (${lines.length} lines)`);
```

- [ ] **Step 2: Run it to verify it fails**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node videos/aof-homepage/scripts/check-wpm.mjs
```

Expected: FAIL because `lines.json` is missing (`ENOENT`).

- [ ] **Step 3: Add the brief, tokens, and lines**

Write `videos/aof-homepage/BRIEF.md`:

```markdown
---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Take control of production."
destination: website
aspect: 1920x1080
language: en
length: 138.745s
angle: homepage-launch
audience: on-call SRE
---

## Intent

Homepage product-launch film for the Autonomous Operations Factory. The viewer is already on the site. First 6.5 seconds state the pain. SRE is the live product. One CTA: Schedule a demo.

## Assets

- docs/superpowers/specs/2026-09-30-aof-homepage-launch-video-design.md — locked lines and clock
- videos/aof-remediation-card — reference for the Approve beat only, not mounted

## Customizations

- No site capture. Designed motion plus one authored SRE document.
- No MP4 until a later explicit render ask.

## Notes

- World-model chip "rollback fixed checkout" is still to verify. Show it. Do not drop the flag.
- DevOps outcome line stays "Scale impact, not tickets."
- Do not use "Explore the products", a logo wall, or a customer quote.
```

Write `videos/aof-homepage/capture/extracted/tokens.json`:

```json
{
  "title": "Autonomous Operations Factory",
  "description": "Homepage launch film. Designed motion. No site capture.",
  "colors": ["#f7f3ee", "#f3e8ff", "#6d28d9", "#e7a0b4", "#22d3ee", "#7c3aed", "#f3b08c", "#ec4899", "#9e33ea", "#f4f5f8"],
  "fonts": ["IBM Plex Sans"]
}
```

Write `videos/aof-homepage/capture/extracted/visible-text.txt` as a copy of the spoken and on-screen lines in the spec. Write `videos/aof-homepage/capture/extracted/asset-descriptions.md` with one line: `No assets captured. The film is authored HTML. The SRE Approve beat references videos/aof-remediation-card and is not a screenshot.` Create `videos/aof-homepage/capture/assets/.gitkeep`.

Write `videos/aof-homepage/lines.json`:

```json
[
  { "id": "hook", "dur": 6.49, "text": "AI code is hitting production faster than you can see it." },
  { "id": "lock", "dur": 5.67, "text": "What's missing is an operations factory, where all four work as one." },
  { "id": "reveal", "dur": 5.25, "text": "Aiden gives you four ways to start." },
  { "id": "world", "dur": 11.04, "text": "All four agents run on unified context: the Aiden World Model. Every agent reads and writes it, so what one learns, the others already know." },
  { "id": "os", "dur": 11.87, "text": "Aiden OS governs all of it. Every action is checked against your policies before it runs. Your team decides what needs approval, and every step is recorded." }
]
```

Show HeyGen auth and continue if signed out. A non-zero exit here means signed out, not a failed command:

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npx --yes hyperframes@0.8.40 auth status || true
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node videos/aof-homepage/scripts/check-wpm.mjs
```

Expected: `wpm ok (5 lines)`.

- [ ] **Step 5: Commit**

```bash
git add videos/aof-homepage
git commit -m "Add the homepage launch-film brief and spoken-line check."
```

---

### Task 2: Master clock

**Skills:** Read `~/.cursor/skills/hyperframes-core/SKILL.md` and `references/sub-compositions.md` before writing `index.html`.

**Files:**
- Modify: `videos/aof-homepage/index.html`
- Create: `videos/aof-homepage/scripts/check-clock.mjs`

**Interfaces:**
- Consumes: spec table starts and lengths
- Produces: host clips with these ids, sources, starts, and durations. Later composition files must use the same `data-composition-id` inside their `<template>`.

| id | src | start | duration |
|---|---|---|---|
| factory | compositions/factory.html | 0 | 28.455 |
| reveal | compositions/reveal.html | 28.455 | 5.252 |
| products | compositions/products.html | 33.707 | 77.697 |
| world | compositions/world.html | 111.403 | 11.045 |
| os | compositions/os.html | 122.448 | 11.872 |
| close | compositions/close.html | 134.321 | 4.424 |

- [ ] **Step 1: Write the failing clock check**

`videos/aof-homepage/scripts/check-clock.mjs`:

```js
import { readFileSync } from "node:fs";
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const want = [
  ["factory", "0", "28.455"],
  ["reveal", "28.455", "5.252"],
  ["products", "33.707", "77.697"],
  ["world", "111.403", "11.045"],
  ["os", "122.448", "11.872"],
  ["close", "134.321", "4.424"],
];
for (const [id, start, dur] of want) {
  const block = html.split(`data-composition-id="${id}"`)[1] || "";
  if (!block.includes(`data-start="${start}"`) || !block.includes(`data-duration="${dur}"`)) {
    console.error(`missing clock for ${id}`);
    process.exit(1);
  }
}
if (!html.includes('data-duration="138.745"')) {
  console.error("master duration");
  process.exit(1);
}
console.log("clock ok");
```

- [ ] **Step 2: Run it to verify it fails**

```bash
node videos/aof-homepage/scripts/check-clock.mjs
```

Expected: FAIL with `missing clock for factory`.

- [ ] **Step 3: Write the master**

Replace `videos/aof-homepage/index.html` with a standalone composition. Head loads GSAP `3.14.2` and IBM Plex Sans. Body:

```html
<div
  id="root"
  data-composition-id="main"
  data-start="0"
  data-duration="138.745"
  data-width="1920"
  data-height="1080"
>
  <div id="el-factory" data-composition-id="factory" data-composition-src="compositions/factory.html" data-start="0" data-duration="28.455" data-track-index="1" data-width="1920" data-height="1080"></div>
  <div id="el-reveal" data-composition-id="reveal" data-composition-src="compositions/reveal.html" data-start="28.455" data-duration="5.252" data-track-index="1" data-width="1920" data-height="1080"></div>
  <div id="el-products" data-composition-id="products" data-composition-src="compositions/products.html" data-start="33.707" data-duration="77.697" data-track-index="1" data-width="1920" data-height="1080"></div>
  <div id="el-world" data-composition-id="world" data-composition-src="compositions/world.html" data-start="111.403" data-duration="11.045" data-track-index="1" data-width="1920" data-height="1080"></div>
  <div id="el-os" data-composition-id="os" data-composition-src="compositions/os.html" data-start="122.448" data-duration="11.872" data-track-index="1" data-width="1920" data-height="1080"></div>
  <div id="el-close" data-composition-id="close" data-composition-src="compositions/close.html" data-start="134.321" data-duration="4.424" data-track-index="1" data-width="1920" data-height="1080"></div>
</div>
<script>
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = gsap.timeline({ paused: true });
</script>
```

`html, body` are `1920px` by `1080px`, background `#f7f3ee`, overflow hidden. No `<audio>` element.

- [ ] **Step 4: Run the check to verify it passes**

```bash
node videos/aof-homepage/scripts/check-clock.mjs
```

Expected: `clock ok`.

- [ ] **Step 5: Commit**

```bash
git add videos/aof-homepage/index.html videos/aof-homepage/scripts/check-clock.mjs
git commit -m "Mount the homepage film on the storyboard clock."
```

---

### Task 3: Factory open

**Skills:** Read `~/.cursor/skills/hyperframes-animation/SKILL.md`. Pick the lock and the opacity-swap rules. Do not add a camera move in this composition.

**Files:**
- Create: `videos/aof-homepage/compositions/factory.html`

**Interfaces:**
- Consumes: id `factory`, duration `28.455`, `lines.json` ids `hook` and `lock`
- Produces: on-screen strings `Take control of production.`, `Delivery got faster. Operations didn’t.`, `OPERATIONS FACTORY`, `Your software factory needs an operations factory.`

- [ ] **Step 1: Write the composition**

`compositions/factory.html` is a sub-composition: all CSS, markup, and script live inside `<template>`. Root:

```html
<div id="root" data-composition-id="factory" data-width="1920" data-height="1080" data-duration="28.455"></div>
```

Background `#f7f3ee`. Two pieces, each `280×280`, `border-radius: 28px`. `#software` background `#6d28d9`, label `SOFTWARE FACTORY`. `#ops` is four `120×120` cells (`#q-build`, `#q-operate`, `#q-observe`, `#q-remediate`) with labels BUILD, OPERATE, OBSERVE, REMEDIATE, then a single `#ops-joined` block background `#e7a0b4` label `OPERATIONS FACTORY`, hidden until the lock. Four text nodes for the on-screen lines, only one visible at a time via opacity. No `box-shadow`.

Script registers `window.__timelines["factory"]` as a paused timeline:

- `0.00–6.49`: `#line-hook` opacity 1, text `Take control of production.` `#software` at center. `#ops` opacity 0.
- `6.49`: hide hook, show `#line-gap` text `Delivery got faster. Operations didn’t.` Move the four cells apart (`x` ±40).
- `16.30`: cells `x: 0`, hide the cells, show `#ops-joined` and `#line-ops` text `OPERATIONS FACTORY`.
- `21.96`: show `#line-join` text `Your software factory needs an operations factory.` Move `#software` and `#ops-joined` together (`x` toward 0).
- Hold to `28.455`.

Use opacity and transform only. Eases `power3.out`. No tween longer than `0.45` except the hold.

- [ ] **Step 2: Check this file mounts**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 check
```

Expected: the command reports the missing sibling compositions until Tasks 4–8 exist. If it fails only because `reveal.html`, `products.html`, `world.html`, `os.html`, or `close.html` are absent, that failure is expected in this task. Any error inside `factory.html` (lint, contrast, timeline) must be fixed before commit. Re-run until factory itself is not named in an error.

- [ ] **Step 3: Commit**

```bash
git add videos/aof-homepage/compositions/factory.html
git commit -m "Add the factory-open composition."
```

---

### Task 4: Category reveal

**Skills:** Read `~/.cursor/skills/hyperframes-keyframes/SKILL.md` for the push-in, then `~/.cursor/skills/hyperframes-animation/SKILL.md` for the seam pulses. The push-in is on an inner wrapper, not on the timed clip.

**Files:**
- Create: `videos/aof-homepage/compositions/reveal.html`

**Interfaces:**
- Consumes: id `reveal`, duration `5.252`, `lines.json` id `reveal`
- Produces: on-screen string `Autonomous Operations Factory`

- [ ] **Step 1: Write the composition**

Same `<template>` shape as Task 3. Root id `reveal`, `data-duration="5.252"`. Background `#f3e8ff`. One heading, exact text `Autonomous Operations Factory`. Four `8px` seam lines inside a `360×360` square, opacity 0 at t=0. Paused timeline `window.__timelines["reveal"]`: seams fade in over `0.3s` at t=`0.4`, then each seam pulses opacity `1 → 0.45 → 1` in order, `0.35s` each, starting at t=`1.2`. Heading stays visible the whole `5.252s`.

The approved spec also requires a push-in. Put the heading and the seam square inside an inner wrapper. Animate that wrapper, not the composition root. Follow `hyperframes-keyframes` for the camera move. Keep the seam timings above.

- [ ] **Step 2: Re-run check**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 check
```

Expected: no error that names `reveal.html`. Missing later files may still fail the command.

- [ ] **Step 3: Commit**

```bash
git add videos/aof-homepage/compositions/reveal.html
git commit -m "Add the category reveal."
```

---

### Task 5: Four products, including the live SRE document

**Skills:** Read `~/.cursor/skills/hyperframes-registry/SKILL.md` and search for a cursor-click block before writing a ripple by hand. Then read `~/.cursor/skills/hyperframes-animation/rules/cursor-click-ripple.md` and `~/.cursor/skills/hyperframes-creative/SKILL.md`. The SRE surface stays the authored document in the spec.

**Files:**
- Create: `videos/aof-homepage/compositions/products.html`
- Create: `videos/aof-homepage/scripts/check-products.mjs`

**Interfaces:**
- Consumes: id `products`, duration `77.697`
- Produces: four quarters. SRE block contains the exact strings `REMEDIATE · Aiden for SRE`, `99%`, `461.8 ms`, `400 ms`, `4d229239`, `90% less alert noise`, `Approve`, `Approved`, `Rollback queued`. Approve background `#9e33ea`.

- [ ] **Step 1: Write the failing product check**

`scripts/check-products.mjs` reads `compositions/products.html` and exits 1 unless every string above is present, `#9e33ea` is present, and `box-shadow`, `#15803d`, and `Explore the products` are absent.

```js
import { readFileSync } from "node:fs";
const html = readFileSync(new URL("../compositions/products.html", import.meta.url), "utf8");
const need = ["REMEDIATE · Aiden for SRE", "99%", "461.8 ms", "400 ms", "4d229239", "90% less alert noise", "Approve", "Approved", "Rollback queued", "#9e33ea", "Scale impact, not tickets.", "Ship infra at AI speed.", "Observability without the upkeep."];
const ban = ["box-shadow", "#15803d", "Explore the products"];
let failed = 0;
for (const s of need) if (!html.includes(s)) { console.error("missing " + s); failed++; }
for (const s of ban) if (html.includes(s)) { console.error("banned " + s); failed++; }
if (failed) process.exit(1);
console.log("products ok");
```

- [ ] **Step 2: Run it to verify it fails**

```bash
node videos/aof-homepage/scripts/check-products.mjs
```

Expected: FAIL with `ENOENT` or `missing REMEDIATE · Aiden for SRE`.

- [ ] **Step 3: Write the composition**

Root id `products`, `data-duration="77.697"`. Canvas `#f7f3ee`. A `64px` rail of four quarters. The active quarter is full color. The other three are `#d9d4cc`.

Local timeline, paused, id `products`:

- `0–21.39` SRE. Quarter `#22d3ee`. Title `REMEDIATE · Aiden for SRE`. Then three panels swapped by opacity, not by deleting nodes:
  - `2–8`: alert queue, a number tween is not required. Static text `Active 7`, then at local `5` swap to `Active 1`. Caption `90% less alert noise`.
  - `8–14`: `Auth Validation Latency RCA`, `Confirmed`, `99%`, `461.8 ms`, `400 ms`. Cause sentence from the spec: `CACHE_TTL_SECONDS` went from 300 to 0, and a 450 ms sleep was added on the cache-miss path.
  - `14–21.39`: proposed action `Roll back auth-service to 4d229239`. Button `#9e33ea`, white label `Approve`. At local `16.2` crossfade the label to `Approved` and the status from `Needs your approval` to `Rollback queued`. A cursor moves at most `80px` onto the button over `0.4s` with `power3.out`, then a `0.06s` press. One ripple. Chip `LEARN` visible from local `19`.
- `21.39–38.23` InfraOps. Quarter `#7c3aed`. Title `BUILD · Aiden for InfraOps`. Outcome `Ship infra at AI speed.` Show a one-line request, a `module` token, and a policy row that switches to the text `Policy checked`.
- `38.23–57.14` DevOps. Quarter `#f3b08c`. Title `OPERATE · Aiden for DevOps`. Outcome `Scale impact, not tickets.` One skill card, then two task labels `Cost report` and `Cluster health check`.
- `57.14–77.697` Observability. Quarter `#ec4899`. Title `OBSERVE · Aiden for Observability`. Outcome `Observability without the upkeep.` A question line and a card titled `Likely cause`.

SRE document type is IBM Plex Sans, `14px` body and `24px` title. No `box-shadow`.

- [ ] **Step 4: Run both checks**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node videos/aof-homepage/scripts/check-products.mjs
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 check
```

Expected: `products ok`. `hyperframes check` may still name the three missing compositions. It must not name `products.html`.

- [ ] **Step 5: Commit**

```bash
git add videos/aof-homepage/compositions/products.html videos/aof-homepage/scripts/check-products.mjs
git commit -m "Add the four product quarters and the SRE approve beat."
```

---

### Task 6: World model

**Skills:** Read `~/.cursor/skills/hyperframes-animation/SKILL.md`. The plate enter is opacity and `y` only.

**Files:**
- Create: `videos/aof-homepage/compositions/world.html`

**Interfaces:**
- Consumes: id `world`, duration `11.045`, `lines.json` id `world`
- Produces: strings `AIDEN WORLD MODEL`, `what's deployed · what changed · what broke · what fixed it`, `rollback fixed checkout`

- [ ] **Step 1: Write the composition**

Root id `world`, `data-duration="11.045"`. A plate `y: 40` opacity 0, then `y: 0` opacity 1 over `0.4s` at t=`0.3`. Exact heading and subtitle above. A chip with exact text `rollback fixed checkout` moves `x` from `160` to `960` over `4s` starting at t=`2`, `power2.inOut`. Four short connector lines, opacity 1 after the plate lands. Timeline id `world`. No `box-shadow`.

- [ ] **Step 2: Check**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 check
```

Expected: no error naming `world.html`.

- [ ] **Step 3: Commit**

```bash
git add videos/aof-homepage/compositions/world.html
git commit -m "Add the world-model plate."
```

---

### Task 7: Aiden OS

**Skills:** Read `~/.cursor/skills/hyperframes-animation/SKILL.md`, including the press timing in `rules/cursor-click-ripple.md` for the Approve tap.

**Files:**
- Create: `videos/aof-homepage/compositions/os.html`

**Interfaces:**
- Consumes: id `os`, duration `11.872`, `lines.json` id `os`
- Produces: heading `AIDEN OS` and pills `Policy`, `Approvals`, `Identity`, `Audit`, `Cost controls`, `Integrations`, plus a visible `Approve` tap and the text `Audit line written`

- [ ] **Step 1: Write the composition**

Root id `os`, `data-duration="11.872"`. Pills start opacity `0.35`. Timeline id `os` sets each pill to opacity `1` in order, `0.25s` apart, starting at t=`0.4`. A token moves to a policy mark at t=`3` (label `Passed`), waits at an `Approve` control from t=`5.5` to `7.2`, then the audit strip text `Audit line written` fades in over `0.3s`. No `box-shadow`. No green button fill.

- [ ] **Step 2: Check**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 check
```

Expected: no error naming `os.html`.

- [ ] **Step 3: Commit**

```bash
git add videos/aof-homepage/compositions/os.html
git commit -m "Add the Aiden OS plate."
```

---

### Task 8: Close

**Skills:** Read `~/.cursor/skills/marketing-skills/SKILL.md`, then `~/.cursor/skills/copywriting/SKILL.md` (one CTA, the locked label `Schedule a demo`). Then `~/.cursor/skills/hyperframes-creative/SKILL.md` for the end card. Do not invent a second button.

**Files:**
- Create: `videos/aof-homepage/compositions/close.html`
- Create: `videos/aof-homepage/scripts/check-close.mjs`

**Interfaces:**
- Consumes: id `close`, duration `4.424`
- Produces: `AUTONOMOUS OPERATIONS FACTORY`, `Start anywhere.`, and a button whose text is exactly `Schedule a demo`

- [ ] **Step 1: Write the failing close check**

```js
import { readFileSync } from "node:fs";
const html = readFileSync(new URL("../compositions/close.html", import.meta.url), "utf8");
for (const s of ["AUTONOMOUS OPERATIONS FACTORY", "Start anywhere.", "Schedule a demo"]) {
  if (!html.includes(s)) { console.error("missing " + s); process.exit(1); }
}
if (html.includes("Explore the products")) { console.error("banned cta"); process.exit(1); }
console.log("close ok");
```

- [ ] **Step 2: Run it to verify it fails**

```bash
node videos/aof-homepage/scripts/check-close.mjs
```

Expected: FAIL, file missing.

- [ ] **Step 3: Write the composition**

Root id `close`, `data-duration="4.424"`. The assembly from the factory pieces stays as a small centered cluster, opacity `1`. Lower third holds the eyebrow and `Start anywhere.` A button, background `#1c1f24`, white text `Schedule a demo`, opacity 0 until t=`0.4`, then opacity 1 over `0.3s`. Timeline id `close`. No second button. No URL.

- [ ] **Step 4: Run the full project check**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node videos/aof-homepage/scripts/check-wpm.mjs
node videos/aof-homepage/scripts/check-clock.mjs
node videos/aof-homepage/scripts/check-products.mjs
node videos/aof-homepage/scripts/check-close.mjs
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 check
```

Expected: each node script prints its ok line. `hyperframes check` exits 0. If contrast fails on `#9e33ea`, keep that color and fix only the non-button text the checker names. Do not recolor Approve to pass.

- [ ] **Step 5: Commit**

```bash
git add videos/aof-homepage/compositions/close.html videos/aof-homepage/scripts/check-close.mjs
git commit -m "Add the homepage end card."
```

---

### Task 9: Three snapshots, then stop

**Skills:** Read `~/.cursor/skills/hyperframes-cli/SKILL.md` for `snapshot`. Do not open the render command.

**Files:**
- Create: `videos/aof-homepage/snapshots/` (command output)

**Interfaces:**
- Consumes: the mounted film
- Produces: PNGs at `3`, `49.9`, and `136` seconds. Does not produce an MP4.

- [ ] **Step 1: Snapshot the three gates**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
cd videos/aof-homepage && npx --yes hyperframes@0.8.40 snapshot --at 3,49.9,136
```

Expected: three PNGs. `3s` shows `Take control of production.` `49.9s` is inside the SRE Approve beat (master `33.707` plus local `16.2`). `136s` shows `Schedule a demo`.

- [ ] **Step 2: Look at the three PNGs**

Read the files in `videos/aof-homepage/snapshots/`. If a frame shows the wrong line, fix that composition and re-snapshot only that time. Do not run `hyperframes render`.

- [ ] **Step 3: Commit the snapshots**

```bash
git add videos/aof-homepage/snapshots
git commit -m "Snapshot the hook, the approve click, and the demo card."
```

Stop. Tell the user the three snapshot paths. Wait for a render ask.
