#!/usr/bin/env bash
# Ensure GKE Postgres (stackgen-payload-db) for embedded Payload in stackgen-web.
# Does not build a separate Payload CMS image — admin is /admin on the web app.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT=propane-galaxy-498403-n8
ZONE=us-west1-b
CLUSTER=stackgen-web

gcloud container clusters get-credentials "$CLUSTER" --zone "$ZONE" --project "$PROJECT"

if ! kubectl get secret stackgen-payload >/dev/null 2>&1; then
  PGPASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
  PSECRET="$(openssl rand -hex 32)"
  DBURL="postgresql://payload:${PGPASS}@stackgen-payload-db:5432/payload"
  kubectl create secret generic stackgen-payload \
    --from-literal=POSTGRES_PASSWORD="$PGPASS" \
    --from-literal=PAYLOAD_SECRET="$PSECRET" \
    --from-literal=DATABASE_URL="$DBURL"
  echo "Created secret stackgen-payload (values not printed)."
fi

kubectl apply -f "$ROOT/k8s/payload.yaml"
kubectl rollout status deployment/stackgen-payload-db --timeout=180s
echo "Postgres ready (stackgen-payload-db). Deploy web with DATABASE_URL pointing at it."
