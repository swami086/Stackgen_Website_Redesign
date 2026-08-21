import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { findSensitive } from './redaction.ts';

export const OUTPUT_DIR = 'public/product';
export const BUDGET_BYTES = 3 * 1024 * 1024;
const CLIP_SCALE = 'scale=1440:-2,fps=30';
const POSTER_SCALE = 'scale=1440:-2';
const FRAME_RATE = 30;

const SOURCES = {
  audit: {
    title: 'Auto-Generate Compliance and Security Audits',
    videoId: 'i31kMgVn_Xk',
  },
  automation: {
    title: 'Approval and Auto Remediation Flow',
    videoId: 'HKEV6rkRDzU',
  },
  infrastructure: {
    title: 'Module Editor, MCP Server, IDE',
    videoId: '92UTOY9C1UY',
  },
  observability: {
    title: 'StackOptimizer',
    videoId: '2PsieosSyAw',
  },
  featuredCase: {
    title: 'The Future of AI in SRE with Abhishek Gaurav from GreytHR',
    videoId: 'V0zsWdJz2rs',
  },
};

export const CLIPS = [
  clip('home-audit', 'home', 'audit', 10, 8),
  clip('home-automation', 'home', 'automation', 20, 8),
  clip('home-infrastructure', 'home', 'infrastructure', 10, 8),
  clip('home-observability', 'home', 'observability', 20, 8),
  clip('sre-01', 'sre', 'audit', 70, 8),
  clip('sre-02', 'sre', 'audit', 110, 8),
  clip('sre-03', 'sre', 'audit', 160, 8),
  clip('automation-01', 'automation', 'automation', 40, 8),
  clip('automation-02', 'automation', 'automation', 80, 8),
  clip('automation-03', 'automation', 'automation', 110, 8),
  clip('infrastructure-01', 'infrastructure', 'infrastructure', 55, 8),
  clip('infrastructure-02', 'infrastructure', 'infrastructure', 75, 8),
  clip('infrastructure-03', 'infrastructure', 'infrastructure', 110, 8),
  clip('observability-01', 'observability', 'observability', 60, 8),
  clip('observability-02', 'observability', 'observability', 120, 8),
  clip('observability-03', 'observability', 'observability', 180, 8),
];

export const FEATURED_CASE_POSTER = {
  name: 'greythr',
  sourceKey: 'featuredCase',
  videoId: SOURCES.featuredCase.videoId,
  title: SOURCES.featuredCase.title,
  atSeconds: 112,
  width: 1440,
};

function clip(name, surface, sourceKey, startSeconds, durationSeconds) {
  return {
    name,
    surface,
    sourceKey,
    videoId: SOURCES[sourceKey].videoId,
    title: SOURCES[sourceKey].title,
    startSeconds,
    durationSeconds,
    width: 1440,
  };
}

export function buildOutputPaths(clipDef, outputDir = OUTPUT_DIR) {
  return {
    webm: join(outputDir, `${clipDef.name}.webm`),
    mp4: join(outputDir, `${clipDef.name}.mp4`),
    poster: join(outputDir, `${clipDef.name}.webp`),
  };
}

export function buildEncodePlan(clipDef, sourcePath, outputDir = OUTPUT_DIR) {
  const out = buildOutputPaths(clipDef, outputDir);
  const start = formatSeconds(clipDef.startSeconds);
  const duration = formatSeconds(clipDef.durationSeconds);
  const posterFrame = join(outputDir, `.${clipDef.name}.poster.png`);
  return {
    webm: {
      command: 'ffmpeg',
      args: [
        '-y',
        '-ss',
        start,
        '-t',
        duration,
        '-i',
        sourcePath,
        '-vf',
        CLIP_SCALE,
        '-c:v',
        'libsvtav1',
        '-crf',
        '34',
        '-b:v',
        '0',
        '-an',
        out.webm,
      ],
    },
    mp4: {
      command: 'ffmpeg',
      args: [
        '-y',
        '-ss',
        start,
        '-t',
        duration,
        '-i',
        sourcePath,
        '-vf',
        CLIP_SCALE,
        '-c:v',
        'libx264',
        '-crf',
        '24',
        '-preset',
        'slow',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        '-an',
        out.mp4,
      ],
    },
    posterFrame: {
      command: 'ffmpeg',
      args: [
        '-y',
        '-ss',
        start,
        '-i',
        sourcePath,
        '-vframes',
        '1',
        '-vf',
        POSTER_SCALE,
        posterFrame,
      ],
    },
    poster: {
      command: 'cwebp',
      args: [
        '-quiet',
        '-q',
        '80',
        posterFrame,
        '-o',
        out.poster,
      ],
    },
  };
}

