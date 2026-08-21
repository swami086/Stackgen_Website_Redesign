# Figma Deck 100% Parity Rebuild — Design Spec (Parallel Execution)

**Date:** 2026-08-20
**Status:** Draft — pending user confirmation of carried-over decisions (§2)
**Supersedes:** `2026-08-20-figma-deck-literal-parity-rebuild.md` (sequential plan; superseded by this parallel-subagent architecture per user request)
**Source:** Figma file `sg-new-postn-deck (Copy)`, page `new` (node `0:1`), 16 top-level slide frames named `"0"`-`"15"`
**Canvas:** `Stack_Linear.pen`

## 1. Problem statement

Two prior attempts at this rebuild produced visible defects even though the build logic looked correct on paper:

1. **Attempt 1 (parallel subagents, no shared bug log):** subagents independently approximated icons/gradients, producing inconsistent fidelity across slides.
2. **Attempt 2 (sequential, this session):** decks 0 and 1 were built and debugged one at a time, surfacing two previously-unknown Pencil rendering bugs (§3). Slides were manually deleted by the user before decks 2-15 could be built, and the user now wants a properly planned parallel-subagent rebuild that bakes the bug-fixes in from the start instead of letting each of 10 parallel agents rediscover them independently.

This spec exists so **every subagent inherits the same fixes** rather than re-discovering them through trial and error.

## 2. Decisions carried over from prior session (needs re-confirmation)

These were approved earlier in this session before the slides were deleted. Carrying them forward as defaults — flag if any should change:

