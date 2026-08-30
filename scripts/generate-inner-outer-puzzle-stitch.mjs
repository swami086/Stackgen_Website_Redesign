#!/usr/bin/env node
/**
 * Nano Banana Pro (gemini-3-pro-image) — image-edit refine of Inner/Outer Loop diagram frames.
 * Concept comps only; live diagram stays React/DOM.
 *
 * Usage:
 *   node scripts/generate-inner-outer-puzzle-stitch.mjs
 *   node scripts/generate-inner-outer-puzzle-stitch.mjs --frame A
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
  "exports/web-shelf/inner-outer-loop-v2/RBepL.png"
);
const OUT_DIR = path.join(
  ROOT,
  ".impeccable/mocks/inner-outer-puzzle-stitch"
);

const PUZZLE_HARD =
  `CRITICAL SHAPE REQUIREMENT (must be unmistakable at a glance):
- INNER LOOP tools sit INSIDE one large classic jigsaw puzzle piece on the left: rounded body with TWO large circular TABS protruding from the RIGHT edge (knobs pointing toward the center).
- OUTER LOOP tools sit INSIDE a matching jigsaw piece on the right: rounded body with TWO circular SOCKETS cut into the LEFT edge (holes that receive the left tabs).
- These are real puzzle silhouettes — not rounded rectangles with faint notches. A viewer must recognize "puzzle pieces" with no labels.
- Context Graph is the keystone between the halves that stitches them.`;

const FRAMES = {
  A: `Edit this StackGen marketing diagram into a refined concept frame representing t=0% Scatter.

${PUZZLE_HARD}

Visual world: Dark plate #181810, warm charcoal, hairline borders, accent violet #B898F8 + cyan #A8E0F8. Editorial B2B tech — not neon cyberpunk. Wide ~16:9.

Frame A Scatter: puzzle halves clearly SEPARATED with a visible gap; left tabs not yet in right sockets; hub dim; few faint particles; quiet orbit.

Preserve labels: INNER LOOP / Build & ship; OUTER LOOP; IDE, Git, CI/CD, IaC; Runtime, Infrastructure, Observability; Context Graph; intent, entities, policies, memory.
No watermarks, no people, no extra copy. One polished UI mock.`,

  B: `Edit this StackGen marketing diagram into a refined concept frame representing t=35% Gather.

${PUZZLE_HARD}

Visual world: Dark plate #181810, warm charcoal, hairline borders, accent violet #B898F8 + cyan #A8E0F8. Editorial B2B tech — not neon cyberpunk. Wide ~16:9.

Frame B Gather: halves CLOSING the gap; tabs approaching sockets; shards/particles streaming into the hub; faint stitch threads; satellites waking.

Preserve labels: INNER LOOP / Build & ship; OUTER LOOP; IDE, Git, CI/CD, IaC; Runtime, Infrastructure, Observability; Context Graph; intent, entities, policies, memory.
No watermarks, no people, no extra copy. One polished UI mock.`,

  C: `Edit this StackGen marketing diagram into a refined concept frame representing t=70% Stitch.

${PUZZLE_HARD}

Visual world: Dark plate #181810, warm charcoal, hairline borders, accent violet #B898F8 + cyan #A8E0F8. Editorial B2B tech — not neon cyberpunk. Wide ~16:9.

Frame C Stitch: tabs LOCKING into sockets; Context Graph bright pulse; violet stitch seams left→hub→right; satellites pulsed; interlocking edges glowing at the join.

Preserve labels: INNER LOOP / Build & ship; OUTER LOOP; IDE, Git, CI/CD, IaC; Runtime, Infrastructure, Observability; Context Graph; intent, entities, policies, memory.
No watermarks, no people, no extra copy. One polished UI mock.`,

  D: `Edit this StackGen marketing diagram into a refined concept frame representing t=100% Assembled.

${PUZZLE_HARD}

Visual world: Dark plate #181810, warm charcoal, hairline borders, accent violet #B898F8 + cyan #A8E0F8. Editorial B2B tech — not neon cyberpunk. Wide ~16:9.

Frame D Assembled: halves FLUSH as one continuous puzzle; tabs fully seated in sockets; hub calm glow; stitch seams settled; full picture for agents.

Preserve labels: INNER LOOP / Build & ship; OUTER LOOP; IDE, Git, CI/CD, IaC; Runtime, Infrastructure, Observability; Context Graph; intent, entities, policies, memory.
No watermarks, no people, no extra copy. One polished UI mock.`
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
  let frameArg = "all";
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--frame") frameArg = argv[++i];
  }
  return { frame: frameArg };
}

async function main() {
  const args = parseArgs(process.argv);
  await mkdir(OUT_DIR, { recursive: true });
  const bytes = await readFile(DEFAULT_SOURCE);
  
  let access;
  try {
    access = token();
  } catch (err) {
    console.error("gcloud auth failed:", err.message);
    process.exit(1);
  }

  const url = `${apiHost(LOCATION)}/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  
  const framesToRun = args.frame.toLowerCase() === "all" ? ["A", "B", "C", "D"] : [args.frame.toUpperCase()];
  
  const meta = { generatedAt: new Date().toISOString(), model: MODEL, source: path.relative(ROOT, DEFAULT_SOURCE), frames: {} };
  
  for (const frame of framesToRun) {
    if (!FRAMES[frame]) {
        console.error(`Invalid frame: ${frame}. Choose A, B, C, D, or all.`);
        process.exit(1);
    }
    
    console.log(`Generating Frame ${frame} with ${MODEL}…`);
    const prompt = FRAMES[frame];
    
    const body = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
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
      throw new Error(`no image bytes in frame ${frame}. text=${textBits}`);
    }
    
    const outPath = path.join(OUT_DIR, `frame-${frame}.png`);
    await writeFile(outPath, Buffer.from(data, "base64"));
    console.log(`→ ${outPath}`);
    
    meta.frames[frame] = path.relative(ROOT, outPath);
  }
  
  let currentManifest = {};
  try {
      const existing = await readFile(path.join(OUT_DIR, "manifest.json"), "utf8");
      currentManifest = JSON.parse(existing);
  } catch (e) {}
  
  const newManifest = { ...currentManifest, ...meta, frames: { ...(currentManifest.frames || {}), ...meta.frames } };
  
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(newManifest, null, 2)
  );
  
  // Generate README
  const readme = `# Inner/Outer Loop Puzzle Stitch Concept Frames

Model: \`${MODEL}\`
Source: \`${meta.source}\`

## Motion Thesis

Inner Loop (IDE/Git/CI/IaC) and Outer Loop (Runtime/Infrastructure/Observability) are two halves of the SAME puzzle. Context Graph is the stitcher that gathers shards and locks the full picture for agents.

### Frames

- **Frame A (Scatter):** Halves slightly apart / misaligned; chips feel like loose puzzle facets; hub dim; few faint particles; dashed orbit quiet.
- **Frame B (Gather):** Particles/shards stream from both sides toward hub; faint stitch threads drawing; satellites (intent/entities/policies/memory) waking; halves start closing the gap.
- **Frame C (Stitch):** Context Graph bright lock/pulse; violet stitch seams connecting left→hub→right; labels transforming (edit→drift-check style energy); satellites pulsed; puzzle edge silhouettes interlocking.
- **Frame D (Assembled):** One continuous picture; halves flush; hub calm glow; stitch seams settled; full picture readable for agents; editorial B2B tech.

## Files
- ![Frame A](./frame-A.png)
- ![Frame B](./frame-B.png)
- ![Frame C](./frame-C.png)
- ![Frame D](./frame-D.png)
`;
  await writeFile(path.join(OUT_DIR, "README.md"), readme);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
