# Greenfield website design

**Date:** 2026-08-21  
**Status:** Draft for review (copy + IA). Framework approved. Not implementation.  
**Framework:** `docs/superpowers/specs/2026-08-21-gartner-greenfield-website-framework.md` (approved)  
**Voice locks:** `.agents/product-marketing.md` (L0–L2, naming, bans) plus the anti-AI gate in §1 of this file  
**Does not ship:** Factory-launch Monday Home, live `web/` routes, Pencil App Replica  

This is the design: sitemap, page jobs, and **actual copy**. If a sentence would look generated, it does not belong on the site.

---

## 0. Skills used

| Skill | Used for |
|---|---|
| `using-superpowers` + `brainstorming` | Design after approved framework, before any plan or code |
| `copywriting` | Enterprise page spine, hero restraint, one idea per section |
| `humanizer` | Strip Wikipedia/LLM tells from every public string |
| `coach-tech-writing` / `technical-writing` anti-pattern lists | Banned vocabulary, rhythm, openings |
| Approved framework | Job + role IA, Gartner buying jobs, no Market Guide inclusion claim |

Visual pixels stay out. Craft bar is in the framework §9.

---

## 1. Voice contract (ship gate)

Read this before touching a headline. Fail any check and the line is rewritten, not "toned down."

**Sound like:** a Platform or SRE lead writing Slack to their VP. Short when the fact is short. Longer when the mechanism needs a beat. Contractions in body. "is" and "has" instead of "serves as" / "stands as."

**Do not sound like:** a model completing a SaaS landing-page template.

### Hard bans (public site)

Already locked: Olly, em dash, en dash used as an em dash, "single pane of glass," Git/estate, "we replace [vendor]," uncleared dollar ROI, unpublished quotes presented as real, "named by Gartner" / "representative vendor" for the 2026 AI SRE Market Guide.

Add these for this design (humanizer + tech-writing lists):

| Pattern | Don't | Do |
|---|---|---|
| AI vocabulary | unlock, seamless, robust, leverage, landscape, delve, pivotal, groundbreaking, transformative, foster, showcase, underscore | Say the mechanism: policy check, diff, refuse, apply |
| Copula dodge | "Aiden serves as the control plane that..." | "Aiden is the operating system Platform and SRE teams run." |
| Reframe cliche | "This isn't an incident bot. It's an OS." | "Incident chat doesn't change how you ship. Aiden does, because policy sits on the apply path." |
| Rule of three | "faster, smarter, safer" | One claim, or two if both are true |
| -ing tail | "...ensuring reliability at scale" | End the sentence when the fact ends |
| Title Case | "How We Deliver Outcomes" | "How a change gets refused" |
| Bold-header bullets | **Speed:** We improve MTTR | "Investigations dropped because RCA starts from the change event, not the dashboard." |
| Vague authority | "Industry leaders are moving to AI SRE" | Name the source or drop it |
| Hero stuffing | OS + factory + four SKUs + Gartner in 40 words | One outcome. Diagram does the rest. |

**Sentence-case headings** on the site. **Straight quotes.** No emojis in chrome.

**Claims:** every metric keeps a mechanism line. 10× infrastructure velocity is **out** (factory-launch lock: 4× when that metric is shown at all). greytHR is the only published quote.

**Locked category language** still applies. You may shorten it for a hero. You may not replace Agentic OS / ADF with "AI SRE tooling" as the company category.

### How we used L0–L2 here

Product-marketing still owns the long-form lines. This design **does not reprint L1 as the H1**. The approved framework wants an outcome hero. ADF is the eyebrow and the system name on `/product`, not a second slogan fighting the H1.

L1 contains an em dash in the source file. **Never paste it onto the site.** Split into two sentences.

---

## 2. Sitemap (from approved approach C)

Primary nav, left to right:

`Product` · `Use cases` · `Who it's for` · `Customers` · `Resources` · `Schedule demo`

Login on the right. Four Aiden names stay **out** of the top bar. They live on Product and at the foot of each use-case page.

| Label in nav | Goes to |
|---|---|
| Product | `/product` |
| Use cases | Mega: Reliability · Governed change · What changed · Gated delivery |
| Who it's for | Mega: Platform · SRE · Infrastructure and operations · Security |
| Customers | `/customers` |
| Resources | Mega: Evaluate · Security · MCP · (blog later) |
| Schedule demo | `/schedule-demo` |

