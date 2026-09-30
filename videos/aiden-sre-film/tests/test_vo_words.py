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
