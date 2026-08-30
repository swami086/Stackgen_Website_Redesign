# Gartner B+C page-brief deltas

**Date:** 2026-08-21  
**Status:** Draft for review. Locked approach **B+C**. Not implementation.  
**Parent:** `docs/superpowers/specs/2026-08-21-gartner-ai-sre-website-messaging-framework.md`  
**Composes with:** factory-launch Home spec `docs/superpowers/specs/2026-08-21-factory-launch-homepage-changes-design.md` (Monday 24 Aug review) · site IA `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` · product-marketing L0–L2  
**Next after approval:** `writing-plans` for copy/IA only. Do not ship from this file.

B = keep Agentic OS / ADF; teach the ops-only gap; map capabilities.  
C = dedicated I&O / reliability path, **without a seventh primary nav item**.

---

## 1. Non-negotiables

- Category stays **Agentic OS for DevOps**. ADF stays vision, not a SKU. Home H1 is not “AI SRE tooling.”
- Never claim StackGen is in the 2026 Gartner Market Guide. No Gartner badge, logo, or “named/recognized” line.
- Do not paste Gartner planning-assumption percentages as StackGen metrics. Licensed citation + disclaimer only, and not on Home.
- Factory-launch **D6** still holds: do not invent Agentic OS / governance / trust-and-safety copy on Home while Product PRFAQ/PRD is missing. Gartner language on Home must be **problem + outcome**, not a new OS paragraph.
- Factory-launch **D9** still holds: do not re-expand Problem / Factory Process / ADF Loop as three competing fold diagrams. Gartner ingredients go into the Monday spine, not a fourth diagram.
- Word bans unchanged: Olly, em dash, single pane of glass, Git/estate, replace-competitor, slide-14 dollars, unverified quotes.
- Primary CTA remains **Schedule demo** on product/platform/solutions. Home hero CTA follows the factory-launch Monday decision (replica currently “Get started”).

---

## 2. Conflict resolution with factory-launch Home

| Factory-launch lock | Gartner B+C need | Resolution |
|---|---|---|
| Explain ADF first; hero diagram is the story | I&O must hear reliability, not only “DevOps OS” | Hero stays ADF. I&O translation lives in the **one platform / four pillar outcomes** band and on the SRE + I&O pages, not as a second H1. |
| Collapse Problem / Factory / Loop until the top works | Ops-only trap + govern equal to remediate | Trap = one line in the pillar band (or collapsed problem **below** the fold). Govern = a pillar outcome and a loop stage in the hero diagram, not a new section. |
| OCG optional / “one graph” in plain language | Knowledge-graph proof | Home: at most one sentence (“shared operational context”). Full OCG sell = Platform. |
| Hold invented OS copy | HITL, audit, hybrid | Those three are **product facts already locked** (bounded autonomy, on-prem/air-gap, policy). They may appear as proof chips. Do not write a new “trust and safety” essay on Home. |
| Platform rewrite blocked on PRFAQ | Platform is the OS proof surface | Additive **proof strip only** on Platform (hybrid, HITL, audit, MCP, integrations). No new OS thesis until Product docs. |
| Use cases / hard intents high | Gartner “look beyond ops” | Pair at least one **design/delivery** intent (migrate, policy-checked change) with one **ops** intent (restore service, explain anomaly). Do not make the intent row incident-only. |

Monday mock still leads. These deltas are ingredients for that mock and for pages the mock does not own.

---

## 3. IA for C (I&O path)

Do **not** add I&O to primary nav (Product / Platform / Case Studies / Company).

| Route | Role | Status |
|---|---|---|
| `/product/aiden-for-sre` | Highest Gartner-density **product** page. Champion + practitioner. | Exists. Rewrite brief in §5. |
| `/solutions/sre-reliability` | Dedicated **I&O evaluator** page (approach C). Speaks Market Guide scorecard language. Links into SRE + Platform + Automation + Infra. | New (promote Wave B canvas stub `Bp1dp` / Solutions hub `uPzvZ`). |
| `/solutions` | Hub: three motions already stubbed (Governed Infra, ADF, SRE Reliability). | Exists as stub/canvas; code route may still be missing on `main`. Ship hub only as thin cards if the child ships. |
| `/platform` | Mandatory-feature proof: hybrid, HITL, audit, OCG, MCP. | Additive strip. No OS rewrite. |
| `/mcp-server` | Agent-integration checkbox. | Existing P2; add one sentence from the I&O page. |

