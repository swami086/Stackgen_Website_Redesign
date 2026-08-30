# Design: Motion + Visual Refine of the Home Replica

**Date:** 2026-08-29
**Status:** Approved by user (all forking decisions locked below)
**Supersedes for visual/motion concerns:** `2026-08-29-cyfsl-lexrf-dual-theme-replica-design.md` (that spec's pixel-parity-with-canvas rule is explicitly retired)
**Skill path:** using-superpowers -> brainstorming -> high-end-visual-design + impeccable (animate) + design-taste-frontend -> writing-plans

## Locked decisions

| Decision | Choice |
|---|---|
| Diagram strategy | Rebuild **all four** diagrams as live animated SVG/DOM. No PNGs. |
| Source of truth | **Web leads.** Pencil is the static reference for layout and tokens only. |
| Motion ceiling | **Awwwards-tier**: pinned scroll, scrubbed assembly, canvas substrate, kinetic type. |
| Scope | **Motion AND visual language** (typography, hero composition, materiality, layout variety). |
| Device budget | **Desktop-first** full choreography; below `lg` gracefully reduced. |
| Dependencies | GSAP + ScrollTrigger, Lenis, canvas 2D substrate. `motion@13` already present. |
| Hero | **Asymmetric split** with kinetic word-mask reveal. |
| Typography | **Geist** (display + body) + **JetBrains Mono** (retained mono register). |
| Delivery | Parallel waves, one subagent per diagram, `composer-2.5-fast`. |
| `RBepL` treatment | **Class A live simulation.** Seeded work-item particles, absorb-transform-emit. Never repeats. |
| `GPYOG` treatment | **Class B + C.** Isometric exploded Aiden OS stack, four layers, operable keyboard rail, constellation Context Graph. |
| Diagram interaction | Scroll-driven **and** visitor-operable (rail selection, pill hover isolation). |
| Glass | **Three tiers.** Tier 1 real `backdrop-filter` on the nav island **while over the hero substrate** plus overlays; Tier 2 specular zero-blur glass everywhere else; Tier 3 scoped radial glow for flat-background depth. Nav crossfades Tier 1 to Tier 2 on leaving the hero. |
| Background complexity | Hero dot-grid substrate only. No aurora or mesh gradient added to justify glass. |
| Browser surfaces | Themed: selection, caret, scrollbar, focus ring, underline offset, tabular numerals. |

## Design read

Reading this as: B2B AI-DevOps platform landing for technical buyers (platform engineering, SRE, DevSecOps leads), with an Awwwards-tier dark-tech kinetic language, leaning toward Tailwind v4 + Geist + Motion/GSAP scroll choreography over a canvas substrate.

**Dials:** `DESIGN_VARIANCE: 8` · `MOTION_INTENSITY: 9` · `VISUAL_DENSITY: 4`

Rationale: the brief says "go all out, don't be conservative" and names Awwwards-tier references, which pushes variance and motion high. Density stays moderate because the buyer is scanning for credibility, not consuming data.

## Research synthesis

### Reference teardown (raw HTML inspection, 2026-08-29)

| Site | Detected motion stack | Signature to borrow | Signature to avoid |
|---|---|---|---|
| harness.io | GSAP (9 refs), ScrollTrigger (2), Lottie (2), `@keyframes` (7) | Scroll-scrubbed storytelling on a small number of sections | Pre-baked Lottie diagrams (opaque, unthemeable, cannot respond to light/dark toggle) |
| linear.app | Pure CSS `@keyframes` (150), incl. `grid-dot-*` | Animated dot-grid substrate; restraint; zero JS animation library for ambient motion | Nothing; Linear is the discipline anchor |
| factory.ai | Tailwind utilities only (79 `transition-`, 18 `animate-`) | Cheap, crisp interaction-state transitions | Total absence of authored focal motion (too quiet for this brief) |

**Synthesis:** take Linear's CSS-first ambient layer, Harness's scrubbed focal sequence, and Factory's tight interaction states. Reject Lottie because our page is dual-theme and Lottie cannot re-token on theme switch.

### Glass and material research (firecrawl, 2026-08-29)

| Source | Finding | Consequence |
|---|---|---|
| NN/g, Glassmorphism: Definition and Best Practices | Glass "works best when applied on top of dynamic images or bright gradients." Also: "use both gradient strokes and gradient fills to create depth over single-color backgrounds." | Our flat background means blur is nearly invisible; the gradient-stroke technique is the sanctioned alternative and becomes Tier 2 |
| NN/g | Apple's Increase Contrast setting "replaces any glassmorphic component with a solid color" | `forced-colors` and reduced-transparency fallbacks must drop glass to opaque, not merely soften it |
| Axess Lab, Glassmorphism Meets Accessibility | Contrast ratios "often fall short of WCAG 2"; blur "may cause sensory pain"; avoid `blur(20px)` and above; do not place critical information on animated backgrounds | 24px hard cap, contrast measured post-composite, no glass over the particle field |
| StackOverflow, "Why is backdrop-filter expensive on elements containing an animation?" | `backdrop-filter` plus animated content produces "a huge amount of CPU and GPU usage in Chrome" | Tier 1 restricted to fixed surfaces with no animating children |
| MDN, `backdrop-filter` | Requires its own compositing layer | Reinforces fixed-only Tier 1 placement |

### Glass cross-check against shipped work (Mobbin, 2026-08-29)

The written guidance was verified against real sites rather than trusted. The split is total and confirms the theory:

| Site | Background behind the glass surface | Result |
|---|---|---|
| [Analogue Agency](https://mobbin.com/sites/sections/2897fc9c-97a9-48e6-9b96-ea02583b012d) | Dramatic light-ray graphic | Floating glass pill nav, rays clearly visible through it |
| [Cosmos](https://mobbin.com/sites/sections/5262f136-e0e1-4d69-bb6b-19673552612f) | Dark photography | Floating glass pill nav, reads subtly but reads |
| [T1 Energy](https://mobbin.com/sites/sections/08b1da0a-e784-4a8c-8d23-0359ff00b023) | Landscape photography | Translucent nav works |
| [mymind](https://mobbin.com/sites/sections/c2861ec1-5f2c-4915-9753-98b94e3f5fdf) | Light page plus a gradient card | Glass reads only where it overlaps the gradient |
| [MOUTHWASH Studio](https://mobbin.com/sites/sections/38d3c862-d84c-4840-9fd0-94002eaf5571) | **Flat black** | Floating pill nav renders as a **solid dark pill with a hairline**, not glass |
| [Unseen Studio](https://mobbin.com/sites/sections/64611226-7921-4e34-9001-83c7e91bd803) | **Flat dark** | No glass at all, plain text nav |
| [Craft Agency](https://mobbin.com/sites/sections/b78a24fd-b6be-438a-914c-aaddfe392990) | **Flat green** | No glass at all |
| [Linear](https://mobbin.com/sites/sections/66f59864-ae93-419b-89c9-e53fbb46a3f3) | **Flat near-black** | Zero glass, zero translucency. Hairline-separated nav plus faint large circular hairline geometry |

**Every site where glass reads as glass has photographic, gradient, or high-contrast graphic complexity behind it. Every flat-background site refuses glass and uses hairline-bordered solid surfaces instead.** Linear matters most here: it is both our discipline anchor and our closest peer, and on flat near-black it does not reach for glass at all.

This is why Tier 2 is the default rather than a fallback, and why Tier 1 is bound to the one place on our page where something is actually behind it.

**Third technique found:** [Cosmos](https://mobbin.com/sites/sections/75a25da0-1ee1-4e38-b9a2-c4d33d8a8518) places a soft radial glow halo behind its primary CTA on flat black. This is **additive light rather than refraction**, which is precisely what works on a flat background where glass cannot. Adopted as Tier 3 below.

### Mobbin patterns (web sections)

**The three classes of genuinely rich diagram.** A topology diagram with animated flow lines (the Customer.io pattern) shows the *shape* of a system and decorates it. The shape never changes, so attention is exhausted in about two seconds. Everything on Mobbin that reads as genuinely rich falls into one of three classes instead, and each of our diagrams is assigned the class that matches its message:

| Class | What it is | Why it reads as rich | Reference |
|---|---|---|---|
| **A. Simulation** | A particle or agent system that actually runs | Motion is emergent and never loops identically, so there is no point at which the eye is finished | [Wild](https://mobbin.com/sites/sections/eef9343d-0d21-41e4-9524-54462b7612db), [Squarespace](https://mobbin.com/sites/sections/c89f9f86-b4f8-4d83-ae11-71ba2fb6f5f3) |
| **B. Machined object** | A physical isometric artifact with depth and material, layers separating and reassembling | Reads as precision engineering rather than marketing art | [Rox](https://mobbin.com/sites/sections/f81fe9bd-84ae-40e5-8ddd-6a406a3442fc), [Mercury](https://mobbin.com/sites/sections/3a483a4e-ab5c-494e-9db9-c6d41660be22) |
| **C. Instrument** | A diagram the visitor operates via a layer or stage rail | Reads as a real product surface rather than an illustration of one | [Apollo](https://mobbin.com/sites/sections/2be457bf-b5b2-4b9e-a701-328688b140cc), [V7](https://mobbin.com/sites/sections/21fe2a46-81f1-47f6-8b59-ff0183825c9f) |

`Rox` deserves specific note: it is a dark isometric exploded stack labelled "Revenue OS" with a left rail reading Application / Agent Swarm / Layer / System of Context / Data Sources. That is structurally Aiden OS with the nouns changed, which makes it the single most transferable reference found.

| Reference | Pattern | Applied to |
|---|---|---|
| [Wild](https://mobbin.com/sites/sections/eef9343d-0d21-41e4-9524-54462b7612db) | Particle field morphing scattered chaos -> convergence -> ordered structure across labelled stages | `RBepL`, as a live work-item simulation |
| [Rox](https://mobbin.com/sites/sections/f81fe9bd-84ae-40e5-8ddd-6a406a3442fc) | Dark isometric exploded OS stack with a selectable layer rail | `GPYOG`, as the Aiden OS object plus its rail |
| [Claude](https://mobbin.com/sites/sections/c6697f91-aa65-4fc9-bc5c-baaed33e974d) | Knowledge graph as a sparse labelled constellation with hairline edges | `GPYOG` System of Context layer |
| [Mercury](https://mobbin.com/sites/sections/3a483a4e-ab5c-494e-9db9-c6d41660be22) | Exploded isometric layers with leader-line callouts | `GPYOG` layer labels |
| [Apollo](https://mobbin.com/sites/sections/2be457bf-b5b2-4b9e-a701-328688b140cc) | Rail selection reconfigures a live diagram beside it | `GPYOG` rail state machine |
| [Antimetal](https://mobbin.com/sites/sections/0fc15b2d-ff70-4cbe-9558-0a8043d1cc47) | Integration logos floating then settling | `hG9Ou` Integrations |
| [Railway](https://mobbin.com/sites/sections/087ce883-5976-4533-bd70-0e050800f938) | Real architecture canvas with node cards and dashed edges | `GPYOG` assembly cards |
| [Shopify Editions](https://mobbin.com/sites/sections/1a1c2145-71da-40a3-9e78-56b515a907e8) | Oversized display type with glow-framed product media | Hero type scale |
| [Customer.io](https://mobbin.com/sites/sections/6e31f38b-b744-4dbf-9369-7e7e3205c19a) | Sources -> hub -> destinations with flow lines | **Rejected as a primary pattern.** Retained only as the coordinate arrangement that the `RBepL` simulation runs on top of. |

### 21st.dev primitives (idioms to implement, not necessarily install)

| id | Component | Use |
|---|---|---|
| `919` | Animated Beam | Travelling light along connector paths between fixed anchor nodes |
| `1149` | Tracing Beam | SVG path drawing tied to scroll progress |
| `18024` | Grid Beam | Glowing beams along grid dividers (substrate reference) |
| `25275` | Stacking Cards | Pin-and-scale card stack |
| `18357` | Stagger Reveal Grid | Wave-stagger bento reveal |
| `18224` | Cinematic Logo Cloud | Staggered blur-fade logo entrance |

We implement these idioms against our own tokens rather than installing shadcn registry components, because the ui-kit rules forbid arbitrary bracket values and our components must be `data-theme` driven.

## Motion thesis

**"The Factory assembles itself."**

One metaphor governs every animation on the page. As the visitor scrolls, the DevOps factory builds itself: parts arrive, connectors draw, the operating system powers on, the context graph resolves. This is what keeps `MOTION_INTENSITY: 9` reading as authored direction rather than effect soup.

- **Focal moment:** `GPYOG`, where Aiden OS is a machined isometric object that explodes into four operable layers under scroll. The visitor drives it, and can also grab the layer rail directly.
- **Living system:** `RBepL` is the one place on the page that never repeats. A seeded simulation runs real work-items through the factory continuously while in view, so the page has a pulse rather than a set of entrance animations.
- **Continuity:** theme toggle cross-fades tokens without re-running entrance choreography or restarting the simulation.
- **Feedback:** CTA magnetic press, nav island morph, hover spotlight on bento cells, pill-isolated particle streams in `RBepL`, rail selection in `GPYOG`.
- **Budget:** exactly one pinned section (`GPYOG`), exactly one running simulation (`RBepL`), exactly one 3D scene (`GPYOG`), one canvas substrate (hero), zero marquees.

The division of labour matters: one diagram is alive and never resolves, one is a precision object that resolves completely. Making both alive would read as noise; making both static objects would read as a slide deck.

Every animation on the page must answer in one sentence what it communicates. Anything that cannot is cut.

## Motion token manifest (harvested from canvas)

The Pencil canvas already encodes motion intent in node names from the earlier animation-ready pass. These are lifted verbatim into `web/lib/motion-tokens.ts` so code and canvas cannot drift.

| Token | Value | Source node |
|---|---|---|
| `ease.emphasize` | `cubic-bezier(0.16, 1, 0.3, 1)` | `k3vas0` "fade+slide 520ms ease.emphasize", `R0IVOn` "orbit enter 520ms ease.emphasize" |
| `ease.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | `acrOa` "flow-in 180ms ease.standard", `Dsmvf` "enter 180ms ease.standard" |
| `dur.flow` | 180ms | `acrOa` Connector 1 |
| `dur.chip` | 180ms | `Dsmvf` Chip Persona Agents |
| `dur.shell` | 520ms | `k3vas0` Inner Loop Shell |
| `stagger.chip` | 40ms | `Dsmvf` -> `o4mGg` (0/40/80/120/160/200/240/280/320) |
| `stagger.orbit` | 80ms | `R0IVOn` -> `CUSuE` (0/80/160/240) |
| `stagger.shell` | 160ms | `k3vas0` (0ms) -> `eYtt6` (160ms) |
| `ambient.hub` | 2.8s pulse glow | `SqQmR` Hub Core |
| `ambient.ring` | 3s pulse scale, opacity 0.2 -> 0.55 | `UZ0dn` Orbit Ring Outer |
| `ambient.bezel` | 3.2s pulse border | `Lt9Dw` Aiden OS Bezel |
| `ambient.orbit` | 18s rotate linear | `rZ7X5` Orbit Track |

**Durations not covered by the canvas** follow the impeccable animate table: 100-150ms immediate feedback, 150-300ms routine state change, 300-500ms layout/overlay, 500-800ms authored focal entrance. Exits run faster than entrances. No bounce or elastic curves.

## Visual language deltas

### Typography

Replace Inter with **Geist**; keep **JetBrains Mono**. Both via `next/font`, self-hosted, `font-display: swap`.

| Role | Before | After |
|---|---|---|
| Display / H1 | Inter 56px bold | Geist, `tracking-tighter`, `leading-none` |
| Body | Inter | Geist |
| Mono eyebrow | JetBrains Mono | unchanged |

`--font-sans` in `globals.css` repoints from `--font-inter` to `--font-geist`. No component-level font classes change.

### Color

Accent stays violet: `#8c85ff` (dark) / `#5b4fe8` (light). This takes the explicit-brand override to the anti-AI-purple rule because violet is the actual StackGen brand, not a default reach. One accent, locked page-wide. No second accent may be introduced by any diagram.

### Materiality

Double-bezel nested architecture on every diagram shell and bento cell:

- Outer shell: `bg-surface`, hairline `border-border`, padding `p-1.5`, radius `rounded-[20px]` (matches canvas `cornerRadius: 20`)
- Inner core: `bg-bg`, own inset highlight, concentric radius `rounded-[14px]`

This already partially exists in `Video.tsx`; it becomes the page-wide rule.

### Glass: a two-tier system

Glass is used as a **specific effect with a job**, never as a surface treatment. impeccable's craft floor refuses "glass and blur as decoration rather than as a specific effect" while its motion palette explicitly welcomes `backdrop-filter` "when it stays smooth." Both constraints are satisfied by splitting glass into two tiers with different implementations.

**Two research findings drive this split:**

1. NN/g: glassmorphism "works best when it is applied on top of dynamic images or bright gradients that highlight the transparency." Our page background is flat `#0b0c0e` (dark) and `#fcfcfd` (light). **A blur over a flat color produces a slightly lighter flat color:** full GPU cost, almost no visible effect.
2. `backdrop-filter` on or over animated content causes severe CPU and GPU load in Chromium. Our two most animated regions, the `RBepL` simulation and the `GPYOG` 3D scrub, are exactly where glass would look best and exactly where it would destroy the frame budget.

**Tier 1: Real glass (`backdrop-filter`).** Permitted on exactly two surfaces, both of which are fixed, small, composited once, and contain no animating children:

| Surface | Why it qualifies |
|---|---|
| Fixed nav island, **while over the hero substrate only** | The animated dot-grid gives it genuine complexity to refract. Fixed positioning means it composites once rather than per scroll frame. |
| Overlays and any mega-menu | Transient, full-stop surfaces where separation from the page behind is the actual job. |

**The nav material transition.** The Mobbin cross-check exposed that our dot-grid substrate is hero-only, so a permanently glass nav would be invisible for most of the scroll, making it dead cost rather than a specific effect. The nav therefore **changes material as it leaves the hero**:

| Scroll state | Material |
|---|---|
| Over the hero substrate | Tier 1 real glass: `backdrop-filter: blur(24px)`, translucent fill, inner border, inset highlight. The dot-grid is visible through it. |
| Past the hero | Tier 2 specular solid pill: opaque `--ds-surface` fill, gradient hairline stroke, inset highlight. `backdrop-filter` removed, not merely reduced. |

The crossfade runs over 240ms `ease.standard`, triggered by an IntersectionObserver on the hero's trailing edge rather than a scroll listener. This is a state change with a real job: it tells the reader they have left the hero. It also means the expensive material only exists on the one screen where it is visible, which is the resolution of the tension between "we want glass" and "glass over flat color is free cost."

**Tier 3: Radial glow (additive light).** For depth on flat backgrounds where refraction is impossible. Scoped to exactly three surfaces: behind the primary CTA, behind the `GPYOG` Context Graph hub core, and behind the nav island. Nowhere else.

Implementation rules, which exist to keep this from decaying into an AI glow aesthetic:

- Rendered as a **background-layer radial gradient on a pseudo-element**, never as `box-shadow`
- Large and diffuse relative to its element, low alpha, and **offset off-center** so it reads as a light source rather than an aura ringing the element
- Never the accent color at full saturation; a desaturated tint of it
- Does not replace real depth: elements that need elevation still get a shadow with a genuine offset and soft blur

**Resolved conflict with the craft floor.** impeccable's floor states "shadows carry an offset and a soft blur. A zero-offset colored halo is decoration." Tier 3 is not exempt from that rule, it is outside its scope: the halo is a **light source in the background layer**, not a shadow standing in for depth. The distinction is enforced mechanically by the three rules above, in particular that glow is never a `box-shadow` and never substitutes for elevation. A centered, tight, saturated halo on a `box-shadow` would be exactly the decoration the floor refuses, and is forbidden.

Implementation follows the vetted skeleton in `design-taste-frontend` Appendix C: layered translucent background, 1px inner border, inset highlight for edge refraction. Blur strength is capped at `blur(24px)`; Axess Lab specifically flags `blur(20px)` and above as a sensory-pain risk, so 24px is the ceiling and not a starting point. Labelled in code as a web glass approximation, never as Apple Liquid Glass, which is an Apple-platform material with no public web package.

**Tier 2: Specular glass (zero blur).** Everywhere else: diagram shells, the four isometric Aiden OS layer planes, bento cells, and pills. This is NN/g's own prescription for single-color backgrounds: "use both gradient strokes and gradient fills to create depth over single-color backgrounds."

- Gradient stroke: hairline border with a luminance ramp from top-left to bottom-right
- Gradient fill: translucent surface fill with a subtle vertical ramp
- Inset highlight: `inset 0 1px 0` at low alpha to imply a machined top edge
- No `backdrop-filter`, no `filter`

This costs nothing, animates freely at 60fps, and on the isometric layers it reads **better** than blur would, because real machined glass panels seen at an angle show specular highlights rather than a blurred field. Tier 2 is the default; Tier 1 is the exception.

**Explicitly forbidden:** any `backdrop-filter` on the `RBepL` particle canvas or its container, on any `GPYOG` isometric layer, on any scrolling container, or on a bento cell. Glass never sits between the reader and body copy that must pass contrast.

### Browser surfaces

The parts of the page nobody draws still carry the design, and shipping them at browser defaults is the clearest signal a page was assembled rather than built. All of these are themed from the `ds-*` palette in `globals.css`:

| Surface | Treatment |
|---|---|
| Text selection | `::selection` background at accent low alpha, foreground `--ds-text-primary` |
| Caret | `caret-color: var(--ds-accent)` on all text inputs |
| Scrollbars | Themed thin scrollbar: `--ds-border` thumb on transparent track, both themes |
| Focus rings | `:focus-visible` only, 2px accent ring with 2px offset, never `outline: none` without a replacement |
| Link underlines | `text-underline-offset` and `text-decoration-thickness` set explicitly rather than inherited |
| Numerals | `font-variant-numeric: tabular-nums` on every metric, count, and mono data string so digits do not jitter during any count-up |

### Hero recomposition

Current hero is centered with a 56px H1, matching canvas. It becomes an **asymmetric split**:

- Left column: eyebrow (mono), H1 with per-word kinetic mask reveal, subtext, two CTAs
- Right column: the Context Graph hub rendered live as a small ambient loop (a teaser for the focal sequence below)
- Behind: canvas 2D animated dot-grid substrate, `position: fixed`, `pointer-events-none`, pauses when offscreen

**The substrate has a load-bearing job beyond decoration:** it is the only thing the Tier 1 nav glass has to refract. It therefore needs real luminance variance, not a uniform faint dot field, or the glass above it renders as flat tint. The grid carries a slow, wide luminance gradient across it so that dots near the nav vary in brightness over time. If the substrate is ever reduced to uniform low-alpha dots, Tier 1 nav glass loses its justification and the nav should ship as a Tier 2 specular pill from the start.

Hero discipline from design-taste-frontend still applies: H1 max 2 lines, subtext max 20 words, max 4 text elements, `pt-24` cap, `min-h-[100dvh]` never `h-screen`.

### Layout variety

`WhoItsFor` currently renders two rows of four equal cards, which trips the three-equal-cards ban and the section-layout-repetition rule. It becomes an 8-cell bento with rhythm: two large cells for the highest-value pillars, six standard cells, at least two cells carrying real visual variation rather than text-on-surface.

### Copy corrections requiring sign-off

Canvas fidelity currently preserves two defects that "web leads" makes indefensible on a shipped page:

1. Hero H1 contains a **double space**: `"The Autonomous Operations  Factory"`
2. Hero subtext contains a **typo**: `"Remidiate"` should be `"Remediate"`

**Recommendation: fix both.** Both are visible marketing copy. Flagged here rather than silently changed because impeccable requires asking before altering factual copy. If you decline, the tests that assert exact copy stay as-is.

### Resolved skill conflict: eyebrows

impeccable's craft floor bans the eyebrow outright: "This one is a ban, not a default: no brief earns it back." `design-taste-frontend` permits one per three sections. The canvas carries four (`OPERATIONAL CONTEXT GRAPH`, `WHO IT'S FOR`, `INNER LOOP`, `OUTER LOOP`).

**Resolution: the four canvas eyebrows survive.** impeccable's own precedence rule states that a pinned brief or the committed visual world overrides its floor, and these are canvas copy in the committed world rather than a habit we reached for. No **new** eyebrows may be introduced by any wave, which keeps the count at four and satisfies the `design-taste-frontend` ratio across an eight-section page. Recorded here so an implementer does not delete them citing craft-floor, and does not add more citing the ratio.

## Diagram rebuild specs

All four become client components under `web/components/replica/diagrams/`. Each one:

- takes `theme: "light" | "dark"` and reads `ds-*` CSS variables, never hardcoded hex
- carries `role="img"` plus the `aria-label` currently on the PNG, with decorative internals `aria-hidden`
- exposes `data-animate="<part>"` hooks on animated groups (convention established by the `uvKGu` pass)
- renders its **fully assembled final state** as the default DOM so a failed script never hides content
- lazy-mounts its choreography on first intersection

### 1. `RBepL` Inner/Outer Loop - "The Factory Runs" (live simulation, Class A)

Canvas structure (from `Get("RBepL")`): `jGI8U` Main Flow contains `k3vas0` Inner Loop Shell (220px, 4 pills: IDE/Cursor, Git/GitHub, CI-CD/GitLab, IaC/Terraform), `acrOa` Connector 1, `m3kuQ` Context Graph Center (280x280: `UZ0dn` outer ring, `rZ7X5` orbit track, 4 spokes at 45/135/225/315deg, `SqQmR` 80px hub core, 4 satellites intent/entities/policies/memory), `LSUQU` Connector 2, `eYtt6` Outer Loop Shell (Runtime/EKS, Infrastructure/AWS, Observability/Datadog).

**This is not a topology diagram with flow lines. It is a running simulation.** The static arrangement above is the stage; the content is a continuous stream of real work-items travelling through it. Reference: [Wild](https://mobbin.com/sites/sections/eef9343d-0d21-41e4-9524-54462b7612db).

**Simulation model.** A canvas 2D particle layer sits behind the DOM pills, sharing their coordinate space via measured anchor rects.

- **Spawn.** Each inner-loop pill emits work-items on its own interval: IDE emits `edit`, Git emits `commit`, CI/CD emits `pipeline`, IaC emits `plan`. Emission intervals are staggered and jittered so the field never falls into visible lockstep.
- **Travel.** Items drift right along a slightly noisy path toward the hub, with mild turbulence so no two trajectories match.
- **Absorb.** On reaching the hub, an item is consumed: the hub core pulses once, proportional to the item's weight, and the relevant satellite (`intent` / `entities` / `policies` / `memory`) brightens for 400ms. This is the visible causal link that flow lines never provide.
- **Emit.** After a short dwell the hub emits a **correlated, transformed** item rightward: `commit` becomes `deploy`, `plan` becomes `provision`, `pipeline` becomes `verify`, `edit` becomes `drift-check`. The transformation is the entire argument of the diagram.
- **Land.** Outer-loop pills receive items and flash a brief arrival state.
- **Density cap.** Maximum 40 live particles; the oldest is retired when exceeded. This bounds cost regardless of how long the section stays in view.

Each particle carries a **small real label** (`commit`, `plan`, `deploy`, `alert`, `verify`, `provision`, `drift-check`). Labels are what make this credible to an SRE reading it. Labels render only above 1024px and only for particles above a size threshold, so the field never becomes text soup.

**Entrance beats** (on first intersection at 30%, before the simulation starts):

| Beat | t | Action |
|---|---|---|
| 0 | 0ms | Inner Loop Shell fade + slide from left, `dur.shell` 520ms `ease.emphasize` |
| 1 | 200ms | Hub core scales 0.8 -> 1 with glow ignition; orbit track spins up from 0 to its 18s steady rate |
| 2 | 280ms | Outer ring pulse begins; 4 satellites orbit-enter at `stagger.orbit` 80ms |
| 3 | 440ms | Outer Loop Shell fade + slide from right (`stagger.shell` 160ms after inner) |
| 4 | 700ms | **Simulation starts.** Particle emission begins; it does not stop while the section is in view. |

Ambient: `ambient.orbit` 18s rotate, `ambient.hub` 2.8s glow, `ambient.ring` 3s pulse. The connector arrow glyphs (`acrOa`, `LSUQU`) are **removed**; travelling particles now carry the direction, so static arrows are redundant decoration.

**Interaction.** Hovering an inner-loop pill isolates that pill's particle stream (others dim to 30%), answering "what does *my* commit do in here?". Hovering the hub freezes all in-flight particles and labels them all at once, turning the simulation into a readable snapshot. Both are pointer-only affordances layered on top of a diagram that is already complete without them.

**Determinism.** The simulation is driven by a **seeded PRNG**, not `Math.random`. With a fixed seed and a fixed tick count the field is byte-reproducible, which is what makes screenshot parity possible for a system that otherwise never repeats.

### 2. `F4Jlp` Offerings - "The Bezel Powers On"

Canvas structure: `Lt9Dw` Aiden OS Bezel wrapping 9 chips in 3 groups - Agent Platform (Persona Agents, Skills & Workflows, Activity & Replay), Governance (Policy Engine, Identity & Approval, Cost Controls), Shared Context (Knowledge Hub, Context Graph, AppStacks).

| Beat | t | Action |
|---|---|---|
| 0 | 0ms | Three app tiles (SRE / DevOps / Infrastructure) drop in from -16px, 40ms apart |
| 1 | 200ms | Aiden OS double-bezel **traces itself**: SVG rect with `stroke-dasharray` / `stroke-dashoffset` animating to 0 over 700ms `ease.emphasize` |
| 2 | 420ms | 9 chips enter at `dur.chip` 180ms with `stagger.chip` 40ms, in canvas order `Dsmvf` -> `o4mGg` |
| ambient | loop | `ambient.bezel` 3.2s border pulse |

### 3. `hG9Ou` Integrations - "The Stack Snaps In"

Canvas structure: `we6Bo` heading "Plugs into the stack you already run", `SuaXQ` Shell containing `g0j7r` Grid Row with 8 vendor pills: GitHub, GitLab, Terraform, Datadog, PagerDuty, Jira, OPA, Slack.

| Beat | t | Action |
|---|---|---|
| 0 | 0ms | Heading blur-fade rise |
| 1 | 120ms | 8 pills enter from deterministic scattered offsets (seeded, not random, so runs are reproducible for screenshot diffing) and **snap** to grid position with a spring settle, 50ms apart |
| ambient | 6s loop | A light sweep crosses the shell left to right using a masked gradient, `transform` only |

Deterministic offsets are required so Playwright parity screenshots are stable.

### 4. `GPYOG` Context Graph - the focal sequence (isometric exploded stack, Class B + C)

Canvas structure: `JM2d2` Header Stack (eyebrow `OPERATIONAL CONTEXT GRAPH`, H2, two body lines), `mxDEF` Header Left with `zvEOh` "Aiden OS", `JJZh4` Aiden OS Stack containing `z88sBp` StackShell -> `A2tO8` StackCore, plus the router, four agent cards, the cross-repo entity row (AWS, Terraform, Prometheus, Backstage, Jira) and the governance chip rows.

**Aiden OS becomes a machined isometric object you can operate**, not a flat chart. References: [Rox](https://mobbin.com/sites/sections/f81fe9bd-84ae-40e5-8ddd-6a406a3442fc) for the dark exploded OS stack with a layer rail, [Mercury](https://mobbin.com/sites/sections/3a483a4e-ab5c-494e-9db9-c6d41660be22) for exploded-layer callouts, [Claude](https://mobbin.com/sites/sections/c6697f91-aa65-4fc9-bc5c-baaed33e974d) for the constellation graph idiom, [Apollo](https://mobbin.com/sites/sections/2be457bf-b5b2-4b9e-a701-328688b140cc) for the rail-driven reconfiguration.

**The object.** Four stacked isometric planes, rendered with CSS 3D (`transform-style: preserve-3d`, a shared `rotateX(54deg) rotateZ(-45deg)` scene transform). No WebGL. Each plane is a real DOM layer with its own content, so everything inside stays selectable, themeable, and accessible.

| Layer | Name | Content |
|---|---|---|
| 4 (top) | Intent | The intent bar and the router; where a question enters |
| 3 | Assemblies | The four agent cards: Infrastructure, Automation, Observability, SRE |
| 2 | System of Context | **The Context Graph itself**, drawn as a sparse labelled constellation with hairline edges, not boxes and arrows |
| 1 (base) | Data Sources | The five vendor-marked entity nodes: AWS, Terraform, Prometheus, Backstage, Jira |

**Layer rail (Class C).** A left-hand rail lists the four layer names. Selecting one lifts that layer out of the stack, dims and pushes back the others, and reveals that layer's detail. This is a real control, not a hover affectation: rail items are `<button>` elements in a `tablist` with `aria-selected`, roving tabindex, and arrow-key navigation. The rail also stays in sync with scroll position, so scrolling and clicking drive the same state machine rather than fighting each other.

**Scroll choreography.** The only pinned section on the page. GSAP ScrollTrigger, `start: "top top"`, `pin: true`, `scrub: 1`, `end: "+=260%"`, `invalidateOnRefresh: true`.

| Beat | Scrub progress | Action |
|---|---|---|
| 1 | 0 - 0.12 | Stack arrives closed and flat-on; the scene rotates into the isometric angle as a single object |
| 2 | 0.12 - 0.30 | The stack **explodes**: four layers separate vertically, `stagger.shell` 160ms apart, each casting onto the one below. Layer labels draw their leader lines. Rail selects layer 4. |
| 3 | 0.30 - 0.45 | Intent layer activates: the query types in, the router ignites, capability pills appear. Rail advances to layer 3. |
| 4 | 0.45 - 0.65 | Assemblies layer activates: four agent cards deal out, each dropping a vertical light shaft to the layer below to show the call path. Rail advances to layer 2. |
| 5 | 0.65 - 0.85 | System of Context activates: the constellation **grows**, nodes appearing and hairline edges drawing between them until the graph resolves onto `checkout-api`. Rail advances to layer 2 detail. |
| 6 | 0.85 - 1.0 | Data Sources layer activates: the five vendor nodes light in sequence; governance chips settle at `stagger.chip` 40ms; the stack settles into its steady ambient state. Rail advances to layer 1. |

Scrolling **up** reverses the whole thing, collapsing the stack back into a closed object. Reversibility is the point: the visitor operates the machine.

**Vendor-mark legibility in 3D.** Marks on the Data Sources layer sit inside an isometric plane, which would shear them. Each mark is therefore **counter-rotated** (billboarded) with the inverse of the scene transform so it renders square and legible while its containing plane stays in perspective. A sheared logo is a brand violation, not a stylistic choice.

**Ambient steady state.** Once assembled, the constellation breathes: node opacity drifts subtly and one edge at a time carries a faint pulse. `ambient.hub` 2.8s on the core. Nothing rotates continuously, because the object should read as precision hardware at rest rather than a spinning logo.

**Below `lg`,** pinning is disabled, the scene transform drops to flat 2D, layers render as four stacked cards in document order, and the rail becomes a horizontal tab strip. The constellation renders complete with a single entrance stagger.

## Logo and vendor-mark manifest

Every animated node that represents a real product must carry that product's official mark. The canvas already assigns 28 marks; the rebuild must reproduce all of them and must not silently drop one when a PNG becomes a live node.

### Complete node to mark mapping (extracted from canvas)

**`RBepL` Inner/Outer Loop - 7 marks**

| Node | Pill label | Mark |
|---|---|---|
| `ZTTCV` | IDE | Cursor |
| `vlq78` | Git | GitHub |
| `F75KL` | CI / CD | GitLab |
| `xuqUR` | IaC | Terraform |
| `Xpu4X` | Runtime | EKS |
| `Y8mDP` | Infrastructure | AWS |
| `GKTQl` | Observability | Datadog |

**`hG9Ou` Integrations - 8 marks**

| Node | Mark | Node | Mark |
|---|---|---|---|
| `LuUuf` | GitHub | `m8uW0` | PagerDuty |
| `zvPNR` | GitLab | `J43Jw9` | Jira |
| `GlHEs` | Terraform | `LYHEU` | OPA |
| `FPQhl` | Datadog | `tL4kJ` | Slack |

**`GPYOG` Context Graph - 5 marks** (the cross-repo entity row)

| Node | Mark | Node | Mark |
|---|---|---|---|
| `BN5yO` | AWS | `QBuCw` | Backstage |
| `XtoTN` | Terraform | `P9iKm` | Jira |
| `mLYMw` | Prometheus | | |

**`TKCFb` Logos row - 8 customer marks**

Nielsen, GreytHR, Corcentric, Piramal, NIQ, Autodesk, InMobi, Innovaccer. Already correctly wired in `content/replica.ts` to `/logos/customers/*.png`; do not change these paths.

**`F4Jlp` Offerings - zero vendor marks, intentionally.** This diagram describes Aiden OS capabilities, not third-party products. Its nine chips are text plus Phosphor glyphs. An implementer must not add vendor logos here.

**Phosphor glyphs are not logos.** `GPYOG` uses 18 Phosphor icons (`share-network` router, `cloud` / `robot` / `chart-line-up` / `activity` agent icons, `shield-check` / `fingerprint` governance icons) and `RBepL` uses `lucide:git-fork` and `lucide:arrow-right`. These stay as icon-family glyphs. The two Lucide glyphs must be migrated to Phosphor equivalents (`git-fork` -> `phosphor:git-fork`, `arrow-right` -> `phosphor:arrow-right`) because the project rule is one icon family and `@phosphor-icons/react` is the installed family.

### Availability audit

All 13 distinct vendor marks the diagrams need are already vendored at `web/public/logos/integrations/` as PNG. Nothing needs to be sourced from scratch. However, PNG is the wrong format for this rebuild:

- The marks render at 14px and animate through `scale` transforms, so raster marks will visibly soften during the snap and settle beats.
- Raster marks cannot be tinted or inverted per theme without shipping two files each.

**SVG availability in `.firecrawl/official-logos/`:**

| Mark | Official SVG on hand | Mark | Official SVG on hand |
|---|---|---|---|
| Cursor | `Cursor.svg` | Jira | `jira-icon.svg` |
| GitHub | `GitHub.svg` | OPA | `OPA.svg` |
| GitLab | `GitLab.svg` | Slack | `Slack.svg` |
| Terraform | `Terraform.svg` | Backstage | `Backstage.svg` |
| EKS | `EKS.svg` | PagerDuty | `PagerDuty_final.svg` |
| AWS | `AWS.svg` | **Datadog** | **missing** |
| | | **Prometheus** | **missing** |

**Two gaps to close: Datadog and Prometheus.** Source the official SVG from the vendor brand page via firecrawl. If the official SVG cannot be obtained under acceptable brand terms, fall back to Simple Icons (`https://cdn.simpleicons.org/datadog`, `https://cdn.simpleicons.org/prometheus`) rendered as a monochrome mark tinted to `--ds-text-secondary`. Do not upscale the existing PNG and do not redraw either mark by hand.

### Asset pipeline

Marks become inline React components, not `<img>` tags:

```
web/components/replica/logos/
  index.ts            VENDOR_MARKS registry, keyed by vendor slug
  GitHubMark.tsx      official SVG path data, accepts className + theme variant
  ...                 one file per vendor (13 total)
```

Rationale: inline SVG stays crisp through `scale` animation, can switch theme variant without a second network request, adds zero requests and zero layout shift, and lets the snap-and-settle beat animate the mark itself rather than a bitmap. Diagram components look marks up by slug through the registry, so a missing mark is a type error rather than a broken image.

The existing PNGs at `web/public/logos/integrations/` remain for any non-animated use and as the fallback if an SVG conversion is rejected on brand grounds.

### Theme legibility matrix

Marks sit on `--ds-surface-raised` pills, which differs substantially between themes. Each mark declares its own treatment:

| Mark | Dark theme | Light theme |
|---|---|---|
| GitHub | White Octocat variant | Black variant |
| Cursor | White variant | Black variant |
| AWS | White wordmark plus brand orange | Brand navy plus orange |
| Backstage | Full color, unchanged | Full color, unchanged |
| GitLab, PagerDuty, Jira, Prometheus, OPA, Slack | Full color, unchanged | Full color, unchanged |
| Terraform, Datadog, EKS | Full color, see accent collision below | Full color, unchanged |

Monochrome-mark inversion happens through a `variant` prop on the mark component driven by the active theme, never through a CSS `filter: invert()`, which corrupts brand color on multicolor marks.

**Accent collision.** Terraform brand purple (`#7B42BC`) and Datadog brand purple (`#632CA6`) both sit near our dark-theme accent (`#8c85ff`). On dark surfaces a purple vendor mark can read as our own accent state rather than a third-party logo, which quietly breaks the meaning of the accent. Mitigation: vendor marks are never placed on an accent-filled surface, and any accent glow in a beat must not fall on a pill containing a purple mark. If a purple mark still reads as accent in review, that single mark drops to a monochrome `--ds-text-primary` treatment. The page accent itself does not change.

### Logo discipline

`hG9Ou` and `RBepL` pills pair a mark with a short functional label (`IDE`, `Git`, `CI / CD`, `Runtime`). This is not the banned logo-wall pattern. The ban applies to printing industry or category labels under a trust logo wall, which is `TKCFb`, and `TKCFb` is correctly logo-only. Integration chips legitimately name what the mark connects. Do not "fix" these labels away.

Every mark carries an accessible name equal to the vendor name. Where a mark sits next to a visible text label naming the same vendor, the mark is `aria-hidden` to avoid a duplicate announcement.

## Section-by-section choreography

| Section | Motion | Justification (one sentence each) |
|---|---|---|
| `Nav` | Fluid island: on scroll past 80px the header detaches into a floating pill, and its material crossfades from Tier 1 glass to a Tier 2 specular solid as it leaves the hero substrate; hamburger morphs to X below `lg` | Signals scroll depth, frees vertical space, and the material change tells the reader they have left the hero. |
| `Hero` | Per-word H1 mask reveal (clip-path rise, 60ms apart); CTA magnetic press; canvas dot-grid substrate | Directs attention to the single value proposition at the authored moment. |
| `Video` | Play affordance breathes; bezel highlight tracks pointer | Makes the play target unmistakable. |
| `Logos` | Cinematic blur-fade stagger, 8 logos, 50ms apart. **No marquee.** | Establishes credibility without the lazy infinite-scroll idiom. |
| `Assemblies` | Hosts `RBepL` + `F4Jlp` + `hG9Ou` choreographies above | Explains the factory's structure by building it. |
| `Shell` | Hosts the pinned `GPYOG` focal sequence | The one sequence that has earned authorship. |
| `WhoItsFor` | 8-cell bento, wave stagger reveal, spotlight border on hover | Reveals the grid as a grid and gives per-cell feedback. |
| `Footer` | CTA button-in-button with nested icon translating diagonally on hover | Acknowledges the primary conversion action. |

## Architecture

```
web/lib/motion-tokens.ts              harvested manifest (durations, easings, staggers, ambients)
web/components/replica/motion/
  MotionProvider.tsx                  Lenis + ScrollTrigger registration, single instance
  useScrollScrub.ts                   pinned/scrubbed progress hook
  useReducedMotionSafe.ts             wraps motion/react useReducedMotion with SSR-safe default
  Reveal.tsx                          intersection fade/slide primitive
  Stagger.tsx                         sibling stagger wrapper with capped total delay
  Beam.tsx                            travelling light along an SVG path between anchors
  DrawPath.tsx                        stroke-dashoffset self-drawing path
  GridSubstrate.tsx                   canvas 2D dot grid, fixed, pointer-events-none
  seededRandom.ts                     mulberry32 PRNG; every stochastic effect draws from it
  ParticleField.tsx                   canvas 2D work-item simulation: seeded spawn, travel,
                                      absorb, transform, emit; anchor-rect driven; density-capped
  IsoScene.tsx                        CSS 3D isometric scene wrapper (preserve-3d, shared
                                      scene transform) plus Billboard for counter-rotated marks
  Constellation.tsx                   sparse labelled graph: nodes plus hairline edges, grow-in
  LayerRail.tsx                       accessible tablist rail driving layer state, kept in sync
                                      with scroll progress
web/app/globals.css                   glass utilities (.glass-real Tier 1, .glass-specular Tier 2)
                                      + browser-surface theming (selection, caret, scrollbar,
                                      focus ring, underline offset, tabular numerals)
web/components/replica/diagrams/
  InnerOuterLoop.tsx                  replaces /media/replica/*-RBepL.png
  Offerings.tsx                       replaces /media/replica/*-F4Jlp.png
  Integrations.tsx                    replaces /media/replica/*-hG9Ou.png
  ContextGraph.tsx                    replaces /media/replica/*-GPYOG.png
```

Existing section files keep their `data-pencil-id` attributes so the current test suite continues to assert structure. `content/replica.ts` loses the `diagrams` PNG path maps and gains typed node content for each diagram.

`MotionProvider` mounts once in `layout.tsx` inside `ThemeProvider`. Every animated component is a `'use client'` leaf. GSAP and Motion are never mixed inside the same component tree; GSAP owns `ContextGraph` (pin/scrub) and Motion owns everything else.

## Dependencies

| Package | Purpose | Budget |
|---|---|---|
| `gsap` + ScrollTrigger | Pin and scrub for `ContextGraph` only | ~70KB gz |
| `lenis` | Smooth scroll normalization | ~5KB gz |
| `geist` (via `next/font`) | Display + body typeface | font subset only |
| canvas 2D (no library) | Dot-grid substrate | 0KB |

`motion@13.1.1` is already installed. No WebGL library is added; the substrate is canvas 2D, which meets the visual goal at a fraction of the cost. `@phosphor-icons/react` stays as the single icon family.

## Performance budget

- **LCP < 2.5s.** The hero LCP element is text, so fonts are preloaded and the substrate canvas is painted after first contentful paint.
- **INP < 200ms.** No animation touches React state per frame; continuous values use `useMotionValue` / `useTransform` or GSAP's own ticker. `window.addEventListener("scroll")` is banned outright.
- **CLS < 0.1.** Every diagram reserves its final assembled height before choreography runs.
- **GPU discipline.** Only `transform`, `opacity`, and bounded `filter` animate. Never `width`, `height`, `top`, `left`, or margins. `will-change` applied only during known animation and removed after.
- **Blur discipline.** `backdrop-filter` restricted to the fixed nav island and overlays, capped at `blur(24px)`. Never on scrolling containers, never on the particle canvas or its container, never on an isometric layer, never on a bento cell. Everything else uses Tier 2 specular glass, which has no blur cost. A `backdrop-filter` introduced anywhere outside the two Tier 1 surfaces is a build failure, not a style preference.
- **Substrate discipline.** Canvas capped at DPR 2, pauses via IntersectionObserver when offscreen and via `visibilitychange` when the tab is hidden.
- **Lazy mount.** Below-fold diagram choreography initializes on first intersection, not on page load.
- **Simulation discipline.** The `RBepL` field is hard-capped at 40 live particles and one `requestAnimationFrame` loop that ticks the whole field, never one loop per particle. Particle labels are DOM-free (drawn into the canvas) so 40 particles never means 40 React nodes. The loop stops entirely when the section leaves the viewport or the tab is hidden, and it never touches React state.
- **3D discipline.** The `GPYOG` scene animates only `transform` and `opacity` on four layer planes. No per-frame layout, no `filter` on the scene root, and no nested `preserve-3d` beyond the single scene depth, which is where CSS 3D performance usually collapses. Layer shadows are pre-composed gradients rather than animated `box-shadow`.
- **Two expensive effects never co-run.** `RBepL` and `GPYOG` are in different sections, and each pauses when out of view, so the simulation and the 3D scene are never both animating on the same frame.

## Accessibility

- **`prefers-reduced-motion: reduce`** renders every diagram in its fully assembled final state, disables all ambient loops, removes pinning and scrubbing entirely, and keeps opacity/color state transitions that carry meaning. Reduced does not mean dead: hover and press feedback remain legible.
  - **`RBepL` under reduced motion:** the simulation does not run. The field renders as a single frozen, seeded snapshot of work-items in flight, fully labelled. The diagram still communicates that work flows through the hub and gets transformed, without any movement. This is why the frozen snapshot has to be readable rather than a smear.
  - **`GPYOG` under reduced motion:** the stack renders already exploded in its isometric angle with all four layers visible and the constellation complete. The rail still works, but layer changes cross-fade instead of animating position.
- **No regression on alt text.** Today's diagrams are `<img alt="...">`, which is accessible. Each rebuilt diagram keeps `role="img"` and the identical `aria-label`; internal decorative nodes get `aria-hidden="true"`. The `RBepL` canvas is `aria-hidden` with the surrounding figure carrying the description, since a moving particle field has no useful per-particle semantics.
- **Interactive diagrams are real controls.** The `GPYOG` layer rail is a `tablist` of `<button>` elements with `aria-selected`, roving tabindex, and left/right arrow-key navigation. Layer content is the corresponding `tabpanel`. The rail must be fully operable by keyboard alone, and selecting a layer by keyboard must not require scrolling. The `RBepL` hover isolation is a pointer-only enhancement with no keyboard equivalent required, because it reveals no information unavailable elsewhere.
- **Keyboard.** The pinned section must not trap keyboard navigation; focusable content inside `GPYOG` including every rail button remains reachable, and the pin releases correctly when focus moves past the section.
- **Contrast.** WCAG AA minimum on all body text and CTAs in both themes, re-audited after the Geist swap because metrics change with the typeface. Contrast is measured against the **effective composited background** behind any glass surface, not against the token value, because a translucent fill changes the real ratio.
- **Transparency preferences.** `prefers-reduced-transparency: reduce` collapses all three tiers: Tier 1 drops `backdrop-filter` entirely, Tier 2 drops its gradient fill to a solid `--ds-surface`, and Tier 3 glow is removed since additive light over an opaque surface only reduces contrast. `forced-colors: active` removes glass and gradient strokes completely and falls back to system colors with a solid border, since NN/g notes that Apple's Increase Contrast setting replaces glassmorphic components with solid color and the web equivalent should behave the same way. Support for `prefers-reduced-transparency` is uneven, so the design must remain legible even when the query never fires, which is guaranteed by the contrast rule above.
- **No custom cursors, no autoplay sound, no scroll cues.**

## Responsive degradation

| Viewport | Behavior |
|---|---|
| `>= 1440px` | Full choreography as specified |
| `1024 - 1439px` | Full choreography; `ContextGraph` pin distance reduced to `+=160%` |
| `768 - 1023px` | Pinning off; `ContextGraph` renders assembled with one entrance stagger. Diagram beats collapse to a single reveal. Ambient loops limited to the hub. |
| `< 768px` | Single column, `w-full`, `px-4`. Entrance reveals only. Substrate canvas disabled. Asymmetric hero collapses to stacked. |

Every multi-column layout declares its `< 768px` fallback in the same component. `min-h-[100dvh]` everywhere, never `h-screen`.

## Verification and acceptance criteria

The build is done only when all of these pass:

1. `pnpm typecheck && pnpm test` green.
2. `pnpm build` green; `docker compose --profile prod up --build` serves 200 on `http://localhost:3000`.
3. **Scrub parity screenshots.** For each of the four diagrams, Playwright captures scrub/progress states at 0%, 25%, 50%, 75%, 100% in both themes. 40 screenshots total, written to `exports/web-shelf/motion-parity/`. Each assembly must be visually coherent at every sampled state, not just the endpoints. Captures are taken with a fixed PRNG seed and a fixed tick count so the simulation frame is reproducible; a flaky capture means the seeding is wrong, not that the test is wrong.
4. **Reduced-motion pass.** A Playwright run with `prefers-reduced-motion: reduce` confirms every diagram is fully assembled, no ambient loops run, no section is pinned, the `RBepL` field renders as a readable frozen labelled snapshot, and the `GPYOG` stack renders already exploded with a working rail.
4a. **Simulation behavior audit.** With the simulation running: particle count never exceeds 40, the hub visibly pulses on absorb and the correct satellite brightens, emitted items carry transformed labels (`commit` -> `deploy`, `plan` -> `provision`, `pipeline` -> `verify`, `edit` -> `drift-check`), and two 10-second recordings started at different times are visibly different. If the field is visibly periodic, it has failed the entire point of Class A.
4b. **Rail keyboard audit.** The `GPYOG` layer rail is reachable by Tab, operable by arrow keys, exposes `aria-selected` correctly, and drives the same layer state that scroll drives. Scroll and rail must not fight: driving one updates the other.
4c. **3D mark legibility.** Every vendor mark on the Data Sources layer renders square and unsheared under the isometric scene transform in both themes.
4d. **Glass tier audit.** A grep for `backdrop-filter` and `backdrop-blur` returns hits on exactly two surfaces: the nav island and overlay components. Zero hits inside `diagrams/`, on any isometric layer, on any scrolling container, or on a bento cell. Blur strength nowhere exceeds 24px. Screenshots confirm the nav renders as visible glass over the hero substrate and as an opaque specular pill past the hero, in both themes, with `backdrop-filter` fully removed in the second state rather than reduced.
4e. **Transparency fallback pass.** Playwright runs with `prefers-reduced-transparency: reduce` and with `forced-colors: active`. Tier 1 drops `backdrop-filter`, Tier 2 drops its gradient fill to a solid, Tier 3 glow is removed entirely, all text still passes AA, and no content becomes invisible or unreadable.
4f. **Browser surfaces pass.** Selection color, caret color, scrollbar, focus ring, underline offset, and tabular numerals are all themed and visibly non-default in both themes. Keyboard tabbing shows a visible accent focus ring on every interactive element including all rail buttons.
4g. **Tier 3 glow audit.** Radial glow appears on exactly three surfaces (primary CTA, Context Graph hub core, nav island). Every instance is a background-layer radial gradient rather than a `box-shadow`, is offset off-center, and uses a desaturated accent tint. Any centered saturated halo, or any glow implemented as `box-shadow`, fails the check. Elements needing elevation still carry a real offset shadow.
5. **No PNG diagrams remain.** `web/public/media/replica/*.png` deleted and no `<img>` references them.
6. **Logo audit.** All 28 canvas-assigned marks present and correct: 7 in `RBepL`, 8 in `hG9Ou`, 5 in `GPYOG`, 8 customer marks in `TKCFb`. Zero vendor marks in `F4Jlp`. Every mark renders crisply at its animated maximum scale in both themes, GitHub / Cursor / AWS switch variant with the theme, and no mark is missing, stretched, or reading as the page accent. A mark absent from the registry must fail typecheck, not render blank.
7. **Accessibility.** Automated axe pass on both themes; manual keyboard walk through the pinned section.
8. **Lighthouse** desktop: LCP < 2.5s, CLS < 0.1, no long-task warning attributable to the substrate.
9. **Motion justification audit.** Every animation in the diff can be justified in one sentence per the table above. Anything that cannot is removed before merge.

Claims of completion without screenshot and Lighthouse evidence are not accepted.

## Out of scope

- Mobile-first rich motion parity (explicitly deferred by the device-budget decision)
- Pencil canvas edits. `Stack_Linear.pen` remains read-only; the canvas is no longer the parity gate but it is also not being redrawn.
- Lottie or Rive pipelines (rejected: cannot re-token on theme switch)
- WebGL / Three.js substrate (canvas 2D achieves the goal within budget)
- Content or IA changes beyond the two copy corrections flagged above
- New routes. `/` remains the only page.

## Risks

| Risk | Mitigation |
|---|---|
| Pinned scrub feels sluggish or fights Lenis | Single ScrollTrigger instance, `scrub: 1`, `invalidateOnRefresh`, Lenis wired through `ScrollTrigger.scrollerProxy`. Wave 0 owns a hard go/no-go: if the scrub jitters at 120Hz, Lenis is dropped in Wave 0 and the page ships on native scroll. The decision is not deferred past Wave 0. |
| Four diagrams rebuilt in parallel drift in visual style | Wave 0 ships the shared motion primitives and double-bezel shell first; diagram agents may only compose them, not invent new shells. |
| Geist swap breaks existing layout metrics | Type scale re-audited per section after the swap; contrast re-checked in both themes. |
| GSAP bundle cost | GSAP is dynamically imported by `ContextGraph` only, so it stays out of the initial bundle. |
| Deterministic screenshots impossible with ambient loops | All ambient loops expose a `data-motion-paused` hook that Playwright sets before capture. The simulation additionally accepts a seed and a tick count so a specific frame can be reproduced exactly. |
| A never-repeating simulation is untestable | Seeded mulberry32 PRNG, never `Math.random`. Same seed plus same tick count yields the same frame. Non-determinism is a bug, not an inherent property. |
| The simulation reads as decorative noise rather than an argument | The absorb-transform-emit chain is the argument: an item visibly enters as `commit` and leaves as `deploy`. Acceptance criterion 4a fails the build if labels do not transform. |
| CSS 3D isometric layers tank performance or shear vendor marks | Single scene depth, transform and opacity only, pre-composed shadows instead of animated `box-shadow`, and marks billboarded via inverse transform. Criteria 4c and 8 gate it. |
| Scroll-driven and rail-driven layer state diverge | One state machine owns the active layer; scroll and rail are both inputs to it, never independent owners. Criterion 4b tests both directions. |
| Interactive diagrams become keyboard traps inside a pinned section | Rail is a proper tablist with roving tabindex; criterion 7 includes a manual keyboard walk that must exit the pinned section cleanly. |
| Glass creeps out of Tier 1 during implementation and tanks the frame budget | Criterion 4d is a mechanical grep with an exact allowed surface list. Tier 2 specular glass is the default utility so reaching for blur requires deliberately leaving the sanctioned path. |
| Glass is invisible because the background is a flat color | Accepted and designed around, and verified empirically against eight shipped sites: Tier 1 exists only where the animated dot-grid substrate sits behind it and crossfades away past the hero, Tier 2 creates depth through gradient stroke and fill, Tier 3 adds light where refraction is impossible. No aurora or mesh gradient is added purely to justify blur. |
| Tier 3 glow decays into generic AI glow aesthetic | Three mechanical constraints gate it: background-layer radial gradient only (never `box-shadow`), offset off-center, desaturated tint. Criterion 4g fails the build otherwise. Scope is hard-capped at three surfaces. |
| The nav material transition pops or flickers at the boundary | 240ms crossfade on an IntersectionObserver against the hero trailing edge, not a scroll listener. Both material states are authored explicitly so neither is a partial render of the other. |
| The substrate is too faint for Tier 1 glass to register | The substrate carries deliberate luminance variance for exactly this reason. If it is ever flattened, the spec's stated fallback is to ship the nav as Tier 2 from the start rather than keep invisible blur. |
| Text on glass fails contrast unpredictably | Contrast is measured against the effective composited background, not the token. Glass never sits behind body copy that must pass AA. |
| Losing accessible diagram descriptions | Acceptance criterion 7 blocks merge; the `aria-label` strings are copied from the current `alt` text verbatim. |
| A vendor mark silently disappears when a PNG diagram becomes live DOM | `VENDOR_MARKS` is a typed registry, so an unmapped slug fails typecheck rather than rendering an empty box. Acceptance criterion 6 counts all 28 marks. |
| Datadog and Prometheus have no official SVG on hand | Wave 0 sources both via firecrawl from the vendor brand pages, with Simple Icons monochrome as the declared fallback. Wave 1 is not blocked: it consumes the registry, so the format swap is invisible to diagram agents. |
| Purple vendor marks read as the page accent on dark | Marks never sit on accent-filled surfaces and accent glow never falls on a purple-mark pill; if review still flags it, that one mark drops to monochrome. |

## Implementation shape

Parallel waves, all implementers on `composer-2.5-fast`:

```
Wave 0 (1 agent, sequential)  motion tokens + primitives + MotionProvider + Geist swap + shared bezel shell
                              + glass utilities (Tier 1 .glass-real, Tier 2 .glass-specular)
                              + browser-surface theming + reduced-transparency/forced-colors fallbacks
                              + seededRandom + ParticleField + IsoScene/Billboard + Constellation + LayerRail
                              + VENDOR_MARKS registry (13 inline SVG marks, theme variants,
                                Datadog/Prometheus SVG sourcing, Lucide-to-Phosphor glyph migration)
Wave 1 (4 agents parallel)    one diagram each: InnerOuterLoop, Offerings, Integrations, ContextGraph
                              (consume VENDOR_MARKS by slug; may not add or redraw marks)
                              InnerOuterLoop and ContextGraph are materially larger than the other two;
                              assign the strongest model available to those two slots.
Wave 2 (1 agent)              section choreography: Nav island, Hero split + mask reveal, Logos, WhoItsFor bento, Footer CTA
Wave 3 (1 agent)              PNG deletion, test expansion, reduced-motion path, cleanup
Wave 4 (1 agent)              Docker + 40 scrub screenshots + axe + Lighthouse evidence
```

Wave 1 agents may not edit shared primitives; if a primitive is insufficient they report it and Wave 2 fixes it centrally. File ownership is exclusive per agent to prevent collisions.

The implementation plan is written separately via the writing-plans skill.