Footer repeats the same, plus About. No seventh "AI SRE" nav item.

---

## 3. Home

**Job:** Teach the problem fast, show one mechanism, point I&O and Platform to different next clicks. Fold is clarity, not a manifesto.

### 3.1 Hero

Eyebrow (mono, optional): `Autonomous DevOps Factory`

**H1:** Keep agent-driven change inside policy

**Sub:** Aiden is the DevOps operating system Platform and SRE teams use when coding agents are already in the loop. A change can apply, or it can be refused. That boundary is the product.

**Primary CTA:** Schedule demo  
**Secondary:** How Aiden works → `/product`

**Visual:** One diagram (intent in, orchestrator, outcome out). Govern / policy is a visible stage, same weight as remediate. Product UI may pop out of the diagram as a still or loop. Full-bleed app, 16:9, no fake browser chrome.

**Alt H1** (if the room wants the locked slogan on the fold): Autonomy at the pace of confidence  
Use the same sub. Do not stack both H1s.

**Rejected H1s:** "The future of AI SRE." "Unlock reliability." "One platform for everything." "It's not firefighting, it's prevention."

### 3.2 Logos

No heading, or a quiet `Teams running production on Aiden`. Marketing picks the marks. Prefer global / enterprise. Do not lead with a wall of Indian logos. No count-brag ("trusted by 500+").

### 3.3 Trap (section 3, after logos)

**Heading:** MTTR can fall while the same change keeps paging you

Most "AI SRE" pages sell a faster night shift: correlate, summarize, maybe click a runbook. You get better at closing tickets. You do not get fewer of that class of incident.

If reliability is the job, the system has to see **what changed**, put **policy on apply**, and carry that into observe and remediate. Otherwise you bought a quicker war room.

No Gartner logo. No 85%. The idea is ours to say in this voice.

### 3.4 Jobs (switcher, uneven copy on purpose)

Prompt chips. Only ship intents we can stand behind. Until Dharani's list lands, live chips are the three already spoken: `migrate my AWS` · `restore service` · `explain anomaly`. Empty slots: `Awaiting intents`. Do not invent seven polished scenarios.

When a chip is selected, show **one outcome sentence** and **one UI still**. Do not map PagerDuty → Aiden for SRE.

Outcome lines (for when Excel exists; do not ship as customer claims yet):

| Intent | Outcome line |
|---|---|
| restore service | Investigation starts from the change that preceded the page, then a bounded fix, then verify. |
| explain anomaly | Correlated signal plus what moved in infra, not a dashboard tour. |
| migrate my AWS | Plan, policy check, apply. Rollback is a named step, not a hope. |

### 3.5 How (one diagram only)

**Heading:** Shared context, then a policy check, then the act

Home gets **one** picture. Recommended: product loop as four named stages (build, govern, observe, remediate) with the Operational Context Graph as the memory in the middle. Factory process (Intent → Spec → Runtime → Learning) waits on `/product` so Home does not run two lectures.

Caption under the diagram, 2–3 lines max: Aiden for Infrastructure, Automation, Observability, and SRE share that graph. They are not four separate agents you ping in Slack.

### 3.6 Who it's for

Three cards, different lengths. Do not make them a matching triad.

**Platform**  
You own the path from intent to production. You do not want another ticket queue between AppEng and the cluster. → `/for/platform`

**SRE**  
You get the page. You want RCA that names the change, and a fix that can be refused. → `/for/sre`

**Infrastructure and operations**  
You were asked how the team will adopt SRE without hiring a bench. You need hybrid, a human on the loop, and an audit trail you can show security. → `/for/infrastructure-operations`

### 3.7 Proof

Only greytHR until more quotes clear.

Quote (published):

> "Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs."  
> Abhishek Gaurav, Head of Engineering and DevOps, greytHR

Link the case. Metrics on this card only if the case page already carries them (50% MTTD/MTTR, 90% fewer observability support tickets, 65% less manual incident remediation) with the mechanism from that story.

Hide PLACEHOLDER testimonials. A blank is better than a fake name.

### 3.8 Trust

Four short chips, not a paragraph:

- A human stays on the loop. Policy can refuse the act.
- SaaS by default. On-prem or air-gap when the estate requires it.
- Actions leave a trail you can reconstruct.
- SOC 2 · PCI · HIPAA (existing badge rules; HIPAA links the source we already use)

