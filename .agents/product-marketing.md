# Product Marketing Context

**Document version:** v1.2  
**Last updated:** 2026-08-31, AOF + InfraOps/DevOps public naming lock (Wave 1).

Source of truth for site copy, IA, and Pencil work. Align with `PRODUCT.md` (naming, mechanisms, evidence gates). Messaging layers L0–L2 below supersede older one-liners when they conflict.

---

## Messaging architecture (site-wide)

```text
AOF (architectural vision)
 └── Agentic / Agent-native OS
      └── Aiden (product suite)
```

| Layer | Role | Locked copy |
|---|---|---|
| **L0** | Company + product | StackGen is the company behind Aiden, the DevOps operating system for AI-native environments. Aiden serves Platform Engineers, Developers, and SRE teams. |
| **L1** | AOF vision | Aiden sets the foundations for an Autonomous Operations Factory: build, govern, observe, and remediate the agent-driven SDLC so velocity and governance move in the same path. Platform engineering and SRE leaders scale developer autonomy at the pace their confidence supports — not merely faster because agentic IDEs can push untrusted recommendations faster. |
| **L1b** | Problem (mid-page) | Agentic IDEs can make untrusted recommendations faster. Speed without a governed loop is how agent-driven change creates incidents. Cite DORA / CodeRabbit / New Relic (see Proof Points). |
| **L2** | System / product | Aiden is the Agentic OS for DevOps — for Platform Engineers, Developers, and SRE teams to build, operate, monitor, and heal production multi-cloud environments for applications and AI agents, with guardrails baked in and without organizational silos or vendor lock-in. (**No** “single OS”; **no AOF** in L2.) |
| **L3–L5** | Depth / trust | Named Aiden products + mechanisms; spans the full production journey; brings together what teams already trust across infrastructure, operations, and reliability. |

**Canonical boilerplate** (About / long-form; L0 intent + L2–L5 depth):

> StackGen is the company building the Agentic Operating System, offered through Aiden, a suite of products built for platform engineers, developers, and SRE teams. Aiden is the agent for AI-native DevOps environments that gives enterprises a single platform to build, operate, monitor, and heal production multi-cloud environments for both applications and AI agents, with guardrails baked in and without organizational silos or vendor lock-in. Where other vendors stop at writing code or managing infrastructure, StackGen spans the entire production journey. The Agentic Operating System brings together what teams already trust, enabling them across infrastructure, operations, and reliability with the control and flexibility enterprises need.

**Hero pattern:** H1 = Autonomous Operations Factory · Sub/body from L0–L2 · Bold Factory-like energy on hero · Declarative elsewhere.

**Replica homepage override (`/`):** Hero H1 is **"Take control of production change"** (v2); AOF demoted to Assemblies below the fold (Approach C). L0–L2 locks above unchanged.

**Naming (binding):** Aiden for InfraOps · Aiden for DevOps · Aiden for Observability · Aiden for SRE. Never “Olly” on site. AOF is vision, not a SKU.

**Superseded 2026-08-31 (historical only):** Aiden for Infrastructure · Aiden for Automation · Autonomous DevOps Factory (ADF) — do not use on public web.

## Factory process & OCG (deck harvest)

**Authority:** Hybrid C from postn-deck incorporation. Mechanism language from `sg-new-postn-deck/`. Naming/CTA/evidence remain this document + PRODUCT.md.

### Factory process (not a product loop)

Intent → Factory Spec → Factory Runtime → Factory Learning.

- **Intent:** State the operational outcome in plain language.
- **Factory Spec:** Reviewable spec defining agents, OCG data, SLOs, and escalation boundaries.
- **Factory Runtime:** Agents execute configured tasks; novel edge cases escalate to humans with full context.
- **Factory Learning:** Patterns and remediation outcomes write back to the OCG.

This is the AOF **operating process**. It is distinct from the **product loop** Build → Govern → Observe → Remediate (four Aiden products).

### Operational Context Graph (OCG)

Shared memory across domains: infrastructure topology, change attribution, drift history, incident causality, observability correlations. What separates a factory from a collection of stateless domain agents.

### Problem enrichment (site L1b companion)

