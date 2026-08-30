# Greenfield website framework: Gartner-relevant AI SRE product

**Date:** 2026-08-21  
**Status:** Approved (user, 2026-08-21). Design: `docs/superpowers/specs/2026-08-21-gartner-greenfield-website-design.md`  
**Product truth used:** Aiden (StackGen). Category lock still **Agentic OS for DevOps** / ADF as vision. Approach **B+C** still holds as strategy (teach the ops-only gap; give I&O a dedicated path).  
**This file does not inherit** current nav, current Home section order, or “what to patch.” If we built the site tomorrow with an empty sitemap, this is the plan.  
**Parent research:** `docs/superpowers/specs/2026-08-21-gartner-ai-sre-website-messaging-framework.md`  
**Sibling (existing-site deltas, do not mix):** `docs/superpowers/specs/2026-08-21-gartner-bc-page-brief-deltas.md`  
**Gartner source:** *Market Guide for AI Site Reliability Engineering Tooling*, 26 January 2026 (G00836089; reprint `1-2MSTEYNH`)

Not implementation. Not a Gartner reprint. Not a claim of Market Guide inclusion.

---

## 0. Skills used

| Skill | Role |
|---|---|
| `using-superpowers` + `brainstorming` | Research → options → spec before any build |
| `firecrawl-cli` + `firecrawl-search` + `firecrawl-scrape` | Live IA patterns from Gartner, B2B site anatomy, and AI SRE vendor homepages |
| `positioning-ideas` | Category vs the Gartner shelf |
| `ideal-customer-profile` + `job-stories` | Two buyers on one site without a mushy homepage |
| `customer-journey-map` | Awareness → consensus on a sales-led enterprise cycle |
| `gtm-strategy` | What the site must do before a demo |
| `copywriting` | Enterprise B2B page template + 2026 hero anatomy |
| `competitor-analysis` | How the Market Guide set actually presents itself |
| `high-end-visual-design` | **Not used for pixels.** Visual world stays a later craft pass. This spec is IA + communication. |

---

## 1. What the web is doing in this market (Firecrawl, 2026-08-21)

### 1.1 How Gartner says B2B sites should behave

Gartner’s public B2B buying-journey guidance (and the related “Optimize Websites to Support B2B Buying Journeys” research) is the IA spine, not AIDA.

Buyers do **not** walk Awareness → Consideration → Decision. They loop six **buying jobs**, mostly without a vendor in the room: problem identification, solution exploration, requirements building, supplier selection, validation, consensus creation.

Implications for a greenfield site:

- The homepage cannot be “explain the product.” It must **teach the problem** and **hand the champion a packet**.
- A 2026 Gartner CSO survey finding: a large share of B2B buyers now use AI to research, then **ask a sales rep to validate** what the model told them. The site must be structured enough for AI citation **and** precise enough that a human champion can forward it without embarrassment.
- Time with any one vendor is short. Evaluation homework (scorecard, security, hybrid, HITL) has to be findable in two clicks, not buried in Platform.

### 1.2 What 2026 enterprise SaaS homepages actually do

From Veza Digital’s 2026 SaaS homepage review and Webstacks’ B2B anatomy:

| Motion | Homepage length | Why |
|---|---|---|
| PLG / self-serve | 3–5 sections | Speed to trial |
| **Enterprise SaaS (this product)** | **8–12+ sections** | Trust + conversion on a 6–18 month, multi-stakeholder cycle |

Hero anatomy that keeps showing up (Veza): **8–12 word outcome headline**, 12–18 word sub, **one** primary CTA, one product visual, one trust layer (logos) immediately under. Sites fail when the hero tries to say the OS, the factory, the four products, and the category at once.

Webstacks: every page is **evidence in a multi-year decision**. Fast, accessible, mobile-researchable. The homepage is not the whole site; **use-case, security, and evaluation pages** are where enterprise deals are actually won.

### 1.3 How AI SRE vendors structure their sites today

Scraped/live patterns:

