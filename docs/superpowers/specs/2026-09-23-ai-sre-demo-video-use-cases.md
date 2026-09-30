# AI SRE — Product Demo Video Use Cases

**Source:** Sybill MCP (sales calls, demos, POCs) · Mar 23–Sep 23, 2026  
**Audience:** Landing page `/product/aiden-for-sre`, home showcase, content/resources  
**Skills used:** sales-engineer (demo prep), marketing-strategy-pmm (enablement/positioning)  
**Status:** Research complete · Sybill source clips extracted locally (see below) · polished public videos not started

**Sybill source MP4s (internal):** `videos/sybill-ai-sre-usecase-clips/clips/` — demo segments only (not full meetings). Index: `manifest.json`. Re-cut: `extract_clips.py`. **Not public-ready** (customer faces/logos).

**Public posting rule:** Anonymize account names unless Marketing has logo/case-study approval. Prefer workflow titles over customer names on the public site. Closed-won proof (GoGuardian, GreytHR) → named only after legal/customer OK.

Existing site hook: `web/content/products.ts` → `aiden-for-sre.video.caption` is still a placeholder (“Detect → Triage → Remediate”). Existing launch cut: `videos/aiden-launch-edits/` SRE module.

---

## Top 8 video candidates (public-ready workflows)

Ranked for demo frequency × visual clarity × anonymizability × differentiation vs generic AIOps.

### V1 — Alert → Autopilot Investigation → Slack RCA
**Public title:** Autopilot incident investigation  
**Grounded in:** LastPass Mission Control, GoGuardian, AltMobility, Kissht  
**Why ship first:** Clearest Detect→Diagnose loop; matches product page spine; already in launch SRE footage language.

| Beat | Time | On screen | Narration intent |
|------|------|-----------|------------------|
| Hook | 0–10s | Noisy Slack/PagerDuty flood | “On-call drowns in alerts. First hour is hunting context.” |
| Ingest | 10–25s | Alert webhook → Aiden investigation | Datadog/New Relic/PagerDuty lands in Aiden |
| Investigate | 25–55s | Multi-step agent trace + Context Graph | Correlate metrics, logs, recent changes |
| Outcome | 55–80s | Slack RCA + confidence + link | Evidence posted where the team already works |
| Close | 80–90s | Human review gate | “Agents investigate. You keep the call.” |

**UI surfaces:** Alert intake, investigation timeline, Context Graph snippet, Slack post  
**Anon:** “Password vault SaaS” / “EdTech platform” — do not name LastPass/GoGuardian publicly without approval  
**Proof (internal):** GoGuardian closed-won ~$50k; investigation ~85m → &lt;10m

---

### V2 — Kubernetes Pod Crash / OOM Auto-Remediation (HITL)
**Public title:** Governed pod restart  
**Grounded in:** Corcentric OOM-kill, Chamberlain L1 NOC, Visa front-door pod restarts, CVS edge K3s  

| Beat | Time | On screen | Narration intent |
|------|------|-----------|------------------|
| Hook | 0–10s | CrashLoop / OOM alert | Recurring L1 toil |
| Diagnose | 10–30s | Pod/deployment validation | Confirm blast radius + policy |
| Gate | 30–50s | Approval approval / circuit breaker | SOC2-style guardrails |
| Act | 50–70s | Remote runner restart | Cluster action via Helm runner |
| Verify | 70–90s | Post-remediation state check | Observed vs expected |

**UI surfaces:** SRE skill builder, policy gate, remote runner, verification loop  
**Diff vs AIOps:** Policy + verification, not “chat said restart”  
**Internal eng proof:** Sep 21 remediation verification demo (~10m → ~5m repeat)

---

### V3 — Front-Door Ticket Automation (70% repetitive SRE tickets)
**Public title:** Clear the SRE front door  
**Grounded in:** Visa (4 high-ROI tickets), Mitratech (2,400 tickets Jan–Jul)  

Four demoable micro-flows (cut as series or one montage):
1. Kubernetes pod restart  
2. TLS certificate renewal  
3. CI/CD build/deploy failure investigation  
4. RBAC access request  

| Beat | Time | On screen |
|------|------|-----------|
| Hook | 0–15s | Jira backlog of repetitive tickets |
| Enrich | 15–40s | Auto-enrich ticket + assign + evidence |
| Act | 40–70s | Runbook / remote runner / webhook |
| Close | 70–90s | Ticket resolved + audit trail |