Software creation velocity (agentic IDEs / PR volume) outpaces software operations. Manual delivery toll (supervised deploys, approval gridlock, stale runbooks). Reactive SRE without shared change context. Stateless domain agents fail cross-domain plays. Prefer attributed industry cites on the public Home (DORA / CodeRabbit / New Relic); deck anecdote numbers need a source before use as metrics.

### Evidence park (not for public canvas until unlocked)

Slide 14 modeled annual value ($4M–$6M for a 500-engineer company) and similar modeled ROI figures: sales-only until finance/AR sign-off.

---

## Product Overview

**One-liner:** StackGen is the company behind Aiden, the DevOps operating system for AI-native environments. Aiden serves Platform Engineers, Developers, and SRE teams.

**What it does:** Aiden is the Agentic OS for DevOps — for Platform Engineers, Developers, and SRE teams to build, operate, monitor, and heal production multi-cloud environments for applications and AI agents, with guardrails baked in and without organizational silos or vendor lock-in. Aiden sets the foundations for an Autonomous Operations Factory so enterprises can build, govern, observe, and remediate the agent-driven SDLC with velocity and governance in the same path.

**Product category:** Agentic OS for DevOps (under AOF architectural vision)

**Product type:** Hybrid — SaaS default; on-prem / air-gapped for regulated enterprises

**Business model:** Platform fee + tiered usage

---

## Target Audience

**Target companies:** Primarily large enterprise / regulated (finance, healthcare, defense-adjacent, complex multi-cloud). Also sell mid-market / growth tech. Design center = enterprise.

**Decision-makers:**
- Primary path: Platform Engineering / SRE leaders (VP / Director / Head) as champion; CIO / VP Infrastructure as signer
- Multi-product deals: dual-track — platform/SRE for fit; executive for budget and operating-model sign-off

**Primary use case:** **B — Full Autonomous Operations loop** (build → govern → observe → remediate) as **new launch north star**. Continue existing GTM: **A** governed infra change · **C** SRE / MTTR / heal with bounded autonomy.

**Jobs to be done** (preference order):
1. Scale developer / agent autonomy without losing governance
2. Detect and heal production issues inside SLOs
3. Ship infra and pipeline change safely (policy-checked)
4. Collapse siloed tools into one Agentic OS across domains

**Use cases:**
- Launch (AOF): agent velocity + governance in one loop across domains
- Infra GTM: intent → policy-checked change without ungoverned agent freelancing
- SRE GTM: detect → diagnose → remediate within policy; reclaim SRE time

---

## Personas

| Persona | Role | Cares about | Challenge | Value we promise |
|---------|------|-------------|-----------|------------------|
| **User** | Platform eng + SRE | Diffs, policy results, SLOs, MTTR, production truth | Agent/IDE speed without a governed loop | Operate Aiden across build → govern → observe → remediate |
| **Champion** | Head/Dir/VP Platform **or** SRE (by motion) | Autonomy at confidence pace; team leverage | Selling AOF vs point tools / IDEs | Credible path to AOF without ripping out what they trust |
| **Decision Maker** | CIO / VP Infra / VP Platform **or** CTO / VP Eng (by deal) | Operating model, risk, multi-product scope | Ungoverned agent change + siloed tools | Agentic OS under AOF; velocity + governance together |
| **Financial Buyer** | Same as Decision Maker | ROI; platform fee + usage predictability | Build-vs-buy governance layer | Buy the foundations instead of building AOF in-house |
| **Technical Influencer** | Staff/Principal Platform or SRE (primary); Security/Risk adjacent | Will it work; can it refuse at policy bounds | Trusting agents in production | Bounded autonomy; policy at every action |

Developers interact mainly via IDE / PRs / tickets that Aiden governs — not the primary buyer persona.

---

## Problems & Pain Points

**Core problem:** All three; **A** leads launch narrative
- **A (launch):** Agent / IDE-driven change outruns governance → incidents
- **B (support):** Point-tool stitching; humans as the integration layer
- **C (support):** Observe / advise only — cannot safely *change* under policy

**Why alternatives fall short** (lead order A → C → B):
1. Coding agents / agentic IDEs optimize for speed, not governed production change
2. DIY platform + scripts don’t scale as a shared Agentic OS
3. Single-domain AIOps / observability agents don’t span build → govern → observe → remediate

