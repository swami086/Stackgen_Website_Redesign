# Frame packet: 06-triage-groups

## Project inputs

- Project: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
- Design tokens: /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch/frame.md
- RULES_DIR: /Users/swami/.cursor/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 6 — Aiden triages

- scene: Punch-in; noise rows collapse and grey; related rows FLIP into groups; list re-sorts by impact; callout chips 
- duration: 8.325s
- transition_in: cut
- status: outline
- voiceover: "Aiden triages every alert as it arrives. It groups related alerts, filters the noise, and ranks the rest by impact on your services."
- src: compositions/frames/06-triage-groups.html
- blueprint: panel-edit-live-sync (Adapt)
- rules: card-morph-anchor, anchored-layout-expand, stat-bars-and-fills, coordinate-target-zoom

Punch-in; noise rows collapse and grey; related rows FLIP into groups; list re-sorts by impact; callout chips land on their words.

Components: compositions/components/01-alert-triage
Generated video: none (assets/el-video/<id>.mp4, head-trimmed)
Cues (local seconds): Correlated @ 2.89s; de-duplicated @ 4.32s; ranked by service impact @ 5.63s
Hits (local seconds): none
SFX: ui-click, soft-tick
Counter: [1284, 1284]

## Selected blueprint: panel-edit-live-sync

# panel-edit-live-sync — Panel Edit, Live Sync

**intent**: A bipartite stage — an inspector/editor **panel bound to a target surface** — where a cursor (or text caret) continuously manipulates a control (value scrub, unit/codegen dropdown pick, knob or easing-handle drag, inline retype) and the coupled surface updates **live, in the same beat**: the page button rotates as the value scrubs, preview icons resize per keystroke, the hex readout mirrors every hover, the code block converts on the pick. The motion IS the causality — one gesture, two surfaces changing in the same frame. The camera's job is co-visibility of the couple, not a chase.

**provenance** (7 mined Key_Feature goldens across 4 products, both dialects — three sync modes):

- _Write-sync (control → target)_ — the anchor mode: a visual-editor panel scrubs rotation/margin/padding while the live page button rotates and shifts in the same beat (plus unit + font-weight dropdown picks); an inline `className` retype in a glowing code callout resizes the preview icons per keystroke (caret-as-actor, push-in/pull-back roundtrip that must keep BOTH surfaces in frame); a motion editor drags a knob along a dotted motion path and bends easing handles into an S-curve, paying off with a big zoom-out where the finished toggle PERFORMS the edited ease (deferred payoff).
- _Read-sync (target → panel mirror)_: clicking a page button pops a toolbar → "Copy code" → the code editor fills with the element's CSS under one continuous slow zoom-out; hovering palette swatches live-updates a footer hex readout while the grid scrolls.
- _Self-conversion (panel is both control and target)_: unit dropdown conversions inside a 3D-tilted spacing panel snap-convert values in place (rem→px→%, `0,375 rem` → `6 px` → `4,871 %`); a codegen dropdown picks SwiftUI and the CSS block crossfades into SwiftUI under a rapid punch-in.

> **Concentration caveat**: 4 of 7 members are one video (CSS Scan Pro 2.0). The COUPLING engine is independently attested by 3 more products across 3 more videos and both dialects (Figma Dev Mode, Figma motion editor, bolt.new), each on a different surface pair — page+inspector, canvas+timeline+easing panel, IDE code+app preview — so the shape is real, not one film's house style. What IS CSS-Scan-Pro house style (marked optional below): the dark-slate capability title-card prelude, the oversized black cursor with white outline, the green success-checkmark flip, flash tooltips. Trigger is product-conditional: reach for this shape when the feature itself is live editing/inspection.

**roles served**

- Key_Feature (from `panel-edit-live-sync`, all 7 cases): one capability demonstrated as 2–4 edit beats on a single bound element — each beat a continuous manipulation the coupled surface answers in real time, resolving on the last edit held, a zoom-out to the finished product performing the edit, or a callout landing on the result. Three sub-shapes fold in:
  - **(A) write-sync** — cursor/caret edits a control; the TARGET transforms live (rotate/shift/stretch/resize/re-animate).
  - **(B) read-sync** — cursor selects/hovers the target; the PANEL readout mirrors live (CSS streams in, hex footer updates).
  - **(C) self-conversion** — the edit transforms the panel's own readout (units snap-convert, CSS crossfades to SwiftUI).

**duration**: 5.3–11.9s (read-sync hover demos shortest ~5.3s; multi-beat scrub/edit runs 8.7–11.9s)

