# StackGen Web — Dual-Theme Home Replica

Next.js App Router replica of Pencil frames `CYfSl` (dark) and `LexRf` (light) from `Stack_Linear.pen`. Single route with theme toggle.

## Prerequisites

- Node.js 24+
- pnpm (via `corepack enable`)

## Development

```bash
cd web
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker (prod demo)

From repo root (where `docker-compose.yml` lives):

```bash
docker compose --profile prod up --build
# open http://localhost:3000
```

Detached:

```bash
docker compose --profile prod up --build -d
```

Stop:

```bash
docker compose --profile prod down
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home replica — Pencil `CYfSl` (dark) / `LexRf` (light) |

Desktop-only scaffold: `min-width: 1440px`.

## Theme

Light/dark via `data-theme` on `<html>` (default **dark**). Toggle in the nav bar; preference persisted to `localStorage` key `stackgen-theme`. Pre-hydration: `public/theme-init.js`.

Pencil frame IDs switch with theme via `lib/replica-frames.ts` (`data-pencil-id` on each section).

## Tree

```
components/replica/
  HomeReplica.tsx
  theme/          ThemeProvider, ThemeToggle
  shared/         ReplicaLogo, ReplicaPrimaryPill
  sections/       Nav → Hero → Video → Logos → Assemblies → Shell → WhoItsFor → Footer
content/replica.ts
lib/replica-frames.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build (standalone output) |
| `pnpm start` | Run standalone server (`node server.js`) |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Vitest smoke tests |

## Design tokens

CSS variables map Pencil `ds-*` tokens (`:root` light + `[data-theme="dark"]`). Source: `Stack_Linear.pen` via Pencil MCP.

Spec: `docs/superpowers/specs/2026-08-29-cyfsl-lexrf-dual-theme-replica-design.md`

## Motion and material system

Motion tokens, easings, staggers, and ambient loop periods live in `lib/motion-tokens.ts`, harvested verbatim from Pencil node names in `Stack_Linear.pen`. Do not invent values there — update the canvas first, then re-harvest.

### Material tiers

| Tier | Utility | Where allowed |
|------|---------|---------------|
| **1 — Real glass** | `.glass-real` (`backdrop-filter: blur(24px)`, max 24px) | Fixed nav island over the hero substrate only; modal overlays |
| **2 — Specular glass** | `.glass-specular` (gradient stroke + fill, zero blur) | Default everywhere else: diagram shells, isometric layers, bento cells, pills |
| **3 — Radial glow** | Background-layer radial gradient (never `box-shadow`) | Exactly three surfaces: primary CTA, Context Graph hub core, nav island halo |

Nav crossfades Tier 1 → Tier 2 when scroll passes the hero (`data-nav-material` flips `glass` → `solid`).

### Seeded randomness

All stochastic rendering draws from `lib/seeded-random.ts` (`mulberry32`). **`Math.random` is banned** in diagram and motion code. Fixed seeds in `SEEDS` keep particle fields, integration scatter, and substrate variance byte-reproducible for screenshot parity.

### Scroll budget

Exactly **one pinned section** on the page: the Context Graph (`GPYOG` / `ContextGraph`). GSAP ScrollTrigger pins it with scrub; no other section may pin.

### Freezing motion for capture

Three hooks stack for deterministic Playwright frames:

1. **`data-motion-paused="true"`** on `<html>` — CSS in `globals.css` pauses all keyframes and transitions site-wide.
2. **`frozen` prop** on `ParticleField` — renders a single seeded snapshot instead of the live simulation.
3. **Fixed seeds** — pass explicit `seed` values (from `SEEDS` or a test constant) so the same tick count yields the same frame.

Wave 5's parity spec sets `data-motion-paused` in `addInitScript` before navigation.
