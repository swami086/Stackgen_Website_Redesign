#!/usr/bin/env bash
# Seed Payload after stack/docker-compose.yml is up (Postgres on 127.0.0.1:5433).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/stack/.env"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — copy stack/.env.example to stack/.env"
  exit 1
fi
# shellcheck disable=SC1090
set -a && source "$ENV_FILE" && set +a
cd "$ROOT/web"
export DATABASE_URL="postgresql://payload:${POSTGRES_PASSWORD}@127.0.0.1:5433/payload"
pnpm seed:app
