# Gartner-aligned website messaging framework

**Date:** 2026-08-21  
**Status:** Locked **B+C** (user, 2026-08-21). Page-brief deltas: `docs/superpowers/specs/2026-08-21-gartner-bc-page-brief-deltas.md`. Greenfield IA: `docs/superpowers/specs/2026-08-21-gartner-greenfield-website-framework.md`  
**Product:** Aiden (StackGen), Agentic OS for DevOps under the Autonomous DevOps Factory vision  
**Source report:** Gartner, *Market Guide for AI Site Reliability Engineering Tooling*, Daniel Betts, Chris Saunderson, Hassan Ennaciri, 26 January 2026 (document G00836089; sponsored reprint `id=1-2MSTEYNH`, `ct=260202`)  
**Reprint URL (internal):** https://www.gartner.com/doc/reprints?id=1-2MSTEYNH&ct=260202&st=sb  
**Canonical StackGen locks:** `.agents/product-marketing.md` · `docs/superpowers/specs/2026-08-19-positioning-icp.md` · `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md`

This is an internal strategy brief. It is not a Gartner reprint, not a public landing page, and not a claim that StackGen is named in the Market Guide.

---

## 0. Skills used for this brief

| Skill | Why |
|---|---|
| `using-superpowers` + `brainstorming` | Structured research → options → written spec before any site implementation |
| `firecrawl-cli` / `firecrawl-scrape` / `firecrawl-interact` | Extract the reprint (JS PDF viewer; raw scrape returned empty markdown) |
| `research` | Confirm report identity against Gartner.com abstract (doc 7362330) and vendor coverage |
| `positioning-ideas` | Category choice vs the Gartner shelf; do not collapse into a 40-vendor list |
| `ideal-customer-profile` + `job-stories` | Map Heads of I&O (Gartner audience) onto locked Platform/SRE ICP |
| `competitor-analysis` | Market Guide representative-vendor set vs StackGen’s locked competitive cuts |
| `gtm-strategy` | What a Gartner-influenced buyer needs before a demo |
| `copywriting` (enterprise B2B page template) | Where each message lives on the site |
| `solution-brief` | Decision gate: follow the Gartner shelf, teach against it, or split IA |

Not used: visual design skills, PRD, or canvas implementation. This brief stops at messaging architecture.

---

## 1. What the report actually is

This is Gartner’s **inaugural Market Guide** for a market they are renaming from “SRE tooling” to **AI SRE tooling**. It is written for **Heads of Infrastructure and Operations (I&O)**. It is not a Magic Quadrant. Inclusion as a “Representative Vendor” means the vendor showed at least two capabilities from the guide. It is **not** a ranking, a leaderboard, or an endorsement.

**StackGen / Aiden is not in the representative-vendor table.** The public site must never imply otherwise. Peers already using this reprint as marketing (CAST AI, Firefly, NeuBird, Komodor, NOFire, and others) are doing “named in the Market Guide” campaigns. That motion is closed to StackGen until Gartner lists you. The useful motion is: **sound like the buyer Gartner just briefed**, and **occupy the gap Gartner itself flags**.

Locked StackGen competitive names that **do** appear in the guide: AWS DevOps Agent, Harness AI SRE, Resolve.ai, Traversal, Firefly.ai, Microsoft Azure SRE Agent, Datadog Bits AI, Last9. Coralogix appears as **Olly** — that name stays banned on the StackGen site.

---

## 2. What Gartner is teaching the buyer (paraphrase)

Use this as the commercial insight. Do not paste Gartner tables onto the site.

### The problem Gartner puts on the cover

Organizations want SRE (reliability, resilience, customer experience) but cannot justify the cost of hiring SREs, training internal teams, and buying another tool stack. Traditional SRE and ops teams cannot keep up with the complexity and telemetry volume of modern systems.

### The trap Gartner warns against

Buyers who pick **operations-only** AI SRE get better at **reactively fixing incidents**. They do **not** get better at **system reliability**. Most vendors in this formative market are still aimed at the reactive production environment, not at prevention in **design and delivery**.

That sentence is the single most useful finding in the report for StackGen. It is Gartner, not StackGen, saying the incident-bot category is insufficient.

### Strategic planning assumptions (buyer-language facts, not site metrics unless licensed)

Gartner’s planning assumptions through 2029–2030, in substance:

- AI SRE tooling becomes default enterprise practice (from a very small 2025 base).
- AI-distilled SRE lessons move into **product design and delivery**, not only ops.
- A majority of new infrastructure designs get **pre-development validation** from AI using historical failure data.
- Most organizations will still see an **AI-caused outage** (erroneous recommendations) and continue anyway because of speed and scale. Governance, audit, and humans-in-the-loop are therefore not optional color. They are the condition of adoption.

### What “counts” as AI SRE tooling

Gartner’s market definition is broader than incident chat. Capabilities they treat as in-scope include: intelligent alerting and correlation; fast retrieval during incidents; RCA that ties incidents to **change**; SLO/SLI and error-budget management; predictive SLO-breach and capacity work; autonomous or semiautonomous detection and remediation; service-health reporting; and **embedding reliability into developer/engineering practice**.

**Mandatory** (Gartner’s bar, not optional polish):

1. Autonomous or semiautonomous action **with humans in the loop**.
2. **Hybrid** operational environments: on-prem, private cloud, public cloud, edge, colo.

**Roadmap they say buyers should watch (1–3 years):** proactive incident avoidance; protecting SLOs and composite SLOs; human–AI partnership rather than replacement; multicloud/hybrid integration; **knowledge graphs** for contextual awareness (reducing “click ops”); toil reduction; controlled failure injection; **multiagent** architectures spanning detect → diagnose → remediate → **govern**; agent reliability testing.

**How they tell Heads of I&O to buy:**

- Start with AI SRE as a way to **kickstart SRE** without a giant hiring bet.
- Augment existing SRE/ops so humans can do **proactive** reliability work.
- Build a strategy **beyond operations** using telemetry, correlation, and RCA to change design and delivery.
- Audit observability / automation / DevOps / ITSM tools you already own before buying a point tool.
- Keep humans in the loop so change, incident, and release impact on reliability metrics can be traced.
- Validate tool insights against **customer/product** sentiment, not only ops dashboards.

### Market shape (why the website cannot say “we are the AI SRE tool”)

The market is formative: stand-alone startups plus modules inside observability, DevOps, and ITSM platforms. Pricing is messy (tokens, tasks/investigations, data volume, compute). Gartner explicitly cautions that many representative vendors are startups and that investment should be cautious. That is an opening for **governance, hybrid delivery, and an operating system story**, not for looking like the 40th incident agent.

---

## 3. The category tension (do not skip this)

| | Gartner Market Guide | StackGen locked positioning |
|---|---|---|
| Audience | Heads of I&O | Champion = VP/Dir Platform or SRE; signer = CIO / VP Infra / VP Platform / CTO |
| Category shelf | AI SRE tooling | Agentic OS for DevOps |
| Vision | SRE practices at lower cost of adoption; reliability in design + delivery | Autonomous DevOps Factory (build → govern → observe → remediate) |
| Default vendor shape | Reactive ops agents, often stand-alone | Full loop under one OS; OCG as shared memory |
| Proof the buyer is told to demand | HITL, hybrid, SLO, RCA tied to change, audit, existing-tool fit | Diffs, policy results, incident timelines, bounded autonomy |

These are not the same shelf. They **rhyme**. Gartner’s gap (“ops-only will not improve reliability”; “move insights into design and delivery”; “knowledge graphs”; “multiagent + governance”) is the locked ADF / Agentic OS / OCG story told in I&O language.

If the website simply restyles as “AI SRE tooling,” you enter a crowded representative-vendor set you are not even in, and you abandon a locked category. If the website ignores the guide, a Gartner-briefed I&O evaluator cannot check their boxes and will file you under “not in the market.”

---

## 4. Three approaches (pick one)

### A. Follow the Gartner shelf

Reposition the public site as an AI SRE tooling vendor. Hero, nav, and product pages use Gartner’s capability nouns (RCA, SLO, runbooks, MTTR, HITL).

- **Wins:** High keyword and analyst-language match. Easy for an I&O evaluator to score.
- **Loses:** Competes inside a list of ~40 vendors. Throws away locked ADF / Agentic OS differentiation. Fights Harness, Datadog, PagerDuty, Resolve, Traversal on their home field.

### B. Teach Gartner’s gap; keep Agentic OS / ADF (recommended)

