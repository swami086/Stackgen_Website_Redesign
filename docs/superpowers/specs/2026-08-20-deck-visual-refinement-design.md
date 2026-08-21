# Deck Visual Refinement Design

**Date:** 2026-08-20
**Status:** Approved (user decisions locked below)
**Canvas:** `Stack_Linear.pen`
**Scope:** the 15 slide frames built in this session (decks 0–13, 15). Deck 14 remains excluded.
**Supersedes:** the literal node-parity fidelity rule in `2026-08-20-figma-deck-literal-rebuild-design.md` §4, for these frames only.

---

## 1. Problem

The rebuild optimised for the wrong scorecard. Each subagent was measured on Figma-layer-to-Pencil-node parity, so it reproduced decoration faithfully and never asked whether the resulting slide was composed. Node counts were green while the deck reads immature.

Concretely, across the 15 built frames:

- Decorative noise stands in for information on decks 0, 2, 4, 5, 12 (random bars, blocks, blobs that encode nothing).
- Icons were picked for availability, not meaning (deck 2: binoculars for "Supervised Execution", an anchor for "Deployment Paralysis").
- No shared grid. Title origins drift across `(49,48)`, `(66,64)`, `(66,68)`, `(100,72)`, `(861,64)`.
- Three competing header patterns (left title, centred title, three-column split).
- Cloud providers render as monospace text chips while real SVG logos sit unused in `.firecrawl/logos/`.
- Craft-floor violations: a coloured `border-left` on deck 8, monospace as a "technical" costume, nested cards on deck 5.
- Hard breakage: deck 3's accent band runs under body text and destroys contrast; deck 1 clips text mid-word; deck 4 has a stray white rectangle; deck 15 is titled "Diagram" and misspells "Platform"; decks 11 and 12 exported as black PNGs.

## 2. Decisions locked (user, 2026-08-20)

| Decision | Choice |
|---|---|
| Fidelity | **Full re-composition.** Content, claims and meaning are preserved. Layout, grid, diagrams and decoration are redesigned to one system. Node-parity is abandoned as a metric. |
| Logos | **Monochrome on dark**, single stroke weight, from real SVGs. No brand colour, to protect the purple-only palette. |
| Deck 15 title | **"The Autonomous DevOps Factory Architecture"** |
| Decorative noise | **Replaced with real information diagrams** — each becomes a schematic of the mechanism its slide describes. |
| Sequencing | **Three tiers with a review gate between each.** |

## 3. Carried-forward locks (unchanged)

From the Direction Contract (`Vrb0t`), `PRODUCT.md`, and `.agents/product-marketing.md`:

- **Tokens only:** `$bg-base`, `$bg-raised`, `$surface-card`, `$border-hairline`, `$border-card`, `$text-primary`, `$text-secondary`, `$text-tertiary`, `$accent` `#9437FF`, `$accent-dim`, `$accent-text`. No cyan, no second brand colour, no glow, no gradient text.
- **Naming, verbatim and binding:** Autonomous DevOps Factory (ADF) is the parent category and is correct as written. Aiden for Infrastructure, Aiden for Automation, Aiden for SRE, Aiden for Observability. Never "Olly", never "Aiden for DevOps", never "Aiden for InfraOps".
- **Voice:** declarative, no hedging, no em dashes.
- **Read-only frames:** `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`, Wave B stubs, component shelf, `Vrb0t`.
- **No fabricated evidence.** Metrics already on the slides come from `PRODUCT.md`'s Evidence on Hand. No new numbers may be invented. Deck 10's omitted "6 to 9 months" timeline claim stays omitted.

---

## 4. The design system

This is the single system every slide conforms to. It is the deliverable of Tier 2 and the contract for Tier 3.

### 4.1 Grid

Frame is 1920×1080.

| Property | Value |
|---|---|
| Outer margin | **96px** all sides |
| Content band | x 96..1824, y 96..984 (1728 × 888) |
| Columns | **12 × 122px** |
| Gutter | **24px** |
| Spacing scale | multiples of **8** (8, 16, 24, 32, 48, 64, 96) |

