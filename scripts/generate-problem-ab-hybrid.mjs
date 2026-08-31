#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const MODEL = "gemini-3-pro-image";
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/problem-animated-explainer");

const prompt = `Redesign this StackGen homepage PROBLEM section as HYBRID A+B — Ramp chaos collage INSIDE a Framer/Tines cinematic video plate.

Visual world Soft Structuralism dark: charcoal #0f0f0c/#181810, hairline borders, NO neon spam. Accent violet #B898F8 only on play ring + one broken connector. Cyan #A8E0F8 quiet particles.

Composition (locked):
- TOP CENTER: mono pill "The problem" + bold H2 "Software is shipping faster than ops can keep up." + punchline "This is where teams lose control of production." NO body paragraph. NO stacked symptom list cards outside the plate.
- DOMINANT (~75% width): Soft Structuralism double-bezel video plate (outer border + inner raised stage). Large play affordance overlaid (violet ring).
- INSIDE the plate: Ramp-style floating SRE UI fragments (Alert no deploy, Terraform Drift detected, Deploy failed, War room chat, Stale runbooks) with tangled hairline connectors; one violet connector SNAP-broken between deploy stages.
- Bottom caption bar inside plate: "90 minutes · no shared context"
- Looks like an animated product film keyframe (chaos mid-scatter), not a text section.
- Wide landscape 16:9. No watermarks, no real people faces, no fake brand logos (generic glyphs OK).`;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const source = await readFile(
    path.join(ROOT, "exports/web-shelf/factory-gloss-align-dark-1440.png"),
  );
  const access = execFileSync("gcloud", ["auth", "print-access-token"], {
    encoding: "utf8",
  }).trim();
  const url = `https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/global/publishers/google/models/${MODEL}:generateContent`;
  console.log("Generating hybrid A+B…");
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
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/png",
                data: source.toString("base64"),
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 0.4,
      },
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const inline = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = inline?.inlineData?.data || inline?.inline_data?.data;
  if (!data) throw new Error("no image bytes");
  const out = path.join(OUT_DIR, "option-AB-hybrid.png");
  await writeFile(out, Buffer.from(data, "base64"));
  console.log("→", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
