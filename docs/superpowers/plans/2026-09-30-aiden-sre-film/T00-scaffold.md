# T0 — Scaffold, data model, shared core, test harness

Part of `docs/superpowers/plans/2026-09-30-aiden-sre-film.md` (read its Global Constraints, Amendments, Interfaces first).

**Model:** Grok 4.7 · **Phase:** 0 · **Skills:** `hyperframes`, `hyperframes-core`, `hyperframes-cli`, superpowers `test-driven-development`

**Files:**
- Create: `videos/aiden-sre-film/{package.json,hyperframes.json}` (via `npx hyperframes init`), `.gitignore`
- Create: `data/lines.json`, `data/shots.json`, `source/storyboard.json`
- Create: `shared/tokens/brand.css`, `shared/tokens/motion.js`
- Create: `shared/layers/prng.js`, `shared/layers/camera.js`, `shared/layers/shot.js`, `shared/layers/layers.css`, `shared/layers/package.json`
- Create: `shared/vendor/gsap.min.js`, `shared/vendor/three.module.min.js`, `shared/assets/fonts/Geist-Variable.woff2`, `shared/assets/fonts/GeistMono-Variable.woff2`
- Create: `shots/_template/index.html`, `scripts/new_shot.sh`
- Create: `scripts/lib/__init__.py`, `scripts/lib/timing.py`, `scripts/lib/camera.py`, `scripts/build_data.py`, `scripts/lint_brand.py`
- Test: `tests/test_timing.py`, `tests/test_camera.py`, `tests/test_data.py`, `tests/test_brand.py`, `tests/js/prng.test.mjs`, `tests/js/camera.test.mjs`
- Modify: `docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md` (append §16)

**Interfaces:** Produces "Data", the T0 rows of "Shared modules" and `build_data.py`/`new_shot.sh` from the index.

---

- [ ] **Step 1: Scaffold project and tooling**

```bash
mkdir -p videos/aiden-sre-film && cd videos/aiden-sre-film
npx hyperframes@latest init .
python3 -m venv .venv && .venv/bin/pip install -q pytest pillow
npm i -D gsap three geist
mkdir -p data source build camera scripts/lib tests/js shots \
  shared/{tokens,layers,vendor,build} \
  shared/assets/{fonts,plates,gen,logos} shared/assets/audio/{vo,sfx,music} \
  renders/{passes,shots,master,review}
cp /tmp/aofvid/storyboard.json source/storyboard.json
cp node_modules/gsap/dist/gsap.min.js shared/vendor/
cp node_modules/three/build/three.module.min.js shared/vendor/
find node_modules/geist -name "Geist-Variable.woff2" -exec cp {} shared/assets/fonts/ \;
find node_modules/geist -name "GeistMono-Variable.woff2" -exec cp {} shared/assets/fonts/ \;
ls shared/assets/fonts shared/vendor
```

Expected: both WOFF2 files, `gsap.min.js`, `three.module.min.js`. If `init` prompts, choose a blank project, no template, no Tailwind. If `/tmp/aofvid/storyboard.json` is gone, download Drive file `1YbNf9XchVrp3g4v7wNoJsmLIi_fMFTWR` (Composio `GOOGLEDRIVE_DOWNLOAD_FILE`) and extract the `const DATA = {...}` object to JSON.

`.gitignore`:

```
.venv/
node_modules/
build/
renders/
shared/build/
shots/*/_shared
```

Read `~/.cursor/skills/hyperframes-animation/adapters/` GSAP file. If it says the runtime injects GSAP, drop the `gsap.min.js` `<script>` line from the template in Step 9.

- [ ] **Step 2: Data files**

`data/lines.json` (text verbatim from storyboard `sre`):

```json
[
{"id":"L01","scene":1,"text":"Your on-call team is buried in alerts, and most of them don't matter. The ones that do can take hours to untangle."},
{"id":"L02","scene":1,"gap_before":{"full":0.6,"cut":0.6},"text":"Meet Aiden for SRE, your AI SRE teammate. It connects to the observability tools you already run and maps your services on its own."},
{"id":"L03","scene":2,"text":"One failure can set off a flood of alerts."},
{"id":"L04","scene":2,"text":"Aiden triages every alert as it arrives. It groups related alerts, filters the noise, and ranks the rest by impact on your services."},
{"id":"L05","scene":2,"text":"Your engineers see only the alerts that need them, and save their energy for real incidents."},
{"id":"L06","scene":3,"text":"When a real incident hits, most of the time goes into investigation."},
{"id":"L07","scene":3,"text":"Aiden starts investigating the moment an alert fires. It correlates logs, metrics and events across your dependencies. Then it scores every possible cause against the evidence, and even tries to prove itself wrong."},
{"id":"L08","scene":3,"full_only":true,"text":"When several things break at once, it points you to the one that started it."},
{"id":"L09","scene":3,"text":"Your team starts from a probable root cause, and MTTR comes down."},
{"id":"L10","scene":4,"text":"Even with the cause in hand, the fix is often manual."},
{"id":"L11","scene":4,"text":"Aiden runs the remediation, from restarting a service or scaling out to rerouting traffic or rolling back a deployment. Your team sets which actions need approval, and every action goes into a full audit trail."},
{"id":"L12","scene":4,"text":"Incidents close faster, and your team stays in control of what runs."},
{"id":"L13","scene":5,"text":"And it keeps learning. Every investigation adds to what Aiden knows about your environment, so the next incident starts further ahead."},
{"id":"L14","scene":5,"full_only":true,"text":"Aiden watches your error budgets too, and acts before a breach."},
{"id":"L15","scene":6,"gap_before":{"cut":2.45},"text":"Aiden for SRE runs on the Aiden World Model, the shared record of what's deployed, what changed, what broke and what fixed it. And Aiden OS holds every action to your policies."},
{"id":"L16","scene":7,"text":"See Aiden for SRE on your own alerts. Book a demo, or try the free Community Edition."}
]
```

