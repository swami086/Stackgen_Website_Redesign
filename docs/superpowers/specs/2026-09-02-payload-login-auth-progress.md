# Payload admin login progress (2026-09-02)

VM: `stackgen-web-vm` @ http://34.143.68.214:3000  
Image at fix: `web:6d34751-csrf2`  
OpenMemory MCP indexed 2026-09-02 after `docker compose restart` on `openmemory-uswest`. This file + `openmemory.md` Patterns section remain the durable record.

## What was wrong

1. **Stable secrets** — deploy scripts regenerated `PAYLOAD_SECRET` each run → stale `payload-token` cookies. Fixed via GCP Secret Manager + `scripts/lib/secrets.sh`.
2. **Login loop** — password worked (`users_sessions` rows created) but `/admin` bounced to `/admin/login`.
   - Payload `extractJWT` rejects cookies when `csrf` is non-empty unless `Origin` is allowlisted or `Sec-Fetch-Site` is `same-origin|same-site|none`.
   - Sanitize always `csrf.push(serverURL)` when `serverURL` is set — clearing `csrf` in config is not enough.
   - Document navigations often send neither header.

## Fix in tree / on VM

- `web/middleware.ts` — inject `Origin` + `Sec-Fetch-Site: same-origin` for verified tokens; strip/clear stale tokens (not on login POST).
- `web/lib/payload-token.ts` + tests — verify with Payload’s sha256-derived key.
- `AUTH_DEBUG=1` → `[auth-debug]` JSON in docker logs.
- `stack/docker-compose.vm.yml` — `AUTH_DEBUG` env passthrough.

## Verify

```bash
# After login cookie exists:
curl -s -b jar.txt http://34.143.68.214:3000/api/users/me | jq .user.email
# Must return email WITHOUT Origin header when middleware inject is live.
```
