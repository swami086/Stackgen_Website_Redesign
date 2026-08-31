# Autonomous Operations Factory — Homepage Wave 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remap the replica homepage on `homepage-p0` to the Autonomous Operations Factory story (deck p3–14): Hero “Outcomes, not agents.”, Schedule-demo CTAs, Factory naming, and section copy — without waiting on unfinished Pencil diagram fidelity.

**Architecture:** Content SoT stays `web/content/replica.ts`. Keep `HomeReplica` section shells; rewrite strings, CTAs, and product titles. Rename public products to InfraOps / DevOps via `web/lib/products.ts` + redirects. Diagram React ports stay **gated** (park Ops Lag Pencil work; keep current Problem film / existing diagrams until frames are approved). Wave 2 product deep dives are a separate plan.

**Tech Stack:** Next.js App Router, React 19, Vitest + Testing Library, Tailwind + Soft Structuralism `$ds-*` / replica tokens, existing Motion.

**Spec:** `docs/superpowers/specs/2026-08-31-autonomous-operations-factory-site-ia-design.md`  
**Supersedes for homepage:** Approach C plan `docs/superpowers/plans/2026-08-31-homepage-approach-c-content-rewrite.md` (H1 / naming / primary CTA).

## Global Constraints

- Factory brand everywhere: **Autonomous Operations Factory** (never ADF / Autonomous DevOps Factory on public web).
- Public product names: **Aiden for InfraOps · DevOps · Observability · SRE** (never Infrastructure / Automation / Olly / InfraOps as product-level “DevOps Factory”).
- Locked slugs (this plan): `/product/aiden-for-infraops`, `/product/aiden-for-devops` (+ keep observability / sre). Redirects from old Infrastructure / Automation paths.
- Hero H1: **Outcomes, not agents.** Primary CTA **Schedule a demo** → `/schedule-demo`. Secondary **How it works** → `#how-it-works`.
- Proof: **logos only** — no MTTR / Autonomy Index / % on public web.
- Soft Structuralism only; no new dependencies.
- Branch default: **`homepage-p0`** (do not require factory-* worktrees).
- **Diagram gate:** Do not replace live React diagrams with Nano Banana rasters. Pencil Ops Lag / Factory pillars / Intent→Spec / Offerings redraw continues later; until approve, keep existing `ProblemChaosFilm` / Assemblies / OCG / Offerings visuals with Factory copy wrappers.
- Commit only when the user asks (or when execution is explicitly started with commits enabled).

---

## File map

| File | Role |
|------|------|
| `PRODUCT.md` | Binding names → InfraOps / DevOps / AOF |
| `.agents/product-marketing.md` | Marketing SoT align |
| `web/lib/products.ts` | Slug + title + href map |
| `web/lib/product-media.ts` | Media key unions if slug-typed |
| `web/app/product/[slug]/page.tsx` (and related) | Accept new slugs |
| `web/next.config.ts` or `web/next.config.mjs` | Redirects Infrastructure→InfraOps, Automation→DevOps |
| `web/content/replica.ts` | Homepage copy + hrefs |
| `web/components/replica/HomeReplica.tsx` | Confirm order; wire `#how-it-works` target |
| `web/components/replica/sections/Hero.tsx` | Content-driven H1/CTAs (likely already) |
| `web/components/replica/sections/Assemblies.tsx` | Retitle How it works; `id="how-it-works"` |
| `web/components/replica/sections/Problem.tsx` | Ops-lag copy; keep film until Pencil approve |
| `web/components/replica/sections/Solution.tsx` | AOF introduce copy |
| `web/components/replica/sections/Shell.tsx` | World Model / OCG retitle |
| `web/components/replica/sections/WhoItsFor.tsx` | Four offerings InfraOps·DevOps·… |
| `web/components/replica/sections/Footer.tsx` | Factory CTA |
| `web/components/replica/nav/ProductMegaMenu.tsx` | Product labels + hrefs |
| `web/components/replica/diagrams/Offerings.tsx` | Title strings only (visual later) |
| `web/components/replica/diagrams/OperationalContextGraph.tsx` | Title strings only |
| `web/__tests__/replica-home.test.tsx` | H1, CTAs, Factory strings, order |
| `web/__tests__/products-placeholder.test.tsx` | New titles/slugs |
| `web/__tests__/sections-motion.test.tsx` | Link names |
| Governance / ban tests if present | Allow InfraOps/DevOps; ban Infrastructure/Automation on public copy |

