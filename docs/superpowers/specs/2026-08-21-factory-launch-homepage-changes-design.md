# Factory Launch Homepage Content Changes

**Date:** 2026-08-21  
**Status:** Draft for Monday 24 Aug 2026 review. Not implemented in code. **Torbit-verified 2026-08-21** against `main` @ `dd0a7cd` (see §17).  
**Skills:** `using-superpowers` (process), brainstorming (spec), next step after approval is `writing-plans`  
**Source meeting:** Weekly X-Fn Factory Launch, Fri 21 Aug 2026, ~63 min  
**Sybill:** conversation `2a8ff448-d312-479e-b753-6ecb4b8d2b75`  
**Meeting note:** `docs/meetings/Meeting-Summary-2026-08-21-weekly-xfn-factory-launch.md`  
**Review gate:** Monday 24 Aug 2026 working session

This spec is the change list for Home (and the product/platform copy that the call flagged). It is **not** an implementation plan. Do not ship code from this file until the Monday review and a `docs/superpowers/plans/` plan exist.

---

## 0. What is already true (context gathered 2026-08-21)

OpenMemory MCP (`project-0-Stackgen_Website_Redesign-openmemory` / SSE `http://136.67.59.238:8771/mcp/cursor/sse/StackgenWebsite`) was **not connected** in the Cursor session that wrote this spec. Context below is from `openmemory.md` (living project index), the meeting note, and the live `web/` tree.

### 0.1 What has already shipped

| Track | What exists | Implication for this work |
|---|---|---|
| App Replica Next.js | `web/` on `main` @ `dd0a7cd`. Torbit: 6 `web/app/**/page.tsx` modules (`/`, `/product/[slug]`, `/platform`, `/enterprise`, `/pricing`, `/news`) + `data-theme`. Home is **15 section components** (16 including Final CTA) composed in `web/app/page.tsx`. | This is the **current public Home**. Changes in this spec target `web/app/page.tsx` + `web/content/home.ts` + `web/components/sections/home/*`. Bind to **this repo**, not `.worktrees/*` (those still have 23 home-section files from Wave 1). |
| Replica fidelity spec | `docs/superpowers/specs/2026-08-21-app-replica-pencil-to-next-design.md` locked **100% canvas fidelity**: no invented copy, no section reordering. | **This factory-launch spec supersedes replica fidelity for Home content and section order.** Replica remains the visual system (tokens, nav, light/dark). Do not treat canvas Home as the copy SoT after Monday. |
| Pencil canvas | `Stack_Linear.pen` App Replica Home `nwYaY` (light) / `y1kHUi` (dark). | Swami’s Monday mock may live on canvas **or** in code. The call reviewed a mock with CLI/Slack high on the page, a product screenshot, and a logos strip. |
| Product naming | Locked: Aiden for Infrastructure / Automation / Observability / SRE. Never Olly, InfraOps, Aiden for DevOps. | Unchanged. Hero and OS copy must still pass governance tests. |
| Proof | `docs/proof/customer-logos-and-quotes.md`. Only **greytHR** quote is published. Nielsen / Innovaccer / healthcare / manufacturer cards in `home.inTheirWords` are PLACEHOLDER. | Meeting agrees: hide PLACEHOLDERs; keep greytHR. Marketing owns the logo strip. |
| Positioning | `docs/superpowers/specs/2026-08-19-positioning-icp.md`: Agentic OS for DevOps; ADF is vision, not a SKU. | Meeting did **not** reopen category. It did reopen **how Home explains ADF** (diagram first, intents + outcomes, fewer abstract OS words). |
| Wave 1 vs replica on disk | Torbit on `main` **still has** `web/content/home.ts` and five primitives: `ButtonPrimary`, `ButtonGhost`, `Logo`, `MonoLabel`, `SectionShell`. Every Home section imports `@/content/home` + `SectionShell`. There is **no** `web/components/ui/` and **no** `web/components/diagrams/**` on `main`. `openmemory.md` Recent edits that say primitives/content were deleted are **stale vs the graph**. | Edit `home.ts` and Home sections. Reuse existing primitives. Do not resurrect Wave 1 SVG diagrams (`FactoryProcessDiagram`, `AdfLoop` SVG, `ProblemDiagram`); they are **not on `main`**. |
| Hero visual today | Replica Home hero is **copy + CTA only**. Product UI lives in Mechanism (`home.mechanism.image` = change-surface still). Wave 1 even documented “hero missing dashboard” as a false defect because canvas `XPc1X` had no mock. | The factory-launch call **explicitly wants a hero diagram**. That is a deliberate new requirement, not a parity bug. |
| Product UI asset rules | Full-bleed product window, no marketing chrome / PIP / traffic-light bar. Frame `1040×585` (16:9). Shell `#0B0C0E`. | Keep these if a product UI pop-out is used as an **animation placeholder** in the hero. Do not generate confusing AI chrome. |