`data/shots.json` (camera from spec §6 + amendment 7):

```json
[
{"id":"S01","scene":1,"anchor":{"line":"L01","phrase":"Your on-call"},"blur":"normal","seed":101,"plates":[],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":-20,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.05}},"ost":[]},
{"id":"S02","scene":1,"anchor":{"line":"L01","phrase":"The ones"},"blur":"heavy","seed":102,"plates":[],"cam":{"from":{"x":0,"y":-20,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.05},"to":{"x":0,"y":-20,"z":0,"rx":0,"ry":-4,"rz":1.5,"scale":1.18}},"ost":[{"kind":"cue","text":"hours","cue":"hours"}]},
{"id":"S03","scene":1,"anchor":{"line":"L02","phrase":"Meet Aiden"},"blur":"normal","seed":103,"plates":[],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":60,"rx":0,"ry":0,"rz":0,"scale":1.03}},"ost":[{"kind":"eyebrow","text":"AIDEN FOR SRE","cue":null},{"kind":"headline","text":"Your AI SRE teammate.","bold":"AI SRE","cue":"your AI"}]},
{"id":"S04","scene":1,"anchor":{"line":"L02","phrase":"It connects"},"blur":"normal","seed":104,"plates":[],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":-6,"rz":0,"scale":1.0},"to":{"x":-80,"y":0,"z":0,"rx":0,"ry":2,"rz":0,"scale":1.0}},"ost":[]},
{"id":"S05","scene":1,"anchor":{"line":"L02","phrase":"and maps"},"blur":"normal","seed":105,"plates":[],"cam":{"from":{"x":0,"y":0,"z":0,"rx":20,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":28,"ry":0,"rz":0,"scale":1.08}},"ost":[{"kind":"support","text":"Discovers your services and dependencies","cue":"maps"}]},
{"id":"S06","scene":2,"anchor":{"line":"L03","phrase":"One failure"},"blur":"normal","seed":106,"plates":["P01"],"cam":{"from":{"x":0,"y":0,"z":-200,"rx":0,"ry":-18,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":-8,"rz":0,"scale":1.0}},"ost":[{"kind":"eyebrow","text":"ALERT TRIAGE","cue":null}]},
{"id":"S07","scene":2,"anchor":{"line":"L04","phrase":"Aiden triages"},"blur":"heavy","seed":107,"plates":["P01","P03"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":-8,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.1}},"ost":[{"kind":"cue","text":"groups","cue":"groups"},{"kind":"cue","text":"filters","cue":"filters"}]},
{"id":"S08","scene":2,"anchor":{"line":"L04","phrase":"and ranks"},"blur":"normal","seed":108,"plates":["P03"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.1},"to":{"x":-40,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.1}},"ost":[{"kind":"support","text":"Correlated","cue":null},{"kind":"support","text":"de-duplicated","cue":null},{"kind":"support","text":"ranked by service impact","cue":"ranks"}]},
{"id":"S09","scene":2,"anchor":{"line":"L05","phrase":"Your engineers"},"blur":"normal","seed":109,"plates":["P02"],"cam":{"from":{"x":-40,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.1},"to":{"x":-40,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.02}},"ost":[{"kind":"support","text":"Only the alerts that need you","cue":"only"}]},
{"id":"S10","scene":3,"anchor":{"line":"L06","phrase":"When a"},"blur":"normal","seed":110,"plates":["P02","P04"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.22}},"ost":[{"kind":"eyebrow","text":"ROOT CAUSE ANALYSIS","cue":null},{"kind":"cue","text":"hits","cue":"hits"}]},
{"id":"S11","scene":3,"anchor":{"line":"L07","phrase":"Aiden starts"},"blur":"normal","seed":111,"plates":["P06"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":-10,"rz":0,"scale":1.03}},"ost":[{"kind":"callout","text":"logs","cue":"logs"},{"kind":"callout","text":"metrics","cue":"metrics"},{"kind":"callout","text":"events","cue":"events"}]},
{"id":"S12","scene":3,"anchor":{"line":"L07","phrase":"Then it"},"blur":"normal","seed":112,"plates":["P07"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":6,"ry":-10,"rz":0,"scale":1.0},"to":{"x":-40,"y":0,"z":0,"rx":4,"ry":-6,"rz":0,"scale":1.04}},"ost":[{"kind":"cue","text":"scores","cue":"scores"}]},
{"id":"S13","scene":3,"anchor":{"line":"L07","phrase":"and even"},"blur":"normal","seed":113,"plates":["P07"],"cam":{"from":{"x":-40,"y":0,"z":0,"rx":4,"ry":-6,"rz":0,"scale":1.04},"to":{"x":-120,"y":20,"z":0,"rx":4,"ry":-6,"rz":0,"scale":1.12}},"ost":[{"kind":"callout","text":"ruled out · 4%","cue":"wrong"}]},
{"id":"S14","scene":3,"full_only":true,"anchor":{"line":"L08","phrase":"When several"},"blur":"normal","seed":114,"plates":["P08"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":-6,"rz":0,"scale":1.0},"to":{"x":120,"y":0,"z":0,"rx":0,"ry":-6,"rz":0,"scale":1.0}},"ost":[{"kind":"support","text":"Root signal · downstream effect","cue":"points"}]},
{"id":"S15","scene":3,"anchor":{"line":"L09","phrase":"Your team"},"blur":"normal","seed":115,"plates":["P09"],"cam":{"from":{"x":0,"y":0,"z":-300,"rx":0,"ry":-28,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":-10,"rz":0,"scale":1.0}},"ost":[{"kind":"support","text":"Probable cause, with the evidence","cue":"probable"},{"kind":"cue","text":"down","cue":"down"}]},
{"id":"S16","scene":4,"anchor":{"line":"L10","phrase":"Even with"},"blur":"normal","seed":116,"plates":[],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":40,"y":-10,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0}},"ost":[{"kind":"eyebrow","text":"REMEDIATION","cue":null}]},
{"id":"S17","scene":4,"anchor":{"line":"L11","phrase":"Aiden runs"},"blur":"normal","seed":117,"plates":["P10"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":-12,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.03}},"ost":[{"kind":"support","text":"Restart","cue":"restarting"},{"kind":"support","text":"scale","cue":"scaling"}]},
{"id":"S18","scene":4,"anchor":{"line":"L11","phrase":"to rerouting"},"blur":"normal","seed":118,"plates":["P10"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.03},"to":{"x":-50,"y":0,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.05}},"ost":[{"kind":"support","text":"reroute traffic","cue":"rerouting"},{"kind":"support","text":"roll back","cue":"rolling"}]},
{"id":"S19","scene":4,"anchor":{"line":"L11","phrase":"Your team"},"blur":"normal","seed":119,"plates":["P11"],"cam":{"from":{"x":-50,"y":0,"z":0,"rx":0,"ry":-4,"rz":0,"scale":1.05},"to":{"x":-80,"y":20,"z":0,"rx":0,"ry":-2,"rz":0,"scale":1.08}},"ost":[{"kind":"support","text":"Approval gate","cue":"approval"},{"kind":"support","text":"full audit trail","cue":"audit"}]},
{"id":"S20","scene":4,"anchor":{"line":"L12","phrase":"Incidents close"},"blur":"normal","seed":120,"plates":["P12"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.08},"to":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0}},"ost":[{"kind":"support","text":"You decide what runs","cue":"control"},{"kind":"cue","text":"close","cue":"close"}]},
{"id":"S21","scene":5,"anchor":{"line":"L13","phrase":"And it"},"blur":"normal","seed":121,"plates":["P12"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":-200,"rx":0,"ry":0,"rz":0,"scale":1.0}},"ost":[{"kind":"cue","text":"learning","cue":"learning"}]},
{"id":"S22","scene":5,"anchor":{"line":"L13","phrase":"so the next"},"blur":"normal","seed":122,"plates":["P13"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":24,"ry":0,"rz":0,"scale":1.0},"to":{"x":30,"y":0,"z":0,"rx":26,"ry":0,"rz":0,"scale":1.06}},"ost":[{"kind":"support","text":"Every incident makes the next one easier","cue":"next"}]},
{"id":"S23","scene":5,"anchor":{"line":"L14","phrase":"Aiden watches"},"anchor_cut":{"line":"L13","at":"end","offset":0.1},"blur":"normal","seed":123,"plates":["P14","P15"],"cam":{"from":{"x":30,"y":0,"z":0,"rx":26,"ry":0,"rz":0,"scale":1.06},"to":{"x":60,"y":-10,"z":0,"rx":26,"ry":4,"rz":0,"scale":1.1}},"ost":[{"kind":"support","text":"Error budget tracking","cue":"budgets","full_only":true}]},
{"id":"S24","scene":6,"anchor":{"line":"L15","phrase":"Aiden for"},"blur":"heavy","seed":124,"plates":["P12"],"cam":{"from":{"x":0,"y":0,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":0,"z":-600,"rx":30,"ry":0,"rz":0,"scale":1.0}},"ost":[{"kind":"cue","text":"world","cue":"world"}]},
{"id":"S25","scene":6,"anchor":{"line":"L15","phrase":"the shared"},"blur":"normal","seed":125,"plates":[],"cam":{"from":{"x":0,"y":0,"z":0,"rx":30,"ry":0,"rz":0,"scale":1.0},"to":{"x":-40,"y":0,"z":0,"rx":30,"ry":0,"rz":0,"scale":1.03}},"ost":[{"kind":"eyebrow","text":"AIDEN WORLD MODEL","cue":null},{"kind":"callout","text":"deployed","cue":"deployed"},{"kind":"callout","text":"changed","cue":"changed"},{"kind":"callout","text":"broke","cue":"broke"},{"kind":"callout","text":"fixed","cue":"fixed"}]},
{"id":"S26","scene":6,"anchor":{"line":"L15","phrase":"And Aiden"},"blur":"normal","seed":126,"plates":[],"cam":{"from":{"x":-40,"y":0,"z":0,"rx":30,"ry":0,"rz":0,"scale":1.0},"to":{"x":-40,"y":0,"z":0,"rx":22,"ry":0,"rz":0,"scale":1.04}},"ost":[{"kind":"eyebrow","text":"AIDEN OS","cue":"os"},{"kind":"callout","text":"policy","cue":"policies"},{"kind":"callout","text":"approvals","cue":null},{"kind":"callout","text":"audit","cue":null}]},
{"id":"S27","scene":7,"anchor":{"line":"L16","phrase":"See Aiden"},"blur":"normal","seed":127,"plates":[],"cam":{"from":{"x":0,"y":0,"z":40,"rx":0,"ry":0,"rz":0,"scale":1.0},"to":{"x":0,"y":-30,"z":0,"rx":0,"ry":0,"rz":0,"scale":1.0}},"ost":[{"kind":"cta","text":"Book a demo","cue":"book"},{"kind":"cta","text":"Try Community Edition","cue":"community"},{"kind":"support","text":"free for up to two users","cue":"community"}]}
]
```

