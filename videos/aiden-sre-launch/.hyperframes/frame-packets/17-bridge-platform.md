# Frame packet: 17-bridge-platform

## Project inputs

- Project: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
- Design tokens: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch/frame.md
- RULES_DIR: /Users/swami/.cursor/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 17 — AIDEN WORLD MODEL

- scene: A5 world-model atmosphere: layers of light records; eyebrow AIDEN WORLD MODEL.
- duration: 3.359s
- transition_in: cut
- status: outline
- voiceover: ""
- src: compositions/frames/17-bridge-platform.html
- blueprint: camera-journey (Adapt)
- rules: ambient-glow-bloom, 3d-camera-flight

A5 world-model atmosphere: layers of light records; eyebrow AIDEN WORLD MODEL.

Components: none (film-only frame)
Generated video: A5 (assets/el-video/<id>.mp4, head-trimmed)
Cues (local seconds): AIDEN WORLD MODEL @ 0.0s
Hits (local seconds): scene-platform @ 0.0s
SFX: sub-swell
Counter: none

## Selected blueprint: camera-journey

# camera-journey — Camera Journey

**intent**: The real viewport camera is the STORYTELLER — a multi-leg journey (dive in → a mid-journey beat fires → travel to the consequence / reposition → landing push, at rest) across ONE continuous world, where the travel itself carries the narrative. Two folded sub-shapes: **(A) action roundtrip** — the camera dives into a UI panel, a cursor/typed action fires, and the camera swoops/pans to another region where the consequence renders as element motion; **(B) cursorless flight** — pure cinematic 3D flight (motion blur, depth-of-field, tilt-to-flatten rotations) over static or self-animating content, no cursor anywhere.

**boundary**: This is NOT `cursor-ui-demo` — there the camera _chases_ the cursor (a servo following the actor); here the camera IS the actor, moving on its own narrative motivation, and in sub-shape A the cursor acts only at the leg hinge (in B it never appears). This is NOT `device-surface-showcase` — there one DEVICE/surface is hero and the camera merely presents it; here no single surface is hero — the journey traverses multiple regions/panels/depth planes and the traversal is the story. This is NOT `spatial-pan-stations` — there pre-placed stations on a flat canvas are visited by repeated pans of the same type; here the legs are heterogeneous (push-in, swoop, pull-back-rotate, whip, dive) and each leg is _motivated_ (by a fired action, or by the reveal it lands on).

**roles served**

- Benefits (from `camera-swoop-panel-action-roundtrip`): when the benefit IS a cause→effect round trip — "do this small thing here, get this big thing there" (comment → chart morphs; agent finding → verified commit; chat message → receipt + ledger). The camera physically connects the action to its payoff, so the viewer _travels_ the value chain instead of being told it.
- Key_Feature (from `cursorless-camera-flight`): when the feature should feel cinematic and inevitable — a payout form or a generated content-plan calendar explored by a flying camera (dives, whip sweeps, tilt-to-flatten, violent final push onto the CTA/hero card), the content acting by itself (a dropdown self-selects; keyword cards simply exist in depth) with no hand on the wheel.

**duration**: 5.6–11.1s (sub-shape A 5.6–9.0s: 001 5.6s · 066 8.6s · 004 9.0s; sub-shape B 6.3–11.1s: Outrank 6.3s · 094 11.1s)

**shot structure** (one oversized `[world]` — a `[UI canvas: design tool / GitHub + agent panels / phone + desktop ledger]` (A) or a `[3D-laid-out space: floating form card / calendar grid with standing keyword cards]` (B) — wrapped by a single virtual camera; content animates as elements _inside_ the world while the camera travels; every leg is a sequential tween on the same camera state)

- **Scene 0 (optional, 0.0–~1.8s) — static prologue.** Camera locked on a `[prologue beat: static promo card with a floating 3D product card / typed headline with an accent word / wide establishing shot of the app]`. A typewriter line may finish (`[headline]` types on, accent word in `[accent color]`). The prologue BREAKS by a hard cut or by the headline shrinking and slipping away as the first dive begins — the stillness exists to make the journey's launch land.

