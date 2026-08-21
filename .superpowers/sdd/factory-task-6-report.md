# Factory Task 6 Report

## Status

- `blocked`
- Adopted the existing Task 6 baseline and preserved its clip pipeline.
- Added the missing featured-case poster redaction-scan path under TDD.
- Replaced `home-automation` with a clean alternate segment from the approved source manifest.
- Adopted the verified featured-case poster into the runtime content model at `/product/greythr.webp`.
- Normalized the sign-off/report evidence for every cleared asset and hardened tests so missing media evidence cannot pass silently.
- Verified two real cleared clips and one real cleared poster, but the full manifest is still blocked because the remaining `14` planned clip segments still lack exact 30fps gate evidence.

## Skills and guidance read

- `/Users/swami/.cursor/plugins/cache/cursor-public/superpowers/d884ae04edebef577e82ff7c4e143debd0bbec99/skills/test-driven-development/SKILL.md`
- `/Users/swami/.cursor/skills/performance-engineer/SKILL.md`
- `superpowers:test-driven-development`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`

## Torbit verification

### Scoped query attempt

Query:

```sql
SELECT repo_path, project_id, branch, commit_sha, status, last_indexed_at
FROM _orbit_manifest
WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/factory-experience';
```

Result:

- failed before returning rows
- shared DuckDB error: `Serialization Error: Failed to deserialize: field id mismatch, expected: 100, got: 26117`

### Scoped reindex attempt

Command:

```text
Torbit MCP: index path=/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/factory-experience
```

Result:

- failed with the same shared DuckDB deserialization error
- no manifest or definition data was readable after the reindex attempt

### Fallback source inspection

Because the shared Torbit DB remained unreadable, Task 6 review fixes used direct source inspection instead:

- `web/scripts/clips.mjs` for the clip manifest and featured-case poster definition
- `web/scripts/__tests__/clips.test.ts` for manifest/sign-off/report enforcement
- `web/content/home.ts` for the runtime featured-case poster field
- `web/content/__tests__/governance.test.ts` for the runtime content contract

## Task 6-owned files changed

- `web/scripts/clips.mjs`
- `web/scripts/__tests__/clips.test.ts`
- `web/content/home.ts`
- `web/content/__tests__/governance.test.ts`
- `web/public/product/home-audit.webm`
- `web/public/product/home-audit.mp4`
- `web/public/product/home-audit.webp`
- `web/public/product/home-automation.webm`
- `web/public/product/home-automation.mp4`
- `web/public/product/home-automation.webp`
- `web/public/product/greythr.webp`
- `.superpowers/sdd/redaction-signoff.md`
- `.superpowers/sdd/factory-task-6-report.md`

## TDD evidence

### RED

Added focused review-fix tests that require the verified greytHR poster to be wired into runtime content and require the cleared-media evidence in both markdown artifacts to match the actual files on disk:

```bash
cd web && pnpm exec vitest run content/__tests__/governance.test.ts
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

Observed failure:

- `expected 'pending' to be 'verified'` for `home.featuredCase.poster`
- sign-off/report evidence was incomplete for `home-audit` and `greythr`

Why it failed:

- `web/content/home.ts` still kept the featured-case poster as `pending` even though `web/public/product/greythr.webp` was already verified and shipped.
- The Task 6 markdown artifacts did not record a consistent set of dimensions, fps, frame-count, hit-count, byte-size, and provenance facts for every cleared output.
- The existing clip budget tests could return early if `public/product` or markdown evidence went missing.

### GREEN

Implemented the minimum fix:

- switched `home.featuredCase.poster` to the typed verified shape with `src: '/product/greythr.webp'`
- normalized `home-audit`, `home-automation`, and `greythr` evidence in both Task 6 markdown artifacts
- hardened `clips.test.ts` so the suite now fails if `public/product` is missing or if the sign-off/report drift from the actual media facts on disk
- kept Task 6 honestly `blocked` on the remaining `14` unsigned planned segments

