# Frame packet: 01-cold-open

## Project inputs

- Project: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
- Design tokens: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch/frame.md
- RULES_DIR: /Users/swami/.cursor/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 1 — Cold open

- scene: Ink stage; A1 alert-storm footage; ribbons wake; first coral pings spark; corner counter fades in and climbs 0
- duration: 4.412s
- transition_in: cut
- status: outline
- voiceover: ""
- src: compositions/frames/01-cold-open.html
- blueprint: overwhelm-surround (Adapt)
- rules: particle-burst, ambient-glow-bloom, vertical-spring-ticker

Ink stage; A1 alert-storm footage; ribbons wake; first coral pings spark; corner counter fades in and climbs 0 to 212.

Components: none (film-only frame)
Generated video: A1 (assets/el-video/<id>.mp4, head-trimmed)
Cues (local seconds): none
Hits (local seconds): none
SFX: sub-swell, alert-ping, room-tone
Counter: [0, 212]

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

## Selected motion rule: particle-burst

---
name: particle-burst
description: Deterministic particle / confetti events — a confetti pop that bursts up and drifts down (optionally instant-shrinking away), a dot burst from behind text, or a glyph dissolving to particles. Every particle's state is a pure ballistic function of timeline time from index-seeded values, so a scrub to any t shows the correct mid-flight frame.
metadata:
  tags: particles, confetti, burst, dissolve, celebration, ballistic, deterministic, punctuation
---

# Particle Burst

Discrete flying particles as a one-shot event: a **confetti pop** that erupts upward and drifts back down on gravity, a **dot burst** radiating from behind a landing word, or a **glyph dissolve** where text breaks into particles that scatter and die. Particles are ephemeral garnish — born from a beat, fly, gone; they never become layout.

Boundaries: [css-marker-patterns.md](css-marker-patterns.md)'s burst mode is radiating **drawn lines** — a static accent, no flight. [press-release-spring.md](press-release-spring.md)'s release burst is **one blurred radial layer** faking an explosion — enough when a single glow pop will do. [center-outward-expansion.md](center-outward-expansion.md) moves **real layout elements** to final resting slots; particles have no destination, only physics and a death.

## How It Works

The whole event is **one driver tween and one formula**:

1. **Seeded setup** — a fixed pool of `PARTICLE_COUNT` small divs is created once at composition setup (a deterministic loop — setup-time generation is fine; per-frame DOM creation is not). Each particle `i` derives everything from a pure hash:

   ```js
   // angle, speed, size, spin, color (palette[i % palette.length]) — all from prand(i * k)
   const prand = (n) => {
     const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
     return x - Math.floor(x); // 0..1, pure function of n
   };
   ```

2. **Ballistic formula** — a proxy tween advances `T: 0 → 1` over `FLIGHT_DUR` with `ease: "none"`; `onUpdate` positions every particle as a **pure function of T**:

   ```
   x(T) = vx · T·FLIGHT_DUR
   y(T) = vy · T·FLIGHT_DUR + ½ · G · (T·FLIGHT_DUR)²
   rot(T) = spin · T·FLIGHT_DUR
   ```

   Gravity `G` supplies the rise-decelerate-fall arc for free. Because position is computed from `T` (never accumulated per frame), a seek to any moment renders the exact mid-flight state — this is what makes DOM particles seek-safe. The driver's `ease: "none"` is load-bearing: the physics lives in the formula; an eased driver warps gravity and the arc stops reading as thrown objects.

3. **Death** — an opacity tail inside the same formula (fade over the last `FADE_FRAC` of flight), or the confetti signature: a separate **instant-shrink** tween scaling the pool to 0 in a blink at flight end. Either way the particles end invisible and stay invisible.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="burst-stage">
  <div class="particle-field" id="particle-field"></div>
  <div class="burst-hero" id="burst-hero">{heroWord}</div>
