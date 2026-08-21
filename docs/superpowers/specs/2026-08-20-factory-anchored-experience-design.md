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
| `--color-accent` | `#B898F8` | Violet, fills and graphics |
| `--color-accent-cyan` | `#A8E0F8` | Cyan, fills and graphics |
| `--color-accent-text` | `#6D28D9` | Accent text on cream |
| `--color-pass` | `#4ADE80` | Retained |
| `--color-halt` | `#F0883E` | Retained |

The iridescent lavender to cyan to pink wash is the signature motif. It appears as a soft glow frame behind product screenshots and as the closing CTA band, matching deck slides 0 and 5. It is decorative and never carries meaning alone.

### 3.2 Contrast rules (binding)

Measured against WCAG 2.2 AA.

| Pair | Ratio | Verdict |
|---|---:|---|
| Ink `#181810` on cream | 14.7:1 | Pass |
| Muted `#6B6154` on cream | 5.0:1 | Pass |
| Deck muted `#96897C` on cream | 2.8:1 | **Fail — never use** |
| Violet `#B898F8` on cream | 2.0:1 | **Fail — fills only** |
| Cyan `#A8E0F8` on cream | 1.2:1 | **Fail — fills only** |
| Accent text `#6D28D9` on cream | 5.9:1 | Pass |
| Cream `#F0E8E0` on panel `#181810` | 14.7:1 | Pass |
| Deck muted `#96897C` on panel | 5.2:1 | Pass |
| Violet `#B898F8` on panel | 7.5:1 | Pass |
| Cyan `#A8E0F8` on panel | 12.5:1 | Pass |

**The rule:** the deck's own muted and accent colours are valid inside dark panels and invalid on cream. On cream, use `#6B6154` for muted text and `#6D28D9` for accent text. This replaces the old accent-text constraint and is enforced by an extension of the governance test.

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

### 3.4 Form

Radii sharpen from `rounded-xl` to **4px** on cards and panels, **3px** on buttons and chips, matching both the deck's hard panel edges and factory.ai's 3px. Base spacing unit 4px. Section padding grows to 120–160px vertical on desktop.

Iconography moves to thin line icons matching the deck's stroke weight. No filled or heavy-stroke icon sets.

### 3.5 Motion

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

### 3.6 Logo

The mark and wordmark geometry are unchanged. Colour adapts: ink `#181810` on cream, cream `#F0E8E0` on panels. The gradient icon variant may use the iridescent palette.

---

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

Industry vertical pages, an enterprise page, a security page, a news or articles hub, and a customers index. The IA anticipates them; this phase does not build them. Mobile remains deferred. Forms and analytics stay honestly stubbed.

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

---

## 11. Verification

1. `pnpm typecheck && pnpm test && pnpm build`
2. `node e2e/diagnose.mjs` reports zero overlaps, zero overflow, zero low-contrast logo grounds
3. `pnpm exec playwright test e2e/a11y.spec.ts` reports zero axe violations across all routes
4. Governance test extended to assert the contrast rules in 3.2 and the banned names in 4.5
5. Copy audit: at least 85% of sentences in content modules are 15 words or fewer
6. Every committed product frame and clip has a redaction sign-off recorded in the deviation log
7. Media budget: no clip encode exceeds 3 MB. Enforced by a check over `web/public/product/`
8. Reduced motion: with `prefers-reduced-motion: reduce`, no clip autoplays, every poster is visible, `Reveal` content is present at final state, and no content is unreachable
9. Autoplay correctness: every clip element carries `muted`, `playsInline`, `loop` and a `poster`
10. Off-screen clips are paused, verified by asserting `paused === true` for clips outside the viewport
