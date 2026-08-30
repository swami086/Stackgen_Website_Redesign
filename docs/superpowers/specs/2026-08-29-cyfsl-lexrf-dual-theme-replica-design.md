# Design: 100% Pencil Home Replica (CYfSl + LexRf)

**Date:** 2026-08-29  
**Status:** Approved direction from user (supersedes `2026-08-29-cyfsl-pixel-perfect-replica-design.md`)  
**Problem:** Current Next.js landing is not a pixel-faithful replica. Partial regenerate + PNG fallbacks drifted from canvas. Progress via sequential SDD was too slow.  
**Source of truth:** Live Pencil frames in `Stack_Linear.pen` only:
- Dark: `CYfSl` — Web Shelf — Home [Dark] (fill `#0B0C0E`)
- Light: `LexRf` — Web Shelf — Home [Light] (fill `#FCFCFD`)

## Locked decisions

1. **Wipe and rebuild.** Delete all current marketing UX under `web/` that is not required for Next/Docker bootstrap (including `components/cyfsl/**`, old shelf, motion-heavy leftovers, stale content). Do not patch the failed partial replica.
2. **Both themes.** Single route `/` with theme toggle: dark tree mirrors `CYfSl`, light tree mirrors `LexRf`. Tokens from Pencil `ds-*` light/dark. Persist preference (`localStorage` key `stackgen-theme`). Default **dark** (matches primary shelf).
3. **100% replica.** Layout, spacing, type, color, borders, radii, and section order must match canvas. Prefer structural React from Pencil trees; Export PNG/SVG only for irreducible diagram subtrees, then size them to canvas bounds.
4. **No canvas edits.** Pencil MCP read-only (`Get`, `Print`, `TakeScreenshot`, `Export`). Never mutate `Stack_Linear.pen`.
5. **Docker is the deliverable surface.** Keep/fix `web/Dockerfile` + root `docker-compose.yml`; demo via `docker compose --profile prod up --build` → `http://localhost:3000`.
6. **Parallel execution.** Implementation runs as parallel Composer 2.5 workers (see plan), not sequential one-section-at-a-time SDD.

## Supersession

| Prior | Now |
|-------|-----|
| Dark-only, no LexRf, no toggle | Dark + light + toggle |
| Surgical/full regenerate of CYfSl only | Full wipe of UX; rebuild both frames |
| Sequential subagent-driven tasks | Parallel waves with Composer 2.5 |
| Accept PNG-heavy approximations without parity gate | Parity gate: Pencil screenshot vs browser for both themes |

Prior plan `docs/superpowers/plans/2026-08-29-cyfsl-pixel-perfect-replica.md` and SDD ledger Tasks 1–7 are **abandoned** for delivery (working tree may be deleted in Wave 0).

## Live canvas section maps (2026-08-29)

### Dark `CYfSl` (1440 wide)

| # | ID | Name |
|---|----|------|
| 1 | `cYtoM` | Nav |
| 2 | `PzSjX` | Hero |
| 3 | `coT3f` | Video |
| 4 | `TKCFb` | Logos |
| 5 | `C2kYT` | Assemblies |
| 6 | `V2P0L` | Shell |
| 7 | `ck4Dy` | Who It's For |
| 8 | `Wp1Dh` | Footer — Home Dark |

### Light `LexRf` (1440 wide)

| # | ID | Name |
|---|----|------|
| 1 | `e3z1q` | Nav |
| 2 | `W1CQS` | Hero |
| 3 | `NohsW` | Video |
| 4 | `QKd6D` | Logos |
| 5 | `oWWUj` | Assemblies |
| 6 | `HSHAw` | Shell |
| 7 | `K4v7zT` | Who It's For |
| 8 | `Svtt6` | Footer — Home Light |

**Do not use** stale IDs from old `web/lib/shelf-frames.ts` (e.g. light `B9suO` / `pH0VX`) — they are obsolete.

## Architecture

