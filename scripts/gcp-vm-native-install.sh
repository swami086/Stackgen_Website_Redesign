#!/usr/bin/env bash
# Native install on stackgen-web-vm: Postgres + Node/pnpm + Next.js standalone (no Docker).
# Invoked by scripts/deploy-web-vm-native.sh with env vars set.
set -euo pipefail

LOG=/var/log/stackgen-native-install.log
exec > >(tee -a "$LOG") 2>&1

APP_ROOT=/opt/stackgen
WEB_DIR="$APP_ROOT/web"
ENV_FILE=/etc/stackgen/web.env
GIT_REPO="${GIT_REPO:?GIT_REPO required}"
GIT_BRANCH="${GIT_BRANCH:-main}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:?POSTGRES_PASSWORD required}"
PAYLOAD_SECRET="${PAYLOAD_SECRET:?PAYLOAD_SECRET required}"
SEED_CMS="${SEED_CMS:-0}"

echo "==> native install $(date -Is) branch=$GIT_BRANCH seed=$SEED_CMS"

export DEBIAN_FRONTEND=noninteractive

# --- tear down Docker deploy ---
if command -v docker >/dev/null 2>&1; then
  if [[ -f "$APP_ROOT/stack/docker-compose.vm.yml" ]]; then
    docker compose -f "$APP_ROOT/stack/docker-compose.vm.yml" down -v --remove-orphans 2>/dev/null || true
  fi
  if [[ -f "$APP_ROOT/stack/docker-compose.yml" ]]; then
    docker compose -f "$APP_ROOT/stack/docker-compose.yml" down -v --remove-orphans 2>/dev/null || true
  fi
  systemctl disable docker 2>/dev/null || true
  systemctl stop docker 2>/dev/null || true
fi

# --- base packages ---
apt-get update -y
apt-get install -y ca-certificates curl git postgresql postgresql-contrib rsync

# --- Node 24 + pnpm ---
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v24* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install -y nodejs
fi
corepack enable
corepack prepare pnpm@latest --activate

# --- app user ---
id stackgen &>/dev/null || useradd --system --home "$APP_ROOT" --shell /usr/sbin/nologin stackgen

# --- Postgres (local) ---
systemctl enable --now postgresql
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='payload'" | grep -q 1; then
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE USER payload WITH PASSWORD '${POSTGRES_PASSWORD}';"
else
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "ALTER USER payload WITH PASSWORD '${POSTGRES_PASSWORD}';"
fi
sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='payload'" | grep -q 1 \
  || sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE DATABASE payload OWNER payload;"
sudo -u postgres psql -v ON_ERROR_STOP=1 -c "GRANT ALL PRIVILEGES ON DATABASE payload TO payload;"

EXT_IP="$(curl -sf -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip \
  || echo "127.0.0.1")"
PUBLIC_URL="http://${EXT_IP}:3000"

mkdir -p /etc/stackgen
cat > "$ENV_FILE" <<ENV
DATABASE_URL=postgresql://payload:${POSTGRES_PASSWORD}@127.0.0.1:5432/payload
PAYLOAD_SECRET=${PAYLOAD_SECRET}
PAYLOAD_PUBLIC_SERVER_URL=${PUBLIC_URL}
ENV
chmod 600 "$ENV_FILE"

# --- source ---
if [[ -d "$APP_ROOT/.git" ]]; then
  git -C "$APP_ROOT" fetch origin "$GIT_BRANCH"
  git -C "$APP_ROOT" checkout "$GIT_BRANCH"
  git -C "$APP_ROOT" reset --hard "origin/$GIT_BRANCH"
else
  rm -rf "$APP_ROOT"
  git clone --branch "$GIT_BRANCH" --depth 1 "$GIT_REPO" "$APP_ROOT"
fi
chown -R stackgen:stackgen "$APP_ROOT"

# --- build (Payload official: standalone + node server.js) ---
sudo -u stackgen bash -lc "
  set -euo pipefail
  cd '$WEB_DIR'
  export NODE_OPTIONS='--max-old-space-size=4096'
  set -a && source '$ENV_FILE' && set +a
  export PAYLOAD_SECRET='${PAYLOAD_SECRET}'
  export DATABASE_URL='postgresql://payload:${POSTGRES_PASSWORD}@127.0.0.1:5432/payload'
  pnpm install --frozen-lockfile
  pnpm build
  rsync -a .next/static .next/standalone/.next/static
  rsync -a public .next/standalone/public
  mkdir -p .next/standalone/media
"

mkdir -p "$WEB_DIR/media"
chown -R stackgen:stackgen "$APP_ROOT"

# --- systemd ---
install -m 644 "$APP_ROOT/scripts/stackgen-web.service" /etc/systemd/system/stackgen-web.service
systemctl daemon-reload
systemctl enable stackgen-web
systemctl restart stackgen-web

if [[ "$SEED_CMS" == "1" ]]; then
  sudo -u stackgen bash -lc "
    set -euo pipefail
    cd '$WEB_DIR'
    set -a && source '$ENV_FILE' && set +a
    pnpm seed:app
  "
fi

echo "==> native install finished $(date -Is)"
echo "Site:  ${PUBLIC_URL}"
echo "Admin: ${PUBLIC_URL}/admin/create-first-user"
