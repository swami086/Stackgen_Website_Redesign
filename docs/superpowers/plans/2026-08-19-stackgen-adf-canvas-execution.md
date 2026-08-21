# StackGen Marketing Canvas Execution Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `Stack_Linear.pen` marketing pages from locked messaging (ADF → Agentic OS → Aiden), using the Factory experience brief as the IA/craft bar and Linear as the visual world.

**Architecture:** One shared `.pen` file. Serial P0 Home rewrite first (existing frame `JLg8h` + mobile `KUYi6`). Then parallel Wave 1 lanes insert Product / Platform / Cases / Company frames into claimed empty regions. Wave 2 wires nav and verifies.

**Tech Stack:** Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`), Firecrawl (proof assets already in `.firecrawl/`), OpenMemory `Stackgen_Website_Redesign`

## Global Constraints

1. **Canvas:** `Stack_Linear.pen` only.
2. **Visual world:** Linear-pinned dark (`$bg-base` / `$bg-raised`). Accent `$accent` `#9437FF`. No glow. No em dashes on canvas text.
3. **Naming:** Aiden for Infrastructure · Automation · Observability · SRE. Never Olly. ADF = vision, not SKU.
4. **CTA:** Schedule demo only (primary).
5. **Copy source:** `.agents/product-marketing.md` + `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` — not blind replicate of live site.
6. **Quotes:** Published greytHR OK; all others labeled PLACEHOLDER.
7. **Reuse:** `N6udS` Nav, `xcXXD` Btn Primary, `NCL0m` Btn Ghost, `e9nTl` Mono Label, `m2UJ8` Metric Cell, `GZSQR` Section Header Split, `igbym` Footer, `JJx7F` Logo.
8. **Pencil:** MCP only — never Read/Grep `.pen`.
9. **No commits** unless user asks.

## Specs (read before each task)

| Doc | Role |
|---|---|
| `.agents/product-marketing.md` | Messaging L0–L2, voice, proof, CTA |
| `docs/superpowers/specs/2026-08-19-factory-experience-brief.md` | Section craft / Home spine |
| `docs/superpowers/specs/2026-08-19-positioning-icp.md` | Positioning / ICP |
| `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` | Sitemap + per-page briefs |
| `docs/proof/customer-logos-and-quotes.md` | Logos + quotes |
| `PRODUCT.md` | Naming + evidence gates |

## File / Artifact Map

| Path | Responsibility |
|---|---|
| `Stack_Linear.pen` | All page frames + components |
| `docs/superpowers/plans/2026-08-19-stackgen-adf-canvas-execution.md` | This plan |
| `.firecrawl/logos-quotes/assets/` | Customer logo files for Import |

## Lane claims (Wave 1 — after Home)

| Lane | Claim x (approx) | Frames |
|---|---|---|
| Home (P0) | existing `JLg8h` @ ~960 | Home + Mobile |
| Products | FindEmptySpace → claim | Infra, Automation, Observability, SRE |
| Platform | FindEmptySpace → claim | Hub + 4 children |
| Cases | FindEmptySpace → claim | Index + greytHR + Innovaccer (+ optional 2) |
| Company | FindEmptySpace → claim | About, Schedule Demo, MCP Server, Contact, Pricing |

---

### Task 1: Home hero + copy lock (P0)

**Files:**
- Modify: `Stack_Linear.pen` frame `JLg8h` / Hero `XPc1X`

**Interfaces:**
- Consumes: L0, L1, L2 from product-marketing.md
- Produces: Hero H1 = Autonomous DevOps Factory; Schedule demo CTA

- [x] **Step 1:** `get_app_state` + `Get('JLg8h')` confirm section tree
- [x] **Step 2:** Update Hero texts to locked H1 / Sub / Support (no em dashes)
- [x] **Step 3:** Ensure hero CTA label is Schedule demo via Btn Primary ref
- [x] **Step 4:** `TakeScreenshot` of Hero; verify brand + one H1 + one CTA

---

### Task 2: Home section order + spine alignment (P0)

**Files:**
- Modify: `Stack_Linear.pen` `JLg8h` child order and section names

**Target order:** Nav → Hero → Logos → Problem → Loop → Agentic OS / Aiden Family → Integrations → Featured case (or fold into Quotes) → Quotes → Motions → Trust → Final CTA → Footer

