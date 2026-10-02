# Aiden for SRE Launch Film v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ~2:00 Aiden for SRE launch film specified in `docs/superpowers/specs/2026-10-01-aiden-sre-launch-film-design.md`: product screens are the exported Figma frames, motion and captions are HTML around those pictures, ElevenLabs-only narration/music/SFX/atmosphere video, assembled, mixed and rendered by HyperFrames.

**Architecture:** One HyperFrames project (`videos/aiden-sre-launch/`) on the `product-launch-video` workflow. Narration is locked first (ElevenLabs MCP, scene takes picked by ear), music is generated from a spotting sheet and beat-mapped, silent bridge frames flex to land narration entries on downbeats, and `data/timing.json` becomes the single lock every frame worker reads. Remaining frame renders are built by Grok 4.7, one file each, copying the locked F10 picture rules.

**Tech Stack:** HyperFrames 0.8.103 (Node 22), GSAP + three.js inside compositions, ElevenLabs MCP (`user-elevenlabs`), Figma REST via `hyperframes figma` (`FIGMA_TOKEN`), Chrome DevTools MCP, Python 3 (pytest, librosa for the beat analyzer), ffmpeg/ffprobe, whisper-cli (via `hyperframes transcribe`).

## Global Constraints

- Spec is the authority: `docs/superpowers/specs/2026-10-01-aiden-sre-launch-film-design.md`. Section numbers below refer to it.
- Every HyperFrames command runs as `PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 …` (HyperFrames 0.8.103 refuses Node 20).
- Old project `videos/aiden-sre-film/` is read-only. Copy from it; never edit it.
- Narration words are locked to `source/lines.json` (cut set: L01–L07, L09–L13, L15, L16). Markup may add only audio tags, punctuation, capitals, and acronym respellings `M-T-T-R`, `S-R-E` (§9.1).
- ElevenLabs is the only generative vendor, used only through the ElevenLabs MCP. No Apiframe. No REST keys.
- ElevenLabs MCP calls are made **only by the orchestrator session** (spend in one place; MCP availability is not assumed in subagents). Never call a generator twice to retry; poll `creative_get_flow_run_status`. Run `estimate_only: true` before any batch over 200 credits; ask the user before any batch over 2,000 credits (U1).
- No time-stretching of narration. No head trim after transcription. Word timings always come from transcribing the exact shipped file.
- Product plates are the Figma exports in `source/figma/*.png`, shown whole. Do not rebuild a product screen from `compositions/components/*`. Those HTML dumps do not match the app: absolute boxes, IBM Plex missing inside iframes (`@font-face` on the parent does not apply), and bold labels stacked on the same origin as the body. Motion, ribbons, and captions are HTML around the picture. Never generate product UI.
- Motion contract M1–M10 (§5) applies to every frame. No layer static for > 0.6 s unless another layer is in a primary move.
- Film tokens §6.1 and type §6.2 stay frozen. Panel tilt and Evidence blur in spec §6.3 / U3 are overridden by the F10 lock below. Workers may not edit `shared/`, `data/`, `STORYBOARD.md`, `index.html`.
- Workers never run `git commit`. The orchestrator commits each accepted task with explicit paths.
- Model routing: non-frame build workers `composer-2.5-fast`. Every frame composition and its render from here on (T18, and any re-render of a frame) uses Grok 4.7, Task tool slug `grok-4.7-high-fast`. Per-task reviewer `claude-sonnet-5-5-high`. Final audit reviewer `claude-opus-5-5-high`.
- Max 8 concurrent subagents.

---

## Dispatch schedule

```
Wave 0  T1 scaffold + MCP smoke (orchestrator + 1 worker)
        ├── T2 data contract ─────────┐   (parallel, 4 workers)
        ├── T3 split_takes + markup ──┤
        ├── T4 timing + fit ──────────┤
        └── T5 QA + finish + fetch ───┘
Wave 1  ├── T6 Figma product components (worker)          ┐
        ├── T7 Figma layout + missing-beat frames (worker) │ parallel with the audio chain
        ├── T7b official vendor logos (worker)             │
        ├── T8 live interaction truth (orchestrator, Chrome DevTools MCP)
        └── audio chain (orchestrator MCP + 1 worker, serial):
            T9 casting ─G1a─ T10 takes ─G1b─ T11 transcribe+split+voice timing
            ─ T12 score ─G1c─ T13 beat map + fit + LOCK
            T14 SFX (orchestrator, after T13)    T15 style stills ─G1d (orchestrator, after T13)
Wave 2  T16 STORYBOARD/SCRIPT/frame packets (worker) ─ T17 golden frame F10 ─G2
Wave 3  T18 frame workers ×19 (≤ 8 at a time, 3 batches)  ║  T19 ElevenLabs video clips (orchestrator; bridges after F05/F09/F13 exist)
Wave 4  T20 assemble + transitions + mix (worker) ─G3─ T21 render + finish + QA (worker) ─ T22 audit + fix loop ─ T23 deliver ─G4
```

User gates: G1a voice, G1b takes, G1c score + music offset, G1d stills, G2 golden frame, G3 full preview with mix, G4 ship.

## Skills per task (from spec §11 — read routers first, then the named member only)

| Task | Skills |
|---|---|
| T1 | `hyperframes-skills` → `hyperframes`, `product-launch-video` (Steps 0–2), `hyperframes-cli`; `elevenlabs-skills` → `creative-studio` (smoke test) |
| T2–T5 | superpowers `test-driven-development`; `hyperframes-core` (T2 storyboard format: `hyperframes/references/storyboard-format.md`) |
| T6–T7 | `hyperframes-skills` → `figma`; `hyperframes-core` |
| T7b | `company-logos` (lookup procedure only; files come from official brand kits); `media-use` (adopt) |
| T8 | `chrome-devtools-skills` → `chrome-devtools` |
| T9–T10 | `elevenlabs-skills` → `creative-studio`; reference `text-to-speech`; MCP `creative_get_model_guide(eleven_v4)`; `hyperframes-creative` `references/narration.md` |
| T11 | `media-use` (`audio/references/tts.md` transcribe section); `hyperframes-cli` |
| T12 | `elevenlabs-skills` → `creative-studio`; reference `music`; MCP model guide `eleven_music_v2_5` |
| T13 | `music-to-video` (`scripts/analyze-beatgrid.py` only) |
| T14 | `elevenlabs-skills` → `creative-studio`; reference `sound-effects` |
| T15, T19 | `elevenlabs-skills` → `creative-studio`; `veo` (prompt grammar); `hyperframes-creative`; MCP model guides; `media-use` (adopt) |
| T16 | `product-launch-video` Steps 4–5; `hyperframes/references/subagent-dispatch.md` |
| T17–T18 | packet + `_role.md`; `hyperframes-core`, `hyperframes-keyframes`, `hyperframes-animation`, `hyperframes-registry`, `media-use` (`references/media-treatments.md` for footage) |
| T20 | `product-launch-video` Steps 5–6; `hyperframes-audio` (carve, chain, automation) |
| T21 | `hyperframes-cli`; superpowers `verification-before-completion` |
| T22 | `hyperframes-skills` → `video-production-audit`; `emil-skills` → `review-animations`; `critique-composition`; `critique-visual-hierarchy` |
| T23 | `media-use` (captions sidecar via `hyperframes transcribe --to srt/vtt`) |

## Prompt templates

**Build worker (Task tool):** `subagent_type: generalPurpose`, `model: composer-2.5-fast`.

```text
You are implementing Task <N> of docs/superpowers/plans/2026-10-01-aiden-sre-launch-film.md
in /Users/swami/Documents/Stackgen_Website_Redesign. Read the Global Constraints and Task <N> in full,
then the spec sections it cites. Read the skills listed for Task <N> (router SKILL.md first, then only the
named member). Do exactly the steps; do not edit files outside the task's Files list; do not git commit.
Run every verification command and paste its real output in your report. Report: files changed,
commands run with output, anything you could not do and why.
```

**Frame worker (T18 and any frame re-render):** `subagent_type: generalPurpose`, `model: grok-4.7-high-fast` (Grok 4.7). Same header, plus:

```text
Your frame: F<NN> (<slug>). Read first, in order: the F10 picture lock in this plan,
compositions/frames/10-investigation.html (the golden reference; not for F10 itself),
.hyperframes/frame-packets/_role.md, .hyperframes/frame-packets/<NN>-<slug>.md, frame.md,
spec §5 and §6.4, the F<NN> row of §7, and the data/timing.json entry for frame <NN>
(duration, cues[].local, hits[].t − start).
Where the packet or spec §6.3 says to mount a product component, blur Evidence, or rest at
rotateX(6deg) rotateY(-10deg), follow the F10 picture lock instead.
Write only compositions/frames/<NN>-<slug>.html and assets/frames/<NN>/*.
Product picture: the matching source/figma PNG, shown whole at 1920×886 inside zoom 0.80.
Do not iframe compositions/components. Film captions sit in the dark band under the panel.
Every cue lands at its local time ±0.12 s. Place SFX cues as <audio> clips at the hit times named in the packet.
Register the GSAP timeline under its frame id and as window.__timelines.main.
Read "Batch A lessons" in this plan before writing. Apply every bullet. Do not edit index.html.
Self-check per _role.md, then render your frame:
PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 render videos/aiden-sre-launch \
  -c compositions/frames/<NN>-<slug>.html --fps 60 --quality draft -o videos/aiden-sre-launch/renders/frames/<NN>.mp4
python3 videos/aiden-sre-launch/scripts/qa_motion.py videos/aiden-sre-launch/renders/frames/<NN>.mp4
Both must pass. Paste output. Before you report, open a still and confirm product type is the
Figma picture: no stacked label/body, no caption covering the UI, no fogged column,
no ribbon through a glyph, no word cut by a card edge or the 1920 frame.
```

**Reviewer:** `model: claude-sonnet-5-5-high` (`claude-opus-5-5-high` for T17, T22).

```text
Review Task <N> against the plan task and spec sections it cites. Stage 1 spec compliance: list every
requirement and PASS/FAIL with evidence (file:line or command output you ran yourself). Stage 2 quality:
Critical / Important / Minor findings. For frames, also open renders/frames/<NN>.mp4 stills at 25/50/75%
and at every cue time and check §5 M3–M7, §6.4, the F10 picture lock, and Batch A lessons
(PNG plate, stage-only tilt, no type stacked on itself, no caption on the product,
no ribbon through a glyph, no word cut by a card or the frame edge, chips in front of the plate).
Do not score the frame against the retired
§6.3 tilt or Evidence blur. Do not fix; report.
```

---

## Wave 0

### Task 1: Scaffold project, port proven pieces, prove the ElevenLabs MCP round trip

**Files:**
- Create: `videos/aiden-sre-launch/` (via `hyperframes init`), `BRIEF.md`, `NOTES.md`, `.env` (gitignored), `.gitignore`, `source/storyboard.html`, `source/storyboard.json`, `source/lines.json`, `tests/conftest.py`, `frame.md`
- Copy into: `shared/layers/`, `shared/tokens/`, `shared/fonts/`, `shared/logos/`

**Interfaces:**
- Produces: project root; `source/lines.json` (list of `{id, text, scene, …}`); `shared/tokens/brand.css` with spec §6.1 custom properties; `tests/conftest.py` putting `scripts/` on `sys.path`; `NOTES.md` section "ElevenLabs MCP I/O".

- [ ] **Step 1: Branch and Node**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
git checkout -b film/aiden-sre-launch
export PATH=/opt/homebrew/opt/node@22/bin:$PATH && node -v
```
Expected: `v22.x`.

- [ ] **Step 2: Init**

```bash
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
npx --yes hyperframes@0.8.103 init videos/aiden-sre-launch --non-interactive --example=blank --skill=product-launch-video
grep -n "hyperframes@" videos/aiden-sre-launch/package.json
```
Expected: scripts pinned to `hyperframes@0.8.103`. If not, edit `package.json` scripts to `npx --yes hyperframes@0.8.103 <cmd>`.

- [ ] **Step 3: Port proven pieces and sources**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos
OLD=aiden-sre-film/shared NEW=aiden-sre-launch
mkdir -p $NEW/shared/layers $NEW/shared/tokens $NEW/shared/fonts $NEW/shared/logos $NEW/source $NEW/tests $NEW/scripts $NEW/data
cp $OLD/layers/{ribbons.js,ribbon-math.js,prng.js,camera.js,cursor.js} $NEW/shared/layers/
cp $OLD/tokens/{brand.css,motion.js} $NEW/shared/tokens/
cp -R $OLD/assets/fonts/. $NEW/shared/fonts/
cp -R $OLD/assets/logos/. $NEW/shared/logos/
cp aiden-sre-film/source/storyboard.json $NEW/source/
cp aiden-sre-film/data/lines.json $NEW/source/
cp /tmp/sre-launch/storyboard.html $NEW/source/storyboard.html 2>/dev/null || echo "re-download via Composio GOOGLEDRIVE_DOWNLOAD_FILE file 1YbNf9XchVrp3g4v7wNoJsmLIi_fMFTWR"
grep '^FIGMA_TOKEN=' aiden-sre-film/.env > $NEW/.env
printf '.env\nnode_modules/\nrenders/\n.hyperframes/cache/\n' >> $NEW/.gitignore
grep -c . $NEW/.env
```
Expected: last line `1`. Never print the token.

