# Factory-Inspired Dark Web Shelf — Expanded Product & Platform Pages

**Date:** 2026-08-25  
**Status:** Implemented on dark column (2026-08-25)  
**Scope:** Dark column only (`WEB SHELF · DARK`, anchored from `CYfSl`)  
**Skills:** brainstorming, firecrawl-cli, copywriting, high-end-visual-design, Pencil MCP  
**Sources:** factory.ai sitemap + product pages, `AIOS - Product Features.md`, `PRODUCT.md`, `2026-08-24-harness-factory-web-shelf-design.md`, `2026-08-20-factory-anchored-experience-design.md`

---

## 1. Decision record

| # | Decision |
|---|---|
| D1 | **Scope B approved:** enrich five existing dark frames + add Observability + three Platform capability pages |
| D2 | factory.ai contributes **structure and copy rhythm only** — no colour, type, or form (per `PRODUCT.md` + factory-anchored spec) |
| D3 | Dark shelf uses **`$ds-*` tokens** and existing web-shelf elevation ramp — not positioning-deck cream/plates |
| D4 | **Binding product names** from `PRODUCT.md`: Aiden for Infrastructure · Automation · Observability · SRE — never InfraOps, DevOps, or Olly on canvas |
| D5 | Metrics on canvas: **verified only** from `PRODUCT.md` §Evidence — label unvalidated targets as "committed target" |
| D6 | Light column **out of scope** this pass — dark leads; light mirrors later |
| D7 | Do not edit Replica frames (`nwYaY`, `qwI1S`, etc.) or deck reference frames |

---

## 2. factory.ai patterns adopted

| Pattern | factory reference | StackGen application |
|---|---|---|
| Product hub | Home links to Droids / Missions / Router | Platform hub links to Context Graph / Policy / AppStacks |
| Hero + copyable input | Droids install command | Copyable operational prompt per product (factory-anchored D16) |
| Key features band | 3-up value props above fold | Pain → mechanism tiles under hero |
| Numbered workflow | "01 Desktop … 05 Linear" | "01 Intake … 04 Record" per product |
| Deep feature sections | "One platform. Every workflow." | Platform capability pages with diagram plates |
| Enterprise proof | Stat band + case study + compliance | Metrics band + greytHR placeholder only where approved |
| Nav consistency | Product · Enterprise · Docs | Product · Platform · Customers · Schedule demo |

---

## 3. Dark column IA (target state)

### 3.1 Existing frames — enrich in place

| Page | Frame ID | Rename labels on canvas | factory depth target |
|---|---|---|---|
| Home | `CYfSl` | — | Done (reference sibling) |
| Product (ADF) | `f4FhS` | — | Add unified-context diagram, assembly lanes, metrics band |
| Aiden for Automation | `e9vrj` | DevOps → **Automation** | Add numbered request-ops loop (AIOS PRFAQ), inbox diagram placeholder, integrations |
| Aiden for SRE | `cbriC` | — | Add investigation loop, prevention band, verified MTTR metrics |
| Aiden for Infrastructure | `m6Z6Wf` | InfraOps → **Infrastructure** | Add lifecycle diagram polish, AppStacks cross-link |
| Platform (Aiden OS) | `rMkSc` | — | Add capability hub links to three sub-pages |

### 3.2 New dark frames

| Page | Proposed name | Primary diagram ref | AIOS source |
|---|---|---|---|
| Aiden for Observability | `Web Shelf — Observability [Dark]` | Observability replica SVG / correlation diagram | AIOS Observe pillar + PRODUCT metrics |
| Context Graph | `Web Shelf — Context Graph [Dark]` | `IbrlZ` / `eMFrp` | AIOS Context Graph section |
| Policy Engine | `Web Shelf — Policy [Dark]` | Governance row from `rMkSc` / OPA substrate | AIOS Policy + Identity sections |
| AppStacks | `Web Shelf — AppStacks [Dark]` | `VkeZ8` lifecycle | AIOS AppStacks section |

### 3.3 Canvas layout (dark column)

Column X: **93760** (unchanged). Vertical gap **240px** between frames.

