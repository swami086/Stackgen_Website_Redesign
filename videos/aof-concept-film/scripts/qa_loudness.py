#!/usr/bin/env python3
"""Loudness check (spec §9.4). Usage: qa_loudness.py FILE [--vo]"""
import re
import subprocess
import sys


def parse(stderr):
    i = re.findall(r"I:\s+(-?[\d.]+) LUFS", stderr)
    tp = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", stderr)
    return {"I": float(i[-1]), "TP": float(tp[-1])}


def main(argv):
    path, vo = argv[0], "--vo" in argv
    err = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True, check=True).stderr
    r = parse(err)
    target = -16.0 if vo else -14.0
    ok = abs(r["I"] - target) <= 1.0 and (vo or r["TP"] <= -1.0)
    print("I", r["I"], "LUFS (target", target, "±1), TP", r["TP"], "dBTP ->", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
