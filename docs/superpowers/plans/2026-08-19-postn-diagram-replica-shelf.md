# Diagram Replica Shelf Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new 16:9 Linear diagram replica shelf on `Stack_Linear.pen` that composition-matches `sg-new-postn-deck/` slides without modifying any existing marketing frames.

**Architecture:** Claim empty canvas space (~x=10670). Build one root frame per deck slide (1920×1080). Visual source of truth is PDF + preview PNG; rebuild as editable Pencil layers with Linear tokens and the naming map. Waves: R1 mechanism (7, 12, 8) → R2 problem/intent (1, 5, 9) → optional R3 → verify. Site pages stay read-only.

**Tech Stack:** Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`), OpenMemory `Stackgen_Website_Redesign`, `pdftoppm` for previews, deck source `sg-new-postn-deck/` + `.firecrawl/postn-deck/`

## Global Constraints

1. **Canvas:** `Stack_Linear.pen` only. Pencil MCP only — never Read/Grep `.pen`.
2. **Read-only IDs:** Never Update/Delete/Insert into trees of `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`, Wave B stubs (`uPzvZ`, `socHN`, `wTrxq`, `Bp1dp`, `ARO2U`), or component shelf (`JJx7F`, `xcXXD`, `NCL0m`, `e9nTl`, `m2UJ8`, `GZSQR`, `igbym`, `N6udS`, `Vrb0t`).
3. **Visual world:** Linear dark tokens only (`$bg-base`, `$bg-raised`, `$surface-card`, `$surface-sunken`, `$border-hairline`, `$border-card`, `$text-primary`, `$text-secondary`, `$text-tertiary`, `$accent` `#9437FF`, `$accent-dim`, `$accent-text`, `$pass`, `$halt`). No glow. No cyan as second brand accent. No gradient text.
4. **Fidelity:** Composition replica (mode A). If the deck has N labeled stages/satellites/rows, the replica has N. Do not dumb down to three marketing cards.
5. **Editable only:** No whole-slide PNG/PDF Import as the diagram body.
6. **Naming:** DevOps→Automation, InfraOps→Infrastructure. Never Olly. Never `Aiden for DevOps` / `Aiden for InfraOps` on shelf.
7. **Voice:** No em dashes (`—` / `–`) in any shelf text.
8. **ROI:** Do not build deck slide 14. No modeled `$` ROI strings.
9. **Migration claim:** Do not put “6→9 Months” on deck-10 replica unless product-marketing unlocks it.
10. **Commits:** No commits unless user asks.
11. **Design SoT:** `docs/superpowers/specs/2026-08-19-postn-diagram-replica-shelf-design.md`

## Specs (read before each task)

| Doc | Role |
|---|---|
| `docs/superpowers/specs/2026-08-19-postn-diagram-replica-shelf-design.md` | Shelf design (locked) |
| `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md` | Naming map + site locks (do not re-edit site pages) |
| `.agents/product-marketing.md` | Messaging / naming |
| `.firecrawl/postn-deck/all-slides-text.txt` | Deck copy extract |
| `.firecrawl/postn-deck/previews/hi-{N}-1.png` | Structure reference |
| `sg-new-postn-deck/{N}.pdf` | Visual SoT |

## File / Artifact Map

| Path | Responsibility |
|---|---|
| `Stack_Linear.pen` | New replica root frames only |
| `docs/superpowers/specs/2026-08-19-postn-diagram-replica-shelf-design.md` | Living design |
| `docs/superpowers/plans/2026-08-19-postn-diagram-replica-shelf.md` | This plan |
| `.superpowers/sdd/replica-artifacts/` | Per-slide PNG exports + task reports |
| `openmemory.md` | Index shelf after Task 8 |
| `sg-new-postn-deck/*.pdf` | Reference only |

## Skills Matrix (Cursor global catalog — installed)

All skills below are **already installed** under `~/.agents/skills`, `~/.cursor/skills`, or Superpowers plugin skills. Do **not** `npx skills add` for this plan unless a skill path is missing on the worker machine.

