# Before/After Diagram (`uvKGu`) — A+B Hybrid Design

**Date:** 2026-08-26  
**Status:** Simplified v2 — single story row per panel (no intent tracks, no `} Goals`)  
**Comp:** `exports/web-shelf/uvKGu-before-after-simplified-v2.png`

## Decision

**Approach A + B:** Faithful micro-condensation of deck diagrams 2–3, with two bridge labels tying to the disjointed-problem section (`context lost at handoff` / `OCG connects domains`).

## Problem this fixes

The prior `uvKGu` diagram implied a linear `App Devs → Policies → humans` approval chain. The actual StackGen problem is **cross-domain context loss** between siloed tools and teams — supervised execution, not missing policies.

## Panel copy (locked)

| Panel | Title |
|---|---|
| Left | **Today: supervised execution** |
| Right | **Future: governed factory on Aiden OS** |

## Left panel — Today (`D9SFJ` micro)

**Top intent track (horizontal):**
- App Devs → Policies (Compliance · Security · Costs · SLAs) → `} Goals`

**Data plane (left column, 4 pills):**
- Code/IaC/K8
- Observability
- Cloud
- CI/CD

**Center:**
- Double-bezel **CloudOps and DevOps Teams**
- 6 role pills: DevEx · Networking · CI/CD · SREs · Security · FinOps

**Bridge label (A+B):**
- On arrow from data → teams: **`context lost at handoff`** (halt/red badge)

**Right:**
- Vertical **Change Management** bar

**Bottom feedback:**
- `Changes → Code/IaC`
- `Actions → Cloud + CI/CD`
- No OCG write-back on today side

## Right panel — Future (`IPyqX` micro)

**Top intent track:**
- Agents + App Devs + Specs (Engineering Specs · Security policies · Costs guardrails · SLAs) → **Intent → Factory Spec**

**Data plane:** same 4 pills feeding OS (connected, not siloed)

**Center — Aiden Agentic Operating System** (accent border):
- Aiden for Infrastructure
- Aiden for Automation
- Aiden for Observability
- Aiden for SRE
- Bottom bar: **Operational Context Graph** — caption **`OCG connects domains`**
- Callout: **Escalate at policy boundary**

**Right:** Change Management (governed automated path)

**Bottom feedback:**
- Same two loops with **`↩ learnings to OCG`** (future only)

## Naming rules

Per `PRODUCT.md` — full product names on future assembly pills. No "InfraOps" / "DevOps" as product names on public canvas.

## Layout constraints (web shelf)

Current panel height: **270px**. Full deck fidelity does not fit at current height.

**Recommendation when implementing on canvas:**
- Increase panel height to **~400–480px** (or stack panels vertically on mobile), OR
- Use a two-row layout inside each panel (intent track above, data/teams below)

Match elevation ramp from harness-factory-web-shelf-design § Problem-section flow rebuild.

## Content module sync

When canvas is updated, mirror in:
- `web/content/home-shelf.ts` → `beforeAfter` block
- `web/components/sections/home/shelf/BeforeAfter.tsx`

## Comp QA notes

Generated comp is directionally correct. Fix before canvas port:
- Today bottom loops should **not** say "learnings to backlog" — use plain feedback arrows only
- Verify all six role pills on today panel are legible at target export width

## Out of scope

- Factory process 4-step diagram (`pnlIy`) — separate section
- Full `tPSo3` problem diagram — already above this section
