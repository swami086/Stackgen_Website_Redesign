# Puck ← Pencil layer tree — design spec

**Status:** Abandoned for public site (2026-09-02) — replaced by [StackGen\* editability + PenPage removal](./2026-09-02-puck-stackgen-editability-pen-removal-design.md). Do not re-enable PenPage cutover.  
**Date:** 2026-09-02  
**Builds on:** [Puck site-wide](./2026-09-02-puck-site-wide-design.md), [Puck full editability](./2026-09-02-puck-full-editability-design.md) (structure superseded by this layer-tree approach)  
**Pencil source:** `/Users/swami/Documents/Stackgen_Website_Redesign/NextJS.pen`  
**Torbit:** index before code navigation (`Stackgen_Website_Redesign`)

## Decision (confirmed)

| Question | Choice |
|----------|--------|
| Overall goal | Pencil non-image layers editable in Puck (content + layout numbers) |
| Approach | **2 — Full Pencil layer tree** in `pages.puckData` + generic `Pen*` renderer |
| Image layers | Out of content editing — **URL / media id only** (`PenImage`) |
| Docs | `/docs/*` stays markdown — excluded from layer tree |
| Themes | **Single structural tree** (dark route frames); light via theme tokens — do not duplicate Light Pencil frames as separate editable docs |
| Diagrams | **`PenDiagramSlot`** — React owns motion; slot exposes plate layout + copy overlays |
| Storage | Existing Payload `pages` collection + `puckData` JSON |
| Prior path | Supersedes graph-CRUD / drag-graph-editor brainstorm (D+B+3) for this initiative |

### Brainstorm trail (compressed)

User intent clarified from “every visual layer / graph CRUD” → “buttons and layers editable in Pencil, exclude image layers.” Scope C (content + layout numbers) + Approach 2 approved.

---

## Problem

1. **Field coverage gap** — Current `StackGen*` section blocks expose section copy and some arrays, but many Pencil text/button layers and nested frame layout numbers are not 1:1 editable in Puck.
2. **Two sources of truth** — `NextJS.pen` defines the marketing IA and layout; React + Puck section blocks drift from that tree.
3. **Editor mental model** — Editors think in Pencil layers (frames, text, button refs). Puck today thinks in marketing sections, not the layer tree.

## Goal

For every **non-docs** route frame in `NextJS.pen`, every **non-image** layer is editable in the Puck admin canvas:

- Text `content` + typography-related fields  
- Button / Logo `ref` overrides (label, href, variant)  
- Frame layout numbers: `x`, `y`, `width`, `height`, `gap`, `padding`, `layout`, alignment  
- Image fills: swap **asset URL / media** only  

Public site renders from that tree (after cutover), not from hardcoded section stacks.

## Non-goals

- Pixel editing or AI regeneration of image plates inside Puck  
- Full SVG/graph node CRUD for OCG / InnerOuterLoop / etc. (motion stays in React diagram components)  
- `/docs/*` and Docs Pencil frames (`Lv94H`, `OvF1v`, light docs frames)  
- Product mega-menu IA from Pencil as a free-form tree (keep `product-mega-menu.ts` unless a later phase adds a dedicated slot)  
- Dual editable trees for Light Pencil frames (`o68kM4`, product Light frames, …)  
- Replacing Payload auth, versions, or `@delmaredigital/payload-puck` hosting  

---

## Current state (Pencil + code)

### Pencil route frames (`NextJS.pen`)

| Frame id | Name | In scope |
|----------|------|----------|
| `zXASg` | Home / | Yes (primary Home tree) |
| `OMSRP` … `Sq7BQ` | Product dark ×4 | Yes |
| `pkPOQ` | Blog /blog | Yes |
| `NJGqF` | Blog /blog/[slug] | Yes |
| `o68kM4` + product/blog Light frames | Light variants | Reference only (tokens) |
| `Lv94H`, `OvF1v` + Light docs | Docs | No |
| `bi8Au`, `M9R9e` | Sitemap / Components | Import helpers only |

### Home sample (depth ≤2)

Nav → Hero → Logos → Problem (OpsLag plate) → Solution (Video) → Assemblies (InnerOuterLoop, Offerings, Integrations) → Shell OCG → Who it's for → Footer.

Home counts (approx): **66 frames**, **74 texts**, **6 refs**, **18 rectangles** (many image fills: logos, OpsLag plate, video plate).

### Code today

| Area | Location |
|------|----------|
| Puck config | `web/puck/stackgen-config.tsx`, `web/puck/config.ts` |
| Section blocks | `web/puck/blocks/{chrome,home,product,blog}/` |
| Page load | `web/lib/puck-pages.ts`, `web/components/puck/PuckSitePage.tsx` |
| Seeds | `web/puck/lib/build-page-data.ts`, `web/scripts/seed-puck-*.ts` |
| Live diagrams | `web/components/replica/diagrams/*` |

---

## Architecture

```
NextJS.pen
  → importer (script; Pencil MCP / structured walk)
  → LayerDocument JSON (pencilId, name, type, layout, children)
  → seed/sync → Payload pages.puckData
  → Puck editor (Pen* components)
  → <Render> → PenLayerRenderer → site routes
```

### Puck components

| Block | Pencil type | Editable props |
|-------|-------------|----------------|
| `PenFrame` | `frame` | layout, gap, padding, justify/align, width/height/sizing enums, fill (color/token), opacity, enabled, children **slot** |
| `PenText` | `text` | content, font*, fill, textGrowth, width/height, href |
| `PenRef` | `ref` | `componentKey` (Button Primary / Ghost / Logo), label, href, size overrides |
| `PenImage` | image fill on rect/frame | `media` / `url`, mode (`fill`/`fit`/`stretch`), width/height — **no pixel edit** |
| `PenDiagramSlot` | named diagram frames | `diagramKey`, plate layout, nested copy fields; render → existing React diagram |