**Integrations to show:** Jira, Jenkins/GitHub, Kubernetes, ServiceNow (optional)  
**Strong for:** Enterprise ITSM buyers (Visa-class, Mitratech)

---

### V4 — Runbook Ingest → Deterministic Playbook Execution
**Public title:** Your runbooks, agent-executable  
**Grounded in:** Visa (15–20 runbook zips → Agents.md), OneTrust (~98% playbook steps automated), InMobi (runbook vs unassisted)  

| Beat | Time | On screen |
|------|------|-----------|
| Hook | 0–15s | Stale Confluence/PDF runbooks |
| Ingest | 15–35s | Zip / Agents.md → Aiden skills |
| Fire | 35–65s | Alert webhook triggers playbook |
| Diff | 65–90s | Assisted (runbook) vs exploratory path |

**UI surfaces:** Skill/playbook authoring, Agents.md, webhook trigger, step log  
**OneTrust angle:** Kafka lag + DB bottleneck + pod correlation via Datadog

---

### V5 — Noise Reduction + Alert Grouping (multi-cloud / multi-region)
**Public title:** Cut 90% non-actionable noise  
**Grounded in:** Swimlane (90%+ noise, 7 EKS regions), JFrog (replace stalled AIOps), Axis Bank (Dynatrace false alerts)  

| Beat | Time | On screen |
|------|------|-----------|
| Hook | 0–15s | Alert storm dashboard |
| Filter | 15–40s | Grouping + suppression rules |
| Focus | 40–70s | Single actionable incident card |
| Close | 70–90s | On-prem Helm runner (data stays in VPC) |

**Diff:** Air-gapped/on-prem runner story — Swimlane, JFrog, Axis, Dell all care  
**Competitive frame (internal only):** Resolve AI / Newbot bake-offs — do not name competitors in public video copy unless Legal OK

---

### V6 — Multi-Source RCA Across Clouds & Logs
**Public title:** One investigation, every layer  
**Grounded in:** GoGuardian (Datadog + GCP logs + AWS ALB/Athena), Kissht (New Relic + Sentry + Grafana), LPL (Dynatrace + ServiceNow + SolarWinds), Tally (blast radius / causal chain)  

| Beat | Time | On screen |
|------|------|-----------|
| Hook | 0–12s | Split-screen tool sprawl |
| Correlate | 12–50s | Aiden joins metrics + logs + change |
| Graph | 50–70s | Dependency / blast-radius view |
| Close | 70–90s | RCA + suggested next actions |

**Best visual:** Context Graph + causal chain (Tally / Nielsen memory story)

---

### V7 — Context Graph + Episodic Incident Memory
**Public title:** Never re-investigate the same failure  
**Grounded in:** LastPass Context Graph, Nielsen/Gracenote cross-layer memory, eng SRE Gym (~85% / 110 scenarios)  

| Beat | Time | On screen |
|------|------|-----------|
| Hook | 0–15s | Same P1 twice in a month |
| Recall | 15–45s | Prior RCA pulled into new inv. |
| Apply | 45–70s | Faster path / auto-suggest fix |
| Close | 70–90s | Shared team memory, not tribal Slack |

**Home-page fit:** Pairs with Operational Context Graph shelf on landing  
**Benchmark (optional B-roll):** SRE Gym 110 scenarios, median 6–7 min

---

### V8 — Self-Hosted / Private Runner at Scale
**Public title:** AI SRE that never leaves your VPC  
**Grounded in:** Swimlane Helm-in-EKS, Dell private cluster (~25k services), Axis VMware/K8s, InMobi private GKE, JFrog air-gap  

| Beat | Time | On screen |
|------|------|-----------|
| Hook | 0–15s | “Telemetry cannot leave the VPC” |
| Deploy | 15–40s | Helm remote agent install |
| SSO | 40–55s | Okta / JumpCloud / RBAC |
| Prove | 55–85s | Full investigate+remediate in-cluster |
| Close | 85–90s | SaaS · Private SaaS · Self-hosted |

**Enterprise page fit:** Matches `enterprise` block on product page

---

## Full Sybill inventory (22 customer + eng)

