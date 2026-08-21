# Figma Deck Literal Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` with the parallel-execution deviation documented in §5.3 of the design doc. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete the 12 existing PNG-derived "Diagram Replica Shelf" frames and rebuild all 16 `sg-new-postn-deck` slides on `Stack_Linear.pen` as literal, node-for-node Pencil replicas of the live Figma source, restyled to StackGen Linear tokens.

**Architecture:** One sequential setup task (delete old frames, allocate a 4×4 grid of 16 empty placeholder frames) → two parallel build waves (Wave A: decks 0–9, up to 10 parallel subagents; Wave B: decks 10–15, up to 6 parallel subagents) → one sequential verification task. Every subagent reads its slide directly from Figma MCP (`get_metadata` + `get_design_context` + `get_screenshot`) as ground truth — never from the old PNG previews.

**Tech Stack:** Figma MCP (`project-0-Stackgen_Website_Redesign-figma`, fileKey `o3DPbzkDs4p2C7ct3d1bbK`), Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`, file `Stack_Linear.pen`), OpenMemory `Stackgen_Website_Redesign`

## Global Constraints

1. **Canvas:** `Stack_Linear.pen` only. Pencil MCP only — never Read/Grep the `.pen` file.
2. **Read-only IDs — never Update/Delete/Insert into these trees:** `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`, Wave B stubs (`uPzvZ`,`socHN`,`wTrxq`,`Bp1dp`,`ARO2U`), component shelf (`JJx7F`,`xcXXD`,`NCL0m`,`e9nTl`,`m2UJ8`,`GZSQR`,`igbym`,`N6udS`,`Vrb0t`).
3. **Delete these 12 old replica frames in Task 0 (superseded):** `fF5sz`,`UdNdR`,`yZJZb`,`K887J`,`ekA26`,`YMipV`,`Hp0Tk`,`xdCwb`,`Y5oI04`,`aPptF`,`k9h3r5`,`PBBa1`. Keep `u6p5hC` (logo shelf — reusable, optional).
4. **Fidelity:** Literal node-for-node per design §4 — every Figma layer with visible content gets a named Pencil counterpart; mechanical zero-property wrappers may collapse one level (documented in the task report); repeated decorative micro-elements (deck 10 binary rain) generated via JS loop, not hand-authored per-node.
5. **Visual world:** StackGen Linear tokens only — `$bg-base` `#08090A`, `$bg-raised`, `$surface-card`, `$border-hairline`/`$border-card`, `$text-primary`/`$text-secondary`/`$text-tertiary`, `$accent` `#9437FF` (only accent), `$accent-dim`, `$accent-text`. No cyan, no glow, no gradient text.
6. **Type:** Inter for display; JetBrains Mono for code/measurement/policy labels only.
7. **Naming map:** `Aiden for DevOps`→`Aiden for Automation`; `Aiden for InfraOps`→`Aiden for Infrastructure`; never `Olly`.
8. **Voice:** No em dashes (`—`/`–`) in any text content.
9. **Deck 14:** EXCLUDED (decided). Do not build. Leave its grid slot empty. Scope is 15 slides: decks `0`–`13` and `15`.
10. **Parallelism:** Only Tasks 1–16 (per-slide builds) may run in parallel, and only after Task 0 completes and is confirmed. Each task touches only its own pre-allocated frame ID — never another task's frame, never `SetVariables`. Max 10 concurrent.
11. **No commits** unless the user asks.
12. **Design source of truth:** `docs/superpowers/specs/2026-08-20-figma-deck-literal-rebuild-design.md`
13. **Figma source priority (2026-08-20, user override):** Prefer live Figma MCP when available. When rate-limited, **PNG fallback is allowed**: `.firecrawl/postn-deck/hires/deck-{N}-1.png`, `.firecrawl/postn-deck/all-slides-text.txt`, cached Figma metadata if available. Try Figma first; on 429/rate-limit, fall back without blocking the wave.
14. **Figma MCP rate limits (account: Starter + View seat):** **20 read calls/month**. Parallel builds OK for Pencil work; batch Figma reads only when quota allows. Log in `.superpowers/sdd/figma-mcp-call-log.md`.

## Specs (read before each task)

| Doc | Role |
|---|---|
| `docs/superpowers/specs/2026-08-20-figma-deck-literal-rebuild-design.md` | This rebuild's design (locked) |
| `docs/superpowers/specs/2026-08-19-postn-diagram-replica-shelf-design.md` | Prior shelf design — superseded for fidelity mode, still useful for per-deck composition notes |
| `.agents/product-marketing.md` | Naming map source |
| Figma file `o3DPbzkDs4p2C7ct3d1bbK`, page `0:1` | Live visual + structural source of truth (use MCP tools, not the old PNGs) |