| Vendor | Home metaphor | Nav metaphor | What they optimize for | Gap vs Gartner’s own warning |
|---|---|---|---|---|
| **Resolve.ai** | “AI for prod” / agents that run software | Jobs: on-call, incidents, operational tasks | Famous logos, RCA theater, build-vs-buy | Pure ops/incident. This is the Market Guide trap. |
| **Harness AI SRE** | “Scale your response, not your team” | SKU under a DevOps platform | Alert → RCA → runbook → escalate | Same trap, as a module. Easy Gartner keyword match. |
| **Firefly** | Outcome (“automate cloud resilience”) | **Use cases** (automate / recover / govern) + **roles** (PE, FinOps, SecOps, CIO) | Role-based landing + Gartner reprint as a resource | Closer to “beyond ops.” Still not an OS story. |
| Roundup taxonomy (Anyshift 2026) | Tools cluster as **telemetry**, **graph**, or **integration** | Evaluation criteria: architecture, RCA, proactive vs reactive, remediation, coverage, **change awareness** | Buyers are being taught to ask “what changed?” | Graph + change history is the architecture Gartner’s knowledge-graph roadmap points at |

**Do not copy Resolve/Harness homepage shape.** That is how you look like the 40-vendor reactive list. **Do steal Firefly’s use-case + role IA**, Veza’s hero restraint, and the roundup’s evaluation criteria as a public scorecard.

---

## 2. Product and buyer (unchanged truth, new site)

**What we sell:** Aiden, the Agentic OS for DevOps. Four surfaces (Infrastructure, Automation, Observability, SRE) on a shared Operational Context Graph, with policy at the action boundary. Vision: Autonomous DevOps Factory (not a SKU).

**Who buys:**

| Persona | Job on the site | Emotion |
|---|---|---|
| Champion (VP/Dir Platform or SRE) | “Can I run this without ripping my stack?” | Fear of the next AI-caused incident; hope of leverage |
| Economic buyer (CIO / VP Infra / Head of I&O) | “Does this match what Gartner told me to require?” | Cost of SRE adoption; AI-outage risk; hybrid |
| User (platform eng / SRE) | “Show me a diff, a refusal, a timeline.” | Contempt for brochureware |
| Risk/security | HITL, audit, on-prem | Blockers |

**Gartner’s teaching we occupy (paraphrase, not a quote block on Home):** operations-only AI SRE makes firefighting faster, not systems more reliable. Mandatory: humans in the loop, hybrid. Roadmap: knowledge graphs, multiagent + **govern**, SLO protection, reliability in design and delivery.

**We are not in the representative-vendor table.** Greenfield site still never claims we are.

---

## 3. Three greenfield IA approaches

### A. Category-shelf site (Harness-shaped)

Home and nav say **AI SRE tooling**. Product pages = Gartner feature list.

- Wins: keyword and analyst-language match.
- Loses: 40-vendor soup; abandons Agentic OS / ADF; fights Resolve and Datadog Bits on their field.

### B. Product-surface site (current StackGen-shaped)

Nav = four Aiden products + Platform. Home explains the OS/factory first.

- Wins: honest to how the product is built; champion who already knows Aiden.
- Loses: Head of I&O cannot complete Gartner homework; first-time visitor must learn SKUs before they learn the job.

### C. Job + role site, OS underneath (recommended)

Home teaches the **problem and the mechanism**. Primary nav is **jobs** (what you came to do) and **who you are**. Aiden products exist as the system diagram and as child pages, not as the sitemap’s first idea. A dedicated **Evaluate** path is the Market Guide scorecard (this is B+C on a blank canvas).

- Wins: Firefly-class findability for I&O and Platform; Gartner scorecard without renaming the company; graph/change architecture can be the “how.”
- Loses: more pages to write; product marketing must keep job pages and SKU pages in sync.

**Lock for this spec: C.**

---

## 4. Greenfield sitemap

Primary nav (five items, not seven):

```text
Product          →  How Aiden works (OS + OCG + four surfaces as one system)
Use cases        →  Reliability  ·  Governed change  ·  Signal & RCA  ·  Policy-checked delivery
Who it's for     →  Platform  ·  SRE  ·  I&O / Infra leaders  ·  Security
Customers
Resources        →  Evaluate (scorecard)  ·  Security & hybrid  ·  MCP  ·  Docs-ish  ·  Blog
                 Schedule demo
```

Utility: Login.

**Do not** put four product names in the top nav. They appear inside Product (system diagram) and at the bottom of every use-case page.

### Routes (ideal, empty tree)