**HARD RULE before every task:** Read the listed `SKILL.md` files for that task row (orchestration + required), announce “Using [skill] to [purpose]”, then execute. Do not start Pencil edits until required skills for that task are loaded.

### Catalog paths (resolve on worker)

| Skill | Typical path |
|---|---|
| `using-superpowers` | `~/.cursor/plugins/cache/cursor-public/superpowers/*/skills/using-superpowers/SKILL.md` |
| `brainstorming` | `…/superpowers/*/skills/brainstorming/SKILL.md` |
| `writing-plans` | `…/superpowers/*/skills/writing-plans/SKILL.md` |
| `subagent-driven-development` | `…/superpowers/*/skills/subagent-driven-development/SKILL.md` |
| `executing-plans` | `…/superpowers/*/skills/executing-plans/SKILL.md` |
| `dispatching-parallel-agents` | `…/superpowers/*/skills/dispatching-parallel-agents/SKILL.md` |
| `verification-before-completion` | `…/superpowers/*/skills/verification-before-completion/SKILL.md` |
| `requesting-code-review` | `…/superpowers/*/skills/requesting-code-review/SKILL.md` |
| `image-to-code` | `~/.agents/skills/image-to-code/SKILL.md` |
| `impeccable` | `~/.cursor/skills/impeccable/SKILL.md` |
| `pencil-web-design-expert` | `~/.cursor/skills/pencil-web-design-expert/SKILL.md` |
| `design-taste-frontend` | `~/.agents/skills/design-taste-frontend/SKILL.md` |
| `design-taste-frontend-v1` | `~/.agents/skills/design-taste-frontend-v1/SKILL.md` |
| `minimalist-ui` | `~/.agents/skills/minimalist-ui/SKILL.md` |
| `product-marketing` | `~/.cursor/skills/product-marketing/SKILL.md` (fallback `~/.agents/skills/product-marketing`) |
| `copywriting` | `~/.agents/skills/copywriting/SKILL.md` |
| `devil-advocate` | `~/.agents/skills/devil-advocate/SKILL.md` |
| `humanizer` | `~/.agents/skills/humanizer/SKILL.md` |
| `ponytail` | `~/.cursor/skills/ponytail/SKILL.md` |
| `full-output-enforcement` | `~/.agents/skills/full-output-enforcement/SKILL.md` |
| Pencil Slides guide | Pencil MCP `get_guidelines({category:"guide", name:"Slides"})` |

### Orchestration (whole plan)

| Skill | When |
|---|---|
| `using-superpowers` | Session start / skill routing |
| `brainstorming` | Done — design locked |
| `writing-plans` | Done — this plan (skills matrix expanded 2026-08-20) |
| `subagent-driven-development` | **Recommended** execution mode |
| `executing-plans` | Alternate inline execution |
| `dispatching-parallel-agents` | Optional: Tasks 4–6 only after R1 accepted (never parallelize with Task 0–3) |
| `verification-before-completion` | Task 8 |
| `requesting-code-review` | Optional gate after each R1 frame (Tasks 1–3) |

### Craft stack for every replica build (Tasks 1–7)

Load in this order:

1. **`image-to-code` (adapted)** — deck PDF/PNG is the visual SoT; deeply analyze composition (region count, connectors, labels); then rebuild. Do **not** generate new AI mock images as SoT; do **not** paste PNG as the diagram body.
2. **Pencil Slides guide** — 16:9, title ≥40, body ≥24, margins ≥100px.
3. **`pencil-web-design-expert`** — Pencil MCP authoring patterns; **override** any “richer / glow / motion” impulse with Direction Contract (`Vrb0t`) + Linear tokens.
4. **`impeccable`** — layout craft floor; run `scripts/context.mjs` once per session; load craft-floor before editing; pin Linear world (no new visual world).
5. **`design-taste-frontend`** — anti-slop / anti three-card paraphrase; keep deck density.
6. **`product-marketing` + `copywriting`** — naming map (DevOps→Automation, InfraOps→Infrastructure); strip em dashes.
7. **`ponytail`** — minimum layers that still hit density; no decorative abstractions.

