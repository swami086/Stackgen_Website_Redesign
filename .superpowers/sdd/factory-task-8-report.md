# Factory Task 8 Report

## Status

Completed.

## Summary

Ported `AdfLifecycleDiagram.tsx` from Figma node `1:13727` as the shared lifecycle source.

The Home page now renders the lifecycle once through `FactoryProcess`, and the prior duplicate `AdfLoop` section is removed from `web/app/page.tsx`. Compatibility wrappers keep `AdfLoopDiagram` and `FactoryProcessDiagram` import paths alive while routing both to the new component.

## Torbit Evidence

- Indexed exact worktree: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t8-adf`
- Manifest scope verified for branch `factory-t8-adf`
- Torbit project id: `589369741720766008`

Symbol counts from the indexed worktree:

- `AdfLifecycleDiagram`: `0` definitions, `0` importer files before implementation
- `AdfLoopDiagram`: `1` definition, `2` importer files before implementation
- `FactoryProcessDiagram`: `1` definition, `2` importer files before implementation
- `AdfLoop`: `1` definition, `2` importer files before implementation
- `FactoryProcess`: `1` definition, `2` importer files before implementation
- `DiagramText`: `1` definition, `10` importer files before implementation

Importer files observed before the port:

- `AdfLoopDiagram` → `web/components/sections/home/AdfLoop.tsx`, `web/components/diagrams/__tests__/AdfLoopDiagram.test.tsx`
- `FactoryProcessDiagram` → `web/components/sections/home/FactoryProcess.tsx`, `web/components/diagrams/__tests__/FactoryProcessDiagram.test.tsx`
- `AdfLoop` → `web/app/page.tsx`, `web/components/sections/home/__tests__/AdfLoop.test.tsx`
- `FactoryProcess` → `web/app/page.tsx`, `web/components/sections/home/__tests__/FactoryProcess.test.tsx`

## Figma Evidence

- Node: `1:13727`
- Source frame: `1920 x 1080`
- Ported lifecycle band geometry came from the card row frame `1:13732`
- Card row bounds: `x=123`, `y=303`, `width=1674`, `height=330`
- Step cards: four cards at `396 x 335` with x-origins `0`, `426`, `852`, `1278` inside the row
- Shared inner text box width: `322`
- Source screenshot reviewed for visual order, chip colors, and connector stacks

Copy ported from the source node:

- `Intent`
- `Factory Spec`
- `Factory Runtime`
- `Factory Learning`

## TDD Evidence

Red first:

- Added `web/components/diagrams/__tests__/AdfLifecycleDiagram.test.tsx`
- Updated `web/app/__tests__/routes.test.tsx` to require one lifecycle section and absence of the old loop heading
- Focused red run failed for the expected reasons:
  - missing module `../AdfLifecycleDiagram`
  - Home still rendered `Build, Operate, observe, remediate.`

Green:

- Implemented `web/components/diagrams/AdfLifecycleDiagram.tsx`
- Routed `FactoryProcessDiagram` and `AdfLoopDiagram` through thin compatibility wrappers
- Removed the rendered `AdfLoop` section from `web/app/page.tsx`
- Updated `home.factoryProcess.steps` to the Figma source copy
- Focused green run passed after aligning the legacy wrapper tests to the new `title + desc` accessibility contract

## Verification

Focused tests:

```text
pnpm vitest run components/diagrams/__tests__/AdfLifecycleDiagram.test.tsx app/__tests__/routes.test.tsx components/diagrams/__tests__/FactoryProcessDiagram.test.tsx components/diagrams/__tests__/AdfLoopDiagram.test.tsx
4 passed, 22 passed
```

Typecheck:

```text
pnpm typecheck
tsc --noEmit
```

Full tests:

```text
pnpm test
61 passed, 253 passed
```

Build:

```text
pnpm build
Next.js production build passed
```

IDE diagnostics:

- `ReadLints` returned no linter errors on the touched files

## Commit

- Requested commit message: `T8: port ADF lifecycle diagram from deck slide 12`

## Concerns

- The site component follows the existing project pattern where the section heading stays in DOM chrome and the SVG is cropped to the lifecycle panel itself, rather than re-rendering the slide title row inside the diagram. This preserves existing Home section semantics and avoids duplicating the heading in both DOM and SVG.
