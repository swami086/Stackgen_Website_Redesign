# Factory Task 10 Report

## Status

- `completed`
- Ported `AidenOsDiagram.tsx` from Figma node `1:8708` and routed the live platform section to it.
- Preserved compatibility with the old import path by turning `AidenOsLinksDiagram.tsx` into a thin wrapper over the new component.

## Skills and guidance read

- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/epic-design/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- `/Users/swami/.claude/skills/figma-design-to-code/SKILL.md`

## Torbit verification

### Indexed worktree and manifest scope

Indexed path:

```text
/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t10-aiden-os
```

Manifest query:

```sql
SELECT project_id, repo_path, branch, commit_sha, status, last_indexed_at
FROM _orbit_manifest
WHERE repo_path LIKE '%/Stackgen_Website_Redesign/.worktrees/t10-aiden-os%';
```

Result:

- `project_id`: `3324048048967361267`
- `repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t10-aiden-os`
- `branch`: `factory-t10-aiden-os`
- `commit_sha`: `c9595fe8e569c652f0dbea1a92555a7ca188dfa2`
- `status`: `indexed`
- `last_indexed_at`: `2026-08-21T09:01:25.259735`

### Requested symbol counts

Query:

```sql
SELECT 'AidenOsLinksDiagram' AS symbol, ... UNION ALL
SELECT 'AidenOsDiagram' AS symbol, ... UNION ALL
SELECT 'DiagramText' AS symbol, ... UNION ALL
SELECT 'AidenOsLinks' AS symbol, ...;
```

Result:

- `AidenOsLinksDiagram`: `1` definition, `1` importer
- `AidenOsDiagram`: `0` definitions, `0` importers
- `DiagramText`: `1` definition, `0` importers in Torbit's `import_path` table
- `AidenOsLinks`: `1` definition, `1` importer

### Platform consumers

Query:

```sql
SELECT i.file_path, i.import_path, i.identifier_name
FROM gl_imported_symbol i
JOIN _orbit_manifest m ON i.project_id = m.project_id
WHERE m.repo_path LIKE '%/Stackgen_Website_Redesign/.worktrees/t10-aiden-os%'
  AND i.file_path LIKE 'web/app/platform/%'
ORDER BY i.file_path, i.import_path, i.identifier_name;
```

Relevant result:

- `web/app/platform/page.tsx` imports `@/components/sections/platform/AidenOsLinks`
- `web/components/sections/platform/AidenOsLinks.tsx` was therefore the live platform consumer path to preserve

## Figma evidence

- Node: `1:8708`
- Metadata read for the full node, then split into sublayers after Figma returned the sparse overflow fallback.
- Design context read for:
  - `1:13676` top text band
  - `1:13681` right-side capability grid
  - `1:13616` center ring asset
- Screenshots captured for:
  - full node `1:8708`
  - left visual group `1:8709`

Exact geometry used in code:

- Frame viewBox: `0 0 1920 1080`
- Header band origin: `x=66`, `y=64`
- Card grid origin: `x=607`, `y=316`, `1248x700`
- Cards: `396x335`, with a `30px` gutter and `322px` copy width
- Left visual square: `476.8750915527344`

Downloaded Figma asset:

- `web/public/diagram-assets/aiden-os-center.svg`

## Task 10-owned files changed

- `web/components/diagrams/AidenOsDiagram.tsx`
- `web/components/diagrams/AidenOsLinksDiagram.tsx`
- `web/components/diagrams/__tests__/AidenOsDiagram.test.tsx`
- `web/components/sections/platform/AidenOsLinks.tsx`
- `web/public/diagram-assets/aiden-os-center.svg`
- `.superpowers/sdd/factory-task-10-report.md`

## TDD evidence

### RED

Added the new component test first:

```bash
cd web && pnpm exec vitest run components/diagrams/__tests__/AidenOsDiagram.test.tsx
```

Observed failure:

- `Failed to resolve import "../AidenOsDiagram"`

Why it failed:

- The new diagram contract existed in tests, but `AidenOsDiagram.tsx` had not been created yet.

### GREEN

Implemented the minimum owned change set:

- created `AidenOsDiagram.tsx`
- grounded the SVG in Figma metadata and sublayer design context
- moved wrapped body copy through `DiagramText` with explicit widths and `maxLines`
- preserved existing callers through a wrapper and then switched the owned section to import `AidenOsDiagram` directly

Focused verification:

```bash
cd web && pnpm exec vitest run components/diagrams/__tests__/AidenOsDiagram.test.tsx components/diagrams/__tests__/AidenOsLinksDiagram.test.tsx components/sections/platform/__tests__/AidenOsLinks.test.tsx
```

Result:

- `3` files passed
- `20` tests passed

## Verification commands

Focused Task 10 tests:

```bash
cd web && pnpm exec vitest run components/diagrams/__tests__/AidenOsDiagram.test.tsx components/diagrams/__tests__/AidenOsLinksDiagram.test.tsx components/sections/platform/__tests__/AidenOsLinks.test.tsx
```

Result:

- `3` files passed
- `20` tests passed

## Review follow-up

- Re-queried Figma node `1:8708` and its missing left-side vector sublayers `1:13674` and `1:13675`.
- Downloaded the exact vector assets to `web/public/diagram-assets/aiden-os-left-top-frame.svg` and `web/public/diagram-assets/aiden-os-left-side-frame.svg`, then mounted them as SVG `<image>` nodes on the fixed deck layout instead of recreating the frame lines by hand.
- Restored `AidenOsLinksDiagram`'s legacy `aidenOs` and `productLinks` prop contract so compatibility is content-driven again, not import-path-only.
- Kept the live platform section on `AidenOsDiagram`, but restored the dropped `aidenOs.body`, feature cards, and roadmap content in `AidenOsLinks.tsx` so current content is not silently discarded.

Follow-up RED:

- `AidenOsDiagram.test.tsx` failed because the left-side frame assets were missing.
- `AidenOsLinksDiagram.test.tsx` failed because the thin wrapper ignored distinctive legacy props.

Follow-up GREEN:

- Added the exact left-side frame assets from Figma to `AidenOsDiagram.tsx`.
- Reinstated the legacy content-driven `AidenOsLinksDiagram` implementation.
- Added a section-level regression that fails if the live platform body, governance, and roadmap content disappear again.

Project checks:

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
```

Result:

- `pnpm typecheck` passed
- `pnpm test` passed with `61` files and `257` tests green
- `pnpm build` passed on Next.js `16.3.1`

## Concerns

- The dense left binary texture frame `1:8713` still overflowed `get_design_context`, so the binary field remains a measured reconstruction from the source grid spacing while the surrounding frame vectors and center mark now come from exact exported assets.
- A scoped Torbit reindex was attempted once on `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t10-aiden-os` and failed with DuckDB deserialization (`field id mismatch, expected: 100, got: 26117`). The branch is still validated by direct file search and the full local test/build pass.
- `web/tsconfig.tsbuildinfo` was refreshed by verification commands. It is outside Task 10 ownership and should stay out of the commit unless explicitly requested.