**Out of this plan (Wave 2 / later):** product deep-dive pages from deck p23–38; Pencil diagram accuracy for Ops Lag / pillars / Intent→Spec; React diagram component swaps.

---

### Task 1: Lock PRODUCT.md + product-marketing naming

**Files:**
- Modify: `PRODUCT.md`
- Modify: `.agents/product-marketing.md`
- Test: grep-based assertion in shell (no app test yet)

**Interfaces:**
- Produces: Binding public names InfraOps / DevOps / Autonomous Operations Factory for later tasks

- [ ] **Step 1: Write failing naming check script output expectation**

Run from repo root:

```bash
rg -n "Aiden for Infrastructure|Aiden for Automation|Autonomous DevOps Factory" PRODUCT.md .agents/product-marketing.md || true
```

Expected before edit: matches still present (or PRODUCT still says Infrastructure). After Task 1: **zero** public-facing Infrastructure/Automation/ADF strings in those two files (internal notes OK only if explicitly marked superseded).

- [ ] **Step 2: Update PRODUCT.md Capabilities / naming table**

Replace public product names with:

```markdown
- Parent category: **Autonomous Operations Factory (AOF)**
- **Aiden for InfraOps**
- **Aiden for DevOps**
- **Aiden for Observability**
- **Aiden for SRE**
```

Add one line: `Superseded 2026-08-31: Infrastructure / Automation / ADF per Website Sequencing deck + AOF site IA design.`

- [ ] **Step 3: Align `.agents/product-marketing.md` primary naming**

Same four product titles + Autonomous Operations Factory; Schedule a demo primary CTA unchanged.

- [ ] **Step 4: Re-run naming check**

```bash
rg -n "Aiden for Infrastructure|Aiden for Automation|Autonomous DevOps Factory" PRODUCT.md .agents/product-marketing.md
```

Expected: no matches (or only inside a clearly labeled “Historical / superseded” note).

- [ ] **Step 5: Commit** (only if user enabled commits)

```bash
git add PRODUCT.md .agents/product-marketing.md
git commit -m "$(cat <<'EOF'
docs: lock AOF + InfraOps/DevOps public naming

EOF
)"
```

---

### Task 2: Product slugs + redirects

**Files:**
- Modify: `web/lib/products.ts`
- Modify: `web/lib/product-media.ts` (if slug union lives there)
- Modify: Next config redirects (`web/next.config.ts` or `web/next.config.mjs` — use whichever exists)
- Modify: `web/__tests__/products-placeholder.test.tsx`
- Test: `web/__tests__/products-placeholder.test.tsx`

**Interfaces:**
- Consumes: Task 1 naming
- Produces: `ProductSlug` includes `aiden-for-infraops` | `aiden-for-devops`; `PRODUCTS` titles/hrefs; redirects from old paths

- [ ] **Step 1: Write failing product tests**

In `web/__tests__/products-placeholder.test.tsx`, replace Infrastructure/Automation expectations with:

```tsx
expect(PRODUCT_SLUGS).toEqual([
  "aiden-for-infraops",
  "aiden-for-devops",
  "aiden-for-observability",
  "aiden-for-sre",
]);

expect(PRODUCTS["aiden-for-infraops"].title).toBe("Aiden for InfraOps");
expect(PRODUCTS["aiden-for-devops"].title).toBe("Aiden for DevOps");
expect(PRODUCTS["aiden-for-infraops"].href).toBe("/product/aiden-for-infraops");
expect(PRODUCTS["aiden-for-devops"].href).toBe("/product/aiden-for-devops");
```

Update any `renderProduct("aiden-for-infrastructure")` calls to `aiden-for-infraops`.

- [ ] **Step 2: Run tests — expect FAIL**

```bash
cd web && pnpm exec vitest run __tests__/products-placeholder.test.tsx
```

Expected: FAIL on slug/title mismatch.

- [ ] **Step 3: Implement `web/lib/products.ts`**