| URL | Buyer job | Page type |
|---|---|---|
| `/` | 1–2 | Enterprise homepage (8–12 sections) |
| `/product` | 2 | System: Agentic OS, OCG, four surfaces, factory process vs product loop |
| `/product/infrastructure` | 3 | SKU depth |
| `/product/automation` | 3 | SKU depth |
| `/product/observability` | 3 | SKU depth |
| `/product/sre` | 3–5 | Highest Gartner-density SKU |
| `/use-cases/reliability` | 1–3 | Job: SRE practices without the hiring cliff |
| `/use-cases/governed-change` | 1–3 | Job: agent/IDE speed under policy |
| `/use-cases/signal-and-rca` | 3 | Job: change-aware RCA |
| `/use-cases/policy-checked-delivery` | 3 | Job: gates, deploy risk, verify |
| `/for/platform` | 6 | Champion kit |
| `/for/sre` | 2–5 | Practitioner + Head of SRE |
| `/for/infrastructure-operations` | 3–6 | **I&O evaluator (C).** Market Guide scorecard language |
| `/for/security` | Paper process | HITL, audit, hybrid, compliance |
| `/customers` and `/customers/greythr` | 5 | Proof. greytHR only until more clear |
| `/evaluate` | 3–6 | Printable scorecard + FAQ. Alias of I&O page or a thinner sibling |
| `/security` | 5, Paper | Hybrid, SOC2/PCI/HIPAA, audit trail |
| `/mcp` | 3 | Agent integration checkbox |
| `/schedule-demo` | 5 | Single conversion |

Pricing: sales-led. `/pricing` is “platform fee + usage → Schedule demo,” not a grid of dollars unless finance unlocks it.

---

## 5. Homepage from scratch (enterprise 8–12)

Hero restraint (Veza): one outcome, one visual, one CTA, logos under. Not four products in the H1.

### Recommended Home spine

| # | Section | Buying job | What it must communicate |
|---|---|---|---|
| 1 | **Hero** | 1–2 | Outcome: reliability and governed change without a hiring cliff / untrusted agents. Visual: **one** mechanism (intent → orchestrator → outcome, with govern visible). CTA: Schedule demo. Secondary: See how it works → `/product`. **Not** “AI SRE tooling” as H1. |
| 2 | **Logo bar** | 5 | Recognizable enterprise marks. Marketing-owned. Quality over count. |
| 3 | **The trap (teaching)** | 1 | One idea: faster incident close ≠ more reliable systems. Ops-only agents optimize firefighting. This is Gartner’s commercial insight in our voice. No analyst badge. |
| 4 | **Jobs (interactive)** | 2 | Four hard intents the visitor can switch: restore service · explain what changed · migrate under policy · gate a release. Each pair with an outcome. Mix **ops and delivery** so the page is not an incident toy. |
| 5 | **How (one diagram)** | 2 | Shared context (OCG) + policy + humans in the loop. Factory process (Intent → Spec → Runtime → Learning) **or** product loop (build → govern → observe → remediate). Pick **one** for Home. Put the other on `/product`. |
| 6 | **Who it’s for** | 6 | Three cards: Platform · SRE · I&O. Each links to `/for/…`. Anti-persona in microcopy: not an IDE autocomplete buyer. |
| 7 | **Proof** | 5 | greytHR only. Metric cells with mechanism lines. PLACEHOLDER quotes do not ship. |
| 8 | **Trust chips** | Paper | HITL · Hybrid (SaaS / on-prem / air-gap) · Audit of actions · Compliance badges |
| 9 | **Integrations** | 4 | “Audit tools you already own.” Strip, then `/product` or integrations child |
| 10 | **Evaluate** | 3 | Short: “If you were handed a Market Guide-style scorecard.” Link `/evaluate`. Still no “named by Gartner.” |
| 11 | **Final CTA** | 5 | Recap the roof message. Schedule demo only |

**Hero copy ingredients (not locked final lines):**

- Headline pattern: `{SRE / reliability outcome} without {hiring cliff or ungoverned agents}` (8–12 words).
- Sub: the OS does build, change, observe, and remediate on shared context, with people still on the loop (12–18 words).
- Visual: product UI or orchestrator diagram, full-bleed, no fake browser chrome.

**Do not put on Home:** CLI/Slack/MCP as the first explanation; Gartner percentages; four SKU columns as the hero; operator-autonomy dashboards we cannot demo; dollar ROI.

---

## 6. What every other page type is for

### `/product` (the system, not a feature grid)

One page that answers solution exploration: this is an **operating system** with a **knowledge graph** (OCG) and a **policy plane**. Four surfaces are how work is packaged, not four companies. Contrast unnamed: incident agents, hyperscaler-only agents, agentic IDEs. Named cuts only where already locked (Harness, AWS DevOps Agent, HashiCorp, Resolve, Traversal) and as mechanism contrast, never “we replace.”

### Use-case pages (primary conversion after Home)

