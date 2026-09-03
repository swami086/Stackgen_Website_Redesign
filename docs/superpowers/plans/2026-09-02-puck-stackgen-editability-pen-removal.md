# StackGen\* Editability + PenPage Removal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development with **maximum parallelism**. Prefer **Composer 2.5** (`composer-2.5-fast`) for each leaf task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Pencil→PenPage layer-tree stack from the app, and make every visible text/button on home + product pages editable via StackGen\* Puck fields without changing the polished Replica public look.

**Architecture:** Tear out Pen\* / layers / preview / flag in parallel file-owned waves; restore StackGen\* as the only Puck surface; close remaining field gaps (logos + CTA audit); force-reseed home/products; verify admin→public CTA round-trip.

**Tech Stack:** Next.js 16, Payload 3.88, `@puckeditor/core`, StackGen\* blocks, Vitest, Torbit (`index` before structural navigation), Docker compose on `:3000`

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-02-puck-stackgen-editability-pen-removal-design.md`
- **Do not** reintroduce `PenPage`, `PUCK_LAYER_TREE=1`, or Pencil fixture seeding onto live slugs
- **Do not** delete `NextJS.pen` or marketing images under `web/public/media/*pencil*`
- Keep public Replica look (match GCP VM / Webflow-class); adapt only inside Puck block `render` / merge helpers
- Blog field expansion is **out of scope** (may still remove Pen blog preview wiring)
- Torbit: `index` on `Stackgen_Website_Redesign` before broad codebase queries
- After host `getPayload`/`tsx` scripts: delete `payload_migrations` row `name='dev' AND batch=-1` or Docker web hangs
- **Commits only when the user explicitly asks** — skip plan “Commit” steps unless instructed
- Subagent model: **`composer-2.5-fast`** (Composer 2.5) unless user overrides
- Skills: `/puck` for field/config patterns; Payload skill for admin persistence

---

## Parallel execution model (Composer 2.5)

```text
Wave 0 (serial, coordinator)     — inventory lock + worktree/branch note
        │
        ├─ Wave 1A ─┐
        ├─ Wave 1B ─┼─ PARALLEL delete tracks (no shared files)
        ├─ Wave 1C ─┤
        └─ Wave 1D ─┘
        │
Wave 2 (serial gate)             — stackgen-config + route cleanup merge + tsc/vitest green
        │
        ├─ Wave 3A ─┐
        ├─ Wave 3B ─┼─ PARALLEL StackGen field work (disjoint files)
        └─ Wave 3C ─┘
        │
Wave 4 (serial)                  — force reseed + Docker health + CTA browser/API verify
```

### Dispatch rules

| Rule | Detail |
|------|--------|
| Model | Launch each leaf Task tool with `model: "composer-2.5-fast"` |
| Isolation | Prefer separate git worktrees per Wave-1 / Wave-3 agent (`best-of-n-runner` or manual worktree); merge only at Wave 2 / Wave 4 gates |
| File ownership | An agent may **only** edit files listed in its task. No drive-by edits. |
| Review | After each wave gate: parent agent runs listed verify commands before opening the next wave |
| Conflicts | If two agents need the same file, that work belongs in a serial gate task — do not parallelize |

### Subagent roster (max parallel)

| Wave | Agent ID | Task | Owns |
|------|----------|------|------|
| 1 | `rm-layers` | Task 1 | `web/puck/layers/**`, related tests |
| 1 | `rm-pen-ui` | Task 2 | pen blocks, PenLayerRenderer, pen block tests |
| 1 | `rm-preview` | Task 3 | preview routes, flag libs, page allowlists that only list preview slugs |
| 1 | `rm-scripts` | Task 4 | import/backup/restore scripts, fixtures, package.json scripts, export md |
| 2 | `wire-config` | Task 5 | `stackgen-config.tsx`, home/blog page Pen branches, env/compose `PUCK_LAYER_TREE`, openmemory/docs status lines |
| 3 | `fields-logos` | Task 6 | `StackGenHomeLogos` + merge/build-page-data logos |
| 3 | `fields-home-cta` | Task 7 | Home CTA audit (hero/problem/assemblies/footer already fields — verify merge + tests) |
| 3 | `fields-product-cta` | Task 8 | Product CTA audit + tests |
| 4 | `reseed-verify` | Task 9 | backup, force seed, delete hung migration, curl/admin verify |

---

## File map

| File / glob | Responsibility |
|-------------|----------------|
| `web/puck/layers/**` | DELETE — Pencil→LayerNode pipeline |
| `web/puck/blocks/pen/**` | DELETE — PenPage block |
| `web/components/puck/pen/**` | DELETE — Pen renderer |
| `web/app/(site)/puck-layers-preview/**` | DELETE — preview routes |
| `web/lib/puck-layer-tree-flag.ts` | DELETE |
| `web/lib/puck-layers-preview-routes.ts` | DELETE |
| `web/puck/fixtures/*` (Pen) | DELETE |
| `web/scripts/import-pencil-layers.ts` etc. | DELETE |
| `web/__tests__/pen-*` etc. | DELETE |
| `web/puck/stackgen-config.tsx` | Register only StackGen\*; fix categories |
| `web/app/(site)/page.tsx` | Remove Pen preference / flag logic |
| `web/app/(site)/blog/page.tsx` | Remove flag Pen branch (keep BlogChrome path) |
| `web/app/(site)/[slug]/page.tsx` | Remove puck-layers-preview allowlist entries |
| `web/puck/blocks/home/home-blocks.tsx` | Logos items + CTA verify |
| `web/puck/blocks/product/product-blocks.tsx` | Product CTA verify |
| `web/puck/lib/merge-content.ts` / `build-page-data.ts` | Logos merge + seed hydration |
| `stack/docker-compose.yml`, `*/.env.example` | Remove `PUCK_LAYER_TREE` |
| Specs/plans | Mark layer-tree abandoned; link this plan |

---

### Task 0: Coordinator — inventory lock (serial)

**Files:** none (read-only)

**Interfaces:**
- Produces: frozen delete list matching the design inventory (paste into Wave-1 prompts)

- [ ] **Step 1: Torbit index + list Pen paths**

Run:

```bash
# via Torbit MCP index on /Users/swami/Documents/Stackgen_Website_Redesign
# then:
cd /Users/swami/Documents/Stackgen_Website_Redesign && \
  rg -l 'PenPage|puck/layers|PUCK_LAYER_TREE|puck-layers-preview|seed:puck-layers' web stack docs/superpowers --glob '!NextJS.pen'
