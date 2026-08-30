#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — OCG rebuild option comps A–E.
 * Concept samples only; live diagram stays React/DOM.
 *
 * Usage:
 *   node scripts/generate-ocg-rebuild-options.mjs
 *   node scripts/generate-ocg-rebuild-options.mjs --option B
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
  "exports/web-shelf/impeccable-diagram-fix/V2P0L.png",
);
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/ocg-rebuild-options");

const WORLD = `Visual world (binding):
- Dark plate #181810, warm charcoal surfaces, hairline borders
- Accent violet #B898F8 and soft cyan #A8E0F8; pass/green only on Factory Assemblies when present
- Editorial B2B tech for SREs — not neon cyberpunk, not purple SaaS cliché
- Crisp legible UI text, JetBrains Mono for labels
- Portrait ~3:4 so the full mechanism fits without cropping
- No watermarks, no people, no logos, no extra marketing copy beyond the labels listed`;

const LABELS = `Preserve StackGen vocabulary when present:
- Prompt: "Ask Aiden to investigate latency spike in checkout…"
- Chips: auto-route, world model, guardrails
- Intent Router; ROUTE TO ASSEMBLY / ENRICH FROM CONTEXT / GOVERNED BY as needed by the option
- Aiden for Infrastructure / Automation / Observability / SRE (Build · Operate · Observe · Remediate)
- Graph entities like checkout-api, ecs-svc/checkout when the option shows a graph
- Aiden OS chips: Governance, Guardrails, Tokenomics, Identity & Access, Audit & Evidence, Integrations`;

const OPTIONS = {
  A: {
    title: "Execution spine (evolved)",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION A — Execution spine (evolved).

${WORLD}
${LABELS}

Composition thesis:
- Keep a clear VERTICAL execution spine: prompt → Intent Router → Factory Assemblies band → Graph Resolution → Aiden OS band.
- CRITICAL CHANGE vs a chip list: Graph Resolution must show a REAL multi-hop knowledge graph (typed edges between services, deploy, ownership, SLO, policy), not only pills spidering into checkout-api.
- Energy reads top→bottom like an n8n workflow run; assemblies still L→R inside their band.
- One polished UI mock of the complete diagram.`,
  },
  B: {
    title: "Two-plane split (structure vs decision)",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION B — Two-plane split.

${WORLD}
${LABELS}

Composition thesis:
- SPLIT LAYOUT: LEFT (or top) plane = Knowledge Graph — entities + typed relationship edges (service, infra, ownership, policy, incident, SLO).
- RIGHT (or bottom) plane = Context / decision traces — policy version, approval, refuse, who approved, why.
- CENTER: Intent Router / prompt lands and lights a CROSS-DOMAIN path that bridges both planes.
- Factories (four Aiden assemblies) appear as lenses or destinations along the lit path, not as a single horizontal strip dominating the frame.
- The diagram must make edges and decision traces the hero, not a vertical flowchart.
- One polished UI mock of the complete diagram.`,
  },
  C: {
    title: "Hub constellation (graph-first)",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION C — Hub constellation (graph-first).

${WORLD}
${LABELS}

Composition thesis:
- CENTER HUB: entity "checkout-api" (under investigation) as the brightest node.
- SATELLITES around hub: infrastructure, deploy/pipeline, ownership/team, SLO, alert/incident, policy — connected by typed edges.
- Intent Router is a BEAM / selection path that lights one multi-hop traversal, not a box sitting above everything.
- Four Factory Assemblies appear as four LENSES or tinted rings around the same hub (Build / Operate / Observe / Remediate), secondary to the graph.
- Prompt strip can sit above; Aiden OS as a quiet substrate below.
- One polished UI mock of the complete diagram.`,
  },
  D: {
    title: "Interactive ask → traverse",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION D — Interactive ask → traverse (shown as a frozen mid-play UI frame).

${WORLD}
${LABELS}

Composition thesis:
- Looks like a PRODUCT DEMO in progress: large prompt input active, a "Play traversal" or Submit control lit.
- Diagram mid-animation: one highlighted hop path through the context graph (3–5 hops glowing), previous hops dimmed.
- Side or bottom caption of hop labels (e.g. alert → service → deploy → policy → refuse/approve).
- Assemblies react as the path touches their domain; OS chips visible as governance floor.
- UI chrome suggests interactivity (step dots 1–4, or scrubber) without looking like a mobile app.
- One polished UI mock of the complete diagram.`,
  },
  E: {
    title: "Three-layer stack (architecture truth)",
    prompt: `Completely redesign this StackGen Operational Context Graph marketing diagram as OPTION E — Three-layer stack.

${WORLD}
${LABELS}

Composition thesis:
- THREE HORIZONTAL BANDS (architecture layers), clearly labeled:
  1) Telemetry / signals (logs · metrics · traces) — quiet, dense
  2) Context Graph (semantic relationships) — the RICH animated middle band with nodes + edges
  3) Aiden (act within policy) — Intent Router + assemblies + OS as the action layer
- Prompt DROPS THROUGH the layers vertically as a bright path; only the middle Context Graph band is visually richest.
- Avoid generic "tech stack" cliché: the middle band must show multi-hop entity relationships, not icons in a row.
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
      temperature: 0.4,
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
      console.error(`Unknown option ${k}. Use A|B|C|D|E|all`);
      process.exit(1);
    }
  }

  const frames = {};
  for (const k of keys) {
    const result = await generateOne(k, sourceBytes, access);
    frames[k] = result;
  }

  const meta = {
    generatedAt: new Date().toISOString(),
    model: MODEL,
    source: path.relative(ROOT, DEFAULT_SOURCE),
    frames,
  };
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(meta, null, 2),
  );

  const readme = `# OCG Rebuild Options — Nano Banana Pro samples

Model: \`${MODEL}\`
Source plate: \`${path.relative(ROOT, DEFAULT_SOURCE)}\`

Concept comps only — do not ship as the live diagram.

| Option | Thesis | File |
|---|---|---|
| A | Execution spine (evolved) — vertical play; real multi-hop graph in resolution | [option-A.png](./option-A.png) |
| B | Two-plane split — Knowledge Graph vs decision traces | [option-B.png](./option-B.png) |
| C | Hub constellation — checkout-api center; assemblies as lenses | [option-C.png](./option-C.png) |
| D | Interactive ask → traverse — mid-play demo UI | [option-D.png](./option-D.png) |
| E | Three-layer stack — Telemetry / Context Graph / Aiden | [option-E.png](./option-E.png) |
`;
  await writeFile(path.join(OUT_DIR, "README.md"), readme);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
