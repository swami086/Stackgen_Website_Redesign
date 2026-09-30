# Combined pipeline: Sybill → live capture → HyperFrames → Clueso

**Goal:** 16:9 ~30s Aiden SRE marketing cut with *real product motion* (not static screenshots), VO + captions, CTA `stackgen.com`.

## Use case (Sybill, 2026-09-23)

**V1 — Autopilot investigation of Pod CrashLoop / alert storm**

| Beat | On screen | Intent |
|------|-----------|--------|
| 0–5s | Alert storm → triage cards (Act now / Needs review) | Pain: noise |
| 5–12s | Root signal vs downstream; open investigation | Autopilot triage |
| 12–22s | Root Cause Confirmed + confidence + evidence | Magic moment |
| 22–30s | Mitigation / CTA `stackgen.com` | Resolve |

Stage proof already walked once: Alerts → Pod Crash Loop → Root Cause Confirmed @ 0.96 → Mitigation.

## Tool roles (who does what)

| Layer | Tool | Job |
|-------|------|-----|
| Research | **Sybill MCP** | Pick use case + beat sheet from real demos |
| Drive + record | **External Chrome** (see blocker) | Live click-through + **MP4 screen recording** |
| Visual edit | **HyperFrames** | Crop chrome, punch-zoom on result beats, browser plate, 1920×1080 render (same recipe as `videos/aiden-launch-edits`) |
| Narration / polish | **Clueso** | VO + captions + music + export; ingest HyperFrames MP4 as footage |

**Do not** send raw IDE screenshots into Clueso as the hero visual — that produced the cropped stills.

## Reticle blocker (hard)

`stage.dev.stackgen.com` has **no Reticle SDK**.  
`reticle open` / `reticle drive` load the URL but the page never dials the daemon → **no session, cannot act/record via Reticle MCP**.

Reticle stays useful later for StackGen *website* / local apps that are instrumented. For stage product capture, use one of:

1. **Playwright headed Chrome + video** (agent-driven, real Chrome channel) — recommended default  
2. **Manual QuickTime / Cap window record** while human clicks the beat sheet  
3. **Re-use an existing clean stage MP4** if Marketing already has one

## HyperFrames project shape

Project: `videos/aiden-sre-v1-autopilot/`  
**Done (2026-09-23):** trimmed beats `assets/stage-v1-beats.mp4` (44s) → plate+punch → **`renders/sre-v1-clean.mp4`** (1920×1080 · 44s · ~32MB). Clueso deferred.

Assets: `stage-walkthrough*.mp4` (raw screencast) · `stage-v1-beats.mp4` (edit source)  
Out: `renders/sre-v1-clean.mp4`

## Clueso step (after HyperFrames only)

- `add_clips(kind=video)` with HyperFrames render  
- Jeff VO + burn-in captions + Soft music  
- CTA end card `stackgen.com`  
- Export 1080p

## Chrome DevTools MCP (preferred driver — verified 2026-09-23)

**Yes for drive + record.** `user-chrome-devtools` with `--experimentalScreencast=true` + ffmpeg **with libvpx** (`brew` ffmpeg ≥9).

**Capture landed:** `videos/aiden-sre-v1-autopilot/assets/stage-walkthrough.mp4` (raw VP9 retina) + `stage-walkthrough-1920x1080.mp4` (H.264 16:9). Flow: Alerts → Act now → All Active → Pod Crash View investigation → Probable Root Cause / Mitigation.

**Gotchas:** MCP `filePath` must be inside MCP workspace roots (use default temp → `cp`); Homebrew ffmpeg without libvpx makes screencast hang (empty file) — needs `libvpx-vp9`; timeline can stretch vs wall clock ([issue #2204](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/2204)).

| Capability | Status |
|------------|--------|
| Navigate stage URL | ✅ works |
| Click / fill / snapshot | ✅ |
| Resize to 1920×1080 landscape | ✅ (window must not be maximized) |
| Login | Separate Chrome profile → user must sign in once in **that** Chrome window |
| Native MP4 record tool | ❌ not in MCP — screenshots + perf traces only |

**Video capture path with DevTools MCP:**
1. User logs into stage in the DevTools-controlled Chrome window  
2. Agent drives V1 beat sheet (Alerts → investigation → RCA)  
3. Parallel **ffmpeg / `screencapture` of that Chrome window** (or CDP screencast via custom script) → `assets/stage-walkthrough.mp4`  
4. HyperFrames reframe/zoom → Clueso VO  

Replaces capture options 1–2 above as the default agent path.

## Gate before building

User logs into stage in Chrome DevTools MCP window → agent drives + we record MP4 → HyperFrames → Clueso.