- [ ] **Step 4: Verify ported tokens match spec §6.1**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
for v in '#14110C' '#1B1811' '#211D15' '#3F3B39' '#F1EAE0' '#FAF7F2' '#96897C' '#BA99FD' '#A0EAFC'; do grep -qi "$v" shared/tokens/brand.css && echo "ok $v" || echo "MISSING $v"; done
```
Expected: 9 × `ok`. Add any missing variable from §6.1, plus `--sg-coral`, `--sg-amber`, `--sg-green` if absent. Add IBM Plex Sans WOFF2 + `@font-face` to `shared/fonts/` for product components.

- [ ] **Step 5: BRIEF.md and frame.md**

`BRIEF.md`:

```markdown
# Aiden for SRE — launch film v2

workflow: product-launch-video
flow: automation
storyboard: yes

Message: An on-call team meets Aiden for SRE and follows one incident from the alert flood to a closed, audited fix.
Audience: platform and SRE buyers.
Destination: 1920×1080, 60 fps master, ~2:00 (110–126 s). Length is the chosen ElevenLabs narration plus music-fitted bridges.
Source of truth: docs/superpowers/specs/2026-10-01-aiden-sre-launch-film-design.md
VO_MODE: verbatim (source/lines.json, cut set)
Look: warm-ink stage, cream type, violet/cyan accents, 0 px radius film chrome; authentic light product UI floating on the stage.
Audio: ElevenLabs MCP only (narration eleven_v4, music eleven_music_v2_5, SFX); mixed in HyperFrames with a voiceover carve.
```

Run `product-launch-video` Step 2 to produce `frame.md`; set canvas `#14110C`, fonts Geist / Geist Mono, palette §6.1, radius 0. Run `npx --yes hyperframes@0.8.103 auth status` and paste output into `NOTES.md` (exit 1 when signed out is normal; no HeyGen audio is used).

- [ ] **Step 6: tests/conftest.py**

```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
```

- [ ] **Step 7: ElevenLabs MCP round-trip smoke test (orchestrator)**

1. `creative_create_flow` → `flow_id`.
2. Add an `sfx` node (`eleven_text_to_sound_v2`, prompt "single soft UI click", `duration_seconds` 0.5) and run it with `generations_count` 1, after an `estimate_only: true` call.
3. Poll `creative_get_flow_run_status(flow_id, session_ids)` until `all_completed`.
4. Find the downloadable URL in the generation payload; `curl -L -o assets/audio/sfx/_smoke.mp3 "<url>"`; `ffprobe` it.
5. Upload test: `creative_create_asset_upload` (any PNG) → HTTP PUT with exact `Content-Type` → `creative_finalize_asset_upload`.

Record in `NOTES.md` → "ElevenLabs MCP I/O": the JSON path of the URL field, whether URLs expire, the upload sequence that worked. If no URL is returned, try `creative_get_available_assets`; if still none, stop and ask the user (blocks the audio chain).

- [ ] **Step 8: Check and commit (orchestrator)**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aiden-sre-launch
PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 lint
git -C ../.. add videos/aiden-sre-launch ':!videos/aiden-sre-launch/.env'
git -C ../.. commit -m "feat(aiden-sre-launch): scaffold project, port ribbons/tokens/fonts, prove ElevenLabs MCP I/O"
```

---

### Task 2: Data contract — frames, takes, video, SFX

**Files:**
- Create: `data/frames.json`, `data/takes.json`, `data/el-video.json`, `data/sfx.json`
- Test: `tests/test_data_contract.py`

**Interfaces:**
- `data/frames.json`: list of `{frame:int, id:"Fnn", slug, title, scene, line:"Lxx"|null, take:"Tn"|null, est:float, flex:[lo,hi]|null, snap:bool, figma:[nodeId], el_video:[Ax], blueprint, rules:[ruleId], ost:[{text, word|null}], hits:[{label, word}|{label, at:"start"|"end"}], counter:[from,to]|null, sfx:[sfxId], picture}`.
- `data/takes.json`: `[{id:"Tn", lines:[Lxx], frames:[int], markup, chosen:null}]`.
- Consumed by T3 (takes), T4 (frames), T14 (sfx), T15/T19 (el-video), T16 (frames).

- [ ] **Step 1: Write the failing test**

```python
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CUT = ["L01", "L02", "L03", "L04", "L05", "L06", "L07", "L09", "L10", "L11", "L12", "L13", "L15", "L16"]


def load(name):
    return json.loads((ROOT / name).read_text())


def norm(w):
    return re.sub(r"[^a-z0-9%]", "", w.lower())


def test_frames_cover_cut_lines_in_order():
    frames = load("data/frames.json")
    assert [f["frame"] for f in frames] == list(range(1, 21))
    assert [f["line"] for f in frames if f["line"]] == CUT


def test_silent_frames_have_flex_and_vo_frames_do_not():
    for f in load("data/frames.json"):
        if f["line"] is None:
            lo, hi = f["flex"]
            assert lo <= f["est"] <= hi
        else:
            assert f["flex"] is None


def test_snap_frames():
    snaps = [f["id"] for f in load("data/frames.json") if f["snap"]]
    assert snaps == ["F02", "F05", "F09", "F13", "F18"]


def test_cue_anchor_words_exist_in_their_line():
    lines = {l["id"]: l["text"] for l in load("source/lines.json")}
    for f in load("data/frames.json"):
        anchors = [c["word"] for c in f["ost"] if c.get("word")] + [h["word"] for h in f["hits"] if h.get("word")]
        for a in anchors:
            words = [norm(w) for w in lines[f["line"]].split()]
            assert any(w.startswith(norm(a)) for w in words), (f["id"], a)


def test_takes_partition_cut_lines():
    takes = load("data/takes.json")
    assert [l for t in takes for l in t["lines"]] == CUT
    for t in takes:
        assert len(t["markup"]) >= 250, t["id"]


