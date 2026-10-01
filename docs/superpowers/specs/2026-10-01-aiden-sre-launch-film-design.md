# Aiden for SRE — launch film v2 — design spec

Date: 2026-10-01 · Status: DRAFT for user review · Supersedes for new work: `2026-09-30-aiden-sre-film-design.md` (kept as history; its project `videos/aiden-sre-film/` is frozen)

## 0. Summary

A ~2:00 narrated launch film for Aiden for SRE at the production grade of the GitLab Duo Workflow film (YouTube `-5JPZoGeHHs`). Words come verbatim from the approved storyboard (Drive `1YbNf9XchVrp3g4v7wNoJsmLIi_fMFTWR`, track `sre`, Cut A + Cut B). Every second of picture moves. Product UI is the real Aiden UI, imported from Figma as editable HTML (not screenshots) so each row, score, chip and button can animate on its own, presented as authentic light panels floating on the dark StackGen stage. **ElevenLabs (via the ElevenLabs MCP) is the only generative vendor**: narration (Eleven v4, scene-length takes cast and picked by ear), music (Eleven Music v2.5, spotted to the cut), SFX, and the atmosphere/bridge video (Seedance 2.5 / Kling 3 Pro / Veo 3.1 running inside ElevenLabs flows, never UI). **HyperFrames is the assembler**: it owns transcription, timing, the beat grid, every frame, the voiceover carve and mix, captions and the render. Execution is parallel Composer 2.5 subagents behind review gates.

One-way data flow, no round trips between tools. Narration leads, music is cut to narration, picture is cut to both:

```
Drive storyboard (Composio) ─► data/frames.json + data/takes.json (spoken markup)
   │
   ├─► ElevenLabs MCP · TTS eleven_v4 · 5 scene takes × 4 variations ─► pick by ear ─► download
   │      ─► npx hyperframes transcribe (word timings) ─► split_takes.py ─► Lxx.wav + Lxx.words.json
   │      ─► build_timing.py ─► timing.voice.json (VO frames fixed, bridges at minimum)
   │
   ├─► ElevenLabs MCP · Music eleven_music_v2_5 · spotting-sheet prompt × 4 ─► pick ─► download
   │      ─► analyze-beatgrid.py (HyperFrames) ─► audiomap.json
   │      ─► fit_bridges.py ─► timing.json  ◄── LOCK: the only hub every later stage reads
   │
Figma frames ─► hyperframes figma tokens/component/asset ─► compositions/components/*
timing.json + Figma stills ─► ElevenLabs MCP · image (Nano Banana Pro) ─► video (Seedance 2.5, start/end frames)
                           ─► Topaz upscale (ElevenLabs) ─► assets/el-video/*
timing.json hit points ─► ElevenLabs MCP · SFX ─► assets/audio/sfx/*
   │
all of the above ─► STORYBOARD.md + frame packets ─► compositions/frames/NN-*.html
   ─► index.html (HyperFrames: voiceover carve, ducking automation, captions) ─► render ─► finish ─► QA
```

Nothing downstream writes back upstream. HyperFrames never calls ElevenLabs at render time; every ElevenLabs output is downloaded, frozen under `assets/` and adopted into `.media/` with provenance before any frame uses it.

---

## 1. Locked decisions (user, 2026-10-01)

| # | Decision | Value |
|---|---|---|
| D1 | Project | New `videos/aiden-sre-launch/`. Port only proven pieces from `videos/aiden-sre-film/` (§10.2). Old project is read-only. |
| D2 | UI treatment | Authentic light product UI, rebuilt as HTML from Figma, floating and tilted on the dark ink stage, exposure matched (§6.3). |
| D3 | Runtime | Storyboard Cut A + Cut B (lines L08 and L14 removed, 14 lines). Target 1:50–2:06, driven by the chosen narration take; bridges flex to land on the music (§9.2). |
| D4 | Generated video | ElevenLabs MCP video models only (no Apiframe). Atmosphere and transitions only. Never product UI. |
| D5 | Execution | Cursor Composer 2.5 (`composer-2.5-fast`) for build subagents; stronger models for review gates (§12). |
| D6 | Audio | ElevenLabs MCP only: narration, music, SFX. River is the default voice but is re-cast against two Voice Library narrators on Eleven v4 (§9.1). |
| D7 | Motion | Very rich motion. No static images or held frames anywhere (§5 is the measurable contract). |
| D8 | Narration bar | As close to a human narrator as possible; must not read as AI voice or AI-written. Quality bar is the GitLab Duo Workflow film's read and mix (§9.1 protocol, A13). |
| D9 | Music | Blends with and is in sync with the narration: music is generated after narration lock from a spotting sheet, beat-mapped, and the cut's flexible beats are snapped to it; mixed with a spectral voiceover carve, not a flat duck (§9.2, §9.4). |
| D10 | Assembly | HyperFrames assembles everything (picture, audio mix, captions, render). ElevenLabs outputs enter only as frozen files. |

---

## 2. Inputs and sources of truth

| Input | Location | Authority |
|---|---|---|
| Storyboard | Drive file `1YbNf9XchVrp3g4v7wNoJsmLIi_fMFTWR` ("260925 - AOF Homepage Video Storyboard Visual v2.0.html", v16, modified 2026-09-26). Parsed copy `videos/aiden-sre-film/source/storyboard.json` verified 2026-10-01: all 15 `sre` VO beats match word for word. Line split `videos/aiden-sre-film/data/lines.json` (16 lines). | Words and order. VO is never rewritten. |
| Product UI screens | Figma `zpQTgAfsrkN6PI3eTHOb5p`, page `0:1` "Shot screens" (table §2.1) | Pixel and copy authenticity of every product surface. |
| Live product | `https://stage.dev.stackgen.com/app/sre/ai-sre-demo/…` (logged-in Chrome tab, viewport 1920×886 @2×, light theme, IBM Plex Sans, 54 dark-theme CSS rules present but unused) | Interaction truth: hover, click, pop-up and scroll behaviour; copy check against Figma. |
| Reference film | YouTube `-5JPZoGeHHs` (GitLab Duo Workflow, 3:04). Technique decode T1–T11 in `2026-09-30-aiden-sre-film-design.md` §1.1 | Technique grammar only. Never its palette, icons or layouts. |
| Brand | stackgen.com tokens, §6.1 (sampled 2026-09-30) | Film chrome: stage, type, accents, end card. |
| Prior audit | `videos/aiden-sre-film/AUDIT.md` ("do not ship") | Failure modes this spec designs out (§3). |

### 2.1 Figma node map (file `zpQTgAfsrkN6PI3eTHOb5p`)

