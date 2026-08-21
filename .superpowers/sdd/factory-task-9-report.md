# Factory Task 9 Report

## Status

- `completed`
- Ported `OperationalContextGraph.tsx` from Figma node `1:7929` into a Figma-derived SVG implementation.
- Preserved the public `variant` prop and both existing importers: home teaser plus platform full diagram.
- Replaced the old page-sized platform geometry and stale copy with the Figma slide-7 bounds and card text.

## Skills and guidance read

- `/Users/swami/.claude/skills/figma-design-to-code/SKILL.md`
- `superpowers:test-driven-development`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`

## Torbit verification

### Scoped manifest

Query:

```sql
SELECT repo_path, project_id, branch, status, parent_repo_path, commit_sha
FROM _orbit_manifest
WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t9-ocg';
```

Result:

- `repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t9-ocg`
- `project_id`: `5470801740172463133`
- `branch`: `factory-t9-ocg`
- `status`: `indexed`
- `parent_repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign`
- `commit_sha`: `c9595fe8e569c652f0dbea1a92555a7ca188dfa2`

The exact isolated worktree was indexed first, then all symbol queries were scoped to that manifest entry only.

### Definitions and importer counts

Query:

```sql
WITH scoped_project AS (
  SELECT project_id
  FROM _orbit_manifest
  WHERE repo_path = '/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t9-ocg'
  LIMIT 1
)
SELECT symbol, kind, count(*) AS count
FROM (
  SELECT name AS symbol, 'definitions' AS kind
  FROM gl_definition
  WHERE project_id = (SELECT project_id FROM scoped_project)
    AND name IN (
      'OperationalContextGraph',
      'DiagramText',
      'OperationalContextGraphSection',
      'PlatformContextGraphSection'
    )
  UNION ALL
  SELECT identifier_name AS symbol, 'imports' AS kind
  FROM gl_imported_symbol
  WHERE project_id = (SELECT project_id FROM scoped_project)
    AND identifier_name IN (
      'OperationalContextGraph',
      'DiagramText',
      'OperationalContextGraphSection',
      'PlatformContextGraphSection'
    )
) grouped
GROUP BY symbol, kind
ORDER BY symbol, kind;
```

Result:

- `DiagramText`: `1` definition, `10` imports
- `OperationalContextGraph`: `1` definition, `3` imports
- `OperationalContextGraphSection`: `1` definition, `2` imports
- `PlatformContextGraphSection`: `1` definition, `2` imports

### Importer locations

- `OperationalContextGraph`
  - `web/components/diagrams/__tests__/OperationalContextGraph.test.tsx`
  - `web/components/sections/home/OperationalContextGraphSection.tsx`
  - `web/components/sections/platform/PlatformContextGraphSection.tsx`
- `DiagramText`
  - `web/components/diagrams/AdfLoopDiagram.tsx`
  - `web/components/diagrams/AgenticOsDiagram.tsx`
  - `web/components/diagrams/FactoryProcessDiagram.tsx`
  - `web/components/diagrams/OperationalContextGraph.tsx`
  - `web/components/diagrams/ProblemDiagram.tsx`
  - `web/components/diagrams/TwoPlanesDiagram.tsx`
  - `web/components/diagrams/__tests__/DiagramText.test.tsx`
  - `web/components/diagrams/product/AutomationMechanism.tsx`
  - `web/components/diagrams/product/InfrastructureMechanism.tsx`
  - `web/components/diagrams/product/ObservabilityMechanism.tsx`
- `OperationalContextGraphSection`
  - `web/app/page.tsx`
  - `web/components/sections/home/__tests__/OperationalContextGraphSection.test.tsx`
- `PlatformContextGraphSection`
  - `web/app/platform/page.tsx`
  - `web/components/sections/platform/__tests__/PlatformContextGraphSection.test.tsx`

## Figma source

### Metadata

- Node: `1:7929`
- Slide title: `The Operational Context Graph (OCG)`
- Root frame: `1920 x 1080`
- Diagram group bounds: `1248.35205078125 x 555.1572265625`
- Platform cards:
  - `Infrastructure Topology`
  - `Change Attribution`
  - `Drift History`
  - `Incident Causality`
  - `Observability Correlations`
- Shared badge: `OCG Shared Intel`

### Design context application

- Treated Figma code as reference only, not pasted output.
- Adapted into the existing React + SVG + `DiagramText` pattern already used in `web/components/diagrams`.
- Kept real SVG text, explicit wrap widths, and `maxLines` bounds.
- Preserved a compact `home` teaser variant and an exact-bounds `platform` variant from the same source data.

### Screenshot observations

- The platform diagram is a dark panel with five equal satellite cards around a centered shared-intel plate.
- Geometry is symmetric and orthogonal, with a top badge, left/right horizontal connectors, and top/bottom vertical connectors.
- Copy is shorter and more literal than the previous site version, so the port uses the Figma card copy directly.

## Task 9-owned files changed

- `web/components/diagrams/OperationalContextGraph.tsx`
- `web/components/diagrams/__tests__/OperationalContextGraph.test.tsx`
- `.superpowers/sdd/factory-task-9-report.md`

Generated during verification but intentionally excluded from commit:

- `web/tsconfig.tsbuildinfo`

## TDD evidence

### RED

Focused test command:

```bash
cd web && pnpm test components/diagrams/__tests__/OperationalContextGraph.test.tsx
```

Observed failures before implementation:

- missing `data-ground="panel"` on the root SVG
- wrong platform `viewBox` (`0 0 1440 945` instead of Figma group bounds)
- old platform body copy instead of the Figma slide-7 text

### GREEN

Minimum implementation:

- removed the old geometry JSON dependency from `OperationalContextGraph.tsx`
- encoded Figma-derived platform coordinates and copy directly in the component
- rebuilt the platform variant around the exact diagram-group viewBox
- kept the `home` teaser variant, but rebuilt it from the same Figma source data
- added a single accessible SVG contract: `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, `data-ground="panel"`
- restored the consumer-facing `data-part="ocg-hub"` hook

