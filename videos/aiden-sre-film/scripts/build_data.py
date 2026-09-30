"""Emit build/timing.{full,cut}.json, camera/Sxx.json and shared/build/data.js.
Run after any change to data/*.json, VO words, plate snapshots or graph.
Usage: python3 scripts/build_data.py [--placeholder]"""
import json, os, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from lib import camera, timing

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))
EXEMPT = {"full": {"S27"}, "cut": {"S23", "S27"}}


def read(rel):
    return json.loads((ROOT / rel).read_text())


def load_words(lines, placeholder):
    words = {}
    for ln in lines:
        p = ROOT / "shared/assets/audio/vo" / f"{ln['id']}.words.json"
        if p.exists():
            words[ln["id"]] = json.loads(p.read_text())
        elif placeholder:
            words[ln["id"]] = timing.placeholder_words(ln["text"])
        else:
            raise SystemExit(f"missing {p} (run with --placeholder until VO exists)")
    return words


def main(argv):
    placeholder = "--placeholder" in argv
    shots, lines = read("data/shots.json"), read("data/lines.json")
    words = load_words(lines, placeholder)
    for d in ("build", "camera", "shared/build"):
        (ROOT / d).mkdir(parents=True, exist_ok=True)
    timings, problems = {}, []
    for mode in ("full", "cut"):
        t = timing.build(shots, lines, words, mode)
        (ROOT / f"build/timing.{mode}.json").write_text(json.dumps(t, indent=1))
        timings[mode] = t
        problems += [f"{mode} {sid} {d}s" for sid, d in timing.check_durations(t, EXEMPT[mode])]
    full = {s["id"]: s for s in timings["full"]["shots"]}
    cut = {s["id"]: s for s in timings["cut"]["shots"]}
    cams = {}
    for s in shots:
        c = camera.validate(camera.make(s["id"], full[s["id"]]["duration"], {**s["cam"], "blur": s["blur"]}))
        if not camera.is_moving(c):
            problems.append(f"static camera {s['id']}")
        (ROOT / f"camera/{s['id']}.json").write_text(json.dumps(c, indent=1))
        cams[s["id"]] = c
    plates = {p.name.split(".")[0]: json.loads(p.read_text())
              for p in sorted((ROOT / "shared/assets/plates").glob("*.snapshot.json"))}
    graph = ROOT / "data/graph.json"
    data = {
        "shots": {s["id"]: {"meta": s, "full": full[s["id"]], **({"cut": cut[s["id"]]} if s["id"] in cut else {})}
                  for s in shots},
        "cameras": cams, "plates": plates,
        "graph": json.loads(graph.read_text()) if graph.exists() else None,
        "placeholder": placeholder,
    }
    (ROOT / "shared/build/data.js").write_text("window.SG_DATA = " + json.dumps(data) + ";\n")
    for p in problems:
        print("PROBLEM", p)
    print(f"full {timings['full']['duration']}s  cut {timings['cut']['duration']}s  shots {len(shots)}")
    return 1 if problems and not placeholder else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