### 0.2 What this spec does **not** redo

- Product page layouts (except the **10× → 4×** metric lock in §8).
- Platform page rewrite (blocked on Product PRFAQ/PRD; see §7).
- Docker, theme tokens, nav IA.
- Inventing Dharani’s 7–8 Excel intents.

---

## 1. Decisions locked on the call

Participants who spoke: Aaron Yang, Dharani, Raj Nagarajan, Sachin Aggarwal, Swaminathan R. John Jamie attended, did not speak.

| # | Decision | Owner |
|---|---|---|
| D1 | Home must **explain ADF first** (what it is, why it matters, who it is for, what it solves) before surfaces or OS vocabulary. | Swami (structure + hero) |
| D2 | **Hero is the story.** Cut to a short headline. Graphic carries the product. | Swami |
| D3 | Hero graphic = **intent (hard prompts) → agent orchestrator (not four product agents, not an unexplained “intent router”) → outcomes**, with **context / memory / workflows-skills** as layers, **integrations as one horizontal band**. | Swami |
| D4 | CLI / Slack / MCP **PLG band is premature**. Move down or remove until the product story is clear. | Swami + Dharani |
| D5 | **Use cases / hard intents** belong **high** on the page (after hero + logos + one-graph / pillars), not at the bottom. Pair intents with outcomes. Wait for Dharani’s Excel for the full 7–8. | Dharani (list), Swami (placement) |
| D6 | Do **not invent** Agentic OS / governance / memory / trust-and-safety copy. Hold for Product slides + **PRFAQ/PRD**. | Raj, Sachin, Aaron |
| D7 | Marketing owns logos. Prefer enterprise / global marks. Do not lead with too many Indian logos. | Marketing (Sachin direction) |
| D8 | Animation **placeholders** are OK (logo marquee, product UI pop-out). Do not ship a fake operator-autonomy dashboard. Product is not ready. | Swami |
| D9 | Fewer competing sections. Collapse Problem / Factory Process / ADF Loop until the top of the page works. | Swami |
| D10 | Monday 24 Aug 2026: review revised mock, Excel intents, and Product source docs. | All |

---

## 2. Story the page must tell (in this order)

Sachin’s bar (paraphrase, not site copy): the ADF site first tells **what ADF is**, **why people should care**, **what it solves**, **who it is built for**, then a strong value prop (world without ADF vs with it), **without losing the four products**, stitched so the market can consume it.

**Target narrative spine (Monday mock):**

1. Short headline (factory, or Build · Operate · Observe · Remediate with SRE in the loop).
2. **Hero diagram** (the product).
3. Customer logos.
4. One graph / one platform, multiple use cases + pillar outcomes.
5. Hard intents + measured outcomes (Dharani list when ready).
6. Only then: integrations detail, proof, compliance, CLI/Slack if kept at all.
7. Final CTA.

Do not lead with “every surface” (CLI, Slack, MCP).

---

## 3. Current Home vs required Home

**Composition today:** `web/app/page.tsx` (16 sections). Copy: `web/content/home.ts`.

