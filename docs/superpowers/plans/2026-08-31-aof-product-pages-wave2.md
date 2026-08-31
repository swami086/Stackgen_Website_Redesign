# Autonomous Operations Factory — Product Pages Wave 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder Harness product pages with deck-aligned Factory copy for SRE (p23–28), InfraOps (p29–30), DevOps (p31–32), and a thin Observability page (p14/p38) — content + CTA wiring only; Pencil product diagrams stay parked.

**Architecture:** Keep `ProductPage` section shells and Soft Structuralism chrome. Move from one `buildProductContent(slug)` PLACEHOLDER factory to per-slug content objects in `web/content/products.ts` (or `web/content/products/*.ts` if the file exceeds ~400 lines). Wire hero/final CTA hrefs to `/schedule-demo` and homepage `#how-it-works`. No public %, no unverified customer quotes, no Olly / Infrastructure / Automation titles.

**Tech Stack:** Next.js App Router, React 19, Vitest + Testing Library, existing replica product components, Soft Structuralism tokens.

**Spec:** `docs/superpowers/specs/2026-08-31-autonomous-operations-factory-site-ia-design.md` (Wave 2)  
**Deck SoT:** `Website_Sequencing.pptx.pdf` (text extract `/tmp/website-seq.txt` or re-run `pdftotext`)  
**Depends on:** Wave 1 shipped (`ef89be2`) — slugs InfraOps/DevOps + redirects + AOF naming already live.

## Global Constraints

- Factory brand: **Autonomous Operations Factory** (never ADF / Autonomous DevOps Factory on public web).
- Product names: **Aiden for InfraOps · DevOps · Observability · SRE** only.
- Slugs (locked Wave 1): `/product/aiden-for-infraops`, `/product/aiden-for-devops`, `/product/aiden-for-observability`, `/product/aiden-for-sre`.
- CTAs: Primary **Schedule a demo** → `/schedule-demo`. Secondary **How it works** → `/#how-it-works` (homepage Assemblies).
- Proof: **logos only** — do not ship MTTR / % / Autonomy Index / FTE figures on public product pages.
- Quotes: do not ship deck quotes as real; omit or keep explicitly prefixed `PLACEHOLDER — ` if a section requires a quote slot.
- Soft Structuralism only; no new dependencies.
- Branch: **`homepage-p0`**.
- **Diagram gate:** No new Pencil→React product diagrams in this wave. Hero atmosphere images may stay as current product PNGs.
- Prefer `./node_modules/.bin/vitest` over `pnpm exec vitest` (pnpm install hooks can fail).
- Commit after each task when the user has enabled commits for this wave (this session: yes).

---

## File map

| File | Role |
|------|------|
| `web/content/products.ts` | Per-slug Factory copy; drop PLACEHOLDER factory |
| `web/content/product-mega-menu.ts` | Capability blurbs from deck (no PLACEHOLDER) |
| `web/components/replica/product/ProductHero.tsx` | Use `hero.primaryHref` / `secondaryHref` |
| `web/components/replica/product/ProductFinalCta.tsx` | Use `finalCta.href` → `/schedule-demo` |
| `web/__tests__/products-placeholder.test.tsx` | Flip: real copy required; ban PLACEHOLDER on hero/problem/finalCta; CTA hrefs |
| Optional rename later | File may stay named `products-placeholder.test.tsx` this wave (YAGNI) |

**Out of this plan:** Pencil DETECT→TRIAGE / IDE 1/5→5/5 / blueprint compose React ports; Ops Lag homepage swap; command-center preview page.

---

### Task 1: CTA href fields + hero/final link wiring

**Files:**
- Modify: `web/content/products.ts` (type only + temporary defaults)
- Modify: `web/components/replica/product/ProductHero.tsx`
- Modify: `web/components/replica/product/ProductFinalCta.tsx`
- Modify: `web/__tests__/products-placeholder.test.tsx`
- Test: `web/__tests__/products-placeholder.test.tsx`

**Interfaces:**
- Consumes: existing `ProductPageContent`
- Produces:
  ```ts
  hero: {
    heading: string;
    subhead: string;
    primaryCta: string;
    primaryHref: string; // "/schedule-demo"
    secondaryCta: string;
    secondaryHref: string; // "/#how-it-works"
  };
  finalCta: {
    heading: string;
    subhead: string;
    cta: string; // "Schedule a demo"
    href: string; // "/schedule-demo"
  };
  ```

- [ ] **Step 1: Write failing tests for CTA hrefs and label**

Add to `web/__tests__/products-placeholder.test.tsx`:

```tsx
test("product hero CTAs link to schedule-demo and homepage how-it-works", () => {
  renderProduct("aiden-for-sre");
  expect(screen.getByRole("link", { name: "Schedule a demo" }).closest("a")).toHaveAttribute(
    "href",
    "/schedule-demo",
  );
  expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute(
    "href",
    "/#how-it-works",
  );
});

test("final CTA uses Schedule a demo href", () => {
  const content = getProductContent("aiden-for-infraops");
  expect(content.finalCta.cta).toBe("Schedule a demo");
  expect(content.finalCta.href).toBe("/schedule-demo");
});
```

Remove or rewrite any test that requires `Schedule demo` (no “a”) or `href="#"`.

- [ ] **Step 2: Run tests — expect FAIL**

```bash
cd web && ./node_modules/.bin/vitest run __tests__/products-placeholder.test.tsx
```

Expected: FAIL on missing href fields / still `#` / wrong label.

- [ ] **Step 3: Extend types + wire components**

In `products.ts` add `primaryHref`, `secondaryHref`, `finalCta.href` to the type and to `buildProductContent` defaults:

```ts
primaryCta: "Schedule a demo",
primaryHref: "/schedule-demo",
secondaryCta: "How it works",
secondaryHref: "/#how-it-works",
// ...
finalCta: {
  heading: P("final CTA heading"),
  subhead: P("final CTA subhead"),
  cta: "Schedule a demo",
  href: "/schedule-demo",
},
```

In `ProductHero.tsx`:

```tsx
const { heading, subhead, primaryCta, primaryHref, secondaryCta, secondaryHref } =
  content.hero;
// ...
<Link href={primaryHref} ...>{primaryCta}</Link>
<Link href={secondaryHref} ...>{secondaryCta}</Link>
```

In `ProductFinalCta.tsx`: change the CTA `Link` `href` from `#` (or whatever it is) to `content.finalCta.href`, label `content.finalCta.cta`.

- [ ] **Step 4: Run tests — CTA cases PASS** (PLACEHOLDER tests may still pass until Task 2+)

- [ ] **Step 5: Commit**

```bash
git add web/content/products.ts web/components/replica/product/ProductHero.tsx web/components/replica/product/ProductFinalCta.tsx web/__tests__/products-placeholder.test.tsx
git commit -m "$(cat <<'EOF'
feat: wire product page CTAs to schedule-demo and how-it-works

EOF
)"
```

---

### Task 2: Aiden for SRE content (deck p23–28)

**Files:**
- Modify: `web/content/products.ts` — `productContentBySlug["aiden-for-sre"]`
- Modify: `web/__tests__/products-placeholder.test.tsx`
- Modify: `web/content/product-mega-menu.ts` — SRE capabilities

**Interfaces:**
- Produces: Real `ProductPageContent` for `aiden-for-sre` with zero `PLACEHOLDER —` on hero, problem, pillars, spotlight, capabilities, platformLink, integrations, enterprise, proof, finalCta, faq (resources may stay off via `flags.resources: false` if no cleared assets).

**Deck-aligned copy (use verbatim where noted):**

| Field | Value |
|-------|--------|
| hero.heading | `Aiden for SRE` |
| hero.subhead | `Less toil. Improve reliability. Detect → Triage → Diagnose → Remediate — with humans keeping authority.` |
| pillars (3) | Alert intelligence · Incident triage · RCA acceleration (bodies from deck p23 value row, **without % figures**) |
| problem.heading | `Hundreds of alerts. Hours to a hypothesis.` |
| problem.body | `Signals arrive fragmented across tools. Tribal knowledge stays in chats. Forming a root-cause hypothesis burns minutes you do not have on call.` |
| spotlight.heading | `Detect → Triage → Diagnose → Remediate` |
| spotlight.cards | Four short mechanism cards matching the flow (merge Learn into Remediate card or keep 3 cards + capabilities for Learn) |
| capabilities | Integrations with your stack · Never acts without sign-off · Full audit trail · Works with OSS and managed observability |
| platformLink | Point at Aiden OS + Operational Context Graph as shared memory |
| integrations.body | Grafana, Grafana Cloud, New Relic, Dynatrace, Datadog, OTEL, Kubernetes, Terraform, Git, ServiceNow, cloud accounts — out of the box. |
| enterprise | Public cloud · Private SaaS · Self-hosted |
| proof | Logos-only language: `Trusted by platform and SRE teams running production estates.` — no metrics |
| faq | 3 mechanism FAQs (autonomy limits, audit, tool fit) — no invented case studies |
| finalCta.heading | `See Aiden for SRE on your stack` |
| finalCta.subhead | `Schedule a demo — policy, context, and humans keeping authority.` |

Mega-menu SRE capabilities (3 strings, no PLACEHOLDER):

```ts
"Detect → Triage → Diagnose → Remediate",
"RCA with shared context",
"Human-approved remediation",
```