| Row | Y | Frame ID |
|---|---|---|
| 0 | 0 | Home `CYfSl` |
| 1 | 4336 | Product `f4FhS` |
| 2 | 7727 | Automation `e9vrj` |
| 3 | 10729 | SRE `cbriC` |
| 4 | 13341 | Infrastructure `m6Z6Wf` |
| 5 | 15755 | Observability `oV5ml` |
| 6 | 18367 | Platform `rMkSc` |
| 7 | 22954 | Context Graph `KgET2` |
| 8 | 24646 | Policy `k9tVbF` |
| 9 | 26430 | AppStacks `lPVbt` |

Exact Y computed at build time from prior frame height + 240.

---

## 4. Shared section template (all product pages)

Every Aiden assembly page follows factory Droids rhythm:

| # | Section | Content rules |
|---|---|---|
| 1 | Nav | Match `CYfSl` dark nav — Product dropdown lists four assemblies |
| 2 | Hero | Eyebrow · H1 ≤6 words where possible · pain sub · **copyable prompt** · Schedule demo CTA |
| 3 | Key features | 3 tiles: pain-led outcome (not mechanism-only) |
| 4 | Numbered loop | 01–04 steps — product-specific (see §5) |
| 5 | Diagram plate | Double-bezel `$ds-surface` shell · deck diagram or UI placeholder |
| 6 | Agents / capabilities | 4–6 chips or tiles from AIOS persona + skills |
| 7 | Metrics | 1–3 tiles — verified numbers only |
| 8 | Platform strip | "Runs on Aiden OS" · links to `rMkSc` + relevant capability page |
| 9 | CTA | Schedule demo |

Voice: declarative, mechanism-first, **no em dashes**, median sentence 7–9 words.

---

## 5. Page copy direction (from AIOS + PRFAQ)

### 5.1 Product — ADF (`f4FhS`)

| Section | H2 / copy |
|---|---|
| Hero | **From intent to a running factory** |
| Stepper | Intent → Factory Spec → Factory Runtime → Factory Learning |
| Intent quote | One PRFAQ intent example (deploy babysitting OR on-call class) |
| Unified context | **One graph connects every assembly** · `IbrlZ` diagram |
| vs delivery | Harness/GitLab ship code. ADF runs what ships. |
| Metrics | CFR target · on-call reduction target (labeled committed target) |

### 5.2 Aiden for Automation (`e9vrj`)

Rename all "DevOps" labels to **Automation**.

| Section | Copy |
|---|---|
| Hero H1 | **Requests that become reviewed action** |
| Prompt | `restore the failed staging deployment` (PRFAQ example) |
| Key features | Explainable triage · Reviewed workflow selection · Human-approved execution |
| 01–04 | Inbox → Triage → Approve workflow → Execute + record |
| Diagram | Ticket-to-action loop (Appendix C PRFAQ) |
| Metrics | ~30% fewer pipeline tickets (PRODUCT.md) |

### 5.3 Aiden for SRE (`cbriC`)

| Section | Copy |
|---|---|
| Hero H1 | **Incidents that already know what changed** |
| Prompt | `investigate elevated errors on checkout-api` |
| Key features | Context on alert · Cross-domain RCA · Policy-gated remediation |
| 01–04 | Alert enriched → Investigate → Propose fix → Approve + deploy |
| Diagram | `IbrlZ` SRE column + graph center |
| Prevention | Factory prevents deployment × drift collisions |
| Metrics | 50% MTTR · 66% faster RCA · 90% less alert noise (PRODUCT.md) |

### 5.4 Aiden for Infrastructure (`m6Z6Wf`)

Rename InfraOps → **Infrastructure**. Early-access badge if shown.

| Section | Copy |
|---|---|
| Hero H1 | **Infrastructure that provisions, governs, and heals** |
| Prompt | `provision a staging environment from approved modules` |
| Key features | Governed modules · Policy-checked IaC · Drift-aware operations |
| 01–04 | Intent → AppStack select → Policy validate → Deploy to Git |
| Diagram | `VkeZ8` lifecycle |
| AppStacks link | Cross-link to AppStacks capability page |
| Metrics | 10× velocity · 100% policy-checked · 95% less IaC toil (PRODUCT.md) |

### 5.5 Aiden for Observability [NEW]