| # now | Component | `home.ts` key | Verdict |
|---|---|---|---|
| 1 | `Hero` | `hero` | **Rewrite.** One line. Diagram is the story. CTA can stay replica “Get started” unless Monday reopens CTA (marketing SoT elsewhere is still Schedule demo). |
| 2 | `Logos` | `logos` | **Keep position** (after hero). **Replace set** per §6. Add marquee **placeholder**. |
| 3 | `Surfaces` | `surfaces` | **Move down or delete.** Aaron/Sachin: premature PLG. Items 01 CLI and 04 Slack were called out; the whole band is the problem. |
| 4 | `Mechanism` | `mechanism` | **Do not keep as the fold story.** Change-surface screenshot may become the hero pop-out placeholder, not a separate early section. |
| 5 | `Problem` | `problem` | **Collapse or drop below the fold** until the top works. Human-vs-factory role copy, if kept, goes way down. |
| 6 | `FactoryProcess` | `factoryProcess` | **Collapse** into the hero diagram or park below. |
| 7 | `AdfLoop` | `adfLoop` | **Collapse.** Loop stages belong **in the hero**, not as a third diagram. Kill **10×** here (`adfLoop.outcomes` currently `"10×"` provisioning velocity). |
| 8 | `AgenticOs` | `agenticOs` | **Hold invented OS messaging.** Do not expand. Metric **10×** on Infrastructure card must become **4×** when this band is shown at all (Sachin: latest one-pager). Prefer not showing this band until PRFAQ/PRD. |
| 9 | `OperationalContextGraph` | `ocg` | Optional later. “One graph” on the call = knowledge graph that makes the product reachable from any interface. Do not explain it as four product logos. |
| 10 | `Integrations` | `integrations` | **Compress into the hero’s bottom band** for the first screen. Full seven-category grid can stay **low** on the page. |
| 11 | `InTheirWords` | `inTheirWords` | **Keep greytHR only.** Hide four PLACEHOLDER testimonials. |
| 12 | `Industries` | `industries` | Keep if proof is real (financial services + Innovaccer). Not discussed as a problem. |
| 13 | `Compliance` | `compliance` | Keep low. Not discussed as a problem. |
| 14 | `UseCases` | `useCases` | **Pull up.** Today it is **15th**. Replace four pillar blurbs with 7–8 **hard intents** + outcomes when Excel lands. Starter intents from the call are in §5. |
| 15 | `FinalCta` | `finalCta` | Keep last. Do not invent new OS sentences until Product docs exist. Current body still says “Agentic OS for DevOps”; leave until PRFAQ or Monday rewrite. |

### 3.1 Required section order (Monday mock)

Exact components can merge; this is the **reader order**, not a mandate to keep 16 React files.

1. **Hero** — one headline + hero diagram (intents / orchestrator / outcomes / integration band). Animation placeholders OK.
2. **Logos** — marketing-owned strip, marquee placeholder.
3. **One platform / four pillar outcomes** — short. Not CLI/Slack. This is “one graph, multiple use cases” in plain language.
4. **Hard intents + outcomes** — 7–8 when Excel is in; until then use only call-approved examples as **wireframe labels**, not as shipped customer claims.
5. **Deferred / collapsed stack** (single lower band or omitted for the mock): Problem, Factory Process, ADF Loop, Agentic OS, OCG columns.
6. **Surfaces (PLG)** — only if kept, **after** the product story. Prefer omit for Monday.
7. Integrations (detail), In Their Words (greytHR), Industries, Compliance.
8. Final CTA.

---

## 4. Hero: every change

### 4.1 Copy to cut

**Current** (`home.hero`):

- Heading: `Autonomous DevOps Factory`
- Body: Aiden sets the foundations for an Autonomous DevOps Factory: build, govern, observe, and remediate…
- Support: StackGen is the company behind Aiden, the DevOps operating system…
- CTA: `Get started`

**Required:** **one line**. Candidates spoken on the call (pick **one** at Monday, do not ship all):

