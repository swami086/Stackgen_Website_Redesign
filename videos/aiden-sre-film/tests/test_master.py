import json, os, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]


def test_master_concats_to_timing_duration(tmp_path):
    for d in ("renders/shots", "renders/master", "build"):
        (tmp_path / d).mkdir(parents=True)
    for sid in ("SA", "SB"):
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "color=c=0x14110C:s=640x360:r=30:d=1",
                        "-c:v", "prores_ks", "-profile:v", "3", "-pix_fmt", "yuv422p10le",
                        str(tmp_path / f"renders/shots/{sid}.mov")], check=True)
    (tmp_path / "build/timing.full.json").write_text(json.dumps({"mode": "full", "duration": 2.0, "lines": {},
        "shots": [{"id": "SA", "start": 0, "duration": 1.0}, {"id": "SB", "start": 1.0, "duration": 1.0}]}))
    subprocess.run([str(ROOT / ".venv/bin/python"), str(ROOT / "scripts/master.py"), "full"], check=True,
                   env={**os.environ, "SG_ROOT": str(tmp_path)})
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                          str(tmp_path / "renders/master/aiden-sre-full.mp4")], capture_output=True, text=True, check=True).stdout
    assert abs(float(out) - 2.0) < 0.05
