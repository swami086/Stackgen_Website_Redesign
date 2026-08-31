#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — Problem section animated-explainer comps.
 * Guided by Impeccable shape/animate + Mobbin problem/video patterns.
 * Concept samples only; live section stays React (do not ship rasters as the diagram).
 *
 * Usage:
 *   node scripts/generate-problem-animated-options.mjs
 *   node scripts/generate-problem-animated-options.mjs --option A
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
  "exports/web-shelf/factory-gloss-align-dark-1440.png",
);
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/problem-animated-explainer");

const WORLD = `Visual world (binding — Soft Structuralism, StackGen replica dark shelf):
- Charcoal plate #0f0f0c / #181810; hairline borders; NO neon cyberpunk glow spam
- Accent violet #B898F8 sparingly (one active beam / play affordance only)
- Cyan #A8E0F8 only as quiet particle/status highlight
- Editorial B2B for SREs — crisp product UI fragments, JetBrains Mono for micro-labels
- VISUAL-HEAVY: show the problem. Short labels only. Kill paragraph walls and symptom card stacks.
- Wide landscape ~16:9 marketing section plate (homepage section, not full browser chrome)
- No watermarks, no real people faces, no fake customer logos
- Generic monochrome tool glyphs OK (bell, git fork, cloud, eye, pipeline, book)
- Anti-slop: no purple-on-white SaaS cliché, no equal icon+text feature cards as the structure`;

const COPY = `Locked copy (use sparingly — visual leads):
- Eyebrow (optional mono pill): The problem
- H2 max one line: Software is shipping faster than ops can keep up.
- Punchline (bold, short): This is where teams lose control of production.
- Symptom beats as SHORT labels only (≤6 words), never full sentences in a list:
  Alert · no deploy · Drift · War room · Stale runbooks · Ungoverned AI change
- Do NOT invent MTTR/% metrics. Do NOT say AIOps platform.`;

const MOBBIN = `Mobbin composition inspiration (steal layout/motion thesis only — keep StackGen world):
- Ramp "Systems that never spoke": floating UI fragments + tangled connectors = chaos of siloed tools
- Intercom old-way vs new-way: spaghetti arrows between tool icons on dark plate
- Framer / Tines / Grain: short headline + DOMINANT cinematic video/demo frame with play affordance
- Antimetal: incident/issue narrative as product UI (urgent badge, related deploys, ask bar) — dark Soft Structuralism remake
- folk / Miro: video-style plate as the section hero, copy secondary`;