**What it costs them** (leadership order):
1. Incidents / downtime / change-failure from ungoverned agent output
2. Slowed autonomy (CAB blocks agents without a refusal boundary)

**Emotional tension:** Fear of the next AI-caused incident on their watch

---

## Competitive Landscape

**Direct (site set):**
- **AWS DevOps Agent** — hyperscaler agentic DevOps (AOF launch contrast)
- **Harness** — AI across SDLC / DevOps platform (AOF launch contrast)

**Secondary (motion-scoped):**
- **HashiCorp** — IaC / infra (GTM A) only
- **Resolve** — SRE (GTM C) only
- **Traversal** — SRE (GTM C) only

**Indirect / foil (not named competitors on homepage):** Agentic IDEs / coding agents; DIY platform glue. Last9 not in current site set.

**Contrast by motion:** B (AOF) → Harness + AWS · A (infra) → HashiCorp · C (SRE) → Resolve + Traversal

---

## Differentiation

**Key differentiators:**
- **Lead (launch):** Full AOF loop under one Agentic OS — build → govern → observe → remediate across domains
- **Proof mechanism A:** Safely *changes* infrastructure (intent → policy-checked Terraform/OpenTofu) — not observe/advise-only
- **Proof mechanism C:** Bounded autonomy — scale at confidence; refuse at policy bounds

**How we do it differently:** Deterministic plane (AppStacks, Terraform/OpenTofu, Tirith, topology) + agentic plane (Aiden) on shared Operational Context Graph — cross-domain plays where context from one domain drives action in another.

**Why that’s better:** Velocity and governance move in the same path; autonomy scales only as far as confidence supports.

**Why customers choose us:** Foundations for AOF / governance for agent-driven change — not another point agent or IDE.

---

## Objections

| Objection | Who | Response angle |
|-----------|-----|----------------|
| “We’ll build the governance / agent layer in-house” | Advanced DIY platform engineering | Buy foundations of AOF; build-vs-buy on time-to-governed autonomy, not feature parity |
| “We don’t trust agents to change production” | Smaller / regulated; less agentic-IDE adoption | Bounded autonomy + refusal at policy; recommend → approve → act-within-policy ladder |

**Anti-persona:**
- IDE / autocomplete-only buyers (no production governance appetite)
- Hyperscaler-only shops unwilling to consider multi-cloud / customer-owned change workflows

---

## Switching Dynamics

**Push:** Fear of AI-caused incidents from ungoverned agent/IDE change **and** Platform/SRE drowning as the human integration layer across tools

**Pull (primary):** Autonomy at the pace of confidence — velocity and governance in the same path

**Habit:** Sunk cost in bought tools **and** DIY platform glue that mostly works

**Anxiety:**
- Primary: build-vs-buy / giving up strategic control of the platform layer
- Secondary (large enterprise): another platform / rip-and-replace fear
- SRE-domain deals: neither is a real blocker

---

## Customer Language

**How they describe the problem** (mix — three clusters):
- Agents outpace governance → production incidents (pattern language; named quotes need approval)
- Human glue across incident / monitoring tools (SRE path)
- Platform team as AppEng bottleneck / handoff tax

**How they describe the solution (A + C only):**
- Governance layer for agent-driven change
- Foundations for an Autonomous Operations Factory  
  (“Glue / OS” is supporting mechanism language, not the customer-facing lead)

**Words to use:** governance, guardrails, bounded autonomy, Agentic OS, Autonomous Operations Factory, policy-checked, build → govern → observe → remediate, Platform / SRE

**Words to avoid:** Olly · DevOps Factory as product-only name · public product names Infrastructure / Automation · “we replace HashiCorp/Harness” · unverified customer quotes · “single pane of glass” · em dashes · **Git / estate** (and “their Git / estate”)

**Glossary:**

| Term | Meaning |
|------|---------|
| AOF | Autonomous Operations Factory — architectural vision / destination, not a SKU |
| Agentic OS | Aiden as the operating system for AI-native DevOps |
| Aiden | Product suite: InfraOps, DevOps, Observability, SRE |
| Bounded autonomy | Act within policy; refuse and escalate when limits are crossed |
| Tirith | Policy framework evaluated at action boundaries |
| Operational Context Graph | Shared memory across Aiden surfaces enabling cross-domain plays |

