# Frame packet: 11-probable-cause

## Project inputs

- Project: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
- Design tokens: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch/frame.md
- RULES_DIR: /Users/swami/.cursor/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 11 — Probable root cause

- scene: Probable Root Cause card lifts forward; RCA report flashes full frame (1 s, scrolling); corner timer stops ear
- duration: 4.735s
- transition_in: cut
- status: outline
- voiceover: "Your team starts from a probable root cause, and MTTR comes down."
- src: compositions/frames/11-probable-cause.html
- blueprint: zoom-out-workspace-reveal (Adapt)
- rules: card-morph-anchor, 3d-page-scroll, chart-scrub-readout

Probable Root Cause card lifts forward; RCA report flashes full frame (1 s, scrolling); corner timer stops early; MTTR chip drops.

Components: compositions/components/04-root-cause
Generated video: none (assets/el-video/<id>.mp4, head-trimmed)
Cues (local seconds): Probable cause, with the evidence @ 1.495s
Hits (local seconds): none
SFX: whoosh-short, clock-tick
Counter: none

## Selected blueprint: zoom-out-workspace-reveal

# zoom-out-workspace-reveal — Zoom-Out Workspace Reveal

**intent**: Open TIGHT on one full-bleed detail — a graphic macro or a small UI region — let micro-action play in close-up, then ONE continuous decelerating zoom-out reveals that everything seen so far lives inside a containing whole (a design-tool workspace / a multi-pane agent workspace); the frame locks at the wide and element-level payoff carries on. The zoom-out IS the narrative engine and the reveal-of-nesting is the payoff — distinct from `grid-card-assemble`, where a zoom-OUT is an optional camera modifier garnishing an element-stagger assemble; here nothing assembles, the world was whole all along, and the single outward move is what re-scopes its meaning. The structural inverse of every existing push-in shape (`constellation-hub`'s push-in, `device-surface-showcase`'s continuous push, `dataviz-countup`'s push-through).

**roles served**

- Hook (from `continuous-zoomout-nesting-reveal`): when the open should be a full-bleed graphic mystery — a blob morphing, a macro blossom blooming — resolved by one unbroken exponentially-decelerating zoom-out that passes THROUGH an intermediate composition (oversized headline / card artwork / web page) before revealing the whole thing is an artboard inside a design tool (panels, layers, inspector, timeline); the frame locks and the canvas keeps animating, ending mid-action.
- Benefits (from `close-up-open-single-zoom-out-reveal`): when the payoff is scale/breadth — micro-actions play in extreme close-up on one small UI region (file rows popping in, a highlight stepping, a guided glide down a list), then ONE fast smoothly-decelerating zoom-out (~0.5–1s) reveals the region was a corner of a huge multi-pane agent workspace (chat + artifact preview + sidebar); the wide holds static to the end while element-level payoff completes the story ("look how much the agent did — and here's the deliverable").

**duration**: 6.8–11s (Hook continuous-pull both 6.8s; Benefits dwell-then-snap 10.7–11s — the dwell and the post-lock payoff stretch, the reveal itself does not)

**HARD RULE — no zoom-in anywhere; camera static outside the single reveal.** Carried verbatim from both Benefits goldens and structurally true of both Hook goldens: the camera's only scale motion is OUTWARD. One zoom-out per shot. Before the reveal the camera either holds, glides/pans along the close-up surface, or is already running the (only) pull-back; after the reveal decelerates to a full stop the frame is LOCKED — every later change (pane swap, pane expansion, cursor travel, playhead scrub, canvas animation) is element/layout motion, never camera. No push-in, no punch, no re-zoom, no second reveal. Violating this collapses the shape back into a generic camera tour.

**shot structure** (one oversized static world — the full `[whole: workspace]` authored at final layout from frame 0 — with the camera starting scaled far in on the `[detail]`; the reveal is one scale animation on the world; two folded sub-shapes — **(A) continuous nesting pull** (Hook) and **(B) close-up dwell → snap reveal** (Benefits))

- **Scene 1 (0.0–~2.5s) — full-bleed detail + micro-action.** Extreme close-up: the `[detail: graphic macro — blob / blossom stem / small UI region — file list / browser corner]` fills the frame edge-to-edge with NO containing chrome, canvas, or neighboring panes visible. The detail PERFORMS in close-up — this beat is never a static hold:
  - _Variant — Hook (A)_: the graphic itself moves/morphs/blooms — an organic `[accent]` blob flows across and morphs into an undulating wavy line, or blurred macro forms sharpen as circular petals pop and expand outward into a flat vector `[motif]` — while the pull-back is ALREADY running underneath (the camera never waits).
  - _Variant — Benefits (B)_: camera holds (or glides) while UI micro-action plays — `[rows: filenames / list items]` pop in top-to-bottom, a soft `[highlight]` steps down row-by-row, or the camera rides down a list while gently pulling back. Optional blur-to-sharp resolve on the opening frame.

- **Scene 2 (~2.5s–reveal start) — the middle beat.** Diverges by sub-shape:
  - _Variant — Hook (A) — intermediate nesting level_: the continuing zoom-out resolves a mid-level composition, still full-bleed, still no chrome — oversized `[headline]` glyphs descend into frame as partial letterforms and settle centered (the "descent" is pure world-scale: the letters are static in world space, the camera pull produces the motion), or the `[motif]` is revealed living inside a `[card]` in a row of cards on a `[web page]`. The viewer re-scopes once — and still doesn't know the real container.
  - _Variant — Benefits (B) — close-up beat advances_: the close-up story develops at the same tightness — the view shifts to an adjacent `[panel]`, a new `[row]` fades/slides in and grows its panel, a `[cursor]` enters and hovers it with a soft highlight. This is the pre-reveal dwell; tension is "we're deep inside something."

- **Scene 3 (the reveal) — ONE decelerating zoom-out completes; frame LOCKS.** The signature move. The camera pulls back to scale 1 and eases to a full stop, revealing the containing `[whole]`:
  - _Variant — Hook (A)_: the pull is the tail of the SAME continuous zoom running since frame 0 (total travel ~4.3–4.5s of a 6.8s shot), with strong exponential deceleration — the `[intermediate composition]` turns out to be `[an artboard / a phone-screen mock]` on a `[design-tool canvas]`: light chrome, left pages/layers panel, right properties inspector, blue selection box, bottom animation timeline with keyframe bars.
  - _Variant — Benefits (B)_: the pull is a discrete rapid burst (~0.5–1s) from the held close-up — smooth, heavily decelerating — landing the full `[multi-pane agent workspace]`: left `[chat pane]` with the prompt + status + response, center/right `[artifact pane: spreadsheet / deck preview]`, optional `[sidebar: progress checklist + artifacts + context]`.
  - Both: the zoom-out ends BEFORE the shot does — always leave a post-lock act. The deceleration-to-stop is what makes the lock legible.

- **Scene 4 (lock–end) — element-level payoff on the locked wide.** The reveal is not the ending; the close-up's world keeps living inside the wide. All motion is element/layout:
  - _Variant — Hook (A)_: a `[cursor]` enters from off-frame and glides to hover/click the selected element, or a `[playhead]` scrubs left-to-right across the bottom timeline while the canvas artwork animates in sync (petals rotate about their hub, a starburst spins in place, a motif sweeps/shifts). Ends MID-ACTION — the tool is alive.
  - _Variant — Benefits (B)_: a `[file-attachment card]` fades in → the cursor clicks `[Open]` → the artifact pane swaps content via a quick white-out → the viewer pane expands full-width over its neighbor (LAYOUT motion, not camera) landing on the `[deliverable: full slide / dashboard]`; or the frame simply holds long and static while the cursor drifts to rest near the `[payoff stat]`. Struck-through checklist items in the sidebar read as completed work. Long hold to the end.

**motion vocabulary**: one continuous scale-driven zoom-out with exponential/eased deceleration (no cuts) · single fast decelerating zoom-out burst (~0.5–1s) · workspace-lock at zoom end · full-bleed no-chrome opening · blur-to-sharp macro focus resolve · organic blob flow + morph into undulating wavy line · squiggle-underline settle with residual undulation · circular petals popping/expanding outward (bloom) · oversized letters descending into frame as partial glyphs (world-scale, not element motion) · text scaling down through the frame to a centered settle · rows pop in top-to-bottom · selection highlight steps down row-by-row · camera rides/pans down a list while pulling back · new row fades/slides in and grows its panel · cursor hover with soft row highlight · cursor entering from off-frame and gliding to hover/click · timeline playhead scrub left-to-right · in-canvas rotation about a hub / spin-in-place · motif shift/sweep-in · file-attachment card fade-in · cursor click · pane content swap via quick white-out · pane expands full-width over neighbor (layout motion) · checklist items shown struck-through · long static hold · cursor drift to rest · ends mid-action (Hook).

**rule mapping** (motion verb → `rule-id`)

- the single decelerating zoom-out on the whole world → `viewport-change` (one `.world` wrapper; `cam` object as single source of truth via `onUpdate`; start `cam.scale` at the reveal ratio with `T = -offset × S` centering the detail, tween scale → 1 and translate → 0 with ONE shared ease — the detail drifts from frame-center to its home slot as the wide takes over, exactly the golden read)
- off-center detail framed at open, zoom-out to wide → `coordinate-target-zoom` ("Zoom out (target → wide view)" variation — nested wrappers, reverse phases: start zoomed on the measured target, tween outer scale → 1 + inner translate → 0 with shared duration/ease; measure the detail's center after `fonts.ready`, never hand-derive)
- pre-reveal glide/ride down a list while gently pulling back (Benefits B) → `viewport-change` (pan + scale composed on the one `cam` object) — sequencing the slow-glide → hold → fast-pull profile → `multi-phase-camera` (phase machinery; this shape runs the same scale-agnostic math at 4–12× outward — see `viewport-change`'s scale-guide range note)
- exponential deceleration-to-stop → ease selection (`expo.out` / `power4.out` on the reveal tween) — parameter guidance, no rule needed; after the stop, NO camera tweens exist on the timeline (hard rule above)
- blur-to-sharp macro resolve chorded to the early pull → `depth-of-field-blur` (refocus/settle variation: `--dof` ramps to 0 as the zoom recedes, same timeline position as the pull)
- oversized partial glyphs descending / text scaling down through the frame → no element tween — authored static in world space; `viewport-change`'s pull produces the motion (author trap: animating the letters separately double-moves them)
- organic blob flow + morph into wavy line → SVG path morph — see `hyperframes-keyframes` (morph); flagged special, like `device-surface-showcase`'s WebGL specials — substitute a non-morph accent when the capability isn't loaded
- squiggle-underline residual undulation → `sine-wave-loop` (finite bounded undulation)
- circular petals pop/expand outward (bloom) → `spring-pop-entrance` (staggered pops) + `center-outward-expansion` (petals expand from the hub to final positions)
- rows pop in top-to-bottom → `spring-pop-entrance` (staggered group, ≤500ms stagger cap) or `gsap-effects` (low-drama fade + short slide stagger)
- selection highlight steps down row-by-row → `gsap-effects` (stepped `tl.set` repositions at time thresholds — instant steps, no glide; trivial, no dedicated rule needed)
- new row fades/slides in → `spring-pop-entrance` (soft variant); its panel growing to fit → `anchored-layout-expand` (one-axis layout expansion)
- cursor enters off-frame → glides → hovers → clicks → `cursor-click-ripple` (move-to-target, co-depress, ripple); soft hover row-highlight → `gsap-effects` (background-color/opacity tween)
- timeline playhead scrub left-to-right → `gsap-effects` (linear `ease:"none"` translateX); in-sync canvas animation = place the artwork tweens at the same timeline position as the scrub (sync is free on one paused timeline)
- in-canvas rotation about a hub / spin-in-place (petal flower, starburst) → `svg-icon-enrichment` (SVG `setAttribute('transform','rotate(deg cx cy)')` for explicit centers)
- motif shift/sweep-in on a card → `gsap-effects` (masked translate) or `techniques.md` clip-path reveal
- file-attachment card fade-in → `spring-pop-entrance` (soft) / `gsap-effects` fade
- pane content swap via quick white-out → `discrete-text-sequence` (whole-state swap at a threshold) + `gsap-effects` (white flash overlay with attack-decay opacity envelope)
- pane expands full-width over neighbor (layout motion) → `anchored-layout-expand` (one-axis layout hand-off; width/height tweens stay forbidden)
- checklist items struck-through / status states → static content, or `discrete-text-sequence` if they check off on screen
- long static hold + cursor drift to rest → hold needs no rule; the drift is a single slow `gsap-effects` translate that ARRIVES somewhere meaningful (rests near the payoff stat) — it performs, it is not idle wobble
- ends mid-action (Hook) → the playhead/canvas tweens simply run to the composition edge — no exit move, no rule

**camera law — staging the one move** (the camera is the engine here, not a modifier)

- Build the ENTIRE `[whole]` workspace at final layout inside one `.world` wrapper; there is no second set. The open is `cam.scale = S0` (typically 4–12× — whatever makes the `[detail]` full-bleed) with counter-translate centering the detail; the reveal tweens to `scale 1, translate 0`. `overflow: hidden` on the scene; background on the scene, never the world.
- Crispness constraint: everything visible at open must survive S0 magnification — author the detail as DOM/vector (text, SVG, CSS shapes); any raster inside the close-up needs `sourceResolution ≥ rendered × S0`.
- Sub-shape A: the reveal tween spans ~0–4.5s with `expo.out`-class deceleration — one tween, no phases, no cuts; element beats (morph, bloom, glyph settle) are positioned along it.
- Sub-shape B: optional gentle pre-reveal pan/pull (`viewport-change` pan, or a slow scale ease-out ≤ ~15% travel) during the dwell, then the reveal burst (~0.5–1s, heavy decel) as its own tween; camera fully static after.
- Never: a zoom-in, a second zoom-out, camera motion after the lock, or replacing the reveal with a cut. One outward move is the whole grammar.

**boundary vs `grid-card-assemble`**: it already carries an optional zoom-OUT reveal modifier (glass-card / logo-wall variants), so the two shapes border each other. The test: if elements ASSEMBLE and the pull-back merely shows the assembled array in context, it's `grid-card-assemble`; if the world is whole from frame 0 and the single decelerating pull-back is itself the story — close-up mystery → nesting reveal → locked-frame payoff — it's this blueprint. Related evidence: a mined profile-page golden runs the same single UI zoom-out/scroll-up reveal at small scale inside a kinetic-type shot, corroborating the move's currency without sharing the shape.

## Selected motion rule: card-morph-anchor

---
name: card-morph-anchor
description: Container morphs dimensions and border-radius between shots, serving as a visual transition anchor.
metadata:
  tags: morph, anchor, transition, border-radius, container, shape
---

# Card Morph Anchor

A free-floating container morphs apparent size, corner radius, and surface treatment between two shots — the morph itself IS the transition; the viewer's eye tracks the persistent container. Distinct from [anchored-layout-expand.md](anchored-layout-expand.md) (an edge-pinned live layout participant that grows along one axis and reflows neighbors — here nothing is pushed) and [theme-crossfade-morph.md](theme-crossfade-morph.md) (a whole-theme reskin under a fixed anchor — here a single container changes shape).

## How It Works

Since `width`/`height` tweens are forbidden, **substitute uniform `scale` for apparent size**; the remaining morph channels are **paint-only**: `borderRadius`, `background`, `boxShadow`. All channels ride ONE tween (one ease, one duration) so the shape morphs in lockstep. Content choreography: old content fades out during the first ~40% of the morph, new content fades in during the last ~40% — the shape-only gap between is the natural "blink." Optionally the morph card itself fades at the very end, revealing the real next-shot element rendered behind it.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<!-- DOM order = stacking: the anchor renders BEFORE the card, so the card is on top -->
<div class="next-shot-anchor"><img src="{nextShotAnchor}" alt="anchor" /></div>
<div class="morph-card">
  <div class="content-old">{shotOneContent}</div>
  <div class="content-new">{shotTwoContent}</div>
</div>
```

```css
.morph-card {
  width: SHOT_ONE_W;
  height: SHOT_ONE_H; /* shot-1 geometry; the morph is scale, never width/height */
  border-radius: SHOT_ONE_RADIUS;
  background: {surfaceShotOne};
  overflow: hidden; /* content must clip during the shape change */
  display: grid;
  place-items: center;
  will-change: transform;
}
.content-old,
.content-new {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.content-new {
  opacity: 0; /* author its inner sizes at apparent-size ÷ END_SCALE — it scales with the card */
}
.next-shot-anchor {
  position: absolute;
  opacity: 0; /* fades in as the morph card fades out */
}
```

```js
const END_SCALE = SHOT_TWO_W / SHOT_ONE_W; // uniform — keep the two shots aspect-matched

// Hold shot 1 for HOLD_BEAT first — an instant morph reads as glitchy.

// One tween, all channels: uniform scale + paint-only properties.
tl.to(
  ".morph-card",
  {
    scale: END_SCALE,
    borderRadius: SHOT_TWO_RADIUS / END_SCALE, // borderRadius is pre-scale — divide to land the APPARENT radius
    background: "{surfaceShotTwo}",
    boxShadow: "{shadowShotTwo}",
    duration: MORPH_DUR,
    ease: "power2.inOut",
  },
  MORPH_START,
);

tl.to(
  ".content-old",
  { opacity: 0, duration: MORPH_DUR * OLD_FADE_FRAC, ease: "power1.in" },
  MORPH_START,
);
tl.to(
  ".content-new",
  { opacity: 1, duration: MORPH_DUR * NEW_FADE_FRAC, ease: "power1.out" },
  MORPH_START + MORPH_DUR * (1 - NEW_FADE_FRAC),
);

// Optional handoff — card fades out over the pixel-identical real anchor.
tl.to(
  ".morph-card",
  { opacity: 0, duration: MORPH_DUR * FINAL_FADE_FRAC, ease: "power1.in", immediateRender: false },
  MORPH_START + MORPH_DUR * (1 - FINAL_FADE_FRAC),
);
tl.to(
  ".next-shot-anchor",
  { opacity: 1, duration: MORPH_DUR * FINAL_FADE_FRAC, ease: "power1.out" },
  MORPH_START + MORPH_DUR * (1 - FINAL_FADE_FRAC),
);
```

## Morph channels

| channel        | how                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------- |
| apparent size  | uniform `scale` — the substitution for the forbidden `width`/`height` tween; aspect preserved  |
| `borderRadius` | paint-only; pre-scale units — tween to `APPARENT_RADIUS / END_SCALE`, ≤ half the smaller side  |
| `background`   | paint-only; gradients interpolate only with equal stop counts (solid→solid: `backgroundColor`) |
| `boxShadow`    | paint-only; base shadow → accent glow shifts emphasis                                          |

## Variations

- **Landing on a non-centered target** (dock icon, sidebar slot): add `x`/`y` to the same tween, computed as the FLIP-style delta between the card's and the target's rects — `getBoundingClientRect()` both at build time (single-scene only, per the contract) and tween the difference. Don't hand-compute from CSS values: paddings, borders, and parent transforms compound, and center-vs-edge arithmetic is the classic off-by-half bug.
- **Aspect change between shots**: uniform scale preserves aspect — morph to the nearest uniform fit and let the crossfade/handoff absorb the small delta, or drop the handoff and hold the card's final state.

## Values

| token             | range                     | notes                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| HOLD_BEAT         | 0.6–1.5s                  | ≥ shot 1's entry settle; the viewer must register shot 1 first                       |
| MORPH_DUR         | 0.6–1.2s                  | < 0.5s can't fit both content fades                                                  |
| END_SCALE         | SHOT_TWO_W / SHOT_ONE_W   | icon-sized handoffs typically land at 80–400px apparent width                        |
| SHOT_TWO_RADIUS   | ≤ min(W, H)/2 apparent    | half the smaller side = perfect circle; beyond is clamped                            |
| OLD/NEW_FADE_FRAC | 0.3–0.5 each, sum ≤ 1     | the gap between is the shape-only "blink"                                            |
| FINAL_FADE_FRAC   | 0 (no handoff) or 0.1–0.2 | only when a pixel-identical anchor exists                                            |
| ease              | `power2.inOut` canonical  | `power3`/`expo.inOut` OK; never `back`/`elastic` — overshoot fights the shape change |

## Critical Constraints

- **❗ Uniform-scale substitution** — never tween `width`/`height`; `scale` + the paint-only channels (`borderRadius`, `background`, `boxShadow`) are the ONLY morph properties.
- **❗ Handoff anchor must be pixel-identical to the card's final state** — same apparent size, radius, background, shadow, inner icon dimensions. Any delta = a visible pop during the crossfade. Can't match exactly? Drop the handoff and hold the morph card.
- **❗ Stacking by DOM order, never a z-index snap mid-fade** — render the anchor before the card; a `tl.set({ zIndex })` during an active opacity tween flips stacking before the fade finishes and flickers.
- **`overflow: hidden`** on the card — content must clip as the radius changes.
- **Hold a beat before morphing**; same ease family for shape and crossfade (mixed eases read unsynchronized).

## See also

`anchored-layout-expand` (edge-pinned one-axis growth with reflow) · `theme-crossfade-morph` (whole-theme reskin under a fixed anchor) · `scale-swap-transition` (content swap without shape change) · `sine-wave-loop` (a breath on the final state).

## Selected motion rule: 3d-page-scroll

---
name: 3d-page-scroll
description: Full webpage rendered as tilted 3D card that scrolls to reveal specific sections.
metadata:
  tags: 3d, page, scroll, webpage, tilt, product-demo, perspective
---

# 3D Page Scroll

A webpage (or long content) presented as a tilted 3D card. Spring-eased scroll reveals specific sections while the static 3D perspective adds physical depth. (For a camera that actually travels/tilts, see [3d-camera-flight.md](3d-camera-flight.md) — this rule's tilt never moves.)

## How It Works

Two independent transforms combine:

1. **3D tilt** — static `rotateY` + `rotateX` with `perspective` on the card. The angle does **not** change during the scene.
2. **Scroll** — the content inside the card translates vertically (`y` in GSAP) within a clipped container; spring-like deceleration via `power3.out` / `power4.out`.

Optional: **spotlight overlay** — a radial-gradient mask dims everything except a focal region after the scroll lands. It sits above the scrolling content, fixed relative to the card, never inside `.page-content`.

## Recipe

```html
<div class="tilt-card">
  <div class="page-content">
    <!-- Full {Brand} webpage recreation, taller than the card so scrolling
         matters. Each section is REAL DOM, not a screenshot — screenshots
         can't be individually highlighted or scrolled-to with precision. -->
    <section class="page-hero">{heroContents}</section>
    <section class="page-features">{featuresContents}</section>
    <section class="page-target" id="target-section">{targetContents}</section>
    <section class="page-cta">{ctaContents}</section>
  </div>
  <div class="spotlight"></div>
</div>
```

```css
.tilt-card {
  position: absolute;
  left: 50%;
  top: 50%;
  /* tilt + perspective in CSS only if no other transform tween touches this
     element — if GSAP also tweens scale on .tilt-card, set the tilt via
     gsap.set() instead to avoid matrix overwrites */
  transform: translate(-50%, -50%) perspective({perspectivePx}) rotateY({tiltYDeg}) rotateX({tiltXDeg});
  transform-style: preserve-3d;
  width: {cardWidth};
  height: {cardHeight};
  border-radius: 24px;
  background: {cardBackgroundColor};
  overflow: hidden; /* clip the scrolling content at the rounded corners */
  /* shadow X-offset sign must match tiltY sign (negative tiltY ⇒ positive X) */
  box-shadow: 40px 30px 80px rgba(0, 0, 0, 0.45);
}
.page-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height intrinsic from sections — taller than the card */
}
.spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(ellipse 60% 35% at 50% 50%, transparent 50%, {spotlightDimColor} 100%);
}
```

```js
// SCROLL_DISTANCE is measured at design time from the real page layout
// (top of .page-content origin to vertical center of #target-section,
// accounting for card height) — NOT a free tunable.
tl.to(
  ".page-content",
  { y: -SCROLL_DISTANCE, duration: SCROLL_DUR, ease: "power3.out" },
  SCROLL_AT,
);

// Spotlight fades in on the target after the scroll settles.
tl.to(
  ".spotlight",
  { opacity: 1, duration: SPOTLIGHT_FADE_DUR, ease: "power1.inOut" },
  SPOTLIGHT_AT,
);
```

## Variations

**Multi-step scroll (scroll → pause → scroll)** — multiple `y:` tweens at different positions. Distances are both measured from the `.page-content` origin (NOT delta from the previous step); GSAP composes successive `y:` tweens on the same property, each starting from the value the previous one left:

```js
tl.to(
  ".page-content",
  { y: -SCROLL_DISTANCE_A, duration: SCROLL_DUR, ease: "power3.out" },
  SCROLL_AT_A,
);
tl.to(
  ".page-content",
  { y: -SCROLL_DISTANCE_B, duration: SCROLL_DUR, ease: "power3.out" },
  SCROLL_AT_B,
);
// SCROLL_AT_A + SCROLL_DUR ≤ SCROLL_AT_B — the two scrolls must not fight for y
```

## Values

| token              | range / rule                                                              | notes                                                                                 |
| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| tiltYDeg           | −12 to −4 (left-leaning) or 4 to 12                                       | bigger = more dramatic 3D; near 0 collapses to a flat panel                           |
| tiltXDeg           | 0–6                                                                       | positive tilts the top edge away                                                      |
| perspectivePx      | 800–2000 px                                                               | smaller = more foreshortening; larger = nearly orthographic                           |
| cardWidth / Height | card height < total content height                                        | otherwise the scroll has nothing to reveal                                            |
| sectionHeight      | Σ heights ≥ cardHeight + SCROLL_DISTANCE                                  | so the target section lands within frame                                              |
| SCROLL_AT          | ≥ end of prior tweens on `.page-content`                                  |                                                                                       |
| SCROLL_DUR         | 0.8–1.8 s                                                                 | shorter feels like a hard cut; longer feels programmatic                              |
| SCROLL_DISTANCE    | measured from the layout                                                  | from actual cumulative section heights — never estimated; don't overshoot content end |
| SPOTLIGHT_AT       | ≥ SCROLL_AT + SCROLL_DUR (or slightly earlier)                            | spotlight reveals the freshly-arrived section                                         |
| SPOTLIGHT_FADE_DUR | 0.4–0.8 s                                                                 |                                                                                       |
| Ease               | `power3.out` default; `power4.out` momentum; `power2.inOut` cinematic pan | pick ONE for all scrolls in the scene — mixing easings reads as jerky                 |

## Critical Constraints

- **Tilt is static** — the card holds its angle the whole scene.
- **Shadow direction matches tilt** — a left-leaning card casts shadow to the right (positive X offset); mismatch breaks the 3D illusion.
- **Page content is real HTML, not a screenshot**; scroll distances come from the real layout geometry.
- **`overflow: hidden` + `transform-style: preserve-3d` on `.tilt-card`** — clip at the rounded corners; preserve-3d for any 3D children / clean perspective composition.
- **Spotlight is an overlay above the scrolling content**, never inside `.page-content`.
- **Same easing across a multi-phase scroll**, and non-overlapping scroll windows.

## See also

[asr-keyword-glow.md](asr-keyword-glow.md) (on-page keyword highlight synced to VO) · [multi-phase-camera.md](multi-phase-camera.md) (camera zoom while the page scrolls) · [cursor-click-ripple.md](cursor-click-ripple.md) (cursor lands in the scrolled-into-view section) · [3d-camera-flight.md](3d-camera-flight.md) (when the camera itself should travel).

## Selected motion rule: chart-scrub-readout

---
name: chart-scrub-readout
description: A cursor/playhead scrubs an already-drawn chart — one driver moves a vertical tracking line and marker along a baked data polyline while a date/value tooltip steps through the data array; a second series can activate on cross. Deterministic data, readout writes only on index change.
metadata:
  tags: chart, scrub, readout, tooltip, tracking-line, data, cursor, playhead
---

# Chart Scrub Readout

The chart is already ON screen — this rule **interrogates** it. A vertical tracking line rides the scrub position, a marker dot follows the series, and a live tooltip reads out `date: value` per position, values flickering past like an odometer. It's the "this data is real — look closer" beat: the scrub proves the chart is an instrument, not a picture.

Boundary with its neighbors: [stat-bars-and-fills.md](stat-bars-and-fills.md) owns the chart's ARRIVAL; [counting-dynamic-scale.md](counting-dynamic-scale.md) owns a single number swelling in place. This rule assumes the graphic already exists and adds a **read head** moving across it. The three chain naturally: the line draws in (svg-path-draw / stat-bars), this rule scrubs it, and the landing value hands off to a count-up lockup.

## How It Works

1. **Data baked at setup** — a literal `DATA` array of `{ d, v }` points (or a pure index formula). The polyline's `points` attribute is computed ONCE from `DATA` by pure mapping functions: chart and readout share one source of truth. The argument of the shot is "this data is real" — a random walk regenerated per render breaks both determinism and the rhetorical claim.
2. **One driver tween** `p: 0 → 1` derives everything in its `onUpdate`: tracking-line x, marker x/y, tooltip position. Every output is a pure function of `p` — any seek lands the identical frame. Parallel tweens that merely share timing drift apart under rounding and read as chart chrome, not a read head.
3. **The marker rides the polyline** — its y interpolates between the two neighboring baked points, from the same arrays that built the chart; a separately-keyframed marker inevitably floats off the line.
4. **The readout is threshold-stepped** — the nearest data index derives from `p`, and `textContent` is written ONLY when that index changes (last-index guard). Transforms glide per frame (compositor-cheap); text steps per data point — no per-frame DOM text thrash. The guard is an optimization, not state: any seek recomputes the same index and the same text.

## Recipe

```html
<!-- inside a standard scene clip. Size the SVG so viewBox units === CSS pixels:
     one coordinate space serves the polyline, tracking line, marker, AND the HTML tooltip. -->
<div class="chart-wrap">
  <!-- position: relative — the tooltip transforms against this box -->
  <svg class="chart" viewBox="0 0 CHART_W CHART_H" width="CHART_W" height="CHART_H">
    <polyline id="series-a" class="series" fill="none" />
    <line id="track-line" y1="0" y2="CHART_H" stroke-dasharray="6 6" />
    <circle id="marker" r="MARKER_R" />
  </svg>
  <div class="tooltip" id="tooltip">
    <span id="tip-date">{firstDate}</span>
    <span id="tip-value">{firstValue}</span>
  </div>
</div>
```

```css
.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  min-width: TIP_MIN_WIDTH; /* fixed — the box must not resize as values change length */
}
#tip-value {
  font-variant-numeric: tabular-nums; /* MANDATORY — digits flicker past; widths must not */
}
```

```js
// Data baked at setup — literal values.
const DATA = [
  { d: "{date1}", v: V1 },
  // ... N points, chronological ...
];

