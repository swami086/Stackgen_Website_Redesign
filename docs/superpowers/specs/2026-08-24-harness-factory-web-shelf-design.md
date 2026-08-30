# Harness/Factory-inspired web shelf — Pencil design spec (v2)

**Date:** 2026-08-24  
**Status:** Built 2026-08-24 — refined v2 with customer logos, integration icons, double-bezel panels  
**Skills:** using-superpowers, brainstorming, firecrawl-cli, Pencil MCP  
**Sources:** `StackGen-ADF-PRFAQ-Draft.md`, `AIOS - Product Features.md`, deck frames on `Stack_Linear.pen`

---

## 0. Product hierarchy (non-negotiable)

```
StackGen
└── Autonomous DevOps Factory (ADF)          ← category / what we sell
    ├── Intent → Factory Spec → Runtime → Learning   ← customer factory model (PRFAQ)
    ├── Factory assemblies (domain apps)     ← what runs inside the factory
    │   ├── Aiden for DevOps      (GA)
    │   ├── Aiden for SRE         (GA)
    │   └── Aiden for InfraOps    (Early access)
    └── Aiden Agentic Operating System       ← platform substrate (AIOS external name)
        ├── Persona agents · Skills/workflows · Activity/replay
        ├── Policy engine · Identity/approval boundaries
        ├── Context Graph (OCG)              ← capability, NOT a product SKU
        ├── Knowledge Hub · AppStacks · Memory/learning
        └── Cost governance · Model routing · Deterministic execution
```

**Never on the website:**
- OCG / Context Graph as a nav item or peer to assemblies
- "AI SRE tooling" as company category
- AIOS as customer-facing name (use **Aiden Agentic Operating System** or **Aiden OS**)
- Conflating the **ADF four-step model** with the **Aiden OS execution loop** (different diagrams, different pages)

---

## 1. What each selected diagram communicates

Read via Pencil MCP on `Stack_Linear.pen`. These are the **semantic source of truth** for web copy and ds-* rebuilds.

### `tPSo3` — Today, DevOps is fundamentally disjointed

**Story beat:** Problem — architecture, not tools.

| Visual element | Meaning |
|---|---|
| Left stack: SRE Incident · Infra Provision · Cloud Change · Security Incident | Disconnected event types, no shared thread |
| Center: Ops Teams (DevOps, SecOps, SRE, FinOps) | Siloed human teams, each owns a slice |
| Right: Context Needed (Code, Cloud Architecture, Security Policies, CI/CD, Governance, Processes) | Every handoff loses context; teams hunt for facts |
| Footer | *"Multiple human teams each have to sign off on any change."* |

**Web copy job:** PRFAQ problem section — *"failure happens in the gap"* between excellent tools that share no context.

---

### `D9SFJ` / `b0PA3` — DevOps Flow Today with Humans

**Story beat:** Today-state — humans everywhere.

| Visual element | Meaning |
|---|---|
| App Devs → **Policies** cylinder → **Goals** | Intent exists but stops at human-readable goals, not executable factory spec |
| Data sources (Code/IaC/K8, Observability, Cloud, CI/CD) | Same signals exist today — they are not connected |
| **CloudOps and DevOps Teams** banner: DevEx · SREs · Networking · Security · CI/CD · FinOps | Seven human roles in the path |
| Change Management (side bar) | Gating is manual and slow |
| Feedback: Changes→Code/IaC · Actions→Cloud+CI/CD | Loops exist but are human-mediated |

**Web copy job:** *Supervised execution* — babysitting pipelines, 14 approval steps, 90-minute war rooms.

---

### `IPyqX` — DevOps Factory of the Future

**Story beat:** Future-state — factory replaces team sprawl.

| Visual element | Meaning |
|---|---|
| Agents + App Devs → **Specs** (Engineering Specs, Security policies, Costs guardrails, SLAs & Decisions) → **Intent** | Intent becomes reviewable, version-controlled **Factory Spec** |
| Data sources → **Aiden OS shell** | Operational data feeds the platform, not individual tools |
| Inside OS: InfraOps · DevOps · SRE + Custom Agents | **Assemblies live inside Aiden OS** |
| OS bar: **Aiden Agentic Operating System** | Platform label — substrate, not the factory name |
| Change Management + feedback loops | Automated apply path with write-back |

**Web copy job:** Primary **solution diagram** on Home + Product. This is the "after" to `D9SFJ`'s "before."

