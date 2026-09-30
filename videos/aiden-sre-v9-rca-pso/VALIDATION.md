# VALIDATION — aiden-sre-v9-rca-pso

| Gate | Status | Evidence | Pass phrase |
|------|--------|----------|-------------|
| Research | done | Sybill MCP + `SYBILL-CONTEXT.md` | — |
| A Script | **PASS** | SCRIPT.md v9.3 · check_ai_signs exit 0 · ~111w | Gate A pass (Proceed 2026-09-25) |
| Capture | **DONE** | stage walkthrough + tight | — |
| B Plates | **PASS** | silent plates · ffprobe · Empower end card | Gate B pass (Proceed 2026-09-25) |
| C Clueso | **preview ready** | project `3dc1c524-9dcd-4d6e-b0dd-0db31608baca` · Chris · Soft BGM @12% | awaiting **Gate C pass** |
| Export | blocked | — | explicit ask only |

## check_ai_signs

```
OK: zero AI-sign hits
```
2026-09-25 · SCRIPT v9.3 user paste (~111w · ~45–50s)

## Clueso timeline (Gate C)

Preview: https://web.clueso.io/guide/3dc1c524-9dcd-4d6e-b0dd-0db31608baca

| Clip | Title | Dur | VO |
|------|-------|-----|----|
| 0 | Settle | 1.8s | silent · dissolve 0.4 |
| 1 | Plate A — alerts | 10.56s | para1 · speech end ~10.06 +0.5 |
| 2 | Stage — tools + RCA | 15.86s | para2 · speech end ~15.36 +0.5 |
| 3 | Plate B — body | 9.88s | para3 · speech end ~9.38 +0.5 |
| 4 | Plate B — close | 4.86s | CTA · speech end ~4.36 +0.5 |

**Voice:** Chris ElevenLabs `iP95p4xoKVk53GoZ742B`
**BGM:** Soft @12% · fade in 1.5s / out 2s · guide_end ~42.96s
**Approach A:** no Clueso crop zooms / highlights / burn-in (element_count 0 on all clips)
**Dissolves:** 0.25 between A→stage→B; 0.4 into end card

## Alignment map (paste ↔ picture ↔ plate)

| Paste beat | Picture | Plate |
|------------|---------|-------|
| Alerts pile / real vs noise | chips, Act now, alert rows | A |
| Context silos → Aiden steps in | pod hold → investigation open | A→stage |
| Plugs into tools + context + guardrails | Evidence (Datadog) → RCA / confidence | stage + B body |
| Empower… Try Aiden | End card | B close |

## Renders (silent · Gate B)

| File | Duration |
|------|----------|
| `renders/plate-a.mp4` | 26.000s |
| `renders/plate-stage.mp4` | 22.000s |
| `renders/plate-b.mp4` | 14.000s (end card: **Empower your engineers.**) |

**STOP.** Reply **Gate C pass** to unlock export (explicit ask still required for `export_project`).