- Autonomous DevOps Factory (keep as H1 if the diagram does the rest).
- Build · Operate · Observe · Remediate (SRE in the loop).
- Automated factory (Aaron/Sachin gist: the graphic is the story).

Delete or demote the body + support paragraphs from the **fold**. They can return below the diagram if Monday still wants a sentence of category context.

**Do not** write a new Agentic OS paragraph in the hero while Product docs are missing.

### 4.2 Hero diagram (required structure)

Build **one** diagram. Do not ship two competing explanations (intent-router flowchart **and** a separate persona-agents poster) as the fold.

**Layer A — top: intents (rotating, hard)**

- A prompt / intent surface, not a chatbot screenshot as the product.
- Rotate **hard, cross-source** prompts from customer work. Spoken examples (wireframe only until Excel):
  - `migrate my AWS`
  - `restore service`
  - `explain anomaly`
- Sachin: not “I’m not getting my password.” Not a Jira ticket pictured as the input.
- Raj: do **not** picture **Jira** as the intent source (John’s older diagram did; reject that).

**Layer B — middle: agent orchestrator**

- Label the box **agent orchestrator** (Aaron). Do **not** label it **intent router** without explanation; the room agreed that term does not tell a visitor what they are looking at.
- Do **not** map one SaaS logo to one product SKU (do **not** show PagerDuty → Aiden for SRE).
- Do **not** draw four boxes that are the four **products** as if they were the agents. Spoken correction: work goes to **incident / RCA / many agents**, not “the SRE agent.”
- Raj/Sachin layering to preserve if it still fits one graphic:
  - intents on top
  - fleets of agents above the OS (not four app logos)
  - Agentic OS / factory platform as the lower middle (context graph, memory, workflows, skills)
- If one image cannot show both “routing” and “skills/workflows/memory,” **prefer orchestrator + outcomes** for the hero. Put skills/memory on Platform after PRFAQ.

**Layer C — right (or adjacent): outcomes**

- Concrete results, e.g. infra deployed, RCA done. Pair with the active intent.
- Not vanity dashboards of “autonomy %.”

**Layer D — bottom: integrations as one horizontal band**

- PagerDuty, cloud, Git, observability, etc. as **one strip**.
- They feed the orchestrator. They do not each own a column to a product.

**Layer E — in the OS slab (if shown)**

- Context graph, memory, workflows / skills. Icons OK. Do not invent capability claims (governance limits, trust and safety) until Product writes them.

### 4.3 What must not appear in the hero

| Ban | Why |
|---|---|
| Unexplained “intent router” | Room: it reads as an app router and explains nothing. |
| Four product agents (Infra / Auto / O11y / SRE) as the routing targets | Wrong model; too simple and SKU-centric. |
| PagerDuty → Aiden for SRE (1:1) | Explicitly rejected. |
| Jira as pictured input | Raj. |
| Operator / autonomy / human-in-the-loop **dashboard** as the hero | Aaron: product not ready; would over-claim. |
| AI-generated confusing chrome, PIP, browser traffic lights | Existing product-UI rules + call: placeholders only, real product UI pop-out OK. |
| CLI / Slack / MCP as the first explanation | Premature PLG. |

### 4.4 Animation placeholders (allowed)

- Logo strip: rolling marquee (L→R or vertical). Swami described this on the call.
- Product UI: current Mechanism still (`hero-HKEV6rkRDzU-1920.png` / change-surface loop) **popping out** of the hero, glossy, actual product UI. Follow `openmemory.md` product UI rules (full-bleed, 16:9, no fake browser).
- Do not wait for finished motion for Monday; **labeled placeholders** are enough.

### 4.5 Files to change when implementing (after plan)

