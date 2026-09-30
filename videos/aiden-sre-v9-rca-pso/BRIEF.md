---
workflow: general-video
flow: automation
storyboard: no
message: "RCA agent — alerts/noise to tools context to empower engineers"
destination: product-page
aspect: 1920x1080
language: en
length: ~45-55s
approach: v9-rca-pso-gated
audio: clueso
framework: john-pso-sheet
evidence: sybill-rca-demos
---

## Intent

Greenfield gated demo for `/product/aiden-for-sre`. John's PSO skeleton
(Problem → Solution → Outcome) on **Root Cause Analysis**, locked to user
SCRIPT v9.3 paste: alert pile / real vs noise → context silos → Aiden 24/7
agent on existing tools + guardrails → empower CTA.

Approach A: HyperFrames silent plates; Clueso Chris VO + Soft BGM after Gate B.
**Capture:** live Aiden UI via Chrome DevTools.

## PSO × Sybill demo map

| Beat | Sheet | Demo picture |
|------|-------|--------------|
| Intro / Problem | Investigation eats the clock | Alert storm; root vs downstream noise |
| Scenario | Burdened SRE team | Hold / transition |
| Solution | Correlate + confidence + hypotheses | Investigation CoT → ranked hypotheses |
| Outcome | Cut MTTR / effort | RCA card + next action → end card |

## Skills (skill-picker)

- `video-gated-product-demo` — pipeline SoT
- Sybill MCP + `sales-engineer` — demo evidence (`SYBILL-CONTEXT.md`)
- `expert-pmm-writer` — Gate A paste + check_ai_signs

## Gates

- Gate A: SCRIPT.md v9.3 user paste — awaiting lock
- Capture: Chrome DevTools — **DONE** (`CAPTURE-MAP.md`)
- Gate B: plates realigned to v9.3 · Gate C / Export — per skill; export only on explicit ask

## Capture target

See `CAPTURE-MAP.md`. Hero path:

1. https://stage.dev.stackgen.com/app/sre/ai-sre-demo/alerts
2. https://stage.dev.stackgen.com/app/sre/ai-sre-demo/chat?session=7b412ea3-5fa6-48bf-83f3-27a7531071f9

Workspace: `ai-sre-demo` · Stage · Pod Crash Loop RCA (confidence 0.78)  
Store: `assets/stage-rca-*.mp4` @ 1920×1080 + refs

## Bans

Visa/Mitratech · front door · cert laundry · em/en dashes · plate pills ·
montage cards · opaque “keep the call” · named customers in public VO

## Archive (do not mutate)

- `videos/aiden-sre-v3-queue-v8/`
- `videos/aiden-sre-v3-frontdoor/`
- `videos/aiden-sre-v1-autopilot/`

## CTA / end card

- Headline: **Empower your engineers.**
- Sub: Try Aiden for SRE today
- Spoken close (SCRIPT): “Empower your engineers with the SRE agent mate they need.”