---

## Brand Voice

**Tone:** Bold category vision (Factory.ai energy) on homepage hero; declarative, precise, mechanism-first everywhere else

**Style:** Direct · no hedging · every claim cites a mechanism · no em dashes on canvas

**Personality:** Bold · Relentless · Builder-forward · Earn-trust · Autonomy-obsessed

---

## Proof Points

**Proof stack (homepage / launch):**
1. Logos + published cases
2. Customer quotes on AOF (**approval required** — placeholders OK for design only)
3. Industry “state of agentic-coding incidents” with attributed cites

**Customers / logos (live stackgen.com, 2026-08-19):** Nielsen, greytHR, Corcentric, Piramal, NIQ, SAP-NS2, Lowe's, RocTop, Chamberlain, Autodesk, InMobi, Innovaccer  
Pack: `docs/proof/customer-logos-and-quotes.md` · assets: `.firecrawl/logos-quotes/assets/`

**Published cases:**
- greytHR — https://stackgen.com/case-studies/greythr (named quote: Abhishek Gaurav)
- Innovaccer — https://stackgen.com/case-studies/innovacer (metrics; no named public quote)

**Published greytHR quote:**
> “Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs.” — Abhishek Gaurav, Head of Engineering & DevOps, greytHR

**Product metrics** (cite with mechanisms; from `PRODUCT.md`):
- SRE: 50% MTTR · 66% faster RCA · 90% less alert noise · 10–15 hrs/week per SRE
- InfraOps: 10× velocity · 100% policy-checked deploys · 95% less IaC toil
- DevOps: ~30% fewer pipeline tickets
- Observability: 60%+ lower cost · 300+ integrations

**Citeable incident / quality data (attribute on site):**
- AI PRs ~1.7× more issues; 75% more logic/correctness — CodeRabbit / Stack Overflow Blog
- New Relic 2026 State of AI Coding — 78% more incidents once live; 82% ≥1 AI-tied production failure in 6 months
- DORA 2024 — AI helps productivity but hurts delivery stability and throughput
- GitClear 2025 — rising clone/copy-paste under AI assistants

**Analyst / partner (secondary strip):** Gartner Cool Vendor in AI for IT Operations · named in 4 Gartner Hype Cycles · AWS Advanced Technology Partner · Google Cloud Partner

**Value themes:**

| Theme | Proof |
|-------|-------|
| Autonomy + governance together | L1 + bounded autonomy + greytHR / Innovaccer cases |
| Full AOF loop | Product family diagram + cross-domain mechanisms |
| Agent risk is real | DORA / CodeRabbit / New Relic strip |
| Enterprise trust | Logos + Gartner / cloud partner strip |

---

## Goals

**Business goal:** Drive qualified enterprise / mid-market pipeline for the AOF launch narrative (Agentic OS via Aiden), while supporting existing infra and SRE GTM motions.

**Conversion action:** **Schedule demo** only — sole primary CTA in nav, hero, and mid/final page CTAs. No dual primary. Secondary links (cases, login) may exist as navigation, not competing CTAs.

**Current metrics:** Not captured in intake — leave blank until marketing ops provides demo volume / SQL targets.

---

## Related artifacts

- `PRODUCT.md` — naming, mechanisms, evidence gates, Linear visual world
- `docs/proof/customer-logos-and-quotes.md` — logo inventory + design placeholders
- `Stack_Linear.pen` — Direction Contract + Home foundation
- Visual: Linear-pinned · accent `#9437FF` · no glow · em-dash ban on canvas

---

## Changelog

*Newest first. One line per revision: what changed and why.*

- v1 (2026-08-19) — Initial context from guided intake §§1–12; CTA locked to Schedule demo only; logos pack referenced.
- v1.2 (2026-08-31) — Public naming lock: Autonomous Operations Factory (AOF) + Aiden for InfraOps / DevOps / Observability / SRE; superseded Infrastructure / Automation / ADF.
- v1.1 (2026-08-19) — Deck harvest vocabulary added without changing L0–L2 locks.
