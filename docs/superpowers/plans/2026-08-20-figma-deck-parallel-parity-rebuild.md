# Figma Deck 100% Parity Rebuild — Implementation Plan (Parallel Subagents)

**Design source of truth:** `docs/superpowers/specs/2026-08-20-figma-deck-parallel-parity-design.md` — read in full before any task, especially §3 (mandatory technical constraints).

**Tech stack:** Figma MCP (`project-0-Stackgen_Website_Redesign-figma-desktop`), Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`, file `Stack_Linear.pen`).

**Architecture:** Task 0 (orchestrator, sequential) → Task 0.5 (orchestrator, sequential, spec extraction) → Wave A (10 parallel subagents) → Wave B (5 parallel subagents) → Task 17 (orchestrator, verification).

---

## Global constraints

1. Pencil MCP only for canvas writes. Never Read/Grep the `.pen` file.
2. **No subagent calls Figma MCP.** All Figma data is pre-extracted by the orchestrator into spec files before any subagent is dispatched.
3. Never touch any existing frame outside the new grid (x=0,y=10400 origin, 4×4, 2120×1280 pitch).
4. Never call `SetVariables`.
5. Each subagent only touches its own pre-allocated frame's subtree.
6. Deck 14 excluded.
7. No commits unless the user asks.
8. Every subagent must follow all five rules in spec §3 without exception — these are not suggestions, they are fixes for bugs that already broke two prior attempts.

## Frame map (created in Task 0)

| Deck | Grid (col,row) | x,y |
|---|---|---|
| 0 | 0,0 | 0, 10400 |
| 1 | 1,0 | 2120, 10400 |
| 2 | 2,0 | 4240, 10400 |
| 3 | 3,0 | 6360, 10400 |
| 4 | 0,1 | 0, 11680 |
| 5 | 1,1 | 2120, 11680 |
| 6 | 2,1 | 4240, 11680 |
| 7 | 3,1 | 6360, 11680 |
| 8 | 0,2 | 0, 12960 |
| 9 | 1,2 | 2120, 12960 |
| 10 | 2,2 | 4240, 12960 |
| 11 | 3,2 | 6360, 12960 |
| 12 | 0,3 | 0, 14240 |
| 13 | 1,3 | 2120, 14240 |
| 15 | 3,3 | 6360, 14240 |

---

## Task 0: Grid setup (orchestrator, sequential)

- [ ] Confirm canvas has no leftover deck frames (clean slate).
- [ ] Create 15 placeholder frames per the frame map above: `layout:"none"`, `fill:"#1B1811"`, `clip:true`, `placeholder:true`, name `"Figma Deck {N} - {Title}"`.
- [ ] Record the 15 frame ids.
- [ ] Report: frame id table.

## Task 0.5: Spec extraction (orchestrator, sequential — the critical de-risking step)

For each of the 15 decks:
- [ ] Call Figma `get_metadata(nodeId)` — full literal layer tree.
- [ ] Call Figma `get_design_context(nodeId, forceCode:true)` — text content, hex colors, font sizes, and every image/icon asset URL.
- [ ] For every icon/vector/gradient asset URL found: fetch the raw SVG (via `curl` to a temp path or by requesting it directly), extract its `d` path(s), `viewBox`, `stroke`/`fill` colors, and — for gradients — the `x1,y1,x2,y2` and color stops.
- [ ] Apply the §3.1 gradient-rotation formula to precompute each gradient's Pencil `rotation` value.
- [ ] Write a self-contained build spec to `.superpowers/sdd/parity-specs/deck-{N}.md` containing: exact text strings, positions, font sizes/colors, and a ready-to-use table of every icon/graphic already expressed as Pencil-native node parameters (geometry, viewBox, stroke or gradient fill) — so the subagent performs zero Figma-side interpretation, only Pencil `execute` calls.
- [ ] Report: 15 spec files written, path list, any Figma MCP errors/rate-limit encounters and how they were resolved (e.g. cached data reuse).

**Gate:** do not dispatch Wave A until all 15 spec files exist and have been spot-read by the orchestrator for obvious extraction errors (missing text, malformed paths).

## Wave A: Decks 0-9 (up to 10 parallel subagents)

Each subagent receives this prompt template:

```text
Build Figma deck {N} into Pencil frame {frameId} in Stack_Linear.pen.
Read your build spec FIRST: .superpowers/sdd/parity-specs/deck-{N}.md — it has everything you need. Do not call Figma MCP.
Read spec doc §3 (mandatory constraints) in docs/superpowers/specs/2026-08-20-figma-deck-parallel-parity-design.md before writing any Pencil code:
  - Never use SVG image fills for icons/gradients/graphics. Rebuild as native path/ellipse/rectangle nodes exactly as given in your spec file.
  - Never use textGrowth:"fixed-width" with a guessed width for large-font short labels (numbers, single words at fontSize>=40). Use textGrowth:"auto".
  - Every frame needs layout:"none" explicitly set.
  - Every node needs a name matching its Figma layer name.
  - After building: Update(frame,{placeholder:false}) -> Copy to a fresh id at the frame's grid position -> Delete the original -> TakeScreenshot -> in a SEPARATE follow-up execute call, TakeScreenshot again before judging pass/fail (rasterization lag is expected and not a bug).