def test_referenced_ids_exist():
    frames = load("data/frames.json")
    vids = {v["id"] for v in load("data/el-video.json")}
    sfx = {s["id"] for s in load("data/sfx.json")}
    for f in frames:
        assert set(f["el_video"]) <= vids, f["id"]
        assert set(f["sfx"]) <= sfx, f["id"]
        assert len(f["rules"]) <= 4, f["id"]
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd videos/aiden-sre-launch && python3 -m pytest tests/test_data_contract.py -q`
Expected: FAIL (`FileNotFoundError: … data/frames.json`).

- [ ] **Step 3: Write `data/frames.json`**

```json
[
{"frame":1,"id":"F01","slug":"cold-open","title":"Cold open","scene":"intro","line":null,"take":null,"est":3.0,"flex":[2.0,4.6],"snap":false,"figma":[],"el_video":["A1"],"blueprint":"overwhelm-surround","rules":["particle-burst","ambient-glow-bloom","vertical-spring-ticker"],"ost":[],"hits":[],"counter":[0,212],"sfx":["sub-swell","alert-ping","room-tone"],"picture":"Ink stage; A1 alert-storm footage; ribbons wake; first coral pings spark; corner counter fades in and climbs 0 to 212."},
{"frame":2,"id":"F02","slug":"alert-flood","title":"Buried in alerts","scene":"intro","line":"L01","take":"T1","est":7.1,"flex":null,"snap":true,"figma":["66:2","48:2"],"el_video":[],"blueprint":"overwhelm-surround","rules":["waterfall-entry","counting-dynamic-scale","3d-camera-flight","motion-blur-streak"],"ost":[],"hits":[],"counter":[212,1284],"sfx":["row-tick","sub-swell"],"picture":"Notification cards with real alert titles from Figma 01 stack faster than readable; 3D dolly back reveals hundreds; counter climbs to 1,284 (tabular); 'most of them don't matter' greys 90% of cards; 'hours' makes one coral card throb."},
{"frame":3,"id":"F03","slug":"meet-aiden","title":"Meet Aiden for SRE","scene":"intro","line":"L02","take":"T1","est":10.4,"flex":null,"snap":false,"figma":["66:27","66:30","54:2"],"el_video":[],"blueprint":"constellation-hub","rules":["svg-path-draw","split-tilt-cards","hacker-flip-3d","viewport-change"],"ost":[{"text":"Aiden for SRE","word":"Meet"},{"text":"Your AI SRE teammate.","word":"teammate"},{"text":"Discovers your services and dependencies","word":"maps"}],"hits":[{"label":"title","word":"Meet"}],"counter":null,"sfx":["whoosh-long","kinetic-slam","ui-click"],"picture":"Cards whip away; two-weight title mask-reveals; official full-color logos (Datadog, Grafana, Prometheus, New Relic, PagerDuty, AWS, Google Cloud, Microsoft Azure) on small light tiles connect to Aiden by drawn ribbons; cut to Discovery panel where the service map draws services then dependencies."},
{"frame":4,"id":"F04","slug":"bridge-triage","title":"ALERT TRIAGE","scene":"triage","line":null,"take":null,"est":2.4,"flex":[1.6,4.2],"snap":false,"figma":[],"el_video":["A2"],"blueprint":"kinetic-type-beats","rules":["kinetic-beat-slam"],"ost":[{"text":"ALERT TRIAGE","word":null}],"hits":[{"label":"scene-triage","at":"start"}],"counter":null,"sfx":["impact-low","whoosh-short"],"picture":"Eyebrow slams; A2 ribbons converge into a panel silhouette that lands on F05 frame 0."},
{"frame":5,"id":"F05","slug":"alerts-pour-in","title":"Flood of alerts","scene":"triage","line":"L03","take":"T2","est":2.5,"flex":null,"snap":true,"figma":["48:2"],"el_video":[],"blueprint":"cursor-ui-demo","rules":["waterfall-entry","vertical-spring-ticker","viewport-change"],"ost":[],"hits":[],"counter":[1284,1284],"sfx":["row-tick"],"picture":"Alerts panel tilts in; rows pour in with momentum; corner counter re-enters holding 1,284; product summary cards keep real values."},
{"frame":6,"id":"F06","slug":"triage-groups","title":"Aiden triages","scene":"triage","line":"L04","take":"T2","est":9.0,"flex":null,"snap":false,"figma":["48:2"],"el_video":[],"blueprint":"panel-edit-live-sync","rules":["card-morph-anchor","anchored-layout-expand","stat-bars-and-fills","coordinate-target-zoom"],"ost":[{"text":"Correlated","word":"groups"},{"text":"de-duplicated","word":"filters"},{"text":"ranked by service impact","word":"ranks"}],"hits":[],"counter":[1284,1284],"sfx":["ui-click","soft-tick"],"picture":"Punch-in; noise rows collapse and grey; related rows FLIP into groups; list re-sorts by impact; callout chips land on their words."},
{"frame":7,"id":"F07","slug":"act-now","title":"Only what needs you","scene":"triage","line":"L05","take":"T2","est":5.6,"flex":null,"snap":false,"figma":["51:2"],"el_video":[],"blueprint":"cursor-ui-demo","rules":["counting-dynamic-scale","cursor-click-ripple","theme-crossfade-morph"],"ost":[{"text":"Only the alerts that need you","word":"only"}],"hits":[{"label":"counter-7","word":"need"}],"counter":[1284,7],"sfx":["ui-click","resolve-chime"],"picture":"Cursor clicks the Act now tab; list filters to critical; corner counter counts down 1,284 to 7."},
{"frame":8,"id":"F08","slug":"bridge-rca","title":"ROOT CAUSE ANALYSIS","scene":"rca","line":null,"take":null,"est":2.4,"flex":[1.6,4.2],"snap":false,"figma":[],"el_video":["A3"],"blueprint":"kinetic-type-beats","rules":["kinetic-beat-slam"],"ost":[{"text":"ROOT CAUSE ANALYSIS","word":null}],"hits":[{"label":"scene-rca","at":"start"}],"counter":null,"sfx":["impact-low","sub-swell"],"picture":"Eyebrow slams; A3 particles collapse to one coral point that becomes the critical row's severity dot in F09."},
{"frame":9,"id":"F09","slug":"incident-hits","title":"Incident hits","scene":"rca","line":"L06","take":"T3","est":4.1,"flex":null,"snap":true,"figma":["99:3","99:36","48:2","99:93"],"el_video":[],"blueprint":"prompt-type-submit-generate","rules":["cursor-click-ripple","chart-scrub-readout","discrete-text-sequence","viewport-change"],"ost":[],"hits":[],"counter":null,"sfx":["slack-pop","ui-click","clock-tick"],"picture":"Slack question with no replies (typing dots die); cut to alert list; cursor clicks the middle of the critical Pod Crash Loop row; corner timer starts; status chip Investigating."},
{"frame":10,"id":"F10","slug":"investigation","title":"Investigation (golden)","scene":"rca","line":"L07","take":"T3","est":13.6,"flex":null,"snap":false,"figma":["58:2","61:2"],"el_video":[],"blueprint":"agent-progress-theater","rules":["stat-bars-and-fills","ai-tracking-box","asr-keyword-glow","depth-of-field-blur"],"ost":[{"text":"Hypotheses with confidence scores","word":"scores"},{"text":"ruled out · 4%","word":"wrong"}],"hits":[{"label":"ruled-out","word":"wrong"}],"counter":null,"sfx":["data-whoosh","bar-riser","strike"],"picture":"Investigation panel FLIPs open from the row; summary types in; logs/metrics/events chips ride ribbons in; hypotheses build with confidence bars (0.78 high, lows 0.04-0.12); low rows strike through on 'wrong' with callout 'ruled out · 4%'. Evidence panel under depth-of-field blur (U3)."},
{"frame":11,"id":"F11","slug":"probable-cause","title":"Probable root cause","scene":"rca","line":"L09","take":"T3","est":4.3,"flex":null,"snap":false,"figma":["58:2"],"el_video":[],"blueprint":"zoom-out-workspace-reveal","rules":["card-morph-anchor","3d-page-scroll","chart-scrub-readout"],"ost":[{"text":"Probable cause, with the evidence","word":"probable"}],"hits":[],"counter":null,"sfx":["whoosh-short","clock-tick"],"picture":"Probable Root Cause card lifts forward; RCA report flashes full frame (1 s, scrolling); corner timer stops early; MTTR chip drops."},
{"frame":12,"id":"F12","slug":"bridge-remediation","title":"REMEDIATION","scene":"remediation","line":null,"take":null,"est":2.0,"flex":[1.4,4.0],"snap":false,"figma":[],"el_video":["A4"],"blueprint":"kinetic-type-beats","rules":["kinetic-beat-slam"],"ost":[{"text":"REMEDIATION","word":null}],"hits":[{"label":"scene-remediation","at":"start"}],"counter":null,"sfx":["impact-low"],"picture":"Eyebrow slams; A4 coral wave reverses to a green front and lands on F13's layout."},
{"frame":13,"id":"F13","slug":"manual-fix","title":"Fix is often manual","scene":"remediation","line":"L10","take":"T4","est":3.4,"flex":null,"snap":true,"figma":["66:49"],"el_video":[],"blueprint":"typewriter-reveal","rules":["discrete-text-sequence","nudge-curve","viewport-change"],"ost":[],"hits":[],"counter":null,"sfx":["keyboard-clatter"],"picture":"Manual runbook checklist ticks slowly, terminal lines type, a clock fast-forwards; everything feels heavy."},
{"frame":14,"id":"F14","slug":"remediation-run","title":"Aiden runs the remediation","scene":"remediation","line":"L11","take":"T4","est":13.4,"flex":null,"snap":false,"figma":["64:2","66:56"],"el_video":[],"blueprint":"panel-edit-live-sync","rules":["spring-pop-entrance","press-release-spring","waterfall-entry","cursor-click-ripple"],"ost":[{"text":"Restart","word":"restarting"},{"text":"scale","word":"scaling"},{"text":"reroute traffic","word":"rerouting"},{"text":"roll back","word":"rolling"},{"text":"Approval gate","word":"approval"},{"text":"full audit trail","word":"audit"}],"hits":[{"label":"approve","word":"approval"}],"counter":null,"sfx":["soft-tick","approve-chime","row-tick"],"picture":"Recommended-action panel; action chips land on their words; approval gate policy rows pass green one by one; cursor approves; audit-trail rows append with timestamps."},
{"frame":15,"id":"F15","slug":"resolved","title":"Incidents close faster","scene":"remediation","line":"L12","take":"T4","est":4.3,"flex":null,"snap":false,"figma":["66:70","99:100"],"el_video":[],"blueprint":"dataviz-countup","rules":["chart-scrub-readout","theme-crossfade-morph","ambient-glow-bloom"],"ost":[{"text":"You decide what runs","word":"control"}],"hits":[{"label":"resolved","word":"close"}],"counter":null,"sfx":["resolve-chime"],"picture":"Error sparkline drops from coral to green; status flips Investigating to Resolved."},
{"frame":16,"id":"F16","slug":"keeps-learning","title":"Keeps learning","scene":"learn","line":"L13","take":"T5","est":7.7,"flex":null,"snap":false,"figma":["66:73"],"el_video":[],"blueprint":"grid-card-assemble","rules":["depth-scatter-assemble","svg-path-draw","multi-phase-camera"],"ost":[{"text":"Every incident makes the next one easier","word":"next"}],"hits":[],"counter":null,"sfx":["soft-tick","data-whoosh"],"picture":"Investigation cards file into a growing knowledge lattice; each new incident starts further along a track."},
{"frame":17,"id":"F17","slug":"bridge-platform","title":"AIDEN WORLD MODEL","scene":"platform","line":null,"take":null,"est":2.6,"flex":[1.8,4.4],"snap":false,"figma":[],"el_video":["A5"],"blueprint":"camera-journey","rules":["ambient-glow-bloom","3d-camera-flight"],"ost":[{"text":"AIDEN WORLD MODEL","word":null}],"hits":[{"label":"scene-platform","at":"start"}],"counter":null,"sfx":["sub-swell"],"picture":"A5 world-model atmosphere: layers of light records; eyebrow AIDEN WORLD MODEL."},
{"frame":18,"id":"F18","slug":"world-model","title":"World Model and Aiden OS","scene":"platform","line":"L15","take":"T5","est":12.0,"flex":null,"snap":true,"figma":["66:76","76:2","66:87"],"el_video":["A5"],"blueprint":"constellation-hub","rules":["svg-path-draw","orbit-3d-entry","spring-pop-entrance"],"ost":[{"text":"deployed","word":"deployed"},{"text":"changed","word":"changed"},{"text":"broke","word":"broke"},{"text":"fixed","word":"fixed"},{"text":"AIDEN OS · policy · approvals · audit","word":"OS"}],"hits":[],"counter":null,"sfx":["soft-tick","ui-click"],"picture":"'The shared record.' chips light on their words with live mono sub-lines and link into the stackgen.com world-model diagram; Aiden OS layer slides under with policy, approvals, audit gates."},
{"frame":19,"id":"F19","slug":"end-card","title":"Call to action","scene":"cta","line":"L16","take":"T5","est":5.6,"flex":null,"snap":false,"figma":["66:92","80:2"],"el_video":["A6"],"blueprint":"logo-assemble-lockup","rules":["press-release-spring","ambient-glow-bloom"],"ost":[{"text":"Book a demo","word":"Book"},{"text":"Try Community Edition · free for up to two users","word":"Community"}],"hits":[{"label":"wordmark","at":"start"}],"counter":null,"sfx":["logo-sting"],"picture":"StackGen wordmark lockup; cream primary 'Book a demo' and hairline secondary 'Try Community Edition' with corner ticks; micro-line; ribbons settle at 40% behind wordmark."},
{"frame":20,"id":"F20","slug":"tail","title":"Tail","scene":"cta","line":null,"take":null,"est":3.0,"flex":[2.5,4.5],"snap":false,"figma":[],"el_video":["A6"],"blueprint":"titlecard-reveal","rules":["ambient-glow-bloom","sine-wave-loop"],"ost":[],"hits":[{"label":"end","at":"end"}],"counter":null,"sfx":[],"picture":"Lockup holds while ribbons and A6 keep drifting; fade to ink completes exactly on the last frame, on the music's ring-out."}
]
```

- [ ] **Step 4: Write `data/takes.json`** (markup verbatim from spec §9.1)

```json
[
{"id":"T1","lines":["L01","L02"],"frames":[2,3],"chosen":null,"markup":"[calm, matter-of-fact] Your on-call team is buried in alerts… and most of them don't matter. The ones that do can take HOURS to untangle. [pause] [warmly] Meet Aiden for SRE, your AI SRE teammate. It connects to the observability tools you already run, and maps your services on its own."},
{"id":"T2","lines":["L03","L04","L05"],"frames":[5,6,7],"chosen":null,"markup":"[measured] One failure can set off a flood of alerts. [pause] Aiden triages every alert as it arrives. It groups related alerts, filters the noise, and ranks the rest by impact on your services. [short pause] [warmly] Your engineers see only the alerts that need them… and save their energy for real incidents."},
{"id":"T3","lines":["L06","L07","L09"],"frames":[9,10,11],"chosen":null,"markup":"[serious] When a real incident hits, most of the time goes into investigation. [pause] [confident] Aiden starts investigating the moment an alert fires. It correlates logs, metrics, and events across your dependencies. Then it scores every possible cause against the evidence — and even tries to prove itself wrong. [pause] Your team starts from a probable root cause, and M-T-T-R comes down."},
{"id":"T4","lines":["L10","L11","L12"],"frames":[13,14,15],"chosen":null,"markup":"[matter-of-fact] Even with the cause in hand, the fix is often manual. [pause] [confident] Aiden runs the remediation, from restarting a service or scaling out, to rerouting traffic or rolling back a deployment. Your team sets which actions need approval, and every action goes into a full audit trail. [short pause] [warmly] Incidents close faster… and your team stays in control of what runs."},
{"id":"T5","lines":["L13","L15","L16"],"frames":[16,18,19],"chosen":null,"markup":"[thoughtful] And it keeps learning. Every investigation adds to what Aiden knows about your environment, so the next incident starts further ahead. [long pause] [confident] Aiden for SRE runs on the Aiden World Model — the shared record of what's deployed, what changed, what broke, and what fixed it. And Aiden OS holds every action to your policies. [pause] [warmly] See Aiden for SRE on your own alerts. Book a demo, or try the free Community Edition."}
]
```

- [ ] **Step 5: Write `data/el-video.json`**

```json
[
{"id":"A1","frames":[1],"length":5,"end_frame":null,"model":"bytedance-seedance-v2.5","fallbacks":["kling-3-pro","veo-3.1-generate-001"],"still_ref":"66:2","still_prompt":"Dark warm-black void with hundreds of tiny dim grey notification glints, a few coral sparks, faint violet and cyan light trails, shallow depth of field, cinematic photographic light.","prompt":"Slow push through a dark warm-black void. Hundreds of tiny notification glints stream past the camera like rain, most dim grey, a few coral, faint violet and cyan light trails. Shallow depth of field."},
{"id":"A2","frames":[4],"length":4,"end_frame":5,"model":"bytedance-seedance-v2.5","fallbacks":["kling-3-pro","veo-3.1-generate-001"],"still_ref":"66:30","still_prompt":"Neon violet and cyan light ribbons loosely bundled in warm-black space, soft bloom, cinematic.","prompt":"Neon violet and cyan light ribbons bundle and converge toward the centre, braiding into a single rectangular glow that settles where a floating panel will appear."},
{"id":"A3","frames":[8],"length":4,"end_frame":9,"model":"bytedance-seedance-v2.5","fallbacks":["kling-3-pro","veo-3.1-generate-001"],"still_ref":"58:2","still_prompt":"Swirl of fine particles in warm-black space with a faint coral core, cinematic depth.","prompt":"Swirling particles collapse inward and condense into one bright coral point, camera slowly pushing in, background warm black."},
{"id":"A4","frames":[12],"length":4,"end_frame":13,"model":"bytedance-seedance-v2.5","fallbacks":["kling-3-pro","veo-3.1-generate-001"],"still_ref":"66:49","still_prompt":"A coral wave of light across a dark warm-black field, soft ribbons, cinematic.","prompt":"A coral wave of light sweeps across a dark field and reverses into a calm green front, ribbons smoothing out."},
{"id":"A5","frames":[17,18],"length":16,"end_frame":null,"model":"bytedance-seedance-v2.5","fallbacks":["kling-3-pro","veo-3.1-generate-001"],"still_ref":"66:76","still_prompt":"Layered translucent planes of light records stacked in depth with thin connecting lines, warm black, violet and cyan accents.","prompt":"Layered translucent planes of light records stacked in depth, lines connecting nodes between layers, camera slowly orbiting, warm black with violet and cyan accents."},
{"id":"A6","frames":[19,20],"length":11,"end_frame":null,"model":"bytedance-seedance-v2.5","fallbacks":["kling-3-pro","veo-3.1-generate-001"],"still_ref":"66:92","still_prompt":"Calm violet and cyan light ribbons drifting in parallel in warm-black space, cinematic.","prompt":"Calm violet and cyan light ribbons drifting slowly in a warm-black space, settling into gentle parallel flow."}
]
```
The spec §8 global suffix is appended at generation time (T15/T19), not stored here.

- [ ] **Step 6: Write `data/sfx.json`**

```json
[
{"id":"ui-click","prompt":"single soft modern UI mouse click, close, dry","duration":0.5,"loop":false},
{"id":"soft-tick","prompt":"very soft tick, subtle interface feedback","duration":0.5,"loop":false},
{"id":"row-tick","prompt":"quick light tick of a list row appearing, airy","duration":0.5,"loop":false},
{"id":"whoosh-short","prompt":"short clean whoosh, camera whip, no rumble","duration":0.6,"loop":false},
{"id":"whoosh-long","prompt":"long smooth cinematic whoosh passing by","duration":1.5,"loop":false},
{"id":"impact-low","prompt":"deep soft cinematic low impact, tight tail","duration":1.5,"loop":false},
{"id":"kinetic-slam","prompt":"punchy title text slam, short transient, subtle sub","duration":0.8,"loop":false},
{"id":"alert-ping","prompt":"small distant notification ping, slightly tense","duration":0.6,"loop":false},
{"id":"slack-pop","prompt":"gentle chat message pop notification","duration":0.5,"loop":false},
{"id":"clock-tick","prompt":"quiet mechanical clock ticking, steady","duration":2.0,"loop":true},
{"id":"bar-riser","prompt":"short airy riser as a progress bar fills","duration":1.2,"loop":false},
{"id":"strike","prompt":"crisp short pen strike-through swish","duration":0.5,"loop":false},
{"id":"approve-chime","prompt":"warm short two-note approval chime in D minor","duration":1.0,"loop":false},
{"id":"resolve-chime","prompt":"soft satisfying resolve chime in D major, gentle","duration":1.5,"loop":false},
{"id":"data-whoosh","prompt":"soft digital data whoosh with sparkle tail","duration":1.0,"loop":false},
{"id":"sub-swell","prompt":"slow deep sub bass swell rising, cinematic","duration":3.0,"loop":false},
{"id":"logo-sting","prompt":"elegant short logo sting, soft synth bloom in D","duration":2.5,"loop":false},
{"id":"keyboard-clatter","prompt":"tired slow typing on a laptop keyboard, close","duration":3.0,"loop":false},
{"id":"room-tone","prompt":"quiet treated studio room tone, very low, no hum","duration":10.0,"loop":true}
]
```
If the score's key (G1c) is not D, update the three pitched prompts (`approve-chime`, `resolve-chime`, `logo-sting`) before T14.

- [ ] **Step 7: Run the test**

Run: `python3 -m pytest tests/test_data_contract.py -q`
Expected: `6 passed`.

---

### Task 3: Markup check and take splitter

**Files:**
- Create: `scripts/check_markup.py`, `scripts/split_takes.py`
- Test: `tests/test_check_markup.py`, `tests/test_split_takes.py`

**Interfaces:**
- `check_markup.words(s, ipa=None) -> list[str]`; `check_markup.check(takes, lines) -> list[str]` (failing take ids).
- `split_takes.load_words(path) -> list[{text,start,end}]` (accepts `[{text|word,start,end}]`, `{"words":[…]}`, `{"segments":[{"words":[…]}]}`).
- `split_takes.segments(words, line_texts, take_dur) -> list[(start, end, words)]`; `split_takes.match_ratio(words, line_texts) -> float`.
- CLI `split_takes.py` reads `data/takes.json`, `source/lines.json`, `assets/audio/vo/takes/Tn.wav`, `assets/audio/vo/takes/Tn.transcript.json`; writes `assets/audio/vo/Lxx.wav`, `Lxx.words.json`, `data/vo_report.json`.

- [ ] **Step 1: Write failing tests**

`tests/test_check_markup.py`:

```python
from check_markup import check, words