## File / Artifact Map

| Path | Responsibility |
|---|---|
| `Stack_Linear.pen` | New grid of 16 slide frames (old 12 replica frames deleted) |
| `.superpowers/sdd/figma-rebuild-artifacts/deck-{N}.png` | Per-slide screenshot export |
| `.superpowers/sdd/figma-rebuild-task-{T}-report.md` | Per-task report: frame ID, Figma node ID, node-count comparison, collapses, screenshot path |
| `openmemory.md` | Updated after Task 17 with new frame IDs, old shelf entry marked superseded |

## Skills Matrix

Full Cursor global catalog swept (`~/.cursor/skills`, `~/.agents/skills`, `~/.claude/skills`, Superpowers plugin) on 2026-08-20, beyond the prior shelf plan's list. See design doc §8 for the base list; additions and corrections from this sweep are called out below with reasons, so the evaluation is auditable rather than assumed.

**Every task (0–17), read first:** `using-superpowers`

**Task 0 only:** `ponytail` (efficient setup JS), Pencil MCP — no visual/craft skills needed (mechanical setup)

**Every per-slide task (1–16), required, read in this order before building:**
1. Figma MCP `/figma-design-to-code` skill (`skill://figma/figma-design-to-code/SKILL.md`) — adapted for literal-fidelity, Pencil-target output instead of code output
2. Pencil Slides guide (`get_guidelines({category:"guide", name:"Slides"})`)
3. `pencil-web-design-expert`
4. `impeccable`
5. `design-taste-frontend`
6. `product-marketing` + `copywriting` (naming map, no em dash)
7. `ponytail` (loop-based generation for repeated elements, not fewer layers)

**Every per-slide task, optional (load if the required stack leaves a gap):**
- `copy-editing` — multi-pass proofreading if a task's naming-map/em-dash text edits get complex (e.g. deck 8's long body paragraph, deck 2/3/4's multi-card copy)
- `ui-ux-pro-max` — reference only for its chart/diagram-type catalog (25 chart types) when a slide's visual encoding is ambiguous; ignore its React/Tailwind/shadcn code-generation parts entirely, they don't apply to Pencil
- `design-taste-frontend-v1`, `devil-advocate` — as in the prior shelf plan

**Task-specific additions found in this sweep:**
- **Task 14 (deck 13, Roadmap):** + `roadmap-communicator` (required) — directly on-topic for structuring Available/Early Access/H1 2027 roadmap communication; missed in the prior plan's matrix
- Task 9 (deck 8, SRE): + `copywriting` for body rewrite
- Task 10 (deck 9, Automation): + `product-marketing` (DevOps→Automation rename is dense here)
- Task 11 (deck 10, Migration EA): + `devil-advocate` (timeline claims)
- Task 14 (deck 13, Roadmap): + `devil-advocate` (date claims), `roadmap-communicator` (see above)

**Task 17 (verification):** `verification-before-completion`, OpenMemory MCP

### Corrected from the prior shelf plan's matrix

- **`minimalist-ui` — moved from "optional" to excluded.** Re-reading its actual spec: it enforces a *warm monochrome / muted pastel* palette with flat bento grids. That directly conflicts with the Direction Contract's near-black `$bg-base` + purple-only `$accent` world. It was miscategorized as optional in the prior plan; carrying it forward here would risk a light-palette regression. Use `design-taste-frontend` + `impeccable` for restraint instead.

### Full negative-evaluation list (considered, excluded, with reason)

