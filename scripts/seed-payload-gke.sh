#!/usr/bin/env bash
# Run Payload migrations + seed against GKE Postgres (port-forward to cluster DB).
# CMS admin lives on stackgen-web (/admin), not a separate payload Service.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT=propane-galaxy-498403-n8
ZONE=us-west1-b
CLUSTER=stackgen-web
LOCAL_PORT=5434

gcloud container clusters get-credentials "$CLUSTER" --zone "$ZONE" --project "$PROJECT"

WEB_IP="$(kubectl get svc stackgen-web -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
# Prefer web secret (embedded CMS); fall back to legacy stackgen-payload secret.
if kubectl get secret stackgen-web >/dev/null 2>&1 && \
   kubectl get secret stackgen-web -o jsonpath='{.data.DATABASE_URL}' | grep -q .; then
  DBURL="$(kubectl get secret stackgen-web -o jsonpath='{.data.DATABASE_URL}' | base64 -d)"
  PAYLOAD_SECRET_VAL="$(kubectl get secret stackgen-web -o jsonpath='{.data.PAYLOAD_SECRET}' | base64 -d)"
else
  DBURL="$(kubectl get secret stackgen-payload -o jsonpath='{.data.DATABASE_URL}' | base64 -d)"
  PAYLOAD_SECRET_VAL="$(kubectl get secret stackgen-payload -o jsonpath='{.data.PAYLOAD_SECRET}' | base64 -d)"
fi
DBURL="${DBURL/@stackgen-payload-db:5432/@127.0.0.1:${LOCAL_PORT}}"

kubectl port-forward svc/stackgen-payload-db "${LOCAL_PORT}:5432" >/tmp/stackgen-payload-pf.log 2>&1 &
PF_PID=$!
cleanup() { kill "$PF_PID" 2>/dev/null || true; }
trap cleanup EXIT
sleep 2

export DATABASE_URL="$DBURL"
export PAYLOAD_SECRET="$PAYLOAD_SECRET_VAL"
export PAYLOAD_PUBLIC_SERVER_URL="http://${WEB_IP}"
export NODE_ENV=production

cd "$ROOT/web"
echo "==> migrate"
pnpm exec payload migrate
# ponytail: never seed with push/dev against prod — leaves payload_migrations batch=-1
DEV_ROWS="$(kubectl exec deploy/stackgen-payload-db -- psql -U payload -d payload -tAc 'select count(*) from payload_migrations where batch=-1' 2>/dev/null || echo 0)"
if [[ "${DEV_ROWS}" != "0" ]]; then
  echo "Removing dev push marker (batch=-1) from payload_migrations"
  kubectl exec deploy/stackgen-payload-db -- psql -U payload -d payload -c 'DELETE FROM payload_migrations WHERE batch=-1;'
fi
echo "==> seed"
pnpm seed:app
echo "Done. Admin: http://${WEB_IP}/admin"
