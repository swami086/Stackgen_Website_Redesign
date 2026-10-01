#!/usr/bin/env python3
"""Film timing.
  build_timing.py voice  -> data/timing.voice.json + data/spotting.json (bridges at estimate)
  build_timing.py lock   -> data/timing.json + audio_meta.json (+ STORYBOARD.md durations) using data/fit.json"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VO = ROOT / "assets/audio/vo"


def norm(w):
    return re.sub(r"[^a-z0-9%]", "", w.lower())


def find_word(words, anchor):
    a = norm(anchor)
    for w in words:
        if norm(w["text"]).startswith(a):
            return w
    raise KeyError("anchor not found: " + anchor)


def layout(frames, vo, bridge_durs=None):
    bridge_durs = bridge_durs or {}
    t, out = 0.0, []
    for f in frames:
        v = vo[f["line"]] if f["line"] else None
        dur = v["duration"] if v else bridge_durs.get(str(f["frame"]), f["est"])

        def at(word):
            return 0.0 if word is None else find_word(v["words"], word)["start"]

        cues = [{"text": c["text"], "local": round(at(c.get("word")), 3), "t": round(t + at(c.get("word")), 3)}
                for c in f.get("ost", [])]
        hits = []
        for h in f.get("hits", []):
            local = dur if h.get("at") == "end" else 0.0 if h.get("at") == "start" else at(h["word"])
            hits.append({"label": h["label"], "t": round(t + local, 3)})
        out.append({"frame": f["frame"], "id": f["id"], "slug": f["slug"], "line": f["line"], "start": round(t, 3),
                    "dur": round(dur, 3), "snap": bool(f.get("snap")), "cues": cues, "hits": hits})
        t = round(t + dur, 3)
    return {"total": t, "frames": out}


def spotting(timing):
    return [h for f in timing["frames"] for h in f["hits"]]


def audio_meta(timing, vo, bed_path):
    voices = []
    for f in timing["frames"]:
        if f["line"]:
            ws = vo[f["line"]]["words"]
            voices.append({"frame": f["frame"], "path": "assets/audio/vo/" + f["line"] + ".wav", "duration_s": f["dur"],
                           "words": [{"id": "w" + str(i), "text": w["text"], "start": w["start"], "end": w["end"]}
                                     for i, w in enumerate(ws)]})
    bgm = {"path": bed_path, "volume": 0.5, "query": None, "duration_s": timing["total"]}
    return {"bgm": bgm, "bgm_pending": False, "voices": voices, "sfx": []}


def patch_storyboard(md, timing):
    durs = {f["frame"]: f["dur"] for f in timing["frames"]}
    parts = re.split(r"(?m)^(?=#{2,3} Frame )", md)
    out = []
    for p in parts:
        m = re.match(r"#{2,3} Frame (\d+)", p)
        if m and int(m.group(1)) in durs:
            new = str(durs[int(m.group(1))]) + "s"
            p = re.sub(r"(?m)^(- duration:\s*)\S+", lambda mm: mm.group(1) + new, p, count=1)
        out.append(p)
    return "".join(out)


def duration(path):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)]))


def load_vo(frames):
    vo = {}
    for f in frames:
        if f["line"]:
            vo[f["line"]] = {"duration": round(duration(VO / (f["line"] + ".wav")), 3),
                             "words": json.loads((VO / (f["line"] + ".words.json")).read_text())}
    return vo


def main(mode):
    frames = json.loads((ROOT / "data/frames.json").read_text())
    vo = load_vo(frames)
    if mode == "voice":
        t = layout(frames, vo)
        (ROOT / "data/timing.voice.json").write_text(json.dumps(t, indent=1))
        (ROOT / "data/spotting.json").write_text(json.dumps(spotting(t), indent=1))
        print("voice timing total", t["total"])
    elif mode == "lock":
        fit = json.loads((ROOT / "data/fit.json").read_text())
        t = layout(frames, vo, fit["bridges"])
        t["music_offset"] = fit["offset"]
        (ROOT / "data/timing.json").write_text(json.dumps(t, indent=1))
        meta = audio_meta(t, vo, "assets/audio/music/bed.fit.wav")
        (ROOT / "audio_meta.json").write_text(json.dumps(meta, indent=1))
        sb = ROOT / "STORYBOARD.md"
        if sb.exists():
            sb.write_text(patch_storyboard(sb.read_text(), t))
        print("LOCK total", t["total"])
    else:
        sys.exit("usage: build_timing.py voice|lock")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "")
