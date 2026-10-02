import pytest
from split_takes import LEAD_MAX, TAIL, clamp_to_file, match_ratio, segments


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


def test_whisper_end_past_file_is_clamped():
    out = clamp_to_file([{"id": "w0", "text": "edition.", "start": 5.32, "end": 6.19}], 5.36)
    assert out[0]["end"] == pytest.approx(5.36)
    assert out[0]["start"] == pytest.approx(5.32)


def test_word_starting_after_file_raises():
    with pytest.raises(ValueError):
        clamp_to_file([{"id": "w0", "text": "edition.", "start": 6.0, "end": 6.4}], 5.36)


def test_missing_line_raises():
    with pytest.raises(ValueError):
        segments(WORDS[:2], LINES, take_dur=3.0)
