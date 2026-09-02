#!/usr/bin/env bash
# First-boot on stackgen-web-vm: Docker + pull pre-built web image (no on-VM build).
set -euo pipefail

LOG=/var/log/stackgen-startup.log
exec > >(tee -a "$LOG") 2>&1

md() {
  curl -sf -H "Metadata-Flavor: Google" \
    "http://metadata.google.internal/computeMetadata/v1/instance/attributes/$1" 2>/dev/null || true
}

GIT_REPO="$(md git-repo)"
GIT_BRANCH="$(md git-branch)"
POSTGRES_PASSWORD="$(md postgres-password)"
PAYLOAD_SECRET="$(md payload-secret)"
WEB_IMAGE="$(md web-image)"
APP_DIR=/opt/stackgen

echo "==> stackgen VM startup $(date -Is) image=${WEB_IMAGE:-unset}"

# Remove native/systemd install if present
systemctl stop stackgen-web 2>/dev/null || true
systemctl disable stackgen-web 2>/dev/null || true
rm -f /etc/systemd/system/stackgen-web.service
systemctl daemon-reload 2>/dev/null || true

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

# Artifact Registry auth (VM has cloud-platform scope).
if command -v gcloud >/dev/null 2>&1; then
  gcloud auth configure-docker us-west1-docker.pkg.dev --quiet
else
  apt-get install -y apt-transport-https gnupg
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" \
    > /etc/apt/sources.list.d/google-cloud-sdk.list
  curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg \
    | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
  apt-get update -y && apt-get install -y google-cloud-cli
  gcloud auth configure-docker us-west1-docker.pkg.dev --quiet
fi

if [[ -z "$WEB_IMAGE" ]]; then
  echo "ERROR: metadata web-image is required. Run scripts/deploy-web-vm.sh from your machine." >&2
  exit 1
fi

if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" fetch origin "$GIT_BRANCH"
  git -C "$APP_DIR" checkout "$GIT_BRANCH"
  git -C "$APP_DIR" pull --ff-only origin "$GIT_BRANCH" || true
else
  rm -rf "$APP_DIR"
  git clone --branch "$GIT_BRANCH" --depth 1 "$GIT_REPO" "$APP_DIR"
fi

EXT_IP="$(curl -sf -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip || true)"
PUBLIC_URL="http://${EXT_IP:-127.0.0.1}:3000"

cat > "$APP_DIR/stack/.env" <<ENV
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
PAYLOAD_SECRET=${PAYLOAD_SECRET}
PAYLOAD_PUBLIC_SERVER_URL=${PUBLIC_URL}
WEB_IMAGE=${WEB_IMAGE}
ENV
chmod 600 "$APP_DIR/stack/.env"

cd "$APP_DIR"
docker compose -f stack/docker-compose.vm.yml down -v --remove-orphans 2>/dev/null || true
docker compose -f stack/docker-compose.vm.yml pull web
docker compose -f stack/docker-compose.vm.yml up -d

echo "==> startup finished $(date -Is) PUBLIC_URL=${PUBLIC_URL}"
