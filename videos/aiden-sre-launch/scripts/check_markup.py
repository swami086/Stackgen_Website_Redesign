#!/usr/bin/env python3
"""Spoken markup in data/takes.json must reduce to the locked words in source/lines.json.
Usage: check_markup.py   (exit 1 on any mismatch)"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESPELL = {"M-T-T-R": "MTTR", "S-R-E": "SRE"}


def strip_markup(s, ipa=None):
    for k, v in (ipa or {}).items():
        s = s.replace(k, v)
    s = re.sub(r"\[[^\]]*\]", " ", s)
    for k, v in RESPELL.items():
        s = s.replace(k, v)
    return s


def words(s, ipa=None):
    return re.sub(r"[^a-z0-9' ]+", " ", strip_markup(s, ipa).lower()).split()


def check(takes, lines):
    bad = []
    for t in takes:
        expected = words(" ".join(lines[l] for l in t["lines"]))
        if words(t["markup"], t.get("ipa")) != expected:
            bad.append(t["id"])
    return bad


if __name__ == "__main__":
    takes = json.loads((ROOT / "data/takes.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / "source/lines.json").read_text())}
    bad = check(takes, lines)
    print("markup OK" if not bad else "markup changes words in: " + ", ".join(bad))
    sys.exit(1 if bad else 0)
