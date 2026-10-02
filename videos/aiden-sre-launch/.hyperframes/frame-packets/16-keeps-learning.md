# Frame packet: 16-keeps-learning

## Project inputs

- Project: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
- Design tokens: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch/frame.md
- RULES_DIR: /Users/swami/.cursor/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 16 — Keeps learning

- scene: Investigation cards file into a growing knowledge lattice; each new incident starts further along a track.
- duration: 8.245s
- transition_in: cut
- status: outline
- voiceover: "And it keeps learning. Every investigation adds to what Aiden knows about your environment, so the next incident starts further ahead."
- src: compositions/frames/16-keeps-learning.html
- blueprint: grid-card-assemble (Adapt)
- rules: depth-scatter-assemble, svg-path-draw, multi-phase-camera

Investigation cards file into a growing knowledge lattice; each new incident starts further along a track.

Components: compositions/components/13-learn
Generated video: none (assets/el-video/<id>.mp4, head-trimmed)
Cues (local seconds): Every incident makes the next one easier @ 5.76s
Hits (local seconds): none
SFX: soft-tick, data-whoosh
Counter: none

## Selected blueprint: grid-card-assemble

# grid-card-assemble — Grid / Card Assemble

**intent**: N items (tiles / cards / logos / list-lines) self-assemble in a staggered cascade into a grid or vertical list and hold — a "look how much / who / what it does" beat that enumerates breadth at once; an optional camera zoom-OUT pulls back to reveal the assembled array sitting inside a vaster whole.

**roles served**

- Key_Feature (from key-feature-card-grid-assemble): a grid of labeled feature tiles/pills (icon + label) cascades one-by-one into a 2-col-brick / 3×3 grid, then holds near-static with a slow push-in — enumerate many capabilities, no live UI, no cursor.
- Key_Feature (from key-feature-glass-card-camera-reveal): open TIGHT on 2–3 glowing icons; a camera zoom-OUT unfolds a row of glassmorphism cards that grow from behind the icons (icons shrink to card headers), center card scales forward, the group floats, then sweeps out — a "pillars revealed at once" reveal variant of the same assemble shape.
- Benefits (from benefits-vertical-list): short value phrases populate a single vertical list ~1 item/sec, co-resident and accumulating; each line enters via a spring marker-pop + check-draw + pill mask-wipe, OR the whole stack snaps up one slot per beat (slot-machine) so the newest lands in the bright focal slot.
- Social_Proof (from social-proof-logo-grid-zoom-out): a wall of partner/app logos builds into a center grid (whole-enter / randomized pop-in / column slide-up), an optional headline + accent-gradient proof-number fills in above, then a continuous camera zoom-OUT shrinks the array to reveal a vast ecosystem; optional fixed HUD/viewfinder brackets; optional grid slide-up fly-out exit.
- Key_Feature (from live-data-populate-board): the array assembles by POPULATING ITSELF — skeleton pills fill and swap to real data, cards spring in tethered to map markers — and its state keeps flipping live after assembly (status pills stepping through states); no cursor, locked frame. The "look how much" beat becomes "look, it's doing it right now."
- Benefits (from item-field-to-payoff-card): a breadth FIELD — a rapidly streaming list past a fixed focal slot, or a chip array with one highlighted hero — plays its breadth motion, then CLEARS to concise centered payoff text (claim / price / URL end card). The array is the argument's setup; the payoff line is its landing.

**duration**: 3.0–10.5s (Social_Proof 3.0–6s · live-populate 4.2–7.8s · Key_Feature grid 5.8–7.3s · Benefits stream/field-to-payoff 5.9–8.4s · Key_Feature glass-card 6.5s · Benefits list 6.5–10.5s, scaling ~1 item/sec with count)

**shot structure** (consolidated template — concrete motion verbs, [slots])