**shot structure** (a `[target surface — webpage / design canvas / IDE + live preview]` sharing the frame with a `[bound panel — floating inspector / docked code panel / timeline + easing editor]`; a `[cursor or caret]` is the actor; every beat pairs ONE manipulation gesture with a SIMULTANEOUS response on the coupled surface; selection chrome declares which element is bound; camera ranges locked → active but always preserves the couple)

- **Scene 0 (optional, 0.0–2.0s) — capability title card.** Solid dark `[slate/charcoal]` card; a single white line names the capability (`"Edit CSS visually"`, `"Auto measurement units conversion"`, `"Check color palettes"`) — fades/drifts in, holds, then a HARD CUT or a fast motion-blurred zoom-out that settles the stage. (CSS-Scan-Pro-house-leaning; 071/017/080 open cold on the stage, 071 instead springs a giant lowercase `[verb word]` over the preview.)

- **Scene 1 (~1–3s) — the couple establishes.** The `[target surface]` arrives with the `[bound panel]` docked, floating in subtle 3D tilt, or SLIDING IN from an edge. Selection chrome pops on to declare the binding: `[bounding box + corner handles / red dashed inspection guides / redline measurement chips popping sequentially / green class-name header]`. The cursor enters and glides to the first control.

- **Scene 2..N (~2s each) — edit beats, gesture + mirror in the same frame (the engine).** Each beat is ONE continuous manipulation and its live answer:
  - _Variant — write-sync (A)_: the cursor CLICK-AND-DRAGS a numeric field (value counts up/down: `0°→-10°`, `0→38 px`) while the target `[button/element]` rotates/shifts/stretches in real time; OR drags a `[knob along a dotted motion path / easing handle bending the curve, coords readout updating]`; OR a caret INLINE-RETYPES a value (`1xl→4xl→2xl`) inside a `[glowing magnifier callout]` while `[preview elements]` resize per keystroke. A flash `[tooltip]` may name the gesture.
  - _Variant — read-sync (B)_: the cursor CLICKS/HOVERS the target element — a `[floating toolbar]` springs up above it, a menu pick fires (`Copy code` → icon flips to a green checkmark) and the `[code editor]` fills with streaming CSS; or hovered `[swatches]` outline and the `[footer hex]` updates instantly per hover as the grid scrolls.
  - _Variant — self-conversion (C)_: the cursor clicks a unit/codegen `[dropdown]` — it opens with hover-highlighted rows + checkmark — and on the pick the readout SNAP-CONVERTS in place (`rem→px`, value recalculates) or the whole `[code block]` crossfades to the new language, heading flipping (`Layout`→`HStack`).
  - Camera per beat: LOCKED wide holding both surfaces; or a PUNCH-IN to the acting surface (panel scroll reveals the next section) — but during a write-sync edit both gesture and mirror stay co-visible (071's law: the push-in never crops the preview out).

- **Scene N (final beat → end) — the edit proves out, HOLD.** Resolution diverges:
  - _Variant — last edit held_: the final pick lands (`100 - Thin` selected, `4,871 %` applied) and the state simply HOLDS — never end on the tooltip with the dropdown unopened.
  - _Variant — payoff zoom-out_: a big zoom-out reveals the finished product PERFORMING the edited parameter — the toggle slides with the new ease inside the full phone mockup, confetti drifting; or the pull-back returns to the identical full framing while a `[terminal]` appends an hmr line.
  - _Variant — callout lands_: a large `[arrow callout]` slides in pointing at the result / the export menu rests open under the cursor; frame drifts subtly outward.

**signature move**: the **live-sync couple** — a scrubbed/typed/dragged control and its bound surface changing simultaneously, in-frame together, every edit beat.

**motion vocabulary**: click-and-drag value scrubbing with live target sync (rotate / shift / stretch); per-keystroke live preview resize; inline retype with backspace + blinking caret; instant value snap-conversion; live hex/readout mirror on hover; unit/codegen dropdown with hover-highlight rows + checkmark, instant open/close; font-weight/dropdown row pick; knob drag along a dotted motion path with waypoints; easing-handle drag bending the curve (coords readout updating); playhead scrub; redline measurement chips popping sequentially; bounding box + corner handles; red dashed inspection guides; floating toolbar springs up above the selected element; code panel slides in from an edge; in-panel scroll to a new section; swatch-grid scroll; syntax-highlighted code streams/pastes in; code crossfade (CSS→SwiftUI) with heading flip; glowing magnifier callout over a code token; icon flips to green success checkmark; flash tooltip naming the gesture; oversized black cursor with white outline; grab-cursor drag; dark title-card prelude + hard cut; fast motion-blurred zoom-out settle; ONE continuous slow zoom-out spanning a demo shot; eased push-in → hold → eased pull-back roundtrip; quick punch-in to panel/timeline/code; subtle 3D tilt drift/parallax on a floating panel; big zoom-out to the product payoff; result element re-animates with the edited ease; confetti drift; terminal log append; large arrow callout slide-in; static hold.

**rule mapping**

- cursor glide to a control, presses, click feedback → `cursor-click-ripple`
- cursor state flips pointer↔grab over a scrubbable field / draggable handle → `context-sensitive-cursor`
- scrubbed numeric readout counts up/down under the drag → `counting-dynamic-scale`
- **the live-sync couple itself** (control gesture drives a second element's property in the same beat) → `control-target-sync` (concurrent tweens at the SAME timeline position — readout tween + target transform tween sharing one label)
- inline retype with backspace, typos, holds / keystroke thresholds → `discrete-text-sequence` (+ `context-sensitive-cursor` for the caret blink)
- per-keystroke preview resize → `discrete-text-sequence` (keystroke state thresholds) + `control-target-sync` (the coupled scale steps)
- instant value snap-conversion / hex readout swap / heading flip (`Layout`→`HStack`) / status text → `discrete-text-sequence`
- syntax-highlighted code streaming/pasting in, terminal log append → `discrete-text-sequence` (bulk additions are explicitly in-scope)
- dropdown/menu pops open; floating toolbar springs up; tooltip flash; redline chips pop sequentially (staggered, ≤500ms) → `spring-pop-entrance`
- dropdown row hover-highlight stepping and pick sequencing / which edit beat shows what → `dynamic-content-sequencing`
- dashed inspection guides / selection outline draw on → `svg-path-draw`; dotted motion path with waypoints → `svg-path-draw` (the path display)
- knob TRAVEL along the motion path → path following — see `hyperframes-keyframes` (paths)
- easing-handle drag bending the curve (SVG `d` interpolation) → SVG path morph — see `hyperframes-keyframes` (morph; `svg-path-draw` only draws strokes, it cannot morph a path); coords readout beside it → `discrete-text-sequence`
- glowing magnifier callout over a code token (incl. the live enlarged duplicate of a UI token) → composition: `ambient-glow-bloom` (the glow) + `spring-pop-entrance` (the callout pop)
- code panel slides in from an edge / panel docks → `card-morph-anchor` / `scale-swap-transition` (per cursor-ui-demo precedent for panel slide-in)
- code block crossfade CSS→SwiftUI; success-icon flip to green checkmark → `scale-swap-transition` (state swap at the same anchor)
- in-panel scroll / swatch-grid scroll (masked internal translate) → `gsap-effects`; on a 3D-tilted panel → `3d-page-scroll` (tilted plane w/ internal scroll)
- subtle 3D tilt drift/parallax on the floating panel; continuous micro-drift on holds → `multi-phase-camera` (micro-drift phase)
- punch-in to panel/timeline/code and settle → `coordinate-target-zoom` + `multi-phase-camera`
- eased push-in → hold → eased pull-back roundtrip (co-visibility preserved) → `multi-phase-camera` (pull-back / focus / push sequencing)
- ONE continuous slow zoom-out spanning the demo shot; big zoom-out to the product payoff → `viewport-change` (single `.world` composite transform)
- fast motion-blurred zoom-out settle transition → `motion-blur-streak` + `viewport-change`
- result element re-animates with the edited ease (toggle slides with the new S-curve) → `gsap-effects` (custom-ease tween on the payoff element)
- confetti drift on the payoff → `particle-burst` (deterministic confetti) + `sine-wave-loop` (bounded drift)
- large arrow callout slide-in + hold → `gsap-effects` (single slide tween)
- dark title-card prelude (capability line fades/drifts in, hard cut out) → cross-blueprint: `titlecard-reveal` territory; the drift/fade itself → `gsap-effects` — EXIT-N/A as a mapped rule here
- hard cuts between title and demo; final static hold → EXIT-N/A (transition registry / no rule needed)

**camera modifier**: The camera law is the INVERSE of cursor-ui-demo's chase: it serves **co-visibility of the couple**. Three attested postures — (1) LOCKED: fixed framing for the whole demo, panel + target both in frame, all motion element-level (CSS_39.0, CSS_102.8 after settle); (2) ONE CONTINUOUS MOVE: a single slow zoom-out (or drift) spanning the entire demo shot while edits fire inside it (CSS_10.9, CSS_63.5's tilt-drift) → `viewport-change`; (3) PUNCH-AND-RETURN: eased push-in onto the acting surface, tight hold through the edit, eased pull-back to the identical opening framing (071_bolt, 080_figma, 017_figma) → `multi-phase-camera` + `coordinate-target-zoom` — with the hard constraint that during a write-sync edit the mirror surface is never cropped out. If the camera is chasing the cursor target-to-target with per-beat state swaps, you're in `cursor-ui-demo`, not here.

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

## Selected motion rule: anchored-layout-expand

---
name: anchored-layout-expand
description: Edge-pinned container grows (or collapses) along ONE axis and in-flow content reflows with it — a pill springs open downward into a dropdown, a panel grows a sub-task stack, an input card stretches as typed text wraps, a pane expands over a neighbor. Transform-only (mask + slide, or proxy-driven scaleY + counter-scale) because width/height tweens are forbidden; the push on subsequent content is a matched translate on the same tween.
metadata:
  tags: expand, collapse, anchored, dropdown, menu, accordion, panel, reflow, push, mask, counter-scale, layout
---

# Anchored Layout Expand

> The law: **author the layout at its final (expanded) state in CSS, then fake the collapsed state with transforms.** The container never changes size — the _visible_ region does — and everything downstream rides a matched translate. The browser computes layout ONCE; every intermediate frame is pure transform.

THE one-axis growth primitive: a container pinned at one edge appears to grow along a single axis, and the in-flow content after it moves in perfect contact with the traveling edge — dropdown, sub-task stack, growing composer card, pane widening over a neighbor. Growth and push are ONE motion: if the panel's bottom edge and the pushed content ever separate or overlap, the illusion dies.

Distinct from [card-morph-anchor.md](card-morph-anchor.md) (a free-floating two-shot morph with no neighbors to push — this rule's container is a live layout participant), [spring-pop-entrance.md](spring-pop-entrance.md) (arrival at a point, no edge travel or reflow), and [reactive-displacement.md](reactive-displacement.md) (displacement by a colliding intruder; here content moves because the container's edge reached it — layout causality, not collision).

## How It Works

1. **Mask** — a wrapper at the final body height (`BODY_H`), `overflow: hidden`. Never tweened.
2. **Sheet** — the panel surface + content inside the mask, starting at `y: -BODY_H` (tucked above the mask window, behind the pinned header).
3. **Below** — ONE wrapper holding everything after the container, also starting at `y: -BODY_H`.
4. **Grow** — ONE `fromTo` drives sheet AND below from `y: -BODY_H → 0`. Shared tween ⇒ the descending bottom edge and the pushed content stay in exact contact by construction. Collapse = the same pair tweened back.

When the surface must visibly **stretch in place** (rows revealed top-first, or a pane growing sideways), use the proxy counter-scale variant below instead.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="stack">
  <div class="expander">
    <div class="expander-head">{headerLabel}</div>
    <div class="expand-mask" id="expand-mask" data-layout-allow-overflow>
      <div class="expand-sheet" id="expand-sheet">
        <div class="expand-row">{rowA}</div>
        <div class="expand-row">{rowB}</div>
      </div>
    </div>
  </div>
  <!-- EVERYTHING that must be pushed lives in this one wrapper -->
  <div class="below" id="below">{followingContent}</div>
</div>
```

```css
/* Layout is the EXPANDED end state — no collapsed geometry exists in CSS. */
.expander-head {
  position: relative;
  z-index: 2; /* the sheet slides out from UNDER the header */
}
.expand-mask {
  height: BODY_H; /* authored final height — NEVER tweened */
  overflow: hidden;
}
.expand-sheet {
  height: BODY_H;
  border-radius: 0 0 SHEET_RADIUS SHEET_RADIUS; /* bottom-only — header + sheet read as one grown card */
  will-change: transform; /* + on .below */
}
```

```js
// BODY_H must equal the mask's CSS height exactly — measure once at build.
// (Montage caveat: per the contract, in a multi-scene master use an authored
// CSS-matched constant instead — later clips may not be laid out yet.)
const BODY_H = document.querySelector("#expand-mask").offsetHeight;

// The grow: ONE tween, BOTH sides of the seam.
tl.fromTo(
  ["#expand-sheet", "#below"],
  { y: -BODY_H },
  { y: 0, duration: GROW_DUR, ease: GROW_EASE },
  GROW_AT,
);

// Garnish: rows already ride the sheet; the fade stagger makes them read as "options arriving".
tl.fromTo(
  ".expand-row",
  { opacity: 0 },
  { opacity: 1, duration: ROW_FADE_DUR, stagger: ROW_STAGGER, ease: "power2.out" },
  GROW_AT + GROW_DUR * 0.25,
);

// Collapse — same machinery back; faster (closing is a snap decision).
tl.fromTo(
  ["#expand-sheet", "#below"],
  { y: 0 },
  { y: -BODY_H, duration: COLLAPSE_DUR, ease: "power3.in", immediateRender: false },
  COLLAPSE_AT,
);
```

## Variations

- **Proxy counter-scale — surface stretches in place** (rows revealed top-first holding their screen positions; the "payload card expands from the tool-call line"). Drive mask `scaleY` and the sheet's exact inverse from ONE proxy — two independent tweens are wrong: eased midpoints of `s` and `1/s` are not inverses and the content squashes mid-grow. Net content scale is `s × 1/s = 1` every frame; seek-safe because everything derives from the one interpolated proxy.

  ```js
  const grow = { h: COLLAPSED_H }; // 0 for fully collapsed
  tl.fromTo(
    grow,
    { h: COLLAPSED_H },
    {
      h: BODY_H,
      duration: GROW_DUR,
      ease: GROW_EASE,
      onUpdate: () => {
        const s = Math.max(grow.h / BODY_H, 0.0001); // clamp: no divide-by-zero
        gsap.set("#expand-mask", { scaleY: s, transformOrigin: "50% 0%" });
        gsap.set("#expand-sheet", { scaleY: 1 / s, transformOrigin: "50% 0%" });
        gsap.set("#below", { y: grow.h - BODY_H });
      },
    },
    GROW_AT,
  );
  ```

- **One-axis pane expand (X)**: same machinery rotated 90° — pin the left edge, sheet from `x: -PANE_W` (or proxy `scaleX` + counter-scale, origin `0% 50%`). Decide the neighbor's fate explicitly: **overlap** (pane paints over it, no neighbor tween) or **push** (neighbor rides the same tween). Never both.
- **Typed-wrap growth** — the composer card gets taller as typed text wraps. Quantize: one short step per wrap boundary, each moving the pair by one `LINE_H`; wrap times come from the deterministic typing schedule ([discrete-text-sequence.md](discrete-text-sequence.md)), never measured at render time. Two battle-tested traps:
  - **Composer cards have no pinned header** — a composer grows from its TOP edge (the send-button footer stays put), so a plain y-step clips the card's top out of the mask. Combine the proxy counter-scale with the wrap quantization (step the proxy by `LINE_H` at each wrap time) and split the surface into a **sheet** (carries the top radius) + **footer** (carries the bottom radius) so the growth seam stays invisible.
  - **Wrap TIME vs wrap POSITION are two different authorities** — the typing schedule decides _when_ a wrap fires, the browser's line-breaking decides _where_ text actually wraps, and with proportional fonts they silently disagree. Author an explicit `\n` in the typed string (with `white-space: pre-wrap`) at the chosen split point so both derive from the same authored fact.
- **Springy open** (rare, explicitly-playful): `back.out(1.2)` — the edge overshoots a few px; the pushed content bounces with the panel (correct — they're in contact). Default stays `power3.out`.
- **Row grows a sub-task stack**: the row is the pinned header, the stack is the sheet, every later row lives in `#below`; chain several scopes for progressive disclosure.
- **FLIP hand-off**: if the container also TRAVELS to a new layout slot while resizing (prompt promoted to heading, card docking into a sidebar), that's a FLIP problem — `/hyperframes-keyframes` (FLIP recipes). This rule stays the in-place one-axis specialist.

## Values

| token                    | range                       | notes                                                                 |
| ------------------------ | --------------------------- | --------------------------------------------------------------------- |
| BODY_H                   | measured / authored         | drift from the CSS height = visible gap or overlap at full open       |
| GROW_AT                  | trigger beat + 0–0.1s       | growth needs a cause (click / wrap / status beat) or it reads haunted |
| GROW_DUR                 | 0.35–0.6s                   | below ~0.3s the pushed content appears to teleport                    |
| GROW_EASE                | `power3.out` default        | `back.out(1.1–1.3)` only for the playful register                     |
| ROW_STAGGER / \_FADE_DUR | 0.04–0.08s / 0.2–0.3s       | start rows ~25% into the grow so none flash inside a closed panel     |
| COLLAPSE_DUR             | 0.2–0.35s, `power3.in`      | faster than open                                                      |
| STEP_DUR / LINE_H        | 0.12–0.2s / CSS line-height | typed-wrap variant; WRAP_TIMES from the typing script                 |

## Critical Constraints

- **NEVER tween `width` / `height` / `top` / `left` / `margin` / `padding`** — the mask's height is a CSS constant; only its children transform. Tweening the mask IS the forbidden move this rule replaces.
- **`data-layout-allow-overflow` on the mask** — the collapsed phase parks the sheet outside the mask's box by construction, which trips the `hyperframes check` layout gate (`container_overflow`). The flag is the sanctioned waiver: this overflow is the technique working as designed, not a bug.
- **Sheet + below share one tween (or one proxy)** — matched-but-separate tweens on the two sides of the contact edge are the classic seam bug.
- **Everything downstream rides `#below`** — content outside the wrapper is overlapped at t=0 and orphaned during the grow.
- **`overflow: hidden` on the mask** — without it the tucked sheet is visible above the header at t=0.
- **Counter-scale needs a proxy**, clamped `s ≥ 0.0001` (a fully-collapsed body divides by zero).
- **Deterministic sizes** — `BODY_H`, `LINE_H`, `WRAP_TIMES` are build-time constants or one-time measurements, never per-frame layout reads.

## See also

`cursor-click-ripple` (the igniting click) · `spring-pop-entrance` (richer per-row arrivals) · `discrete-text-sequence` (the typing that drives stepped growth) · `scale-swap-transition` (the grown menu's exit) · `/hyperframes-keyframes` FLIP (grow + travel).

## Selected motion rule: stat-bars-and-fills

---
name: stat-bars-and-fills
description: Data-viz primitives that pair a number with a graphic — growth bars (CSS scaleY stagger), a progress fill (bar or ring), and a partial star-rating wipe. Seek-safe, deterministic.
metadata:
  tags: data, stats, chart, bars, progress, ring, stars, rating, infographic, number
---

# Stat Bars & Fills

The graphics that give a stat **visual weight** beside its number: a small bar chart, a progress bar/ring filling to a percentage, or a star row filling to a fractional rating. Pair these with [counting-dynamic-scale.md](counting-dynamic-scale.md) (the number) for a complete stat scene.

**Layout blueprint — pick ONE and hold it across all stats:**

- **Single-focus** — one centered frame, the number is the hero, a ring or bar sits under/around it. Cleanest for a sequential reveal (stat 1 → stat 2 → stat 3 in the same frame).
- **Split-frame** — big number on the left, paired graphic on the right. Better when stats are shown together or each needs a distinct visual.

Don't mix blueprints between stats in one piece — that reads as inconsistent.

## Recipe

### 1 — Growth Bars (CSS `scaleY` stagger)

Bars grow from the baseline with a stagger; the last bar is the accent. Heights are authored in CSS (inline height per bar); GSAP only reveals `scaleY: 0 → 1` — never animate `height`.

```css
.bars {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  height: 280px;
}
.bar {
  width: 48px;
  background: #3a4a64;
  transform: scaleY(0);
  transform-origin: bottom center; /* grow UP from the baseline, not from center */
}
.bar:last-child {
  background: #ffc300; /* accent the final/current bar */
}
```

```js
tl.to(".bar", { scaleY: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.3);
```

### 2 — Progress Fill

**Bar form** — `scaleX` from a left origin:

```css
.track {
  width: 520px;
  height: 16px;
  background: #1b263b;
  border-radius: 8px;
  overflow: hidden;
}
/* width:100% is REQUIRED — an absolutely-positioned fill with no width is 0px, and scaleX of 0 is
   still 0 → the bar renders invisible (automated gates may miss a zero-width scaled element). */
.fill {
  width: 100%;
  height: 100%;
  background: #ffc300;
  transform: scaleX(0);
  transform-origin: left center;
}
```

```js
const PCT = 0.92; // 92%
tl.to(".fill", { scaleX: PCT, duration: 1.0, ease: "power2.out" }, 0.3);
```

**Ring form** — measured stroke draw (mechanics in [svg-path-draw.md](svg-path-draw.md)):

```js
const ring = document.querySelector("#ring");
const LEN = ring.getTotalLength(); // measure, don't hard-code the circumference
ring.style.strokeDasharray = LEN;
ring.style.strokeDashoffset = LEN; // empty
// rotate the <circle> -90deg in CSS so the fill starts at 12 o'clock
tl.to(ring, { strokeDashoffset: LEN * (1 - 0.92), duration: 1.1, ease: "power2.out" }, 0.3);
```

### 3 — Star-Rating Fill (fractional)

A gold star row revealed left-to-right to a fractional value (e.g. 4.6 / 5) via a clip wipe over a gold layer sitting on a gray layer.

```html
<div class="stars">
  <div class="stars-gray">★★★★★</div>
  <div class="stars-gold" id="goldStars">★★★★★</div>
</div>
```

```css
.stars {
  position: relative;
  font-size: 64px;
  letter-spacing: 8px;
}
.stars-gray {
  color: #2b3548;
}
.stars-gold {
  position: absolute;
  inset: 0;
  color: #ffc300;
  width: 100%;
  clip-path: inset(0 100% 0 0);
}
```

```js
const RATING = 4.6,
  MAX = 5;
tl.to(
  "#goldStars",
  { clipPath: `inset(0 ${100 - (RATING / MAX) * 100}% 0 0)`, duration: 1.0, ease: "power2.out" },
  0.3,
);
```

## Values

| token         | range       | notes                                                                               |
| ------------- | ----------- | ----------------------------------------------------------------------------------- |
| bar count     | 4–6         | reads as "a trend" without clutter; the last bar is the current/accent value        |
| fill duration | 0.8–1.2s    | matched to the paired count-up so number and graphic land together (share the ease) |
| stagger       | 0.06–0.1s   | larger feels sluggish, 0 loses the build                                            |
| accent hue    | exactly one | bars/fill/stars all use the same accent, the rest is muted                          |

## Critical Constraints

- **`scaleY` / `scaleX` / `clipPath`, never `height`/`width` tweens** — author each bar's final height in CSS and scale from 0.
- **`transform-origin`** must be `bottom` (bars grow up) / `left` (fills grow right) — the default center origin scales from the middle and looks wrong.
- **`.fill` needs `width: 100%`** — a zero-width fill scaled by any factor is still invisible, and automated gates may miss it.
- **Measure, don't hard-code** — ring length via `getTotalLength()`; a hard-coded circumference breaks if the radius changes.
- **Match the number's timing** — the fill and the count-up peak together (same start + ease) so the stat resolves as one beat, not two; a paired counter's `onUpdate` must be O(1) (see [counting-dynamic-scale.md](counting-dynamic-scale.md)).
- **One accent hue, consistent blueprint** — see `hyperframes-creative/references/data-in-motion.md`.

## See also

`counting-dynamic-scale` (the number beside the graphic — same ease/duration) · `svg-path-draw` (progress-ring draw mechanics) · `hyperframes-creative/references/data-in-motion.md` (stat layout + visual weight).

## Selected motion rule: coordinate-target-zoom

---
name: coordinate-target-zoom
description: Zoom into a specific non-centered element by combining scale with counter-translation — target ends at viewport center after the zoom completes.
metadata:
  tags: camera, zoom, scale, translate, target, off-center, focus
---

# Coordinate Target Zoom

A simple `scale > 1` on a wrapper pushes off-center content OFF the visible canvas. To zoom _into_ a specific non-centered element, apply scale AND an inverse translation in lockstep so the target lands at viewport center.

## How It Works

Two nested wrappers, separated concerns — never scale and translate on the SAME element (`translate * scale` ≠ `scale * translate` in CSS transform composition):

1. **Outer wrapper** applies `scale` (the zoom) around `transform-origin: 50% 50%`
2. **Inner wrapper** applies `translate(x, y)` (the counter-shift)

The counter-translate is the **negation** of the target's offset from viewport center:

```
T = -offset
```

Derivation: the inner translate moves the target to `offset + T` in pre-scale units; the outer scale S (around center) maps that to `S × (offset + T)`; landing at center means `S × (offset + T) = 0` → **`T = -offset`**. The formula does NOT depend on S — the translate is identical at 1.5×, 2×, or 3×. A common wrong intuition is `T = -offset × (S - 1)`: it coincidentally matches at S = 2 and is wrong at every other scale.

⚠️ **This is the NESTED-wrapper formula.** The single-wrapper camera in [viewport-change.md](viewport-change.md) puts `translate(x,y) scale(S)` on ONE element, where CSS applies scale first — there the counter-translate is **`T = -offset × S`**. The two formulas are not interchangeable; match the formula to the wrapper structure.

## Getting the offset

`T = -offset` is only as good as `offset`. The #1 way this pattern ships broken is hand-computing `offset` from a layout formula, getting the **sign** or magnitude wrong, and letting the zoom amplify a small error off-screen. **Default to measuring the target's real laid-out center; reserve the formula for symmetric rows.**

**Default — measure the actual center (works for ANY layout).** Immune to sign errors because it reads the rendered DOM, not a mental model:

```js
await document.fonts.ready; // metrics final; fallback fonts are 10–30px off → tens of px after a 3×+ zoom
const W = 1920,
  H = 1080;
const r = document.getElementById("target-card").getBoundingClientRect();
const TARGET_OFFSET_X = r.left + r.width / 2 - W / 2;
const TARGET_OFFSET_Y = r.top + r.height / 2 - H / 2;
```

Measure **once at setup** and bake — never per-frame in `onUpdate`. Because the measurement is async (`fonts.ready`), build and register the timeline inside the same `async` setup so the baked offset is ready before `window.__timelines[id]` is published.

**Shortcut — symmetric equal-width row ONLY:**

```js
const index_offset = targetIndex - (N - 1) / 2;
const TARGET_OFFSET_X = index_offset * (CARD_WIDTH + CARD_GAP);
```

⚠️ This assumes every sibling is the **same width**. The moment the row is asymmetric, it gives the wrong answer — often the wrong **sign**: the heavier side shifts the centered target the _opposite_ way you'd guess (e.g. `companion(220) + gap + wordmark + gap + chip(110)` puts the wordmark ~55px **right** of center, but "chip − companion" intuition says left). For anything but equal cards, **measure**.

**Headroom budget — cap the scale from the measured size.** A zoom multiplies any centering error; keep the target ≤ ~88% of the canvas at peak:

```js
const maxScale = Math.min((0.88 * W) / r.width, (0.88 * H) / r.height);
const ZOOM_SCALE = Math.min(DESIRED_SCALE, maxScale);
```

A target filling 97%+ of the frame reads as cut-off the instant its center is slightly off — and a hand-baked offset always is. (The perception gate flags this as `primary-offscreen`; `data-layout-allow-overflow` does **not** exempt it.)

## Recipe

```html
<div class="zoom-outer" id="zoom-outer">
  <div class="zoom-inner" id="zoom-inner">
    <div class="content">
      <div class="card">{other}</div>
      <div class="card target" id="target-card">{target}</div>
      <div class="card">{other}</div>
    </div>
  </div>
</div>
```

```css
.scene {
  overflow: hidden; /* REQUIRED — at zoom > 1 the scaled content leaks past the frame */
}
.zoom-outer {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transform-origin: 50% 50%; /* center scaling is what the counter-translate math assumes */
  will-change: transform;
}
.zoom-inner {
  display: grid;
  place-items: center;
  will-change: transform;
}
```

```js
// TARGET_OFFSET_X/Y and ZOOM_SCALE come from "Getting the offset" — measured
// at setup (after fonts.ready), baked. Counter-translation = -offset.
const counterX = -TARGET_OFFSET_X;
const counterY = -TARGET_OFFSET_Y;

// Scale and counter-translate MUST share position, duration, AND ease —
// otherwise the target visibly wanders mid-zoom.
tl.to("#zoom-outer", { scale: ZOOM_SCALE, duration: ZOOM_DUR, ease: "power3.inOut" }, ZOOM_AT);
tl.to(
  "#zoom-inner",
  { x: counterX, y: counterY, duration: ZOOM_DUR, ease: "power3.inOut" },
  ZOOM_AT,
);
```

## Variations

- **Zoom out (target → wide view)**: reverse the phases — start zoomed-in, then tween to `scale: 1` + `x: 0, y: 0`; the "reveal" beat is the panorama.
- **Multi-target zoom sequence**: chain zooms (target A → pause → target B → pull back); each segment needs its own counter-translation pair.

## Values

| token      | range                                   | notes                                                                                      |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| ZOOM_SCALE | 1.5× modest → 3× dominant → 5×+ extreme | cap via the headroom budget; raster media needs `sourceResolution ≥ rendered × ZOOM_SCALE` |
| ZOOM_DUR   | 1.0–2.0s                                | under 0.8s feels like a teleport, over 2.5s drags; both tweens share it                    |
| ZOOM_AT    | after the layout lands + 0.5–1.5s       | give the viewer time to scan the layout before the camera commits                          |
| DWELL      | ≥ 1.0s after the zoom settles           | 1.5–2s ideal — the viewer must be able to read the target (climax dwell)                   |

## Critical Constraints

- **Outer scales, inner translates** — never both transforms on one element; nested wrappers keep the math clean.
- **`transform-origin: 50% 50%` on the outer wrapper** — non-center origin breaks the counter-translate derivation.
- **`overflow: hidden` on the scene root** — zoomed content leaks past the frame otherwise.
- **Scale and counter-translate share duration + ease** at the same timeline position, or the target drifts mid-zoom.
- **Offset measured once at setup** (after `fonts.ready`), baked — never recomputed per-frame, never hand-derived for a non-symmetric layout (wrong sign → target shoved off-frame).
- **Scale within the headroom budget** — target ≤ ~88% of the canvas at peak, derived from the measured size.

## See also

[viewport-change.md](viewport-change.md) (single-wrapper form, `T = -offset × S`) · [multi-phase-camera.md](multi-phase-camera.md) (a zoom phase inside a phased camera) · [sine-wave-loop.md](sine-wave-loop.md) (idle breathing after the zoom settles) · [discrete-text-sequence.md](discrete-text-sequence.md) (text assembly in the target before the zoom).
