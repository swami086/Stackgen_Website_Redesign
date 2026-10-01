#!/usr/bin/env python3
"""Flex silent bridge frames so each snap frame starts on a music downbeat.
Usage: fit_bridges.py --offset SECONDS [--final-hit SECONDS]  -> data/fit.json
offset = seconds trimmed from the music head (music time = film time + offset)."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def fit(frames, voice_timing, grid, phrases, final_hit=None):
    vdur = {f["frame"]: f["dur"] for f in voice_timing["frames"]}
    pstarts = {round(p["start"], 3) for p in phrases}
    durs, log, t = {}, [], 0.0
    for i, f in enumerate(frames):
        if f["line"]:
            t = round(t + vdur[f["frame"]], 3)
            continue
        lo, hi = f["flex"]
        nxt = frames[i + 1] if i + 1 < len(frames) else None
        if nxt is None:
            target = final_hit + 0.5 if final_hit is not None else t + f["est"]
            d = min(max(target - t, lo), hi)
            log.append({"frame": f["frame"], "kind": "tail", "miss": round(t + d - target, 3)})
        elif not nxt.get("snap"):
            d = f["est"]
        else:
            window = [m for m in grid["downbeats_sec"] if lo <= m - t <= hi]
            pref = [m for m in window if round(m, 3) in pstarts]
            pool, kind = (pref, "phrase") if pref else (window, "downbeat")
            if not pool:
                pool = [m for m in grid["beats_sec"] if lo <= m - t <= hi]
                kind = "beat" if pool else "none"
            s = min(pool, key=lambda m: abs((m - t) - f["est"])) if pool else t + f["est"]
            d = s - t
            log.append({"frame": f["frame"], "next": nxt["frame"], "kind": kind, "start_next": round(s, 3)})
        d = round(d, 3)
        durs[str(f["frame"])] = d
        t = round(t + d, 3)
    return {"bridges": durs, "log": log, "total": t}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--offset", type=float, required=True)
    ap.add_argument("--final-hit", type=float, default=None, help="music-time seconds of the final hit")
    a = ap.parse_args()
    am = json.loads((ROOT / "audiomap.json").read_text())

    def shift(xs):
        return [round(x - a.offset, 3) for x in xs if x >= a.offset]

    grid = {"downbeats_sec": shift(am["grid"]["downbeats_sec"]), "beats_sec": shift(am["grid"]["beats_sec"])}
    phrases = [{"start": round(p["start"] - a.offset, 3)} for p in am.get("phrases", []) if p["start"] >= a.offset]
    final = a.final_hit - a.offset if a.final_hit is not None else None
    frames = json.loads((ROOT / "data/frames.json").read_text())
    voice = json.loads((ROOT / "data/timing.voice.json").read_text())
    r = fit(frames, voice, grid, phrases, final)
    r["offset"] = a.offset
    (ROOT / "data/fit.json").write_text(json.dumps(r, indent=1))
    for row in r["log"]:
        print(row)
    print("fit total", r["total"])


if __name__ == "__main__":
    main()
