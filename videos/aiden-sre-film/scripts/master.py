"""Conform composited shots into masters (D1-D3). Usage: master.py full|cut [--audio path.wav]"""
import json, os, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))


def ff(*args):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args], check=True)


def shot_file(sid, mode):
    cut = ROOT / f"renders/shots/{sid}-cut.mov"
    return cut if mode == "cut" and cut.exists() else ROOT / f"renders/shots/{sid}.mov"


def main(argv):
    mode = argv[0]
    audio = argv[argv.index("--audio") + 1] if "--audio" in argv else None
    t = json.loads((ROOT / f"build/timing.{mode}.json").read_text())
    files = [shot_file(s["id"], mode) for s in t["shots"]]
    missing = [f.name for f in files if not f.exists()]
    if missing:
        sys.exit(f"missing shots: {missing}")
    out = ROOT / f"renders/master/aiden-sre-{mode}"
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as fh:
        fh.writelines(f"file '{f}'\n" for f in files)
    ff("-f", "concat", "-safe", "0", "-i", fh.name, "-c", "copy", f"{out}-silent.mov")
    mez = ["-i", f"{out}-silent.mov"] + (["-i", audio, "-map", "0:v", "-map", "1:a", "-c:a", "pcm_s24le"] if audio else [])
    ff(*mez, "-c:v", "copy", "-t", str(t["duration"]), f"{out}.mov")
    enc = ["-c:a", "aac", "-b:a", "320k"] if audio else ["-an"]
    ff("-i", f"{out}.mov", "-c:v", "libx264", "-profile:v", "high", "-crf", "16", "-preset", "slow",
       "-pix_fmt", "yuv420p", "-movflags", "+faststart", *enc, f"{out}.mp4")
    print(f"{out}.mp4  {t['duration']}s  {len(files)} shots")


if __name__ == "__main__":
    main(sys.argv[1:])
