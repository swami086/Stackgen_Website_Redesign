# Factory Task 7 Report

## Scope

- Task: Wave 3 Task 7
- Worktree: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t7-problem`
- Branch: `factory-t7-problem`
- Component: `web/components/diagrams/ProblemDiagram.tsx`
- Figma source node: `1:7514`

## Torbit Evidence

- Indexed exact worktree path before querying: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t7-problem`
- Scoped manifest:
  - `repo_path`: `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/t7-problem`
  - `branch`: `factory-t7-problem`
  - `commit_sha`: `c9595fe8e569c652f0dbea1a92555a7ca188dfa2`
  - `status`: `indexed`
- Graph stats:
  - `directories`: 81
  - `files`: 335
  - `definitions`: 1760
  - `imported_symbols`: 744
  - `relationships`: 3725
- Scoped symbol counts:
  - `ProblemDiagram`: 1 definition, 2 importers
  - `DiagramText`: 1 definition, 10 importers
  - `Problem` section consumer: 1 definition, 2 importers
- Importer paths:
  - `ProblemDiagram`: `web/components/diagrams/__tests__/ProblemDiagram.test.tsx`, `web/components/sections/home/Problem.tsx`
  - `Problem`: `web/app/page.tsx`, `web/components/sections/home/__tests__/Problem.test.tsx`

## Figma Evidence

- `get_metadata` on `1:7514` confirmed the full slide frame is `1920x1080`.
- The actual diagram body used for the port came from nested frame `1:7519` at `x=241`, `y=258`, `width=1437.1736`, `height=696`.
- `get_design_context` supplied the slide structure:
  - left grounded creation panel `593x696`
  - centered gap group at `x=682`, `y=273.5`, `width=211.5`, `height=149`
  - right operations column at `x=982.5`, `y=100.6791`
- `get_screenshot` visually confirmed the source copy and hierarchy:
  - `Software Creation (Dev)`
  - `AI-Accelerated Speed`
  - `2X` / `PR Volume`
  - `Software Operations`
  - `1x` / `No Boost`
  - `AI Coding Assistants:`
  - `PR Acceleration:`
  - `Operations Stagnation:`
  - `Reliability Gap:`

## Implementation

- Replaced the prior home-problem SVG with a port anchored to the Figma body frame rather than the older `problem.json` evidence layout.
- Preserved public props and caller compatibility:
  - `className`
  - `titleId`
  - optional `citations`
- Applied the shared Wave 3 constraints:
  - one accessible `<svg>`
  - `role="img"` with `<title>` and `<desc>`
  - `aria-labelledby`
  - `data-ground="panel"`
  - real SVG text via `DiagramText`
  - explicit text widths and `maxLines` bounds
  - `data-part` hooks on animatable groups
  - no banned product names

## Tests And Verification

- Red step:
  - updated `web/components/diagrams/__tests__/ProblemDiagram.test.tsx` first
  - initial focused run failed on missing `data-ground="panel"` in the old implementation
- Focused green step:
  - `pnpm vitest run components/diagrams/__tests__/ProblemDiagram.test.tsx`
- Required verification:
  - `pnpm vitest run components/sections/home/__tests__/Problem.test.tsx`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
- Final results:
  - focused diagram tests: 8 passed
  - focused section tests: 2 passed
  - full suite: 60 files, 247 tests passed
  - typecheck: passed
  - build: passed

## Files Changed

- `web/components/diagrams/ProblemDiagram.tsx`
- `web/components/diagrams/__tests__/ProblemDiagram.test.tsx`

## Commit

- Requested message: `T7: port Problem diagram from deck slide 1`
- Hash: pending at report write time

## Concerns

- The port keeps the source geometry and copy hierarchy, but the tiny decorative icons and gap ticks are simplified SVG primitives rather than exported Figma asset vectors. The accessible structure, panel grounding, proportions, and text layout are preserved.
