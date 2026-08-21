# StackGen Marketing-Core Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:dispatching-parallel-agents` to run Wave 1 lanes in parallel (max 10), then `superpowers:subagent-driven-development` or `superpowers:executing-plans` for any residual serial work. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Orchestrator:** Parent agent must attach the **Skills Assigned** block for each lane into that subagent’s prompt. Subagents must `Read` each listed `SKILL.md` before acting.

**Goal:** Replicate written content from `stackgen.com` (Scope A — marketing core) onto the Pencil canvas `Stack_Linear.pen` as additional page frames in the locked Linear design system, without inventing claims or renaming products.

**Architecture:** One shared `.pen` file. Wave 0 (serial) freezes tokens, reusable components, and a content inventory. Wave 1 runs up to 10 parallel page-build lanes that only `Insert`/`Copy` into assigned empty regions of the canvas. Wave 2 (serial) reconciles nav cross-links, mobile companions, and a verification pass. Copy is scraped from live URLs via Firecrawl; visual world stays Linear-pinned (Direction Contract + homepage design spec).

**Tech Stack:** Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`), Firecrawl CLI, OpenMemory project `Stackgen_Website_Redesign`, Cursor skills listed per lane below.

## Global Constraints

Copied verbatim from `PRODUCT.md`, Direction Contract (`Vrb0t`), and `docs/superpowers/specs/2026-08-18-stackgen-linear-homepage-design.md`:

1. **Canvas:** `Stack_Linear.pen` only (do not create a second marketing `.pen` unless the orchestrator explicitly forks).
2. **Visual world:** Linear-pinned dark (`$bg-base` `#08090A`, `$bg-raised` `#0E0F11`). Accent `$accent` `#9437FF`. Fonts Inter + JetBrains Mono. **No gradients** (exception: existing StackGen logo icon mark only). **No glow shadows. No per-agent colour. No eyebrows** on section headers beyond the Direction Contract.
3. **Naming (untouchable):** Aiden for Infrastructure · Aiden for Automation · Aiden for Observability · Aiden for SRE. Never “Olly”. Live URL `/product/aiden-for-devops` maps to **Aiden for Automation** on canvas.
4. **Copy rules:** Replicate existing site written content. Do not invent metrics, quotes, or customer names. Placeholder quotes stay labelled. Em-dash (`—` / `–`) banned on canvas text — rewrite with comma/colon/period.
5. **CTA label:** Primary action = **Schedule demo** everywhere (nav + hero).
6. **Page frame:** Desktop 1440 wide, `clip: true`, vertical layout, `$pad-x` horizontal padding. Place new pages via `FindEmptySpace` — never overlap `StackGen Home` / Mobile / Direction Contract / `StackGen Logo` component.
7. **Reuse:** Prefer `ref` to reusable components created in Wave 0. Prefer `Copy` of Nav from Home rather than rebuilding.
8. **OpenMemory:** `project_id` = `Stackgen_Website_Redesign`. Search before inventing patterns; store one implementation memory per completed lane.
9. **No commits** unless the user asks.
10. **Scope A exclusions:** Blog posts, legal pages, careers detail, test/legacy URLs (`/homepage-v5`, `/test-*`, cookie, EULA, etc.).

---

## Scope A — Page Inventory (authoritative)

| Lane | Canvas frame name(s) | Source URL(s) |
|---|---|---|
| L0 Foundation | (components + inventory files) | — |
| L1 Home complete | `StackGen Home`, `StackGen Home — Mobile` | `https://stackgen.com/` + outline doc |
| L2 Product Infrastructure | `Product — Aiden for Infrastructure` | `https://stackgen.com/product/aiden-for-infrastructure` |
| L3 Product Automation | `Product — Aiden for Automation` | `https://stackgen.com/product/aiden-for-devops` (rename on canvas) |
| L4 Product Observability | `Product — Aiden for Observability` | `https://stackgen.com/product/aiden-for-observability` |
| L5 Product SRE | `Product — Aiden for SRE` | `https://stackgen.com/product/aiden-for-sre` |
| L6 Platform hub + keys | `Platform`, `Platform — Integrations`, `Platform — Cloud to Code`, `Platform — Custom Policies`, `Platform — IaC Lifecycle` | `/platform`, `/platform/integrations`, `/platform/cloud-to-code`, `/platform/custom-policies`, `/platform/iac-lifecycle-management` |
| L7 Solutions pack | `Solutions — {slug}` × 15 | all `/solutions/*` in inventory |
| L8 Case studies | `Case Studies`, `Case Study — GreytHR`, `Case Study — Innovaccer`, + 2 remaining | `/case-studies` + children |
| L9 Integrations + Partners | `Integrations — *`, `Partners`, `Partners — AWS/Azure/GCP` | `/integrations/*`, `/partners*` |
| L10 Company conversion | `About`, `Pricing`, `Contact`, `Schedule Demo`, `MCP Server` | `/about`, `/pricing`, `/contact-us`, `/schedule-demo`, `/mcp-server` |