`1728 = (12 × 122) + (11 × 24)`. Every element's left edge and width must land on a column boundary. No exceptions, no eyeballed positions.

### 4.2 Vertical zones

| Zone | Band | Contents |
|---|---|---|
| Title | y 96..248 | Slide title, optional right-aligned context line |
| Body | y 296..904 | The slide's substance |
| Footer | y 928..984 | Optional metrics or attribution. Omitted on most slides. |

The 48px between title and body is the only fixed vertical relationship; within the body zone, spacing follows the scale.

### 4.3 Header pattern — one, used on all 15

- **Title:** left edge x=96, top y=96, max width 8 columns (1000px). Inter 44px / 600 / -0.02em / line-height 1.15, `$text-primary`.
- **Context line (optional):** right-aligned, columns 9–12, baseline-aligned to the title's first line. Inter 15px / 400 / line-height 1.6, `$text-secondary`. Max 3 lines.
- **Cover (deck 0) exception:** title 72px, no context line.
- **No eyebrow or kicker above the title.** Craft-floor ban, no brief earns it back.
- Deck 8, 9, 10's current three-column split header is replaced by this pattern; the product name moves into the title, the tagline becomes the context line.

### 4.4 Type scale

| Role | Face | Size | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Cover title | Inter | 72 | 600 | -0.03em | `$text-primary` |
| Slide title | Inter | 44 | 600 | -0.02em | `$text-primary` |
| Section heading | Inter | 24 | 600 | -0.01em | `$text-primary` |
| Card title | Inter | 18 | 600 | -0.01em | `$text-primary` |
| Body | Inter | 15 | 400 | 0 | `$text-secondary` |
| Label | Inter | 13 | 500 | 0 | `$text-tertiary` |
| Metric | Inter | 56 | 600 | -0.03em | `$text-primary` |
| Code / measured value | JetBrains Mono | 12 | 400 | 0 | `$text-tertiary` |

Body line-height 1.6; headings 1.2. Body measure caps at **70 characters**, which is 5 columns at 15px.

**Monospace is restricted** to code, policy expressions, measured values, and node identifiers. Every current mono label that is prose (deck 1's "PR Volume", "No Boost"; deck 4's "T-8 Mins"; deck 9's check names; deck 13's "Currently Available") converts to Inter Label style. This is the craft-floor "monospace as costume" ban.

### 4.5 Colour discipline

`$accent` `#9437FF` appears **at most three times per slide**, and only where it means something: the active path in a diagram, the single most important number, or the current state in a sequence. Everything else is text tokens and hairlines.

Accent-as-decoration is removed. That deletes deck 0's nine overlapping bands, deck 3's diagonal band, deck 2's bar field, and deck 12's footer motif.

### 4.6 Icon system

Lucide, **20px**, **1.5px stroke**, `$text-secondary` by default and `$accent` only when marking the active element. Icons must be semantic. The current random assignments are replaced:

| Slide | Concept | Current (wrong) | Correct |
|---|---|---|---|
| 2 | Supervised Execution | binoculars | `eye` |
| 2 | Stale Documentation | books | `file-warning` |
| 2 | Deployment Paralysis | anchor | `pause-octagon` |
| 2 | Approval Gridlock | copy | `git-pull-request-closed` |
| 3 | Extended MTTR | timer | `timer` (keep) |
| 3 | Fragmented Archaeology | layout-grid | `search-x` |
| 3 | Burnout | user-x | `battery-low` |
| 3 | Blind Spots | eye | `eye-off` |

No Unicode glyphs, no emoji.

### 4.7 Logo system

Source: `.firecrawl/logos/*.svg` (Simple Icons). Available: `amazonwebservices`, `microsoftazure`, `googlecloud`, `kubernetes`, `docker`, `terraform`, `git`, `sonarqube`, and `oracle` (fetched 2026-08-20 for deck 10).

- Rendered as Pencil `icon`/`path` nodes from the real SVG geometry, **never as text**.
- **Monochrome** `$text-secondary`, height **24px**, optical alignment on a shared baseline.
- Wordmark-bearing marks (AWS) use the glyph only where the wordmark would be illegible at 24px.
- Affected: deck 9's "Cloud Providers" strip, deck 10's AWS/Azure/Oracle nodes, deck 15's "Platform & Tools" strip.
- A reusable `Logo Strip` component is built once in the component shelf region and instanced, so a logo fix propagates.

