# Before/After (`uvKGu`) — Animation-Ready Simplify

**Date:** 2026-08-27  
**Status:** Approved  
**Supersedes:** `2026-08-27-uvKGu-before-after-redesign-design.md` (deck-faithful v3 — too dense for motion)

## Research synthesis (Firecrawl)

| Source | Pattern for animation |
|---|---|
| [Magic UI Flow](https://sv-animations.vercel.app/magic/docs/components/flow) | Directed graph: **nodes + connectors** with anchor points (Animated Beam) |
| HyperFrames animation skill | **2–4 beats** per scene; stagger 40–80ms; pre-calculated layout constants |
| Pencil motion.md | One focal element per transition; pair opacity with transform |
| SVGator SaaS guide | Path animation along connectors; morph hub node between states |

## Design decision

**3-beat horizontal rail** on Future (Today stays 4-beat). Shared context lives **inside** the Aiden OS processor node, not as a standalone bridge.

1. Stagger-in: signals → bridge → processor → outcome (4 tweens)
2. Cross-panel morph: bridge halts → bridge connects; processor humans → processor OS
3. Animated Beam between fixed anchor nodes (same DOM structure in React)

## Removed (animation debt)

- Intent rows (Policies / Factory Spec)
- 6-role grid / 2×2 assembly grid
- Change Management vertical bars
- Feedback loop footer
- Escalate callout (folded into processor subtitle)

## Panel spec

| | Today | Future |
|---|---|---|
| Title | Today: supervised execution | Future: governed factory on Aiden OS |
| Subtitle | Each team sees one tool. Context dies at every handoff. | One context graph. Every assembly shares the same signals. |
| Col 1 label | Siloed signals | Connected signals |
| Col 2 bridge | **Context lost** (`$ds-halt`) — standalone node | *(inside Aiden OS)* **Shared context** badge |
| Col 3 processor | **Ops teams** · Siloed handoffs | **Aiden OS** (contains Shared context chip + OCG subtitle) |
| Col 4 outcome | **Manual approval** | **Policy gate** |

## Layout tokens

- Panel height: **420px**
- Rail: 4 columns + 3 arrows, single row, vertically centered
- Signal stack: 4 pills (shared labels) — group `data-animate="signals"`
- Node IDs preserved: `uvKGu` → `FL9aD` / `FALqp`

## Motion handoff (for code pass)

```
Beat 0 (mount): panel title + subtitle fade
Beat 1 (80ms):  signal pills stagger 60ms
Beat 2 (240ms): bridge node scale-in
Beat 3 (320ms): processor node slide
Beat 4 (400ms): outcome node + connector beam draw
Reduced motion: static layout, no beam animation
```

## Out of scope

- Next.js implementation (Pencil-only this pass)
- Light theme mirror
