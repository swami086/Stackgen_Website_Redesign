#!/usr/bin/env bash
# Create (or reuse) stackgen-web-vm and wait for http://IP:3000/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PROJECT="${GCP_PROJECT:-propane-galaxy-498403-n8}"
ZONE="${GCP_ZONE:-us-west1-b}"
VM_NAME="${VM_NAME:-stackgen-web-vm}"
GIT_BRANCH="${GIT_BRANCH:-main}"
GIT_REPO="${GIT_REPO:-https://github.com/swami086/Stackgen_Website_Redesign.git}"
MACHINE_TYPE="${MACHINE_TYPE:-e2-standard-4}"
TAG=stackgen-web
FW=allow-stackgen-web-3000

POSTGRES_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
PAYLOAD_SECRET="$(openssl rand -hex 32)"

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
  echo "==> VM $VM_NAME already exists; updating metadata and restarting"
  gcloud compute instances add-metadata "$VM_NAME" \
    --zone="$ZONE" --project="$PROJECT" \
    --metadata=git-repo="$GIT_REPO",git-branch="$GIT_BRANCH",postgres-password="$POSTGRES_PASSWORD",payload-secret="$PAYLOAD_SECRET" \
    --metadata-from-file=startup-script="$ROOT/scripts/gcp-vm-startup.sh"
  gcloud compute instances reset "$VM_NAME" --zone="$ZONE" --project="$PROJECT"
else
  echo "==> creating VM $VM_NAME"
  gcloud compute instances create "$VM_NAME" \
    --project="$PROJECT" \
    --zone="$ZONE" \
    --machine-type="$MACHINE_TYPE" \
    --tags="$TAG" \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=50GB \
    --metadata=git-repo="$GIT_REPO",git-branch="$GIT_BRANCH",postgres-password="$POSTGRES_PASSWORD",payload-secret="$PAYLOAD_SECRET" \
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
if [[ -z "$IP" ]]; then
  echo "ERROR: no external IP for $VM_NAME" >&2
  exit 1
fi
echo "External IP: $IP"

URL="http://${IP}:3000/"
echo "==> waiting for health $URL"
for i in $(seq 1 120); do
  if curl -sf --connect-timeout 5 --max-time 15 "$URL" >/dev/null; then
    echo "Site is up after ${i} attempt(s)"
    echo "Site:  $URL"
    echo "Admin: http://${IP}:3000/admin"
    echo ""
    echo "==> startup log tail (from VM)"
    gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
      --command='sudo tail -80 /var/log/stackgen-startup.log 2>/dev/null || echo "(no log yet)"' \
      2>/dev/null || true
    exit 0
  fi
  sleep 15
done

echo "ERROR: timed out waiting for $URL" >&2
gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
  --command='sudo tail -100 /var/log/stackgen-startup.log; docker ps -a 2>/dev/null; sudo docker compose -f /opt/stackgen/stack/docker-compose.yml logs --tail=40 2>/dev/null' \
  2>/dev/null || true
exit 1