```ts
export const PRODUCT_SLUGS = [
  "aiden-for-infraops",
  "aiden-for-devops",
  "aiden-for-observability",
  "aiden-for-sre",
] as const;

export const PRODUCTS: Record<ProductSlug, ProductMeta> = {
  "aiden-for-infraops": {
    slug: "aiden-for-infraops",
    phase: "Build",
    title: "Aiden for InfraOps",
    href: "/product/aiden-for-infraops",
    pencilFrameId: "qwI1S", // keep existing Pencil shelf until retitled
  },
  "aiden-for-devops": {
    slug: "aiden-for-devops",
    phase: "Operate",
    title: "Aiden for DevOps",
    href: "/product/aiden-for-devops",
    pencilFrameId: "llzpJ",
  },
  "aiden-for-observability": {
    slug: "aiden-for-observability",
    phase: "Observe",
    title: "Aiden for Observability",
    href: "/product/aiden-for-observability",
    pencilFrameId: "JQkAE",
  },
  "aiden-for-sre": {
    slug: "aiden-for-sre",
    phase: "Remediate",
    title: "Aiden for SRE",
    href: "/product/aiden-for-sre",
    pencilFrameId: "TIh4G",
  },
};
```

Update every `aiden-for-infrastructure` / `aiden-for-automation` reference under `web/` (WhoItsFor media map, product-media, mega-menu, tests).

- [ ] **Step 4: Add permanent redirects**

In Next config `redirects()`:

```ts
{
  source: "/product/aiden-for-infrastructure",
  destination: "/product/aiden-for-infraops",
  permanent: true,
},
{
  source: "/product/aiden-for-automation",
  destination: "/product/aiden-for-devops",
  permanent: true,
},
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
cd web && pnpm exec vitest run __tests__/products-placeholder.test.tsx
```

- [ ] **Step 6: Commit** (if enabled)

```bash
git add web/lib/products.ts web/lib/product-media.ts web/next.config.* web/__tests__/products-placeholder.test.tsx web/components/replica/sections/WhoItsFor.tsx web/components/replica/nav/ProductMegaMenu.tsx
git commit -m "$(cat <<'EOF'
feat: rename product slugs to InfraOps and DevOps

EOF
)"
```

---

### Task 3: Homepage content contract (Hero + nav + Factory spine)

**Files:**
- Modify: `web/content/replica.ts`
- Modify: `web/__tests__/replica-home.test.tsx`
- Test: `web/__tests__/replica-home.test.tsx`

**Interfaces:**
- Consumes: Task 2 hrefs
- Produces: `replicaContent` Factory hero/problem/solution/assemblies/shell/who/footer strings

- [ ] **Step 1: Write failing homepage assertions**

```tsx
test("Factory homepage hero and CTAs", () => {
  renderHome("dark");
  expect(
    screen.getByRole("heading", { level: 1, name: "Outcomes, not agents." }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Schedule a demo" })).toHaveAttribute(
    "href",
    "/schedule-demo",
  );
  expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute(
    "href",
    "#how-it-works",
  );
});

test("Factory brand appears in how-it-works / assemblies", () => {
  renderHome("dark");
  expect(screen.getByText(/Autonomous Operations Factory/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
cd web && pnpm exec vitest run __tests__/replica-home.test.tsx
```

- [ ] **Step 3: Patch `web/content/replica.ts` (exact copy)**

```ts
hero: {
  heading: "Outcomes, not agents.",
  sub: "The Autonomous Operations Factory turns how you build, ship, run, and improve software into reliable, repeatable action — with humans keeping authority.",
  primaryCta: "Schedule a demo",
  primaryHref: "/schedule-demo",
  secondaryCta: "How it works",
  secondaryHref: "#how-it-works",
},
problem: {
  eyebrow: "The problem",
  heading: "Outer Ops loop is failing to keep up with inner Dev loop",
  body: "AI accelerated the inner Dev loop. The outer Ops loop — observe, operate, remediate under compliance — did not keep up. Feedback is slow. Signal is noisy.",
  punchline: "Slow feedback / noisy signal",
  filmCaption: "Inner loop minutes · Outer loop hours to days",
  // keep symptoms array for sr-only / film fragments; optional trim later
},
solution: {
  eyebrow: "The solution",
  heading: "Autonomous Operations Factory",
  body: "One factory for Build, Operate, Observe, and Remediate — learning back into a Shared World Model, with humans keeping authority.",
  claim: "Outcomes, not agents.",
  demoLabelLeft: "Ops lag",
  demoLabelRight: "Factory path",
  demoCaption: "From intent to repeatable action under policy.",
},
assemblies: {
  eyebrow: "How it works",
  heading: "Intent → Spec → Runtime → Learning",
  body: "State the outcome. Get a Factory Spec. Run it. Learn back into the Shared World Model — the Autonomous Operations Factory path.",
  learnMore: { /* keep existing blog href or drop if unused */ },
},
shell: {
  eyebrow: "SHARED WORLD MODEL",
  heading: "One Operational Context Graph",
  body1: "Four Bodies of shared context so every Aiden product sees the same estate.",
  body2: "Cross-domain plays without rebuilding the picture every page.",
},
whoItsFor: {
  eyebrow: "Offerings",
  heading: "Four products on Aiden OS",
  sub: "InfraOps, DevOps, Observability, and SRE — one context layer.",
  pillars: [
    {
      label: "Build",
      title: "Aiden for InfraOps",
      body: "Intent to policy-checked infrastructure change in your Git.",
      href: "/product/aiden-for-infraops",
    },
    {
      label: "Operate",
      title: "Aiden for DevOps",
      body: "Delivery and automation that verify themselves under policy.",
      href: "/product/aiden-for-devops",
    },
    {
      label: "Observe",
      title: "Aiden for Observability",
      body: "Signals that already know what changed.",
      href: "/product/aiden-for-observability",
    },
    {
      label: "Remediate",
      title: "Aiden for SRE",
      body: "Context-backed incident response under bounded autonomy.",
      href: "/product/aiden-for-sre",
    },
  ],
},
```