- **Scene 1 (~0.5–2.0s) — LEG 1: dive in.** The camera pushes in FAST and TIGHT onto `[the focal element]`:
  - _Sub-shape A_: a flat whole-viewport push onto `[an actionable element: comment box / agent panel / chat bubble]` where `[typed text]` finishes typing or `[response text]` streams in. The header/context leaves the frame — commitment, not a polite zoom.
  - _Sub-shape B_: the push lands at an ANGLE — a tilted 3D close-up of `[the form region / the calendar grid]`, foreground elements motion-blurred during the travel, neighbors soft under depth-of-field. A huge `[foreground prop: date number / field label]` may dominate the frame, blurred by speed.

- **Scene 2 (~1.5–6.0s) — LEG 2: the mid-journey beat (the hinge).** The camera holds, drifts, or pulls slowly while the content ACTS:
  - _Sub-shape A — the action fires_: a `[cursor]` clicks `[Send / Create PR]` (or a `[message]` sends implicitly) and the acted element CLEARS/vanishes. Optional theater before the click: a `[status spinner]` cycles `[status words]`, `[to-do items]` strike through, `[response text]` streams. The click is the hinge that _motivates_ the next leg.
  - _Sub-shape B — the content self-acts_: a `[dropdown]` expands by itself (pushing `[the field below]` down), shows a `[row hover highlight]` with no cursor, and collapses with the new value selected; OR the flight decelerates INTO FOCUS on `[one card]` — its `[metrics]` sharp, neighboring cards blurred.

- **Scene 3 (~4.0–8.0s) — LEG 3: travel to the consequence / reposition.**
  - _Sub-shape A_: the camera pulls back / swoops / pans to `[region B]` while the CONSEQUENCE builds as element motion — `[bars shrink into the baseline while a node-dotted line draws left→right / a verified commit row slides into the timeline + a reaction pill pops / a receipt card expands row-by-row from a skeleton]`. An optional SECOND leg extends the trip: `[pan up-right to a toolbar → a dropdown cascades open / match cut into an extreme close-up → a fast decelerating zoom-out reveals a ledger table]`.
  - _Sub-shape B_: a repositioning move — a slow pull-back that ROTATES the world flat and centered (3D → straight-on 2D), or a heavily motion-blurred WHIP SWEEP that resolves into a flat lateral pan across `[a month calendar / the full card]`. On the flat hold, quiet element beats may play: a thin `[focus outline]` fades in around one `[field]` and sweeps down to the next; the card keeps a near-imperceptible tilt/scale drift so the hold never dies.

- **Scene 4 (final ~1–2s) — LEG 4: landing.** The journey resolves on the payoff:
  - _Sub-shape A_: the camera comes to REST; the `[cursor]` hovers or drifts toward `[the payoff: an open Export menu item / the commit link / the View-transaction button]`; ends still, on the changed state — the world is visibly different from where the trip began.
  - _Sub-shape B_: a sudden VIOLENT push-in/dive (motion-blurred) onto `[the CTA button scaled huge in frame / the hero keyword card]`, ending holding tight — or holding MID-DIVE (the last frames are still traveling; the flat overview is explicitly not the final image).

**motion vocabulary**: whole-viewport camera push-in (fast/tight and slow/subtle); camera pull-back reframe; camera pan up/right/down; dive/swoop between stacked panels; fast decelerating zoom-out to rest; sudden violent push-in onto a button scaled huge; continuous 3D flight through a card grid; dive into an angled 3D close-up; slow pull-back that rotates/flattens the world to straight-on; heavily motion-blurred whip sweep; motion blur on camera travel; depth-of-field with blurred neighbors; decelerate-into-focus; hard cut / match cut into extreme close-up; near-imperceptible tilt/scale drift on holds; typed text finishing in an input; typewriter headline; headline shrinks and slips away as the camera dives; streaming AI response text; status-word spinner cycling labels; to-do strikethrough draw; cursor click; clicked element clears/vanishes; dropdown cascades open / self-expands and collapses with a row hover highlight (displacing the field below); bar-to-line chart morph (bars shrink into the baseline while a node-dotted line draws left→right, labels persist); commit row slide-in on a timeline; reaction pill appears; skeleton→content card build; receipt/label rows expand row-by-row; thin focus outline fades in and sweeps between fields; camera drift toward a button; 3D card subtle float; cursor hover at rest.

