# Frame packet: 02-alert-flood

## Project inputs

- Project: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
- Design tokens: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch/frame.md
- RULES_DIR: /Users/swami/.cursor/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 2 — Buried in alerts

- scene: Notification cards with real alert titles from Figma 01 stack faster than readable; 3D dolly back reveals hund
- duration: 7.96s
- transition_in: cut
- status: outline
- voiceover: "Your on-call team is buried in alerts, and most of them don't matter. The ones that do can take hours to untangle."
- src: compositions/frames/02-alert-flood.html
- blueprint: overwhelm-surround (Adapt)
- rules: waterfall-entry, counting-dynamic-scale, 3d-camera-flight, motion-blur-streak

Notification cards with real alert titles from Figma 01 stack faster than readable; 3D dolly back reveals hundreds; counter climbs to 1,284 (tabular); 'most of them don't matter' greys 90% of cards; 'hours' makes one coral card throb.

Components: compositions/components/07-alert-flood, compositions/components/01-alert-triage
Generated video: none (assets/el-video/<id>.mp4, head-trimmed)
Cues (local seconds): none
Hits (local seconds): none
SFX: row-tick, sub-swell
Counter: [212, 1284]

## Selected blueprint: overwhelm-surround

# overwhelm-surround — Overwhelm / Close-In

**intent**: Convey overwhelm by accumulation. Recognizable subjects assemble, density markers scatter in to amplify "look how much," then the central subject morphs into the viewer's own avatar and elements close in from ALL sides — the frame feels surrounded, not zoomed-into. The emotional arc is recognition → claustrophobia.

**roles served**

