# Stage UI plate capture log (T6)

Environment: `https://stage.dev.stackgen.com` · workspace `ai-sre-demo` · viewport `1920×1080@2x` (PNG 3840×2160) · pageId 57 · MCP screenshots saved via `/var/folders/.../T/` then copied into `shared/assets/plates/`.

| Plate | Click / navigation path | Captured | Missing keys | Notes |
|-------|-------------------------|----------|--------------|-------|
| P01 | `/app/sre/ai-sre-demo/alerts` — All Active, unfiltered | Y | row-8…row-12 | Only 7 alerts in queue |
| P02 | Alerts → severity filter **High** (no Critical-severity rows in demo) | Y | row-7 | 6 High rows; `row-critical-k8s` = first Pod Crash Loop |
| P03 | Alerts — same table layout as P01 with linked-group badges on rows | Y | row-8…row-12, group-1-header, col-classification | No separate group header row or classification column; badges live on rows |
| P04 | `/app/sre/ai-sre-demo/alerts` — alerts list (first Pod Crash Loop row `worker-service-7fc6…` boxed) | Y | — | Flat table PNG; pod-crash row same fill as neighbors — hover does not paint a distinguishable still |
| P05 | Settings → `/app/settings/workspace/ai-sre-demo/integrations` | Y | tile-6 | Five connected integrations shown |
| P06 | Alerts → click **System Load is High** title (drawer, not View investigation) | Y | — | Summary + triage priority in drawer |
| P07 | Chat `session=7b412ea3…` → scroll chat to **What was ruled out** + **Recommended actions** | Y | hyp-1…6 score/bar | Ruled-out lines + action lines only; confidence bar/scores off-screen |
| P08 | Alerts — Auth Validation (downstream) + Pod Crash (root) visible | Y | — | |
| P09 | Chat — checked **Investigation panels** menu for standalone RCA report | N | * | No full RCA report surface; inline card same as P07 |
| P10 | — | N | * | Remediation option card not in stage demo |
| P11 | — | N | * | Approved + audit log UI not in stage demo |
| P12 | — | N | * | Resolved + error-rate chart not in stage demo |
| P13 | — | N | * | Service map not in stage nav |
| P14 | — | N | * | Error budget view not in stage nav |
| P15 | — | N | * | Seen-before block not in hero investigation |

Privacy: `strings` pass on P01–P08 PNGs — no customer emails or tokens detected.
