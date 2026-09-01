#!/usr/bin/env bash
# Deploy full stack to GKE: Payload (+ Postgres) then web wired to CMS.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
"$ROOT/scripts/deploy-payload-gke.sh"
"$ROOT/scripts/deploy-web-gke.sh"
