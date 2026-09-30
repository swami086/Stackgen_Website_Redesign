# Aiden SRE V10 — RCA Multi-Tool Demo (Design)

**Status:** Design approved (brainstorm 2026-09-25) · awaiting **Figma pass** then implementation plan  
**Folder (greenfield):** `videos/aiden-sre-v10-rca-tools/`  
**Archive:** `videos/aiden-sre-v9-rca-pso/` (do not mutate for this redo)  
**Figma canvas:** https://www.figma.com/design/YUgx6CRwXJT0s7Vz9BRHAV/Untitled · `fileKey=YUgx6CRwXJT0s7Vz9BRHAV`  
**Destination:** `/product/aiden-for-sre` · Approach A · ~75–90s

## Intent

Redo the RCA product-page demo so picture matches story: cascade alerts → Aiden correlates **Datadog + GitHub + Kubernetes + Slack** → root cause in minutes → empower CTA. Script rewritten (Gate A). UI must look like real product chrome (Gate F authenticity), then HyperFrames camera/yellow, then Clueso VO.

Inspiration only (not copy): [Datadog Bits AI RCA demo](https://www.youtube.com/watch?v=6twkzN5bGnM) / [Bits Investigation](https://www.datadoghq.com/product/ai/bits-investigation/) — alert → hypotheses → validated RC in minutes.

## Decisions locked

| # | Choice |
|---|--------|
| Scenario | **C hybrid:** Datadog beat structure; Aiden-native **worker CrashLoop after deploy** |
| Tools on-screen | Datadog + GitHub + Kubernetes + Slack |
| Narration | **B** full Gate A rewrite (plain SE language) |
| Project home | **A** greenfield `aiden-sre-v10-rca-tools` |
| Pipeline | **2** multi-plate Approach A |
| Authenticity | **Figma-first** (skill Gate F, mandatory) → user **Figma pass** → HyperFrames |

## Scenario

- Service: `worker-service` (anon SaaS backend)
- Trigger: new deploy → CrashLoop + latency/error cascade
- RC: regression in new deploy · confidence ~0.8
- Outcome: RCA card + Slack `#incidents` post · human review / guardrails
- No named customers · no Visa/Mitratech · no front-door · no em/en dashes

## Beat map (~75–90s)

| Beat | ~t | Plate | Picture | VO intent |
|------|----|-------|---------|-----------|
| 0 | 0–2s | Settle | Dark blank | silent / Soft BGM |
| 1 | 2–18s | **A** | Aiden Alerts — Act now / CrashLoop / latency pile | Cascade; real vs noise |
| 2 | 18–32s | **B** | Investigation + tool rail (DD · GH · K8s · Slack) | 24/7 agent; plugs into existing tools |
| 3 | 32–58s | **C** | Evidence insets: DD metrics/logs → GH deploy SHA → K8s restarts | Cross-tool RC in minutes |
| 4 | 58–78s | **D** | RCA card → Slack post → end card | Guardrails · Empower CTA |
| 5 | last ~6s | D close | End card | Try Aiden for SRE today |

**Evidence rule:** third-party UIs as **faithful insets inside Aiden** (connection story), not full-screen product hops — unless a plate needs a brief tool-native punch, then return to Aiden.

## Gate F — Figma authenticity (new, before Gate A build)

**Canvas:** user Untitled file above.

| Frame | SoT | Method |
|-------|-----|--------|
| Aiden Alerts / Investigation / RCA | stage `ai-sre-demo` ([CAPTURE-MAP](../../videos/aiden-sre-v9-rca-pso/CAPTURE-MAP.md)) | Live capture → Figma (`generate_figma_design` / Chrome shot + place) |
| Datadog-like obs | Mobbin obs patterns + public DD docs chrome | Capture or traced recreate |
| GitHub Actions / deploy | [Mobbin GH Actions](https://mobbin.com/screens/103932a1-fba2-4b8c-b210-8473adbe9576) | Capture or recreate |
| K8s events / CrashLoop | Console-faithful mock | Recreate from Mobbin-adjacent + honest labels |
| Slack `#incidents` | [Mobbin Slack](https://mobbin.com/screens/fe601bec-b835-4429-8957-75642a5fe7e0) | Recreate aubergine + RCA message |

**Pass phrase:** `Figma pass` — only then Gate A paste lock + Gate B HyperFrames.

## Camera / highlight (Gate B · HyperFrames)

- Approach A: plate owns camera; Clueso = VO + Soft BGM @12% + dissolves only
- `#world` punch **1.22–1.38×** · `focusPoseSafe` pad ~72 · `power2.inOut`
- in ~0.9–1.2s → hold ≥1.2s → out ~1.0–1.3s · wide before handoff
- Yellow `#F5C518` border+outline only · one active HL · clear before next
- Soft vignette ≤0.5 on punch · no plate pills / burn-in captions

Skills: `video-gated-product-demo` (**Gate F Figma authenticity** mandatory — see skill `figma-authenticity.md`) · `hyperframes` · `hyperframes-keyframes` · `animation-systems` · Gate A `expert-pmm-writer` · Gate C Clueso `polish-screen-demo` (no crop zooms) · Figma MCP + Mobbin refs

## Pipeline order

```
Gate F Figma authenticity → Figma pass
→ Gate A SCRIPT rewrite + check_ai_signs → Gate A pass
→ Gate B silent plates A–D + snapshots → Gate B pass
→ Gate C Clueso Chris + Soft@12% → Gate C pass
→ Export only on explicit ask
```

## Bans

Visa/Mitratech · front door · cert laundry · em/en dashes · plate pills · montage cards · opaque “keep the call” · named customers in public VO · Clueso crop zooms/highlights · inventing fake Aiden chrome when stage capture exists

## Out of scope

- Export before Gate C pass + explicit ask
- Chrome DevTools as final plate pixels (refs only after Gate F)
- Replacing Queue V8 / Front Door archives

## Success criteria

1. Viewer can name the incident (CrashLoop after deploy) and the four tools without VO.
2. Yellow/zoom land on the action word; no broken HL or seasick camera.
3. Figma board approved before HyperFrames.
4. Runtime 75–90s; Chris VO; Soft BGM @12%; Empower end card matches VO.
