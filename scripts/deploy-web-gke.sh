#!/usr/bin/env bash
# Build and deploy Next.js web (with embedded Payload) to GKE.
# Requires secret stackgen-web (PAYLOAD_SECRET, DATABASE_URL → stackgen-payload-db)
# and ConfigMap stackgen-web (PAYLOAD_PUBLIC_SERVER_URL = this Service's public URL).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT=propane-galaxy-498403-n8
ZONE=us-west1-b
CLUSTER=stackgen-web
REGISTRY=us-west1-docker.pkg.dev/${PROJECT}/stackgen-web
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
IMAGE="${REGISTRY}/web:${SHA}"

gcloud container clusters get-credentials "$CLUSTER" --zone "$ZONE" --project "$PROJECT"

echo "==> build ${IMAGE}"
docker build --platform linux/amd64 -t "$IMAGE" -t "${REGISTRY}/web:latest" "$ROOT/web"
docker push "$IMAGE"
docker push "${REGISTRY}/web:latest"

export WEB_IMAGE="$IMAGE"
envsubst '${WEB_IMAGE}' < "$ROOT/k8s/web.yaml" | kubectl apply -f -

kubectl rollout status deployment/stackgen-web --timeout=360s

IP="$(kubectl get svc stackgen-web -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
if [[ -n "${IP}" ]]; then
  kubectl create configmap stackgen-web \
    --from-literal=PAYLOAD_PUBLIC_SERVER_URL="http://${IP}" \
    -o yaml --dry-run=client | kubectl apply -f -
  # Restart so pods pick up ConfigMap if it changed
  kubectl rollout restart deployment/stackgen-web
  kubectl rollout status deployment/stackgen-web --timeout=360s
fi

# Retire standalone Payload CMS Deployment (DB stays for shared Postgres).
if kubectl get deploy stackgen-payload >/dev/null 2>&1; then
  echo "==> scaling down standalone stackgen-payload (CMS now in web)"
  kubectl scale deploy/stackgen-payload --replicas=0 || true
fi

echo "Website: http://${IP:-<pending>}/"
echo "Admin:   http://${IP:-<pending>}/admin"