---

### `zbLoF` — Aiden OS as your composable DevOps factory

**Story beat:** How the OS executes — platform mechanics.

| Visual element | Meaning |
|---|---|
| Intent → Agents → Model Router → **Gated Execution** | Probabilistic agents, deterministic gate at apply (AIOS Policy Engine) |
| **DevOps Context Graph** subgraph: Memory · Workflows+Policies · Cloud Data · Integration Data · **Learnings Ingestion Loop** → Outcome | Context Graph accumulates; factory learning writes back |
| Title | OS is the **composable execution layer** for any factory assembly |

**Web copy job:** Platform page hero diagram. Pair with AIOS: *"A prompt can suggest safe behavior. An enforceable policy can require it."*

**Not the same as ADF Step 1–4.** ADF steps are customer-facing factory lifecycle; this loop is internal OS execution.

---

### `eMFrp` — The DevOps Context Graph

**Story beat:** What Context Graph holds — structured + unstructured operational knowledge.

| Layer | Nodes |
|---|---|
| **Structured** | Services (hub) ↔ Code · IaC · Policies · Owners · Cloud Assets · CI/CD pipelines · Artifacts · Observability |
| **Unstructured** | Natural Language Docs · Runbooks · Decisions · Exception Approvals |

**Web copy job:** Platform page **detail section** under "Context Graph" capability tile. Label: *"Relationship-aware context inside Aiden OS"* — maps to PRFAQ Q5 OCG bullets and AIOS Context Graph section.

---

### `IbrlZ` — Context Graph: Unified Across Apps

**Story beat:** Context Graph is the **connective tissue between assemblies**, not a fourth app.

| Assembly | Connected via Context Graph |
|---|---|
| **Aiden for SRE** | Incident · Observability · Self-healing & Triage |
| **Aiden for DevOps** | Human · Ticket · CI/CD Configs · Provisioning & Updates |
| **Aiden for InfraOps** | Compliant Provisioning · Remediation Learning |
| Shared | CI/CD Relationship · Service Catalogue |

**Web copy job:** Product page or Platform page — shows **why a factory beats point agents**: assemblies share one graph. One line: *"Aiden for SRE enters every incident already knowing what deployed eight minutes before the alert."* (PRFAQ)

---

### `VkeZ8` — Infrastructure Lifecycle with Agents

**Story beat:** InfraOps assembly domain loop.

| Phase | Steps |
|---|---|
| Trigger | Infra and App Changes |
| Provision | Intent-to-Infra → Compliance Checks and Guardrails → Automated Deployment and Rollback |
| Runtime | Cloud Environment (AWS · Azure · GCP) → Production Data & Monitoring |
| Agent work | Optimization · Governance · Self Healing (6 agents) |
| Loop | Circular — continuous lifecycle |

**Web copy job:** **Aiden for InfraOps** product page primary diagram. Pair with AIOS AppStacks: *"AIOS governs how an agent acts. AppStacks govern what infrastructure the agent is allowed to create."*

---

## 2. Narrative arc across the website (diagram order)

```
Home
  tPSo3  Problem (disjointed)
  D9SFJ  Today (humans in the loop)     ─┐
  IPyqX  Future (factory + OS)            ├ before / after pair
                                          ┘
  Video  Product tour
  3 assembly cards (inside OS mental model)

Product (ADF)
  Hero copy: intent-based factory generation
  IPyqX  Factory of the Future (full)
  ADF 4-step: Intent → Spec → Runtime → Learning
  IbrlZ  Unified across apps (why shared context matters)

Platform (Aiden OS)
  zbLoF  Composable factory loop
  eMFrp  Context Graph anatomy
  AIOS capability grid (Persona · Skills · Policy · AppStacks · etc.)

Aiden for DevOps / SRE / InfraOps
  Outcome H1 per assembly
  Domain diagram (DevOps: today→future; SRE: investigation; InfraOps: VkeZ8)
  Agent chips from PRFAQ appendices
```

---

## 3. Messaging spine (PRFAQ + AIOS aligned)

### Category & hero

| Element | Copy |
|---|---|
| Eyebrow | `Autonomous DevOps Factory` |
| **H1 (primary)** | **Describe the outcome. ADF builds the factory.** |
| Sub | Engineering teams state the operational problem in plain language. ADF assembles agents, defines the Factory Spec, and runs it — with governance on the apply path. |
| Alt H1 (problem-led fold) | **Code ships faster than ops can keep up** |
| Primary CTA | Schedule demo |
| Secondary CTA | How ADF works → Product |

