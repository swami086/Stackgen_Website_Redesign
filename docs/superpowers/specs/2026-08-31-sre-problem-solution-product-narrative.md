# Problem → Solution → Product narrative options (SRE-first)

**Status:** decisions locked — §11b + Semrush §12 brief ready for approval (not in code yet)  
**Date:** 2026-08-31  
**Persona:** SRE / platform engineer (primary); exec buyer (secondary)  
**Sources:** [sourcegraph.com](https://sourcegraph.com/) (Firecrawl scrape 2026-08-31 → `.firecrawl/sourcegraph-homepage.md`), Mobbin competitor sections/flows, `AIOS - Product Features.md`, `StackGen-ADF-PRFAQ-Draft.md`, Torbit-indexed replica UX (`web/content/replica.ts` + `web/components/replica/sections/*`)  
**Skills used:** using-superpowers → brainstorming · firecrawl-cli · Mobbin · copywriting · competitor-analysis · positioning-ideas · job-stories · find-skills; Opus synthesis for options  

### Locked decisions

| Decision | Choice | Implication |
|----------|--------|-------------|
| Primary homepage CTA | **Aiden for SRE** (`/product/aiden-for-sre`) | Hero primary button + final CTA default to SRE product page; “Schedule demo” can remain secondary/nav |
| ADF in hero | **Demote below the fold** | Hero H1 = SRE control job; “Autonomous DevOps Factory” lives in Assemblies / How it works (mechanism section), not first viewport |
| Narrative spine | **Hybrid A + C** | Option A Control Plane (See / Decide / Change) + Option C’s 4–5 SRE symptoms compressed into the Problem section |
| Solution demo | **Real product asset available** | Before/after uses real recording/screens (not storyboard-only); Solution section ships with asymmetric demo like Sourcegraph |
| Product deep-links | **On-page anchors for now** | Pillars / Who-it’s-for link to homepage sections; product routes (`/product/aiden-for-*`) deferred except primary CTA → Aiden for SRE |
| Proof | **Logos only** | Customer logo strip; no public MTTR / CFR / toil metrics until cleared |

**Hero direction (locked):** Brand signal stays (logo/nav); H1 is a control/job promise for SREs (e.g. incidents that know what changed / verifiable ops change), not the ADF category name.

**Target scroll spine (locked):**
1. Hero — SRE control job + primary CTA → Aiden for SRE (+ secondary Schedule demo optional)
2. Logos
3. **Problem** — architecture crisis + short SRE symptom list (C grit inside A frame)
4. **Solution** — one claim + before/after if available
5. **See / Decide / Change** pillars (products nested)
6. **Assemblies / ADF / How it works** — factory mechanism (ADF name lives here)
7. Shell / OCG
8. Who it’s for / trust / final CTA → Aiden for SRE


---

## 1. Understanding (confirm / correct)

We are redesigning **homepage narrative order**, not shipping UI yet: adopt Sourcegraph’s **Problem → Solution → Product** spine, map StackGen’s multiple Aiden products to the right SRE pains, and keep Soft Structuralism / replica section shells as the implementation surface later.

**External product names (binding per PRODUCT.md):**
- Parent category: Autonomous DevOps Factory (ADF)
- **Aiden for Infrastructure** · **Aiden for Automation** · **Aiden for SRE** · **Aiden for Observability**
- Substrate: **Aiden OS** + **Operational Context Graph**
- Differentiator: *changes* infrastructure safely (intent → policy-checked Terraform in customer Git), not only observe/advise

**Naming drift to resolve:** PRFAQ v1.5 still says “Aiden for DevOps” / “Aiden for InfraOps”. Homepage copy must follow PRODUCT.md; treat PRFAQ names as internal/legacy until updated.

---

## 2. Sourcegraph teardown ([sourcegraph.com](https://sourcegraph.com/))

**Evidence:** Firecrawl CLI scrape 2026-08-31 — `.firecrawl/sourcegraph-homepage.md` (scrape id `01a058bd-2c04-747c-9e33-e11e1e494ddb`). Replaces earlier TinyFish / noisy web-search notes. No Datadog/PagerDuty pages used.

### Verbatim spine (from scrape)

| Order | Label / copy |
|-------|----------------|
| Hero H1 | Take control of your codebase |
| Hero sub | Give humans and agents complete context to understand, oversee, and evolve the world's largest, most complex codebases. |
| Trust | Trusted by 200+ enterprise engineering teams (logo strip: Reddit, MathWorks, Leidos, Indeed, Canva, 1Password, Dropbox, HubSpot, Stripe, Blackstone, Midjourney, Guild Education, …) |
| Problem eyebrow | The problem |
| Problem H2 | A tidal wave of code is coming. Code is growing faster than teams can understand or control it. |
| Problem body (gist) | Agents see only fragments of the enterprise codebase, rebuilding context for each task… **This is where engineering teams lose control.** |
| Solution eyebrow | The solution |
| Solution H2 | Take back control with complete codebase context |
| Solution claim | Indexes all repositories → agents with full context. **Execute the same task with dramatically different results.** |
| Demo A | Coding Agent alone — adds Role field; lists “What the agent missed” (auth middleware, DTO, audit, admin routes, invite flow, 4 integration tests) |
| Demo B | Coding Agent + Sourcegraph MCP — `sg_keyword_search` across 2,847 repos → 8-step plan, 12 files / 7 layers → **Nothing missed** |
| Social proof | Stripe + Sourcegraph MCP quote (Alistair Gray) |
| Product verbs | **Understand. Oversee. Evolve.** — products nest under verbs (Deep Search, MCP, Code Search / Insights, Monitoring / Batch Changes) |
| Close | Take control… Get a demo → |

### Steal / don’t steal

| Beat | Steal / don’t steal |
|------|---------------------|
| Hero | Steal: control promise for SREs (job verb). Don’t steal: “codebase” category. |
| Trust | Steal: logos early (matches our logos-only proof lock). |
| Problem | Steal: labeled section + architecture crisis. Don’t invent fake “tidal wave” metrics. |
| Solution | Steal: one claim + asymmetric before/after. Don’t steal code-search/MCP category. |
| Product | Steal: verb pillars before product names → our **See / Decide / Change**. |
| Close | Steal: repeat control promise + demo CTA. |

**Core lesson:** Problem names the *failure mode of agents without context*; Solution is *complete context*; Products are *how control is exercised*—never the first thing on the page.

---

## 3. Competitor pattern taxonomy (Mobbin + web)

| Variant | Examples | Shape | When it fits StackGen |
|---------|----------|--------|------------------------|
| **Crisis → claim → verb pillars** | Sourcegraph, [15Five](https://mobbin.com/sites/sections/7f8189e6-30a4-44f1-aa4f-06d8bf89626a) | Problem as category shift; 3 verb pillars; products nested | **Best default** — products overlap; substrate is the moat |
| **Problem → solution → product columns** | [Ploy](https://mobbin.com/sites/sections/548e4f30-f9ec-46fc-99c5-b5d6d0a51bda), [Podia](https://mobbin.com/sites/sections/04d253a7-50cd-4af4-af74-90f01a879203) | Symmetric columns per product | Strong for sales routing; risks catalog feel |
| **Symptom inventory → impact → platform** | [Content Architecture](https://mobbin.com/sites/sections/2f1ad501-41f7-43a6-a8ce-293a93ec6cad) | “COMMON PROBLEMS” list in operator voice | Highest SRE credibility; weaker exec skim |
| **Problem → deepen → mission → first product → vision** | [Duna](https://mobbin.com/sites/sections/cff185ce-b679-44ce-b533-0ac4cb901a18) | Single wedge product | Only if one product is clearly GA wedge |
| **Multi-product fork** | [Sana AI](https://mobbin.com/flows/c5be53b6-3d7c-4130-ad49-14be740aeede) | Two+ product cards with separate CTAs | Warm traffic / product pages; weak cold homepage |

---

## 4. Current UX spine (Torbit + `replica.ts`)

Replica order today (approx.): **Nav → Hero → Logos → Video → Assemblies (diagrams) → Shell (OCG) → WhoItsFor → Footer**.

| Section | Current message | Gap vs Sourcegraph pattern |
|---------|-----------------|----------------------------|
| Hero | “The Autonomous DevOps Factory” | Leads with **category/product**, not SRE control job |
| Assemblies | “The DevOps Factory” + diagrams | Mechanism before named problem |
| Shell | OCG / supply-chain trace | Strong solution asset, under-sold as *the* join |
| WhoItsFor | Four Aiden apps + jobs | Products appear as personas without a prior Problem beat |

**Implication:** You already have Solution/Product UI (diagrams, OCG, WhoItsFor). What’s missing is an explicit **Problem** beat and a **Solution claim + proof demo** *before* products.

---

## 5. SRE job stories → products

1. **When** an alert fires at 02:00 and the runbook is stale, **I want** a reviewable fix with blast radius attached, **so** I stop hand-editing prod. → **Aiden for SRE** + OCG + **Aiden for Infrastructure** (change lands as Terraform in our Git).
2. **When** I inherit estate I didn’t build and drift is unknown, **I want** live infra reconciled to code, **so** I know what I’m on call for. → **Aiden for Infrastructure** + OCG.
3. **When** the same toil ticket lands again, **I want** a policy-gated automation I can review, **so** it stops paging a human. → **Aiden for Automation** + **Aiden for Observability** (signal) + Aiden OS (guardrails).

**PRFAQ voice (keep for Problem copy):** siloed excellent tools; failure in the *gap*; “not a tool problem — an architecture problem”; 90-minute war room; deploy without infra context.

---

## 6. Three homepage narrative options

### Option A — “Control Plane” (recommended)

**Spine:** Hero control promise → Logos → **PROBLEM** (unverifiable change / siloed domains) → **SOLUTION** (one sentence + before/after) → Proof → **See / Decide / Change** pillars → Substrate (Aiden OS + OCG) → Trust + CTA.

| Pillar | Job | Products |
|--------|-----|----------|
| **See** | Alerts arrive with deploys + drift attached | Aiden for Observability |
| **Decide** | Investigation that already knows what changed | Aiden for SRE |
| **Change** | Policy-checked action in *your* Git | Aiden for Infrastructure + Aiden for Automation |

**Tradeoffs:** Strongest single argument; differentiator sits in **Change**. Needs an honest before/after asset (generic agent “YAML dump” vs StackGen policy-checked PR). Individual products get less real estate.

**Draft beats (copy sketch):**
- Hero: *Infrastructure change you can verify — before it pages you.*
- Problem H2: *Your tools are excellent. They don’t share a memory.*
- Solution H2: *One context graph. Governed agents that can change what they understand.*
- Demo caption: *Same incident. Without shared ops context vs with Operational Context Graph + approval gate.*

---

### Option B — “Four Products, One Substrate”

**Spine:** Hero → Logos → Short problem → **Four product columns** (Sana-style) with per-product CTAs → Substrate strip → Proof → CTA.

**Tradeoffs:** Best multi-persona routing and sales enablement. Weakest for cold SRE — reads as catalog; “changes infrastructure safely” dilutes across tiles.

Use when: product pages are ready and homepage’s job is **routing**, not conversion narrative.

---

### Option C — “Common Problems” (symptom inventory)

**Spine:** Terminal-styled COMMON PROBLEMS list → Impact headline (MTTR / change failure / on-call attrition) → Solution one-liner + demo → Problem→product mapping table → Substrate → CTA.

Example symptoms (from PRFAQ):
1. 200 runbooks, ~30 current  
2. 14-step deploy babysitting  
3. P1 first 90 minutes = war room, not RCA  
4. Deploy lands on drift nobody checked  
5. AI SRE with no infra / deploy memory  

**Tradeoffs:** Most SRE-native; highest credibility. Lowest exec skim; page opens on negativity.

---

### Hybrid (recommended packaging)

**Ship Option A**, but compress Option C’s symptoms into 4–5 one-liners inside the Problem section (not a full terminal page). Keep WhoItsFor / Assemblies as *proof of pillars*, not the first product dump.

---

## 7. Product → problem mapping (smart intro)

| SRE problem (one line) | Solution claim | Product to introduce | Do not lead with |
|------------------------|----------------|----------------------|------------------|
| Alert without what changed | Context that includes deploy + drift | Aiden for SRE | Chatbots / “AI SRE” category alone |
| Live estate ≠ code | Intent → governed AppStacks / Terraform in Git | Aiden for Infrastructure | Generic “IaC generation” |
| Ticket toil repeats | Ticket → reviewed action under policy | Aiden for Automation | Unrestricted agents |
| Alert noise / cost of signals | Signals correlated to graph + actions | Aiden for Observability | Standalone APM replacement claim |
| Agents without shared memory | OCG + Aiden OS (grounded · governed · useful) | Substrate *after* pillars | AIOS internal name |

---

## 8. Against Sourcegraph (positioning)

| Sourcegraph | StackGen |
|-------------|---------|
| Control **code** understanding for agents | Control **ops change** for agents |
| Blind spot = incomplete repo context | Blind spot = siloed deploy / infra / observe / SRE |
| Demo = missed files vs full graph search | Demo = suggest-only agent vs policy-checked change in customer Git |
| Verbs: Understand / Oversee / Evolve | Verbs: **See / Decide / Change** (Change is where competitors stop) |

---

## 9. Open questions

1. ~~**Demo asset:**~~ **Locked:** Real product recording/screens available for before/after Solution demo.
2. ~~**ADF on homepage:**~~ **Locked:** Demote ADF below the fold (Assemblies / How it works); hero speaks SRE control job.
3. ~~**Wedge CTA:**~~ **Locked:** Primary CTA → **Aiden for SRE**.
4. ~~**Proof:**~~ **Locked:** Logos only — no public quantified metrics until cleared.
5. ~~**Product pages:**~~ **Locked:** On-page anchors for now; only primary CTA leaves the homepage (→ Aiden for SRE).
6. ~~**Narrative option:**~~ **Locked:** Hybrid A + C (Control Plane + symptom grit in Problem).

**Still needed for implementation (not blocking copy draft):**
- Path or link to the real before/after demo asset (so Solution captions match the incident).
- Confirm secondary hero CTA: Schedule demo vs “How it works” scroll to Assemblies.

**CTA copy note:** Prefer job-led labels (“See Aiden for SRE”) over “Learn more”; keep nav “Schedule demo”.

**Note vs `.agents/product-marketing.md`:** That doc still says hero H1 = Autonomous DevOps Factory. This homepage pass **overrides** that for the replica home; update product-marketing.md when copy is approved.

---

## 10. Suggested next steps

1. ~~Confirm Option A / B / C (or hybrid).~~ **Done — hybrid A+C.**  
2. ~~Lock §9 decisions.~~ **Done.**  
3. Review §11 section copy below → approve or revise lines.  
4. `writing-plans` for replica section reorder + `replica.ts` content swap.  
5. Align PRFAQ + product-marketing hero pattern to PRODUCT.md / this lock.  
6. Wire demo asset into Solution UI when path is shared.

---

## 11. Section copy draft (hybrid A + C) — for review

Copy-only. Not yet in `replica.ts`. Primary action: visit **Aiden for SRE**. Avoid banned/vague words: optimize, streamline, innovative; no fabricated metrics; no "Aiden for DevOps/InfraOps/Olly".

### 11a. Copy review (2026-08-31)

**Verdict:** Spine and voice fit SRE hybrid A+C. Apply the line edits in §11b before shipping. Do **not** use "The Autonomous DevOps Factory" as Assemblies H2 alone — PRODUCT.md records Gartner risk that Factory as a product-level descriptor makes SRE/I&O say "that's not me".

| Severity | Issue | Fix |
|----------|--------|-----|
| High | Hero H1 anthropomorphizes "incidents" — clever but soft vs control-plane promise | Prefer job-led H1 (Option A) |
| High | Assemblies H2 = ADF name alone hits Gartner "not me" + demotion lock | ADF as eyebrow; H2 = process outcome |
| Med | Logos "production-grade AI Ops" is vague category speak | "Trusted by teams who run production" |
| Med | Who-it's-for "own the page" confuses pager vs webpage | "own the pager" |
| Med | Decide pillar echoes hero | Differentiate Decide |
| Med | Demo label "Without StackGen" names company in weak state | "Without shared context" |
| Low | "hypothesis" in old sub is academic | Use "timeline" / "investigate before you escalate" |
| OK | Problem H2 + symptoms | Strongest block — keep |
| OK | Solution H2 | Clear one-claim pattern — keep |
| OK | Footer mirrors hero | Fine for close |

**Hero options (pick one):**

| Option | H1 | Sub |
|--------|----|-----|
| **A (recommended in §11b)** | On-call that starts with what changed | Aiden for SRE joins deploys, drift, and alerts in one timeline — so you investigate before you escalate. |
| B | Incidents that already know what changed | Same sub as A (punchier brand line) |
| C | Keep agent-driven change inside policy | Remediations land as reviewable changes under guardrails — not chat suggestions. |

---

### 11b. Revised draft (apply these lines)

### Nav
- Links: unchanged (Products, Platform, Case Studies, Company, Docs)
- CTA: **Schedule demo**

### Hero
| Field | Draft |
|-------|--------|
| H1 | On-call that starts with what changed |
| Sub | Aiden for SRE joins deploys, drift, and alerts in one timeline — so you investigate before you escalate. |
| Primary CTA | See Aiden for SRE → `/product/aiden-for-sre` |
| Secondary CTA | How it works → `#assemblies` |

### Logos
| Field | Draft |
|-------|--------|
| Eyebrow | Trusted by teams who run production |
| Items | Current customer logos (unchanged) |
| Metrics | None |

### Problem (`#problem`)
| Field | Draft |
|-------|--------|
| Eyebrow | The problem |
| H2 | Your tools are excellent. They don't share a memory. |
| Body | Observability, deploy, and infrastructure each hold part of the truth. Agents and humans rebuild that picture every page. The failure is in the gap — not in any single product. |
| Symptoms | • Alert fires with no deploy or drift attached · • AI that suggests a fix but can't open a policy-checked change · • P1's first 90 minutes is a war room, not RCA · • Deploy lands on drift nobody checked · • 200 runbooks; maybe 30 are current |

### Solution (`#solution`)
| Field | Draft |
|-------|--------|
| Eyebrow | The solution |
| H2 | One context graph. Agents that can change what they understand. |
| Body | The Operational Context Graph is shared memory across infra, deploy, and signals. Aiden acts under policy-checked guardrails — with approval when it matters — so remediation is reviewable, not a chat suggestion. |
| Demo caption | Same incident. Without shared ops context vs with OCG and an approval gate. *(Swap in asset scenario title when path is known.)* |
| Demo labels | Without shared context · With Aiden for SRE |

### See / Decide / Change (`#pillars`)
| Pillar | Title | Body | Product (anchor) |
|--------|-------|------|------------------|
| See | Alerts arrive with context attached | Signals correlated to deploys and drift — not another wall of charts. | Aiden for Observability → `#observe` |
| Decide | RCA without the archaeology | Incidents open with a cross-domain timeline so root cause isn't a week of tab-switching. | Aiden for SRE → `#remediate` |
| Change | Policy-checked action in your Git | Intent becomes governed infrastructure and automation changes your team can review. | Aiden for Infrastructure + Aiden for Automation → `#build` / `#operate` |

### Assemblies / How it works (`#assemblies`) — ADF lives here
| Field | Draft |
|-------|--------|
| Eyebrow | Autonomous DevOps Factory |
| H2 | From intent to governed change — in one loop |
| Body | Intent → Factory Spec → Runtime → Learning. Aiden products run on Aiden OS so platform, build, operate, observe, and remediate teams share one governed path. |

### Shell / OCG (`#ocg`)
| Field | Draft |
|-------|--------|
| Eyebrow | OPERATIONAL CONTEXT GRAPH |
| H2 | Trace changes across your software supply chain |
| Body 1 | Incidents pull deploy history, dependencies, and drift into one timeline. |
| Body 2 | Root cause starts with context, not a war room. |

### Who it's for (`#who`)
| Field | Draft |
|-------|--------|
| Eyebrow | WHO IT'S FOR |
| H2 | Built for teams who own the pager |
| Sub | One context layer for SRE, platform, DevSecOps, and developers. |
| Product cards | **Aiden for Infrastructure** — Provision, govern, and heal with shared context. · **Aiden for Automation** — Self-verifying deploys gated on resilience. · **Aiden for Observability** — Signals into correlated answers. · **Aiden for SRE** — Incidents that know what changed. |
| Roles | SRE: Alerts arrive with deploys and drift attached · Platform: Catch drift before deploy lands · Developers: Ship without the platform ticket queue · DevSecOps: Keep agent actions inside policy |

### Footer CTA
| Field | Draft |
|-------|--------|
| Heading | Ready for on-call that starts with what changed? |
| Sub | See Aiden for SRE on your stack — context, policy, and approval included. |
| Primary | See Aiden for SRE |
| Secondary | Schedule demo |

### Parked (do not use on public home yet)
- Any MTTR / CFR / toil % from PRFAQ
- "AI Ops" as category label
- ADF as hero H1

---


## 12. Semrush landing-page content brief (2026-08-31)

**Skills used:** find-skills → `seo-content-brief` (primary) · `seo-page` · catalog `landing-page-copywriter` / `copywriting` · Semrush MCP · synthesis via Claude Sonnet 5  
**Data:** Semrush US database, live pull 2026-08-31 (`domain_rank`, `domain_organic`, `domain_organic_unique`, `phrase_these`, `phrase_related`, `phrase_organic`, `phrase_questions`)

### Search intent for the homepage

**Primary: Navigational / brand.** `stackgen.com` ~298 organic visits/mo across 347 keywords; brand "stackgen" #1 drives ~**70%** of homepage organic. `sourcegraph.com` (~10.5K organic visits/mo) still has homepage ~**45%** brand-led. Pattern: **homepage converts people who already know you** — it is not the vehicle for winning open head terms.

**Secondary: Commercial-assist.** Some sessions arrive via adjacent non-brand (e.g. AI SRE tools roundups where the blog already ranks). Homepage must confirm “yes — AI SRE / governed ops change” fast, then CTA to Aiden for SRE.

### Homepage vs blog/product (content ownership)

| Content type | Homepage | Blog / product |
|---|---|---|
| Control-plane narrative (Problem → Solution → See/Decide/Change) | Core | — |
| Differentiator (policy-checked change in customer Git, OCG) | 1–2 proof sentences | Depth on `/product/aiden-for-sre` |
| “What is AI SRE / AIOps” definitions | No | Blog (glossary SERP already owned by incumbents) |
| “Best AI SRE tools” / SRE tools lists | No | Blog — already ranks (ai sre tools #4, sre tools #10) |
| IaC / Terraform / governance explainers | No | Blog — already ranks |
| Differentiation FAQ (change vs suggest; where PRs land; guardrails) | Optional compact block | Or park on product page |
| Logos | Yes (no metrics) | — |

### Semantic vocabulary to weave (natural, not stuffed)

| Term | Vol (US) | Fit |
|---|---|---|
| policy as code | 1,000 | Solution / Change |
| AI SRE | 480 (rising) | Product name + one reinforce |
| platform engineering tools | 480 | Assemblies / Platform role |
| AI site reliability engineer | 320 | Who-it’s-for |
| SRE agent | 320 | Decide / Solution (careful — competitor category) |
| AI incident response | 260 | Problem / Decide |
| terraform drift detection | 210 | Problem / Change |
| AppStack | 210 | Change / Assemblies |
| AI remediation | 170 | Solution |
| site reliability engineering tools | 170 | Who-it’s-for |
| MTTR reduction | 110 | Concept only — **no numbers** (logos-only lock) |

### Do not target on homepage

- **AIOps platform** (1,600) / **AIOps tools** (1,900) — SERP owned by Dynatrace, Splunk, AWS, IBM, Datadog
- **what is SRE / what is AIOps** (~1,900) — definitional; not homepage job
- Competitor agent brands: Azure SRE Agent, Bits AI SRE, PagerDuty SRE Agent, “AI SRE agent” as our label
- **autonomous DevOps** (~10 vol) — keep ADF as mechanism name only

### Competitive gaps homepage can own (glossaries miss these)

1. Policy-checked, reviewable remediation in **customer Git**
2. One graph joining deploy + drift + signals (**OCG**)
3. **Ops change** as the unit of trust (not alert/suggestion alone)

### Internal links from homepage (pages already ranking)

- Blog: top AI SRE tools 2026 → Problem / Decide  
- Blog: IaC best practices → Change  
- Blog: cloud governance → Change / Assemblies  
- Blog: Terraform vs Pulumi → Change  
- Blog: MCP servers for platform engineers → Assemblies  
- Blog: infrastructure from code → Change / Assemblies  

### Homepage FAQ (differentiation only — max 4)

1. Does Aiden for SRE make the change, or just suggest one?  
2. Where do changes land — our Git, or StackGen’s?  
3. How does this fit tools we already run?  
4. What guardrails stop a wrong agent change?  

Else park FAQ on `/product/aiden-for-sre`.

---

## 12b. Copy refinements vs §11b (applied where noted)

| Field | Action |
|---|---|
| Hero H1 Option A | **Keep** — no SEO reason to keyword-lead a navigational page |
| Hero sub | Keep |
| Problem symptoms | **Applied:** move “AI that suggests a fix but can’t open a policy-checked change” to **2nd** bullet |
| Solution body | **Applied:** “policy-checked guardrails” |
| Assemblies body | **Applied:** acknowledge **platform** teams once |
| FAQ | Add optional 3–4 differentiation FAQs near footer when implementing |
| Internal links | Wire ranking blogs into Problem / Change / Assemblies (no new prose) |
| Nav / Logos / OCG / Footer | No Semrush-driven copy change |

---

## Appendix — Skills catalog consulted

| Skill | Role |
|-------|------|
| using-superpowers / brainstorming | Process gate; options before implementation |
| firecrawl-cli | Primary Sourcegraph homepage scrape + structure search (2026-08-31) |
| Mobbin MCP | Problem-first / multi-product landing patterns |
| copywriting | Clarity, one idea per section, benefits over features |
| competitor-analysis | Landscape framing without battlecard bloat |
| positioning-ideas | See/Decide/Change vs Sourcegraph Understand/Oversee/Evolve |
| job-stories | SRE situation → motivation → outcome → product map |
| Torbit | Index + locate replica sections / content |
| find-skills | Landing-page-copywriter / competitor-analysis catalog hits |

*Sourcegraph evidence: Firecrawl `.firecrawl/sourcegraph-homepage.md`. Landing SEO: Semrush US 2026-08-31 (§12). Mobbin for competitor UX patterns. TinyFish not used for Semrush refresh.*