**Optional if stuck:** `design-taste-frontend-v1`, `minimalist-ui` (if noisy), `humanizer` (if body copy reads LLM-stiff), `devil-advocate` (Task 7 deck 10 claims), `full-output-enforcement` (if agent truncates dense diagrams).

### Per-task Skills Assigned

| Task | Wave | Required skills (read before work) | Optional | Do not use |
|---|---|---|---|---|
| **0** Setup + previews + shelf label | R0 | `using-superpowers` · `firecrawl-cli` (status + optional parse) · OpenMemory MCP · Pencil MCP · `ponytail` | — | Any site-frame edit; `brandkit` image gen |
| **1** Deck 7 OCG | R1 | Craft stack above · `firecrawl-parse` (inventory query) · Pencil MCP | `requesting-code-review` after export | Flattened slide Import; cyan/glow from deck; `slideshow` / HyperFrames; `high-end-visual-design` (bans Inter; conflicts with Direction Contract); `figma` (PDF is SoT); `brandkit` |
| **2** Deck 12 Factory Process | R1 | same as Task 1 | same | Merging with product loop (Build/Govern/Observe/Remediate); same bans as Task 1 |
| **3** Deck 8 SRE | R1 | same as Task 1 · `copywriting` (body rewrite, no em dash) | `humanizer` | `Aiden for DevOps` wording; glow borders from deck |
| **4** Deck 1 Creation vs Ops | R2 | Craft stack · `firecrawl-parse` · Pencil MCP | `dispatching-parallel-agents` only if R1 signed off | Dumbing Gap graphic to a single label |
| **5** Deck 5 Factory Intent | R2 | Craft stack · `firecrawl-parse` · Pencil MCP · `impeccable` (kill beige/glow left panel) | `minimalist-ui` | Beige deck chrome; glow wash; PNG paste |
| **6** Deck 9 Automation | R2 | Craft stack · `firecrawl-parse` · `product-marketing` · `copywriting` (DevOps→Automation) · Pencil MCP | `full-output-enforcement` (stage count) | Product name DevOps; isometric PNG paste; stage-count reduction |
| **7** Wave R3 (optional) | R3 | Craft stack · `firecrawl-parse` · `devil-advocate` on deck 10 · `product-marketing` | Confirm with user before start | Slide 14; “6→9 Months” unless unlocked; InfraOps as product name |
| **8** Verify + memory | R4 | `verification-before-completion` · OpenMemory MCP · `requesting-code-review` (optional summary) · `firecrawl-cli` only if re-checking live stackgen.com naming (optional) | `impeccable` critique only if defects | New page-merge scope; editing protected frame IDs |

### Cursor Model Matrix (from `firecrawl-cli` web research — 2026-08-20)

