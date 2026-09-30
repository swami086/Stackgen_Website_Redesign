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
