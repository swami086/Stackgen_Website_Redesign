# Positioning Deck Incorporation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Incorporate `sg-new-postn-deck/` narrative and high-fidelity editable diagrams into `Stack_Linear.pen` under hybrid C (deck mechanism + site naming/Linear/CTA/evidence).

**Architecture:** Spec-first messaging reconcile (W0), then serial canvas waves Home → Products → Platform (W1–W3), then verification (W4). Every diagram is rebuilt as Pencil layers using Linear tokens only — never flattened slide PNGs. Factory process (Intent→Spec→Runtime→Learning) and product loop (Build→Govern→Observe→Remediate) stay as two distinct Home diagrams.

**Tech Stack:** Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`), OpenMemory `Stackgen_Website_Redesign`, deck source `sg-new-postn-deck/` + `.firecrawl/postn-deck/`

## Global Constraints

1. **Canvas:** `Stack_Linear.pen` only. Pencil MCP only — never Read/Grep `.pen`.
2. **Visual world:** Linear dark tokens only (`$bg-base`, `$bg-raised`, `$surface-card`, `$border-hairline`, `$text-*`, `$accent` `#9437FF`). No glow. No cyan as second brand accent.
3. **Diagrams:** Fully editable layers; high information density; restyle deck structure — do not dumb down to three icon cards.
4. **Naming:** Aiden for Infrastructure · Automation · Observability · SRE. Map DevOps→Automation, InfraOps→Infrastructure. Never Olly.
5. **CTA:** Schedule demo only (`xcXXD` Btn Primary).
6. **Evidence:** No slide-14 `$4M–$6M` or other modeled dollar ROI on public frames. No unverified quotes as real.
7. **Voice:** No em dashes on canvas or in patched marketing copy destined for canvas.
8. **Reuse:** `N6udS` Nav, `xcXXD` Btn Primary, `NCL0m` Btn Ghost, `e9nTl` Mono Label, `m2UJ8` Metric Cell, `GZSQR` Section Header Split, `igbym` Footer, `JJx7F` Logo.
9. **No commits** unless user asks.
10. **Design source of truth:** `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md`

## Specs (read before each task)

| Doc | Role |
|---|---|
| `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md` | Incorporation design (locked) |
| `.agents/product-marketing.md` | Messaging lock (patch in W0) |
| `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` | Page briefs (patch in W0) |
| `docs/superpowers/specs/2026-08-19-factory-experience-brief.md` | Home density / spine craft |
| `PRODUCT.md` | Naming + evidence gates |
| `.firecrawl/postn-deck/all-slides-text.txt` | Deck copy extract |
| `.firecrawl/postn-deck/previews/` | Structure reference for rebuilds |

## File / Artifact Map

| Path | Responsibility |
|---|---|
| `Stack_Linear.pen` | All page frames + diagrams |
| `.agents/product-marketing.md` | W0 messaging reconcile |
| `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` | W0 diagram slots on briefs |
| `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md` | Living design |
| `docs/superpowers/plans/2026-08-19-postn-deck-incorporation.md` | This plan |
| `openmemory.md` | Index update after W4 |
| `sg-new-postn-deck/*.pdf` | Visual reference only (do not Import as diagram) |

## Frame ID cheat sheet

| Surface | Id | Approx x |
|---|---|---|
| Home | `JLg8h` | 960 |
| Home Mobile | `A38GWG` (was KUYi6; rebuilt Task 5) | 2560 |
| Product Infrastructure | `T4FJtW` | 3030 |
| Product Automation | `zTOam` | 3030 |
| Product Observability | `OAfMk` | 3030 |
| Product SRE | `bEaQH` | 3030 |
| Platform hub | `HL34b` (was BQ6Ld; rekeyed Task 10) | 4550 |
| Problem section (Home) | `vU48B` | — |
| ADF Loop section (Home) | `t5DPzG` | — |
| Mechanism section (Home) | `sK5Fc` | — |

## Skills Matrix (Cursor catalog — installed)

All skills below are **already installed** under `~/.agents/skills`, `~/.cursor/skills`, or Superpowers plugin skills. Do **not** `npx skills add` for this plan unless a skill path is missing on the worker machine.

