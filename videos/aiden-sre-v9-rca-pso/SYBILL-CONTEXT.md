# Sybill context — RCA demos (internal)

**Source:** Sybill MCP ask (2026-09-25) · Sanjeev Sharma demo framing (LastPass,
Workday, TransUnion, o9, Dell, Cisco, IBM Concert, TechM/Verizon patterns) ·
SE enablement language · conversation summaries ·
`docs/superpowers/specs/2026-09-23-ai-sre-demo-video-use-cases.md` + clip manifest.
**Public rule:** Anonymize account names in VO / on-screen. Prefer workflow titles.

## Sanjeev / SE value prop (what to sound like)

**Problem opener (quotes paraphrased for internal use):**
- Alerts do not come alone; upstream degrade → many downstream alerts
- First 20 min to ~2 hrs = sift root vs noise across Grafana/Datadog/kubectl
- Fear of waking leadership on a false alert drives delay
- Outer loop (deploy, obs, triage, remediate) still fragmented; inner loop is solved

**Demo walk he repeats:**
1. Alert portal buckets (Act now / Non-critical / False positive / Needs review)
2. Root-signal vs downstream glyphs before the engineer is even online
3. Autopilot investigation from webhook / Investigate
4. Correlate four sources of truth (obs, deploy/CI, tribal knowledge, topology)
5. Multi-hypothesis tree + confidence + explicit rejections
6. RCA card: probable cause, blast radius, evidence links, next actions
7. Human-in-the-loop first (trust ladder); sit on existing tools (no rip-replace)

**Proof language (internal only):** investigation minutes not the first half-hour;
MTTR down; noise collapse; flight-recorder cost vs outage cost. Do not put
customer names or unverified % claims in public VO without Marketing/Legal OK.

## Clearest demoed RCA spine (what to show)

1. **Alert intake** — webhook alerts (Datadog / PagerDuty / Grafana). Root-signal
   vs downstream tags. Noise suppressed; actionable alerts open investigations.
2. **Autopilot investigation** — live chain-of-thought; connectors for obs,
   infra, deploy, code; multi-tab evidence (PD / Datadog / cloud).
3. **Hypotheses + confidence** — ranked candidates with scores (e.g. 85 vs 22);
   rejected low-evidence paths; halt/lower confidence if integrations missing.
4. **RCA card** — probable root cause, severity, blast radius, known unknowns,
   tiered action plan (now / this week / escalate / verify).
5. **Outcome channel** — Slack/Teams RCA post + HITL chat (approve runbook / PR).
   Optional: Reflections → Knowledge Hub (Exol).

## Prospect pain (Exol example, anon OK as pattern)

Lean SRE headcount · alert fatigue · manual evidence gathering · missing
runbooks · need auto-generated RCA + clean escalation · GCP deploy options.

## Proof (internal only — do not name in public VO without approval)

| Signal | Source |
|--------|--------|
| ~60% of incident time is investigation | Demo claim across calls |
| Investigation ~7 min end-to-end | Chamberlain live monitor |
| 25% MTTR reduction POC target | LastPass |
| ~85m → &lt;10m investigation | GoGuardian closed-won (named only if Legal OK) |
| Slack Mission Control RCA | LastPass demo |
| Multi-source NR+Sentry+Grafana → Git commit | Kissht |
| Hypotheses before remediation | CVS |

## Best public video shape

**V1 Autopilot investigation** (alert → investigate → confidence/hypotheses →
RCA card → optional Slack). Matches John's PSO RCA row and Sybill demo frequency.

## Capture target (product UI)

`stage.dev.stackgen.com` ai-sre-demo (or current staging):
Alerts → View investigation → Probable root cause / hypotheses / confidence
→ (if available) Slack/outcome surface. Chrome DevTools @ 1920×1080.

## Skill stack (skill-picker)

| Role | Skill | Why |
|------|-------|-----|
| Pipeline SoT | `video-gated-product-demo` | Approach A gates A–C + Chrome capture |
| Demo evidence | Sybill MCP + `sales-engineer` | What was actually shown in demos |
| Gate A copy | `expert-pmm-writer` + check_ai_signs | Locked by video skill |
| Gate C later | clueso `polish-screen-demo` | After plates; not for script now |

Skipped noisy hits: `ad-creative`, `capa-officer`, `raw-recording-to-branded-demo`
(wrong stage), `video-content-strategist` (YouTube strategy, not product-page cut).