**rule mapping**

- the multi-leg camera itself — sequential push / pull-back / pan / dive phases on one wrapper, plus the micro-drift that keeps holds alive → `multi-phase-camera` (phase sequencing + drift) over `viewport-change` (the base virtual-camera primitive: single `.world` wrapper, one `cam {scale,x,y}` state — one source of truth for every leg)
- diving TIGHT onto an off-center element (comment box, chat bubble, Send button, one keyword card) → `coordinate-target-zoom` (scale + counter-translate; measure the target, don't hand-derive — a journey amplifies centering error on every leg)
- fast decelerating zoom-out from an extreme close-up to rest (066's ledger reveal) → `coordinate-target-zoom` zoom-out variation / `multi-phase-camera` (pull phase, hard `power4.out`)
- motion blur on camera travel (dive, whip sweep, violent final push) → `motion-blur-streak` (Camera-travel carve-out — the blur envelope rides the `.world` wrapper during a leg: the world never leaves frame, the blur peaks at peak velocity and resolves sharp at each landing)
- depth-of-field on neighbors while one card is in focus; decelerate-into-focus → `depth-of-field-blur` (focal pull + blur-the-cluster-while-pushing-in are explicitly in scope; run the DoF tween at the same position as the camera leg)
- the 3D flight itself (sub-shape B's core) — a perspective camera traveling with `rotateX/rotateY/translateZ` through a 3D-laid-out world: the dive into an angled calendar grid, the tilt-to-flatten pull-back (angled 3D → straight-on 2D), the continuous flight between standing cards → `3d-camera-flight` (perspective wrapper + preserve-3d; the 2D camera rules keep owning any flat legs)
- whip sweep → composition: `nudge-curve` (burst-dominant tuning of the slow-fast-slow slide, applied to the world) + `motion-blur-streak` (camera-travel carve-out) on the same window
- typed text finishing in an input; typewriter headline; streaming AI response text; status spinner cycling `[status words]`; skeleton→content state swap → `discrete-text-sequence` (+ `gsap-effects` typewriter; `context-sensitive-cursor` for the input caret)
- which content appears per leg / receipt rows and findings arriving on script windows → `dynamic-content-sequencing`
- cursor click on `[Send / Create PR]` (sub-shape A's hinge) → `cursor-click-ripple` + `press-release-spring` (or `physics-press-reaction` for a weightier press)
- clicked element clears/vanishes; panel state A → B on the return leg → `scale-swap-transition` / `card-morph-anchor`
- to-do strikethrough draw; row hover highlight → `css-marker-patterns` (strike-through) · `asr-keyword-glow` (accent glow on the hovered/selected row)
- bar-to-line chart morph → composite, decomposes cleanly: `stat-bars-and-fills` (bars `scaleY` → baseline) + `svg-path-draw` (node-dotted line draws left→right) at the same timeline position — no single rule names the coordinated chart-type morph, but no new rule needed
- commit row slide-in; reaction pill appears; receipt rows expand row-by-row → `spring-pop-entrance` (single arrivals) / `waterfall-entry` (the row-by-row cascade)
- dropdown self-expands, displacing the field below (094) → `anchored-layout-expand` (the masked edge-anchored expansion of the dropdown body — never tween `height`) + `reactive-displacement` (the expansion tween drives the sibling's displacement)
- focus-ring travel between fields (094: a thin outline fades in on `From`, then sweeps down onto `Amount`) → `ai-tracking-box` restyled as a plain outline (offsets baked at setup; size morphed via scale, never width/height)
- 3D card subtle float; near-imperceptible tilt/scale drift on holds → `sine-wave-loop` (+ `multi-phase-camera`'s drift for the camera-side micro-motion; the _tilt_ component of the drift belongs to `3d-camera-flight`)
- camera drift toward a button; slow subtle zoom-ins riding a hold → `multi-phase-camera` (steady-push mode, tiny spread)

**camera grammar** (the defining layer — this blueprint IS its camera): every leg is a tween on ONE camera state (`viewport-change`'s single `.world` wrapper / `cam` object), sequenced by `multi-phase-camera`, aimed by `coordinate-target-zoom`. Legs must be _motivated_: sub-shape A moves because an action fired (click → swoop to the consequence); sub-shape B moves because the next reveal demands it (dive → focus → reposition → final dive). Vary the leg verbs — a journey of four identical pushes reads as a slideshow. Ease law: hard `out`-family on dives and landings (`power4.out` — violent arrival, sharp settle), `power2.inOut` on repositioning legs; spring/back easing on a camera feels wrong (per `multi-phase-camera`). Sub-shape B layers `3d-camera-flight`'s perspective wrapper under the same single-state discipline.

**Seek-safety (non-negotiable for this much camera):** the entire journey — every leg, every blur envelope, every DoF pull — lives on the ONE paused GSAP timeline, so any frame seek reproduces the exact mid-leg camera pose. One camera state object, transform composed in a single writer (`applyCamera()`), no CSS `transition` anywhere near the wrapper, blur via proxy-tweened attributes / `--dof` vars (both seek-safe), and ending mid-dive is fine — a seek to the last frame just lands mid-tween. Per-leg targets are measured ONCE at setup (after `fonts.ready`) and baked; never `getBoundingClientRect` in `onUpdate`.

**Overflow (required for a clean `check`):** a traveling camera deliberately moves world content past the frame edges on every leg. Keep `overflow: hidden` on the scene root AND mark the moving `.world` wrapper with `data-layout-allow-overflow` — otherwise `check` reports `text_box_overflow` / `container_overflow` for every panel the journey leaves behind (see the same note on `device-surface-showcase`).

## Selected motion rule: ambient-glow-bloom

---
name: ambient-glow-bloom
description: Un-triggered soft radial glow that blooms in behind a hero element and holds with a bounded idle breathe, or a single-pass traveling sweep across a surface. No click, no word-sync — it just blooms. Finite, deterministic, seek-safe.
metadata:
  tags: glow, bloom, ambient, radial, sweep, hero, presence, finite, un-triggered
---

# Ambient Glow Bloom

A soft radial glow that **blooms in behind a hero element** (card, logo, metric) and holds, giving it presence. Unlike `press-release-spring`'s click-triggered burst or `asr-keyword-glow`'s word-timed envelope, this glow is **un-triggered** — it blooms on the hero's settle and stays lit. Two forms: a **hero bloom** that swells behind a settling element then breathes, and a **traveling sweep** that translates a soft highlight across a surface exactly once.

## How It Works

A radial-gradient layer sits **behind** the hero (glow `z-index: 1`, hero `z-index: 2` — a glow in front occludes it), starting at `opacity: 0`. Over the bloom-in window it ramps `opacity: 0 → peak` with a gentle `scale` swell, timed so `BLOOM_START + BLOOM_DUR` lands on the hero's settle — glow and hero resolve as ONE beat ("powering on"), never glow-then-card. After bloom-in:

1. **Hero bloom** — a **bounded idle breathe** during the hold: a finite `ease: "none"` tween advances a `phase` proxy and `onUpdate` nudges opacity + scale a hair around peak (never a `yoyo` loop). `sin(0) = 0` → the breathe starts exactly at the bloom's resting state.
2. **Traveling sweep** — a narrow highlight band at one edge translates **once** across to the other (`x` off-surface to off-surface), clipped to the surface (`overflow: hidden`). One pass, no return — a repeating sweep reads as a loading shimmer, not a reveal accent (the shimmer-sweep variation below is the sanctioned exception).

Peak opacity stays restrained (**≤ 0.45 hard ceiling**) so the glow gives presence without washing the frame; the glow color is **darker + more saturated** than the element it backs (a same-hue, same-lightness glow disappears into the surface).

## Recipe

```html
<!-- inside a standard scene clip -->
<div class="bloom-stage">
  <div class="bloom-glow" id="bloom-glow"></div>
  <!-- z-index: 1; inset: GLOW_INSET (negative); background: {glowGradient} -->
  <div class="hero-card" id="hero-card">{HeroLabel}</div>
  <!-- z-index: 2 -->
</div>
<!-- sweep form: <div class="sweep" id="sweep"> inside the overflow:hidden surface -->
```

```js
// ── Form A: HERO BLOOM ── bloom in soft, landing on the hero's settle.
tl.fromTo(
  "#bloom-glow",
  { opacity: 0, scale: GLOW_START_SCALE },
  { opacity: GLOW_PEAK_OPACITY, scale: 1, duration: BLOOM_DUR, ease: "power2.out" },
  BLOOM_START,
);
// Bounded breathe during the hold — finite phase tween, NOT a yoyo loop.
const glow = document.getElementById("bloom-glow");
const phase = { p: 0 };
tl.to(
  phase,
  {
    p: Math.PI * 2 * BREATHE_CYCLES,
    duration: BREATHE_DUR,
    ease: "none",
    onUpdate: () => {
      const s = Math.sin(phase.p);
      glow.style.opacity = String(GLOW_PEAK_OPACITY + s * OPACITY_AMP);
      glow.style.transform = `scale(${1 + s * SCALE_AMP})`;
    },
  },
  BLOOM_START + BLOOM_DUR,
);

// ── Form B: TRAVELING SWEEP ── one finite pass, constant glide.
tl.fromTo(
  "#sweep",
  { x: SWEEP_START_X, opacity: 0 },
  { x: SWEEP_END_X, opacity: SWEEP_PEAK_OPACITY, duration: SWEEP_DUR, ease: "none" },
  SWEEP_START,
);
tl.to("#sweep", { opacity: 0, duration: SWEEP_FADE_DUR, ease: "power1.in" }, SWEEP_FADE_START);
```

## Variations

- **Bloom-and-hold** — for scenes <3s or a hero with its own idle, skip the breathe: the single `fromTo` is the whole recipe.
- **Pulse-on-arrival** — bloom slightly PAST peak (`GLOW_OVERSHOOT_OPACITY`, `scale: 1.06`), then a second adjacent tween eases down to a steady hold — one breath punctuating the landing, no ongoing loop.
- **Multi-hero relay** — stagger per-glow `BLOOM_START` by ~0.15–0.3s across a row; shrink `OPACITY_AMP` / `SCALE_AMP` per the `/√N` rule below.
- **Diagonal raked sweep** — angle `{sweepGradient}` (~105°) across a wordmark: the classic one-pass logo sheen. Narrower `SWEEP_WIDTH`, higher `SWEEP_PEAK_OPACITY`.

### Shimmer sweep (text-clipped status-phrase working-state)

The sweep re-aimed **inside type**: a soft highlight gradient clipped into a status phrase ("Thinking…", "Analyzing dataset…") via `background-clip: text` travels left→right through the letterforms — the grey-on-grey shimmer that says _still working_. Unlike every other form here it legitimately **repeats while the status is live**: the repetition is diegetic working-state, not idle wobble (same defense as a blinking caret — the motion performs status). Two things keep it honest: it is **bounded** (one finite tween whose pass count is computed from the status window, never `repeat: -1`), and it is **killed at resolve** — the moment the status completes, the shimmer stops dead; a shimmer surviving into the answer beat turns a working indicator into decoration.

```js
// Status shimmer — N passes as ONE bounded tween. Killed at resolve.
const status = document.getElementById("status-phrase");
// CSS on #status-phrase: background: {shimmerGradient}; background-size: 300% 100%;
// -webkit-background-clip: text; background-clip: text; color: transparent;
const shimmer = { p: 0 };
const PASSES = Math.round(STATUS_DUR / PASS_PERIOD); // whole passes, computed up front
tl.to(
  shimmer,
  {
    p: PASSES,
    duration: STATUS_DUR,
    ease: "none",
    onUpdate: () => {
      const t = shimmer.p % 1; // 0→1 within each pass; percent axis inverted → left→right travel
      status.style.backgroundPosition = `${(1 - t) * 100}% 50%`;
    },
  },
  STATUS_START,
);
tl.set(status, { backgroundPosition: "100% 50%" }, STATUS_START + STATUS_DUR); // resolve: dead.
```

Keep it a whisper: `{shimmerGradient}` is the status text's own grey with one slightly-lighter band (highlight stop a step above the base, nothing near white); `background-size` ~300% keeps the band narrow in the glyphs; `PASS_PERIOD` 1.2–1.8s — slower reads as a sheen accent, faster as a spinner. Whole-number `PASSES` lands the band at its start position exactly at the kill frame, so the `tl.set` is visually a no-op. This is the working-state cousin of `gradient-text-sweep`: reach **here** when the sweep _means_ "in progress," **there** when the gradient is the typographic treatment itself.

## Values

| token                   | range / default                                        | notes                                                                      |
| ----------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| GLOW_PEAK_OPACITY       | 0.15 (subtle) → 0.30 (default) → **0.45 hard ceiling** | higher washes the frame; a glow you consciously notice is too strong       |
| GLOW_INSET              | −200 to −450px (1920×1080)                             | negative so the halo extends past the hero; too small reads as a tight rim |
| GLOW_START_SCALE        | 0.80–1.0                                               | ≤1.0 — grow into place, never shrink                                       |
| BLOOM_DUR / BLOOM_START | 0.6–1.4s                                               | `BLOOM_START + BLOOM_DUR` ≈ the hero's settle frame                        |
| OPACITY_AMP / SCALE_AMP | 0.02–0.05 / 0.01–0.03 default                          | `PEAK + OPACITY_AMP ≤ 0.45`; push only when the glow is the sole motion    |
| BREATHE_CYCLES          | period 2.5–4s per breath                               | glow breathes slower than element breathing                                |
| SWEEP_WIDTH             | 15–35% of surface (grid) / 8–15% (wordmark)            |                                                                            |
| SWEEP_DUR               | 0.8–1.6s                                               | one deliberate pass — slow enough to read as light                         |
| SWEEP_PEAK_OPACITY      | 0.10 → 0.25 (default) → 0.40                           | same ≤ ~0.45 wash limit; tight sweeps tolerate the high end                |
| SWEEP_START_X / END_X   | fully off-surface both ends                            | no visible spawn/despawn mid-surface; fade reaches 0 as the band clears    |
| PASS_PERIOD (shimmer)   | 1.2–1.8s                                               | with whole-number PASSES                                                   |

## Critical Constraints

- **Glow peak opacity ≤ 0.45** — including breathe amplitude; default to the LOW end (0.15–0.30).
- **Glow behind, hero in front**; glow color darker + more saturated than the hero surface.
- **Land glow and hero as one beat** — before or after reads as two separate events.
- **Breathe is bounded, sweep is one pass** — the only sanctioned repetition is the shimmer sweep, bounded and killed at resolve.
- **Concurrent halos compound** — per-glow amps ≤ default `/√N`, stagger breathe periods (2.6s / 2.9s / 3.3s) so they don't pulse in lockstep.
- **Don't combine a `boxShadow` glow on the hero with this halo layer** — they compete and read muddy; the glow lives on the dedicated layer.

## See also

`sine-wave-loop` (hero breathes on scale/y while the glow breathes on opacity, out of phase) · `press-release-spring` (the click-triggered sibling — never both behind one element) · `counting-dynamic-scale` / `stat-bars-and-fills` (bloom behind a landing stat) · `center-outward-expansion` (sweep across the assembled grid) · `gradient-text-sweep` (the design-beat gradient counterpart).

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
