# ADF Deck Diagram Series — Enhanced Web Recreation

**Date:** 2026-08-24  
**Status:** In progress  
**Source of truth:** Nine deck slides provided by user (assets in `.cursor/projects/.../assets/image-*.png`)  
**Supersedes:** `L4290j` (ADF Architecture Web Hero) — wrong visual language and wrong diagram type  

## Goal

Recreate all nine deck diagrams for the StackGen website with **literal content fidelity** (same labels, flows, and narrative) plus **high-end-visual-design refinement**: Editorial Luxury vibe, double-bezel containers, soft ambient depth, macro whitespace, refined gradients. Not a reinterpretation.

## Shared enhanced design system

| Token | Value | Use |
|---|---|---|
| Background | Linear gradient `#FDFBF7` → `#F5E8F0` → `#EDE4F5` | Full frame |
| Surface / card inner | `#FFFFFF` at 92% or `#FAF7FC` | Inner core of double-bezel |
| Bezel shell | `#FFFFFF` at 40%, hairline `#E8DFF0` | Outer shell padding 6–8px |
| Accent purple | `#6D28D9` / `#7C3AED` | Titles, arrows, graph bar |
| Accent pink | `#F472B6` / `#EC4899` | Aiden product blocks, cylinder tops |
| Accent orange | `#FB923C` | Team banner, warm chips |
| Lavender fill | `#E9D5FF` / `#DDD6FE` | Input trigger boxes |
| Peach fill | `#FECDD3` / `#FED7AA` | Context domain boxes |
| Cylinder gradient | `#C084FC` → `#F472B6` | Data stores |
| Text primary | `#1E1B2E` | Headlines |
| Text muted | `#6B7280` | Captions, footer |
| Radius outer | 24px | Major containers |
| Radius inner | 18px | Inner core (concentric) |
| Shadow | soft outer, blur 24, spread 0, `#6D28D9` at 8% | Cards only — not harsh black |

**Typography:** Plus Jakarta Sans or Geist in Pencil if available; else Inter as fallback only in canvas (web port uses Haffer XH / Geist).

**Frame spec:** 1920×1080, `clip: true`, naming `Deck Diagram {N} — {short title}`

**Shelf layout:** Place frames in a new row starting at `FindEmptySpace({width:1920,height:1080,padding:120,nodeId:'L4290j',direction:'bottom'})`, chain `nodeId` for each subsequent frame downward.

## The nine diagrams

### 1 — Today, DevOps is fundamentally disjointed
- Title top-left
- Left stack: SRE Incident, Infra Provision, Cloud Change, Security Incident (lavender, double-bezel)
- Center: team icon + "Ops Teams" + subtitle siloed ops
- Right: "Context Needed" outer bezel; 6 peach inner boxes (Code, Security Policies, Governance | Cloud Architecture, CI/CD setup, Processes)
- Arrows: inputs → center; context → center
- Footer caption: "There are multiple human teams that each have to sign off on any change."

### 2 — DevOps Flow Today with Humans
- Left: 4 gradient cylinders + merged "Data" arrow
- Top: App Devs icon + Policies cylinder/list → "Goals" bracket
- Center white double-bezel: 6 team pills + orange "CloudOps and DevOps Teams" banner
- Right: vertical "Change Management" gradient bar
- Bottom feedback loop: Changes → Code/IaC; Actions → Cloud + CI/CD

### 3 — DevOps Factory of the Future
- Same skeleton as #2
- Center replaced: Aiden Agentic OS box — InfraOps, DevOps, SRE rows + Custom Agents column + gradient "Aiden Agentic Operating System" bar
- Top Intent: Agents icon, App Devs, Specs list → Intent arrow into core

### 4 — StackGen Offerings
- Title + subtitle "Composable into a DevOps factory for any enterprise"
- 5 columns: InfraOps, DevOps, Observability, SRE (icon + title + subtitle), Customer Specific Apps (2×3 App grid)
- Bottom Aiden OS bezel: label left, 8 chips in 2×4 grid (Context Graph, Memory, HITL, App Framework highlighted, Policies, Governance, MCP+A2A, Deterministic Execution)

### 5 — Aiden OS as your composable DevOps factory
- Flow: Intent → Agents → Model Router → Gated Execution → Outcome
- Center bezel: DevOps Context Graph, Memory, Workflows + Policies
- Bottom-left: Cloud Data + Integration data → center
- Learnings → Ingestion loop back to center; center → Agents up-arrow

### 6 — Aiden OS (boxed)
- Same as #5 inside gradient-bordered "Aiden OS" container (orange→pink gradient stroke on outer shell)

### 7 — The DevOps Context Graph
- Top "Structured Data" bezel: Services hub (dark indigo) + 8 satellites
- Bottom "Unstructured Data" bezel: 4 lavender boxes
- Double-headed vertical arrow between

### 8 — Context Graph: Unified Across Apps
- Top: Incident → Observability cylinder → Aiden for SRE → down to graph with remediation learning label
- Middle: full-width purple "Context Graph" bar
- Bottom: Human → Ticket → Aiden for DevOps ← Service Catalogue + CI/CD Relationship from graph → Aiden for InfraOps → Compliant Provisioning

### 9 — Infrastructure Lifecycle with Agents
- Circular flow: Infra and App Changes → Provision box (3 steps) → Cloud Environment (AWS/Azure/GCP) → Production Data & Monitoring cylinder → 3×2 agent grid (Optimization/Governance/Self Healing) → back to Changes

## Exports

Each frame → `exports/adf-diagrams/deck-{01-09}-{slug}.png`

## Naming note

Slides use PRFAQ names (DevOps, InfraOps, Observability). `PRODUCT.md` binding table differs. These recreations follow **slide copy verbatim**; web governance reconciliation is a separate pass.

## Deprecate

- `L4290j` — mark as superseded in canvas context note