### Orchestration (whole plan)

| Skill | Path hint | When |
|---|---|---|
| `using-superpowers` | Superpowers plugin | Session start / skill routing |
| `brainstorming` | Superpowers plugin | Done — design locked |
| `writing-plans` | Superpowers plugin | Done — this plan |
| `subagent-driven-development` | Superpowers plugin | **Recommended** execution mode |
| `executing-plans` | Superpowers plugin | Alternate inline execution |
| `dispatching-parallel-agents` | Superpowers plugin | W2 Tasks 6–9 only |
| `verification-before-completion` | Superpowers plugin | Task 12 (W4) |

### Per-task Skills Assigned

| Task | Wave | Required skills | Optional (use if stuck) | Do not use |
|---|---|---|---|---|
| **0** Design status + memory | W0 | OpenMemory MCP | — | — |
| **1** Patch product-marketing.md | W0 | `product-marketing` · `positioning-ideas` · `copywriting` · `devil-advocate` | `humanizer` · `value-proposition-canvas` · `gtm-motions` | Catalog `positioning-messaging` installs (redundant) |
| **2** Patch site-ia briefs | W0 | `product-marketing` · `copywriting` | `gtm-motions` | — |
| **3** Home Problem + creation/ops diagram | W1 | `impeccable` (layout) · `design-taste-frontend` · Pencil MCP | `high-end-visual-design` if diagram goes muddy; `minimalist-ui` if noisy | `image-to-code` as diagram body; `figma` (no token / PDF source) |
| **4** Home Factory process diagram | W1 | `impeccable` (layout) · `design-taste-frontend` · Pencil MCP | `high-end-visual-design` | Flattened slide PNG Import |
| **5** Home OCG teaser + mobile | W1 | `impeccable` (adapt/layout) · Pencil MCP | `design-taste-frontend` | — |
| **6** Product SRE diagram | W2 | `impeccable` · `design-taste-frontend` · Pencil MCP · (`dispatching-parallel-agents` if parallel) | `copywriting` for step labels | `Aiden for DevOps` wording |
| **7** Product Automation diagram | W2 | same as Task 6 | `copywriting` (DevOps→Automation rename) | Product name DevOps |
| **8** Product Infrastructure + EA strip | W2 | same as Task 6 · `devil-advocate` (claims on EA strip) | `copywriting` | InfraOps SKU; slide-10 timeline numbers unless unlocked |
| **9** Product Observability diagram | W2 | same as Task 6 | — | Olly |
| **10** Platform full OCG | W3 | `impeccable` · `design-taste-frontend` · Pencil MCP | `high-end-visual-design` | Glow/cyan from slide 7 |
| **11** Platform Aiden OS + roadmap | W3 | `impeccable` · `copywriting` · `devil-advocate` · Pencil MCP | `gtm-motions` for roadmap framing | GA claims for Early Access / H1 2027 |
| **12** Verify + memory | W4 | `verification-before-completion` · OpenMemory | `impeccable` critique only if defects found | New scope creep |

### Agent prompt block (copy into every subagent)

```text
Skills Assigned (required): <from matrix row for this task>
Skills Assigned (optional): <from matrix row>
Global constraints: docs/superpowers/plans/2026-08-19-postn-deck-incorporation.md §Global Constraints
Design: docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md
Diagram craft checklist: same plan file
Do not: Import whole-slide PNGs as diagrams; cyan/glow; rename products to DevOps/InfraOps; publish slide-14 $ ROI
```

### Catalog explicitly out of scope for this plan

| Skill / package | Reason |
|---|---|
| `figma` / Figma MCP | Source is `sg-new-postn-deck/*.pdf`, not Figma API |
| `image-to-code` as primary diagram path | Violates editable-layers requirement |
| `npx skills add` positioning-messaging / generic design-critique | Redundant with installed `positioning-ideas` + `product-marketing` + `impeccable` |
| `brandkit` | Linear world already pinned in PRODUCT.md |

## Diagram craft checklist (every diagram task)


Before finishing any diagram step, confirm:

```text
- [ ] No type:image fill of a whole slide PDF/PNG as the diagram body
- [ ] Fills/strokes use $ tokens only (no hardcoded #00D2FF cyan, no glow effects)
- [ ] Labels use locked product names (Automation not DevOps; Infrastructure not InfraOps)
- [ ] No em dash characters (— or –) in any text content
- [ ] TakeScreenshot of the diagram section; Get() text dump for banned-term scan
```

Banned-term scan snippet (Pencil `execute`):

```javascript
const roots = ['JLg8h'] // replace with task frame ids
const banned = [/—/, /–/, /\bOlly\b/i, /\bDevOps\b/, /\bInfraOps\b/, /\$4M|\$6M|\$2\.9M/i, /single pane of glass/i, /\bestate\b/i]
for (const id of roots) {
  Get(id, (n) => {
    if (n.type === 'text' && n.content) {
      for (const re of banned) {
        if (re.test(n.content)) Print('BAN', id, n.id, n.content)
      }
    }
  })
}
```

Note: `\bDevOps\b` will also hit legitimate phrases like “DevOps Factory” / “Agentic OS for DevOps” / “AI-native DevOps environments” which **are allowed**. After the scan, manually dismiss hits that are the locked L0/L1/L2 strings. Fail the task only for product naming (`Aiden for DevOps`) or banned evidence strings.

---

### Task 0: Mark design approved + OpenMemory note

**Skills Assigned:** OpenMemory MCP only (status already Approved in prior turn; re-confirm if needed)

**Files:**
- Modify: `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md` (status line)
- OpenMemory: add project fact

**Interfaces:**
- Consumes: user approval of design
- Produces: status `Approved for writing-plans / execution`

- [x] **Step 1:** Set design Status to `Approved 2026-08-19 — execution via this plan`
- [x] **Step 2:** `add_memories` project fact summarizing hybrid C + editable Linear diagrams + ROI off public + plan path
- [x] **Step 3:** Do not commit unless user asks

---

### Task 1 (W0): Patch product-marketing.md — deck vocabulary under hybrid C

**Skills Assigned (required):** `product-marketing` · `positioning-ideas` · `copywriting` · `devil-advocate`  
**Skills Assigned (optional):** `humanizer` · `value-proposition-canvas` · `gtm-motions`

**Files:**
- Modify: `.agents/product-marketing.md`
- Read: `docs/superpowers/specs/2026-08-19-postn-deck-incorporation-design.md` §3–4
- Read: `.firecrawl/postn-deck/all-slides-text.txt`

**Interfaces:**
- Consumes: locked L0–L2, naming table
- Produces: new subsection `## Factory process & OCG (deck harvest)` usable by canvas tasks

- [x] **Step 1:** After the Naming (binding) paragraph, keep naming table unchanged. Do not reintroduce DevOps/InfraOps product names.

- [x] **Step 2:** Insert the following section (adapt em dashes out — use commas or periods):

```markdown
## Factory process & OCG (deck harvest)

**Authority:** Hybrid C from postn-deck incorporation. Mechanism language from `sg-new-postn-deck/`. Naming/CTA/evidence remain this document + PRODUCT.md.

### Factory process (not a product loop)

Intent → Factory Spec → Factory Runtime → Factory Learning.

- **Intent:** State the operational outcome in plain language.
- **Factory Spec:** Reviewable spec defining agents, OCG data, SLOs, and escalation boundaries.
- **Factory Runtime:** Agents execute configured tasks; novel edge cases escalate to humans with full context.
- **Factory Learning:** Patterns and remediation outcomes write back to the OCG.

This is the ADF **operating process**. It is distinct from the **product loop** Build → Govern → Observe → Remediate (four Aiden products).

### Operational Context Graph (OCG)

Shared memory across domains: infrastructure topology, change attribution, drift history, incident causality, observability correlations. What separates a factory from a collection of stateless domain agents.

### Problem enrichment (site L1b companion)

Software creation velocity (agentic IDEs / PR volume) outpaces software operations. Manual delivery toll (supervised deploys, approval gridlock, stale runbooks). Reactive SRE without shared change context. Stateless domain agents fail cross-domain plays. Prefer attributed industry cites on the public Home (DORA / CodeRabbit / New Relic); deck anecdote numbers need a source before use as metrics.

### Evidence park (not for public canvas until unlocked)

Slide 14 modeled annual value ($4M–$6M for a 500-engineer company) and similar modeled ROI figures: sales-only until finance/AR sign-off.
```