Cool Vendor / Hype Cycle marks: **off Home** until vendor-relations says the license is current. Never imply the 2026 AI SRE Market Guide named us.

### 3.9 Integrations

**Heading:** Use the tools you already pay for

One strip. Then a text link to the full grid. This answers "we already have observability / ITSM."

### 3.10 Evaluate teaser

**Heading:** If someone handed you a scorecard

A short paragraph, then `/evaluate`.

Before you sit through five vendor demos, write down what you actually need: hybrid, a human on the loop, RCA that includes change, a refuse path, an audit trail. We put Aiden against that list.

### 3.11 Final CTA

**Heading:** See a diff, a refusal, and an incident timeline

**Body:** Thirty minutes. Bring a real service if you can.

**CTA:** Schedule demo

---

## 4. `/product`

**H1:** Aiden, the Agentic OS for DevOps

**Sub:** StackGen builds Aiden. Platform engineers, developers, and SRE teams use it to build, operate, watch, and heal production across clouds, for apps and for agents, with policy on the path.

Then the graph (OCG): topology, change attribution, drift, incident causality, observability correlations. Then the four surfaces as a loop, not a logo farm. Then factory process as the operating cadence (Intent → Spec → Runtime → Learning). Then the two-plane note (deterministic change vs agentic action) **only if** Product PRFAQ has landed. Until then, skip invented OS modules.

Contrast, unnamed first: coding agents that stop at the PR, ops tools that only talk, a hyperscaler agent that assumes one cloud. Named cuts stay the locked lines (Harness, AWS DevOps Agent, HashiCorp, Resolve, Traversal) and always say the mechanism, never "we replace them."

---

## 5. Use cases

Each page: a situation, what Aiden does, where to click in the product, demo.

### Reliability · `/use-cases/reliability`

**H1:** SRE practice without a hiring cliff

You can wait until you staff a classic SRE org, or you can put bounded plays in production: detect, name the change, remediate inside policy, verify. Humans keep the novel cases.

CTA: Schedule demo · See Aiden for SRE

### Governed change · `/use-cases/governed-change`

**H1:** Agents write faster than your change process

That is the incident sitting in next quarter's postmortem if apply has no policy boundary. Aiden takes intent to a reviewable spec, checks it, applies or refuses.

CTA: Aiden for Infrastructure

### What changed · `/use-cases/signal-and-rca`

**H1:** Start the incident from the change, not the dashboard

Correlation across metrics, logs, and traces is table stakes. The missing piece on most stacks is "what moved." OCG holds that. Observability hands off to SRE on the same graph.

CTA: Aiden for Observability · Aiden for SRE

### Gated delivery · `/use-cases/policy-checked-delivery`

**H1:** The pipeline can stop itself

Commit, test, OCG check, gate, deploy, watch. If the gate fails, you still have a diff.

CTA: Aiden for Automation

---

## 6. Who it's for

### `/for/platform`

You are the champion. You will be asked why this is not "one more agent." Answer: because the graph and the policy plane span infra, delivery, observe, and remediate. You keep Terraform, the clouds, and the ticketing you already have.

### `/for/sre`

You will be on the hook at 2am either way. The useful demo is: alert → change correlation → cause → proposed act → allow or refuse → verify. If that sequence is not on the screen, leave.

### `/for/infrastructure-operations` (I&O evaluator)

**H1:** What to require before you buy another ops agent

You have been told to look at AI SRE tooling. Fine. Most of that market is still the night shift. If the goal is reliability, the list is shorter than the vendor table.

Write the requirements as a table (plain rows, not marketing pillars):

| You should require | What Aiden does | Where to look |
|---|---|---|
| A human can stop or approve the act | Bounded autonomy. Refuse at policy. | SRE product, this FAQ |
| Hybrid: more than one public cloud, plus on-prem if you have it | SaaS default. On-prem / air-gap when required. | Security |
| RCA includes what changed | Operational Context Graph: change, drift, incident | Product, Observability, SRE |
| Remediation can apply and then verify | SRE ladder plus Automation gates | SRE, Automation |
| Work toward SLOs, not only ticket age | Heal inside the SLO you set. We do not pretend to ship composite-SLO product depth we have not built. | SRE |
| Shared context so people stop click-ops | OCG | Product |
| An interface agents already speak | MCP, plus the integrations grid | MCP |
| A trail after the fact | Policy evaluation at the boundary | Security |

