#!/usr/bin/env bash
# Build web image locally, push to Artifact Registry, deploy on stackgen-web-vm (pull-only, no VM build).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PROJECT="${GCP_PROJECT:-propane-galaxy-498403-n8}"
ZONE="${GCP_ZONE:-us-west1-b}"
VM_NAME="${VM_NAME:-stackgen-web-vm}"
GIT_BRANCH="${GIT_BRANCH:-main}"
GIT_REPO="${GIT_REPO:-https://github.com/swami086/Stackgen_Website_Redesign.git}"
REGISTRY="us-west1-docker.pkg.dev/${PROJECT}/stackgen-web"
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
IMAGE="${REGISTRY}/web:${SHA}"

echo "==> build & push ${IMAGE}"
docker build --platform linux/amd64 -t "$IMAGE" -t "${REGISTRY}/web:latest" "$ROOT/web"
docker push "$IMAGE"
docker push "${REGISTRY}/web:latest"

# Ensure compute SA can pull (idempotent).
PROJECT_NUM="$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')"
gcloud artifacts repositories add-iam-policy-binding stackgen-web \
  --location=us-west1 --project="$PROJECT" \
  --member="serviceAccount:${PROJECT_NUM}-compute@developer.gserviceaccount.com" \
  --role="roles/artifactregistry.reader" \
  --quiet >/dev/null 2>&1 || true

POSTGRES_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
PAYLOAD_SECRET="$(openssl rand -hex 32)"
TAG=stackgen-web
FW=allow-stackgen-web-3000

if ! gcloud compute firewall-rules describe "$FW" --project="$PROJECT" >/dev/null 2>&1; then
  gcloud compute firewall-rules create "$FW" \
    --project="$PROJECT" --allow=tcp:3000 --target-tags="$TAG" \
    --source-ranges=0.0.0.0/0 --description="StackGen Next.js port 3000"
fi

STARTUP="$ROOT/scripts/gcp-vm-startup.sh"
META="git-repo=${GIT_REPO},git-branch=${GIT_BRANCH},postgres-password=${POSTGRES_PASSWORD},payload-secret=${PAYLOAD_SECRET},web-image=${IMAGE}"

if gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" >/dev/null 2>&1; then
  echo "==> stop stuck VM, update metadata, restart"
  gcloud compute instances stop "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --quiet
  gcloud compute instances add-metadata "$VM_NAME" \
    --zone="$ZONE" --project="$PROJECT" \
    --metadata="$META" \
    --metadata-from-file=startup-script="$STARTUP"
  gcloud compute instances start "$VM_NAME" --zone="$ZONE" --project="$PROJECT"
else
  echo "==> create VM $VM_NAME"
  gcloud compute instances create "$VM_NAME" \
    --project="$PROJECT" --zone="$ZONE" \
    --machine-type="${MACHINE_TYPE:-e2-standard-2}" \
    --tags="$TAG" \
    --image-family=ubuntu-2204-lts --image-project=ubuntu-os-cloud \
    --boot-disk-size=30GB \
    --scopes=cloud-platform \
    --metadata="$META" \
    --metadata-from-file=startup-script="$STARTUP"
fi

IP=""
for _ in $(seq 1 40); do
  IP="$(gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP,status)' 2>/dev/null | head -1)"
  STATUS="$(gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
    --format='get(status)' 2>/dev/null)"
  [[ "$STATUS" == "RUNNING" && -n "$IP" ]] && break
  sleep 5
done

URL="http://${IP}:3000/"
echo "External IP: $IP — waiting for $URL"
for i in $(seq 1 40); do
  if curl -sf --connect-timeout 5 --max-time 15 "$URL" >/dev/null 2>&1; then
    echo "✅ Site:  $URL"
    echo "✅ Admin: http://${IP}:3000/admin"
    exit 0
  fi
  sleep 15
done

echo "⚠️  Timed out. Check log:"
echo "  gcloud compute ssh $VM_NAME --zone=$ZONE --project=$PROJECT --command='sudo tail -50 /var/log/stackgen-startup.log'"
exit 1
