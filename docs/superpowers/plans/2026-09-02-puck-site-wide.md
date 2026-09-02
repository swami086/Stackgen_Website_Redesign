# Puck Site-Wide Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement remaining tasks. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all CMS-backed routes (home, products, blog) editable in Puck with element-level fields, using `pages` collection rows and legacy fallbacks until seeded.

**Architecture:** StackGen replica sections exposed as Puck blocks via `mergeConfigs` on payload-puck `editorConfig`. Routes check `pages.puckData` first, fall back to `HomeReplica` / `ProductPage` / `BlogPostArticle`. Product + blog pages use `pages.slug` matching route slug.

**Tech Stack:** Payload 3.88, `@delmaredigital/payload-puck@0.9.0`, `@puckeditor/core@0.23.0`, Next.js App Router

## Global Constraints

- Element-level editing: headlines, CTAs, eyebrows exposed per section block
- Diagrams: copy-only fields; React diagrams unchanged
- Product/blog layout: one `pages` row per slug (not `puckData` on products/posts collections)
- Torbit index before dependency work; legacy renderer fallback until `puckData` exists
- Docs `/docs/*` out of scope

---

## Completed (this session)

- [x] Torbit re-index @ `3506969` — 1,332 files, 2,973 definitions
- [x] Installed `puckeditor/skills@puck` → `.agents/skills/puck`
- [x] `web/puck/stackgen-config.tsx` — 31 StackGen blocks + categories
- [x] `web/lib/puck-pages.ts`, `web/components/puck/PuckSitePage.tsx`
- [x] Route cutovers: `/`, `/product/[slug]`, `/blog/[slug]`, `/puck-demo`
- [x] Seed scripts: `seed:puck-home`, `seed:puck-products`, `seed:puck-posts`, `seed:puck-all`
- [x] Live Preview URL routing for pages (home/product/blog/puck-demo)

---

### Task 1: Seed local database

**Files:** Run scripts only

- [ ] **Step 1:** Ensure Postgres + `DATABASE_URL` set
- [ ] **Step 2:** `cd web && pnpm seed:puck-all`
- [ ] **Step 3:** Verify `/`, `/product/aiden-for-infraops`, one blog post return Puck layout

### Task 2: Cards/FAQs as Puck zones (Phase 5)

**Files:**
- Modify: `web/puck/blocks/home/home-blocks.tsx` — add card array fields on WhoItsFor
- Modify: `web/puck/blocks/product/product-blocks.tsx` — FAQ/card repeatable fields
- Modify: `web/puck/lib/build-page-data.ts` — seed cards/faqs from Payload

### Task 3: Retire cms-overlay for migrated routes (Phase 7)

**Files:**
- Modify: `web/app/(site)/page.tsx` — remove HomeReplica fallback after sign-off
- Modify: `web/app/(site)/product/[slug]/page.tsx`
- Modify: `web/app/(site)/blog/[slug]/page.tsx`

### Task 4: Catch-all marketing pages (Phase 6)

**Files:**
- Create: `web/app/(site)/[[...slug]]/page.tsx`
- Modify: `web/payload/payload.config.ts` — preview URL for non-product non-blog slugs