| Section | Copy |
|---|---|
| Hero H1 | **Signals tied to what changed** |
| Prompt | `correlate latency spike with recent deploys and infra drift` |
| Key features | Change-aware signals · SLO and cost guardrails · Feeds Remediate |
| 01–04 | Ingest → Correlate → Alert with context → Feed SRE/Automation |
| Diagram | Correlation hub (from Platform `rMkSc` or replica) |
| Metrics | 60%+ lower cost · 300+ integrations (PRODUCT.md) |
| Testimonial | **None** until quote clears tracker — greytHR is Observability-only when approved |

### 5.6 Platform — Aiden OS (`rMkSc`)

Add **Capability hub** section before CTA:

| Tile | Links to |
|---|---|
| Context Graph | Context Graph page |
| Policy Engine | Policy page |
| AppStacks | AppStacks page |
| Persona Agents | Anchor on same page |
| Skills & Workflows | Anchor on same page |
| Activity & Replay | Anchor on same page |

Existing sections retained: Hero · Governance row · Capabilities grid · Aiden OS Stack · Integrations · Context Graph preview · Composable loop · CTA.

### 5.7 Context Graph [NEW]

factory `/product/router` depth — one capability, full page.

| Section | Copy |
|---|---|
| Hero H1 | **Operational memory that connects every tool** |
| Sub | Services, alerts, deploys, runbooks, and policies as one traversable graph |
| 01–04 | Connect sources → Resolve entities → Traverse relationships → Ground agent decisions |
| Diagram | `IbrlZ` full width in double-bezel |
| Footer line | *Resolution covers what you connect. Nothing beyond that.* (Home parity) |

### 5.8 Policy Engine [NEW]

| Section | Copy |
|---|---|
| Hero H1 | **Policy before every agent action** |
| Sub | OPA/Rego checks planned tool calls before they run — not buried in prompts |
| 01–04 | Plan action → Evaluate policy → Approve or block → Audit record |
| Diagram | Governance row expanded · OPA chip · approval boundary callout |
| Quote | *A prompt can suggest safe behavior. An enforceable policy can require it.* (AIOS) |

### 5.9 AppStacks [NEW]

| Section | Copy |
|---|---|
| Hero H1 | **Governed infrastructure building blocks** |
| Sub | *AIOS governs how an agent acts. AppStacks govern what it may create.* |
| 01–04 | Select module → Compose environment → Validate policy → Push to Git |
| Diagram | `VkeZ8` lifecycle |
| Cross-links | Infrastructure product page · Platform hub |

---

## 6. Nav update (dark frames only)

Platform dropdown on all dark shelf navs:

```
Product
  └─ Autonomous DevOps Factory
  └─ Aiden for Infrastructure
  └─ Aiden for Automation
  └─ Aiden for Observability
  └─ Aiden for SRE
Platform
  └─ Aiden Agentic OS
  └─ Context Graph
  └─ Policy Engine
  └─ AppStacks
Customers · Resources · Schedule demo
```

---

## 7. Build sequence (implementation plan preview)

1. Rename labels Automation / Infrastructure on `e9vrj`, `m6Z6Wf`
2. Enrich `f4FhS` — diagram + metrics + assembly lanes
3. Enrich four assembly pages to shared template
4. Create Observability dark frame (clone `cbriC` structure, swap copy/diagram)
5. Add capability hub tiles to `rMkSc`
6. Create three capability frames — clone Platform section shells
7. Stack frames vertically; verify 0 layout problems
8. Export PNGs to `exports/web-shelf/factory-dark-shelf-v1/`

---

## 8. Acceptance checklist

- [x] Nine dark frames exist with no vertical overlap
- [x] All product names match `PRODUCT.md` binding table
- [x] Every assembly page has copyable prompt + 01–04 loop + metrics + platform strip
- [x] Three capability pages link bidirectionally from Platform hub
- [x] No em dashes on canvas copy
- [x] No unverified customer quotes
- [x] No Olly, DevOps, or InfraOps on public-facing labels
- [x] `$ds-*` tokens only — no deck cream on dark shelf
- [x] factory.ai contributed structure only — visual register stays StackGen dark shelf

---

## 9. Out of scope (this pass)

- Light column mirrors
- Next.js implementation
- New customer quotes or ROI figures
- Industry vertical pages (factory enterprise pattern — deferred until evidence)
- ServiceNow / unvalidated integrations called GA
