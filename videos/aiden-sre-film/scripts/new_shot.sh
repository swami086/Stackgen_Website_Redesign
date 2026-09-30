#!/usr/bin/env bash
# Create shots/<ID>/ from the template. Usage: scripts/new_shot.sh S12 [DATA_ID]
set -euo pipefail
cd "$(dirname "$0")/.."
ID="$1"; DATA_ID="${2:-$1}"; D="shots/$ID"
[[ -e "$D/index.html" ]] && { echo "$D exists"; exit 1; }
mkdir -p "$D"
sed -e "s/const DATA_ID = \"SXX\"/const DATA_ID = \"$DATA_ID\"/" -e "s/SXX/$ID/g" shots/_template/index.html > "$D/index.html"
cp hyperframes.json "$D/hyperframes.json"
ln -sfn ../../shared "$D/_shared"
echo "created $D (data $DATA_ID)"
