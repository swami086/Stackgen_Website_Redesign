"""Derive shot timing from VO word timestamps. Spec §5, §8.1."""
import re

FIRST_LINE_AT = 0.80
GAP_LINE = 0.35
GAP_SCENE = 0.70
LEAD = 0.25
CUE_OFFSET = -0.10
NULL_CUE_START = 0.20
NULL_CUE_STEP = 0.35
END_HOLD = 1.50
MIN_SHOT, MAX_SHOT = 3.0, 8.0


def norm(word):
    return re.sub(r"[^\w']", "", word.lower())


def placeholder_words(text, wpm=145):
    step = 60.0 / wpm
    return [{"word": w, "start": round(i * step, 3), "end": round(i * step + step * 0.85, 3)}
            for i, w in enumerate(text.split())]


def find_phrase(words, phrase, start=0):
    toks = [norm(t) for t in phrase.split()]
    for i in range(start, len(words) - len(toks) + 1):
        if all(norm(words[i + j]["word"]) == toks[j] for j in range(len(toks))):
            return i
    raise KeyError(f"phrase {phrase!r} not found from word {start}")


def place_lines(lines, words, mode):
    offsets, t, prev = {}, FIRST_LINE_AT, None
    for ln in lines:
        if mode == "cut" and ln.get("full_only"):
            continue
        if prev is not None:
            default = GAP_SCENE if ln["scene"] != prev["scene"] else GAP_LINE
            t += ln.get("gap_before", {}).get(mode, default)
        offsets[ln["id"]] = round(t, 3)
        t += words[ln["id"]][-1]["end"]
        prev = ln
    return offsets, t


def _anchor(anchor, offsets, words):
    w = words[anchor["line"]]
    if anchor.get("at") == "end":
        return offsets[anchor["line"]] + w[-1]["end"] + anchor.get("offset", 0.0), 0
    i = find_phrase(w, anchor["phrase"])
    return offsets[anchor["line"]] + w[i]["start"] - LEAD, i


def build(shots, lines, words, mode="full"):
    offsets, vo_end = place_lines(lines, words, mode)
    live = [s for s in shots if not (mode == "cut" and s.get("full_only"))]
    placed = []
    for n, s in enumerate(live):
        anchor = s["anchor_cut"] if mode == "cut" and "anchor_cut" in s else s["anchor"]
        t, i = _anchor(anchor, offsets, words)
        placed.append((s, 0.0 if n == 0 else round(t, 3), anchor, i))
    ends = [p[1] for p in placed[1:]] + [round(vo_end + END_HOLD, 3)]
    out = []
    for (s, st, anchor, i), en in zip(placed, ends):
        ost, nulls = [], 0
        for item in s.get("ost", []):
            if mode == "cut" and item.get("full_only"):
                continue
            if item.get("cue") is None:
                t = NULL_CUE_START + NULL_CUE_STEP * nulls
                nulls += 1
            else:
                w = words[anchor["line"]]
                j = find_phrase(w, item["cue"], i)
                t = offsets[anchor["line"]] + w[j]["start"] + CUE_OFFSET - st
            ost.append({**item, "t": round(t, 3)})
        out.append({"id": s["id"], "start": st, "duration": round(en - st, 3), "ost": ost})
    return {"mode": mode, "duration": ends[-1], "lines": offsets, "shots": out}


def check_durations(t, exempt=()):
    return [(s["id"], s["duration"]) for s in t["shots"]
            if s["id"] not in exempt and not MIN_SHOT <= s["duration"] <= MAX_SHOT]
