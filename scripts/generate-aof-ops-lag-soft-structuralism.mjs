#!/usr/bin/env node
/**
 * Soft Structuralism Ops Lag (deck p3) — high-fidelity Soft Structuralism redraw comps.
 * Image model: gemini-3-pro-image (Nano Banana Pro) via Vertex.
 * Prompt authored for Gemini 3.1 Pro / Impeccable Soft Structuralism world.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const MODEL = process.env.IMAGE_MODEL || "gemini-3-pro-image";
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/aof-ops-lag");
const REF = path.join(OUT_DIR, "ops-lag-p3-ref.png");

const BASE = `Recreate this StackGen homepage PROBLEM diagram as Soft Structuralism production UI — NOT neon cyberpunk, NOT generic SaaS cards.

LOCKED VISUAL WORLD (Soft Structuralism):
- Ground #0B0C0E, panels #151619 / #1D1F24, hairline borders #2A2C33
- Inner Loop accent cyan #A8E0F8; Outer Loop accent lavender #B898F8; halt/orange ONLY on bridge label if needed
- Inter / geometric sans; JetBrains Mono only for tiny cadence labels
- Hairline 1px strokes, chip radius ~6–8px, NO heavy glow blobs, NO glassmorphism spam, NO purple-on-white

LOCKED COMPOSITION (must match reference anatomy exactly):
1) Top center: small muted "The problem" + bold H2 "Outer Ops loop is failing to keep up with inner Dev loop"
2) LEFT panel "Inner Loop": circular clockwise flow of FIVE chips —
   AI-assisted Build (top), Deploy (right), AI-generated code (bottom-right), High-volume pushes (bottom-left), Debug (left)
   Cyan curved arrows + subtle motion streaks/particles (quiet, not neon)
3) CENTER bridge: trapezoid / hourglass neck with text "Slow Feedback / Noisy Signal"
4) RIGHT panel "Outer Loop":
   - Observe (top), Remediate (right), Operate (left)
   - LARGE lavender hourglass center with sand + drip downward
   - Dashed lag lines from Operate + Remediate into hourglass
   - Bottom: TWO stacked-style cards side-by-side — Compliance | Observability — each with segmented status bars on top
   - Purple arrows forming a slower square-ish orbit; one broken/dashed segment
5) Optional tiny StackGen wordmark top-left of the full frame only — do not invent other logos

Wide landscape ~16:9 dark marketing diagram plate. Dense, accurate, layered. No watermarks. No people.`;

const VARIANTS = [
  {
    key: "soft-A-literal",
    prompt: `${BASE}

VARIANT A — LITERAL FIDELITY: Match the reference layout pixel-tight. Keep all labels verbatim. Emphasize Inner cyan speed vs Outer lavender lag. Soft Structuralism hairlines throughout.`,
  },
  {
    key: "soft-B-density",
    prompt: `${BASE}

VARIANT B — DENSITY+: Same anatomy, richer layering — more orbit particles on Inner, clearer hourglass drip into Compliance/Observability, Soft Structuralism double-bezel on both panels. Still no neon spam.`,
  },
  {
    key: "soft-C-clarity",
    prompt: `${BASE}

VARIANT C — CLARITY: Same anatomy, slightly larger chips and hourglass, stronger Gestalt separation between bridge and panels, quieter particles. Soft Structuralism first.`,
  },
];

async function generate(variant, refB64, access) {
  const url = `https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/global/publishers/google/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      "x-goog-user-project": PROJECT,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: variant.prompt },
            { inlineData: { mimeType: "image/png", data: refB64 } },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 0.35,
      },
    }),
  });
  if (!res.ok) throw new Error(`${variant.key}: ${await res.text()}`);
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const inline = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = inline?.inlineData?.data || inline?.inline_data?.data;
  if (!data) throw new Error(`${variant.key}: no image`);
  const out = path.join(OUT_DIR, `${variant.key}.png`);
  await writeFile(out, Buffer.from(data, "base64"));
  await writeFile(
    path.join(OUT_DIR, `${variant.key}.prompt.json`),
    JSON.stringify(
      {
        model: MODEL,
        key: variant.key,
        prompt: variant.prompt,
        ref: "ops-lag-p3-ref.png",
        world: "Soft Structuralism",
      },
      null,
      2,
    ),
  );
  console.log("→", out);
  return out;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const refB64 = (await readFile(REF)).toString("base64");
  const access = execFileSync("gcloud", ["auth", "print-access-token"], {
    encoding: "utf8",
  }).trim();
  console.log(`Model ${MODEL} · project ${PROJECT}`);
  for (const v of VARIANTS) {
    const out = path.join(OUT_DIR, `${v.key}.png`);
    try {
      await readFile(out);
      console.log(`Skipping ${v.key}, already exists`);
      continue;
    } catch (e) {}
    console.log("Generating", v.key, "…");
    await generate(v, refB64, access);
  }
  console.log("Done. Pick soft-A / soft-B / soft-C for Pencil redraw.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