- Modify: `web/content/home.ts` (`hero`)
- Modify: `web/components/sections/home/Hero.tsx` (Torbit: `Hero` only destructures `heading`, `body`, `support`, `cta`; imports `ButtonPrimary` + `SectionShell`; no image/diagram)
- Possibly new: a hero orchestrator component under `web/components/sections/home/` (or a new diagrams folder). **Do not** look for `FactoryProcessDiagram` / `ProblemDiagram` on `main`; they are absent.
- Optional move: Mechanism `image` into Hero as pop-out; then `Mechanism` section can go
- Tests: `web/__tests__/home-content.test.ts` currently **requires** `home.hero.body.length > 0` and all 16 content keys. Emptying the hero body or dropping `surfaces` will fail CI until that test is rewritten.

---

## 5. Use cases / intents

### 5.1 Current (wrong job, wrong place)

`home.useCases` is labeled “WHAT RUNS AUTONOMOUSLY”, heading “Bounded autonomy, four pillars,” items Build / Govern / Observe / Remediate with product SKUs. Rendered **near the bottom** (`UseCases` after Compliance).

That is pillar marketing, not customer intents.

### 5.2 Required

- **Place:** high on the page (after logos + short platform line).
- **Count:** 7–8 representative DevOps/SRE scenarios.
- **Owner:** Dharani Excel, with Product help for new ADF scenarios.
- **Until Excel exists:** do **not** invent a polished 8-pack. Wireframe with call examples only:

| Intent (spoken) | Notes |
|---|---|
| migrate my AWS / migrate my cloud | Hard, cross-context. Sachin. |
| restore service | Spoken. |
| explain anomaly | Spoken. |
| deploy my app | Only if kept as a **hard** variant, not a toy. |

Each row should eventually pair **intent → outcome** (what the factory produced), not a SKU sentence.

### 5.3 Files

- Modify: `web/content/home.ts` (`useCases` shape will change: intents + outcomes, not four pillars)
- Modify: `web/components/sections/home/UseCases.tsx`
- Modify: `web/app/page.tsx` (move `<UseCases />` up)

---

## 6. Logos and quotes

### 6.1 Current logo strip (`home.logos.items`)

Order now: Nielsen, GreytHR, Corcentric, **Piramal**, NIQ, Autodesk, InMobi, Innovaccer.

Assets on disk: `web/public/logos/customers/` also has Lowes, SAP-NS2. Missing from disk for the preferred set: **Siemens, Bank of Columbia, OneTrust**, optional Kind Card.

### 6.2 Required strip (Sachin; marketing owns the list)

Prefer, until Siemens says otherwise:

1. Siemens  
2. Bank of Columbia (spoken “Bangkok Columbia” / Banco deck in transcript; **confirm legal name** before shipping artwork)  
3. Autodesk  
4. Nielsen  
5. NIQ  
6. Innovaccer  
7. InMobi  
8. Corcentric  
9. OneTrust  
10–12. Fill with other **larger / global** marks as needed  

**Do not overweight Indian logos as lead marks.** Keep InMobi if already in the set; **do not lead with Piramal + greytHR**. Piramal can drop from the **lead** strip. greytHR stays as **published quote**, not as a hero logo.

Optional mentioned: Kind Card (if it reads as a progressive tech mark).

Live-site extras (Lowe’s, SAP NS2, RocTop, Chamberlain) are **not** the lead set from this call. Marketing decides if any remain in the marquee.

### 6.3 Quotes (`home.inTheirWords`)

| Card | Action |
|---|---|
| greytHR / Abhishek Gaurav | **Keep.** Only published quote. |
| Nielsen PLACEHOLDER | **Hide / delete from ship.** |
| Innovaccer PLACEHOLDER | **Hide / delete from ship.** |
| HEALTHCARE PLATFORM [NAME] | **Hide / delete from ship.** |
| MANUFACTURER [NAME] | **Hide / delete from ship.** |

Do not promote PLACEHOLDER copy to look real. Existing `InTheirWords` already badges placeholders; the call still wants them **off the page**.

### 6.4 Files

