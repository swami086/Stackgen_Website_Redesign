# Deck Visual Refinement Implementation Plan

> **For agentic workers:** REQUIRED SKILLS before any Pencil edit: `using-superpowers`, `impeccable` (read `reference/craft-floor.md`), `pencil-web-design-expert`, `design-taste-frontend`. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Take the 15 slide frames from immature to shippable by imposing one design system, replacing decorative noise with real diagrams, and using official monochrome logos.

**Design source of truth:** `docs/superpowers/specs/2026-08-20-deck-visual-refinement-design.md`. Read §4 before any edit; it is the system every task conforms to.

**Architecture:** Three sequential tiers with a user review gate between each. Tier 1 is defect repair (parallel-safe). Tier 2 builds shared components first, then applies them (component build is sequential; application is parallel). Tier 3 rebuilds diagrams (parallel-safe).

**Tech Stack:** Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`, `Stack_Linear.pen`). No Figma MCP (quota exhausted; not required).

---

## Global Constraints

1. **Pencil MCP only.** Never Read/Grep the `.pen` file.
2. **Read-only, never touch:** `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`, `uPzvZ`, `socHN`, `wTrxq`, `Bp1dp`, `ARO2U`, `Vrb0t`, and the existing members of the component shelf (`JJx7F`, `xcXXD`, `NCL0m`, `e9nTl`, `m2UJ8`, `GZSQR`, `igbym`, `N6udS`).
3. **Each task touches only its own frame subtree.** Never `SetVariables`. New shared components are created only in Task 2.0, sequentially, before any Tier 2 parallel work starts.
4. **Tokens only.** `$bg-base`, `$bg-raised`, `$surface-card`, `$border-hairline`, `$border-card`, `$text-primary`, `$text-secondary`, `$text-tertiary`, `$accent` `#9437FF`, `$accent-dim`, `$accent-text`. No cyan, no glow, no gradient text, no shadows.
5. **Accent budget: 3 uses per slide, maximum.**
6. **Grid:** margin 96, content 1728, 12 columns × 122, gutter 24, spacing scale multiples of 8. Every x and width lands on a column boundary.
7. **Naming, verbatim:** Autonomous DevOps Factory (ADF) is correct as the parent category. Aiden for Infrastructure / Automation / SRE / Observability. Never "Olly", "Aiden for DevOps", "Aiden for InfraOps".
8. **No em dashes** in any text content, including frame names.
9. **No new claims, metrics, or customer names.** Deck 10's "6 to 9 months" claim stays omitted.
10. **Deck 14 excluded.**
11. **No commits** unless the user asks.
12. **Export guard:** Pencil's `Export` sometimes creates a directory named `deck-N.png` containing `<frameId>.png`. After every export, verify the path is a flat file and flatten it if not.

## Frame Map

| Deck | Frame ID | Grid position |
|---|---|---|
| 0 | `MeohT` | 10700, -1420 |
| 1 | `vqIfL` | 12820, -1420 |
| 2 | `t4l5yA` | 14940, -1420 |
| 3 | `hwbT4` | 17060, -1420 |
| 4 | `yHYky` | 10700, -140 |
| 5 | `m8tUjg` | 12820, -140 |
| 6 | `R07i6` | 14940, -140 |
| 7 | `jo0ow` | 17060, -140 |
| 8 | `K2mYhs` | 10700, 1140 |
| 9 | `YUmsn` | 12820, 1140 |
| 10 | `FGVmh` | 14940, 1140 |
| 11 | `WbOpg` | 17060, 1140 |
| 12 | `RjUW3` | 10700, 2420 |
| 13 | `M8kNAX` | 12820, 2420 |
| 15 | `HKug4` | 17060, 2420 |

## Artifacts

| Path | Purpose |
|---|---|
| `.superpowers/sdd/refine-artifacts/deck-{N}.png` | Per-slide export after each tier |
| `.superpowers/sdd/refine-task-{T}-report.md` | Per-task report |
| `.superpowers/sdd/refine-contact-sheet-tier{N}.md` | Review gate summary |

---

# Tier 1 — Defect repair

