"""Acceptance A8: brand tokens only, 0 radius, Geist only."""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED = {"#14110c", "#1b1811", "#211d15", "#3f3b39", "#f1eae0", "#faf7f2", "#96897c",
           "#ba99fd", "#a0eafc", "#fda39b", "#fdd89b", "#a6f0bf"}
HEX = re.compile(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b")
RADIUS = re.compile(r"border-radius\s*:\s*([^;}\"']+)")
FONT = re.compile(r"font-family\s*:\s*([^;}]+)")
FONTS_OK = {"Geist", "Geist Mono", "var(--sg-font)", "var(--sg-mono)", "inherit"}


def targets():
    globs = ["shots/S*/index.html", "shots/_template/index.html", "shared/layers/*.js",
             "shared/layers/*.css", "shared/tokens/*.css"]
    return sorted(p for g in globs for p in ROOT.glob(g))


def lint(paths):
    errs = []
    for p in paths:
        s = Path(p).read_text()
        for m in HEX.finditer(s):
            h = m.group(0).lower()
            if len(h) == 4:
                h = "#" + "".join(c * 2 for c in h[1:])
            if h not in ALLOWED:
                errs.append(f"{p}: off-brand color {m.group(0)}")
        for m in RADIUS.finditer(s):
            if m.group(1).strip() not in ("0", "0px"):
                errs.append(f"{p}: border-radius {m.group(1).strip()}")
        for m in FONT.finditer(s):
            first = m.group(1).split(",")[0].strip().strip("'\"")
            if first not in FONTS_OK:
                errs.append(f"{p}: font {first}")
    return errs


if __name__ == "__main__":
    e = lint(targets())
    print("\n".join(e) or "brand lint clean")
    sys.exit(1 if e else 0)
