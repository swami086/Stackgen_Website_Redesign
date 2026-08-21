# Site IA + Page Briefs (Phase 4)

**Date:** 2026-08-19  
**Reads:** `.agents/product-marketing.md` · `docs/superpowers/specs/2026-08-19-factory-experience-brief.md` · `docs/superpowers/specs/2026-08-19-positioning-icp.md` · `PRODUCT.md` · `docs/proof/customer-logos-and-quotes.md`  
**Canvas:** `Stack_Linear.pen` (Linear world · `#9437FF` · Schedule demo only)  
**Note:** This replaces the old “replicate stackgen.com copy” approach. New pages are written from locked messaging.

---

## 1. Sitemap (Scope A — redesign)

```text
Home
├── Product
│   ├── Aiden for Infrastructure
│   ├── Aiden for Automation
│   ├── Aiden for Observability
│   └── Aiden for SRE
├── Platform
│   ├── (hub)
│   ├── Integrations
│   ├── Cloud to Code
│   ├── Custom Policies
│   └── IaC Lifecycle
├── Case Studies
│   ├── Index
│   ├── greytHR
│   ├── Innovaccer
│   ├── StackGen SRE (eat-your-own)
│   └── Observability / three clouds (eat-your-own)
├── Company
│   ├── About
│   ├── Pricing (if public; else CTA to Schedule demo)
│   ├── Contact
│   ├── Schedule Demo
│   └── MCP Server
└── (Deferred Wave B)
    ├── Solutions × N
    └── Partners (AWS / Azure / GCP)
```

**Nav (desktop):** Logo · Product · Platform · Case Studies · Company · Login · **Schedule demo**

**Primary CTA everywhere:** Schedule demo

---

## 2. Page priority for Pencil Wave 1

| Priority | Pages | Why |
|---|---|---|
| P0 | Home (+ Mobile sync) | Launch narrative + Factory spine |
| P1 | 4× Product (Infra, Automation, Observability, SRE) | Loop surfaces |
| P1 | Platform hub | Agentic OS depth |
| P1 | Case Studies index + greytHR + Innovaccer | Proof |
| P2 | About · Schedule Demo · MCP Server | Company / conversion |
| P2 | Platform children (Integrations, Cloud to Code, Policies, IaC Lifecycle) | Depth |
| P3 | Pricing · Contact · remaining cases · Solutions · Partners | After P0–P2 land |

---

## 3. Shared page template (non-Home)

Use on Product / Platform / Case / Company pages unless a brief overrides:

1. Nav  
2. Hero (declarative H1 + one support + Schedule demo) — **not** Factory bold category energy except Home  
3. Problem → mechanism (one section)  
4. How it works / proof (metrics with mechanisms, or case facts)  
5. Related surfaces / loop cross-links  
6. Trust strip (optional)  
7. Final Schedule demo  
8. Footer  

**Voice:** Declarative, mechanism-first. Em-dash ban. No Olly. No Git/estate. No unverified quotes as real.

---

## 4. HOME — full brief (P0)

**Frame:** `StackGen Home` (existing) + Mobile  
**Job:** Make a Platform/SRE champion understand ADF → Agentic OS → Aiden in one scroll, trust it, Schedule demo.  
**Reader:** Platform/SRE champion first; executive skim second.

### Section spine (from Factory brief)