Six independent fixes. Safe to run in parallel. No re-composition; this tier only stops the bleeding so the deck can be reviewed honestly.

### Task 1.1: Deck 3 contrast failure (highest priority)

**Frame:** `hwbT4`

- [ ] Identify the accent diagonal band group and every node in it.
- [ ] Delete the band entirely. It is decoration, and §4.5 removes accent-as-decoration.
- [ ] Re-place the four Bullet Rows (Extended MTTR, Fragmented Archaeology, Burnout, Blind Spots) as a 2×2 on the grid: columns 1–5 and 7–11, rows at y=340 and y=620.
- [ ] Restore all four body texts to `$text-secondary` on `$bg-base`.
- [ ] Verify each body text measures ≥4.5:1. Both "Burnout" and "Blind Spots" are currently unreadable; they must pass.
- [ ] Screenshot, export, report.

### Task 1.2: Deck 15 title, typo, clipping

**Frame:** `HKug4`

- [ ] Retitle the slide text node and the frame to **The Autonomous DevOps Factory Architecture** (frame name uses an ASCII hyphen, never an em dash).
- [ ] Fix `Platfore & Tools` → `Platform & Tools`.
- [ ] Resolve the `Live Application` node clipping: widen the node or reduce its label to fit within its bounds.
- [ ] Resolve the overlapping `1%` and `100%` chips; place them on distinct grid positions with no overlap.
- [ ] Anchor the floating `Autonomous DevOps` caption to its group boundary per §4.8.
- [ ] Screenshot, export, report.

### Task 1.3: Deck 1 clipped text and card mismatch

**Frame:** `vqIfL`

- [ ] Fix the right card's clipped body text ("...code is written faster than it can safely ship"). Widen the text node or increase the card height so no glyph is cut.
- [ ] Set both cards to the same height and the same top y.
- [ ] Unify metric casing: `2X` and `1x` become `2×` and `1×`, both in Metric style.
- [ ] Convert the mono chips `PR Volume` and `No Boost` to Inter Label style (§4.4 mono restriction).
- [ ] Screenshot, export, report.

### Task 1.4: Deck 4 stray rectangle and overlapping noise

**Frame:** `yHYky`

- [ ] Locate and delete the stray white rectangle near the right edge (approximately x=900, a tall thin white fill).
- [ ] Delete the noise bar groups that render on top of or behind the three timeline cards.
- [ ] Align the three timeline cards to a single row on the grid, equal widths and heights.
- [ ] Align the bottom row (The Domain Silos, CI/CD Pipelines, Infrastructure Automation, Observability Stack) to equal grid spans.
- [ ] Screenshot, export, report.

### Task 1.5: Re-export decks 11 and 12

**Frames:** `WbOpg`, `RjUW3`

Content exists in both; the committed PNGs are black because the export ran before the build finished.

- [ ] `TakeScreenshot(['WbOpg','RjUW3'])` and confirm content renders.
- [ ] Export each to a flat file under `.superpowers/sdd/refine-artifacts/`.
- [ ] Apply the Constraint 12 export guard and flatten any directory-shaped output.
- [ ] Report both file sizes as non-trivial (a black 1920×1080 export is roughly an order of magnitude smaller than a populated one).

### Task 1.6: Deck 11 header collision

**Frame:** `WbOpg`

- [ ] The title, the centred tagline, and the right body text currently overlap. Apply the §4.3 header pattern: title left on columns 1–8, context line right on columns 9–12, no centred element.
- [ ] Screenshot, export, report.

**GATE 1:** Present the six screenshots. Wait for user approval before Tier 2.

---

# Tier 2 — Impose the system

### Task 2.0: Build shared components (SEQUENTIAL — must complete before 2.1+)

**Location:** component shelf region, below the existing members, at negative coordinates outside the slide grid.

