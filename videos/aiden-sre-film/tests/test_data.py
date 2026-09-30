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