def test_tags_respellings_and_punctuation_are_ignored():
    assert words("[warmly] Your team — M-T-T-R… comes DOWN.") == ["your", "team", "mttr", "comes", "down"]


def test_check_flags_changed_words():
    lines = {"L01": "One failure can set off a flood of alerts."}
    good = [{"id": "T", "lines": ["L01"], "markup": "[measured] One failure can set off a flood of alerts."}]
    bad = [{"id": "T", "lines": ["L01"], "markup": "One failure sets off a flood of alerts."}]
    assert check(good, lines) == []
    assert check(bad, lines) == ["T"]


def test_ipa_map_restores_word():
    lines = {"L01": "Meet Aiden for SRE."}
    t = [{"id": "T", "lines": ["L01"], "markup": "Meet /ˈeɪdən/ for S-R-E.", "ipa": {"/ˈeɪdən/": "Aiden"}}]
    assert check(t, lines) == []
```

`tests/test_split_takes.py`:

```python
import pytest
from split_takes import LEAD_MAX, TAIL, match_ratio, segments


def w(text, s, e):
    return {"text": text, "start": s, "end": e}


WORDS = [w("One", 0.30, 0.50), w("failure.", 0.55, 0.95), w("Aiden", 1.60, 1.90), w("triages.", 1.95, 2.40)]
LINES = ["One failure.", "Aiden triages."]


def test_cut_at_mid_silence_and_edges():
    segs = segments(WORDS, LINES, take_dur=3.0)
    assert segs[0][0] == pytest.approx(0.30 - LEAD_MAX)
    assert segs[0][1] == pytest.approx((0.95 + 1.60) / 2)
    assert segs[1][0] == segs[0][1]
    assert segs[1][1] == pytest.approx(2.40 + TAIL)
    assert [x["text"] for x in segs[1][2]] == ["Aiden", "triages."]


def test_tail_clamped_to_take_duration():
    assert segments(WORDS, LINES, take_dur=2.5)[1][1] == pytest.approx(2.5)


def test_asr_variant_still_aligns():
    words = WORDS[:2] + [w("Aidan", 1.60, 1.90), WORDS[3]]
    segs = segments(words, LINES, take_dur=3.0)
    assert [x["text"] for x in segs[1][2]] == ["Aidan", "triages."]
    assert match_ratio(words, LINES) == pytest.approx(0.75)


def test_missing_line_raises():
    with pytest.raises(ValueError):
        segments(WORDS[:2], LINES, take_dur=3.0)
```

- [ ] **Step 2: Run to verify they fail**

Run: `python3 -m pytest tests/test_check_markup.py tests/test_split_takes.py -q`
Expected: FAIL with `ModuleNotFoundError: No module named 'check_markup'`.

- [ ] **Step 3: Implement `scripts/check_markup.py`**

```python
#!/usr/bin/env python3
"""Spoken markup in data/takes.json must reduce to the locked words in source/lines.json.
Usage: check_markup.py   (exit 1 on any mismatch)"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESPELL = {"M-T-T-R": "MTTR", "S-R-E": "SRE"}


def strip_markup(s, ipa=None):
    for k, v in (ipa or {}).items():
        s = s.replace(k, v)
    s = re.sub(r"\[[^\]]*\]", " ", s)
    for k, v in RESPELL.items():
        s = s.replace(k, v)
    return s


def words(s, ipa=None):
    return re.sub(r"[^a-z0-9' ]+", " ", strip_markup(s, ipa).lower()).split()


def check(takes, lines):
    bad = []
    for t in takes:
        expected = words(" ".join(lines[l] for l in t["lines"]))
        if words(t["markup"], t.get("ipa")) != expected:
            bad.append(t["id"])
    return bad


if __name__ == "__main__":
    takes = json.loads((ROOT / "data/takes.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / "source/lines.json").read_text())}
    bad = check(takes, lines)
    print("markup OK" if not bad else "markup changes words in: " + ", ".join(bad))
    sys.exit(1 if bad else 0)
```

- [ ] **Step 4: Implement `scripts/split_takes.py`**

```python
#!/usr/bin/env python3
"""Split chosen scene takes into per-line wavs at the midpoint of the silence between lines.
Usage: split_takes.py [T1 T2 ...]   (default: every take in data/takes.json)"""
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VO = ROOT / "assets/audio/vo"
LEAD_MAX = 0.12
TAIL = 0.35
FADE = 0.015


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def load_words(path):
    data = json.loads(Path(path).read_text())
    if isinstance(data, dict):
        if "words" in data:
            data = data["words"]
        elif "segments" in data:
            data = [x for seg in data["segments"] for x in seg.get("words", [])]
    out = []
    for x in data:
        text = (x.get("text") or x.get("word") or "").strip()
        if norm(text):
            out.append({"text": text, "start": float(x["start"]), "end": float(x["end"])})
    return out


def _owners(words, line_texts):
    ref, owner = [], []
    for k, t in enumerate(line_texts):
        for tok in t.split():
            if norm(tok):
                ref.append(norm(tok))
                owner.append(k)
    hyp = [norm(x["text"]) for x in words]
    sm = difflib.SequenceMatcher(a=ref, b=hyp, autojunk=False)
    own = [None] * len(hyp)
    matched = 0
    for a0, b0, n in sm.get_matching_blocks():
        for j in range(n):
            own[b0 + j] = owner[a0 + j]
        matched += n
    hits = [j for j, o in enumerate(own) if o is not None]
    if not hits:
        raise ValueError("transcript shares no words with the lines")
    for j in range(hits[0]):
        own[j] = own[hits[0]]
    for j in range(hits[-1] + 1, len(own)):
        own[j] = own[hits[-1]]
    for a, b in zip(hits, hits[1:]):
        if b - a <= 1:
            continue
        oa, ob = own[a], own[b]
        if oa == ob:
            cut = b
        else:
            # unmatched words between two lines split at the longest silence
            cut = max(range(a, b), key=lambda j: words[j + 1]["start"] - words[j]["end"])
        for j in range(a + 1, b):
            own[j] = oa if j <= cut else ob
    return own, matched / max(len(ref), 1)


def match_ratio(words, line_texts):
    return _owners(words, line_texts)[1]


def segments(words, line_texts, take_dur):
    own, _ = _owners(words, line_texts)
    groups = []
    for k in range(len(line_texts)):
        ws = [x for x, o in zip(words, own) if o == k]
        if not ws:
            raise ValueError("line " + str(k) + " has no transcript words; re-check the take")
        groups.append(ws)
    out = []
    for k, ws in enumerate(groups):
        start = max(0.0, ws[0]["start"] - LEAD_MAX) if k == 0 else out[-1][1]
        if k + 1 < len(groups):
            end = (ws[-1]["end"] + groups[k + 1][0]["start"]) / 2
        else:
            end = min(take_dur, ws[-1]["end"] + TAIL)
        out.append((start, end, ws))
    return out


def duration(path):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)]))


def cut(src, start, end, dst):
    d = end - start
    fades = "afade=t=in:d=" + str(FADE) + ",afade=t=out:st=" + str(round(max(d - FADE, 0), 3)) + ":d=" + str(FADE)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(src), "-ss", str(round(start, 3)), "-to", str(round(end, 3)),
                    "-af", fades, "-ar", "48000", "-c:a", "pcm_s24le", str(dst)], check=True)


def main(argv):
    takes = json.loads((ROOT / "data/takes.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / "source/lines.json").read_text())}
    report_path = ROOT / "data/vo_report.json"
    report = json.loads(report_path.read_text()) if report_path.exists() else {}
    want = set(argv) or {t["id"] for t in takes}
    for t in takes:
        if t["id"] not in want:
            continue
        wav = VO / "takes" / (t["id"] + ".wav")
        words = load_words(VO / "takes" / (t["id"] + ".transcript.json"))
        texts = [lines[l] for l in t["lines"]]
        ratio = match_ratio(words, texts)
        for lid, (s, e, ws) in zip(t["lines"], segments(words, texts, duration(wav))):
            dst = VO / (lid + ".wav")
            cut(wav, s, e, dst)
            rebased = [{"id": "w" + str(i), "text": x["text"], "start": round(x["start"] - s, 3), "end": round(x["end"] - s, 3)}
                       for i, x in enumerate(ws)]
            if rebased[-1]["end"] > duration(dst) + 0.01:
                sys.exit(lid + ": last word ends after file end")
            (VO / (lid + ".words.json")).write_text(json.dumps(rebased, indent=1))
        report[t["id"]] = {"match_ratio": round(ratio, 3)}
        print(t["id"], len(t["lines"]), "lines, match", round(ratio, 3))
    report_path.write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main(sys.argv[1:])
```

- [ ] **Step 5: Run tests**

Run: `python3 -m pytest tests/test_check_markup.py tests/test_split_takes.py -q && python3 scripts/check_markup.py`
Expected: `7 passed` and `markup OK`.

---

### Task 4: Timing and bridge fitting

**Files:**
- Create: `scripts/build_timing.py`, `scripts/fit_bridges.py`
- Test: `tests/test_build_timing.py`, `tests/test_fit_bridges.py`

**Interfaces:**
- `build_timing.layout(frames, vo, bridge_durs=None) -> {"total", "frames": [{frame, id, slug, line, start, dur, snap, cues:[{text, local, t}], hits:[{label, t}]}]}`; `vo = {Lxx: {"duration": float, "words": [{text,start,end}]}}`; `bridge_durs = {"<frame>": seconds}`.
- `build_timing.audio_meta(timing, vo, bed_path) -> dict` (product-launch-video `audio_meta.json` shape).
- `build_timing.patch_storyboard(md, timing) -> str`; `build_timing.spotting(timing) -> [{label, t}]`.
- CLI `build_timing.py voice` → `data/timing.voice.json`, `data/spotting.json`; `build_timing.py lock` → `data/timing.json` (+ `music_offset`), `audio_meta.json`, patched `STORYBOARD.md`.
- `fit_bridges.fit(frames, voice_timing, grid, phrases, final_hit=None) -> {"bridges", "log", "total"}` with `grid = {"beats_sec", "downbeats_sec"}` in film time.
- CLI `fit_bridges.py --offset S [--final-hit S]` reads `audiomap.json` (`grid.downbeats_sec`, `grid.beats_sec`, `phrases[].start`), writes `data/fit.json`.

- [ ] **Step 1: Write failing tests**

`tests/test_build_timing.py`:

```python
import pytest
from build_timing import audio_meta, layout, patch_storyboard, spotting

FRAMES = [
    {"frame": 1, "id": "F01", "slug": "a", "line": None, "est": 3.0, "flex": [2.5, 4.0], "snap": False,
     "ost": [{"text": "EYEBROW", "word": None}], "hits": [{"label": "scene", "at": "start"}]},
    {"frame": 2, "id": "F02", "slug": "b", "line": "L01", "est": 5.0, "flex": None, "snap": True,
     "ost": [{"text": "Groups", "word": "groups"}], "hits": [{"label": "g", "word": "groups"}]},
    {"frame": 3, "id": "F03", "slug": "c", "line": None, "est": 2.0, "flex": [1.5, 3.0], "snap": False,
     "ost": [], "hits": [{"label": "end", "at": "end"}]},
]
VO = {"L01": {"duration": 4.0, "words": [{"text": "It", "start": 0.1, "end": 0.2}, {"text": "groups,", "start": 0.3, "end": 0.7}]}}


def test_layout_uses_vo_duration_and_bridge_override():
    t = layout(FRAMES, VO, {"1": 2.6})
    assert [f["start"] for f in t["frames"]] == [0.0, 2.6, 6.6]
    assert t["total"] == pytest.approx(8.6)
    assert t["frames"][1]["cues"] == [{"text": "Groups", "local": 0.3, "t": 2.9}]


def test_hits_start_word_end():
    t = layout(FRAMES, VO)
    assert spotting(t) == [{"label": "scene", "t": 0.0}, {"label": "g", "t": 3.3}, {"label": "end", "t": 9.0}]


def test_audio_meta_shape():
    t = layout(FRAMES, VO)
    m = audio_meta(t, VO, "assets/audio/music/bed.fit.wav")
    assert m["voices"][0]["frame"] == 2 and m["voices"][0]["path"] == "assets/audio/vo/L01.wav"
    assert m["voices"][0]["duration_s"] == 4.0
    assert m["voices"][0]["words"][1] == {"id": "w1", "text": "groups,", "start": 0.3, "end": 0.7}
    assert m["bgm"]["path"] == "assets/audio/music/bed.fit.wav" and m["bgm_pending"] is False


def test_patch_storyboard_durations():
    md = "## Frame 1 — A\n- duration: 3s\n\n## Frame 2 — B\n- duration: 5s\n"
    out = patch_storyboard(md, layout(FRAMES, VO, {"1": 2.6}))
    assert "- duration: 2.6s" in out and "- duration: 4.0s" in out
```

`tests/test_fit_bridges.py`:

```python
import pytest
from fit_bridges import fit

FRAMES = [
    {"frame": 1, "line": None, "est": 3.0, "flex": [2.5, 4.0], "snap": False},
    {"frame": 2, "line": "L01", "est": 5.0, "flex": None, "snap": True},
    {"frame": 3, "line": None, "est": 2.4, "flex": [1.8, 3.2], "snap": False},
    {"frame": 4, "line": "L02", "est": 4.0, "flex": None, "snap": True},
    {"frame": 5, "line": None, "est": 3.0, "flex": [2.5, 4.5], "snap": False},
]
VOICE = {"frames": [{"frame": 2, "dur": 5.0}, {"frame": 4, "dur": 4.0}]}
BAR = 2.5
GRID = {"downbeats_sec": [i * BAR for i in range(12)], "beats_sec": [i * BAR / 4 for i in range(48)]}
PHRASES = [{"start": 0.0}, {"start": 10.0}, {"start": 20.0}]


def test_snaps_entries_to_downbeats_and_prefers_phrases():
    r = fit(FRAMES, VOICE, GRID, PHRASES, final_hit=16.0)
    assert r["bridges"] == {"1": 2.5, "3": 2.5, "5": 2.5}
    assert r["total"] == pytest.approx(16.5)
    assert r["log"][1]["kind"] == "phrase"


def test_falls_back_to_beat_when_no_downbeat_in_range():
    grid = {"downbeats_sec": [0.0, 10.0], "beats_sec": [i * 0.625 for i in range(40)]}
    r = fit(FRAMES[:2], VOICE, grid, [], final_hit=None)
    assert r["log"][0]["kind"] == "beat"
    assert 2.5 <= r["bridges"]["1"] <= 4.0
```

- [ ] **Step 2: Run to verify they fail**

Run: `python3 -m pytest tests/test_build_timing.py tests/test_fit_bridges.py -q`
Expected: FAIL with `ModuleNotFoundError`.

- [ ] **Step 3: Implement `scripts/build_timing.py`**

```python
#!/usr/bin/env python3
"""Film timing.
  build_timing.py voice  -> data/timing.voice.json + data/spotting.json (bridges at estimate)
  build_timing.py lock   -> data/timing.json + audio_meta.json (+ STORYBOARD.md durations) using data/fit.json"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VO = ROOT / "assets/audio/vo"