- [ ] `Slide Header` — title (Inter 44/600/-0.02em, `$text-primary`, max 8 cols) + optional right context line (Inter 15/400, `$text-secondary`, cols 9–12). Reusable.
- [ ] `Bullet Row` — Lucide icon 20px/1.5 stroke + card title (Inter 18/600) + body (Inter 15/400, `$text-secondary`, max 70ch). Reusable.
- [ ] `Diagram Node` — rounded rect radius 8, `$surface-card`, 1px `$border-hairline`, padding 16, min-height 64, label Inter 13/500 inside. Reusable, with an active variant using an `$accent` border.
- [ ] `Stat Cell` — metric (Inter 56/600/-0.03em) + label (Inter 13/500, `$text-tertiary`). Reusable.
- [ ] `Logo Strip` — horizontal row of monochrome logo marks at 24px height, `$text-secondary`, on a shared optical baseline, built from `.firecrawl/logos/*.svg` geometry. Reusable.
- [ ] Report the five new component IDs. Every Tier 2 and Tier 3 task instances these rather than hand-authoring equivalents.

### Tasks 2.1–2.15: Apply the system (one task per deck, parallel-safe)

Each task takes one frame and conforms it to §4. Deck-specific direction is in design §5.

- [ ] **Step 1:** Read design §4 and §5's row for this deck.
- [ ] **Step 2: Grid conformance.** Move every top-level child so its x and width land on column boundaries. Nothing may sit outside x 96..1824 or y 96..984. Fix the drifted origins specifically: deck 0 `(49,48)`, deck 3 `(66,68)`, deck 7 `(100,72)`, deck 15 `(861,64)`.
- [ ] **Step 3: Header.** Replace the existing header with a `Slide Header` instance. Decks 8, 9, 10 lose their three-column split: the product name moves into the title, the tagline becomes the context line.
- [ ] **Step 4: Type scale.** Apply §4.4 to every text node. Convert every prose monospace label to Inter Label style; keep mono only for code, policy expressions, measured values and node identifiers.
- [ ] **Step 5: Icons.** Replace wrong icons per the §4.6 table. Set all icons to 20px, 1.5 stroke, `$text-secondary` unless marking an active element.
- [ ] **Step 6: Colour discipline.** Reduce `$accent` to three uses or fewer. Delete accent-as-decoration.
- [ ] **Step 7: Craft-floor scan.** Remove: deck 8's coloured `border-left`, deck 5's nested card, any gradient text, any zero-offset halo, any Unicode-glyph icon, any stray UI chip (decks 8 and 9 both carry a stray StackGen chip and button).
- [ ] **Step 8:** Verify per design §7, screenshot, flat-export, write `.superpowers/sdd/refine-task-2-{N}-report.md`.

**GATE 2:** Build a 15-frame contact sheet and present it. Cross-slide consistency of header, type and spacing is the acceptance criterion, not per-slide beauty. Wait for approval.

---

# Tier 3 — Real diagrams and official logos

Parallel-safe. Each task replaces decorative noise with a schematic of the mechanism its slide describes, per design §4.8.

### Task 3.1: Deck 0 cover motif
- [ ] Delete the nine overlapping accent bands and the orphaned hairline.
- [ ] Title at 72px on the grid; subtitle directly beneath at 18px.
- [ ] Add one restrained motif: a single full-height vertical accent hairline at column 12.

### Task 3.2: Deck 2 manual delivery path
- [ ] Delete the right-hand bar field entirely.
- [ ] Four Bullet Rows in a 2×2 on columns 1–6, with the §4.6 corrected icons.
- [ ] Columns 8–12: a four-stage left-to-right manual delivery diagram marking the 45-minute supervised wait and the 14 approval steps as the bottleneck, using only figures already on the slide.

### Task 3.3: Deck 4 timeline
- [ ] Three timeline cards on one row joined by a single orthogonal left-to-right connector.
- [ ] T-8 Mins / The Context Gap / T-0 Mins become Label-style markers on the connector, not mono chips.
- [ ] Bottom row: three equal Bullet Rows on the grid.

### Task 3.4: Deck 5 intent-to-spec
- [ ] Delete the fake mockup panel (grey and purple bars).
- [ ] Build the real flow: plain-language intent node → Factory Spec node → SLO and governance branches.
- [ ] Flatten the nested card. Right column holds the two existing text blocks, top-aligned.