Keep L0–L2 locks. Use Gartner’s own warning as the **Challenger teaching point**: operations-only AI SRE makes you faster at firefighting; reliability improves when the same system governs **build, change, observe, and remediate**. Map Aiden products and OCG to the Market Guide capability list so an I&O buyer can still score you.

- **Wins:** Differentiates against the incident-bot pile using Gartner’s words, not ours. Aligns with locked positioning and the factory-launch narrative. OCG maps cleanly to the knowledge-graph roadmap item. Bounded autonomy maps to HITL + the AI-caused-outage assumption.
- **Loses:** Home H1 will not rank for “AI SRE tool.” I&O visitors need a visible translation layer (SRE product page, Platform, maybe a solutions path).

### C. Split IA

Home stays ADF / Agentic OS. A dedicated path (`/product/aiden-for-sre` plus an I&O or “reliability” solution page) speaks Market Guide language. Platform carries mandatory-feature proof (hybrid, audit, HITL, MCP).

- **Wins:** Protects launch narrative; gives the Gartner-briefed buyer a place to land.
- **Loses:** Two storylines to maintain. Risk of the SRE page sounding like every other AI SRE vendor if it is not tethered back to the OS.

**Locked (2026-08-21):** **B as the system, C as the IA tactic (B+C).** Do not change the locked category. Do add an I&O-readable proof layer so a Market Guide reader can complete Gartner’s evaluation homework on your site. Do not do A.

---

## 5. The framework to follow (industry stack, not a new invention)

Use four existing frameworks as layers. Do not invent a fifth brand name for this.

```text
Gartner Buying Jobs     →  what the page must help the buyer do
Market Guide criteria   →  what evidence they were told to collect
MEDDPICC                →  what the champion must steal from the site
Dunford + locked L0–L2  →  how we stay a category, not a feature list
Enterprise B2B template →  where it appears on the page
```

### Layer 1 — Gartner buying jobs (CQL / B2B buying journey)

Gartner’s research on B2B buying says customers complete six jobs, mostly without you in the room. A vendor website that only “explains the product” fails jobs 3–6.

| Buying job | What the I&O / Platform / SRE buyer is doing | What the StackGen site must communicate |
|---|---|---|
| **1. Problem identification** | “Is SRE adoption failing because of cost, toil, and ungoverned AI change — or do we just need another observability seat?” | Name the dual failure: (a) SRE is too expensive to staff at the rate complexity is growing; (b) agent/IDE speed without a governed loop creates the next incident. Cite DORA / CodeRabbit / New Relic per existing L1b rules. Do not lead with “AI SRE.” Lead with the job. |
| **2. Solution exploration** | “What category is this? AIOps? Observability copilot? Incident agent? Platform?” | Teach Gartner’s split: reactive ops tooling vs reliability in **design + delivery**. Place Aiden as the Agentic OS that runs the full loop. Category line stays Agentic OS for DevOps. Translation line for I&O: “the control plane that makes SRE practices executable without a giant hiring bet.” |
| **3. Requirements building** | Building a scorecard from the Market Guide tables | Publish a scannable requirements map (Section 6) in buyer language: HITL, hybrid, audit trail, change-aware RCA, SLO, policy-checked remediation, knowledge graph, multiagent, MCP. Each row must name the Aiden mechanism, not a slogan. |
| **4. Supplier selection** | Comparing you to AWS DevOps Agent, Harness, Datadog Bits AI, Resolve, Traversal, Firefly, Azure SRE Agent | Use locked contrast cuts. Add the Gartner-shaped cut: **not ops-only**. Full loop under one OS; OCG as shared memory; policy at every action; multi-cloud / customer-owned workflows. Never “we replace X.” |
| **5. Validation** | “Will this work in *our* hybrid estate? Can we see a diff, a refusal, an incident timeline?” | Product UI that shows investigation, change correlation, policy result, deploy/verify. greytHR as the only published customer quote until more are cleared. No modeled dollar ROI on the public site. Demo CTA remains Schedule demo. |
| **6. Consensus creation** | Champion must sell CIO / risk / finance / product | Equip the champion: one-paragraph operating-model story; HITL + audit for the AI-outage fear; hybrid/on-prem for regulated; “audit tools you already have” answered by integrations + OCG rather than rip-and-replace; build-vs-buy line from locked objections. |

### Layer 2 — Market Guide criteria as the proof spine