</div>
```

```css
/* .burst-stage: position: relative; display: grid; place-items: center.
   .burst-hero: z-index: 2 — particles fly BEHIND the word. */
.particle-field {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%; /* the launch origin — offset to taste (e.g. the word's baseline) */
  width: 0;
  height: 0;
}
.particle {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 2px; /* confetti chip; 50% for dots */
  opacity: 0; /* invisible until the event fires */
  will-change: transform, opacity;
}
```

```js
// Setup: deterministic pool, generated ONCE.
const field = document.getElementById("particle-field");
const palette = ["{accentA}", "{accentB}", "{accentC}"]; // 3-5 brand tokens
const parts = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const el = document.createElement("div");
  el.className = "particle";
  const size = SIZE_MIN + prand(i * 3 + 1) * (SIZE_MAX - SIZE_MIN);
  el.style.width = `${size}px`;
  el.style.height = `${size * 0.7}px`; // slightly oblong = confetti chip
  el.style.background = palette[i % palette.length];
  field.appendChild(el);
  // Index-seeded launch parameters — the particle's whole life, fixed here.
  const angle = -Math.PI / 2 + (prand(i * 5 + 2) * 2 - 1) * CONE; // upward cone
  const speed = SPEED_MIN + prand(i * 7 + 3) * (SPEED_MAX - SPEED_MIN);
  parts.push({
    el,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed, // negative = up
    spin: (prand(i * 11 + 4) * 2 - 1) * SPIN_MAX,
  });
}

