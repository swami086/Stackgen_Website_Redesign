# StackGen Website — Factory-Anchored Experience Design

**Date:** 2026-08-20
**Status:** Approved in brainstorming, pending user review
**Supersedes:** the pixel-parity contract in `2026-08-20-stackgen-nextjs-app-design.md` (Global Constraint 7)
**Reference:** [factory.ai](https://factory.ai/) · Figma `sg-new-postn-deck_editable` (file `YBfVxdQOKKZm7NcgceiacD`)

---

## 1. Summary

The Wave 1 build achieved pixel parity with `Stack_Linear.pen`: a cold dark site (`#08090A`) with a saturated purple accent, where every claim is proved by an abstract SVG diagram. It is competent and it does not persuade.

This design re-anchors the experience on factory.ai and re-skins it with StackGen's current positioning deck. Three sources contribute, each doing one job:

| Source | Contributes | Does not contribute |
|---|---|---|
| **factory.ai** | Section architecture, page rhythm, numbered sequences, type-scale contrast, copy discipline | Colour, typeface, brand |
| **Positioning deck** (Figma) | Full visual system, all diagrams | Structure, copy length |
| **StackGen demo videos** | Product footage as the proof layer | Anything else |

The result should read as factory.ai's information architecture and editorial confidence, wearing the positioning deck's warm light skin, proved by real product footage.

### Decisions locked in brainstorming

| # | Decision |
|---|---|
| D1 | factory.ai is the experience contract. `Stack_Linear.pen` is updated afterwards to match what ships. Code leads, canvas follows. |
| D2 | Proof layer is real product footage from StackGen demo videos: short autoplay loops for surface proofs, click to play for the long case study video. |
| D3 | Screenshots ship authentically in the product's green chrome. Site accent stays separate. |
| D4 | Spec defines the full target IA. Build scope is Home, the four product pages, and Platform. |
| D5 | Design system is open. The logo mark and wordmark shape are fixed; its colour adapts to ground. |
| D6 | Typeface is Haffer XH, pending web licence confirmation. Geist is the documented fallback. |
| D7 | Deck diagrams replace the app's diagrams. Banned names are corrected on port. |
| D8 | Observability keeps its existing SVG, restyled to the deck's language. |
| D9 | Motion is partially implemented in this phase, because the proof is temporal. `Reveal`, `MotionProvider` and clip playback ship now. Diagram `data-part` choreography stays Wave 2. |
| D10 | Clip weight budget is 3 MB per encode, prioritising fidelity. |
| D11 | Surface mode is Persuade. Colour strategy is Committed: the iridescent field owns whole regions rather than accenting a neutral ground. |
| D12 | Form derives from the deck alone. factory.ai contributes structure and copy discipline, never radii, colour or type. |
| D13 | Every meaning-carrying colour is a ground-aware pair, because no single value clears both cream and plate. Status is never encoded by colour alone. |
| D14 | Desktop-only is kept for this phase but re-argued rather than inherited: fluid primitives, touch handled now, breakpoints anticipated and unimplemented. |
| D15 | Diagram copy is length-constrained content. `DiagramText` takes a `maxLines` bound and truncates rather than overflowing its plate. |

---

## 2. Source-of-truth precedence

1. `PRODUCT.md` — naming, claims, product truth
2. **This spec** — experience, structure, design system
3. Figma `sg-new-postn-deck_editable` — visual system and diagram geometry
4. factory.ai — structural and editorial reference only
5. `Stack_Linear.pen` — updated to match shipped code; no longer a parity gate

The Wave 5 parity harness (`web/e2e/parity.spec.ts`) measured against the canvas and is retired as a gate. `web/e2e/diagnose.mjs` and `web/e2e/a11y.spec.ts` are retained.

---

## 3. Design system

### 3.0 Mode, scene, and colour strategy

**Mode: Persuade.** Home, the four product pages, and Platform are all surfaces where the visitor decides and acts. Design is the product here. Expression is permitted to lead, provided the offer and the primary action stay legible.

**Physical scene, which forces the light decision.** The SRE evaluates from inside a running estate, at night, in a dark terminal beside a dark dashboard. The executive buyer reads in a lit room, often from a deck someone sent them. A dark site would disappear into the SRE's existing screens and read as one more tool; a light site with the product rendered in dark panels puts the page in the buyer's register and the product in the SRE's. **The ground is light because the page is a document about the product, not an imitation of it.** That is the argument for cream, not a default.

**Colour strategy: Committed.** The iridescent field carries whole regions, not accents scattered on neutral ground. On the deck's title slide the prism occupies roughly forty percent of the frame as a hard-edged diagonal, and that is the licence this system inherits. Restrained is rejected explicitly: it is the strategy that would make this world's softest rendition.

Region-scale colour appears in at least three places: the hero, one mid-page transition, and the closing band. Anything less and the accents have been demoted to decoration.

### 3.1 Palette

Light-first. Sampled from the deck's own pixels, then calibrated for web contrast.

| Token | Value | Role |
|---|---|---|
| `--color-bg-base` | `#F0E8E0` | Page ground, warm cream |
| `--color-bg-raised` | `#E7DED4` | Raised cream surface |
| `--color-panel` | `#181810` | Dark panel, diagram and screenshot ground |
| `--color-panel-raised` | `#202018` | Nested panel |
| `--color-border-hairline` | `#D0C8C0` | Hairline on cream |
| `--color-border-panel` | `#2A2820` | Hairline inside panels |
| `--color-text-primary` | `#181810` | Ink on cream |
| `--color-text-secondary` | `#6B6154` | Muted on cream (web-calibrated) |
| `--color-text-on-panel` | `#F0E8E0` | Cream text on panels |
| `--color-text-muted-panel` | `#96897C` | Deck muted, valid on panels only |
| `--color-accent` | `#B898F8` | Violet, fields and graphics |
| `--color-accent-cyan` | `#A8E0F8` | Cyan, fields and graphics |

**Every role that carries meaning is a pair**, because no single value clears both grounds. This was verified by computation, not by eye: every dark value tested passes on cream and fails on plate, and every bright value does the reverse.

| Role | On cream | Ratio | On plate | Ratio |
|---|---|---:|---|---:|
| Accent text | `--color-accent-text` `#6D28D9` | 5.86 | `--color-accent` `#B898F8` | 7.55 |
| Primary action fill | `--color-action` `#4C1D95` with cream label | 9.04 | `#B898F8` with ink label | 7.55 |
| Focus ring | `--color-focus` `#4C1D95` | 9.04 | `#B898F8` | 7.55 |
| Success / cleared | `--color-pass-ink` `#166534` | 5.88 | `--color-pass` `#4ADE80` | 10.24 |
| Held / escalated | `--color-halt-ink` `#9A3412` | 6.03 | `--color-halt` `#F0883E` | 7.05 |
| Information | `--color-info-ink` `#155E75` | 5.99 | `--color-accent-cyan` `#A8E0F8` | 12.47 |

The iridescent lavender to cyan to pink wash is the signature. It is a **structural field**, not a glow: it holds whole regions with its own hard edges, in the deck's diagonal geometry. It never carries meaning alone, and no text sits on it without a solid plate beneath.

**The action colour is not the decorative colour.** `#4C1D95` exists so the primary action stays findable against a page where pastel violet already owns large regions. Spending the field's colour on the button would bury the CTA in its own background, which is the failure the Committed strategy invites if left unguarded.

Values are recorded as hex to match the existing `@theme` block. Where a ramp is derived during implementation, derive it in OKLCH and reduce chroma near both extremes rather than holding chroma flat.

### 3.2 Contrast rules (binding)

Computed against WCAG 2.2 AA over the whole palette, every foreground against every ground, rather than a chosen subset.

| Foreground | cream `#F0E8E0` | cream raised `#E7DED4` | plate `#181810` | plate raised `#202018` |
|---|---:|---:|---:|---:|
| Ink `#181810` | **14.72** | **13.42** | 1.00 | 1.09 |
| Muted `#6B6154` | **5.00** | **4.56** | 2.94 | 2.70 |
| On-plate `#F0E8E0` | 1.00 | 1.10 | **14.72** | **13.52** |
| Deck muted `#96897C` | 2.81 | 2.56 | **5.24** | **4.81** |
| Violet `#B898F8` | 1.95 | 1.78 | **7.55** | **6.93** |
| Cyan `#A8E0F8` | 1.18 | 1.08 | **12.47** | **11.46** |
| Accent text `#6D28D9` | **5.86** | **5.34** | 2.51 | 2.31 |
| Pass `#4ADE80` | 1.44 | 1.31 | **10.24** | **9.41** |
| Halt `#F0883E` | 2.09 | 1.90 | **7.05** | **6.48** |

Bold passes AA body text at 4.5. Everything else is barred from carrying text on that ground.

**The rule:** the deck's own muted, accent and semantic colours are valid inside dark plates and invalid on cream; their cream counterparts from 3.1 are invalid on plates. A component that appears on both grounds reads its colours from the ground, never from a single global value.

`#6B6154` on cream raised is 4.56, which passes but has almost no headroom. Do not darken that surface further without re-deriving the muted value.

### 3.2.1 Colour vision and non-colour encoding

Simulated across protanopia, deuteranopia and tritanopia rather than assumed.

**Pass and halt converge under deuteranopia**, the most common deficiency: `#4ADE80` and `#F0883E` render as `#BEBD85` and `#B3B331`, a contrast of 1.15 with a luminance difference of 0.07. They are effectively the same olive.

Therefore, binding: **status is never encoded by colour alone.** Every pass, halt or escalation state also carries a text label, a glyph, or a position. The existing `ChangeSurface` already satisfies this, using `+` and `-` prefixes and the written verdict rather than red and green, and that pattern is the standard for every new status surface.

Violet and cyan hold up better, separated by lightness rather than hue (difference 0.24 to 0.32 across all three simulations), so they survive as a decorative pair. They still may not be the sole encoder of a data category; vary lightness, shape or label as well.

### 3.3 Typography

Haffer XH (Displaay), with Geist as the documented fallback until the web licence is confirmed. JetBrains Mono is retained for code, metrics and micro-labels.

Tracking inverts from the current system. The deck tracks outward: +0.24px at 24px, +0.72px at 18px. Positive tracking on body and micro-labels is an editorial signature shared with factory.ai and is adopted deliberately.

| Role | Size | Leading | Tracking |
|---|---|---|---|
| Display (hero) | 72–96px | 1.02 | −0.02em |
| H2 section | 40–48px | 1.12 | −0.01em |
| H3 card | 24px | 1.32 | +0.01em |
| Body | 16–18px | 1.4 | +0.04em |
| Micro-label | 10–11px | 1.4 | +0.2em, uppercase |
| Metric figure | 48–64px | 1.0 | −0.02em, tabular |

Extreme scale contrast is the point: a 96px display against an 11px tracked-out label on the same screen. Headings are sentence case. ALL-CAPS is reserved for micro-labels and the hero eyebrow.

**Reading measure.** Prose sits between 45 and 75 characters. Express it in `ch`, not px, so it survives the face swap: body prose `max-width: 68ch`, section intros `56ch`, display `18ch`. The current spec's px max-widths were derived from the deck's 1920 slides and do not transfer.

**Light-on-dark compensation, binding.** Cream text on a dark plate needs correction on all three perceptual axes, because the same values that read correctly as ink on cream will look thin and tight when inverted. On plates: line height +0.05, tracking +0.01em, and one weight step up where the face offers it. A component that renders on both grounds carries both settings, exactly as it carries both colours.

**Font loading.** This is the highest layout-shift risk in the whole system, because Haffer XH ships later than the build and Geist stands in until it does. Two faces with different metrics swapping at runtime will reflow every heading.

- Self-host both, `woff2` only, subset to Latin, and load only the weights the scale uses: 400, 500, 600.
- `font-display: swap`, never `block` or `auto`.
- The fallback declares metric overrides so the swap does not move text: `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` measured against the real face, not guessed.
- Verify with a CLS measurement across the swap, not by eye.

**Stress behaviour.** Every type role is specified against its worst case, not its demo string: headings that run three lines, translations 30 to 40% longer, browser zoom at 200%, and the fallback face active. Nothing may depend on a heading fitting on one line.

Numerals are tabular wherever figures align in a column or update in place. Metric figures, clip timestamps and policy counts all qualify.

### 3.4 Material inventory

The deck's full material range, each material assigned a role. Using only the first two would be this world's softest rendition, which is the failure mode this section exists to prevent.

| Material | Deck source | Role on the site |
|---|---|---|
| **Iridescent prism field** | Slide 0 | Hard-edged diagonal field owning whole regions: hero, one mid-page transition, closing band |
| **Dark plate on cream** | Slides 2, 5 | The ground for every product clip, screenshot and ported diagram |
| **Architectural wireframe line art** | Slide 2 | Section transitions and empty regions; thin cream strokes on the dark plate |
| **Isometric layered object** | Slide 7 | The Operational Context Graph's own form; the one dimensional object in the system |
| **Glow-framed product plate** | Slide 5 | `ProductFrame`, where iridescence meets the dark plate |
| **Dot-grid canvas** | Product UI | Backdrop for pipeline and node diagrams, inherited from the real product |
| **Step chip** | Slide 12 | `NumberedSequence` markers, violet border when active, hairline when not |

### 3.5 Form

**Radii derive from the deck, not from factory.ai.** factory.ai contributes structure and copy discipline only; the deck owns form. The earlier draft imported factory.ai's 3px, which mixed two worlds on one page. Radii are sampled from the deck's own cards and plates during token extraction, and the observed range is small but not sharp: roughly 4 to 8px on cards and plates, tighter on chips than on containers, with concentric inner and outer values where a plate nests inside a frame.

**Spacing scale**, documented rather than ad hoc. A 4-unit base because it supplies the middle steps an 8-only scale misses:

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120 · 160`

Section padding is 120 to 160 vertical on desktop. Rhythm comes from contrast between tight and generous intervals, never from one value repeated: a dense passage earns a quiet one, and there is always more space above a heading than below it, so the heading binds to the content it introduces.

**Grid.** A 12-column grid on a 1240 content width with 24 gutters, inside the 100 page gutter. Diagrams and product plates may run to the full 1240; prose never does, because it is bound by measure. Full-bleed is reserved for the iridescent fields and the closing band.

Iconography is thin line icons at the deck's stroke weight. No filled sets, no heavy strokes, and none of the default icon libraries whose shapes are recognisable as a default.

### 3.5.1 Interaction states

Every interactive element declares five states, not two. The current build defines hover and focus inconsistently and defines the rest not at all.

| State | Treatment |
|---|---|
| Rest | As specified |
| Hover | Ground shifts one step; `transform` and `opacity` only, 200ms |
| Active | `scale(0.98)`, giving the press physical feedback |
| Focus visible | 2px ring in the ground-aware focus colour from 3.1, 2px offset, never removed |
| Disabled | Reduced opacity plus `cursor: not-allowed` plus an accessible name explaining why |

Hover is an enhancement, never a carrier of information, because touch and keyboard users never receive it. Gate hover treatments behind `@media (hover: hover)` and give `@media (pointer: coarse)` larger targets: 44 × 44 minimum, regardless of how small the visible mark is.

### 3.6 Motion

Motion is **partially implemented in this phase**, because the proof layer is temporal. A still frame of three agents scanning an AWS account does not prove the claim; the running does. Deferring all motion would leave the central argument unproved.

`motion` 13.1.0 is already installed and unused, and every section body already wraps in `Reveal`, so this is a body swap on two components rather than a refactor.

**In scope this phase**

| Item | Behaviour |
|---|---|
| `Reveal` | Real scroll entry. Opacity 0 to 1, `translateY(16px)` to 0, 600ms, `cubic-bezier(0.32, 0.72, 0, 1)`. Staggered by an optional `delay` prop. Fires once via `IntersectionObserver` |
| `MotionProvider` | Hosts reduced-motion context, read once and shared, so components do not each query the media list |
| `ProductClip` | Autoplay loop orchestration for surface proofs |
| Case study video | Click to play, poster until invoked |

**Out of scope, still Wave 2**

Diagram `data-part` choreography, page transitions, scroll-scrubbed sequences, marquee physics beyond a plain CSS translation.

**Rules**

Only `transform`, `opacity`, `filter` and `clip-path` may be animated. No animation may shift layout. Viewport detection uses `IntersectionObserver`, never a scroll listener. `will-change` is applied only while an element is actively animating.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, `Reveal` renders content immediately in its final state, clips do not autoplay and present their poster with a visible play control, and the marquee holds still. Nothing is hidden and no state change is lost. The existing global `0.01ms` override in `globals.css` is removed, because it destroys useful feedback rather than replacing it with a calmer alternative.

### 3.7 Logo

The mark and wordmark geometry are unchanged. Colour adapts: ink `#181810` on cream, cream `#F0E8E0` on panels. The gradient icon variant may use the iridescent palette.

---

### 3.8 Calibration self-check

AI-generated interfaces converge on a small number of looks regardless of subject. The first of them is *warm cream ground, high-contrast display, muted accent*. **This system sits inside that cluster**, and the check is not whether it does but whether it earned the place.

| Test | Answer |
|---|---|
| Is the aesthetic guessable from the category alone? | No. The category default for agentic DevOps is near-black with a neon accent, which is what the current site already is |
| Is the ground a taste default? | No. It is pinned by the positioning deck and argued from the physical scene in 3.0 |
| Is this the pinned world's softest rendition? | Guarded against by 3.0's Committed strategy and 3.4's material inventory. Cream plus one pastel glow would have been the soft rendition |
| Does one world own the page? | Yes, after the 3.5 correction. factory.ai supplies structure and copy only; the deck supplies all form |
| Are the fonts training-data defaults? | No. Haffer XH is the deck's own face. Inter-as-display, the previous system's approach, is explicitly among the defaults being left behind |

The failure mode to watch during build: cream ground plus dark cards plus a tasteful gradient, arriving at a competent page that any model would produce for this brief. The corrective is region-scale colour and the full material inventory, both binding.

### 3.9 Interface states

The site is a review prototype with stubbed forms, which is why the current build has almost no states beyond the happy path. That is a gap, not a licence: a prototype that only works with perfect input misrepresents the product.

| Surface | Empty | Loading | Error |
|---|---|---|---|
| Product clip | Poster holds | Poster holds until the first frame decodes; never a spinner over video | Poster holds permanently, caption still readable. A clip that fails must be indistinguishable from a still |
| Demo form | Labels and hint visible before input | Submit disabled with a "Sending" label, guarding double submission | Inline message adjacent to the field, `role="alert"`, input preserved |
| Case study video | Poster with play control | Skeleton matching the poster's aspect, never a layout jump | Message with a link to the video's own page |
| Logo and integration grids | Not applicable, content is static | Not applicable | Not applicable |
| Route not found | Branded 404 carrying nav, a one-line explanation, and a route back to Home | — | — |

A 404 page is required. The current app has none, so an unknown route renders the framework default, which breaks the world on the one page a visitor reaches by accident.

### 3.10 Resilience

**Text expansion is the live architectural risk.** `DiagramText` wraps SVG copy to a fixed canvas box width and the surrounding geometry assumes a fixed line count. German runs 30 to 40% longer than English, which adds lines the box was never sized for, and SVG does not reflow around it. Three consequences, all binding:

1. Every wrapped block declares the maximum line count its geometry tolerates.
2. `DiagramText` accepts a `maxLines` bound and truncates with an ellipsis at that bound rather than overflowing the plate silently.
3. Diagram copy is treated as length-constrained content. A translation that exceeds the bound is a content problem to solve in copy, not a layout to stretch.

**Overlong single tokens.** `wrapText` deliberately leaves a word longer than the box on its own line rather than breaking it, so a long resource identifier will overflow. Acceptable for prose; not acceptable for the mono identifiers that appear throughout the product surfaces. Mono content in SVG uses a character bound and truncates with an ellipsis.

**Internationalisation.** No translation is planned in this phase, so the obligation is to avoid foreclosing it: no fixed-width text containers, logical properties (`padding-inline`, `margin-inline-start`) rather than physical ones, and `Intl` for any date or number that reaches the page. RTL is not supported and is recorded as a deviation rather than half-built.

**Degradation.** Core content renders without JavaScript: the page is server-rendered, and the only client components are the nav, the demo form and clip playback. With JavaScript off, clips present their posters and the form falls back to native validation. Images and clips carry explicit `width` and `height` so nothing reflows on load.

## 4. Content system

factory.ai's copy discipline, measured across its home, product, enterprise, industry and pricing pages:

| Metric | factory.ai | Target |
|---|---|---|
| Median sentence length | 7 words | 7–9 words |
| Mean sentence length | 8.5–11.4 words | under 12 |
| Sentences at 15 words or fewer | 79–96% | at least 85% |
| Longest sentence | 18–40 words | under 30 |
| Section intro | one sentence | one sentence |

Rules, binding on all content modules:

1. One idea per section. One sentence per section intro.
2. Headings in sentence case. Micro-labels uppercase.
3. Numbers may be headings. `10×` over `10× faster provisioning` as the heading, with the noun beneath.
4. Every metric cites a mechanism. Every quote is published with a source URL or visibly marked `PLACEHOLDER`.
5. Banned copy is unchanged: no `Olly`, no `Aiden for InfraOps`, no `Aiden for DevOps`, no em dashes, no `single pane of glass`, no competitor-replacement claims.
6. Schedule demo is the only primary CTA.

---

## 5. Page architecture

### 5.1 Home

Thirteen sections following factory.ai's claim, proof, mechanism, breadth, trust, close rhythm.

| # | Section | Ground | Source | Status |
|---|---|---|---|---|
| 1 | Hero | Cream | New | Display headline, tracked eyebrow, Schedule demo plus secondary, product screenshot in bezel with iridescent glow |
| 2 | Logo wall | Cream | Existing | Eight wordmarks, gains a framing sentence above |
| 3 | The gap | Cream | Deck slide 1 | Stat-led band, bare numbers as headings |
| 4 | Surfaces `01–04` | Cream, dark panels | Product video | **New.** Four Aiden surfaces with real footage |
| 5 | Tirith policy gate | Dark panel | Existing | `ChangeSurface` retained, restyled |
| 6 | Four-step ADF lifecycle | Dark panel | Deck slide 12 | Numbered `STEP 01–04` |
| 7 | Operational Context Graph | Dark panel | Deck slide 7 | Hub and five domains |
| 8 | Integrations | Cream | Existing | Seven-category text grid |
| 9 | Case studies | Cream | Existing | greytHR featured plus quote wall |
| 10 | Enterprise trust | Cream | Existing | SOC 2, PCI, HIPAA plus capability chips |
| 11 | Use cases `01–06` | Cream | New | What Aiden runs autonomously |
| 12 | Final CTA | Iridescent | New | Gradient band |
| 13 | Footer | Cream | Existing | Simplified |

### 5.2 Product pages

Six sections, identical template across all four slugs:

| # | Section | Ground | Note |
|---|---|---|---|
| 1 | Hero | Cream | Eyebrow, h1, one-sentence sub, Schedule demo |
| 2 | Metrics | Cream | Four bare numbers as headings, noun and mechanism beneath |
| 3 | Surface sequence `01–03` | Cream, dark panels | Exactly three product screenshots per page, drawn from that product's demo video |
| 4 | Mechanism | Dark panel | The ported deck diagram for that product |
| 5 | Early access | Cream | Infrastructure only; omitted on the other three |
| 6 | Final CTA | Cream | `FinalCtaCompact` |

### 5.3 Platform

Hero, two planes, Operational Context Graph, Aiden OS, product links, close. Platform is the one page where abstraction beats a screenshot, so its diagrams lead.

---

## 6. Diagram port

Deck diagrams replace the app's. Geometry is ported from Figma; copy is corrected to the naming table.

| App slot | Deck slide | Figma node | Port note |
|---|---|---|---|
| Creation versus operations gap | 1 | `1:7514` | Replaces `ProblemDiagram`. In scope |
| Human toll, four failure modes | 2 | `1:14797` | Deferred, not in build scope |
| On-call crisis | 3 | `1:7661` | SRE product page. In scope |
| Context gap | 4 | `1:7729` | Deferred, not in build scope |
| ADF intent | 5 | `1:14635` | Deferred, not in build scope |
| Factory model | 6 | `1:7854` | Deferred, not in build scope |
| Operational Context Graph | 7 | `1:7929` | Replaces `OperationalContextGraph` |
| Aiden for SRE | 8 | `1:8055` | Replaces `SreMechanism` |
| **Aiden for Automation** | 9 | `1:14411` | Deck titles this "Aiden for DevOps". **Rename on port.** |
| **Aiden for Infrastructure** | 10 | `1:8591` | Deck titles this "InfraOps". **Rename on port.** |
| Aiden OS | 11 | `1:8708` | Replaces `AidenOsLinksDiagram` |
| Four-step ADF lifecycle | 12 | `1:13727` | Replaces `AdfLoopDiagram` and `FactoryProcessDiagram` |
| Roadmap | 13 | `1:13969` | **Rename on port.** Uses both banned names |
| Modeled ROI | 14 | — | **Excluded.** No dollar ROI on the public site |

`ObservabilityMechanism` has no deck source and is retained, restyled to the deck's dark-panel language.

Ported diagrams keep the existing technical contract: one `<svg>` per diagram, geometry read rather than estimated, `data-part` on every animatable part, real `<text>` never paths, `role="img"` with `<title>`, `<desc>` and `aria-labelledby`, and body copy wrapped through `DiagramText` at the source box width.

---

## 7. Product proof pipeline

Source videos on the StackGen YouTube channel:

| Surface | Video | ID | Length |
|---|---|---|---|
| Compliance and audit | Auto-Generate Compliance and Security Audits | `i31kMgVn_Xk` | 4:17 |
| Automation | Approval and Auto Remediation Flow | `HKEV6rkRDzU` | 2:38 |
| Infrastructure | Module Editor, MCP Server, IDE | `92UTOY9C1UY` | 3:13 |
| Observability | StackOptimizer | `2PsieosSyAw` | 5:47 |
| Platform | Introducing Autonomous Infrastructure Platform | `NBl7pkkxxZM` | 2:01 |

### 7.1 Two proof formats

| Format | Where | Behaviour |
|---|---|---|
| **Surface clip** | Home surfaces `01–04`, product page sequences | 8 to 15 second muted loop, autoplays in view |
| **Case study video** | Featured case study | Poster with play control, click to play, full length |

### 7.2 Clip specification

| Property | Value |
|---|---|
| Duration | 8 to 15 seconds, cut on a complete action |
| Width | 1440, height auto from source |
| Primary encode | AV1 in WebM |
| Fallback encode | H.264 in MP4, `yuv420p`, faststart |
| Weight budget | 3 MB per clip maximum, per encode |
| Poster | WebP extracted from the clip's first frame |
| Attributes | `muted`, `playsInline`, `loop`, `preload="none"`, `poster` |

`muted` and `playsInline` are not optional. Without both, autoplay is silently refused on Safari and iOS.

Playback is orchestrated by `IntersectionObserver`: play on enter, pause on exit, and pause when the document is hidden. Never leave clips decoding off-screen.

### 7.3 Process

Fetch with `yt-dlp` at 1080p, cut segments with `ffmpeg`, encode both formats, extract the poster, review for sensitive content, then commit to `web/public/product/`.

### 7.4 Redaction

**Redaction is mandatory and harder for motion than for stills.** Observed in raw frames of `i31kMgVn_Xk`: an AWS account ID (`180217099948`) and live bucket names including `aiden-eval-reports`, `prathvi-aiden-infra-backend-bucket` and `stackgen-terraform-state-bucket-a928b57`.

A ten second clip is roughly 300 frames and every one of them ships. Frame-by-frame editing is not viable, so the controlling rule is **selection over redaction**: choose segments that contain no sensitive identifiers in the first place. Verify by extracting every frame of the candidate segment and scanning it, not by spot-checking.

Scan for account IDs, ARNs, bucket and repository names, internal hostnames, email addresses, customer names and API tokens. Where a still poster needs a fix, replace values with plausible neutral equivalents rather than blurring, so it still reads as real. If a segment cannot be made clean by selection, it is not used.

### 7.5 Presentation and accessibility

Clips and stills render inside `ProductFrame`: a dark bezel on the cream ground with an iridescent glow, mirroring the deck's treatment on slide 5.

A silent clip that carries meaning needs a non-visual equivalent. Each surface proof pairs with a visible one-sentence caption describing what the surface does, and the `video` element carries an `aria-label` naming the surface. No `track` element is used, because there is no speech. Decorative bezel and glow are `aria-hidden`.

---

## 8. Component inventory

**New**

| Component | Purpose |
|---|---|
| `NumberedSequence` | The `01–06` device. Used three times on home |
| `NotFound` | Branded 404 carrying nav, one line of explanation, and a route home |
| `ProductFrame` | Dark bezel plus iridescent glow. Accepts a still or a clip |
| `ProductClip` | Client component. Autoplay loop, `IntersectionObserver` play and pause, poster under reduced motion |
| `VideoFigure` | Click to play for the long case study video |
| `Marquee` | Logo and model scrollers, holds still under `prefers-reduced-motion` |
| `StatBand` | Bare numbers as headings with nouns beneath |
| `IridescentBand` | The closing CTA ground |

**Rewritten**

| Component | Change |
|---|---|
| `Reveal` | Inert pass-through becomes a real scroll-entry component. Call sites unchanged |
| `MotionProvider` | Inert pass-through becomes the reduced-motion context host |

**Retained**

`ChangeSurface`, `DiagramText`, `FinalCtaCompact`, `Logos`, `Integrations`, `MetricCell`, `Nav`, `Footer`, `Reveal`, `MotionProvider`, and the case study sections. All are re-tokenised to the light system.

**Superseded**

`ProblemDiagram`, `FactoryProcessDiagram`, `AdfLoopDiagram`, `AgenticOsDiagram`, `OperationalContextGraph`, `AidenOsLinksDiagram`, `InfrastructureMechanism`, `AutomationMechanism`, `SreMechanism`. Files are retained until their deck replacements pass review, then removed in a single cleanup.

---

## 9. Out of scope

Industry vertical pages, an enterprise page, a security page, a news or articles hub, and a customers index. The IA anticipates them; this phase does not build them. Forms and analytics stay honestly stubbed. RTL is not supported.

**Responsive, re-examined rather than inherited.** Desktop-only came from the retired canvas parity contract, so it does not survive automatically. It is nevertheless kept for this phase, on a narrower and honest basis: the audience evaluates from a workstation, and the build scope is already large. What changes is that the deferral must not foreclose the work:

- Layout uses fluid primitives and `clamp()`, not fixed pixel widths, so narrowing degrades rather than breaks.
- Content-driven breakpoints are anticipated at roughly 640, 768 and 1024, and left unimplemented.
- Touch is handled now, because touch-capable desktops exist: 44 × 44 targets and no hover-only information, per 3.5.1.
- Clips are the one mobile-hostile element. When the responsive phase lands they must not autoplay on `pointer: coarse` or under a Save-Data hint.

SC 1.4.10 Reflow and SC 1.4.4 Resize Text remain accepted deviations, and full AA conformance is not claimed.

---

## 10. Risks and open items

| # | Risk | Handling |
|---|---|---|
| R1 | Haffer XH web licence unconfirmed | Ship Geist until confirmed. Swap is a single token change |
| R2 | Product frames leak internal identifiers | Mandatory redaction review, item 7. No frame ships unreviewed |
| R3 | Light ground inverts every existing component's tokens | Tokens are centralised in `@theme`; components already use tokens, not hex |
| R4 | Deck diagrams are 1920-wide slides, the site is 1440 | Port geometry proportionally, do not scale a 1920 viewBox into a 1240 box. This caused the previous parity defects |
| R5 | Product UI green against site violet and cyan | Accepted per D3. Screenshots are bounded inside `ProductFrame` |
| R6 | Canvas drifts from shipped code | Accepted per D1. Canvas is updated after the build |
| R7 | Clip weight on the critical path. Four clips at 3 MB is 12 MB per section | `preload="none"`, poster-first paint, `IntersectionObserver` gating, and clips never block first paint. Budget enforced in verification |
| R8 | Motion sickness and distraction from four looping clips in one viewport | Only the clip in view plays. Loops are slow, contain no flashing, and respect reduced motion by holding on the poster |
| R9 | Redacting moving footage is impractical frame by frame | Controlled by segment selection, not editing. Every frame of a candidate segment is scanned before use, per 7.4 |
| R10 | The Haffer XH to Geist swap reflows every heading | Metric-overridden fallback and `font-display: swap`, per 3.3. CLS measured across the swap, not judged by eye |
| R11 | Translated diagram copy overflows fixed SVG plates | `maxLines` bound with ellipsis truncation, per 3.10 and D15. Diagram copy is length-constrained content |
| R12 | Committed colour plus large iridescent fields buries the CTA | `--color-action` is a separate value from the field, per 3.1. Squint test in verification item 16 catches it |

---

## 11. Verification

1. `pnpm typecheck && pnpm test && pnpm build`
2. `node e2e/diagnose.mjs` reports zero overlaps, zero overflow, zero low-contrast logo grounds
3. `pnpm exec playwright test e2e/a11y.spec.ts` reports zero axe violations across all routes
4. Governance test extended to assert the contrast rules in 3.2 and the banned names in 4.5
5. Copy audit: at least 85% of sentences in content modules are 15 words or fewer
6. Every committed product frame and clip has a redaction sign-off recorded in the deviation log
6a. Colour: the contrast matrix in 3.2 is regenerated against the shipped tokens and every text pair on its own ground passes 4.5, controls and focus rings pass 3.0
6b. No status is encoded by colour alone; every pass, halt or escalation state carries a label, glyph or position as well
7. Media budget: no clip encode exceeds 3 MB. Enforced by a check over `web/public/product/`
8. Reduced motion: with `prefers-reduced-motion: reduce`, no clip autoplays, every poster is visible, `Reveal` content is present at final state, and no content is unreachable
9. Autoplay correctness: every clip element carries `muted`, `playsInline`, `loop` and a `poster`
10. Off-screen clips are paused, verified by asserting `paused === true` for clips outside the viewport
11. Font swap causes no layout shift: CLS measured across the fallback-to-Haffer transition, target 0
12. Type stress: every heading renders correctly at three lines, at 200% zoom, and with the fallback face active
13. Prose measure is between 45 and 75 characters at 1440
14. Every interactive element has all five states from 3.5.1, and focus is never removed
15. States: the 404 renders in-world, a failed clip is indistinguishable from a still, and the demo form cannot be double-submitted
16. Squint test: with detail blurred, the primary element, secondary element and major groups are still identifiable in order on every page

---

## 12. Design process contract

This is a replacement visual world, so the impeccable new-work flow governs the build.

**The direction is pinned, not rolled.** A replacement world normally requires a concept-seed direction round. A user-pinned or brief-pinned direction beats the roll, and the positioning deck is pinned by the user. The roll is therefore not run, and this line is the record of why.

**Direction contract in the markup.** Before code, the chosen direction is written as a five-block comment in the root layout, emitted as an HTML comment in the built output so it survives production build: THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM. It closes with the FINISH line stating that unreviewed and undocumented is unfinished. After the first production build, grep the output for it; a contract the build strips is a contract nobody can audit.

**Detector.** No design hook is active in this project, so `node .cursor/skills/impeccable/scripts/detect.mjs --json <changed targets>` runs once over the changed surfaces after the build, not during concept work. Mechanical findings are fixed; the rest goes to the reviewer.

**Finish review.** The build ends with the `impeccable-finish-reviewer` spawned fresh with no inherited history, given the request, the artifact paths, screenshots in `.impeccable/review/`, the direction contract, detector findings, and the craft-floor reference. Its disposition word governs: recapture, rebuild, ship, or fix. Two fix rounds is the budget.

**DESIGN.md.** Written at finish by the `impeccable-documenter` from the built world, not before the build from intention. A new world shipped without DESIGN.md is an incomplete run.

**PRODUCT.md drift, reported then repaired on authorisation.** `PRODUCT.md` recorded the superseded commitment: the visual world pinned to Linear, and `#9437FF` retained as the single accent, both confirmed 18 Aug 2026. The drift was reported rather than repaired as a side effect, and the user authorised the update separately on 20 Aug 2026. `PRODUCT.md` now records the deck-pinned world, the Committed colour strategy, the shipped Next.js stack, the demo footage as real evidence with its binding redaction rule, and the light-world contrast constraint. The superseded Linear pin is retained in the file as an explicit line so the change stays auditable.