def norm(w):
    return re.sub(r"[^a-z0-9%]", "", w.lower())


def find_word(words, anchor):
    a = norm(anchor)
    for w in words:
        if norm(w["text"]).startswith(a):
            return w
    raise KeyError("anchor not found: " + anchor)


def layout(frames, vo, bridge_durs=None):
    bridge_durs = bridge_durs or {}
    t, out = 0.0, []
    for f in frames:
        v = vo[f["line"]] if f["line"] else None
        dur = v["duration"] if v else bridge_durs.get(str(f["frame"]), f["est"])

        def at(word):
            return 0.0 if word is None else find_word(v["words"], word)["start"]

        cues = [{"text": c["text"], "local": round(at(c.get("word")), 3), "t": round(t + at(c.get("word")), 3)}
                for c in f.get("ost", [])]
        hits = []
        for h in f.get("hits", []):
            local = dur if h.get("at") == "end" else 0.0 if h.get("at") == "start" else at(h["word"])
            hits.append({"label": h["label"], "t": round(t + local, 3)})
        out.append({"frame": f["frame"], "id": f["id"], "slug": f["slug"], "line": f["line"], "start": round(t, 3),
                    "dur": round(dur, 3), "snap": bool(f.get("snap")), "cues": cues, "hits": hits})
        t = round(t + dur, 3)
    return {"total": t, "frames": out}


def spotting(timing):
    return [h for f in timing["frames"] for h in f["hits"]]


def audio_meta(timing, vo, bed_path):
    voices = []
    for f in timing["frames"]:
        if f["line"]:
            ws = vo[f["line"]]["words"]
            voices.append({"frame": f["frame"], "path": "assets/audio/vo/" + f["line"] + ".wav", "duration_s": f["dur"],
                           "words": [{"id": "w" + str(i), "text": w["text"], "start": w["start"], "end": w["end"]}
                                     for i, w in enumerate(ws)]})
    bgm = {"path": bed_path, "volume": 0.5, "query": None, "duration_s": timing["total"]}
    return {"bgm": bgm, "bgm_pending": False, "voices": voices, "sfx": []}


def patch_storyboard(md, timing):
    durs = {f["frame"]: f["dur"] for f in timing["frames"]}
    parts = re.split(r"(?m)^(?=#{2,3} Frame )", md)
    out = []
    for p in parts:
        m = re.match(r"#{2,3} Frame (\d+)", p)
        if m and int(m.group(1)) in durs:
            new = str(durs[int(m.group(1))]) + "s"
            p = re.sub(r"(?m)^(- duration:\s*)\S+", lambda mm: mm.group(1) + new, p, count=1)
        out.append(p)
    return "".join(out)


def duration(path):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)]))


def load_vo(frames):
    vo = {}
    for f in frames:
        if f["line"]:
            vo[f["line"]] = {"duration": round(duration(VO / (f["line"] + ".wav")), 3),
                             "words": json.loads((VO / (f["line"] + ".words.json")).read_text())}
    return vo


def main(mode):
    frames = json.loads((ROOT / "data/frames.json").read_text())
    vo = load_vo(frames)
    if mode == "voice":
        t = layout(frames, vo)
        (ROOT / "data/timing.voice.json").write_text(json.dumps(t, indent=1))
        (ROOT / "data/spotting.json").write_text(json.dumps(spotting(t), indent=1))
        print("voice timing total", t["total"])
    elif mode == "lock":
        fit = json.loads((ROOT / "data/fit.json").read_text())
        t = layout(frames, vo, fit["bridges"])
        t["music_offset"] = fit["offset"]
        (ROOT / "data/timing.json").write_text(json.dumps(t, indent=1))
        meta = audio_meta(t, vo, "assets/audio/music/bed.fit.wav")
        (ROOT / "audio_meta.json").write_text(json.dumps(meta, indent=1))
        sb = ROOT / "STORYBOARD.md"
        if sb.exists():
            sb.write_text(patch_storyboard(sb.read_text(), t))
        print("LOCK total", t["total"])
    else:
        sys.exit("usage: build_timing.py voice|lock")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "")
```

- [ ] **Step 4: Implement `scripts/fit_bridges.py`**

```python
#!/usr/bin/env python3
"""Flex silent bridge frames so each snap frame starts on a music downbeat.
Usage: fit_bridges.py --offset SECONDS [--final-hit SECONDS]  -> data/fit.json
offset = seconds trimmed from the music head (music time = film time + offset)."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def fit(frames, voice_timing, grid, phrases, final_hit=None):
    vdur = {f["frame"]: f["dur"] for f in voice_timing["frames"]}
    pstarts = {round(p["start"], 3) for p in phrases}
    durs, log, t = {}, [], 0.0
    for i, f in enumerate(frames):
        if f["line"]:
            t = round(t + vdur[f["frame"]], 3)
            continue
        lo, hi = f["flex"]
        nxt = frames[i + 1] if i + 1 < len(frames) else None
        if nxt is None:
            target = final_hit + 0.5 if final_hit is not None else t + f["est"]
            d = min(max(target - t, lo), hi)
            log.append({"frame": f["frame"], "kind": "tail", "miss": round(t + d - target, 3)})
        elif not nxt.get("snap"):
            d = f["est"]
        else:
            window = [m for m in grid["downbeats_sec"] if lo <= m - t <= hi]
            pref = [m for m in window if round(m, 3) in pstarts]
            pool, kind = (pref, "phrase") if pref else (window, "downbeat")
            if not pool:
                pool = [m for m in grid["beats_sec"] if lo <= m - t <= hi]
                kind = "beat" if pool else "none"
            s = min(pool, key=lambda m: abs((m - t) - f["est"])) if pool else t + f["est"]
            d = s - t
            log.append({"frame": f["frame"], "next": nxt["frame"], "kind": kind, "start_next": round(s, 3)})
        d = round(d, 3)
        durs[str(f["frame"])] = d
        t = round(t + d, 3)
    return {"bridges": durs, "log": log, "total": t}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--offset", type=float, required=True)
    ap.add_argument("--final-hit", type=float, default=None, help="music-time seconds of the final hit")
    a = ap.parse_args()
    am = json.loads((ROOT / "audiomap.json").read_text())

    def shift(xs):
        return [round(x - a.offset, 3) for x in xs if x >= a.offset]

    grid = {"downbeats_sec": shift(am["grid"]["downbeats_sec"]), "beats_sec": shift(am["grid"]["beats_sec"])}
    phrases = [{"start": round(p["start"] - a.offset, 3)} for p in am.get("phrases", []) if p["start"] >= a.offset]
    final = a.final_hit - a.offset if a.final_hit is not None else None
    frames = json.loads((ROOT / "data/frames.json").read_text())
    voice = json.loads((ROOT / "data/timing.voice.json").read_text())
    r = fit(frames, voice, grid, phrases, final)
    r["offset"] = a.offset
    (ROOT / "data/fit.json").write_text(json.dumps(r, indent=1))
    for row in r["log"]:
        print(row)
    print("fit total", r["total"])


if __name__ == "__main__":
    main()
```

- [ ] **Step 5: Run tests**

Run: `python3 -m pytest tests/test_build_timing.py tests/test_fit_bridges.py -q`
Expected: `6 passed`.

---

### Task 5: QA scripts, finish, fetch

**Files:**
- Create: `scripts/qa_motion.py`, `scripts/qa_loudness.py`, `scripts/finish.sh`, `scripts/el_fetch.py`
- Test: `tests/test_qa.py`

**Interfaces:**
- `qa_motion.parse_ydif(text)`, `qa_motion.windows(series, win=1.0)`, `qa_motion.parse_freezes(stderr)`. CLI `qa_motion.py VIDEO [--calibrate]` (calibrate writes `data/qa.json {"motion_floor"}`; check exits 1 on any freeze or low window).
- `qa_loudness.parse(stderr) -> {"I", "TP"}`. CLI `qa_loudness.py FILE [--vo]`.
- CLI `el_fetch.py URL OUT --meta JSON` (downloads; converts to 48 kHz/24-bit wav if `OUT` ends `.wav`; writes `<OUT stem>.json` provenance).

- [ ] **Step 1: Write failing tests**

```python
from qa_loudness import parse
from qa_motion import parse_freezes, parse_ydif, windows

YDIF = """frame:0    pts:0       pts_time:0
lavfi.signalstats.YDIF=0.000000
frame:1    pts:1       pts_time:0.5
lavfi.signalstats.YDIF=2.000000
frame:2    pts:2       pts_time:1.0
lavfi.signalstats.YDIF=4.000000
frame:3    pts:3       pts_time:1.5
lavfi.signalstats.YDIF=6.000000
frame:4    pts:4       pts_time:2.0
lavfi.signalstats.YDIF=1.000000
"""

EBU = """[Parsed_ebur128_0 @ 0x1] Summary:

  Integrated loudness:
    I:         -14.3 LUFS
    Threshold: -24.6 LUFS

  True peak:
    Peak:       -1.4 dBFS