| Group | Node | Name | Size | Use |
|---|---|---|---|---|
| Product UI | `48:2` | 01 Alert triage | 1920×886 | F05–F07 alert list, tabs, summary cards |
| | `51:2` | 02 Act now | 1920×886 | F07 filtered critical list |
| | `54:2` | 03 Discovery | 1920×886 | F03 service discovery |
| | `58:2` | 04 Root cause | 1920×886 | F10–F11 investigation, Probable Root Cause card, Evidence panel |
| | `61:2` | 05 Ruled out | 1920×886 | F10 ruled-out hypotheses |
| | `64:2` | 06 Recommended action | 1920×886 | F14 remediation action |
| Motion layouts | `66:2` | 07 Alert flood | 1920×1080 | F02 |
| | `66:27` | 08 Title | 1920×1080 | F03 open |
| | `66:30` | 09 Connections | 1920×1080 | F03 tools → Aiden |
| | `66:49` | 10 Manual fix | 1920×1080 | F13 |
| | `66:56` | 11 Approval gate | 1920×1080 | F14 |
| | `66:70` | 12 Resolved | 1920×1080 | F15 |
| | `66:73` | 13 Learn | 1920×1080 | F16 |
| | `66:76` | 14 World model | 1920×1080 | F18 |
| | `66:87` | 15 Aiden OS | 1920×1080 | F18 |
| | `66:92` | 16 End card | 1920×1080 | F19 |
| Site references | `76:2` | 21 World model — stackgen.com | 1440×1296 | F18 diagram source |
| | `80:2` | SRE — title and community edition | 1568×1149 | F19 CTA copy |
| | `79:2` | SRE — discovery, triage, remediation, SLOs | 1160×3275 | Copy check only |
| Missing beats (section `99:2`) | `99:3`, `99:36` | 22/23 Slack — question, no replies / hover | 1920×1080 | F09 |
| | `99:70`, `99:81` | 24 Downstream effect / 25 Arrow to root signal | 1920×1080 | Full cut only (L08); unused in this cut |
| | `99:93`, `99:100` | 26 Status — investigating / 27 resolved | 1920×1080 | F09, F15 |
| ElevenLabs section `84:2` | `84:3`…`84:112` | EL 01–06 | — | Not used (earlier Seedance-cut references) |

Motion layouts 07–16 are sparse (frame 14 is a headline plus four empty chips). They are **layout and copy keyframes, not finished shots**. Each is rebuilt in HTML and enriched to meet §5 and §6.4.

---

## 3. What failed last time, and the rule that prevents it

| Audit defect (`AUDIT.md`) | Root cause | Rule in this spec |
|---|---|---|
| D1 light plates jump out of a dark film; bloom on white | Full-bleed screenshots, bloom applied to UI | UI is always a framed floating panel with visible stage around it, peak white capped, bloom never touches UI (§6.3) |
| D2/D3/D4 empty dark slabs, labels with no interior | Shots designed as boxes before content | Every panel is filled to its edges with real component content; a box that cannot be filled is cut smaller (§6.4) |
| D5 counters collide with cards | Overlays positioned by eye | Overlays anchor to measured component boxes (`getBoundingClientRect` after `document.fonts.ready`); layout check in `hyperframes check` |
| D6 alert count is not one story | Numbers chosen per shot | One film-owned corner counter in `data/frames.json`: climbs 0 → 1,284 over F01–F02, holds 1,284 in F05–F06, counts down to 7 in F07. Product UI numbers are never edited |
| D7 UI type under 20 px | Whole 1920-wide UI shrunk into frame | Any UI text the VO names renders ≥ 20 px effective (font-size × camera scale) at its cue (§5 M6) |
| D8 off-palette magenta button dominates | Plate colors unmanaged | Product colors stay authentic, but the camera never parks on chrome the VO does not name; depth-of-field and exposure push unnamed chrome back |
| D10 cursor hides button label | Cursor tip on label | Cursor tip lands ≥ 8 px outside the label box; click target is the button edge |
| Old pipeline complexity (3 alpha passes + per-shot ffmpeg composite) | Bloom/grain tuning per shot | One HyperFrames render of the whole film at 60 fps, one finish pass (grain + vignette) on the master (§10.3) |
| Word timing files drift 0.3–0.4 s past audio end (measured 2026-10-01 on all 16 River takes) | Timings not regenerated after audio edits | Word timings are always produced by transcribing the exact file that ships (`hyperframes transcribe`), after any trim; a test asserts last word end ≤ file duration (§9.1) |
| Earlier River takes were per-line and flat-sounding; music was a generic bed laid under the cut | Lines generated in isolation lose cross-sentence prosody; bed not spotted to picture | Scene-length takes (§9.1); music generated from a spotting sheet and the cut snapped to its downbeats (§9.2) |

---

## 4. Tool roles and hand-off contracts

| Tool | Owns | Consumes | Produces (frozen, local) | Never does |
|---|---|---|---|---|
| Composio (Google Drive) | Storyboard retrieval | Drive file id | `source/storyboard.html` + verified `source/storyboard.json` | — |
| Figma (via `hyperframes figma` CLI, `FIGMA_TOKEN`) | Product UI geometry, copy, icons, layout keyframes | node ids §2.1 | `compositions/components/<name>/` (editable HTML), `.media/images/*` (SVG/PNG @2×), `.media/manifest.jsonl` | Raw Figma MCP calls for import (they skip sanitisation, provenance and token binding) |
| Figma MCP (`get_screenshot`, `get_metadata`) | Ground-truth stills for fidelity checks; style references for ElevenLabs image/video | node ids | `source/figma/<node>.png` | Feeding pixels into the film |
| Chrome DevTools MCP | Interaction truth | logged-in stage tab | `source/live/*.json` (DOM boxes, transition timings, copy) | Plates in the film (Figma components are the plates) |
| ElevenLabs MCP — TTS (`eleven_v4`) | Narration | `data/takes.json` (spoken markup), voice id from `creative_list_voices` | `assets/audio/vo/takes/Tn-vK.mp3` (all variations kept), chosen take ids in `data/takes.json` | Time-stretching; per-line generation; editing words |
| ElevenLabs MCP — Music (`eleven_music_v2_5`), Video-to-Music (`eleven_video_to_music_v1`, candidate B only) | Score | spotting sheet `data/spotting.json` (from `timing.voice.json`), silent picture-lock render for candidate B | `assets/audio/music/Mx-vK.mp3`, chosen `bed.wav` | Being laid before narration is locked |
| ElevenLabs MCP — SFX (`eleven_text_to_sound_v2`) | Sound design | `data/sfx.json` | `assets/audio/sfx/*.wav` | Covering narration |
| ElevenLabs MCP — Image (`gemini-3-pro-image`) + Video (`bytedance-seedance-v2.5`, fallbacks `kling-3-pro`, `veo-3.1-generate-001`) + `topaz-video-upscale` | Atmosphere + bridges | `data/el-video.json` (prompts), Figma style stills and HyperFrames first frames uploaded with `creative_create_asset_upload` | `assets/el-video/Ax.mp4` (+ `Ax.json` provenance: flow id, node id, generation id, model, prompt) | Product UI, readable text, logos |
| HyperFrames 0.8.103 (`product-launch-video` workflow) | Assembly: transcription, beat grid, composition, motion, voiceover carve + mix, captions, render | every frozen file above | `transcript.json`, `audiomap.json`, `compositions/frames/NN-*.html`, `index.html`, `renders/*.mov` | Network fetches at render time |
| ffmpeg | Finish grade, measurement | master | `renders/aiden-sre-launch.mp4`, QA metrics | Look changes beyond §10.3 |

Hand-off rule: a stage starts only from frozen files on disk with provenance. No stage re-asks an upstream tool for data it should have received in a file.

