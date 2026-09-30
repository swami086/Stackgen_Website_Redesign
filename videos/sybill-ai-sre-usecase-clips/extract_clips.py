#!/usr/bin/env python3
"""Extract AI SRE use-case demo segments from Sybill conversation JSONs → local MP4s.

Reads conversation dumps (with recordings.videoUrl + transcript), cuts product-demo
windows via ffmpeg. Does NOT persist signed URLs to disk in the manifest.
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CLIPS = ROOT / "clips"
RAW = ROOT / "raw"
AGENT = Path(
    "/Users/swami/.cursor/projects/Users-swami-Documents-Stackgen-Website-Redesign/agent-tools"
)

# (slug, conversation_dump_stem, start_sec, duration_sec, use_case, title)
CLIPS_SPEC = [
    (
        "V1-autopilot-investigation-slack-rca_lastpass-2026-07-22",
        "010b5879-c4ab-433c-a01d-969862e57577",
        26 * 60 + 14,
        12 * 60,  # through Slack RCA
        "V1",
        "Stackgen / LastPass SRE Demo & deep dive",
    ),
    (
        "V1-investigation-reflections_exol-deep-dive-2026-08-25",
        "63ca8aca-6312-4e96-bc34-f2b6d4f1d7d0",
        15 * 60 + 20,
        17 * 60,  # investigation + reflections + second alert
        "V1",
        "StackGen // Exol - AI SRE - Deep Dive Demo",
    ),
    (
        "V5-live-demo-remote-runners_jfrog-2026-09-03",
        "e25a2746-fe91-4980-9afd-f3ab19e17067",
        28 * 60 + 54,
        13 * 60,
        "V5",
        "Stackgen AI SRE Demo <> JFrog",
    ),
    (
        "V8-product-walkthrough_dell-2026-09-14",
        "ac7f5395-d130-46f8-a8f0-a27a5cd864de",
        22 * 60 + 50,
        17 * 60,
        "V8",
        "StackGen // Dell - AI SRE demo",
    ),
    (
        "V3-product-ui_visa-2026-04-24",
        "44da730b-a04e-4126-96f4-472cd8a53532",
        36 * 60 + 10,
        14 * 60,
        "V3",
        "StackGen SRE Demo for Visa",
    ),
    (
        "V3-frontdoor-discussion-ui_visa-2026-05-06",
        "6c0cb730-62f1-40fe-b575-552cef5f8a97",
        33 * 60 + 40,
        12 * 60,
        "V3",
        "SRE Demo + discussion w/ Visa Team",
    ),
    (
        "V6-multisource-demo_kissht-2026-03-27",
        "0f6ac399-caec-4007-96ee-012a7b976d1a",
        17 * 60 + 41,
        18 * 60,
        "V6",
        "Kissht<>StackGen: AI SRE Demo",
    ),
    (
        "V2-investigation-rca_cvs-2026-07-10",
        "57b0182a-8073-45cd-af08-531d61d4fb10",
        36 * 60 + 5,
        16 * 60,
        "V2",
        "SRE demo to CVS",
    ),
    (
        "V1-alert-investigation_exol-first-2026-08-06",
        "85622b5c-09b9-4fe4-a7bb-d454ad422da7",
        27 * 60 + 31,
        12 * 60,
        "V1",
        "StackGen // Exol - AI SRE demo",
    ),
    (
        "V4-runbooks-policies-sre_arrakis-2026-05-12",
        "7b155c98-6827-40c0-bf95-1f8b8db8723b",
        16 * 60 + 51,
        20 * 60,  # policies, runbooks, alert→RCA
        "V4",
        "Arrakis<>StackGen: Demo (Aiden - Infra & SRE)",
    ),
    (
        "V1-firing-alerts-rca_innovaccer-2026-06-05",
        "4d3cd8ff-7fa7-4825-acf6-72fd116ecea9",
        9 * 60 + 16,
        10 * 60,  # Aiden for SRE + firing alerts
        "V1",
        "SRE demo for Innovaccer",
    ),
    (
        "V2-pagerduty-auto-investigate_chamberlain-2026-05-13",
        "90f8a481-5684-4af3-8b26-974a8154b351",
        9 * 60 + 54,
        16 * 60,  # PD skill, filters, auto-investigate, runbooks
        "V2",
        "Chamberlain / StackGen Cadence",
    ),
    (
        "V5-sre-noise-persona_swimlane-2026-08-06",
        "708da0b3-dbb3-4c23-8883-665040867674",
        10 * 60 + 42,
        16 * 60,  # platform flash + SRE alerts/RCA
        "V5",
        "Stackgen / Swimlane",
    ),
]


def video_url(stem: str) -> str:
    data = json.loads((AGENT / f"{stem}.txt").read_text())
    url = (data.get("recordings") or {}).get("videoUrl")
    if not url:
        raise SystemExit(f"No videoUrl in {stem}")
    return url


def cut(slug: str, stem: str, start: float, dur: float) -> Path:
    CLIPS.mkdir(parents=True, exist_ok=True)
    out = CLIPS / f"{slug}.mp4"
    if out.exists() and out.stat().st_size > 1_000_000:
        print(f"SKIP exists {out.name} ({out.stat().st_size // 1_000_000}MB)")
        return out
    url = video_url(stem)
    # Seek after -i for accurate cuts on remote MP4; copy streams when possible.
    cmd = [
        "ffmpeg",
        "-y",
        "-loglevel",
        "error",
        "-stats",
        "-ss",
        str(start),
        "-i",
        url,
        "-t",
        str(dur),
        "-c",
        "copy",
        "-avoid_negative_ts",
        "make_zero",
        "-movflags",
        "+faststart",
        str(out),
    ]
    print(f"CUT {slug}  start={start:.0f}s dur={dur:.0f}s")
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0 or not out.exists() or out.stat().st_size < 100_000:
        # Fallback: re-encode (some S3 objects / codecs dislike stream copy)
        print(f"  copy failed; re-encoding… stderr={r.stderr[-400:]}")
        cmd2 = [
            "ffmpeg",
            "-y",
            "-loglevel",
            "error",
            "-stats",
            "-ss",
            str(start),
            "-i",
            url,
            "-t",
            str(dur),
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "23",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            str(out),
        ]
        r2 = subprocess.run(cmd2, capture_output=True, text=True)
        if r2.returncode != 0:
            print(r2.stderr[-800:], file=sys.stderr)
            raise SystemExit(f"ffmpeg failed for {slug}")
    print(f"  OK {out.name} ({out.stat().st_size // 1_000_000}MB)")
    return out


def main() -> None:
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    manifest = []
    for slug, stem, start, dur, uc, title in CLIPS_SPEC:
        if only and slug not in only and uc not in only:
            continue
        path = cut(slug, stem, start, dur)
        manifest.append(
            {
                "file": path.name,
                "use_case": uc,
                "source_title": title,
                "start_sec": start,
                "duration_sec": dur,
                "conversation_dump": stem,
            }
        )
    (ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Wrote {ROOT / 'manifest.json'} ({len(manifest)} clips)")


if __name__ == "__main__":
    main()
