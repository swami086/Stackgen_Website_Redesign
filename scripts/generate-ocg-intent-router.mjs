#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — Intent-Router-centered OCG comps.
 * Concept samples only; live diagram stays React/DOM.
 *
 * Usage:
 *   node scripts/generate-ocg-intent-router.mjs
 *   node scripts/generate-ocg-intent-router.mjs --option R2
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const LOCATION = process.env.GCP_LOCATION || "global";
const MODEL = "gemini-3-pro-image";

const DEFAULT_SOURCE = path.join(
  ROOT,
  ".impeccable/mocks/ocg-intent-router/source.png",
);
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/ocg-intent-router");

const WORLD = `Visual world (binding — Soft Structuralism, anti-slop):
- Dark plate charcoal #181810 / #0f0f0c; hairline borders; NO neon cyberpunk glow spam
- Accent violet #B898F8 sparingly on the Router hub only; pass/green only on Factory Assemblies band if present
- Editorial B2B for SREs — crisp UI, JetBrains Mono for micro-labels
- VISUAL-HEAVY: geometry, icons, beams, nodes > paragraphs. Max ~3 short words per label.
- Portrait ~3:4 so full mechanism fits. No watermarks, no people, no fake logos.`;

const LABELS = `StackGen vocabulary (use sparingly):
- Ask: "Ask Aiden to investigate latency spike in checkout…"
- Chips optional: auto-route · world model · guardrails
- CENTER hero label: "Intent Router" (once, on the hub)
- Four destinations only: Infrastructure · Automation · Observability · SRE
  (or Build / Operate / Observe / Remediate as tiny stage marks)
- Quiet OS floor chips if space: Governance · Guardrails · Tokenomics · Identity · Audit · Integrations
- Ban: long edge captions (monitors/deploys/owns/governs paragraphs), wordy "AIDEN · ACT WITHIN POLICY" header rows, Intent Router as a tiny side pill`;

const OPTIONS = {
  R1: {
    title: "Router hub · four assembly spokes",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION R1 — Intent Router as CENTER HUB.

${WORLD}
${LABELS}

Composition thesis (Mobbin Dovetail / Base pattern):
- TOP: quiet ask bar only (prompt + Submit). Telemetry as 3 tiny icon marks — no essays.
- CENTER: large Intent Router hub (circle or rounded square) — the brightest element in the frame.
- Four Factory Assemblies as SPOKES / satellites around the hub (N/E/S/W or diamond), each a compact icon+short name card.
- Animated-ready: thin beams from hub to each assembly; one beam lit (routing), others dim.
- Context graph is a FAINT ring or soft node constellation BEHIND the hub — not a wordy labeled spider in the middle.
- BOTTOM: quiet Aiden OS chip row.
- The Intent Router must read as the mechanism, not a badge. One polished UI mock.`,
  },
  R2: {
    title: "Converge → route → emerge",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION R2 — Converge → Intent Router → emerge.

${WORLD}
${LABELS}

Composition thesis (Mobbin Dovetail "noise to knowledge"):
- TOP: ask bar + tiny Logs/Metrics/Traces tiles as INPUTS converging on thin lines.
- MID: single glowing Intent Router node where all lines meet — center of the plate.
- BELOW router: four assembly destination cards in a row (or 2×2), fed by beams FROM the router.
- Graph entities (checkout-api etc.) appear as small silent nodes feeding the router from the sides — NO relationship paragraph labels on edges.
- OS as thin substrate floor.
- Motion-ready: particles travel input → router → one assembly lights.
- One polished UI mock.`,
  },
  R3: {
    title: "Router compass over quiet graph",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION R3 — Router compass over a quiet graph plane.

${WORLD}
${LABELS}

Composition thesis:
- Full-width mid plane is a quiet Context Graph (nodes + edges, almost no text — entity names only on hub node checkout-api).
- OVERLAY / CENTER of that plane: Intent Router as a compass/radar — four short beams to Build·Operate·Observe·Remediate assembly docks at the compass tips.
- Ask bar docks above; OS docks below.
- Kill the side pill labeled Intent Router. The compass IS the router.
- One polished UI mock of the complete diagram.`,
  },
};

function apiHost(location) {
  return location === "global"
    ? "https://aiplatform.googleapis.com"
    : `https://${location}-aiplatform.googleapis.com`;
}

function token() {
  return execFileSync("gcloud", ["auth", "print-access-token"], {
    encoding: "utf8",
  }).trim();
}

function parseArgs(argv) {
  let option = "all";
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--option") option = argv[++i];
  }
  return { option: option.toUpperCase() };
}

async function generateOne(key, sourceBytes, access) {
  const def = OPTIONS[key];
  const url = `${apiHost(LOCATION)}/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: def.prompt },
          {
            inlineData: {
              mimeType: "image/png",
              data: sourceBytes.toString("base64"),
            },
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      temperature: 0.35,
    },
  };
  console.log(`Generating Option ${key} — ${def.title}…`);
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
    throw new Error(`Option ${key}: ${res.status} ${errText.slice(0, 1200)}`);
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
    throw new Error(`Option ${key}: no image bytes. text=${textBits}`);
  }
  const outPath = path.join(OUT_DIR, `option-${key}.png`);
  await writeFile(outPath, Buffer.from(data, "base64"));
  console.log(`→ ${outPath}`);
  return { key, title: def.title, out: path.relative(ROOT, outPath) };
}

async function main() {
  const args = parseArgs(process.argv);
  await mkdir(OUT_DIR, { recursive: true });
  const sourceBytes = await readFile(DEFAULT_SOURCE);
  let access;
  try {
    access = token();
  } catch (err) {
    console.error("gcloud auth failed:", err.message);
    process.exit(1);
  }

  const keys =
    args.option === "ALL" ? Object.keys(OPTIONS) : [args.option];
  for (const k of keys) {
    if (!OPTIONS[k]) {
      console.error(`Unknown option ${k}. Use R1|R2|R3|all`);
      process.exit(1);
    }
  }

  const frames = {};
  for (const k of keys) {
    frames[k] = await generateOne(k, sourceBytes, access);
  }

  const manifest = {
    model: MODEL,
    project: PROJECT,
    source: path.relative(ROOT, DEFAULT_SOURCE),
    createdAt: new Date().toISOString(),
    frames,
  };
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  const readme = `# OCG Intent Router comps (Nano Banana Pro)

Model: \`${MODEL}\` via gcloud Vertex (\`generateContent\`).

| Option | Thesis |
|---|---|
| R1 | Router hub · four assembly spokes |
| R2 | Converge → route → emerge (Dovetail) |
| R3 | Router compass over quiet graph |

Regen: \`node scripts/generate-ocg-intent-router.mjs\`
`;
  await writeFile(path.join(OUT_DIR, "README.md"), readme);
  console.log("Done.", Object.keys(frames).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
