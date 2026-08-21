# Factory Task 5 Report

## Status

- Result: complete
- Branch: `main`
- Commit: `e392f475f689ad9d57bcba77b673347e081b90a7`
- Commit subject: `T5: content model for use cases, industries, momentum and prompts`
- Working tree note: the repository remains dirty outside Task 5. I isolated and committed only Task 5 hunks, leaving unrelated parity work untouched.

## Scope

Committed Task 5 file set:

- `web/lib/types.ts`
- `web/content/home.ts`
- `web/content/industries.ts`
- `web/content/product-infrastructure.ts`
- `web/content/product-automation.ts`
- `web/content/product-observability.ts`
- `web/content/product-sre.ts`
- `web/content/__tests__/governance.test.ts`

Report-only artifact written after commit:

- `.superpowers/sdd/factory-task-5-report.md`

## Source Reads

Read before editing:

- `.superpowers/sdd/task-5-brief.md`
- `.agents/product-marketing.md`
- `PRODUCT.md`
- `docs/proof/customer-logos-and-quotes.md`
- `docs/superpowers/specs/2026-08-19-factory-experience-brief.md`
- `docs/superpowers/specs/2026-08-20-factory-anchored-experience-design.md`
- `/Users/swami/.agents/skills/copywriting/SKILL.md`
- `/Users/swami/.cursor/skills/technical-writer/SKILL.md`
- `superpowers:test-driven-development`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`

## OpenMemory Search Record

Phase 1 searches completed before code:

1. Global preferences for code style, testing, and implementation around content model changes and governance tests
2. Project facts for content module patterns, governance constraints, and typed content structures
3. Project-specific preferences for copy governance, CTA discipline, naming, and tests

Key applications:

- Keep `Schedule demo` as the only primary CTA
- Keep public-site bans intact: `Olly`, `Aiden for InfraOps`, `Aiden for DevOps`, `single pane of glass`, em dash
- Follow strict red/green TDD with governance tests as the contract
- Treat modeled dollar ROI as out of bounds for public content

## Torbit Verification

Manifest query run before editing:

```sql
SELECT repo_path, branch, status, commit_sha, last_indexed_at
FROM _orbit_manifest
WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign';
```

Result count: 1 row

- repo: `/Users/swami/Documents/Stackgen_Website_Redesign`
- branch: `main`
- status: `indexed`
- commit at index time: `7ef1bff60159ac6935efd0dfeafc8809134acc89`
- last indexed at: `2026-08-21T07:47:16.950566`

Definition query run before editing:

```sql
SELECT file_path, name, definition_type, COUNT(*) AS count
FROM gl_definition
WHERE file_path IN (
  'web/lib/types.ts',
  'web/content/home.ts',
  'web/content/product-infrastructure.ts',
  'web/content/product-automation.ts',
  'web/content/product-observability.ts',
  'web/content/product-sre.ts',
  'web/content/__tests__/governance.test.ts'
)
GROUP BY file_path, name, definition_type
ORDER BY file_path, definition_type, name;
```

Useful counts from the indexed snapshot:

- `web/lib/types.ts`: 1 module definition, 6 type-alias definitions
- `web/content/home.ts`: 1 module definition, 1 variable definition
- `web/content/product-infrastructure.ts`: 1 module definition, 1 variable definition
- `web/content/product-automation.ts`: 1 module definition, 1 variable definition
- `web/content/product-observability.ts`: 1 module definition, 1 variable definition
- `web/content/product-sre.ts`: 1 module definition, 1 variable definition
- `web/content/__tests__/governance.test.ts`: 1 module definition, 3 function definitions, 14 variable definitions

Importer query run before editing:

```sql
SELECT import_path, COUNT(DISTINCT file_path) AS importer_files, COUNT(*) AS import_occurrences
FROM gl_imported_symbol
WHERE import_path IN (
  '@/lib/types',
  '../home',
  '../product-infrastructure',
  '../product-automation',
  '../product-observability',
  '../product-sre'
)
GROUP BY import_path
ORDER BY import_path;
```

Importer counts:

- `../home`: 1 importer file, 1 occurrence
- `../product-infrastructure`: 1 importer file, 1 occurrence
- `../product-automation`: 1 importer file, 1 occurrence
- `../product-observability`: 1 importer file, 1 occurrence
- `../product-sre`: 1 importer file, 1 occurrence
- `@/lib/types`: 70 importer files, 881 import occurrences

File-level importer detail query also confirmed the direct module importers at index time were the governance tests, while `@/lib/types` was the broad compatibility surface across `web/components/**` and `web/content/**`.

## TDD Evidence

### Red

Command:

```bash
cd web && pnpm exec vitest run content
```

Observed failure:

- `content/__tests__/governance.test.ts` failed to resolve `../industries`
- Failure reason matched the brief expectation exactly

### Green

Command:

```bash
cd web && pnpm exec vitest run content && pnpm typecheck
```

Observed pass:

- `1` test file passed
- `16` tests passed
- `tsc --noEmit` passed

## Implementation Summary

- Added `Industry` and `MomentumItem` shared types
- Added `web/content/industries.ts` with only the two evidence-backed verticals
- Added `home.useCases`, `home.momentum`, and `home.featuredCase`
- Added per-product `prompt` strings for all four product content modules
- Added `productObservability.testimonial` using the published greytHR quote and source URL
- Extended governance coverage for prompt presence, industry evidence routing, and copy-length discipline

## Verification

Focused verification:

```bash
cd web && pnpm exec vitest run content && pnpm typecheck
```

Passed:

- `1` file
- `16` tests
- typecheck

Full required verification:

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
```

Passed:

- `pnpm typecheck`
- `pnpm test` -> `59` files, `234` tests
- `pnpm build` -> success, static generation completed for all app routes

Lint check:

- `ReadLints` on all edited Task 5 files returned no linter errors

## Governance Scan

Governance coverage now passed for:

- banned term scan across content modules
- quote status presence
- `sourceUrl` required on published quotes
- mechanism text required on every metric
- product prompt presence on all four product modules
- industry evidence length and slug-to-href match
- sentence discipline threshold: at least 85 percent of sentences at 15 words or fewer

Additional manual guardrails applied while writing:

- no modeled dollar ROI
- no em dash
- no unredacted IDs, ARNs, bucket names, or similar identifiers
- only published quote/source pairing used as real proof

## Commit Record

- New commit: `e392f475f689ad9d57bcba77b673347e081b90a7`
- Author: `swami086 <swami086@gmail.com>`

## Concerns

1. The repository still has extensive unrelated local modifications and untracked files outside Task 5. They were intentionally preserved and not staged.
2. The new home `featuredCase.poster` path is content-model only: `/product/greythr.webp`. Task 5 did not create or validate media assets because that sits outside this file-ownership scope.
3. The infrastructure prompt was explicit in the brief and the observability prompt was explicit in the existing mechanism copy. The automation and SRE prompts were aligned to their demo/mechanism flows, but the repo did not contain a stronger verbatim source string for those two prompts at dispatch time.

## Task 5 review follow-up

### Fixes applied

1. **Healthcare proof now uses publishable case facts, not placeholder quote copy.**
   - Replaced the healthcare industry evidence in `web/content/industries.ts`.
   - New proof uses the published Innovaccer case facts already present in `docs/proof/customer-logos-and-quotes.md` and `web/content/case-innovaccer.ts`: `75% faster environment deployment`, `up to 80% less script and environment toil`, and `compliance validation dropped from hours to minutes`.
   - Added auditable provenance with the published source URL: `https://stackgen.com/case-studies/innovacer`.
   - Governance now explicitly rejects the old placeholder-quote fragments: `cloud-specific glue`, `under a day`, and `controls healthcare requires`.

2. **Product prompts now declare provenance honestly instead of shipping unsupported strings.**
   - `Aiden for Infrastructure` keeps the approved prompt text with `approved-demo-copy` provenance, sourced to `docs/superpowers/specs/2026-08-20-factory-anchored-experience-design.md`.
   - `Aiden for Observability` keeps the approved prompt text with `approved-mechanism-copy` provenance, sourced to `web/components/diagrams/product/ObservabilityMechanism.tsx`.
   - `Aiden for Automation` and `Aiden for SRE` now declare prompt status as `unavailable` because this repo does not currently carry a verbatim approved prompt for those products.
   - Governance no longer accepts a bare string. It now checks status, source product alignment, provenance type, and auditable artifact path.

3. **Industry governance now checks provenance, not only content length.**
   - `Industry` now carries a typed provenance union: published URL or approved evidence marker.
   - Financial services remains allowed, but only with an explicit approved-evidence marker tied to the anonymized bank proof in `PRODUCT.md`.
   - The sentence-discipline audit now includes the industries module, so late-added vertical copy cannot bypass the copy-length gate.

4. **Featured case poster is now modeled as pending instead of pretending an asset exists.**
   - Replaced the concrete `home.featuredCase.poster` path with an explicit pending object in `web/content/home.ts`.
   - The note records that no verified public greytHR poster asset is approved in Task 5 scope yet, which keeps the model honest and leaves Task 6 free to populate a real asset later.

5. **Copy governance stayed within the approved wording rules.**
   - No new banned names were introduced.
   - No modeled dollar ROI was added.
   - No em dash was introduced in Task 5-owned content.
   - No unredacted customer identifiers, cloud account IDs, or similar secrets were added.

### Follow-up verification

- Red: `pnpm exec vitest run content` failed first on prompt provenance, industry provenance, healthcare proof, and featured-case poster modeling.
- Green: `pnpm exec vitest run content && pnpm typecheck` passed with `19` content governance tests green.
- Full verification: `pnpm test && pnpm build` passed with `59` files and `237` tests green, plus a successful production build.