*Replaces greenfield-only H1 "Keep agent-driven change inside policy" — policy belongs in Platform/Aiden OS copy, not category hero.*

### One-liners per page (H1)

| Page | H1 | PRFAQ / diagram anchor |
|---|---|---|
| Home | Describe the outcome. ADF builds the factory. | Press release lead |
| Product | From intent to a running factory | Steps 1–4 + `IPyqX` |
| DevOps | Deployments that verify themselves | Example Flow 2 + assembly GA |
| SRE | Incidents that already know what changed | Q4 infra root cause + `IbrlZ` |
| InfraOps | Infrastructure that provisions, governs, and heals | `VkeZ8` + Early access |
| Platform | The operating system for governed agents | AIOS lead + `zbLoF` |

### Voice rules (from PRFAQ + greenfield bans)

- **Factory** produces outcomes; **copilots** assist — use this distinction on Product page
- Metrics labeled **committed targets**, not "customers report"
- No em dash, no unlock/seamless/leverage, no "AI SRE" as category
- **Harness/GitLab** = delivery complement (Q3), not competitor kill-shot on Home
- External: **Aiden OS** never **AIOS**

### Target metrics band (Home footer)

| Target | Label |
|---|---|
| P1 resolution | Under 15 minutes (infrastructure-correlated) |
| Change failure rate | Under 3% |
| On-call toil | Less than half prior baseline |

---

## 4. User decisions (locked)

| Decision | Choice |
|---|---|
| Visual ground | Light + Dark pairs, `$ds-*` tokens |
| Hero video | Center below headline, 16:9 play pill |
| Scope | 6 pages × 2 themes = 12 frames |
| Naming | PRFAQ: DevOps / SRE / InfraOps |
| Diagrams | ds-* rebuilds of frames above — deck lavender = reference only |

---

## 5. Page specs (v2)

### 5.1 Home — `Web Shelf — Home`

| # | Section | Diagram / visual | Copy |
|---|---|---|---|
| 1 | Nav | Replica nav | Product · Platform · Customers · Resources · Schedule demo |
| 2 | Hero | — | Eyebrow + H1 + sub (§3) + CTAs |
| 3 | Video | 16:9 placeholder | Product tour · ~3 min |
| 4 | Logos | Trust band | Quiet — no count-brag |
| 5 | Problem | **ds-* `tPSo3`** | H2: **DevOps is fundamentally disjointed** · sub: multiple teams, context lost at every handoff |
| 6 | Before / After | **ds-* `D9SFJ` → `IPyqX` side by side or stacked** | Labels: *Today: humans in the loop* / *Future: factory inside Aiden OS* |
| 7 | Assemblies | 3 cards nested under OS visual | DevOps (GA) · SRE (GA) · InfraOps (Early access) — one outcome line each |
| 8 | Why factory | 4 bullets, no diagram | Deployments self-check · Incidents prevented · Runbooks execute · Factory learns (PRFAQ §Why a Factory) |
| 9 | Targets | 3 stat tiles | §3 metrics, "committed target" label |
| 10 | CTA | Footer | Schedule demo |

---

### 5.2 Product — `Web Shelf — Product (ADF)`

| Section | Diagram | Copy |
|---|---|---|
| Hero | **`IPyqX`** full width | H1: **From intent to a running factory** |
| ADF four steps | Horizontal stepper | Intent → Factory Spec → Factory Runtime → Factory Learning (PRFAQ §How ADF Works) |
| Intent example | Quote block | One PRFAQ intent example (deployments or on-call) — 2 sentences max |
| Unified context | **`IbrlZ`** ds-* rebuild | H2: **One graph connects every assembly** · sub: cross-domain handoffs stop losing context |
| Assemblies | 3 lanes under OS bar | Agent chips per PRFAQ appendices |
| vs delivery platforms | Text only | Harness/GitLab ship code. ADF runs what ships. (Q3 — one paragraph) |
| CTA | — | Schedule demo · stackgen.com/adf |

---

### 5.3 Aiden for DevOps

