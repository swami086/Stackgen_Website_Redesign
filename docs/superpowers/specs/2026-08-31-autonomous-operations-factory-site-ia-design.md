# Autonomous Operations Factory — Full-site IA from Website Sequencing deck

**Status:** Design approved. Wave 1 homepage content shipped. Wave 2 **product page copy** shipped (`docs/superpowers/plans/2026-08-31-aof-product-pages-wave2.md`). Pencil diagram fidelity (Ops Lag + product deep-dive diagrams) **still parked** — resume before React diagram swaps.  
**Source of truth (content + diagram intent):** `Website_Sequencing.pptx.pdf` (38 slides)  
**Visual world:** Soft Structuralism on Soft Structuralism `$ds-*` / existing replica chrome  
**Canvas:** `Stack_Linear.pen` — **Pencil-first**; user approves frames before code  

## Locks

| Decision | Choice |
|---|---|
| Scope | Full site IA: homepage + product pages |
| Homepage spine | Factory story (ops lag → AOF → how it works → offerings). Not Approach C SRE H1. |
| Execution approach | Homepage-first, then products (Approach 1) |
| Product names (public) | **Aiden for InfraOps · DevOps · Observability · SRE** (deck wins; update PRODUCT.md) |
| Factory brand | **Autonomous Operations Factory** everywhere |
| Proof | **Logos only** — no MTTR / Autonomy Index / % on public web |
| Reuse | Remap `homepage-p0` blocks (Hero, Logos, Problem film patterns, Solution, Assemblies, Shell/OCG, WhoItsFor, Footer) |
| Diagram pipeline | Nano Banana Pro (`gemini-3-pro-image`) comps → Pencil recreate → **approve** → React |
| Hero | H1 **Outcomes, not agents.** Sub from deck p4. Primary CTA **Schedule a demo** → `/schedule-demo`. Secondary **How it works** → `#how-it-works` |
| Primary CTA (nav) | Schedule a demo → `/schedule-demo` |

## Anti-goals

- Do not ship Nano Banana rasters as live diagrams  
- Do not publish deck % metrics until explicitly cleared  
- Do not keep public names Infrastructure / Automation (superseded by deck)  
- Do not keep Hero H1 “Take control of production change” on Factory homepage  
- Do not boil Autonomy Index / Migration Factory / full SRE RCA into homepage wave 1  

## Naming migration

| Old (site) | New (public) |
|---|---|
| Aiden for Infrastructure | Aiden for InfraOps |
| Aiden for Automation | Aiden for DevOps |
| Autonomous DevOps Factory (ADF) | Autonomous Operations Factory |
| Olly | Never on site |

Redirects: `/product/aiden-for-infrastructure` → InfraOps slug; `/product/aiden-for-automation` → DevOps slug (exact slugs locked in plan).

Update `PRODUCT.md`, `.agents/product-marketing.md`, content modules, mega-menu, tests, governance vitest bans as needed.

---

## Wave 1 — Homepage IA

Scroll order:

1. **Nav** — existing Fluid Island; CTA Schedule a demo  
2. **Hero** — Factory promise  
3. **Logos** — trusted-by strip (no metrics)  
4. **Problem** — Outer ops lag vs inner Dev loop (deck p3)  
5. **Solution** — Introduce Autonomous Operations Factory (p4–5)  
6. **How it works** — Intent → Factory Spec → Runtime → Learning + Shared World Model (p6–7); `id="how-it-works"`  
7. **World Model / OCG** — Four Bodies / shared context (p8, p10); keep live OCG, retitle  
8. **Offerings** — Four products under Aiden OS (p9, p14); WhoItsFor remap  
9. **Footer** — Factory CTA + Schedule demo / product links  

### Hero copy (approved)

- **H1:** Outcomes, not agents.  
- **Sub:** The Autonomous Operations Factory turns how you build, ship, run, and improve software into reliable, repeatable action — with humans keeping authority.  
- **Primary:** Schedule a demo → `/schedule-demo`  
- **Secondary:** How it works → `#how-it-works`  
- Optional micro-row: Build · Operate · Observe · Remediate  

### Homepage diagrams (Pencil queue)

| # | Slot | Deck | Pencil deliverable |
|---|---|---|---|
| 1 | Problem | p3 | Ops lag: Inner AI Dev loop vs Outer Ops bottleneck |
| 2 | Solution | p4–5 | Factory pillars Build/Operate/Observe/Remediate + Learn |
| 3 | How it works | p6 | Intent → Spec → Runtime → Learning + Shared World Model band |
| 4 | Offerings | p14 | Four products + Aiden OS strip |
| 5 | World Model | p8/10 | Retitle/adapt existing OCG frame (minimal if live OCG already approved) |

**Process per diagram:** generate Nano Banana Pro reference → build Soft Structuralism frame in `Stack_Linear.pen` → user approves → only then React.

Optional: keep ProblemChaosFilm as a discarded variant; homepage Problem defaults to Ops lag diagram.

---

## Wave 2 — Product pages

| Route (proposed) | Deck | Pencil diagrams (later) |
|---|---|---|
| `/product/aiden-for-sre` | p23–28 | DETECT→TRIAGE→DIAGNOSE→REMEDIATE; SRE architecture; RCA story |
| `/product/aiden-for-infraops` | p29–30 | IDE intent 1/5→5/5 |
| `/product/aiden-for-devops` | p31–32 | IDP/ticketing → blueprint compose |
| `/product/aiden-for-observability` | p14, p38 | Observe pillar / o11y agent |

Shared chrome: replica nav/footer, logos-only, Schedule demo. No public %.

---

## Architecture (implementation consequences)

- Content SoT remains `web/content/replica.ts` (+ product content modules); rewrite strings to Factory / deck names  
- `HomeReplica` section order stays structurally similar; copy + diagrams change  
- New Pencil frame IDs recorded in `web/lib/replica-frames.ts` after approval  
- Governance tests: flip banned-name checks from InfraOps/DevOps → Infrastructure/Automation (or allow deck names; ban Olly still)  
- Soft Structuralism materials only; prefer existing AtmosphereField / glass discipline  

## Testing

- Vitest: homepage order, Hero H1, product name strings, CTA hrefs, frame ids  
- Visual: Pencil export parity shots under `exports/web-shelf/` after frame approval  
- No metric assertions  

## Open for plan (not blockers)

- Exact URL slugs for InfraOps / DevOps (`aiden-for-infraops` vs `aiden-for-infra-ops`)  
- Whether Observability product page is thin stub vs full rebuild in wave 2  
- Parallel use of existing `factory-*` / `t7–t11` worktrees vs stay on `homepage-p0` (default: **homepage-p0**)  

## Success criteria

1. Homepage reads as Autonomous Operations Factory story matching deck p3–14  
2. All homepage diagrams approved in Pencil before React  
3. Public naming matches deck; PRODUCT.md updated  
4. Logos-only proof  
5. Product pages sequenced in wave 2 from deck deep dives  

---

## Approval log

- Scope B, Homepage spine B, Naming B, Factory brand A, Metrics logos-only, Reuse A, Approach 1  
- Design §1–§4 approved (proceed 2026-08-31)  
- Diagram pipeline: Pencil-first + Nano Banana Pro  