### 4.8 Diagram language

Every diagram on the deck uses the same primitives. This is what replaces the noise.

| Primitive | Spec |
|---|---|
| Node | rounded rect, radius 8, `$surface-card`, 1px `$border-hairline`, padding 16, min-height 64 |
| Active node | same, border `$accent`, label `$accent-text` |
| Connector | 1px `$border-hairline`, **orthogonal only** (horizontal and vertical segments, no diagonals) |
| Active path | 1px `$accent` |
| Junction | 6px ellipse, `$accent` |
| Direction | left-to-right, or top-to-bottom. One axis per diagram. |
| Node label | Inter 13/500 inside the node; no floating labels |
| Group boundary | 1px dashed `$border-hairline`, radius 12, with a Label-style caption at its top-left |

Rules: flow direction is stated once and never reversed mid-diagram. Every node is reachable. No shape exists that a reader cannot name. No shadows (the world is flat hairline-on-dark).

### 4.9 Component reuse

Built once, instanced everywhere: `Slide Header`, `Stat Cell`, `Diagram Node`, `Logo Strip`, `Bullet Row` (icon + title + body). This is what stops the 15 slides drifting apart again, and it means Tier 2 edits propagate rather than repeating 15 times.

---

## 5. Per-slide direction

| Deck | Frame | Current failure | Direction |
|---|---|---|---|
| 0 | `MeohT` | 9 overlapping accent bands as "art"; subtitle stranded bottom-left; orphaned hairline | Cover. 72px title on the grid, subtitle directly beneath it at 18px. Bands replaced by **one** restrained motif: a single vertical accent hairline column at column 12, full-bleed height. |
| 1 | `vqIfL` | Right card clips "safely ship"; cards different heights; tiny mono chips; weak centre "Gap" | Two equal 5-column cards on one baseline, 3-column centre channel. Both cards same height. "2X" and "1x" become Metric style, casing unified to `2×` / `1×`. Gap channel becomes a labelled orthogonal connector. |
| 2 | `t4l5yA` | Right half is a meaningless bar field; wrong icons; dead space bottom-left | Bar field deleted. 2×2 Bullet Rows occupy columns 1–6 with correct icons. Columns 8–12 carry a real diagram: the 4-stage manual delivery path with the 45-minute wait and 14 approval steps marked as the bottleneck. |
| 3 | `hwbT4` | **Accent band runs under body text; two of four items unreadable** | Band deleted outright. Four Bullet Rows in a 2×2 on columns 1–12, all body text at ≥4.5:1. This is the single worst defect on the deck. |
| 4 | `yHYky` | Stray white rectangle; noise bars over cards; bottom row misaligned | Rectangle and noise deleted. Three timeline cards on a single row, connected by one orthogonal left-to-right connector with the T-8 / T-0 markers as Labels. Bottom row becomes three equal Bullet Rows on the grid. |
| 5 | `m8tUjg` | Mockup panel is grey/purple bars; nested cards; huge empty right column | Fake mockup replaced with the real intent-to-spec diagram: plain-language intent node → Factory Spec node → SLO/governance branches. Nested card flattened. Right column holds the two existing text blocks, top-aligned. |
| 6 | `R07i6` | Floating icon tiles, faint diamond, orphaned tick marks, no node labels | Diagram rebuilt as an explicit four-domain loop with labelled nodes and directional connectors showing the accountability cycle. Tick marks deleted. Right column gains a third block to balance, or the diagram widens to 8 columns. |
| 7 | `jo0ow` | Hub is nearly empty; connectors inconsistent; Drift History card off-axis; label chip floats | Hub becomes a real labelled OCG node with its five inputs on a symmetric orthogonal fan. All five satellite cards identical size on the grid. Floating chip becomes the hub's own label. |
| 8 | `K2mYhs` | Three-header split; `border-left` ban; long unbroken paragraph; stray StackGen chip | Standard header. Body paragraph splits into the incident timeline (left, 5 cols) and the agent sequence (right, 5 cols). Coloured left border removed. Stray chip and button removed. |
| 9 | `YUmsn` | Text-chip logos; 39 children unaligned; mono overuse; stray chip | Real monochrome logos in a Logo Strip. Pipeline becomes one aligned left-to-right row of Diagram Nodes with the check row beneath on the same columns. Mono restricted to measured values. Metrics move to the footer zone. |
| 10 | `FGVmh` | 3,456 binary-rain nodes; Oracle as a red circle outline; caption stranded | Binary rain reduced to a single low-opacity texture layer or deleted. AWS, Azure and Oracle render as real monochrome logos. Migration path becomes one orthogonal left-to-right flow with the rollback branch marked in accent. |
| 11 | `WbOpg` | Header collides with body; left panel near-empty with a small infinity mark; uneven card grid; **PNG exported black** | Header on the standard pattern. Five capability cards on a uniform 4+4+4 or 6+6 grid, equal heights. Left panel either carries a real Aiden OS runtime diagram or is dropped so the cards use the full band. Artifact re-exported. |
| 12 | `RjUW3` | Four cards top, empty bottom half, footer motif is random bars plus a stray diagonal and circle; **PNG exported black** | Motif deleted. Four lifecycle stages become a proper top-to-bottom or left-to-right cycle with return connector, using the full body band. Artifact re-exported. |
| 13 | `M8kNAX` | Huge empty top; tiny cards at the bottom; faint blobs; third column orphaned | Blobs deleted. Three roadmap columns, equal width on 4-column spans, each headed by a Label chip in the same position. Items are equal-height rows. Content fills the body band. |
| 15 | `HKug4` | Titled "Diagram"; "Live Application" clipped; 1%/100% chips overlap; "Platfore & Tools" typo; text-chip logos | Retitled **The Autonomous DevOps Factory Architecture**. Typo fixed. Clipping and overlap resolved on the grid. Logo strip uses real monochrome SVGs. Control Room → five stages → Live Application becomes one orthogonal flow. |