ElevenLabs MCP I/O contract (verified in plan Task 1 smoke test before any real spend):
- Every generation call passes a shared `flow_id` per stage (`creative_create_flow` first) so related nodes can be wired, and `estimate_only: true` runs first for any batch over 200 credits.
- Results are read with `creative_get_flow_run_status` (poll, never re-call a generator — that charges again) and downloaded from the returned generation URLs into `assets/…` with `curl`; provenance JSON records `flow_id`, `node_id`, `generation_id`, `model_id`, prompt.
- Local files that must feed a generation (HyperFrames first frames for `end_frame`, the silent picture-lock render for video-to-music) go up via `creative_create_asset_upload` → HTTP PUT → `creative_finalize_asset_upload` → `creative_add_flow_asset_node` → `creative_connect_flow_nodes`.
- Picking a variation for downstream use: `creative_add_flow_asset_node` with that `generation_id` (variations live on one node).
- The ElevenLabs `composition` node is not used. HyperFrames is the only timeline.

---

## 5. Motion contract (measurable — "no static frames")

| # | Rule | Measured by |
|---|---|---|
| M1 | No frozen picture anywhere: zero detections from `freezedetect=n=-60dB:d=0.5` on the master | `scripts/qa_motion.py` |
| M2 | Rich motion: every 1.0 s window has mean `signalstats` YDIF ≥ `MOTION_FLOOR`. Floor is calibrated on the approved golden frame (F10) as 60% of its lowest 1 s window, written to `data/qa.json`, never lowered after | `scripts/qa_motion.py` |
| M3 | Camera never rests: every frame has a camera path with ≥ 2% scale change or ≥ 30 px drift, eased (`power2.inOut`), ending in a slow drift rather than a stop | camera keys in frame HTML; review |
| M4 | Three layers always move: background (ribbons or ElevenLabs video clip), mid (UI component state change, cursor, or diagram build), foreground (kinetic type, callout or counter). A layer may rest ≤ 0.6 s only while another layer is in a primary move | `review-animations` pass + animation map (`hyperframes-animation` audit) |
| M5 | Type lands on its word: OST term appears within ±120 ms of the VO word it names | `timing.json` cue vs `hyperframes check` snapshots |
| M6 | Legibility under motion: UI text the VO names is ≥ 20 px effective at its cue; film type sizes per §6.2 | layout check + snapshot measure |
| M7 | UI feels used: cursor travels on arcs (never teleports); click = press 0.96 / 90 ms + square hairline ripple 0→48 px / 0.35 s; lists scroll with eased momentum; state changes use FLIP, not crossfade, when the element persists | `cursor-click-ripple`, `card-morph-anchor`, `anchored-layout-expand` rules |
| M8 | Cuts every 3–8 s inside a frame (a frame may hold several shots); a "shot" is a camera target change, a whip, or an ElevenLabs video bridge | `timing.json` shot list |
| M9 | ElevenLabs video clips are always moving footage under live HTML; a clip is never the only moving layer for > 1.5 s | review |
| M10 | Seek-safe determinism: one paused timeline per composition, no `Date.now()`/`Math.random()` (seeded PRNG only), no network | `hyperframes check` |

Reference grammar to reproduce (from §2 decode): T2 neon ribbons that bundle and fan, T3 floating UI panels with perspective tilt and rim light, T5 chips riding paths, T6 radial pulse on the critical alert, T7 node lattice lighting up, T8 two-weight kinetic type with mask reveals, T9 row highlight + cursor, T10 camera never static, T11 logo lockup end card.

---

## 6. Design system

### 6.1 Film tokens (carried forward unchanged from the 2026-09-30 spec §3.1–3.2)

```css
:root {
  --sg-ink: #14110C;  --sg-ink-raised: #1B1811;  --sg-panel: #211D15;  --sg-hairline: #3F3B39;
  --sg-cream: #F1EAE0;  --sg-cream-bright: #FAF7F2;  --sg-mute: #96897C;
  --sg-violet: #BA99FD;  --sg-cyan: #A0EAFC;
  --sg-coral: #FDA39B;  --sg-amber: #FDD89B;  --sg-green: #A6F0BF;
  --sg-glow-violet: rgba(186,153,253,.35);  --sg-glow-cyan: rgba(160,234,252,.30);
  --sg-radius: 0px;  --sg-font: "Geist", sans-serif;  --sg-mono: "Geist Mono", monospace;
}
```

Coral only on critical alerts and the pre-fix signal. Green only at resolution and passed policy gates. Film chrome has 0 px radius. Product UI keeps its own radius, colors and IBM Plex Sans.

### 6.2 Film typography

| Role | Font | Size @1080p | Weight | Notes |
|---|---|---|---|---|
| Eyebrow (`ALERT TRIAGE`) | Geist Mono | 22 px | 500 | +12% tracking, upper, `--sg-mute` |
| Headline | Geist | 96 px | 300 + 500 split | −2% tracking, per-line mask reveal, tracking settles +4% → 0 |
| Support line (OST) | Geist | 40 px | 400 | sentence case |
| Callout on UI | Geist Mono | 20 px | 500 | solid `--sg-panel` backing so it can never double-print over UI text |
| Counter | Geist Mono | 120 px | 400 | `font-variant-numeric: tabular-nums` |

Fonts ship as local WOFF2 with `@font-face` in every composition. IBM Plex Sans WOFF2 is added for the product components.

### 6.3 Light UI on the dark stage (decision D2)

- **Panel:** the imported Figma component sits in a panel at default scale 0.80 of frame width, so ≥ 10% stage shows on every side when not punched in.
- **Depth:** perspective 2400 px; resting tilt `rotateX(6deg) rotateY(-10deg)`, easing to `0/0` as the camera punches in, back to tilt on exit.
- **Rim + shadow:** 1 px top-edge rim `rgba(241,234,224,.22)`; drop shadow `0 60px 120px rgba(0,0,0,.55)`; contact glow under the panel in `--sg-glow-violet` at 20%.
- **Exposure match:** a 6% multiply layer of `#F1EAE0` over the panel warms paper white toward cream; measured peak luma of panel pixels ≤ 245 (8-bit) on the master.
- **Bloom never touches UI.** Bloom/glow exists only on ribbons, ElevenLabs video clips and accent pulses.
- **Focus pull:** chrome the VO does not name (left nav, unrelated rows, Evidence panel unless named) sits under `depth-of-field-blur` 6–10 px and 70% opacity while the camera is on the named region.
- **Punch-ins:** `coordinate-target-zoom` to 1.4–2.2× on the named region so M6 holds.
- **No baked artefacts:** the "Triage so far" overlapping-timestamp glitch in frame 04 is fixed in the HTML (one line per entry), not reproduced.

### 6.4 Filled-frame rule

Every panel, tile or card is filled to its edges with real component content or animated data. Motion layouts 07–16 get enriched interiors: e.g. frame 14 chips each carry a live mono sub-line (`deployed · checkout-svc v2.41`, `changed · HPA 4→8`, `broke · p95 461 ms`, `fixed · rollback 14:02`) and connect to a lattice. All enrichment copy is `[ILLUSTRATIVE]`, plausible for the demo env, never presented as a customer result.

---

## 7. Frame table (Cut A + B)

Frame = one storyboard/narration unit in the `product-launch-video` model (one VO line or one silent beat). Shots are camera targets inside a frame. Times are planning estimates (measured earlier River per-line takes ÷ 0.92 to allow for a more measured scene-length read, + 0.35 s tail). The voice starts at frame start; the take's own breath is the lead-in. The locked `timing.json` (§9.2 step 6) replaces every number here: VO frames take their real narration length; silent bridge frames (F01, F04, F08, F12, F17, F20) flex within their min–max to land scene starts on the music. Lines verbatim from `lines.json`.

