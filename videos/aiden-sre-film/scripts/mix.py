"""Mix VO + music + SFX (spec §8.2). Usage: mix.py full|cut. Writes mix + vo/music/sfx stems."""
import json, os, subprocess, sys
from pathlib import Path

ROOT = Path(os.environ.get("SG_ROOT", Path(__file__).resolve().parents[1]))
A = ROOT / "shared/assets/audio"
ST = "aformat=sample_rates=48000:channel_layouts=stereo"


def build_cmd(mode):
    t = json.loads((ROOT / f"build/timing.{mode}.json").read_text())
    dur = t["duration"]
    shots = {s["id"]: s for s in t["shots"]}
    starts = {s["id"]: s["start"] for s in t["shots"]}
    cues = json.loads((A / "sfx/cues.json").read_text())
    sfx = []
    for c in cues:
        shot = shots.get(c["shot"])
        if shot is None or c["t"] >= shot["duration"] - 0.02:
            continue
        sfx.append((A / "sfx" / c["file"], starts[c["shot"]] + c["t"], c.get("gain_db", 0), shot["duration"] - c["t"]))
    cmd, fg, n, vo, sx = ["ffmpeg", "-y", "-loglevel", "error"], [], 0, [], []
    for lid, off in t["lines"].items():
        cmd += ["-i", str(A / f"vo/{lid}.wav")]
        fg.append(f"[{n}:a]{ST},highpass=f=80,equalizer=f=3000:t=q:w=1.2:g=2.5,acompressor=threshold=-20dB:ratio=2.2:attack=12:release=120:makeup=1.5,loudnorm=I=-16:TP=-1.5:LRA=7:linear=true,adelay={int(off * 1000)}:all=1,aresample=async=1:first_pts=0[v{n}]")
        vo.append(f"[v{n}]"); n += 1
    fg.append(f"{''.join(vo)}amix=inputs={len(vo)}:normalize=0,apad=whole_dur={dur},atrim=0:{dur}[vobus]")
    fg.append("[vobus]asplit=2[vokeymid][vostem]")
    for path, at, gain, remain in sfx:
        cmd += ["-i", str(path)]
        fg.append(f"[{n}:a]{ST},atrim=0:{remain:.3f},volume={gain}dB,adelay={int(at * 1000)}:all=1,aresample=async=1:first_pts=0[s{n}]")
        sx.append(f"[s{n}]"); n += 1
    if sx:
        fg.append(f"{''.join(sx)}amix=inputs={len(sx)}:normalize=0,apad=whole_dur={dur},atrim=0:{dur}[sfxbus]")
    else:
        fg.append(f"anullsrc=r=48000:cl=stereo,atrim=0:{dur}[sfxbus]")
    fg.append("[sfxbus]anull[sfxstem]")
    bed = A / ("music/eleven-bed-cut.wav" if mode == "cut" else "music/eleven-bed.wav")
    cmd += ["-i", str(bed)]
    # Carve only the voice band. Bass and air stay at full level, so the bed is still music under the narrator.
    fg.append(f"[{n}:a]{ST},apad=whole_dur={dur},atrim=0:{dur},loudnorm=I=-18:TP=-2:linear=true,afade=t=in:st=0:d=0.45,afade=t=out:st={max(dur - 2.2, 0)}:d=2.2[musraw]")
    fg.append("[musraw]asplit=3[lo_in][mid_in][hi_in]")
    fg.append("[lo_in]lowpass=f=250[lo]")
    fg.append("[mid_in]highpass=f=250,lowpass=f=2500[mid]")
    fg.append("[hi_in]highpass=f=2500[hi]")
    fg.append("[mid][vokeymid]sidechaincompress=threshold=0.04:ratio=4:attack=15:release=280:makeup=1[midduck]")
    fg.append("[lo][midduck][hi]amix=inputs=3:normalize=0[musblend]")
    fg.append("[musblend]anull[musstem]")
    o = ROOT / "renders/master"
    cmd += ["-filter_complex", ";".join(fg)]
    for label, name in (("vostem", "vo"), ("musstem", "music"), ("sfxstem", "sfx")):
        cmd += ["-map", f"[{label}]", "-ar", "48000", "-c:a", "pcm_s24le", str(o / f"{name}-{mode}.wav")]
    return cmd, dur


def mixdown(mode, dur):
    o = ROOT / "renders/master"
    mix = o / f"mix-{mode}.wav"
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error",
        "-i", str(o / f"vo-{mode}.wav"),
        "-i", str(o / f"music-{mode}.wav"),
        "-i", str(o / f"sfx-{mode}.wav"),
        "-filter_complex",
        f"[0:a]apad=whole_dur={dur}[a];[1:a]apad=whole_dur={dur}[b];[2:a]apad=whole_dur={dur}[c];"
        f"[a][b][c]amix=inputs=3:duration=longest:normalize=0,atrim=0:{dur},loudnorm=I=-14:TP=-1:LRA=11",
        "-t", str(dur), "-ar", "48000", "-c:a", "pcm_s24le", str(mix),
    ], check=True)


if __name__ == "__main__":
    (ROOT / "renders/master").mkdir(parents=True, exist_ok=True)
    cmd, dur = build_cmd(sys.argv[1])
    subprocess.run(cmd, check=True)
    mixdown(sys.argv[1], dur)
