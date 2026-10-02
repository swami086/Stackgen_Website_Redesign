#!/usr/bin/env python3
"""Freeze one ElevenLabs MCP generation locally with provenance.
Usage: el_fetch.py URL OUT --meta '{"flow_id":..,"node_id":..,"generation_id":..,"model_id":..,"prompt":..}'"""
import argparse
import json
import subprocess
import tempfile
import urllib.request
from pathlib import Path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("out")
    ap.add_argument("--meta", required=True)
    a = ap.parse_args()
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        with urllib.request.urlopen(a.url, timeout=300) as r:
            tmp.write(r.read())
    if out.suffix == ".wav":
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-ar", "48000", "-c:a", "pcm_s24le", str(out)], check=True)
    else:
        Path(tmp.name).replace(out)
    meta = json.loads(a.meta)
    meta["source_url_host"] = a.url.split("/")[2]
    out.with_suffix(".json").write_text(json.dumps(meta, indent=1))
    print(out)


if __name__ == "__main__":
    main()
