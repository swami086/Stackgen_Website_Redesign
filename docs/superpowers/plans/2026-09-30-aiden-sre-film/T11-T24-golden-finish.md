# T11 golden shot · T22 conform + mix · T23 QA · T24 Clueso

Part of `docs/superpowers/plans/2026-09-30-aiden-sre-film.md` (read Global Constraints, Amendments, Interfaces first).

---

## T11 — Golden shot S12 + look lock (Phase 2)

**Model:** Grok 4.7 · **Skills:** shots row of the Skills matrix

**Precondition:** T1, T2, T3, T5 merged and reviewed; `scripts/build_data.py` run (placeholder or real VO). If P07 is missing, build the hypotheses panel as a DOM mock (see "Mock rule" in `T12-T21-shots.md`).

**Files:** Create `shots/S12/index.html`, `shots/QA.md`; Modify `scripts/composite.sh` (freeze defaults)

**Choreography** (shot-relative seconds; `D = timing.duration`):

| t | Pass | Action |
|---|---|---|
| 0.00 | bg | `mountRibbons(bg, {seed: 112, count: 22, modes: [{t: 0, mode: "dormant", opacity: 0.6}]}).bind(tl, D)` |
| 0.00 | mid | `await mountPlate(mid, {id: "P07", x: 120, y: 90, width: 1680})` — already in place (continuity from S11) |
| 0.00 | mid | overlays on `hyp-1…hyp-6`: `mask` each `hyp-N-bar` + `hyp-N-score`; in `overlay("hyp-N-bar")` a bar div (height 6 px, `--sg-mute`; `hyp-1` `--sg-violet`); in `overlay("hyp-N-score")` a Geist Mono 20 px label |
| 0.15 | mid | `fillBars(tl, bars, 0.15, {stagger: 0.12})`, values `[87, 34, 22, 11, 6, 4]` (`[ILLUSTRATIVE]`), `to = value / 100` |
| 1.20 | mid | `hyp-1` row: 1 px violet left rule scaleY 0→1 (0.3 s, `EASE.enter`) |
| 1.60 → D | — | hold; camera drift only |

- [ ] **Step 1:** `scripts/new_shot.sh S12`; implement the table in SHOT BUILD (dynamic `import()` of layers, `await` the plate, build tweens, then the template registers the timeline).
- [ ] **Step 2:** `npx hyperframes check shots/S12` → 0 findings; `.venv/bin/python scripts/lint_brand.py` → clean.
- [ ] **Step 3:** `scripts/render-passes.sh S12 full delivery && scripts/composite.sh S12`, then stills:

```bash
mkdir -p renders/review
ffmpeg -loglevel error -y -i renders/shots/S12.mov -vf "select='eq(n\,15)+eq(n\,45)+eq(n\,75)+eq(n\,120)'" -vsync vfr renders/review/S12-%d.png
```

- [ ] **Step 4: Look tuning.** For `BLOOM_MID ∈ {0.25, 0.35, 0.5}` × `GRAIN ∈ {3, 5}`, run `BLOOM_MID=… GRAIN=… scripts/composite.sh S12` (copy each output aside), extract frame 75 from each, tile into a 3×2 sheet (`ffmpeg -i f%d.png -vf tile=3x2 renders/review/S12-look.png`). Pick the variant where bars glow without haloing text and the ink stage shows no banding at 200% zoom. Set those numbers as the defaults in `scripts/composite.sh`. Write `shots/QA.md`:

```markdown
# Aiden SRE film — QA log

## Look lock (T11)
- BLOOM_MID = <v>, BLOOM_FG = 0.25, GRAIN = <v>
- Reason: <one or two sentences>
- Evidence: renders/review/S12-look.png, S12-1..4.png
```

- [ ] **Step 5: Gate G2.** Report DONE with `renders/shots/S12.mov`, the 4 stills and the look sheet. The orchestrator shows them to the user; Phase 3 starts only after approval. Requested changes come back to this task.
- [ ] **Step 6: Commit** `shots/S12/index.html scripts/composite.sh shots/QA.md` → `git commit -m "feat(aiden-sre-film): golden shot S12, look lock"`

---

## T22 — Conform + mix masters (Phase 4)

**Model:** Grok 4.7 · **Skills:** superpowers `verification-before-completion`

**Files:** Modify `shots/QA.md` (§ Masters). Outputs in `renders/master/` (not committed).

- [ ] **Step 1: All shots present**

```bash
for s in $(python3 -c "import json;print(' '.join(x['id'] for x in json.load(open('build/timing.full.json'))['shots']))"); do
  test -f renders/shots/$s.mov || echo MISSING $s
done
test -f renders/shots/S23-cut.mov || echo MISSING S23-cut
```