Bridge flex ranges (seconds): F01 2.0–4.6, F04 1.6–4.2, F08 1.6–4.2, F12 1.4–4.0, F17 1.8–4.4, F20 2.5–4.5. Rule: every range that precedes a snap frame spans at least one bar of the score (2.5 s at 96 BPM), so a downbeat is always reachable; if the chosen score is slower than 96 BPM, widen the ranges to one bar before fitting.

| F | Line | Est. s | Start | VO (verbatim, abridged here) | Figma source | Picture and motion | Blueprint + rules (`hyperframes-animation`) | EL video | Key SFX |
|---|---|---|---|---|---|---|---|---|---|
| F01 | — | 3.0 | 0.00 | (silent) | — | Ink stage; A1 alert-storm footage; ribbons wake; first coral pings spark; counter `0` fades in, starts climbing | `overwhelm-surround` · `particle-burst`, `ambient-glow-bloom`, `vertical-spring-ticker` | A1 | sub swell, distant pings |
| F02 | L01 | 7.1 | 3.00 | "Your on-call team is buried in alerts…" | 07 `66:2` | Notification cards (real alert titles from 01) stack faster than readable; 3D camera dolly back reveals hundreds; counter climbs to 1,284 (tabular); "most of them don't matter" greys 90% of cards; "hours" → coral card throbs | `overwhelm-surround` · `waterfall-entry`, `counting-dynamic-scale`, `3d-camera-flight`, `motion-blur-streak` | — | card ticks, rising tension |
| F03 | L02 | 10.4 | 10.10 | "Meet Aiden for SRE, your AI SRE teammate…" | 08 `66:27` → 09 `66:30` → 03 `54:2` | Cards whip away; title "Aiden for SRE / Your AI SRE teammate." mask-reveals two-weight; tool logos connect to Aiden by drawn ribbons; cut to Discovery panel: service map draws services then dependencies | `logo-assemble-lockup` → `constellation-hub` → `cursor-ui-demo` · `svg-path-draw`, `split-tilt-cards`, `hacker-flip-3d` | — | whoosh, title hit, soft clicks |
| F04 | — | 2.4 | 20.50 | (silent) | — | Eyebrow `ALERT TRIAGE` slams; A2 ribbons converge into a panel silhouette that lands exactly on F05's first frame | `kinetic-type-beats` · `kinetic-beat-slam` | A2 (end frame = F05 frame 0) | impact, whoosh |
| F05 | L03 | 2.5 | 22.90 | "One failure can set off a flood of alerts." | 01 `48:2` | Alerts panel tilts in; rows pour in from top with momentum; the film's corner counter (not the product's summary cards, which keep their real values) re-enters holding the F02 baseline 1,284 | `cursor-ui-demo` · `waterfall-entry`, `vertical-spring-ticker` | — | row ticks |
| F06 | L04 | 9.0 | 25.40 | "Aiden triages every alert as it arrives…" | 01 `48:2` (states built in HTML) | Punch-in on list; noise rows collapse + grey ("filters the noise"); related rows FLIP into groups ("groups related alerts"); list re-sorts by impact ("ranks"); callout chips `Correlated · de-duplicated · ranked by service impact` land on their words | `panel-edit-live-sync` · `card-morph-anchor`, `anchored-layout-expand`, `stat-bars-and-fills`, `cursor-click-ripple` | — | soft UI clicks, sort swish |
| F07 | L05 | 5.6 | 34.40 | "Your engineers see only the alerts that need them…" | 02 `51:2` | Cursor clicks "Act now" tab; list filters to critical; corner counter counts down 1,284 → 7; support line "Only the alerts that need you" | `cursor-ui-demo` · `counting-dynamic-scale`, `theme-crossfade-morph` (tab state only) | — | click, success tick |
| F08 | — | 2.4 | 40.00 | (silent) | — | Eyebrow `ROOT CAUSE ANALYSIS`; A3 particles collapse to one coral point that becomes the critical row's severity dot in F09 | `kinetic-type-beats` | A3 (end frame = F09 frame 0) | impact, low drone |
| F09 | L06 | 4.1 | 42.40 | "When a real incident hits, most of the time goes into investigation." | 22 `99:3`, 23 `99:36`, 01 row, 26 `99:93` | Slack "anyone seeing this?" with no replies (typing dots die); cut to alert list; cursor clicks the middle of the critical Pod Crash Loop row; corner timer starts; status chip "Investigating" | `prompt-type-submit-generate` (Slack) → `cursor-ui-demo` · `typewriter-reveal`, `cursor-click-ripple`, `chart-scrub-readout` (timer) | — | Slack pop, click, clock ticks |
| F10 | L07 | 13.6 | 46.50 | "Aiden starts investigating the moment an alert fires…" **(golden frame)** | 04 `58:2`, 05 `61:2` | Investigation panel opens from the row (FLIP); summary types in; logs/metrics/events chips ride ribbons into the panel ("correlates logs, metrics and events"); hypotheses list builds with confidence bars filling (0.78 high; lows 0.04–0.12); "tries to prove itself wrong" → low rows strike through, callout `ruled out · 4%` | `agent-progress-theater` · `stat-bars-and-fills`, `ai-tracking-box`, `asr-keyword-glow`, `depth-of-field-blur`, `multi-phase-camera` | — | data whooshes, bar fills, strike |
| F11 | L09 | 4.3 | 60.10 | "Your team starts from a probable root cause, and MTTR comes down." | 04 `58:2` | Probable Root Cause card lifts forward and scales; RCA report flashes full-frame (1 s, scrolling); corner timer stops early; "MTTR" chip drops | `zoom-out-workspace-reveal` · `card-morph-anchor`, `3d-page-scroll` | — | lift, timer stop |
| F12 | — | 2.0 | 64.40 | (silent) | — | Eyebrow `REMEDIATION`; A4 coral wave reverses to green front, lands on F13 layout | `kinetic-type-beats` | A4 (end frame = F13 frame 0) | impact |
| F13 | L10 | 3.4 | 66.40 | "Even with the cause in hand, the fix is often manual." | 10 `66:49` | Motion graphic: a manual runbook checklist ticks slowly, terminal lines type, a clock fast-forwards; everything feels heavy | `typewriter-reveal` · `discrete-text-sequence`, `nudge-curve` | — | keyboard clatter |
| F14 | L11 | 13.4 | 69.80 | "Aiden runs the remediation…" | 06 `64:2` → 11 `66:56` | Recommended-action panel; action chips `Restart · scale · reroute traffic · roll back` land on their words; approval gate card: policy check rows pass green one by one, cursor approves; audit trail rows append with timestamps | `cta-morph-press` + `panel-edit-live-sync` · `spring-pop-entrance`, `press-release-spring`, `waterfall-entry` | — | chip pops, approve click, ledger ticks |
| F15 | L12 | 4.3 | 83.20 | "Incidents close faster, and your team stays in control of what runs." | 12 `66:70`, 27 `99:100` | Error sparkline drops from coral to green; status flips Investigating → Resolved; "You decide what runs" | `dataviz-countup` · `chart-scrub-readout`, `theme-crossfade-morph` | — | resolve chime |
| F16 | L13 | 7.7 | 87.50 | "And it keeps learning…" | 13 `66:73` | Investigation cards file into a growing knowledge lattice; each new incident starts further along a track | `grid-card-assemble` · `depth-scatter-assemble`, `svg-path-draw` | — | soft data ticks |
| F17 | — | 2.6 | 95.20 | (silent) | — | A5 world-model atmosphere: layers of light records; eyebrow `AIDEN WORLD MODEL` | `camera-journey` | A5 | swell |
| F18 | L15 | 12.0 | 97.80 | "Aiden for SRE runs on the Aiden World Model…" | 14 `66:76`, 21 `76:2`, 15 `66:87` | "The shared record." chips `deployed · changed · broke · fixed` light on their words and link into the stackgen.com world-model diagram; "Aiden OS" layer slides under: `policy · approvals · audit` gates | `constellation-hub` → `spatial-pan-stations` · `svg-path-draw`, `orbit-3d-entry` | A5 continues under | gate clicks |
| F19 | L16 | 5.6 | 109.80 | "See Aiden for SRE on your own alerts. Book a demo…" | 16 `66:92`, `80:2` | StackGen wordmark lockup; two CTAs (cream primary "Book a demo", hairline secondary "Try Community Edition" with corner ticks); micro-line "free for up to two users"; ribbons settle at 40% behind wordmark | `logo-assemble-lockup` + `cta-morph-press` | A6 | logo sting |
| F20 | — | 3.0 | 115.40 | (silent tail) | — | Lockup holds while ribbons and A6 keep drifting; fade to ink on music button | `titlecard-reveal` (outro) | A6 | music end |

