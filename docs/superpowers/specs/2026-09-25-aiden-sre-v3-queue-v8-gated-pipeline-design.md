# Aiden SRE V3 Queue V8 — Gated Demo Video Pipeline

**Date:** 2026-09-25  
**Status:** Approved · implementation plan written · awaiting execution choice  
**Product surface:** `/product/aiden-for-sre`  
**Use case:** V3 ticket queue (incomplete Jira tickets → Aiden context → write-back → breadth)  
**Approach:** Greenfield gated (Approach 1)

---

## 1. Purpose

Rebuild the Aiden SRE ticket-queue product demo as a **repeatable, gated pipeline**:

1. Lock a human spoken script (`expert-pmm-writer`)  
2. Build a silent HyperFrames plate with safe regional focus-zoom  
3. Finish in Clueso (VO + Soft BGM + light transitions only)  
4. Optionally encode the process as a reusable skill / `skills.md` later  

Each gate ends with an explicit user **pass** before the next gate starts. No export until Gate C pass + explicit export request.

### Why greenfield

Prior work under `videos/aiden-sre-v3-frontdoor/` and Clueso V7 accumulated debt: AI-sounding VO, plate caption pills, text-cropping zooms, standalone montage cards, hidden Clueso clips. A new folder + new Clueso project keeps validation artifacts clean.

**Archive (do not mutate as source of truth):**

- `videos/aiden-sre-v3-frontdoor/`  
- Clueso V7: `https://web.clueso.io/guide/17f6140f-9f97-4a29-b830-62aa552d9354`

---

## 2. Locked product brief

| Decision | Choice |
|----------|--------|
| Story | **A** — V3 ticket queue (Jira incomplete → write-back → breadth) |
| Spoken runtime | **B** — ~45–60s |
| Audience | **C** — mixed product-page traffic (readable to SRE and eng leaders) |
| On-screen overlays | **A** — none (picture + VO only; no plate pills, no Clueso burn-in) |
| Camera ownership | **A** — HyperFrames plate owns safe regional zooms; Clueso does not crop-zoom |
| Pipeline shape | **1** — greenfield gated under `videos/aiden-sre-v3-queue-v8/` |

### Facts (Sybill-grounded, public-safe)

- Hundreds of SRE tickets per month  
- Roughly four in ten arrive without enough context to act  
- Chase cost is measured in engineer hours (links, change history)  

### Hard bans

- Customer names: Visa, Mitratech (and any other unapproved logos/names)  
- Metaphor: “front door”  
- Laundry list of cert / restart / access tickets as the hero story  
- Em dashes (U+2014) and en dashes (U+2013) in spoken copy  
- Plate caption / narration pills  
- Floating graphic cards on a dark void for breadth  

---

## 3. Skill stack (skill-picker locked 2026-09-25)

Hand list in first draft was incomplete. Re-ran MCP `user-skill-picker` (`compose_skills` + category-scoped `find_helpful_skills`) per gate. Table below is the **execution contract**.

### Routing rule (every gate)

