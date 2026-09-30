#!/usr/bin/env bash
# Heavy-blur passes at 120 fps via HeyGen cloud. Usage: scripts/render-cloud.sh S12 [full|cut]
# Flags taken from `hyperframes cloud render --help` (v0.8.96): DIR, --variables,
# --strict-variables, --format mov, --fps (1-240), --output (downloads the render).
set -euo pipefail
PROJ="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="${SG_ROOT:-$PROJ}"
cd "$PROJ"
S="$1"; MODE="${2:-full}"
SUF=""; [[ "$MODE" == cut ]] && SUF="-cut"
mkdir -p "$ROOT/renders/passes"
for P in bg mid fg; do
  npx hyperframes cloud render "shots/$S" \
    --variables "{\"pass\":\"$P\",\"mode\":\"$MODE\"}" \
    --strict-variables \
    --format mov \
    --fps 120 \
    --output "$ROOT/renders/passes/$S$SUF-$P.mov"
done
echo 120 > "$ROOT/renders/passes/$S$SUF.fps"