| # | Section | H1 / label intent | Body / assets | Diagram | CTA |
|---|---|---|---|---|---|
| 0 | Nav | — | Product · Platform · Cases · Company · Login · Schedule demo | — | Schedule demo |
| 1 | Hero | **Autonomous DevOps Factory** | Sub = L1 core · Support = L0 · Peek = L2 · Dominant product/mechanism visual | Hero schematic / film fallback | Schedule demo |
| 2 | Logos | Trusted by leading enterprises | 12 logos from proof pack | Logo grid | — |
| 3 | Problem | Agent velocity without governance | 2–3 attributed cites (DORA / CodeRabbit / New Relic) | Editable 2-col creation / ops and domain-silo gap diagram | — |
| 4 | Factory process | Intent → Factory Spec → Factory Runtime → Factory Learning | New editable Linear band (slide 12 restyle), distinct from product loop | Editable 4-step Factory process diagram (Intent → Spec → Runtime → Learning) | — |
| 5 | ADF Loop | Build · Govern · Observe · Remediate | Map to Aiden for Infrastructure / Automation / Observability / SRE · numbered 01–04 | Keep existing ADF schematic (product loop) | Link to products |
| 6 | Agentic OS | Aiden is the Agentic OS for DevOps | L2 + deterministic + agentic planes (short) | Agentic OS strip (deterministic + agentic planes) | Schedule demo |
| 7 | Integrations | Plugs into the stack you run | Tool logo row | Integrations icons | — |
| 8 | Featured case | greytHR (preferred) or Innovaccer | Published quote or metrics · link to case | Case visual / timeline | Read case |
| 9 | Quotes | In their words | greytHR real + PLACEHOLDER labeled | Quote block | — |
| 10 | Motions | Who it’s for | Platform (ADF+infra) · SRE · Developers (governed path) | Motion cards | — |
| 11 | Trust | Enterprise-ready | SOC2 / PCI / HIPAA · Gartner / cloud partners | Trust strip | — |
| 12 | Final CTA | Ready to scale autonomy with governance? | One line + Schedule demo | Final CTA band | Schedule demo |

Home section order chosen: Problem → Factory Process → ADF Loop

### Hero copy (locked ingredients)

- **H1:** Autonomous DevOps Factory  
- **Sub:** Aiden sets the foundations for an Autonomous DevOps Factory: build, govern, observe, and remediate the agent-driven SDLC so velocity and governance move in the same path.  
- **Support:** StackGen is the company behind Aiden, the DevOps operating system for AI-native environments. Aiden serves Platform Engineers, Developers, and SRE teams.  
- **Optional third line:** Platform engineering and SRE leaders scale developer autonomy at the pace their confidence supports — not merely faster because agentic IDEs can push untrusted recommendations faster.

### Home acceptance

Matches Factory brief checklist: one composition · logos before depth · loop namable · system not feature cards · real proof before final CTA · Schedule demo only · Linear world.

---

## 5. PRODUCT pages — briefs (P1)

Shared product hero pattern:

- **H1:** Aiden for {Domain}  
- **Sub:** One sentence job of this surface inside the ADF loop  
- **Support:** Cross-link “Part of the Agentic OS” → Platform / Home loop  
- **CTA:** Schedule demo  

### 5.1 Aiden for Infrastructure

| Field | Brief |
|---|---|
| **URL source (reference only)** | `/product/aiden-for-infrastructure` |
| **Loop role** | Build (+ govern at action boundary) |
| **Job** | Intent → policy-checked infra change; contrast HashiCorp = tooling only |
| **Lead proof** | 10× velocity · 100% policy-checked deploys · 95% less IaC toil (with mechanisms) |
| **Must show** | Diff / PR / policy evaluation as visual — not abstract |
| **Avoid** | “Git / estate” phrasing; InfraOps naming |
| **Diagram** | Intent → policy-checked change schematic; Early Access migration strip as a callout |

### 5.2 Aiden for Automation

| Field | Brief |
|---|---|
| **URL source** | `/product/aiden-for-devops` → canvas name **Automation** |
| **Loop role** | Operate / Maintain (pipelines, tickets, release automation) |
| **Job** | Pipeline-native delivery with governance in path |
| **Lead proof** | ~30% fewer pipeline tickets (mechanism) |
| **Must show** | Pipeline / ticket remediation path |
| **Avoid** | Naming the product “Aiden for DevOps” on canvas |
| **Diagram** | Commit → build/test → infra/OCG checks → gate → deploy (editable pipeline sequence) |

### 5.3 Aiden for Observability

| Field | Brief |
|---|---|
| **URL source** | `/product/aiden-for-observability` |
| **Loop role** | Observe |
| **Job** | Unified signal + AI-assisted insight; feeds SRE remediate |
| **Lead proof** | greytHR metrics/quote · 60%+ cost · 300+ integrations |
| **Must show** | Natural-language → correlated insight (greytHR story) |
| **Avoid** | Olly |
| **Diagram** | State ↔ anomaly correlations; change attribution visual; observability correlation strip |

### 5.4 Aiden for SRE

