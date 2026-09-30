# Aiden SRE V1 — Autopilot Investigation (30s)

**Format:** 16:9 · spoken VO + captions · CTA `stackgen.com`  
**Source:** Clean stage walkthrough `stage.dev.stackgen.com` (ai-sre-demo) — not Sybill customer clips  
**Captures:** `captures/01-alerts.png` · `02-investigation-rca.png` · `03-mitigation.png`

## Walkthrough verified (2026-09-23)

1. **Alerts** — triage cards (All Active 7 / Act now 1 / False Positive 1 / Needs review 5) + Datadog High alerts including Pod Crash Loop
2. **View investigation** → chat session with **Root Cause Confirmed** (confidence 0.96): malformed `generate_invoice` job missing `tenant_id`; commit introduced `sys.exit(1)` on KeyError
3. **Mitigation** — roll back / patch, dead-letter malformed messages, regression test + verification steps

## Beat sheet (~30s)

| Clip | UI | VO | Caption |
|------|-----|-----|---------|
| 0 | 01-alerts | Alert storm hits. Aiden separates signal from noise. | Alert storm → signal |
| 1 | 02-investigation-rca | Root cause confirmed. Malformed job. Exact commit. Point-nine-six confidence. | Root cause · 0.96 |
| 2 | 03-mitigation | Mitigation ready. Roll back, quarantine, prevent recurrence. Agents investigate. You keep the call. | stackgen.com |

## Clueso build (blocked on OAuth)

1. `create_project` → aspect `16:9`
2. Upload 3 PNGs → image elements full-bleed per clip
3. `set_voice` + `voiceover_batch` set_and_generate
4. Caption text overlays
5. Optional light music bed
6. `export_project`

**Status:** Built in Clueso. Project: https://web.clueso.io/guide/a24b0c31-de21-47ff-8d4d-977d0969035e  
Export kicked (1080p / 30fps / burn-in captions). Check Exports tab in Clueso editor.

**Runtime:** ~28.5s (VO Jeff/ElevenLabs) + Soft music bed @18%  
**Note:** Browser screenshots were tall viewport → cover-cropped for 16:9; re-capture landscape 1920×1080 later for cleaner UI framing.
