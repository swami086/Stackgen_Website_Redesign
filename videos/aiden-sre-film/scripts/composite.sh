#!/usr/bin/env bash
# Composite bg/mid/fg passes of one shot into a 30 fps shot file. Usage: scripts/composite.sh S12 | S23-cut
set -euo pipefail
ROOT="${SG_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
S="$1"
P="$ROOT/renders/passes/$S"
FPS_IN=$(cat "$P.fps")
N=$(( FPS_IN / 30 ))
WEIGHTS=$(printf '1 %.0s' $(seq 1 "$N"))
BLOOM_MID="${BLOOM_MID:-0.35}"; BLOOM_FG="${BLOOM_FG:-0.25}"; GRAIN="${GRAIN:-4}"
mkdir -p "$ROOT/renders/shots"
ffmpeg -loglevel error -y -i "$P-bg.mov" -i "$P-mid.mov" -i "$P-fg.mov" -filter_complex "
 [0:v]format=rgba64le[bg];
 [1:v]format=rgba64le,split[mid][midb];
 [midb]colorlevels=rimin=0.78:gimin=0.78:bimin=0.78,gblur=sigma=14[midglow];
 [2:v]format=rgba64le,split[fg][fgb];
 [fgb]colorlevels=rimin=0.82:gimin=0.82:bimin=0.82,gblur=sigma=10[fgglow];
 [bg][mid]overlay=format=auto[a];
 [a][midglow]blend=all_mode=screen:all_opacity=$BLOOM_MID[b];
 [b][fg]overlay=format=auto[c];
 [c][fgglow]blend=all_mode=screen:all_opacity=$BLOOM_FG[d];
 [d]tmix=frames=$N:weights='$WEIGHTS',fps=30,vignette=angle=PI/5:mode=backward,noise=c0s=$GRAIN:c0f=t+u,format=yuv422p10le[out]" \
 -map "[out]" -c:v prores_ks -profile:v 3 -vendor apl0 "$ROOT/renders/shots/$S.mov"
