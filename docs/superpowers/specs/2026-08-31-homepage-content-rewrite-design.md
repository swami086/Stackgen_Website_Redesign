# Homepage content rewrite — design (Semrush × skeleton)

**Status:** **Implemented** (Tasks 1–4 complete; working tree)  
**Hero H1 (v2):** Take control of production change  


---

## 1. Context (explored)

### Torbit skeleton (`HomeReplica.tsx` on `homepage-p0`)

Current order — **no Problem / Solution components exist**:

```
Nav → Hero → Video → Logos → Assemblies → Shell → WhoItsFor → Footer
```

| Slot | Component | Content keys today (`replica.ts`) | Visual job |
|------|-----------|-----------------------------------|------------|
| Nav | `ReplicaNav` | links[], cta | Chrome + Schedule demo |
| Hero | `ReplicaHero` | heading, sub, primaryCta, secondaryCta | First viewport |
| Video | `ReplicaVideo` | label | Media / tour |
| Logos | `ReplicaLogos` | eyebrow, items[] | Trust |
| Assemblies | `ReplicaAssemblies` | heading only | Diagrams: InnerOuterLoop, Offerings, Integrations |
| Shell | `ReplicaShell` | eyebrow, heading, body1, body2 | OCG diagram |
| WhoItsFor | `ReplicaWhoItsFor` | eyebrow, heading, sub, pillars[4], roles[4], osTitle, osChips | Product portraits + role dock |
| Footer | `ReplicaFooter` | ctaHeading, ctaSub, cta, brand, columns | Close + links |

**Content SoT today:** `web/content/replica.ts` (ADF-led H1, Schedule demo primary).

### Locked product decisions (carry forward)

- Primary CTA → **Aiden for SRE**  
- ADF **below the fold** (not hero H1)  
- Hybrid narrative intent: Problem grit + Control Plane  
- Logos only (no public metrics)  
- Pillar deep-links → on-page anchors for now  

### Fresh Semrush (US, 2026-08-31 re-pull)

| Keyword | Vol | Homepage role |
|---------|-----|----------------|
| AIOps tools / platform | 1900 / 1600 | **Do not** self-describe as AIOps |
| observability platform | 1300 | Observe pillar language only |
| policy as code | 1000 | Solution / Change — weave once |
| AI SRE | 480 ↑ | Product wedge + natural reinforce |
| platform engineering tools | 480 | Assemblies / Platform role |
| SRE agent | 320 | Careful — competitor category |
| AI incident response | 260 | Problem / Decide |
| terraform drift detection | 210 | Problem / Change |
| AI remediation | 170 | Solution |
| agentic DevOps | 140 | Light; not H1 |
| MTTR reduction | 110 | Concept only — no numbers |