- `web/content/home.ts` (`logos`, `inTheirWords`)
- `web/components/sections/home/Logos.tsx` (marquee placeholder)
- `web/components/sections/home/InTheirWords.tsx` (filter to published)
- New logo files under `web/public/logos/customers/` once legal/marketing supplies Siemens / Bank of Columbia / OneTrust
- Keep `docs/proof/customer-logos-and-quotes.md` in sync

---

## 7. Agentic OS / Platform copy (do not invent)

**Current Home** already ships a large `agenticOs` band (four product cards, metrics, features) plus `ocg` five pillars plus `finalCta` OS sentences.

**Call:** collateral is weak. Swami previously had to read source / work with engineering for an RFP. Website quality needs Product.

**Product owes before marketing writes:**

- Slides  
- **PRFAQ or PRD** covering enterprise readiness: governance, memory, trust and safety, limitations  
- How to talk about intent routing / world model **on Platform**, not as unexplained Home jargon  

**Marketing must not:**

- Invent OS capabilities  
- Explain “intent router” as the Home headline mechanism  
- Claim operator-autonomy dashboards  

**Platform page** (Raj): Aiden OS, factory as Agentic OS for DevOps, then components (memory, etc.) in simple language. That rewrite is **out of scope for Swami’s Monday Home mock** except a stub “Platform copy blocked on PRFAQ.”

---

## 8. Metrics that are already wrong on Home

Sachin: latest one-pager **does not claim 10×**; it is **4×**. Torbit + string scan on `main`: 10× is not only on Home.

| File | Where |
|---|---|
| `web/content/home.ts` | `adfLoop.outcomes` and `agenticOs` Infrastructure metrics |
| `web/content/products.ts` | Aiden for Infrastructure `metrics[0]` (`"10×"` provisioning velocity) |
| `web/content/platform.ts` | By-the-numbers band |
| `web/content/enterprise.ts` | Metrics band |

**Change all four to 4×** when those bands are visible. Prefer hiding the Home Agentic OS metric wall until Product confirms the one-pager numbers (Infrastructure also has 100% / 95% / 60%; Observability 60%+ / 2 to 5 FTEs / 300+; SRE 50% MTTR / 66% RCA / 90% noise / 10 to 15 hrs). This spec only **locks the 10× → 4×** correction from the call. Other figures stay until Product re-approves.

---

## 9. Surfaces / PLG band (detailed)

**Current copy** (`home.surfaces`): heading “One graph. Every surface your team already uses.” Items: CLI, IDE via MCP, Git, Slack, Jira / Linear, API.

**Feedback:** Factory.ai-style surface grid is the **wrong lead**. Visitors need what the product **does** first.

**Monday default:** omit `<Surfaces />` from `page.tsx`.

**If kept after Monday:** place after intents + outcomes; retitle so it is not the definition of the product; do not imply Jira is the primary intent channel (conflicts with Raj on the hero).

---

## 10. Sections to collapse (detailed)

Until the top of the page works, treat these as **one optional lower “how it works”** or omit from the mock:

| Section | Why collapse | Salvage |
|---|---|---|
| Problem | Creation vs operations + stats compete with the hero. | Evidence stats can support “world without ADF” **below** once headline + diagram land. |
| Factory Process | Four steps duplicate the hero orchestrator. | Intent → Spec → Runtime → Learning can be **labels inside** the hero OS slab. |
| ADF Loop | Build / Operate / Observe / Remediate belongs **in the headline or hero**, not a third band. On `main`, `AdfLoop.tsx` is a **layout section** (chips + state rail), not an SVG diagram. | Keep the four words; collapse the section. |
| Mechanism | Screenshot is a **pop-out**, not a section 4 story. | Move media to hero. |
| Agentic OS cards | Invented-feeling OS + 10×. | Wait for PRFAQ; then Platform + a thinner Home teaser. |
| OCG five columns | Abstract for first-time readers. | One line: shared context graph. Depth on `/platform`. |

---

## 11. Copy and naming bans (still in force)

From `PRODUCT.md` / `.agents/product-marketing.md` / governance tests. The meeting did not relax these.

