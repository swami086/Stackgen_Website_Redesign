# Positioning Deck → Diagram Replica Shelf Design

**Date:** 2026-08-19  
**Status:** Approved 2026-08-19 — execution via `docs/superpowers/plans/2026-08-19-postn-diagram-replica-shelf.md`  
**Source folder:** `sg-new-postn-deck/` (PDF slides 0–14)  
**Extracted text:** `.firecrawl/postn-deck/all-slides-text.txt`  
**Preview stills:** `.firecrawl/postn-deck/previews/` (incl. `hi-*-1.png`)  
**Canvas:** `Stack_Linear.pen`  
**Related (do not supersede):** `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md` (site-page incorporation — already executed)

---

## 1. Problem

Prior incorporation waves put deck **narrative and mechanism structure** onto Home / Product / Platform as Linear marketing modules. Those modules are useful for page flow but are **not visual replicas** of the deck diagrams (hub OCG, illustrated factory, SRE three-column play, isometric pipeline, etc.).

User requirement: create **new slides** that **replica** the deck compositions, **without disturbing** existing frames.

---

## 2. Decisions locked

| Decision | Choice |
|---|---|
| Fidelity mode | **A — Composition replica + Linear restyle** — same layout, nodes, step order, label density as each deck slide; restyle to Direction Contract tokens |
| Placement | **New shelf only** — do not edit existing Home / Mobile / Product / Platform / Wave B / component shelf |
| Authority vs site pages | Shelf is a **visual source library**; site pages stay as-is until a later, explicit merge wave |
| Approach | Spec → approval → `writing-plans` → Pencil waves → verify |
| ROI (deck slide 14) | **Excluded** from shelf (no modeled dollar figures) |

---

## 3. Non-negotiable locks (unchanged)

From Direction Contract (`Vrb0t`) + `.agents/product-marketing.md`:

- **Tokens:** `$bg-base` `#08090A`, `$bg-raised`, `$surface-card`, `$border-hairline` / `$border-card`, `$text-primary` / `$text-secondary` / `$text-tertiary`, `$accent` `#9437FF`, `$accent-dim`, `$accent-text`, `$pass`, `$halt`
- **Type:** Inter for display; JetBrains Mono only for code / measurement / policy labels
- **Forbidden:** glow / blur-as-brand, cyan as second accent, gradient text, em dashes, whole-slide PNG as the diagram
- **Naming map:**

| Deck | Shelf |
|---|---|
| Aiden for DevOps | Aiden for Automation |
| Aiden for InfraOps | Aiden for Infrastructure |
| Olly | Never |
| ADF as SKU | Autonomous DevOps Factory (vision) wording OK on process slides |

---

## 4. Shelf architecture

### 4.1 Canvas placement

- New root frames only, claimed via `FindEmptySpace` (expected column near **x ≈ 10670**, stack downward).
- Frame size: **1920 × 1080** (16:9 slides), `placeholder: true` while building, unset when done.
- Naming: `Replica — Deck {N} — {Short Title}` (e.g. `Replica — Deck 7 — OCG`).
- Optional label frame above the column: `Diagram Replica Shelf` (context note, not a slide).

### 4.2 Relationship to existing work

| Existing | This shelf |
|---|---|
| `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`, Wave B stubs | **Read-only** — zero Updates / Deletes / Inserts into their trees |
| Incorporation design (2026-08-19) | Remains authority for **in-page** content already shipped |
| This design | Authority for **replica shelf** frames only |

No automatic swap of shelf diagrams into site pages in this effort.

---

## 5. Slide inventory & build priority

Source: 15 PDFs (`0.pdf`–`14.pdf`). Build as editable replicas; apply naming map; Linear restyle.

### Wave R1 — Mechanism diagrams (P0)

| Deck | Shelf title | Composition to preserve |
|---|---|---|
| **7** | OCG | Title + body; center **OCG Shared Intel** hub; five satellites (Infrastructure Topology, Change Attribution, Drift History, Incident Causality, Observability Correlations) with connectors + junction accents |
| **12** | Factory Process | Title + sub; four equal steps Intent → Factory Spec → Factory Runtime → Factory Learning with step labels and connectors; optional footer geometry as Linear hairline motifs (not glow art) |
| **8** | Aiden for SRE | Three columns: incident timeline summary · six-step agent pipeline + OCG / Temporal / OPA base · right-rail body copy; product lockup uses site naming |

### Wave R2 — Problem + intent (P1)

| Deck | Shelf title | Composition to preserve |
|---|---|---|
| **1** | Creation vs Ops | Two columns (Creation 2X PR Volume vs Ops 1x No Boost) + center Gap graphic + supporting bullets |
| **5** | Factory Intent | Left: intent quote / factory panel; right: Plain-Language Intent + Version-Controlled Spec (Linear dark panel instead of deck beige/glow) |
| **9** | Aiden for Automation | Pipeline stages + OCG base + Active Gating / Self-Verification callouts; rename DevOps → Automation; flatten isometric 3D into Linear 2D stage blocks that keep stage count and check labels |

