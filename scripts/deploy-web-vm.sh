#!/usr/bin/env bash
# Build web image locally, push to Artifact Registry, deploy on VM via Docker Compose (pull-only).
# Wipes native/systemd install if present. Fixes Payload remote admin URL + postgres service hostname.
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
FRESH_DB="${FRESH_DB:-1}"

POSTGRES_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
PAYLOAD_SECRET="$(openssl rand -hex 32)"

echo "==> build & push ${IMAGE}"
docker build --platform linux/amd64 -t "$IMAGE" -t "${REGISTRY}/web:latest" "$ROOT/web"
docker push "$IMAGE"
docker push "${REGISTRY}/web:latest"

PROJECT_NUM="$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')"
gcloud artifacts repositories add-iam-policy-binding stackgen-web \
  --location=us-west1 --project="$PROJECT" \
  --member="serviceAccount:${PROJECT_NUM}-compute@developer.gserviceaccount.com" \
  --role="roles/artifactregistry.reader" \
  --quiet >/dev/null 2>&1 || true

FW=allow-stackgen-web-3000
TAG=stackgen-web
if ! gcloud compute firewall-rules describe "$FW" --project="$PROJECT" >/dev/null 2>&1; then
  gcloud compute firewall-rules create "$FW" \
    --project="$PROJECT" --allow=tcp:3000 --target-tags="$TAG" \
    --source-ranges=0.0.0.0/0 --description="StackGen Next.js port 3000"
fi

IP="$(gcloud compute instances describe "$VM_NAME" --zone="$ZONE" --project="$PROJECT" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')"
PUBLIC_URL="http://${IP}:3000"
echo "==> deploy to $VM_NAME @ $IP ($PUBLIC_URL)"

# Remote deploy — no VM stop/start, no on-VM build
gcloud compute ssh "$VM_NAME" --zone="$ZONE" --project="$PROJECT" --command="
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# Wipe native/on-prem install
systemctl stop stackgen-web 2>/dev/null || true
systemctl disable stackgen-web 2>/dev/null || true
rm -f /etc/systemd/system/stackgen-web.service
systemctl daemon-reload 2>/dev/null || true

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

if ! command -v gcloud >/dev/null 2>&1; then
  apt-get update -y && apt-get install -y apt-transport-https gnupg curl
  echo 'deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main' > /etc/apt/sources.list.d/google-cloud-sdk.list
  curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
  apt-get update -y && apt-get install -y google-cloud-cli
fi
gcloud auth configure-docker us-west1-docker.pkg.dev --quiet

APP_DIR=/opt/stackgen
if [[ -d \"\$APP_DIR/.git\" ]]; then
  git -C \"\$APP_DIR\" fetch origin ${GIT_BRANCH}
  git -C \"\$APP_DIR\" checkout ${GIT_BRANCH}
  git -C \"\$APP_DIR\" reset --hard origin/${GIT_BRANCH}
else
  rm -rf \"\$APP_DIR\"
  git clone --branch ${GIT_BRANCH} --depth 1 ${GIT_REPO} \"\$APP_DIR\"
fi

mkdir -p \"\$APP_DIR/stack\"
cat > \"\$APP_DIR/stack/.env\" <<ENV
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
PAYLOAD_SECRET=${PAYLOAD_SECRET}
PAYLOAD_PUBLIC_SERVER_URL=${PUBLIC_URL}
WEB_IMAGE=${IMAGE}
ENV
chmod 600 \"\$APP_DIR/stack/.env\"

cd \"\$APP_DIR\"
if [[ ${FRESH_DB} == 1 ]]; then
  docker compose -f stack/docker-compose.vm.yml down -v --remove-orphans 2>/dev/null || true
else
  docker compose -f stack/docker-compose.vm.yml down --remove-orphans 2>/dev/null || true
fi
docker compose -f stack/docker-compose.vm.yml pull
docker compose -f stack/docker-compose.vm.yml up -d
docker compose -f stack/docker-compose.vm.yml ps
"

URL="${PUBLIC_URL}/"
echo "==> waiting for $URL"
for i in $(seq 1 40); do
  if curl -sf --connect-timeout 5 --max-time 15 "$URL" >/dev/null 2>&1; then
    ADMIN_CODE=$(curl -sf --max-time 10 -o /dev/null -w '%{http_code}' "${PUBLIC_URL}/admin" 2>/dev/null || echo 000)
    echo "✅ Site:  $URL"
    echo "✅ Admin: ${PUBLIC_URL}/admin (HTTP $ADMIN_CODE)"
    echo "   First user: ${PUBLIC_URL}/admin/create-first-user"
    echo "   PAYLOAD_PUBLIC_SERVER_URL=${PUBLIC_URL}"
    exit 0
  fi
  sleep 10
done

echo "⚠️  Timed out. Logs:"
echo "  gcloud compute ssh $VM_NAME --zone=$ZONE --project=$PROJECT --command='docker compose -f /opt/stackgen/stack/docker-compose.vm.yml logs --tail=40'"
exit 1