Gartner told buyers which features to look for. Translate them into **website claims that already have a mechanism**. If a row has no honest mechanism, do not put it on the site.

| Gartner criterion (paraphrase) | Buyer question | StackGen mechanism to show | Where it belongs |
|---|---|---|---|
| Humans in the loop; autonomous only inside bounds | “Will this act without us?” | Bounded autonomy; refuse at policy; recommend → approve → act-within-policy | Home (L2), SRE, Platform, FAQ |
| Hybrid: on-prem, private, public, edge, colo | “Are we locked to one cloud?” | SaaS default; on-prem/air-gap when required; multi-cloud production | Platform, Enterprise/trust, Infra |
| Change-aware RCA | “Can it tell us *what changed*?” | OCG: change attribution, drift history, incident causality | Observability, SRE, Platform OCG |
| SLO / SLI / error budgets | “Does this protect customer experience or just close tickets?” | SRE product: heal inside SLOs; do not claim composite-SLO product depth you do not have | SRE |
| Automated response + generated procedures | “Does it only chat, or does it act?” | Policy-checked remediation and verification; generated procedures only if real | SRE, Automation |
| Assessed deployment risk + rollback | “Can it gate and undo change?” | Automation (OCG check, gate, deploy) + Infra (plan/apply/rollback) | Automation, Infra |
| Audit trail of actions and reasoning | “When the agent is wrong, can we reconstruct why?” | Policy evaluation + action log (Tirith / OPA language internally; buyer language: audit trail) | Platform, Security/compliance |
| Knowledge graph / contextual awareness | “Do we still click through six tools?” | Operational Context Graph as shared memory | Platform hub (primary), Home teaser |
| Multiagent detect → diagnose → remediate → **govern** | “Is this one chatbot or an operating model?” | Four Aiden surfaces + Agentic OS; governance is a plane, not a plugin | Home loop, Platform |
| Agent integration (MCP, A2A) | “Does this fit how we already work?” | MCP server page; workflow embeddings (ticket, CI, chat) only if true | MCP, Integrations |
| Reliability in design and delivery, not only ops | “Will this change how we ship, or only how we page?” | Factory process (Intent → Spec → Runtime → Learning) + product loop | Home Factory, ADF narrative |
| Culture + existing-tool audit | “Do we rip out Datadog / Jira / Terraform?” | Integrations grid; “brings together what teams already trust”; no rip-and-replace | Home Integrations, Platform |

**Do not claim on the public site unless product can demo it:** predictive capacity planning as a lead feature; autonomous debugging of application code; automated chaos / failure injection; “agent reliability testing” as a product. Those are Gartner roadmap items, not current StackGen proof.

### Layer 3 — MEDDPICC (what a buyer steals from the website)

Enterprise evaluators (and StackGen’s own sales motion) still run a form of MEDDPICC. The site is the leave-behind.

| Letter | Site must make this easy |
|---|---|
| **M**etrics | Reliability and toil outcomes with a **mechanism line** (existing Metric Cell pattern). No uncleared $ ROI. Prefer: time-to-governed change, MTTR with investigation steps, policy refusals, SLO burn — only with evidence. |
| **E**conomic buyer | CIO / VP Infra readable block: operating model, risk of ungoverned agents, hybrid delivery, platform fee + usage (no public dollar price if that stays sales-led). |
| **D**ecision criteria | The requirements map in Layer 2. This is the Market Guide homework. |
| **D**ecision process | How evaluation works: see a diff, a policy result, an incident timeline. Schedule demo. |
| **P**aper process | SOC 2 / PCI / HIPAA badges as they exist; on-prem/air-gap; audit trail. |
| **I**dentify pain | Dual pain: SRE cost-to-adopt + AI-caused change risk. Emotional lock from product-marketing: fear of the next AI-caused incident on their watch. |
| **C**hampion | VP/Dir Platform or SRE can forward one page (Home or SRE) that already contains the consensus story. |
| **C**ompetition | Named cuts only where locked (Harness, AWS DevOps Agent, HashiCorp, Resolve, Traversal). Foil unnamed: agentic IDEs. Add unnamed foil: “ops-only AI SRE.” |

### Layer 4 — Dunford (keep the category)

April Dunford’s test: positioning is the answer to “what is this, who is it for, why us vs alternatives.” Gartner just defined a market called AI SRE tooling. If you answer “we are that,” you lose unique attributes.