Only touch your frame {frameId}'s subtree. Never call SetVariables. Never touch any other frame on the canvas.
Report: final frame id, node count, screenshot result, self-certification against the 5 constraints, any deviations with justification.
```

- [ ] Task 1: Deck 0 → frame at (0, 10400)
- [ ] Task 2: Deck 1 → frame at (2120, 10400)
- [ ] Task 3: Deck 2 → frame at (4240, 10400)
- [ ] Task 4: Deck 3 → frame at (6360, 10400)
- [ ] Task 5: Deck 4 → frame at (0, 11680)
- [ ] Task 6: Deck 5 → frame at (2120, 11680)
- [ ] Task 7: Deck 6 → frame at (4240, 11680)
- [ ] Task 8: Deck 7 → frame at (6360, 11680)
- [ ] Task 9: Deck 8 → frame at (0, 12960)
- [ ] Task 10: Deck 9 → frame at (2120, 12960)

**Gate:** orchestrator reviews all 10 screenshots before dispatching Wave B. Any slide failing the §6 acceptance criteria gets a targeted fix task (not a full rebuild) before Wave B starts.

## Wave B: Decks 10, 11, 12, 13, 15 (5 parallel subagents)

Same prompt template as Wave A, decks/frames per the frame map.

- [ ] Task 11: Deck 10 → frame at (4240, 12960)
- [ ] Task 12: Deck 11 → frame at (6360, 12960)
- [ ] Task 13: Deck 12 → frame at (0, 14240)
- [ ] Task 14: Deck 13 → frame at (2120, 14240)
- [ ] Task 15: Deck 15 → frame at (6360, 14240)

## Task 17: Final verification (orchestrator, sequential)

- [ ] Screenshot all 15 final frames.
- [ ] Spot-check at least 3 against their Figma source screenshots side by side.
- [ ] Confirm zero SVG-image-fill nodes remain anywhere in the 15 subtrees (`Get(deckId, n => n.fill?.type==="image" && Print(...))`).
- [ ] Confirm no protected/existing frame was touched.
- [ ] Update `openmemory.md` with the 15 final frame ids, superseding prior shelf entries.
- [ ] Write final report: per-slide node counts, any documented font-substitution or gradient-approximation notes, screenshot paths.

---

## Skills

- `using-superpowers` — session routing (this plan's own trigger).
- `dispatching-parallel-agents` — governs Wave A/B dispatch (independent-frame-subtree requirement satisfied by Task 0/0.5 pre-allocation).
- `subagent-driven-development` — with the explicit parallel-execution deviation justified in spec §5 (zero shared mutable state once specs + frames are pre-allocated).
- `verification-before-completion` — Task 17 gate.
- `ponytail` — efficient JS in `execute` calls (loops for repeated icon/segment insertion).