"""


def test_parse_ydif():
    assert parse_ydif(YDIF)[2] == (1.0, 4.0)


def test_windows_drop_short_tail():
    assert windows(parse_ydif(YDIF)) == [(0.0, 1.0), (1.0, 5.0)]


def test_parse_freezes():
    err = "[freezedetect @ 0x1] lavfi.freezedetect.freeze_start: 12.5\n[freezedetect @ 0x1] lavfi.freezedetect.freeze_start: 40"
    assert parse_freezes(err) == [12.5, 40.0]


def test_parse_loudness():
    assert parse(EBU) == {"I": -14.3, "TP": -1.4}
```

- [ ] **Step 2: Run to verify fail**

Run: `python3 -m pytest tests/test_qa.py -q` → FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement `scripts/qa_motion.py`**

```python
#!/usr/bin/env python3
"""Spec M1 (no freezes) and M2 (motion floor per 1 s window).
Usage: qa_motion.py VIDEO [--calibrate]"""
import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QA = ROOT / "data/qa.json"


def parse_ydif(text):
    out, t = [], None
    for line in text.splitlines():
        m = re.search(r"pts_time:([\d.]+)", line)
        if m:
            t = float(m.group(1))
            continue
        m = re.search(r"lavfi\.signalstats\.YDIF=([\d.]+)", line)
        if m and t is not None:
            out.append((t, float(m.group(1))))
    return out


def windows(series, win=1.0):
    b = defaultdict(list)
    for t, v in series:
        b[int(t // win)].append(v)
    if not b:
        return []
    n_max = max(len(v) for v in b.values())
    return [(k * win, sum(v) / len(v)) for k, v in sorted(b.items()) if len(v) > n_max / 2]


def parse_freezes(stderr):
    return [float(x) for x in re.findall(r"freeze_start: ([\d.]+)", stderr)]


def measure(video):
    y = subprocess.run(["ffmpeg", "-hide_banner", "-i", video, "-vf",
                        "signalstats,metadata=print:key=lavfi.signalstats.YDIF:file=-", "-an", "-f", "null", "-"],
                       capture_output=True, text=True, check=True).stdout
    f = subprocess.run(["ffmpeg", "-hide_banner", "-i", video, "-vf", "freezedetect=n=-60dB:d=0.5", "-an", "-f", "null", "-"],
                       capture_output=True, text=True, check=True).stderr
    return windows(parse_ydif(y)), parse_freezes(f)


def main(argv):
    video, calibrate = argv[0], "--calibrate" in argv
    wins, freezes = measure(video)
    if calibrate:
        floor = round(0.6 * min(v for _, v in wins), 4)
        QA.write_text(json.dumps({"motion_floor": floor, "calibrated_on": video}, indent=1))
        print("motion_floor =", floor)
        return 0
    floor = json.loads(QA.read_text())["motion_floor"]
    low = [(t, round(v, 4)) for t, v in wins if v < floor]
    print("windows", len(wins), "floor", floor, "below", len(low), "freezes", len(freezes))
    for t, v in low:
        print("  low motion at", t, "s:", v)
    for t in freezes:
        print("  freeze at", t, "s")
    return 1 if low or freezes else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 4: Implement `scripts/qa_loudness.py`**

```python
#!/usr/bin/env python3
"""Loudness check (spec §9.4). Usage: qa_loudness.py FILE [--vo]"""
import re
import subprocess
import sys


def parse(stderr):
    i = re.findall(r"I:\s+(-?[\d.]+) LUFS", stderr)
    tp = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", stderr)
    return {"I": float(i[-1]), "TP": float(tp[-1])}


def main(argv):
    path, vo = argv[0], "--vo" in argv
    err = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True, check=True).stderr
    r = parse(err)
    target = -16.0 if vo else -14.0
    ok = abs(r["I"] - target) <= 1.0 and (vo or r["TP"] <= -1.0)
    print("I", r["I"], "LUFS (target", target, "±1), TP", r["TP"], "dBTP ->", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 5: Implement `scripts/finish.sh`**

```bash
#!/usr/bin/env bash
# Finish the HyperFrames master (spec §10.3). Grain + vignette only; audio passes through.
set -euo pipefail
cd "$(dirname "$0")/.."
IN=renders/film.mov
ffmpeg -loglevel error -y -i "$IN" -vf "vignette=angle=PI/5:mode=backward,noise=c0s=5:c0f=t+u,format=yuv422p10le" \
  -c:v prores_ks -profile:v 3 -c:a pcm_s24le renders/aiden-sre-launch-prores.mov
ffmpeg -loglevel error -y -i renders/aiden-sre-launch-prores.mov -c:v libx264 -profile:v high -preset slow -crf 16 \
  -pix_fmt yuv420p -c:a aac -b:a 320k -movflags +faststart renders/aiden-sre-launch.mp4
ffmpeg -loglevel error -y -i renders/aiden-sre-launch-prores.mov -vf "tmix=frames=2,fps=30" -c:v libx264 -profile:v high \
  -preset slow -crf 16 -pix_fmt yuv420p -c:a aac -b:a 320k -movflags +faststart renders/aiden-sre-launch-30.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name,r_frame_rate -show_entries format=duration -of compact renders/aiden-sre-launch.mp4
```

- [ ] **Step 6: Implement `scripts/el_fetch.py`**

```python
#!/usr/bin/env python3
"""Freeze one ElevenLabs MCP generation locally with provenance.
Usage: el_fetch.py URL OUT --meta '{"flow_id":..,"node_id":..,"generation_id":..,"model_id":..,"prompt":..}'"""
import argparse
import json
import subprocess
import tempfile
import urllib.request
from pathlib import Path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("out")
    ap.add_argument("--meta", required=True)
    a = ap.parse_args()
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        with urllib.request.urlopen(a.url, timeout=300) as r:
            tmp.write(r.read())
    if out.suffix == ".wav":
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-ar", "48000", "-c:a", "pcm_s24le", str(out)], check=True)
    else:
        Path(tmp.name).replace(out)
    meta = json.loads(a.meta)
    meta["source_url_host"] = a.url.split("/")[2]
    out.with_suffix(".json").write_text(json.dumps(meta, indent=1))
    print(out)


if __name__ == "__main__":
    main()
```

- [ ] **Step 7: Run tests, make executable**

Run: `chmod +x scripts/*.py scripts/finish.sh && python3 -m pytest tests -q`
Expected: all tests in Tasks 2–5 pass (`23 passed`).

- [ ] **Step 8: Commit Wave 0 (orchestrator, after review)**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
git add videos/aiden-sre-launch/data videos/aiden-sre-launch/scripts videos/aiden-sre-launch/tests
git commit -m "feat(aiden-sre-launch): data contract, take splitter, timing lock, bridge fitter, QA scripts"
```

---

## Wave 1

### Task 6: Figma product components (frames 01–06)

**Files:**
- Create: `compositions/components/*` (via CLI), `.media/*`, `source/figma/*.png`, `data/components.json`, `NOTES.md` section "Figma fidelity"

**Interfaces:**
- Produces `data/components.json`: `{"<nodeId>": "compositions/components/<dir>"}` (worker writes it here; orchestrator owns it afterwards).

- [ ] **Step 1: Tokens, components, ground-truth stills** (from `videos/aiden-sre-launch/`; `.env` supplies `FIGMA_TOKEN`)

```bash
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
npx --yes hyperframes@0.8.103 figma tokens zpQTgAfsrkN6PI3eTHOb5p
for n in 48:2 51:2 54:2 58:2 61:2 64:2; do npx --yes hyperframes@0.8.103 figma component "zpQTgAfsrkN6PI3eTHOb5p:$n"; done
npx --yes hyperframes@0.8.103 figma asset 'zpQTgAfsrkN6PI3eTHOb5p:48-2' 'zpQTgAfsrkN6PI3eTHOb5p:51-2' 'zpQTgAfsrkN6PI3eTHOb5p:54-2' 'zpQTgAfsrkN6PI3eTHOb5p:58-2' --format png --scale 2 --description "Aiden SRE ground-truth frame"
npx --yes hyperframes@0.8.103 figma asset 'zpQTgAfsrkN6PI3eTHOb5p:61-2' 'zpQTgAfsrkN6PI3eTHOb5p:64-2' --format png --scale 2 --description "Aiden SRE ground-truth frame"
```
`tokens` on a non-Enterprise plan degrades to published styles; expected (note it). Copy the frozen PNGs to `source/figma/<node with - for :>.png`.

- [ ] **Step 2: Fidelity self-check per component** (mandatory per `figma` skill): render each component fragment, compare with its PNG; record text drift px and any `data-figma-unresolved` flags. Report drift; never silently hand-tweak.

- [ ] **Step 3: Fix the frame-04 artefact** in the `58:2` component: the "Triage so far" timeline renders one line per entry (the capture overlaps timestamps). The only permitted content edit; log it.

- [ ] **Step 4: Verify**

```bash
ls compositions/components | wc -l
PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 lint
```
Expected: ≥ 6 component dirs; 0 lint errors; `data/components.json` lists all six nodes.

### Task 7: Figma layout frames and missing beats

**Files:** as Task 6, for nodes `66:2 66:27 66:30 66:49 66:56 66:70 66:73 66:76 66:87 66:92 76:2 80:2 99:3 99:36 99:93 99:100`; append to `data/components.json`.

- [ ] **Step 1:** `figma component` per node; `figma asset … --format svg --entity "<name>"` for every logo/icon vector inside them (`--entity "StackGen"` for the wordmark).
- [ ] **Step 2:** Fidelity check as Task 6.
- [ ] **Step 3:** Verify lint 0 errors; every node in `data/components.json`.

### Task 7b: Official vendor logos for F03 (worker)

**Files:** Create `shared/logos/vendors/{datadog,grafana,prometheus,new-relic,pagerduty,aws,google-cloud,microsoft-azure}.svg`, `shared/logos/vendors/SOURCES.md`

**Interfaces:** Produces one official full-color SVG per vendor at the path above; F03's worker reads only these files.

- [ ] **Step 1:** Read `company-logos` for the lookup procedure, but take every file from the vendor's own official brand / press / media kit page (not Simple Icons, not redraws, not the Figma file unless it is byte-identical to the official asset). Full-color primary logo, SVG.
- [ ] **Step 2:** For each vendor record in `SOURCES.md`: source page URL, download URL, date fetched, the guideline rules that apply on a dark film (minimum clear space, minimum size, no recolor, background requirements). Use the full-color logo on a small light tile (`#FAF7F2`, 0 px radius, clear space per guideline) so colors stay correct on the ink stage.
- [ ] **Step 3:** Verify each file is a valid SVG with the vendor's official colors (open it; compare against the brand page), then adopt via `media-use` with `--entity "<Vendor>"`.
- [ ] **Step 4:** Report any vendor whose guidelines forbid this use (for example co-branding or on-tile placement) so the orchestrator can ask the user before F03 is built.

### Task 8: Live interaction truth (orchestrator, Chrome DevTools MCP)

**Files:** Create `source/live/{alerts,act-now,investigation,recommended-action}.json`

- [ ] **Step 1:** `select_page` the logged-in stage tab. Never type credentials; on a login screen, stop and ask.
- [ ] **Step 2:** Per view (alerts list, Act now tab, investigation pop-up from the middle of a critical row, recommended action), `evaluate_script` to record: boxes of rows/cards/buttons the shots point at, CSS transition durations/easing for hover/click/open, scroll behaviour, exact copy. Read-only: no approve/ignore clicks.
- [ ] **Step 3:** Diff copy against the components; log differences in `NOTES.md`. Figma wins for pixels; live wins for motion timing.

### Task 9: Voice casting (orchestrator, ElevenLabs MCP) → Gate G1a

- [ ] **Step 1:** `creative_get_model_guide(model_id: eleven_v4)`; read `hyperframes-creative/references/narration.md`.
- [ ] **Step 2:** `creative_list_voices` (English; narration / documentary / conversational; mid-low; neutral US). Shortlist River (`SAz9YHcvj6GT2YYXdXww`, if in the workspace) + the best male and the best female Voice Library narrator (prefer Professional Voice Clones of real narrators). Record ids and descriptions in `NOTES.md`.
- [ ] **Step 3:** `creative_create_flow` "casting". Per voice: `creative_generate_speech(model_id: eleven_v4, voice_id, prompt: T3 markup, generations_count: 4, flow_id, estimate_only: true)`, then the real call once the estimate is within budget.
- [ ] **Step 4:** Poll `creative_get_flow_run_status`; `creative_show_flow_results` for the user. Download every variation with `scripts/el_fetch.py` to `assets/audio/vo/casting/<voice>-v<k>.mp3`.
- [ ] **Step 5: Gate G1a.** User picks the voice. Record `voice_id` in `NOTES.md` and on each take in `data/takes.json` (`"voice_id"`).

### Task 10: Narration takes (orchestrator) → Gate G1b

- [ ] **Step 1:** `python3 scripts/check_markup.py` → `markup OK`.
- [ ] **Step 2:** `creative_create_flow` "narration". For T1…T5: `creative_generate_speech(model_id: eleven_v4, voice_id: <G1a>, prompt: markup, generations_count: 4, flow_id)` after an estimate.
- [ ] **Step 3:** Download all variations to `assets/audio/vo/takes/Tn-v<k>.mp3` with provenance.
- [ ] **Step 4:** Pre-screen with rubric R1–R7 (spec §9.1); write one table per take in `NOTES.md` (variation × R1–R7 pass/fail + notes). Present passing variations with `creative_show_flow_results`.
- [ ] **Step 5: Gate G1b.** User picks one variation per take and runs the blind comparison against a 30 s GitLab reference excerpt (`source/reference/gitlab-vo-30s.wav`; cut with `yt-dlp -x` + ffmpeg if absent). A failing take is regenerated whole (never spliced).
- [ ] **Step 6:** Write chosen `generation_id`s to `data/takes.json` `chosen`; convert picks to `assets/audio/vo/takes/Tn.wav` (48 kHz 24-bit).

### Task 11: Transcribe, split, voice timing (worker)

**Files:** Create `assets/audio/vo/takes/Tn.transcript.json`, `assets/audio/vo/Lxx.wav`, `assets/audio/vo/Lxx.words.json`, `data/vo_report.json`, `data/timing.voice.json`, `data/spotting.json`

- [ ] **Step 1: Transcribe each take**

```bash
cd videos/aiden-sre-launch
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
for t in T1 T2 T3 T4 T5; do npx --yes hyperframes@0.8.103 transcribe assets/audio/vo/takes/$t.wav --json > assets/audio/vo/takes/$t.transcript.json; done
python3 -c "import json;d=json.load(open('assets/audio/vo/takes/T1.transcript.json'));print(type(d).__name__, str(d)[:300])"
```
If the shape is not one `load_words` accepts, add it to `load_words` with a test first, then continue.

- [ ] **Step 2: Split**

Run: `python3 scripts/split_takes.py`
Expected: five lines `Tn k lines, match 0.9xx`; every match ≥ 0.95. List each mismatched word in `NOTES.md` for the orchestrator's ear check.

- [ ] **Step 3: Voice timing**

Run: `python3 scripts/build_timing.py voice`
Expected: `voice timing total 1xx.xx`; `data/spotting.json` holds `scene-triage, title, counter-7, scene-rca, ruled-out, scene-remediation, approve, resolved, scene-platform, wordmark, end`.

- [ ] **Step 4: Seam check** — rebuild each take from its lines and listen for clicks:

```bash
ffmpeg -loglevel error -y -i assets/audio/vo/L03.wav -i assets/audio/vo/L04.wav -i assets/audio/vo/L05.wav -filter_complex "concat=n=3:v=0:a=1" /tmp/T2.cat.wav
python3 scripts/qa_loudness.py /tmp/T2.cat.wav --vo || true
```
Repeat for T1, T3, T4, T5. Report.

### Task 12: Score (orchestrator) → Gate G1c

- [ ] **Step 1:** `creative_get_model_guide(model_id: eleven_music_v2_5)`. Write the prompt from `data/spotting.json` per spec §9.2 step 3 (times as m:ss). `duration_seconds` = `timing.voice.json` total + 6.
- [ ] **Step 2:** `creative_create_flow` "score"; music node `eleven_music_v2_5`, `instrumental: true`, `lyrics_type: instrumental`, `duration_seconds`, `generations_count: 4` (estimate first).
- [ ] **Step 3:** Download to `assets/audio/music/M1-v<k>.mp3`. Build a narration bed once (all `Lxx.wav` at `timing.voice.json` starts via `adelay`, mixed to `/tmp/narration.voice.wav`), then per variation:

```bash
ffmpeg -loglevel error -y -i assets/audio/music/M1-v1.mp3 -i /tmp/narration.voice.wav -filter_complex "[0:a]volume=-14dB[m];[m][1:a]amix=inputs=2:normalize=0" /tmp/mix-v1.wav
```
- [ ] **Step 4: Gate G1c.** User picks the variation and the head offset (0–2 s). Save `assets/audio/music/bed.wav` (48 kHz 24-bit); record offset in `NOTES.md`. Fallback per spec §9.2 step 4 if nothing passes after two rounds.

### Task 13: Beat map, fit, LOCK (worker)

**Files:** Create `audiomap.json`, `data/fit.json`, `data/timing.json`, `audio_meta.json`, `assets/audio/music/bed.fit.wav`

- [ ] **Step 1: Beat map**

```bash
cd videos/aiden-sre-launch
python3 -m pip install --user librosa numpy soundfile
python3 ~/.cursor/skills/music-to-video/scripts/analyze-beatgrid.py assets/audio/music/bed.wav -o audiomap.json --print
```
Expected: summary `NN BPM · … beats / … bars`. Note if BPM is not 96 ±3 (fit still works).

- [ ] **Step 2: Fit** (offset from G1c; final hit = the track's last strong hit from the printed `key_moments` / `hard_stops`)

Run: `python3 scripts/fit_bridges.py --offset <offset> --final-hit <seconds>`
Expected: one log row per snap with `kind` `phrase` or `downbeat`; report any `beat`/`none` row (spec §15).

- [ ] **Step 3: Lock and verify A14**

```bash
python3 scripts/build_timing.py lock
ffmpeg -loglevel error -y -ss <offset> -i assets/audio/music/bed.wav -c:a pcm_s24le assets/audio/music/bed.fit.wav
python3 - <<'EOF'
import json
t = json.load(open('data/timing.json')); am = json.load(open('audiomap.json')); off = t['music_offset']
db = [x - off for x in am['grid']['downbeats_sec']]
for f in t['frames']:
    if f['snap']:
        miss = min(abs(f['start'] - d) for d in db)
        print(f['id'], f['start'], round(miss * 1000), 'ms')
        assert miss <= 0.04
assert 110 <= t['total'] <= 126, t['total']
print('A14 snap OK; total', t['total'])
EOF
```
Expected: every snap ≤ 40 ms; total 110–126 s. If total < 110, stop and report (spec §15).

- [ ] **Step 4: Commit the audio lock (orchestrator)**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
git add videos/aiden-sre-launch/data videos/aiden-sre-launch/audiomap.json videos/aiden-sre-launch/audio_meta.json videos/aiden-sre-launch/assets/audio/vo/*.words.json videos/aiden-sre-launch/NOTES.md
git commit -m "feat(aiden-sre-launch): narration and score locked; timing.json is the lock"
```
Media binaries follow the repo's existing convention for `videos/` (see `videos/local-assets.md`).

### Task 14: SFX (orchestrator, after T13)

- [ ] **Step 1:** `creative_create_flow` "sfx". Per `data/sfx.json` entry: sfx node `eleven_text_to_sound_v2`, `duration_seconds`, `prompt_influence: 0.6`, `loop`, `generations_count: 2` (estimate the batch first).
- [ ] **Step 2:** Pick by ear (no clash with the score's key; clean transient). Download to `assets/audio/sfx/<id>.wav` via `el_fetch.py`.
- [ ] **Step 3:** Adopt all audio into `.media` via `media-use` (`--adopt`).

### Task 15: Style stills (orchestrator, after T13) → Gate G1d

- [ ] **Step 1:** For A1–A6: upload `source/figma/<still_ref>.png` (`creative_create_asset_upload` → PUT → `creative_finalize_asset_upload` → `creative_add_flow_asset_node`); `creative_create_flow` "Ax"; image node `gemini-3-pro-image`, 16:9, 2K; connect `reference_images` ← the asset node; prompt = `still_prompt` + spec §8 global suffix; `generations_count: 4`.
- [ ] **Step 2:** Reject stills with glyphs/logos/UI. **Gate G1d:** user picks one per clip. Pin with `creative_add_flow_asset_node(generation_id)`; record `still_node` in `data/el-video.json`; download to `assets/el-stills/Ax.png`.

---

## Wave 2

### Task 16: STORYBOARD, SCRIPT, frame packets (worker)

**Files:** Create `scripts/write_docs.py`, `tests/test_write_docs.py`, `STORYBOARD.md`, `SCRIPT.md`, `.hyperframes/frame-packets/*`

**Interfaces:**
- `write_docs.storyboard(frames, timing, lines, components) -> str` per `hyperframes/references/storyboard-format.md`; `- blueprint: <id> (Adapt)` and `- rules: a, b` are the keys `frame-packets.mjs` reads.
- `write_docs.script(frames, lines) -> str` (`## <title> (Frame N)` + 4-space-indented text).

- [ ] **Step 1: Failing test**

```python
from write_docs import script, storyboard

FRAMES = [{"frame": 2, "id": "F02", "slug": "alert-flood", "title": "Buried", "scene": "intro", "line": "L01", "figma": ["66:2"],
           "el_video": [], "blueprint": "overwhelm-surround", "rules": ["waterfall-entry"], "ost": [], "hits": [], "counter": [212, 1284],
           "sfx": ["row-tick"], "picture": "Cards stack."}]
TIMING = {"frames": [{"frame": 2, "start": 3.0, "dur": 7.1, "cues": [], "hits": []}]}
LINES = {"L01": "Your on-call team is buried in alerts."}


def test_storyboard_block():
    md = storyboard(FRAMES, TIMING, LINES, {"66:2": "compositions/components/alert-flood"})
    assert "## Frame 2 — Buried" in md
    assert "- duration: 7.1s" in md and "- blueprint: overwhelm-surround (Adapt)" in md
    assert "- rules: waterfall-entry" in md and "- src: compositions/frames/02-alert-flood.html" in md
    assert '- voiceover: "Your on-call team is buried in alerts."' in md
    assert "compositions/components/alert-flood" in md


def test_script_format():
    assert script(FRAMES, LINES) == "# Script\n\n## Buried (Frame 2)\n\n    Your on-call team is buried in alerts.\n"
```

- [ ] **Step 2:** Run → FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement `scripts/write_docs.py`**

```python
#!/usr/bin/env python3
"""Write STORYBOARD.md and SCRIPT.md from data/frames.json + data/timing.json. Usage: write_docs.py"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def front(total):
    return "\n".join([
        "---",
        "format: 1920x1080",
        "duration: " + str(total) + "s",
        'message: "An on-call team meets Aiden for SRE and follows one incident from the alert flood to a closed, audited fix."',
        "arc: Problem → Discover → Triage → Root cause → Remediation → Learn → Platform → CTA",
        "audience: platform and SRE buyers",
        "mode: collaborative",
        "music: assets/audio/music/bed.fit.wav (ElevenLabs, locked)",
        "---",
        "",
    ])


