from qa_loudness import parse
from qa_motion import parse_freezes, parse_ydif, windows

YDIF = """frame:0    pts:0       pts_time:0
lavfi.signalstats.YDIF=0.000000
frame:1    pts:1       pts_time:0.5
lavfi.signalstats.YDIF=2.000000
frame:2    pts:2       pts_time:1.0
lavfi.signalstats.YDIF=4.000000
frame:3    pts:3       pts_time:1.5
lavfi.signalstats.YDIF=6.000000
frame:4    pts:4       pts_time:2.0
lavfi.signalstats.YDIF=1.000000
"""

EBU = """[Parsed_ebur128_0 @ 0x1] Summary:

  Integrated loudness:
    I:         -14.3 LUFS
    Threshold: -24.6 LUFS

  True peak:
    Peak:       -1.4 dBFS
"""


def test_parse_ydif():
    assert parse_ydif(YDIF)[2] == (1.0, 4.0)


def test_windows_drop_short_tail():
    assert windows(parse_ydif(YDIF)) == [(0.0, 1.0), (1.0, 5.0)]


def test_parse_freezes():
    err = "[freezedetect @ 0x1] lavfi.freezedetect.freeze_start: 12.5\n[freezedetect @ 0x1] lavfi.freezedetect.freeze_start: 40"
    assert parse_freezes(err) == [12.5, 40.0]


def test_parse_loudness():
    assert parse(EBU) == {"I": -14.3, "TP": -1.4}