```

Expected: list includes layers, pen-blocks, preview, flag, scripts, fixtures, tests, config, compose.

- [ ] **Step 2: Launch Wave 1 — four Composer 2.5 subagents in one message**

Use Task tool ×4 with `model: "composer-2.5-fast"`, `run_in_background: true` if Multitask Mode, disjoint file lists from Tasks 1–4.

- [ ] **Step 3: Skip commit** (unless user asks)

---

### Task 1: Delete layers pipeline + unit tests (`rm-layers`)

**Files:**
- Delete: `web/puck/layers/types.ts`
- Delete: `web/puck/layers/diagram-keys.ts`
- Delete: `web/puck/layers/map-pencil-node.ts`
- Delete: `web/puck/layers/to-puck-data.ts`
- Delete: `web/puck/layers/resolve-pen-color.ts`
- Delete: `web/__tests__/pen-diagram-keys.test.ts`
- Delete: `web/__tests__/pen-map-pencil-node.test.ts`
- Delete: `web/__tests__/pen-to-puck-data.test.ts`
- Delete: `web/__tests__/resolve-pen-color.test.ts`
- Delete: `web/__tests__/pen-full-home-diagrams.test.tsx`
- Delete: `web/__tests__/pen-home-full-fixture-smoke.test.ts`
- Delete: `web/__tests__/pen-product-blog-fixtures.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: no remaining imports of `@/puck/layers/*` from deleted tests (config cleanup is Task 5)

