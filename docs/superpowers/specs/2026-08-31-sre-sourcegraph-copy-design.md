# SRE-primary site copy (Sourcegraph structure, copywriting skill)

**Status:** approved 2026-08-31. Implementing.  
**Date:** 2026-08-31  
**Skill:** copywriting (single write skill). Sourcegraph is structure reference, not a sentence template.  
**Persona:** on-call SRE is “you.” Developer and DevOps stay supporting dock roles.

---

## 1. Decisions locked in intake

| Decision | Choice |
|---|---|
| Homepage H1 | Unlocked. **Take control of production.** (Sourcegraph job-shape: `Take control of your codebase`) |
| Rewrite scope | Public marketing only: `/`, four `/product/aiden-for-*` pages, mega menu, footer, `layout.tsx` meta |
| Out of scope | 417 docs articles, `/schedule-demo` and `/case-studies` (no pages), Pencil canvas |
| Write skill | **copywriting** only. Firecrawl used to read Sourcegraph. Humanizer/copy-editing are post-pass if a line still sounds assembled. |
| CTA | **Schedule a demo** → `/schedule-demo`. Secondary on home: How it works → `#how-it-works` |
| Product H1s | Stay the product names |
| Product hero tokens | InfraOps `/IDE/` · DevOps `/IDP/` · Observability `/Grafana/` · SRE `/Detect/` |
| Sentence case | All headings |
| Banned | Em dashes in public marketing copy · fabricated MTTR% / Autonomy Index · Olly · Aiden for Infrastructure/Automation · ADF · unlock / seamless / leverage · Git / estate in customer wording · “page” meaning a PagerDuty event (use **alert**) |
| Claim line | **Focus on outcomes, not agents.** (replaces “Outcomes, not agents.”) |

---

## 2. Sourcegraph (steal / don’t steal)

Live scrape 2026-08-31: `.firecrawl/sourcegraph-home-main.md` and `.firecrawl/sourcegraph-homepage.md`.

| Steal | Don’t steal |
|---|---|
| Short control-job H1 | “codebase,” “tidal wave of code” |
| One-sentence sub: Give [you] complete context to… | “Get a demo” (ours is Schedule a demo) |
| Labeled **The problem** / **The solution** | Their product names, MCP demo script, fake density of stacked one-liners |
| Logos immediately after hero | “intelligently empowering” / “driving improved outcomes” |
| Solution H2: Take back control with complete … context | Cloning their two-sentence body word-for-word |
| Close restates the H1 | Punchline “This is where engineering teams lose control” (tried; rejected) |

---

## 3. Homepage copy (locked)

File: `web/content/replica.ts`

### Hero
- **H1:** Take control of production.
- **Sub:** Give on-call complete context to see, decide, and change what is running.
- **Primary:** Schedule a demo → `/schedule-demo`
- **Secondary:** How it works → `#how-it-works`

### Logos
- **Eyebrow:** Trusted by SRE teams running production  
  (keep existing eight marks)

### The problem
- **Eyebrow:** The problem
- **H2:** AI code is hitting production faster than you can see it. You cannot control what you cannot see.
- **Body:** Agents and IDEs ship all day. Alerts struggle to keep up.
- **Punchline:** do not show. Clear `punchline` or stop rendering it in `Problem.tsx` when empty. Do not keep “This is where you lose control.”

### The solution
- **Eyebrow:** The solution
- **H2:** Take back control with complete context
- **Body:** Filter false positives and let your agents act proactively.
- **Claim:** Focus on outcomes, not agents.

### How it works / OCG / offerings chrome
Keep mechanism headings (Intent → Spec → Runtime → Learning, Operational Context Graph) unless a string still says “Humans keep authority” or “Outcomes, not agents.” Replace those with the locked claim or the matching product sub.

### Offerings pillars (align to product subs)
| Product | Body |
|---|---|
| Aiden for InfraOps | Policy-checked change from the IDE. Before it becomes an alert. |
| Aiden for DevOps | Delivery from the IDP that on-call can trust. |
| Aiden for Observability | Investigation on Grafana and the stack you already run. Filter false positives. |
| Aiden for SRE | Detect the real incident. Let agents act. You keep the call. |