**Domain:** stackgen.com ~298 organic visits / 347 KW; ~**70%** homepage organic is brand `stackgen`. Mid-funnel lives on **blog** (AI SRE tools #4, IaC best practices #8, MCP for platform eng).

**Implication:** Rewrite for **conversion of branded + warm traffic**, with semantic vocabulary that confirms “AI SRE / governed change,” not for ranking the homepage as AIOps.

---

## 2. Three approaches (how to fit the skeleton)

### Approach A — Remap only (zero new sections)

Stuff Problem → Solution → See/Decide/Change into existing slots:

| Narrative beat | Forced into |
|----------------|-------------|
| Problem | Hero sub + Assemblies heading (awkward) |
| Solution + demo | Video label + Shell |
| Products | WhoItsFor |
| ADF | Assemblies heading |

**Pros:** Fastest; only `replica.ts` (+ CTA hrefs).  
**Cons:** Hybrid A+C collapses; diagrams don’t read as “Problem”; weakest Sourcegraph parallel.

### Approach B — Dual-duty remap (recommended if no new UI this sprint)

Keep **exact** section components; assign narrative jobs honestly:

| Section | New narrative job |
|---------|-------------------|
| Hero | SRE control job + CTA → Aiden for SRE |
| Video | **Solution demo** (before/after asset; label = Solution caption) |
| Logos | Trust (no AI Ops wording) |
| Assemblies | **How it works / ADF** (mechanism diagrams — below fold) |
| Shell | **OCG** = shared memory proof |
| WhoItsFor | **See / Decide / Change** via four product portraits (relabel Build→… or keep labels, rewrite bodies) |
| Footer | SRE close + Schedule demo secondary |

**Problem beat:** 5 symptoms live as a **copy band inside Hero below sub** *or* as `assemblies` intro body (requires extending Assemblies content keys slightly — still one section).

**Pros:** Fits skeleton; demo uses Video; Semrush-aligned vocabulary.  
**Cons:** Problem is compressed (not a full labeled Sourcegraph “The problem” section).

### Approach C — Extend skeleton — **LOCKED**

Target order (Video absorbed into Solution):

```
Nav → Hero → Logos → Problem → Solution (+ demo media) → Assemblies → Shell → WhoItsFor → Footer
```

**New files (planned):** `sections/Problem.tsx`, expand Video into Solution or `sections/Solution.tsx` wrapping demo.  
**Pros:** True Sourcegraph spine; matches hybrid A+C.  
**Cons:** New components + Pencil ids + tests.

Approaches A/B retained above for history only.

---

## 3. Full rewrite — content pack v2 (Sourcegraph tone × Semrush traffic)

**Status of copy:** v2 supersedes prior §3 strings. Written for Approach C. Humanized against AI-tell patterns; mirrored to [sourcegraph.com](https://sourcegraph.com/) cadence.

### 3a. Step research summary

**Skills used:** `humanizer` · `copywriting` · `seo-content-brief` · catalog `landing-page-copywriter` / `seo-content` · Semrush MCP · PRFAQ + AIOS vision docs.

**Sourcegraph tone rules (borrow):**
- Control-verb H1 ("Take control…")
- Labeled beats: **The problem** / **The solution**
- Short stakes H2 + concrete mechanism body
- One bold punchline that closes the problem
- Solution claim that names the *same task, different outcome*
- Verb pillars after proof: **Understand. Oversee. Evolve.** → our **See. Decide. Change.**
- Concrete demo (missed work vs complete work) — not abstract adjectives
- Almost no em dashes; no "so you can…" softener chains

**PRFAQ / AIOS anchors (externalize carefully):**
- Code ships faster than ops can run it reliably
- Excellent siloed tools; failure in the *gap*; architecture problem
- War room / 200 runbooks / deploy on drift / AI SRE without infra+deploy memory
- OCG remembers; agents without shared memory do not
- Grounded · governed · useful (AIOS) — policy before action, approval for high risk
- Public names only: Infrastructure / Automation / Observability / SRE (not DevOps/InfraOps)

**Semrush traffic map (US, re-pulled this pass):**

| Term | Vol | Where it earns traffic without fighting wrong SERP |
|------|-----|-----------------------------------------------------|
| site reliability engineering | 2,400 | Hero sub / Who-it's-for (category language) |
| AIOps platform / tools | 1,600 / 1,900 | **Do not** self-label homepage AIOps |
| cloud governance | 1,300 | Change pillar / Assemblies learn-more |
| observability platform | 1,300 | See pillar only |
| policy as code | 1,000 | Solution body once |
| AI SRE | 480 ↑ | Hero CTA product + Problem/Solution natural use |
| platform engineering tools | 480 | Assemblies / Platform role |
| AI site reliability engineer | 320 | Who-it's-for |
| SRE agent | 320 | Avoid as our brand; competitor heat |
| AI incident response | 260 | Problem / Decide |
| change failure rate / MTTR | 260 / 260 | Concept only — **no numbers** on home |
| terraform drift detection | 210 | Problem symptoms / Change |
| SRE tools | 210 | Blog link (already ranks) |
| AI remediation | 170 | Solution |

Homepage still converts mostly branded visits; traffic-attracting copy = **search-recognizable phrases in human sentences** + internal links to ranking blogs — not stuffing AIOps.

### 3b. Spec self-review (v2)

| Check | Result |
|-------|--------|
| AI tells removed | Soft "so you…" / stacked em dashes / catalog filler cut |
| Sourcegraph parallel | Control H1, labeled Problem/Solution, punchline, same-task demo, verb pillars |
| Traffic | AI SRE + site reliability + policy as code + drift + incident language placed once each where natural |
| Claims | No public MTTR/%; PRFAQ metrics stay parked |
| Naming | PRODUCT.md public names only |

---

### 3c. Content strings (replace `replica.ts` + new sections)

### Nav
| Field | Copy |
|-------|------|
| links | Products `#who` · Platform `#ocg` · Case Studies `/case-studies` · Company `#` · Docs `/docs` |
| cta.label | Schedule a demo |
| cta.href | `/schedule-demo` |

### Hero
| Field | Copy |
|-------|------|
| heading | Take control of production change |
| sub | Aiden for SRE gives site reliability teams shared context across deploys, drift, and alerts — so AI incident response starts with what changed. |
| primaryCta | See Aiden for SRE |
| primaryHref | `/product/aiden-for-sre` |
| secondaryCta | How it works |
| secondaryHref | `#assemblies` |

*Traffic notes:* H1 mirrors Sourcegraph "Take control…". Sub carries **site reliability** + **AI incident response** + **drift** without naming AIOps.

### Logos
| Field | Copy |
|-------|------|
| eyebrow | Trusted by teams running production |
| items | unchanged |

### Problem (`#problem`)
| Field | Copy |
|-------|------|
| eyebrow | The problem |
| heading | Software is shipping faster than ops can keep up. |
| body | AI made code cheap. Delivery and reliability did not keep pace. Observability, deploy, and infrastructure each know something the others never see. Agents rebuild that picture every page. |
| punchline | **This is where teams lose control of production.** |
| symptoms | Alert with no deploy or drift attached · AI remediation that cannot land a policy-checked change · First 90 minutes of a P1 is a war room · Deploy lands on unchecked infrastructure drift · 200 runbooks — maybe 30 still true |
| learnMore | SRE tools compared → blog top AI SRE tools |

*PRFAQ parallel to Sourcegraph "tidal wave":* creation velocity vs ops lag. Punchline mirrors "This is where engineering teams lose control."

### Solution (`#solution`)
| Field | Copy |
|-------|------|
| eyebrow | The solution |
| heading | Take back control with shared operational context |
| body | StackGen indexes change across infra, deploy, and signals in an Operational Context Graph. Aiden acts under policy as code — with approval when the risk warrants it. |
| claim | **Same incident. Completely different outcome.** |
| demoLabelLeft | Without shared context |
| demoLabelRight | With Aiden for SRE |
| demoCaption | Generic AI SRE guesswork vs context-backed remediation under policy. |
| mediaNote | Real product footage (path TBD) |

*Sourcegraph parallel:* "Take back control…" + "Execute the same task with dramatically different results."

### Assemblies (`#assemblies`)
| Field | Copy |
|-------|------|
| eyebrow | How it works |
| heading | The Autonomous DevOps Factory |
| body | State the outcome. Get a Factory Spec. Run it. Learn back into the graph. Platform engineering teams keep build, operate, observe, and remediate on one governed path. |
| learnMore | Platform engineering + MCP → ranking blog |

*ADF as H2 here is intentional (below fold). Eyebrow stays "How it works" so Factory is mechanism, not identity.*

### Shell (`#ocg`)
| Field | Copy |
|-------|------|
| eyebrow | OPERATIONAL CONTEXT GRAPH |
| heading | One timeline for what changed |
| body1 | Deploys, dependencies, and drift in the same place an incident starts. |
| body2 | Root cause without the archaeology dig. |

### WhoItsFor (`#who`) — See. Decide. Change.
| Field | Copy |
|-------|------|
| eyebrow | See. Decide. Change. |
| heading | The platform for site reliability work that still has to ship |
| sub | Four Aiden products. One context layer for SRE, platform, and security. |
| pillars[0] | **Change** · Aiden for Infrastructure · Terraform drift detection and governed infra change in your Git. · `#build` |
| pillars[1] | **Change** · Aiden for Automation · Deploys and toil that verify themselves under policy. · `#operate` |
| pillars[2] | **See** · Aiden for Observability · An observability layer that already knows what deployed. · `#observe` |
| pillars[3] | **Decide** · Aiden for SRE · AI SRE that opens with deploy and drift attached. · `/product/aiden-for-sre` |
| roles | SRE · Platform · Developers · DevSecOps (keep short job lines from prior pack) |
| osTitle | Aiden OS |
| osChips | Governance · Guardrails · Identity · Audit · Integrations · Policies |

*Sourcegraph parallel:* verb pillars after solution proof. Traffic: **AI SRE**, **observability**, **terraform drift**, **site reliability** once each across cards.

### Footer
| Field | Copy |
|-------|------|
| ctaHeading | Take control of production change |
| ctaSub | See Aiden for SRE — context, policy, and approval on your stack. |
| cta | See Aiden for SRE |
| ctaHref | `/product/aiden-for-sre` |
| brand | Grounded. Governed. Useful. |

### FAQ (optional, differentiation only — not definition SERPs)
1. Does Aiden change production, or only suggest?  
2. Do changes land in our Git?  
3. How does this sit next to the tools we already run?  
4. What stops a bad agent action?

### Do not
- Call the homepage an AIOps platform  
- Publish MTTR / CFR numbers  
- Restore ADF as hero H1  
- Write "What is AI SRE" on home (blog owns that SERP fight)

---

## 4. Implementation notes (after content-pack approval)

1. Extend `web/content/replica.ts` with `problem` + `solution` keys; rewrite all existing strings per §3.  
2. Add `Problem.tsx` + `Solution.tsx` (Solution wraps/replaces early `ReplicaVideo`).  
3. Reorder `HomeReplica.tsx` to locked C order.  
4. CTAs + blog internal links; Soft Structuralism tokens only.  
5. Tests: hero H1, primary CTA href, Problem/Solution mount order.  
6. Sync `.agents/product-marketing.md` hero pattern (ADF demoted).  
7. Pencil frame ids: invent or map in plan if canvas lacks Problem/Solution frames.

---

## 5. Approval gate

**Approach C + content pack v2: APPROVED (user 2026-08-31).**  
Implementation plan: `docs/superpowers/plans/2026-08-31-homepage-approach-c-content-rewrite.md`.