Do not fill rows for capacity planning, autonomous app debugging, chaos injection, or "agent reliability testing" as a product.

**FAQ on this page** (answers name a mechanism):

1. We already pay for observability and ITSM. Why add this?  
   Keep them. Aiden is the path that uses that context when something has to change.

2. Will it act while we sleep?  
   Inside the policy you wrote. Outside that, it stops and hands you the context.

3. Single cloud only?  
   No. If your estate is hybrid, that is a requirement, not a roadmap slide.

4. How do we know the agent was wrong?  
   You reconstruct the action and the policy decision. RCA starts from the change.

5. We don't have twenty SREs.  
   Start with a small set of bounded plays. Reliability goals first. Tool count later.

6. How is this different from Harness or a cloud vendor's agent?  
   Full loop, your clouds, policy on apply. Not AI glued onto the pipeline you already have. Not an agent that assumes one account.

CTA: Schedule demo · Aiden for SRE

### `/for/security`

HITL, audit, hybrid, badges, what we do not send to a model. Boring on purpose.

---

## 7. `/evaluate`

Same scorecard as I&O, slightly shorter, meant to print or paste into a doc. Title: `Aiden evaluation notes`. Sub: Bring this to the demo. We will walk a diff, a refusal, and a timeline.

---

## 8. Product SKU pages (names unchanged)

Keep **Aiden for Infrastructure / Automation / Observability / SRE**. These are depth, not the sitemap's first idea.

**SRE page** is the dense one: the six-step ladder (watch → change correlation → cause → remediate → deploy → verify), the refusal callout, SLO line, greytHR if the story fits, link to `/evaluate`.

Infra: 4× only if Product still stands behind it, with a mechanism line. Never 10× on this track.

Observability: greytHR story lives here too. "What changed" is the extra sentence.

Automation: the gate is the point.

Each SKU ends with "Part of Aiden" → `/product` and the other three names.

---

## 9. Other routes

`/customers`, `/customers/greythr`, `/schedule-demo`, `/mcp`, `/security`, `/about` as in the framework. Pricing stays "platform fee plus usage" until finance publishes numbers. Demo form is the conversion.

---

## 10. Visual (only what copy depends on)

Precise, engineered, one accent. Product windows un-chromed. Nav is a real bar, not a floating island that hides the IA. Motion: reveal on scroll, reduced-motion shows the final state. Do not decorate emptiness with three equal feature columns on Home. The jobs switcher is the interactive object.

---

## 11. Copy QA (run on every page before review)

- [ ] Read the page aloud. If you hear a keynote, cut.
- [ ] Search: em dash, Olly, seamless, unlock, leverage, landscape, robust, "it's not", "not only", "serves as", "stands as", "in today's", "delve"
- [ ] Any trio of sibling sentences with the same rhythm? Break one.
- [ ] Metric without a mechanism? Remove the number or add the mechanism.
- [ ] Quote unpublished? Label PLACEHOLDER or delete.
- [ ] Gartner inclusion? Delete.
- [ ] Heading in Title Case? Make it sentence case.
- [ ] Would a staff engineer paste this into the #infra channel without cringing? If no, rewrite.

---

## 12. Anti-AI pass on this spec's public copy

**Tells we caught in draft and killed:** "It's not an incident bot, it's an OS." Hero that named factory + OS + four products. Matching three-line persona cards. "Unlock SRE." Gartner percentages on Home. 10×.

**What might still feel tight:** the scorecard table is tabular by job (I&O asked for that). The trap section is opinionated on purpose. If a line feels slogan-y in review, it is probably the H1 or the final CTA heading. Those are the only two places we allowed a clipped phrase.

---

## 13. Out of scope

Monday factory-launch mock. Live route rewrites. Pencil. A `writing-plans` migration onto `web/`. Licensed Gartner citation.

---

## 14. Review

This is the design. Framework stays the north star. This file is the copy and page map.

If you want a change to the H1, pick **Keep agent-driven change inside policy** (recommended) or **Autonomy at the pace of confidence**. Do not ship both.

After you approve this design, next is `writing-plans` for a **new-route slice** (`/evaluate`, `/for/infrastructure-operations`, use-case stubs) that does not touch Monday Home. Say if you want that plan.
