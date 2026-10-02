#!/usr/bin/env python3
"""Split chosen scene takes into per-line wavs at the midpoint of the silence between lines.
Usage: split_takes.py [T1 T2 ...]   (default: every take in data/takes.json)"""
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VO = ROOT / "assets/audio/vo"
LEAD_MAX = 0.12
TAIL = 0.35
FADE = 0.015


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def load_words(path):
    data = json.loads(Path(path).read_text())
    if isinstance(data, dict):
        if "words" in data:
            data = data["words"]
        elif "segments" in data:
            data = [x for seg in data["segments"] for x in seg.get("words", [])]
    out = []
    for x in data:
        text = (x.get("text") or x.get("word") or "").strip()
        if norm(text):
            out.append({"text": text, "start": float(x["start"]), "end": float(x["end"])})
    return out


def _owners(words, line_texts):
    ref, owner = [], []
    for k, t in enumerate(line_texts):
        for tok in t.split():
            if norm(tok):
                ref.append(norm(tok))
                owner.append(k)
    hyp = [norm(x["text"]) for x in words]
    sm = difflib.SequenceMatcher(a=ref, b=hyp, autojunk=False)
    own = [None] * len(hyp)
    matched = 0
    for a0, b0, n in sm.get_matching_blocks():
        for j in range(n):
            own[b0 + j] = owner[a0 + j]
        matched += n
    hits = [j for j, o in enumerate(own) if o is not None]
    if not hits:
        raise ValueError("transcript shares no words with the lines")
    for j in range(hits[0]):
        own[j] = own[hits[0]]
    for j in range(hits[-1] + 1, len(own)):
        own[j] = own[hits[-1]]
    for a, b in zip(hits, hits[1:]):
        if b - a <= 1:
            continue
        oa, ob = own[a], own[b]
        if oa == ob:
            cut = b
        else:
            # unmatched words between two lines split at the longest silence
            cut = max(range(a, b), key=lambda j: words[j + 1]["start"] - words[j]["end"])
        for j in range(a + 1, b):
            own[j] = oa if j <= cut else ob
    return own, matched / max(len(ref), 1)


def match_ratio(words, line_texts):
    return _owners(words, line_texts)[1]


def segments(words, line_texts, take_dur):
    own, _ = _owners(words, line_texts)
    groups = []
    for k in range(len(line_texts)):
        ws = [x for x, o in zip(words, own) if o == k]
        if not ws:
            raise ValueError("line " + str(k) + " has no transcript words; re-check the take")
        groups.append(ws)
    out = []
    for k, ws in enumerate(groups):
        start = max(0.0, ws[0]["start"] - LEAD_MAX) if k == 0 else out[-1][1]
        if k + 1 < len(groups):
            end = (ws[-1]["end"] + groups[k + 1][0]["start"]) / 2
        else:
            end = min(take_dur, ws[-1]["end"] + TAIL)
        out.append((start, end, ws))
    return out


def duration(path):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)]))


def clamp_to_file(words, file_dur):
    out = []
    for x in words:
        start = x["start"]
        end = x["end"]
        if start >= file_dur:
            raise ValueError("word starts after file")
        end = min(end, file_dur)
        start = min(start, end)
        y = dict(x)
        y["start"] = round(start, 3)
        y["end"] = round(end, 3)
        out.append(y)
    return out


def cut(src, start, end, dst):
    d = end - start
    fades = "afade=t=in:d=" + str(FADE) + ",afade=t=out:st=" + str(round(max(d - FADE, 0), 3)) + ":d=" + str(FADE)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(round(start, 3)), "-to", str(round(end, 3)), "-i", str(src),
                    "-af", fades, "-ar", "48000", "-c:a", "pcm_s24le", str(dst)], check=True)


def main(argv):
    takes = json.loads((ROOT / "data/takes.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / "source/lines.json").read_text())}
    report_path = ROOT / "data/vo_report.json"
    report = json.loads(report_path.read_text()) if report_path.exists() else {}
    want = set(argv) or {t["id"] for t in takes}
    for t in takes:
        if t["id"] not in want:
            continue
        wav = VO / "takes" / (t["id"] + ".wav")
        words = load_words(VO / "takes" / (t["id"] + ".transcript.json"))
        texts = [lines[l] for l in t["lines"]]
        ratio = match_ratio(words, texts)
        for lid, (s, e, ws) in zip(t["lines"], segments(words, texts, duration(wav))):
            dst = VO / (lid + ".wav")
            cut(wav, s, e, dst)
            rebased = [{"id": "w" + str(i), "text": x["text"], "start": round(x["start"] - s, 3), "end": round(x["end"] - s, 3)}
                       for i, x in enumerate(ws)]
            rebased = clamp_to_file(rebased, duration(dst))
            (VO / (lid + ".words.json")).write_text(json.dumps(rebased, indent=1))
        report[t["id"]] = {"match_ratio": round(ratio, 3)}
        print(t["id"], len(t["lines"]), "lines, match", round(ratio, 3))
    report_path.write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main(sys.argv[1:])
