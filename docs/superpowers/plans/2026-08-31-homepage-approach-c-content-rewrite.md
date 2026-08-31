# Homepage Approach C content rewrite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the replica homepage to `Nav → Hero → Logos → Problem → Solution(+demo) → Assemblies → Shell → WhoItsFor → Footer` and ship approved v2 copy from the design spec.

**Architecture:** Content stays in `web/content/replica.ts`. Add `ReplicaProblem` and `ReplicaSolution` (Solution absorbs today’s early `ReplicaVideo` media plate). `HomeReplica` drops standalone Video between Hero and Logos. Soft Structuralism tokens only (`$ds-*` / existing replica classes). Provisional `data-pencil-id`s for Problem until Pencil frames exist; Solution reuses existing `video` frame ids for the media plate.

**Tech Stack:** Next.js App Router, React, Vitest + Testing Library, Motion (existing Hero), Tailwind + replica CSS tokens.

**Spec:** `docs/superpowers/specs/2026-08-31-homepage-content-rewrite-design.md` §3c (v2).

## Global Constraints

- Public product names only: Aiden for Infrastructure / Automation / Observability / SRE (never DevOps, InfraOps, Olly).
- Primary CTA → `/product/aiden-for-sre`; Nav keeps Schedule a demo → `/schedule-demo`.
- No public MTTR/CFR/% metrics; logos-only proof.
- Do not self-label the homepage “AIOps platform”.
- ADF is Assemblies H2 / below fold only — not Hero H1.
- Hero H1 v2: **Take control of production change**.
- Scroll order locked: Nav → Hero → Logos → Problem → Solution → Assemblies → Shell → WhoItsFor → Footer.
- Minimal diff: Soft Structuralism patterns already in Shell / WhoItsFor; no new dependencies.
- Commit only when the user asks (or per task commit steps if user enables execution with commits).

---

## File map

| File | Role |
|------|------|
| `web/content/replica.ts` | All homepage strings + hrefs (`problem`, `solution`, rewritten sections) |
| `web/lib/replica-frames.ts` | Add `problem` ids; keep `video` for Solution media |
| `web/components/replica/sections/Problem.tsx` | **Create** — labeled Problem + symptoms |
| `web/components/replica/sections/Solution.tsx` | **Create** — claim + demo media (from Video) |
| `web/components/replica/sections/Video.tsx` | Delete after Solution lands, or leave unused (prefer delete) |
| `web/components/replica/HomeReplica.tsx` | Reorder imports/sections |
| `web/components/replica/sections/Hero.tsx` | Wire `primaryHref` / `secondaryHref` |
| `web/components/replica/sections/Nav.tsx` | Wire nav CTA href + link hrefs from content |
| `web/components/replica/sections/Assemblies.tsx` | Eyebrow + body from content |
| `web/components/replica/sections/Shell.tsx` | Already keyed — content swap only |
| `web/components/replica/sections/WhoItsFor.tsx` | New eyebrow/labels; SRE pillar href to product |
| `web/components/replica/sections/Footer.tsx` | CTA href + brand/heading from content |
| `web/__tests__/replica-home.test.tsx` | Order + new copy + frame ids |
| `web/__tests__/nav-hero-motion.test.tsx` | Still asserts content-driven CTA labels |
| `web/__tests__/sections-motion.test.tsx` | Footer CTA text from content |

---

### Task 1: Content contract + failing home tests

**Files:**
- Modify: `web/content/replica.ts`
- Modify: `web/lib/replica-frames.ts`
- Modify: `web/__tests__/replica-home.test.tsx`
- Test: `web/__tests__/replica-home.test.tsx`

**Interfaces:**
- Produces: `replicaContent.problem`, `replicaContent.solution`, hero href fields, assemblies eyebrow/body; `REPLICA_FRAMES.*.problem`

- [ ] **Step 1: Write failing tests for order + H1 + Problem/Solution**

Append to `web/__tests__/replica-home.test.tsx`:

```tsx
test("homepage section order is Hero Logos Problem Solution Assemblies", () => {
  renderHome("dark");
  const main = document.querySelector("main");
  expect(main).toBeTruthy();
  const ids = [...main!.querySelectorAll("section[data-pencil-id]")].map((el) =>
    el.getAttribute("data-pencil-id"),
  );
  const hero = REPLICA_FRAMES.dark.hero;
  const logos = REPLICA_FRAMES.dark.logos;
  const problem = REPLICA_FRAMES.dark.problem;
  const video = REPLICA_FRAMES.dark.video; // Solution media plate
  const assemblies = REPLICA_FRAMES.dark.assemblies;
  const i = (id: string) => ids.indexOf(id);
  expect(i(hero)).toBeGreaterThanOrEqual(0);
  expect(i(logos)).toBeGreaterThan(i(hero));
  expect(i(problem)).toBeGreaterThan(i(logos));
  expect(i(video)).toBeGreaterThan(i(problem));
  expect(i(assemblies)).toBeGreaterThan(i(video));
});

test("hero and problem use approved v2 copy", () => {
  renderHome("dark");
  expect(screen.getByRole("heading", { level: 1 }).textContent?.replace(/\s/g, "")).toBe(
    "Takecontrolofproductionchange",
  );
  expect(screen.getByText("The problem")).toBeInTheDocument();
  expect(screen.getByText(/Software is shipping faster than ops can keep up/i)).toBeInTheDocument();
  expect(screen.getByText("The solution")).toBeInTheDocument();
});
```

Update the existing eyebrows test — replace `"WHO IT'S FOR"` with `"See. Decide. Change."` (exact string from `replicaContent.whoItsFor.eyebrow`).

- [ ] **Step 2: Run tests — expect FAIL**

Run: `cd web && npx vitest run __tests__/replica-home.test.tsx`

Expected: FAIL — Problem/Solution missing; H1 still ADF string; order wrong.

- [ ] **Step 3: Replace `web/content/replica.ts` with v2 contract**

Use exact strings from design §3c. Shape (implement full object, not stub):

