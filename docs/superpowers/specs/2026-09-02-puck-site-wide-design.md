# Puck site-wide rollout — design spec

**Status:** Awaiting approval  
**Date:** 2026-09-02  
**Builds on:** [Puck POC](./2026-09-02-puck-poc-design.md) (commit `4a652db`)  
**Torbit index:** `Stackgen_Website_Redesign` @ main — 1,331 files, 2,973 definitions

## Decisions (from intake)

| Question | Choice |
|----------|--------|
| Scope | **Everything CMS-backed** — home, products, blog posts, cards/FAQs |
| Live Preview | **Puck primary** — keep field-level Live Preview only during transition for non-migrated docs |
| Edit granularity | **Element-level** — editors must change smallest visible units (headlines, labels, CTA text, card copy), not only whole sections |
| Dependency analysis | **Torbit MCP** (indexed before design) |

## Goal

Replace the field-overlay + fixed React page shell model with **Puck-composed pages** while preserving StackGen visual design (motion, diagrams, tokens). Docs (`/docs/*`) stay on the markdown pipeline.

## Current vs target

```
Today                              Target
─────                              ──────
home global + cards → HomeReplica    pages (isHomepage) → PageRenderer + StackGen blocks
products + cards + faqs → ProductPage   pages per slug OR puckData on products*
posts → BlogPostArticle              Puck article blocks or posts + Puck wrapper
cms-overlay.ts field merge           puckData JSON (single source of truth)
Live Preview on fields               Puck editor canvas (+ LP fallback during migration)
/puck-demo only                      / + /product/* + /blog/* + new pages

* products collection may keep slug metadata; body layout moves to puckData
```

## Three approaches considered

### A — Granular Puck blocks wrapping existing React (recommended)

Decompose each visible element into Puck components with explicit fields:

- **Atom blocks:** `StackGenHeading`, `StackGenText`, `StackGenCta`, `StackGenEyebrow`, `StackGenMetric`
- **Molecule blocks:** `StackGenHero`, `StackGenCard`, `StackGenFaqItem`
- **Organism blocks:** wrap existing section components (`ReplicaProblem`, `ProductHero`, …) with Puck-exposed props for every editable string/image/link
- **Layout blocks:** `StackGenNav`, `StackGenFooter` (shared site chrome)

**Pros:** Matches pixel-perfect replica + motion; satisfies element-level editing  
**Cons:** Large block library (~40–60 components); upfront build cost

### B — Section-level Puck blocks only

One Puck block per current section (8 home + ~16 product); fields are nested JSON blobs per section.

**Pros:** Faster initial build  
**Cons:** Does **not** meet “smallest element editable” requirement without drilling into nested Puck fields anyway

### C — Catch-all pages only, retire collections

Move all content into `pages` collection; delete `home` global, slim `products`/`posts` to routing metadata only.

**Pros:** Single content model  
**Cons:** Big-bang migration; loses collection-specific admin UX; cards/faqs parent-preview pattern breaks

**Recommendation:** **A** for editing UX; migrate **routes in phases** (not big-bang) using Torbit order below.

## Architecture

### Puck config (`web/puck/`)

```
web/puck/
  config.ts              # mergeConfigs(baseConfig, stackgenConfig)
  stackgen-config.tsx    # all StackGen blocks (client render fns)
  stackgen-config.server.tsx  # server-safe configs for PageRenderer
  fields/                # shared Puck field helpers (color, link, image)
  blocks/
    atoms/               # Heading, Text, Cta, Eyebrow
    home/                # HomeHero, HomeProblem, ...
    product/             # ProductHero, ProductFaq, ...
    blog/                # BlogArticle, BlogIndex
    chrome/              # Nav, Footer
```

Use `mergeConfigs` from `@delmaredigital/payload-puck/config` to extend POC `baseConfig`.

### Data model

| Entity | Phase 1 | Steady state |
|--------|---------|--------------|
| `pages` | Ad-hoc pages + `/puck-demo` | Homepage (`isHomepage: true`), product pages, optional landing pages |
| `products` | Keep slug + SEO fields | Add `puckData` via `getPuckFields()` **or** redirect to `pages` row per slug |
| `posts` | Keep for blog index | Add `puckData` for article body layout **or** single `BlogArticle` block with rich fields |
| `home` global | Unchanged during migration | **Deprecated** once homepage `pages` row is canonical |
| `cards` / `faqs` | Unchanged during migration | **Inlined** into parent page `puckData` as repeatable block zones |