### Wave R3 — Supporting story (P2)

| Deck | Shelf title | Notes |
|---|---|---|
| **0** | Title | Cover statement only if useful as shelf opener |
| **2** | Manual toll | Four pain cards (supervised exec, paralysis, stale docs, approval gridlock) |
| **3** | On-call crisis | Four failure-mode cards around Extended MTTR / archaeology / burnout / blind spots |
| **4** | Domain silos | T-8 / Context Gap / T-0 timeline + three domain silo cards |
| **6** | Stateful factory | Full-loop accountability + stateful memory (diagram-light OK if deck is mostly type) |
| **10** | Migration EA | Early Access strip composition; **no** “6→9 Months” competitive claim on shelf unless product-marketing unlocks it; title uses Infrastructure / migration wording not InfraOps product name |
| **11** | Aiden OS | OS modules (orchestration + financial governance) as Linear modules matching deck structure |
| **13** | Roadmap | Available / Early Access / H1 2027 strip — labeled roadmap |
| **14** | — | **Do not build** (modeled $ ROI) |

---

## 6. Craft standard (replica bar)

### 6.1 Visual SoT workflow (per slide)

1. Open deck PDF + matching preview PNG (`hi-{N}-1.png` or regenerate via `pdftoppm`).
2. Inventory: columns, node count, connector topology, exact step labels, icon roles.
3. Rebuild in Pencil with frames / text / strokes / lucide icons / paths — **editable**.
4. Restyle fills/strokes/type to tokens; replace cyan/glow with `$accent` / `$accent-dim` / hairlines.
5. Apply naming map; ban scan before clearing `placeholder`.
6. `TakeScreenshot` / `Export` to `.superpowers/sdd/replica-artifacts/deck-{N}.png`.
7. Side-by-side check vs preview: same structure; Linear chrome.

### 6.2 Density rule

If the deck has N labeled stages / satellites / timeline rows, the replica has **N** — not a 3-card paraphrase. Reducing density is a **fail** for this shelf (that failure mode is what the user rejected on site pages).

### 6.3 Isometric / glow art (deck 5, 9)

Rebuild as **Linear 2D structure** that preserves stage topology and labels. Do not paste the deck PNG. Do not invent a second brand glow.

---

## 7. Acceptance criteria

For each Wave R1–R2 frame (R3 optional until scheduled):

1. Frame lives only in the replica shelf column; no existing marketing frame IDs modified.
2. Side-by-side vs deck preview: matching region count, step order, and connector topology.
3. Tokens-only colors; no cyan brand accent; no glow effects.
4. Banned scan clean: `Aiden for DevOps`, `Aiden for InfraOps`, `Olly`, em dash (`—` / `–`), slide-14 `$` ROI strings.
5. All diagram text editable (no flattened slide image as the diagram).
6. Screenshot artifact saved under `.superpowers/sdd/replica-artifacts/`.

Shelf done when Wave **R1** passes all criteria; R2/R3 may follow in the same plan as separate tasks.

---

## 8. Out of scope

- Editing or replacing diagrams inside existing site pages
- Wiring shelf frames into nav / page spines
- HyperFrames / video slideshow deliverable
- Pixel-perfect beige deck chrome (fidelity mode B)
- Slide 14 ROI dollars
- Unlocking migration “6→9 Months” claim (needs separate product-marketing decision)

---

## 9. Process & skills

| Phase | Skill |
|---|---|
| Design | `brainstorming` (done) |
| Plan | `writing-plans` → `docs/superpowers/plans/2026-08-19-postn-diagram-replica-shelf.md` |
| Build | `subagent-driven-development` or `executing-plans` + per-task matrix in that plan |
| Per-slide craft | `image-to-code` (adapted) · Pencil Slides guide · `pencil-web-design-expert` · `impeccable` · `design-taste-frontend` · `product-marketing` · `copywriting` · `ponytail` |
| Done gate | `verification-before-completion` |

**Authoritative skill + model assignment:** the plan’s **Skills Matrix**, **Cursor Model Matrix** (from `firecrawl-cli` research under `.firecrawl/cursor-models/`), and **Firecrawl CLI per task** table. Workers must load required `SKILL.md` files and use the assigned model before Pencil edits.

OpenMemory: store shelf frame IDs + craft notes on completion; update `openmemory.md` Components / Patterns.

---

## 10. Success definition

A reviewer can open the replica shelf next to `sg-new-postn-deck` previews and recognize **the same diagrams**, in Linear StackGen chrome, without any change to the already-built marketing pages.
