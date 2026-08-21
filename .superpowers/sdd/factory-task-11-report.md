# Factory Task 11 Report

## Scope

Wave 3 Task 11 updated the product mechanism diagrams in the isolated worktree `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t11-mechanisms` on branch `factory-t11-mechanisms`.

- Ported `AutomationMechanism` from Figma node `1:14411` (deck slide 9) into one accessible SVG using approved product naming.
- Ported `InfrastructureMechanism` from Figma node `1:8591` (deck slide 10) into one accessible SVG using approved product naming.
- Ported `SreMechanism` from Figma node `1:8055` (deck slide 8) into one accessible SVG using approved product naming.
- Kept `ObservabilityMechanism` on its existing geometry and restyled it to the panel/plate language instead of inventing a new deck diagram.
- Preserved existing public props and `ProductMechanism` compatibility.

## Torbit

Torbit was re-indexed against the exact worktree before any graph queries:

- Repo path: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t11-mechanisms`
- Branch: `factory-t11-mechanisms`
- Project id: `8744835046705064758`
- Graph stats: `81` directories, `335` files, `1656` definitions, `742` imported symbols, `3603` relationships

Definitions by file:

- `web/components/diagrams/product/AutomationMechanism.tsx`: `30`
- `web/components/diagrams/product/InfrastructureMechanism.tsx`: `21`
- `web/components/diagrams/product/SreMechanism.tsx`: `75`
- `web/components/diagrams/product/ObservabilityMechanism.tsx`: `69`
- `web/components/sections/product/ProductMechanism.tsx`: `12`
- `web/components/diagrams/DiagramText.tsx`: `48`
- `web/app/product/[slug]/page.tsx`: `13`

Importer counts:

- `AutomationMechanism`: `2`
- `InfrastructureMechanism`: `2`
- `SreMechanism`: `2`
- `ObservabilityMechanism`: `2`
- `ProductMechanism`: `2`
- `DiagramText`: `10`

Observed product-page consumer:

- `web/app/product/[slug]/page.tsx` imports `ProductMechanism`

Observed mechanism caller:

- `web/components/sections/product/ProductMechanism.tsx` imports all four mechanism diagrams

## Figma Sources

Used Figma MCP metadata, design context, and screenshot capture for each deck-sourced slide:

- `1:8055` - SRE slide 8
  - Confirmed exact ladder labels: `Infra Drift Present`, `P1 Alert Fires`, `Root Cause Established`, `Remediation Deployed`, `Service Restored`
  - Confirmed right-column labels: `Infrawatch`, `ChangeCorrelation`, `RootCause`, `Remediation`, `DeployAgent`, `Verification`
  - Confirmed footer copy: `OCG - Operational Context Graph`, `Temporal orchestrates sequencing`, `OPA enforces policy at each action boundary`
- `1:14411` - Automation slide 9
  - Confirmed exact pipeline and metric labels
  - Noted legacy deck name `Aiden for DevOps`; port normalized to approved site name `Aiden for Automation`
- `1:8591` - Infrastructure slide 10
  - Confirmed callouts `IaC Translation`, `Performance Baselines`, `Threshold Rollbacks`
  - Confirmed pipeline/footer labels `Policy-Bounded Migration Pipeline`, `Timeline Compression`, `6→9`, `Months`
  - Noted legacy deck name `InfraOps & Migration`; port normalized to approved site name `Aiden for Infrastructure`

## TDD Log

Tests were written first and used as the red-state gate.

1. Existing stricter tests for:
   - `AutomationMechanism`
   - `InfrastructureMechanism`
   - `SreMechanism`
   - `ObservabilityMechanism`
2. Red captured:
   - Initial focused SRE/Observability run failed on missing `data-ground`, outdated SRE labels/product lockup, and missing wrapped text coverage.
3. Minimal implementation:
   - Replaced old geometry-driven `AutomationMechanism`, `InfrastructureMechanism`, and `SreMechanism` with direct SVG ports matched to the deck structures.
   - Kept `ObservabilityMechanism` structure and applied panel-ground restyle only.
4. Green:
   - Focused mechanism suites passed before full verification.

## Verification

Focused mechanism suites:

```bash
pnpm test "components/diagrams/product/__tests__/AutomationMechanism.test.tsx" \
  "components/diagrams/product/__tests__/InfrastructureMechanism.test.tsx" \
  "components/diagrams/product/__tests__/SreMechanism.test.tsx" \
  "components/diagrams/product/__tests__/ObservabilityMechanism.test.tsx"
```

Final verification:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Results:

- Focused suites: `36/36` tests passed
- Full test suite: `60` files, `258/258` tests passed
- Typecheck: passed
- Build: passed

## Files Changed

- `web/components/diagrams/product/AutomationMechanism.tsx`
- `web/components/diagrams/product/InfrastructureMechanism.tsx`
- `web/components/diagrams/product/SreMechanism.tsx`
- `web/components/diagrams/product/ObservabilityMechanism.tsx`
- `web/components/diagrams/product/__tests__/AutomationMechanism.test.tsx`
- `web/components/diagrams/product/__tests__/InfrastructureMechanism.test.tsx`
- `web/components/diagrams/product/__tests__/SreMechanism.test.tsx`
- `web/components/diagrams/product/__tests__/ObservabilityMechanism.test.tsx`

## Commit

Requested commit message:

`T11: port product mechanisms from deck slides 8 to 10`

## Concerns

- `web/tsconfig.tsbuildinfo` changed as a side effect of verification and was intentionally left out of the task scope / commit.
- The Automation and Infrastructure deck frames use legacy deck naming; code ports intentionally use the approved product names required by the site content contract.

## Review Fix Addendum

2026-08-21 review-fix pass for branch `factory-t11-mechanisms`:

- Replaced the remaining hand-estimated `1240x820` viewBoxes in `AutomationMechanism`, `InfrastructureMechanism`, and `SreMechanism` with source-derived cropped bounds from Figma nodes `1:14411`, `1:8591`, and `1:8055`.
- Renamed the SRE ladder motion hook from `automation-ladder` to `investigation-ladder`.
- Routed the SRE incident/footer body-copy blocks through `DiagramText` with explicit widths and line budgets, while preserving the existing `ObservabilityMechanism` implementation unchanged in structure.
- Added regression coverage for source-derived viewBoxes, the truthful SRE hook name, and bounded wrapped text.

Scoped Torbit reindex attempt:

- `user-torbit.index` against `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t11-mechanisms` failed once with a shared DuckDB deserialization error: `Serialization Error: Failed to deserialize: field id mismatch, expected: 100, got: 26117`.
- Left as a known external/tooling issue after the single required attempt.

Verification for the review-fix pass:

- Focused mechanism suites: `33/33` tests passed
- Final verification: `pnpm typecheck`, full `pnpm test`, and `pnpm build` all passed
- Full test suite after the regression additions: `60` files, `263/263` tests passed