const OPTIONS = {
  A: {
    title: "Ramp chaos collage · systems never spoke",
    prompt: `Redesign this StackGen homepage PROBLEM section as OPTION A — Ramp-inspired chaos collage in Soft Structuralism dark.

${WORLD}
${COPY}
${MOBBIN}

Composition thesis:
- TOP: tiny mono "The problem" pill + one bold H2 (keep short). Optional one-line punchline under it. NO body paragraph. NO stacked symptom cards.
- CENTER/BOTTOM: large dark glass plate (~70% of section height) showing a CHAOTIC collage of SRE UI fragments floating on a charcoal canvas:
  Pager-style alert toast (no deploy attached), Terraform/IaC drift diff snippet, CI deploy badge, Slack-like war-room chat bubbles, runbook doc with "stale" tag.
  Thin tangled hairline connectors weaving between fragments (the mess is the point).
- Motion-ready: fragments look mid-scatter; faint motion streaks. Soft violet only on one broken connector.
- One polished UI mock of an animated explainer frame (static keyframe of the chaos).`,
  },
  B: {
    title: "Cinema plate · Framer/Tines video hero",
    prompt: `Redesign this StackGen homepage PROBLEM section as OPTION B — Framer/Tines cinematic video plate.

${WORLD}
${COPY}
${MOBBIN}

Composition thesis:
- CENTERED short type block ABOVE a huge rounded video plate (primary visual, ~75% width).
- Type: mono eyebrow + H2 only (or H2 + punchline). Kill body + list.
- VIDEO PLATE: Soft Structuralism double-bezel / glass-specular frame. Inside: storyboard of a P1 war room —
  left: alert flood without context; center: empty "what changed?" void; right: operators piecing silos.
  Large play affordance (quiet violet ring, not neon). Caption strip: "90 minutes · no shared context".
- Feels like an embedded product film, not a text section. Dark shelf background.
- One polished UI mock.`,
  },
  C: {
    title: "Intercom tangle · three silos spaghetti",
    prompt: `Redesign this StackGen homepage PROBLEM section as OPTION C — Intercom "old way" tangle diagram.

${WORLD}
${COPY}
${MOBBIN}

Composition thesis:
- LEFT or TOP: short H2 + punchline only.
- DOMINANT diagram plate: three labeled islands — Observability · Deploy · Infrastructure — each a Soft Structuralism tile with 2–3 tiny status chips.
- Between islands: dense tangled white/grey arrows and dashed lines (chaos). Floating avatars/operator dots optional as simple glyphs (no faces).
- Micro-labels on edges: "no deploy attached" · "drift unknown" · "stale runbook".
- Motion-ready: arrows look mid-thrash. NO solution hub on the right (Problem only — keep broken).
- One polished UI mock.`,
  },
  D: {
    title: "Antimetal filmstrip · P1 timeline scrub",
    prompt: `Redesign this StackGen homepage PROBLEM section as OPTION D — Antimetal-style incident timeline as animated filmstrip.

${WORLD}
${COPY}
${MOBBIN}

Composition thesis:
- Short centered eyebrow + H2 above a wide dark product plate.
- Inside plate: horizontal 4-beat filmstrip / scrub timeline (video-style chapters):
  1 Alert · 2 War room · 3 Blind change · 4 Drift lands
  Each beat is a compact Soft Structuralism UI card (urgent badge, chat, PR, infra map) with a scrub playhead under the strip.
- Feels like scrubbing an incident film. Soft violet only on the active beat / playhead.
- Kill long copy and vertical symptom lists — symptoms ARE the four beats.
- One polished UI mock.`,
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
  let access;
  try {
    access = token();
  } catch (err) {
    console.error("gcloud auth failed:", err.message);
    process.exit(1);
  }

  const keys = args.option === "ALL" ? Object.keys(OPTIONS) : [args.option];
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

  const manifest = {
    model: MODEL,
    project: PROJECT,
    source: path.relative(ROOT, DEFAULT_SOURCE),
    research: {
      mobbin: [
        "https://mobbin.com/sites/sections/b5b16367-0324-4627-87db-791011ccde93",
        "https://mobbin.com/sites/sections/10a77b79-0e26-4f3e-a34a-d5a1a4ae3588",
        "https://mobbin.com/sites/sections/9caf7169-91a3-419e-a787-6f61843eeda0",
        "https://mobbin.com/sites/sections/c7058e8a-dd2e-4be9-a940-cf8bafb296a5",
        "https://mobbin.com/sites/sections/2ea63f3f-4158-4845-a3da-52b91c6e092e",
      ],
    },
    createdAt: new Date().toISOString(),
    frames,
  };
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  const readme = `# Problem section — animated explainer comps

Model: \`${MODEL}\` via gcloud Vertex \`generateContent\`.
Soft Structuralism dark · Mobbin-guided · Impeccable shape/animate.

| Option | Thesis | Mobbin spine |
|---|---|---|
| A | Chaos collage of siloed SRE UI | [Ramp](https://mobbin.com/sites/sections/b5b16367-0324-4627-87db-791011ccde93) |
| B | Cinema video plate + short copy | [Framer](https://mobbin.com/sites/sections/9caf7169-91a3-419e-a787-6f61843eeda0) / [Tines](https://mobbin.com/sites/sections/c7058e8a-dd2e-4be9-a940-cf8bafb296a5) |
| C | Three-silo spaghetti tangle | [Intercom](https://mobbin.com/sites/sections/10a77b79-0e26-4f3e-a34a-d5a1a4ae3588) |
| D | P1 filmstrip / scrub timeline | [Antimetal issue](https://mobbin.com/sites/sections/2ea63f3f-4158-4845-a3da-52b91c6e092e) |

Regen: \`node scripts/generate-problem-animated-options.mjs\`
`;
  await writeFile(path.join(OUT_DIR, "README.md"), readme);
  console.log("Done.", Object.keys(frames).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
