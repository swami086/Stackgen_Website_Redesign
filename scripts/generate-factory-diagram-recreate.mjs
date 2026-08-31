#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — Factory Inner/Outer Loop recreate comps v2.
 * Guided by Impeccable layout + Firecrawl/Mobbin competitor diagram research.
 * Concept samples only; live diagram stays React/DOM.
 *
 * Usage:
 *   node scripts/generate-factory-diagram-recreate.mjs
 *   node scripts/generate-factory-diagram-recreate.mjs --option A
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const LOCATION = process.env.GCP_LOCATION || "global";
/** Nano Banana Pro — Vertex image model used across StackGen comps. */
const MODEL = "gemini-3-pro-image";

const DEFAULT_SOURCE = path.join(
  ROOT,
  "exports/web-shelf/factory-gloss-align-dark-1440.png",
);
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/factory-diagram-recreate");

const WORLD = `Visual world (binding — Soft Structuralism, anti-slop):
- Dark plate charcoal #181810 / #0f0f0c; hairline borders; NO neon cyberpunk glow spam
- Accent violet #B898F8 sparingly on Context Graph hub / one active beam only
- Cyan #A8E0F8 only as quiet particle/beam highlight
- Editorial B2B for SREs — crisp UI, JetBrains Mono for micro-labels (INNER LOOP / OUTER LOOP)
- VISUAL-HEAVY: geometry, icons, beams, nodes > paragraphs. Short labels only.
- Wide landscape ~16:9 marketing diagram plate. No watermarks, no people, no fake brand logos
  (generic monochrome tool glyphs OK — code brackets, git fork, pipeline, cube, cloud, eye).
- Anti-squeeze RULE: every chip has generous internal padding (~12–14px), clear gap between chips
  (~8–12px), and full rounded pill caps visible — NEVER clipped by container edges.`;

const LABELS = `StackGen vocabulary (preserve):
- Left: INNER LOOP · Build & ship · chips IDE · Git · CI / CD · IaC
- Center: Context Graph hub with satellites intent · entities · policies · memory
- Right: OUTER LOOP · Run & observe · chips Runtime · Infrastructure · Observability
- Ban: long captions, neon frames, purple-on-white SaaS cliché, squeezed/clipped pills`;

const RESEARCH = `Competitor patterns to steal (composition only — keep StackGen world):
- Cycle: hub-and-spoke converge/diverge with airy icon tiles + curved beams + path dots
- Railway / Cloudflare: roomy nodes on a dark canvas; orthogonal converge bus; never clip pills
- Linear: generous negative space; thin hairline strokes; labels breathe
- Ditto: fan beams from hub to stacked destinations
- n8n: nodes on a quiet canvas with Bezier connectors; padding > decoration
- SVGator / Vercel Flow: motion-ready stroke-dash and directed connectors (show as static ready state)`;