- [ ] **Step 1: Delete the files listed above**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign && \
  rm -rf web/puck/layers && \
  rm -f web/__tests__/pen-diagram-keys.test.ts \
        web/__tests__/pen-map-pencil-node.test.ts \
        web/__tests__/pen-to-puck-data.test.ts \
        web/__tests__/resolve-pen-color.test.ts \
        web/__tests__/pen-full-home-diagrams.test.tsx \
        web/__tests__/pen-home-full-fixture-smoke.test.ts \
        web/__tests__/pen-product-blog-fixtures.test.ts
```

- [ ] **Step 2: Confirm no leftover layers dir**

Run: `test ! -d web/puck/layers && echo OK`

- [ ] **Step 3: Skip commit**

---

### Task 2: Delete Pen UI blocks + renderer (`rm-pen-ui`)

**Files:**
- Delete: `web/puck/blocks/pen/pen-blocks.tsx`
- Delete: `web/components/puck/pen/PenLayerRenderer.tsx`
- Delete: `web/__tests__/pen-layer-renderer.test.tsx`
- Delete: `web/__tests__/pen-cutover-config.test.ts` (if it only asserts Pen category — else leave for Task 5 to rewrite)

**Interfaces:**
- Produces: absence of `penBlocks` module (Task 5 removes import)

- [ ] **Step 1: Delete pen UI files**

```bash
rm -rf web/puck/blocks/pen web/components/puck/pen \
  && rm -f web/__tests__/pen-layer-renderer.test.tsx
```

- [ ] **Step 2: If `pen-cutover-config.test.ts` only checks Pen categories, delete it; if it also asserts StackGen categories, rewrite in Task 5 instead**

- [ ] **Step 3: Skip commit**

---

### Task 3: Delete preview routes + flag libs (`rm-preview`)

**Files:**
- Delete: `web/app/(site)/puck-layers-preview/page.tsx`
- Delete: `web/app/(site)/puck-layers-preview/[segment]/page.tsx`
- Delete: `web/lib/puck-layer-tree-flag.ts`
- Delete: `web/lib/puck-layers-preview-routes.ts`
- Delete: `web/__tests__/puck-layer-tree-flag.test.ts`
- Modify (minimal): `web/app/(site)/[slug]/page.tsx` — remove `puck-layers-preview*` from any reserved-slug allowlist **only**

**Interfaces:**
- Produces: no `isPuckLayerTreeEnabled` module (Task 5 cleans remaining imports)

- [ ] **Step 1: Delete preview + flag**

```bash
rm -rf web/app/\(site\)/puck-layers-preview \
  && rm -f web/lib/puck-layer-tree-flag.ts \
           web/lib/puck-layers-preview-routes.ts \
           web/__tests__/puck-layer-tree-flag.test.ts
