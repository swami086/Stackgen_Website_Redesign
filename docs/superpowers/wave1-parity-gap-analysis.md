# Wave 1 Canvas Parity — Gap Analysis and Fix Plan

**Date:** 2026-08-20
**Branch:** `main` (post Wave 1 merge, `2bad884`)
**Method:** systematic-debugging Phase 1–2. Evidence from Pencil MCP reads of `Stack_Linear.pen`, Torbit code graph, and live DOM instrumentation (`web/e2e/diagnose.mjs`) against the dev server at 1440×1024.

**Status:** Investigation complete. No fixes applied yet.

---

## Executive summary

The build is structurally sound but visually diverges from the canvas in ways the Wave 5 audit failed to catch — because that audit compared every product and platform route against **the wrong canvas frame**. Five root causes explain every symptom the user reported.

| # | Root cause | Symptom the user sees | Blast radius |
|---|---|---|---|
| **RC1** | Wave 5 parity audit used an off-by-one canvas→route mapping | Wrong things were "fixed", real defects never found | 6 routes, 31 logged deviations |
| **RC2** | SVG `<text>` rendered unwrapped; canvas text boxes have a fixed width | **Text overlapping** | 6 diagrams, 13 overlap pairs, 8 overflows |
| **RC3** | Customer logos are dark brand SVGs on a near-black strip | **Logos missing** | Home logo strip |
| **RC4** | Mechanism heading rendered twice (DOM header + inside SVG) | Duplicated copy, oversized sections | 4 product pages |
| **RC5** | Section chrome padding/copy drift vs canvas | Pages 200–650px too tall | 9 routes |

---

## RC1 — The Wave 5 parity audit compared against the wrong canvas frames

**Evidence.** Ground truth from Pencil MCP (`Get` over top-level frames):

| Node | Canvas frame name | Height |
|---|---|---|
| `JLg8h` | StackGen Home | 9296 |
| `T4FJtW` | Product — Aiden for **Infrastructure** | 2685 |
| `zTOam` | Product — Aiden for **Automation** | 2478 |
| `OAfMk` | Product — Aiden for **Observability** | 1984 |
| `bEaQH` | Product — Aiden for **SRE** | 2346 |
| `HL34b` | **Platform** | 3338 |

`.superpowers/sdd/wave1-parity-report.md` mapped these as:

| Route | Report used | Actually is | Correct frame |
|---|---|---|---|
| `/platform` | `T4FJtW` | Product Infrastructure | `HL34b` |
| `/product/aiden-for-infrastructure` | `zTOam` | Product Automation | `T4FJtW` |
| `/product/aiden-for-automation` | `bEaQH` | Product SRE | `zTOam` |
| `/product/aiden-for-sre` (dev log #19) | `HL34b` | Platform | `bEaQH` |

The list is shifted by one frame. Consequences:

1. **False positives** were fixed. Parity Critical #1 "Home hero missing dashboard visual" is not real — canvas `XPc1X` (Hero, 1440×474) contains only Headline, Subhead, Support and one CTA. T24 correctly refused to invent it, but it still sits in the deviation log as an accepted Critical.
2. **Bogus height deltas.** "Platform +917px" was measured against a 2685px Infrastructure frame. Against the true 3338px Platform frame the delta is **+460px**.
3. **Real defects were never looked for**, because attention went to phantom ones.

**Fix:** correct the node→route map in `design-reference/README.md`, re-derive deltas, and rewrite the affected rows of `docs/superpowers/wave1-deviations.md`.

---

## RC2 — SVG text does not wrap (cause of "text overlapping")

**Evidence.** Canvas geometry for `factory-process.json` body copy:

```
d3 text w=256 h=40 fs=13 :: "Reviewable spec: agents, OCG data, SLOs, escalation boundaries."
```

A 256px-wide, 40px-tall box at 13px = **two wrapped lines**. The transcription in `FactoryProcessDiagram.tsx` renders:

```tsx
<text x={x + INNER.x} y={y + INNER.bodyY} fontSize={13}>{step.body}</text>
```

SVG `<text>` never wraps. The string lays out as one ~430px line inside a 292px card, so it runs into the next card. Every diagram repeats this pattern — the canvas box `width` was read for positioning but discarded for wrapping.

**Measured impact** (live DOM, 1440px):

| Route | Diagram | Overlapping pairs | Worst overlap |
|---|---|---|---|
| `/` | Agentic OS | 6 | 162px |
| `/` | Operational Context Graph | 4 | 72px |
| `/` | Factory process | 2 | 77px |
| `/` | Problem (creation vs operations) | 1 | 75px |
| `/product/aiden-for-infrastructure` | Infrastructure mechanism | 1 | 243px |
| `/product/aiden-for-automation` | Automation mechanism | 1 | 166px |
| `/product/aiden-for-observability` | Observability mechanism | 1 | 46px |
| `/platform` | Operational Context Graph | 1 | 36px |

Plus 8 texts that overflow their own SVG frame (ADF loop +158/163/168px, Two Planes +128px, Problem +173px).

**Fix:** one shared wrapped-text primitive, e.g. `web/components/diagrams/DiagramText.tsx`, taking `width` and `lineHeight` and emitting `<tspan>` lines. Feed it the canvas box width from geometry. Replace the ad-hoc per-file `DiagramText` copies. This is a single systemic fix, not 8 local ones.

---

## RC3 — Customer logos invisible (cause of "logos missing")

**Evidence — canvas `d751F` (Logos, 1440×162):**

```
1 frame | Logo Row    | 1240x18
2 frame | Nielsen     | 155x18   → 3 text | Wordmark | #7E838C | "Nielsen"
   ... 8 frames total, each a TEXT wordmark at #7E838C
1 text  | Credentials | 1240x15  | "Gartner Cool Vendor in AI for IT Operations · ..."
1 text  | Logo Note   | 1240x13  | "Also on the live strip: SAP NS2, Lowe's, RocTop, C..."
```

**Evidence — built `Logos.tsx`:** 12 `next/image` brand SVGs, `max-h-[30px] opacity-70`, `filter: none`, on a section background of `rgb(8, 9, 10)`.

Live DOM shows all 12 images load (`naturalWidth > 0`, zero broken) but their artwork is dark: `Chamberlain #101010`, `Autodesk #0E0D0F` / `#231F20`, `Innovaccer black`, `Nielsen #002041`, `Lowes #004990`. Against `#08090A` these are effectively invisible — the user's "logos are missing".

Three separate divergences:

1. **Invisible artwork** — dark fills, no filter, no monochrome treatment.
2. **Wrong count** — 12 logos in one row; canvas shows **8** in the row and names the rest in a note line.
3. **Missing element** — the canvas `Logo Note` line is not rendered at all.

**Fix:** depends on decision D1 below.

---

## RC4 — Mechanism heading rendered twice

**Evidence — canvas `w8Wb0v` (Mechanism, 1240×1275) already contains its own header:**

```
1 text  | Heading           | 820x39  | "Intent becomes infrastructure change inside policy."
1 text  | Body              | 760x50  | "Aiden for Infrastructure turns plain-language ..."
1 frame | Pipeline Callouts | 1040x105
1 frame | Pipeline Sequence | 1040x822
1 text  | Footnote          | 760x19  | "Tirith evaluates each action boundary; ..."
```

The build renders a DOM `SectionHeaderSplit` (mono label + heading + body) **and** the 1240×1275 SVG that draws the same heading, body and footnote again. Measured on `/product/aiden-for-infrastructure`: canvas Mechanism 1275px vs built section **1587px (+312)**, with the heading visible twice.

This is the same defect the final review logged as Minor M9 ("SRE mechanism heading duplicated") — it is not SRE-only, it is all four product pages.

**Fix:** depends on decision D2 below.

---

## RC5 — Section chrome inflation

Per-section measurement on `/product/aiden-for-infrastructure` (canvas `T4FJtW`):

| Section | Canvas | Built | Δ |
|---|---:|---:|---:|
| Nav | 60 | 60 | 0 |
| Hero | 446 | 446 | 0 |
| Metrics | 177 | 190 | +13 |
| Mechanism | 1275 | 1587 | **+312** |
| Early Access Strip | 184 | 431 | **+247** |
| Final CTA | 272 | 336 | +64 |
| Footer | 271 | 291 | +20 |
| **Total** | **2685** | **3341** | **+656** |

Canvas `v47e5` (Final CTA) contains **Heading + CTA only** — no body paragraph. The build adds one, which is where +64 comes from. Canvas `lUtF2` (Early Access) is a compact 184px strip of Label/Title/Body/CTA; the build renders it as a 431px card.

Whole-site deltas against the **corrected** canvas mapping:

| Route | Canvas | Built | Δ |
|---|---:|---:|---:|
| `/` | 9296 | 9303 | +7 |
| `/product/aiden-for-infrastructure` | 2685 | 3341 | +656 |
| `/product/aiden-for-automation` | 2478 | 2872 | +394 |
| `/product/aiden-for-observability` | 1984 | 2393 | +409 |
| `/product/aiden-for-sre` | 2346 | 2739 | +393 |
| `/platform` | 3338 | 3798 | +460 |
| `/case-studies` | 1236 | 1680 | +444 |
| `/case-studies/greythr` | 1163 | 1640 | +477 |
| `/case-studies/innovaccer` | 1026 | 1314 | +288 |
| `/schedule-demo` | 816 | 1024 | +208 |

Home is already at parity (+7px). The inflation is concentrated in the shared product/case/platform section chrome, which points at a small number of shared components rather than per-page drift.

---

## Proposed change list

Ordered by user-visible severity. Nothing here is applied yet.

### P0 — Visible breakage

| # | Change | Files |
|---|---|---|
| 1 | Add a shared wrapping `DiagramText` primitive (width-aware `<tspan>` lines) and adopt it in every diagram | new `web/components/diagrams/DiagramText.tsx`; `ProblemDiagram`, `FactoryProcessDiagram`, `AdfLoopDiagram`, `AgenticOsDiagram`, `OperationalContextGraph`, `TwoPlanesDiagram`, and the 4 `product/*Mechanism` files |
| 2 | Make the logo strip legible and canvas-true | `web/components/sections/home/Logos.tsx`, `web/content/shared.ts`, `web/content/home.ts` |
| 3 | Remove the duplicated mechanism heading/body/footnote | `web/components/sections/product/ProductMechanism.tsx` or the 4 mechanism diagrams |

### P1 — Layout parity

| # | Change | Files |
|---|---|---|
| 4 | Early Access Strip back to a 184px strip | `web/components/sections/product/EarlyAccessStrip.tsx` |
| 5 | Product Final CTA: heading + CTA only, drop body | `web/components/sections/product/ProductFinalCta.tsx`, product content modules |
| 6 | Case + platform + demo section padding to canvas rhythm | `case/*`, `platform/*`, `demo/*` sections |

### P2 — Documentation truth

| # | Change | Files |
|---|---|---|
| 7 | Correct node→route mapping | `design-reference/README.md` |
| 8 | Rewrite deviation rows invalidated by RC1 (esp. #12 hero dashboard, #13 platform height) | `docs/superpowers/wave1-deviations.md` |
| 9 | Keep the diagnostic harness as a regression check | `web/e2e/diagnose.mjs` |

### Verification

- `node e2e/diagnose.mjs` → zero overlaps, zero overflow, zero dark-on-dark logos
- `pnpm typecheck && pnpm test && pnpm build`
- Re-measure per-route heights against the corrected canvas map

---

## Decisions needed before implementation

- **D1 — Logo strip treatment.** Canvas text wordmarks, or keep brand SVGs made legible?
- **D2 — Mechanism header ownership.** DOM header (accessible) with SVG header removed, or SVG-only?
- **D3 — Height parity depth.** Chase the canvas pixel rhythm on all routes, or fix only P0 visible breakage?
- **D4 — Scope of this pass.** All 10 routes, or Home + products first?
