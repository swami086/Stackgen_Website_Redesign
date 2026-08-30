# Atmosphere mock assets (Nano Banana 2)

Generated PNGs live at `web/public/media/atmosphere/{slot}-{theme}.png`.

## Vertex smoke (Task 2 — 2026-08-30)

Smoke run for `hero-field` / `dark` failed:

```
node scripts/generate-atmosphere.mjs --slot hero-field --theme dark
→ exit 2

404 NOT_FOUND: Publisher model `projects/propane-galaxy-498403-n8/locations/us-central1/publishers/google/models/gemini-3.1-flash-image` was not found or your project does not have access to it.
```

**Config used:** `GCP_PROJECT=propane-galaxy-498403-n8`, `GCP_LOCATION=us-central1`, model `gemini-3.1-flash-image`.

**Fallback:** `AtmosphereField` CSS token wash when PNGs are missing or `onError` fires.

**Next:** Enable model access in Vertex AI for this project/region, then re-run Task 3 `--all` generation.
