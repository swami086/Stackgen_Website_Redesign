# Task 4 Report: Structural primitives

## Status

- Completed on `main`
- Commit: `f5264d6357ce31db014dbd4698f65db5a65fc461`
- Commit message: `T4: structural primitives for sequences, stats, marquee and prompt`

## Torbit scope verification

- Manifest query:

```sql
SELECT repo_path, project_id, branch, status, last_indexed_at
FROM _orbit_manifest
WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign';
```

- Result:
  - `repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign`
  - `project_id`: `6869176848158080459`
  - `branch`: `main`
  - `status`: `indexed`
  - `last_indexed_at`: `2026-08-21T07:26:02.435265`

## Torbit symbol queries and counts

- Zero-filled symbol count query:

```sql
WITH repo AS (
  SELECT project_id
  FROM _orbit_manifest
  WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign'
),
symbols(name) AS (
  VALUES
    ('NumberedSequence'),
    ('StatBand'),
    ('IridescentBand'),
    ('Marquee'),
    ('PromptLine'),
    ('useReducedMotion')
)
SELECT
  symbols.name,
  COALESCE(defs.definition_count, 0) AS definition_count,
  COALESCE(imps.importer_count, 0) AS importer_count
FROM symbols
LEFT JOIN (
  SELECT d.name, COUNT(*) AS definition_count
  FROM gl_definition d
  JOIN repo r ON d.project_id = r.project_id
  WHERE d.name IN (SELECT name FROM symbols)
  GROUP BY d.name
) defs ON defs.name = symbols.name
LEFT JOIN (
  SELECT s.identifier_name AS name, COUNT(*) AS importer_count
  FROM gl_imported_symbol s
  JOIN repo r ON s.project_id = r.project_id
  WHERE s.identifier_name IN (SELECT name FROM symbols)
     OR s.identifier_alias IN (SELECT name FROM symbols)
  GROUP BY s.identifier_name
) imps ON imps.name = symbols.name
ORDER BY symbols.name;
```

- Counts before editing:
  - `IridescentBand`: definitions `0`, importers `0`
  - `Marquee`: definitions `0`, importers `0`
  - `NumberedSequence`: definitions `0`, importers `0`
  - `PromptLine`: definitions `0`, importers `0`
  - `StatBand`: definitions `0`, importers `0`
  - `useReducedMotion`: definitions `1`, importers `2`

- Shared hook definition query:

```sql
WITH repo AS (
  SELECT project_id
  FROM _orbit_manifest
  WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign'
)
SELECT d.name, d.file_path, d.start_line, d.end_line
FROM gl_definition d
JOIN repo r ON d.project_id = r.project_id
WHERE d.name IN ('useReducedMotion')
ORDER BY d.name, d.file_path;
```

- Result:
  - `useReducedMotion` defined at `web/components/motion/useReducedMotion.ts` line `5`

- Shared hook importer query:

```sql
WITH repo AS (
  SELECT project_id
  FROM _orbit_manifest
  WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign'
)
SELECT DISTINCT s.file_path
FROM gl_imported_symbol s
JOIN repo r ON s.project_id = r.project_id
WHERE s.identifier_name = 'useReducedMotion'
   OR s.identifier_alias = 'useReducedMotion'
ORDER BY s.file_path;
```

- Result:
  - `web/components/media/ProductClip.tsx`
  - `web/components/motion/Reveal.tsx`

## Exact files changed

- `web/app/globals.css`
- `web/components/primitives/IridescentBand.tsx`
- `web/components/primitives/Marquee.tsx`
- `web/components/primitives/NumberedSequence.tsx`
- `web/components/primitives/PromptLine.tsx`
- `web/components/primitives/StatBand.tsx`
- `web/components/primitives/__tests__/Marquee.test.tsx`
- `web/components/primitives/__tests__/NumberedSequence.test.tsx`
- `web/components/primitives/__tests__/PromptLine.test.tsx`
- `web/components/primitives/__tests__/StatBand.test.tsx`

## TDD evidence

### Red

- Added the four test files from the Task 4 brief before writing any production code.
- Ran:

```bash
cd web && pnpm exec vitest run components/primitives/__tests__/NumberedSequence.test.tsx components/primitives/__tests__/StatBand.test.tsx components/primitives/__tests__/PromptLine.test.tsx components/primitives/__tests__/Marquee.test.tsx
```

