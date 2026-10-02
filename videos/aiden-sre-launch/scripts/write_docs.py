#!/usr/bin/env python3
"""Write STORYBOARD.md and SCRIPT.md from data/frames.json + data/timing.json. Usage: write_docs.py"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def front(total):
    return "\n".join([
        "---",
        "format: 1920x1080",
        "duration: " + str(total) + "s",
        'message: "An on-call team meets Aiden for SRE and follows one incident from the alert flood to a closed, audited fix."',
        "arc: Problem → Discover → Triage → Root cause → Remediation → Learn → Platform → CTA",
        "audience: platform and SRE buyers",
        "mode: collaborative",
        "music: assets/audio/music/bed.fit.wav (ElevenLabs, locked)",
        "---",
        "",
    ])


def block(f, t, vo, comps):
    cues = "; ".join(c["text"] + " @ " + str(c["local"]) + "s" for c in t["cues"]) or "none"
    hits = "; ".join(h["label"] + " @ " + str(round(h["t"] - t["start"], 3)) + "s" for h in t["hits"]) or "none"
    rows = [
        "",
        "## Frame " + str(f["frame"]) + " — " + f["title"],
        "",
        "- scene: " + f["picture"][:110],
        "- duration: " + str(t["dur"]) + "s",
        "- transition_in: cut",
        "- status: outline",
        '- voiceover: "' + vo + '"',
        "- src: compositions/frames/" + str(f["frame"]).zfill(2) + "-" + f["slug"] + ".html",
        "- blueprint: " + f["blueprint"] + " (Adapt)",
        "- rules: " + ", ".join(f["rules"]),
        "",
        f["picture"],
        "",
        "Components: " + (", ".join(comps) or "none (film-only frame)"),
        "Generated video: " + (", ".join(f["el_video"]) or "none") + " (assets/el-video/<id>.mp4, head-trimmed)",
        "Cues (local seconds): " + cues,
        "Hits (local seconds): " + hits,
        "SFX: " + (", ".join(f["sfx"]) or "none"),
        "Counter: " + str(f["counter"] or "none"),
        "",
    ]
    return "\n".join(rows)


def storyboard(frames, timing, lines, components):
    tf = {f["frame"]: f for f in timing["frames"]}
    total = round(sum(f["dur"] for f in timing["frames"]), 2)
    parts = [front(total)]
    for f in frames:
        vo = lines[f["line"]] if f["line"] else ""
        comps = [components[n] for n in f["figma"] if n in components]
        parts.append(block(f, tf[f["frame"]], vo, comps))
    return "".join(parts)


def script(frames, lines):
    parts = ["# Script\n"]
    for f in frames:
        if f["line"]:
            parts.append("\n## " + f["title"] + " (Frame " + str(f["frame"]) + ")\n\n    " + lines[f["line"]] + "\n")
    return "".join(parts)


if __name__ == "__main__":
    frames = json.loads((ROOT / "data/frames.json").read_text())
    timing = json.loads((ROOT / "data/timing.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / "source/lines.json").read_text())}
    comps = json.loads((ROOT / "data/components.json").read_text())
    (ROOT / "STORYBOARD.md").write_text(storyboard(frames, timing, lines, comps))
    (ROOT / "SCRIPT.md").write_text(script(frames, lines))
    print("wrote STORYBOARD.md, SCRIPT.md")