- [x] **Step 1:** Map existing sections (`d751F`, `vU48B`, `t5DPzG`, `YQTAQ`, `K1zfG`, `f4Wpn4`, `sWPEe`, `ZHuzU`, `sK5Fc`) to spine
- [x] **Step 2:** Reorder with `Move` so Logos precede deep product; Trust near end
- [x] **Step 3:** Rename sections to match brief labels where helpful
- [x] **Step 4:** Screenshot full Home top half

---

### Task 3: Home proof + problem + quotes (P0)

**Files:**
- Modify: Customer Proof, The Gap, In Their Words on `JLg8h`
- Optional Import: `.firecrawl/logos-quotes/assets/*`

- [x] **Step 1:** Logo strip uses live 12-logo set (text names OK if Import blocked)
- [x] **Step 2:** Problem strip: 2–3 attributed cites (DORA / CodeRabbit / New Relic)
- [x] **Step 3:** Quotes: greytHR published + PLACEHOLDER labels for others
- [ ] **Step 4:** Screenshot proof + quotes bands (partial; continue polish)

---

### Task 4: Home loop + Agentic OS + close (P0)

**Files:**
- Modify: How The Factory Works, Aiden Family, Operating Model / Final CTA

- [x] **Step 1:** Loop = Build / Govern / Observe / Remediate → four Aiden products
- [x] **Step 2:** Aiden Family uses correct product names (Automation not DevOps)
- [x] **Step 3:** Final CTA = Schedule demo only; declarative close line
- [ ] **Step 4:** Screenshot loop + close (deferred)

---

### Task 5: Mobile Home sync (P0)

**Files:**
- Modify: `KUYi6` StackGen Home — Mobile

- [x] **Step 1:** Mirror desktop section order and locked copy (narrow layout)
- [x] **Step 2:** Screenshot mobile hero + one mid section

---

### Task 6: Wave 1 Product pages (P1) — parallel OK

**Files:**
- Create: four Product frames via `FindEmptySpace`

- [x] **Step 1:** Claim empty region; write claim note in OpenMemory
- [x] **Step 2:** Build each page from §5 of site-ia-page-briefs.md
- [x] **Step 3:** Nav ref + Schedule demo + Footer
- [ ] **Step 4:** Screenshot each hero (Infra hero verified)

---

### Task 7: Wave 1 Platform + Cases (P1) — parallel OK

**Files:**
- Create: Platform hub (+ children as capacity allows)
- Create: Case Studies index + greytHR + Innovaccer

- [x] **Step 1:** Platform hub = L2 Agentic OS + cross-links to four products
- [x] **Step 2:** greytHR case uses published quote; Innovaccer uses metrics
- [ ] **Step 3:** Screenshots (Platform + Cases index created at x=4550)

---

### Task 8: Wave 1 Company (P2)

**Files:**
- Create: About, Schedule Demo, MCP Server (Pricing/Contact if needed)

- [x] **Step 1:** About = full boilerplate
- [x] **Step 2:** Schedule Demo = conversion only
- [ ] **Step 3:** Screenshots (MCP Server / Pricing / Contact still deferred)

---

### Task 9: Wave 2 verification

- [x] **Step 1:** Every primary CTA = Schedule demo
- [x] **Step 2:** No Olly / em dashes / unverified quotes as real (fixed Wave 2 hits: Olly meta-copy, en-dashes in metrics, estate wording)
- [x] **Step 3:** Naming table audit (Infrastructure / Automation / Observability / SRE)
- [x] **Step 4:** Store OpenMemory implementation memory; update `openmemory.md`

---

### Task 10: Wave B — Solutions / Partners stubs + Company polish

- [x] **Step 1:** Polish Company children MCP (`J6rvOo`), Pricing (`rGgCZ`), Contact (`uQMHH`) — mechanism / model / form stub
- [x] **Step 2:** Claim x≈9110; insert Solutions hub + Motions A/B/C + Partners stubs
- [x] **Step 3:** Verify Schedule demo CTAs + banned-term scan on new frames
- [ ] **Step 4:** Optional deeper Solutions IA (not started)

---

## Parallel topology

```text
Wave 0 — DONE (components + Direction Contract)
Wave P0 — SERIAL: Tasks 1–5 (Home + Mobile)
Wave 1 — PARALLEL (max 4): Tasks 6–8
Wave 2 — SERIAL: Task 9
Wave B — DONE stubs (Task 10); deeper Solutions IA still optional
```

## Acceptance (Home)

From Factory experience brief checklist: one composition · logos before depth · loop namable · system not feature cards · real proof before final CTA · Schedule demo only · Linear + `#9437FF`.
