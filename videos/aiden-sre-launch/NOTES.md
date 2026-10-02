# Aiden for SRE launch film v2 — project notes

## HyperFrames auth status (Task 1 Step 5)

```
Not signed in to HeyGen — voice & music will use local engines (free, offline).

Sign in or sign up (browser OAuth, writes ~/.heygen — no per-repo .env):
  npx hyperframes auth login            # browser sign-in / sign-up

Or paste an existing HeyGen API key (get one at app.heygen.com/settings/api):
  npx hyperframes auth login --api-key  # paste at the prompt

Prefer offline? Workflows will use these local engines:
  voice → Kokoro  ⚠ deps missing
          pip install kokoro-onnx soundfile
  music → MusicGen  ⚠ deps missing
          pip install transformers torch soundfile numpy
  (or run `hyperframes doctor` to check the local toolchain)
```

(`npx --yes hyperframes@0.8.103 auth status` exited 1 — expected when signed out; ElevenLabs MCP is used for this film, not HeyGen audio.)

## ElevenLabs MCP I/O

Proved 2026-10-01. Flow `UVmPuCJamKvWodlIVukK` (`aiden-sre-launch-smoke`).

Download path: `creative_get_flow_run_status` → `media[].url` (same value as `media[].master_url`). Signed GCS URL. `X-Goog-Expires=7200` (2 hours). Download immediately; do not store the URL.

Smoke: `sfx` / `eleven_text_to_sound_v2`, prompt "single soft UI click", `duration_seconds` 0.5, `generations_count` 1. Estimate was ~61 credits; charged ~1.7. File `assets/audio/sfx/_smoke.mp3` — ffprobe 0.48s, mp3, 44100 Hz stereo.

`duration_seconds` is not a `creative_generate_in_flow` argument. Create the node (`estimate_only` creates it without charging), then `creative_update_node` `model_parameters.duration_seconds`, then `creative_run_flow_nodes`.

Upload sequence that worked:

1. `creative_create_asset_upload` (`name`, `mime_type`, exact `file_size`)
2. HTTP PUT the bytes to `upload_url` with `Content-Type` equal to `mime_type`
3. `creative_finalize_asset_upload` (`asset_id`, optional `flow_id`) → returns `node_id` for `connect_from`

Smoke upload: 69-byte PNG, asset `Sx97FRqcuOm6z5jiZUG0`, reference node `lCLjIbssE9a24bOea3Ct`.

## Figma fidelity

**Tokens (Task 6):** `hyperframes figma tokens zpQTgAfsrkN6PI3eTHOb5p` on a non-Enterprise plan → variables Enterprise-gated; file has no published library styles to fall back to. Expected degradation per figma skill; `figma-tokens.json` written (styles shell only). Colors resolve as literals in imported components.

**Imports:** Nodes `48:2`, `51:2`, `54:2`, `58:2`, `61:2`, `64:2` → `01-alert-triage` … `06-recommended-action`. Ground-truth PNGs at `source/figma/{node-with-dashes}.png` (@2× from Figma REST).

**`data-figma-unresolved`:** None in any of the six component HTML files (0 flags).

**Render vs PNG self-check:** Each component wrapped at native 1920×886 and rendered with `hyperframes render` (draft, 1 frame). Headless capture reported 1080×1920 frames, so automated luma diff against 3840×1772 refs is not meaningful at this step; re-verify when mounted on the film stage at product scale. No `text-box-trim` emitted on imports; watch 14–16px IBM Plex lines for ≤~6px vertical text-box drift per figma skill during frame QA.

| Node | Component dir | Notes |
|------|---------------|--------|
| 48:2 | `01-alert-triage` | 191 rasterized nodes |
| 51:2 | `02-act-now` | 118 rasterized nodes |
| 54:2 | `03-discovery` | 104 rasterized nodes |
| 58:2 | `04-root-cause` | 57 rasterized nodes; see edit below |
| 61:2 | `05-ruled-out` | 57 rasterized nodes |
| 64:2 | `06-recommended-action` | 57 rasterized nodes |

