# Aiden SRE V3 Front-Door Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (or implement task-by-task in-session). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `videos/aiden-sre-v3-frontdoor/` into a professional ~70s Approach A use-case video (CI enrich hero + silent breadth flashes) with human-sounding VO and ducked BGM.

**Architecture:** Keep HyperFrames hybrid (Jira lookalike + stage chat MP4). Retimed spine per design spec. Script rewritten for speech. Audio via media-use (BGM + TTS) mixed in composition. Render new `sre-v3-clean.mp4` with audio.

**Tech Stack:** HyperFrames 0.8.x / GSAP · media-use resolve/TTS · hyperframes-audio · content-humanizer / expert-pmm-writer · ffmpeg proofs

## Global Constraints

- Approach A only — CI enrich hero; pod/cert/access = silent flashes + one outcome line
- Never name Visa / Mitratech in spoken or on-screen copy
- No ~1.08× whole-card punches — inner `#world` focus-zoom only
- No Clueso `export_project` unless user asks
- Destination aspect 1920×1080 · target ~65–75s
- Spec: `docs/superpowers/specs/2026-09-23-aiden-sre-v3-frontdoor-polish-design.md`

## File map

| Path | Role |
|------|------|
| `videos/aiden-sre-v3-frontdoor/SCRIPT.md` | Locked spoken lines + delivery notes |
| `videos/aiden-sre-v3-frontdoor/BRIEF.md` | Intent / assets / Approach A |
| `videos/aiden-sre-v3-frontdoor/index.html` | Composition + timeline + audio tags |
| `videos/aiden-sre-v3-frontdoor/assets/` | stage chat, jira mark, BGM, VO wav |
| `videos/aiden-sre-v3-frontdoor/renders/sre-v3-clean.mp4` | Deliverable |
| `videos/aiden-sre-v3-frontdoor/snapshots/` | Proof frames |

---

### Task 1: Rewrite SCRIPT for Approach A + human speech

**Files:** `videos/aiden-sre-v3-frontdoor/SCRIPT.md`, `BRIEF.md`

- [ ] Draft new paste block (~130–150 words max) per spine; kill L6 laundry list
- [ ] Use contractions, uneven sentences, SE-call tone; phonetic `forty` if needed
- [ ] Run `check_ai_signs.py` → exit 0; optional humanizer_scorer
- [ ] Update BRIEF.md Approach A notes + audio intent
- [ ] Update SCRIPT status to v3.0

**Done when:** Paste block locked in SCRIPT.md; AI-sign clean; BRIEF matches spine.

---

### Task 2: Resolve BGM (+ optional SFX)

**Files:** `videos/aiden-sre-v3-frontdoor/assets/` via media-use

- [ ] `npx hyperframes auth status` (note signed-in vs offline)
- [ ] `node <media-use>/scripts/resolve.mjs --type bgm --intent "calm professional tech product demo soft bed under voiceover" --project videos/aiden-sre-v3-frontdoor`
- [ ] Optional: resolve transition `sfx` for hard cuts
- [ ] Record resolved paths in BRIEF or audio_meta

**Done when:** Local BGM file under project assets; intent logged.

---

### Task 3: Generate human-paced VO

**Files:** `assets/vo-*.wav` (or mp3)

- [ ] Prefer media-use / HeyGen or ElevenLabs path with natural settings; avoid flat Clueso Jeff default unless best available
- [ ] Generate full script as one take (or per-beat takes if sync needs it)
- [ ] Listen / check duration ~65–75s; regenerate if robotic
- [ ] Transcribe for caption timing if burning captions

**Done when:** VO asset on disk sounds SE-like; duration fits spine.

---

### Task 4: Rebuild HyperFrames composition

**Files:** `index.html`, CSS as needed

- [ ] Retimeline to Hook / Problem / Reveal / Demo / Breadth / Close
- [ ] Deepen zooms on empty link, failing stage, evidence
- [ ] Caption/title skin stronger; kinetic but not brochure
- [ ] Breadth montage: 3 labeled flashes, no VO laundry
- [ ] Wire BGM + VO with ducking (hyperframes-audio patterns)
- [ ] `npx hyperframes check` pass

**Done when:** check passes; timeline matches SCRIPT beat windows.

---

### Task 5: Render + proof

**Files:** `renders/sre-v3-clean.mp4`, `snapshots/v3-*.png`

- [ ] Render clean MP4 with audio
- [ ] Snapshot key beats (hook, empty link, reveal, stage zoom, breadth, close)
- [ ] ffprobe: has audio stream; duration ~65–75s
- [ ] Update openmemory.md + SCRIPT status

**Done when:** Deliverable playable with BGM+VO; proofs on disk; no Clueso export.

---

## Spec self-review (design)

- No placeholders left in design doc
- Approach A consistent across story/script/picture
- Non-goals clear (no export, no customer names)
- Audio + human VO called out as first-class