- [ ] **Step 3: Failing Python tests**

`tests/test_timing.py`:

```python
import sys
from pathlib import Path
import pytest
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from lib import timing


def W(text, step=0.4):
    return [{"word": w, "start": round(i * step, 3), "end": round(i * step + 0.35, 3)}
            for i, w in enumerate(text.split())]


LINES = [
    {"id": "L1", "scene": 1, "text": "Alpha beta gamma delta."},
    {"id": "L2", "scene": 1, "text": "Epsilon zeta eta.", "full_only": True},
    {"id": "L3", "scene": 2, "text": "Theta iota kappa.", "gap_before": {"cut": 1.5}},
]
WORDS = {l["id"]: W(l["text"]) for l in LINES}
SHOTS = [
    {"id": "A", "anchor": {"line": "L1", "phrase": "Alpha"},
     "ost": [{"text": "x", "cue": None}, {"text": "y", "cue": "gamma"}]},
    {"id": "B", "anchor": {"line": "L2", "phrase": "Epsilon"}, "full_only": True},
    {"id": "C", "anchor": {"line": "L3", "phrase": "Theta"},
     "ost": [{"text": "z", "cue": "kappa", "full_only": True}]},
]


def test_norm_strips_punctuation():
    assert timing.norm("Teammate.") == "teammate"
    assert timing.norm("what's,") == "what's"
    assert timing.norm("on-call") == "oncall"


def test_find_phrase():
    assert timing.find_phrase(WORDS["L1"], "gamma delta") == 2


def test_find_phrase_missing():
    with pytest.raises(KeyError):
        timing.find_phrase(WORDS["L1"], "omega")


def test_full_line_offsets():
    off, _ = timing.place_lines(LINES, WORDS, "full")
    assert off == {"L1": 0.8, "L2": 2.7, "L3": 4.55}


def test_cut_skips_full_only_and_uses_gap_override():
    off, _ = timing.place_lines(LINES, WORDS, "cut")
    assert off == {"L1": 0.8, "L3": 3.85}


def test_first_shot_starts_at_zero_others_lead_their_anchor():
    t = timing.build(SHOTS, LINES, WORDS, "full")
    assert [s["id"] for s in t["shots"]] == ["A", "B", "C"]
    assert t["shots"][0]["start"] == 0.0
    assert t["shots"][1]["start"] == 2.45


def test_last_shot_ends_after_hold():
    t = timing.build(SHOTS, LINES, WORDS, "full")
    last = t["shots"][-1]
    assert round(last["start"] + last["duration"], 3) == t["duration"] == 7.2


def test_cues_null_then_word():
    a = timing.build(SHOTS, LINES, WORDS, "full")["shots"][0]
    assert [o["t"] for o in a["ost"]] == [0.2, 1.5]


def test_cut_drops_full_only_shot_and_ost():
    t = timing.build(SHOTS, LINES, WORDS, "cut")
    assert [s["id"] for s in t["shots"]] == ["A", "C"]
    assert t["shots"][1]["ost"] == []


def test_anchor_at_line_end():
    shots = [SHOTS[0], {"id": "D", "anchor": {"line": "L1", "at": "end", "offset": 0.1}}]
    t = timing.build(shots, LINES[:1], {"L1": WORDS["L1"]}, "full")
    assert t["shots"][1]["start"] == 2.45


def test_check_durations():
    t = {"shots": [{"id": "A", "duration": 2.0}, {"id": "B", "duration": 5.0},
                   {"id": "C", "duration": 9.0}, {"id": "D", "duration": 2.1}]}
    assert timing.check_durations(t, exempt={"D"}) == [("A", 2.0), ("C", 9.0)]


def test_placeholder_words_145wpm():
    w = timing.placeholder_words("one two three")
    assert len(w) == 3 and abs(w[1]["start"] - 60 / 145) < 1e-3
```

