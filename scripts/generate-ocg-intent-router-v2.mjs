#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — Intent Router V2 comps.
 * Product truth (ADF PRFAQ + AIOS features):
 *   Ask → Intent Router → Factory Assemblies (Build/Operate/Observe/Remediate)
 *   OCG = shared world model underlay (topology/change/alert/deploy/policy) — NOT a service call graph
 *   Aiden OS = runtime substrate
 * Concept samples only; live diagram stays React/DOM.
 *
 * Usage:
 *   node scripts/generate-ocg-intent-router-v2.mjs
 *   node scripts/generate-ocg-intent-router-v2.mjs --option V2
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
  "exports/web-shelf/ocg-intent-router-hub.png",
);
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/ocg-intent-router-v2");

const WORLD = `Visual world (binding — Soft Structuralism, anti-slop):
- Dark plate charcoal #181810 / #0f0f0c; hairline borders; dotted grid optional (Railway/Cloudflare canvas)
- Accent violet #B898F8 ONLY on Intent Router hub + ONE active route beam; no neon cyberpunk bloom spam
- Editorial B2B for SREs — geometry and icons carry meaning
- VISUAL-HEAVY / LOW COPY: max 1–2 short words per visible label. Prefer icons + shape language.
- Ban: paragraphs, edge captions, "AIDEN · ACT WITHIN POLICY" banners, chip walls of prose, glowing purple fog
- Portrait ~3:4. No watermarks, no people, no fake logos.`;

const TRUTH = `Product mechanism (must read in one glance):
1. TOP: Ask bar — prompt "Ask Aiden to investigate latency spike in checkout…" + Submit. No chip cluster.
2. CENTER: Intent Router is the LARGEST, brightest element — a machined hub (double-bezel circle or rounded square).
3. SPOKES: Four Factory Assemblies as ICON DISCS or icon-primary cards at N/E/S/W:
   Build→Infrastructure · Operate→Automation · Observe→Observability · Remediate→SRE
   Show ONE word under each icon max (Infrastructure / Automation / Observability / SRE). Stage words optional as tiny mono letters B O O R.
4. UNDERLAY: Operational Context Graph is a RICH silent constellation filling the mid plate — typed nodes as different shapes/sizes (service hex, alert diamond, deploy square, policy shield, change triangle). Thin hairline edges. At most ONE entity name: checkout-api. This is the world model agents share — not empty space.
5. BOTTOM: Aiden OS as a thin icon strip (6 glyphs) — no long "Aiden Agentic Operating System" title, no wordy pill row. Tiny "Aiden OS" mono mark OK.
6. Motion-ready: curved beams hub→assemblies (Cloudflare Bindings style); one beam lit with a packet mid-flight; faint node twinkles on the graph.`;

const OPTIONS = {
  V1: {
    title: "Icon-disc hub over dense OCG",
    prompt: `Completely REDESIGN this StackGen diagram as OPTION V1 — visual-heavy Intent Router.

${WORLD}
${TRUTH}

Composition (Mobbin Cloudflare Bindings + radial hub pattern):
- Mid plate = dense quiet OCG constellation (many small typed nodes + edges) on a dotted grid.
- Intent Router sits ON TOP of that graph as a large double-bezel hub — label "Router" or "Intent Router" once.
- Four ICON DISCS at compass points with curved SVG-like beams; Observability route active (accent beam + packet).
- Telemetry (Logs/Metrics/Traces) as three tiny icons under the ask bar — icon only, no words if possible.
- Kill the verbose OS chip wall. Icon strip only.
- One polished dark Soft Structuralism UI mock.`,
  },
  V2: {
    title: "Converge graph → Router → emerge discs",
    prompt: `Completely REDESIGN this StackGen diagram as OPTION V2 — converge → route → emerge.

${WORLD}
${TRUTH}

Composition (Mobbin Weavy/FLORA node energy + Dovetail converge):
- Side/peripheral OCG nodes FEED inward on thin lines into the center Intent Router.
- From the Router, four beams EMERGE to large icon-primary assembly discs (almost no text).
- The story is energy flowing: world model → router decision → factory destination.
- Ask bar top; OS icon substrate bottom.
- Animation-ready particle paths obvious in the still (dashed trails, mid-beam packet).
- One polished UI mock.`,
  },
  V3: {
    title: "Radar compass · graph is the floor",
    prompt: `Completely REDESIGN this StackGen diagram as OPTION V3 — radar/compass Router over a full graph floor.

${WORLD}
${TRUTH}

Composition:
- The ENTIRE mid plate is a rich OCG graph (checkout-api near a lit node; multi-hop edges visible as geometry not captions).
- Intent Router is a COMPASS/RADAR overlay dead-center — four short thick beams to icon docks at the tips.
- Assemblies are icon-only docks with a single-letter stage mark (B/O/O/R) — no long product titles.
- Ask docked above; OS glyphs docked below like a status bar.
- Feels animation-heavy even as a still: sweep arc, lit hop path, packet.
- One polished Soft Structuralism UI mock.`,
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
      temperature: 0.85,
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
    const err = await res.text();
    throw new Error(`${key} HTTP ${res.status}: ${err.slice(0, 500)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) throw new Error(`${key}: no image in response`);
  const out = path.join(OUT_DIR, `option-${key}.png`);
  await writeFile(out, Buffer.from(img.inlineData.data, "base64"));
  return out;
}

async function main() {
  const { option } = parseArgs(process.argv);
  const keys =
    option === "ALL" ? Object.keys(OPTIONS) : OPTIONS[option] ? [option] : null;
  if (!keys) {
    console.error(`Unknown option ${option}. Use V1|V2|V3|all`);
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });
  const sourceBytes = await readFile(DEFAULT_SOURCE);
  await writeFile(path.join(OUT_DIR, "source.png"), sourceBytes);
  const access = token();
  const results = [];
  for (const key of keys) {
    process.stdout.write(`Generating ${key} (${OPTIONS[key].title})… `);
    const out = await generateOne(key, sourceBytes, access);
    console.log(out);
    results.push({ key, title: OPTIONS[key].title, path: out });
  }
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      {
        model: MODEL,
        project: PROJECT,
        generatedAt: new Date().toISOString(),
        productTruth:
          "Ask→Intent Router→Assemblies; OCG world-model underlay; Aiden OS substrate",
        inspiration: [
          "Mobbin Cloudflare Bindings hub",
          "Mobbin Railway canvas",
          "Mobbin Weavy/FLORA node beams",
          "shadcnblocks Integration19 radial hub",
        ],
        results,
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(OUT_DIR, "README.md"),
    `# OCG Intent Router V2 comps\n\nNano Banana Pro plates. Live diagram remains React.\n\n${results.map((r) => `- **${r.key}** ${r.title}: \`option-${r.key}.png\``).join("\n")}\n`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
