# Factory Task 6 Report

## Status

- `blocked`
- Adopted the existing Task 6 baseline and preserved its clip pipeline.
- Added the missing featured-case poster redaction-scan path under TDD.
- Verified one real cleared clip and one real cleared poster, but the full manifest is still blocked because `home-automation` fails the 30fps gate.

## Skills and guidance read

- `/Users/swami/.cursor/skills/performance-engineer/SKILL.md`
- `superpowers:test-driven-development`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`

## Torbit verification

### Scoped manifest

Query:

```sql
SELECT repo_path, project_id, branch, commit_sha, status, last_indexed_at
FROM _orbit_manifest
WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign';
```

Result:

- `repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign`
- `project_id`: `6869176848158080459`
- `branch`: `main`
- `commit_sha`: `287c95dc33fb87f8345a9c270680052250cf2b66`
- `status`: `indexed`
- `last_indexed_at`: `2026-08-21T08:06:57.531136`

No reindex was needed. The graph was already scoped to this repo on `main` and current enough to inspect the committed codebase.

### Target definitions

Query:

```sql
SELECT name, definition_type, file_path, start_line, end_line
FROM gl_definition
WHERE name IN ('findSensitive', 'ProductClip', 'VideoFigure', 'FeaturedCasePoster')
ORDER BY file_path, start_line;
```

Result:

- `ProductClip` -> `web/components/media/ProductClip.tsx`
- `VideoFigure` -> `web/components/media/VideoFigure.tsx`
- `FeaturedCasePoster` -> `web/lib/types.ts`
- `findSensitive` -> `web/scripts/redaction.ts`

### Target importers

Query:

```sql
SELECT identifier_name, import_path, file_path
FROM gl_imported_symbol
WHERE identifier_name IN ('ProductClip', 'VideoFigure', 'FeaturedCasePoster', 'findSensitive')
   OR identifier_alias IN ('ProductClip', 'VideoFigure', 'FeaturedCasePoster', 'findSensitive')
ORDER BY identifier_name, file_path;
```

Result:

- `ProductClip` importer: `web/components/media/__tests__/ProductClip.test.tsx`
- `VideoFigure` importer: `web/components/media/__tests__/VideoFigure.test.tsx`
- `findSensitive` importers:
  - `web/components/media/ProductClip.tsx`
  - `web/components/media/VideoFigure.tsx`
  - `web/scripts/__tests__/redaction.test.ts`

Poster-related content references were then checked in source:

- `web/content/home.ts` keeps the featured-case poster `pending`
- `web/content/__tests__/governance.test.ts` accepts either `verified` media or explicit pending work

## Task 6-owned files changed

- `web/scripts/clips.mjs`
- `web/scripts/__tests__/clips.test.ts`
- `web/public/product/home-audit.webm`
- `web/public/product/home-audit.mp4`
- `web/public/product/home-audit.webp`
- `web/public/product/greythr.webp`
- `.superpowers/sdd/redaction-signoff.md`
- `.superpowers/sdd/factory-task-6-report.md`

## TDD evidence

### RED

Added a focused test that requires a poster-frame scan plan before the featured-case poster is encoded:

```bash
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

Observed failure:

- `TypeError: buildPosterFrameScanPlan is not a function`

Why it failed:

- The clip path already scanned every frame through `findSensitive`.
- The featured-case poster path had no equivalent scan-plan contract.

### GREEN

Implemented the minimum fix:

- exported `buildPosterFrameScanPlan(...)`
- scanned the poster frame through `scanFrames(...)`
- rejected the poster on any `findSensitive` hit before `cwebp`
- returned `frameCount` and `hits` from the poster result for audit evidence

Verification:

```bash
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

Result:

- focused Task 6 suite passed: `7` tests

## Tooling availability

Confirmed locally before real asset checks:

- `yt-dlp`
- `ffmpeg`
- `tesseract`
- `cwebp`

## Source provenance

The adopted Task 6 script points at these YouTube sources:

- `i31kMgVn_Xk` - `Auto-Generate Compliance and Security Audits`
- `HKEV6rkRDzU` - `Approval and Auto Remediation Flow`
- `92UTOY9C1UY` - `Module Editor, MCP Server, IDE`
- `2PsieosSyAw` - `StackOptimizer`
- `V0zsWdJz2rs` - `The Future of AI in SRE with Abhishek Gaurav from GreytHR`

## Real media checks

### Cleared clip

Command:

```bash
cd web && node scripts/clips.mjs --only home-audit,greythr
```

Result for `home-audit`:

- source: `i31kMgVn_Xk`
- selected segment: `00:10-00:18`
- scanned frames: `240`
- redaction hits: `0`
- dimensions:
  - clip width: `1440`
  - poster width: `1440`
- generated files:
  - `public/product/home-audit.webm`
  - `public/product/home-audit.mp4`
  - `public/product/home-audit.webp`
- byte sizes:
  - `home-audit.webm`: `88360`
  - `home-audit.mp4`: `46185`
  - `home-audit.webp`: `21402`
- budget result:
  - both encodes are under the `3 * 1024 * 1024` byte limit

### Cleared featured-case poster

Result for `greythr`:

- source: `V0zsWdJz2rs`
- selected frame: `01:52`
- scanned frames: `1`
- redaction hits: `0`
- width: `1440`
- generated file:
  - `public/product/greythr.webp`
- byte size:
  - `greythr.webp`: `64772`

### Blocking candidate

Command:

```bash
cd web && node scripts/clips.mjs --only home-automation
```

Result:

- source: `HKEV6rkRDzU`
- selected segment: `00:20-00:28`
- rejected on `frame-00002.png`
- blocking rule: `aws-account-id`

Meaning:

- The adopted baseline still does not satisfy the full-manifest acceptance criteria.
- Candidate selection must be re-done for `home-automation`, and likely for additional clips, using the real 30fps gate rather than lighter pre-screen assumptions.

## Verification commands

Focused suite:

```bash
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

- pass: `1` file, `7` tests

Required repo checks:

```bash
cd web && pnpm typecheck
cd web && pnpm test
cd web && pnpm build
```

- `pnpm typecheck`: pass
- `pnpm test`: pass (`60` files, `244` tests)
- `pnpm build`: pass (Next.js `16.3.1`)

## Commit

- base HEAD before Task 6 review work: `287c95dc33fb87f8345a9c270680052250cf2b66`
- Task 6 commit: pending

## Exact missing evidence

- No clearance evidence yet for the remaining `15` planned clip outputs beyond `home-audit`
- No approved replacement segment yet for `home-automation`
- No 30fps scan results yet for the remaining product/home surfaces after the first blocking failure
- The sign-off file is still partial by necessity and should not be treated as final clearance for the full Task 6 manifest