`tests/test_camera.py`:

```python
import json, sys
from pathlib import Path
import pytest
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from lib import camera

K0 = {"x": 0, "y": 0, "z": 0, "rx": 0, "ry": 0, "rz": 0, "scale": 1.0}
CAM = {"from": K0, "to": {**K0, "ry": -4, "scale": 1.05}, "blur": "normal"}


def test_make_and_validate():
    c = camera.validate(camera.make("S01", 4.6, CAM))
    assert c["keys"][-1]["t"] == 4.6 and c["perspective"] == 2400 and c["ease"] == "power2.inOut"


def test_scale_counts_as_motion():
    assert camera.is_moving(camera.make("S01", 4.6, CAM))


def test_rotation_only_is_static():
    assert not camera.is_moving(camera.make("X", 4, {**CAM, "to": {**K0, "ry": -12}}))


def test_drift_threshold():
    assert camera.is_moving(camera.make("X", 4, {**CAM, "to": {**K0, "x": 30}}))
    assert not camera.is_moving(camera.make("X", 4, {**CAM, "to": {**K0, "x": 29}}))


def test_bad_blur_rejected():
    with pytest.raises(ValueError):
        camera.validate(camera.make("X", 4, {**CAM, "blur": "extreme"}))


def test_every_repo_camera_moves():  # acceptance A3
    files = sorted((ROOT / "camera").glob("S*.json"))
    assert len(files) == 27
    for p in files:
        assert camera.is_moving(camera.validate(json.loads(p.read_text()))), p.name
```

`tests/test_data.py`:

```python
import json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from lib import timing

SHOTS = json.loads((ROOT / "data/shots.json").read_text())
LINES = json.loads((ROOT / "data/lines.json").read_text())
WORDS = {l["id"]: timing.placeholder_words(l["text"]) for l in LINES}


def test_counts_and_ids():
    assert [s["id"] for s in SHOTS] == [f"S{i:02d}" for i in range(1, 28)]
    assert [l["id"] for l in LINES] == [f"L{i:02d}" for i in range(1, 17)]


def test_every_anchor_and_cue_resolves():
    for s in SHOTS:
        i = timing.find_phrase(WORDS[s["anchor"]["line"]], s["anchor"]["phrase"])
        for o in s["ost"]:
            if o["cue"]:
                timing.find_phrase(WORDS[s["anchor"]["line"]], o["cue"], i)


def test_plate_ids_valid():
    ok = {f"P{i:02d}" for i in range(1, 16)}
    assert all(set(s["plates"]) <= ok for s in SHOTS)


def test_cut_removes_exactly_s14():
    full = timing.build(SHOTS, LINES, WORDS, "full")
    cut = timing.build(SHOTS, LINES, WORDS, "cut")
    assert {s["id"] for s in full["shots"]} - {s["id"] for s in cut["shots"]} == {"S14"}
    assert cut["duration"] < full["duration"]


def test_only_s23_changes_shot_relative_timing_between_cuts():
    full = {s["id"]: s for s in timing.build(SHOTS, LINES, WORDS, "full")["shots"]}
    cut = {s["id"]: s for s in timing.build(SHOTS, LINES, WORDS, "cut")["shots"]}
    changed = {k for k in cut if abs(cut[k]["duration"] - full[k]["duration"]) > 0.02}
    assert changed == {"S23"}
```

