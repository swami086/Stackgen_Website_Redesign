# SRE Sourcegraph-structure copy Implementation Plan

> **For agentic workers:** Inline execution. Copy-only. No git commit unless the user asks.

**Goal:** Put the locked copy from `docs/superpowers/specs/2026-08-31-sre-sourcegraph-copy-design.md` on public marketing surfaces.

**Architecture:** Content lives in typed modules (`replica.ts`, `products.ts`, `product-mega-menu.ts`). One UI tweak: hide empty problem punchline. Tests assert H1, problem H2, product hero tokens, and CTA.

**Tech Stack:** Next.js content modules, Vitest, React Testing Library.

## Global Constraints

- Homepage H1: `Take control of production.`
- Claim: `Focus on outcomes, not agents.`
- CTA: `Schedule a demo` → `/schedule-demo`
- Alert, not “page” for PagerDuty
- No em dashes in public marketing copy
- Product hero tokens: IDE / IDP / Grafana / Detect
- Docs corpus out of scope
- No commit unless asked

---

### Task 1: Update failing tests to locked copy

**Files:**
- Modify: `web/__tests__/replica-home.test.tsx`
- Modify: `web/__tests__/products-placeholder.test.tsx`

- [ ] **Step 1:** In `replica-home.test.tsx`, change both H1 asserts to `Takecontrolofproduction.` and problem H2 to `/AI code is hitting production/i`.
- [ ] **Step 2:** In `products-placeholder.test.tsx` `product pages speak SRE job language`:
  - InfraOps sub: `/IDE/` and `/alert/i` (drop `pages you`)
  - InfraOps problem heading: `/alert/i` (drop `/page/i`)
  - Observability problem body: `/on-call|alert/i` (drop `lose control`)
  - SRE hero: `/Detect/` only for on-call (sub has no “on-call”)
  - Mega SRE description: `/Detect/` (drop `war room` on description)
  - Mega Observability: `/Grafana/` (drop required `on-call`)
  - Keep SRE `finalCta.subhead` `/war room/i` (that subhead stays)

- [ ] **Step 3:** Run tests; expect FAIL on old copy.

```
cd web && pnpm exec vitest run __tests__/replica-home.test.tsx __tests__/products-placeholder.test.tsx
```

---

### Task 2: Homepage + punchline hide

**Files:**
- Modify: `web/content/replica.ts`
- Modify: `web/components/replica/sections/Problem.tsx`

- [ ] **Step 1:** Apply spec §3 strings to `replicaContent` (hero, problem, solution, pillars, roles, footer). `punchline: ""`.
- [ ] **Step 2:** Render punchline only when non-empty.
- [ ] **Step 3:** Re-run replica-home tests. Expect PASS.

---

### Task 3: Product pages, mega menu, meta, leftovers

**Files:**
- Modify: `web/content/products.ts` (hero/problem/finalCta per spec §4; strip lose-control / pages you / Humans keep authority on public strings)
- Modify: `web/content/product-mega-menu.ts` (§5)
- Modify: `web/app/layout.tsx` description (§6)
- Modify: `web/content/diagram-placeholders.ts` (match pillar/mega lines)
- Modify: `.agents/product-marketing.md` v1.7

- [ ] **Step 1:** Apply locked strings.
- [ ] **Step 2:** Grep `web/` for `Outcomes, not agents`, `Humans keep authority`, `lose control`, `pages you`.
- [ ] **Step 3:** Run vitest on replica-home, products-placeholder, sections-motion, diagram-offerings.
- [ ] **Step 4:** Browser-check `/` and four product routes.

---

## Self-review

- Spec §§3–6 each have a task.
- Commits omitted per user rule.
- Observability mega dropped on-call; test updated in Task 1.
