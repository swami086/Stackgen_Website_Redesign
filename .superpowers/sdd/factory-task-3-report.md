# Factory Task 3 Report

## Status

- `complete`
- Task 3 product proof components implemented in `web/components/media/`
- Unrelated dirty work in the tree was preserved and not staged

## Exact files

- `web/components/media/ProductFrame.tsx`
- `web/components/media/ProductClip.tsx`
- `web/components/media/VideoFigure.tsx`
- `web/components/media/__tests__/ProductClip.test.tsx`
- `web/components/media/__tests__/VideoFigure.test.tsx`
- `.superpowers/sdd/factory-task-3-report.md`

## Torbit queries and counts

### Repository manifest verification

- Verified via `_orbit_manifest` before editing:
  - `repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign`
  - `branch`: `main`
  - `status`: `indexed`
- Refreshed Torbit index before implementation because Task 2 added files
- Refreshed Torbit index again after implementation to record final graph state

### Pre-edit importer counts

- `@/components/motion/Reveal`: `26`
- `@/components/motion/useReducedMotion`: `0`
- `@/components/primitives/SectionHeaderSplit`: `4`
- `@/lib/types`: `49`
- `@/scripts/redaction`: `0`
- `@/components/sections/product/ProductHero`: `1`
- `@/components/sections/case/FeaturedCases`: `1`

### Pre-edit definition counts

- `web/components/motion/Reveal.tsx`: `12`
- `web/components/motion/useReducedMotion.ts`: `7`
- `web/components/primitives/SectionHeaderSplit.tsx`: `6`
- `web/lib/types.ts`: `7`
- `web/scripts/redaction.ts`: `11`
- `web/components/sections/product/ProductHero.tsx`: `4`
- `web/components/sections/case/FeaturedCases.tsx`: `5`

### Post-edit importer counts

- `./ProductFrame`: `2`
- `@/components/motion/useReducedMotion`: `1`
- `@/scripts/redaction`: `2`

### Post-edit definition counts

- `web/components/media/ProductFrame.tsx`: `4`
- `web/components/media/ProductClip.tsx`: `23`
- `web/components/media/VideoFigure.tsx`: `19`
- `web/components/media/__tests__/ProductClip.test.tsx`: `20`
- `web/components/media/__tests__/VideoFigure.test.tsx`: `2`

## TDD evidence

### RED

Command:

```bash
cd web && pnpm exec vitest run components/media
```

Observed failure:

- `components/media/__tests__/ProductClip.test.tsx`: failed to resolve `../ProductClip`
- `components/media/__tests__/VideoFigure.test.tsx`: failed to resolve `../VideoFigure`

This was the expected failure mode: the tests existed and the production modules did not.

### GREEN

Focused rerun:

```bash
cd web && pnpm exec vitest run components/media
```

Result:

- `2` test files passed
- `13` tests passed

## Verification results

### Focused media tests

- `pnpm exec vitest run components/media`
- `2` files passed, `13` tests passed

### Repository checks

Command:

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
```

Results:

- `pnpm typecheck`: passed
- `pnpm test`: passed, `55` files / `217` tests
- `pnpm build`: passed on Next.js `16.3.1`

## Redaction evidence

- `ProductClip` imports `findSensitive` from `@/scripts/redaction`
- `VideoFigure` imports `findSensitive` from `@/scripts/redaction`
- Both components reject sensitive identifiers in their props before rendering
- Both focused test suites include a redaction-gate assertion using a synthetic 12-digit value assembled from fragments at test time, so the rule is still exercised without committing a real identifier
- The thrown error is rule-based and does not echo the matched sensitive value back into logs

## Implementation notes

- `ProductClip` uses `IntersectionObserver` for play/pause orchestration and pauses again on `visibilitychange`
- `ProductClip` keeps `muted`, `playsInline`, `loop`, `preload="none"`, and `poster`
- Reduced-motion behavior keeps the poster and exposes native controls instead of autoplay
- `VideoFigure` keeps a poster-first button state and mounts the `iframe` only after explicit user action
- Both proof components keep a stable `aspect-video` box to avoid layout jumps

## Commit

- Commit hash: `15c3fd3e94b7367b4edcbb6e8e6fb22ebfdac27a`
- Commit message: `T3: product proof components with reduced-motion and autoplay correctness`

## Scope split

- Task 3 delivers the runtime prop redaction gate in `ProductClip` and `VideoFigure`, which prevents sensitive strings from being passed into the shipped proof components.
- Task 6 remains the separate asset-clearance step for real footage inputs such as frame review or OCR-based scanning before a clip is approved for use.
- These are complementary gates at different layers; Task 3 is not blocked by Task 6, and Task 6 is not implemented in this task.

## Review fix - 2026-08-21

### RED

Command:

```bash
cd web && pnpm exec vitest run components/media
```

Observed output:

```text
 RUN  v4.1.11 /Users/swami/Documents/Stackgen_Website_Redesign/web

 ❯ components/media/__tests__/ProductClip.test.tsx (9 tests | 1 failed) 36ms
     × does not attach playback observers on first client render for reduced-motion users 4ms

 FAIL  components/media/__tests__/ProductClip.test.tsx > ProductClip > does not attach playback observers on first client render for reduced-motion users
AssertionError: expected "vi.fn()" to not be called at all, but actually been called 1 times
```

Meaning:

- The new regression test proved the bug: `ProductClip` still attached its playback observer during the initial reduced-motion render.

### GREEN

Command:

```bash
cd web && pnpm exec vitest run components/media
```

Observed output:

```text
 RUN  v4.1.11 /Users/swami/Documents/Stackgen_Website_Redesign/web

 Test Files  2 passed (2)
      Tests  13 passed (13)
   Duration  697ms
```

Meaning:

- The reduced-motion first-render regression is fixed.
- The focused redaction tests still pass with the synthetic 12-digit sensitive value.

### Verification

Command:

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
```

Observed output:

```text
$ tsc --noEmit
$ vitest run

 Test Files  55 passed (55)
      Tests  217 passed (217)

$ next build
▲ Next.js 16.3.1 (Turbopack)
✓ Compiled successfully in 556ms
✓ Generating static pages using 13 workers (22/22) in 220ms
```

Meaning:

- `pnpm typecheck`: passed
- `pnpm test`: passed with `55` files and `217` tests
- `pnpm build`: passed on Next.js `16.3.1`