Estimated total ≈ 118 s (1:58). Full-cut-only frames (L08 downstream effect, L14 error budgets) are specified in §16 for a later full cut.

### 7.1 Transitions

Inside a scene: hard cut on matched motion, or a `motion-blur-streak` whip. Into each scene: the silent bridge frame (F04, F08, F12, F17) whose ElevenLabs video clip ends on the next frame's first frame; that next frame (the narration entry) starts on a music downbeat (§9.2). Named transitions come from `hyperframes-registry` / `@hyperframes/shader-transitions` before any hand-built one.

---

## 8. ElevenLabs video manifest (`data/el-video.json`)

All generated footage runs inside ElevenLabs flows through the ElevenLabs MCP. One flow per clip (`creative_create_flow`), so the still, the uploaded end frame and the video node can be wired.

Pipeline per clip:
1. **Style still:** `image-generation` node, model `gemini-3-pro-image` (Nano Banana Pro), 16:9, 2K, `reference_images` = one Figma style still (`source/figma/<node>.png`, uploaded with `creative_create_asset_upload`).
2. **End frame (bridges only):** HyperFrames snapshot of the next frame at t = 0 (`npx hyperframes snapshot --at <start>`), uploaded the same way.
3. **Video:** `video-generation` node, model `bytedance-seedance-v2.5` (fallbacks `kling-3-pro`, then `veo-3.1-generate-001`), `resolution` 1080p, `aspect_ratio` 16:9, `generate_audio` false, `duration_secs` = clip length below; ports `start_frame` = style still, `end_frame` = uploaded HyperFrames frame (bridges). Read `creative_get_model_guide` for the model before writing its prompt.
4. **Upscale/interpolate** only if the delivered clip is below 1080p or the 60 fps master shows judder: `topaz-video-upscale` node (read its schema first with `creative_get_model_schema`).
5. **Freeze:** download to `assets/el-video/Ax.mp4`, write `Ax.json` provenance, adopt via `media-use`.

Clip length is set to the bridge's **maximum** flex (rounded up) and trimmed from the **head** in HyperFrames, so the matched end frame always survives.

| ID | Frame | Length | Start | End | Prompt core (all add the global suffix) |
|---|---|---|---|---|---|
| A1 | F01 | 5 s | still S1 | — | "Slow push through a dark warm-black void. Hundreds of tiny notification glints stream past the camera like rain, most dim grey, a few coral, faint violet and cyan light trails. Shallow depth of field." |
| A2 | F04 | 4 s | still S2 | F05 frame 0 | "Neon violet and cyan light ribbons bundle and converge toward the centre, braiding into a single rectangular glow that settles where a floating panel will appear." |
| A3 | F08 | 4 s | still S3 | F09 frame 0 | "Swirling particles collapse inward and condense into one bright coral point, camera slowly pushing in, background warm black." |
| A4 | F12 | 3 s → 4 s (model minimum) | still S4 | F13 frame 0 | "A coral wave of light sweeps across a dark field and reverses into a calm green front, ribbons smoothing out." |
| A5 | F17–F18 | 16 s | still S5 | — | "Layered translucent planes of light records stacked in depth, lines connecting nodes between layers, camera slowly orbiting, warm black with violet and cyan accents." |
| A6 | F19–F20 | 11 s | still S6 | — | "Calm violet and cyan light ribbons drifting slowly in a warm-black space, settling into gentle parallel flow." |

Global suffix: "Cinematic, 16:9, photographic light, subtle film grain, no text, no letters, no logos, no user interface, no people. Colour palette warm black #14110C, violet #BA99FD, cyan #A0EAFC, accent coral #FDA39B."

Rejection rule: a clip with legible glyphs, logo-like marks, or UI rectangles with fake text is rejected; pick another of its variations, else regenerate (max 2 rounds), else fall back to the HyperFrames ribbon field for that bridge. Bridges finish with a 0.3 s crossfade into the HTML first frame to hide residual mismatch.

---

## 9. Audio (ElevenLabs MCP → HyperFrames)

### 9.1 Narration that sounds like a person (D8)

Research basis (2026-10-01, Firecrawl): ElevenLabs best-practice docs (v4/v3 prompting, voice settings), ElevenLabs model guide via MCP, professional VO mixing references. Findings that drive the protocol: voice choice matters as much as text; Eleven v4 supports Voice Library and Professional Voice Clones with audio tags and IPA (v3 does not optimise PVCs); longer passages give the model room and more consistent prosody (≥ 250 characters); delivery is shaped with punctuation, ellipses, sparing capitals and `[pause]` tags, not SSML breaks (unsupported on v3/v4); several takes per passage and choosing by ear is normal practice. The MCP exposes no stability/speed sliders, so delivery comes only from voice, model, markup and take selection.

**Words are locked.** Spoken markup may add only: audio tags, punctuation (commas, ellipses, em dashes), sparing capitals for stress, and phonetic respelling of acronyms the voice misreads (`M-T-T-R`, `S-R-E`; IPA `/ˈeɪdən/` for "Aiden" only if misread). Captions and on-screen text always use `lines.json`, never the markup. A test strips markup and diffs against `lines.json`.

**Scene takes, not lines.** Five takes, each a continuous passage, so sentence-to-sentence melody is real:

| Take | Lines | Frames | Spoken markup (`data/takes.json`) |
|---|---|---|---|
| T1 | L01, L02 | F02, F03 | `[calm, matter-of-fact] Your on-call team is buried in alerts… and most of them don't matter. The ones that do can take HOURS to untangle. [pause] [warmly] Meet Aiden for SRE, your AI SRE teammate. It connects to the observability tools you already run, and maps your services on its own.` |
| T2 | L03, L04, L05 | F05–F07 | `[measured] One failure can set off a flood of alerts. [pause] Aiden triages every alert as it arrives. It groups related alerts, filters the noise, and ranks the rest by impact on your services. [short pause] [warmly] Your engineers see only the alerts that need them… and save their energy for real incidents.` |
| T3 | L06, L07, L09 | F09–F11 | `[serious] When a real incident hits, most of the time goes into investigation. [pause] [confident] Aiden starts investigating the moment an alert fires. It correlates logs, metrics, and events across your dependencies. Then it scores every possible cause against the evidence — and even tries to prove itself wrong. [pause] Your team starts from a probable root cause, and M-T-T-R comes down.` |
| T4 | L10, L11, L12 | F13–F15 | `[matter-of-fact] Even with the cause in hand, the fix is often manual. [pause] [confident] Aiden runs the remediation, from restarting a service or scaling out, to rerouting traffic or rolling back a deployment. Your team sets which actions need approval, and every action goes into a full audit trail. [short pause] [warmly] Incidents close faster… and your team stays in control of what runs.` |
| T5 | L13, L15, L16 | F16, F18, F19 | `[thoughtful] And it keeps learning. Every investigation adds to what Aiden knows about your environment, so the next incident starts further ahead. [long pause] [confident] Aiden for SRE runs on the Aiden World Model — the shared record of what's deployed, what changed, what broke, and what fixed it. And Aiden OS holds every action to your policies. [pause] [warmly] See Aiden for SRE on your own alerts. Book a demo, or try the free Community Edition.` |

Tag rules: describe how it is spoken, at most one tag change per sentence group, never `[excited]` or promo tags (the salesy register is the strongest "AI ad" tell). Target register: a calm senior engineer explaining to peers, unhurried, confident, the GitLab Duo Workflow narrator's register.

**Casting (Gate G1a).** `creative_list_voices` with filters for English, narration/documentary/conversational, mid-low pitch, neutral US accent; shortlist River (`SAz9YHcvj6GT2YYXdXww`, the earlier pick) plus the two strongest Voice Library narrators, preferring Professional Voice Clones of real narrators. Each voice reads T3 (the most technical take) on `eleven_v4`, 4 variations. The user picks the voice by ear. Fallback model `eleven_v3` only if v4 fails the rubric for every voice.

**Takes (Gate G1b).** Chosen voice reads T1–T5, 4 variations each. Pick one variation per take by the rubric:

| # | Rubric (fail any → reject the variation) |
|---|---|
| R1 | Every word as written; "Aiden", "SRE", "MTTR", "Kubernetes"-class terms pronounced right |
| R2 | Pitch contour varies sentence to sentence; no repeated announcer melody, no up-talk at clause ends |
| R3 | Stress on content words (alerts, hours, investigation, wrong, approval, learning, control) |
| R4 | Soft natural breaths present; no gasps, clicks, metallic sibilance or warble |
| R5 | Pace 150–175 wpm, slower on claims; no rushing at line ends |
| R6 | Tags performed subtly, never overacted; no tag words spoken aloud |
| R7 | Timbre and loudness consistent with the other chosen takes |

If one line inside an otherwise good take fails, regenerate the **whole take**, never splice a single line from another generation (mismatched prosody is audible). Final listen: the chosen takes back to back against a 30 s excerpt of the GitLab reference narration; the user must not flag ours as obviously synthetic (A13).

**Gold path (optional, U6).** If a human scratch read exists (the user or a colleague reading `lines.json` into a phone, quiet room), run it through the ElevenLabs `voice-changer` node (`eleven_multilingual_sts_v2`) into the chosen voice. Speech-to-speech keeps human timing, emphasis and breath, which is the most human result available; the rubric still applies.

**Into HyperFrames.**
1. Download chosen takes → `assets/audio/vo/takes/Tn.mp3` → 48 kHz 24-bit wav.
2. `npx hyperframes transcribe assets/audio/vo/takes/Tn.wav` → word timings for that exact file.
3. `scripts/split_takes.py` cuts each take into `Lxx.wav` at the midpoint of the silence between the last word of one line and the first word of the next (15 ms fades), so frames played back to back reproduce the take exactly, breaths included. First line keeps ≤ 120 ms before its first word; last line keeps 350 ms after its last word. `Lxx.words.json` is rebased to the segment.
4. Test: every `Lxx.words.json` last end ≤ its wav duration + 10 ms; transcript words (case/punctuation-folded) match `lines.json` at ≥ 95% (`difflib` ratio) per take, and every mismatched word is checked by ear and logged in `NOTES.md` (speech recognition errs; the ear decides).
5. VO frame duration = its `Lxx.wav` duration. No time-stretching, ever.

**Polish chain** (HyperFrames `hyperframes-audio` effect chain on the VO track, so voice and music share one room): high-pass 80 Hz; compressor 2:1, gentle, ~3 dB gain reduction on peaks; de-ess (peaking −3 dB around 6–7 kHz) only if sibilance is audible; short room reverb at 4–6% wet (0.3–0.4 s) so the voice is not "too clean"; continuous room-tone bed (ElevenLabs SFX "quiet treated studio room tone", looped) at about −62 dBFS under the whole narration track so gaps are never digital silence.

### 9.2 Music in sync with the narration (D9)

Professional order: narration lock → spotting → score → fit picture to score → mix. Music is generated **after** narration lock and **before** any frame is built, so frames are built once against final timing.

1. **Narration timing.** `build_timing.py` writes `timing.voice.json`: VO frames fixed, bridge frames at their estimate.
2. **Spotting sheet.** `data/spotting.json` lists hit points from `timing.voice.json`: scene starts (F04, F08, F12, F17 first frames), title hit ("Meet" in F03), counter landing on 7 (F07), "wrong" strike (F10), Resolved (F15), wordmark (F19), final button (F20 end).
3. **Score.** `music` node, `eleven_music_v2_5`, `instrumental` true, `duration_seconds` = total + 6. Prompt describes sound and energy over time (model guide rule), written from the spotting sheet, for example: "Modern cinematic tech underscore at 96 BPM in D minor: warm analog synth pulse, soft felt-piano motif, deep sub bass, restrained brushed percussion. Arrangement leaves space for a spoken voice: no lead melody in the vocal range, no busy hi-hats. 0:00–0:03 low rising swell; 0:03–0:20 tense sparse pulse with a lift at 0:10; 0:20–0:40 steady driving pulse; 0:40–1:05 building, filtered, tension; 1:05–1:27 release into warmer chords; 1:27–1:50 broad and confident; ends on a clean final button at 1:56." 4 variations.
4. **Pick (Gate G1c)** by rubric: sits under a voice (no competing lead), energy follows the spotting sheet, steady tempo, clean button ending, no AI artefacts (warble, smeared transients, phasey cymbals). If none pass after two rounds, fallback: render the animatic (Gate sketch pass) silently, upload it, and score it with `video-to-music` (`eleven_video_to_music_v1`) steered by the same prompt.
5. **Beat map.** HyperFrames `music-to-video/scripts/analyze-beatgrid.py` on `bed.wav` → `audiomap.json` (beats, downbeats, phrases, energy). It is the only beat analyzer; no re-measuring by ear.
6. **Fit picture to music.** The music start offset (0–2 s trimmed from the track head, chosen by ear at G1c so the strongest opening plays under F01) is fixed first. `scripts/fit_bridges.py` then sets each bridge frame's duration inside its flex range so the narration entry after it (F02, F05, F09, F13, F18 — the `snap` frames) starts on a downbeat (phrase start preferred), ±40 ms. Bridge starts are fixed by the narration before them; only bridge ends move. VO frames never move. Spotting-sheet markers in the music prompt come from `timing.voice.json`, so broad energy sections may sit up to ~2 s from final positions; hit points are what get snapped. Output `timing.json` = **LOCK**. STORYBOARD durations and `audio_meta.json` are written from it.
7. **Ending.** F20 flexes so the film ends 0.5 s after the music's final hit (natural ring-out). If the track's button falls outside F20's range, one edit at a downbeat with a two-beat crossfade into the track's last phrase, done in HyperFrames; never a fade-out on a held chord.