**Deferred (not Wave 1):** remaining `/platform/*` children beyond L6 keys; legacy aliases `/aiden-for-*`, `/aiden-ai-agent`, `/schedule-demo-aiden`. Document as Wave 3 backlog in the inventory file.

**Rough count Wave 1:** ~40 page frames (+ mobile companions only where Wave 2 requires; default Wave 1 = desktop only to keep parallel work isolated).

---

## File / Artifact Map

| Path | Owner | Responsibility |
|---|---|---|
| `Stack_Linear.pen` | All lanes | Page frames + components |
| `docs/content-inventory/2026-08-19-scope-a.md` | L0 | URL → section → copy checksum list |
| `docs/content-inventory/lane-claims.md` | L0 + orchestrator | Canvas region claims (x/y ranges) so parallel Inserts do not collide |
| `docs/superpowers/plans/2026-08-19-stackgen-marketing-core-canvas.md` | Orchestrator | This plan |
| `.firecrawl/scope-a/*.md` | Each lane | Per-URL scrape outputs |

---

## Parallel Topology (max 10 subagents)

```text
Wave 0 (SERIAL — 1 agent)
  └─ L0 Foundation

Wave 1 (PARALLEL — up to 10 agents; L1–L10)
  L1 Home │ L2 Infra │ L3 Auto │ L4 Obser │ L5 SRE
  L6 Platform │ L7 Solutions │ L8 Cases │ L9 Integ/Partners │ L10 Company

Wave 2 (SERIAL — 1 agent)
  └─ Nav wiring · mobile companions · verification · OpenMemory store
```

**Collision rule:** Before Wave 1 dispatch, L0 writes `lane-claims.md` with exclusive `FindEmptySpace` anchors (or fixed x offsets). Each lane only writes inside its claimed region.

**Dispatch skill for orchestrator:**  
`/Users/swami/.cursor/plugins/cache/cursor-public/superpowers/d884ae04edebef577e82ff7c4e143debd0bbec99/skills/dispatching-parallel-agents/SKILL.md`

---

## Shared Skills Catalog (all lanes)

Every subagent prompt MUST include these first:

| Skill | Path | Why |
|---|---|---|
| `using-superpowers` | `/Users/swami/.cursor/plugins/cache/cursor-public/superpowers/d884ae04edebef577e82ff7c4e143debd0bbec99/skills/using-superpowers/SKILL.md` | Skill-check gate |
| `firecrawl-cli` | `/Users/swami/.cursor/plugins/cache/cursor-public/firecrawl/866f30d4dc0b3eca6a05884f6b6db6d914a5967c/skills/firecrawl-cli/SKILL.md` | Scrape source copy |
| `impeccable` | `/Users/swami/.cursor/skills/impeccable/SKILL.md` | Design craft floor; run `context.mjs --target Stack_Linear.pen`; Persuade mode |
| `design-taste-frontend` | `/Users/swami/.agents/skills/design-taste-frontend/SKILL.md` | Anti-slop preflight (em-dash ban, CTA consistency, hero stack) — **override only where Direction Contract pins Linear splits / Inter** |

**Pencil:** Use MCP server `project-0-Stackgen_Website_Redesign-pencil-docker` (`get_app_state` → `get_guidelines` Landing Page → `execute`). Never `Read`/Grep `.pen` files.

**Orchestrator-only skills:**

