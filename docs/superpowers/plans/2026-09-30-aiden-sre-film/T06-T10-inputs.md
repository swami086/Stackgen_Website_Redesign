# T6–T10 — Inputs: plates, VO, audio, textures, logos (Phase 1, parallel)

Part of `docs/superpowers/plans/2026-09-30-aiden-sre-film.md` (read Global Constraints, Amendments, Interfaces first). These run in parallel with T1–T5.

---

## T6 — Capture UI plates P01–P15

**Model:** Haiku · **Skills:** `chrome-devtools-skills` → `chrome-devtools`

**Precondition (orchestrator, Gate G0):** Chrome DevTools MCP page open on `https://stage.dev.stackgen.com/app/sre/ai-sre-demo/alerts`, user has logged in manually, alerts list confirmed with `take_snapshot`. The orchestrator passes the `pageId`. This agent never types or reads credentials. If a login screen appears at any point, stop and report BLOCKED ("session expired").

**Files:** Create `shared/assets/plates/P01.png … P15.png`, `P01.snapshot.json … P15.snapshot.json`, `scripts/capture-plates.md`

**Interfaces:** Produces `PlateSnapshot` files (index). Required box keys — extra keys welcome; any required key not found goes in `missing`:

| Plate | State to reach | Required box keys |
|---|---|---|
| P01 | Alerts list, unfiltered, many rows | `panel`, `list`, `row-1`…`row-12`, `header-count`, `col-classification` |
| P02 | Alerts list filtered to critical | `panel`, `list`, `row-1`…`row-7`, `header-count`, `row-critical-k8s` |
| P03 | Alerts list grouped/correlated, classification column visible | `panel`, `list`, `row-1`…`row-12`, `group-1-header`, `col-classification` |
| P04 | Hover on the critical Kubernetes pod alert row | `panel`, `row-critical-k8s` |
| P05 | Integrations / connected tools page | `panel`, `tile-1`…`tile-N` (`label` = tool name) |
| P06 | Investigation pop-up (click the **middle of the row**, not "View Investigation"): summary + urgency | `panel`, `summary`, `urgency`, `close-btn` |
| P07 | Same pop-up at the hypotheses + confidence list | `panel`, `hyp-1`…`hyp-6`, `hyp-N-score`, `hyp-N-bar` |
| P08 | Alert with downstream-effect marker + linked incident | `panel`, `row-symptom`, `row-root`, `marker-downstream` |
| P09 | Full RCA report | `panel`, `title`, `section-1`…`section-3` |
| P10 | Remediation card, proposed action (Datadog-connected env) | `panel`, `action-row`, `opt-restart`, `opt-scale`, `opt-reroute`, `opt-rollback`, `approve-btn` |
| P11 | Remediation approved + audit log | `panel`, `approve-btn`, `gate-policy`, `audit-log`, `audit-line-last` |
| P12 | Incident resolved + error-rate chart | `panel`, `status-pill`, `chart-error-rate` |
| P13 | Service map / dependency view | `panel`, `node-<service>` per visible node |
| P14 | Error budget view | `panel`, `budget-bar`, `budget-threshold` |
| P15 | Investigation with a "seen before" / similar-incident reference | `panel`, `seen-before-row` |

- [ ] **Step 1:** `emulate` `{pageId, viewport: "1920x1080x2"}`. Hide scrollbars: `evaluate_script` `() => { document.documentElement.style.scrollbarWidth = "none"; }`.
- [ ] **Step 2:** Per plate: reach the state (`take_snapshot` for uids → `click` / `hover` → `wait_for` the expected text), then `take_screenshot {pageId, filePath: "<abs>/videos/aiden-sre-film/shared/assets/plates/Pxx.png"}`. Verify `sips -g pixelWidth -g pixelHeight` → 3840 × 2160.
- [ ] **Step 3:** Boxes via `evaluate_script` returning `getBoundingClientRect()` (x, y, width, height) for elements located by visible text / role / nearest stable selector from the snapshot. Write `Pxx.snapshot.json`:

```json
{"id":"P07","viewport":{"w":1920,"h":1080,"dpr":2},"image":"P07.png",
 "boxes":{"panel":{"x":312,"y":96,"w":1296,"h":888,"label":"Investigation"},"hyp-1":{"x":352,"y":420,"w":1216,"h":64,"label":"OOMKilled: memory limit"}},
 "missing":["hyp-6-bar"]}
```

- [ ] **Step 4:** A state that does not exist in the demo environment → no PNG; snapshot with `"missing": ["*"]` and `"reason": "<one line>"`. Look at every PNG for real customer names, emails or tokens; if present, stop and report (do not commit).
- [ ] **Step 5:** `scripts/capture-plates.md`: one row per plate — click path, captured Y/N, missing keys, notes. Then `.venv/bin/python scripts/build_data.py --placeholder` must succeed and embed the plates.
- [ ] **Step 6: Commit** `shared/assets/plates/P*.png shared/assets/plates/P*.snapshot.json scripts/capture-plates.md` → `git commit -m "assets(aiden-sre-film): stage UI plates P01-P15"`

---

## T7 — Voiceover + timing lock

**Model:** Sonnet · **Skills:** `elevenlabs-skills` → `text-to-speech`

**Files:** Create `shared/assets/audio/vo/L01.wav … L16.wav`, `L01.words.json … L16.words.json`, `shared/assets/audio/vo/voice.md`, `scripts/vo_words.py`; Test `tests/test_vo_words.py`; Modify (only if Step 5 needs it) `data/lines.json` `gap_before`

**Interfaces:** Produces `words.json` = `[{"word": "Your", "start": 0.0, "end": 0.18}]` per line (seconds from file start). Consumes `data/lines.json`.

- [ ] **Step 1: Voice (user gate U2).** If the orchestrator passed a voice ID, use it. Otherwise render L03 with three candidate voices matching "calm, mid-pitch, neutral US, confident, technical-marketing read", save `shared/assets/audio/vo/samples/voice-{a,b,c}.mp3` (not committed), and stop with DONE_WITH_CONCERNS asking for the pick. Record voice ID, model, stability / similarity / style settings in `voice.md`.
- [ ] **Step 2: Failing test** `tests/test_vo_words.py`:

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from vo_words import chars_to_words


def test_chars_to_words():
    a = {"characters": list("Hi there."),
         "character_start_times_seconds": [0, .1, .2, .3, .4, .5, .6, .7, .8],
         "character_end_times_seconds": [.1, .2, .3, .4, .5, .6, .7, .8, .9]}
    assert chars_to_words(a) == [{"word": "Hi", "start": 0.0, "end": 0.2},
                                 {"word": "there.", "start": 0.3, "end": 0.9}]


def test_shift_after_trim():
    a = {"characters": list("Go"), "character_start_times_seconds": [0.5, 0.6], "character_end_times_seconds": [0.6, 0.7]}
    assert chars_to_words(a, shift=-0.5) == [{"word": "Go", "start": 0.0, "end": 0.2}]
```

- [ ] **Step 3: `scripts/vo_words.py`**

```python
"""ElevenLabs with-timestamps alignment -> words.json. Usage: vo_words.py alignment.json out.words.json [shift_s]"""
import json, sys


def chars_to_words(al, shift=0.0):
    words, cur, start, end = [], "", None, None
    for ch, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if ch.isspace():
            if cur:
                words.append({"word": cur, "start": round(start + shift, 3), "end": round(end + shift, 3)})
            cur, start = "", None
            continue
        if start is None:
            start = s
        cur, end = cur + ch, e
    if cur:
        words.append({"word": cur, "start": round(start + shift, 3), "end": round(end + shift, 3)})
    return words


if __name__ == "__main__":
    al = json.load(open(sys.argv[1]))
    shift = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
    json.dump(chars_to_words(al.get("alignment", al), shift), open(sys.argv[2], "w"), indent=1)