```ts
export const replicaContent = {
  nav: {
    links: [
      { label: "Products", href: "#who" },
      { label: "Platform", href: "#ocg" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Company", href: "#" },
      { label: "Docs", href: "/docs" },
    ],
    cta: { label: "Schedule a demo", href: "/schedule-demo" },
  },
  hero: {
    heading: "Take control of production change",
    sub: "Aiden for SRE gives site reliability teams shared context across deploys, drift, and alerts — so AI incident response starts with what changed.",
    primaryCta: "See Aiden for SRE",
    primaryHref: "/product/aiden-for-sre",
    secondaryCta: "How it works",
    secondaryHref: "#assemblies",
  },
  logos: {
    eyebrow: "Trusted by teams running production",
    items: [/* keep existing logo entries */],
  },
  problem: {
    eyebrow: "The problem",
    heading: "Software is shipping faster than ops can keep up.",
    body: "AI made code cheap. Delivery and reliability did not keep pace. Observability, deploy, and infrastructure each know something the others never see. Agents rebuild that picture every page.",
    punchline: "This is where teams lose control of production.",
    symptoms: [
      "Alert with no deploy or drift attached",
      "AI remediation that cannot land a policy-checked change",
      "First 90 minutes of a P1 is a war room",
      "Deploy lands on unchecked infrastructure drift",
      "200 runbooks — maybe 30 still true",
    ],
    learnMore: {
      label: "SRE tools compared",
      href: "/blog/top-7-ai-sre-tools-for-2026-essential-solutions-for-modern-site-reliability",
    },
  },
  solution: {
    eyebrow: "The solution",
    heading: "Take back control with shared operational context",
    body: "StackGen indexes change across infra, deploy, and signals in an Operational Context Graph. Aiden acts under policy as code — with approval when the risk warrants it.",
    claim: "Same incident. Completely different outcome.",
    demoLabelLeft: "Without shared context",
    demoLabelRight: "With Aiden for SRE",
    demoCaption: "Generic AI SRE guesswork vs context-backed remediation under policy.",
  },
  assemblies: {
    eyebrow: "How it works",
    heading: "The Autonomous DevOps Factory",
    body: "State the outcome. Get a Factory Spec. Run it. Learn back into the graph. Platform engineering teams keep build, operate, observe, and remediate on one governed path.",
    learnMore: {
      label: "Platform engineering + MCP",
      href: "/blog/the-10-best-mcp-servers-for-platform-engineers-in-2026",
    },
  },
  shell: {
    eyebrow: "OPERATIONAL CONTEXT GRAPH",
    heading: "One timeline for what changed",
    body1: "Deploys, dependencies, and drift in the same place an incident starts.",
    body2: "Root cause without the archaeology dig.",
  },
  whoItsFor: {
    eyebrow: "See. Decide. Change.",
    heading: "The platform for site reliability work that still has to ship",
    sub: "Four Aiden products. One context layer for SRE, platform, and security.",
    pillars: [
      {
        label: "Change",
        title: "Aiden for Infrastructure",
        body: "Terraform drift detection and governed infra change in your Git.",
        href: "#build",
      },
      {
        label: "Change",
        title: "Aiden for Automation",
        body: "Deploys and toil that verify themselves under policy.",
        href: "#operate",
      },
      {
        label: "See",
        title: "Aiden for Observability",
        body: "An observability layer that already knows what deployed.",
        href: "#observe",
      },
      {
        label: "Decide",
        title: "Aiden for SRE",
        body: "AI SRE that opens with deploy and drift attached.",
        href: "/product/aiden-for-sre",
      },
    ],
    roles: [
      { title: "SRE", body: "Alerts arrive with deploys and drift attached" },
      { title: "Platform Engineering", body: "Catch drift before deploy lands" },
      { title: "Developers", body: "Ship without the platform ticket queue" },
      { title: "DevSecOps", body: "Keep agent actions inside policy" },
    ],
    osTitle: "Aiden OS",
    osChips: [
      "Governance",
      "Guardrails",
      "Identity",
      "Audit",
      "Integrations",
      "Policies",
    ],
  },
  footer: {
    ctaHeading: "Take control of production change",
    ctaSub: "See Aiden for SRE — context, policy, and approval on your stack.",
    cta: "See Aiden for SRE",
    ctaHref: "/product/aiden-for-sre",
    brand: "Grounded. Governed. Useful.",
    product: [
      "Aiden for Infrastructure",
      "Aiden for Automation",
      "Aiden for Observability",
      "Aiden for SRE",
    ],
    platform: ["Aiden OS", "Context Graph", "AppStacks", "Policies"],
    company: ["About", "Pricing", "Contact", "Docs", "Security"],
    legal: "© 2026 StackGen. All rights reserved.",
    legalLinks: ["Privacy", "Terms", "Status"],
  },
} as const;
```

Remove obsolete `video: { label }` key (Solution owns demo copy).

- [ ] **Step 4: Add provisional Problem pencil ids**

In `web/lib/replica-frames.ts`:

```ts
problem: "homeProbD", // dark provisional until Pencil
// light:
problem: "homeProbL",
```

Keep existing `video` ids for Solution media.

- [ ] **Step 5: Run tests — still FAIL on missing components**

Run: `cd web && npx vitest run __tests__/replica-home.test.tsx`  
Expected: FAIL on missing Problem/Solution DOM (content may already match H1 once Home renders new heading from content — order test still fails).

- [ ] **Step 6: Commit** (only if user asked for commits during execution)

```bash
git add web/content/replica.ts web/lib/replica-frames.ts web/__tests__/replica-home.test.tsx
git commit -m "$(cat <<'EOF'
test(home): lock Approach C order and v2 content contract

EOF
)"
```

---

### Task 2: `ReplicaProblem` section

**Files:**
- Create: `web/components/replica/sections/Problem.tsx`
- Modify: `web/components/replica/HomeReplica.tsx` (partial — can wait until Task 4, but prefer mount here for green tests)
- Test: `web/__tests__/replica-home.test.tsx`

**Interfaces:**
- Consumes: `replicaContent.problem`, `REPLICA_FRAMES[theme].problem`
- Produces: `<section id="problem" data-pencil-id=…>`

- [ ] **Step 1: Implement Problem.tsx**

Mirror Shell header pattern (eyebrow pill + H2 + body). Soft Structuralism: `border-border bg-surface`, no new glass stacks beyond existing section norms.