`tests/test_brand.py`:

```python
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import lint_brand


def test_flags_offbrand_color_radius_font(tmp_path):
    f = tmp_path / "x.html"
    f.write_text('<style>.a{color:#FF0000;border-radius:8px;font-family:Inter,sans-serif}'
                 '.b{color:#ba99fd;border-radius:0;font-family:"Geist",sans-serif}</style>')
    errs = lint_brand.lint([f])
    assert len(errs) == 3
    assert any("#FF0000" in e for e in errs) and any("8px" in e for e in errs) and any("Inter" in e for e in errs)


def test_repo_is_clean():
    assert lint_brand.lint(lint_brand.targets()) == []
```

- [ ] **Step 4: Run to verify failure**

Run: `.venv/bin/pytest -q tests`
Expected: errors — `No module named 'lib'`, `No module named 'lint_brand'`.

- [ ] **Step 5: `scripts/lib/timing.py`** (and empty `scripts/lib/__init__.py`)

```python
"""Derive shot timing from VO word timestamps. Spec §5, §8.1."""
import re

FIRST_LINE_AT = 0.80
GAP_LINE = 0.35
GAP_SCENE = 0.70
LEAD = 0.25
CUE_OFFSET = -0.10
NULL_CUE_START = 0.20
NULL_CUE_STEP = 0.35
END_HOLD = 1.50
MIN_SHOT, MAX_SHOT = 3.0, 8.0


def norm(word):
    return re.sub(r"[^\w']", "", word.lower())


def placeholder_words(text, wpm=145):
    step = 60.0 / wpm
    return [{"word": w, "start": round(i * step, 3), "end": round(i * step + step * 0.85, 3)}
            for i, w in enumerate(text.split())]


def find_phrase(words, phrase, start=0):
    toks = [norm(t) for t in phrase.split()]
    for i in range(start, len(words) - len(toks) + 1):
        if all(norm(words[i + j]["word"]) == toks[j] for j in range(len(toks))):
            return i
    raise KeyError(f"phrase {phrase!r} not found from word {start}")


def place_lines(lines, words, mode):
    offsets, t, prev = {}, FIRST_LINE_AT, None
    for ln in lines:
        if mode == "cut" and ln.get("full_only"):
            continue
        if prev is not None:
            default = GAP_SCENE if ln["scene"] != prev["scene"] else GAP_LINE
            t += ln.get("gap_before", {}).get(mode, default)
        offsets[ln["id"]] = round(t, 3)
        t += words[ln["id"]][-1]["end"]
        prev = ln
    return offsets, t


def _anchor(anchor, offsets, words):
    w = words[anchor["line"]]
    if anchor.get("at") == "end":
        return offsets[anchor["line"]] + w[-1]["end"] + anchor.get("offset", 0.0), 0
    i = find_phrase(w, anchor["phrase"])
    return offsets[anchor["line"]] + w[i]["start"] - LEAD, i


def build(shots, lines, words, mode="full"):
    offsets, vo_end = place_lines(lines, words, mode)
    live = [s for s in shots if not (mode == "cut" and s.get("full_only"))]
    placed = []
    for n, s in enumerate(live):
        anchor = s["anchor_cut"] if mode == "cut" and "anchor_cut" in s else s["anchor"]
        t, i = _anchor(anchor, offsets, words)
        placed.append((s, 0.0 if n == 0 else round(t, 3), anchor, i))
    ends = [p[1] for p in placed[1:]] + [round(vo_end + END_HOLD, 3)]
    out = []
    for (s, st, anchor, i), en in zip(placed, ends):
        ost, nulls = [], 0
        for item in s.get("ost", []):
            if mode == "cut" and item.get("full_only"):
                continue
            if item.get("cue") is None:
                t = NULL_CUE_START + NULL_CUE_STEP * nulls
                nulls += 1
            else:
                w = words[anchor["line"]]
                j = find_phrase(w, item["cue"], i)
                t = offsets[anchor["line"]] + w[j]["start"] + CUE_OFFSET - st
            ost.append({**item, "t": round(t, 3)})
        out.append({"id": s["id"], "start": st, "duration": round(en - st, 3), "ost": ost})
    return {"mode": mode, "duration": ends[-1], "lines": offsets, "shots": out}


def check_durations(t, exempt=()):
    return [(s["id"], s["duration"]) for s in t["shots"]
            if s["id"] not in exempt and not MIN_SHOT <= s["duration"] <= MAX_SHOT]
```

- [ ] **Step 6: `scripts/lib/camera.py`**

