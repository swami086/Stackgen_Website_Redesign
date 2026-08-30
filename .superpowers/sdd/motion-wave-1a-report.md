# Wave 1A Motion Primitives Report

**Date:** 2026-08-29  
**Branch:** `homepage-p0`  
**Task:** 1A - Motion primitives  
**Gate status:** PASS

---

## Files created

| File | Export |
|------|--------|
| `web/components/replica/motion/Reveal.tsx` | `Reveal({ children, delay?, y?, blur?, className? })` |
| `web/components/replica/motion/Stagger.tsx` | `Stagger({ children, step?, className? })` |
| `web/components/replica/motion/DrawPath.tsx` | `DrawPath({ d, className?, delay?, duration?, strokeWidth? })` |
| `web/components/replica/motion/Beam.tsx` | `Beam({ d, duration?, delay?, className?, r? })` |
| `web/components/replica/motion/GridSubstrate.tsx` | `GridSubstrate({ className? })` |
| `web/__tests__/motion-primitives.test.tsx` | 4 tests |

---

## Prop signatures (exported)

```ts
Reveal({ children, delay?, y?, blur?, className? }): JSX.Element
Stagger({ children, step?, className? }): JSX.Element
DrawPath({ d, className?, delay?, duration?, strokeWidth? }): JSX.Element  // inside <svg>
Beam({ d, duration?, delay?, className?, r? }): JSX.Element               // inline offsetPath, not pathId
GridSubstrate({ className? }): JSX.Element                                // canvas, aria-hidden
```

---

## Token consumption

| Component | Tokens |
|-----------|--------|
| Reveal | `DUR.shell`, `EASE.emphasize` |
| Stagger | `DUR.chip`, `EASE.standard`, `STAGGER.chip`, `capStagger` |
| DrawPath | `EASE.emphasize` (duration default 0.7s per plan) |
| Beam | `AMBIENT.sweep / 2` default duration |
| GridSubstrate | `mulberry32`, `SEEDS.substrate` |

All components use `useReducedMotionSafe` from `./useReducedMotionSafe`.

---

## GridSubstrate travelling luminance band

Confirmed: `draw()` computes `band = ((t / 9000) % 1) * (w + h)` and applies per-dot falloff via `Math.abs(px + py - band)`. Under reduced motion, a single static frame is drawn and the RAF loop stops.

---

## Test results

```
pnpm vitest run __tests__/motion-primitives.test.tsx
→ PASS (4 tests)
```

Note: jsdom logs "Not implemented: HTMLCanvasElement's getContext()" during GridSubstrate mount; tests still pass because assertions target DOM presence and `aria-hidden`, not canvas pixels.

---

## Commit

| Task | SHA | Subject |
|------|-----|---------|
| 1A | `14316aa` | feat: add Reveal, Stagger, DrawPath, Beam, GridSubstrate primitives |

---

## Handoff notes for Wave 1B+

1. `Beam` takes inline `d` geometry, not `pathId` - no DOM lookup required.
2. `DrawPath` must be a child of `<svg>`.
3. `GridSubstrate` is load-bearing for Tier 1 nav glass; do not flatten to uniform dots without downgrading nav to Tier 2.
4. Do not edit these files from other Wave 1 tasks; ownership is exclusive per plan.
