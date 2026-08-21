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

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build (standalone output) |
| `pnpm start` | Run standalone server (`node server.js`) |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Vitest smoke tests |

## Theme

Light/dark via `data-theme` on `<html>`, persisted to `localStorage` key `stackgen-theme`. Pre-hydration script: `public/theme-init.js`.

## Docker (prod profile)

From repo root:

```bash
docker compose --profile prod up --build -d
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
docker compose --profile prod down
```

## Design tokens

CSS variables map Pencil `ds-*` tokens (light default, dark under `[data-theme="dark"]`). Source: `Stack_Linear.pen` via Pencil MCP `GetVariables()`.