```python
"""Camera file schema + motion check. Spec §4.2, acceptance A3."""
import math

FIELDS = ("x", "y", "z", "rx", "ry", "rz", "scale")


def make(shot_id, duration, cam):
    d = round(duration, 3)
    return {"shot": shot_id, "duration": d, "perspective": cam.get("perspective", 2400),
            "keys": [{"t": 0.0, **cam["from"]}, {"t": d, **cam["to"]}],
            "ease": cam.get("ease", "power2.inOut"), "blur": cam.get("blur", "normal")}


def validate(c):
    for f in ("shot", "duration", "perspective", "keys", "ease", "blur"):
        if f not in c:
            raise ValueError(f"{c.get('shot')}: missing {f}")
    if c["blur"] not in ("normal", "heavy"):
        raise ValueError(f"{c['shot']}: blur must be normal|heavy")
    if len(c["keys"]) < 2:
        raise ValueError(f"{c['shot']}: need >= 2 keys")
    for k in c["keys"]:
        missing = [f for f in ("t",) + FIELDS if f not in k]
        if missing:
            raise ValueError(f"{c['shot']}: key missing {missing}")
    ts = [k["t"] for k in c["keys"]]
    if ts[0] != 0 or ts != sorted(ts) or abs(ts[-1] - c["duration"]) > 1e-3:
        raise ValueError(f"{c['shot']}: key times must run 0..duration")
    return c


def is_moving(c, min_scale=0.02, min_drift=30.0):
    a = c["keys"][0]
    for k in c["keys"][1:]:
        if abs(k["scale"] - a["scale"]) / a["scale"] >= min_scale - 1e-9:
            return True
        if math.dist((k["x"], k["y"], k["z"]), (a["x"], a["y"], a["z"])) >= min_drift:
            return True
    return False
```

- [ ] **Step 7: `scripts/build_data.py`**

```python
"""Emit build/timing.{full,cut}.json, camera/Sxx.json and shared/build/data.js.
Run after any change to data/*.json, VO words, plate snapshots or graph.
Usage: python3 scripts/build_data.py [--placeholder]"""
import json, os, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from lib import camera, timing

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))
EXEMPT = {"full": {"S27"}, "cut": {"S23", "S27"}}


def read(rel):
    return json.loads((ROOT / rel).read_text())


def load_words(lines, placeholder):
    words = {}
    for ln in lines:
        p = ROOT / "shared/assets/audio/vo" / f"{ln['id']}.words.json"
        if p.exists():
            words[ln["id"]] = json.loads(p.read_text())
        elif placeholder:
            words[ln["id"]] = timing.placeholder_words(ln["text"])
        else:
            raise SystemExit(f"missing {p} (run with --placeholder until VO exists)")
    return words


def main(argv):
    placeholder = "--placeholder" in argv
    shots, lines = read("data/shots.json"), read("data/lines.json")
    words = load_words(lines, placeholder)
    for d in ("build", "camera", "shared/build"):
        (ROOT / d).mkdir(parents=True, exist_ok=True)
    timings, problems = {}, []
    for mode in ("full", "cut"):
        t = timing.build(shots, lines, words, mode)
        (ROOT / f"build/timing.{mode}.json").write_text(json.dumps(t, indent=1))
        timings[mode] = t
        problems += [f"{mode} {sid} {d}s" for sid, d in timing.check_durations(t, EXEMPT[mode])]
    full = {s["id"]: s for s in timings["full"]["shots"]}
    cut = {s["id"]: s for s in timings["cut"]["shots"]}
    cams = {}
    for s in shots:
        c = camera.validate(camera.make(s["id"], full[s["id"]]["duration"], {**s["cam"], "blur": s["blur"]}))
        if not camera.is_moving(c):
            problems.append(f"static camera {s['id']}")
        (ROOT / f"camera/{s['id']}.json").write_text(json.dumps(c, indent=1))
        cams[s["id"]] = c
    plates = {p.name.split(".")[0]: json.loads(p.read_text())
              for p in sorted((ROOT / "shared/assets/plates").glob("*.snapshot.json"))}
    graph = ROOT / "data/graph.json"
    data = {
        "shots": {s["id"]: {"meta": s, "full": full[s["id"]], **({"cut": cut[s["id"]]} if s["id"] in cut else {})}
                  for s in shots},
        "cameras": cams, "plates": plates,
        "graph": json.loads(graph.read_text()) if graph.exists() else None,
        "placeholder": placeholder,
    }
    (ROOT / "shared/build/data.js").write_text("window.SG_DATA = " + json.dumps(data) + ";\n")
    for p in problems:
        print("PROBLEM", p)
    print(f"full {timings['full']['duration']}s  cut {timings['cut']['duration']}s  shots {len(shots)}")
    return 1 if problems and not placeholder else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 8: `scripts/lint_brand.py`**

```python
"""Acceptance A8: brand tokens only, 0 radius, Geist only, no innerHTML."""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED = {"#14110c", "#1b1811", "#211d15", "#3f3b39", "#f1eae0", "#faf7f2", "#96897c",
           "#ba99fd", "#a0eafc", "#fda39b", "#fdd89b", "#a6f0bf"}