def block(f, t, vo, comps):
    cues = "; ".join(c["text"] + " @ " + str(c["local"]) + "s" for c in t["cues"]) or "none"
    hits = "; ".join(h["label"] + " @ " + str(round(h["t"] - t["start"], 3)) + "s" for h in t["hits"]) or "none"
    rows = [
        "",
        "## Frame " + str(f["frame"]) + " — " + f["title"],
        "",
        "- scene: " + f["picture"][:110],
        "- duration: " + str(t["dur"]) + "s",
        "- transition_in: cut",
        "- status: outline",
        '- voiceover: "' + vo + '"',
        "- src: compositions/frames/" + str(f["frame"]).zfill(2) + "-" + f["slug"] + ".html",
        "- blueprint: " + f["blueprint"] + " (Adapt)",
        "- rules: " + ", ".join(f["rules"]),
        "",
        f["picture"],
        "",
        "Components: " + (", ".join(comps) or "none (film-only frame)"),
        "Generated video: " + (", ".join(f["el_video"]) or "none") + " (assets/el-video/<id>.mp4, head-trimmed)",
        "Cues (local seconds): " + cues,
        "Hits (local seconds): " + hits,
        "SFX: " + (", ".join(f["sfx"]) or "none"),
        "Counter: " + str(f["counter"] or "none"),
        "",
    ]
    return "\n".join(rows)


def storyboard(frames, timing, lines, components):
    tf = {f["frame"]: f for f in timing["frames"]}
    total = round(sum(f["dur"] for f in timing["frames"]), 2)
    parts = [front(total)]
    for f in frames:
        vo = lines[f["line"]] if f["line"] else ""
        comps = [components[n] for n in f["figma"] if n in components]
        parts.append(block(f, tf[f["frame"]], vo, comps))
    return "".join(parts)


def script(frames, lines):
    parts = ["# Script\n"]
    for f in frames:
        if f["line"]:
            parts.append("\n## " + f["title"] + " (Frame " + str(f["frame"]) + ")\n\n    " + lines[f["line"]] + "\n")
    return "".join(parts)


