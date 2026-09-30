"""ElevenLabs with-timestamps alignment -> words.json. Usage: vo_words.py alignment.json out.words.json [shift_s]"""
import json, sys


def chars_to_words(al, shift=0.0):
    words, cur, start, end = [], "", None, None
    for ch, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if ch.isspace():
            if cur:
                words.append({"word": cur, "start": round(start + shift, 3), "end": round(end + shift, 3)})
            cur, start = "", None
            continue
        if start is None:
            start = s
        cur, end = cur + ch, e
    if cur:
        words.append({"word": cur, "start": round(start + shift, 3), "end": round(end + shift, 3)})
    return words


if __name__ == "__main__":
    al = json.load(open(sys.argv[1]))
    shift = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
    json.dump(chars_to_words(al.get("alignment", al), shift), open(sys.argv[2], "w"), indent=1)