- [x] **Step 3:** Bump document version note to `v1.1` and add `Last updated` note that deck harvest vocabulary was added without changing L0–L2 locks.

- [x] **Step 4:** Grep the file for `Aiden for DevOps` and `Aiden for InfraOps` — expect **zero** hits. Grep for `Factory Spec` and `Operational Context Graph` — expect hits in the new section.

---

### Task 2 (W0): Patch site-ia-page-briefs.md — diagram slots

**Skills Assigned (required):** `product-marketing` · `copywriting`  
**Skills Assigned (optional):** `gtm-motions`

**Files:**
- Modify: `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md`
- Read: design §5–7

**Interfaces:**
- Consumes: Task 1 vocabulary
- Produces: explicit diagram requirements per surface for W1–W3 agents

- [x] **Step 1:** In §4 HOME section spine table, add/adjust rows so the spine includes:

| # | Section | Job | Diagram |
|---|---|---|---|
| Problem | Creation vs ops + governance gap | Editable 2-col creation/ops and/or domain-silo gap |
| Factory process | Intent→Spec→Runtime→Learning | Editable 4-step process (distinct from product loop) |
| ADF / product loop | Build→Govern→Observe→Remediate | Keep existing schematic |
| OCG teaser | Shared memory hook | Compact editable OCG; full diagram on Platform |

Exact insert order vs Mechanism/Logos: decide in Task 3 against Factory brief density; document the chosen order in a one-line note under the Home spine.

- [x] **Step 2:** In each Product brief (§5.1–5.4), add a **Diagram** bullet matching design §6 (SRE play, Automation pipeline, Infrastructure intent+EA strip, Observability correlations).

- [x] **Step 3:** In Platform hub brief (§6), add: full OCG centerpiece; Aiden OS modules (orchestration + financial governance); roadmap strip (Available / Early Access / H1 2027 MLOps Factory) labeled roadmap.

- [x] **Step 4:** Add to copy checklist: “No slide-14 dollar ROI” and “Factory process ≠ product loop”.

---

### Task 3 (W1): Home Problem enrichment + creation/ops diagram

**Skills Assigned (required):** `impeccable` (layout) · `design-taste-frontend` · Pencil MCP  
**Skills Assigned (optional):** `high-end-visual-design` · `minimalist-ui`

**Files:**
- Modify: `Stack_Linear.pen` sections `vU48B` (Problem) on `JLg8h`
- Reference: slides 1–4 text in `.firecrawl/postn-deck/all-slides-text.txt`
- Reference: existing cites already on Problem

**Interfaces:**
- Consumes: Task 1 L1b companion language
- Produces: enriched Problem with editable diagram; existing DORA/CodeRabbit/New Relic cites retained

- [x] **Step 1:** `get_app_state` + `Print(Get('vU48B', {depth: 3}))` to map current Problem children.

- [x] **Step 2:** Set `Update('JLg8h', {placeholder: true})` while editing. Enrich copy: add a short paradox line (creation outpaces operations) without em dashes. Keep attributed cites.

- [x] **Step 3:** Insert editable diagram frame inside Problem (or immediately below header): horizontal two columns — **Software Creation** vs **Software Operations** — with a labeled Gap between. Use `$surface-card`, `$border-hairline`, `$text-primary`/`$text-secondary`, `$accent` for the gap marker only.

- [x] **Step 4:** Optional second row: three failure modes as compact rows (manual toll, reactive SRE context gap, stateless domain agents) — not a card farm of icons. Max three.

- [x] **Step 5:** `TakeScreenshot(['vU48B'])` + banned-term scan on `JLg8h`. `Update('JLg8h', {placeholder: false})` when stable mid-Home work if continuing in same session; else leave placeholder until Task 5 completes.

---