// Confetti pop — one driver, pure ballistic formula.
const drive = { T: 0 };
tl.fromTo(
  drive,
  { T: 0 },
  {
    T: 1,
    duration: FLIGHT_DUR,
    ease: "none", // physics lives in the formula, not the ease
    onUpdate: () => {
      const t = drive.T * FLIGHT_DUR; // seconds of flight — pure function of T
      const fade = Math.min(1, (1 - drive.T) / FADE_FRAC); // opacity tail
      parts.forEach((p) => {
        const x = p.vx * t;
        const y = p.vy * t + 0.5 * G * t * t; // rise, stall, drift down
        p.el.style.transform = `translate(${x}px, ${y}px) rotate(${p.spin * t}deg)`;
        p.el.style.opacity = String(drive.T === 0 ? 0 : fade); // T===0 guard covers seeks before the event
      });
    },
  },
  BURST_AT,
);
```

## Variations

- **Confetti pop, then instant-shrink** — the playful signature: full burst, gravity drift, then every chip scales to 0 in a blink: `FADE_FRAC` near 0, plus `tl.to(".particle", { scale: 0, duration: SHRINK_DUR, ease: "power2.in" }, BURST_AT + FLIGHT_DUR - SHRINK_DUR)` with `SHRINK_DUR` 0.15–0.25s. Keep the whole event tiny relative to the subject — a garnish measured in a few dozen pixels, not a screen-filling cannon.
- **Dot burst behind a landing word** — radial instead of a cone: `angle = prand(i) * Math.PI * 2`, `G` near 0, short flight (0.4–0.7s), round dots (`border-radius: 50%`), pool z-indexed behind the word. Fire at the word's settle frame.
- **Glyph dissolve** — seed each particle's **origin** across the glyph block's box (`ox = (prand(i*13) - 0.5) * BLOCK_W`, same for `oy`, added inside the transform), gentle outward drift with low `G`; text fades out over the first ~30% of flight while particles fade in from its silhouette. Color every particle `{textColor}` so the swarm reads as the text's own material. (True per-pixel dissolves are Canvas-2D territory — `techniques.md`; this DOM version sells it up to ~40 particles.)
- **Two-stage burst (pop + stragglers)** — split the pool: 70% on the main driver, 30% on a second driver ~0.12s later with lower speeds; the split is index-derived (`i % 10 < 3`). Same formula, two windows.

## Values

| token                 | range                                        | notes                                                                           |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- | --- | ----------------------- |
| PARTICLE_COUNT        | 10–18 pop/dots; 24–40 dissolve               | **cap ~40** — per-frame style writes; past that, seek perf and register degrade |
| G                     | 900–1600 px/s² confetti; 0–200 dots/dissolve | natural fall vs drift                                                           |
| SPEED_MIN / SPEED_MAX | 250–700 px/s                                 | per-particle via `prand`, never uniform                                         |
| CONE                  | 0.35–0.8 rad (~20–45°)                       | wider = splash, narrower = fountain                                             |
| FLIGHT_DUR            | 0.7–1.4s                                     | arc should peak ~35–45% of flight: check `                                      | vy  | / G ≈ 0.4 × FLIGHT_DUR` |
| SIZE_MIN / SIZE_MAX   | 5–14px chips; 4–8px dots                     | on a 1080p frame                                                                |
| SPIN_MAX              | 180–720 deg/s confetti; 0 dots               | tumble                                                                          |
| FADE_FRAC             | 0.2–0.35                                     | near 0 when using instant-shrink                                                |
| BURST_AT              | on a cause                                   | the word's settle, a click, a lockup completing — an uncaused burst is noise    |

## Critical Constraints

- **Position is a pure function of time, driver ease `"none"`** — `x(T)`, `y(T)`, `rot(T)` computed from the driver value every frame, never accumulated (`+=`) per tick (accumulation breaks the moment the renderer seeks); gravity is the ease — an eased driver bends the parabola.
- **Fixed pool, no per-frame DOM** — all particles exist after setup with `opacity: 0`; the event only writes `transform` / `opacity`. **`PARTICLE_COUNT ≤ ~40`** — per-frame style writes scale linearly; keep the event cheap.
- **Particles start AND end at `opacity: 0`** — the `drive.T === 0` guard covers seeks to before the event; the tail/shrink covers after. A chip frozen mid-air at driver end is a bug every subsequent frame.
- **Particles are punctuation** — one event per beat, fired on a cause, small relative to the subject, dead before the next beat; z-ordered behind or around the word it celebrates, never over it. A persistent particle system is a background, and that's not this rule.

## See also

`spring-pop-entrance` (confetti fires on the hero's settle frame) · `kinetic-beat-slam` (one beat earns the confetti payoff) · `press-release-spring` (single-layer glow alternative, or compose both) · `css-marker-patterns` (drawn-line burst when the accent should feel hand-annotated) · `scale-swap-transition` (glyph dissolve covers the exit).

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

## Selected motion rule: vertical-spring-ticker

---
name: vertical-spring-ticker
description: Slot-machine style vertical scrolling using additive spring physics within a masked container — each spring contributes one "step" of scroll.
metadata:
  tags: text, ticker, spring, scroll, vertical, slot-machine, sequence
---

# Vertical Spring Ticker (Slot Machine)

Multiple spring tweens are ADDED TOGETHER to produce total Y translation — each spring contributes one discrete "step", so instead of a single linear scroll you get the slot-machine "click click click" rhythm with natural settling. Distinct from a continuous marquee: this rule's semantics are discrete steps that land; for endless linear motion see [sine-wave-loop.md](sine-wave-loop.md).

## How It Works

A masked window of fixed height `ITEM_HEIGHT` (`overflow: hidden`) holds a vertical stack of items, each exactly `ITEM_HEIGHT` tall. Each spring holds a 0→1 progress; a shared `onUpdate` sums them and applies `translateY(-sum × ITEM_HEIGHT)`. Springs fire sequentially with overlap (`STEP_SPACING ≤ STEP_DUR`), so each step snaps in while the previous is still settling — that overlap is what makes them additive, and the `back.out` overshoot is what makes each step read as a "click".

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="ticker" id="ticker">
  <div class="stack-inner" id="stack-inner">
    <div class="item">{item0}</div>
    <div class="item">{item1}</div>
    <div class="item">{itemN}</div>
  </div>
</div>
```

