# Product ADF page — Harness catalog redesign (`f4FhS`)

**Date:** 2026-08-25  
**Status:** Implemented on canvas (mega-menu placement)  
**Frame:** `f4FhS` — Web Shelf · Product [Dark]  
**Catalog node:** `rvmr8` — Product tab dropdown (open state), not page body  
**Skills:** using-superpowers, brainstorming, high-end-visual-design, Pencil MCP  
**Reference:** Harness product mega-menu (4-column capability catalog)

---

## Decision

**Approach A (approved):** Keep Hero + replace middle sections with a 4-column ADF catalog. Retain Metrics band, vs Delivery, and CTA below.

**Removed:** Stepper · Unified Context · Assembly Lanes · Quote · in-page catalog (`M0ikj`)

---

## Nav placement

| Node | Role |
|---|---|
| `WGsdK` | Nav Stack (bar + dropdown) |
| `Vai4Q` | Nav bar (60px) |
| `BCszz` | Product Mega Menu **(open state mock)** |
| `rvmr8` | Catalog Shell — 4-column grid |
| `S5AhzB` | Product trigger (label + caret, active) |

Interaction intent: **closed by default in code**; canvas shows open state under Product tab click.

---

## Page order (`FxNYT`)

| # | Section | Node |
|---|---|---|
| 1 | Hero | `nbrya` |
| 2 | Metrics Band | `AGgcy` |
| 3 | 2 Column vs Delivery | `Z12OF` |
| 4 | CTA | `hTgnN` |

---

## Catalog structure (Harness-inspired)

### Banner pill (top)

Double-bezel pill: **One Operational Context Graph · four assemblies →**  
Icon: `share-network` (Phosphor)

### Four columns (`r8gi4e`)

Each column: **phase pill** → **assembly title** → **one-line blurb** → **icon feature list**

| Phase | Assembly | Blurb |
|---|---|---|
| Build | Aiden for Infrastructure | Policy-checked infrastructure from approved modules. |
| Operate | Aiden for Automation | Requests become reviewed, attributable action. |
| Observe | Aiden for Observability | Signals tied to what changed in the estate. |
| Remediate | Aiden for SRE | Incidents that already know what changed. |

### Feature lists (6 items per column, binding names only)

- **Build:** AppStacks · StackBuilder · StackGuard · Policy-checked IaC · Drift detection · Deploy to Git
- **Operate:** Explainable triage · Reviewed workflows · Ticket-to-action · Pipeline automation · Human-approved execution · Release gates
- **Observe:** Change-aware signals · SLO guardrails · PromQL-native queries · 300+ integrations · Cost telemetry · Correlation hub
- **Remediate:** Context on alert · Cross-domain RCA · Policy-gated remediation · Incident timeline · Approve + deploy · MTTR reduction

---

## Visual system

- **Archetype:** Soft Structuralism + editorial catalog grid (Harness structure, StackGen `$ds-*` register)
- **Double-bezel:** `rvmr8` Catalog Shell → `r8gi4e` Catalog Core
- **Typography:** `$ds-font-sans` / `$ds-font-mono` — no Inter
- **Icons:** Phosphor, 14px in 28×28 rounded shells
- **Spacing:** 28px column gap · 32px vertical section gap · 120px page rhythm preserved

---

## Export

`exports/web-shelf/f4fhs-product-adf-v2/f4FhS.png`

---

## Out of scope (this pass)

- Light mirror `JBK8u`
- Next.js implementation
- Mobile frame
