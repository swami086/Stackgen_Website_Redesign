# Sybill AI SRE use-case clips

Internal source footage cut from Sybill sales-demo recordings (Mar–Sep 2026).

**Not for public posting as-is** — customer faces, logos, and live environments. Use as reference for anonymized product demo videos.

Skills used: **meeting-analyzer** (segment from transcripts) + Sybill MCP (`get_conversation` → `recordings.videoUrl`).

## Layout

| Path | Contents |
|------|----------|
| `clips/*.mp4` | Use-case demo segments only (~10–18 min each) |
| `extract_clips.py` | Re-cut from fresh Sybill conversation dumps |
| `manifest.json` | Clip index (no signed URLs) |
| `README.md` | This file |

Mapped to `docs/superpowers/specs/2026-09-23-ai-sre-demo-video-use-cases.md` (V1–V8).

## Inventory (13 clips · ~483 MB)

| File | Use case | Source call | Window |
|------|----------|-------------|--------|
| `V1-autopilot-investigation-slack-rca_lastpass-*.mp4` | V1 | LastPass SRE Demo 2026-07-22 | 26:14–38:14 |
| `V1-investigation-reflections_exol-deep-dive-*.mp4` | V1 | Exol Deep Dive 2026-08-25 | 15:20–32:20 |
| `V1-alert-investigation_exol-first-*.mp4` | V1 | Exol AI SRE 2026-08-06 | 27:31–39:31 |
| `V1-firing-alerts-rca_innovaccer-*.mp4` | V1 | Innovaccer SRE 2026-06-05 | 09:16–19:16 |
| `V2-investigation-rca_cvs-*.mp4` | V2 | CVS SRE 2026-07-10 | 36:05–52:05 |
| `V2-pagerduty-auto-investigate_chamberlain-*.mp4` | V2 | Chamberlain Cadence 2026-05-13 | 09:54–25:54 |
| `V3-product-ui_visa-*.mp4` | V3 | Visa SRE Demo 2026-04-24 | 36:10–50:10 |
| `V3-frontdoor-discussion-ui_visa-*.mp4` | V3 | Visa SRE + discussion 2026-05-06 | 33:40–45:40 |
| `V4-runbooks-policies-sre_arrakis-*.mp4` | V4 | Arrakis Infra & SRE 2026-05-12 | 16:51–36:51 |
| `V5-live-demo-remote-runners_jfrog-*.mp4` | V5 | JFrog AI SRE 2026-09-03 | 28:54–41:54 |
| `V5-sre-noise-persona_swimlane-*.mp4` | V5 | Swimlane 2026-08-06 | 10:42–26:42 |
| `V6-multisource-demo_kissht-*.mp4` | V6 | Kissht AI SRE 2026-03-27 | 17:41–35:41 |
| `V8-product-walkthrough_dell-*.mp4` | V8 | Dell AI SRE 2026-09-14 | 22:50–39:50 |

**Not clipped (weak / no product UI share):** Nielsen Jul SRE (Q&A heavy), GoGuardian PoC Workshop (discovery whiteboard), Corcentric Mar working session.

## Re-extract

1. Refresh conversations via Sybill MCP `get_conversation` (S3 signed URLs expire).
2. Point `AGENT` path in `extract_clips.py` at the new dumps, or overwrite stems.
3. `python3 extract_clips.py` (skips existing large clips).

## Privacy

Do not commit Sybill JSON with `videoUrl` query strings (AWS signed creds). Clips are sensitive — keep local / private storage.
