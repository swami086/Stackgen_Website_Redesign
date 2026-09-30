import json, os, re, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]


def tone(path, freq, dur):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", f"sine=frequency={freq}:duration={dur}",
                    "-ar", "48000", str(path)], check=True)


def test_mix_duration_loudness_stems(tmp_path):
    for d in ("build", "renders/master", "shared/assets/audio/vo", "shared/assets/audio/sfx", "shared/assets/audio/music"):
        (tmp_path / d).mkdir(parents=True)
    tone(tmp_path / "shared/assets/audio/vo/L01.wav", 220, 2)
    tone(tmp_path / "shared/assets/audio/music/bed.wav", 110, 3)
    tone(tmp_path / "shared/assets/audio/sfx/click.wav", 2000, 0.1)
    (tmp_path / "shared/assets/audio/sfx/cues.json").write_text(json.dumps([{"file": "click.wav", "shot": "SA", "t": 1.0}]))
    (tmp_path / "build/timing.full.json").write_text(json.dumps(
        {"mode": "full", "duration": 5.0, "lines": {"L01": 0.8}, "shots": [{"id": "SA", "start": 0, "duration": 5.0}]}))
    subprocess.run([str(ROOT / ".venv/bin/python"), str(ROOT / "scripts/mix.py"), "full"], check=True,
                   env={**os.environ, "SG_ROOT": str(tmp_path)})
    mix = tmp_path / "renders/master/mix-full.wav"
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mix)],
                               capture_output=True, text=True, check=True).stdout)
    assert abs(dur - 5.0) < 0.05
    log = subprocess.run(["ffmpeg", "-nostats", "-i", str(mix), "-af", "ebur128", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    lufs = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", log)[-1])
    assert -16.0 <= lufs <= -12.0
    for stem in ("vo", "music", "sfx"):
        assert (tmp_path / f"renders/master/{stem}-full.wav").exists()
