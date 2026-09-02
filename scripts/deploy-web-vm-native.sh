#!/usr/bin/env bash
# Deploy Next.js + Payload natively on existing stackgen-web-vm (no Docker).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PROJECT="${GCP_PROJECT:-propane-galaxy-498403-n8}"
ZONE="${GCP_ZONE:-us-west1-b}"
VM_NAME="${VM_NAME:-stackgen-web-vm}"
GIT_BRANCH="${GIT_BRANCH:-main}"
GIT_REPO="${GIT_REPO:-https://github.com/swami086/Stackgen_Website_Redesign.git}"
SEED_CMS="${SEED_CMS:-0}"

source "$ROOT/scripts/lib/secrets.sh"
sg_load_deploy_secrets "$PROJECT"

echo "==> native deploy on $VM_NAME"

# Remove Docker startup-script so reboots don't re-install Docker stack
gcloud compute instances remove-metadata "$VM_NAME" \
  --zone="$ZONE" --project="$PROJECT" \
  --keys=startup-script 2>/dev/null || true

gcloud compute scp "$ROOT/scripts/gcp-vm-native-install.sh" "$ROOT/scripts/stackgen-web.service" \
  "${VM_NAME}:/tmp/" --zone="$ZONE" --project="$PROJECT"

gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --command="
  set -euo pipefail
  sudo mkdir -p /opt/stackgen/scripts
  sudo cp /tmp/gcp-vm-native-install.sh /opt/stackgen/scripts/
  sudo cp /tmp/stackgen-web.service /opt/stackgen/scripts/
  sudo chmod +x /opt/stackgen/scripts/gcp-vm-native-install.sh
  export GIT_REPO='${GIT_REPO}'
  export GIT_BRANCH='${GIT_BRANCH}'
  export POSTGRES_PASSWORD='${POSTGRES_PASSWORD}'
  export PAYLOAD_SECRET='${PAYLOAD_SECRET}'
  export SEED_CMS='${SEED_CMS}'
  sudo -E bash /opt/stackgen/scripts/gcp-vm-native-install.sh
" 2>&1

URL="http://${IP}:3000/"
echo "==> waiting for $URL"
for i in $(seq 1 60); do
  if curl -sf --connect-timeout 5 --max-time 15 "$URL" >/dev/null 2>&1; then
    echo "✅ Site:  $URL"
    echo "✅ Admin: http://${IP}:3000/admin/create-first-user"
    exit 0
  fi
  sleep 10
done

echo "⚠️  Timed out. Check:"
echo "  gcloud compute ssh $VM_NAME --zone=$ZONE --project=$PROJECT --command='sudo journalctl -u stackgen-web -n 50; sudo tail -30 /var/log/stackgen-native-install.log'"
exit 1