**Diagram slot keys (Home):**

| Pencil name (approx) | `diagramKey` | React |
|----------------------|--------------|--------|
| OpsLag film plate | `ops-lag` | `OpsLag` |
| Inner→Outer Loop… | `inner-outer-loop` | `InnerOuterLoop` |
| Offerings Diagram | `offerings` | `Offerings` |
| Integrations Section | `integrations` | `Integrations` |
| Operational Context Graph | `ocg` | `OperationalContextGraph` |
| (+ product-page diagrams as inventoried) | … | … |

Unknown Pencil types → skip with seed warning.

### Theme policy

- Import **dark** route frames as the editable document.  
- Light mode: existing `ThemeProvider` / `ds-*` tokens; do not maintain a second Puck tree per Light Pencil frame.  
- If a Light-only copy delta appears later, handle as theme-scoped field overrides — out of v1.

### Data flow (target)

1. Editor opens Payload page → Puck loads `puckData` tree of `Pen*`.  
2. Publish → versions on `pages` unchanged.  
3. Site `getPublishedHomepage` / `getPublishedPageBySlug` → `PuckSitePage` / `Render` with `stackgenConfig` that includes `Pen*` (+ temporary legacy blocks during migration).  
4. Runtime does **not** re-read `.pen` files.

### Re-sync policy (v1)

Importer **defaults** overwrite layout + structure from Pencil by `pencilId`.  
**Preserve** editor overrides for `PenText.content` and `PenRef` label/href when `pencilId` still exists.  
Deleted Pencil nodes drop from tree on re-sync; orphan overrides discarded.  
Document `--preserve-all` / `--layout-only` flags if needed in plan.

---

## Mapping: Pencil layout → React

| Pencil | Renderer |
|--------|----------|
| `layout: vertical \| horizontal \| none` | flex column / row / absolute children |
| `fill_container` / `fit_content` | Tailwind/flex equivalents; clamp invalid combos |
| `padding` / `gap` / `justifyContent` / `alignItems` | style or tokenized classes |
| `$variable` fills | resolve via existing CSS variables / theme |
| `layoutPosition: absolute` + x/y | absolute positioning in parent `layout: none` |
| Motion notes in layer **names** | ignored for layout; diagram slots keep React motion |

Fidelity risk: pure generic layout will not match every Tailwind nuance on day one. Phase 1 accepts visual delta; Phase 2 tightens token mapping against screenshots.

---

## Migration / cutover

### Phases

1. **Schema + renderer + Home import** — no public cutover; feature flag or `/puck-demo`-style preview route optional.  
2. **Cut over `/`** when Home parity is acceptable.  
3. **Products + `/blog` + `/blog/[slug]`** import + cutover (`/blog` index becomes a real `pages` row — closes prior gap).  
4. Wire all `PenDiagramSlot` keys to React diagrams.  
5. Deprecate `StackGen*` section blocks from default config (keep importable for rollback one release).

### Seeds

- New script e.g. `web/scripts/import-pencil-layers.ts` (+ optional JSON fixture under `web/puck/fixtures/`).  
- `--force` updates existing `pages` rows.  
- Idempotent skip remains for unrelated seeds.

### Rollback

- Keep prior `puckData` export / DB snapshot before cutover.  
- Feature flag `PUCK_LAYER_TREE=1` (or page-level template field) to switch renderer.

---

## Error handling

| Case | Behavior |
|------|----------|
| Missing media URL | Placeholder plate (reuse `DiagramPlaceholder` pattern) |
| Unknown Pencil type | Skip + seed warning |
| Invalid `fill_container` without parent layout | Safe fallback width (e.g. `100%` of parent) |
| Missing diagramKey component | Placeholder + console error |
| Build without DB | Existing force-dynamic / soft fallback |

---

## Testing

- **Importer unit:** Home subtree fixture → JSON snapshot (stable `pencilId`s).  
- **Renderer unit:** `PenText` + `PenFrame` layout props round-trip.  
- **Smoke:** `/`, one product slug, `/blog`, one post — 200 + key strings from tree.  
- **Visual:** Home sections vs Pencil export / existing replica shots (manual or Playwright later).  
- **Regression:** docs routes unchanged.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Home tree size (~140+ nodes) | Slots for diagrams; pagination not needed — use nested slots carefully |
| Visual fidelity regression | Phased cutover + screenshot compare; token map pass |
| Editor UX dense | Collapse section frames; default select section roots |
| Dual Light trees unused | Explicit non-goal; document in admin help |
| Approach 2 scope creep back to graph editor | Spec non-goals; diagram slots only |

---

## Open questions (resolved for v1)

| Topic | Resolution |
|-------|------------|
| Light Pencil frames | Not separate docs |
| Diagram motion | React via `PenDiagramSlot` |
| Mega menu | Stay code-driven |
| Graph drag CRUD | Out of scope |

---

## Success criteria

1. Home (and then product/blog) Pencil **text + button + non-image frame layout** fields editable in Puck without editing React source.  
2. Image layers only change via media URL.  
3. Docs unchanged.  
4. Live diagrams retain motion after cutover.  
5. Design doc + implementation plan exist before code; Torbit indexed for navigation during implementation.

---

## Next

Write implementation plan (`docs/superpowers/plans/…`) with bite-sized tasks, then implement Phase 1.