Each page: job story → mechanism → proof → scorecard rows that apply → SKU deep links → Schedule demo.

This is how we beat Resolve’s “on-call / incidents / tasks” IA: our jobs include **design and delivery**, not only response.

### `/for/infrastructure-operations` and `/evaluate` (C)

Written for the Head of I&O who has the Market Guide open.

Spine: outcome hero → trap → **scorecard table** (require / Aiden mechanism / where to see it) → existing-tool fit → HITL / hybrid / audit → beyond operations (three use-case links) → greytHR → FAQ → demo.

Scorecard rows: only demoable mechanisms (HITL, hybrid, change-aware RCA, policy-checked remediate + verify, SLO-aligned healing without fake composite-SLO depth, OCG as shared context, MCP, audit). **Do not claim:** predictive capacity planning, autonomous app debugging, chaos injection, agent-reliability-testing product.

### `/product/sre`

Practitioner depth for the same scorecard. Incident timeline, refusal boundary, verify step. Exit to `/evaluate` for the I&O packet.

### `/security`

Paper process. If this page is weak, enterprise deals die in committee even if Home is beautiful.

---

## 7. Message house (site-wide, greenfield)

**Roof:** Reliability does not improve because AI closes tickets faster. It improves when the same governed system that builds and changes production also observes and remediates it.

**Walls:**

1. SRE adoption is a cost and toil problem. Buy practice, not a 20-person org.
2. Ops-only agents are a dead end. Shared context + policy across the loop is the product.
3. Autonomy only at the pace of confidence. HITL, audit, hybrid are adoption conditions, not polish.

**Foundation:** OCG, policy at the boundary, four surfaces, factory process, MCP, greytHR, compliance badges.

**Buyer language to mirror:** reliability, resilience, SLO/SLI, toil, RCA, what changed, humans in the loop, hybrid, audit, knowledge graph (as a description of OCG), design and delivery.

**Never on the site:** named in Gartner, representative vendor, Olly, single pane of glass, we replace X, uncleared $, em dash.

---

## 8. Journey map (website touchpoints only)

| Stage | They do | Site must | Emotion if we fail |
|---|---|---|---|
| Awareness | Analyst email, peer, search, AI overview | Home teaching + AI-citable H1/H2 | “Another incident copilot” |
| Problem | Forward Gartner to Slack | Trap section + `/evaluate` | “We already have Datadog” |
| Explore | Click SKUs vs jobs | Jobs in nav, OS on `/product` | SKU soup |
| Requirements | Build a spreadsheet | Scorecard they can paste | Champion loses the room |
| Select | Compare Harness / AWS / Resolve | Mechanism cuts, not insults | Feature bingo |
| Validate | Demo, security review | Product UI, `/security`, hybrid | Brochureware bounce |
| Consensus | CIO + risk | `/for/infrastructure-operations` + FAQ | Deal stalls |

Aha moment to design for: **change-aware RCA that can refuse a remediation.** Not a chat bubble.

---

## 9. Craft bar (not a visual system)

When this is designed, not in this file: precise engineered register (Linear/Vercel-class), one accent, product UI full-bleed 16:9, no PIP/browser chrome, motion only as reveal. High-end-visual-design anti-patterns (generic Inter-on-gradient AI sludge, three equal feature columns as the whole Home) are banned. IA in this spec already forbids the three-column SKU hero.

CTA: **Schedule demo** as primary everywhere except where a later PLG decision exists. Hero may use a secondary “See how it works.”

---

## 10. What this is not

- Not instructions to rebuild `web/` or `Stack_Linear.pen` this week.
- Not a contradiction of factory-launch Monday work. That spec remains the **current** Home track. This spec is the **ideal** architecture if we were unconstrained.
- Not a request to reopen L0–L2 category language.
- Not licensed Gartner citation copy.

If you later want the live site to converge on this IA, that is a separate migration plan. Do not silently mix this sitemap into the factory-launch mock.

---

## 11. Review gate

Please review this greenfield spec.

The one decision that still changes the Home: **should the first screen lead with the teaching problem (ops-only trap) or with the ADF/factory vision?** This spec recommends **outcome hero + trap as section 3**, so the fold is clarity (Veza) and the teaching lands after logos. If you want the trap in the subhead instead, say so.

If this looks right, next is either (a) keep it as a north-star IA while Monday factory-launch proceeds, or (b) a `writing-plans` migration from current IA toward this sitemap. Do not start (b) without an explicit ask.