```
app/layout.tsx          ThemeProvider + fonts + theme-init.js
app/globals.css         ds-* light (:root) + dark ([data-theme=dark])
app/page.tsx            <HomeReplica />
components/replica/
  HomeReplica.tsx       picks dark|light section ids via theme
  theme/                ThemeProvider, ThemeToggle
  shared/               Logo, PrimaryPill (token-driven; no hard-coded theme forks)
  sections/
    Nav.tsx             props: frameId + content keyed by theme
    Hero.tsx
    Video.tsx
    Logos.tsx
    Assemblies.tsx
    Shell.tsx
    WhoItsFor.tsx
    Footer.tsx
content/replica.ts      Verbatim copy + asset paths for dark + light
lib/replica-frames.ts   Live ID maps above
public/media/replica/   Exported diagram assets (both themes if needed)
```

**Theme model:** One React tree; CSS variables swap with `data-theme`. Section components read measurements from content/layout constants extracted per theme when light/dark geometry differs; prefer shared structure when trees are isomorphic.

## Wipe list (Wave 0)

Delete or replace:

- `web/components/cyfsl/**`
- `web/components/home/**`
- `web/components/sections/**` (shelf and legacy)
- Unused `web/components/motion/**` not required for replica
- Stale `web/content/home-shelf.ts`, old product/platform content if unused
- Stale tests tied to partial cyfsl / shelf
- Rebuild `ThemeProvider` / `ThemeToggle` / `theme-init.js` cleanly (may replace existing)

**Keep:** `web/Dockerfile`, `docker-compose.yml`, `next.config.ts` (`standalone`), `package.json` toolchain, customer/integration logos under `public/logos/**` that canvas references.

## Generation method (pencil-to-code Path B)

Pencil MCP: `execute` / `get_app_state` / `read_skill` / `get_style`.

Per section (dark and light):

1. `Get(id, { depth, resolveVariables: true, resolveInstances: true })`
2. Map to React + Tailwind using `ds-*` tokens (never invent hex in components when a token exists)
3. `TakeScreenshot([id])` for reference
4. Dense diagrams: `Export([diagramId], "png", …)` → `public/media/replica/{theme}-{id}.png`, chrome in React

## Fidelity bar (“100% replica”)

Must hold for **both** themes at 1440px width:

- Section order identical to canvas
- Nav height 60; page `min-width: 1440px`
- Type sizes/weights/colors match resolved canvas values
- Padding/gap/radius/border match within 1–2px tolerance
- Copy verbatim (including canvas typos)
- Theme toggle present; no FOUC (`theme-init.js` before hydration)
- Docker prod serves `/` with toggle working

## Out of scope

- Non-home routes (product/platform/etc.)
- Mobile breakpoints
- Editing Pencil canvas
- Motion beyond canvas-implied structure

## Verification

1. Pencil screenshots: `CYfSl` + `LexRf` (+ per-section as needed)
2. `docker compose --profile prod up --build` → `:3000`
3. Browser dark + light screenshots vs Pencil
4. `pnpm typecheck` + `pnpm test` (frame ids, theme toggle, no LexRf/CYfSl mismatch)

## Success criteria

- `/` is a dual-theme, pixel-faithful replica of `CYfSl` / `LexRf`
- Prior partial UX removed
- Deliverable runs in Docker on port 3000
- Parity claimed only with screenshot evidence

## Skills

| Skill | Role |
|-------|------|
| using-superpowers / brainstorming | This spec |
| writing-plans | Parallel implementation plan |
| dispatching-parallel-agents | Wave execution |
| pencil-to-code | Design → code |
| verification-before-completion | Parity gate |
| ponytail | Aggressive deletion |

## Risks

| Risk | Mitigation |
|------|------------|
| Light/dark trees diverge | Per-theme content + layout constants; shared components only when isomorphic |
| Parallel agents conflict on files | One section file owner per wave; shared shell owned by Wave 0 only |
| PNG drift | Export at 2x; CSS width = canvas width; re-export if canvas changes |
| Slow sequential SDD | Parallel Composer 2.5 waves (see plan) |