| Section | Diagram | Copy |
|---|---|---|
| Hero + video | UI / tour placeholder | H1: **Deployments that verify themselves** |
| Before → After | **`D9SFJ` fragment + `IPyqX` DevOps lane** | Senior engineers stop babysitting pipelines |
| Agents | 6 chips | PRFAQ Appendix D Example 2 |
| Targets | 2 tiles | CFR under 3% · deploy watch time eliminated |
| CTA | — | Schedule demo |

---

### 5.4 Aiden for SRE

| Section | Diagram | Copy |
|---|---|---|
| Hero | — | H1: **Incidents that already know what changed** |
| Unified investigation | **`IbrlZ` SRE column + center graph** | Infra root cause loaded before triage starts (Q4) |
| Agents | 6 chips | PRFAQ Q7 / Appendix C |
| Prevention | Text | Factory prevents collisions deployment × drift — not just faster RCA |
| Targets | 1 tile | P1 under 15 min (infra-correlated, target) |
| CTA | — | Schedule demo |

---

### 5.5 Aiden for InfraOps

| Section | Diagram | Copy |
|---|---|---|
| Hero | Early access badge | H1: **Infrastructure that provisions, governs, and heals** |
| Lifecycle | **`VkeZ8`** ds-* rebuild | Full circular lifecycle |
| AppStacks | Text callout | Governed IaC modules — AIOS/AppStacks one-liner |
| Agents | 6 tiles | Optimization · Governance · Self Healing grid from diagram |
| CTA | — | Join early access |

---

### 5.6 Platform — `Web Shelf — Platform (Aiden OS)`

| Section | Diagram | Copy |
|---|---|---|
| Hero | **`zbLoF`** ds-* rebuild | H1: **The operating system for governed agents** · sub: grounded, governed, useful where work happens (AIOS) |
| Execution loop | Intent → Agents → Model Router → Gated Execution | Policy at apply — not in the prompt |
| Context Graph | **`eMFrp`** ds-* rebuild | H2: **Context Graph** · structured + unstructured layers · *inside Aiden OS* |
| Capability grid | 2×3 tiles | Persona agents · Skills/workflows · Activity/replay · Policy · Knowledge Hub · AppStacks |
| Substrate | Chip row | Temporal · NATS · OPA · Model routing · Cost governance |
| OS shell | **`IPyqX` OS box crop** | Assemblies run on this substrate |
| CTA | — | Schedule demo |

---

## 6. Canvas plan

Web Shelf column on `Stack_Linear.pen`. Do not edit deck reference frames or `nwYaY`.

**Layout (2026-08-24):** Two columns, light left / dark right, 320px gutter. Vertical gap 240px between rows (no overlap — frames are 1k–4.2k tall).

| Column | X | Header |
|---|---|---|
| Light | `92000` | `WEB SHELF · LIGHT` |
| Dark | `93760` | `WEB SHELF · DARK` |

| Row | Y | Light ID | Dark ID |
|---|---|---|---|
| Home | `0` | `IURWh` | `CYfSl` |
| Product | `4509` | `JBK8u` | `f4FhS` |
| DevOps | `8915` | `ZGktc` | `e9vrj` |
| SRE | `11007` | `EyhMf` | `cbriC` |
| InfraOps | `12721` | `Jscqr` | `m6Z6Wf` |
| Platform | `14028` | `A1fzB` | `rMkSc` |

Removed empty duplicate frame `Fhn4E` (was stacked on `IURWh` at same origin).

**Theme fix (2026-08-24):** Panels `Y1SFLy` (Problem) and `kaoEO` (Final CTA) on light Home had explicit `theme.mode: dark` — removed so they inherit parent light theme. Refinement: Phosphor icon shells on problem diagram, eyebrow tags, light Before/After + CTA surfaces.

### Problem-section flow rebuild (`tPSo3` fidelity)

The web-shelf problem diagram had three columns but no connectors, so it never showed *how* the handoff breaks. Rebuilt on both themes (`VYrqA` light / `oMf3p` dark):

| Element | Detail |
|---|---|
| Column caps | `CHANGE EVENTS` (left) mirrors existing `CONTEXT NEEDED` (right) |
| Events | 4 pills — added `Security Incident` to match `tPSo3` |
| Connector A | cap `HANDOFF` · dashed line + `arrow-right` · break badge `link-break` + "context lost" in `$ds-halt` |
| Bottleneck | `Ops Teams` wrapped in double-bezel shell; sub `Siloed · DevOps · SecOps · SRE · FinOps` (from `tPSo3` `g369R`) |
| Connector B | cap `MANUAL LOOKUP` · dashed line + `arrows-left-right` · badge "6 sources" |
| Context | 6 chips — added `Cloud Arch`, `Processes` to match `tPSo3` |

