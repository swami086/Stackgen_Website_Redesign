#!/usr/bin/env bash
# Build/push web image, create stackgen-web-vm, wait for :3000 health.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PROJECT="${GCP_PROJECT:-propane-galaxy-498403-n8}"
ZONE="${GCP_ZONE:-us-west1-b}"
VM_NAME="${VM_NAME:-stackgen-web-vm}"
GIT_BRANCH="${GIT_BRANCH:-main}"
GIT_REPO="${GIT_REPO:-https://github.com/swami086/Stackgen_Website_Redesign.git}"
MACHINE_TYPE="${MACHINE_TYPE:-e2-micro}"
REGISTRY="us-west1-docker.pkg.dev/${PROJECT}/stackgen-web"
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
IMAGE="${REGISTRY}/web:${SHA}"
TAG=stackgen-web
FW=allow-stackgen-web-3000

source "$ROOT/scripts/lib/secrets.sh"
sg_load_deploy_secrets "$PROJECT"

echo "==> build and push ${IMAGE}"
gcloud auth configure-docker us-west1-docker.pkg.dev --quiet
docker build --platform linux/amd64 -t "$IMAGE" -t "${REGISTRY}/web:latest" "$ROOT/web"
docker push "$IMAGE"
docker push "${REGISTRY}/web:latest"

if ! gcloud compute firewall-rules describe "$FW" --project="$PROJECT" >/dev/null 2>&1; then
  echo "==> firewall $FW"
  gcloud compute firewall-rules create "$FW" \
    --project="$PROJECT" \
    --allow=tcp:3000 \
    --target-tags="$TAG" \
    --source-ranges=0.0.0.0/0 \
    --description="StackGen Next.js on port 3000"
fi

if gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" >/dev/null 2>&1; then
  # Secrets are stable now, so an existing disk is reusable. Recreating it here
  # used to be the only way to resync the randomly-regenerated compose secrets,
  # and it destroyed the Payload database (and every admin user) each deploy.
  echo "==> $VM_NAME exists — refreshing metadata instead of recreating"
  gcloud compute instances add-metadata "$VM_NAME" \
    --zone="$ZONE" --project="$PROJECT" \
    --metadata=git-repo="$GIT_REPO",git-branch="$GIT_BRANCH",web-image="$IMAGE",postgres-password="$POSTGRES_PASSWORD",payload-secret="$PAYLOAD_SECRET" \
    --metadata-from-file=startup-script="$ROOT/scripts/gcp-vm-startup.sh"
  echo "==> re-running startup script"
  gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
    --command='sudo google_metadata_script_runner startup' >/dev/null
else

echo "==> creating VM $VM_NAME ($MACHINE_TYPE)"
gcloud compute instances create "$VM_NAME" \
  --project="$PROJECT" \
  --zone="$ZONE" \
  --machine-type="$MACHINE_TYPE" \
  --tags="$TAG" \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=30GB \
  --scopes=https://www.googleapis.com/auth/cloud-platform \
  --metadata=git-repo="$GIT_REPO",git-branch="$GIT_BRANCH",web-image="$IMAGE",postgres-password="$POSTGRES_PASSWORD",payload-secret="$PAYLOAD_SECRET" \
  --metadata-from-file=startup-script="$ROOT/scripts/gcp-vm-startup.sh"
fi

echo "==> waiting for external IP"
IP=""
for _ in $(seq 1 60); do
  IP="$(gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)' 2>/dev/null || true)"
  [[ -n "$IP" ]] && break
  sleep 5
done
[[ -n "$IP" ]] || { echo "ERROR: no external IP" >&2; exit 1; }
echo "External IP: $IP"

URL="http://${IP}:3000/"
echo "==> waiting for health $URL"
for i in $(seq 1 80); do
  if curl -sf --connect-timeout 5 --max-time 20 "$URL" >/dev/null; then
    echo "Site is up after ${i} attempt(s)"
    echo "Site:  $URL"
    echo "Admin: http://${IP}:3000/admin"
    echo ""
    echo "==> startup log tail"
    gcloud compute instances get-serial-port-output "$VM_NAME" --zone="$ZONE" --project="$PROJECT" 2>/dev/null \
      | rg 'startup-script:|startup-script exit' | tail -40 || true
    exit 0
  fi
  sleep 20
done

echo "ERROR: timed out waiting for $URL" >&2
gcloud compute instances get-serial-port-output "$VM_NAME" --zone="$ZONE" --project="$PROJECT" 2>/dev/null \
  | rg 'startup-script:|Error|error|exit status' | tail -60 || true
exit 1