- **Scene 1 (0.0–~1.0s) — open + first arrivals.** On a `[gradient / radial / dark background]` (optional `[dot-grid / drifting-watermark]` texture), an empty `[grid or list region]` is established and items begin to ASSEMBLE in a quick staggered cascade (~0.04–0.08s gap; list pacing ~1 item/sec). Each `[item: feature tile / pill / logo tile / benefit line]` fades + slides/scales a short distance directly into its slot (low drama — no scatter, no big bounce; spring overshoot reserved for accent markers). Camera static. An opening `[headline / hook]` may fill in line-by-line above the array, with any `[proof number]` counting up in an `[accent gradient]`.
- **Scene 2 (~1.0s–~Xs) — array resolves + holds.** Remaining items finish arriving; layout resolves into the final `[2-col-brick / 3×3 grid / dense mosaic / stacked list]`. The completed array HOLDS, alive but resting: a gentle continuous parallax/sine FLOAT on the tiles and/or a slow camera push-in (faint scale-up). Optional `[accent-color]` glow TRAVELS across/behind the tiles.
- **Scene 3 (~Xs–end) — settle / reveal / exit.** Everything settles and holds to the end, OR the optional camera modifier runs (see below), OR a `[closing line / CTA]` book-ends the array. OR the field CLEARS to payoff copy — the array exits and a concise centered `[claim / price / URL]` lands (price via a very fast character snap-build with a split-second partial state; URL via a left-to-right reveal, holding in `[accent]` and flipping to `[ink]` only in the final beat) — OR the camera PUSHES THROUGH one highlighted `[hero item]` (single rapid accelerating push-in) and crossfades into a second, vaster receding `[word-grid depth field]` that continuously scales down to reveal ever more items before fading to the payoff.

Variants (where roles diverge from the template):

- **Variant — Key_Feature grid**: items are labeled `[icon + feature-label]` tiles/pills assembling into a 2-col-brick / 3×3 grid; near-static hold with slow push-in + optional traveling-glow sweep; headline book-ends (`[hook]` → `[CTA]`). No camera reveal.
- **Variant — Key_Feature glass-card-reveal**: the assemble is CAMERA-DRIVEN, not element-stagger. Open tight on `[2–3 glowing icons]`; camera zoom-OUT grows `[N]` glass cards out from behind the icons (icons shrink ~50% to become card headers), `[center card]` scales ~105% and moves forward to overlap the sides (quick spring); cards hold side-by-side with continuous parallax float; exit = fast motion-blur SWEEP slides the cards off-frame.
- **Variant — Benefits vertical-list**: a single vertical `[benefit-line]` stack, ~1 item/sec, three sub-modes — (a) BUILD: each line stays fully lit; entry = `[marker]` spring-pop + `[check/icon]` draw-in + `[pill]` mask-wipe of the text; (b) SNAP: the whole stack steps up one slot per beat (~0.1s eased) so the newest line lands in the bright focal slot and lines leaving it dim by position; (c) STREAM: the list scrolls rapidly and continuously past the focal slot — center item opaque `[ink]` and slightly enlarged, neighbors faded/shrunk — then DECELERATES to stop on the `[chosen item]`; optionally split-framed against a fixed static `[label]` on the opposite side; the field then clears to a centered `[payoff line]`. Static camera; optional perpetual `[decorative orbit/disc]` on the opposite side. No camera reveal.
- **Variant — Key_Feature live-populate**: the assemble is a DATA-POPULATION wave, cursorless, frame locked (± one gentle opening zoom-out that makes room for the `[headline]`). Two board shapes — (a) ANCHORED: `[white data cards]` spring in one-by-one, each tethered by a thin line to its `[marker]` on a `[map/board surface]` whose markers pulse (expanding fading rings); (b) TABULAR: new `[columns]` appear as grey skeleton pills, progress fills run left→right staggered top-to-bottom (colored fill with a leading tip), each bar SWAPPING to its real `[value/avatar chip]` on completion. After assembly the array stays LIVE: `[status pills]` flip states in quick snappy swaps (color-coded, several in succession), or the `[headline]` crossfades and a second population wave runs on a newly revealed region — the table content scrolling horizontally beneath a sticky first column to expose it. Hold lands on the fully populated, fully updated final state.
- **Variant — Social_Proof logo-wall-zoom-out**: intro beat (`[trusted-by headline]` card OR a `[product screenshot]`) crossfades/cuts to a center logo grid that builds (whole-enter / randomized pop-in / column slide-up); a continuous camera zoom-OUT then shrinks the whole grid toward center to reveal a vast ecosystem and holds; optional fixed HUD/viewfinder brackets; optional exit = whole grid SLIDES UP and flies out through the top.

**motion vocabulary**: item stagger-assemble (fade + short slide/scale into slot) · brick/grid/list layout resolve · randomized pop-in · column slide-up · vertical-list step (slot-machine snap-and-hold) · spring-overshoot marker pop · check/icon draw-in · pill/label mask-wipe reveal · dim-by-position de-emphasis · line-by-line headline fill · accent-gradient number count-up · near-static hold · gentle parallax/sine float on hold · slow camera push-in · camera zoom-OUT reveal (continuous OR phased pull-back) · cards-grow-from-behind-icons · icon-shrink-to-header · center-card scale-up + forward overlap (spring) · traveling-glow sweep · fixed HUD/viewfinder brackets · motion-blur slide-out sweep (exit) · grid slide-up fly-out (exit) · book-end headline fade · perpetual decorative orbit/loop · skeleton-pill progress fill (left→right, leading tip, color transition) · fill-completes-swap-to-real-data · staggered top-to-bottom fill cascade · live status-pill state flips (color-coded, post-assembly) · tethered-card spring-in (thin line to an anchor marker) · pulsing marker rings · two-wave populate with headline crossfade · sticky-column internal horizontal scroll · rapid vertical stream past a fixed focal slot + deceleration stop · split fixed-label layout · pill-widens-as-label-fills arrival · highlighted hero chip · push-through-the-hero-item exit · receding word-grid depth field · clear-to-payoff coda · price snap-build (split-second partial state) · left-to-right URL reveal + final-beat color flip.