### Task 3.5: Deck 6 accountability loop
- [ ] Delete the orphaned tick marks and the faint diamond.
- [ ] Rebuild as an explicit four-domain loop: labelled Diagram Nodes, directional orthogonal connectors, a visible return edge closing the loop.
- [ ] Balance the right column against the diagram's height.

### Task 3.6: Deck 7 OCG hub
- [ ] Hub becomes a real labelled OCG node; the floating chip becomes its label.
- [ ] Five satellites at identical size on a symmetric orthogonal fan; Drift History returns to axis.
- [ ] Delete the decorative grey diamond.

### Task 3.7: Deck 8 SRE timeline
- [ ] Split the long body paragraph: incident timeline on columns 1–5, agent sequence on columns 7–11.
- [ ] Remove the stray StackGen chip and the "Aiden for SRE" button.
- [ ] Timeline states use Diagram Node active variant for the resolved state only.

### Task 3.8: Deck 9 pipeline and logos
- [ ] Replace the text-chip cloud providers with a `Logo Strip` instance using real monochrome AWS, Azure, GCP and Kubernetes marks.
- [ ] Pipeline stages become one aligned left-to-right row of Diagram Nodes; the check row sits beneath on the same columns.
- [ ] Metrics (`<3%`, `Zero min`) become `Stat Cell` instances in the footer zone.
- [ ] Remove the stray StackGen chip and button.

### Task 3.9: Deck 10 migration flow and logos
- [ ] Reduce the 3,456-node binary rain to a single low-opacity texture layer, or delete it. It costs more than it contributes.
- [ ] AWS, Azure and Oracle render as real monochrome logos (`oracle.svg` was fetched 2026-08-20). The current red circle outline standing in for Oracle is removed.
- [ ] Migration path becomes one orthogonal left-to-right flow with the rollback branch as the single accent path.
- [ ] Keep the "6 to 9 months" claim omitted.

### Task 3.10: Deck 12 lifecycle cycle
- [ ] Delete the footer motif, the stray diagonal line and the stray circle.
- [ ] Four lifecycle stages become a proper cycle with a visible return connector, using the full body band rather than clustering at the top.

### Task 3.11: Deck 13 roadmap
- [ ] Delete the faint blob shapes.
- [ ] Three equal 4-column roadmap columns, each headed by a Label chip in the same position; `H1 2027` moves above its column like the other two.
- [ ] Items become equal-height rows filling the body band.

### Task 3.12: Deck 15 architecture and logos
- [ ] Control Room → five stages → Live Application as one orthogonal flow.
- [ ] `Platform & Tools` strip becomes a `Logo Strip` instance with real monochrome marks.

### Task 3.13: Deck 11 Aiden OS
- [ ] Five capability cards on a uniform grid at equal heights.
- [ ] Left panel either carries a real Aiden OS runtime diagram or is dropped so the cards use the full band. Decide from the built result; an empty panel with a small infinity mark is not acceptable either way.

**GATE 3:** Final contact sheet plus a full verification pass per design §7.

---

# Task 4: Close out

- [ ] Confirm every read-only frame from Constraint 2 still resolves and was not modified.
- [ ] Deck-wide ban scan across all 15 frames.
- [ ] Confirm all 15 flat PNG exports exist and are non-trivial in size.
- [ ] Update `openmemory.md` with the design system (§4) and the component IDs from Task 2.0.
- [ ] Store OpenMemory project facts: the design system, the five component IDs, and the superseded fidelity rule.
- [ ] Write `.superpowers/sdd/refine-final-report.md`.

## Risks

| Risk | Mitigation |
|---|---|
| Re-composition drops content that carried meaning | Every task preserves text content verbatim; only layout and decoration change. Report any text removed. |
| Parallel agents drift apart again | Task 2.0 builds shared components first; all later tasks instance them rather than authoring equivalents. |
| Export quirk silently produces black or nested artifacts | Constraint 12 guard after every export, plus a file-size check. |
| Logo SVG geometry does not import cleanly into Pencil | Build the `Logo Strip` once in Task 2.0 and verify visually before 12 slides depend on it. |
| Deck 15's approved title differs from the real Figma title | Recorded as a known reconciliation item; cheap to change later since it is one text node. |
