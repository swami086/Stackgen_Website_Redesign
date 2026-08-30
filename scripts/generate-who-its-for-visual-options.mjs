#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — Who It's For visual-heavy options.
 * Concept samples only; do not ship as live section until user picks.
 *
 * Usage:
 *   node scripts/generate-who-its-for-visual-options.mjs
 *   node scripts/generate-who-its-for-visual-options.mjs --option B
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
  ".impeccable/mocks/who-its-for-visual/source.png",
);
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/who-its-for-visual");

const WORLD = `Visual world (binding — Soft Structuralism, StackGen deck):
- Dark plate ~#181810, warm charcoal surfaces, hairline borders
- Accent violet #B898F8 / soft cyan #A8E0F8 — NO purple-on-white SaaS cliché, no neon cyberpunk
- Editorial B2B for SREs / platform engineers — scannable, not brochure-copy
- Crisp UI type; JetBrains Mono ONLY for tiny labels (BUILD / OPERATE / etc.)
- Horizontal section comp ~16:9 or 3:2; full section in one frame
- No watermarks, no people faces, no fake logos, no Lorem
- VISUAL-HEAVY: icons / micro-UI / diagram fragments dominate; copy is short labels only
- Anti-slop: no equal icon+title+paragraph card grids that look AI-default`;

const VOCAB = `Preserve StackGen vocabulary exactly:
- Eyebrow: WHO IT'S FOR
- Heading can stay short: "Aiden is the Agentic OS for production teams" OR distill to fewer words if the option needs it
- Pillars: Build / Operate / Observe / Remediate
- Products: Aiden for Infrastructure, Aiden for Automation, Aiden for Observability, Aiden for SRE
- Roles: Platform Engineering, Developers, DevSecOps, SRE
- OS: Aiden OS + chips Governance, Guardrails, Tokenomics, Identity & Access, Audit & Evidence, Integrations
- NEVER write "Aiden for DevOps" or "Olly"`;

const OPTIONS = {
  A: {
    title: "Icon-led distill",
    prompt: `Redesign this StackGen "Who It's For" marketing section as OPTION A — Icon-led distill.

${WORLD}
${VOCAB}

Composition thesis (Impeccable distill):
- Kill paragraph bodies. Each cell = LARGE phosphor-style icon + product/role title + ONE short JTBD phrase (max 6 words).
- Keep 4-column Build→Remediate structure: row of product tiles, row of role tiles — but denser, less empty horizontal stretch.
- Aiden OS band at bottom: label + chips that FILL the row (no empty right third).
- Primary reading: icons first, titles second, chips third. Squint test must show four columns + OS bar.
- One polished dark UI section mock.`,
  },
  B: {
    title: "Product portraits + role dock",
    prompt: `Redesign this StackGen "Who It's For" marketing section as OPTION B — Product portraits + role dock.

${WORLD}
${VOCAB}

Composition thesis (visual-heavy):
- FOUR wide product cards with a MINI UI vignette inside each (tiny abstract diagram / graph / alert strip — not readable paragraphs). Title + 4–6 word caption under the vignette.
- Below: a single horizontal ROLE DOCK — four compact pills/chips (Platform Engineering, Developers, DevSecOps, SRE) with small icons, NO body copy.
- Aiden OS as a thin full-width substrate under the dock, chips evenly distributed.
- Feels like a product gallery, not a text grid.
- One polished dark UI section mock.`,
  },
  C: {
    title: "OS-first substrate",
    prompt: `Redesign this StackGen "Who It's For" marketing section as OPTION C — OS-first substrate.

${WORLD}
${VOCAB}

Composition thesis (layout hierarchy):
- Aiden OS band moves to the TOP of the diagram (under the heading), full-width, chips filling the bar — shared context is the foundation.
- Below: four equal columns. Each column stacks product tile (icon-led, short JTBD) over role tile (name + 4-word line).
- Heading stays tight; subhead max one short sentence or drop it.
- Visual weight: OS band + icons > prose.
- One polished dark UI section mock.`,
  },
  D: {
    title: "Bento visual map",
    prompt: `Redesign this StackGen "Who It's For" marketing section as OPTION D — Bento visual map.

${WORLD}
${VOCAB}

Composition thesis (image-led, not 8 equal cards):
- Asymmetric bento: ONE large visual cell for "shared context / Agentic OS" metaphor (abstract network or factory diagram fragment), plus four medium product cells with icons + short titles, plus a compact role strip.
- Avoid eight equal text cards. Hierarchy must be obvious at a squint.
- Aiden OS chips appear as a footer rail or embedded in the large cell.
- Still clearly communicates Build/Operate/Observe/Remediate + four roles.
- One polished dark UI section mock.`,
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
      temperature: 0.45,
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
  const access = token();

  const keys =
    args.option === "ALL" ? Object.keys(OPTIONS) : [args.option];
  for (const k of keys) {
    if (!OPTIONS[k]) {
      console.error(`Unknown option ${k}. Use A|B|C|D|all`);
      process.exit(1);
    }
  }

  const frames = {};
  for (const k of keys) {
    frames[k] = await generateOne(k, sourceBytes, access);
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        model: MODEL,
        source: path.relative(ROOT, DEFAULT_SOURCE),
        frames,
        note: "Comps only — wait for user pick before editing WhoItsFor.tsx",
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.join(OUT_DIR, "README.md"),
    `# Who It's For — visual-heavy options

Model: \`${MODEL}\`
Source: \`${path.relative(ROOT, DEFAULT_SOURCE)}\`

| Option | Thesis | File |
|---|---|---|
| A | Icon-led distill — short JTBD, no paragraphs | [option-A.png](./option-A.png) |
| B | Product portraits + role dock | [option-B.png](./option-B.png) |
| C | OS-first substrate (Aiden OS at top) | [option-C.png](./option-C.png) |
| D | Bento visual map — asymmetric hierarchy | [option-D.png](./option-D.png) |
`,
  );
  console.log("Done.");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