Keep:

- **Competitive alternatives:** agentic IDEs; single-domain AIOps / incident agents; hyperscaler-only agents; DIY platform glue; IaC-only (HashiCorp motion).
- **Unique attributes:** full loop under one Agentic OS; OCG; policy at action time; bounded autonomy; hybrid.
- **Value:** autonomy at the pace of confidence; SRE practices without the hiring cliff; velocity and governance in the same path.
- **Who cares:** Platform and SRE leaders in complex multi-cloud / regulated production who own change risk.
- **Category:** Agentic OS for DevOps (ADF as vision, not SKU).

**I&O translation (one sentence, not a category change):** Aiden is how I&O gets SRE outcomes — reliability goals, change-aware operations, governed remediation — without buying another ops-only agent.

### Layer 5 — Page structure (copywriting enterprise B2B template)

Apply Gartner jobs onto the existing site IA. Do not add a seventh nav item unless you choose approach C’s dedicated I&O page.

| Site section | Buying job | Gartner-relevant communication |
|---|---|---|
| Home hero | 1–2 | Keep L1 ADF energy. Subhead must make I&O hear “reliability + governance across the SDLC,” not only “DevOps OS.” |
| Home problem | 1 | Creation velocity vs ops; plus Gartner-shaped line: tools that only close incidents do not raise reliability. |
| Factory process | 2, 6 | Intent → Spec → Runtime → Learning = reliability in design/delivery (Gartner’s 2029 assumption). |
| ADF loop (four products) | 2, 4 | Map to detect / diagnose / remediate / **govern**. Govern is the differentiator vs the vendor table. |
| OCG teaser | 3 | Knowledge-graph proof without saying “we match Gartner Table 2.” |
| Integrations + compliance | 5, Paper | Existing-tool audit + hybrid/trust. |
| In Their Words | 5 | greytHR only until more quotes are cleared. |
| `/product/aiden-for-sre` | 3–5 | Highest Gartner-density page. HITL, SLO, change-aware RCA, bounded remediation, verification. |
| `/product/aiden-for-observability` | 3 | Correlation + OCG; handoff into SRE. Not “another observability vendor.” |
| `/product/aiden-for-automation` | 3 | Deployment risk, gates, policy. This is Gartner’s “delivery” half. |
| `/product/aiden-for-infrastructure` | 3 | Design-time validation, plan/apply/rollback, hybrid. This is Gartner’s 2030 “validate designs before development” assumption, only if the product actually does it. |
| `/platform` | 3, 6 | OCG + Aiden OS + roadmap. Multiagent + governance live here. |
| `/mcp-server` | 3 | Agent integration requirement. |
| Cases / Schedule demo | 5–6 | Proof and CTA. Primary CTA stays Schedule demo. |

Headline formulas that fit this report (from the copywriting skill; pick for SRE/I&O surfaces, not to replace Home H1):

- Outcome without pain: “SRE outcomes without a hiring cliff” / “Governed remediation without untrusted agents.”
- Differentiation: “The Agentic OS that treats reliability as a delivery problem, not an incident chat.”
- Proof-focused: only with real mechanisms and cleared evidence.

---

## 6. Message house (what to say to a buyer)

Use this as the leave-behind structure. Every public sentence still has to pass the product-marketing word bans (no Olly, no em dash, no unverified quotes, no “single pane of glass,” no public slide-14 dollars).

### Roof (one idea)

**Reliability does not improve because AI closes tickets faster. It improves when the same governed system that builds and changes production also observes and remediates it.**

### Walls (three supporting messages)

1. **SRE adoption is a cost and toil problem, not a tool-count problem.** Aiden lets Platform and SRE teams practice reliability without staffing a giant SRE org. Kickstart is bounded autonomy inside policy, not a rip-and-replace.
2. **Ops-only agents make firefighting faster.** Gartner’s Market Guide warns that operations-only AI SRE does not improve system reliability. Aiden spans build → govern → observe → remediate on a shared Operational Context Graph, so RCA is change-aware and remediation is policy-checked.
3. **Autonomy is only useful at the pace of confidence.** Humans in the loop, audit of actions and reasoning, hybrid delivery, and refusal at policy bounds are how you adopt AI SRE without betting the brand on an erroneous recommendation.

### Foundation (reasons to believe)

