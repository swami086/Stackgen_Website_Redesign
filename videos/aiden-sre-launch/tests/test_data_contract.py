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