// Pure mapping functions — geometry derives from DATA once.
const PAD = CHART_PAD;
const PLOT_W = CHART_W - PAD * 2;
const PLOT_H = CHART_H - PAD * 2;
const vals = DATA.map((p) => p.v);
const V_MIN = Math.min(...vals);
const V_MAX = Math.max(...vals);
const X = (i) => PAD + (i / (DATA.length - 1)) * PLOT_W;
const Y = (v) => PAD + PLOT_H * (1 - (v - V_MIN) / (V_MAX - V_MIN));

document
  .getElementById("series-a")
  .setAttribute("points", DATA.map((p, i) => `${X(i)},${Y(p.v)}`).join(" "));

const line = document.getElementById("track-line");
const marker = document.getElementById("marker");
const tooltip = document.getElementById("tooltip");
const tipDate = document.getElementById("tip-date");
const tipValue = document.getElementById("tip-value");

// Tooltip pops in as the scrub begins — a small fromTo scale/opacity spring at SCRUB_AT.

// ONE driver — line, marker, and tooltip are all projections of p.
const scrub = { p: 0 };
let lastIdx = -1;
tl.to(
  scrub,
  {
    p: 1,
    duration: SCRUB_DUR,
    ease: SCRUB_EASE,
    onUpdate: () => {
      const f = scrub.p * (DATA.length - 1); // fractional index
      const i = Math.min(DATA.length - 2, Math.floor(f));
      const t = f - i;
      const x = X(i) + (X(i + 1) - X(i)) * t;
      const y = Y(DATA[i].v) + (Y(DATA[i + 1].v) - Y(DATA[i].v)) * t;

      // Transforms glide every frame (cheap, deterministic)
      line.setAttribute("x1", x);
      line.setAttribute("x2", x);
      marker.setAttribute("cx", x);
      marker.setAttribute("cy", y);
      tooltip.style.transform = `translate(${x + TIP_DX}px, ${y - TIP_DY}px)`;

      // Text steps only when the nearest data point changes
      const idx = Math.round(f);
      if (idx !== lastIdx) {
        tipDate.textContent = DATA[idx].d;
        tipValue.textContent = `${DATA[idx].v.toLocaleString()} {unitLabel}`;
        lastIdx = idx;
      }
    },
  },
  SCRUB_AT,
);
// End hold: the driver finishes before the scene does — the landed value reads.
```

## Variations

- **Peak stop** — the scrub is the wind-up, the landing is the stat: `SCRUB_EASE: "power3.out"` decelerates onto the final/peak point, then pop the emphasis at landing (`fromTo` marker `scale: 1 → PEAK_POP_SCALE` at `SCRUB_AT + SCRUB_DUR`). Pair with a pill tooltip that springs to its final label ([spring-pop-entrance.md](spring-pop-entrance.md)) — the classic "line breaks above the band" climax.
- **Second-series activation on cross** — series B sits dimmed; at `SCRUB_AT + SCRUB_DUR * CROSS_P` tween its stroke to the lit color (0.25s, `power2.out`), and in the driver's `onUpdate` read from B's array once `scrub.p ≥ CROSS_P` (still index-guarded). The color flip lands ON the cross — same-frame causality.
- **Two-chart glide** — two scrub beats: sweep chart A, glide the cursor/tooltip group across the gutter (a plain `x` tween, no readout — dead travel, not data), then chart B activates with its own driver. One driver per chart.
- **Cursor-led scrub** — an oversized cursor is the visible actor: another projection of the SAME driver (positioned from `x` in the same `onUpdate`, tip at the tracking line's head) — never a second tween that merely matches timing. Cursor look and click grammar from [cursor-click-ripple.md](cursor-click-ripple.md).
- **Playhead form** — no cursor; the tracking line IS the actor (timeline scrubbers, audio waves, session replays). `ease: "none"` — mechanical playback, not a hand.

## Values

| token                   | range / default               | notes                                                                                                                    |
| ----------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| N (data points)         | 10–40                         | <10 reads as a slideshow; >40 blurs into texture. The flicker is the point — only first and final values must be legible |
| SCRUB_DUR               | 1.5–3s                        | shorter = confident sweep; longer = inspection. Leave ≥0.8s of scene after the driver ends so the landed value holds     |
| SCRUB_EASE              | `power1.inOut` default        | `"none"` playhead form; `power3.out` peak stop. Never `back.out` — a read head that overshoots and re-reads looks broken |
| CROSS_P                 | 0.55–0.75                     | earlier and A never establishes; later and B's readout has no time to live                                               |
| TIP_DX / TIP_DY         | 16–48px, up-and-right         | flip the sign near the chart's right edge so the tooltip never exits the frame                                           |
| MARKER_R / stroke width | r 6–12 / 4–8px                | the marker must dominate the line it rides                                                                               |
| TIP_MIN_WIDTH           | ≥ longest `date: value` state | without it the box breathes as digits change                                                                             |

## Critical Constraints

- **`DATA` is literal at setup**; polyline points derive from it via pure functions — chart and readout share one source of truth.
- **Seed at setup** — call the scrub applier once with `p = 0` right after building (à la `3d-camera-flight`'s `applyCamera()`), or a seek to t=0 before the driver runs shows the tracking line/marker at their HTML-default positions.
- **Single driver** — one `p` tween; all scrub outputs (line, marker, tooltip, any cursor) computed in its `onUpdate`, each a pure function of `p`.
- **Readout writes guarded by index change** — `onUpdate` stays O(1): a few attribute sets, one transform, text only on step.
- **SVG `viewBox` units = CSS pixels** (`viewBox="0 0 W H"` with matching `width`/`height`) — one coordinate space must serve the SVG internals and the HTML tooltip's transform.
- **`tabular-nums` + fixed `min-width`** on the tooltip value.
- **The chart pre-exists** — draw-in belongs to `svg-path-draw` / `stat-bars-and-fills`; sequence it BEFORE the scrub, don't blend them.
- **Land the read** — hold the final value ≥0.8s (or hand off to a count-up lockup).

## See also

`svg-path-draw` (the series draws in first) · `stat-bars-and-fills` (surrounding dashboard chrome) · `spring-pop-entrance` (peak dot + pill pop at the landing) · `counting-dynamic-scale` (closing stat lockup) · `cursor-click-ripple` / `context-sensitive-cursor` (the cursor-led form's actor) · `control-target-sync` (the sibling WRITE direction — there a control edits a target; here a scrub reads a dataset).