Keep `nav.cta` as Schedule a demo → `/schedule-demo`. Update footer heading/CTA to Factory + Schedule a demo if present.

- [ ] **Step 4: Run — expect PASS** (may still fail until Task 4 wires `id`)

```bash
cd web && pnpm exec vitest run __tests__/replica-home.test.tsx
```

- [ ] **Step 5: Commit** (if enabled)

```bash
git add web/content/replica.ts web/__tests__/replica-home.test.tsx
git commit -m "$(cat <<'EOF'
content: Factory homepage hero and section copy

EOF
)"
```

---

### Task 4: Wire `#how-it-works` + section chrome

**Files:**
- Modify: `web/components/replica/sections/Assemblies.tsx`
- Modify: `web/components/replica/sections/Hero.tsx` (only if CTAs hardcode hrefs)
- Modify: `web/components/replica/sections/WhoItsFor.tsx` (slug keys for media map)
- Modify: `web/components/replica/diagrams/Offerings.tsx` (titles only)
- Modify: `web/components/replica/diagrams/OperationalContextGraph.tsx` / `ContextGraph.tsx` (display titles only)
- Test: `web/__tests__/replica-home.test.tsx`, `web/__tests__/sections-motion.test.tsx`, diagram title tests

**Interfaces:**
- Consumes: `replicaContent.assemblies`, product titles
- Produces: DOM `id="how-it-works"` on Assemblies section root

- [ ] **Step 1: Failing test for anchor target**

```tsx
test("how-it-works anchor exists on assemblies", () => {
  renderHome("dark");
  expect(document.getElementById("how-it-works")).toBeTruthy();
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
cd web && pnpm exec vitest run __tests__/replica-home.test.tsx -t "how-it-works"
```

- [ ] **Step 3: Add `id="how-it-works"` to Assemblies section root**

On the outermost `<section>` in `Assemblies.tsx`:

```tsx
<section id="how-it-works" data-pencil-id={...} ...>
```

Ensure Hero secondary link uses `replicaContent.hero.secondaryHref` (already `#how-it-works` after Task 3).

- [ ] **Step 4: Update WhoItsFor media map keys** from `aiden-for-infrastructure` → `aiden-for-infraops`, `aiden-for-automation` → `aiden-for-devops`.

- [ ] **Step 5: String-only diagram title updates**

In `Offerings.tsx` / OCG card titles, replace Infrastructure→InfraOps, Automation→DevOps. Do **not** rebuild diagram layout in this task.

- [ ] **Step 6: Run related tests**

```bash
cd web && pnpm exec vitest run __tests__/replica-home.test.tsx __tests__/sections-motion.test.tsx __tests__/diagram-offerings.test.tsx __tests__/diagram-ocg-v2p0l.test.tsx
```

Expected: PASS (update assertion strings in those tests to InfraOps/DevOps).

- [ ] **Step 7: Commit** (if enabled)

