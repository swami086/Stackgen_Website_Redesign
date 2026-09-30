# VALIDATION — Aiden SRE V10

| Gate | Status | Evidence |
|------|--------|----------|
| F Figma | **scrubbed v4** (2026-09-25) | Slack `#incidents` cleaned · `YUgx6CRwXJT0s7Vz9BRHAV` |
| A Script | check_ai_signs **0** | `SCRIPT.md` · awaiting **Gate A pass** |
| B Plates | **v4 live-motion** ready | `renders/v10-silent-master.mp4` (76s) · cursor/type/stage · awaiting **Gate B pass** |
| C Clueso | blocked | needs Gate A+B pass |
| Export | blocked | needs Gate C pass + explicit ask |

## Figma masters

| Beat | Node | Content |
|------|------|---------|
| Alerts | `14:911` | CrashLoop worker-service lead |
| Investigation | `14:2698` | RCA 0.78 · generate_invoice · tenant_id |
| Datadog | `18:2` | Log Explorer · KeyError tenant_id |
| GitHub | `19:70` | Deploy #79 Failure |
| kubectl | `19:2` | CrashLoopBackOff pods |
| Slack | `20:3208` | Scrubbed: Acme workspace · clean channels · Aiden RCA only (no SRE Day / Weekly release / VIP / permission banner) |

## Picture v4 — live product feel

Skills: `video-gated-product-demo` · `hyperframes-animation` (`cursor-click-ripple`, TextPlugin typewriter) · Figma MCP scrub · stage walkthrough MP4 · 21st cursor refs (inspiration only)

- [x] Slack scrub: SRE Day thumbs, Weekly release, VIP, permission banner, noisy channels → gone
- [x] Plate-a: cursor → Act now click+ripple → View investigation + scroll
- [x] Plate-b: real stage walkthrough (`data-media-start=48`) + cursor toward Evidence
- [x] Plate-c: sequential DD (type query + scroll) → GH (click + scroll) → K8s (scroll)
- [x] Plate-d: scrubbed Slack + message pulse + cursor on evidence links
- [x] No yellow HL boxes · no stacked tool rail

## Review
- Master: `renders/v10-silent-master.mp4`
- Stills: `snapshots/review/v4-*.png`
