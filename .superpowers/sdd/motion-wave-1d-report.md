# Wave 1D Particle Simulation Report

**Date:** 2026-08-29  
**Branch:** `homepage-p0`  
**Gate status:** PASS (task scope)

---

## Deliverables

| File | Role |
|------|------|
| `web/components/replica/motion/ParticleField.tsx` | Seeded canvas particle simulation |
| `web/__tests__/particle-field.test.tsx` | Transform map, density cap, canvas a11y, frozen mode |

---

## `ParticleFieldProps` signature

```tsx
export type ParticleFieldProps = {
  sources: readonly SourceAnchor[];
  hub: FieldAnchor;
  sinks: readonly FieldAnchor[];
  seed?: number;
  frozen?: boolean;
  isolateSourceId?: string | null;
  onAbsorb?: (kind: WorkItemKind) => void;
  className?: string;
};
```

Supporting types: `FieldAnchor`, `SourceAnchor`, `WorkItemKind`, `EmittedKind`.

---

## Transform map (absorb-transform-emit)

| WorkItemKind (inbound) | EmittedKind (outbound) |
|------------------------|------------------------|
| `edit` | `drift-check` |
| `commit` | `deploy` |
| `pipeline` | `verify` |
| `plan` | `provision` |

`MAX_PARTICLES = 40`.

---

## Animation loop

- Single `requestAnimationFrame` loop; no React state updates per frame.
- Pauses on `document.visibilitychange` when tab hidden; resumes when visible (unless `reduced` or `frozen`).
- `reduced || frozen`: renders 240 fixed ticks then stops (deterministic snapshot for a11y and Playwright).
- Randomness via `mulberry32(seed)` only; no `Math.random`.
- Resize via `window.addEventListener("resize")` (canvas sizing only, not scroll).

---

## Parent integration notes (Task 2A)

Consumers must define `SOURCES`, `HUB`, `SINKS` as **module-level constants** and wrap `onAbsorb` in `useCallback` - both appear in the effect dependency array; fresh identities restart the simulation.

---

## Test results

```
pnpm vitest run __tests__/particle-field.test.tsx  → PASS (4 tests)
```

Full suite: 29 tests pass; 1 unrelated suite fails (`vendor-marks.test.tsx` - Wave 1C dependency not yet landed).

`rg Math.random web/components/replica/motion/ParticleField.tsx` → no matches.

---

## Commit

| Task | Subject |
|------|---------|
| 1D | feat: add seeded work-item particle simulation |