| Skill | Why excluded |
|---|---|
| `image-to-code` as primary source | Figma MCP is now ground truth; this is fallback-only if a Figma call fails |
| `high-end-visual-design` | Bans Inter; conflicts with Direction Contract |
| `brandkit` / `imagegen-frontend-*` / `visual-asset-generator` | Generate flattened raster images via external AI models; violates "editable native layers only" |
| `slideshow` / `hyperframes*` / `md-slides` | Wrong medium (video/markdown, not Pencil canvas) |
| `epic-design` | Scroll-driven WebGL/GSAP cinematic *websites* — wrong medium entirely (static Pencil slides, no code, no scroll) |
| `gpt-taste` | GSAP motion + Python-randomization for *coded* web pages — wrong medium |
| `stitch-design-taste` | Targets Google Stitch tool specifically, not Pencil |
| `a11y-audit` | Scans React/Next/Vue/HTML *codebases* via CI — wrong medium; the underlying contrast requirement is already enforced by the Pencil Slides guide directly |
| `ui-ux-tester` | Browser/desktop *interactive flow* testing via Chrome MCP/Computer Use — these are static compositions, not interactive flows; screenshot + ban-scan + node-count comparison (already in every task's Step 4-6) is the correct verification method here |
| `qa-expert` | Generic SDLC QA strategy agent requiring a context-manager dependency not present in this workflow; redundant with the project's own concrete verification checklist |
| `ui-designer` | Generic web/app UI agent requiring a context-manager dependency; redundant with `pencil-web-design-expert` + `impeccable`, which are tailored to this exact schema |
| `process-mapper` | BPMN business-process documentation (procurement, onboarding) — wrong domain, not visual slide diagramming |
| `data-analyst` / `database-schema-designer` | Business intelligence dashboards / ERD schema design — unrelated domain |
| `design-system` (cursor) | Markdown-html plugin's brand-token onboarding wizard — different tool, different output format |
| `design-bridge` | Translates DESIGN.md docs from an external repo — no such external doc exists here; Direction Contract already serves this role |

### Agent prompt block (copy into every per-slide subagent dispatch)

```text
Skills Assigned (REQUIRED, read before Pencil work): <craft stack list above>
Do not use: image-to-code as primary source, high-end-visual-design, brandkit, flattened PNG import as diagram body, firecrawl/postn-deck PNGs, cached metadata, or any non-Figma fallback (Global Constraint 13)
Figma source: fileKey=o3DPbzkDs4p2C7ct3d1bbK, nodeId=<this task's Figma node ID>
  1. Call get_metadata(fileKey, nodeId) for full layer structure
  2. Call get_design_context(fileKey, nodeId) for text/color/font detail
  3. Call get_screenshot(fileKey, nodeId, maxDimension:1600) for visual reference
Pencil target: Stack_Linear.pen, pre-allocated frame id=<this task's Pencil frame ID> (already exists, placeholder:true, positioned at <x,y>, size 1920x1080)
Design: docs/superpowers/specs/2026-08-20-figma-deck-literal-rebuild-design.md (read §4 for literal-fidelity rules before building)
Global constraints: docs/superpowers/plans/2026-08-20-figma-deck-literal-rebuild.md §Global Constraints
HARD RULE: only touch your assigned frame's subtree. Never call SetVariables. Never touch the read-only IDs list.
Fidelity: every Figma layer with visible content -> named Pencil node. Zero-property wrapper groups may collapse one level (document it). Repeated decorative micro-elements -> JS loop.
Restyle: StackGen Linear tokens only ($bg-base, $surface-card, $border-hairline, $text-primary/secondary/tertiary, $accent #9437FF). Inter display / JetBrains Mono code only. Apply naming map (DevOps->Automation, InfraOps->Infrastructure). No em dashes, no Olly, no cyan, no glow.
Before clearing placeholder: ban-scan (regex: em dash, Olly, Aiden for DevOps, Aiden for InfraOps), TakeScreenshot, Export to .superpowers/sdd/figma-rebuild-artifacts/deck-{N}.png, Update(frameId,{placeholder:false})
Report: write .superpowers/sdd/figma-rebuild-task-{T}-report.md with: Pencil frame id, Figma node id, Figma layer count vs Pencil node count, any collapses (with justification), screenshot path, ban-scan result.
No commits unless user asked.
```

---

### Task 0: Setup — delete old shelf, allocate 16-frame grid

**Files:**
- Modify: `Stack_Linear.pen` (delete 12 old frames, insert 16 new empty placeholder frames)
- Create: `.superpowers/sdd/figma-rebuild-artifacts/` (directory)
- Create: `.superpowers/sdd/figma-rebuild-task-0-report.md`

**Skills:** `using-superpowers`, `ponytail`, Pencil MCP only

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `gridTable` — array of 16 `{deck, figmaNodeId, pencilFrameId, x, y}` entries, consumed by every Task 1–16 dispatch prompt

- [ ] **Step 1: Delete the 12 superseded replica frames**

```js
["fF5sz","UdNdR","yZJZb","K887J","ekA26","YMipV","Hp0Tk","xdCwb","Y5oI04","aPptF","k9h3r5","PBBa1"].forEach(id => {
  try { Delete(id) } catch(e) { Print("already gone:", id, String(e)) }
})
```

Expected: no fatal errors (a "not found" for an already-moved ID is fine — log and continue).

- [ ] **Step 2: Claim the grid region**

```js
pos = FindEmptySpace({width: 8280, height: 4920, direction: "right", padding: 150})
Print("GRID_ORIGIN", JSON.stringify(pos))
```

Record `pos.x`, `pos.y` as `gridX`, `gridY`.

- [ ] **Step 3: Insert 15 empty placeholder frames in the 4x4 grid, row-major by deck index (deck 14's cell stays empty — excluded)**

```js
figmaNodeIds = {0:"1:14938",1:"1:7514",2:"1:14797",3:"1:7661",4:"1:7729",5:"1:14635",6:"1:7854",7:"1:7929",8:"1:8055",9:"1:14411",10:"1:8591",11:"1:8708",12:"1:13727",13:"1:13969",15:"1:14278"}
gridTable = []
for (let deck = 0; deck < 16; deck++) {
  if (deck === 14) continue
  const col = deck % 4
  const row = Math.floor(deck / 4)
  const x = gridX + col * (1920 + 200)
  const y = gridY + row * (1080 + 200)
  const frameId = Insert(document, {
    type: "frame",
    name: "Deck " + deck + " (pending)",
    x, y, width: 1920, height: 1080,
    fill: "$bg-base",
    layout: "none",
    clip: true,
    placeholder: true
  })
  gridTable.push({deck, figmaNodeId: figmaNodeIds[deck], pencilFrameId: frameId, x, y})
}
Print("GRID_TABLE", JSON.stringify(gridTable))
```

Expected: 15 frame IDs printed, deck indices 0–13 and 15 (14 skipped).

- [ ] **Step 4: Write the report**

Write `.superpowers/sdd/figma-rebuild-task-0-report.md` containing the full `gridTable` JSON (this is the single source every Task 1–16 dispatch reads its `figmaNodeId`/`pencilFrameId`/`x`/`y` from — do not let subagents re-derive it).

- [ ] **Step 5:** Deck 14 is excluded (decided) — no confirmation needed, no frame created for it. Proceed straight to Wave A.

---

### Task 1–16: Per-slide literal rebuild

One task per deck (`N` = 0..15). Each is independent and safe to run in parallel within its wave (Global Constraint 10).

**Wave A (parallel, up to 10):** Tasks 1(deck0), 2(deck1), 3(deck2), 4(deck3), 5(deck4), 6(deck5), 7(deck6), 8(deck7), 9(deck8), 10(deck9)
**Wave B (parallel, up to 5, after Wave A screenshots reviewed):** Tasks 11(deck10), 12(deck11), 13(deck12), 14(deck13), 16(deck15)
**Task 15 (deck 14): SKIPPED — excluded per Global Constraint 9.**

**Per-task skill additions beyond the common required stack (from Skills Matrix):**
- Task 9 (deck 8, SRE): + `copywriting` (body rewrite)
- Task 10 (deck 9, Automation): + `product-marketing` (DevOps→Automation rename)
- Task 11 (deck 10, Migration EA): + `devil-advocate` (timeline claims)
- **Task 14 (deck 13, Roadmap): + `roadmap-communicator` (required) + `devil-advocate` (date claims)**

**Files (every task):**
- Modify: `Stack_Linear.pen`, only the subtree under this task's `pencilFrameId` from `gridTable`
- Create: `.superpowers/sdd/figma-rebuild-artifacts/deck-{N}.png`
- Create: `.superpowers/sdd/figma-rebuild-task-{N+1}-report.md`
- Read: Figma MCP for `figmaNodeId`; `docs/superpowers/specs/2026-08-20-figma-deck-literal-rebuild-design.md` §4, §7

**Interfaces:**
- Consumes: this deck's row from Task 0's `gridTable` (figmaNodeId, pencilFrameId, x, y)
- Produces: completed frame at `pencilFrameId`, task report

- [ ] **Step 1: Load craft-stack skills** listed in the Skills Matrix per-slide section; announce them.

- [ ] **Step 2: Read the Figma source**

```
get_metadata(fileKey: "o3DPbzkDs4p2C7ct3d1bbK", nodeId: "<figmaNodeId>")
get_design_context(fileKey: "o3DPbzkDs4p2C7ct3d1bbK", nodeId: "<figmaNodeId>")
get_screenshot(fileKey: "o3DPbzkDs4p2C7ct3d1bbK", nodeId: "<figmaNodeId>", maxDimension: 1600)
```

Build a written inventory: every layer name, type, position/size, text content, and — for the title/heading — confirm the exact wording (used for the frame's final `name`).

- [ ] **Step 3: Rebuild inside the pre-allocated frame**

```js
Update("<pencilFrameId>", {name: "Deck <N> — <exact Figma title>"})
```

Then build every inventoried layer per design §4's node-type mapping and fidelity rules, inside `"<pencilFrameId>"`. Apply StackGen tokens (Global Constraint 5–6) and the naming map (Global Constraint 7) as text is inserted, not as a later find/replace pass.

- [ ] **Step 4: Ban scan**

```js
hits = Get("<pencilFrameId>", n => {
  const t = (n.content||"") + (n.name||"")
  if (/Aiden for DevOps|Aiden for InfraOps|Olly|—|–/i.test(t)) return t
})
Print("BAN_SCAN", JSON.stringify(hits))
```

Expected: `hits` is an empty array.

- [ ] **Step 5: Screenshot, export, clear placeholder**

```js
TakeScreenshot(["<pencilFrameId>"])
Export(["<pencilFrameId>"], "png", ".superpowers/sdd/figma-rebuild-artifacts/deck-<N>.png")
Update("<pencilFrameId>", {placeholder: false})
```

- [ ] **Step 6: Report** — `.superpowers/sdd/figma-rebuild-task-{N+1}-report.md` with: Figma layer count (from Step 2 inventory) vs Pencil node count (from a `Get` visitor counting nodes under `pencilFrameId`), any collapses applied and why, ban-scan result, screenshot path.

---

### Task 17: Verification + OpenMemory update

**Files:**
- Create: `.superpowers/sdd/figma-rebuild-task-17-report.md`
- Modify: `openmemory.md` (Components + Patterns + Recent edits)
- OpenMemory: `add_memories` project facts

**Skills:** `verification-before-completion`, OpenMemory MCP

**Interfaces:**
- Consumes: all 16 task reports + `gridTable`
- Produces: final acceptance verdict

- [ ] **Step 1: Read-only integrity check** — confirm every protected ID from Global Constraint 2 still resolves and was never touched:

```js
["JLg8h","A38GWG","T4FJtW","zTOam","OAfMk","bEaQH","HL34b","Vrb0t"].forEach(id => Print(Get(id, {depth:0}).name))
```

- [ ] **Step 2: Confirm the 12 old frames are gone**

```js
["fF5sz","UdNdR","yZJZb","K887J","ekA26","YMipV","Hp0Tk","xdCwb","Y5oI04","aPptF","k9h3r5","PBBa1"].forEach(id => {
  try { Print(id, "STILL EXISTS:", Get(id,{depth:0}).name) } catch(e) { Print(id, "confirmed deleted") }
})
```

- [ ] **Step 3: Ban-scan all 16 new frames** using each `pencilFrameId` from `gridTable`, same regex as per-task Step 4. Expected: zero hits across all 16.

- [ ] **Step 4: Confirm artifacts** — `ls .superpowers/sdd/figma-rebuild-artifacts/deck-{0..15}.png` all exist.

- [ ] **Step 5: Update `openmemory.md`** — replace the old shelf's Components entries with the 16 new frame IDs; note in Patterns that literal Figma-sourced rebuild superseded the PNG-based shelf.

- [ ] **Step 6: `add_memories`** (project_id only) — new frame IDs, rebuild rationale, deck 14 disposition.

- [ ] **Step 7: Offer optional commit** — do not commit unless the user asks.

---

## Parallel topology

```text
Task 0   — SERIAL: setup, deletion, grid allocation, deck-14 confirmation
Wave A   — PARALLEL (<=10): Tasks 1-10 (decks 0-9)
[Orchestrator reviews Wave A screenshots before starting Wave B]
Wave B   — PARALLEL (<=6): Tasks 11-16 (decks 10-15)
Task 17  — SERIAL: verification + memory
```

## Self-Review (plan vs spec)

| Design section | Task coverage |
|---|---|
| §2 Locked decisions | Global Constraints 3,4,5,10 |
| §4 Literal fidelity rules | Global Constraint 4; per-task Steps 2-3 |
| §5.1-5.2 Grid + disposal | Task 0 |
| §5.3 Parallel safety | Global Constraint 10; Parallel topology |
| §5.4 Per-slide workflow | Task 1-16 Steps 1-6 |
| §6 Deck 14 | Global Constraint 9; Task 0 Step 5; Task 15 |
| §7 Slide inventory | Task 0 Step 3 `figmaNodeIds` array |
| §8 Skills | Skills Matrix |
| §9 Acceptance | Task 17 |

Placeholder scan: none — every task has exact IDs, exact code, or an explicit "extract at build time" step with the exact tool calls to do so.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-20-figma-deck-literal-rebuild.md`.

Per the chosen execution mode: **Subagent-driven, Task 0 first (serial), then Wave A (up to 10 parallel), review, then Wave B (up to 6 parallel), then Task 17.**

Awaiting user review of the design doc and this plan before Task 0 is dispatched.
