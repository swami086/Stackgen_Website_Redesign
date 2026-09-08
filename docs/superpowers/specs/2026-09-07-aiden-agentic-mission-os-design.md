# Aiden Agentic Mission OS — Design Spec

**Date:** 2026-09-07  
**Status:** Approved for Figma page-for-page replacement (approach C)  
**File:** [Stackgen_staging](https://www.figma.com/design/6F630UJfx5RqnXNuWforYJ/Stackgen_staging)  
**Baseline nodes:** `16:3465` Alerts · `16:2247` Request Inbox · `16:2823` Discovery · `16:1226` Execution health · `16:1591` Command Center

## Problem

Current Aiden UX is **dashboard-first**: nav of pages (Alerts, Discovery, Inbox, Factory, Command Center) with “New Conversation” as a secondary CTA. Agents report metrics or wait for “Investigate.” That fights Aiden’s product promise as an Agentic AI OS for DevOps/SRE.

## Goal

Replace all five surfaces with one **Mission OS**: intent-driven, mission-centric, human gates first-class. Chat never replaces the artifact stage.

## Approach (chosen)

**Mission OS** over conversation-primary shell or AI-overlay-on-dashboard.

## Section 1 — Shared chrome

| Zone | Role |
|---|---|
| Left rail | Workspace · Ask Aiden (primary) · Missions (Live / Needs you / Done) · mode links · runner status |
| Top intent bar | NL command + context chips (env, service, severity) + live mission count |
| Center | Mode-specific mission stage |
| Right | Selected mission: plan · tools/evidence · artifact · Approve / Steer / Ignore |
| Human gate strip | Sticky when policy blocks autonomy |

### Mode map

| Existing page | Mission mode |
|---|---|
| Command Center | Home — mission fleet + decisions waiting |
| Alerts | Investigate |
| Request Inbox | Approve |
| Discovery | Discover |
| Execution health | Execute |

## Section 2 — Per-screen layouts

### Home (ex–Command Center)
- Hero: “What needs you” (gates), not autonomy %
- Mission cards by type; autonomy/ROI in secondary drawer

### Investigate (ex–Alerts)
- Ranked Aiden-started investigations; blast-radius tree
- Right: plan + evidence + remediation / take over

### Approve (ex–Request Inbox)
- Keep triage DNA: stated/inferred/policy, runbook match, Approve
- Promote to full shell; add step timeline + policy gate reason

### Discover (ex–Discovery)
- Insights → proposed missions; entity counts as context strip
- Integrations as missions; history as past Discover missions

### Execute (ex–Execution health)
- Workflows as phased missions; failed/awaiting in Needs you
- Right: run graph + evidence + Approve / Rollback / Continue

## Section 3 — Interaction & visual tokens

### Interaction
1. Intent bar submits → creates/joins a mission; center + right update without full nav change.
2. Selecting a mission pins right rail; Esc clears selection.
3. Approve / Rollback require explicit gate UI (reason + policy + TTL); never one-click without context.
4. “Take over” freezes agent steps and opens steer mode.
5. Mode links filter mission stage; they do not remount a different app chrome.
6. Empty: Aiden proposes 2–3 next missions from workspace context.
7. Errors: mission card shows failure step + retry / escalate; no blank chat.

### Visual tokens (align to existing dark ops UI)
- Background: `#121214` / elevated `#1A1A1E`
- Text: primary `#F5F5F5`, secondary `#A1A1AA`
- Accent (Aiden/AI): purple `#7C5CFC` → `#9B7AFF` glow sparingly on triage/AI modules
- Semantic: critical `#EF4444`, warn `#F59E0B`, success `#22C55E`, running `#3B82F6`
- Radius: 8–12px cards; intent bar 12–16px
- Type: existing product sans (do not introduce Inter/Roboto); hierarchy title 24–28 / body 13–14 / meta 11–12
- Density: ops-dense; generous only on Home hero “Needs you”

### Non-goals (this pass)
- Light theme, marketing polish, mobile, net-new product capabilities beyond UI reorganization of existing jobs/data

## Figma deliverable

Five replacement frames (1728×1100) at x≈8592 on Page 1, labeled `Agentic / [Mode]`:

| Mode | Node | Link |
|---|---|---|
| Home | `53:87` | [open](https://www.figma.com/design/6F630UJfx5RqnXNuWforYJ/Stackgen_staging?node-id=53-87) |
| Investigate | `54:87` | [open](https://www.figma.com/design/6F630UJfx5RqnXNuWforYJ/Stackgen_staging?node-id=54-87) |
| Approve | `54:220` | [open](https://www.figma.com/design/6F630UJfx5RqnXNuWforYJ/Stackgen_staging?node-id=54-220) |
| Discover | `54:382` | [open](https://www.figma.com/design/6F630UJfx5RqnXNuWforYJ/Stackgen_staging?node-id=54-382) |
| Execute | `54:509` | [open](https://www.figma.com/design/6F630UJfx5RqnXNuWforYJ/Stackgen_staging?node-id=54-509) |

## Success criteria

- Removing the intent bar would break the page (it is primary control).
- A new user can answer “what is Aiden doing?” and “what do I need to do?” in &lt;5 seconds on Home.
- Approve flow still shows stated/inferred/policy transparency.
- No screen is primarily a KPI wall or raw alert table.