| Skill | Path | When |
|---|---|---|
| `dispatching-parallel-agents` | `.../superpowers/.../skills/dispatching-parallel-agents/SKILL.md` | Wave 1 launch |
| `subagent-driven-development` | `.../superpowers/.../skills/subagent-driven-development/SKILL.md` | Review between waves |
| `verification-before-completion` | `.../superpowers/.../skills/verification-before-completion/SKILL.md` | Wave 2 gate |
| `writing-plans` | `.../superpowers/.../skills/writing-plans/SKILL.md` | Plan edits only |

---

## Per-Lane Skill Matrix

| Lane | Extra skills (beyond Shared) | Purpose |
|---|---|---|
| **L0 Foundation** | `copywriting` (`/Users/swami/.agents/skills/copywriting/SKILL.md`) — inventory hygiene only, no rewrite | Normalize scraped headings into inventory rows |
| **L1 Home complete** | `humanizer` (`/Users/swami/.agents/skills/humanizer/SKILL.md`) only if em-dash / AI-tell cleanup needed on *new* home bands | Fill missing home bands (integrations, compliance) from live site |
| **L2–L5 Product** | `copywriting` — preserve voice; map DevOps→Automation; strip em-dashes | One product page each |
| **L6 Platform** | `high-end-visual-design` (`/Users/swami/.agents/skills/high-end-visual-design/SKILL.md`) — restrained; do not break Linear tokens | Hub + 4 key capability pages |
| **L7 Solutions** | `copywriting` | 15 persona/use-case pages; shared template |
| **L8 Case studies** | `copywriting` + honesty gate (no fake quotes) | Index + 4 studies; unverified quotes must stay labelled placeholder |
| **L9 Integrations/Partners** | `firecrawl-cli` (logo asset URLs) | Logo grids + partner pages |
| **L10 Company** | `copywriting` | About, Pricing, Contact, Schedule Demo, MCP |
| **Wave 2 Verify** | `verification-before-completion` + `design-taste-frontend` preflight checklist | Cross-page consistency |

**Do NOT attach to page lanes:** `brainstorming` (already done), `test-driven-development` (design artifact), dashboard/data skills, SEO cluster skills (unless user adds SEO scope later).

---

### Task 0: L0 Foundation (serial gate)

**Files:**
- Create: `docs/content-inventory/2026-08-19-scope-a.md`
- Create: `docs/content-inventory/lane-claims.md`
- Create: `.firecrawl/scope-a/` (directory)
- Modify: `Stack_Linear.pen` (reusable components only)

**Skills:** Shared + `copywriting` (inventory only)

**Interfaces:**
- Consumes: existing variables, `StackGen Logo` (`JJx7F`), Home Nav pattern
- Produces: reusable components listed below; lane claim coordinates; inventory markdown

**Reusable components to create (exact names):**

| Component name | Role |
|---|---|
| `Nav Desktop` | 1440×~60 bar: logo ref + links + Login + Schedule demo |
| `Btn Primary` | Accent pill, label slot |
| `Btn Ghost` | Hairline outline |
| `Section Header Split` | H2 left + body right (Linear signature) |
| `Mono Label` | JetBrains Mono tertiary |
| `Metric Cell` | Big figure + caption |
| `Footer Simple` | Logo + link columns stub |

- [ ] **Step 1: Scrape homepage + one product page as template samples**

```bash
mkdir -p .firecrawl/scope-a
firecrawl scrape "https://stackgen.com/" -f markdown -o .firecrawl/scope-a/home.md
firecrawl scrape "https://stackgen.com/product/aiden-for-infrastructure" -f markdown -o .firecrawl/scope-a/product-infrastructure.md
```

Expected: both files non-empty; headings extractable.

- [ ] **Step 2: Write inventory file**

Create `docs/content-inventory/2026-08-19-scope-a.md` with one row per Scope A URL: `url | page title | h1 | section count | scrape path | lane | status=pending`.

- [ ] **Step 3: Write lane claims**

Create `docs/content-inventory/lane-claims.md`:

```markdown
| Lane | Anchor x | Anchor y | Notes |
|---|---|---|---|
| L1 | (existing Home) | 0 | Do not move Home |
| L2 | 1600 | 0 | Right of Home |
| L3 | 3200 | 0 | |
| L4 | 4800 | 0 | |
| L5 | 6400 | 0 | |
| L6 | 1600 | 6000 | Below L2 band |
| L7 | 3200 | 6000 | |
| L8 | 4800 | 6000 | |
| L9 | 6400 | 6000 | |
| L10 | 8000 | 0 | Far right |
```