```bash
git add web/components/replica/sections/Assemblies.tsx web/components/replica/sections/WhoItsFor.tsx web/components/replica/diagrams/Offerings.tsx web/components/replica/diagrams/OperationalContextGraph.tsx web/components/replica/diagrams/ContextGraph.tsx web/__tests__
git commit -m "$(cat <<'EOF'
feat: wire how-it-works anchor and Factory product titles

EOF
)"
```

---

### Task 5: Governance / ban-scan flip

**Files:**
- Modify: any vitest content-governance or banned-name tests under `web/__tests__/`
- Grep: `web/` for leftover public Infrastructure/Automation product titles

**Interfaces:**
- Consumes: Task 2–4 naming
- Produces: Tests that **allow** InfraOps/DevOps and **ban** Olly + old public Infrastructure/Automation product titles on homepage/content modules

- [ ] **Step 1: Inventory leftovers**

```bash
cd web && rg -n "Aiden for Infrastructure|Aiden for Automation|Autonomous DevOps Factory|Olly" --glob '!**/node_modules/**'
```

- [ ] **Step 2: Fix each hit** (content, aria-labels, tests). Leave code identifiers / Pencil frame comments if needed; user-facing strings must flip.

- [ ] **Step 3: Invert governance expectations** where tests previously banned InfraOps/DevOps — they now ban Infrastructure/Automation as public product titles.

- [ ] **Step 4: Run full relevant suite**

```bash
cd web && pnpm exec vitest run __tests__/replica-home.test.tsx __tests__/products-placeholder.test.tsx __tests__/sections-motion.test.tsx __tests__/nav-hero-motion.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit** (if enabled)

```bash
git add web
git commit -m "$(cat <<'EOF'
test: flip public naming bans to InfraOps and DevOps

EOF
)"
```

---

### Task 6: Park diagram work (explicit non-implementation gate)

**Files:**
- Modify: `docs/superpowers/specs/2026-08-31-autonomous-operations-factory-site-ia-design.md` status line only
- Create (optional note): none required if this plan section is enough

**Interfaces:**
- Produces: Written gate so agents do not “finish” diagrams in Wave 1 React

- [ ] **Step 1: Update design spec status**

Change header Status to:

```markdown
**Status:** Design approved. Wave 1 **content/naming plan** ready (`docs/superpowers/plans/2026-08-31-aof-homepage-wave1.md`). Pencil diagram fidelity (Ops Lag + remaining queue) **parked** — resume before React diagram swaps.
```

- [ ] **Step 2: Do not change** `ProblemChaosFilm.tsx`, `InnerOuterLoop.tsx`, or Pencil `ifJjx` in this wave unless user unparks diagrams.

- [ ] **Step 3: Checklist for resume (when user returns)**

1. Approve Pencil Ops Lag (`ifJjx` vs soft-B SoT `IOgtr`)  
2. Nano Banana + Pencil for Solution pillars / How it works / Offerings  
3. Then React diagram ports + `replica-frames.ts` ids  

- [ ] **Step 4: Commit spec status** (if enabled)

```bash
git add docs/superpowers/specs/2026-08-31-autonomous-operations-factory-site-ia-design.md
git commit -m "$(cat <<'EOF'
docs: park AOF diagram work pending Pencil approval

EOF
)"
```

---

## Wave 2 (separate plan — do not implement here)

- Product deep dives: SRE p23–28, InfraOps p29–30, DevOps p31–32, Observability  
- Full Pencil diagram queue React ports  
- Write as `docs/superpowers/plans/YYYY-MM-DD-aof-product-pages-wave2.md` after Wave 1 content ships  

---

## Self-review (spec coverage)

| Spec requirement | Task |
|---|---|
| Factory brand AOF | 1, 3 |
| Product names InfraOps/DevOps | 1, 2, 4, 5 |
| Hero Outcomes, not agents. | 3 |
| CTA Schedule demo + #how-it-works | 3, 4 |
| Homepage spine Problem→Solution→How→OCG→Offerings | 3–4 (order already in HomeReplica; copy remap) |
| Logos-only | 3 (no metrics added) |
| Redirects | 2 |
| Pencil-first diagrams | 6 (parked) |
| Wave 2 products | Deferred separate plan |
| Stay on homepage-p0 | Global constraint |

**Open decisions locked here:** slugs `aiden-for-infraops` / `aiden-for-devops`.

**Placeholder scan:** none intentional beyond Wave 2 deferral (explicit).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-31-aof-homepage-wave1.md`.
