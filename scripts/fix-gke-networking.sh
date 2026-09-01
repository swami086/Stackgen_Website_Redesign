#!/usr/bin/env bash
# Open GCP firewall for stackgen-web GKE LoadBalancers + NodePorts.
# GKE auto-rules only allow VIP:80; NodePorts (30121/32372) need explicit access
# for LB backends and direct debugging.
set -euo pipefail
PROJECT=propane-galaxy-498403-n8
ZONE=us-west1-b
CLUSTER=stackgen-web
RULE=stackgen-gke-public-access
TAG=gke-stackgen-web-487d3114-node

gcloud container clusters get-credentials "$CLUSTER" --zone "$ZONE" --project "$PROJECT"

if ! gcloud compute firewall-rules describe "$RULE" --project="$PROJECT" >/dev/null 2>&1; then
  gcloud compute firewall-rules create "$RULE" \
    --project="$PROJECT" \
    --network=default \
    --direction=INGRESS \
    --action=ALLOW \
    --rules=tcp:80,tcp:443,tcp:3000-32767 \
    --source-ranges=0.0.0.0/0 \
    --target-tags="$TAG" \
    --priority=900 \
    --description="Full public HTTP/HTTPS/NodePort access for stackgen-web GKE cluster"
  echo "Created firewall rule $RULE"
else
  echo "Firewall rule $RULE already exists"
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
kubectl apply -f "$ROOT/k8s/payload.yaml" 2>/dev/null || true
kubectl apply -f "$ROOT/k8s/web.yaml" 2>/dev/null || true

WEB_IP="$(kubectl get svc stackgen-web -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
PAYLOAD_IP="$(kubectl get svc stackgen-payload -o jsonpath='{.status.loadBalancer.ingress[0].ip}')"
echo ""
echo "Website:       http://${WEB_IP}/"
echo "Payload admin: http://${PAYLOAD_IP}/admin"
echo "Use http:// not https:// (no TLS on these LBs yet)."
