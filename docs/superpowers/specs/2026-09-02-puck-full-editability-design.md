# Puck full editability — design spec

**Status:** Superseded for structure by [Puck ← Pencil layer tree](./2026-09-02-puck-pencil-layer-tree-design.md) (Approach 2 / Task 10 cutover). Section-block field coverage remains useful for `legacy` StackGen* blocks until those pages are fully on `PenPage`.  
**Date:** 2026-09-02  
**Builds on:** [Puck site-wide rollout](./2026-09-02-puck-site-wide-design.md)  
**Torbit index:** `Stackgen_Website_Redesign` @ main — 1,356 files, 3,239 definitions

## Decision (confirmed)

| Question | Choice |
|----------|--------|
| Cards & FAQs storage | **A — Inline Puck arrays** on parent page blocks. All card/FAQ copy lives in `pages.puckData`. Retire `cards` / `faqs` collections as editorial surfaces after migration. |

## Problem

Editors see a Puck canvas that appears to contain only Nav + Hero, while the public site shows the full homepage. Investigation shows two distinct gaps:

1. **Canvas UX** — Homepage `puckData` already contains **9 blocks** (Nav → Footer). `ReplicaHero` uses `min-h-[100dvh]`, so sections 3–9 sit below the fold. The editor also defaults to **light** theme while the site defaults to **dark**, making parity harder to judge.
2. **Field coverage** — Section blocks exist, but nested visible elements are still hardcoded or only merged at seed time from legacy `cards` / `faqs` collections. Product blocks already expose inline arrays for FAQs and card grids; home and blog have remaining holes.

## Goal

Every visible text, link, logo, card, and FAQ on home, product, and blog routes is editable **inside the Puck canvas** via inline array fields — no separate collection editing required.

## Non-goals (unchanged from site-wide spec)

- `/docs/*` markdown pipeline
- Nav product mega menu structure (`product-mega-menu.ts`) — code-driven unless a later phase adds a dedicated block
- Diagram geometry / motion — copy-only fields; React owns structure
- Atom-level blocks (`StackGenHeading`, `StackGenText`) — defer unless section fields prove insufficient

---

## Current state (Torbit + DB audit)

### Block registry (31 components)

| Category | Count | Location |
|----------|-------|----------|
| Chrome | 2 | `web/puck/blocks/chrome/` |
| Home | 7 | `web/puck/blocks/home/` |
| Product | 16 | `web/puck/blocks/product/` |
| Blog | 6 | `web/puck/blocks/blog/` |

### Seeded `pages` rows (local DB)

| Page | Blocks in `puckData` |
|------|----------------------|
| Home (`isHomepage`) | 9 — full section stack |
| Each product slug | 16 |
| Each blog post | 6 |
| `/puck-demo` | 3 — legacy POC blocks |

Seeds are **idempotent skip** — existing rows are not updated when block fields expand. A **`--force` re-seed** (or one-shot migration script) is required to hydrate inline arrays from `cards` / `faqs`.

### Field coverage matrix

| Surface | Puck block | Inline arrays today | Gap |
|---------|------------|---------------------|-----|
| Nav links + CTA | `StackGenNav` | ✅ `links[]` | Mega menu panels |
| Footer | `StackGenFooter` | ✅ copy fields | — |
| Hero | `StackGenHomeHero` | ✅ | `min-h-[100dvh]` hides siblings in canvas |
| Logo marquee | `StackGenHomeLogos` | ❌ | Only `eyebrow`; **8 logo items hardcoded** in `replica.ts` |
| Problem + diagram labels | `StackGenHomeProblem` | ✅ `symptoms[]` | — |
| Solution | `StackGenHomeSolution` | ✅ copy | — |
| How it works | `StackGenHomeAssemblies` | ✅ copy | — |
| Shell / OCG | `StackGenHomeShell` | ✅ copy | — |
| Offerings | `StackGenHomeWhoItsFor` | ✅ `pillars[]`, `roles[]`, `osChips[]` | Seed may not have merged `cards` slot data into puckData |
| Product card grids | `StackGenProduct*` | ✅ spotlight, capabilities, enterprise, offers, resources, pillars | Seed skip → arrays may be TS defaults not Payload cards |
| Product FAQ | `StackGenProductFaq` | ✅ `items[]` | Same seed gap |
| Blog body | `StackGenBlogBody` | ⚠️ single HTML field | No paragraph-level editing |

Legacy merge path: `overlayReplicaContent` / `overlayProductContent` in `web/lib/cms-overlay.ts` reads `cards` by `slot` and `faqs` by `product-slug`. Seeds call these once at create time; **runtime routes do not re-merge** — only `puckData` is rendered.

---

## Architecture

### Data flow (target)

```
Editor (Puck canvas)
  → edits pages.puckData JSON (inline arrays for cards/FAQs)
  → publish
Public route (PageRenderer)
  → block render merges props into ReplicaContentProvider / product content
  → React sections render (diagrams/motion unchanged)
```

No runtime read of `cards` or `faqs` collections on migrated routes.

### Shared field helpers

Extend `web/puck/fields/common.ts`:

```ts
logoItemFields   // src (text path), alt
faqItemFields    // already exists
cardFields       // already exists
pillarCardFields // already exists
roleCardFields   // already exists
```

### Block changes

#### 1. Home — `StackGenHomeLogos`

Add array field:

```ts
items: {
  type: "array",
  label: "Customer logos",
  getItemSummary: (item) => item.alt || "Logo",
  arrayFields: { src: { type: "text", label: "Image path" }, alt: { type: "text", label: "Alt text" } },
}
```

Update `mergeReplicaContent` to accept `logos.items[]` overrides.

#### 2. Home — verify array hydration