Adjust after `FindEmptySpace` probe; update file before Wave 1.

- [ ] **Step 4: Build reusable components on canvas**

Via Pencil `execute`: place components above/left of Home using `FindEmptySpace({direction:"top"})`. Mark `reusable: true`. Screenshot each once.

- [ ] **Step 5: Store OpenMemory foundation fact**

Call OpenMemory `add_memories` with project fact describing component IDs and lane-claims path.

- [ ] **Step 6: Gate**

Do not dispatch Wave 1 until inventory + claims + components exist. Orchestrator confirms with user if claims conflict with existing Mobile frame at x≈2560.

---

### Task 1: L1 Home complete (parallel-capable)

**Files:**
- Modify: `Stack_Linear.pen` frames `JLg8h` (Home), `KUYi6` (Mobile)
- Create: `.firecrawl/scope-a/home.md` (if missing)

**Skills:** Shared + `humanizer` (only for new bands’ AI-tell cleanup)

**Interfaces:**
- Consumes: Wave 0 components; existing Product Demo section
- Produces: Home includes Integrations (“Stack-agnostic, by design”) + Compliance (SOC 2 / PCI / HIPAA) bands sourced from live site; no blog

- [ ] **Step 1: Diff live home vs canvas section list**

Scrape home. List bands present on site but missing on canvas. Expected missing: Integrations grid, Compliance badges (confirm against scrape).

- [ ] **Step 2: Insert missing bands only**

Place after Aiden Family / before In Their Words (or after Product Demo if inventory says so). Use hairline grids, real tool names from scrape (AWS, Terraform, GitHub, …). No fabricated logos as photos — text wordmarks OK if SVG not imported; prefer Simple-style monochrome treatment consistent with Customer Proof.

- [ ] **Step 3: Screenshot + problems scan**

`TakeScreenshot` on new bands; `Get` visitor for `ctx.problems` excluding intentional Quote Row bleed.

- [ ] **Step 4: Mirror critical new bands on Mobile** (or defer to Wave 2 with explicit note in inventory status).

---

### Task 2: L2 Product — Aiden for Infrastructure

**Files:**
- Create canvas frame: `Product — Aiden for Infrastructure`
- Create: `.firecrawl/scope-a/product-infrastructure.md`

**Skills:** Shared + `copywriting`

**Interfaces:**
- Consumes: `Nav Desktop` ref, `Btn Primary`, `Footer Simple`, logo `JJx7F`
- Produces: Complete desktop page frame at L2 claim

**Page skeleton (all product lanes):**

1. Nav (ref)
2. Hero: H1 + subhead + Schedule demo (+ optional secondary)
3. Metrics row (only numbers present on source page)
4. Capabilities / features (source sections)
5. How it works / mechanism (if present)
6. CTA band
7. Footer

- [ ] **Step 1: Scrape source URL**

```bash
firecrawl scrape "https://stackgen.com/product/aiden-for-infrastructure" -f markdown -o .firecrawl/scope-a/product-infrastructure.md
```

- [ ] **Step 2: Insert page frame at L2 claim**

```js
// Pseudocode for Pencil execute — use real FindEmptySpace / claim coords
pageId = Insert(document, {
  type: "frame", name: "Product — Aiden for Infrastructure",
  x: CLAIM_X, y: CLAIM_Y, width: 1440, layout: "vertical",
  fill: "$bg-base", clip: true, placeholder: true
})
```

- [ ] **Step 3: Build sections from scrape only**

Strip em-dashes. Keep metrics only if on the page. Screenshot full page.

- [ ] **Step 4: Mark inventory status=done for this URL**

---

### Task 3: L3 Product — Aiden for Automation

**Files:**
- Create: `Product — Aiden for Automation`
- Create: `.firecrawl/scope-a/product-automation.md` from `/product/aiden-for-devops`

**Skills:** Shared + `copywriting`

**Interfaces:** Same as L2

- [ ] **Step 1: Scrape** `https://stackgen.com/product/aiden-for-devops`
- [ ] **Step 2: On canvas, rename all visible “DevOps” product titles to “Aiden for Automation”** (PRODUCT.md). Leave historical blog references out of scope.
- [ ] **Step 3: Build page at L3 claim; screenshot; inventory=done**