### Task 4 (W1): Home Factory process diagram (slide 12 restyle)

**Skills Assigned (required):** `impeccable` (layout) · `design-taste-frontend` · Pencil MCP  
**Skills Assigned (optional):** `high-end-visual-design`

**Files:**
- Modify: `Stack_Linear.pen` `JLg8h` — new section or upgrade near `t5DPzG`
- Reference: slide 12 preview + text

**Interfaces:**
- Consumes: Task 1 factory process vocabulary
- Produces: section named `Factory Process` (or similar) with 4 editable steps; product loop `t5DPzG` remains separate

- [x] **Step 1:** Decide order: place Factory Process **after** Problem and **before or after** existing ADF Loop `t5DPzG`. Prefer: Problem → Factory Process → ADF Loop (product loop) so process then products. `Move` nodes to match.

- [x] **Step 2:** Build four step modules in a horizontal row (desktop):

| Step | Title | Body (no em dashes) |
|---|---|---|
| 01 | Intent | State the operational outcome in plain language. |
| 02 | Factory Spec | Reviewable spec: agents, OCG data, SLOs, escalation boundaries. |
| 03 | Factory Runtime | Agents execute; novel cases escalate to humans with full context. |
| 04 | Factory Learning | Outcomes write back to the OCG and improve the next cycle. |

Connect with simple hairline connectors or chevron gaps (no glow).

- [x] **Step 3:** Section header via `GZSQR` or existing header pattern: left H2 “From intent to automated learning”, right body clarifying this is the factory **process**, not the four product names.

- [x] **Step 4:** Screenshot + banned-term scan. Confirm `t5DPzG` still shows Build/Govern/Observe/Remediate and four Aiden product names.

---

### Task 5 (W1): Home OCG teaser + mobile mirror

**Skills Assigned (required):** `impeccable` (adapt/layout) · Pencil MCP  
**Skills Assigned (optional):** `design-taste-frontend`

**Files:**
- Modify: `JLg8h` (OCG teaser section)
- Modify: `KUYi6` (mirror Problem enrichment, Factory Process, OCG teaser at mobile density)

**Interfaces:**
- Consumes: Tasks 3–4 structure
- Produces: Home complete for W1; mobile readable

- [x] **Step 1:** Insert compact OCG teaser after Factory Process or after Agentic OS band (pick denser-friendly slot; note choice in plan checkbox comment). Five node labels: Topology, Change, Drift, Causality, Observability. One support line: shared memory separates a factory from a pile of agents. Link implication to Platform (copy only; no real routing).

- [x] **Step 2:** Mirror on `KUYi6`: stack Factory Process steps vertically; simplify OCG to a vertical list; keep paradox one-liner + cites.

- [x] **Step 3:** Full Home screenshot top+mid; mobile hero+Problem+Factory Process. Banned-term scan both frames.

- [x] **Step 4:** `Update` placeholders false on both Home frames. Store OpenMemory implementation note for W1.

---

### Task 6 (W2): Product — SRE investigation diagram (slide 8)

**Skills Assigned (required):** `impeccable` · `design-taste-frontend` · Pencil MCP  
**Skills Assigned (optional):** `copywriting` · `dispatching-parallel-agents` (orchestrator only)

**Files:**
- Modify: `Stack_Linear.pen` `bEaQH` Mechanism section
- Reference: slide 8 text (rename any DevOps leftovers away)

**Interfaces:**
- Consumes: Task 1 OCG language
- Produces: editable SRE play sequence on Mechanism

- [x] **Step 1:** `Print(Get('bEaQH', {depth: 2}))` locate Mechanism frame id.

- [x] **Step 2:** Replace thin Mechanism body with vertical or swimlane sequence:

```text
Infra drift present → P1 alert → Root cause via OCG → Remediation generated → Policy-validated deploy → Verification / SLO recovered
```

Side labels allowed: Infrawatch / ChangeCorrelation / RootCause / Remediation / Deploy / Verification as **step names**, not product SKUs.

- [x] **Step 3:** Footnote line: workflow orchestration sequences steps; policy enforces each action boundary. Do not claim Temporal/OPA partnership logos.