Focused verification after the fix:

```bash
cd web && pnpm test components/diagrams/__tests__/OperationalContextGraph.test.tsx components/sections/home/__tests__/OperationalContextGraphSection.test.tsx components/sections/platform/__tests__/PlatformContextGraphSection.test.tsx
```

Result:

- `3` files passed
- `13` tests passed

## Verification commands

Focused suites:

```bash
cd web && pnpm test components/diagrams/__tests__/OperationalContextGraph.test.tsx components/sections/home/__tests__/OperationalContextGraphSection.test.tsx components/sections/platform/__tests__/PlatformContextGraphSection.test.tsx
```

- pass: `3` files, `13` tests

Required repo checks:

```bash
cd web && pnpm typecheck
cd web && pnpm test
cd web && pnpm build
```

- `pnpm typecheck`: pass
- `pnpm test`: pass (`60` files, `247` tests)
- `pnpm build`: pass (Next.js `16.3.1`)

## Commit

- requested commit message: `T9: port Operational Context Graph from deck slide 7`
- task report written before commit hash creation so the message, not the hash, is recorded here

## Notes

- The platform port now uses the Figma slide-7 card copy exactly, while the `home` variant remains a compact teaser for the homepage section contract.
- `web/tsconfig.tsbuildinfo` changed as a byproduct of repo verification and should stay out of the Task 9 commit.

## Fidelity fix follow-up

### Finding addressed

- Review flagged the central Shared Intel plate in `OperationalContextGraph.tsx` as manually approximated.
- Re-queried Figma node `1:7929` with `get_metadata`, `get_design_context`, and `get_screenshot` before editing.

### Torbit reindex attempt

- Required single scoped reindex attempt failed and was not retried:

```text
failed to open DuckDB: database error: Serialization Error: Failed to deserialize: field id mismatch, expected: 100, got: 26117: Serialization Error: Failed to deserialize: field id mismatch, expected: 100, got: 26117: Error code 1: Unknown error code
```

### Source-derived implementation

- Downloaded the exact Figma-exported Shared Intel internals into `web/public/diagram-assets/operational-context-graph/`.
- Replaced the hand-drawn rotated `rect` / `path` / `circle` center artwork with source-derived `<image>` layers for the three rotated stack plates plus the union and core glyph assets.
- Preserved the public `variant` prop, both section callers, one accessible root SVG, `DiagramText` bounds, `data-part` hooks, panel ground, naming, and the fixed layout.
- Adjusted the lower plate accent rail to include the missing measured segment from the Figma source.

### TDD evidence for the follow-up

#### RED

Focused test command:

```bash
cd web && pnpm test components/diagrams/__tests__/OperationalContextGraph.test.tsx
```

Observed failure before implementation:

- `shared-intel-stack-layer` count was `0` instead of `3`, proving the center plate still used approximated geometry

#### GREEN

Focused verification after the fix:

```bash
cd web && pnpm test components/diagrams/__tests__/OperationalContextGraph.test.tsx components/sections/home/__tests__/OperationalContextGraphSection.test.tsx components/sections/platform/__tests__/PlatformContextGraphSection.test.tsx
```

Result:

- `3` files passed
- `14` tests passed