---

### Task 4: L4 Product — Aiden for Observability

**Files:**
- Create: `Product — Aiden for Observability`
- Create: `.firecrawl/scope-a/product-observability.md`

**Skills:** Shared + `copywriting`

- [ ] **Step 1: Scrape** `https://stackgen.com/product/aiden-for-observability`
- [ ] **Step 2: Build at L4 claim; never use “Olly”; screenshot; inventory=done**

---

### Task 5: L5 Product — Aiden for SRE

**Files:**
- Create: `Product — Aiden for SRE`
- Create: `.firecrawl/scope-a/product-sre.md`

**Skills:** Shared + `copywriting`

- [ ] **Step 1: Scrape** `https://stackgen.com/product/aiden-for-sre`
- [ ] **Step 2: Build at L5 claim; screenshot; inventory=done**

---

### Task 6: L6 Platform hub + key pages

**Files:**
- Create frames listed in Scope table for L6
- Create: `.firecrawl/scope-a/platform-*.md`

**Skills:** Shared + `high-end-visual-design` (restrained; tokens win)

**Interfaces:**
- Consumes: Wave 0 components
- Produces: 5 desktop frames; remaining platform URLs listed as Wave 3 backlog in inventory

- [ ] **Step 1: Scrape the five L6 URLs in parallel (≤5 concurrent)**

```bash
firecrawl scrape "https://stackgen.com/platform" -o .firecrawl/scope-a/platform.md &
firecrawl scrape "https://stackgen.com/platform/integrations" -o .firecrawl/scope-a/platform-integrations.md &
firecrawl scrape "https://stackgen.com/platform/cloud-to-code" -o .firecrawl/scope-a/platform-cloud-to-code.md &
firecrawl scrape "https://stackgen.com/platform/custom-policies" -o .firecrawl/scope-a/platform-custom-policies.md &
firecrawl scrape "https://stackgen.com/platform/iac-lifecycle-management" -o .firecrawl/scope-a/platform-iac-lifecycle.md &
wait
```

- [ ] **Step 2: Build Platform hub first, then 4 children stacked vertically in L6 claim**
- [ ] **Step 3: Screenshot each; inventory status**

---

### Task 7: L7 Solutions pack (15 pages)

**Files:**
- Create: `Solutions — {Name}` × 15
- Create: `.firecrawl/scope-a/solutions/*.md`

**Skills:** Shared + `copywriting`

**Interfaces:**
- Consumes: A single `Solutions Page Shell` pattern (Copy first completed solution as template)
- Produces: 15 frames in L7 claim (grid: 3 columns × 5 rows of 1440 frames with 80px gaps, or vertical stack if claims say so)

**Solution URL list (complete):**

```
/solutions/agentic-developer-experience
/solutions/aiden-for-grafana
/solutions/brownfield
/solutions/cxo
/solutions/developers
/solutions/devex
/solutions/devops
/solutions/engineering-leaders
/solutions/greenfield-application-deployment
/solutions/iac-for-cloud-migrations
/solutions/iac-transformation
/solutions/platform-engineering
/solutions/security-leader
/solutions/security-use-case
/solutions/sre
```

- [ ] **Step 1: Scrape all 15 into `.firecrawl/scope-a/solutions/`**
- [ ] **Step 2: Build one template page; Copy 14 times; swap descendants content via `Copy(..., {descendants})`**
- [ ] **Step 3: Screenshot template + 2 random samples; inventory=done for all 15**

---

### Task 8: L8 Case studies

**Files:**
- Create: `Case Studies` index + 4 study frames
- Create: `.firecrawl/scope-a/case-*.md`

**Skills:** Shared + `copywriting` + honesty gate

- [ ] **Step 1: Scrape index + each case study URL**
- [ ] **Step 2: Index page: cards linking visually to studies (no fake quotes)**
- [ ] **Step 3: Study pages: replicate published copy only. If quote unapproved / missing attribution, label `PLACEHOLDER — unapproved`**
- [ ] **Step 4: Screenshot; inventory=done**

---

### Task 9: L9 Integrations + Partners