### Elevation ramp (normalized across both themes)

Light and dark had drifted onto different ramps, causing collisions (light outer shell equalled page bg; dark bottleneck shell equalled its panel). One ramp now applies to both:

| Layer | Token | Light | Dark |
|---|---|---|---|
| Page | `$ds-bg` | `#FCFCFD` | `#0B0C0E` |
| Outer shell | `$ds-surface` | `#F4F5F7` | `#151619` |
| Inner panel | `$ds-surface-raised` | `#ECEDF0` | `#1D1F24` |
| Bottleneck shell | `$ds-surface` | `#F4F5F7` | `#151619` |
| Bottleneck core | `$ds-bg` | `#FCFCFD` | `#0B0C0E` |
| Pills / chips / badges | `$ds-bg` | `#FCFCFD` | `#0B0C0E` |
| Icon shells | `$ds-surface` | `#F4F5F7` | `#151619` |

Every adjacent pair differs in both themes. Diagram `gap: 16`, connectors `width: 140` — content 1077px inside 1108px (was overflowing at 1129px). Verified `0` layout problems; light/dark child geometry identical. Exports: `web-shelf-{IURWh,CYfSl}-v4.png`.

| Frame | Light | Dark sibling |
|---|---|---|
| Web Shelf — Home | y=0 | y=900 |
| Web Shelf — Product | y=1800 | y=2700 |
| Web Shelf — DevOps | y=3600 | y=4500 |
| Web Shelf — SRE | y=5400 | y=6300 |
| Web Shelf — InfraOps | y=7200 | y=8100 |
| Web Shelf — Platform | y=9000 | y=9900 |

Each frame: 1440 wide, `$ds-*` tokens, `theme.mode` light/dark.

---

## 7. Diagram → page map (build reference)

| Pencil ref ID | Diagram title | Used on |
|---|---|---|
| `tPSo3` | Disjointed DevOps | Home §5 |
| `D9SFJ` | Flow Today with Humans | Home §6, DevOps |
| `IPyqX` | Factory of the Future | Home §6, Product hero, Platform shell |
| `IbrlZ` | Context Graph Unified | Product, SRE |
| `zbLoF` | Aiden OS composable factory | Platform hero |
| `eMFrp` | DevOps Context Graph | Platform detail |
| `VkeZ8` | Infrastructure Lifecycle | InfraOps |

---

## 8. Acceptance checklist

- [x] Messaging matches PRFAQ hierarchy: ADF → assemblies → Aiden OS → Context Graph
- [x] Two loops not conflated: ADF 4-step (Product) vs OS execution loop (Platform)
- [x] `tPSo3`→`D9SFJ`→`IPyqX` narrative on Home before assembly cards
- [x] Context Graph only on Platform (+ unified diagram on Product/SRE as connective tissue)
- [x] All 12 frames use `$ds-*` only
- [x] Light/Dark pairs share layout
- [x] Hero video placeholder on Home
- [x] PRFAQ assembly names + GA/Early access badges
- [x] Deck lavender frames untouched (reference only)
- [x] Customer logos from `.firecrawl/logos-quotes/png/` (replica `w57DN` parity)
- [x] Integration/vendor icons from `.firecrawl/official-logos/` on Home, Product, Platform strips
- [x] Double-bezel shells on hero diagrams, context graph sections, InfraOps lifecycle, DevOps video

### Refinement pass v2 (2026-08-24 afternoon)

| Frame | Logos / icons added | Visual polish |
|---|---|---|
| Home `IURWh`/`CYfSl` | 8 customer logos + 8 integration tiles + diagram chips (Terraform, GitHub) | Video, problem, before/after double-bezel |
| Product `JBK8u`/`f4FhS` | Assembly labels (GitHub, Datadog, AWS), graph columns, lane labels (Terraform, GitHub, Datadog), integrations strip | Factory + context graph shells |
| Platform `A1fzB`/`rMkSc` | 8-tile toolchain strip, OPA substrate chip, **Aiden OS Stack** diagram (`xMLGU`/`BqOj3`) | Capability tile stroke/fill, integrations double-bezel |

### Platform Aiden OS Stack (`xMLGU` / `BqOj3`) — 2026-08-24

