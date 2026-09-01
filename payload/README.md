# StackGen Payload CMS

Official [with-postgres](https://github.com/payloadcms/payload/tree/main/templates/with-postgres) template (Payload 3.88 + Next.js 16 + Postgres 16).

## Local (Docker Compose)

Website prod stays on `:3000`. Payload admin: **http://127.0.0.1:3002/admin**

```bash
cp .env.example .env   # set PAYLOAD_SECRET (long random string)
docker compose up -d
```

First visit `/admin` → create first user. Compose uses `pnpm dev` (official template pattern).

## GKE (`stackgen-web`, us-west1-b)

Manifest: `k8s/payload.yaml`. Deploy script: `scripts/deploy-payload-gke.sh`

Production image uses Next `standalone` + `prodMigrations` (official production path — no `push: true`).

Public admin: HTTP LoadBalancer on port **80** (set `PAYLOAD_PUBLIC_SERVER_URL` after IP is assigned).

```bash
./scripts/deploy-payload-gke.sh
```

Fresh DB: delete PVCs `stackgen-payload-pgdata` and `stackgen-payload-media`, redeploy.

## Notes

- `allowedDevOrigins` in `next.config.ts` for local `:3002` vs container `localhost`
- `src/app/(payload)/layout.tsx` must match v3.88 exports (`handleServerFunctions`, `RootLayout` only)
- Not wired into `web/` yet (Webflow CMS overlay remains)
