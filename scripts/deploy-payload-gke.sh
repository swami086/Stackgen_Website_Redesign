#!/usr/bin/env bash
# Deploy Payload CMS to existing GKE cluster stackgen-web (us-west1-b).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT=propane-galaxy-498403-n8
ZONE=us-west1-b
CLUSTER=stackgen-web
REGISTRY=us-west1-docker.pkg.dev/${PROJECT}/stackgen-web
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
IMAGE="${REGISTRY}/payload:${SHA}"

gcloud container clusters get-credentials "$CLUSTER" --zone "$ZONE" --project "$PROJECT"

echo "==> build ${IMAGE}"
docker build --platform linux/amd64 -t "$IMAGE" -t "${REGISTRY}/payload:latest" "$ROOT/payload"
docker push "$IMAGE"
docker push "${REGISTRY}/payload:latest"

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

export PAYLOAD_IMAGE="$IMAGE"
envsubst '${PAYLOAD_IMAGE}' < "$ROOT/k8s/payload.yaml" | kubectl apply -f -

kubectl rollout status deployment/stackgen-payload-db --timeout=180s
kubectl rollout status deployment/stackgen-payload --timeout=300s

IP="$(kubectl get svc stackgen-payload -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
if [[ -n "$IP" ]]; then
  kubectl create configmap stackgen-payload \
    --from-literal=PAYLOAD_PUBLIC_SERVER_URL="http://${IP}" \
    --dry-run=client -o yaml | kubectl apply -f -
  kubectl rollout restart deployment/stackgen-payload
  kubectl rollout status deployment/stackgen-payload --timeout=180s
  echo "Payload admin: http://${IP}/admin"
else
  echo "Waiting for LoadBalancer IP — rerun: kubectl get svc stackgen-payload"
fi