| # | Account | Window | Core use case | Stack highlights | Stage signal |
|---|---------|--------|---------------|------------------|--------------|
| 1 | Visa | Mar–Sep | Front-door automation: pod restart, TLS, CI/CD fail, RBAC; runbook zip ingest | Jira, K8s runner, GHE, Jenkins, Grafana/Prom, Datadog, SNOW, Teams | Active POC → MSA path |
| 2 | LastPass | May–Sep | Datadog → autonomous inv → Slack `#mission-control` RCA; HITL remediation; cost/credit tracking | Datadog, Rootly, Slack, CDK/TF, Bedrock | Commercials ~$94–110k; 25% MTTR goal |
| 3 | OneTrust | Mar–Sep | Playbook automation (Kafka lag, DB, pods); Aiden 1→2 EU; noise suppress | Datadog, ClickHouse, Kafka, K8s, PagerDuty, GitLab | Prod customer; ~$230k renewal context |
| 4 | GoGuardian | Mar–Jun | Multi-cloud log correlation; TF context for triage; Slack findings | Datadog, GCP Logging, AWS ALB/S3/Athena, ECS/RDS, Slack | **Closed-won $50k**; ~85m→&lt;10m |
| 5 | Chamberlain | Apr–May | L1 NOC: PD → Confluence runbooks → Azure Runbooks pod delete/restart; circuit breaker | PagerDuty, Confluence, Datadog, Azure, K8s | Pilot objectives met |
| 6 | Corcentric | Mar–Aug | OOM-kill auto-remediation skill; ObserveNow→SRE workspace; PR fixes | ObserveNow/Grafana/OTel, EKS/AKS, Confluence, GitHub | Expansion; case-study candidate |
| 7 | Swimlane | Aug | 90%+ noise; on-prem Helm agent in 7 EKS regions; vs Resolve AI | Grafana/Prom/Loki, PD, ArgoCD, JumpCloud | 7–10 day POC approved |
| 8 | Dell | Jun–Sep | Scale (~25k services); on-prem runner; explainable multi-agent RCA + PR | K8s/Tanzu, Prom/Loki/Grafana/OTel, Okta | 4-vendor bake-off → Nov select |
| 9 | Axis Bank | Sep 22 | Dynatrace false alerts; cross-layer RCA; predictive patterns; zero egress | Dynatrace, VMware, K8s | Follow-up Oct predictive demo |
| 10 | JFrog | Aug–Sep | Replace stalled AIOps; Coralogix; air-gap; cost/time per inv | EKS, Coralogix, MCP, Slack | MNDA + EKS POC path |
| 11 | Mitratech | Mar–Sep | 2.4k repetitive tickets; New Relic sub-accounts; scheduled AWS audits | Jira, New Relic, AWS/Azure, OCI MCP, CircleCI | Onboarding / pilot |
| 12 | Exol | Aug | Lean ops; GCP agentic IR; auto runbooks; Freshservice/Teams | GCP, GHA, Pub/Sub, Freshservice, Wiz | Commercials ~$95k Platform+SRE |
| 13 | LPL Financial | May–Aug | Dynatrace↔SNOW correlation; SolarWinds blind spots; Tier-1 NOC in Teams | Dynatrace, SNOW EM, SolarWinds, Teams, xMatters | RFP / 2027 budget |
| 14 | Bancolombia | Mar–Jul | Dynatrace+Grafana SRE; deploy-change correlation; remediation PRs | Dynatrace, ObserveNow, AWS, Backstage, GitHub | Spanish workshop planned |
| 15 | Tally | Jun–Jul | ~100 alerts/day; blast radius; AWS+OCI causal chain | AWS, OCI, Loki, OpenSearch, Prom/Grafana, Jira | POC for “TP on AWS” |
| 16 | InMobi | Mar–Apr | Private GKE; runbook vs unassisted inv; AlertManager/FireHydrant | GKE, Prom/Grafana/Loki, AM, FireHydrant | Staging pilot stood up |
| 17 | CVS Health | Jul 10 | 10k stores → K3s edge; tool sprawl; edge pod recovery | K3s, Rancher, Prom/OTel, Grafana, Loki, Splunk/DD/Dynatrace | Deeper multi-stakeholder next |
| 18 | VitalEdge | Jul 28 | Unified NOC cloud + IBM i; anomaly + remediation | CheckMK, UiPath, Grafana, IBM i | Solution Design |
| 19 | AltMobility | Sep 21 | App incidents EC2/ECR; alert→RCA≤5m in Slack | AWS, Grafana, GHA, Slack | NDA + 1–2 services |
| 20 | Kissht | Mar–Aug | New Relic+Sentry+Grafana; off-hours runbooks; 3P outage attribution | NR, Sentry, Grafana/Loki/Prom, Slack, ECS/EKS | SQO; commercial asks |
| 21 | Nielsen / Gracenote | Jun–Sep | AI-agent + pipeline correlation; episodic memory | SigNoz, Langfuse, Fiddler, Manta, AWS, K8s | Bangalore workshop agreed |
| 22 | GreytHR | Jul–Sep | Alert volume / query cap; Aiden 1→2 migration | ObserveNow, Aiden 2.0, AWS | **Expansion closed** |
| — | Eng / AWS | Aug–Sep | Remediation verify loop; MCP 10 tools; SRE Gym 85%/110; ServiceNow change | MCP, SNOW, Kiro | Enablement / partner |