Expected: no output.

- [ ] **Step 2: Durations match timing** (±1 frame = 0.034 s):

```bash
.venv/bin/python - <<'EOF'
import json, subprocess
def dur(p): return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p],capture_output=True,text=True).stdout)
for mode, suffix in (("full", ""), ("cut", "-cut")):
    for s in json.load(open(f"build/timing.{mode}.json"))["shots"]:
        f = f"renders/shots/{s['id']}{suffix if s['id']=='S23' else ''}.mov"
        d = dur(f)
        if abs(d - s["duration"]) > 0.034: print("MISMATCH", mode, s["id"], d, s["duration"])
EOF
```

Mismatches go back to the owning shot package.

- [ ] **Step 3:** `.venv/bin/python scripts/mix.py full && .venv/bin/python scripts/mix.py cut`
- [ ] **Step 4:** `.venv/bin/python scripts/master.py full --audio renders/master/mix-full.wav && .venv/bin/python scripts/master.py cut --audio renders/master/mix-cut.wav`
- [ ] **Step 5: Verify** and paste real output into `shots/QA.md` § Masters:

```bash
for m in full cut; do
  ffprobe -v error -show_entries format=duration -of csv=p=0 renders/master/aiden-sre-$m.mp4
  ffmpeg -nostats -i renders/master/aiden-sre-$m.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12
  ffmpeg -nostats -i renders/master/vo-$m.wav -af ebur128 -f null - 2>&1 | grep -E "^\s+I:"
done
```

Expected: durations equal the T7-locked timings (targets 137 ± 1 / 126 ± 1 s); master −14 ± 1 LUFS, true peak ≤ −1.0 dBTP; VO stem −16 ± 1 LUFS. Listen once end to end for VO masked by SFX; note timecodes.

- [ ] **Step 6: Poster (D8):** `S12` start from `build/timing.full.json` + 1.6 s → `ffmpeg -ss <t> -i renders/master/aiden-sre-full.mov -frames:v 1 renders/master/poster.png`
- [ ] **Step 7: Commit** `shots/QA.md` → `git commit -m "chore(aiden-sre-film): masters conformed and mixed"`

---

## T23 — QA review against acceptance criteria (Phase 4)

**Model:** Grok 4.7 · **Skills:** `emil-skills` → `review-animations`, `motion-graphics`, `video-to-superprompt`

**Files:** Modify `shots/QA.md` (§ Acceptance)

- [ ] **Step 1: Mechanical gates**

```bash
.venv/bin/pytest -q tests && node --test tests/js/ && .venv/bin/python scripts/lint_brand.py
for d in shots/S*; do printf "%s " "$d"; npx hyperframes check "$d" --json | jq -r '.ok'; done
```

Expected: all pass; every shot `true`.

- [ ] **Step 2: Visual review.** Per scene, a contact sheet of every shot at 25/50/90% from `renders/master/aiden-sre-full.mov` (`ffmpeg -ss <t> -frames:v 1`, then `tile`). Review with `review-animations` (default to flagging) and the `motion-graphics` quality bar. Each finding: timecode, shot, issue, severity (blocker / fix / polish).
- [ ] **Step 3: A5 sync.** Pick 10 OST items across scenes; find the first frame where each reaches ~50% opacity (frame-step with `ffmpeg -ss`); compare to `shot.start + ost.t` from `build/timing.full.json`. Pass if |Δ| ≤ 120 ms.
- [ ] **Step 4: A14 parity.** Run `video-to-superprompt` on the reference (`/tmp/aofvid/gitlab.mp4`; re-download `https://www.youtube.com/watch?v=-5JPZoGeHHs` with `yt-dlp` if gone) and on the full master; tick spec §1.1 T1–T11 with a timecode each.
- [ ] **Step 5:** Fill spec §12 A1–A14: PASS/FAIL, evidence, timecode, owning package. A12 lists each `[VERIFY]` item and its owner (Navin, Raj). A13 lists every `[ILLUSTRATIVE]` value shown.
- [ ] **Step 6:** Report the FAIL list. The orchestrator re-dispatches owning packages with the QA excerpt, then reruns T22 and this task. **Commit** `shots/QA.md` → `git commit -m "docs(aiden-sre-film): QA acceptance results"`

---

## T24 — Clueso finishing: captions, chapters, aspects, cutdown (Phase 4)

**Model:** Grok 4.7 · **Skills:** `clueso-skills` → `polish-screen-demo`, then `clueso-skills` → `demo-cutdown`

**Precondition:** T23 all PASS (or failures explicitly accepted by the user).