```

Run `.venv/bin/pytest -q tests/test_vo_words.py` → PASS.

- [ ] **Step 4: Generate 16 lines** with the text-to-speech skill's **with-timestamps** endpoint: one request per line, same voice + settings, text verbatim from `data/lines.json`. Keep raw alignment JSON in `shared/assets/audio/vo/raw/` (not committed). Convert audio: `ffmpeg -i Lxx.mp3 -ar 48000 -c:a pcm_s24le Lxx.wav`. If leading silence > 150 ms, trim it (`-ss <lead>`) and pass `shift = -lead` to `vo_words.py`; trim trailing silence > 150 ms (no shift needed). Listen-check each line for mispronunciations of "Aiden", "SRE" (letters), "MTTR" (letters), "OpenTelemetry"; regenerate with SSML/phonetic hints per the skill if wrong.
- [ ] **Step 5: Timing lock.** `.venv/bin/python scripts/build_data.py` (no `--placeholder`) → no `PROBLEM`, exit 0. If a shot is out of 3.0–8.0 s: when the **next** shot's anchor is the first phrase of its line, raise that line's `gap_before` for that mode by the shortfall (max +0.8 s); otherwise report the shot to the orchestrator — never change anchors, copy or thresholds. Rerun until clean. Report full and cut durations (targets 137 ± 1 s / 126 ± 1 s; report the deviation, do not force it).
- [ ] **Step 6: Commit** `shared/assets/audio/vo/L*.wav shared/assets/audio/vo/L*.words.json shared/assets/audio/vo/voice.md scripts/vo_words.py tests/test_vo_words.py` (+ `data/lines.json` if changed) → `git commit -m "assets(aiden-sre-film): ElevenLabs VO + word timings, timing lock"`

---

## T8 — Sound effects + music bed

**Model:** Sonnet · **Skills:** `elevenlabs-skills` → `sound-effects`; fallback `elevenlabs-skills` → `music`; Artlist MCP (`user-artlist`)

**Files:** Create `shared/assets/audio/sfx/*.wav`, `shared/assets/audio/sfx/cues.json`, `shared/assets/audio/music/bed.wav`, `shared/assets/audio/music/LICENSE.md`

**Interfaces:** Produces `cues.json` (`[{file, shot, t, gain_db}]`, `t` shot-relative seconds — so the timing lock never invalidates it). Cue times come from the choreography tables in `T12-T21-shots.md`.

- [ ] **Step 1: Generate SFX** — 48 kHz WAV, dry (tails ≤ 0.5 s unless stated):

| File | Prompt | Duration |
|---|---|---|
| `tick.wav` | soft digital notification tick, muted, short, modern UI | 0.15 s |
| `tick-wall.wav` | dense overlapping notification ticks building into a wall of alerts, rising | 5.0 s |
| `whoosh-short.wav` | fast airy whoosh, clean, no low rumble | 0.4 s |
| `whoosh-long.wav` | cinematic whip-pan whoosh with a slight tail | 0.9 s |
| `click.wav` | crisp subtle mouse click | 0.08 s |
| `thunk.wav` | soft solid UI confirm, low-mid thunk | 0.25 s |
| `gate.wav` | tiny positive confirmation, two rising notes | 0.3 s |
| `keys.wav` | quiet mechanical keyboard typing burst | 1.5 s |
| `riser.wav` | low tonal riser, smooth, builds tension, no hit | 4.0 s |
| `resolve.wav` | gentle warm single resolve chime | 1.2 s |
| `pop.wav` | tiny soft pop for a node appearing | 0.1 s |

- [ ] **Step 2: Cue sheet** from the shots file tables. Minimum set: `tick` ×10 across S01 at card-drop times; `tick-wall` at S02 0.0; `whoosh-long` at S02 end − 0.45; `whoosh-short` at every plate `enter`; `click` at every cursor click; `thunk` S19 approve; `gate` S19 gate tick; `keys` S19 log line; `pop` ×6 during S05 `drawIn`; `riser` S24 0.2; `resolve` S20 status flip. Gains −18 to −6 dB.
- [ ] **Step 3: Music bed (user gate U4).** Artlist MCP search "minimal electronic, tech, building, 100–110 BPM, no vocals", ≥ 140 s. Shortlist 3 with links and stop with DONE_WITH_CONCERNS for the pick. After the pick: licensed WAV → `music/bed.wav` (48 kHz); `LICENSE.md` = title, artist, licence type, Artlist ID, date. If Artlist is unavailable: ElevenLabs `music` skill with that prompt and a composition plan with sections at 0:10 (title), 0:21 (new section), 1:35 (resolve), 1:55 (riser), 2:09 (final chord); note it in `LICENSE.md`.
- [ ] **Step 4:** `ffprobe` every file (48 kHz). **Commit** `shared/assets/audio/sfx shared/assets/audio/music` → `git commit -m "assets(aiden-sre-film): SFX set, cue sheet, music bed"`

---

## T9 — Texture imagery G01–G03 (Gemini)

**Model:** Haiku · **Skills:** `blog-image` (prompt structure only)

**Files:** Create `shared/assets/gen/G01.png`, `G02-1.png`, `G02-2.png`, `G02-3.png`, `G03.png`, `shared/assets/gen/manifest.json`, `scripts/gen_image.py`

- [ ] **Step 1: `scripts/gen_image.py`** — key from `GEMINI_API_KEY`, never written to files or printed:

```python
"""Generate one image with Gemini. Usage: gen_image.py <out.png> "<prompt>" """
import base64, json, os, sys, urllib.request

MODEL = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"


def main(out, prompt):
    body = {"contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "16:9"}}}
    req = urllib.request.Request(URL, data=json.dumps(body).encode(), method="POST",
                                 headers={"Content-Type": "application/json", "x-goog-api-key": os.environ["GEMINI_API_KEY"]})
    with urllib.request.urlopen(req, timeout=180) as r:
        data = json.load(r)
    for part in data["candidates"][0]["content"]["parts"]:
        if "inlineData" in part:
            with open(out, "wb") as fh:
                fh.write(base64.b64decode(part["inlineData"]["data"]))
            print(out)
            return
    sys.exit(f"no image in response: {json.dumps(data)[:400]}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
```

If the API rejects `imageConfig`, drop that key and crop to 16:9 with ffmpeg afterwards.

- [ ] **Step 2: Generate** with spec §7.2 prompts; three G02 variants with the leak originating "from the left edge", "from the top-right corner", "from the bottom edge". Upscale each: `ffmpeg -i in.png -vf scale=3840:2160:flags=lanczos out.png`.
- [ ] **Step 3: Reject check** each file (no text / logos / objects by eye, plus hue):

```bash
.venv/bin/python -c "
from PIL import Image; import colorsys, sys
im = Image.open(sys.argv[1]).convert('RGB').resize((192, 108))
bad = sum(1 for p in im.getdata()
          if (lambda h, s, v: s > 0.25 and v > 0.2 and not (180 <= h * 360 <= 270))(*colorsys.rgb_to_hsv(*[c / 255 for c in p])))
print(sys.argv[1], 'offhue_px', bad); sys.exit(1 if bad > 200 else 0)" shared/assets/gen/G02-1.png
```

Regenerate on failure (max 3 attempts per image, then report).
- [ ] **Step 4:** `manifest.json` = `[{file, prompt, model, date, attempts}]`. **Commit** `shared/assets/gen scripts/gen_image.py` → `git commit -m "assets(aiden-sre-film): Gemini texture plates G01-G03"`

---

## T10 — Vendor logo chips

**Model:** Haiku · **Skills:** `company-logos`

**Files:** Create `shared/assets/logos/{datadog,prometheus,grafana,opentelemetry,kubernetes,aws,googlecloud,azure,pagerduty,slack}.svg`, `shared/assets/logos/SOURCES.md`

- [ ] **Step 1:** Fetch from Iconify Simple Icons `https://api.iconify.design/simple-icons/<slug>.svg`: `datadog`, `prometheus`, `grafana`, `opentelemetry`, `kubernetes`, `amazonwebservices` (fallback `amazonaws`), `googlecloud`, `microsoftazure`, `pagerduty`, `slack`. Save under the short file names above. If a slug 404s, use the vendor's official press-kit SVG and note it.
- [ ] **Step 2:** Normalize: every `fill`/`stroke` color → `currentColor`; remove `width`/`height`; keep `viewBox`. Verify `rg -n "#[0-9a-fA-F]{3,6}" shared/assets/logos` → no matches.
- [ ] **Step 3:** `SOURCES.md`: "Partner-logo approval pending (U5)" at top; then slug, source URL, date, licence note per logo. **Commit** `shared/assets/logos` → `git commit -m "assets(aiden-sre-film): monochrome vendor logo set"`
