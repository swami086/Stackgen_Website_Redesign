#!/bin/bash
# Round 2: trim browser chrome + desktop padding, keep 100% of product UI.
# Measured window geometry (all 5 sources identical): content x 96..1824,
# product UI y 80..1030 (chrome tab strip + URL bar above y=80).
# crop=1728:950:96:80 -> 2x supersample -> zoompan Arcade-snap punches ->
# 1920x1080 H.264 CRF 18. Sources are video-only, so -an.
# Snap per beat T: 0.45s ease-out cubic attack to 1.15x, hold to T+1.55,
# 0.6s smoothstep release back to 1.0. Static between beats (no drift).
# ponytail: center-anchored punches; ceiling is per-beat off-center focus
# points (Arcade-style click targeting) if a punch ever needs to aim.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=Edited_Launch_Videos
mkdir -p "$OUT"

edit() {
  local in="$1" punches="$2"
  local out="$OUT/${in%.mp4}_edited.mp4"
  local z="1"
  for T in $punches; do
    local tr
    tr=$(awk -v t="$T" 'BEGIN{printf "%.3f", t+1.55}')
    z="${z}+0.15*(1-pow(1-clip((on*1001/30000-${T})/0.45,0,1),3))*(1-pow(clip((on*1001/30000-${tr})/0.6,0,1),2)*(3-2*clip((on*1001/30000-${tr})/0.6,0,1)))"
  done
  echo "== $in -> $out (punches: ${punches:-none})"
  ffmpeg -y -v error -i "$in" -vf \
    "crop=1728:950:96:80,scale=3456:1900:flags=lanczos,zoompan=z='${z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30000/1001" \
    -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -movflags +faststart -an "$out"
}

edit Aiden_devops.mp4         "4.5"
edit Aiden_Observability.mp4  "7.5"
edit Aiden_SRE.mp4            "4.2 7.8"
edit Aiden_Infraops.mp4       "12.2 17.7 21.5"
edit Combined_Hero.mp4        "5.0 25.3 30.8 43.9 51.9 67.8"

echo "Done. Outputs in $OUT/"