```css
.ticker {
  width: TICKER_WIDTH;
  height: ITEM_HEIGHT; /* MUST match .item height exactly */
  overflow: hidden; /* the mask is the window */
}
.stack-inner {
  display: flex;
  flex-direction: column; /* mandatory — vertical stacking */
}
.item {
  height: ITEM_HEIGHT; /* MUST equal .ticker height */
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-variant-numeric: tabular-nums; — for numeric tickers */
}
```

```js
const innerEl = document.getElementById("stack-inner");
const springs = Array.from({ length: STEPS }, () => ({ p: 0 }));

function applyTransform() {
  const sumP = springs.reduce((acc, s) => acc + s.p, 0);
  innerEl.style.transform = `translateY(${-sumP * ITEM_HEIGHT}px)`;
}
applyTransform(); // initial state

springs.forEach((spring, i) => {
  tl.to(
    spring,
    {
      p: 1,
      duration: STEP_DUR,
      ease: `back.out(${BOUNCE_FACTOR})`,
      onUpdate: applyTransform,
    },
    STEP_START + i * STEP_SPACING,
  );
});
```

## Variations

- **Numeric ticker (price / counter rolling)** — items are the digit sequence; run the same spring-step pattern per decimal position. `font-variant-numeric: tabular-nums` required.
- **Reverse direction (countdown)** — flip the sign (`translateY(${sumP * ITEM_HEIGHT}px)`) and arrange items in reverse order.
- **Pause between groups** — several fast steps (small `STEP_SPACING`), a long pause, then one dramatic final step with a bigger `BOUNCE_FACTOR`. The pause is where the eye locks in.
- **Continuous infinite ticker** — NOT this rule (this rule is discrete steps); a looping news ticker is a single linear tween with duplicated items — see [sine-wave-loop.md](sine-wave-loop.md) for continuous-motion semantics.

## Values

| token         | range                 | notes                                                                                 |
| ------------- | --------------------- | ------------------------------------------------------------------------------------- |
| ITEM_HEIGHT   | ~`fontSize × 1.25`    | must hold capital descenders; `.ticker` height MUST equal it exactly                  |
| TICKER_WIDTH  | 30–60% viewport width | wide enough for the longest item without ellipsis                                     |
| STEPS         | 1–4                   | number of transitions, not items; `STEPS ≤ itemCount − 1`                             |
| STEP_DUR      | 0.3–0.7s              | under 0.3 the overshoot is invisible; over 0.7 the click reads as a slide             |
| STEP_SPACING  | 0.3–0.5s              | **≤ STEP_DUR** so springs overlap (additive); wider gaps read as a lazy linear scroll |
| BOUNCE_FACTOR | 1.4–2.5               | 1.4 gentle click / 2.0 firm / 2.5+ casino spin-and-land for a climax step             |

Reference: `../examples/proof-logo-chain.html` (204px, 1 step, 0.45s).

## Critical Constraints

- **Container height = item height, pixel-exact, all items equal** — mismatches show partial item edges above/below the mask and accumulate drift across steps.
- **`overflow: hidden` on the container, not the inner stack**; `flex-direction: column` on the stack.
- **Sum the springs in `onUpdate` — never tween the final position directly.** Each spring contributing its OWN snap is the slot-machine pacing.
- **Overlap steps and keep `back.out` per step** — non-overlapping steps or an out-only ease collapse into a linear scroll.
- **Never update items via `innerHTML` between steps** — the ticker moves the SAME items via translate; swapping content shows the previous item AS the new one (broken illusion).
- **Climax dwell ≥1s after the final step** (SKILL universal constraint).
- **`tabular-nums` for numeric tickers** — variable digit widths break alignment.

## See also

`reactive-displacement` (ticker pushed by an incoming element) · `scale-swap-transition` (ticker scales out after settling) · `press-release-spring` (button press triggers the spin).
