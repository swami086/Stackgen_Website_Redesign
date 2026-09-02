#!/usr/bin/env bash
# stackgen-web-vm first boot: pull web image, compose up postgres + web.
set -euo pipefail

LOG=/var/log/stackgen-startup.log
exec > >(tee -a "$LOG") 2>&1

md() {
  curl -sf -H "Metadata-Flavor: Google" \
    "http://metadata.google.internal/computeMetadata/v1/instance/attributes/$1"
}

WEB_IMAGE="$(md web-image)"
GIT_REPO="$(md git-repo)"
GIT_BRANCH="$(md git-branch)"
POSTGRES_PASSWORD="$(md postgres-password)"
PAYLOAD_SECRET="$(md payload-secret)"
APP_DIR=/opt/stackgen

echo "==> stackgen VM startup $(date -Is) image=${WEB_IMAGE}"

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

EXT_IP="$(curl -sf -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip || true)"
PUBLIC_URL="http://${EXT_IP:-127.0.0.1}:3000"

if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" fetch origin "$GIT_BRANCH"
  git -C "$APP_DIR" checkout "$GIT_BRANCH"
  git -C "$APP_DIR" pull --ff-only origin "$GIT_BRANCH" || true
else
  rm -rf "$APP_DIR"
  git clone --branch "$GIT_BRANCH" --depth 1 "$GIT_REPO" "$APP_DIR"
fi

# stack/docker-compose.vm.yml is the single source of truth (it ships in the
# repo we just cloned); this only supplies the values it interpolates.
cat > "$APP_DIR/stack/.env" <<ENV
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
PAYLOAD_SECRET=${PAYLOAD_SECRET}
PAYLOAD_PUBLIC_SERVER_URL=${PUBLIC_URL}
WEB_IMAGE=${WEB_IMAGE}
ENV
chmod 600 "$APP_DIR/stack/.env"

gcloud auth configure-docker us-west1-docker.pkg.dev --quiet 2>/dev/null || true

cd "$APP_DIR"
docker compose -f stack/docker-compose.vm.yml pull
# No `down -v` here: the volume holds the Payload database, and dropping it
# deletes every admin user while browsers keep replaying their session cookie.
docker compose -f stack/docker-compose.vm.yml up -d

echo "==> startup finished $(date -Is) PUBLIC_URL=${PUBLIC_URL}"