**Content edit (58:2 only, Task 6 Step 3):** In `04-root-cause`, “Triage so far” list items (`58:196`, `58:206`, `58:216`, `58:226`) shared one flex row, so the timestamp and the body painted on top of each other. Each row is now `display: block` with inline children, so the timestamp and the body read as one wrapping line. No other hand-tweaks.

## Casting (G1a locked)

Narrator: **River** `SAz9YHcvj6GT2YYXdXww`. Written on every take in `data/takes.json`.

User asked for one take per scene, not four. Flow `gTG9uxrXYEQXPsAM57hp`. Files in `assets/audio/vo/takes/`.

| Take | File | Duration | generation_id |
|---|---|---|---|
| T1 | `T1-v1.mp3` | 16.64s | `gLSQHAlhpHXI4p8sMmsS` |
| T2 | `T2-v1.mp3` | 17.12s | `U8WL1BX0PrM6JyyiErPK` |
| T3 | `T3-v1.mp3` | 22.32s | `NF5HAcXIcfKG52qJ9rZ3` |
| T4 | `T4-v1.mp3` | 20.88s | `HvO9TCH0DxAofBo7SfHx` |
| T5 | `T5-v1.mp3` | 25.44s | `mAKE4x6GQFps6xhnfgAi` |

G1b: user accepted all five takes. Chosen ids are on `data/takes.json`. Wavs are `assets/audio/vo/takes/Tn.wav` (48 kHz, 24-bit).

Split match: T1 0.978 (ASR heard "Aden" for "Aiden"; line cut still correct), T2–T5 1.0. Voice timing total **117.79s**. Raw takes sit near −23 LUFS; the mix lifts them to −16. Whisper's last-word end on T5 ("edition.") ran past the file; the word start is inside the file and was clamped.

## Casting shortlist (G1a)

Flow `ClZV4C3zXOmhgO08iH7o`. User asked for one take each (under the 2,000 gate). `eleven_v4`, T3 markup. Files in `assets/audio/vo/casting/`.

| Role | voice_id | Name | File | Duration |
|---|---|---|---|---|
| Neutral | `SAz9YHcvj6GT2YYXdXww` | River | `river-v1.mp3` | 22.48s |
| Male | `ZthjuvLPty3kTMaNKVKb` | Jackson | `jackson-v1.mp3` | 23.68s |
| Female | `lxYfHSkYm1EzQzGhdbfc` | Jessica Anne Bogart | `jessica-v1.mp3` | 24.32s |

## Score (G1c)

v1 (`MHau3gqzcMiU5WpaVp9i`, `preview-v1.mp3`) was accepted by ear, then replaced. Its opening had no pulse until 14.5s, so F02 could not land on a downbeat, and the music died under the last line.

v2 is the lock. User approved one regeneration (estimate 3,818 credits, charged **1,890**). Flow `Z67IXfC766QYsIpZT4jM`, node `7gSnxMcHkMDk6muihCZW`, generation `Wzj5Lu4T5qQkJoTm786K`. File `assets/audio/music/M1-v2.mp3`, 126s. Offset **0**. `bed.wav` and `bed.fit.wav` are the 48 kHz 24-bit copy. Preview with the narration at the locked starts: `assets/audio/music/preview-v2.mp3`.

Beat grid: **95.7 BPM**, 48 bars, first beat 0.65s, first downbeat 1.277s, last downbeat **118.77s**. Silence 121–126s. Fit total **120.98s**.

| Snap | Start | Result |
|---|---|---|
| F02 | 3.785 | on downbeat (0 ms) |
| F05 | 23.777 | on downbeat (0 ms) |
| F09 | 43.770 | on downbeat (0 ms) |
| F13 | 68.778 | on downbeat (0 ms) |
| F18 | 101.285 | on a phrase downbeat (0 ms) |

Tail: F20 is its minimum 2.5s, so the film ends at 120.98, **2.21s** after the last downbeat. User rejected this bed's tone and asked to keep v1's sound.

## Score v3 (current lock, ear still open)

Reference-audio attempt `0yzkHgoh1FRWBRaeeupW` failed in processing (`unexpected error`), priced 1,890 on the failed record. Retry is prompt-only, same palette as v1 (warm synth, felt piano, sub, brushed percussion, no drum-machine kick). Flow `ZId2lkjoCMvXzh2E1kky`, node `iFupzRtBrqrc2oEBCnpx`, generation `YYCfWF8xEM7mwNdpFpxt`, charged 1,890. File `M1-v3.mp3`. Preview `preview-v3.mp3`.

