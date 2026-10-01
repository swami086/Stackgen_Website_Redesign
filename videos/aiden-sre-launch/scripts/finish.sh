#!/usr/bin/env bash
# Finish the HyperFrames master (spec §10.3). Grain + vignette only; audio passes through.
set -euo pipefail
cd "$(dirname "$0")/.."
IN=renders/film.mov
ffmpeg -loglevel error -y -i "$IN" -vf "vignette=angle=PI/5:mode=backward,noise=c0s=5:c0f=t+u,format=yuv422p10le" \
  -c:v prores_ks -profile:v 3 -c:a pcm_s24le renders/aiden-sre-launch-prores.mov
ffmpeg -loglevel error -y -i renders/aiden-sre-launch-prores.mov -c:v libx264 -profile:v high -preset slow -crf 16 \
  -pix_fmt yuv420p -c:a aac -b:a 320k -movflags +faststart renders/aiden-sre-launch.mp4
ffmpeg -loglevel error -y -i renders/aiden-sre-launch-prores.mov -vf "tmix=frames=2,fps=30" -c:v libx264 -profile:v high \
  -preset slow -crf 16 -pix_fmt yuv420p -c:a aac -b:a 320k -movflags +faststart renders/aiden-sre-launch-30.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name,r_frame_rate -show_entries format=duration -of compact renders/aiden-sre-launch.mp4
