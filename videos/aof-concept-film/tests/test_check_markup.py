from check_markup import check, words


def test_tags_respellings_and_punctuation_are_ignored():
    assert words("[warmly] Your team — M-T-T-R… comes DOWN.") == ["your", "team", "mttr", "comes", "down"]


def test_check_flags_changed_words():
    lines = {"L01": "One failure can set off a flood of alerts."}
    good = [{"id": "T", "lines": ["L01"], "markup": "[measured] One failure can set off a flood of alerts."}]
    bad = [{"id": "T", "lines": ["L01"], "markup": "One failure sets off a flood of alerts."}]
    assert check(good, lines) == []
    assert check(bad, lines) == ["T"]


def test_ipa_map_restores_word():
    lines = {"L01": "Meet Aiden for SRE."}
    t = [{"id": "T", "lines": ["L01"], "markup": "Meet /ˈeɪdən/ for S-R-E.", "ipa": {"/ˈeɪdən/": "Aiden"}}]
    assert check(t, lines) == []