- [x] **Step 4:** Screenshot Mechanism + banned-term scan on `bEaQH`. No `$` ROI, no “Aiden for DevOps”.

---

### Task 7 (W2): Product — Automation pipeline diagram (slide 9)

**Skills Assigned (required):** `impeccable` · `design-taste-frontend` · Pencil MCP  
**Skills Assigned (optional):** `copywriting` (DevOps→Automation)

**Files:**
- Modify: `zTOam` Mechanism
- Reference: slide 9 (map “Aiden for DevOps” → Automation in all labels)

**Interfaces:**
- Consumes: naming map
- Produces: self-verifying pipeline diagram

- [x] **Step 1:** Build editable pipeline: Code commit → Build/Test → Infra checks against OCG → Active gating → Deploy → Monitoring.

- [x] **Step 2:** Callouts: Active Gating (check current infra state vs historical failure patterns in OCG); Self-Verification (deployments verify themselves; mitigate drift).

- [x] **Step 3:** Ensure page title/hero still say **Aiden for Automation**. Grep/Get scan for `DevOps` as product name — zero hits of `Aiden for DevOps`.

- [x] **Step 4:** Screenshot + banned-term scan.

---

### Task 8 (W2): Product — Infrastructure diagram + Early Access strip (slides 5–6, 10)

**Skills Assigned (required):** `impeccable` · `design-taste-frontend` · `devil-advocate` · Pencil MCP  
**Skills Assigned (optional):** `copywriting`

**Files:**
- Modify: `T4FJtW` Mechanism (+ optional strip below)

**Interfaces:**
- Consumes: Intent/Factory Spec language; Migration as Early Access only
- Produces: intent→policy-checked change diagram; EA callout without new nav SKU

- [x] **Step 1:** Mechanism diagram: Plain-language intent → Factory Spec / policy-checked plan → change lands under guardrails. Align with existing Infrastructure proof metrics.

- [x] **Step 2:** Early Access strip (below Mechanism or above Final CTA):

```text
Label: EARLY ACCESS
Title: Policy-bounded migration
Body: Drift detection, baseline audits, and threshold rollbacks for live workloads in transit. Not a separate product in nav.
CTA: Schedule demo (xcXXD)
```

Do not title it InfraOps. Do not publish “6→9 months” or dollar claims unless already approved elsewhere (default: omit timeline compression numbers from slide 10).

- [x] **Step 3:** Screenshot + banned-term scan (`InfraOps` must be zero).

---

### Task 9 (W2): Product — Observability OCG correlations (slide 7 slice)

**Skills Assigned (required):** `impeccable` · `design-taste-frontend` · Pencil MCP

**Files:**
- Modify: `OAfMk` Mechanism

**Interfaces:**
- Consumes: OCG node set
- Produces: lighter correlation diagram (not full Platform OCG)

- [x] **Step 1:** Diagram: Observability signals linked to infrastructure state + change attribution. Three nodes minimum: Metrics/Logs/Traces · Infra state · Change history.

- [x] **Step 2:** No Olly. Keep Observability product metrics already on page.

- [x] **Step 3:** Screenshot + banned-term scan.

---

### Task 10 (W3): Platform — full OCG diagram (slide 7)

**Skills Assigned (required):** `impeccable` · `design-taste-frontend` · Pencil MCP  
**Skills Assigned (optional):** `high-end-visual-design`

**Files:**
- Modify: `BQ6Ld`
- Reference: slide 7 structure

**Interfaces:**
- Consumes: Home OCG teaser (must remain a teaser, not duplicate full fidelity if density fights — Platform is canonical full diagram)
- Produces: centerpiece OCG on Platform hub

- [x] **Step 1:** Map current Platform children; insert section `Operational Context Graph` after Hero or after Two Planes (prefer after Two Planes so planes → shared memory → products).

- [x] **Step 2:** Editable hub diagram with center “OCG Shared Intel” and satellites:

```text
Infrastructure Topology
Change Attribution
Drift History
Incident Causality
Observability Correlations
```

Support copy: The OCG connects operational domains into a queryable graph. That is what separates a factory from a collection of agents.