**Files:** Create `scripts/captions.py`, `tests/test_captions.py`; Modify `shots/QA.md` (§ Deliverables). Outputs `renders/master/aiden-sre-{full,cut}.{srt,vtt}`, `renders/master/clueso/*` (not committed).

- [ ] **Step 1: Failing test** `tests/test_captions.py` (captions come from VO word timings, not ASR):

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from captions import cues, srt_time


def test_srt_time():
    assert srt_time(3723.5) == "01:02:03,500"


def test_cues_wrap_42_chars_two_lines_and_offset():
    words = [{"word": w, "start": i * 0.4, "end": i * 0.4 + 0.3} for i, w in enumerate(("alpha " * 30).split())]
    out = cues(words, offset=1.0)
    assert all(len(l) <= 42 for c in out for l in c["text"].split("\n"))
    assert all(c["text"].count("\n") <= 1 for c in out)
    assert out[0]["start"] == 1.0
    assert out[-1]["end"] == round(1.0 + 29 * 0.4 + 0.3, 3)
```

- [ ] **Step 2:** Run → FAIL. **Step 3: `scripts/captions.py`**

```python
"""SRT/VTT captions from VO word timings. Usage: captions.py full|cut"""
import json, os, sys
from pathlib import Path

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))
MAX_CHARS, MAX_LINES = 42, 2


def srt_time(t, sep=","):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}{sep}{ms:03d}"


def cues(words, offset):
    out, lines, cur, group = [], [], "", []

    def emit():
        if group:
            out.append({"start": round(group[0]["start"] + offset, 3), "end": round(group[-1]["end"] + offset, 3),
                        "text": "\n".join(lines + ([cur] if cur else []))})

    for w in words:
        cand = f"{cur} {w['word']}".strip()
        if len(cand) <= MAX_CHARS:
            cur = cand
        elif len(lines) + 1 < MAX_LINES:
            lines.append(cur)
            cur = w["word"]
        else:
            emit()
            lines, cur, group = [], w["word"], []
        group.append(w)
    emit()
    return out


def main(mode):
    t = json.loads((ROOT / f"build/timing.{mode}.json").read_text())
    all_cues = []
    for lid, off in t["lines"].items():
        words = json.loads((ROOT / f"shared/assets/audio/vo/{lid}.words.json").read_text())
        all_cues += cues(words, off)
    base = ROOT / f"renders/master/aiden-sre-{mode}"
    srt = "\n".join(f"{i}\n{srt_time(c['start'])} --> {srt_time(c['end'])}\n{c['text']}\n" for i, c in enumerate(all_cues, 1))
    vtt = "WEBVTT\n\n" + "\n".join(f"{srt_time(c['start'], '.')} --> {srt_time(c['end'], '.')}\n{c['text']}\n" for c in all_cues)
    Path(f"{base}.srt").write_text(srt)
    Path(f"{base}.vtt").write_text(vtt)
    print(f"{len(all_cues)} cues -> {base}.srt/.vtt")


if __name__ == "__main__":
    main(sys.argv[1])
```

Run test → PASS; then `.venv/bin/python scripts/captions.py full && .venv/bin/python scripts/captions.py cut`.

- [ ] **Step 4: Workspace (user gate).** Clueso `find(type='workspaces')`; report the workspace name/region to the orchestrator and wait for confirmation that "Stackgen" (aps1) is correct before creating anything.
- [ ] **Step 5: Project build in one `run_script`:** `create_project` "Aiden for SRE — cut"; `upload_file` D1 mp4 and the cut SRT; `add_clips` the video; caption track from the SRT; chapters at the first shot start of scenes 2–6 from `build/timing.cut.json` — Triage, Root cause, Remediation, Learn, Platform. Then outside the script: `get_clip(render=…)` at three points and `get_design_guide` → brand check (fonts, colors, caption safe area). Record deviations in QA.md.
- [ ] **Step 6: Aspects (user gate U3; default 9:16 only).** `duplicate_project` → `update_project` aspect → `get_clip(render=…)` confirms OST sits in the top 30% safe area and nothing important is cropped. If Clueso cannot reposition text independently of the picture, stop and report: the fallback is re-rendering fg passes at 1080×1920 (new package; orchestrator decides).
- [ ] **Step 7: Cutdown** — switch to the `demo-cutdown` skill: 30 s from the cut project, keeping title → triage → RCA money shot (S12) → approve (S19) → end card.
- [ ] **Step 8:** `export_project` for cut 16:9, each aspect, and the cutdown; poll `get_export`; download to `renders/master/clueso/`. Record project URLs + export files in `shots/QA.md` § Deliverables. **Commit** `scripts/captions.py tests/test_captions.py shots/QA.md` → `git commit -m "feat(aiden-sre-film): captions + Clueso aspect and cutdown exports"`
