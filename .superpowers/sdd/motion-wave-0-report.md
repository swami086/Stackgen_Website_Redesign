# Wave 0 Foundation Report

**Date:** 2026-08-29  
**Branch:** `homepage-p0`  
**Gate status:** PASS

---

## Installed dependency versions

| Package | Version | Role |
|---------|---------|------|
| `gsap` | 3.15.0 | ScrollTrigger pinning (ContextGraph, Wave 2D) |
| `lenis` | 1.3.26 | Smooth scroll + ScrollTrigger sync |
| `geist` | 1.7.2 | Sans + mono typography (replaces Inter/JetBrains) |
| `@playwright/test` | 1.62.1 | Evidence suite (Wave 5) |

Existing: `motion@^13.1.1`, `next@~16.3.1`, `react@~19.2.8`, `vitest@^4.1.11`.

---

## `web/lib/motion-tokens.ts` exports

| Export | Type | Notes |
|--------|------|-------|
| `EASE` | `{ emphasize: Bezier; standard: Bezier }` | **Mutable** Bezier tuples (no `as const`) for motion/react |
| `EASE_CSS` | `{ emphasize: string; standard: string }` | CSS cubic-bezier strings |
| `DUR` | `{ flow, chip, shell, glassFade }` | Seconds |
| `STAGGER` | `{ chip, orbit, shell, logo }` | Per-sibling step in seconds |
| `AMBIENT` | `{ hub, ring, bezel, orbit, sweep }` | Loop periods in seconds |
| `RING_OPACITY` | `{ from: 0.2, to: 0.55 }` | Orbit ring pulse endpoints |
| `capStagger(count, step, max?)` | function | Shrinks step so total delay ≤ max (default 0.4s) |

---

## `web/lib/seeded-random.ts` exports

| Export | Type | Notes |
|--------|------|-------|
| `mulberry32(seed)` | `(seed: number) => () => number` | Deterministic PRNG; replaces `Math.random` in render code |
| `SEEDS` | `{ particles: 1337, integrations: 4242, substrate: 8080 }` | Fixed surface seeds |
| `pick(rng, items)` | function | Deterministic array pick |
| `range(rng, min, max)` | function | Deterministic float in `[min, max)` |

---

## CSS material classes (`web/app/globals.css`)

| Class | Tier | Description |
|-------|------|-------------|
| `.glass-real` | 1 | Real glass with `backdrop-filter: blur(24px)` - nav island + overlays only |
| `.glass-specular` | 2 | Gradient stroke + fill, zero blur - safe on animated surfaces |
| `.glow-source` | 3 | Off-center radial gradient pseudo-element - primary CTA, hub core, nav island |

Also added: themed browser surfaces (`::selection`, caret, scrollbars, `:focus-visible`, link underline, tabular nums), `data-motion-paused` capture freeze rules, `prefers-reduced-transparency` and `forced-colors` fallbacks.

---

## Motion infrastructure

| File | Exports |
|------|---------|
| `web/components/replica/motion/useReducedMotionSafe.ts` | `useReducedMotionSafe(): boolean` |
| `web/components/replica/motion/MotionProvider.tsx` | `MotionProvider`, `useLenisReady(): boolean` |

Mounted in `web/app/layout.tsx` inside `ThemeProvider`.

---

## Lenis go/no-go decision

**Decision:** GO - `LENIS_ENABLED = true`

**Reason:** No hard blocker discovered during Wave 0. Lenis initializes dynamically alongside GSAP ScrollTrigger registration without typecheck, test, or build failures. The pinned scrub jitter check at 120Hz is deferred to Wave 2D (ContextGraph integration) per spec; if jitter appears there, flip `LENIS_ENABLED` to `false` in `MotionProvider.tsx` and ship native scroll.

When `prefers-reduced-motion: reduce` is active, Lenis is skipped entirely and `useLenisReady()` resolves to `true` immediately.

---

## Gate results (Task 0.7)

```
pnpm typecheck  → PASS
pnpm test       → PASS (5 files, 16 tests)
pnpm build      → PASS; `/` prerendered as static
```

### Test coverage added in Wave 0

| File | Tests |
|------|-------|
| `__tests__/motion-tokens.test.ts` | 3 |
| `__tests__/seeded-random.test.ts` | 4 |
| `__tests__/glass-discipline.test.ts` | 5 |

---

## Commits (Tasks 0.1-0.7)

| Task | SHA | Subject |
|------|-----|---------|
| 0.1 | `7f9aebd` | build: add gsap, lenis, geist, playwright for motion refine |
| 0.2 | `404c38e` | feat: add canvas-harvested motion token manifest |
| 0.3 | `11cc880` | feat: add seeded PRNG for reproducible motion |
| 0.4 | `4190cf9` | feat: replace Inter with Geist across the replica |
| 0.5 | `7782f1b` | feat: add three-tier material system and themed browser surfaces |
| 0.6 | `f58e8c6` | feat: add MotionProvider with Lenis and ScrollTrigger registration |
| 0.7 | `42acbcf` | docs: wave 0 foundation report |

---

## Handoff notes for Wave 1+

1. Import timings only from `@/lib/motion-tokens` - never hardcode durations or easings.
2. Import randomness only from `@/lib/seeded-random` - `Math.random()` is banned in render code.
3. Apply `.glass-real` only on Nav island (over hero substrate) and overlays; `.glass-specular` everywhere else animated; `.glow-source` on the three named surfaces only.
4. `useLenisReady()` gates ScrollTrigger setup in Wave 2D - do not call `ScrollTrigger.refresh()` before ready.
5. Playwright capture: set `data-motion-paused="true"` on `<html>` before load to freeze CSS ambient loops.