- Mechanisms: OCG, Tirith/policy at action time, four named Aiden products, factory process, MCP.
- Trust: SOC 2 / PCI / HIPAA as currently approved; on-prem/air-gap offer; integrations with tools they already own.
- Proof: greytHR (published); other quotes remain PLACEHOLDER.
- Competitive contrast: full loop vs Harness-as-AI-on-pipelines / AWS-as-single-cloud-agent / Resolve-Traversal-as-SRE-domain-only / IDEs-as-speed-without-governance.

### Words the Gartner-briefed buyer uses (safe to mirror)

reliability, resilience, customer experience, SLI, SLO, error budget, toil, alert fatigue, RCA, change correlation, runbook, MTTR, humans in the loop, hybrid, audit, knowledge graph (for OCG), multiagent, design and delivery, Heads of I&O / Platform / SRE.

### Words not to steal from the Market Guide onto the site

- “Representative vendor,” “named by Gartner,” “Gartner-recognized,” logos, badges, or MQ-style quadrant art.
- Gartner’s 85% / 75% / 60% / 90% planning assumptions as if they were StackGen metrics. If you ever cite them, it must be a **licensed** Gartner citation with the standard disclaimer (see Section 8).
- Vendor names from the representative table that are not in the locked competitive set.
- “Olly.”

### Job stories (JTBD) for copy, not for tickets

1. When leadership asks why we cannot staff SRE like Google, I want a path that buys practice not headcount, so I can show reliability progress without a hiring freeze exception.
2. When an agent or pipeline change pages us at 2 a.m., I want RCA that starts from what changed, so we remediate the cause inside policy instead of restarting the box.
3. When security and the CIO fear an AI-caused outage, I want every agent action to be bounded, refused, and auditable, so we can scale autonomy at the pace of confidence.
4. When I&O already owns observability and ITSM, I want something that uses that context across infra, delivery, and SRE, so we do not buy a fifth standalone incident bot.

---

## 7. Priority communication (if you only change five things)

1. **Home problem + loop:** Add the ops-only trap (reliability ≠ faster incident close) and make **govern** visually equal to detect/diagnose/remediate.
2. **OCG:** Sell it as the knowledge graph / shared operational memory Gartner says buyers will need. Mechanism-first, no analyst name-drop required.
3. **Aiden for SRE page:** Become the Market Guide scorecard: HITL, SLO, change-aware RCA, policy-checked act, verification, audit.
4. **Trust/hybrid:** Make mandatory-feature proof (hybrid, HITL, audit) impossible to miss for a regulated I&O reader.
5. **Champion kit on-site:** Short FAQ / “How to evaluate” that mirrors Gartner’s own recommendations (audit existing tools, set reliability goals, humans in the loop, look beyond ops) answered with Aiden mechanisms.

Everything else is secondary until those five are true.

---

## 8. Legal and evidence gates

- Gartner research is opinion, not fact. Public citation requires a **licensed reprint or quote approval** and the standard Gartner disclaimer. Do not scrape-and-publish this reprint.
- Do not say StackGen is in the 2026 Market Guide.
- Do not put Gartner’s trademark, magic-quadrant-style graphics, or “as recognized by Gartner” on the site without vendor-relations sign-off.
- Existing content governance still applies: banned terms, quote provenance, no slide-14 modeled dollars on the public site.
- Firefly and CAST are already running “named in the guide” pages. Copying their structure is fine; copying their inclusion claim is not.

---

## 9. What this brief is not

- Not a request to reopen locked L0–L2 unless Gartner inquiry or sales feedback forces it (positioning spec already anticipated this).
- Not a homepage rewrite. Factory-launch Home changes remain a separate spec.
- Not a competitive battlecard pack (that would be `competitor-analysis` in battlecard mode against AWS DevOps Agent, Harness, Resolve, Traversal).
- Not implementation. Page-brief deltas for locked B+C: `docs/superpowers/specs/2026-08-21-gartner-bc-page-brief-deltas.md`. After that spec is reviewed, next is `writing-plans` (do not ship copy from this file).

---

## 10. Decision (locked)

**B+C** — Keep Agentic OS / ADF; teach Gartner’s ops-only gap; map capabilities; add a dedicated I&O / reliability path without a seventh nav item.

Picked 2026-08-21. Do not reopen unless sales or Gartner inquiry forces it.