**Files:**
- Create: Integration pages (Antigravity, Backstage, Kiro, Wiz) + Partners hub + AWS/Azure/GCP
- Create: `.firecrawl/scope-a/integ-*.md`, `partners-*.md`

**Skills:** Shared + `firecrawl-cli` for logo asset URLs in HTML

- [ ] **Step 1: Scrape all L9 URLs**
- [ ] **Step 2: Build pages; partner logos as text or imported SVG paths if available — do not hand-draw**
- [ ] **Step 3: Screenshot; inventory=done**

---

### Task 10: L10 Company conversion pages

**Files:**
- Create: `About`, `Pricing`, `Contact`, `Schedule Demo`, `MCP Server`
- Create: matching `.firecrawl/scope-a/*.md`

**Skills:** Shared + `copywriting`

- [ ] **Step 1: Scrape five URLs**
- [ ] **Step 2: Build five frames at L10 claim**
- [ ] **Step 3: Forms: visual only (labels + fields) — no fake submissions; match field labels from source**
- [ ] **Step 4: Screenshot; inventory=done**

---

### Task 11: Wave 2 — Wire, mobile, verify (serial)

**Files:**
- Modify: all page Nav link sets
- Modify: Mobile frames as needed
- Modify: inventory statuses

**Skills:** Shared + `verification-before-completion` + `design-taste-frontend` preflight

- [ ] **Step 1: Unify Nav IA across all frames**

Desktop nav labels: Platform · Solutions · Company · Resources (or match live IA after scrape). Ensure Product pages reachable (mega or Solutions/Platform path — pick one IA from live site and apply consistently).

- [ ] **Step 2: Em-dash scan**

```js
Get(n => n.type==="text" && typeof n.content==="string" &&
  (n.content.includes("\u2014") || n.content.includes("\u2013")) &&
  Print(n.id, n.content))
```

Expected: zero matches on marketing frames.

- [ ] **Step 3: CTA label scan** — no “Get a demo” remaining; only “Schedule demo”
- [ ] **Step 4: Naming scan** — no “Olly”; no “Aiden for DevOps” as product title; no “InfraOps”
- [ ] **Step 5: Layout problems scan** on every new frame
- [ ] **Step 6: Update inventory — all Wave 1 rows `done` or `blocked` with reason
- [ ] **Step 7: OpenMemory** — store multi-page canvas map (frame names + lanes)
- [ ] **Step 8: Offer Wave 3 backlog** (remaining `/platform/*`) to user — do not auto-start

---

## Subagent Prompt Template (orchestrator paste)

```text
You are Lane {Ln}: {title}.
Read and follow these skills IN ORDER before any canvas edit:
1. {using-superpowers path}
2. {firecrawl-cli path}
3. {impeccable path} — run context.mjs --target Stack_Linear.pen once
4. {design-taste-frontend path} — honor Direction Contract overrides
5. {extra skills for this lane}

Global Constraints: see plan docs/superpowers/plans/2026-08-19-stackgen-marketing-core-canvas.md
Your claim region: see docs/content-inventory/lane-claims.md row {Ln}
Do NOT edit other lanes' frames. Do NOT commit. Do NOT invent metrics/quotes.
Deliverable: listed frames + scrape files + inventory status update for your URLs.
End with: screenshots of each frame you created + problems-scan summary.
```

---

## Self-Review (plan author)

1. **Spec coverage:** Scope A marketing core → Tasks 0–11. Remaining platform children → explicit Wave 3. Blog/legal excluded.
2. **Placeholders:** None intentional; Wave 3 backlog is named, not TBD.
3. **Consistency:** Product naming Automation vs DevOps URL documented in L3. CTA and em-dash rules global.
4. **Parallel safety:** lane-claims.md + exclusive regions; Wave 0 serial gate.

---

## Execution Handoff

**Plan saved to:** `docs/superpowers/plans/2026-08-19-stackgen-marketing-core-canvas.md`

**Two execution options:**

1. **Subagent-Driven Parallel (recommended)** — Run Task 0 inline, then dispatch L1–L10 with `dispatching-parallel-agents` (max 10), each prompt carrying the Skills Assigned block; Wave 2 serial with `verification-before-completion`.
2. **Inline Execution** — Single agent walks Tasks 0→11 with `executing-plans` checkpoints after each lane.

**Which approach?**
