#!/usr/bin/env python3
"""Spec M1 (no freezes) and M2 (motion floor per 1 s window).
Usage: qa_motion.py VIDEO [--calibrate]"""
import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QA = ROOT / "data/qa.json"


def parse_ydif(text):
    out, t = [], None
    for line in text.splitlines():
        m = re.search(r"pts_time:([\d.]+)", line)
        if m:
            t = float(m.group(1))
            continue
        m = re.search(r"lavfi\.signalstats\.YDIF=([\d.]+)", line)
        if m and t is not None:
            out.append((t, float(m.group(1))))
    return out


def windows(series, win=1.0):
    b = defaultdict(list)
    for t, v in series:
        b[int(t // win)].append(v)
    if not b:
        return []
    n_max = max(len(v) for v in b.values())
    return [(k * win, sum(v) / len(v)) for k, v in sorted(b.items()) if len(v) > n_max / 2]


def parse_freezes(stderr):
    return [float(x) for x in re.findall(r"freeze_start: ([\d.]+)", stderr)]


def measure(video):
    y = subprocess.run(["ffmpeg", "-hide_banner", "-i", video, "-vf",
                        "signalstats,metadata=print:key=lavfi.signalstats.YDIF:file=-", "-an", "-f", "null", "-"],
                       capture_output=True, text=True, check=True).stdout
    f = subprocess.run(["ffmpeg", "-hide_banner", "-i", video, "-vf", "freezedetect=n=-60dB:d=0.5", "-an", "-f", "null", "-"],
                       capture_output=True, text=True, check=True).stderr
    return windows(parse_ydif(y)), parse_freezes(f)


def main(argv):
    video, calibrate = argv[0], "--calibrate" in argv
    wins, freezes = measure(video)
    if calibrate:
        floor = round(0.6 * min(v for _, v in wins), 4)
        QA.write_text(json.dumps({"motion_floor": floor, "calibrated_on": video}, indent=1))
        print("motion_floor =", floor)
        return 0
    floor = json.loads(QA.read_text())["motion_floor"]
    low = [(t, round(v, 4)) for t, v in wins if v < floor]
    print("windows", len(wins), "floor", floor, "below", len(low), "freezes", len(freezes))
    for t, v in low:
        print("  low motion at", t, "s:", v)
    for t in freezes:
        print("  freeze at", t, "s")
    return 1 if low or freezes else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