**How an I&O visitor finds C**

1. Product menu → Aiden for SRE → “For I&O leaders” link to `/solutions/sre-reliability`
2. Solutions hub card (when Solutions is live)
3. Footer Product or Solutions column
4. Optional: Home pillar “Reliability” / SRE outcome links to the solutions page, not only the product SKU

Home does not become an I&O landing page.

---

## 4. Home deltas (B, subordinate to Monday spine)

Reader order stays the factory-launch Monday mock. Only the marked bands change.

### 4.1 Hero

- **No category change.** H1 remains one of the Monday candidates (ADF, or Build · Operate · Observe · Remediate).
- If the diagram shows loop stages, **Govern / policy** must be a visible stage, equal weight to remediate. Do not draw detect → diagnose → remediate with governance as a footnote.
- Do not add “AI SRE tooling” or Gartner to the hero.

### 4.2 One platform / four pillar outcomes (the I&O translation band)

**Job:** Solution exploration for a Gartner-briefed skimmer without renaming the company.

Four pillars stay the four Aiden surfaces. Outcome lines (intent, not final copy):

| Pillar | Outcome the I&O reader should take | Do not say |
|---|---|---|
| Infrastructure | Designs and changes land under policy, including hybrid | Capacity-planning product we cannot demo |
| Automation | Releases are gated with operational context, not hope | We replace Harness |
| Observability | Signals correlate to **what changed** | We are an observability vendor; Olly |
| SRE | Remediation is bounded, verified, and auditable | We replace Resolve / Traversal; we are an incident chatbot |

Add **one** teaching sentence above or beside the pillars (problem identification):

> Closing tickets faster is not the same as making the system more reliable. Aiden runs reliability through build, change, observe, and remediate, with people still on the loop.

That is the ops-only trap in StackGen voice. No analyst attribution on Home.

### 4.3 Hard intents

When Dharani’s Excel lands, keep the mix the Market Guide cares about:

- At least two **delivery/design** intents (e.g. migrate, policy-checked change).
- At least two **operations** intents (e.g. restore service, explain anomaly).
- Pair each with an outcome. Wireframe labels until Excel is in.

### 4.4 Deferred / collapsed stack

If Problem / Factory / Loop survive below the fold:

- Problem may add the same ops-only line; do not duplicate the pillar sentence.
- Factory process (Intent → Spec → Runtime → Learning) is the “reliability in design and delivery” proof. Keep it distinct from the product loop.
- Loop: name **govern** in the four stages. Kill 10× → 4× per factory-launch §8.

### 4.5 OCG on Home

At most a teaser: shared operational context across domains (topology, change, drift, incident, correlations). Link to Platform. Full graph is not a Home fold requirement for Monday.

### 4.6 Trust chips (Home, low)

Reuse compliance badges. Add three short chips only if they are already true and do not need new OS copy:

- Humans in the loop (bounded autonomy)
- Hybrid delivery (SaaS, on-prem / air-gap when required)
- Action audit (policy at the boundary)

No Gartner chip.

---

## 5. `/product/aiden-for-sre` (B, highest density)

Keep H1 **Aiden for SRE**. This page is the Market Guide **scorecard**, still a product surface inside the OS, not a category rebrand.

