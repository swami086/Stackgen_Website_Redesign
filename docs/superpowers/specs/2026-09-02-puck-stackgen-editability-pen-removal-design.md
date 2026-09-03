# StackGen\* Puck editability + PenPage removal — design spec

**Status:** Approved (2026-09-02)  
**Date:** 2026-09-02  
**Supersedes for public site:** [Puck ← Pencil layer tree](./2026-09-02-puck-pencil-layer-tree-design.md) (abandoned for public cutover)  
**Revives (scoped):** useful parts of [Puck full editability](./2026-09-02-puck-full-editability-design.md) for **home + products only**  
**Skills:** `/puck` (puckeditor/skills), `/using-superpowers` → brainstorming → writing-plans; catalog: payloadcms/payload  
**Torbit:** index `Stackgen_Website_Redesign` before structural navigation  

## Decision (confirmed)

| Question | Choice |
|----------|--------|
| Editability model | **A — Expand StackGen\* section block fields** (not PenPage) |
| Route scope | **Home + all product pages** (`/`, `/product/*`) |
| PenPage / Pencil layer-tree | **Remove entirely** from the app (code, fixtures, flag, preview, tests, scripts) |
| Keep | `NextJS.pen` design file; Replica React; StackGen\* Puck blocks; polished public look (VM / Webflow-class) |

### Brainstorm trail

User restored StackGen\* after Task 10 Pen cutover hurt fidelity. Intent: edit everything (including buttons) in Payload Puck UI **without** replacing the public site with a layer dump. Chose Approach A + home/products + full Pen teardown.

---

## Problem

1. **Wrong path shipped** — Pencil → `PenPage` cutover made the public site look unfinished while the user only wanted admin editability.
2. **Field gaps remain** on StackGen\* — some visible copy/links still seed-only or hardcoded (e.g. logo marquee items; seed skip leaves stale `puckData`).
3. **Pen stack is dead weight** — flag, preview routes, layers pipeline, fixtures, and tests invite another bad cutover.

## Goal

1. Delete the PenPage / Pencil→Puck layer-tree integration from the Next/Payload app.
2. Make **every visible text and button (label + href)** on home and product pages editable via StackGen\* Puck fields in Payload admin.
3. Keep public rendering as Replica / StackGen\* section components (motion/diagrams unchanged).

## Non-goals

- Blog index/posts field expansion (later)
- `/docs/*`
- Product mega-menu IA beyond what `StackGenNav` already exposes (already has `megaMenu[]` — no new mega-menu system)
- Reintroducing `PenPage`, `PUCK_LAYER_TREE`, or Pencil fixture seeding into live slugs
- Deleting `NextJS.pen` (design source of truth for design work, not runtime)
- Pixel editing / diagram node CRUD

---

## Architecture

### Public + editor data flow (target)

```
Payload Pages (puckData with StackGen* blocks)
  → Puck admin canvas (edit fields including CTA label/href)
  → publish
Public route → <Render config={stackgenConfig} data={puckData} />
  → block render merges props into ReplicaContentProvider / product content
  → Replica sections (diagrams/motion as today)
```

`PUCK_LAYER_TREE` and Pen preview routes go away. Home always uses homepage `puckData` StackGen\* tree; products use slug pages.

### Pen removal inventory (delete / unwind)

| Area | Paths |
|------|--------|
| Layers pipeline | `web/puck/layers/**` |
| Pen blocks + renderer | `web/puck/blocks/pen/**`, `web/components/puck/pen/**` |
| Preview routes | `web/app/(site)/puck-layers-preview/**` |
| Flag + helpers | `web/lib/puck-layer-tree-flag.ts`, `web/lib/puck-layers-preview-routes.ts` |
| Scripts | `import-pencil-layers.ts`, `backup-puck-cutover.ts`, `restore-puck-cutover.ts`, `export-pencil-*.md` |
| Fixtures | `web/puck/fixtures/home-zXASg*`, `product-*`, `blog-*`, `*-manifest.json` (Pen fixtures only) |
| Tests | `web/__tests__/pen-*`, `puck-layer-tree-flag.test.ts`, `resolve-pen-color.test.ts` |
| Config / env | Unregister Pen\* from `stackgen-config.tsx`; restore StackGen\* categories as primary; remove `PUCK_LAYER_TREE` from compose/env examples; strip Pen branches from `page.tsx` / `blog/page.tsx` / `[slug]/page.tsx` allowlists |
| Package scripts | Remove `seed:puck-layers*`, `backup:puck-cutover` from `web/package.json` |

Docs: mark layer-tree plan/spec **abandoned**; point to this spec. Do not delete historical app-replica Pencil→Next plans (unrelated).

### StackGen\* editability (home + products)

**Buttons:** every CTA/link that appears on home or product must expose **label + href** (or equivalent) on its StackGen\* block. Prefer shared `ctaFields` / `linkFields` from `web/puck/fields/common.ts`.

**Known coverage (keep + verify wire-through):**

| Block | Buttons / links |
|-------|-----------------|
| `StackGenNav` | `ctaLabel`/`ctaHref`, `links[]`, mega-menu column links |
| `StackGenHomeHero` | `ctaFields` (primary/secondary) |
| `StackGenHomeProblem` / Assemblies | `learnMoreLabel`/`Href` |
| `StackGenHomeWhoItsFor` | pillar/role `href`s |
| `StackGenFooter` | footer CTA + link arrays |
| `StackGenProductHero` | `ctaFields` |
| `StackGenProductFinalCta` | `cta`/`href` |
| Product card arrays | per-card links where UI shows them |

**Gaps to close in this pass:**

1. `StackGenHomeLogos` — expose `items[]` (`src`, `alt`) via existing `logoItemFields`; merge into content.
2. Audit pass — any button still hardcoded in Replica for home/product that is **not** overridden by block props → add field + merge.
3. Force-reseed — `pnpm seed:puck-home -- --force` and `pnpm seed:puck-products -- --force` after field changes so live `puckData` gets new keys (seeds skip without `--force`).
4. Config UX — StackGen\* categories titled as primary (e.g. “Home”, “Product”, “Chrome”), not “Legacy”; Pen category removed.

### Canvas UX (lightweight)

- Dark theme default in editor where already supported.
- Do not change public `min-h-[100dvh]` hero for SEO/look; document that editors scroll the canvas for sections below the fold.

---

## Success criteria

- [ ] No `PenPage` / `web/puck/layers` / `puck-layers-preview` / `PUCK_LAYER_TREE` in runtime app
- [ ] `pnpm exec vitest` Pen-related suites removed; remaining Puck/StackGen tests pass
- [ ] `/` and `/product/aiden-for-*` render StackGen\* / Replica look (parity with pre-Pen restore)
- [ ] In Payload `/admin`, editing a hero primary CTA label/href and publishing changes the public page
- [ ] `NextJS.pen` still present on disk

## Risks

| Risk | Mitigation |
|------|------------|
| Host `tsx` seed leaves `payload_migrations` `dev`/`batch=-1` and hangs Docker web | After any host Payload script: `DELETE FROM payload_migrations WHERE name='dev' AND batch=-1`; prefer running seeds carefully |
| Force-reseed wipes editor edits | Backup `puckData` JSON before `--force` (one-shot script or copy of existing backup pattern without Pen naming) |
| Over-deleting unrelated “pencil” assets | Only delete Puck Pen integration paths listed above — keep `public/media/*pencil*` marketing images |

## Out of scope follow-ups

- Blog StackGen\* field expansion  
- Runtime merge from `cards`/`faqs` collections (inline puckData remains source of truth after reseed)
