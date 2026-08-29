# Design: Pixel-perfect CYfSl landing (full regenerate)

**Date:** 2026-08-29  
**Status:** Approved for planning (Approach B)  
**Source of truth:** Pencil frame `CYfSl` — Web Shelf — Home [Dark] in `Stack_Linear.pen`  
**Skill path:** using-superpowers → brainstorming → writing-plans → pencil-to-code (Path B) → verification-before-completion  

## Locked decisions

1. **Approach B — full regenerate.** Rebuild the landing from the live `CYfSl` tree via `/pencil-to-code`. Do not surgically patch the old shelf components as the primary path.
2. **Dark only.** No light theme, no `LexRf`, no theme toggle.
3. **Single page.** `/` is the only product surface for this pass. Remove code not needed for the replica.
4. **No canvas edits.** Read `.pen` via Pencil MCP only; do not mutate `Stack_Linear.pen` as part of export.
5. **Deploy path unchanged.** Keep existing Docker multi-stage + compose profiles serving `http://localhost:3000`.

## Deploy context (reference)

| Piece | Detail |
|-------|--------|
| App | `web/` Next.js App Router, `output: "standalone"` |
| Dockerfile | `deps` → `builder` (`pnpm build`) → `runner` (non-root `nextjs`, port 3000, healthcheck `/`) |
| Compose | Root `docker-compose.yml`: `web-prod` profile `prod` (runner); `web-dev` profile `dev` (`pnpm dev`) |
| Demo | `docker compose --profile prod up --build` → `http://localhost:3000` |
| Sibling note | `stackgen-vibe-ux` local Docker uses `:3001` so it does not collide with website `:3000` |

## Architecture

### Keep (infra shell)

- `web/Dockerfile`, root `docker-compose.yml`
- `web/next.config.ts` (`standalone`)
- Package manager / Vitest / typecheck tooling
- `public/` assets actually referenced by `CYfSl` (prune unused after regenerate)

### Regenerate

- `app/layout.tsx` — fixed dark; Inter + JetBrains Mono; no ThemeProvider / theme-init
- `app/globals.css` — dark `ds-*` tokens only (CYfSl fill `#0B0C0E`)
- `app/page.tsx` — composition of eight canvas sections in canvas order
- New components under `web/components/cyfsl/` built from Pencil tree

### Delete

- ThemeProvider, ThemeToggle, `public/theme-init.js`, light CSS / LexRf maps
- `HomeShelfPage` and `components/sections/home/shelf/*`
- Unused motion/primitives not imported by the new tree
- BeforeAfter and any section not in the eight-node list
- Old content/tests for light theme or deleted sections

## Component tree

```
app/page.tsx
└── CyfslHome (main, data-pencil-id="CYfSl")
    ├── CyfslNav        ← cYtoM
    ├── CyfslHero       ← PzSjX
    ├── CyfslVideo      ← coT3f
    ├── CyfslLogos      ← TKCFb
    ├── CyfslAssemblies ← C2kYT
    ├── CyfslShell      ← V2P0L
    ├── CyfslWhoItsFor  ← ck4Dy
    └── CyfslFooter     ← Wp1Dh
```

### Canvas section map (live tree, 2026-08-29)

| Order | Pencil ID | Name |
|------:|-----------|------|
| 1 | `cYtoM` | Nav |
| 2 | `PzSjX` | Hero |
| 3 | `coT3f` | Video Section |
| 4 | `TKCFb` | Logos Section |
| 5 | `C2kYT` | Assemblies Section |
| 6 | `V2P0L` | Shell |
| 7 | `ck4Dy` | Who Its For Section |
| 8 | `Wp1Dh` | Footer — Home Dark |

Frame: width 1440, layout vertical, fill `#0B0C0E`. Desktop-only (`min-width: 1440px`).

## Generation method (pencil-to-code Path B)

Pencil MCP is reduced surface: `execute`, `get_app_state`, `get_style`, `read_skill` — no named `batch_get` / `get_screenshot` tools.

1. `get_app_state` / `read_skill("execute.md")` for API.
2. Per section: `Get(sectionId, { depth, resolveVariables: true, resolveInstances: true })` via `execute`.
3. Map nodes → React + Tailwind (frames → flex/grid, text → semantic tags, fills → CSS vars / classes).
4. Shared micro-pieces only when repeated on canvas (logo mark, primary pill CTA). No speculative library.
5. Copy verbatim from canvas text nodes.
6. Complex diagram regions in Assemblies/Shell: export PNG/SVG when vector React would be huge; section chrome stays React.
7. Validate with `TakeScreenshot` in `execute` vs browser at `:3000`.

## Tokens

- Source: Pencil `GetVariables()` — use dark theme values of `ds-*` (and any section-local vars resolved on `CYfSl`).
- Fonts: Inter (`ds-font-sans`), JetBrains Mono (`ds-font-mono`).
- Pad: `ds-pad-x` / `ds-pad-y` as used by sections; do not add extra page padding beyond canvas.

## Data & assets

- Static only — no CMS.
- Images under `public/` matching canvas fills / media.
- Optional thin `content/cyfsl.ts` if it keeps components readable; otherwise inline from export.

## Out of scope

- Mobile / responsive breakpoints
- Motion beyond canvas-implied structure (can follow later)
- Editing `Stack_Linear.pen`
- Rebuilding non-home product/platform routes

## Verification

1. Pencil `TakeScreenshot` of `CYfSl` and/or each section.
2. `docker compose --profile prod up --build` → `http://localhost:3000`.
3. Browser screenshot vs Pencil; fix mismatches.
4. `pnpm typecheck` and `pnpm test` (smoke: eight `data-pencil-id`s, dark-only root).

## Success criteria

- `/` is a dark-only replica of `CYfSl` in canvas section order.
- No theme toggle / light mode.
- Unused shelf/theme code removed.
- Prod container serves the page on `:3000`.
- Visual parity claimed only with screenshot evidence.

## Risks

| Risk | Mitigation |
|------|------------|
| Huge Assemblies/Shell trees | Export diagram regions to PNG/SVG; keep chrome in React |
| Token drift vs legacy CSS | Re-extract dark `ds-*` from Pencil at generate time |
| Accidental canvas edits | Read-only pencil-to-code; no `.pen` mutations |

## Skills inventory for implementation

| Skill | Role |
|-------|------|
| pencil-to-code | Design → React/Tailwind from `CYfSl` |
| writing-plans / executing-plans | Implementation plan + execution |
| verification-before-completion | Evidence before done |
| test-driven-development | Smoke tests for replica |
| ponytail | Delete unused code aggressively |
| using-superpowers | Process gate |

Optional catalog skill (`corlab-tech/skills@pixel-perfect-ui`) not required; pencil-to-code covers the export path.
