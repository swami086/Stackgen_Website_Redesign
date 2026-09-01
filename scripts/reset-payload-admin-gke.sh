#!/usr/bin/env bash
# Wipe Payload admin users on GKE so /admin/create-first-user works again.
set -euo pipefail
PROJECT=propane-galaxy-498403-n8
ZONE=us-west1-b
CLUSTER=stackgen-web

gcloud container clusters get-credentials "$CLUSTER" --zone "$ZONE" --project "$PROJECT" >/dev/null

DBPOD="$(kubectl get pod -l app=stackgen-payload-db -o jsonpath='{.items[0].metadata.name}')"
kubectl exec "$DBPOD" -- psql -U payload -d payload -c "DELETE FROM users_sessions; DELETE FROM users;"

IP="$(kubectl get svc stackgen-payload -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
echo "Admin users cleared. Open http://${IP}/admin/create-first-user (wait ~5s for the form to hydrate)."
