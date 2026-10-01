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