const OPTIONS = {
  A: {
    title: "Cycle hub-spoke · roomy pills",
    prompt: `Completely redesign this StackGen DevOps Factory diagram as OPTION A — Cycle-inspired hub-and-spoke with roomy chips.

${WORLD}
${LABELS}
${RESEARCH}

Composition thesis (Mobbin Cycle + Ditto fan beams):
- CENTER: large Context Graph hub (circle) — brightest element; four tiny satellites around it.
- LEFT: vertical column of FOUR roomy pill chips (IDE, Git, CI / CD, IaC) with generous padding;
  elegant thin curved beams converge FROM each pill INTO the hub.
- RIGHT: vertical column of THREE roomy pills (Runtime, Infrastructure, Observability);
  beams FAN OUT from hub to each pill.
- Small dots on beams suggest particle motion (static "in flight").
- No puzzle silhouette — pure hub-spoke. Wide gutters; chips never clipped.
- One polished UI mock of the locked/assembled state.`,
  },
  B: {
    title: "Railway canvas · orthogonal bus",
    prompt: `Completely redesign this StackGen DevOps Factory diagram as OPTION B — Railway/Cloudflare canvas with orthogonal converge bus.

${WORLD}
${LABELS}
${RESEARCH}

Composition thesis (Mobbin Railway architecture + Cloudflare Workers flow):
- Full-width dark glass plate with subtle dot-grid canvas (very quiet).
- LEFT band: INNER LOOP header + four tall-enough rounded tiles stacked with ~12px gaps;
  each tile icon+label with internal padding that never hugs borders.
- CENTER: thin vertical "bus" line collecting three-to-four horizontal stubs from left tiles,
  feeding into a mid Context Graph keystone card (not a tiny badge — a real hub tile).
- RIGHT band: OUTER LOOP header + three roomy tiles fed by stubs from the hub bus.
- Hairline orthogonal connectors only (no thick neon). Status-ready: one left chip faintly active.
- Kill puzzle tabs. Air and structure win. One polished UI mock.`,
  },
  C: {
    title: "Linear air · puzzle keystone refined",
    prompt: `Completely redesign this StackGen DevOps Factory diagram as OPTION C — keep the puzzle metaphor but give it Linear-grade air.

${WORLD}
${LABELS}
${RESEARCH}

Composition thesis (Mobbin Linear isometric air + prior StackGen puzzle stitch):
- LEFT jigsaw piece (tabs toward center) holds INNER LOOP chips; RIGHT piece (sockets) holds OUTER LOOP.
- Context Graph is the keystone BETWEEN halves — visible stitch seams.
- CRITICAL density fix vs current: chips are content-hugging but NOT cramped —
  taller pills (comfortable height), clear column gaps, mating-edge clearance so pill caps
  are NEVER clipped by puzzle silhouette or overflow:hidden.
- Thin hairline puzzle outline (neutral, not accent neon). Hub calm violet glow only.
- Show assembled/locked state. Motion-ready particle lanes left→hub→right as faint dots.
- One polished UI mock.`,
  },
  D: {
    title: "beehiiv / Clay fork · staged flow",
    prompt: `Completely redesign this StackGen DevOps Factory diagram as OPTION D — staged left→center→right flow with fork elegance.

${WORLD}
${LABELS}
${RESEARCH}

Composition thesis (Mobbin beehiiv fork + Clay workflow scale):
- Three clear stages across a wide plate with generous horizontal span.
- Stage 1 LEFT: compact stack of Inner Loop pills (roomy padding) under "Build & ship".
- Stage 2 CENTER: single Context Graph mechanism card (hub + four satellites) —
  the only place accent violet lives.
- Stage 3 RIGHT: Outer Loop pills under "Run & observe".
- Connector: one elegant hairline from left stack → hub, then a soft Y/fork into right pills
  (beehiiv-style curve, not spaghetti). Tiny motion dots on the path.
- Maximum breathing room; chips never squeezed. No puzzle silhouette.
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
        "Cycle hub-spoke",
        "Railway architecture",
        "Cloudflare Workers flow",
        "Linear isometric air",
        "Ditto fan beams",
        "n8n workflow canvas",
        "beehiiv fork",
        "Clay workflow",
      ],
      firecrawl: [
        "svgator SaaS SVG animations",
        "bool.dev animated architecture",
        "vercel Flow component / stroke connectors",
      ],
    },
    createdAt: new Date().toISOString(),
    frames,
  };
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  const readme = `# Factory diagram recreate comps (Nano Banana Pro v2)

Model: \`${MODEL}\` via gcloud Vertex (\`generateContent\`).
Source: \`${path.relative(ROOT, DEFAULT_SOURCE)}\`

| Option | Thesis | Inspiration |
|---|---|---|
| A | Cycle hub-spoke · roomy pills | Mobbin Cycle, Ditto |
| B | Railway canvas · orthogonal bus | Railway, Cloudflare |
| C | Linear air · puzzle keystone refined | Linear + StackGen puzzle |
| D | beehiiv / Clay fork · staged flow | beehiiv, Clay |

Regen: \`node scripts/generate-factory-diagram-recreate.mjs\`
`;
  await writeFile(path.join(OUT_DIR, "README.md"), readme);
  console.log("Done.", Object.keys(frames).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
