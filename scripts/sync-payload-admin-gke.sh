#!/usr/bin/env bash
# Copy local stack Postgres admin credentials to GKE so the same email/password works.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EMAIL="${1:-swami@stackgen.com}"

LOCAL_HASH=$(
  docker compose -f "$ROOT/stack/docker-compose.yml" exec -T postgres \
    psql -U payload -d payload -tA -c "select hash from users where email='${EMAIL}'" 2>/dev/null || true
)
LOCAL_SALT=$(
  docker compose -f "$ROOT/stack/docker-compose.yml" exec -T postgres \
    psql -U payload -d payload -tA -c "select salt from users where email='${EMAIL}'" 2>/dev/null || true
)
if [[ -z "$LOCAL_HASH" || -z "$LOCAL_SALT" ]]; then
  echo "No local user ${EMAIL} in stack postgres — create one at http://127.0.0.1:3000/admin first"
  exit 1
fi

kubectl exec deploy/stackgen-payload-db -- psql -U payload -d payload -v ON_ERROR_STOP=1 \
  -c "UPDATE users SET hash='${LOCAL_HASH}', salt='${LOCAL_SALT}' WHERE email='${EMAIL}'; DELETE FROM users_sessions;"

IP="$(kubectl get svc stackgen-web -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
echo "Synced ${EMAIL} password from local stack → GKE. Login at http://${IP}/admin/login"