| Section | Job | Must communicate | Visual |
|---|---|---|---|
| Hero | Remediate inside the same OS that builds and observes | Detect → diagnose → remediate **within policy**; contrast is SRE-domain-only tools (unnamed on this page, named only in locked cuts) | Incident timeline, not a chat toy |
| Problem | Why ops-only AI fails the buyer | Faster RCA without governed change does not raise reliability. Toil and hiring cost make SRE adoption stall. | Optional before/after: firefighting vs bounded act |
| Mechanism | Change-aware RCA | Alert → **what changed** (OCG) → cause → recommended act → policy allow/refuse → deploy → verify | Existing six-step ladder: Infrawatch → ChangeCorrelation → RootCause → Remediation → Deploy → Verification |
| HITL | Mandatory Gartner feature | Recommend → approve → act-within-policy. Refusal is a feature. | Refusal boundary callout |
| SLO | Customer experience, not ticket close | Heal inside SLOs / error budget. Do not claim composite-SLO product depth we cannot demo. | Metric cells with mechanism lines only |
| Proof | Validation | greytHR metrics/quote if this page can honestly share them; else link Observability case. PLACEHOLDER labeled. | Quote rules unchanged |
| Loop cross-links | Supplier selection | “Part of the Agentic OS” → Infra, Automation, Observability, Platform | Four surface links |
| I&O exit | Approach C | Link: “Evaluating AI SRE tooling?” → `/solutions/sre-reliability` | Text link, not a banner badge |
| FAQ | Consensus kit | See §8. Short version here (4 questions). | Accordion |
| Final CTA | Schedule demo | No second CTA | Compact final CTA |

**Avoid:** claiming Gartner inclusion; leading with MTTR as the only outcome; “autonomous SRE” without the refusal line; Olly.

**Lead proof (existing brief, keep if mechanisms hold):** 50% MTTR · 66% faster RCA · 90% less alert noise. Each cell still needs a mechanism line. 10× elsewhere on this product family stays out of scope except the factory-launch 10×→4× lock on Infra/OS cards.

---

## 6. `/solutions/sre-reliability` (C, I&O evaluator page)

**Reader:** Head of I&O / VP Infra who was handed the Market Guide. They will not hunt through four product pages.

**One job:** Let them complete an evaluation scorecard and forward the page to a Platform/SRE champion.

**This page may use Gartner-shaped nouns** (HITL, hybrid, SLO, RCA, audit, knowledge graph as a description of OCG). It still must not claim inclusion.

### Suggested spine (enterprise B2B template)

1. **Hero** — Outcome: SRE practices without a hiring cliff; reliability across design and delivery, not another incident agent. CTA: Schedule demo. Secondary: See Aiden for SRE.
2. **Who it is for** — Heads of I&O, VP Platform, Head of SRE. Anti-persona: IDE-only buyers.
3. **The trap** — Ops-only agents optimize firefighting. Reliability moves when change, observe, and remediate share context and policy.
4. **Scorecard** — Table, one row per evaluable criterion (from parent spec Layer 2). Column A: what to require. Column B: Aiden mechanism. Column C: where to see it (deep link).
5. **How it fits what you already own** — Integrations + “audit existing observability / ITSM / DevOps tools first.” Not rip-and-replace.
6. **Mandatory bars** — HITL, hybrid, audit trail. Three blocks, no essay.
7. **Beyond operations** — Three links: Infra (design/change), Automation (delivery risk), Observability (change-aware signal). This is Gartner’s “look past ops” recommendation answered with IA.
8. **Proof** — greytHR only until more quotes clear.
9. **How to evaluate** — Full FAQ from §8.
10. **Final CTA** — Schedule demo.

**Do not:** put this URL in primary nav; title it “AI SRE Tooling by StackGen” as the H1 (subtitle/translation is OK); list the 40 representative vendors.

---

## 7. Platform, MCP, other product pages (additive only)

### `/platform`

Add a **proof strip** below the existing two-planes / OCG story (whenever that story is allowed to show):

| Chip | Mechanism | Do not invent |
|---|---|---|
| Hybrid | SaaS default; on-prem / air-gap when required | Edge/colo claims unless product confirms |
| Humans in the loop | Bounded autonomy; refuse at policy | Operator-autonomy dashboard |
| Audit | Policy evaluation + action/reasoning trail | “Explainable AI” essay |
| Shared context | OCG as knowledge graph (topology, change, drift, incident, correlations) | New OS module names pre-PRFAQ |
| Agent interfaces | MCP + integrations | CLI/Slack as the platform |

OCG remains the Platform centerpiece. Sell it as shared memory that stops click-ops, not as four product logos.

Hold new Agentic OS body copy until PRFAQ/PRD (factory-launch D6). The strip above is facts, not a thesis.

### `/mcp-server`

One line: I&O / platform teams embed Aiden in existing agent and IDE workflows under the same policy boundary. CTA still Schedule demo. Anti-persona: do not position MCP as an ungoverned coding agent.

