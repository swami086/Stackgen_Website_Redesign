# Puck + Payload POC

**Status:** Implemented (local validation)  
**Date:** 2026-09-02

## Goal

Prove [@delmaredigital/payload-puck](https://github.com/delmaredigital/payload-puck) integrates with the existing StackGen Next.js + Payload 3.88 stack without touching home/product/blog routes.

## Scope

| In | Out |
|----|-----|
| `pages` collection via plugin | Migrating homepage/products |
| `/puck-demo` public route | VM deploy (until local OK) |
| Puck admin editor in `/admin` | Replacing Live Preview |
| Built-in Heading/Text/Button blocks | Custom StackGen block library |

## Architecture

```
Payload admin                    Public site
─────────────                    ───────────
Pages collection ──puckData──►  /puck-demo → PageRenderer(baseConfig)

createPuckPlugin({ pagesCollection: 'pages' })
PuckConfigProvider(editorConfig) in admin layout
build:puck-css → public/puck-editor-styles.css
```

Existing overlay model (`HomeReplica`, `ProductPage`, Live Preview) unchanged.

## Files

- `web/payload/payload.config.ts` — plugin + livePreview for `pages`
- `web/components/admin/PuckProvider.tsx`
- `web/puck/config.ts`, `web/puck/puck-globals.css`
- `web/app/(site)/puck-demo/page.tsx`
- `web/scripts/seed-puck-demo.ts`
- `web/payload/migrations/20260902_puck_pages.ts`

## Local test

```bash
cd web
pnpm install
pnpm build:puck-css          # or pnpm dev:puck-css in a 2nd terminal
export DATABASE_URL=postgresql://payload:<pw>@127.0.0.1:5433/payload
pnpm seed:puck-demo
pnpm dev
```

1. **Admin:** `/admin` → Content → Pages → create or open `puck-demo` → **Edit with Puck**
2. **Public:** `http://localhost:3000/puck-demo`

## Next steps (post-POC)

- Custom StackGen Puck blocks via `mergeConfigs`
- Catch-all `[[...slug]]` for additional pages
- Deploy + run migration on VM
- Decide coexistence strategy vs Live Preview per page type