- Problem (from `problem-mockup-overwhelm`): when the problem beat must first show "too many tools / too much surface area" and then put **the viewer inside it** — a literal swap of subject (product → person) followed by a closing-in that feels invasive. Reach for it when the pain is "you're buried," not "this metric is bad" (that's `dataviz-countup`).
- Problem (from `desktop-clutter-accumulation`): when the overwhelm is a **workspace**, not a tool
  count — live windows, stickies, and alert toasts pile up until the frame is chaotically full, and
  the beat resolves not by closing in but by shoving the clutter aside and asking the question.
  Reach for this variant when the pain lands on words ("how can you X… when you spend months on
  Y?"), not on a surrounded avatar.

**duration**: 6–9s (clutter-shove-to-question variant ~10s)

**shot structure** (a `[bg]` canvas; recognizable surfaces first, the viewer's avatar revealed underneath, then a radial crowd)

- **Scene 1 (0.0–~1.6s) — recognizable assembly.** Three `[product mockups / surfaces]` assemble into something the viewer knows — staggered scale-in, the **center** one full-size, the two flanks smaller (~0.86). Each rides a low-amplitude float so they feel like live context, not a static collage. Camera static.
- **Scene 2 (~1.6–3.0s) — density amplifies.** `[platform icons / logos]` scatter in around the mockups (staggered), used purely as **density markers** — "look how much surface area," not animated dials.
- **Scene 3 (~3.0–4.6s) — the morph (signature move).** The CENTER mockup MORPHS: its content fades out, the container reshapes, and the viewer's `[avatar]` is revealed **underneath** — a literal swap of subject, product → person.
- **Scene 4 (~4.6–end) — close-in.** `[task bubbles / demands]` close in from ALL sides toward the avatar (radial staggered entry). The avatar **stays put** while the bubbles invade — the claustrophobia comes from being surrounded, never from a camera push. Holds on the crowded state.
- **Variant — clutter-shove-to-question** (replaces Scenes 3–4 and
  inverts the camera contract — see modifier): accumulation runs under a **slow steady zoom-out** —
  `[sticky notes]` bounce in springy, `[dashboard / editor windows]` pop and slide up, a stack of
  `[alert toasts]` slides in at one edge, inner content keeps typing / log-scrolling as live density,
  windows overlap until the frame is chaotically full. The camera then REVERSES into a quick
  push-in that **shoves the clutter to the frame edges**, opening central negative space where a
  `[two-part serif question]` builds word-by-word (line 1 swaps in place to line 2); a `[cursor]`
  glides in from off-frame and comes to rest under the text; a very slow forward creep and hold.
  No morph, no avatar — the question is the payoff.

**motion vocabulary**: staggered scale-in assembly; resting-scale-preserving low float; density-marker icon scatter; content-fade → container-reshape → reveal-anchor-beneath morph; radial close-in entry from all compass points; held crowded end-state. Clutter-shove variant: slow steady zoom-out under accumulation; reverse quick push-in; clutter
shoved to frame edges opening center negative space; continuous live typing / log scroll inside
windows as ambient density; toast-stack slide-in; word-by-word serif build with in-place line swap;
cursor glide-to-rest; very slow forward creep + hold.

**rule mapping**

- staggered mockup + icon entries (smooth settle onto their resting scale) → `spring-pop-entrance` (smooth-settle register) backed by `gsap-effects`
- platform icons as density markers (positions pre-baked, scale/opacity only — NOT internal-parts animation) → `svg-icon-enrichment` (its DOM contract only)
- center mockup → avatar morph (HF forbids `width`/`height` tweens → drive the reshape on `scaleX`/`scaleY`, anchor = the avatar layer rendered beneath) → `card-morph-anchor`
- radial bubble close-in (positions baked once via `cos`/`sin`, staggered entry) → `gsap-effects` (radial layout) + `spring-pop-entrance` (per-bubble arrival)
- low-amplitude float on background mockups/icons → `sine-wave-loop` (low-amplitude register — subtle jitter that composes onto each element's resting scale, never a `fromTo` yoyo that re-tweens to its start)
- (variant) zoom-out under accumulation → quick push-in → slow forward creep → `multi-phase-camera`
  (pull-back / push / drift as sequential phases on one world wrapper; counter-translate math in
  `viewport-change`)
- (variant) clutter shoved to the edges as the push-in lands → `center-outward-expansion` (outward
  vectors to edge resting positions), fired at the same timeline position as the camera push so the
  shove reads as CAUSED by it (`reactive-displacement` register)
- (variant) word-by-word serif question build → `gsap-effects` (staggered word reveal); the
  in-place line-1 → line-2 swap → `discrete-text-sequence`
- (variant) live typing inside windows → `gsap-effects` (typewriter); the continuous inner
  log-scroll — composition: looping content translateY via `gsap-effects` (masked)
- (variant) cursor glide-in coming to rest → `cursor-click-ripple` (approach portion only — no click)

**camera modifier**: camera-static — the close-in must read as the world crowding the subject, so the frame holds; a push-in would convert "surrounded" into "zoomed-into" and kill the claustrophobia. The clutter-shove-to-question variant is the sanctioned exception: there the camera IS the
storyteller (zoom-out ↔ push-in via `multi-phase-camera`), and the claustrophobia comes from
accumulation, not surround — never mix the two resolutions in one shot.

## Selected motion rule: waterfall-entry

---
name: waterfall-entry
description: Staggered ARRIVAL cascade — words/elements whip in from below (one consistent direction), each starting before the previous settles, an accelerating wave that resolves into a composed layout. Title cards, segment openers, list/feature intros. Opacity is BINARY 0→1 via tl.set — never fade an arrival.
metadata:
  tags: entrance, cascade, stagger, kinetic-text, title-card, segment-opener, arrival, waterfall, whip
---

# Waterfall Entry

Staggered ARRIVAL cascade: words/elements whip in from below (one consistent direction),
each starting before the previous settles — an accelerating wave that resolves into a
composed layout. Title cards, segment openers, list/feature intros.

**This is an in-scene arrival, not a seam.** Its seam sibling is the waterfall CUT
(`cut-the-curve` doctrine skill, `seams/waterfall-cut.md`); do not mix their rules:

|               | Entry (this rule — arrival)                   | Waterfall Cut (seam)                                      |
| ------------- | --------------------------------------------- | --------------------------------------------------------- |
| Opacity       | BINARY 0→1 via `tl.set` at entry — never fade | ignites at 0.35 mid-path — the fade IS the velocity trick |
| Axis default  | Y, from below                                 | X, riding the current                                     |
| Outgoing side | none                                          | words ramp out on mirrored power4.in                      |

## Choreography

- **Overlap, don't queue** — next element starts within ±2 frames of the previous
  settling; gaps SHRINK across the cascade; the last element snaps.
- **Velocity varies by weight** — heavy/anchor elements travel further and longer;
  light words/punctuation snap in tight:

| Parameter | Anchor/heavy | Normal word | Light/punctuation |
| --------- | ------------ | ----------- | ----------------- |
| Y offset  | 60–80px      | 40–50px     | 30–48px           |
| Duration  | 0.16–0.20s   | 0.13–0.16s  | 0.10–0.13s        |
| Overlap   | 0–2f gap     | 1f overlap  | 1–2f overlap      |

- Ease `power4.out` (`expo.out` for extra snap); never `.inOut` on an entry.
- One direction per cascade.
- Split the FINAL word into fragments to extend the climax; fragments travel further.
- Post-settle, the group usually slides to make room for the next beat — that's
  [nudge-curve.md](nudge-curve.md).

## JS

Each element: `tl.set` (instant reveal + offset) then `tl.to` (whip to rest).
`nextStart = prevStart + prevDuration − (overlapFrames × F)`; +overlap = cascade,
−overlap = deliberate gap. CSS: elements start `opacity: 0; display: inline-block`.

```js
var F = 1 / 60;
var t0 = 0.1;
// anchor (heaviest): biggest travel, longest settle
tl.set("#el-1", { opacity: 1, y: 80 }, t0);
tl.to("#el-1", { y: 0, duration: 0.18, ease: "power4.out" }, t0);
// normal word: 2 frames after the anchor finishes
var t1 = t0 + 0.18 + 2 * F;
tl.set("#el-2", { opacity: 1, y: 45 }, t1);
tl.to("#el-2", { y: 0, duration: 0.15, ease: "power4.out" }, t1);
// light word: 1 frame BEFORE the previous finishes (overlap)
var t2 = t1 + 0.15 - F;
tl.set("#el-3", { opacity: 1, y: 40 }, t2);
tl.to("#el-3", { y: 0, duration: 0.14, ease: "power4.out" }, t2);
// split final-word fragments: tightest overlap, extra travel (lighter)
var t3 = t2 + 0.14 - F;
tl.set("#frag-a", { opacity: 1, y: 70 }, t3);
tl.to("#frag-a", { y: 0, duration: 0.16, ease: "power4.out" }, t3);
var t4 = t3 + 0.14 - F;
tl.set("#frag-b", { opacity: 1, y: 70 }, t4);
tl.to("#frag-b", { y: 0, duration: 0.15, ease: "power4.out" }, t4);
// punctuation: lightest, fastest
var t5 = t4 + 0.13 - 2 * F;
tl.set("#dot", { opacity: 1, y: 48 }, t5);
tl.to("#dot", { y: 0, duration: 0.12, ease: "power4.out" }, t5);
```

## Anti-patterns

| Don't                                                  | Instead                                                                           |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Queued entries (each waits for the previous to settle) | Overlap ±1–2 frames — the cascade is a wave, not a queue                          |
| Same offset/duration for every cascade element         | Vary by weight: anchors travel further, punctuation snaps                         |
| Gradual opacity fade on an arrival                     | Binary 0→1 via `tl.set` — fading fights the snap (seam cuts fade; arrivals don't) |

## Selected motion rule: counting-dynamic-scale

---
name: counting-dynamic-scale
description: Counter animation where the value counts up while transform scale grows to its final size, creating escalating visual weight without per-frame text reflow.
metadata:
  tags: counter, counting, scale, transform, number, dynamic, emphasis
---

# Counting with Dynamic Scale

A number counts from A → B while its transform scale grows to the final size — escalating visual weight ("this is impressive") without tweening `font-size` or forcing text layout on every frame. The final font size is static CSS; only the transform changes.

## How It Works

Two synchronized tweens at the SAME timeline position with the SAME ease: (1) a proxy value rendered as text via `onUpdate` (`Math.round(...).toLocaleString()`), (2) the counter's transform `scale: START_SCALE → 1`, where `START_SCALE = START_SIZE / END_SIZE`. A suffix (`%`, `×`, `+`) slides in AFTER the count lands — the number gets its own beat — and a label fades in early.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="counter-wrap">
  <span class="counter" id="counter">0</span><span class="counter-suffix">{suffix}</span>
</div>
<div class="counter-label">{label}</div>
```

```css
.counter-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  width: {counterContainerWidth}; /* fixed width — no layout shift as digit count changes */
}
.counter {
  font-variant-numeric: tabular-nums; /* MANDATORY — digits keep equal width */
  display: inline-block;
  font-size: {endSize}; /* final size is static; GSAP animates scale, not font-size */
  transform-origin: center center;
}
.counter-suffix {
  opacity: 0;
  transform: translateY(20px);
}
```

```js
const counter = document.getElementById("counter");
const state = { value: 0 };
const START_SCALE = START_SIZE / END_SIZE;

// Count value — onUpdate changes text only
tl.to(
  state,
  {
    value: TARGET_VALUE,
    duration: COUNT_DUR,
    ease: COUNT_EASE,
    onUpdate: () => {
      counter.textContent = Math.round(state.value).toLocaleString();
    },
  },
  0,
);

// Visual growth — compositor transform sharing the count's timing + ease
tl.fromTo(counter, { scale: START_SCALE }, { scale: 1, duration: COUNT_DUR, ease: COUNT_EASE }, 0);

// Suffix slides in AFTER the count completes
tl.to(
  ".counter-suffix",
  { opacity: 1, y: 0, duration: SUFFIX_DUR, ease: `back.out(${SUFFIX_BOUNCE_FACTOR})` },
  COUNT_DUR,
);

// Label fades in early
tl.from(".counter-label", { opacity: 0, y: 12, duration: LABEL_DUR, ease: "power2.out" }, LABEL_AT);
```

## Variations

- **Direct `innerText` tween (no proxy)** — GSAP can tween `innerText` directly for a number-only counter; keep the proxy form when you need locale formatting or suffix logic. The scale tween stays separate either way:

```js
tl.to(
  counter,
  { innerText: TARGET_VALUE, duration: COUNT_DUR, ease: COUNT_EASE, snap: { innerText: 1 } },
  0,
);
```

- **3D depth entry** — add a `tl.from(".counter", { z: -300, ... }, 0)` push-in; requires `perspective` on `.counter-wrap` and `transform-style: preserve-3d` on the counter.
- **Multi-stat coordinated reveal** — 3 stats counting in parallel share the SAME ease, duration, and start position so they finish together (a chord, not an arpeggio). Each stat usually also needs a paired graphic (bar / ring / stars) — don't stop at the number; see [stat-bars-and-fills.md](stat-bars-and-fills.md).

## Values

| token                 | range                                       | notes                                                                         |
| --------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| TARGET_VALUE          | 2–3 digits ideal                            | 4+ digits needs a wider container; must fit at END_SIZE without clipping      |
| START_SIZE / END_SIZE | START ≈ 40–60% of END                       | design inputs used once for START_SCALE; never tween either                   |
| COUNT_DUR             | 1.2–2.5s                                    | below ~0.8s reads as a flash — the eye must read the digits scrolling past    |
| COUNT_EASE            | `power2.out` / `power3.out` ⭐ / `expo.out` | shared by value + scale; more `.out` = more dramatic deceleration at the peak |
| SUFFIX_DUR            | 0.3–0.6s                                    | fires at `COUNT_DUR`, never during the count                                  |
| SUFFIX_BOUNCE_FACTOR  | 1.4–2.0                                     | overshoot is fine on the suffix (it's punctuation, not data)                  |
| LABEL_AT / LABEL_DUR  | AT < COUNT_DUR/2; 0.4–0.7s                  | label arrives before the count peaks                                          |

## Critical Constraints

- **`tabular-nums` mandatory** + fixed-width container as belt-and-suspenders — without them digit-count transitions (9 → 10 → 100) jitter as glyph widths change.
- **Never set `fontSize` in `onUpdate`** — final type size is static CSS; only the transform changes per frame. Keep `onUpdate` O(1): set text only, no style writes or DOM creation.
- **`Math.round`, not `Math.floor`** — halfway through the final integer should already display the final value.
- **Avoid `back.out` / `elastic.out` on the counter itself** — overshoot makes the number look unstable (it's data, not decoration). Grow in place, don't bounce.
- **Label is BIG TEXT, not a page-style caption** — a tiny paragraph under a hero-size number reads as visual noise in video. Display-size, uppercase, tracked: the label is part of the headline.

## See also

`stat-bars-and-fills` (the paired graphic — give it the same ease/duration so number and fill land as one beat) · `svg-path-draw` (icons drawing in around the number) · `center-outward-expansion` (icons bursting outward at the count peak).

## Selected motion rule: 3d-camera-flight

---
name: 3d-camera-flight
description: Perspective camera FLIGHT through a 3D-laid-out world — one static perspective stage + preserve-3d world whose pose (translate3d + rotateX/rotateY) is tweened leg-by-leg from a single camera state object. Dive into an angled grid, tilt-to-flatten pull-back, continuous flight past standing cards, decelerate-into-focus. Hard power4.out landings, power2.inOut repositioning; DoF via depth-of-field-blur on non-focal planes.
metadata:
  tags: camera, 3d, flight, perspective, preserve-3d, rotateX, rotateY, translateZ, dive, tilt, world, cinematic
---

# 3D Camera Flight

Every other camera rule here is a **2D camera**: [viewport-change.md](viewport-change.md), [multi-phase-camera.md](multi-phase-camera.md), and [coordinate-target-zoom.md](coordinate-target-zoom.md) simulate the camera with `scale` + `translate` on a flat wrapper — the lens never tilts, and there is no depth axis to travel along. [3d-page-scroll.md](3d-page-scroll.md) is a **static tilt**: one angle held all scene while content scrolls inside. This rule is the missing camera that _flies_ — dives into an angled grid, pulls back while the world rotates flat, streaks past standing cards, decelerates out of a blur into focus: a **perspective camera traveling with `rotateX` / `rotateY` / `translateZ` through a 3D-laid-out world**, under the same single-camera discipline as `viewport-change`: **one perspective wrapper, one camera state object, one transform writer**, every leg a sequenced tween on that state.

## How It Works

Five layers, strictly separated:

1. **The lens** — `perspective: PERSPECTIVE_PX` on a static `.stage` wrapper. Set once, never tweened, never moved. Changing perspective mid-shot reads as the lens itself warping, not the camera moving.
2. **The world** — a `.world` div with `transform-style: preserve-3d`, laid out at final 1× size: the ground surface (grid, form card, canvas) as flat DOM, optional **props** (a giant date number, a floating label) at static `translateZ(PROP_Z)` offsets so travel produces parallax, and **standing cards** counter-tilted to face the camera at their landing pose.
3. **The camera state** — a single object `cam = { x, y, z, rx, ry }` (the world's pose), written to `world.style.transform` by ONE function, `applyCamera()`, in a **fixed order**: `translate3d(x, y, z) rotateX(rx) rotateY(ry)`. With translate composed _outside_ the rotations, `x`/`y`/`z` always move the world along **screen axes** no matter how it is currently tilted — pan is always sideways, `z` is always toward/away from the lens. Put the rotations first and every leg's numbers change meaning as the tilt changes.
4. **The legs** — sequential tweens on `cam`, each one camera move: dive in (`power4.out` — violent arrival, sharp settle), tilt-to-flatten pull-back (`power2.inOut` — a repositioning, no slam), lateral flight, final dive. Camera intent inverts onto the world pose exactly as in `viewport-change`: camera flies **in** → world `z` **increases** (comes toward the lens); camera pans **right** → world `x` **negative**; camera tilts **down** over the surface → world `rx` **positive** (far edge tips away).
5. **Depth cues** — DoF via [depth-of-field-blur.md](depth-of-field-blur.md) `--dof` tweens on the **non-focal planes** (cards, props — leaf elements, never the world itself), and velocity blur on travel legs via [motion-blur-streak.md](motion-blur-streak.md)'s Camera-Travel Carve-Out — applied to the **stage**, never the world (a `filter` on a `preserve-3d` element flattens it).

Landing poses are **authored, not derived**: set `cam` to candidate values at design time, call `applyCamera()`, screenshot, adjust, bake the numbers as constants. There is no counter-translate formula to get wrong in 3D — the pose IS the design decision. Never measure per-frame (`getBoundingClientRect` in `onUpdate` desyncs under parallel frame sampling), and don't hand-derive 3D projections — your eye at design time beats the math.

## Recipe

```html
<!-- The lens: static perspective, nothing else. -->
<div class="stage">
  <!-- The world: preserve-3d, laid out at final 1× size; the camera flies by
       tweening THIS element's pose. Travel legs push content past the frame
       edges by design — hence data-layout-allow-overflow. -->
  <div class="world" id="world" data-layout-allow-overflow>
    <div class="surface">
      <div class="grid">{gridCells}</div>
      <div class="card layer" id="card-a" data-depth="0">{cardA}</div>
      <div class="card layer" id="card-b" data-depth="0">{cardB}</div>
    </div>
    <!-- Foreground props float at PROP_Z for parallax; they blur and fly past,
         never carry a read. -->
    <div class="prop layer" data-depth="2" style="--px: PROP_X; --py: PROP_Y">{propGlyph}</div>
  </div>
</div>
```

```css
.scene {
  overflow: hidden; /* travel legs push world content past the frame on purpose */
  background: {sceneBg}; /* the void the flight exposes at frame edges — must be a
     designed surface (deep brand color / soft gradient), never default white */
}
.stage {
  position: absolute;
  inset: 0;
  perspective: PERSPECTIVE_PX; /* THE LENS — static, never tweened */
  /* travel blur (motion-blur-streak carve-out) attaches HERE, never on .world */
}
.world {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  will-change: transform;
  /* keep CLEAN: no filter, opacity < 1, overflow, clip-path, or mask — each
     flattens preserve-3d. Background on .scene, blur on .stage or leaf cards. */
}
.surface {
  position: absolute;
  inset: WORLD_INSET; /* world runs larger than the frame so travel has runway */
  transform-style: preserve-3d;
}
.prop {
  position: absolute;
  left: var(--px);
  top: var(--py);
  /* static world-space pose; counter-tilt faces the camera at the dive pose */
  transform: translateZ(PROP_Z) rotateX(PROP_COUNTER_TILT);
}
.layer {
  --dof: 0px; /* DoF channel per depth-of-field-blur — leaf elements only */
  filter: blur(var(--dof));
  will-change: filter;
}
```

```js
const world = document.getElementById("world");

// Camera state — the ONLY source of truth for the world's pose. Every leg
// tweens this object; nothing else touches world.style.transform.
const cam = { x: 0, y: 0, z: WIDE_Z, rx: 0, ry: 0 };

function applyCamera() {
  // Fixed order: translate OUTSIDE the rotations → x/y/z stay screen-aligned
  // at any tilt. Changing this order changes what every baked pose means.
  world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, ${cam.z}px) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg)`;
}
applyCamera(); // seed frame 0 so a seek to t=0 renders the opening pose

// ── LEG 1 — DIVE IN: wide establishing pose → angled close-up on card A.
// fromTo states the opening pose explicitly; power4.out = violent arrival,
// razor-sharp settle. Travel blur: motion-blur-streak carve-out on .stage.
const DIVE_POSE = { x: DIVE_X, y: DIVE_Y, z: DIVE_Z, rx: DIVE_RX, ry: DIVE_RY };
tl.fromTo(
  cam,
  { x: 0, y: 0, z: WIDE_Z, rx: 0, ry: 0 },
  { ...DIVE_POSE, duration: DIVE_DUR, ease: "power4.out", onUpdate: applyCamera },
  DIVE_AT,
);
// Decelerate-INTO-FOCUS: non-focal planes' --dof ramps to BLUR_PER_DEPTH × data-depth
// on the SAME window/ease (depth-of-field-blur focal pull); card A stays at --dof: 0.

// ── LEG 2 — TILT-TO-FLATTEN PULL-BACK: every channel returns to neutral on ONE
// power2.inOut tween — a reposition, not a slam. DoF releases on the same window
// so the flat overview arrives fully crisp.
const FLAT_POSE = { x: 0, y: 0, z: 0, rx: 0, ry: 0 };
tl.to(
  cam,
  { ...FLAT_POSE, duration: FLATTEN_DUR, ease: "power2.inOut", onUpdate: applyCamera },
  FLATTEN_AT,
);
tl.to(".layer", { "--dof": "0px", duration: FLATTEN_DUR, ease: "power2.inOut" }, FLATTEN_AT);

// ── LEG 3 — LATERAL FLIGHT: screen-aligned pan (translate is outside the
// rotations, so x is a pure sideways move even mid-tilt).
tl.to(cam, { x: PAN_X, duration: PAN_DUR, ease: "power2.inOut", onUpdate: applyCamera }, PAN_AT);

// ── LEG 4 — FINAL DIVE onto card B: same grammar as leg 1; card A racks OUT of
// focus as card B racks in (depth-of-field-blur rack, shared window).
const LAND_POSE = { x: LAND_X, y: LAND_Y, z: LAND_Z, rx: LAND_RX, ry: LAND_RY };
tl.to(
  cam,
  { ...LAND_POSE, duration: LAND_DUR, ease: "power4.out", onUpdate: applyCamera },
  LAND_AT,
);
tl.to("#card-a", { "--dof": `${MAX_BLUR}px`, duration: LAND_DUR, ease: "power4.out" }, LAND_AT);
tl.to("#card-b", { "--dof": "0px", duration: LAND_DUR, ease: "power4.out" }, LAND_AT);
// Landing dwell: ≥1 s of stillness on card B — unless ending held mid-dive.
```

## Variations

- **Continuous flight past standing cards** — one long leg instead of dive-land-dive: sustained `z` + `x` travel (2–4 s, `power2.inOut` / `power1.inOut` near-constant cruise) through a corridor of cards and props at staggered `PROP_Z`. Parallax does the work — near props streak past while far ones crawl. Keep ONE plane sharp at a time via staggered `--dof` tweens. Props crossing the camera plane (`cam.z + PROP_Z` approaching `PERSPECTIVE_PX`) blow up to fill the frame and vanish — that IS the fly-past; never let a focal card cross it.
- **End held mid-dive** — give the final leg a window that overruns the composition (`LAND_AT + LAND_DUR > data-duration`); the last frame holds mid-tween — still traveling, blur not fully resolved. Seek-safe by construction (a seek to the last frame lands at a deterministic pose); don't fake it with a shorter leg plus a manual offset. Use when the brief wants momentum at the cut, not rest.
- **Whip sweep** — the heavily motion-blurred lateral whip that resolves into the next region: leg 3 driven by [nudge-curve.md](nudge-curve.md)'s three-phase chain (burst-dominant) on `cam.x`, with [motion-blur-streak.md](motion-blur-streak.md)'s Camera-Travel Carve-Out on the same window — blur ramps through the ramp-in, rides the burst at peak, resolves to 0 through the `power4.out` tail. Full recipe in that carve-out.
- **Hold drift (the hold never dies)** — between legs, fold `multi-phase-camera`-style micro-drift **through the same writer**: a driver tween writes tiny `dx`/`dy`/`drx` into a `drift` object and `applyCamera()` composes `cam.x + drift.dx`, `cam.rx + drift.drx`, etc. Never let drift write `world.style.transform` itself — two writers on one transform is the classic camera bug. Amplitudes per `multi-phase-camera` (2–8 px), rotation drift ≤ 0.5°.

## Values

| token                     | range                                                            | notes                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PERSPECTIVE_PX            | 700–1400 px (moving cam best 800–1200)                           | smaller = wilder foreshortening, more violent dives; larger = near-orthographic, the flight flattens                                                                                      |
| WORLD_INSET               | −50% to −150% per side                                           | world 2–4× the frame so lateral legs have runway                                                                                                                                          |
| PROP_Z                    | 80–300 px                                                        | higher = stronger parallax, earlier fly-past                                                                                                                                              |
| PROP_COUNTER_TILT         | ≈ `-LAND_RX` of the leg that reads it                            | author by eye and bake                                                                                                                                                                    |
| DIVE_RX / LAND_RX         | 30–55°                                                           | "angled grid" starts ~30°; \|rx\| ≤ ~65°, \|ry\| ≤ ~30° — beyond that flat planes go edge-on, text unreadable                                                                             |
| DIVE_Z / LAND_Z           | 300–700 px at PERSPECTIVE_PX ≈ 1000                              | **Z budget**: `cam.z + PROP_Z ≤ ~0.6 × PERSPECTIVE_PX` for readable content — near the perspective distance, scale blows toward infinity and elements invert/vanish past the camera plane |
| WIDE_Z                    | −100 to −400 px                                                  | negative z = world pushed away = camera wide                                                                                                                                              |
| DIVE_X/Y, LAND_X/Y        | read off a screenshot at the baked tilt                          | screen-aligned (translate outside rotations)                                                                                                                                              |
| DIVE_DUR / LAND_DUR       | 0.6–1.0 s                                                        | commitment, not a polite zoom; under 0.5 s reads as a cut                                                                                                                                 |
| FLATTEN_DUR               | 1.2–2.0 s                                                        | the repositioning is the breath between dives                                                                                                                                             |
| PAN_DUR                   | 0.8–1.5 s plain; 0.5–0.8 s whip                                  |                                                                                                                                                                                           |
| Ease law                  | `power4.out` dives/landings; `power2.inOut` repositioning/cruise | spring/back on a camera reads as the world wobbling on a string; four identical pushes read as a slideshow — vary the leg verbs                                                           |
| Holds                     | ≥ 0.8 s between legs; final dwell ≥ 1 s                          | unless ending held mid-dive                                                                                                                                                               |
| BLUR_PER_DEPTH / MAX_BLUR | per [depth-of-field-blur.md](depth-of-field-blur.md)             | 3–6 px per step, terminal 8–24 px, leaf elements only; travel-blur peak per [motion-blur-streak.md](motion-blur-streak.md) (~18–20 px full-frame, on `.stage`)                            |

## Critical Constraints

- **One lens, one state, one writer** — `perspective` on the static `.stage` only (never on `.world`, never tweened, never a second perspective wrapper inside); every leg tweens the single `cam` object; only `applyCamera()` writes the transform — drift folds into the same writer via additive state. Two writers (or a second transform sneaking in via CSS) is the classic broken-camera bug, five channels of it here.
- **Fixed transform order: translate outside the rotations** — `translate3d(x,y,z) rotateX() rotateY()`. Reorder it and every pose you authored silently means something else.
- **Keep the world CLEAN** — `filter`, `opacity < 1`, `overflow` other than `visible`, `clip-path`, or `mask` on `.world` (or any intermediate wrapper) forces used `transform-style: flat` and collapses every `translateZ` in the scene. Travel blur goes on `.stage`; DoF on leaf cards; fades on children; background on `.scene`. `transform-style: preserve-3d` on `.world` and every intermediate wrapper between it and 3D-positioned children.
- **Camera intent inverts onto the world** — fly in = world z up, pan right = world x negative, tilt down = world rx positive. Same sign law as `viewport-change`, two more axes to get right.
- **Poses authored and baked** — never measured per-frame, never hand-derived projections.
- **First leg is a `fromTo`** AND `applyCamera()` runs once at setup — a seek to t=0 must render the exact establishing pose.
- **Z budget** — only sacrificial props may cross the camera plane.
- **Reads happen at landings** — angled, blurred, flying text is texture; anything the viewer must read gets a near-flat pose or a sharp held close-up ≥ 1 s (the tilt-to-flatten leg exists to hand the surface over for reading).
- **`overflow: hidden` on `.scene` + `data-layout-allow-overflow` on `.world`** — travel legs deliberately push panels past the frame; without the pairing, `check` reports `container_overflow` for every region the flight leaves behind.

## See also

[viewport-change.md](viewport-change.md) (2D counterpart, same single-writer law — right when the shot never tilts) · [multi-phase-camera.md](multi-phase-camera.md) (leg-sequencing grammar + hold micro-drift) · [coordinate-target-zoom.md](coordinate-target-zoom.md) (aim math for a flat-hold zoom while `rx`/`ry` are 0) · [depth-of-field-blur.md](depth-of-field-blur.md) (non-focal defocus / racks) · [motion-blur-streak.md](motion-blur-streak.md) (travel blur on the stage) · [nudge-curve.md](nudge-curve.md) (whip-sweep burst tuning) · [3d-page-scroll.md](3d-page-scroll.md) (static-tilt cousin — camera should NOT travel) · [orbit-3d-entry.md](orbit-3d-entry.md) / [depth-scatter-assemble.md](depth-scatter-assemble.md) (elements moving under a still camera — the inverse; don't run both on one beat). Capability background: `../techniques.md` § CSS 3D Transforms.

## Selected motion rule: motion-blur-streak

---
name: motion-blur-streak
description: Fake directional velocity blur on a fast entrance or camera push-through — blur peaks at max speed and resolves to 0 at the settle, so the element streaks in then snaps sharp. Two paths — SVG feGaussianBlur on the motion axis, or an echo/ghost trail that collapses into the lead.
metadata:
  tags: motion-blur, velocity, streak, entrance, fly-in, ghost, echo, svg-filter, kinetic, camera, snap
---

# Motion-Blur Streak

Real motion blur isn't available to a seeked renderer (it integrates over shutter time), so this rule **fakes** it for a fast fly-in or hard camera push-through. The whole point is the _coupling_: the blur envelope rides the **same ease and window** as the position tween, so peak blur lands exactly on peak speed and the element is razor-sharp the instant it stops. Two paths:

- **(A) Directional SVG blur** — inline `<feGaussianBlur stdDeviation="X 0">` (X on the motion axis, 0 across it), tweened via a proxy. Cleanest; a true directional smear.
- **(B) Echo / ghost trail** — 2–4 duplicates at decreasing opacity, offset backward along the motion vector, collapsing into the lead as it settles. No filter cost; a stylized "speed-line" trail.

**Entrances and mid-shot moves only — never a mid-composition exit.** A blurred element fleeing off-frame mid-composition reads as a glitch; a hard exit between scenes is the transition's job (`../transitions/overview.md`). One sanctioned scope extension: the envelope may ride the **camera wrapper** during a travel leg — see the Camera-Travel Carve-Out.

## How It Works

A fast `out`-eased move front-loads velocity — fastest off the start, bleeding to zero at the settle. Map the blur/echo envelope onto that same curve: position travels from an off-frame / pushed-back start to rest over `MOVE_DUR`; in lockstep on the same window and ease the smear goes `PEAK_BLUR → 0` (A) or the ghosts collapse onto the lead (B). By the settle the element is fully crisp and dwells ≥1 s — the contrast between violent streak and still, sharp settle IS the effect. GSAP can't tween an SVG attribute directly: tween a plain `{ v }` proxy and write `setAttribute("stdDeviation", …)` in `onUpdate`, seeding it once at setup so a seek to t=0 shows the streaked start.

## Recipe

```html
<!-- inside a standard scene clip; overflow: hidden on the scene (the smear extends past rest) -->
<svg width="0" height="0" aria-hidden="true" style="position: absolute">
  <filter id="streak" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur id="streak-blur" in="SourceGraphic" stdDeviation="0 0" />
  </filter>
</svg>
<div class="streak-el" id="streak-el" style="filter: url(#streak)">{phrase}</div>
<!-- Path B instead: N-1 aria-hidden .streak-ghost duplicates BEHIND the lead, no filter -->
```

```js
// Path A — proxy-tweened directional blur.
const blurNode = document.getElementById("streak-blur");
const blurProxy = { v: PEAK_BLUR };
const writeBlur = () => blurNode.setAttribute("stdDeviation", `${blurProxy.v} 0`); // X axis only
writeBlur(); // seed frame 0 — a seek to t=0 must show the streaked start, not a sharp pre-frame

tl.fromTo(
  "#streak-el",
  { x: ENTER_FROM_X, opacity: 0 },
  { x: 0, opacity: 1, duration: MOVE_DUR, ease: MOVE_EASE },
  MOVE_START,
);
tl.to(blurProxy, { v: 0, duration: MOVE_DUR, ease: MOVE_EASE, onUpdate: writeBlur }, MOVE_START);

// Path B — ghosts on the SAME window/ease; per-ghost variation by index.
gsap.utils.toArray(".streak-ghost").forEach((g) => {
  const i = Number(g.dataset.i); // 1..N-1, set in HTML
  tl.fromTo(
    g,
    { x: ENTER_FROM_X - i * ECHO_STEP_PX, opacity: GHOST_BASE_OPACITY / i },
    { x: 0, opacity: 0, duration: MOVE_DUR, ease: MOVE_EASE },
    MOVE_START,
  );
});
```

## Variations

- **Vertical streak** — swap axes: `y`, `stdDeviation="0 Y"`, vertical echo offsets.
- **Camera push-through** — `scale: SCALE_FROM → 1` with a symmetric `"B B"` envelope (depth-wise smear, not directional): the wordmark punches out of soft focus and snaps crisp at the lock.
- **Staggered grid streak-in** — each card streaks into its slot at `MOVE_START + i * CARD_STAGGER` with its own blur proxy / ghosts; sharp the instant it lands.
- **Hold-the-streak** — blur on a marginally slower curve than position (position `expo.out`, blur `power3.out`) so the last wisp resolves just after arrival. Sparingly; default is locked envelopes.

## Camera-Travel Carve-Out

The envelope is also sanctioned at **wrapper level**: on the `.world` / camera wrapper of a virtual-camera scene ([viewport-change.md](viewport-change.md), [multi-phase-camera.md](multi-phase-camera.md), [3d-camera-flight.md](3d-camera-flight.md)) during a **travel leg** — a dive, a whip sweep, a violent final push. This does **not** violate "never a mid-composition exit": the world never leaves frame — the camera travels _through_ it, and every leg ends with the world at rest, sharp, inside the frame. Each leg is an **arrival** at the next pose, so the entrance doctrine applies leg by leg. Three deltas from the element-level recipe:

- **Envelope follows the leg's ease.** An `out` leg (dive, final push) uses the base recipe unchanged. An `inOut` repositioning leg peaks mid-leg: split the envelope at the velocity peak — `0 → PEAK` on the in-half ease over the first half, `PEAK → 0` on the out-half over the second. Seed the proxy at **0** for these (the streaked state lives mid-leg, not at t=0; seed-at-`PEAK_BLUR` belongs to the entrance shape, where the first frame IS the fastest).
- **Filter placement.** 2D camera: `filter: url(#streak)` on the `.world` wrapper. 3D flight: on the **perspective stage** above the 3D context — a `filter` on a `preserve-3d` element flattens it and collapses every `translateZ`. Never per-element inside the world: one frame-wide envelope, not N desynced ones.
- **Full-frame blur is heavy** — cap `PEAK_BLUR` ~18–20 at wrapper level (vs 30 for one element); a brief whip may touch ~24. Axis rule as usual: `"X 0"` for a lateral whip/pan, `"B B"` for a dive/push.

### Whip sweep (named composition)

The heavily-blurred lateral whip that resolves into the next region — two rules on one window:

1. **Position** — [nudge-curve.md](nudge-curve.md)'s three-phase chain on the camera state, tuned burst-dominant (tail still ≥3× ramp-in in time).
2. **Blur** — `0 → PEAK` across the ramp-in, held at `PEAK` through the linear burst (constant velocity = constant smear), `PEAK → 0` across the tail.

Swap or reveal the next region's content DURING the burst — the smear masks the change; the `power4.out` tail lands it sharp. Reveal during the burst, read after the tail.

```js
tl.to(cam, { x: WHIP_X * 0.1, duration: 0.12, ease: "power3.in", onUpdate: applyCamera }, WHIP_AT);
tl.to(
  cam,
  { x: WHIP_X * 0.75, duration: 0.1, ease: "none", onUpdate: applyCamera },
  WHIP_AT + 0.12,
);
tl.to(
  cam,
  { x: WHIP_X, duration: 0.35, ease: "power4.out", onUpdate: applyCamera },
  WHIP_AT + 0.22,
);

tl.to(blurProxy, { v: PEAK_BLUR, duration: 0.12, ease: "power3.in", onUpdate: writeBlur }, WHIP_AT);
// blur holds at PEAK through the linear burst (no tween needed — value rests at PEAK)
tl.to(blurProxy, { v: 0, duration: 0.35, ease: "power4.out", onUpdate: writeBlur }, WHIP_AT + 0.22);
```

## Values

| token              | range                                              | notes                                                                                           |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| MOVE_EASE          | `expo.out` / `power4.out` (default) / `power3.out` | `out`-family ONLY — `in`/`inOut` puts peak speed in the wrong place; position and blur share it |
| MOVE_DUR           | 0.25–0.6s                                          | over ~0.7s reads as a focus pull, not velocity                                                  |
| ENTER_FROM_X/Y     | 40–120% of the element's own dimension             | enough runway for the streak to read                                                            |
| PEAK_BLUR          | 8–30 (default 18)                                  | >30 erases the glyph at the start; ~18–20 cap at wrapper level                                  |
| SCALE_FROM         | 1.3–2.5                                            | push-through variation                                                                          |
| N (ghosts)         | 2–4                                                | >4 reads as strobe, not streak                                                                  |
| ECHO_STEP_PX       | 12–40px                                            | `N × step ≲ ENTER_FROM` so the furthest ghost starts inside the runway                          |
| GHOST_BASE_OPACITY | 0.3–0.6                                            | opaque ghosts read as duplicate elements                                                        |
| CARD_STAGGER       | 0.05–0.12s                                         | one assembling wave, not separate arrivals                                                      |

## Critical Constraints

- Blur peaks at peak speed and resolves to 0 at the settle — share the ease and window between position and envelope. A blur that lingers after the stop reads as a focus pull.
- Entrances / mid-shot arrivals only — never a mid-composition exit; wrapper-level use only per the carve-out.
- Seed `stdDeviation` at setup: at `PEAK_BLUR` for the entrance shape, at 0 for a whip / `inOut` leg.
- Generous filter region (`x="-50%" y="-50%" width="200%" height="200%"`) or the smear clips at the element's box edge.
- Directional axis: `"X 0"` horizontal, `"0 Y"` vertical, `"B B"` only for a depth/scale move — symmetric blur on a sideways move looks like defocus.
- Dwell ≥1 s sharp after the snap; a streak landing at the last beat reads as "flashed and gone".
- Heavy element on a solid field — thin type (< ~120px / 800 weight) or a busy backdrop swallows the smear.
- `overflow: hidden` on the scene — the smear / furthest ghost extends past the resting position during travel.

## See also

`kinetic-beat-slam` (streak as one beat's entrance) · `center-outward-expansion` (grid streak-in) · `scale-swap-transition` (same-footprint morph — not an arrival) · `nudge-curve` (the whip sweep's position half) · `3d-camera-flight` / `viewport-change` (the carve-out's wrappers).