Grid 95.7 BPM. The default tracker skipped a quiet opening and started at 32.5s; the lock uses a 96 BPM prior, first beat 3.785s, first downbeat 4.412s, last downbeat 119.42s. All five snaps are 0 ms: F02 4.412, F05 24.404, F09 44.420, F13 69.428, F18 101.912. Total **121.607s**. F20 is at its 2.5s minimum, so the film ends 2.19s after the last downbeat. `preview-v1.mp3` remains the tone reference. **G1c passed** on `preview-v3.mp3` (user: "Perfect, I love this."). Do not regenerate the score.

## SFX

Flow `9B0vV8Cc49mg1DTqX2J1`. Nineteen effects, one take each, `eleven_text_to_sound_v2`, `prompt_influence` 0.6. Estimate 396 credits, charged **109**. Wavs in `assets/audio/sfx/<id>.wav` (48 kHz), adopted into `.media`. The earlier `_smoke` click stays.

## Stills (G1d, one take each)

Flow `aC75K2hX1fi2YI3MBSdw`. Model `gemini-3-pro-image`, 16:9, 2K (2752×1536). User asked for one variation per clip. Each node takes the matching Figma style PNG on the `images` port. Files `assets/el-stills/A1.png`–`A6.png`. Pre-wire estimate was 1,218 credits each (~7,308). Charged **1,827.09 each, 10,962.54 total**. No glyphs, logos, or UI on visual check. **G1d passed** (user: "I like all of them."). Pins are the generation nodes themselves (`creative_add_flow_asset_node` returned the original node id for each). Do not regenerate.

## Storyboard and packets (Task 16)

`scripts/write_docs.py` writes `STORYBOARD.md` and `SCRIPT.md` from `data/frames.json` and the locked `data/timing.json`. Tests: `tests/test_write_docs.py` (2 passed). `audio sync-durations` rewrote 14 voiced frame lines to the same durations already in the lock (`durations consistent`). Packets: 20 plus `_role.md`. The stock 48 KB cap rejects `09-incident-hits` at 52,423 bytes (blueprint `prompt-type-submit-generate` plus four rule recipes). Built with a 56 KB cap so that one packet could land. Every other packet is under 48 KB.

## Logo flags (clear before G4)

F03 uses the official SVGs in `shared/logos/vendors/`. Grafana’s trademark policy requires an attribution line and a license for a commercial film (`hello@grafana.com`). Do not ship F03 until that is cleared. Datadog is on `#FAF7F2` with no box.

## Golden frame F10 (G2, awaiting lock)

High-quality render `renders/frames/10.mp4` (1920×1080, 13.2s, 792 frames). Narration preview `renders/frames/10-with-vo.mp4`. `qa_motion` passes (floor 0.0526, no freezes). The HTML component rebuild, the Evidence veil, the badge blur, and the spec’s 6°/−10° tilt were all rejected. The plate is the Figma PNG (`source/figma/58-2-triage.png`, then `61-2.png`), captions sit under the panel, and the stage rests at rotateX(2°) rotateY(−4°). Picture rules and the Grok 4.7 frame-worker routing are in the plan under “F10 picture lock”. G2 still open.

| Clip | Node | Generation |
|---|---|---|
| A1 | `mldKhbDn9gC3FHHePyiB` | `cVoz3hMNAnDNEZsneWm9` |
| A2 | `44j0tTh7015WG6z7C2pO` | `mcHzG73Z4bSW8u8rHvuA` |
| A3 | `Wy2r5DaNIu0ne49HbmjP` | `q81SfIGCOCUg7iSheTUY` |
| A4 | `MdJulJwZ5XI0Hzkj7efn` | `3urxLvdsDFlGxndMPwFj` |
| A5 | `Gj3PfmZC9IAwl2Lcx92s` | `7b0FMaaTxtVvyigJ3sXm` |
| A6 | `XKiD4bIpCr8FgtsFWwtI` | `K8WEwxCF2qG4GfbKDb68` |
