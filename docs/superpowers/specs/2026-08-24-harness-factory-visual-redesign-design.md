# Harness × Factory Visual Redesign — StackGen Web Shelf

**Date:** 2026-08-24  
**Status:** Phase A + B complete. Phase C pending approval.  
**Visual direction (locked):** Harness-style platform shelf — light + dark `$ds-*` pairs, modular lifecycle pillars, diagram-led sections, minimal copy  
**Research sources:** harness.io homepage + harness-ai product page, factory.ai homepage + enterprise page (Firecrawl), Mobbin (Zapier workflow hero, n8n persona tabs, LangChain lifecycle fan, StackAI product canvas)

---

## 1. Messaging principles extracted

### From Harness.io

| Principle | Harness expression | StackGen application |
|---|---|---|
| **Category ownership** | "AI for Everything After Code" | **"The factory for everything between your tools"** — owns the cross-domain ops gap, not delivery (Harness/GitLab ship code) |
| **Lifecycle taxonomy** | 4 pillars: DevOps & Automation · Testing & Resilience · Security & Compliance · Cost & Optimization | **4 outcome pillars** mapped to user painpoints (see §3) — each pillar = one visual module tile, not a paragraph |
| **Module card pattern** | Icon + product name + one outcome line + arrow | Reuse for **3 assemblies + Platform** on Home; full grid on Product page |
| **Embedded intelligence** | "Harness AI is embedded across every module" | **"Every Aiden agent shares the Operational Context Graph"** — one line under Platform/OS visual |
| **Proof without prose** | Customer logos, metric callouts (75% faster), integration count (100+) | **Committed target metrics** (MTTR, CFR, toil) as giant numerals; integration logos band unchanged |
| **Responsible AI** | Data not used to train; unified governance guardrails | **Factory Spec governance band** on Platform — 3 icon tiles: least-privilege · read-only default · human escalation |

### From Factory.ai

| Principle | Factory expression | StackGen application (sparingly — Harness is primary) |
|---|---|---|
| **Radical headline compression** | "THE INDUSTRIAL REVOLUTION FOR SOFTWARE DEVELOPMENT" as typography | Hero H1 ≤ **8 words**; section H2 ≤ **6 words**; no sub longer than **18 words** |
| **Metric drama** | Giant "7x" / "96.1%" numerals | **Targets band only** — 3 stats at 48–64px, label below, no paragraph |
| **Enterprise trust row** | SSO · compliance · dedicated compute as icon chips | **SecOps pillar** + Platform governance row — 4 trust chips max |

### Mobbin layout references

| Pattern | Source | Where on StackGen |
|---|---|---|
| Workflow hero (trigger → steps → outcome) | Zapier | Home hero right column OR Painpoint card flows |
| Persona tabs ("IT Ops can…") | n8n | **Who it's for** band — horizontal role chips (already built; refine to tab-style active state) |
| Lifecycle fan (Build · Observe · Evaluate · Deploy) | LangChain | Product page ADF 4-step + Platform Aiden OS loop |
| Product canvas screenshot | StackAI | Hero / Product tour video band — UI chrome placeholder |

---

## 2. Copy budget rules (site-wide)

| Element | Max length | Notes |
|---|---|---|
| Eyebrow | 3 words | ALL CAPS, tracking 2 |
| Hero H1 | 8 words | One idea only |
| Hero sub | 18 words | Outcome, not mechanism |
| Section H2 | 6 words | |
| Module tile title | 4 words | Assembly or pillar name |
| Module tile body | 12 words | Single sentence |
| Painpoint card headline | 10 words | Bold only |
| Painpoint card body | **Delete** — replace with flow diagram + metric chip | Harness module cards have no paragraph |
| CTA | 2 words | Schedule demo · How it works |

**Banned on canvas:** em dash, unlock, seamless, leverage, "AI SRE" as category label.

---

## 3. Four outcome pillars (replaces text-heavy "Why Factory")

Maps user painpoints + PRFAQ assemblies to Harness-style lifecycle modules:

| Pillar | Eyebrow | Headline (≤6 w) | Visual | Assembly |
|---|---|---|---|---|
| **Intelligence** | CROSS-DOMAIN RCA | Root cause in the graph | Signal fan-in → OCG → Aiden for SRE → `<15 min` | Aiden for SRE |
| **Governance** | AGENT SECURITY | Nothing leaves your boundary | Scoped access → Factory Spec → Escalation → Boundary | Platform / Aiden OS |
| **Reliability** | SLO INTELLIGENCE | Predict before you breach | Patch → Observability → Correlation → SLO risk | Aiden for Observability |
| **Delivery** | VERIFIED SHIP | Gate on resilience | CI/CD → Sandbox chaos → OCG → Ship | Aiden for Automation |

**Home layout:** 2×2 bento (already built as Painpoints Section) — **refine:** strip solution paragraphs, enlarge flow diagrams, add Harness-style arrow CTAs per tile.

---

## 4. Page-by-page redesign spec

All pages: **1440px** width, `$ds-*` tokens, light `{mode:light}` + dark `{mode:dark}` theme pairs, Double-Bezel cards, `$ds-pad-x/y` = 96.

### 4.1 Home (`IURWh` / `CYfSl`)

**New section order:**

| # | Section | Visual | Copy (max) |
|---|---|---|---|
| 1 | Nav | Existing | Product · Platform · Customers · Resources · Schedule demo |
| 2 | Hero | **Aiden OS stack diagram** (right) OR product video | Eyebrow: Autonomous DevOps Factory · H1: **Describe the outcome. We build the factory.** · Sub: 18 words · CTAs |
| 3 | Logos | Trust band | No copy |
| 4 | **4 Pillars** | 2×2 bento flows (refined Painpoints) | Headline only + flow + metric chip |
| 5 | **Who it's for** | 5 role chips (n8n tab style) | H2: Built for production teams · chips only |
| 6 | Before / After | `D9SFJ` → `IPyqX` side by side | Labels: Today / Future — 4 words each |
| 7 | **Module shelf** | 3 assembly cards + Platform card (Harness grid) | Icon + name + 12-word outcome + → |
| 8 | Targets | 3 giant metrics | Committed target label |
| 9 | Integrations | Logo strip | 100+ integrations — one line |
| 10 | CTA | Footer | Schedule demo |

**Remove or demote:** Video band to secondary (below hero diagram) OR keep as "See it in action" after pillars. Problem section text → **visual only** (`tPSo3` diagram + 6-word H2).

### 4.2 Product — ADF (`JBK8u` / `f4FhS`)

| Section | Visual | Copy |
|---|---|---|
| Hero | `IPyqX` factory diagram full width | H1: From intent to a running factory |
| 4 steps | LangChain-style horizontal fan | Intent · Spec · Runtime · Learning — 4 words under each |
| Intent example | Single quote block | 2 sentences max (PRFAQ) |
| Unified context | `IbrlZ` | H2: One graph connects every assembly |
| Module shelf | 4 tiles (3 assemblies + OS) | Harness product grid |
| vs delivery | **No paragraph** — 2-column: Harness ships code · ADF runs what ships | 8 words each column |
| CTA | — | Schedule demo |

### 4.3 Platform — Aiden OS (`A1fzB` / `rMkSc`)

| Section | Visual | Copy |
|---|---|---|
| Hero | **Aiden OS Stack** (`xMLGU` / `BqOj3` style) | H1: The OS for governed agents |
| Governance row | 3 trust chips (Factory enterprise pattern) | Least-privilege · Read-only · Escalation |
| OCG | `eMFrp` context graph | H2: Shared operational memory |
| Composable loop | `zbLoF` | 4-word step labels |
| Module links | 4 assembly arrows into OS | Visual only |
| CTA | — | Schedule demo |

### 4.4 Assembly pages (Automation, SRE, InfraOps, Observability)

Each page follows Harness **single-product landing** pattern:

| Section | Visual | Copy |
|---|---|---|
| Hero | Domain-specific diagram + UI chrome | H1 = assembly outcome (≤6 words) |
| Mechanism | Editable step sequence (existing mechanism bands) | Step tags only — no paragraph per step |
| OCG connection | Small hub diagram | One line: Shares the Operational Context Graph |
| Metrics | 1–2 giant numbers | Committed targets for that domain |
| CTA | — | Schedule demo · Early access (InfraOps only) |

**Naming on canvas:** Aiden for Automation · Aiden for SRE · Aiden for Infrastructure · Aiden for Observability (PRFAQ v8).

---

## 5. Implementation approach (3 phases)

| Phase | Scope | Frames | Deliverable |
|---|---|---|---|
| **A** | Home text diet + section reorder + pillar refinement | `IURWh`, `CYfSl` | Export v9 home PNGs |
| **B** | Product + Platform harness shelf | `JBK8u`, `f4FhS`, `A1fzB`, `rMkSc` | Export v9 product/platform PNGs |
| **C** | 4 assembly pages module pattern | `ZGktc`, `e9vrj`, `EyhMf`, `cbriC`, `Jscqr`, `m6Z6Wf` + Observability if present | Full shelf export |

**Execution:** Gemini 3.1 Pro subagent per phase, guided by `high-end-visual-design` + this spec + existing `$ds-*` tokens. Parent agent validates layout problems = 0 after each phase.

---

## 6. Out of scope (this pass)

- Arch-forward Home variants (`L6Vdk` / `roTdG`) — sync after Home v9 approved
- Mobile frames
- Next.js code implementation (Pencil canvas only)
- New pages (Customers, Resources, Pricing)

---

## Phase A completion log (2026-08-24)

Home `IURWh` / `CYfSl` updated via Gemini 3.1 Pro subagent:

- Hero H1/sub compressed to copy budget
- Painpoints: solution paragraphs removed; Harness pillar eyebrows/headlines; flows + metric chips only
- Problem + Why Factory sections deleted
- Assemblies: 4-card Harness module shelf (Automation · SRE · Infrastructure · Aiden OS) with icons + arrows
- Section order: Nav → Hero → Logos → Painpoints → Video → Who → Before/After → Assemblies → Targets → Integrations → CTA
- 0 layout problems on both frames

**Optional Phase A polish:** trim Painpoints section sub-head (still ~25 words under H2).

---

## Phase B completion log (2026-08-24)

Product `JBK8u` / `f4FhS` + Platform `A1fzB` / `rMkSc` via Gemini 3.1 Pro subagent:

**Product:** Hero/stepper/quote text diet; Context Graph H2; Harness 4-card module shelf (copied Home pattern); 2-column vs delivery (no paragraph); removed long Harness/GitLab prose.

**Platform:** Governance row (3 trust chips); Capabilities tiles trimmed; Context Graph H2 "Shared operational memory"; Composable Loop from deck `pAqSQ`; Module Links band before CTA.

**Platform order:** Nav → Hero → Governance → Capabilities → Aiden OS Stack → Integrations → Context Graph → Composable Loop → Module Links → CTA

Exports: `exports/web-shelf/product-platform-harness-v9/`

---

## 7. Acceptance criteria

- [x] Home: every section has a **primary visual** (Phase A)
- [ ] Every section has a **primary visual**; no section is headline + paragraph only (site-wide)
- [ ] Hero H1 ≤ 8 words on all 6 pages
- [ ] Painpoint / pillar cards have **no solution paragraph** — flow diagram + metric chip only
- [ ] 4 pillars visible on Home without scrolling past hero + logos
- [ ] Light/dark parity on all edited frames
- [ ] 0 layout problems on all edited frames
- [ ] Exports updated under `exports/web-shelf/`

---

## 8. User decisions log

| Decision | Choice |
|---|---|
| Visual archetype | Harness-style platform shelf |
| Text budget | Minimal — diagrams carry story |
| Scope | Full 6-page web shelf on Pencil |
| Subagent | Gemini 3.1 Pro for Pencil execute work |
| Research | Firecrawl harness.io + factory.ai; Mobbin layout refs |
