#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) → Aiden product hero atmosphere comps.
 *
 * Usage:
 *   node scripts/generate-product-heroes.mjs --all
 *   node scripts/generate-product-heroes.mjs --slug aiden-for-sre --theme dark
 */
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MOCK_OUT = path.join(ROOT, ".impeccable/mocks/product-heroes");
const PUBLIC_OUT = path.join(ROOT, "web/public/media/product");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const LOCATION = process.env.GCP_LOCATION || "global";
const MODEL = "gemini-3-pro-image";

const SLUGS = [
  "aiden-for-infrastructure",
  "aiden-for-automation",
  "aiden-for-observability",
  "aiden-for-sre",
];
const THEMES = ["light", "dark"];

const NEGATIVE =
  "no people, no faces, no hands, no logos, no brand marks, no UI chrome, no buttons, no windows, no readable text, no letters, no numbers, no watermarks, no purple-on-white SaaS cliché, no photoreal office stock photo, no diagram labels, no interface mockup";

const MOTIF = {
  "aiden-for-infrastructure":
    "one subtle motif hint: abstract topology lattice, faint node connections, not a diagram",
  "aiden-for-automation":
    "one subtle motif hint: abstract pipeline nodes and flow, not a diagram",
  "aiden-for-observability":
    "one subtle motif hint: abstract signal waves and telemetry ripples, not a diagram",
  "aiden-for-sre":
    "one subtle motif hint: abstract pulse and heartbeat rhythm, not a diagram",
};

function apiHost(location) {
  return location === "global"
    ? "https://aiplatform.googleapis.com"
    : `https://${location}-aiplatform.googleapis.com`;
}

function promptFor(slug, theme) {
  const plate =
    theme === "light"
      ? "warm cream plate #F0E8E0 as dominant ground"
      : "warm near-black plate #181810 as dominant ground";
  const wash =
    "soft iridescent lavender-to-cyan atmospheric wash, very subtle, factory haze abstraction, editorial B2B tech, shallow depth, soft grain";
  const motif = MOTIF[slug];
  return `Abstract atmosphere texture only for a product marketing hero. ${plate}. ${wash}. ${motif}. Role: full-bleed soft field for a marketing hero; quiet center, edges fall off. ${NEGATIVE}. Wide 16:9 cinematic crop, seamless soft edges.`;
}

function token() {
  return execFileSync("gcloud", ["auth", "print-access-token"], {
    encoding: "utf8",
  }).trim();
}

function parseArgs(argv) {
  const out = { all: false, slug: null, theme: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--all") out.all = true;
    if (argv[i] === "--slug") out.slug = argv[++i];
    if (argv[i] === "--theme") out.theme = argv[++i];
  }
  return out;
}

function basename(slug, theme) {
  return `${slug}-${theme}.png`;
}

async function generateOne(slug, theme) {
  const access = token();
  const url = `${apiHost(LOCATION)}/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: promptFor(slug, theme) }],
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
      "x-goog-user-project": PROJECT,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${slug}-${theme}: ${res.status} ${errText.slice(0, 500)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const inline = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = inline?.inlineData?.data || inline?.inline_data?.data;
  if (!data) {
    const textBits = parts
      .map((p) => p.text)
      .filter(Boolean)
      .join("\n")
      .slice(0, 800);
    throw new Error(`${slug}-${theme}: no image bytes. text=${textBits}`);
  }
  const name = basename(slug, theme);
  const mockFile = path.join(MOCK_OUT, name);
  const publicFile = path.join(PUBLIC_OUT, name);
  await writeFile(mockFile, Buffer.from(data, "base64"));
  await copyFile(mockFile, publicFile);
  return { mockFile, publicFile, name };
}

async function writeManifest(entries) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: MODEL,
    project: PROJECT,
    location: LOCATION,
    files: entries,
  };
  await writeFile(
    path.join(MOCK_OUT, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
}

async function loadPriorManifest() {
  try {
    const raw = await readFile(path.join(MOCK_OUT, "manifest.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return { files: [] };
  }
}

async function main() {
  await mkdir(MOCK_OUT, { recursive: true });
  await mkdir(PUBLIC_OUT, { recursive: true });
  const args = parseArgs(process.argv);
  const jobs = [];
  if (args.all) {
    for (const slug of SLUGS) for (const theme of THEMES) jobs.push([slug, theme]);
  } else if (args.slug && args.theme) {
    if (!SLUGS.includes(args.slug)) {
      console.error(`Unknown slug: ${args.slug}. Valid: ${SLUGS.join(", ")}`);
      process.exit(1);
    }
    if (!THEMES.includes(args.theme)) {
      console.error(`Unknown theme: ${args.theme}. Valid: ${THEMES.join(", ")}`);
      process.exit(1);
    }
    jobs.push([args.slug, args.theme]);
  } else {
    console.error("Use --all or --slug <slug> --theme <light|dark>");
    process.exit(1);
  }

  const prior = await loadPriorManifest();
  const priorByName = new Map(
    (prior.files || []).map((f) => [typeof f === "string" ? f : f.name, f]),
  );
  const generated = [];

  for (const [slug, theme] of jobs) {
    console.log(`Generating ${slug}-${theme}…`);
    try {
      const result = await generateOne(slug, theme);
      const entry = {
        name: result.name,
        slug,
        theme,
        mock: path.relative(ROOT, result.mockFile),
        public: path.relative(ROOT, result.publicFile),
        generatedAt: new Date().toISOString(),
      };
      priorByName.set(result.name, entry);
      generated.push(entry);
      console.log(`  → ${result.mockFile}`);
      console.log(`  → ${result.publicFile}`);
    } catch (e) {
      console.error(`  FAIL ${e.message}`);
    }
  }

  const merged = [...priorByName.values()].sort((a, b) => {
    const an = typeof a === "string" ? a : a.name;
    const bn = typeof b === "string" ? b : b.name;
    return an.localeCompare(bn);
  });
  await writeManifest(merged);
  console.log(
    `Done. ${generated.length}/${jobs.length} new files. Manifest has ${merged.length}.`,
  );
  if (generated.length === 0) process.exit(2);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
