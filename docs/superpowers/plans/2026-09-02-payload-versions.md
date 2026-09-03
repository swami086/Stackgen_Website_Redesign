# Payload Versions Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Enable versions + drafts + autosave on posts, products, cards, faqs, and home with published-only public reads.

**Architecture:** Shared access helper + versions config on five targets; Local API filters published; seed publishes; migrate creates `_*_v` tables and backfills `_status`.

**Tech Stack:** Payload 3.88.0, `@payloadcms/db-postgres`, Next.js embedded admin

## Global Constraints

- Do not version `users` or `media`
- Do not change Puck `pages` versions
- No `schedulePublish`
- Existing content must remain publicly readable after migration (`_status: published` backfill)

---

## File map

| File | Responsibility |
|---|---|
| `web/payload/access/authenticatedOrPublished.ts` | Shared read access |
| `web/payload/collections/{Posts,Products,Cards,Faqs}.ts` | versions + access |
| `web/payload/globals/Home.ts` | versions + access |
| `web/lib/payload-cms.ts` | published filter on finds |
| `web/scripts/seed-app.ts` | seed as published |
| `web/payload/migrations/*` | schema + backfill |

---

### Task 1: Access helper + collection/global config

- [ ] Add `authenticatedOrPublished`
- [ ] Wire versions + access on Posts, Products, Cards, Faqs, Home

### Task 2: Local API + seed

- [ ] Filter `_status: published` in `fetchCollection` / `fetchHomeGlobal`
- [ ] Pass `_status: 'published'` in seed creates/updates

### Task 3: Migration

- [ ] `pnpm payload migrate:create` (or hand-write) for versions tables
- [ ] Backfill existing docs/globals to published
- [ ] Register in `migrations/index.ts`
- [ ] Run migrate against local Postgres

### Task 4: Types + verify

- [ ] `pnpm generate:types`
- [ ] Smoke: admin versions UI; public site still loads content