**Sources (saved under `.firecrawl/cursor-models/`):**
- [Cursor Router](https://cursor.com/blog/router) — classify by complexity; *simple → efficient*; *UI → best taste*; *long-horizon → frontier reasoning*; Auto **Intelligence** / **Balance** modes
- [Agent best practices](https://cursor.com/blog/agent-best-practices) — pick model **per task**; plan before build; design-to-code from images; for hard problems run **multiple models** and pick the best
- [Forum: different models for different tasks](https://forum.cursor.com/t/does-anyone-actually-use-different-models-for-different-tasks/151874) — community pattern: stronger/frontier for careful planning & security-sensitive work; Sonnet-class for daily medium work
- Secondary: Composer positioned as everyday multi-file coding path; frontier Claude/GPT for architecture-heavy turns ([Builder.io](https://www.builder.io/blog/cursor-vs-claude-code), Composer writeups)

**How to apply here:** Parent chat (you) picks the chat model. Subagents via Task tool must use a slug from the harness allow-list. Prefer **explicit** models over Auto when fidelity is the acceptance gate (R1 diagrams), so reviewers know what ran.

| Task | Work shape (Router taxonomy) | Parent chat model (recommended) | Task-tool `model` slug (subagent) | Rationale |
|---|---|---|---|---|
| **0** Setup / previews / label | Simple / mechanical | **Composer** or Auto Balance | `composer-2.5-fast` | Shell + FindEmptySpace; no visual judgment |
| **1** Deck 7 OCG | UI + spatial composition | **Claude Sonnet** (or Auto **Intelligence** if Teams Router) | `inherit` (parent on Sonnet) **or** `gemini-3.1-pro` if vision-heavy inventory stalls | Hub+5 satellites; Router: UI → taste; needs faithful layout from PNG |
| **2** Deck 12 Factory Process | UI + structured process | Claude Sonnet / Auto Intelligence | `inherit` or `gpt-5.4-medium` | Four equal steps; density over cleverness |
| **3** Deck 8 SRE | UI + long multi-column | **Claude Opus** or Auto Intelligence | `inherit` (parent Opus) **or** `gpt-5.5-medium` / `gpt-5.6-sol-medium` | Highest density R1 (5+6+OCG); long-horizon layout; hard problem → frontier |
| **4** Deck 1 Creation vs Ops | UI compare layout | Claude Sonnet | `inherit` or `gemini-3.1-pro` | Two-column + Gap; vision helps |
| **5** Deck 5 Factory Intent | UI restyle (kill glow/beige) | Claude Sonnet + strong craft | `inherit` or `gpt-5.4-medium` | Taste-critical Linear restyle of illustrated panel |
| **6** Deck 9 Automation | UI + high stage count | **Claude Opus** or Auto Intelligence | `inherit` (Opus) **or** `gpt-5.5-medium` | Isometric→2D without losing stages; hardest R2 |
| **7** Wave R3 batch | Mixed UI (optional) | Claude Sonnet | `inherit` or `composer-2.5-fast` for text-light slides (0,6,13) | Confirm with user first; escalate to Opus only if a slide fails density |
| **8** Verify + memory | Review / checklist | Claude Sonnet or Composer | `composer-2.5-fast` or `gpt-5.4-mini-medium` | Ban scan + integrity; not creative redesign |
| **Orchestrator** (SDD parent) | Long-horizon coordination | Claude Sonnet daily; **Opus** if R1 reviews keep failing | n/a (this session) | Plan Mode already done; orchestrator reviews exports |

**Hard-problem pattern (from Cursor agent best practices):** For Tasks **3** and **6**, if first export fails density vs `hi-{N}-1.png`, re-run the **same task prompt** on a second model (`gemini-3.1-pro` **and** `gpt-5.5-medium`) and keep the better composition — do not merge both into one muddy frame.

**Do not:** default every task to Opus (Router/cost evidence); use `composer-2.5-fast` alone for R1 density slides (too easy to under-build); use flash/mini models for OCG/SRE/Automation replicas.

### Firecrawl CLI per task (SoT extraction)

| Task | `firecrawl-cli` command | Output path | Notes |
|---|---|---|---|
| **0** | `firecrawl --status`; optional `parse` batch for decks 1,5,7,8,9,12 if markdown missing | `.firecrawl/postn-deck/parse-{N}.md` | Prefer existing `all-slides-text.txt` + `pdftoppm` previews; parse only to refresh |
| **1–7** | `firecrawl parse "sg-new-postn-deck/{N}.pdf" -Q "List every labeled region, step, and connector endpoint on this slide" -o .firecrawl/postn-deck/inventory-{N}.md` | inventory md | Complements PNG visual inventory; do **not** replace preview analysis |
| **1–7** | Skip `search` / `scrape` / `crawl` / `monitor` / `interact` for diagram rebuild | — | Local PDF is SoT; live site scrape is out of scope for shelf |
| **8** | Optional `firecrawl scrape "https://stackgen.com/..."` only if verifying public naming drift | `.firecrawl/stackgen-naming-check.md` | Optional; not required for shelf accept |

Skill files: `firecrawl-cli` + `firecrawl-parse` at `~/.cursor/plugins/cache/cursor-public/firecrawl/*/skills/`.

### Explicitly excluded from this plan (installed but wrong deliverable)

| Skill | Why excluded |
|---|---|
| `slideshow` / `hyperframes*` / `md-slides` | HyperFrames / video / markdown slides — not Pencil shelf |
| `high-end-visual-design` | Bans Inter; pushes non-Linear chrome against Direction Contract |
| `brandkit` / `imagegen-frontend-*` | Generates brand/mock images; must not become diagram SoT |
| `figma` | No Figma token / PDF deck is the source |
| `redesign-existing-projects` | Must not rewrite existing marketing pages |
| `landing` / `landing-page-generator` | Wrong surface (web page generators, not .pen replica shelf) |

### Agent prompt block (copy into every subagent)

```text
Skills Assigned (REQUIRED — read SKILL.md before Pencil work):
  <paste Required skills cell from Skills Matrix row for this task>
Optional if stuck: <paste Optional cell>
Do not use: <paste Do not use cell + Excluded table>
Cursor model (REQUIRED): parent=<from Model Matrix>; Task-tool model=<slug from Model Matrix>
Firecrawl: parse inventory for this deck N if inventory-{N}.md missing; never scrape as diagram SoT.

Design: docs/superpowers/specs/2026-08-19-postn-diagram-replica-shelf-design.md
Plan: docs/superpowers/plans/2026-08-19-postn-diagram-replica-shelf.md
Direction Contract: Vrb0t (Linear tokens; Inter; #9437FF; no glow)
Canvas: Stack_Linear.pen via Pencil execute only.
HARD RULE: Do not modify JLg8h, A38GWG, T4FJtW, zTOam, OAfMk, bEaQH, HL34b, Wave B, or component shelf.
Fidelity: composition replica of sg-new-postn-deck slide N; Linear restyle; naming map; no glow/cyan; no em dashes; no slide-14 ROI.
Workflow: analyze preview PNG (image-to-code adapted) → firecrawl parse inventory → rebuild editable layers → ban scan → Export.
placeholder:true while building; false when done.
Export: .superpowers/sdd/replica-artifacts/deck-{N}.png
Report: .superpowers/sdd/replica-task-{T}-report.md with new frame id + skills used + model used.
No commits unless user asked.
```

---

### Task 0: Shelf setup + memory + previews

**Files:**
- Create: `.superpowers/sdd/replica-artifacts/` (directory)
- Create: `.superpowers/sdd/replica-task-0-report.md`
- Modify: `Stack_Linear.pen` (new label frame only)
- Modify: `openmemory.md` (brief Patterns note that shelf work started)
- Read: design + this plan (especially Skills Matrix)

**Skills (required before Step 1):** `using-superpowers` · `firecrawl-cli` · OpenMemory MCP · Pencil MCP · `ponytail` · model `composer-2.5-fast`

**Interfaces:**
- Consumes: empty space near x≈10670
- Produces: shelf origin `{shelfX, shelfY}`; optional label frame id; preview PNGs for slides 1,5,7,8,9,12

- [ ] **Step 0: Load required skills + set model** — Read Skills Matrix Task 0 + Model Matrix; announce skills and model.

- [ ] **Step 1: Ensure preview stills exist**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
mkdir -p .superpowers/sdd/replica-artifacts .firecrawl/postn-deck/previews
for i in 1 5 7 8 9 12; do
  pdftoppm -png -r 120 "sg-new-postn-deck/$i.pdf" ".firecrawl/postn-deck/previews/hi-$i"
done
ls .firecrawl/postn-deck/previews/hi-{1,5,7,8,9,12}-1.png
```

Expected: six PNG paths exist.

- [ ] **Step 2: Claim shelf origin (Pencil)**

```js
pos = FindEmptySpace({width:1920,height:1200,direction:"right",padding:120})
Print(pos)
// store shelfX=pos.x, shelfY=pos.y (expect ~10670,0)
```

- [ ] **Step 3: Insert shelf label context (optional but recommended)**

```js
Insert(document,{
  type:"context",
  name:"Diagram Replica Shelf",
  x:shelfX,
  y:shelfY - 80,
  width:520,
  height:60,
  content:"Diagram Replica Shelf: composition replicas of sg-new-postn-deck in Linear tokens. Do not edit existing marketing pages. Wave R1: decks 7,12,8. Wave R2: 1,5,9."
})
```

- [ ] **Step 4: OpenMemory + report**

Search then add project fact: shelf origin coordinates + “replica shelf in progress, site frames read-only.”
Write `.superpowers/sdd/replica-task-0-report.md` with `shelfX`, `shelfY`, label id.

- [ ] **Step 5: Commit only if user asks** — otherwise skip.

---

### Task 1: Replica — Deck 7 — OCG

**Files:**
- Modify: `Stack_Linear.pen` (new root frame only)
- Create: `.superpowers/sdd/replica-artifacts/deck-7.png`
- Create: `.superpowers/sdd/replica-task-1-report.md`
- Read: `sg-new-postn-deck/7.pdf`, `.firecrawl/postn-deck/previews/hi-7-1.png`, slide 7 text in `all-slides-text.txt`

**Skills (required before Step 1):** Craft stack from Skills Matrix (`image-to-code` adapted · Pencil Slides · `pencil-web-design-expert` · `impeccable` · `design-taste-frontend` · `product-marketing` · `copywriting` · `ponytail`) · Pencil MCP

**Interfaces:**
- Consumes: `shelfX`, `shelfY` from Task 0
- Produces: frame id `replica7` at `(shelfX, shelfY)`

- [ ] **Step 0: Load required skills** — Read Skills Matrix Task 1 required `SKILL.md` files; announce; pin Direction Contract over any conflicting skill defaults.

Confirm: title left, body right; center hub “OCG Shared Intel”; five satellites — Infrastructure Topology, Change Attribution, Drift History, Incident Causality, Observability Correlations; connectors + accent junctions.

- [ ] **Step 2: Create placeholder slide frame**

```js
replica7 = Insert(document,{
  type:"frame",
  name:"Replica — Deck 7 — OCG",
  x:shelfX,
  y:shelfY,
  width:1920,
  height:1080,
  fill:"$bg-base",
  layout:"none",
  placeholder:true
})
```

- [ ] **Step 3: Build header row**

Title: “The Operational Context Graph (OCG)” — Inter 500, ≥40px, `$text-primary`.
Body (right): deck copy restyled, no em dash — `$text-secondary`, 24–28px, fixed-width ~560.

- [ ] **Step 4: Build hub + five satellites + connectors**

Hub frame: stroke `$accent-dim` or `$accent`, label “OCG Shared Intel”, simple node-graph motif (ellipses + paths), no glow.
Five satellite cards: `$surface-card`, `$border-card`, heading + subtext matching deck.
Connectors: paths stroke `$border-card`; junctions ellipses fill `$accent` (not cyan).

Density fail if fewer than 5 satellites or missing hub.

- [ ] **Step 5: Ban scan + screenshot**

```js
hits = Get(replica7, n => {
  const t = (n.content||"") + (n.name||"")
  if (/Aiden for DevOps|Aiden for InfraOps|Olly|—|–|\$4M|\$6M|cyan/i.test(t)) return t
})
Print(hits)
TakeScreenshot([replica7])
Export([replica7],"png",".superpowers/sdd/replica-artifacts/deck-7.png")
Update(replica7,{placeholder:false})
```

Expected: `hits` empty / no banned matches.

- [ ] **Step 6: Report** — frame id, satellite count = 5, path to PNG.

---

### Task 2: Replica — Deck 12 — Factory Process

**Files:**
- Modify: `Stack_Linear.pen`
- Create: `.superpowers/sdd/replica-artifacts/deck-12.png`
- Create: `.superpowers/sdd/replica-task-2-report.md`
- Read: `12.pdf`, `hi-12-1.png`, slide 12 text

**Interfaces:**
- Consumes: `shelfX`; place at `y: shelfY + 1080 + 120`
- Produces: `replica12`

- [ ] **Step 1: Inventory** — four equal step cards: Intent, Factory Spec, Factory Runtime, Factory Learning; STEP 01–04 labels; connectors between cards; title + subtitle.

- [ ] **Step 2: Insert frame**

```js
replica12 = Insert(document,{
  type:"frame",
  name:"Replica — Deck 12 — Factory Process",
  x:shelfX,
  y:shelfY + 1200,
  width:1920,
  height:1080,
  fill:"$bg-base",
  layout:"none",
  placeholder:true
})
```

- [ ] **Step 3: Build four-step row**

Equal-width cards (`$surface-card`), step chip + title + body from deck (highlight phrases with `$accent-text` if needed — not cyan). Hairline dash connectors between cards. Optional footer motifs as thin `$border-hairline` rectangles only (no glow blobs).

Density fail if ≠ 4 steps or merged with product loop (Build/Govern/Observe/Remediate).

- [ ] **Step 4: Ban scan + Export + `placeholder:false`**

- [ ] **Step 5: Report** with frame id.

---

### Task 3: Replica — Deck 8 — Aiden for SRE

**Files:**
- Modify: `Stack_Linear.pen`
- Create: `.superpowers/sdd/replica-artifacts/deck-8.png`
- Create: `.superpowers/sdd/replica-task-3-report.md`
- Read: `8.pdf`, `hi-8-1.png`, slide 8 text

**Interfaces:**
- Consumes: `shelfX`; `y: shelfY + 2400`
- Produces: `replica8`

- [ ] **Step 1: Inventory three columns**

Left: 5 timeline rows (Infra Drift → P1 Alert → Root Cause → Remediation Deployed → Service Restored).
Center: 6 pipeline modules (Detection/Infrawatch … Verification) + OCG bar + Temporal / OPA pair.
Right: body copy + product lockup “Aiden for SRE” (not DevOps).

- [ ] **Step 2: Insert frame at next vertical slot** (`y: shelfY + 2400`)

- [ ] **Step 3: Build three-column layout** with full density (5 + 6 + OCG/Temporal/OPA). Rewrite any em dashes out of body copy. MTTR / prevention stats from deck OK if non-dollar.

- [ ] **Step 4: Ban scan + Export + clear placeholder**

- [ ] **Step 5: Report**

---

### Task 4: Replica — Deck 1 — Creation vs Ops

**Files:**
- Modify: `Stack_Linear.pen`
- Create: `.superpowers/sdd/replica-artifacts/deck-1.png`
- Create: `.superpowers/sdd/replica-task-4-report.md`
- Read: `1.pdf`, `hi-1-1.png`

**Interfaces:**
- Consumes: `shelfX`; `y: shelfY + 3600`
- Produces: `replica1`

- [ ] **Step 1: Inventory** — Creation column (2X / PR Volume) + Ops column (1x / No Boost) + center Gap graphic + four bullet blocks.

- [ ] **Step 2–4: Build, ban scan, export, report** (same craft gate as Task 1). Fix deck typo “ops later” → “ops layer” only if rewriting body; prefer deck-faithful wording unless unreadable.

---

### Task 5: Replica — Deck 5 — Factory Intent

**Files:**
- Modify: `Stack_Linear.pen`
- Create: `.superpowers/sdd/replica-artifacts/deck-5.png`
- Create: `.superpowers/sdd/replica-task-5-report.md`
- Read: `5.pdf`, `hi-5-1.png`

**Interfaces:**
- Consumes: `shelfX`; `y: shelfY + 4800`
- Produces: `replica5`

- [ ] **Step 1: Inventory** — left intent quote panel; right Plain-Language Intent + Version-Controlled Spec.

- [ ] **Step 2: Rebuild left panel as Linear dark** (`$bg-raised` / `$surface-card`, `$accent` stroke) — preserve quote structure; **no** beige ground, **no** glow wash.

- [ ] **Step 3–4: Ban scan, export, report**

---

### Task 6: Replica — Deck 9 — Aiden for Automation

**Files:**
- Modify: `Stack_Linear.pen`
- Create: `.superpowers/sdd/replica-artifacts/deck-9.png`
- Create: `.superpowers/sdd/replica-task-6-report.md`
- Read: `9.pdf`, `hi-9-1.png`

**Interfaces:**
- Consumes: `shelfX`; `y: shelfY + 6000`
- Produces: `replica9`

- [ ] **Step 1: Inventory stage count** from deck (Source → Build → Test → Artifact → Staging → UAT/PERF → Production, plus inputs/outputs, OCG base, Active Gating + Self-Verification). Count labeled stages from preview; replica must match that count.

- [ ] **Step 2: Flatten isometric to Linear 2D** stage blocks on a shared platform row; keep check labels under stages; OCG band below; callouts on right.

- [ ] **Step 3: Rename all “Aiden for DevOps” → “Aiden for Automation”**

- [ ] **Step 4: Ban scan** must catch any remaining DevOps product name; Export; report.

---

### Task 7: Wave R3 supporting slides (optional — schedule after R1+R2 pass)

**Files:**
- Modify: `Stack_Linear.pen` (new frames only)
- Create: `.superpowers/sdd/replica-artifacts/deck-{0,2,3,4,6,10,11,13}.png` as built
- Create: `.superpowers/sdd/replica-task-7-report.md`

**Interfaces:**
- Consumes: next free `y` under Task 6
- Produces: optional frame ids listed in report

- [ ] **Step 1: Confirm with user** whether to run R3 now or stop after R2. If stop, mark Task 7 cancelled in report and skip Steps 2–4.

- [ ] **Step 2: Build decks 0,2,3,4,6,10,11,13** one frame each using the same craft gate. Skip 14.

- [ ] **Step 3: Deck 10 special** — title “Infrastructure & Migration” (not InfraOps product); omit “6→9 Months” claim.

- [ ] **Step 4: Ban scan each + Export + report listing all new ids**

---

### Task 8: Verification + openmemory + guide

**Files:**
- Create: `.superpowers/sdd/replica-task-8-report.md`
- Modify: `openmemory.md` (Components + Patterns + Recent edits)
- OpenMemory: add_memories project facts

**Interfaces:**
- Consumes: all replica frame ids from Tasks 1–6 (and 7 if run)
- Produces: verification report; memory entries

- [ ] **Step 1: Read-only integrity check**

```js
// For each protected id, Get depth 0 and confirm still present; do not Update.
["JLg8h","A38GWG","T4FJtW","zTOam","OAfMk","bEaQH","HL34b"].forEach(id => Print(Get(id,{depth:0}).name))
```

Expected: all names still resolve.

- [ ] **Step 2: Ban scan all replica frames**

Patterns: `Aiden for DevOps`, `Aiden for InfraOps`, `Olly`, `—`, `–`, `$4M`, `$6M`, `$2.9M`.
Expected: zero hits.

- [ ] **Step 3: Density checklist**

| Frame | Required |
|---|---|
| Deck 7 | hub + 5 satellites |
| Deck 12 | 4 process steps (not product loop) |
| Deck 8 | 5 timeline + 6 pipeline + OCG/Temporal/OPA |
| Deck 1 | 2 columns + Gap |
| Deck 5 | quote panel + 2 right blocks |
| Deck 9 | full stage count from preview + Automation naming |

- [ ] **Step 4: Confirm artifacts exist**

```bash
ls .superpowers/sdd/replica-artifacts/deck-{7,12,8,1,5,9}.png
```

- [ ] **Step 5: Update `openmemory.md`** — add Components rows for each replica frame id; Patterns note for replica shelf craft; Recent edits bullet.

- [ ] **Step 6: OpenMemory add** — project_id only — shelf frame ids, wave status, read-only guarantee.

- [ ] **Step 7: Mark design/plan status complete in report.** Commit only if user asks.

---

## Self-Review (plan vs spec)

| Spec section | Task coverage |
|---|---|
| §2 Decisions (shelf only, mode A, no ROI) | Global Constraints + Tasks 0–8 |
| §4 Shelf architecture | Task 0 |
| §5 Wave R1 (7,12,8) | Tasks 1–3 |
| §5 Wave R2 (1,5,9) | Tasks 4–6 |
| §5 Wave R3 | Task 7 (gated) |
| §5 Slide 14 excluded | Global + Task 7 skip |
| §6 Craft / density | Steps inside Tasks 1–6 |
| §7 Acceptance | Task 8 |
| §8 Out of scope | Global Constraints |
| openmemory.md update | Task 8 |

Placeholder scan: none remaining. Naming consistent: `replica7`…`replica9`, `shelfX`/`shelfY`.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-19-postn-diagram-replica-shelf.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute in this session with `executing-plans` checkpoints  

Which approach?