if __name__ == "__main__":
    frames = json.loads((ROOT / "data/frames.json").read_text())
    timing = json.loads((ROOT / "data/timing.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / "source/lines.json").read_text())}
    comps = json.loads((ROOT / "data/components.json").read_text())
    (ROOT / "STORYBOARD.md").write_text(storyboard(frames, timing, lines, comps))
    (ROOT / "SCRIPT.md").write_text(script(frames, lines))
    print("wrote STORYBOARD.md, SCRIPT.md")
```

- [ ] **Step 4: Run tests, write docs, build packets**

```bash
python3 -m pytest tests/test_write_docs.py -q && python3 scripts/write_docs.py
cp STORYBOARD.md /tmp/STORYBOARD.before.md
node ~/.cursor/skills/product-launch-video/scripts/audio.mjs sync-durations --audio-meta ./audio_meta.json --storyboard ./STORYBOARD.md
diff /tmp/STORYBOARD.before.md STORYBOARD.md && echo "durations consistent"
node ~/.cursor/skills/product-launch-video/scripts/frame-packets.mjs --project "$PWD" --storyboard "$PWD/STORYBOARD.md"
ls .hyperframes/frame-packets | wc -l
```
Expected: tests pass; `durations consistent` (if not, the lock and the adapter disagree — stop and report); 21 files (20 packets + `_role.md`), none over 48 KB.

## F10 picture lock (2026-10-02)

Settled on the golden frame after the HTML rebuild was rejected. Later frame renders copy this. Do not re-open it.

- The product picture is the Figma frame, not the HTML import. F10 uses `source/figma/58-2-triage.png`, then `source/figma/61-2.png` at the ruled-out cut. Both exports are 3840×1772, shown at 1920×886 inside `.f10-ui-scaler { zoom: 0.8 }` (stage 1536×709). No crop, no scroll, no empty white band.
- `58-2.png` stays the untouched export. On that export the “Triage so far” rows paint the bold label on the same origin as the sentence (`58:196`, `58:206`). `58-2-triage.png` is the plate with those two rows repainted in IBM Plex 14 / 22.75 (bold `#181D24`, body `#1D2229`). Check every other product PNG for the same stacked row before its first render and patch a copy, not the export.
- Film captions (“Hypotheses with confidence scores”, “ruled out · 4%”) sit in the dark band under the panel. Nothing is composited on the product: no hypotheses card, no flying chips, no tracking box, no cream multiply, no Evidence veil, no badge blur.
- Rest tilt is on the stage only: `rotateX(2deg) rotateY(-4deg)`, perspective 2400. Entrance from `rotateX(8deg) rotateY(-6deg)`. Tilting the stage and the picture doubles the slant. Spec §6.3’s `rotateX(6deg) rotateY(-10deg)` and the U3 Evidence blur were both rejected.
- Ribbons stay behind the panel (`shared/layers/ribbons.js`). The GSAP timeline is registered as the frame id and as `window.__timelines.main`.
- Torbit describes code relationships. It is not the picture. Do not rebuild the panel from `src/aiden-2/`.

Can you search some community pro forums on how to

F10’s picture is already at `compositions/frames/10-investigation.html`. G2 is not locked until the user says so. Do not rebuild it from the HTML components.

- [ ] **Step 1:** The plate is the F10 picture lock above, not a fresh component mount. Spec §6.3 tilt and U3 Evidence blur do not apply.
- [ ] **Step 2:** Render at high quality and calibrate the motion floor:

```bash
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
npx --yes hyperframes@0.8.103 render . -c compositions/frames/10-investigation.html --fps 60 --quality high -o renders/frames/10.mp4
python3 scripts/qa_motion.py renders/frames/10.mp4 --calibrate
```
- [ ] **Step 3:** Opus review (template). Fix Critical/Important.
- [ ] **Step 4: Gate G2.** Show stills and the mp4 with L07 muxed under it (`ffmpeg -i renders/frames/10.mp4 -i assets/audio/vo/L07.wav -map 0:v -map 1:a -c:v copy -shortest /tmp/f10.mp4`). User locks the look. Commit `compositions/frames/10-investigation.html` and `data/qa.json`.

---

## Wave 3

### Task 18: Frame workers (19 frames, ≤ 8 concurrent, Grok 4.7)

Dispatch each frame with `model: grok-4.7-high-fast`. The F10 picture lock and the Batch A lessons are already in the frame-worker template. Do not spend a batch rediscovering the plate, the tilt, the ribbon mask, or the chip crop.

| Batch | Frames |
|---|---|
| A | F02, F03, F05, F06, F09, F14, F18, F19 |
| B | F07, F11, F13, F15, F16, F01, F04, F08 |
| C | F12, F17, F20 |

Batch A is built. Batches B and C start from the Batch A lessons above. Do not add a fresh lessons pass unless a new still fails one of those checks.

- [ ] **Step 1:** Dispatch the frame-worker template per frame. Bridge frames (F01, F04, F08, F12, F17, F20) mount a `<video>` slot for `assets/el-video/Ax.mp4` over the ribbon field fallback, so they render before T19 lands.
- [ ] **Step 2:** Reviewer per frame (sonnet). Critical/Important → re-dispatch the same worker with findings; Minor → `NOTES.md`.
- [ ] **Step 3:** Orchestrator marks accepted frames `status: animated` in `STORYBOARD.md` and commits `compositions/frames/NN-*.html` + `assets/frames/NN`.

### Task 19: ElevenLabs video clips (orchestrator)

- [ ] **Step 1: A1, A5, A6** (after G1d): in each clip's flow, video node `bytedance-seedance-v2.5`, `resolution: 1080p`, `aspect_ratio: 16:9`, `generate_audio: false`, `duration_secs` = `length`; `start_frame` ← pinned still node; prompt = `prompt` + global suffix (read `creative_get_model_guide` first); `generations_count: 2`; estimate first.
- [ ] **Step 2: A2, A3, A4** after F05, F09, F13 are accepted: `npx hyperframes snapshot --at <timing.json start of that frame>`; upload the PNG; connect it to `end_frame`. Same settings.
- [ ] **Step 3:** Apply the spec §8 rejection rule. Download picks to `assets/el-video/Ax.mp4` with provenance; `ffprobe` (1080p, ≥ 24 fps). If 60 fps judder shows, run `topaz-video-upscale` (schema first).
- [ ] **Step 4:** Adopt via `media-use`. Re-render the frames using clips (F01, F04, F08, F12, F17, F18, F19, F20); rerun `qa_motion.py` on each.

---

## Wave 4

### Task 20: Assemble, transitions, mix (worker) → Gate G3

- [ ] **Step 1: Assemble**

```bash
cd videos/aiden-sre-launch && export PATH=/opt/homebrew/opt/node@22/bin:$PATH
node ~/.cursor/skills/product-launch-video/scripts/captions.mjs build --storyboard ./STORYBOARD.md --audio-meta ./audio_meta.json --hyperframes . --out ./caption_groups.json
node ~/.cursor/skills/product-launch-video/scripts/assemble-index.mjs --storyboard ./STORYBOARD.md --hyperframes .
node ~/.cursor/skills/product-launch-video/scripts/transitions.mjs inject --storyboard ./STORYBOARD.md --hyperframes .
node ~/.cursor/skills/product-launch-video/scripts/transitions.mjs verify --storyboard ./STORYBOARD.md --index ./index.html
```
Burned-in captions are out of scope (spec §16): if `assemble-index` mounts caption groups, disable them in `index.html` and note it.

- [ ] **Step 2: Mix (`hyperframes-audio`)** in `index.html`: VO chain (high-pass 80 Hz, compressor 2:1, de-ess only if needed, room reverb 4–6% wet); room-tone track (`assets/audio/sfx/room-tone.wav` looped, ≈ −62 dBFS) under the VO span; music `carve.mjs` dynamic voiceover carve (source VO, target music, release 600–900 ms); music automation +4…+6 dB across bridge frames and a 1.5 s fade-in under F01; master limiter ceiling −1.0 dBTP. Use the skill's scripts; do not hand-write automation the skill can derive.

- [ ] **Step 3: Check**

```bash
npx --yes hyperframes@0.8.103 lint && npx --yes hyperframes@0.8.103 check
npx --yes hyperframes@0.8.103 snapshot --at $(python3 -c "import json;t=json.load(open('data/timing.json'));print(','.join(str(round(f['start']+f['dur']/2,2)) for f in t['frames']))")
```
Expected: 0 errors; contact sheet reviewed; frames at every cut −0.1 s / +0.2 s compared for pops.

- [ ] **Step 4: Gate G3.** `npx hyperframes preview --background`; the user watches on headphones and laptop speakers. Changes route to the owning frame worker (T18) or back to Step 2.

### Task 21: Render, finish, QA (worker)

- [ ] **Step 1: Render**

```bash
npx --yes hyperframes@0.8.103 render . --skill=product-launch-video --format mov --fps 60 --quality high -o renders/film.mov
ffprobe -v error -show_entries stream=codec_type -of csv=p=0 renders/film.mov
```
Expected: `video` and `audio`. If no audio stream: render `--format mp4 --quality high -o renders/film-audio.mp4`, then `ffmpeg -i renders/film.mov -i renders/film-audio.mp4 -map 0:v -map 1:a -c copy renders/film.mux.mov && mv renders/film.mux.mov renders/film.mov`.

- [ ] **Step 2: Finish and QA**

```bash
scripts/finish.sh
python3 scripts/qa_motion.py renders/aiden-sre-launch.mp4
python3 scripts/qa_loudness.py renders/aiden-sre-launch.mp4
python3 -c "import json,subprocess;t=json.load(open('data/timing.json'))['total'];d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','renders/aiden-sre-launch.mp4']));print(t,d);assert abs(t-d)<=0.1 and 110<=d<=126"
```
Expected: motion exit 0, loudness PASS, duration assert passes. Paste all output.

### Task 22: Audit and fix loop (reviewer `claude-opus-5-5-high`)

- [ ] **Step 1:** `video-production-audit` on `renders/aiden-sre-launch.mp4`, plus `review-animations`, `critique-composition`, `critique-visual-hierarchy` on hold stills and every cue time. Write `AUDIT.md` (same structure as the earlier film's).
- [ ] **Step 2:** Check A1–A15 with evidence in `AUDIT.md`.
- [ ] **Step 3:** Each P0/P1 → re-dispatch the owning frame worker (`model: grok-4.7-high-fast`) or the mix step; re-render affected frames; rerun T20 Step 3 and T21. Loop until the verdict is "ship".

### Task 23: Deliver → Gate G4

- [ ] **Step 1:** Captions sidecars: `npx hyperframes transcribe renders/aiden-sre-launch.mp4 --to srt -o renders/aiden-sre-launch.srt` and `--to vtt -o renders/aiden-sre-launch.vtt`; correct words to `lines.json` spelling.
- [ ] **Step 2:** Poster: `ffmpeg -ss <F10 hold time> -i renders/aiden-sre-launch.mp4 -frames:v 1 renders/poster.png`.
- [ ] **Step 3:** `NOTES.md` final: runtime, credits per stage, chosen voice/take/score ids, `[VERIFY]` sign-off status (U5).
- [ ] **Step 4:** Update `openmemory.md`; store project memories (component + implementation).
- [ ] **Step 5: Gate G4.** User approves. Commit and push the branch.

---

## Self-review (writing-plans)

- **Spec coverage:** §2 inputs (T1, T6–T8); §3 rules (T6 Step 3, frames.json counter, T17 §6.3, T21 QA); §4 tool roles + MCP contract (T1 Step 7, T9–T15, T19); §5 motion (T17 calibrate, T18 self-check, T21); §6 (T1 Step 4, T17); §7 (T2, T16); §8 (T15, T19); §9.1 (T9–T11); §9.2 (T11–T13); §9.3 (T14); §9.4 (T20); §10 (T1, T21); §11 (skills table); §12 (dispatch, templates, model routing); §13 A1–A15 (T13 Step 3, T21, T22); §14 (gates G1a–G4; U3 Evidence blur and §6.3 rest tilt retired by the F10 picture lock); §16 (caption sidecar only, T20/T23).
- **F10 lock:** product plates are the Figma PNGs; rest tilt is `rotateX(2deg) rotateY(-4deg)` on the stage only; frame renders from T18 on use Grok 4.7 (`grok-4.7-high-fast`).
- **Batch A lessons:** ribbon host masked out of the center and kept under opaque type; floating chips show the whole text column (`object-fit: contain`) in front of the plate and inside the 1920 frame after the tilt; workers do not edit `index.html`.
- **Placeholders:** values unknowable in advance (voice id, generation ids, music offset, final-hit time, MCP URL field) are produced by named steps and written to named files.
- **Type consistency:** `frames.json` keys (`frame`, `line`, `est`, `flex`, `snap`, `ost`, `hits`) are read identically by `build_timing.layout`, `fit_bridges.fit`, `write_docs.storyboard`; `timing.json` keys (`start`, `dur`, `cues[].local`, `hits[].t`) match the frame-worker template; `audio_meta.json` matches `product-launch-video`'s `toProductLaunchMeta` shape (`frame`, `path`, `duration_s`, `words[{id,text,start,end}]`).
