#!/usr/bin/env bash
# Harvest Figma MCP localhost SVG assets into .figma-assets/deck{N}/
# Usage: ./scripts/harvest-figma-assets.sh <deck_num> <hash:name> ...
# Example: ./scripts/harvest-figma-assets.sh 1 ec25e7...:group106 390e90...:frame

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DECK="$1"
shift
DIR="$ROOT/.figma-assets/deck${DECK}"
mkdir -p "$DIR"
BASE="http://localhost:3845/assets"

for item in "$@"; do
  hash="${item%%:*}"
  name="${item##*:}"
  out="$DIR/${name}.svg"
  if curl -sf "${BASE}/${hash}.svg" -o "$out"; then
    echo "ok deck${DECK}/${name}.svg"
  else
    echo "FAIL deck${DECK}/${name}.svg" >&2
    exit 1
  fi
done