```tsx
"use client";

import Link from "next/link";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type Props = { theme: "light" | "dark"; className?: string };

export function ReplicaProblem({ theme, className }: Props) {
  const p = replicaContent.problem;
  return (
    <section
      id="problem"
      data-pencil-id={REPLICA_FRAMES[theme].problem}
      className={cn(
        "relative overflow-hidden flex w-full flex-col items-center px-4 py-10 md:px-16 md:py-12",
        className,
      )}
    >
      <AtmosphereField slot="ground-problem" theme={theme} />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <div className="rounded-full border border-border bg-surface px-3 py-1">
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
            {p.eyebrow}
          </span>
        </div>
        <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-1px] text-text-primary md:text-[32px]">
          {p.heading}
        </h2>
        <p className="text-sm leading-snug text-text-secondary md:text-[15px]">{p.body}</p>
        <p className="text-sm font-semibold text-text-primary">{p.punchline}</p>
        <ul className="mt-2 w-full max-w-xl list-none space-y-2 text-left text-sm text-text-secondary">
          {p.symptoms.map((s) => (
            <li key={s} className="rounded-md border border-border bg-surface px-3 py-2">
              {s}
            </li>
          ))}
        </ul>
        <Link href={p.learnMore.href} className="text-sm text-accent no-underline">
          {p.learnMore.label} →
        </Link>
      </div>
    </section>
  );
}
```

If `AtmosphereField` rejects unknown `slot`, reuse `slot="ground-shell"` or extend its union — check `AtmosphereField.tsx` and add `"ground-problem"` only if required.

- [ ] **Step 2: Mount in HomeReplica temporarily after Logos** (full reorder in Task 4)

- [ ] **Step 3: Run** `cd web && npx vitest run __tests__/replica-home.test.tsx`  
Expected: Problem assertions pass; order may still fail until Solution + reorder.

- [ ] **Step 4: Commit** (if requested)

---

### Task 3: `ReplicaSolution` (absorb Video)

**Files:**
- Create: `web/components/replica/sections/Solution.tsx`
- Delete: `web/components/replica/sections/Video.tsx` after cutover
- Test: `web/__tests__/replica-home.test.tsx`

**Interfaces:**
- Consumes: `replicaContent.solution`, `REPLICA_FRAMES[theme].video` for media plate
- Produces: `<section id="solution">` with eyebrow/heading/claim + demo labels + media plate

- [ ] **Step 1: Implement Solution.tsx**

Copy media plate markup from current `Video.tsx` (glass-specular 480px placeholder + play affordance). Surround with Solution copy:

```tsx
export function ReplicaSolution({ theme, className }: Props) {
  const s = replicaContent.solution;
  return (
    <section
      id="solution"
      className={cn("relative flex w-full flex-col items-center gap-6 px-4 py-10 md:px-16", className)}
    >
      {/* header: eyebrow The solution, heading, body, claim */}
      <div className="flex w-full gap-3 text-xs text-text-tertiary">
        <span>{s.demoLabelLeft}</span>
        <span aria-hidden>·</span>
        <span>{s.demoLabelRight}</span>
      </div>
      <div data-pencil-id={REPLICA_FRAMES[theme].video} className="glass-specular w-full …">
        {/* existing video placeholder; aria-label={s.demoCaption} */}
      </div>
      <p className="text-sm text-text-secondary">{s.demoCaption}</p>
    </section>
  );
}
```

Do not invent a second pencil id for the outer section unless tests require it — keep `video` id on the media plate so `Object.values(REPLICA_FRAMES)` still resolve.

- [ ] **Step 2: Remove `ReplicaVideo` import usages; delete `Video.tsx` if unused**

- [ ] **Step 3: Run vitest replica-home** — Solution copy visible; `role="img"` count still ≥4 if diagrams unchanged.

- [ ] **Step 4: Commit** (if requested)

---

### Task 4: Reorder `HomeReplica` + wire hrefs on Hero/Nav/Footer/Assemblies/WhoItsFor

