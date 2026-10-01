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