```

- [ ] **Step 2: Edit `[slug]/page.tsx` allowlist — remove preview slugs only; do not change other routing**

- [ ] **Step 3: Skip commit**

---

### Task 4: Delete scripts, fixtures, package scripts (`rm-scripts`)

**Files:**
- Delete: `web/scripts/import-pencil-layers.ts`
- Delete: `web/scripts/backup-puck-cutover.ts`
- Delete: `web/scripts/restore-puck-cutover.ts`
- Delete: `web/scripts/export-pencil-home.md`
- Delete: `web/scripts/export-pencil-routes.md`
- Delete: `web/puck/fixtures/home-zXASg-full.json`
- Delete: `web/puck/fixtures/home-zXASg-sample.json`
- Delete: `web/puck/fixtures/product-OMSRP-infraops.json`
- Delete: `web/puck/fixtures/product-vYkqy-devops.json`
- Delete: `web/puck/fixtures/product-erC3o-observability.json`
- Delete: `web/puck/fixtures/product-Sq7BQ-sre.json`
- Delete: `web/puck/fixtures/blog-pkPOQ.json`
- Delete: `web/puck/fixtures/blog-NJGqF-post.json`
- Delete: `web/puck/fixtures/routes-manifest.json`
- Delete: `web/puck/fixtures/cutover-manifest.json`
- Modify: `web/package.json` — remove scripts `seed:puck-layers`, `seed:puck-layers-routes`, `seed:puck-layers-cutover`, `backup:puck-cutover`

**Interfaces:**
- Produces: `package.json` without Pen seed scripts; keep `seed:puck-home`, `seed:puck-products`, `seed:puck-all`

- [ ] **Step 1: Delete scripts + fixtures**

```bash
rm -f web/scripts/import-pencil-layers.ts \
      web/scripts/backup-puck-cutover.ts \
      web/scripts/restore-puck-cutover.ts \
      web/scripts/export-pencil-home.md \
      web/scripts/export-pencil-routes.md \
 && rm -rf web/puck/fixtures
```

- [ ] **Step 2: Edit `web/package.json` — remove the four Pen-related scripts; leave `seed:puck-home|products|posts|all|demo`**

- [ ] **Step 3: Skip commit**

---

### Task 5: Config + route merge gate (`wire-config`) — SERIAL after Wave 1

**Files:**
- Modify: `web/puck/stackgen-config.tsx`
- Modify: `web/app/(site)/page.tsx`
- Modify: `web/app/(site)/blog/page.tsx`
- Modify: `stack/docker-compose.yml`
- Modify: `stack/.env.example`, `web/.env.example` (and `stack/.env` / `web/.env` if present — set/remove `PUCK_LAYER_TREE`)
- Modify: `docs/superpowers/specs/2026-09-02-puck-pencil-layer-tree-design.md` — status **Abandoned**
- Modify: `docs/superpowers/plans/2026-09-02-puck-pencil-layer-tree.md` — banner abandoned
- Modify: `openmemory.md` — remove/replace Pen cutover pattern lines with pointer to new spec
- Test: rewrite or add `web/__tests__/stackgen-config-categories.test.ts`

**Interfaces:**
- Consumes: Wave 1 deletions complete (no `penBlocks` / flag modules)
- Produces: `stackgenConfig` with StackGen\* only; home always renders homepage `puckData`

- [ ] **Step 1: Write failing test for categories (no Pen, no Legacy title)**

```ts
// web/__tests__/stackgen-config-categories.test.ts
import { describe, expect, it } from "vitest";
import { stackgenConfig } from "@/puck/stackgen-config";