function buildPosterPlan(asset, sourcePath, outputDir = OUTPUT_DIR) {
  const poster = join(outputDir, `${asset.name}.webp`);
  const posterFrame = join(outputDir, `.${asset.name}.poster.png`);
  return {
    posterFrame: {
      command: 'ffmpeg',
      args: [
        '-y',
        '-ss',
        formatSeconds(asset.atSeconds),
        '-i',
        sourcePath,
        '-vframes',
        '1',
        '-vf',
        POSTER_SCALE,
        posterFrame,
      ],
    },
    poster: {
      command: 'cwebp',
      args: ['-quiet', '-q', '80', posterFrame, '-o', poster],
    },
  };
}

export function buildPosterFrameScanPlan(asset, sourcePath, framesDir) {
  return {
    command: 'ffmpeg',
    args: [
      '-y',
      '-ss',
      formatSeconds(asset.atSeconds),
      '-i',
      sourcePath,
      '-vframes',
      '1',
      '-vf',
      POSTER_SCALE,
      join(framesDir, 'frame-%05d.png'),
    ],
  };
}

function buildFrameScanPlan(clipDef, sourcePath, framesDir) {
  return {
    command: 'ffmpeg',
    args: [
      '-y',
      '-ss',
      formatSeconds(clipDef.startSeconds),
      '-t',
      formatSeconds(clipDef.durationSeconds),
      '-i',
      sourcePath,
      '-vf',
      CLIP_SCALE,
      '-fps_mode',
      'cfr',
      '-r',
      String(FRAME_RATE),
      join(framesDir, 'frame-%05d.png'),
    ],
  };
}

function formatSeconds(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(3);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    ...options,
    encoding: 'utf8',
    stdio: 'pipe',
  });
  if (result.status === 0) {
    return result;
  }

  const summary = [result.stdout, result.stderr].filter(Boolean).join('\n').trim();
  throw new Error(`${command} ${args.join(' ')}\n${summary}`);
}