- [x] **Step 3:** Screenshot + banned-term scan.

---

### Task 11 (W3): Platform — Aiden OS modules + roadmap strip (slides 11, 13)

**Skills Assigned (required):** `impeccable` · `copywriting` · `devil-advocate` · Pencil MCP  
**Skills Assigned (optional):** `gtm-motions`

**Files:**
- Modify: `BQ6Ld`

**Interfaces:**
- Consumes: design §7
- Produces: OS band + roadmap; keep product cross-links and Final CTA

- [x] **Step 1:** Aiden OS section with two Linear modules:

| Module | Body |
|---|---|
| Workflow orchestration | Sequences multi-agent work with escalation to humans when bounds are hit. |
| Financial governance | Tracks inference and cost guardrails so autonomy stays inside budget policy. |

No glow orbs from slide 11 — abstract with cards/hairlines only.

- [x] **Step 2:** Roadmap strip (labeled **Roadmap**):

| Column | Items |
|---|---|
| Currently Available | Aiden for Automation · Aiden for SRE |
| Early Access | Aiden for Infrastructure · ADF factory generation |
| H1 2027 | MLOps Factory |

Use locked names (Automation not DevOps; Infrastructure not InfraOps).

- [x] **Step 3:** Screenshot full Platform mid+bottom; banned-term scan; confirm Schedule demo CTAs still `xcXXD`.

---

### Task 12 (W4): Verification + guide/memory

**Skills Assigned (required):** `verification-before-completion` · OpenMemory  
**Skills Assigned (optional):** `impeccable` critique only if defects found

**Files:**
- Modify: `openmemory.md` Patterns section
- Modify: this plan checkboxes
- OpenMemory: implementation memory

**Interfaces:**
- Consumes: all W1–W3 frame ids
- Produces: green acceptance from design §11

- [x] **Step 1:** Run banned-term scan across: `JLg8h`, `A38GWG`, `T4FJtW`, `zTOam`, `OAfMk`, `bEaQH`, `HL34b`. Fix any real failures.

- [x] **Step 2:** Confirm acceptance checklist from design §11 (editable diagrams, tokens, naming, two Home diagrams distinct, OCG full on Platform, Schedule demo only, no slide-14 $, mobile mirror, docs patched).

- [x] **Step 3:** Update `openmemory.md` with W1–W3 diagram section ids and plan status complete.

- [x] **Step 4:** `add_memories` project implementation: what landed where; ROI still parked; naming map applied.

- [x] **Step 5:** Offer user optional commit (do not commit unasked).

---

## Parallel topology

```text
W0 — SERIAL: Tasks 0–2 (docs)     skills: see Skills Matrix
W1 — SERIAL: Tasks 3–5 (Home)     skills: impeccable + design-taste-frontend + Pencil
W2 — PARALLEL OK: Tasks 6–9       skills: same + dispatching-parallel-agents
W3 — SERIAL: Tasks 10–11          skills: impeccable + copywriting + devil-advocate + Pencil
W4 — SERIAL: Task 12              skills: verification-before-completion
```

Max parallel in W2: 4 agents, one frame each (`bEaQH`, `zTOam`, `T4FJtW`, `OAfMk`). Each W2 agent prompt **must** include the Skills Assigned block from the Skills Matrix.

## Spec coverage (self-review)

| Design section | Tasks |
|---|---|
| §1 Decisions / hybrid C / ROI off | Global constraints + Tasks 1, 12 |
| §3 Naming map | Tasks 1, 6–11, 12 |
| §4 Slide inventory | Tasks 3–11 mapped 1:1 |
| §5 Home | Tasks 3–5 |
| §6 Products | Tasks 6–9 |
| §7 Platform | Tasks 10–11 |
| §8 Diagram craft | Checklist + every canvas task |
| §9 Doc updates | Tasks 1–2 |
| §10 Waves | Topology above |
| §11 Acceptance | Task 12 |
| §12 Out of scope | Global constraints (no glow, no rename, no $ ROI) |

## Placeholder scan

No TBD/TODO implementation steps. Open density order for Home sections is explicitly decided in Task 4 Step 1 (not left blank).