HEX = re.compile(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b")
RADIUS = re.compile(r"border-radius\s*:\s*([^;}\"']+)")
FONT = re.compile(r"font-family\s*:\s*([^;}]+)")
FONTS_OK = {"Geist", "Geist Mono", "var(--sg-font)", "var(--sg-mono)", "inherit"}


def targets():
    globs = ["shots/S*/index.html", "shots/_template/index.html", "shared/layers/*.js",
             "shared/layers/*.css", "shared/tokens/*.css"]
    return sorted(p for g in globs for p in ROOT.glob(g))


def lint(paths):
    errs = []
    for p in paths:
        s = Path(p).read_text()
        for m in HEX.finditer(s):
            h = m.group(0).lower()
            if len(h) == 4:
                h = "#" + "".join(c * 2 for c in h[1:])
            if h not in ALLOWED:
                errs.append(f"{p}: off-brand color {m.group(0)}")
        for m in RADIUS.finditer(s):
            if m.group(1).strip() not in ("0", "0px"):
                errs.append(f"{p}: border-radius {m.group(1).strip()}")
        for m in FONT.finditer(s):
            first = m.group(1).split(",")[0].strip().strip("'\"")
            if first not in FONTS_OK:
                errs.append(f"{p}: font {first}")
    return errs


if __name__ == "__main__":
    e = lint(targets())
    print("\n".join(e) or "brand lint clean")
    sys.exit(1 if e else 0)
```

Do not use element ids that look like hex (`#add`, `#bad`, `#face01`): the lint flags them.

- [ ] **Step 9: Tokens, JS core, CSS, shot template, new_shot.sh**

`shared/tokens/brand.css`: one `:root` rule containing the spec §3.1 and §3.2 custom properties verbatim.

`shared/tokens/motion.js`:

```js
export const EASE = { enter: "expo.out", exit: "power3.in", camera: "power2.inOut", settle: "back.out(1.4)", snap: "power4.out" };
export const DUR = { micro: 0.18, ui: 0.42, enter: 0.7, camera: 2.4, hold: 1.2 };
export const STAGGER = { rows: 0.035, chips: 0.08, words: 0.05 };
```

`shared/layers/prng.js`:

```js
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

`shared/layers/camera.js`:

```js
export const PARALLAX = { bg: 0.25, mid: 1.0, fg: 1.35 };
const FIELDS = ["x", "y", "z", "rx", "ry", "rz", "scale"];

export function poseAt(cam, p) {
  const t = Math.min(Math.max(p, 0), 1) * cam.duration;
  const k = cam.keys;
  let i = 0;
  while (i < k.length - 2 && t > k[i + 1].t) i++;
  const a = k[i], b = k[i + 1];
  const u = b.t === a.t ? 1 : (t - a.t) / (b.t - a.t);
  const pose = {};
  for (const f of FIELDS) pose[f] = a[f] + (b[f] - a[f]) * u;
  return pose;
}

export function transformFor(pose, factor, pass, perspective = 2400) {
  const s = 1 + (pose.scale - 1) * factor;
  const x = pose.x * factor, y = pose.y * factor, z = pose.z * factor;
  if (pass === "mid") {
    return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg) scale(${s})`;
  }
  const zs = perspective / (perspective - z);
  return `translate(${x}px, ${y}px) rotate(${pose.rz * factor}deg) scale(${(s * zs).toFixed(5)})`;
}

export function applyCamera(tl, cam, roots, duration) {
  const proxy = { p: 0 };
  const paint = () => {
    const pose = poseAt(cam, proxy.p);
    for (const [pass, el] of Object.entries(roots)) {
      if (el) el.style.transform = transformFor(pose, PARALLAX[pass], pass, cam.perspective);
    }
  };
  paint();
  tl.to(proxy, { p: 1, duration, ease: cam.ease, onUpdate: paint }, 0);
}
```

`shared/layers/shot.js`:

```js
export function selectPass(id, pass) {
  const out = {};
  for (const p of ["bg", "mid", "fg"]) {
    const el = document.getElementById(`${id}-${p}`);
    if (pass === "all" || p === pass) out[p] = p === "bg" ? el : el.querySelector(".cam");
    else el.style.display = "none";
  }
  document.documentElement.dataset.pass = pass;
  return out;
}

export function shotData(id, mode) {
  const s = window.SG_DATA.shots[id];
  return { meta: s.meta, timing: s[mode] ?? s.full, cam: window.SG_DATA.cameras[id] };
}

export function cueT(timing, text) {
  const o = timing.ost.find(x => x.text === text);
  if (!o) throw new Error(`no cue "${text}" in ${timing.id}`);
  return o.t;
}
```

`shared/layers/package.json` (so Node tests load the layer files as ES modules):

```json
{ "type": "module" }
```

`shared/layers/layers.css`:

```css
#root { width: 100%; height: 100%; position: relative; overflow: hidden; background: transparent; }
.pass { position: absolute; inset: 0; }
.pass-bg { background: var(--sg-ink); }
.pass-mid { perspective: 2400px; }
.cam { position: absolute; inset: 0; transform-style: preserve-3d; transform-origin: 50% 50%; }
html[data-pass="mid"] body, html[data-pass="fg"] body { background: transparent; }
```

`shots/_template/index.html` (`SXX` replaced by `new_shot.sh`; `DATA_ID` is the SG_DATA shot to read, normally the same):

```html
<!doctype html>
<html data-composition-variables='[{"id":"pass","type":"string","label":"Pass: bg|mid|fg|all","default":"all"},{"id":"mode","type":"string","label":"Edit: full|cut","default":"full"}]'>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="_shared/tokens/brand.css">
<link rel="stylesheet" href="_shared/layers/layers.css">
<style>
  @font-face { font-family: "Geist"; src: url("_shared/assets/fonts/Geist-Variable.woff2") format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("_shared/assets/fonts/GeistMono-Variable.woff2") format("woff2"); font-weight: 100 900; }
  body { margin: 0; font-family: "Geist", sans-serif; color: var(--sg-cream); }
</style>
<script src="_shared/vendor/gsap.min.js"></script>
<script src="_shared/build/data.js"></script>
</head>
<body>
<div id="root" data-composition-id="SXX" data-width="1920" data-height="1080">
  <div id="SXX-bg" class="pass pass-bg"></div>
  <div id="SXX-mid" class="pass pass-mid"><div class="cam"></div></div>
  <div id="SXX-fg" class="pass pass-fg"><div class="cam"></div></div>
</div>
<script type="module">
  import { applyCamera } from "./_shared/layers/camera.js";
  import { selectPass, shotData } from "./_shared/layers/shot.js";
  const ID = "SXX";
  const DATA_ID = "SXX";
  const { pass, mode } = window.__hyperframes.getVariables();
  const { meta, timing, cam } = shotData(DATA_ID, mode);
  const roots = selectPass(ID, pass);
  const bg = document.getElementById(`${ID}-bg`);
  const mid = document.querySelector(`#${ID}-mid .cam`);
  const fg = document.querySelector(`#${ID}-fg .cam`);
  const tl = gsap.timeline({ paused: true });

  // SHOT BUILD: mount layers into bg / mid / fg; add tweens at shot-relative times from `timing`.

  applyCamera(tl, cam, roots, timing.duration);
  tl.set({}, {}, timing.duration);
  window.__timelines[ID] = tl;
</script>
</body>
</html>
```

`scripts/new_shot.sh`:

```bash
#!/usr/bin/env bash
# Create shots/<ID>/ from the template. Usage: scripts/new_shot.sh S12 [DATA_ID]
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; DATA_ID="${2:-$1}"; D="shots/$ID"
[[ -e "$D/index.html" ]] && { echo "$D exists"; exit 1; }
mkdir -p "$D"
sed -e "s/const DATA_ID = \"SXX\"/const DATA_ID = \"$DATA_ID\"/" -e "s/SXX/$ID/g" shots/_template/index.html > "$D/index.html"
cp hyperframes.json "$D/hyperframes.json"
ln -sfn ../../shared "$D/_shared"
echo "created $D (data $DATA_ID)"
```

(The first `sed` expression runs before the global replace, so `DATA_ID` gets the data id and every other `SXX` gets the shot id. Demo projects use this: `scripts/new_shot.sh D01-ribbons S04`.)

- [ ] **Step 10: JS tests, then run everything**

`tests/js/prng.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { mulberry32 } from "../../shared/layers/prng.js";

test("same seed, same sequence; range [0,1)", () => {
  const a = mulberry32(7), b = mulberry32(7);
  for (let i = 0; i < 100; i++) { const x = a(); assert.equal(x, b()); assert.ok(x >= 0 && x < 1); }
});
test("different seeds differ", () => { assert.notEqual(mulberry32(1)(), mulberry32(2)()); });
```

`tests/js/camera.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { poseAt, transformFor } from "../../shared/layers/camera.js";

const K = (t, o = {}) => ({ t, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1, ...o });
const cam = { duration: 4, keys: [K(0), K(2, { x: 100 }), K(4, { x: 100, scale: 1.1 })] };

test("poseAt endpoints and interior keys", () => {
  assert.equal(poseAt(cam, 0).x, 0);
  assert.equal(poseAt(cam, 0.25).x, 50);
  assert.equal(poseAt(cam, 0.5).x, 100);
  assert.ok(Math.abs(poseAt(cam, 1).scale - 1.1) < 1e-9);
});
test("mid pass uses 3D transform; flat passes turn z into scale", () => {
  const p = { x: 0, y: 0, z: 240, rx: 0, ry: 0, rz: 0, scale: 1 };
  assert.match(transformFor(p, 1, "mid"), /translate3d\(0px, 0px, 240px\)/);
  const s = Number(transformFor(p, 1, "fg").match(/scale\(([\d.]+)\)/)[1]);
  assert.ok(s > 1.1 && s < 1.12);
});
```

Run:

```bash
chmod +x scripts/new_shot.sh
.venv/bin/python scripts/build_data.py --placeholder
.venv/bin/pytest -q tests
node --test tests/js/
```

Expected: `build_data` prints `full …s  cut …s  shots 27` with **no** `PROBLEM` lines (if any appear, fix `data/*.json` — never the thresholds); pytest all pass; node all pass.

- [ ] **Step 11: Smoke-test the per-shot project + symlink model**

```bash
scripts/new_shot.sh S00 S01
python3 - <<'EOF'
from pathlib import Path
p = Path("shots/S00/index.html")
s = p.read_text()
build = '''  const smoke = document.createElement("div");
  smoke.id = "S00-t";
  smoke.textContent = "Smoke";
  smoke.style.cssText = "position:absolute;left:120px;top:480px;font-size:96px";
  fg.appendChild(smoke);
  tl.fromTo(smoke, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2);
'''
p.write_text(s.replace("  // SHOT BUILD:", build + "  // SHOT BUILD:"))
EOF
npx hyperframes check shots/S00
npx hyperframes render shots/S00 --variables '{"pass":"fg","mode":"full"}' --strict-variables --format mov --fps 60 --quality draft --output renders/passes/S00-fg.mov
ffprobe -v error -show_entries stream=codec_name,pix_fmt,r_frame_rate -of csv renders/passes/S00-fg.mov
```

Expected: `check` 0 findings; ffprobe shows an alpha pixel format (e.g. `yuva444p10le`) at `60/1`.
- If check/render cannot load `_shared/...`: change `new_shot.sh` to `rsync -a --link-dest="$PWD/shared" shared/ "$D/_shared/"` (hard links), recreate S00, rerun; note it in the commit message and report.
- If MOV has no alpha: try `--format webm`; if still none, stop — report BLOCKED (the pass model needs alpha).

Then clean up: `rm -rf shots/S00 renders/passes/S00-*`.

- [ ] **Step 12: Spec pointer + commit**

Append to `docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md`:

```markdown
## 16. Planning amendments

See "Spec amendments made during planning" in docs/superpowers/plans/2026-09-30-aiden-sre-film.md. Those items supersede §4.2, §4.5, §6 (S08, S17, S18, S22), §6.1, §7.2, §8.1 and §8.2 where they differ.
```

```bash
cd videos/aiden-sre-film
git add package.json package-lock.json hyperframes.json .gitignore data source shared/tokens shared/layers shared/vendor shared/assets/fonts shots/_template scripts tests camera
git add ../../docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md
git commit -m "feat(aiden-sre-film): scaffold, data model, timing/camera core, test harness"
```

**Gate G0 (orchestrator, after T0 review):** tests green; smoke render verified. Then open `https://stage.dev.stackgen.com/app/sre/ai-sre-demo/alerts` with Chrome DevTools MCP `new_page`, ask the user to log in in that window, confirm the alerts list with `take_snapshot`, and record the `pageId` for T6. Then dispatch T1–T10.
