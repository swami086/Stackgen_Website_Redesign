#!/usr/bin/env node
/**
 * Nano Banana Pro — COMPLETE Intent Router comps (fixes "incomplete" plate).
 * Concept only; live diagram stays React/DOM.
 *
 * Completeness contract:
 * 1. Ask bar + Submit (top)
 * 2. Intent Router CENTER (largest)
 * 3. Four equal assembly icon-discs N/E/S/W with short labels
 * 4. Each assembly owns 3 official vendor logos, tethered by EXPLICIT feeder
 *    lines: vendors → assembly → Router (not floating triangles)
 * 5. checkout-api entity in Observe cluster, multi-hop to Datadog/Prometheus/PagerDuty
 * 6. Aiden OS icon strip (bottom) — full labels, no truncation
 * 7. Motion-ready: packets on feeders + active Observe route beam
 *
 * Usage: node scripts/generate-ocg-intent-router-complete.mjs [--option C1|C2|all]
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const LOCATION = process.env.GCP_LOCATION || "global";
const MODEL = "gemini-3-pro-image";
const OUT_DIR = path.join(ROOT, ".impeccable/mocks/ocg-intent-router-complete");
const SOURCE = path.join(
  ROOT,
  "exports/web-shelf/ocg-intent-router-hub.png",
);

const WORLD = `Visual world (Soft Structuralism — binding):
- Dark plate #181810 / #0f0f0c, dotted grid, hairline borders
- Accent violet #B898F8 ONLY on Intent Router + ONE active Observe route + checkout-api
- Official vendor marks + short names in compact chips (AWS, Terraform, EKS, Datadog, Prometheus, PagerDuty, GitHub, GitLab, Jira, OPA, Slack, Backstage)
- NO truncated text. Use "OPA" not "Open Policy Agent". Use "SRE" not "Aiden for SRE" on docks.
- NO floating decorative wireframe triangles that ignore the hubs.
- Complete UI mock: ask bar TOP + diagram MID + Aiden OS strip BOTTOM — all in frame.
- Portrait ~3:4. No watermarks, no people.`;

const COMPLETE = `COMPLETENESS (must all be true):
- Every vendor chip has a visible hairline feeder into its parent assembly disc
- Every assembly disc has a beam into the center Intent Router
- Four assemblies are EQUAL visual weight (Infrastructure N, Automation E, Observability S, SRE W)
- Observability route is ACTIVE (thicker accent beam + mid-path packet)
- Telemetry: three tiny Logs/Metrics/Traces icons under ask bar
- OS strip: Governance · Guardrails · Tokenomics · Identity · Audit · Integrations (icons + short labels, none cut off)
- Story reads in one glance: Ask → Router → Assembly → estate vendors (world model)`;

const OPTIONS = {
  C1: {
    title: "Tethered clusters · four equal spokes",
    prompt: `Completely REDESIGN this StackGen diagram as OPTION C1 — a FINISHED Intent Router plate.

${WORLD}
${COMPLETE}

Composition:
- CENTER: large double-bezel Intent Router hub labeled "Intent Router"
- N/E/S/W: four icon discs (Infrastructure / Automation / Observability / SRE) with tiny stage letters B O O R
- Around EACH disc: exactly three vendor chips on a tight arc, with straight/curved feeder lines INTO that disc
  · N Infrastructure: AWS, Terraform, EKS
  · E Automation: GitHub, GitLab, Jira
  · S Observability: Datadog, Prometheus, PagerDuty + purple checkout-api entity linked to those three
  · W SRE: OPA, Slack, Backstage
- Kill orphaned geometry. Kill label collisions. Kill floating triangles.
- One polished Soft Structuralism product diagram.`,
  },
  C2: {
    title: "Converge rings · vendors feed Router via assemblies",
    prompt: `Completely REDESIGN this StackGen diagram as OPTION C2 — converge rings, FINISHED plate.

${WORLD}
${COMPLETE}

Composition thesis:
- Outer ring: 12 vendor chips evenly spaced (official logos + short names)
- Mid ring: four assembly discs at compass points
- Center: Intent Router
- Edges: every vendor connects to its domain assembly; every assembly connects to Router
- checkout-api sits near Observability as lit entity with 2–3 hops into Datadog/Prometheus/PagerDuty
- Packets visible mid-edge on the Observe path
- Ask top, OS bottom — complete chrome
- One polished Soft Structuralism product diagram.`,
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
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
        temperature: 0.75,
      },
    }),
  });
  if (!res.ok) throw new Error(`${key} ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();
  const img = json?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!img) throw new Error(`${key}: no image`);
  const out = path.join(OUT_DIR, `option-${key}.png`);
  await writeFile(out, Buffer.from(img.inlineData.data, "base64"));
  return out;
}

async function main() {
  const { option } = parseArgs(process.argv);
  const keys =
    option === "ALL" ? Object.keys(OPTIONS) : OPTIONS[option] ? [option] : null;
  if (!keys) {
    console.error("Use C1|C2|all");
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });
  const sourceBytes = await readFile(SOURCE);
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
        generatedAt: new Date().toISOString(),
        completenessContract: COMPLETE,
        results,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
