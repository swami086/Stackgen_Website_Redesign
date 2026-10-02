import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCREENS = {"6a", "6b", "6c", "7a", "7b", "8a", "8b", "9a", "9b", "10a", "11a"}
INSERTS = {"M0", "M1", "M2", "M3"}


def load(rel):
    return json.loads((ROOT / rel).read_text())


def test_twelve_frames_in_order():
    frames = load("source/frames.json")
    assert [f["id"] for f in frames] == [f"F{i:02d}" for i in range(1, 13)]
    assert [f["frame"] for f in frames] == list(range(1, 13))


def test_john_lengths_sum_to_storyboard():
    total = sum(f["john"] for f in load("source/frames.json"))
    assert abs(total - 138.745) < 0.01


def test_every_frame_has_its_line():
    frames = load("source/frames.json")
    lines = {l["id"]: l for l in load("source/lines.en.json")}
    assert sorted(lines) == [f"L{i:02d}" for i in range(1, 13)]
    for f in frames:
        assert lines[f["line"]]["frame"] == f["id"]


def test_takes_group_lines_by_act():
    groups = {}
    for f in load("source/frames.json"):
        groups.setdefault(f["take"], []).append(f["line"])
    assert groups == {
        "T1": ["L01", "L02", "L03", "L04"],
        "T2": ["L05", "L06"],
        "T3": ["L07", "L08"],
        "T4": ["L09"],
        "T5": ["L10", "L11", "L12"],
    }


def test_screens_and_inserts_are_known():
    for f in load("source/frames.json"):
        assert set(f["screens"]) <= SCREENS
        assert set(f["inserts"]) <= INSERTS
    used = {s for f in load("source/frames.json") for s in f["screens"]}
    assert used == SCREENS


def test_replaced_lines_are_exact():
    lines = {l["id"]: l["text"] for l in load("source/lines.en.json")}
    assert lines["L08"].startswith("Aiden for DevOps takes repeat work off your team. Requests from ServiceNow, Jira and Linear")
    assert lines["L12"] == "Start anywhere and build your operations factory today."


def test_strings_have_no_empty_values():
    strings = load("source/strings.en.json")
    assert strings and all(isinstance(v, str) and v.strip() for v in strings.values())
    assert strings["f12.button"] == "Schedule a demo"


def _toks(s):
    import re
    import unicodedata
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9' ]+", " ", s).split()


def _contains(line, phrase):
    a, b = _toks(line), _toks(phrase)
    return any(a[i:i + len(b)] == b for i in range(len(a) - len(b) + 1))


def test_cue_anchors_occur_in_their_english_line():
    lines = {l["frame"]: l["text"] for l in load("source/lines.en.json")}
    cues = load("source/cues.json")
    assert set(cues) <= {f"F{i:02d}" for i in range(1, 13)}
    for fid, rows in cues.items():
        for c in rows:
            assert _contains(lines[fid], c["anchor"]), (fid, c["anchor"])