1. Call skill-picker again at gate start (`find_helpful_skills` or `compose_skills` with the gate task string).  
2. Enter via pack **router** when `role=router`; load **one** member only.  
3. Prefer this locked table over noisy hits (Clueso often ranks #1 on any “video” query — ignore for Gate A/B).  
4. If picker surfaces a stronger skill not listed, propose it; do not silently swap.  
5. Never bulk-load a pack.

### Per-gate load order

| Gate | Primary (must load) | Supporting (load if needed) | Do not load |
|------|---------------------|-----------------------------|-------------|
| **Process** (plan/execute) | Superpowers `writing-plans` → `executing-plans` → `verification-before-completion` · `superpowers-tooling-bridge` | `using-superpowers` (session start) | Ouroboros unless user asks |
| **A — Script** | `expert-pmm-writer` (hard gate: `check_ai_signs.py` exit 0) | Optional: `marketing-skills` router → `marketing-strategy-pmm` (positioning only); facts from `docs/superpowers/specs/2026-09-23-ai-sre-demo-video-use-cases.md` + Sybill MCP already mined — do not re-mine unless facts stale | `clueso-skills` / `polish-screen-demo`; `ad-creative`; `blog-audio`; `hyperframes-audio`; `copywriting` as primary (weaker anti-slop than expert-pmm-writer) |
| **B — Plate** | `hyperframes` (mandatory entry) → `hyperframes-core` → `hyperframes-keyframes` → `hyperframes-cli` | `hyperframes-animation` for GSAP/safe zoom recipes; `hyperframes-creative` only if BRIEF/beats need rewrite | `clueso-skills` / `ui-concept-animation`; `hyperframes-audio` (plate is silent); `cinematic-gsap-lenis-motion-system` / `cinematic-scroll-storytelling` / `build-awwwards-quality-sites` (web scroll, not HyperFrames plate); `embedded-captions` |
| **C — Clueso** | `clueso-skills` router → `polish-screen-demo` | `elevenlabs-skills` router → `text-to-speech` (Chris / ElevenLabs voice selection if Clueso voice UI needs it); Soft BGM = existing `bgm-soft.mp3` @~12% (no music regen unless missing) | Clueso **crop zooms** and **burn-in captions** even if skill defaults suggest them (plate owns camera; overlays banned); `embedded-captions`; `sound-effects` unless user asks; `demo-video` / `web-video-presentation` (alternate pipelines); `raw-recording-to-branded-demo` (wrong input shape) |
| **D — skills.md** (later) | `anthropic-skills` router → `skill-creator` **or** `~/.cursor/skills-cursor/create-skill` | `agent-workflow-designer` (pipeline handoffs); optional `extract` (`/si:extract`) if packaging a proven run | Clueso/ElevenLabs packs; `ci-cd-pipeline-builder` |

### Tooling companions

Chisle on. Sourcegraph N/A (this repo not in index). Reticle N/A. Ouroboros optional only if user asks for Seed/eval.

### Picker evidence (why these wins)

- **A:** category `marketing` → `expert-pmm-writer` + pack `marketing-skills` → `marketing-strategy-pmm`. Compose without category wrongly preferred Clueso.  
- **B:** category `video-media` HyperFrames query → `hyperframes-keyframes`, `hyperframes-cli`, `hyperframes-animation`, `hyperframes-core`, `hyperframes` (entry).  
- **C:** category `video-media` → `clueso-skills` → `polish-screen-demo` + `elevenlabs-skills` → `text-to-speech`.  
- **D:** skill-authoring query → `anthropic-skills` → `skill-creator`; `agent-workflow-designer` for gated multi-step docs.  

---

## 4. Pipeline overview

```
Gate A  SCRIPT     expert-pmm-writer
        ↓ user: "Gate A pass"
Gate B  PLATE      HyperFrames (silent MP4)
        ↓ user: "Gate B pass"
Gate C  CLUESO     VO + Soft BGM + dissolves
        ↓ user: "Gate C pass"  (+ separate ask for export)
Gate D  (optional) skills.md / workflow skill
```

### Project layout (new)

```
videos/aiden-sre-v3-queue-v8/
  BRIEF.md
  SCRIPT.md
  VALIDATION.md        # running checklist with pass/fail notes
  index.html           # HyperFrames plate (Jira halves A + B)
  assets/              # jira-mock.css, jira marks, stage-v4-tight, bgm-soft.mp3
  renders/
    plate-a.mp4        # beats 1–3 silent
    plate-b.mp4        # beats 5–7 silent
  snapshots/
```

### Copy-only assets from archive (do not edit archive as live)

Source: `videos/aiden-sre-v3-frontdoor/assets/`

| Asset | File |
|-------|------|
| Jira mock CSS | `jira-mock.css` |
| Jira mark / chrome crops | `jira-mark.svg`, `jira-logo-*.png` |
| Stage insert (Clueso) | `stage-v4-tight-1920x1080.mp4` |
| Soft BGM | `bgm-soft.mp3` |

---

## 5. Beat map

Target spoken total ~50–55s. Plate is silent.

**Cut model:** HyperFrames renders two silent plate segments. Clueso stitches: plate A (beats 1–3) → stage insert (beat 4) → plate B (beats 5–7). Clueso does not crop-zoom either plate or stage.

| # | ~time | Picture | VO intent | Camera | Plate |
|---|-------|---------|-----------|--------|-------|
| 1 | 0–10s | Jira List — dense SRE Ticket Queue | Queue never empties; volume; incomplete rate | Soft safe zoom on focus row | A |
| 2 | 10–18s | Same list / row hold | Chase cost: links + change history | Soft hold / nudge | A |
| 3 | 18–26s | Jira Issue — empty description, no builds | Broken build with nowhere to start | Soft zoom empty field (no crop) | A |
| 4 | 26–36s | Stage Aiden UI (`stage-v4-tight-1920x1080.mp4`) | Aiden fills the gap; context already attached | Wide / mild only (no Clueso crop) | — stage |
| 5 | 36–44s | Jira Done ticket — write-back filled | Cause + next step written back in Jira | Soft safe zoom on enriched description | B |
| 6 | 44–50s | Jira List filtered Assignee: Aiden, DONE rows | Repeat ticket work handled across queue | Soft insight → rows (stay in Jira) | B |
| 7 | 50–55s | End card over product UI | Clears queue; you keep the call; light CTA | Wide hold | B |

**Gate B snapshot peaks (seconds on each plate timeline):** plate A @ 5, 14, 22; plate B @ 4, 10, 16 (relative to each plate start). Adjust if beat timings shift after Gate A lock.

### Picture rules (Gate B)

- Always full-bleed Jira or Aiden stage  
- Breadth = filtered Jira list, not montage slides  
- Safe focus-zoom: scale capped so target fits with padding; translate clamped so left-aligned titles stay fully readable  
- No `#caption` / lower-third pills on the plate  

### Script rules (Gate A)

- Mixed audience, spoken peer/product-page tone  
- Light CTA (not hard sell)  
- `check_ai_signs.py` must exit 0  
- Paste block only in `SCRIPT.md` for Clueso  

---

## 6. Validation rituals

### Gate A — Script

1. Skill-picker: confirm Gate A row in §3 (primary `expert-pmm-writer`).  
2. Run `expert-pmm-writer` pipeline (context → brief → draft → detect → mechanical check).  
3. `python3 ~/.cursor/skills/expert-pmm-writer/scripts/check_ai_signs.py videos/aiden-sre-v3-queue-v8/SCRIPT.md` → exit **0**.  
4. Read aloud: ~45–60s; no em/en dashes; bans in §2.  
5. User says **“Gate A pass”** (or request edits).  

**Artifact:** `SCRIPT.md` with locked paste block + beat table.

### Gate B — Plate

1. Skill-picker: confirm Gate B row in §3 (enter via `hyperframes`).  
2. Node ≥22. `npx hyperframes check` in project folder. Jira mock contrast warnings may be non-blocking; layout/crop/overflow that breaks readability = fail.  
3. Snapshot at peaks in §5 (plate A @ 5/14/22; plate B @ 4/10/16). Review PNGs: full titles readable; no caption pills; still in Jira UI.  
4. Render silent plates: `renders/plate-a.mp4` (beats 1–3) and `renders/plate-b.mp4` (beats 5–7). `ffprobe` durations match beat map (±1s). No VO/BGM in either plate.  
5. User says **“Gate B pass”**.  

**Artifacts:** `renders/plate-a.mp4`, `renders/plate-b.mp4`, `snapshots/`, notes in `VALIDATION.md`.

### Gate C — Clueso

1. Skill-picker: confirm Gate C row in §3 (`clueso-skills` → `polish-screen-demo`; constrain: no crop zooms, no burn-in).  
2. New Clueso project (do not reopen V7 as live).  
3. Timeline: plate A → `stage-v4-tight-1920x1080.mp4` → plate B; Chris (ElevenLabs); `bgm-soft.mp3` at ~12%; dissolve transitions only.  
4. Preview: no Clueso crop zooms; no burn-in captions; VO matches Gate A paste.  
5. User says **“Gate C pass”**. Export only after a separate explicit request.  

**Artifact:** Clueso preview URL recorded in `VALIDATION.md` / `SCRIPT.md`.

### Gate D — Optional documentation

1. Skill-picker: confirm Gate D row (`skill-creator` / `create-skill` + `agent-workflow-designer`).  
2. Encode A→C as a reusable skill or `skills.md` only after one successful full pass of this pipeline.
---

## 7. Out of scope (this cycle)

- V1 Autopilot story rewrite  
- Website embed / product page wiring  
- Public export / distribution  
- Ouroboros Seed/eval loop (unless requested)  
- Mutating archive `aiden-sre-v3-frontdoor` as the live project  

---

## 8. Success criteria

- User can re-run Gates A→C with the same pass phrases and get a comparable result.  
- Spoken copy passes mechanical anti-slop and sounds human on read-aloud.  
- Plate never shows cropped “Jenkins”-style title crops or floating montage cards.  
- Finished preview is picture + VO only, ~45–60s, Soft bed under VO.  
- No export without explicit ask after Gate C pass.  

---

## 9. Next step after this file is approved

1. User reviews this spec (reply “spec approved” or request edits).  
2. Invoke Superpowers `writing-plans` → implementation plan under `docs/superpowers/plans/`.  
3. Execute Gate A only (`expert-pmm-writer`) until **Gate A pass**.  