### 9.3 SFX (ElevenLabs MCP)

`sfx` node, `eleven_text_to_sound_v2`, `prompt_influence` 0.6, `loop` only for room tone and the clock tick. `data/sfx.json` lists ~19 effects: UI click, soft tick, row tick, whoosh short/long, impact low, kinetic slam, coral alert ping, Slack pop, clock tick loop, bar-fill riser, strike, approve chime, resolve chime, data whoosh, sub swell, logo sting, keyboard clatter, studio room tone. Hit-point SFX are tuned to the key of the chosen score where pitched (chimes, sting) by naming the key in the prompt. Cues are placed in frame HTML on timeline labels at the hit-point times in `timing.json`.

### 9.4 Mix (inside the HyperFrames composition, `hyperframes-audio`)

- **Voiceover carve, not a flat duck:** `hyperframes-audio` `scripts/carve.mjs`, dynamic mode, VO as source, music as target: spectral dips in the 1–4 kHz speech band while VO speaks plus a modest broadband duck of 4–6 dB, release 600–900 ms so music breathes back between sentences without pumping.
- **Automation:** music +4 to +6 dB through the bridge frames, so each scene change is carried by the score; music fades in under F01 from silence over 1.5 s.
- **Levels:** VO −16 LUFS integrated ±1; music under VO about 12–16 LU below VO (short-term); music in bridges −20 to −18 LUFS short-term; SFX −24 to −18 LUFS short-term, never over a VO word; master −14 LUFS ±1, true peak ≤ −1.0 dBTP (limiter on the master bus).
- **Check** on headphones and laptop speakers before G3.

---

## 10. Project

### 10.1 Layout (`videos/aiden-sre-launch/`)

```
BRIEF.md  STORYBOARD.md  SCRIPT.md  NOTES.md  hyperframes.json  package.json  index.html  audio_meta.json  audiomap.json
data/        frames.json  takes.json  spotting.json  el-video.json  sfx.json  timing.voice.json  timing.json  qa.json
source/      storyboard.html  storyboard.json  lines.json  figma/*.png  live/*.json
compositions/components/<figma-component>/   (from hyperframes figma component)
compositions/frames/NN-<slug>.html           (one per frame, one owner each)
shared/      layers/ (ported)  tokens/brand.css  tokens/motion.js  fonts/  logos/
assets/      audio/vo/takes/  audio/vo/  audio/music/  audio/sfx/  el-video/  el-stills/
.media/      (figma + media-use frozen assets, manifest.jsonl)
scripts/     el_fetch.py  split_takes.py  build_timing.py  fit_bridges.py  check_markup.py  qa_motion.py  qa_loudness.py  finish.sh
tests/       test_*.py
renders/     film.mov  aiden-sre-launch.mp4  aiden-sre-launch-prores.mov
```

### 10.2 Ported from `videos/aiden-sre-film/` (copy, then own)

`shared/layers/{ribbons.js, ribbon-math.js, prng.js, camera.js, cursor.js}` (audit: "ribbons read as a field" — keep), `shared/tokens/{brand.css, motion.js}`, `shared/assets/fonts/*`, `shared/assets/logos/*`. Not ported: `plate.js`, `ui.js`, `ui.css`, `lattice.js`, all shots, the 3-pass composite, the old River per-line takes and `vo_words.py`.

### 10.3 Render and finish

HyperFrames 0.8.103 on Node 22 (`/opt/homebrew/opt/node@22/bin`). Render whole film: `--format mov --fps 60 --quality high` → `renders/film.mov`. Finish (`scripts/finish.sh`): `noise=c0s=5:c0f=t+u`, `vignette=PI/5`, no bloom → ProRes 422 HQ mezzanine + H.264 High CRF 16 at 60 fps, plus a 30 fps downconvert with 2-frame `tmix` for platforms that need 30. Audio passes through untouched (the mix is final in HyperFrames).

---

## 11. Skills matrix (skill-picker MCP, evaluated 2026-10-01)

Routers first, then exactly one member, per `skill-catalog-routing`. "Why" records the evaluation; "Rejected" records near-misses so executors do not drift.

| Task class | Read (in order) | Why this one | Rejected and why |
|---|---|---|---|
| Orchestration (whole film) | `hyperframes-skills` → `product-film` (gates) + `product-launch-video` (machinery) | `product-film` has the right gate order for a long storyboard film. `product-launch-video` has the parallel machinery: frame packets, per-frame workers, `assemble-index.mjs`, captions, transitions. `product-film` Gate 7 routes to `general-video`; this spec overrides that because `product-launch-video` has the frame-worker parallelism this film needs and the user asked for a launch film | `homepage-film` (hero + silent loops); `general-video` (no frame-packet parallelism); `brief-to-launch-video` (Clueso-only, 30–60 s) |
| Figma → HTML | `hyperframes-skills` → `figma` | Only skill that imports frames as editable HTML with token binding, provenance and a fidelity self-check | `figma-skills` → `figma-generate-design` (writes into Figma); `image-to-code` (re-draws, loses authenticity) |
| Live product interaction truth | `chrome-devtools-skills` → `chrome-devtools` | Logged-in tab is open; read-only DOM/timing extraction | `browser-automation` (no session) |
| Composition rules | `hyperframes-core`, `hyperframes-cli` | Timeline contract, `check`, `snapshot`, `transcribe`, render flags | — |
| Motion per frame | `hyperframes-animation` (blueprints + rules named in §7), `hyperframes-keyframes` | Blueprints map 1:1 to §7 beats; rules are seek-safe recipes | `cinematic-gsap-lenis-motion-system`, `gsap-scrolltrigger-storytelling` (scroll-driven web) |
| Named looks / transitions | `hyperframes-registry` | Search catalog before hand-building | — |
| Design + narration direction | `hyperframes-creative` (`references/narration.md`, `story-spine.md`) | Narration pacing and register reference for the spoken markup | `design-taste-frontend` (web UI) |
| Media adoption, treatments, transcription | `media-use` (+ `references/media-treatments.md`, `audio/references/tts.md`) | Mandatory for `.media` provenance and footage treatment; owns `transcribe` | Hand-rolled CSS filters |
| ElevenLabs execution (all generations) | `elevenlabs-skills` → `creative-studio` | The skill for the ElevenLabs MCP: flows, variations, pinning a pick, uploads | Direct REST (no key; user chose MCP) |
| Narration markup and casting | `elevenlabs-skills` → `text-to-speech` (reference only: v4/v3 prompting, voice choice) + MCP `creative_get_model_guide` for `eleven_v4` | Model-specific tag and punctuation rules | `script-to-voiceover` (Clueso carrier project) |
| Score prompt | `elevenlabs-skills` → `music` (reference only: prompt structure, energy-over-time) + MCP model guide for `eleven_music_v2_5` | Sound-not-story prompting; energy evolution | `user-artlist` (not ElevenLabs) |
| SFX prompt | `elevenlabs-skills` → `sound-effects` (reference only) | Duration, loop, prompt influence | HeyGen catalog SFX |
| Beat grid | `music-to-video` → `scripts/analyze-beatgrid.py` only (do not run that workflow) | HyperFrames' single trusted beat analyzer, output feeds `fit_bridges.py` | Ad-hoc librosa |
| Mix | `hyperframes-audio` (`scripts/carve.mjs`, effect chain, automation) | Audio lives in `index.html`; dynamic spectral carve is what the research recommends over broadband ducking | old `mix.py` (outside the composition) |
| Generated video prompts | `hyperframes-creative` (look language) + `veo` (`~/.agents/skills/veo`, prompt grammar) + MCP `creative_get_model_guide` per model | **Picker gap:** no ElevenLabs-video skill; `veo` has the closest cinematic grammar | `seo-image-gen` (marketing stills) |
| Logos | `company-logos` | Official marks for F03 connections | Generated logos |
| Motion QA | `emil-skills` → `review-animations` | Easing, choreography, overlap on rendered motion | — |
| Composition QA | `critique-composition`, `critique-visual-hierarchy` | Same lenses as the prior audit | — |
| Film audit | `hyperframes-skills` → `video-production-audit` | `hyperframes check`, Code2Video axes, one defect ledger | Ad-hoc review |
| Process | superpowers `subagent-driven-development`, `dispatching-parallel-agents`, `test-driven-development` (scripts), `verification-before-completion` | Parallel waves with two-stage review; fresh evidence before "done" | — |