- No Olly, InfraOps, Aiden for DevOps  
- No em dash in site copy  
- No unverified quotes as real  
- ADF is vision, not a fifth SKU  
- Primary marketing CTA remains Schedule demo in the product-marketing SoT; replica Home hero currently says Get started. **Do not silently switch CTA in this pass** unless Monday says so.

---

## 12. Work that is **not** Home but was requested on the call

| Item | Owner | Notes |
|---|---|---|
| Excel: 7–8 intents + outcomes | Dharani (+ Product for new ADF) | Blocks shipped use-case copy. |
| PRFAQ/PRD + slides for OS | Raj, Sachin, Aaron | Blocks Platform and Home OS expansion. |
| Product page numbers + workflow animation | Product + Swami later | 4× not 10×; “real numbers” then workflow visuals. Out of Monday Home mock unless a product page is in the review. |
| Confirm Bank of Columbia / Siemens / OneTrust logo rights | Marketing | Do not hotlink unlicensed marks. |

---

## 13. File map (when a plan is written)

Torbit `main` @ `dd0a7cd`. Home sections have **one importer**: `web/app/page.tsx`. All 15 Home section files import `@/content/home`. Shared chrome: `SectionShell` + `ButtonPrimary` / `MonoLabel` as listed below.

| File | Change |
|---|---|
| `web/app/page.tsx` | Reorder / drop sections to match §3.1 (imports Hero → Logos → Surfaces → … → UseCases → FinalCta) |
| `web/content/home.ts` | Hero, logos, useCases, inTheirWords, 10×→4×, likely delete or relocate `surfaces` |
| `web/content/products.ts` | Infrastructure metric 10×→4× (same call) |
| `web/content/platform.ts` | 10×→4× in numbers band |
| `web/content/enterprise.ts` | 10×→4× in metrics band |
| `web/components/sections/home/Hero.tsx` | Diagram + one line. Keep `ButtonPrimary` + `SectionShell`. |
| `web/components/sections/home/Logos.tsx` | New marks + marquee placeholder (`next/image` + `SectionShell` today; no Marquee primitive on `main`) |
| `web/components/sections/home/UseCases.tsx` | Intent/outcome cards; new position in `page.tsx` |
| `web/components/sections/home/Surfaces.tsx` | Remove from `page.tsx` or move down |
| `web/components/sections/home/InTheirWords.tsx` | Published-only |
| `web/components/sections/home/Mechanism.tsx` | Absorb `image` into hero or drop |
| `web/components/sections/home/Problem.tsx`, `FactoryProcess.tsx`, `AdfLoop.tsx`, `AgenticOs.tsx` | Collapse or omit from `page.tsx` |
| `web/components/primitives/SectionShell.tsx` (and Button/MonoLabel) | Reuse. Do not add `web/components/ui/`. |
| `web/__tests__/home-content.test.ts` | **Must change in the same PR.** Locks 16 keys (`surfaces` included), `hero.body.length > 0`, `agenticOs.products.length === 4`. |
| `web/public/logos/customers/` | Add approved marks |
| `docs/proof/customer-logos-and-quotes.md` | Strip inventory |
| `Stack_Linear.pen` | Optional Monday mock (Pencil). Do not treat replica frames as copy SoT after this spec. |

There is **no** `web/content/__tests__/governance.test.ts` on `main`. Ban-scan lives in `home-content.test.ts` (`collectStrings`, no `.firecrawl` paths) plus naming discipline in other content tests.

---

## 14. Acceptance for Monday 24 Aug 2026

The working session should be able to scroll a mock (canvas or code) and verify:

1. Fold is **short headline + hero diagram**, not a wall of ADF/OS prose.  
2. Diagram shows **hard intents**, **agent orchestrator**, **outcomes**, **integration band**; no Jira input, no PagerDuty→SRE, no unexplained intent router, no four product-agent boxes.  
3. Logos match marketing’s preferred global set; Piramal/greytHR are not the lead pair; greytHR quote still exists later.  
4. CLI/Slack/MCP is **not** section 3.  
5. Use-case band is **high**; placeholders labeled as such if Excel is late.  
6. PLACEHOLDER testimonials are gone.  
7. No new OS/governance/memory claims.  
8. Animation is clearly **placeholder** (marquee + optional UI pop-out).  
9. 10× does not appear if those sections are still visible.

