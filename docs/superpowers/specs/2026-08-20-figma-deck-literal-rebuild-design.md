# Figma Deck → Pencil Literal Rebuild Design

**Date:** 2026-08-20
**Status:** Draft — pending user review
**Source:** Figma file `sg-new-postn-deck (Copy)` — fileKey `o3DPbzkDs4p2C7ct3d1bbK`, page `new` (node `0:1`), 16 top-level slide frames named `"0"`–`"15"`
**Canvas:** `Stack_Linear.pen`
**Supersedes (for this new work only):** `docs/superpowers/specs/2026-08-19-postn-diagram-replica-shelf-design.md` — that design's Fidelity Mode A (composition-only, PNG-sourced) is replaced by Fidelity Mode C below for a fresh rebuild. The site-incorporation design (`2026-08-19-postn-deck-incorporation-design.md`) and its protected frame IDs are **not** touched or superseded.

---

## 1. Problem

A prior effort (`postn-diagram-replica-shelf`) built 12 of 16 deck slides as *restyled composition approximations*, reverse-engineered from flat 300dpi PNG exports because Figma API access did not exist yet. The audit (`​.superpowers/sdd/audit/replica-audit-2026-08-20.md`) found 2 of 6 audited frames **broken** and 2 **moderate defects** — a direct consequence of guessing structure from a raster image.

Figma MCP access is now live and confirmed working against the Figma source file. This removes the need to guess: every slide's exact text, layer names, nesting, and geometry can be read directly. The user wants a fresh, literal rebuild using this ground truth, with every Figma layer represented in the Pencil version.

---

## 2. Decisions locked (from user answers, 2026-08-20)

