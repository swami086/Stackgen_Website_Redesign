import json, os, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]


def ff(*args):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *args], check=True)


def probe(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=pix_fmt,r_frame_rate,nb_frames",
                          "-of", "json", str(p)], capture_output=True, text=True, check=True).stdout
    return json.loads(out)["streams"][0]


def test_composite_60_to_30_10bit(tmp_path):
    P = tmp_path / "renders/passes"
    P.mkdir(parents=True)
    ff("-f", "lavfi", "-i", "color=c=0x14110C:s=640x360:r=60:d=1", "-c:v", "prores_ks", "-profile:v", "4", str(P / "SX-bg.mov"))
    ff("-f", "lavfi", "-i", "testsrc2=s=640x360:r=60:d=1,format=yuva444p10le", "-c:v", "prores_ks", "-profile:v", "4",
       "-pix_fmt", "yuva444p10le", str(P / "SX-mid.mov"))
    ff("-i", str(P / "SX-mid.mov"), "-c", "copy", str(P / "SX-fg.mov"))
    (P / "SX.fps").write_text("60\n")
    subprocess.run([str(ROOT / "scripts/composite.sh"), "SX"], check=True, env={**os.environ, "SG_ROOT": str(tmp_path)})
    s = probe(tmp_path / "renders/shots/SX.mov")
    assert s["pix_fmt"] == "yuv422p10le" and s["r_frame_rate"] == "30/1" and int(s["nb_frames"]) == 30