---

## 15. Spec self-review

1. **Placeholders:** Dharani’s Excel and Product PRFAQ are real external blockers, named as such, not fake copy. Hero H1 is a Monday pick among three spoken options. Bank of Columbia legal name needs marketing confirm.  
2. **Consistency:** Hero orchestrator vs four product agents is resolved (orchestrator). Surfaces vs use cases placement is resolved (use cases up, surfaces down/out). Replica fidelity vs this spec is resolved (this spec wins for Home content).  
3. **Scope:** Home + logo/quote + 10× metric (Home, products, platform, enterprise). Platform/OS **writing** is still blocked; the 4× number swap is not OS invention. Product-page animation is listed, not Monday-critical.  
4. **Ambiguity closed:** “One graph” = shared knowledge/context graph making the product reachable from interfaces, **not** a PLG surface grid. CTA not silently changed.  
5. **Torbit:** File map matches `main` graph. Do not implement against `.worktrees/factory-*` (23 home-section files vs 15 on `main`).

---

## 16. Next Superpowers step

Canvas Monday mock plan is written: `docs/superpowers/plans/2026-08-21-factory-launch-pencil-monday-mock.md` (Pencil `Stack_Linear.pen`, pencil-web-design-expert). A Next.js `writing-plans` pass is a separate later plan after the mock is approved. Do not implement Home code from this spec until that code plan exists.

---

## 17. Torbit verification (2026-08-21)

Indexed `/Users/swami/Documents/Stackgen_Website_Redesign` (also picked up six `.worktrees/*` repos). **Authoritative graph for this spec:**

| Field | Value |
|---|---|
| `repo_path` | `/Users/swami/Documents/Stackgen_Website_Redesign` |
| `branch` | `main` |
| `commit_sha` | `dd0a7cd33749f08bbcb2c3ae1893fa4edf7fb767` |
| `project_id` | `6869176848158080459` |
| Graph | 55 dirs, 321 files, 494 definitions, 252 imports (index stats; `gl_file` table was empty, so verification used `gl_definition` + `gl_imported_symbol` + `gl_directory`) |

**Confirmed (matches the spec):**

- `page.tsx` import order: Hero, Logos, Surfaces, Mechanism, Problem, FactoryProcess, AdfLoop, AgenticOs, OperationalContextGraph, Integrations, InTheirWords, Industries, Compliance, UseCases, FinalCta.
- All 15 Home section modules exist under `web/components/sections/home/`.
- `web/content/home.ts` exists; every Home section default-imports it.
- Surfaces and UseCases are **only** composed from `web/app/page.tsx` (safe to move/drop without other routes).
- Hero is copy + CTA only (`heading`, `body`, `support`, `cta`).
- Mechanism is the product still (`title`, `caption`, `image`).

**Corrected after the graph (spec patched in this revision):**

| Spec assumed | Graph on `main` |
|---|---|
| Primitives deleted in replica overwrite | Five primitives still live and are what Home uses |
| `web/components/ui/` + Wave 1 diagrams | Absent on `main` |
| Governance tests at `web/content/__tests__/governance.test.ts` | Actual lock is `web/__tests__/home-content.test.ts` (16 keys, non-empty hero body, 4 OS products) |
| 10× only in `home.ts` | Also `products.ts`, `platform.ts`, `enterprise.ts` |
| ADF Loop / Factory Process as SVG diagrams to reuse | Those diagram modules are **not** on `main`; worktrees still have ~23 home-related files including old diagrams |

**Do not use** worktree graphs (`factory-experience`, `t7-problem`, `t8-adf`, `t9-ocg`, `t10-aiden-os`, `t11-mechanisms`) as the implementation target.