Ensure `buildHomePuckDataFromContent` writes `symptoms`, `pillars`, `roles`, `osChips` from overlay output (already does for pillars/roles/symptoms via content object). Re-seed must apply Payload `cards` slot data:

| Card slot | Target block field |
|-----------|-------------------|
| `home-symptom` | `StackGenHomeProblem.symptoms[]` |
| `home-pillar` | `StackGenHomeWhoItsFor.pillars[]` |
| `home-role` | `StackGenHomeWhoItsFor.roles[]` |

#### 3. Product — no new blocks

Existing product blocks already use inline arrays. Migration script copies `cards` / `faqs` collection rows into the matching block props in `puckData`.

| Card slot | Block |
|-----------|-------|
| `product-pillar` | `StackGenProductPillars.items` |
| `product-spotlight` | `StackGenProductSpotlight.cards` |
| `product-capability` | `StackGenProductCapabilities.items` |
| `product-enterprise` | `StackGenProductEnterprise.items` |
| `product-offer` | `StackGenProductOffers.items` |
| `product-resource` | `StackGenProductResources.items` |
| (faqs by slug) | `StackGenProductFaq.items` |

#### 4. Blog — paragraph blocks (phase 2 of this spec)

Split `StackGenBlogBody` HTML into repeatable `StackGenBlogParagraph` blocks at migration time using existing `paragraphsFromHtml` helper in `blog-blocks.tsx`. Editors add/reorder paragraphs in Puck; optional `StackGenBlogQuote` for pull quotes.

---

## Canvas UX fixes

These ship in the same implementation pass so editors trust what they see.

| Fix | Approach |
|-----|----------|
| Hero fills viewport | In Puck editor only: pass `className="min-h-0 lg:min-h-[60vh]"` (or `data-puck-preview`) to `ReplicaHero` when rendered inside Puck canvas — do **not** change public page layout |
| Theme parity | Default `ThemeProvider` to **dark** in `PuckRenderProviders` (match site layout) |
| Styles in iframe | Confirm Tailwind content glob includes `web/puck/**`; mirror `data-theme` on iframe root per Puck troubleshooting skill |
| Discoverability | Optional: Puck `root.fields` note or admin hint — "Scroll canvas to see all sections" |

Implementation hook: detect Puck editor context via env flag from `@delmaredigital/payload-puck` or a React context set in `PuckRenderProviders` (`isPuckCanvas={true}`).

---

## Migration

### Script: `migrate-puck-inline-arrays.ts`

One-shot (also callable with `--force` from seed scripts):

1. Load all `cards` and `faqs` docs
2. For each `pages` row (home, products, blog):
   - Parse existing `puckData`
   - Patch block props from collection data using slot/slug mapping above
   - Preserve block order and editor-made changes outside patched fields
3. `payload.update` each page

### Seed `--force` flag

Add to `seed-puck-home.ts`, `seed-puck-products.ts`:

```bash
pnpm seed:puck-home -- --force   # rebuild puckData from overlay + write
```

Without `--force`: current skip behavior.

### Collection deprecation (after migration verified)

| Collection | Action |
|------------|--------|
| `cards` | `admin.hidden: true` + comment in collection file; data retained for rollback |
| `faqs` | Same |
| Live Preview hooks in `payload.config.ts` for cards/faqs | Remove |

Do **not** delete collection tables until one release cycle with verified Puck-only editing.

---

## Implementation phases

| Phase | Deliverable | Est. |
|-------|-------------|------|
| **1** | Canvas UX (hero preview height, dark default theme) | Small |
| **2** | Home logos array field + merge-content | Small |
| **3** | Migration script + `--force` seeds; run on local DB | Medium |
| **4** | Blog paragraph blocks + migrate post puckData | Medium |
| **5** | Hide cards/faqs admin; remove LP hooks | Small |
| **6** | Visual QA: home + 1 product + 1 blog in Puck vs public | Manual |

**Skills:** `puckeditor/skills@puck`, `payloadcms/skills@cms-migration`, `superpowers:writing-plans` (next step).

---

## Testing

| Check | Method |
|-------|--------|
| All 9 home blocks visible in canvas without excessive scroll | Manual Puck admin |
| Edit logo alt in `StackGenHomeLogos` → public `/` updates | Field edit + refresh |
| Edit FAQ item on product page in Puck | Field edit + `/product/aiden-for-infraops` |
| Re-run migration idempotent | Script twice, no duplicate array items |
| Vitest: logos block render with custom items | Existing block test pattern |

---

## Risks

| Risk | Mitigation |
|------|------------|
| `--force` overwrites editor changes | `--force` patches only array fields mapped from collections; document backup; optional `--dry-run` |
| Logo paths as text not media picker | Accept path strings for v1; add `external` media field later if needed |
| Blog HTML → paragraphs loses formatting | Migration preserves `<p>` splits; complex HTML gets single body block fallback |

---

## Success criteria

1. Editor scrolling the Puck canvas sees the same section stack as the public homepage (9 blocks).
2. Customer logos, symptom labels, pillars, roles, product card grids, and FAQ items are editable inline — no `cards` / `faqs` admin visits.
3. Public routes match pre-migration content after running migration script once.
4. Theme in Puck canvas matches public site default (dark).

---

## Approaches considered

| Approach | Verdict |
|----------|---------|
| **A — Inline arrays (chosen)** | Single source of truth in `puckData`; matches Payload Puck plugin model |
| B — External collection pickers | Rejected — two admin surfaces |
| C — Hybrid | Rejected — user chose full inline |

| Canvas fix | Verdict |
|------------|---------|
| Shrink hero in editor only | **Recommended** — preserves marketing full-viewport hero on site |
| Shrink hero everywhere | Rejected — changes live design |
| iframe disabled | Rejected — breaks viewport tooling |
