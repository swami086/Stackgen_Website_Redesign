from write_docs import script, storyboard

FRAMES = [{"frame": 2, "id": "F02", "slug": "alert-flood", "title": "Buried", "scene": "intro", "line": "L01", "figma": ["66:2"],
           "el_video": [], "blueprint": "overwhelm-surround", "rules": ["waterfall-entry"], "ost": [], "hits": [], "counter": [212, 1284],
           "sfx": ["row-tick"], "picture": "Cards stack."}]
TIMING = {"frames": [{"frame": 2, "start": 3.0, "dur": 7.1, "cues": [], "hits": []}]}
LINES = {"L01": "Your on-call team is buried in alerts."}


def test_storyboard_block():
    md = storyboard(FRAMES, TIMING, LINES, {"66:2": "compositions/components/alert-flood"})
    assert "## Frame 2 — Buried" in md
    assert "- duration: 7.1s" in md and "- blueprint: overwhelm-surround (Adapt)" in md
    assert "- rules: waterfall-entry" in md and "- src: compositions/frames/02-alert-flood.html" in md
    assert '- voiceover: "Your on-call team is buried in alerts."' in md
    assert "compositions/components/alert-flood" in md


def test_script_format():
    assert script(FRAMES, LINES) == "# Script\n\n## Buried (Frame 2)\n\n    Your on-call team is buried in alerts.\n"
