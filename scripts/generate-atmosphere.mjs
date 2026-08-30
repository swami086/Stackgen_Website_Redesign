#!/usr/bin/env node
/**
 * Nano Banana 2 (gemini-3.1-flash-image) → HomeReplica atmosphere kit.
 * Usage:
 *   node scripts/generate-atmosphere.mjs --all
 *   node scripts/generate-atmosphere.mjs --slot hero-field --theme light
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "web/public/media/atmosphere");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const LOCATION = process.env.GCP_LOCATION || "us-central1";
const MODEL = "gemini-3.1-flash-image";

const SLOTS = [
  "hero-field",
  "video-still",
  "ground-assemblies",
  "ground-shell",
  "ground-who",
];
const THEMES = ["light", "dark"];

const NEGATIVE =
  "no people, no faces, no hands, no logos, no brand marks, no UI chrome, no buttons, no windows, no readable text, no letters, no numbers, no watermarks, no purple-on-white SaaS cliché, no photoreal office stock photo";

function promptFor(slot, theme) {
  const plate =
    theme === "light"
      ? "warm cream plate #F0E8E0 as dominant ground"
      : "warm near-black plate #181810 as dominant ground";
  const wash =
    "soft iridescent lavender-to-cyan atmospheric wash, very subtle, factory haze abstraction, editorial B2B tech, shallow depth, soft grain";
  const role = {
    "hero-field": "full-bleed soft field for a marketing hero; quiet center, edges fall off",
    "video-still": "slightly denser field suitable behind a video placeholder; still abstract",
    "ground-assemblies": "soft section ground wash; low contrast; must not compete with diagrams",
    "ground-shell": "soft section ground wash; quieter than hero",
    "ground-who": "softest whisper wash for dense content section",
  }[slot];
  return `Abstract atmosphere texture only. ${plate}. ${wash}. Role: ${role}. ${NEGATIVE}. Square-ish 16:9 cinematic crop, seamless soft edges.`;
}

function token() {
  return execFileSync("gcloud", ["auth", "print-access-token"], {
    encoding: "utf8",
  }).trim();
}

function parseArgs(argv) {
  const out = { all: false, slot: null, theme: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--all") out.all = true;
    if (argv[i] === "--slot") out.slot = argv[++i];
    if (argv[i] === "--theme") out.theme = argv[++i];
  }
  return out;
}

async function generateOne(slot, theme) {
  const access = token();
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: promptFor(slot, theme) }],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      temperature: 0.4,
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${slot}-${theme}: ${res.status} ${errText.slice(0, 500)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const inline = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = inline?.inlineData?.data || inline?.inline_data?.data;
  const mime =
    inline?.inlineData?.mimeType ||
    inline?.inline_data?.mime_type ||
    "image/png";
  if (!data) throw new Error(`${slot}-${theme}: no image bytes in response`);
  const ext = mime.includes("jpeg") ? "jpg" : "png";
  const file = path.join(OUT, `${slot}-${theme}.${ext === "jpg" ? "png" : "png"}`);
  // Always write .png extension; if JPEG bytes, still save as .png name only when PNG.
  // Prefer PNG: if JPEG, convert by writing bytes with .png only when mime is png.
  const outFile = path.join(OUT, `${slot}-${theme}.png`);
  await writeFile(outFile, Buffer.from(data, "base64"));
  return outFile;
}

async function writeManifest(files) {
  const manifest = { generatedAt: new Date().toISOString(), model: MODEL, files };
  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const args = parseArgs(process.argv);
  const jobs = [];
  if (args.all) {
    for (const slot of SLOTS) for (const theme of THEMES) jobs.push([slot, theme]);
  } else if (args.slot && args.theme) {
    jobs.push([args.slot, args.theme]);
  } else {
    console.error("Use --all or --slot <id> --theme <light|dark>");
    process.exit(1);
  }
  const files = [];
  for (const [slot, theme] of jobs) {
    console.log(`Generating ${slot}-${theme}…`);
    try {
      const f = await generateOne(slot, theme);
      files.push(path.basename(f));
      console.log(`  → ${f}`);
    } catch (e) {
      console.error(`  FAIL ${e.message}`);
      // continue other slots — Vertex miss must not abort kit partially if --all
    }
  }
  let prior = [];
  try {
    prior = JSON.parse(await readFile(path.join(OUT, "manifest.json"), "utf8")).files || [];
  } catch {
    /* first run */
  }
  const merged = [...new Set([...prior, ...files])];
  await writeManifest(merged);
  console.log(`Done. ${files.length}/${jobs.length} new files. Manifest has ${merged.length}.`);
  if (files.length === 0) process.exit(2);
}

main();
