#!/usr/bin/env bash
# Stable deploy secrets, sourced by the deploy scripts.
#
# Why this exists: PAYLOAD_SECRET is the HMAC key behind every payload-token
# cookie. Minting a fresh one per deploy silently invalidates every browser
# session while the browser keeps replaying the old cookie against the same
# host:port — the admin then looks logged out but never recovers on its own.
# POSTGRES_PASSWORD has the same problem in reverse: Postgres only applies it
# when the data directory is first initialised, so a new value cannot
# authenticate against an existing pgdata volume.
#
# So both are created once in Secret Manager and reused on every deploy.

# sg_enable_secret_api <project>
sg_enable_secret_api() {
  gcloud services enable secretmanager.googleapis.com --project="$1" --quiet >/dev/null 2>&1 || true
}

# sg_secret <project> <secret-name> <hex32|pw31>
# Prints the existing secret value, creating it on first use.
sg_secret() {
  local project="$1" name="$2" kind="$3" value
  if value="$(gcloud secrets versions access latest --secret="$name" --project="$project" 2>/dev/null)" \
    && [[ -n "$value" ]]; then
    printf '%s' "$value"
    return 0
  fi

  case "$kind" in
    hex32) value="$(openssl rand -hex 32)" ;;
    pw31) value="$(openssl rand -base64 24 | tr -d '/+=' | head -c 31)" ;;
    *)
      echo "sg_secret: unknown kind '$kind'" >&2
      return 1
      ;;
  esac

  gcloud secrets create "$name" --project="$project" \
    --replication-policy=automatic --quiet >/dev/null 2>&1 || true
  printf '%s' "$value" \
    | gcloud secrets versions add "$name" --project="$project" --data-file=- --quiet >/dev/null
  printf '%s' "$value"
}

# sg_load_deploy_secrets <project>
# Exports POSTGRES_PASSWORD and PAYLOAD_SECRET, stable across deploys.
sg_load_deploy_secrets() {
  local project="$1"
  sg_enable_secret_api "$project"
  POSTGRES_PASSWORD="$(sg_secret "$project" stackgen-postgres-password pw31)"
  PAYLOAD_SECRET="$(sg_secret "$project" stackgen-payload-secret hex32)"
  [[ -n "$POSTGRES_PASSWORD" && -n "$PAYLOAD_SECRET" ]] || {
    echo "ERROR: could not load deploy secrets from Secret Manager" >&2
    return 1
  }
  export POSTGRES_PASSWORD PAYLOAD_SECRET
}