**rule mapping** (motion verb → `rule-id`)

- item stagger-assemble into slot → `center-outward-expansion` (per-item stagger + short-path slide variant; for a wall too dense for a true center burst, use it in its "starting partially-spread"/direct-into-slot form — see merge tension)
- brick/grid/list layout resolve → `center-outward-expansion` (target positions = final layout slots)
- randomized pop-in stagger → `gsap-effects` (stagger recipe; randomized `from`/order)
- column slide-up into grid → `gsap-effects` (per-column staggered slide-up)
- vertical-list step / slot-machine snap-and-hold → `vertical-spring-ticker` (STEPS = number of line advances)
- spring-overshoot marker pop → `spring-pop-entrance` (back.out spring) — also `gsap-effects` for the staggered pop chain
- check / icon draw-in inside marker → `svg-path-draw`
- live line-art icon in a tile (internal parts) → `svg-icon-enrichment`
- pill / label mask-wipe text reveal → `techniques.md` (clip-path reveal)
- dim-by-position de-emphasis → `gsap-effects` (per-line opacity by slot position; no dedicated rule)
- line-by-line headline fill → `discrete-text-sequence`
- accent-gradient proof number count-up → `counting-dynamic-scale`
- gentle parallax / sine float on hold → `sine-wave-loop` (apply the concurrent-elements amplitude `/√N` rule for a held grid)
- slow camera push-in → `multi-phase-camera` (steady-push phase pattern)
- center-card scale-up + forward overlap → `spring-pop-entrance` (the quick spring) + `techniques.md` CSS-3D (z-depth overlap)
- cards-grow-from-behind-icons / icon-shrink-to-header → driven by the camera reveal (`multi-phase-camera`) — the grow/shrink are scale tweens chorded to the pull-back phase; no separate rule
- fixed HUD / viewfinder brackets → `ai-tracking-box` (static-bracket variant — overlay frame, not tracking)
- book-end headline fade → `discrete-text-sequence` (or `gsap-effects` fade)
- perpetual decorative orbit / disc / loop → `sine-wave-loop` (or `orbit-3d-entry` if it's an orbiting badge ring)
- traveling-glow sweep across/behind tiles → `ambient-glow-bloom` (one-pass traveling glow sweep across the tiles)
- motion-blur slide-out sweep (glass-card exit) → `motion-blur-streak` (directional velocity blur on the fast sweep that carries the cards off-frame)
- grid slide-up fly-out exit → `gsap-effects` (plain staggered translate-off-frame; no dedicated rule needed — a basic exit tween, not a missing capability)
- skeleton-pill progress fill → `stat-bars-and-fills` (progress-fill `scaleX` form; the leading tip is a chorded child element)
- fill-completes-swap-to-real-data / live status-pill flips / headline crossfade between waves → `discrete-text-sequence` (whole-state replacement at time thresholds — the pill's states are text states)
- staggered top-to-bottom fill cascade → `gsap-effects` (per-row stagger on the fill tweens)
- tethered-card spring-in → `spring-pop-entrance` (the card) + `avatar-cloud-network` (the thin connection-line-to-anchor layout; anchor coordinates must match the marker exactly) + `svg-path-draw` if the tether draws in
- pulsing marker rings → `cursor-click-ripple` (its expanding-ring + attack-decay opacity envelope, minus the cursor/click, on a bounded repeat)
- sticky-column internal horizontal scroll → `viewport-change` (PAN form on the inner column layer; the sticky column sits outside the panned layer) — mark the moving layer `data-layout-allow-overflow` and clip at the table card
- rapid vertical stream past a focal slot + deceleration stop → `vertical-spring-ticker` (continuous form: one long decelerating translate instead of its stepped tweens; focal-slot emphasis reuses the dim-by-position mapping above)
- pill-widens-as-label-fills → `card-morph-anchor`'s substitution law (uniform `scaleX`/clip-path — never tween `width`) + `discrete-text-sequence` for the label fill
- push-through-the-hero-item exit → `multi-phase-camera` (single accelerating push phase) aimed via `coordinate-target-zoom` at the highlighted chip, crossfading at peak
- receding word-grid depth field → `viewport-change` (one `.world` wrapper, `cam.scale` ↓ continuously — the zoom-OUT reveal grammar pointed at a word field; size/opacity tiers fake the depth)
- price snap-build (split-second partial state) → `discrete-text-sequence` (non-linear typing with bulk additions — exactly its typo/partial-state mechanic)
- left-to-right URL reveal → `techniques.md` (clip-path reveal — same mapping as the pill mask-wipe); the final-beat color flip → `gsap-effects` (a `tl.set` at the beat — basic, no rule needed)

**camera modifier — zoom-OUT reveal** (optional; the role-defining move for the glass-card and logo-wall variants): a camera wrapper around the whole array scales DOWN over the hold, revealing the assembled grid/cards sitting inside a larger environment (ecosystem scale, or a row of cards unfolding from tight icons).

- Continuous single-pass zoom-out (Social_Proof ecosystem pull-back) → `viewport-change` (one wrapper, `cam.scale` ↓ via onUpdate — single source of truth)
- Phased pull-back → focus → settle, with built-in drift (Key_Feature tight-icons → cards-unfold) → `multi-phase-camera` (use the "Dramatic reveal: push → neutral → pull" / pull-back phase pattern; grow/shrink of cards chords to the pull-back phase)

---

```
BLUEPRINT: grid-card-assemble — serves Key_Feature, Benefits, Social_Proof (folded 4 drafts + 2 mined clusters: live-data-populate-board, item-field-to-payoff-card)
RULE COVERAGE: complete, no gaps — traveling-glow sweep → ambient-glow-bloom; motion-blur slide-out sweep (exit) → motion-blur-streak; grid slide-up fly-out (exit) → gsap-effects (plain translate); skeleton-fill populate → stat-bars-and-fills + discrete-text-sequence; push-through-hero exit → multi-phase-camera + coordinate-target-zoom
```

Merge tension: `center-outward-expansion` (the natural backing for stagger-assemble) caps cleanly at 3–8 items and explicitly warns 8+ causes mid-flight overlap chaos — but a Social_Proof logo wall is deliberately dense (12+ tiles), so for that variant the items must NOT burst from a shared center; they slide a short distance directly into their own slot (the rule's "starting partially-spread"/short-path form, or a `gsap-effects` per-item stagger), which the consolidated Scene-1 verb already specifies as "short distance directly into its slot."

## Selected motion rule: depth-scatter-assemble

---
name: depth-scatter-assemble
description: N elements scatter into / reassemble from a rotating 3D depth-cloud, each starting at a deterministic index-derived 3D offset and settling to a clean flat layout.
metadata:
  tags: 3d, scatter, assemble, depth, cloud, tumble, kinetic, letter, fragment, logo, reassemble
---

# Depth Scatter ↔ Assemble

N elements (glyphs, cards, logo fragments) fly in from a rotating 3D depth-cloud and lock into a flat layout — or the reverse. Each element has its OWN index-derived point in the cloud (translateZ depth + rotateX/Y tumble + x/y scatter). Distinct from `orbit-3d-entry` (flip-in then continuous orbit) and `center-outward-expansion` (flat burst from one shared center): here the resolve is a flat assembled layout.

## How It Works

Each element's flat target lives in `data-target-x/y`; its scattered state is pure trig on its index — golden-angle spread, stepped depth — so the cloud is byte-identical every render with no `Math.random`:

```js
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // ~2.39943 rad — even spread, no clumping
const a = i * GOLDEN;
const scatterX = Math.cos(a) * RADIUS;
const scatterY = Math.sin(a) * RADIUS;
const scatterZ = Z_NEAR - (i / (n - 1)) * (Z_NEAR - Z_FAR); // stepped depth
const rotX = Math.sin(a) * TUMBLE;
const rotY = Math.cos(a) * TUMBLE;
```

Elements are PARKED at their scatter points (`gsap.set`, opacity 0) before any tween, then each tweens to its flat target while the whole stage slowly rotates so the scatter has life before it locks. Requires `perspective` on the scene root and `preserve-3d` on the stage AND each element, or depth + tumble flatten to a 2D scale.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="cloud-stage">
  <div class="frag" data-target-x="-260" data-target-y="0">{glyph1}</div>
  <div class="frag" data-target-x="-130" data-target-y="0">{glyph2}</div>
  <!-- … one .frag per glyph / fragment … -->
</div>
```

```css
.scene-root {
  display: grid;
  place-items: center;
  perspective: 1400px; /* REQUIRED */
}
.cloud-stage {
  position: relative;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;
  will-change: transform;
}
.frag {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  backface-visibility: hidden; /* hides the mirrored face mid-tumble */
  will-change: transform, opacity;
}
```

```js
const frags = Array.from(document.querySelectorAll(".frag"));
const n = frags.length;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

// 1) Park every fragment in the cloud BEFORE any tween fires
const scatter = frags.map((el, i) => {
  const a = i * GOLDEN;
  const depthT = n > 1 ? i / (n - 1) : 0;
  return {
    x: Math.cos(a) * RADIUS,
    y: Math.sin(a) * RADIUS,
    z: Z_NEAR - depthT * (Z_NEAR - Z_FAR),
    rotationX: Math.sin(a) * TUMBLE,
    rotationY: Math.cos(a) * TUMBLE,
  };
});
frags.forEach((el, i) => gsap.set(el, { xPercent: -50, yPercent: -50, ...scatter[i], opacity: 0 }));

// 2) The cloud rotates so the scatter has life during assembly
tl.to(
  ".cloud-stage",
  { rotationY: CLOUD_SPIN_DEG, duration: CLOUD_SPIN_DUR, ease: "power1.out" },
  0,
);

// 3) ASSEMBLE — cloud point → flat target, index stagger = cloud collapsing inward
frags.forEach((el, i) => {
  tl.to(
    el,
    {
      x: Number(el.dataset.targetX),
      y: Number(el.dataset.targetY),
      z: 0,
      rotationX: 0,
      rotationY: 0,
      opacity: 1,
      duration: ASSEMBLE_DUR,
      ease: ASSEMBLE_EASE,
    },
    i * STAGGER,
  );
});
```

## Variations

- **Tumble-swap** (the beat-change hand-off): two glyph sets share the cloud; ONE shared 0→1 progress tween drives both in its `onUpdate` — outgoing lerps layout→cloud with `opacity: 1−p`, incoming lerps cloud→layout with `opacity: p`. Two separate tweens drift out of phase under seek and the cross stops reading as one hand-off. Inject per-glyph spans per phrase at setup (measure advance widths after `document.fonts.ready` — single-scene only).
- **Radial letter-explode → resolve**: flat-plane special case — `Z_NEAR = Z_FAR = 0`, small `TUMBLE`; reverse the assemble for the explode. Pure in-plane.
- **Scatter-OUT**: reverse assemble (layout → cloud, opacity 1→0) ONLY as the composition's final beat — mid-shot it reads as the shot ending.
- **Parallax lockup**: back layers get deeper `|Z_FAR|` + longer `ASSEMBLE_DUR`, foreground shallower/shorter — depth-speeded slide-in that locks into the logo.

## Values

| token                  | range                 | notes                                                                         |
| ---------------------- | --------------------- | ----------------------------------------------------------------------------- |
| n                      | 4–14 (fragments 4–9)  | above ~14 individual paths stop reading                                       |
| RADIUS                 | 250–700px             | keep the farthest scatter in frame or fragments pop in with no travel         |
| Z_NEAR / Z_FAR         | +150…+450 / −150…−500 | large `\|z\|` needs a wider `perspective` or fragments smear                  |
| TUMBLE                 | 40–110°               | past 90° glyphs show blank mid-tween (intended); cap ~80° for one-faced cards |
| ASSEMBLE_DUR           | 0.7–1.4s              |                                                                               |
| ASSEMBLE_EASE          | `power3.out` default  | `expo.out` snaps, `back.out(1.4)` seats with overshoot; never `in`            |
| STAGGER                | 0.03–0.09s            | `n × STAGGER < ASSEMBLE_DUR` — one collapsing motion, not a queue             |
| CLOUD_SPIN_DEG / \_DUR | 15–60° over ≥ dur     | gentle life; too fast competes with the assembly                              |
| SWAP_DUR               | 0.5–1.0s              | on the beat boundary; shorter = hard cross                                    |

## Critical Constraints

- **Every scattered value is index-derived** — `cos/sin(i × GOLDEN)` + stepped `z`. The golden angle spreads points evenly with no clumps and no `Math.random`.
- **`gsap.set` the cloud BEFORE adding tweens** — skipping it leaves frame 0 showing the assembled layout, then a teleport when the first tween starts.
- **`perspective` + `preserve-3d` on stage AND each fragment** — missing any one flattens the depth.
- **Resolve flat** — settled state is `z: 0`, rotations 0; a still-tilted resolve reads unfinished.
- **Tumble-swap: one shared progress for both glyph sets.**
- **Depth ordering is automatic** inside `preserve-3d` (paint order follows actual Z) — no manual z-index, unlike the orbit case's capped band.

## See also

`orbit-3d-entry` (settles into a continuous orbit instead) · `hacker-flip-3d` (glyphs decode on arrival) · `3d-text-depth-layers` (extrude the locked wordmark) · `center-outward-expansion` (flat 2D cousin) · `sine-wave-loop` (idle breathe on the resolved layout).

## Selected motion rule: svg-path-draw

---
name: svg-path-draw
description: Animate SVG paths drawing progressively using stroke-dasharray and stroke-dashoffset.
metadata:
  tags: svg, stroke, draw, path, reveal, icon, vector
---

# SVG Path Draw

Reveals an SVG shape by animating its stroke as if a pen were tracing it. Two stroke properties together: **`stroke-dasharray = <pathLength>`** makes the entire path one dash; **`stroke-dashoffset`** starts at the path length (dash shifted fully out of view → invisible) and tweens to `0` (fully drawn). The length comes from the DOM API `path.getTotalLength()` — measured, never guessed.

Works on anything with a stroke: `<path>`, `<circle>`, `<rect>`, `<line>`, `<polyline>`, `<polygon>`, `<ellipse>`.

## Recipe

```html
<!-- inside a standard scene clip -->
<svg class="logo-mark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path id="bar-left" d="M 60 40 L 60 160" />
  <path id="bar-right" d="M 140 40 L 140 160" />
  <path id="bar-mid" d="M 60 100 L 140 100" />
</svg>
```

```css
.logo-mark path {
  fill: none; /* outline-only draw — a fill would appear immediately and ruin the reveal */
  stroke: {accentColor};
  stroke-width: 12;
  stroke-linecap: round; /* softer endpoints */
  stroke-linejoin: round;
}
```

```js
// Setup: measure each path and set its dash pattern. Real measured geometry, not a magic number.
document.querySelectorAll(".logo-mark path").forEach((p) => {
  const len = p.getTotalLength();
  p.style.strokeDasharray = `${len}`;
  p.style.strokeDashoffset = `${len}`;
});

// Stagger draws so the eye reads continuous motion — each segment starts at
// ~70-80% of the previous segment's duration, before it finishes.
tl.to(
  "#bar-left",
  { strokeDashoffset: 0, duration: SEGMENT_DRAW_DUR, ease: "power2.out" },
  SEG_1_START,
);
tl.to(
  "#bar-right",
  { strokeDashoffset: 0, duration: SEGMENT_DRAW_DUR, ease: "power2.out" },
  SEG_2_START,
);
tl.to(
  "#bar-mid",
  { strokeDashoffset: 0, duration: FINAL_SEGMENT_DUR, ease: "power2.out" },
  SEG_3_START,
);

// Companion wordmark fades in only after the last stroke settles.
tl.to(
  ".brand-line",
  { opacity: 1, duration: BRAND_FADE_DUR, ease: "power1.out" },
  BRAND_FADE_START,
);
```

## Variations

- **Ring starting at 12 o'clock** — `<circle>` / `<rect>` strokes start at 3 o'clock by default; rotate the element `-90deg` so a progress ring draws from the top:

```html
<circle
  cx="100"
  cy="100"
  r="60"
  id="ring"
  style="transform-origin: 100px 100px; transform: rotate(-90deg)"
/>
```

- **Linear (constant-speed) draw** — `ease: "none"` for a steady-rate "real pen" trace.
- **Draw then fill** — for filled shapes, tween `fillOpacity: 0 → 1` AFTER the stroke completes (requires `fill-opacity: 0` initially and a real `fill` in CSS):

```js
tl.to(
  "#path",
  { strokeDashoffset: 0, duration: SEGMENT_DRAW_DUR, ease: "power2.out" },
  SEG_1_START,
);
tl.to(
  "#path",
  { fillOpacity: 1, duration: FILL_FADE_DUR, ease: "power1.out" },
  SEG_1_START + SEGMENT_DRAW_DUR,
);
```

## Values

| token             | range                                   | notes                                                                                              |
| ----------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| SEGMENT_DRAW_DUR  | 0.3–0.8s                                | fast snap vs deliberate pen trace; >~1s feels sluggish for a logo reveal                           |
| FINAL_SEGMENT_DUR | 60–80% of SEGMENT_DRAW_DUR              | proportional to segment length — a short connector at full duration reads slower than its siblings |
| SEG_N_START       | previous start + 70–80% of its duration | reads as continuous motion, not N isolated animations                                              |
| SEG_1_START       | 0–0.4s                                  | a small ~0.2s lead-in lets the viewer settle before motion                                         |
| BRAND_FADE_START  | ≥ last stroke end (+ ~0.2s beat)        | earlier and the wordmark competes with the draw                                                    |
| BRAND_FADE_DUR    | 0.3–0.8s                                | snap (urgent) vs glide (premium)                                                                   |

Ease families are discrete choices: **stroke draws** use `power2.out` (a hand lifting at end of stroke) or `none` for constant speed — never `back.out` / `elastic.out` (pens don't bounce). **Fades** use `power1.out`.

## Critical Constraints

- **`fill: none`** for outline-only draws — otherwise the fill appears immediately.
- **Dasharray/dashoffset = the measured `getTotalLength()`**, set at setup; requires the SVG in the DOM (inline SVG is fine; a loaded `<image>` SVG is not).
- **Complex paths**: if `getTotalLength()` looks wrong, overestimate slightly (`len * 1.05`) — too large is invisible at animation start; too small clips the end.
- **Stagger multi-path draws at ~70–80%** of the previous segment's duration.
- **A drawn line must land on something.** When the path is a connector (rail, beam, underline, callout) rather than a shape, both endpoints must sit on real elements and the draw must do a job — reveal, route, validate, or emphasize. A stroke that only decorates empty space reads as filler; attach it or cut it.

## See also

`svg-icon-enrichment` (internal parts animate after the outline draws) · `counting-dynamic-scale` (stroke draws an icon while a number counts up) · `hacker-flip-3d` (logo draws, wordmark decodes beneath).

## Selected motion rule: multi-phase-camera

---
name: multi-phase-camera
description: Sequential camera zoom with 2-3 distinct phases (pull-back / focus / push) plus continuous micro-drift for organic cinematic feel.
metadata:
  tags: camera, zoom, phase, drift, scale, cinematic
---

# Multi-Phase Camera

A camera wrapper around the ENTIRE scene that progresses through discrete zoom phases at scripted triggers, with continuous sine-driven micro-drift overlaid so the camera never feels static between phases. Distinct from a single linear zoom — multi-phase creates cinematic pacing (anticipation → reveal → settle).

## How It Works

The camera is one wrapping `<div>` whose `transform: scale() translate(x, y)` is composed from two channels inside a single `onUpdate` writer:

1. **Phase scale** — a proxy object `{ scale }` stepped through phases at trigger times (`PHASE_1_SCALE` at t=0 → `PHASE_2_SCALE` at `PHASE_2_AT` → `PHASE_3_SCALE` at `PHASE_3_AT`).
2. **Drift offset** — a continuous sine-based `translateX` / `translateY` (small amplitude, slow frequency) ADDED to the phase transform. X and Y run at slightly different frequencies (`DRIFT_FREQ_RATIO ≈ 1.3`) — equal frequencies produce a perfect diagonal that reads mechanical; ~1.3 gives an organic Lissajous.

## Recipe

```html
<div class="camera" id="camera">
  <div class="content">
    <div class="hero">{Brand}</div>
    <div class="tagline">{tagline}</div>
    <div class="cta">{ctaText}</div>
  </div>
</div>
```

```css
.scene {
  overflow: hidden; /* REQUIRED — any phase scale < 1 exposes the content's edges */
  background: {sceneBgColor}; /* background on .scene, NOT .camera — a camera-borne
     background warps/translates with the transform and reveals the outer void */
}
.camera {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transform-origin: 50% 50%; /* off-center origin creates phase-to-phase drift */
  will-change: transform;
}
```

```js
const camera = document.getElementById("camera");

// Three-phase scale plan: pullback → focus → push.
const phase = { scale: PHASE_1_SCALE }; // Phase 1 is the initial value — no tween

// Phase 2 — settle to neutral focus
tl.to(phase, { scale: PHASE_2_SCALE, duration: PHASE_2_DUR, ease: PHASE_2_EASE }, PHASE_2_AT);

// Phase 3 — slow push-in for the climax
tl.to(phase, { scale: PHASE_3_SCALE, duration: PHASE_3_DUR, ease: PHASE_3_EASE }, PHASE_3_AT);

// Drift driver — continuous sine motion overlaid on the phase scale.
// The ONE writer of camera.style.transform.
const drift = { p: 0 };
tl.to(
  drift,
  {
    p: Math.PI * 2 * DRIFT_CYCLES,
    duration: TOTAL_DURATION, // spans the whole composition
    ease: "none",
    onUpdate: () => {
      const dx = Math.sin(drift.p) * DRIFT_AMP_X;
      const dy = Math.sin(drift.p * DRIFT_FREQ_RATIO) * DRIFT_AMP_Y;
      camera.style.transform = `scale(${phase.scale}) translate(${dx}px, ${dy}px)`;
    },
  },
  0,
);

// Content reveals happen INSIDE the camera frame (hero/tagline/cta beats).
```

## Phase Patterns

| Pattern             | Scale sequence (1 → 2 → 3)        | Feel                            | When to use                   |
| ------------------- | --------------------------------- | ------------------------------- | ----------------------------- |
| **Focus-in**        | back → neutral → slight push      | Approach → settle → slight push | Default product reveal        |
| **Dramatic reveal** | push → neutral → pull             | Wide → focus → settle back      | Hero shot with breathing room |
| **Steady push**     | neutral → slight push → more push | Gradual forward momentum        | Continuous narrative push     |
| **Bookend pull**    | neutral → strong push → neutral   | Settle → push → release         | CTA emphasis then release     |

## Variations

- **Phase trigger by content beat**: align a camera tween's start with a content tween's end (entry completes → push begins) rather than a fixed clock value.
- **Camera shake (panic / impact)**: a brief higher-amplitude, higher-frequency drift tween over a short window — same `drift` mechanism with `SHAKE_AMP` / `SHAKE_CYCLES` / `SHAKE_DUR` at `SHAKE_AT`.
- **Targeted zoom into an off-center element**: combine scale with counter-translation so the target lands at viewport center — divide the measured offset by the current scale before feeding it into the writer:

```js
const tRect = document.querySelector(".cta").getBoundingClientRect();
const offsetX = (STAGE_W / 2 - (tRect.left + tRect.width / 2)) / phase.scale;
const offsetY = (STAGE_H / 2 - (tRect.top + tRect.height / 2)) / phase.scale;
// then in onUpdate: translate(offsetX + dx, offsetY + dy)
```

(Full counter-translate doctrine: [coordinate-target-zoom.md](coordinate-target-zoom.md).)

## Values

| token                       | range                                    | notes                                                                               |
| --------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| PHASE_1 / 2 / 3_SCALE       | 0.88–0.96 / 0.98–1.02 / 1.04–1.15        | tighter spread = subtler camera; scale < 1 REQUIRES `overflow: hidden` on `.scene`  |
| PHASE_2_AT / PHASE_2_DUR    | 0.3–1.0s / 1.0–1.8s                      | longer DUR = slower settle, more cinematic                                          |
| PHASE_3_AT / PHASE_3_DUR    | 2.0–4.0s / 1.0–2.0s                      | PHASE_3_AT ≥ PHASE_2_AT + PHASE_2_DUR or focus is preempted                         |
| PHASE_2_EASE / PHASE_3_EASE | `power2.out` `power3.out` `power2.inOut` | spring/back easing on a camera feels uncomfortable; each later phase settles deeper |
| TOTAL_DURATION              | = `data-duration`                        | the drift tween must span the whole composition                                     |
| DRIFT_CYCLES                | 1–3                                      | 1 = one slow breath; high values read as mechanical wobble                          |
| DRIFT_AMP_X / DRIFT_AMP_Y   | 2–8 px / 1–4 px                          | imperceptible per-frame, visible over time — if it reads as a shake, it's too much  |
| DRIFT_FREQ_RATIO            | 1.2–1.5                                  | 1.0 = perfect diagonal (mechanical); ~1.3 = organic Lissajous                       |
| HERO_AT (etc.)              | after Phase-2 settle lands               | a hero fading in mid-pull-back feels like it's flying away                          |

## Critical Constraints

- **Camera wraps EVERYTHING in the scene** — a per-element camera creates parallax bugs and breaks the "one viewpoint" read.
- **One writer**: phase scale and drift compose inside the single drift `onUpdate`; nothing else touches `camera.style.transform`.
- **`overflow: hidden` on `.scene`** — required whenever any phase scale < 1.
- **`transform-origin: 50% 50%` on `.camera`** — off-center origin creates unpredictable phase-to-phase drift.
- **Scene background on `.scene`, not `.camera`** — otherwise scaling/translating reveals the outer void.
- **Hero reveal starts AFTER the initial pull-back ease lands** — otherwise the headline feels like it's flying away.

## See also

[coordinate-target-zoom.md](coordinate-target-zoom.md) (counter-translate math for the targeted variation) · [orbit-3d-entry.md](orbit-3d-entry.md) (orbit inside a drifting camera) · [counting-dynamic-scale.md](counting-dynamic-scale.md) (climax push synced to counter peak) · [3d-text-depth-layers.md](3d-text-depth-layers.md) (depth-stacked hero under camera moves) · [sine-wave-loop.md](sine-wave-loop.md) (element idle inside the camera).
