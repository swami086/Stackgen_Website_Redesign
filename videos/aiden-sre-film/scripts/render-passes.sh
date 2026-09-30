#!/usr/bin/env bash
# Render the three passes of one shot. Usage: scripts/render-passes.sh S12 [full|cut] [draft|delivery]
set -euo pipefail
PROJ="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="${SG_ROOT:-$PROJ}"
cd "$PROJ"
S="$1"; MODE="${2:-full}"; Q="${3:-delivery}"
SUF=""; [[ "$MODE" == cut ]] && SUF="-cut"
BLUR=$(python3 -c "import json,sys;print(next(s['blur'] for s in json.load(open('data/shots.json')) if s['id']==sys.argv[1]))" "$S")
if [[ "$BLUR" == heavy && "${HF_CLOUD:-0}" == 1 && -x scripts/render-cloud.sh ]]; then
  SG_ROOT="$ROOT" exec scripts/render-cloud.sh "$S" "$MODE"
fi
mkdir -p "$ROOT/renders/passes"
npx hyperframes check "shots/$S"
for P in bg mid fg; do
  npx hyperframes render "shots/$S" --variables "{\"pass\":\"$P\",\"mode\":\"$MODE\"}" --strict-variables \
    --format mov --fps 60 --quality "$Q" --output "$ROOT/renders/passes/$S$SUF-$P.mov"
done
echo 60 > "$ROOT/renders/passes/$S$SUF.fps"
