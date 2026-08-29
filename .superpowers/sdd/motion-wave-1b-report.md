# Wave 1B Report: 3D Scene, Constellation, Layer Rail

**Date:** 2026-08-29  
**Branch:** `homepage-p0`  
**Gate status:** PASS

---

## Deliverables

| File | Exports |
|------|---------|
| `web/components/replica/motion/IsoScene.tsx` | `ISO_ROTATION`, `IsoScene`, `IsoLayer`, `Billboard` |
| `web/components/replica/motion/Constellation.tsx` | `Constellation`, `ConstellationNode`, `ConstellationEdge` |
| `web/components/replica/motion/LayerRail.tsx` | `LayerRail`, `RailLayer` |
| `web/__tests__/iso-rail.test.tsx` | 5 tests |

---

## Prop signatures

### `ISO_ROTATION`

```ts
{ x: 54, z: -45 } as const
```

Single source of isometric scene angle. `Billboard` inverts both axes: `rotateZ(45deg) rotateX(-54deg)`.

### `IsoScene({ children, className? })`

Applies `perspective: 1600px` and shared rotation via `rotateX` + `rotateZ`.

### `IsoLayer({ children, index, lift, active, className? })`

- `index`: stacking order (0 = base)
- `lift`: vertical separation in px along scene Z axis (animated via motion `z` key = translateZ)
- `active`: drives opacity (1 / 0.42) and scale (1 / 0.97)
- Uses `DUR.shell` + `EASE.emphasize`; duration 0 when reduced-motion

### `Billboard({ children, className? })`

Counter-rotates content so marks render square.

### `Constellation({ nodes, edges, progress, className? })`

- `nodes`: `readonly { id, label, x, y }[]`
- `edges`: `readonly { from, to }[]`
- `progress`: 0..1, drives proportional node/edge reveal (scroll-scrubbable)
- Must render inside `<svg>`

### `LayerRail({ layers, activeId, onSelect, className? })`

- `layers`: `readonly { id, label }[]`
- Vertical tablist with roving tabindex, Arrow/Home/End keyboard nav, `aria-selected`

---

## Test results

```
pnpm vitest run __tests__/iso-rail.test.tsx
Test Files  1 passed (1)
Tests       5 passed (5)
```

---

## Commit

```
feat: add isometric scene, constellation graph, and accessible layer rail
```

Files: `IsoScene.tsx`, `Constellation.tsx`, `LayerRail.tsx`, `iso-rail.test.tsx`

---

## Notes for downstream consumers

1. **IsoLayer `z` key** - motion's translateZ alias; do not use `translateZ` as animate key (silently ignored).
2. **Billboard order** - inverse rotation applied Z-first then X to exactly cancel `IsoScene`.
3. **Constellation progress** - edges begin revealing after 25% progress (`edgeCut = (progress - 0.25) / 0.75`).
4. **LayerRail panels** - `aria-controls="rail-panel-{id}"` expects matching panel ids from parent diagram.
5. **No owned-file violations** - did not touch Reveal/Stagger/DrawPath/Beam/GridSubstrate, ParticleField, logos, globals.css, layout.tsx, tokens.

---

## Concerns

- `Constellation` opacity transition uses hardcoded `240ms` matching `DUR.glassFade` but not imported from tokens (plan verbatim).
- `LayerRail` uses `text-[13px]` / `text-[10px]` arbitrary sizes per plan; no preset token exists yet.
- `IsoLayer` inactive state defaults require parent to pass `active`; no implicit default prop.