- [ ] **Step 1: Flip SRE assertions to require real copy**

```tsx
test("SRE product page ships Factory hero and DETECT spine without PLACEHOLDER", () => {
  const content = getProductContent("aiden-for-sre");
  expect(content.hero.subhead).not.toMatch(/^PLACEHOLDER/);
  expect(content.hero.subhead).toMatch(/Detect/);
  expect(content.problem.heading).not.toMatch(/^PLACEHOLDER/);
  renderProduct("aiden-for-sre");
  expect(screen.queryByText(/PLACEHOLDER — hero subhead/)).toBeNull();
});
```

- [ ] **Step 2: Run — FAIL**

- [ ] **Step 3: Replace `aiden-for-sre` entry with full object** (stop using `buildProductContent` for this slug). Set `flags.offers: false`, `flags.resources: false` unless real resource titles exist.

- [ ] **Step 4: Run products tests — SRE assertions PASS**

- [ ] **Step 5: Commit**

```bash
git commit -m "$(cat <<'EOF'
feat: fill Aiden for SRE product page from sequencing deck

EOF
)"
```

---

### Task 3: Aiden for InfraOps content (deck p29–30)

**Files:**
- Modify: `web/content/products.ts`
- Modify: `web/content/product-mega-menu.ts`
- Modify: `web/__tests__/products-placeholder.test.tsx`

**Copy locks:**

| Field | Value |
|-------|--------|
| hero.heading | `Aiden for InfraOps` |
| hero.subhead | `Self-serve standardized infrastructure from the IDE — intent to governed IaC without a platform-team handoff.` |
| problem.heading | `Manual handoffs slow every infrastructure request.` |
| problem.body | `Developers wait on tickets while platform teams re-encode the same patterns. Compliance arrives late, after the shape is already wrong.` |
| spotlight.heading | `Intent → Detect & generate → Govern → Deploy → Close the loop` |
| spotlight.cards | Intent in IDE · Secure Terraform/OpenTofu generated in-environment · Compliance checked against shared state before production |
| capabilities | Manual handoff eliminated · Compliance by default · Audit trail auto-filed · Multi-cloud IaC (AWS / Azure / GCP) |
| integrations | IDE / agentic IDEs (e.g. Kiro-class) + Git + cloud accounts |
| proof | Logos-only; no 10× / 95% figures |
| finalCta.heading | `See InfraOps on your estate` |

Mega-menu capabilities:

```ts
"Intent to governed IaC in the IDE",
"Policy checked before production",
"Audit trail with the PR",
```

- [ ] **Step 1: Failing test for InfraOps real subhead**
- [ ] **Step 2: Implement content**
- [ ] **Step 3: Vitest pass**
- [ ] **Step 4: Commit** `feat: fill Aiden for InfraOps product page from sequencing deck`

---

### Task 4: Aiden for DevOps content (deck p31–32)

**Files:**
- Modify: `web/content/products.ts`
- Modify: `web/content/product-mega-menu.ts`
- Modify: `web/__tests__/products-placeholder.test.tsx`

**Copy locks:**

| Field | Value |
|-------|--------|
| hero.heading | `Aiden for DevOps` |
| hero.subhead | `From IDP and ticketing to automated pipeline provisioning — blueprints, policies, and guardrails applied by design.` |
| problem.heading | `Weeks to stand up what the blueprint already knows.` |
| problem.body | `Developers pick scaffolds in the IDP; platform still re-applies modules and reviews by hand. Same standards, slow path.` |
| spotlight.heading | `IDP / ticket → compose → provision` |
| spotlight.cards | Developer parametrizes approved blueprint · StackGen composes IaC with policies · App configs, infrastructure, and workload deploy |
| capabilities | ServiceNow & Jira out of the box · Centers of excellence keep L1–L3 modules · Same governance, automatic enforcement |
| proof | Logos-only; do **not** ship “~6 weeks to days” as a public metric claim — phrase as `Same blueprints and security guidelines — enforced automatically instead of reviewed manually.` |
| finalCta.heading | `See DevOps compose on your IDP` |

Mega-menu:

```ts
"IDP to blueprint compose",
"Policies applied by design",
"ServiceNow & Jira ready",
```

- [ ] Steps: failing test → content → vitest → commit `feat: fill Aiden for DevOps product page from sequencing deck`

---

### Task 5: Aiden for Observability thin page (deck p14 / p38)

**Files:**
- Modify: `web/content/products.ts`
- Modify: `web/content/product-mega-menu.ts`
- Modify: `web/__tests__/products-placeholder.test.tsx`

**Decision (locked in this plan):** Thin Factory page — Observe pillar + agent-on-existing-dashboards story. Not a full deep-dive redesign.