## 6. Tiers

**Tier 1 — Stop the bleeding.** Decks 3, 15, 1, 4, deck 11's header collision, plus re-export of 11 and 12. Fixes contrast failure, clipped text, the placeholder title, the typo, the stray rectangle, the overlapping header, and the black artifacts. No re-composition yet. Gate: user reviews six screenshots.

**Tier 2 — Impose the system.** Build the shared components (§4.9), then apply grid, header, type scale, icon and colour discipline to all 15. This is where the deck stops looking like 15 separate documents. Gate: user reviews a contact sheet of all 15.

**Tier 3 — Rebuild the diagrams.** Decks 0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15 get real information diagrams and monochrome logos per §4.7 and §4.8. Decks 1 and 3 are excluded from this tier: they carry no diagram, and Tiers 1 and 2 fully resolve them. Gate: final review.

## 7. Verification

Per slide, before it is marked done:

1. Grid check: every element's x and width land on a column boundary; nothing outside x 96..1824, y 96..984.
2. Contrast: body text ≥4.5:1 against its actual backdrop, measured where it overlaps any shape.
3. Overflow: no clipped or truncated text at any node.
4. Ban scan: em dash, en dash, "Olly", "Aiden for DevOps", "Aiden for InfraOps".
5. Craft-floor scan: no gradient text, no coloured border above 1px, no nested cards, no mono-as-costume, no Unicode-glyph icons, no zero-offset halo.
6. Accent budget: `$accent` used three times or fewer.
7. Screenshot, then flat PNG export to the artifacts directory (guard against the directory-instead-of-file export quirk).

Deck-wide, at the end: a 15-frame contact sheet reviewed in one pass for cross-slide consistency of header, type, and diagram language.

## 8. Explicitly out of scope

- Deck 14 stays excluded.
- No new claims, metrics, or customer names.
- No changes to the marketing site frames or the component shelf's existing members.
- No Figma MCP reads until quota resets. This work is composition, not re-derivation, so it does not need them. Deck 15's real Figma title can be reconciled later if it differs from the approved one.