**Homepage routing:** `/` renders `pages` where `isHomepage === true` (plugin field already exists).

**Product routing:** `/product/[slug]` loads `pages` where `slug === product slug` OR hybrid lookup: product metadata from `products` + layout from linked `pages` doc.

### Rendering

```tsx
// Pattern for migrated routes
const page = await getPageByRoute(slug)
if (page?.puckData) {
  return <PageRenderer config={stackgenConfig} data={page.puckData} />
}
// ponytail: delete fallback once migration complete
return <LegacyHomeReplica ... />
```

During transition, **HybridPageRenderer** from payload-puck optional for docs that have both legacy fields and `puckData`.

### Admin UX

- **Puck canvas** = primary editor for layout + copy
- **Live Preview** = remains on collections until that route is cut over; then removed per collection
- **Cards/Faqs** admin: migrate to Puck repeatable zones on parent page editor (no separate collection long-term)

### Out of scope

- `/docs/*` markdown corpus
- Nav product mega menu structure (code-driven `product-mega-menu.ts` unless later block)
- VM deploy in first implementation phase (local validation first)

## Migration order (Torbit dependency graph)

| Phase | Deliverable | Depends on |
|-------|-------------|------------|
| **0** | Block registry + atom fields (heading, text, CTA, link) | POC |
| **1** | `StackGenNav` + `StackGenFooter` Puck blocks | 0 |
| **2** | Blog: `BlogArticle` block + `/blog/[slug]` cutover | 1 |
| **3** | Product: 16 section blocks with granular fields + `/product/[slug]` | 1 |
| **4** | Home: 8 section blocks + diagrams as locked/sub-block components + `/` cutover | 1, 3 patterns |
| **5** | Cards/Faqs → nested zones on home/product Puck pages | 3, 4 |
| **6** | Catch-all `[[...slug]]` for new marketing pages | 0 |
| **7** | Retire `cms-overlay` paths for migrated routes; deprecate `home` global | 2–5 |
| **8** | Sitemap + Live Preview cleanup | 7 |

**Estimated block count:** ~45 Puck components (12 atoms/molecules + 8 home + 16 product + blog + chrome).

## Seed / migration scripts

- `seed-puck-home.ts` — convert `replicaContent` + Payload `home` + `cards` → homepage `puckData`
- `seed-puck-products.ts` — convert `productContentBySlug` + products/cards/faqs → per-slug `puckData`
- `seed-puck-posts.ts` — convert posts → article block layout

Scripts are **idempotent** (like `seed-puck-demo.ts`); never overwrite editor changes without `--force`.

## Skills for implementation phase

| Skill | Purpose |
|-------|---------|
| `superpowers:writing-plans` | Implementation plan after this spec is approved |
| `puckeditor/skills@puck` | Puck config, fields, Data model (`npx skills add puckeditor/skills --skill puck`) |
| `payloadcms/skills@cms-migration` | Collection field migration patterns |

## Testing

- Puck block unit tests: render with default props (existing vitest pattern)
- Route smoke: `/`, `/product/aiden-for-infraops`, `/blog/[slug]` return 200 with seeded puckData
- Visual: compare screenshots before/after per phase (manual for diagrams)
- Admin: edit atom field in Puck → public page updates within ISR window (or add `revalidatePath` hook)

## Risks

| Risk | Mitigation |
|------|------------|
| Diagram/motion blocks too complex for Puck | Expose copy-only fields; diagram structure stays in React; lock layout in block |
| Editor performance with 60+ blocks | Categorize in Puck sidebar; lazy-load editor configs |
| Content loss on migration | Seed from TS + Payload snapshot; `--force` guard |
| Big-bang route break | Per-route fallback to legacy renderer until puckData exists |

## Success criteria

1. Editor can change any visible text/CTA on home, one product page, and one blog post **inside Puck canvas**
2. Public routes match current design within acceptable visual parity
3. No dependency on `cms-overlay.ts` for migrated routes
4. POC `/puck-demo` continues to work

## Open questions (resolve before implementation plan)

1. **Product pages:** one `pages` row per product slug, or `puckData` field added to existing `products` collection?
2. **Blog:** full Puck layout per post, or single article template block with title/excerpt/body fields only?
3. **Diagrams:** editable copy only, or also layout variants in Puck?

---

**Next step after approval:** invoke `writing-plans` → phased implementation plan with file-level tasks.