- Observed expected failure:
  - `../NumberedSequence` could not be resolved
  - `../StatBand` could not be resolved
  - `../PromptLine` could not be resolved
  - `../Marquee` could not be resolved

### Green

- Implemented the five primitives and the `@keyframes marquee` rule with the minimum structure needed to satisfy the brief.
- Preserved the existing shared reduced-motion hook and used it from `Marquee`.
- Kept `PromptLine` confirmation textual (`Copied`) and reserved status width to avoid a copy-state layout jump.

## Verification results

- Focused green gate:

```bash
cd web && pnpm exec vitest run components/primitives && pnpm typecheck
```

- Result:
  - `12` primitive test files passed
  - `22` tests passed
  - `tsc --noEmit` passed

- Full project verification:

```bash
cd web && pnpm test && pnpm build
```

- Result:
  - `59` test files passed
  - `229` tests passed
  - Next.js production build passed

- Lint check:
  - `ReadLints` on all Task 4 files returned no linter errors

## Concerns

- The brief's sample commit command used `git add web/components/primitives web/app/globals.css`, but `web/components/primitives/` already contained unrelated dirty changes in tracked files. I staged only the exact Task 4 files to avoid sweeping in parity work outside this task.
- The original Task 4 delivery shipped a single-track `Marquee`, so it snapped when the animation loop restarted. The follow-up fix below resolves that quality gap without widening scope beyond Task 4-owned files.

## Important quality fix

- Scope:
  - Fixed the follow-up quality finding in `web/components/primitives/Marquee.tsx`.
  - Added a focused animated-path regression test in `web/components/primitives/__tests__/Marquee.test.tsx`.
  - Kept reduced-motion coverage and the existing `Marquee({ items, label })` API unchanged.

### Red

```bash
cd web && pnpm exec vitest run components/primitives/__tests__/Marquee.test.tsx
```

```text
 RUN  v4.1.11 /Users/swami/Documents/Stackgen_Website_Redesign/web

 ❯ components/primitives/__tests__/Marquee.test.tsx (3 tests | 1 failed) 55ms
     × duplicates the list into a masked animated lane for seamless looping 3ms

 FAIL  components/primitives/__tests__/Marquee.test.tsx > Marquee > duplicates the list into a masked animated lane for seamless looping
 AssertionError: expected null not to be null
  ❯ components/primitives/__tests__/Marquee.test.tsx:28:26
      26|
      27|     const viewport = container.querySelector<HTMLElement>('[data-part=…
      28|     expect(viewport).not.toBeNull();
        |                          ^
      29|     expect(viewport?.style.maskImage).toContain('linear-gradient');
      30|

 Test Files  1 failed (1)
      Tests  1 failed | 2 passed (3)
```

### Green

```bash
cd web && pnpm exec vitest run components/primitives/__tests__/Marquee.test.tsx
```

```text
 RUN  v4.1.11 /Users/swami/Documents/Stackgen_Website_Redesign/web

 Test Files  1 passed (1)
      Tests  3 passed (3)
```

### Focused primitive tests

```bash
cd web && pnpm exec vitest run components/primitives
```

```text
 RUN  v4.1.11 /Users/swami/Documents/Stackgen_Website_Redesign/web

 Test Files  12 passed (12)
      Tests  23 passed (23)
```

### Typecheck

```bash
cd web && pnpm typecheck
```

```text
$ tsc --noEmit
```

### Full test

```bash
cd web && pnpm test
```

```text
$ vitest run

 RUN  v4.1.11 /Users/swami/Documents/Stackgen_Website_Redesign/web

 Test Files  59 passed (59)
      Tests  230 passed (230)
```

### Build

```bash
cd web && pnpm build
```

```text
$ next build
▲ Next.js 16.3.1 (Turbopack)
✓ Running next.config.ts took 13ms
✓ Compiled successfully in 496ms
Finished TypeScript in 259ms ...
✓ Generating static pages using 13 workers (22/22) in 218ms
```

### Outcome

- `Marquee` now renders a masked viewport plus a duplicated hidden track on the animated path, so the existing `translateX(-50%)` loop can wrap cleanly without a visible snap.
- Reduced-motion users still get a single, still list with no duplicate announcements.