describe("stackgenConfig", () => {
  it("does not register PenPage", () => {
    expect(stackgenConfig.components).not.toHaveProperty("PenPage");
  });
  it("registers StackGenHomeHero", () => {
    expect(stackgenConfig.components).toHaveProperty("StackGenHomeHero");
  });
  it("does not use Legacy StackGen category title", () => {
    const titles = Object.values(stackgenConfig.categories ?? {}).map(
      (c: { title?: string }) => c.title,
    );
    expect(titles.join(" ")).not.toMatch(/Legacy StackGen/i);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL until config fixed**

Run: `cd web && pnpm exec vitest run __tests__/stackgen-config-categories.test.ts`

- [ ] **Step 3: Fix `stackgen-config.tsx`**

Remove `penBlocks` import and spread. Categories example:

```tsx
const stackGenCategories = {
  chrome: { title: "Chrome", components: ["StackGenNav", "StackGenFooter"] },
  home: {
    title: "Home",
    components: Object.keys(homeBlocks),
  },
  product: {
    title: "Product",
    components: Object.keys(productBlocks),
  },
  blog: {
    title: "Blog",
    components: Object.keys(blogBlocks),
  },
};
```

(Adjust keys to match actual exported block maps.)

- [ ] **Step 4: Simplify `page.tsx`**

Remove `isPuckLayerTreeEnabled`, `isPenPageData`, and preview slug fallback. Keep: load homepage → `<PuckSitePage data={...} />`.

- [ ] **Step 5: Simplify `blog/page.tsx`**

Remove flag branch that loads Pen `blog` page; always use BlogChrome listing (or existing non-Pen path).

- [ ] **Step 6: Remove `PUCK_LAYER_TREE` from compose + env examples**

- [ ] **Step 7: Run tests**

```bash
cd web && pnpm exec vitest run __tests__/stackgen-config-categories.test.ts
```

Expected: PASS

- [ ] **Step 8: Typecheck import graph**

```bash
cd web && pnpm exec tsc --noEmit 2>&1 | head -40
```

Expected: no errors referencing deleted Pen modules

- [ ] **Step 9: Skip commit**

---

### Task 6: Home logos editable (`fields-logos`) — PARALLEL Wave 3

**Files:**
- Modify: `web/puck/blocks/home/home-blocks.tsx` (`StackGenHomeLogos` only)
- Modify: `web/puck/lib/merge-content.ts` (logos merge path only)
- Modify: `web/puck/lib/build-page-data.ts` (hydrate `items` from replica logos)
- Test: `web/__tests__/stackgen-home-logos-fields.test.ts`

**Interfaces:**
- Consumes: `logoItemFields` from `web/puck/fields/common.ts`
- Produces: `StackGenHomeLogos` props `{ eyebrow?: string; items: { src: string; alt: string }[] }`

- [ ] **Step 1: Failing test — logos fields include items array**

```ts
import { describe, expect, it } from "vitest";
import { homeBlocks } from "@/puck/blocks/home/home-blocks";

describe("StackGenHomeLogos", () => {
  it("exposes items array field", () => {
    const fields = homeBlocks.StackGenHomeLogos.fields as Record<string, { type?: string }>;
    expect(fields.items?.type).toBe("array");
  });
});
```

- [ ] **Step 2: Run — expect FAIL if `items` missing**

- [ ] **Step 3: Add `items` field using `logoItemFields`; defaultProps from `replicaContent.logos`; merge in `mergeReplicaContent`**

- [ ] **Step 4: Ensure `buildHomePuckDataFromContent` writes `items`**

- [ ] **Step 5: Re-run test — PASS**

- [ ] **Step 6: Skip commit**

---

### Task 7: Home CTA audit (`fields-home-cta`) — PARALLEL Wave 3

**Files:**
- Modify: `web/puck/blocks/home/home-blocks.tsx` (only if a CTA gap found)
- Modify: `web/puck/blocks/chrome/chrome-blocks.tsx` (only if footer/nav CTA gap)
- Test: `web/__tests__/stackgen-home-cta-fields.test.ts`

**Interfaces:**
- Consumes: `ctaFields`, `linkFields`
- Produces: test asserting hero/nav/footer/problem/assemblies expose label+href fields

- [ ] **Step 1: Write audit test**

```ts
import { describe, expect, it } from "vitest";
import { homeBlocks } from "@/puck/blocks/home/home-blocks";
import { chromeBlocks } from "@/puck/blocks/chrome/chrome-blocks"; // export name may be stackGenNavBlock — import actual exports

function hasKeys(fields: Record<string, unknown>, keys: string[]) {
  for (const k of keys) expect(fields).toHaveProperty(k);
}

describe("home CTAs editable", () => {
  it("hero has primary/secondary CTA fields", () => {
    hasKeys(homeBlocks.StackGenHomeHero.fields as Record<string, unknown>, [
      "primaryCta",
      "primaryHref",
      "secondaryCta",
      "secondaryHref",
    ]);
  });
});
```

Extend assertions for Problem `learnMoreLabel`/`learnMoreHref`, Assemblies same, Nav `ctaLabel`/`ctaHref`, Footer `cta`/`ctaHref`.

- [ ] **Step 2: Run test — fix any missing fields by adding fields + merge (do not change Replica components)**

- [ ] **Step 3: Skip commit**

---

### Task 8: Product CTA audit (`fields-product-cta`) — PARALLEL Wave 3

**Files:**
- Modify: `web/puck/blocks/product/product-blocks.tsx` (only gaps)
- Test: `web/__tests__/stackgen-product-cta-fields.test.ts`

**Interfaces:**
- Produces: hero `ctaFields` + final CTA `cta`/`href` asserted

- [ ] **Step 1: Write product CTA field test (hero + FinalCta)**

- [ ] **Step 2: Run; add any missing label/href fields; ensure `render` passes them into product content merge**

- [ ] **Step 3: Skip commit**

---

### Task 9: Reseed + live verify (`reseed-verify`) — SERIAL Wave 4

**Files:**
- None required (ops); optional one-shot backup under `.superpowers/sdd/backups/stackgen-reseed-<stamp>/`

**Interfaces:**
- Consumes: Tasks 5–8 merged; Docker web healthy; `PUCK_LAYER_TREE` unset/0

- [ ] **Step 1: Backup current home + product puckData** (pg or Payload script — do **not** recreate Pen cutover scripts; a short inline `tsx` or `psql` copy is fine)

- [ ] **Step 2: Force reseed**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/web && \
  pnpm seed:puck-home -- --force && \
  pnpm seed:puck-products -- --force
```

- [ ] **Step 3: Clear hung migration if present**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/stack && \
  docker compose exec -T postgres psql -U payload -d payload \
    -c "DELETE FROM payload_migrations WHERE name='dev' AND batch=-1;"
```

- [ ] **Step 4: Recreate web if needed; confirm healthy**

```bash
PUCK_LAYER_TREE=0 docker compose up -d --force-recreate web
# wait healthy
curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/
# expect 200
curl -sS http://127.0.0.1:3000/ | rg -c 'pen-layer|PenPage' || true
# expect 0 matches for pen-layer/PenPage
```

- [ ] **Step 5: CTA round-trip (API or admin)**

Login as `editor@stackgen.local` (or current local admin). Confirm Pages → Home shows StackGen\* blocks with primary CTA fields. Optionally PATCH via Local API / admin UI and refresh `/`.

- [ ] **Step 6: Product spot-check**

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/product/aiden-for-infraops
# expect 200
```

- [ ] **Step 7: Run focused vitest suite**

```bash
cd web && pnpm exec vitest run \
  __tests__/stackgen-config-categories.test.ts \
  __tests__/stackgen-home-logos-fields.test.ts \
  __tests__/stackgen-home-cta-fields.test.ts \
  __tests__/stackgen-product-cta-fields.test.ts
```

Expected: all PASS

- [ ] **Step 8: Skip commit** (ask user to commit)

---

## Wave checklist (coordinator)

- [ ] Wave 0 done — inventory locked
- [ ] Wave 1 — Tasks 1–4 merged, no delete conflicts
- [ ] Wave 2 — Task 5 green (`tsc` + category test)
- [ ] Wave 3 — Tasks 6–8 merged, field tests green
- [ ] Wave 4 — Task 9 reseed + live verify

---

## Plan self-review

| Spec requirement | Task |
|------------------|------|
| Delete layers / pen / preview / flag / scripts / fixtures / tests | 1–4 |
| Unregister Pen; StackGen primary categories; strip flag from routes/env | 5 |
| Logos items editable | 6 |
| All home/product buttons label+href | 7–8 |
| Force reseed + verify no Pen on public site | 9 |
| Keep NextJS.pen | Global constraint (no task deletes it) |
| Blog expansion | Explicit non-goal |
| Max parallel Composer 2.5 | Parallel execution model + roster |

No TBD placeholders. Commit steps deferred to user ask.
