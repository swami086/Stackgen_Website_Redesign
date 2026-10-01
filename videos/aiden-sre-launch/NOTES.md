# Aiden for SRE launch film v2 — project notes

## HyperFrames auth status (Task 1 Step 5)

```
Not signed in to HeyGen — voice & music will use local engines (free, offline).

Sign in or sign up (browser OAuth, writes ~/.heygen — no per-repo .env):
  npx hyperframes auth login            # browser sign-in / sign-up

Or paste an existing HeyGen API key (get one at app.heygen.com/settings/api):
  npx hyperframes auth login --api-key  # paste at the prompt

Prefer offline? Workflows will use these local engines:
  voice → Kokoro  ⚠ deps missing
          pip install kokoro-onnx soundfile
  music → MusicGen  ⚠ deps missing
          pip install transformers torch soundfile numpy
  (or run `hyperframes doctor` to check the local toolchain)
```

(`npx --yes hyperframes@0.8.103 auth status` exited 1 — expected when signed out; ElevenLabs MCP is used for this film, not HeyGen audio.)

## ElevenLabs MCP I/O

Proved 2026-10-01. Flow `UVmPuCJamKvWodlIVukK` (`aiden-sre-launch-smoke`).

Download path: `creative_get_flow_run_status` → `media[].url` (same value as `media[].master_url`). Signed GCS URL. `X-Goog-Expires=7200` (2 hours). Download immediately; do not store the URL.

Smoke: `sfx` / `eleven_text_to_sound_v2`, prompt "single soft UI click", `duration_seconds` 0.5, `generations_count` 1. Estimate was ~61 credits; charged ~1.7. File `assets/audio/sfx/_smoke.mp3` — ffprobe 0.48s, mp3, 44100 Hz stereo.

`duration_seconds` is not a `creative_generate_in_flow` argument. Create the node (`estimate_only` creates it without charging), then `creative_update_node` `model_parameters.duration_seconds`, then `creative_run_flow_nodes`.

Upload sequence that worked:

1. `creative_create_asset_upload` (`name`, `mime_type`, exact `file_size`)
2. HTTP PUT the bytes to `upload_url` with `Content-Type` equal to `mime_type`
3. `creative_finalize_asset_upload` (`asset_id`, optional `flow_id`) → returns `node_id` for `connect_from`

Smoke upload: 69-byte PNG, asset `Sx97FRqcuOm6z5jiZUG0`, reference node `lCLjIbssE9a24bOea3Ct`.