### Role dock
| Role | Body | Href |
|---|---|---|
| SRE | Detect the real incident. Let agents act. You keep the call. | `/product/aiden-for-sre` |
| Developer | Ship change on-call can see. No surprise deploys. | `/product/aiden-for-infraops` |
| DevOps | Keep control of how software ships. On-call stays in the loop. | `/product/aiden-for-devops` |

Who-it’s-for **sub:** Built for SRE. Developers and DevOps share the same context.

### Footer
- **CTA heading:** Take control of production.
- **CTA sub:** Filter false positives and let your agents act proactively.
- **CTA:** Schedule a demo

---

## 4. Product pages (locked)

File: `web/content/products.ts`  
H1 = product name. Primary CTA = Schedule a demo. Claim / final-cta energy = Focus on outcomes, not agents.

| Slug | Sub | Problem H2 | Final CTA heading |
|---|---|---|---|
| `aiden-for-infraops` | Policy-checked change from the IDE. Before it becomes an alert. | Ungoverned infra change shows up as an alert. | See InfraOps in your IDE |
| `aiden-for-devops` | Delivery from the IDP that on-call can trust. | A deploy you did not see still becomes an alert. | See Aiden for DevOps on your IDP |
| `aiden-for-observability` | Investigation on Grafana and the stack you already run. Filter false positives. | Every dashboard is a fragment. Alerts struggle to keep up. | See Observability on your stack |
| `aiden-for-sre` | Detect the real incident. Let agents act. You keep the call. | Hundreds of alerts. Hours to a hypothesis. | See Aiden for SRE on-call |

Observability problem **body** (test currently matches `/On-call|lose control/i`): rewrite without “lose control.” Keep an on-call mention so the test can be updated to `/on-call|alert/i` or similar. Suggested body: On-call still jumps dashboards while AI code lands in production. Alerts struggle to keep up.

Strip remaining “Humans keep authority” and “This is where you lose control” from product bodies.

---

## 5. Mega menu

File: `web/content/product-mega-menu.ts`

| Column | Description |
|---|---|
| InfraOps | Policy-checked change from the IDE. Before it becomes an alert. |
| DevOps | Delivery from the IDP that on-call can trust. |
| Observability | Investigation on Grafana. Filter false positives. |
| SRE | Detect the real incident. Let agents act. You keep the call. |

---

## 6. Meta

File: `web/app/layout.tsx`

- **Title:** keep The Autonomous Operations Factory \| StackGen unless a later task unlocks it.
- **Description:** Take control of production. Give on-call complete context to see, decide, and change what is running. Aiden for InfraOps, DevOps, Observability, and SRE.

---

## 7. Files and tests

**Edit**
- `web/content/replica.ts`
- `web/content/products.ts`
- `web/content/product-mega-menu.ts`
- `web/app/layout.tsx`
- `web/components/replica/sections/Problem.tsx` (hide empty punchline)
- `.agents/product-marketing.md` (v1.7 changelog: H1 Take control of production; claim Focus on outcomes, not agents)

**Optional if they still contain old slogan / authority lines**
- `web/content/diagram-placeholders.ts`
- `web/components/replica/diagrams/Offerings.tsx`

**Tests to update**
- `web/__tests__/replica-home.test.tsx` — H1 `Takecontrol ofproduction.` (whitespace-stripped). Problem H2 regex for `AI code is hitting production`.
- `web/__tests__/products-placeholder.test.tsx` — Observability problem body matcher; hero token regexes should still pass.
- Grep `Outcomes, not agents` / `Humans keep authority` / `lose control` under `web/` and clear public marketing strings.

**Do not**
- Rewrite docs hub or article corpus
- Invent public metrics
- Change CTA label or href

---

## 8. Implementation notes

- Copywriting pass: one idea per section; customer words (alert, war room only where already locked, IDE/IDP/Grafana/Detect).
- After the content edit, grep for leftover slogan/authority/lose-control on public surfaces.
- Browser-check `/`, four product routes, mega menu open, footer CTA.
- No commit unless asked.

---

## Changelog of this spec

- 2026-08-31 — Intake: unlock H1, public-marketing scope, approach A then copywriting reset. Locked copy as in §§3–6.