Not applicable: **Reticle** (no instrumented web app; output is video). **Ouroboros** (scope settled here). **Clueso** (deferred, §16). **Apiframe** (removed by D4).

---

## 12. Execution model

- Orchestrator: this session (Opus) holds the plan, runs every ElevenLabs MCP call (subagents may not have MCP access; spend stays in one place), dispatches build work, reviews, commits. Workers never commit; the orchestrator commits each accepted task by path.
- Build workers: `composer-2.5-fast`. Per-task review: spec compliance + quality by `claude-sonnet-5-5-high`. Golden frame review and final audit: `claude-opus-5-5-high`.
- Max 8 concurrent workers. Each frame worker owns exactly one `compositions/frames/NN-*.html` and `assets/frames/NN/`; shared files (`shared/`, `data/`, `index.html`, `STORYBOARD.md`) belong to the orchestrator.
- User gates: G1a voice casting; G1b narration takes; G1c score; G1d style stills; G2 golden frame look lock (F10); G3 full preview with final mix; G4 ship.

---

## 13. Acceptance criteria

| # | Check | Pass |
|---|---|---|
| A1 | Runtime | 110–126 s, equal to `timing.json` total ±0.1 s (ffprobe) |
| A2 | `npx hyperframes check` | 0 errors on every frame and on `index.html`; warnings reviewed in `NOTES.md` |
| A3 | No static frames | M1 zero freezes; M2 every 1 s window ≥ `MOTION_FLOOR` (`qa_motion.py` exit 0) |
| A4 | Narration integrity | 14 lines; markup-stripped takes equal `lines.json` exactly (`check_markup.py`); transcript ≥ 95% word match per take with every mismatch cleared by ear; every `Lxx.words.json` last end ≤ duration + 0.01 s |
| A5 | Type sync | Every OST cue within ±120 ms of its word |
| A6 | UI authenticity | Every product surface is a `compositions/components/*` import from §2.1 nodes; no image-model UI; no generated clip frame with glyphs |
| A7 | Legibility | Named UI text ≥ 20 px effective; cream on ink ≥ 7:1; OST inside 90% title-safe |
| A8 | Light-UI treatment | Panel peak luma ≤ 245; stage visible around every non-punched panel; no bloom on UI |
| A9 | Loudness | VO −16 ±1 LUFS; master −14 ±1 LUFS; TP ≤ −1.0 dBTP (`qa_loudness.py`) |
| A10 | Audit | `video-production-audit` verdict "ship" with no P0/P1 open |
| A11 | Claims | `[VERIFY]` items signed off or reworded before ship |
| A12 | Reference parity | T2, T3, T5–T11 each present at least once (checklist in `NOTES.md`) |
| A13 | Human narration | Every chosen take passes R1–R7; user blind-compares against the GitLab reference excerpt and does not flag ours as synthetic |
| A14 | Music sync | Every snap frame (F02, F05, F09, F13, F18) starts within ±40 ms of a downbeat in `audiomap.json` (after offset); film ends 0.4–0.6 s after the final musical hit |
| A15 | Music edit | No audible edit; at most one music edit, on a downbeat, two-beat crossfade |

---

## 14. Inputs needed from the user

| # | Input | Needed by | Default if not given |
|---|---|---|---|
| U1 | ElevenLabs credit budget for this film | before G1a | Orchestrator runs `estimate_only` on each batch and asks before any batch over 2,000 credits |
| U2 | Integration logos allowed in F03 | Wave 3 F03 | Datadog only; cloud wordmarks withheld |
| U3 | Evidence panel badges read "Unverified host" in frame 04 — show, blur, or edit? | G2 golden frame | Blur under depth-of-field; never readable |
| U4 | Voice pick (G1a), take picks (G1b), score pick (G1c) | Wave 1 | None — these are listening gates |
| U5 | `[VERIFY]` sign-offs (Navin: null-hypothesis testing, demoable actions, write-back; integration logos) | before G4 | Lines stay verbatim; flagged in `NOTES.md` |
| U6 | Optional human scratch read of the 14 lines (phone, quiet room) for the speech-to-speech gold path | G1b | Text-to-speech path only |
| U7 | Permission for an "ear pass" on the locked words (contractions, splitting L07/L11 into shorter sentences) | G1b | Words stay locked; delivery shaped by markup only |

---

## 15. Risks

| Risk | Mitigation |
|---|---|
| Figma component import drifts from Figma pixels | Mandatory fidelity self-check per component; report drift, never silently hand-tweak |
| v4 speaks a tag aloud or overacts | R6 rejects it; simplify tags for that take; fallback `eleven_v3` |
| Every variation of a take fails the rubric | Regenerate the whole take with adjusted markup; after two rounds, U6 gold path or recast |
| MCP returns no downloadable URL for a generation | Task 1 smoke test proves the download path first; fallback `creative_get_available_assets` lookup, else user exports from the canvas link |
| Music variations do not follow the energy curve | Second round with tighter time markers; then `video-to-music` on the animatic |
| A bridge cannot reach a downbeat inside its flex range | `fit_bridges.py` takes the nearest beat and logs it; if > 80 ms off a downbeat, widen that bridge's range by ≤ 0.5 s with user OK |
| Generated clips show pseudo-text or miss the end frame | Rejection rule, variations, 0.3 s crossfade, ribbon fallback |
| Credits run out mid-build (happened in the earlier Seedance cut) | `estimate_only` per batch, U1 cap, narration and score first (they gate everything else) |
| Runtime lands under 1:50 | Report; options are longer bridges within flex or a slower-register re-take — never time-stretch |
| Parallel workers drift visually | Golden frame F10 locks look first; workers read frozen tokens + golden HTML; review gate per frame |
| Node version | All HyperFrames commands run with `PATH=/opt/homebrew/opt/node@22/bin:$PATH` |

---

## 16. Out of scope

Full cut (L08 downstream effect using Figma 24/25; L14 error budgets) — later file-level additions; their lines would join takes T3 and T5 and require re-taking those passages. Captions burn-in, aspect variants and social cutdown (Clueso) — after G4 only if asked; an SRT/VTT sidecar is produced from `transcript.json`. 4K master. Localisation (ElevenLabs dubbing would be the route). Reuse of any old shot or old VO take.
