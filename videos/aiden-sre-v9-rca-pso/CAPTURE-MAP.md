# Capture map — ai-sre-demo (stage)

**Environment:** Stage  
**Workspace:** `ai-sre-demo`  
**Product:** Aiden SRE  

## Canonical URLs

| Surface | URL |
|---------|-----|
| Alerts (start) | https://stage.dev.stackgen.com/app/sre/ai-sre-demo/alerts |
| Act now filter | https://stage.dev.stackgen.com/app/sre/ai-sre-demo/alerts?attention=needs_attention |
| Investigations | https://stage.dev.stackgen.com/app/sre/ai-sre-demo/investigations |
| **Hero RCA chat** | https://stage.dev.stackgen.com/app/sre/ai-sre-demo/chat?session=7b412ea3-5fa6-48bf-83f3-27a7531071f9 |
| Discovery | https://stage.dev.stackgen.com/app/sre/ai-sre-demo/discovery |
| Conversation history | https://stage.dev.stackgen.com/app/sre/ai-sre-demo/conversation-history |

## Sidebar / IA

- Workspace picker: `ai-sre-demo`
- Reliability: Discovery · Alerts · Investigations (7 open)
- New Conversation / Conversation History
- Recent: many `[Warn] API Request Latency High` threads

## Alerts page (Problem beat)

Tabs: **Active** | Ignored  

Triage chips:
- All Active (7)
- Act now (1)
- Non Critical (1)
- False Positive (1)
- Needs review (4)

Correlation badges on rows:
- **Root signal** — best starting point in linked group
- **Downstream effect** — check root signal first

Demoable alerts:
1. Auth Validation Latency High (downstream) → View investigation
2. **Pod Crash Loop** (root signal, multiple pods) → View investigation
3. System Load is High
4. Kafka Lag RCA - checkout consumer lag high

Source: mostly Datadog Push/Pull.

## Hero investigation (Solution + Outcome)

Session `7b412ea3-5fa6-48bf-83f3-27a7531071f9`  
Alert: Pod Crash Loop · `worker-service-7b94f745d7-2twmn`

| Field | Value on screen |
|-------|-----------------|
| Severity | High |
| Verdict | Probable deploy regression |
| Confidence | **0.78** |
| Probable Root Cause | Real worker failure after new deployment (`generate_invoice` / `tenant_id`) |
| Ruled out | OOM · image pull/startup · pure telemetry loss |
| Recommended actions | Roll back `latest_79ece31` → `latest_b1129be` · inspect tenant_id · defensive validation |
| Mitigation | Roll back or patch; verify errors/restarts stop |
| Evidence sidebar | Datadog events/monitors/logs (10) |

Matches Sybill V1 demo spine and SCRIPT v9.1 Solution/Outcome beats.

## Record path (stage clip)

1. Alerts @ 1920×1080 → All Active hold (~2s)
2. Act now chip → show triage (~2s)
3. Back All Active → highlight Root signal Pod Crash row (~3s)
4. Open session `7b412ea3…` → scroll Probable Root Cause → What was ruled out → Mitigation + Evidence (~15–20s)
5. Stop. Save `assets/stage-rca-walkthrough.mp4`

Optional B: Investigations Open tab (7) as brief cutaway — not required for v9.1.
