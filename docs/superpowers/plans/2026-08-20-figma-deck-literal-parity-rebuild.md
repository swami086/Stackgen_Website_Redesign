# Figma Deck Literal Parity Rebuild — Implementation Plan

**Date:** 2026-08-20
**Status:** Approved, in execution
**Source:** Figma file `sg-new-postn-deck (Copy)`, page `new` (node `0:1`), 16 top-level slide frames named `"0"`-`"15"`
**Canvas:** `Stack_Linear.pen`
**Supersedes:** all prior "Linear restyle" deck rebuild attempts. This is a **from-scratch** rebuild with a different fidelity contract (100% Figma-literal, not restyled).

## 1. Decisions locked (user, 2026-08-20)

| Decision | Choice |
|---|---|
| Execution mode | **Sequential, one slide at a time.** Build → screenshot → diff against Figma screenshot → only then move to next slide. No parallel subagents this round (root cause of last round's paraphrased-icon defects). |
| Deck 14 | **Excluded.** Same standing call as every prior design doc (unresolved modeled dollar ROI figures). Scope is 15 slides: `0`-`13`, `15`. |
| Grid location | New 4×4 grid at **x=0, y=10400** (same spot as the prior attempt), 2120px column pitch / 1280px row pitch, 1920×1080 cells. Far below all existing site/marketing frames — nothing existing is touched. |
| Visual fidelity | **100% Figma-literal.** Slide backgrounds, text colors, accent colors (cyan `#9EE6FC`, lavender `#BA99FD`, cream `#F1EAE0` bg on some slides, etc.) are copied exactly as authored in Figma. No StackGen Linear token substitution this round. |

## 2. Root cause of last round's defects (why this plan is different)

1. **Image fills pointed at `http://localhost:3845/assets/<hash>.svg`** — Figma Desktop's local dev-asset server. These links are session-scoped; once Figma's plugin session ends they 404, which is why "missing SVGs" appeared afterward. **Fix:** every asset is downloaded to `.figma-assets/deck{N}/*.svg` via `curl` immediately after `get_design_context` returns the URLs, and Pencil fills reference the **local relative path**, never the localhost URL.
2. **Parallel subagents silently substituted content** (e.g. approximating a literal vector icon as a generic Lucide icon, or collapsing a multi-layer group further than the literal-fidelity rule allows) with no single reviewer catching it across 15 concurrent branches. **Fix:** sequential build, one reviewer (this session), screenshot-diff gate before advancing.
3. **No local asset cache discipline** — stale partial folders from aborted runs. **Fix:** wipe `.figma-assets/` at the start of this rebuild and re-harvest cleanly per slide.

## 3. Tool inventory actually available (not `use_figma`)

The `figma-use` skill assumes a Plugin-API `use_figma` tool. That tool is **not connected** in this workspace. The available Figma server (`project-0-Stackgen_Website_Redesign-figma-desktop`) exposes:

- `get_metadata(nodeId)` — literal layer tree: id, type, name, x/y, width/height, nesting. Ground truth for structure.
- `get_design_context(nodeId, forceCode:true)` — React+Tailwind reference code with exact text content, computed colors, font sizes, and `http://localhost:3845/assets/<hash>.<ext>` URLs for every image/vector/icon layer.
- `get_screenshot(nodeId)` — visual reference for QA diffing.

Per-slide workflow uses these three calls plus `curl` (via the Shell tool) to harvest assets, then Pencil MCP `execute` to build.

## 4. What "100% literal parity" means in practice

1. **Every Figma layer with visible content** (text, vector/icon, shape, image, card, connector) gets a named Pencil node. Zero-property mechanical wrapper groups (single child, no fill/stroke/effect — pure auto-layout artifacts) may collapse one level, documented per-slide.
2. **Colors, fonts, sizes, positions are copied verbatim** from `get_design_context`'s computed Tailwind values (hex colors, px sizes, tracking) — converted to Pencil's absolute `x/y/width/height` schema, never restyled to site tokens.
3. **All vector/icon/decorative-shape layers are rasterized SVG image fills** downloaded from Figma and stored locally — never hand-approximated as different icons, never left pointing at the ephemeral localhost URL.
4. **Font:** Figma's font is "Haffer XH" (a licensed display font not available in Pencil/Google Fonts). Pencil will render **Inter** at the same sizes/weights/positions as the nearest available substitute — this is a font-availability substitution, not a fidelity shortcut, and will be called out per slide.
5. **Repeated micro-elements** (if any slide has them, e.g. deck 10's binary-rain background) are generated via a JS loop matching the same count/density — a generation technique, not a fidelity reduction.

## 5. Per-slide build loop (repeated 15 times, sequentially)

For each deck `N` with Figma node id `figmaId`:

1. `get_metadata(figmaId)` → literal layer tree (structure/position/size ground truth).
2. `get_design_context(figmaId, forceCode:true)` → text content, hex colors, font sizes, asset URLs.
3. Shell: `curl` every `localhost:3845/assets/<hash>.<ext>` URL found in step 2 to `.figma-assets/deck{N}/<descriptive-name>.<ext>`.
4. Pencil `execute`: build the full literal layer tree inside the slide's pre-allocated placeholder frame, `layout:"none"` throughout (absolute Figma coordinates), image fills pointing at the local relative asset paths.
5. Pencil `Copy` the built frame to a fresh id at its grid position (works around a known Pencil rasterization quirk where in-place-built frames render blank), delete the placeholder original.
6. `TakeScreenshot` the new frame.
7. Compare against the Figma `get_screenshot` reference. If any layer is missing, misplaced, or a color/text mismatch, fix immediately before moving to the next slide.
8. Mark `placeholder:false`, record the frame id.

## 6. Slide inventory and grid position

| Deck | Figma node ID | Title | Grid (col,row) | x,y |
|---|---|---|---|---|
| 0 | `1:14938` | The Autonomous DevOps Factory (cover) | 0,0 | 0, 10400 |
| 1 | `1:7514` | Software Creation Outpaces Software Operations | 1,0 | 2120, 10400 |
| 2 | `1:14797` | Manual delivery creates a massive human toll and cost bottleneck | 2,0 | 4240, 10400 |
| 3 | `1:7661` | Reactive SRE Fails to Solve the On-Call Crisis | 3,0 | 6360, 10400 |
| 4 | `1:7729` | Stateless Domain Agents Fail to Solve Cross-Domain Problems | 0,1 | 0, 11680 |
| 5 | `1:14635` | Autonomous DevOps Factory (Factory Intent) | 1,1 | 2120, 11680 |
| 6 | `1:7854` | Stateful Memory and Outcome Accountability Drive the Factory Model | 2,1 | 4240, 11680 |
| 7 | `1:7929` | The Operational Context Graph (OCG) | 3,1 | 6360, 11680 |
| 8 | `1:8055` | Aiden for SRE | 0,2 | 0, 12960 |
| 9 | `1:14411` | Aiden for DevOps/Automation | 1,2 | 2120, 12960 |
| 10 | `1:8591` | Policy-Bounded Migration Pipeline | 2,2 | 4240, 12960 |
| 11 | `1:8708` | Aiden OS | 3,2 | 6360, 12960 |
| 12 | `1:13727` | Factory Process | 0,3 | 0, 14240 |
| 13 | `1:13969` | Roadmap | 1,3 | 2120, 14240 |
| 14 | `1:14162` | **EXCLUDED** | 2,3 | (empty slot) |
| 15 | `1:14278` | Diagram | 3,3 | 6360, 14240 |

## 7. Global constraints

1. Pencil MCP only for canvas writes; never Read/Grep the `.pen` file.
2. Never touch any existing frame (`JLg8h`, `A38GWG`, `HL34b`, component shelf, etc.) — new frames only, at the reserved grid coordinates.
3. Never call `SetVariables`.
4. Each slide's build only touches its own frame subtree.
5. No commits unless explicitly asked.
6. Asset cache lives in `.figma-assets/deck{N}/` (gitignored alongside `.firecrawl/`).

## 8. Verification gate (end of rebuild)

- All 15 frames screenshot-diffed against Figma source, differences documented if any are unavoidable (e.g. font substitution).
- `openmemory.md` updated with the new frame ids and this plan superseding prior attempts.
- Report: node counts, collapses, font-substitution note, asset harvest count per slide.
