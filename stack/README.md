# StackGen site + embedded Payload

Payload CMS runs **inside** the Next.js `web` app (same process). Compose only runs Postgres + web.

## Architecture

```
Browser ──► web:3000 (/  ·  /admin  ·  /api/*)
                │
                └──► postgres:5432
```

| Service | Role | Image |
|---------|------|-------|
| `postgres` | Payload database | `postgres:16-alpine` |
| `web` | Public site + Payload admin | `../web/Dockerfile` (`runner`) |

## Local (Docker Compose)

```bash
cp stack/.env.example stack/.env
# edit POSTGRES_PASSWORD and PAYLOAD_SECRET

docker compose -f stack/docker-compose.yml up --build -d
# Site:  http://127.0.0.1:3000
# Admin: http://127.0.0.1:3000/admin
```

Seed CMS content (Postgres published on host `:5433`):

```bash
./stack/seed-local.sh
# or: cd web && DATABASE_URL=postgresql://payload:<pw>@127.0.0.1:5433/payload pnpm seed:app
```

## GKE (`stackgen-web`, us-west1-b)

```bash
./scripts/deploy-payload-gke.sh   # Postgres PVC + Deployment only
./scripts/deploy-web-gke.sh       # Next app with embedded Payload
# or: ./scripts/deploy-stack-gke.sh
```

| Workload | Service type | Purpose |
|----------|--------------|---------|
| `stackgen-payload-db` + PVC | ClusterIP | Postgres |
| `stackgen-web` | LoadBalancer | Public site + `/admin` |

Web secret holds `DATABASE_URL` + `PAYLOAD_SECRET`. Seed via `./scripts/seed-payload-gke.sh`.

## Git

This repo root is already a git repository. **`stack/` is part of the monorepo** — do not `git init` a nested repo here.
