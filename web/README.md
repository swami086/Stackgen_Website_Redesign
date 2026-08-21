# StackGen Web (App Replica)

Next.js App Router port of StackGen App Replica frames from `Stack_Linear.pen`.

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

| Path |
|---|
| `/` |
| `/platform` |
| `/enterprise` |
| `/pricing` |
| `/news` |
| `/product/aiden-for-infrastructure` |
| `/product/aiden-for-automation` |
| `/product/aiden-for-observability` |
| `/product/aiden-for-sre` |

Desktop-only scaffold: `min-width: 1440px`.

## Theme

Light/dark via `data-theme` on `<html>` (default `light`). Toggle in the nav bar; preference persisted to `localStorage` key `stackgen-theme`. Pre-hydration: `public/theme-init.js`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build (standalone output) |
| `pnpm start` | Run standalone server (`node server.js`) |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Vitest smoke tests |

## Design tokens

CSS variables map Pencil `ds-*` tokens (light default, dark under `[data-theme="dark"]`). Source: `Stack_Linear.pen` via Pencil MCP `GetVariables()`.

Known parity gaps: `docs/superpowers/specs/2026-08-21-app-replica-parity-notes.md`.