Verification:

```bash
cd web && pnpm exec vitest run content/__tests__/governance.test.ts
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

Result:

- focused review-fix suites passed: `2` files, `30` tests

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

### `home-audit`

Command:

```bash
cd web && node scripts/clips.mjs --only home-audit
```

- source video: `i31kMgVn_Xk` (`Auto-Generate Compliance and Security Audits`)
- timecodes: `00:10-00:18`
- frame scan result: `240` frames scanned, `0` hits from `findSensitive`
- dimensions / fps:
  - clip: `1440x860 @ 30fps`
  - poster: `1440x860`
- byte sizes:
  - `home-audit.webm`: `88360`
  - `home-audit.mp4`: `46185`
  - `home-audit.webp`: `21402`
- generated files:
  - `public/product/home-audit.webm`
  - `public/product/home-audit.mp4`
  - `public/product/home-audit.webp`
- budget result:
  - both encodes are under the `3 * 1024 * 1024` byte limit

### `home-automation`

Command:

```bash
cd web && node scripts/clips.mjs --only home-automation
```

- source video: `HKEV6rkRDzU` (`Approval and Auto Remediation Flow`)
- timecodes: `00:24-00:32`
- frame scan result: `240` frames scanned, `0` hits from `findSensitive`
- dimensions / fps:
  - clip: `1440x860 @ 30fps`
  - poster: `1440x860`
- byte sizes:
  - `home-automation.webm`: `387958`
  - `home-automation.mp4`: `269899`
  - `home-automation.webp`: `58458`
- generated files:
  - `public/product/home-automation.webm`
  - `public/product/home-automation.mp4`
  - `public/product/home-automation.webp`
- budget result:
  - both encodes are under the `3 * 1024 * 1024` byte limit

### `greythr`

Command:

```bash
cd web && node scripts/clips.mjs --only greythr
```

- source video: `V0zsWdJz2rs` (`The Future of AI in SRE with Abhishek Gaurav from GreytHR`)
- timecode: `01:52`
- frame scan result: `1` frame scanned, `0` hits from `findSensitive`
- dimensions:
  - poster: `1440x810`
- byte sizes:
  - `greythr.webp`: `64772`
- generated files:
  - `public/product/greythr.webp`

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

- The original `home-automation` baseline was not safe to ship and had to be replaced with the cleared `00:24-00:32` segment above.
- Full-manifest acceptance is still unmet because the remaining planned clip segments have not yet been cleared under the same exact gate.

## Verification commands

Focused suite:

```bash
cd web && pnpm exec vitest run content/__tests__/governance.test.ts
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
cd web && pnpm exec vitest run scripts/__tests__/redaction.test.ts
```

- clip/redaction verification pass: `2` files, `25` tests
- focused governance verification pass: `1` file, `19` tests

Required repo checks:

```bash
cd web && pnpm typecheck
cd web && pnpm test
cd web && pnpm build
```

- `pnpm typecheck`: pass
- `pnpm test`: pass (`60` files, `248` tests)
- `pnpm build`: pass (Next.js `16.3.1`)

## Commit

- base HEAD before Task 6 review work: `287c95dc33fb87f8345a9c270680052250cf2b66`
- Task 6 commit: pending

## Exact missing evidence

- No clearance evidence yet for these remaining planned clip segments:
  - `home-infrastructure`
  - `home-observability`
  - `sre-01`
  - `sre-02`
  - `sre-03`
  - `automation-01`
  - `automation-02`
  - `automation-03`
  - `infrastructure-01`
  - `infrastructure-02`
  - `infrastructure-03`
  - `observability-01`
  - `observability-02`
  - `observability-03`
- No exact 30fps scan results yet for those `14` segments, so the sign-off file remains intentionally partial.
- Because those segments are still unsigned, Task 6 remains `blocked`.