| Decision | Choice |
|---|---|
| Relationship to old shelf | **Full rebuild** — delete the 12 existing replica frames, rebuild all 16 fresh from Figma |
| Layer fidelity | **Literal, node-for-node** — every Figma layer (including structural wrapper groups) gets a corresponding Pencil node, as closely as the `.pen` schema allows |
| Visual styling | **StackGen Linear restyle** — colors/fonts follow the Direction Contract (`Vrb0t`) tokens, not the deck's original palette. Structure/positions/hierarchy/content are literal; paint is StackGen's |
| Scope | **15 of 16 slides** (`0`–`13`, `15`). Deck 15 is new (not in the old PDF-based effort's 15-slide set) and is included. Deck 14 keeps its prior permanent exclusion — see §6 |
| Execution mode | **Subagent-driven, up to 10 in parallel** — deviates from `subagent-driven-development`'s default "never parallelize implementers" red flag; permitted here because each subagent owns one pre-allocated, non-overlapping frame with zero shared mutable state (see §5.3) |

---

## 3. Non-negotiable locks (carried forward, unchanged)

From Direction Contract (`Vrb0t`) + `.agents/product-marketing.md` + prior shelf design:

- **Tokens:** `$bg-base` `#08090A`/`#0E0F11`, `$bg-raised`, `$surface-card`, `$border-hairline`/`$border-card`, `$text-primary`/`$text-secondary`/`$text-tertiary`, `$accent` `#9437FF` (only accent — no cyan, no second brand color), `$accent-dim`, `$accent-text`
- **Type:** Inter for display, JetBrains Mono for code/measurement/policy labels only
- **Forbidden:** glow/blur-as-brand, gradient text, em dashes (`—`/`–`)
- **Naming map:** `Aiden for DevOps` → `Aiden for Automation`; `Aiden for InfraOps` → `Aiden for Infrastructure`; `Olly` → never used
- **Read-only, never touch:** `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`, Wave B stubs (`uPzvZ`,`socHN`,`wTrxq`,`Bp1dp`,`ARO2U`), component shelf (`JJx7F`,`xcXXD`,`NCL0m`,`e9nTl`,`m2UJ8`,`GZSQR`,`igbym`,`N6udS`,`Vrb0t`)

---

## 4. What "literal, node-for-node" means in practice

Pencil's own guidance explicitly warns against wrapping every element in its own box/frame "because it's a common AI habit that makes designs look generic." This tension is resolved as follows:

1. **Every Figma node that carries visible content or a distinct semantic role** (text, icon, shape, card, column, row, connector, badge) **must have a corresponding named Pencil node.** Names should echo the Figma layer name (e.g. Figma `"Frame 66"` → Pencil node named `"Frame 66"` or a clearer equivalent noted in the task report) so a reviewer can trace Pencil nodes back to Figma layers.
2. **Purely mechanical Figma wrapper groups with zero visual properties** (no fill/stroke/effect, single child, only existing because Figma's editor auto-wraps things) may be **collapsed one level** — but the child they wrap must still exist with correct position/size. Document any collapse in the task report so it's auditable, not silent.
3. **Repeated micro-elements from decorative effects** (e.g. deck 10 contains a "binary rain" background built from several hundred individual 1-character Figma text nodes, each ~5×6px) are reproduced with a **JS loop that generates the same node count and visual pattern** — this satisfies literal fidelity (same layers exist, same density) without hand-authoring hundreds of `Insert` calls. This is a generation *technique*, not a fidelity reduction.
4. **Figma component instances** (`INSTANCE` nodes) are rebuilt as Pencil `ref` instances if an equivalent reusable Pencil component already exists (e.g. cloud-provider logo marks in `u6p5hC`), otherwise as expanded literal frames.
5. **Node type mapping:** Figma `FRAME`→Pencil `frame`; `GROUP`→`group`; `TEXT`→`text`; `RECTANGLE`/`ROUNDED_RECTANGLE`→`rectangle`; `ELLIPSE`→`ellipse`; `VECTOR`/`BOOLEAN_OPERATION`/icon glyphs→Pencil `icon` (lucide/phosphor library match preferred) or `path` with explicit `viewBox` when no icon match exists; connectors/lines→`path` or thin `rectangle` per Pencil's own line-drawing idiom.

---

## 5. Architecture

### 5.1 Canvas placement

- New root frames only, claimed via `FindEmptySpace` **after** deleting the 12 old replica frames (freeing their region for reuse).
- Layout: **4-column × 4-row grid**, cell size 1920×1080 (16:9), 200px gutter both axes (block size 8280×4920). Grid order follows Figma's own slide index (`0`–`15`, row-major).
- Frame naming: `"Deck {N} — {Exact Figma Title}"` (title extracted from the slide's own heading text at build time, not hardcoded here for slides not yet inventoried — see §7 task list for which titles are already known).
- `placeholder: true` while building; cleared when the slide passes its verification checklist.

### 5.2 Old frame disposal

Delete these 12 existing replica frames (superseded by this rebuild): `fF5sz` (0), `UdNdR` (1), `yZJZb` (2), `K887J` (3), `ekA26` (4), `YMipV` (5), `Hp0Tk` (6), `xdCwb` (7), `Y5oI04` (8), `aPptF` (9), `k9h3r5` (10), `PBBa1` (12).

**Keep** `u6p5hC` (logo component shelf — AWS/Azure/GCP/K8s/Docker/Terraform/Git/SonarQube marks) as an optional reusable resource; new slides may instance from it or source their own icons directly, per task.

### 5.3 Parallel-safety design (required because up to 10 subagents run concurrently)

`subagent-driven-development`'s default rule is "never parallelize implementers" because concurrent edits to shared files conflict. This plan avoids that failure mode structurally:

1. **Task 0 runs alone, sequentially, first.** It deletes the 12 old frames, computes the grid via `FindEmptySpace`, and **pre-creates all 16 empty placeholder frames** (with `placeholder: true`, correct name stub, position, size, fill `$bg-base`) in one batch. It returns the full `{deckIndex, figmaNodeId, pencilFrameId, x, y}` table.
2. **Every per-slide task (1–16) only ever inserts children into its own pre-allocated frame ID.** No task reads, writes, or references another task's frame subtree. No task calls `SetVariables` (all needed `$` tokens already exist from the Direction Contract; if a genuinely new token is needed, it is proposed in the task report for the orchestrator to add sequentially between waves, never mid-wave).
3. **No shared JS state.** Each subagent's `execute` calls are independent scopes by construction (Pencil's own execute semantics — locals don't persist across calls anyway), so there is nothing to race on beyond the frame boundary already isolated in step 2.
4. **Two waves, not one shot of 16:** Wave A = decks 0–9 (10 parallel), Wave B = decks 10–15 (6 parallel). This matches the "up to 10 parallel" ceiling and lets the orchestrator sanity-check Wave A's screenshots before committing the same pattern to Wave B.

### 5.4 Per-slide build workflow (every task 1–16)

1. Read the slide's exact content via Figma MCP: `get_metadata(fileKey, nodeId)` for structure, `get_design_context(fileKey, nodeId)` for text/color/font detail, `get_screenshot(fileKey, nodeId, maxDimension: 1600)` for visual reference.
2. Inventory every child layer (name, type, position, size, text content) from the metadata XML.
3. Build in the pre-allocated Pencil frame: literal structure per §4, StackGen tokens per §3, naming map applied to any DevOps/InfraOps product-name text.
4. Ban-scan (regex for em dash, `Olly`, `Aiden for DevOps`, `Aiden for InfraOps`) + screenshot + `Export` to `.superpowers/sdd/figma-rebuild-artifacts/deck-{N}.png`.
5. Clear `placeholder: false`. Write task report with Pencil frame ID, Figma node ID, node-count comparison (Figma layer count vs Pencil node count, with any intentional collapses per §4.2 listed), and screenshot path.

---

## 6. Deck 14 (ROI figures) — decided: excluded

**Final decision (user, 2026-08-20):** Deck 14 keeps its prior permanent exclusion from the shelf design. It is **not built** in this rebuild. Its grid slot in the 4×4 layout (see §5.1) is left empty rather than populated. This effort covers 15 of the 16 Figma slides: `0`–`13` and `15`.

---

## 7. Slide inventory (titles known vs. to-be-extracted)

| Deck | Figma node ID | Title (already confirmed from metadata) |
|---|---|---|
| 0 | `1:14938` | "The Autonomous DevOps Factory" (cover) |
| 1 | `1:7514` | "Software Creation Outpaces Software Operations" |
| 2 | `1:14797` | "Manual delivery creates a massive human toll and cost bottleneck" |
| 3 | `1:7661` | "Reactive SRE Fails to Solve the On-Call Crisis" |
| 4 | `1:7729` | "Stateless Domain Agents Fail to Solve Cross-Domain Problems" |
| 5 | `1:14635` | *(extract at build time)* |
| 6 | `1:7854` | "Stateful Memory and Outcome Accountability Drive the Factory Model" |
| 7 | `1:7929` | "The Operational Context Graph (OCG)" |
| 8 | `1:8055` | "Aiden for SRE — Autonomous Incident Investigation & Remediation" |
| 9 | `1:14411` | *(extract at build time — "Aiden for DevOps"/Automation pipeline per old plan)* |
| 10 | `1:8591` | *(extract; contains "Policy-Bounded Migration Pipeline" body copy + binary-rain decorative background — see §4.3)* |
| 11 | `1:8708` | *(extract — "Aiden OS" per old plan)* |
| 12 | `1:13727` | *(extract — "Factory Process" per old plan)* |
| 13 | `1:13969` | *(extract — "Roadmap" per old plan)* |
| 14 | `1:14162` | **EXCLUDED — not built** (see §6) |
| 15 | `1:14278` | *(extract — entirely new slide, not in prior PDF-based effort)* |

---

## 8. Skills (evaluated from Cursor global catalog)

Reused and extended from the prior shelf plan's battle-tested matrix, plus the newly-available Figma skill set:

### Process (orchestration)
- `using-superpowers` — session routing
- `brainstorming` — done, this doc is its output
- `writing-plans` — produces the paired implementation plan
- `subagent-driven-development` — execution mode (with the explicit parallel-execution deviation in §5.3)
- `dispatching-parallel-agents` — governs how the 2 waves of parallel subagents are dispatched (independent-domain requirement satisfied by §5.3)
- `verification-before-completion` — final gate (Task 17)

### Per-slide craft stack (read before each build task)
1. **Figma MCP `/figma-design-to-code` workflow** (server-provided skill, `skill://figma/figma-design-to-code/SKILL.md`) — adapted: primary source-of-truth extraction now replaces the old `image-to-code`-on-PNG approach
2. **Pencil Slides guide** (`get_guidelines({category:"guide", name:"Slides"})`) — 16:9, title ≥40px, body ≥24px, ≥100px margins, layout contracts L01–L20
3. `pencil-web-design-expert` — Pencil MCP authoring patterns
4. `impeccable` — layout craft floor; pin Linear world over any "richer" impulse
5. `design-taste-frontend` — anti-slop, keep deck density (don't paraphrase to 3 cards)
6. `product-marketing` + `copywriting` — naming map enforcement, no em dashes
7. `ponytail` — applies to *generation technique* (loops for repeated structure per §4.3), not to layer *count*, which is fixed by literal-fidelity requirement
8. `devil-advocate` — deck 10 (migration timeline claims) and deck 13/14 (roadmap dates, ROI figures)

### Explicitly excluded
| Skill | Why |
|---|---|
| `image-to-code` as primary path | Figma MCP is now ground truth; PNG-based inference is a fallback only if a Figma call fails |
| `high-end-visual-design` | Bans Inter; conflicts with Direction Contract |
| `brandkit` / `imagegen-frontend-*` | Would generate images as content; diagrams must stay editable native layers |
| `slideshow` / `hyperframes*` / `md-slides` | Wrong medium (video/markdown, not Pencil) |
| `redesign-existing-projects` | Must not touch protected site frames |

---

## 9. Acceptance criteria

Per slide:
1. Frame lives only in the new grid region; none of the protected site/component IDs were touched.
2. Every Figma layer with visible content has a traceable Pencil counterpart (task report lists any §4.2 collapses).
3. StackGen tokens only for color/type; no cyan, no glow, no gradient text.
4. Ban-scan clean (em dash, Olly, Aiden for DevOps/InfraOps).
5. Screenshot exported to `.superpowers/sdd/figma-rebuild-artifacts/deck-{N}.png`.
6. Text content matches the Figma source (verified against `get_design_context` output), naming map applied.

Whole effort:
7. All 16 decks built, old 12 replica frames deleted, deck 14 handled per §6.
8. `openmemory.md` updated with new frame IDs, superseding the old shelf entry.
9. Final verification report confirms protected frames untouched.

---

## 10. Out of scope

- Editing or wiring these slides into the live marketing site pages (site incorporation is a separate, already-executed effort)
- Video/HyperFrames export
- Unlocking the migration "6→9 Months" claim (needs separate product-marketing sign-off — omit if encountered on deck 10/13)

---

## 11. Self-review

- **Placeholders:** none — every task-relevant fact either is stated exactly (frame IDs, tokens, grid math) or is explicitly marked "extract at build time" as a concrete first step, not a vague instruction.
- **Internal consistency:** literal-fidelity (§4) and Linear-restyle (§3) coexist by design: structure/content literal, paint restyled — stated explicitly to avoid the "which one wins" ambiguity.
- **Scope:** single cohesive effort (one Figma file, one canvas, one grid) — not decomposed further.
- **Open question surfaced, not buried:** §6 deck 14 handling is flagged for explicit user confirmation before Task 14 runs, everything else proceeds without blocking.
