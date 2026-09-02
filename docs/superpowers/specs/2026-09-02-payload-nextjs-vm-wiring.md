# Payload ↔ Next.js wiring on GCP VM (authoritative)

**Target:** `stackgen-web-vm` @ `http://34.143.68.214:3000`  
**Sources:** [Payload Installation](https://payloadcms.com/docs/getting-started/installation), [Local API](https://payloadcms.com/docs/local-api/overview), [Production Deployment](https://payloadcms.com/docs/production/deployment) (scraped via Firecrawl 2026-09-02)

## Official pattern: embedded Payload in Next.js

Payload 3.x runs **inside the same Next.js process** — not a separate CMS service.

| Requirement (Payload docs) | This repo |
|----------------------------|-----------|
| `(payload)` route group under `app/` with admin + REST routes | `web/app/(payload)/` |
| `withPayload()` in `next.config` | `web/next.config.ts` |
| Postgres adapter + `DATABASE_URL` | `web/payload/payload.config.ts` |
| `PAYLOAD_SECRET` (long, stable in prod) | GCP Secret Manager via `scripts/lib/secrets.sh` |
| `serverURL` for admin links / auth | `PAYLOAD_PUBLIC_SERVER_URL` env |
| `output: 'standalone'` + Docker for self-host | `web/Dockerfile`, `stack/docker-compose.vm.yml` |
| Persistent volume for uploads | `payload-media` Docker volume |
| **Local API** in React Server Components | `getPayload({ config })` in `web/lib/payload-cms.ts` |

Payload explicitly recommends Local API over HTTP for RSC:

> *"With other headless CMS, you need to request your data from third-party servers via HTTP… With Payload, you don't have to leave your server."*  
> — [Local API overview](https://payloadcms.com/docs/local-api/overview)

## Data flow (site pages)

```
app/(site)/page.tsx
  → getOverlayReplicaContent()          [web/lib/cms.ts]
  → payload.findGlobal('home') + find(cards)   [web/lib/payload-cms.ts]
  → overlayReplicaContent(home, cards)  [web/lib/cms-overlay.ts]
  → merges onto replica.ts defaults
  → HomeReplica
```

Product pages: `getOverlayProductContent(slug)` → `products`, `cards`, `faqs` collections.

**No `CMS_PROVIDER` toggle** — Payload is enabled when `DATABASE_URL` + `PAYLOAD_SECRET` are set (`isPayloadCmsEnabled()`).

## GCP VM env (docker-compose.vm.yml)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | `postgresql://payload:…@postgres:5432/payload` |
| `PAYLOAD_SECRET` | JWT/cookie signing (stable across deploys) |
| `PAYLOAD_PUBLIC_SERVER_URL` | Public origin (`http://<VM_IP>:3000`) |
| `NEXT_PUBLIC_SERVER_URL` | Same as above for client |

## Migrations + seed (production)

Payload Postgres uses **`prodMigrations`** in config (runs on app boot in standalone image).

Initial **content** is not auto-seeded. After first deploy:

```bash
gcloud auth login   # if token expired
./scripts/seed-payload-vm.sh
```

Script opens a lightweight Postgres bridge on the VM, port-forwards to localhost, and runs `payload migrate` + `pnpm seed:app` **locally** (avoids OOM on e2-micro from on-VM `pnpm install`).

Seed source: `web/content/replica.ts` + `web/content/products.ts` → collections `home` (global), `cards`, `products`, `faqs`, `posts`.

## Verify wiring

```bash
# Collections populated
gcloud compute ssh stackgen-web-vm --zone=us-west1-b --project=propane-galaxy-498403-n8 \
  --command='sudo docker exec stackgen-stack-postgres-1 psql -U payload -d payload -c "SELECT COUNT(*) FROM products;"'

# Admin
open http://34.143.68.214:3000/admin

# Local API path (edit hero in admin → revalidate → homepage reflects change)
curl -s http://34.143.68.214:3000/ | grep -o 'Outcomes, not agents' || true
```

## What was already done vs remaining

| Status | Item |
|--------|------|
| ✅ | Embedded Payload routes, plugin, Postgres, Docker standalone |
| ✅ | VM deploy script sets env from Secret Manager |
| ✅ | RSC pages call Local API |
| ✅ | `scripts/seed-payload-vm.sh` created |
| ⏳ | Run seed (blocked on `gcloud auth login` in agent session) |
| ⏳ | Confirm homepage reads CMS after seed |