### `/product/aiden-for-observability`

Keep greytHR. Add one sentence: correlation includes **change**, then hands off to SRE. Link OCG / SRE.

### `/product/aiden-for-automation`

One sentence: deployment risk and gates (Gartner “delivery”). Link I&O page “beyond operations.”

### `/product/aiden-for-infrastructure`

One sentence: policy-checked change and rollback; hybrid. Do not lead with Gartner’s 2030 “AI validates designs before development” unless the product demo matches. 10× → 4× per factory-launch.

---

## 8. Champion FAQ (consensus job)

Use on `/solutions/sre-reliability` (full) and `/product/aiden-for-sre` (short). Answers must name a mechanism.

1. **Should we buy another AI incident tool if we already have observability / ITSM?** Audit what you have. Aiden is the control plane that uses that context across change and remediation, not a fifth console.
2. **Will it act in production without us?** Bounded autonomy. It can recommend, act inside policy, or refuse. Humans stay in the loop.
3. **Does this work outside a single public cloud?** Hybrid is a requirement. SaaS default; on-prem / air-gap when required.
4. **How do we know the agent was wrong?** Audit trail of actions and policy decisions. RCA starts from what changed.
5. **How do we start without a 20-person SRE org?** Kickstart with bounded plays (detect → diagnose → policy-checked remediate) while Platform owns the OS. Reliability goals first, not tool count.
6. **How is this different from Harness or a hyperscaler agent?** Full loop under one OS, multi-cloud / customer-owned workflows, governance in path. Not AI bolted onto pipelines. Not a single-cloud agent. (Locked cuts. No “we replace.”)

---

## 9. Scorecard rows allowed on the I&O page

Only rows with a demoable mechanism. Mark others as **do not claim**.

| Require (buyer language) | Aiden mechanism | Claim? |
|---|---|---|
| Humans in the loop | Bounded autonomy / refusal | Yes |
| Hybrid environments | SaaS + on-prem/air-gap offer | Yes, if sales still offers it |
| Change-aware RCA | OCG change attribution + incident causality | Yes |
| Policy-checked remediation + verify | SRE ladder + Automation gates | Yes |
| SLO-aligned healing | SRE “heal inside SLOs” | Yes, no composite-SLO depth |
| Shared context / knowledge graph | OCG | Yes, as OCG, not a Gartner feature name |
| Multiagent + govern | Four surfaces + policy plane | Yes, as OS, not “multiagent platform” hype |
| MCP / workflow embed | MCP server + integrations | Yes |
| Audit of actions | Policy evaluation at boundary | Yes if the product shows a trail |
| Predictive capacity planning | — | No |
| Autonomous app debugging | — | No |
| Chaos / failure injection | — | No |
| Agent reliability testing product | — | No |

---

## 10. Priority order (when this goes to a plan)

1. `/product/aiden-for-sre` scorecard + FAQ + link to I&O page (even if I&O URL is a Coming Soon with the FAQ).
2. `/solutions/sre-reliability` (C). Can ship behind Coming Soon until the hub exists.
3. Home pillar sentence + govern-visible hero (after or with Monday factory-launch mock, not instead of it).
4. Platform proof strip + OCG wording.
5. Cross-links from Observability / Automation / Infra / MCP.
6. Solutions hub cards if `/solutions` is still a stub.

Do not block Monday Home review on the I&O page. Do not block the I&O page on Monday Home copy.

---

## 11. Acceptance

- Home still reads as ADF / Agentic OS. A Gartner-briefed I&O visitor can finish a scorecard on `/solutions/sre-reliability` and `/product/aiden-for-sre`.
- Zero Gartner inclusion claims. Zero Olly. Zero uncleared dollars.
- HITL, hybrid, audit are visible without a new OS essay.
- Factory-launch D1–D10 remain intact.
- Primary nav unchanged.

---

## 12. Review gate

Please review this file and the locked parent framework. If it looks right, next step is `writing-plans` for the page deltas (SRE + I&O path first). If you want Home ingredients in the Monday mock, say so; they are a small add to the factory-launch hero/pillar work, not a second Home project.