Replaced the simple **Execution Loop** + duplicate **OS Architecture** sections with one website-native stack diagram (reference: neon dashboard comp; rebuilt in **Soft Structuralism** `$ds-*` register per high-end-visual-design).

| Layer | Content |
|---|---|
| Header | Eyebrow `AIDEN OS STACK` · H2 *Intent routes through governed agents to outcomes* |
| Intent | Double-bezel input bar · pills `auto-route` · `world model` · `guardrails` · nested Submit CTA |
| Flow | Vertical dashed connectors + caps: `FIRST MATCH WINS` → Intent Router → `ROUTE TO ASSEMBLY` → agents → `ENRICH FROM CONTEXT` → context band → `GOVERNED BY` → OS band |
| Agent layer | **4 agents:** Infrastructure · Automation · SRE · Observability (reference naming) · cap `4 agents · first match wins` |
| Context Graph | 16 chips across 2 rows · `32 nodes · 1,354 entities` · `live sync` pill |
| Aiden OS | Governance · Guardrails · Tokenomics · Identity & Access · Audit & Evidence · Integrations · `ALWAYS ON` |
| Outcomes sidebar | Asymmetrical bento: Velocity `11 min` · Cost `$412` · Productivity `128 hrs` |

**Removed:** `TB9il` OS Architecture (redundant with stack substrate band). Exports: `platform-light-v6.png/A1fzB.png`, `platform-dark-v6.png/rMkSc.png`.

### Layer tint pass v7 (2026-08-24)

Each stack layer uses theme-aware `$ds-layer-*` token pairs (shell fill + stroke); inner cores stay `$ds-bg` for double-bezel.

| Layer | Tokens | Tone |
|---|---|---|
| Intent + Router | `$ds-layer-intent-bg` / `$ds-layer-intent-stroke` | Cool indigo-violet |
| Agent assemblies | `$ds-layer-agent-bg` / `$ds-layer-agent-stroke` | Emerald-teal |
| Context Graph | `$ds-layer-context-bg` / `$ds-layer-context-stroke` | Warm amber |
| Aiden OS substrate | `$ds-layer-os-bg` / `$ds-layer-os-stroke` | Slate structural |
| Outcomes | agent / context / `$ds-layer-prod-*` | Green · amber · rose per metric |

**Intent Router:** `alignItems: center` on main column + `alignSelf: center` on router pill. Exports: `platform-light-v7.png/A1fzB.png`, `platform-dark-v7.png/rMkSc.png`.

### Agent naming v8 (2026-08-24)

Reference-comp naming (replaces PRFAQ assemblies in the stack diagram): **Aiden for Infrastructure** · **Aiden for Automation** · **Aiden for SRE** · **Aiden for Observability** (added). Cap `4 agents · first match wins`. Applied to `A1fzB`/`rMkSc`. Exports v8.

### Architecture-forward Home variant (2026-08-24)

New landing-page variant where the Aiden OS Stack architecture is the hero visual (Mobbin refs: n8n, StackAI, Weavy — diagram-as-hero). Guided by using-superpowers (brainstorming decisions locked via Q&A) + high-end-visual-design.

| | Light | Dark |
|---|---|---|
| Frame | `L6Vdk` (x=96000) | `roTdG` (x=97760) |
| Source | copy of Home `IURWh` | copy of Home `CYfSl` |
| Architecture | copy of `xMLGU` | copy of `BqOj3` |

**Section order:** Nav → Hero → **Aiden OS Stack (architecture)** → **See it in action** (product video band, demoted from hero-adjacent) → Logos → Integrations → Problem → Before/After → Assemblies → Why Factory → Targets → Final CTA.

**Placement:** Right of the dark shelf column (shelf ends x=95200; new light 96000–97440, new dark 97760–99200 — 800px + 320px clear gaps). The originally-proposed x≈89000 lane was occupied by the deck diagrams (`eMFrp`/`IbrlZ`/`VkeZ8`, x=88162–90082), so the pair moved right to guarantee no overlap. Exports: `home-arch-light-v1.png/L6Vdk.png`, `home-arch-dark-v1.png/roTdG.png`.
| DevOps `ZGktc`/`e9vrj` | Build→GitHub, Test→Datadog, Deploy→ArgoCD | Video placeholder shell |
| SRE `EyhMf`/`cbriC` | Agent row icons (Datadog, PagerDuty, Grafana, Prometheus, Terraform, OpenTelemetry) | — |
| InfraOps `Jscqr`/`m6Z6Wf` | AWS / Azure / GCP icon tiles in lifecycle cloud box | Lifecycle diagram shell |