| Field | Brief |
|---|---|
| **URL source** | `/product/aiden-for-sre` |
| **Loop role** | Remediate |
| **Job** | Detect → triage → diagnose → remediate within policy; contrast Resolve/Traversal = SRE-only |
| **Lead proof** | 50% MTTR · 66% faster RCA · 90% less alert noise |
| **Must show** | Incident timeline + refusal boundary |
| **Avoid** | Claiming we replace Resolve/Traversal by name |
| **Diagram** | Drift → Alert → OCG RCA → Remediate → Deploy → Verify (editable SRE play sequence) |

---

## 6. PLATFORM hub — brief (P1)

| Field | Brief |
|---|---|
| **Job** | Explain Agentic OS (L2) + shared Operational Context Graph + Tirith / policy — why four products are one system |
| **H1** | Agentic OS for DevOps (or “The platform under Aiden”) |
| **Must include** | Deterministic plane + agentic plane; cross-domain play example; links to four products |
| **Children** | Integrations · Cloud to Code · Custom Policies · IaC Lifecycle — each one job, one mechanism, Schedule demo |
| **Contrast** | vs Harness / AWS on “full loop + multi-cloud / no silos” without replace claims |
| **Diagram** | Full editable OCG centerpiece; Aiden OS modules band (orchestration + financial governance); Roadmap strip labeled: Available / Early Access / H1 2027 |

---

## 7. CASE STUDIES — briefs (P1)

### Index
- Logo grid + filter by motion (Infra / Observability / SRE / ADF) if cheap; else simple list  
- Featured: greytHR + Innovaccer  

### greytHR
- Lead with published quote (Abhishek Gaurav) + 50% / 90% / 65% metrics  
- Story: observability fragmentation → Aiden natural language → SRE leverage  

### Innovaccer
- Lead with metrics (75% deploy speed · 80% less script toil · compliance validation)  
- No fabricated named quote; PLACEHOLDER only if design needs a quote block  

### Eat-your-own (SRE / three-cloud)
- Honest “StackGen runs Aiden” framing; proof of multi-cloud / production use  
- Not a substitute for customer logos  

---

## 8. COMPANY — briefs (P2)

| Page | Job | Lead copy |
|---|---|---|
| **About** | Company = StackGen behind Aiden; ADF vision; team/trust | Full boilerplate (L0–L5) |
| **Schedule Demo** | Conversion | Short value line + form/CTA; no competing CTAs |
| **MCP Server** | Developer-adjacent entry that still funnels to governed OS | “Aiden in your IDE” without becoming IDE-only anti-persona |
| **Pricing** | If public tiers exist, show them; else “Platform fee + usage — Schedule demo” | Do not invent prices |
| **Contact** | Utility | Schedule demo preferred path |

---

## 9. Wave B — stubs on canvas (2026-08-19)

Built as stubs on `Stack_Linear.pen` @ x≈9110 (not full Solutions IA):

| Frame | Id | Role |
|---|---|---|
| **Solutions** | `uPzvZ` | Hub — Motions A/B/C cards |
| **Solution — Governed Infrastructure** | `socHN` | Motion A stub |
| **Solution — Autonomous DevOps Factory** | `wTrxq` | Motion B stub |
| **Solution — SRE Reliability** | `Bp1dp` | Motion C stub |
| **Partners** | `ARO2U` | AWS / Azure / GCP trust stub |

**Still deferred:** Dedicated Solutions IA depth, cloud-specific partner landing pages, persona-mapped solution children beyond the three motions.

---

## 10. Copy checklist (every page)

- [ ] Schedule demo is the only primary CTA  
- [ ] Naming table respected  
- [ ] No em dashes  
- [ ] No Olly / single pane of glass / Git-estate / replace-competitor  
- [ ] Metrics cite a mechanism  
- [ ] Quotes: published or labeled PLACEHOLDER  
- [ ] One job per section  
 - [ ] No slide-14 dollar ROI (sales-only until sign-off)  
 - [ ] Factory process ≠ product loop (both must appear on Home)

---

## 11. Phase 4 → Phase 5 handoff

**Ready for design execution when:**
1. User accepts this sitemap + Home brief (and P1 product/platform/case shape)  
2. Writing-plans skill produces implementation plan with lane claims on `Stack_Linear.pen`  
3. Parallel Pencil lanes: Home rewrite → Products → Platform → Cases → Company  

**Out of scope until accepted:** Starting Pencil edits; inventing Solutions IA.
