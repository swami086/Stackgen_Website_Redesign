#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — image-edit refine of OCG diagram.
 * Concept comps only; live diagram stays React/DOM.
 *
 * Usage:
 *   node scripts/generate-ocg-refine.mjs
 *   node scripts/generate-ocg-refine.mjs --source path/to.png --out path/to/out.png
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
  ".impeccable/mocks/ocg-nano-banana-refine/source.png",
);
const DEFAULT_OUT = path.join(
  ROOT,
  ".impeccable/mocks/ocg-nano-banana-refine/refined-pro.png",
);

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
  const out = { source: DEFAULT_SOURCE, out: DEFAULT_OUT };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--source") out.source = path.resolve(argv[++i]);
    if (argv[i] === "--out") out.out = path.resolve(argv[++i]);
  }
  return out;
}

const PROMPT = `Edit this StackGen marketing diagram into a refined, production-ready concept frame.

Preserve structure and factual labels exactly:
- Prompt: "Ask Aiden to investigate latency spike in checkout…"
- Chips: auto-route, world model, guardrails
- Submit button (violet accent)
- Intent Router pill with branch icon
- Flow labels: ROUTE TO ASSEMBLY, ENRICH FROM CONTEXT, GOVERNED BY
- FACTORY ASSEMBLIES band with four cards in order:
  Build / Aiden for Infrastructure / INFRASTRUCTURE · IAC
  Operate / Aiden for Automation / AUTOMATION · PIPELINES
  Observe / Aiden for Observability / TRACES · METRICS · ALERTS
  Remediate / Aiden for SRE / INCIDENTS · SLOS
- GRAPH RESOLUTION: six mono source rows converging to checkout-api entity card
- Aiden Agentic Operating System band with six chips: Governance, Guardrails, Tokenomics, Identity & Access, Audit & Evidence, Integrations

Visual world (binding):
- Dark plate #181810, warm charcoal surfaces, hairline borders
- Accent violet #B898F8 and soft cyan #A8E0F8; pass/green only on Factory Assemblies bezel
- Editorial B2B tech, n8n-node clarity, Linear density — not neon cyberpunk, not purple-SaaS cliché
- Complete the full vertical spine end-to-end (prompt → router → assemblies → graph resolution → OS)
- Sharper hierarchy: prompt primary, assemblies the visual peak, graph resolution denser and fully visible, OS quiet substrate
- Crisp legible UI text, consistent mono for labels, no watermark, no people, no logos, no extra marketing copy
- Aspect ~3:4 portrait so the whole pipeline fits without cropping Graph Resolution or OS

Output one polished UI mock of the complete diagram.`;

async function main() {
  const args = parseArgs(process.argv);
  await mkdir(path.dirname(args.out), { recursive: true });
  const bytes = await readFile(args.source);
  const access = token();
  const url = `${apiHost(LOCATION)}/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: PROMPT },
          {
            inlineData: {
              mimeType: "image/png",
              data: bytes.toString("base64"),
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
  console.log(`Editing with ${MODEL}…`);
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
    throw new Error(`${res.status} ${errText.slice(0, 1200)}`);
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
    throw new Error(`no image bytes. text=${textBits}`);
  }
  await writeFile(args.out, Buffer.from(data, "base64"));
  const meta = {
    generatedAt: new Date().toISOString(),
    model: MODEL,
    source: path.relative(ROOT, args.source),
    out: path.relative(ROOT, args.out),
  };
  await writeFile(
    path.join(path.dirname(args.out), "manifest.json"),
    JSON.stringify(meta, null, 2),
  );
  console.log(`→ ${args.out}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