**Image fill counts (post-refine):** Home 18 · Product 14 · Platform 13/16 · InfraOps 3 · DevOps 3–4 · SRE 6

### Home "Who it's for" + Painpoints bands (2026-08-24)

Added two new bands to the **original** Home frames only (`IURWh` light, `CYfSl` dark — not the arch-forward variants). Guided by using-superpowers (5 build decisions locked via Q&A) + high-end-visual-design; content mapped from `StackGen-ADF-PRFAQ-Draft.md` via the value-proposition-canvas skill; layout patterns from Mobbin (ClassDojo role chips, Stripe funds-flow node graph).

**Section order (both frames):** … Problem → **Who It's For** (idx 6) → Before/After → **Painpoints** (idx 8) → Assemblies …

**Who It's For** — eyebrow `WHO IT'S FOR`, H2 "Built for the teams who run production", 5 role chips (single-bezel cards, phosphor icons in `$ds-surface-raised` tile): SRE (`heartbeat`) · Platform/DevOps (`rocket-launch`) · InfraOps (`stack`) · SecOps (`shield-check`) · Observability (`chart-line-up`).

**Painpoints** — eyebrow `WHAT WE SOLVE`, H2 "The failures happen in the gaps. We close them." Asymmetrical 2×2 bento of Double-Bezel cards, each with an embedded **signal → OCG → agent → outcome** flow (wide cards = horizontal flow, narrow = vertical). All copy present-tense/GA per user decision.

| Card | Layout | Tint | Category | Flow | Metric |
|---|---|---|---|---|---|
| RCA | wide | intent violet | ROOT CAUSE ANALYSIS | Obs/K8s/Terraform (read-only) → Context Graph → Aiden for SRE → Root cause <15 min | MTTR 4 hrs → under 15 min |
| Data exfiltration | narrow | prod rose | DATA GOVERNANCE | Scoped read-only → Factory Spec guardrails → Human escalation → Nothing leaves boundary | — |
| SLO prediction | narrow | context amber | SLO PREDICTION | Patch → Pool+latency → OCG correlation → SLO risk predicted | Guarantee the SLO |
| CI/CD × chaos | wide | agent green | RESILIENCE GATING | CI/CD run → Sandbox chaos → OCG correlation → Gate on resilience | Ship only what survives chaos |

**Flow node styling:** neutral nodes `$ds-surface`/`$ds-border`; OCG "spine" node `$ds-accent` stroke + `$ds-accent-text`; outcome node filled with the card's `$ds-layer-*-bg`/`-stroke`. Arrows = phosphor `arrow-right`/`arrow-down` in `$ds-text-tertiary`.

**Row-height fix (ponytail):** rows pinned to fixed height (534 / 537) with both cards `height:fill_container` — avoids the `fit_content` row + `fill_container` child circular-collapse validator warning while keeping equal card bottoms. Heights are the measured natural content heights; a large copy-edit to the tallest (narrow) card would require re-measuring. Copy into dark also dropped `layout:'horizontal'` on rows (horizontal is the frame default so it still rendered) — re-set explicitly.

Exports: `exports/web-shelf/home-painpoints/{IURWh,CYfSl}.png`, `exports/web-shelf/home-painpoints-sections/{b2QjdJ,Gv1RG,ck4Dy,Nemq8}.png`.

## 10. Built frame map (2026-08-24)

Canvas column **x=92000**. Exports: `exports/web-shelf/web-shelf-{frameId}-v2.png`

| Page | Light ID | Dark ID |
|---|---|---|
| Home | `LexRf` (recreated from `CYfSl` 2026-08-25) | `CYfSl` |
| Product (ADF) | `E1idiY` (recreated from `f4FhS` 2026-08-25) | `f4FhS` |
| DevOps | `ZGktc` | `e9vrj` |
| SRE | `EyhMf` | `cbriC` |
| InfraOps | `Jscqr` | `m6Z6Wf` |
| Platform | `A1fzB` | `rMkSc` |

---

## 9. Out of scope

- Observability as fourth assembly (deck offerings shows it; PRFAQ has 3 — defer)
- Use-case / persona hubs, Customers, Resources pages
- Mobile frames
- PRODUCT.md naming reconciliation for web ship