| Decision | Value |
|---|---|
| Deck 14 (ROI/dollar figures) | **Excluded.** Scope is 15 slides: `0`-`13`, `15`. |
| Grid location | New 4×4 grid at **x=0, y=10400**, 2120px column pitch, 1280px row pitch, 1920×1080 cells. |
| Visual fidelity | **100% Figma-literal.** Exact colors, fonts (substituting Inter for Figma's licensed "Haffer XH"), sizes, positions — no restyling to site tokens. |
| Font substitution | Figma's "Haffer XH" → **Inter** (same sizes/weights/positions). Documented per-slide, not a fidelity shortcut. |

## 3. Critical technical constraints (mandatory for every subagent)

These were discovered the hard way building decks 0 and 1. **Violating any of these will reproduce the exact defects from the last two attempts.**

### 3.1 NEVER use SVG image fills for vector graphics
Pencil's `fill:{type:"image", url:"...svg"}` renderer **silently fails to render gradients and multi-path SVGs** — it displays an opaque placeholder texture instead of the actual graphic, with no error thrown. This was the root cause of "missing SVGs" in every prior attempt.

**Mandatory fix:** every decorative graphic, icon, or gradient shape from Figma must be rebuilt as **native Pencil nodes**:
- Simple icons (stroke-based SVG paths, e.g. Lucide-style glyphs) → Pencil `path` nodes with `geometry` set to the SVG's literal `d` attribute, `viewBox` set to the SVG's viewBox, and `stroke`/`strokeWidth`/`strokeLinecap`/`strokeLinejoin` matching the source (no `fill`).
- Gradient-filled shapes → Pencil `path` nodes with `geometry`/`viewBox` from the `d` attribute, and `fill:{type:"gradient", gradientType:"linear", rotation:<computed>, colors:[{color,position},...]}`.
- Simple dots/circles → native `ellipse` nodes.
- Thin decorative lines (including dashed/segmented connector lines) → native `rectangle` nodes (one per segment) or `path` with stroke.

**Gradient angle conversion** (SVG `userSpaceOnUse` linear gradient `x1,y1 → x2,y2` to Pencil's rotation-based model):
```js
function rot(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  let p = (Math.atan2(-dy, dx) * 180 / Math.PI) - 90;
  return ((p % 360) + 360) % 360;
}
// Pencil fill: { type:"gradient", gradientType:"linear", rotation: rot(x1,y1,x2,y2), colors: stops.map(s => ({color: s.hex, position: s.offset})) }
```
Center/size stay default (0.5,0.5 / 1,1) — gradients are computed relative to each path's own bounding box, not the original absolute Figma coordinate space, so exact stop positions are a faithful approximation, not pixel-identical, for multi-shape gradient meshes. This is acceptable per the source-of-truth rule (§1 of the parent literal-rebuild design): structure and color sequence are literal, exact per-pixel gradient math is not achievable across a differently-scoped bounding box.

### 3.2 NEVER use `textGrowth:"fixed-width"` with a guessed-narrow width for large-font short labels
Large display numbers (e.g. Figma's "2X" at 139px, "1x" at 80px) will **silently word-wrap** if the fixed width is even slightly too narrow for the font size — this doesn't throw an error, it just wraps "2" and "X" onto separate lines, roughly doubling the text's rendered height and visually overlapping whatever sits below it (confirmed: expected ~150px height rendered as 336px).

**Mandatory fix:** any text node under ~4 characters at fontSize ≥ 40 (hero numbers, single-word display type) must use **`textGrowth:"auto"`** (grows to fit, never wraps), never `"fixed-width"`. Only use `"fixed-width"` for real paragraph/sentence text that is meant to wrap at a specific width.

### 3.3 Rasterization lag — always verify with a follow-up screenshot
Pencil does not always rasterize newly-inserted nodes within the same `execute` call that created them. A `TakeScreenshot` called immediately after `Insert` can show blank/placeholder content even though the node data is correct. **Mandatory fix:** after finishing a frame's build:
1. `Update(frame, {placeholder:false})`
2. `Copy` the frame to a fresh id at its final grid position, `Delete` the original (works around a separate known issue where in-place-built frames render permanently blank)
3. `TakeScreenshot` the new frame
4. **In a separate, subsequent `execute` call**, `TakeScreenshot` the frame again before deciding pass/fail — if the first screenshot looks broken but nothing in the node data is wrong, this second call almost always shows the corrected render.

### 3.4 Frame layout must be explicit
Every frame must set `layout:"none"` explicitly. Pencil's default layout (`horizontal`) silently strips all absolute `x`/`y` positioning on children, collapsing the entire composition. This caused the very first deck-0 attempt to render as blank/wrong.

### 3.5 Every node needs a name
Every `Insert`/`Copy`/`Replace` call must set `name` to the literal Figma layer name (or a clear equivalent noted in the task report) so parity is auditable node-by-node against the Figma source.

## 4. Slide inventory

| Deck | Figma node ID | Title |
|---|---|---|
| 0 | `1:14938` | The Autonomous DevOps Factory (cover) |
| 1 | `1:7514` | Software Creation Outpaces Software Operations |
| 2 | `1:14797` | Manual delivery creates a massive human toll and cost bottleneck |
| 3 | `1:7661` | Reactive SRE Fails to Solve the On-Call Crisis |
| 4 | `1:7729` | Stateless Domain Agents Fail to Solve Cross-Domain Problems |
| 5 | `1:14635` | Autonomous DevOps Factory (Factory Intent) |
| 6 | `1:7854` | Stateful Memory and Outcome Accountability Drive the Factory Model |
| 7 | `1:7929` | The Operational Context Graph (OCG) |
| 8 | `1:8055` | Aiden for SRE |
| 9 | `1:14411` | Aiden for DevOps/Automation |
| 10 | `1:8591` | Policy-Bounded Migration Pipeline |
| 11 | `1:8708` | Aiden OS |
| 12 | `1:13727` | Factory Process |
| 13 | `1:13969` | Roadmap |
| 14 | `1:14162` | **EXCLUDED** |
| 15 | `1:14278` | Diagram |

## 5. Parallel-safety architecture

`subagent-driven-development`'s default rule is "never parallelize implementers" because concurrent edits to shared state conflict, and because Figma MCP reads from 10 concurrent agents risk rate-limiting and inconsistent extraction. This design resolves both:

1. **Orchestrator pre-fetch phase (sequential, done once, by the orchestrator, not subagents):** for every slide, the orchestrator calls Figma `get_metadata` + `get_design_context`, extracts exact text/colors/positions/icon-geometry, and writes a **self-contained build spec file** (`.superpowers/sdd/parity-specs/deck-{N}.json` or `.md`) containing everything a subagent needs: literal layer tree, text content, hex colors, font sizes, icon SVG `d`-paths already converted to the native-node recipe from §3.1, gradient stops already converted via the §3.1 formula. **No subagent calls Figma MCP.**
2. **Frame pre-allocation (sequential, orchestrator):** one placeholder frame per slide created up front in the 4×4 grid, `placeholder:true`, so subagents never call `Insert(document, ...)` — they only ever touch their own pre-allocated frame's subtree.
3. **Parallel build phase:** up to 10 subagents run concurrently, each given exactly one deck's spec file path + one pre-allocated frame id. Each subagent's Pencil `execute` calls are independent scopes by construction — nothing to race on.
4. **Two waves** (matches the 10-parallel ceiling): Wave A = decks 0-9 (10 parallel), Wave B = decks 10, 11, 12, 13, 15 (5 parallel).
5. **Per-subagent verification gate (mandatory, non-negotiable):** every subagent must follow §3.3's Copy+Delete+two-screenshot workflow before reporting done, and must self-certify against the §3 checklist in its final report.

## 6. Acceptance criteria

Per slide:
1. Frame lives only in the new grid region (x=0,y=10400 origin); no protected/existing frame touched.
2. Zero SVG image fills for gradients/icons — 100% native path/ellipse/rectangle nodes for all graphics (§3.1).
3. Zero `fixed-width` text wrap defects on large display numbers (§3.2).
4. Screenshot taken in a follow-up call (not the same call that built the content) before marking complete (§3.3).
5. Every node named to match its Figma layer.
6. Colors/fonts/positions match Figma's `get_design_context` output exactly (accounting for the Haffer XH → Inter font substitution).

Whole effort:
7. All 15 decks built (0-13, 15); deck 14 slot left empty.
8. `openmemory.md` updated with final frame ids.
9. Orchestrator spot-checks at least 3 of the 15 slides against their Figma screenshots before declaring the effort complete.