**Files:**
- Modify: `web/components/replica/HomeReplica.tsx`
- Modify: `web/components/replica/sections/Hero.tsx`
- Modify: `web/components/replica/sections/Nav.tsx`
- Modify: `web/components/replica/sections/Footer.tsx`
- Modify: `web/components/replica/sections/Assemblies.tsx`
- Modify: `web/components/replica/sections/WhoItsFor.tsx`
- Modify: `web/components/replica/sections/Shell.tsx` (ids `#ocg` on section if missing)

**Interfaces:**
- Consumes: href fields from content
- Produces: locked DOM order

- [ ] **Step 1: HomeReplica order**

```tsx
<ReplicaNav theme={theme} />
<ReplicaHero theme={theme} />
<ReplicaLogos theme={theme} />
<ReplicaProblem theme={theme} />
<ReplicaSolution theme={theme} />
<ReplicaAssemblies theme={theme} />
<ReplicaShell theme={theme} />
<ReplicaWhoItsFor theme={theme} />
<ReplicaFooter theme={theme} />
```

- [ ] **Step 2: Hero links**

```tsx
const { heading, sub, primaryCta, primaryHref, secondaryCta, secondaryHref } = replicaContent.hero;
// …
<Link href={primaryHref} …>{primaryCta}</Link>
<Link href={secondaryHref} …>{secondaryCta}</Link>
```

- [ ] **Step 3: Nav** — map `replicaContent.nav.links` hrefs; CTA `href={replicaContent.nav.cta.href}`.

- [ ] **Step 4: Assemblies** — render `eyebrow`, `heading`, `body`, optional learnMore Link above diagrams; `id="assemblies"`.

- [ ] **Step 5: Shell** — set `id="ocg"` on `<section>`.

- [ ] **Step 6: WhoItsFor** — `id="who"`; use pillar `href` on portrait links (SRE → product page); update ROLE_ICONS keys if role titles reorder (SRE first).

- [ ] **Step 7: Footer** — primary CTA `href={replicaContent.footer.ctaHref}` (and label `cta`).

- [ ] **Step 8: Run full related suite**

```bash
cd web && npx vitest run __tests__/replica-home.test.tsx __tests__/nav-hero-motion.test.tsx __tests__/sections-motion.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit** (if requested)

```bash
git add web/components/replica web/content/replica.ts web/lib/replica-frames.ts web/__tests__
git commit -m "$(cat <<'EOF'
feat(home): Approach C Problem→Solution spine with v2 SRE copy

EOF
)"
```

---

### Task 5: Spec sync + openmemory

**Files:**
- Modify: `docs/superpowers/specs/2026-08-31-homepage-content-rewrite-design.md` status → implemented (when done)
- Modify: `.agents/product-marketing.md` — note Hero H1 override (ADF demoted) in one line under Hero pattern
- Modify: `openmemory.md` Patterns — one bullet for Approach C order + v2 H1

- [ ] **Step 1: Patch product-marketing hero pattern note** (do not rewrite whole L0–L2)

- [ ] **Step 2: Update openmemory.md Patterns**

- [ ] **Step 3: Store memory via OpenMemory** `add_memories` with text-only payload

- [ ] **Step 4: Final vitest smoke**

```bash
cd web && npx vitest run __tests__/replica-home.test.tsx
```

Expected: PASS.

---

## Plan self-review

| Spec requirement | Task |
|------------------|------|
| Order Nav→Hero→Logos→Problem→Solution→… | Task 4 |
| v2 copy strings | Task 1 |
| Problem section | Task 2 |
| Solution + demo (ex-Video) | Task 3 |
| CTA → Aiden for SRE | Tasks 1 + 4 |
| ADF below fold | Task 1 assemblies + Task 4 |
| Semrush do-nots | Content contract Task 1 |
| Tests | Tasks 1–4 |
| product-marketing / openmemory | Task 5 |

**Placeholder scan:** No TBD in steps; demo media path remains placeholder UI (spec: path TBD) — Solution keeps existing video plate until asset path provided.

**Type consistency:** `replicaContent.problem` / `.solution` / hero `primaryHref` used consistently across tasks.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-31-homepage-approach-c-content-rewrite.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — run tasks in this session with checkpoints  

Which approach?
