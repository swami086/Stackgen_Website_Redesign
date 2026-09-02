#!/usr/bin/env bash
# Watch Payload auth sessions while someone logs in manually.
# Run on the VM: sudo bash /opt/stackgen/scripts/watch-auth-sessions.sh
set -euo pipefail
INTERVAL="${1:-2}"
echo "[session-watch] polling users_sessions every ${INTERVAL}s (Ctrl-C to stop)"
LAST=0
while true; do
  ROWS=$(docker exec stackgen-stack-postgres-1 psql -U payload -d payload -tA -c \
    "select count(*) from users_sessions;" 2>/dev/null || echo 0)
  if [[ "$ROWS" != "$LAST" ]]; then
    echo "[session-watch] $(date -Is) session count: $ROWS (was $LAST)"
    docker exec stackgen-stack-postgres-1 psql -U payload -d payload -c \
      "select s._parent_id, u.email, s.created_at, s.expires_at from users_sessions s join users u on u.id=s._parent_id order by s.created_at desc limit 5;" 2>/dev/null
    LAST="$ROWS"
  fi
  sleep "$INTERVAL"
done
