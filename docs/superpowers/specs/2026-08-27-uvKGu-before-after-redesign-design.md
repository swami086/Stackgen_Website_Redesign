# Before/After Diagram (`uvKGu`) — Deck-Faithful A+B Hybrid Redesign

**Date:** 2026-08-27  
**Status:** Approved (Approach B)  
**Canvas node:** `uvKGu` inside `a75dC` on `CYfSl` (Web Shelf — Home Dark)  
**Reference decks:** `deck-02-today-humans.png`, `deck-03-factory-future.png`  
**Supersedes:** `2026-08-26-uvKGu-before-after-ab-hybrid-design.md` (simplified v2 persona grid)

## Decision

**Approach B — A+B Hybrid deck condensation.** Rebuild both panels as micro-ports of deck diagrams #2 and #3 inside 540px double-bezels. Same skeleton both sides: intent row → data → center processor → Change Management → feedback loops.

**Out of scope this pass:** Next.js `BeforeAfter.tsx` / `home-shelf.ts` sync (Pencil-only rebuild).

## Problem this fixes

Prior `uvKGu` used a persona handoff grid that diverged from deck/source comps. Text clipped (`Sees:` lines), connectors were placeholder dashes, and key narrative elements were missing (intent track, Change Management, feedback loops, escalate callout).

## Panel copy (locked)

| Panel | Title | Subtitle |
|---|---|---|
| Left | **Today: supervised execution** | Tool signals stay siloed. Humans connect every handoff. |
| Right | **Future: governed factory on Aiden OS** | One context graph. Every assembly shares the same signals. |

## Shared layout spec

| Token | Value |
|---|---|
| Panel outer height | **540px** (double-bezel shell) |
| Outer radius | 20px · inner 16px · shell padding 6px |
| Inner padding | 20px · section gap 10px |
| Variables | `$ds-*` dark theme (inherits from `CYfSl`) |
| Data pills (4) | Code/IaC/K8 · Observability · Cloud · CI/CD |
| Outcome bar | **Change Management** (vertical, 48×fill, `$ds-halt` accent) |

## Left panel — Today (deck #2 micro)

### Intent row (top, compact)
`App Devs` → `Policies` box (Compliance · Security · Costs · SLAs) → `} Goals`

### Main flow (horizontal)
1. **Data column** — 4 stacked pills (`$ds-surface-raised`)
2. **Arrow** — `$ds-accent` forward icon
3. **Bridge badge** — `context lost at handoff` (`$ds-halt` stroke + text)
4. **Teams center** — banner **CloudOps and DevOps Teams** (`$ds-halt` header); 6 role pills in 2×3 grid: DevEx · Networking · CI/CD · SREs · Security · FinOps
5. **Arrow**
6. **Change Management** — vertical outcome bar

### Feedback row (bottom)
- `Changes → Code/IaC` — no OCG write-back caption
- `Actions → Cloud + CI/CD` — no OCG write-back caption

## Right panel — Future (deck #3 micro)

### Intent row (top, compact)
`Agents` + `App Devs` → `Specs` box (Engineering Specs · Security policies · Costs guardrails · SLAs) → `Intent → Factory Spec`

### Main flow (horizontal)
1. **Data column** — same 4 pills (connected, not siloed)
2. **Arrow**
3. **Aiden OS center** — accent border (`$ds-accent`):
   - Title: **Aiden Agentic Operating System**
   - 2×2 assembly grid (full product names):
     - Aiden for Infrastructure
     - Aiden for Automation
     - Aiden for Observability
     - Aiden for SRE
   - **OCG bar** — `Operational Context Graph` · caption `OCG connects domains`
   - **Escalate callout** — dashed `Escalate at policy boundary`
4. **Arrow**
5. **Change Management** — vertical outcome bar (governed path)

### Feedback row (bottom)
- `Changes → Code/IaC` + caption `↩ learnings to OCG`
- `Actions → Cloud + CI/CD` + caption `↩ learnings to OCG`

## Naming rules

Per PRODUCT.md — full product names on future assembly pills. No InfraOps / DevOps as **product** labels on public canvas.

## Pencil node map (preserve IDs where possible)

```
a75dC  Before After Section
└─ uvKGu  Panels (gap 24)
   ├─ FL9aD  Left Panel (540h double-bezel)
   └─ FALqp  Right Panel (540h double-bezel)
```

## QA checklist

- [ ] No clipped text at 2× export
- [ ] Both panels share identical skeleton (intent / main / feedback)
- [ ] Bridge labels tie to Problem section (`context lost` / `OCG connects domains`)
- [ ] Screenshot passes heuristic review (contrast, alignment, 8pt grid)
- [ ] Export: `exports/web-shelf/uvKGu-before-after-deck-v3.png`

## Follow-up (not this pass)

- Sync `web/content/home-shelf.ts` + `BeforeAfter.tsx` after canvas sign-off
- Light theme mirror on `IURWh` / `Giu8V` section
