# Platform page content refine — Option B (Factory OS spine)

**Date:** 2026-09-07  
**Status:** Approved and applied in Figma (structure freeze; content replace)  
**Figma:** [Untitled `enbTImmHX5fzouoAHczxSJ`](https://www.figma.com/design/enbTImmHX5fzouoAHczxSJ/Untitled?node-id=10-101) · Platform frame `10:101`  
**Approach:** Option B (approved)  
**Visual system:** Soft Structuralism (home SoT). No layout redesign in this pass.  
**Copy craft:** expert-pmm-writer (AI-sign audit clean on draft below)

## Problem

Platform `10:101` already has a Harness-inspired IA (hero → four products → world model → expert UI → factory loop → governance → insights → CTA). Section copy is still generic / Harness-echo and does not harvest the Website Sequencing AOF spine or the AWS AI-Native InfraOps texture.

## Goal

Preserve the current section stack and diagram `33:114`. Replace messaging so the page argues: four products on an Agentic OS → Shared World Model → agents plan → Build/Operate/Observe/Remediate → humans keep authority → ask the graph.

## Sources

| Source | Role on Platform |
|---|---|
| `Website_Sequencing.pptx (1).pdf` | Primary: Outcomes/not agents, product map, OCG, Intent→Spec→Runtime→Learning, humans vs factory, RCA sample |
| `AWS _FY26_…slides11_18….pdf` | Secondary: InfraOps intent→governed AWS, ServiceNow close-loop, vibe→live / guardrails color |
| `.agents/product-marketing.md` | Locks: Agentic OS, product names, SRE-first reader, evidence park |
| Current Figma `10:101` | Structure + Soft Structuralism tokens |

Extracts: `.firecrawl/platform-content-docs/website-sequencing.txt`, `aws-campaign-slides.txt`.

## Non-goals

- Do not redesign section order or remove placeholders (product UI, factory animation).
- Do not put Autonomy Index %, modeled ROI, or unapproved customer quotes on the page.
- Do not turn Platform into an InfraOps-only landing (that is Option C; rejected).
- Do not use AOF as a SKU name; AOF is vision / eyebrow language only.
- Do not use “single OS” (product-marketing L2 ban). Prefer “Agentic OS” / “Aiden OS”.

## Naming locks

| Use | Avoid |
|---|---|
| Aiden for InfraOps / DevOps / Observability / SRE | Olly; Aiden for Infrastructure / Automation |
| Product loop: **Build → Operate → Observe → Remediate** | Renaming Operate to Govern on this page |
| Factory process: **Intent → Spec → Runtime → Learning** (supporting line in §06) | Conflating process with the four product stages |
| Shared World Model / Operational Context Graph | “Knowledge Graph” as the only public name (OK as secondary) |
| Schedule a demo | Marketplace / Start for Free (Harness/AWS chrome) |

## Structure (frozen)

| # | Frame name | Node (approx) | Role |
|---|---|---|---|
| 01 | Nav | `11:87` | Keep |
| 02 | Hero | `105:198` | Content replace |
| 03 | Four agents | `105:207` | Content replace |
| 04 | Shared World Model | `107:105` + diagram `33:114` | Content replace; keep diagram |
| 05 | Expert agents plan | `107:120` | Content replace; keep UI placeholder |
| 06 | Factory flow | `109:196` | Content replace; keep animation placeholder |
| 07 | Governed orchestration | `109:222` | Content replace |
| 08 | Ask the world model | `109:247` | Content replace; sample Q&A from Sequencing RCA |
| 09 | Final CTA | `15:127` | Content replace |
| 10 | Footer | `15:132` | Keep / light touch |

## Section copy (approved Option B draft)

### 02 Hero

- **Eyebrow:** AIDEN OS
- **H1:** Outcomes, not agents.
- **Sub:** Aiden is the Agentic OS for DevOps. Platform engineers with DevOps and SRE teams build and operate production, then observe and remediate it with shared context and guardrails in the same path.
- **Primary CTA:** Schedule a demo
- **Secondary CTA:** See how the OS works

**H1 alternatives (if needed later):** Take control of the outer loop. · Velocity and governance in the same path.

### 03 Four agents

- **Eyebrow:** PRODUCTS
- **H2:** Four products. One Agentic OS.
- **Sub:** Start anywhere in the loop. Each product shares the world model plus policy and an audit trail.

| Product | Line | Bullets |
|---|---|---|
| Aiden for InfraOps | Intent in the IDE becomes policy-checked infrastructure. | Self-serve AppStacks from the IDE · Terraform or OpenTofu without the ticket queue · Compliance checked before production · ServiceNow audit trail on deploy |
| Aiden for DevOps | Ticket and IDP requests become governed pipeline actions. | ServiceNow, Jira, Linear queues · Blueprint-backed compose · More deploys with the same controls · CI/CD actions agents can run |
| Aiden for Observability | Keep your dashboards. Add an agentic layer on top. | Bring Grafana or Datadog, New Relic, or Dynatrace · Keep the telemetry you already run · Agents query live context · Cut observability toil on upgrades |
| Aiden for SRE | Triage and RCA, then remediation inside policy bounds. | Alert clustering to the incidents that matter · Correlate deploys with infra and signals · Human approval before irreversible acts · Learning written back to runbooks |

Links: Explore InfraOps / DevOps / Observability / SRE

### 04 Shared World Model

- **Eyebrow:** SHARED WORLD MODEL
- **H2:** Grounded in how you actually run production.
- **Sub:** The Operational Context Graph holds infrastructure topology and change attribution, plus drift, incident causality, and observability correlations. Products write into it. Agents read from it.
- **Keep:** Double-bezel diagram `33:114`
- **Facets:**
  - **Context Graph:** Sources of truth across code with infra, runtime state, and knowledge, queryable in real time.
  - **Policy and rules:** Approvals, blast-radius limits, and org standards so agents act inside the same gates humans already trust.
  - **Operational memory:** Every result updates future gates and runbooks for the next agent run.

### 05 Expert agents plan

- **Eyebrow:** EXPERT AGENTS
- **H2:** Domain agents plan from live context.
- **Body:** Specialists across InfraOps, DevOps, Observability, plus SRE that know your repos, AppStacks plus policies and incident history before they propose a change.
- **Chips:** InfraOps · DevOps · Observability · SRE
- **Link:** Explore agents
- **UI:** Keep PRODUCT UI PLACEHOLDER · chrome “Aiden · Expert agent” · ask bar “Ask Aiden about this environment…”

### 06 Factory flow

- **Eyebrow:** AUTONOMOUS OPERATIONS FACTORY
- **H2:** Build. Operate. Observe. Remediate.
- **Sub:** Enter at any phase. Agents hand off across the loop while Intent to Spec to Runtime to Learning keeps the factory honest.
- **Stages:**
  1. **Build:** Guard-railed infra from IDE intent to governed AppStacks.
  2. **Operate:** DevOps queues and pipeline actions with audit on every change.
  3. **Observe:** Signals stay connected to deploys, infra state, and cost.
  4. **Remediate:** Repeated issues get playbooks. Novel cases escalate with full context.
- **Animation:** Keep ANIMATION PLACEHOLDER (Build → Operate → Observe → Remediate handoff)

### 07 Governed orchestration

- **Eyebrow:** GOVERNED ORCHESTRATION
- **H2:** Humans keep authority. The factory absorbs toil.
- **Sub:** Goals, risk appetite, and irreversible calls stay with you. Evidence gathering, routine decisions, and execution with learning run through Aiden OS.
- **Where it runs:** Actions execute in your environment. Secrets stay put. Public cloud, private SaaS, or self-hosted.
- **What it may do:** Governance with RBAC and policy bound every agent the same way they bound humans. Human-in-the-loop when the stakes require it.
- **What it actually did:** Decision traces for each input, each decision, and each action. Every trace is durable and replayable for audit.
- **Modes:** Autonomous · Human in the loop · Deterministic  
  Line: Set autonomy per task, per environment, and per team. Same identity, same policy, same evidence under all three.

### 08 Ask the world model

- **Eyebrow:** INSIGHTS
- **H2:** Ask production questions against shared context.
- **Body:** Query the graph instead of waiting on a dashboard project. Change attribution with blast radius and hop paths from the same memory agents use.
- **Points:**
  1. **Chat with live context:** Ask which change drove last night's error spike and get a hop path, not a war room scramble.
  2. **Toolchain unified:** Repos with cloud inventory plus alerts and runbooks resolve into one graph for agents and humans.
  3. **Close the loop:** Recommended fixes can open a PR or restore policy, with blast radius named up front.
- **UI sample Q:** Which commits or deploys are linked to last week's failed remediations?
- **UI sample A:** customer-support agent's IAM role is missing Bedrock invoke permission for the model change in PR #482. Blast radius: Services A and B. Recommended next step: restore invoke permission, or revert the provider change.
- **Tags:** Policy · Build · Observe · Remediate

### 09 Final CTA

- **H2:** See the OS behind the products.
- **Sub:** Schedule a demo. Walk Intent to Spec to Runtime on your stack.
- **CTA:** Schedule a demo

## Implementation notes (after spec approval)

1. Figma-only content pass on `10:101` text nodes (no React yet).
2. Do not delete `33:114` or placeholder shells.
3. Re-run Soft Structuralism token check after edits (cream / muted / purple accents).
4. Update `openmemory.md` Patterns when live in Figma.
5. Optional next: writing-plans for React/Puck wiring of the same copy contract.

## Spec self-review

- [x] No TBD/TODO placeholders in approved copy blocks
- [x] Structure matches live Figma kids on `10:101`
- [x] Product loop vs factory process distinguished
- [x] Evidence park respected (no Autonomy Index / ROI on page)
- [x] Naming locks vs product-marketing.md checked
- [x] Scope = content refine only (not full redesign)

## Approval gate

User selected **Option B** and approved proceed (2026-09-07). Copy applied to Figma Platform `10:101`. UI/animation placeholders retained.

**Visual follow-up (2026-09-07):** Diagram `33:114` (products + Aiden OS + integrations) lives under **03 Four agents** (`105:207`). **04 Shared World Model** (`107:105`) uses a Gemini Context Graph plate (`126:196` / `126:198`) so the section shows an OCG / knowledge-graph visual, not the platform map.
