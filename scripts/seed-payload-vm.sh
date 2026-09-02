#!/usr/bin/env bash
# Seed Payload on stackgen-web-vm from LOCAL web/ (replica.ts + products.ts).
# Avoids pnpm install on the e2-micro VM — that OOM'd the host during seed.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PROJECT="${GCP_PROJECT:-propane-galaxy-498403-n8}"
ZONE="${GCP_ZONE:-us-west1-b}"
VM_NAME="${VM_NAME:-stackgen-web-vm}"
LOCAL_PORT="${LOCAL_PG_PORT:-5435}"
REMOTE_PORT="${REMOTE_PG_PORT:-5433}"
BRIDGE="pg-seed-bridge"

source "$ROOT/scripts/lib/secrets.sh"
sg_load_deploy_secrets "$PROJECT"

IP="$(gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')"
PUBLIC_URL="http://${IP}:3000"

cleanup() {
  kill "$PF_PID" 2>/dev/null || true
  wait "$PF_PID" 2>/dev/null || true
  gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --quiet \
    --command="sudo docker rm -f ${BRIDGE} 2>/dev/null || true" 2>/dev/null || true
}
trap cleanup EXIT

echo "==> seed Payload on $VM_NAME @ $PUBLIC_URL (local pnpm, VM postgres bridge)"

echo "==> postgres bridge on VM"
gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --quiet --command="
set -euo pipefail
sudo docker rm -f ${BRIDGE} 2>/dev/null || true
NETWORK=\$(sudo docker inspect stackgen-stack-postgres-1 -f '{{range \$k, \$v := .NetworkSettings.Networks}}{{\$k}}{{end}}')
[[ -n \"\$NETWORK\" ]] || { echo 'ERROR: postgres container not running — deploy first' >&2; exit 1; }
sudo docker run -d --name ${BRIDGE} --network \"\$NETWORK\" \\
  -p 127.0.0.1:${REMOTE_PORT}:5432 \\
  alpine/socat TCP-LISTEN:5432,fork,reuseaddr TCP:postgres:5432
"

echo "==> port-forward localhost:${LOCAL_PORT} → VM:${REMOTE_PORT}"
gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --quiet \
  --ssh-flag="-N" --ssh-flag="-L" --ssh-flag="${LOCAL_PORT}:127.0.0.1:${REMOTE_PORT}" &
PF_PID=$!
sleep 3

export DATABASE_URL="postgresql://payload:${POSTGRES_PASSWORD}@127.0.0.1:${LOCAL_PORT}/payload"
export PAYLOAD_SECRET
export PAYLOAD_PUBLIC_SERVER_URL="$PUBLIC_URL"
export NODE_ENV=production

cd "$ROOT/web"
echo "==> migrate"
pnpm exec payload migrate
echo "==> seed"
pnpm seed:app

echo "==> remote counts"
gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --quiet --command="
sudo docker exec stackgen-stack-postgres-1 psql -U payload -d payload -tAc \"
  SELECT 'products:' || COUNT(*) FROM products
  UNION ALL SELECT 'cards:' || COUNT(*) FROM cards
  UNION ALL SELECT 'faqs:' || COUNT(*) FROM faqs
  UNION ALL SELECT 'posts:' || COUNT(*) FROM posts
  UNION ALL SELECT 'home:' || COUNT(*) FROM home;
\"
"

echo "Done. Site:  $PUBLIC_URL/"
echo "       Admin: ${PUBLIC_URL}/admin"