| Field | Value |
|-------|--------|
| hero.heading | `Aiden for Observability` |
| hero.subhead | `AI investigation on the observability stack you already run — Grafana, Datadog, New Relic, Dynatrace, and more.` |
| problem.heading | `Dashboards without a shared investigation path.` |
| problem.body | `Every tool holds a slice. Developers lose time re-assembling context that the Factory should already share.` |
| pillars | Work with existing dashboards · Shared World Model context · Feeds SRE remediation |
| spotlight | Observe pillar in the Autonomous Operations Factory |
| capabilities | Works with Grafana / Datadog / New Relic / Dynatrace · Saves developer investigation time · Same Aiden OS governance |
| flags.resources | `false` |
| finalCta.heading | `See Observability in the Factory` |

Mega-menu:

```ts
"Investigate on your existing stack",
"Shared context across tools",
"Feeds Detect → Remediate",
```

- [ ] Steps: failing test → content → vitest → commit `feat: fill thin Aiden for Observability product page`

---

### Task 6: Kill remaining PLACEHOLDER factory + governance sweep

**Files:**
- Modify: `web/content/products.ts` — delete `buildProductContent` / `P()` if unused
- Modify: `web/__tests__/products-placeholder.test.tsx` — ban PLACEHOLDER on all four slugs for hero/problem/finalCta; allow badge only if a section still intentionally uses the prefix
- Modify: `web/content/product-mega-menu.ts` — zero `PLACEHOLDER — capability`

- [ ] **Step 1: Write ban test**

```tsx
test("no product ships PLACEHOLDER hero, problem, or final CTA copy", () => {
  for (const slug of PRODUCT_SLUGS) {
    const c = getProductContent(slug);
    expect(c.hero.subhead).not.toMatch(/^PLACEHOLDER/);
    expect(c.problem.heading).not.toMatch(/^PLACEHOLDER/);
    expect(c.finalCta.heading).not.toMatch(/^PLACEHOLDER/);
    expect(c.finalCta.cta).toBe("Schedule a demo");
    expect(c.finalCta.href).toBe("/schedule-demo");
  }
});

test("mega-menu capabilities are real strings", () => {
  for (const column of productMegaMenuContent.columns) {
    for (const cap of column.capabilities) {
      expect(cap).not.toMatch(/^PLACEHOLDER/);
    }
  }
});
```

- [ ] **Step 2: Run full product suite + naming bans**

```bash
cd web && ./node_modules/.bin/vitest run __tests__/products-placeholder.test.tsx __tests__/sections-motion.test.tsx
```

Expected: all PASS. `rg "PLACEHOLDER —" web/content/products.ts web/content/product-mega-menu.ts` → zero hits (or only intentional none).

- [ ] **Step 3: Confirm no public % on product pages**

```bash
cd web && ./node_modules/.bin/vitest run __tests__/products-placeholder.test.tsx -t "never use superseded"
rg -n "%|MTTR|Autonomy Index" web/content/products.ts || true
```

Expected: no metric tokens in `products.ts`.

- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
chore: remove product PLACEHOLDER factory after Wave 2 content fill

EOF
)"
```

---

### Task 7: Spec status — product content shipped, diagrams still parked

**Files:**
- Modify: `docs/superpowers/specs/2026-08-31-autonomous-operations-factory-site-ia-design.md` status line only

- [ ] **Step 1: Update status**

```markdown
**Status:** Design approved. Wave 1 homepage content shipped. Wave 2 **product page copy** plan (`docs/superpowers/plans/2026-08-31-aof-product-pages-wave2.md`) in progress / shipped. Pencil diagram fidelity (Ops Lag + product deep-dive diagrams) **still parked**.
```

- [ ] **Step 2: Do not touch** `ProblemChaosFilm.tsx` or Pencil Ops Lag frames.

- [ ] **Step 3: Commit** `docs: note Wave 2 product copy; diagrams remain parked`

---

## Self-review (spec coverage)

| Spec requirement | Task |
|---|---|
| SRE p23–28 content | 2 |
| InfraOps p29–30 | 3 |
| DevOps p31–32 | 4 |
| Observability thin | 5 |
| Shared chrome / Schedule demo | 1, 6 |
| Logos-only / no public % | 2–6 |
| Pencil diagrams later | 7 (parked) |
| Naming InfraOps/DevOps/AOF | 2–6 (ban tests) |

**Placeholder scan:** Plan uses exact strings — no TBD copy blocks.

**Open resolved here:** Observability = thin page; slugs already locked Wave 1.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-08-31-aof-product-pages-wave2.md`.

This session proceeds with **Subagent-Driven** execution (user: commit Wave 1 and proceed).