Also titled SRE demos in Sybill (not expanded above): Wipro Autonomous Operations Factory (Sep 22), PayPal (SRE Day intro), Viasat, Evergent, Nubank, Innovaccer, Kitaboo, Arrakis, Optum/AWS speaker track (AI SRE Next).

---

## Mapping → website placement

| Placement | Recommended videos |
|-----------|-------------------|
| `/product/aiden-for-sre` hero/video slot | **V1** (primary), loop **V2** secondary |
| Home showcase / Combined Hero SRE beat | V1 + V7 (Context Graph) |
| Product spotlight cards Detect/Triage/Diagnose/Remediate | Cut V1–V4 as 15–20s chapter loops |
| Enterprise / security content | **V8** |
| Resources / “Use cases” content hub (new) | All V1–V8 as cards → full clips |
| Sales enablement (internal) | Full inventory table + named accounts |

---

## Production notes (reuse existing pipeline)

1. Capture product UI in anonymized sandbox (no customer logos/data).  
2. Reframe with `videos/aiden-launch-edits/` HyperFrames 4K browser-card pattern.  
3. Narration: ElevenLabs Daniel (same as `videos/aiden-os-explained/`) unless brand picks otherwise.  
4. Length: 60–90s public; optional 3–4m deep-dive for resources.  
5. Before naming any customer on-site: Marketing + Legal + CSM approval checklist.

---

## Suggested ship order

1. **V1** Autopilot investigation (unblocks product-page placeholder)  
2. **V2** Governed pod restart  
3. **V7** Context Graph / memory (landing OCG synergy)  
4. **V4** Runbook → skill  
5. **V5** Noise reduction  
6. **V3** Front-door montage  
7. **V6** Multi-source RCA  
8. **V8** Private runner / enterprise  

---

## Sybill marketing ranking (capability storyboards)

Second Ask Sybill pass ranked **product workflows** for 60–90s public clips (frequency × visual clarity × anonymizability × AIOps differentiation). Map onto V1–V8 above:

| Sybill rank | Workflow | Maps to | Synthetic demo tip |
|-------------|----------|---------|-------------------|
| 1 | Root-signal alert triage & storm suppression | V5 (+ V1 open) | 48 alerts → 1 incident cluster |
| 2 | Multi-hypothesis K8s pod crash RCA | V2 / V6 | Parallel evidence cards |
| 3 | Deployment regression → automated rollback | V3 CI/CD + V6 | Git/ArgoCD ↔ telemetry |
| 4 | Closed-loop remediation + independent verification | V2 | Observed vs expected post-fix |
| 5 | Slack-native interactive triage / fork | V1 | In-thread Aiden cards |
| 6 | Reflections → auto runbooks | V4 / V7 | Knowledge Hub editor |
| 7 | Rego-as-code remediation guardrails | V2 / V8 | Policy gate before act |
| 8 | Cross-cluster capacity vs leak RCA | V6 | Multi-cluster PromQL fan-out |
| 9 | Predictive anomaly from telemetry drift | Axis/Corcentric ask | Pre-incident yellow warning |
| 10 | ITSM front-door enrichment | V3 | Vague Jira → enriched P2 |

**Production defaults from Sybill:** ≤75s; synthetic “Acme / GlobalPay” services (`cart-service`, `payment-api`, `inventory-db`); hero beat = multi-agent investigation → **independent verification loop** (wedge vs Bits AI / Davis / generic copilots). Do not name competitors in public VO without Legal OK.

Next step when ready: pick V1–V3, write HyperFrames BRIEF + SCRIPT per clip, capture UI, render delivery 4K.
