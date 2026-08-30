# Product Pages Placeholder Template (Harness-shaped) Implementation Plan

> **For agentic workers:** Execute assigned tasks only. Commits only if the human asks. Model for code: `composer-2.5-fast`. Visual comps: Nano Banana Pro `gemini-3-pro-image`.

**Goal:** Scaffold four Aiden product routes using Harness.io’s individual-product section skeleton as a **placeholder template**, wire the Product mega-menu from Pencil `BCszz`, and generate hero screen comps with Nano Banana Pro.

**Architecture:** Content-driven Next.js pages under `web/app/product/[slug]` compose shared section stubs. Each section renders `PLACEHOLDER — …` markers for unfinished copy/media. Nav “Products” opens a `BCszz`-faithful mega-menu (closed by default). Hero atmospheres optional via NB Pro PNGs under `web/public/media/product/`.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · existing replica primitives · Vitest · Vertex `gemini-3-pro-image` · Pencil `BCszz` / frames `qwI1S` `llzpJ` `JQkAE` `TIh4G`

**Spec inputs:**
- Harness structure: `.firecrawl/harness-product-pages/structural-template.json`
- Mega menu: Pencil `BCszz` → `rvmr8` Catalog Shell → `r8gi4e` 4 columns (Build/Operate/Observe/Remediate)
- Naming locks: PRODUCT.md (never “Aiden for DevOps” / Olly / InfraOps)

---

## Locked decisions (user-directed; compressed brainstorm)

| Decision | Choice |
|---|---|
| Structure source | Harness individual product page section order (structural only) |
| Visual world | Incumbent StackGen deck/replica tokens — refine, don’t redesign |
| Copy | Placeholders only (`PLACEHOLDER — …`); no invented claims |
| Mega menu | Match Pencil `BCszz` open-state catalog; code closed by default |
| Screens | Nano Banana Pro comps for heroes; live UI stays React/DOM |
| Routes | `/product/aiden-for-infrastructure` · `…-automation` · `…-observability` · `…-sre` |

### Section template (StackGen mapping)

| # | Harness section | StackGen placeholder section id |
|---|---|---|
| 1 | Global header + Product mega-menu | `ReplicaNav` + `ProductMegaMenu` (`BCszz`) |
| 2 | Product sub-nav (optional) | `ProductSubNav` — Overview only for v1 |
| 3 | Hero | `ProductHero` |
| 4 | Hero pillars | `ProductPillars` |
| 5 | Logo / trust strip | `ProductLogos` (reuse replica logos) |
| 6 | Problem / POV | `ProductProblem` |
| 7 | Differentiation spotlight | `ProductSpotlight` |
| 8 | Capability blocks | `ProductCapabilities` (3–4 stub cards) |
| 9 | Platform cross-links | `ProductPlatformLink` |
| 10 | Integrations | `ProductIntegrations` |
| 11 | Enterprise / governance | `ProductEnterprise` |
| 12 | Customer proof | `ProductProof` |
| 13 | Content offers | `ProductOffers` |
| 14 | Closing CTA | `ProductFinalCta` — Schedule demo |
| 15 | FAQ | `ProductFaq` |
| 16 | Related resources | `ProductResources` |
| 17 | Footer | `ReplicaFooter` |

Each stub must show a visible mono badge: `PLACEHOLDER — fill me`.

---

## File map

| Path | Responsibility |
|------|----------------|
| `web/lib/products.ts` | Slug union, titles, phases, hrefs, pencil frame ids |
| `web/content/products.ts` | Per-slug placeholder strings + section flags |
| `web/content/product-mega-menu.ts` | `BCszz` catalog columns (verbatim Pencil blurbs/names) |
| `web/components/replica/nav/ProductMegaMenu.tsx` | Dropdown UI from `BCszz` |
| `web/components/replica/sections/Nav.tsx` | Wire Products hover/focus menu |
| `web/components/replica/product/*.tsx` | Section stubs |
| `web/components/replica/ProductPage.tsx` | Page composer |
| `web/app/product/[slug]/page.tsx` | Route + `notFound` |
| `web/__tests__/products-placeholder.test.tsx` | Slugs, banned names, PLACEHOLDER presence, mega-menu links |
| `scripts/generate-product-heroes.mjs` | NB Pro hero comps → `web/public/media/product/` |
| `.impeccable/mocks/product-heroes/` | Concept PNGs + manifest |
| `docs/superpowers/plans/2026-08-29-product-pages-harness-placeholder.md` | This plan |

---

### Task 1: Product lib + content placeholders

**Files:** create `web/lib/products.ts`, `web/content/products.ts`, `web/content/product-mega-menu.ts`, test

- Slugs: `aiden-for-infrastructure` | `aiden-for-automation` | `aiden-for-observability` | `aiden-for-sre`
- Phases: Build · Operate · Observe · Remediate
- Mega-menu copy from Pencil `BCszz` (titles/descs above)
- Every string field that is not locked naming = `PLACEHOLDER — …`

- [ ] Write failing test for 4 slugs + banned DevOps name + PLACEHOLDER in hero
- [ ] Implement modules
- [ ] Pass tests

### Task 2: Section stubs + `[slug]` route

**Files:** `web/components/replica/product/*`, `ProductPage.tsx`, `app/product/[slug]/page.tsx`

- Compose sections in Harness order; skip optional empty ones via content flags
- Use replica tokens (`bg-surface`, `text-text-*`, `border-border`); CTA = Schedule demo
- `await params` + `notFound()` for bad slug

- [ ] Failing route/smoke test
- [ ] Implement stubs + page
- [ ] Pass tests

### Task 3: Product mega-menu (`BCszz`)

**Files:** `ProductMegaMenu.tsx`, update `Nav.tsx`

- 4 columns matching Pencil; Explore → `/product/<slug>`
- Banner: One Operational Context Graph · four assemblies
- Closed by default; open on Products hover/focus; Esc/outside closes
- Accessible: `aria-expanded`, keyboard

- [ ] Test links resolve to four product hrefs
- [ ] Implement + wire Nav

### Task 4: Nano Banana Pro hero comps

**Files:** `scripts/generate-product-heroes.mjs`, outputs under `.impeccable/mocks/product-heroes/` and optionally `web/public/media/product/`

- Model: `gemini-3-pro-image` (Nano Banana Pro)
- One dark + one light abstract hero field per product (no readable text, no logos, deck palette)
- Wire optional `AtmosphereField`-style decorative mount if PNGs present; CSS fallback if not

- [ ] Generate 4×2 comps (or 4 dark-first if quota tight)
- [ ] Manifest + optional public copy

### Task 5: Impeccable detect + OpenMemory

- [ ] `detect.mjs --json` on new product components
- [ ] Update `openmemory.md` Components row
- [ ] Store project fact memory

---

## Parallel execution map

| Agent | Model | Tasks |
|------|-------|-------|
| A | composer-2.5-fast | Tasks 1–2 (content + pages) |
| B | composer-2.5-fast | Task 3 (mega-menu) |
| C | composer-2.5-fast | Task 4 (NB Pro heroes) |
| Parent | — | Task 5 + merge conflicts + plan doc |

---

## Verify

```bash
cd web && pnpm exec vitest run __tests__/products-placeholder.test.tsx
node ~/.cursor/skills/impeccable/scripts/detect.mjs --json web/components/replica/product web/components/replica/nav
```

Manual: `/product/aiden-for-sre` shows PLACEHOLDER badges; Products menu lists four Explore links.