function ensureDirectory(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function downloadSource(videoId, workDir) {
  run('yt-dlp', [
    '--no-playlist',
    '-f',
    'bv*[height<=1080]+ba/b[height<=1080]/b',
    '--merge-output-format',
    'mp4',
    '-o',
    join(workDir, `${videoId}.%(ext)s`),
    `https://www.youtube.com/watch?v=${videoId}`,
  ]);
  const match = readdirSync(workDir).find((file) => file.startsWith(`${videoId}.`));
  if (!match) throw new Error(`Download missing for ${videoId}.`);
  return join(workDir, match);
}

function scanFrames(framesDir) {
  const frames = readdirSync(framesDir)
    .filter((file) => file.endsWith('.png'))
    .sort();
  const results = [];

  for (const frame of frames) {
    const framePath = join(framesDir, frame);
    const text = run('tesseract', [framePath, 'stdout', '--psm', '11', 'quiet']).stdout.trim();
    const hits = findSensitive(text);
    results.push({
      frame,
      text,
      hits,
    });
  }

  return results;
}

function assertFramesClean(scanResults, label) {
  const hitFrames = scanResults.filter((scan) => scan.hits.length > 0);
  if (hitFrames.length === 0) return;

  const first = hitFrames[0];
  const rules = [...new Set(first.hits.map((hit) => hit.rule))].join(', ');
  throw new Error(`${label} rejected by redaction gate on ${first.frame} (${rules}).`);
}

function assertBudget(out) {
  for (const [kind, path] of Object.entries(out)) {
    if (kind === 'poster') continue;
    const size = statSync(path).size;
    if (size > BUDGET_BYTES) {
      throw new Error(`${basename(path)} exceeded budget: ${size} bytes.`);
    }
  }
}

function renderClip(clipDef, sourcePath, outputDir) {
  const framesDir = mkdtempSync(join(tmpdir(), `${clipDef.name}-frames-`));
  try {
    const framePlan = buildFrameScanPlan(clipDef, sourcePath, framesDir);
    run(framePlan.command, framePlan.args);
    const scanResults = scanFrames(framesDir);
    assertFramesClean(scanResults, clipDef.name);

    const plan = buildEncodePlan(clipDef, sourcePath, outputDir);
    run(plan.webm.command, plan.webm.args);
    run(plan.mp4.command, plan.mp4.args);
    run(plan.posterFrame.command, plan.posterFrame.args);
    run(plan.poster.command, plan.poster.args);

    const out = buildOutputPaths(clipDef, outputDir);
    assertBudget(out);
    rmSync(join(outputDir, `.${clipDef.name}.poster.png`), { force: true });

    return {
      clip: clipDef,
      out,
      frameCount: scanResults.length,
      hits: 0,
      sizes: {
        webm: statSync(out.webm).size,
        mp4: statSync(out.mp4).size,
        poster: statSync(out.poster).size,
      },
    };
  } finally {
    rmSync(framesDir, { recursive: true, force: true });
  }
}

function renderFeaturedCasePoster(sourcePath, outputDir) {
  const framesDir = mkdtempSync(join(tmpdir(), `${FEATURED_CASE_POSTER.name}-frames-`));
  try {
    const framePlan = buildPosterFrameScanPlan(FEATURED_CASE_POSTER, sourcePath, framesDir);
    run(framePlan.command, framePlan.args);
    const scanResults = scanFrames(framesDir);
    assertFramesClean(scanResults, FEATURED_CASE_POSTER.name);

    const plan = buildPosterPlan(FEATURED_CASE_POSTER, sourcePath, outputDir);
    run(plan.posterFrame.command, plan.posterFrame.args);
    run(plan.poster.command, plan.poster.args);
    rmSync(join(outputDir, `.${FEATURED_CASE_POSTER.name}.poster.png`), { force: true });
    return {
      asset: FEATURED_CASE_POSTER,
      poster: join(outputDir, `${FEATURED_CASE_POSTER.name}.webp`),
      size: statSync(join(outputDir, `${FEATURED_CASE_POSTER.name}.webp`)).size,
      frameCount: scanResults.length,
      hits: 0,
    };
  } finally {
    rmSync(framesDir, { recursive: true, force: true });
  }
}

function selectedClips(names) {
  if (names.length === 0) return CLIPS;
  const set = new Set(names);
  return CLIPS.filter((clipDef) => set.has(clipDef.name));
}

function main(argv) {
  const onlyIndex = argv.indexOf('--only');
  const only = onlyIndex >= 0 ? argv[onlyIndex + 1].split(',').filter(Boolean) : [];
  const clips = selectedClips(only);
  const workDir = mkdtempSync(join(tmpdir(), 'stackgen-clips-'));
  ensureDirectory(OUTPUT_DIR);

  try {
    const downloads = new Map();
    const results = [];
    for (const clipDef of clips) {
      if (!downloads.has(clipDef.videoId)) {
        downloads.set(clipDef.videoId, downloadSource(clipDef.videoId, workDir));
      }
      results.push(renderClip(clipDef, downloads.get(clipDef.videoId), OUTPUT_DIR));
    }

    if (only.length === 0 || only.includes(FEATURED_CASE_POSTER.name)) {
      if (!downloads.has(FEATURED_CASE_POSTER.videoId)) {
        downloads.set(
          FEATURED_CASE_POSTER.videoId,
          downloadSource(FEATURED_CASE_POSTER.videoId, workDir),
        );
      }
      results.push(
        renderFeaturedCasePoster(downloads.get(FEATURED_CASE_POSTER.videoId), OUTPUT_DIR),
      );
    }

    console.log(JSON.stringify(results, null, 2));
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2));
}
