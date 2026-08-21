import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dir = join(process.cwd(), 'public/product');
const signoffPath = join(process.cwd(), '..', '.superpowers', 'sdd', 'redaction-signoff.md');
const reportPath = join(process.cwd(), '..', '.superpowers', 'sdd', 'factory-task-6-report.md');

type ClipDef = {
  name: string;
  surface: 'home' | 'sre' | 'automation' | 'infrastructure' | 'observability';
  videoId: string;
  title: string;
  startSeconds: number;
  durationSeconds: number;
  width: number;
};

type PosterDef = {
  name: string;
  videoId: string;
  title: string;
  atSeconds: number;
  width: number;
};

type ClipsModule = {
  BUDGET_BYTES: number;
  CLIPS: ClipDef[];
  FEATURED_CASE_POSTER: PosterDef;
  OUTPUT_DIR: string;
  buildEncodePlan: (
    clip: ClipDef,
    sourcePath: string,
    outputDir?: string,
  ) => {
    webm: { args: string[] };
    mp4: { args: string[] };
    posterFrame: { args: string[] };
    poster: { command: string; args: string[] };
  };
  buildPosterFrameScanPlan: (
    asset: PosterDef,
    sourcePath: string,
    framesDir: string,
  ) => { command: string; args: string[] };
  buildOutputPaths: (
    clip: ClipDef,
    outputDir?: string,
  ) => { webm: string; mp4: string; poster: string };
};

async function loadClipsModule(): Promise<ClipsModule> {
  // @ts-expect-error Task 6 script is a runtime-only .mjs module.
  return (await import('../clips.mjs')) as ClipsModule;
}

function readMarkdown(path: string): string {
  return readFileSync(path, 'utf8');
}

function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function countLinesWithPrefix(text: string, prefix: string): number {
  return (text.match(new RegExp(`^${escapeRegExp(prefix)}.*$`, 'gm')) ?? []).length;
}

function expectSingleEvidenceLine(section: string, prefix: string, expectedLine: string) {
  const count = countLinesWithPrefix(section, prefix);
  if (count !== 1) {
    throw new Error(`${prefix} must appear exactly once per cleared-asset section.`);
  }
  expect(section).toContain(expectedLine);
}

function extractSection(markdown: string, heading: string): string {
  const marker = `### \`${heading}\``;
  const count = countLinesWithPrefix(markdown, marker);
  if (count !== 1) {
    throw new Error(`${marker} must appear in exactly 1 section.`);
  }
  const parts = markdown.split(marker);
  expect(parts).toHaveLength(2);
  const tail = parts[1] ?? '';
  const nextHeadingIndex = tail.search(/^### |^## /m);
  return (nextHeadingIndex === -1 ? tail : tail.slice(0, nextHeadingIndex)).trim();
}

function extractUnclearedSegments(markdown: string, introLine: string): string[] {
  const count = countLinesWithPrefix(markdown, introLine);
  if (count !== 1) {
    throw new Error(`${introLine} must appear exactly once.`);
  }
  const parts = markdown.split(introLine);
  expect(parts).toHaveLength(2);
  const tail = parts[1] ?? '';
  const nextHeadingIndex = tail.search(/^## /m);
  const block = nextHeadingIndex === -1 ? tail : tail.slice(0, nextHeadingIndex);
  const segments = [...block.matchAll(/^\s+- `([^`]+)`$/gm)].map((match) => match[1]);

  expect(new Set(segments).size).toBe(segments.length);
  return segments;
}

function probeMedia(path: string): {
  width: number;
  height: number;
  fps?: number;
} {
  const result = spawnSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width,height,avg_frame_rate',
      '-of',
      'json',
      path,
    ],
    { encoding: 'utf8' },
  );
  expect(result.status, result.stderr || result.stdout).toBe(0);
  const json = JSON.parse(result.stdout) as {
    streams?: Array<{ width: number; height: number; avg_frame_rate?: string }>;
  };
  const stream = json.streams?.[0];
  expect(stream).toBeDefined();

  const [numerator, denominator] = (stream?.avg_frame_rate ?? '0/1').split('/').map(Number);
  const fps = numerator > 0 && denominator > 0 ? numerator / denominator : undefined;

  return {
    width: stream?.width ?? 0,
    height: stream?.height ?? 0,
    fps,
  };
}

function expectClearedClipEvidence(markdown: string, clip: ClipDef) {
  const clipPath = join(dir, `${clip.name}.webm`);
  const mp4Path = join(dir, `${clip.name}.mp4`);
  const posterPath = join(dir, `${clip.name}.webp`);
  const clipProbe = probeMedia(clipPath);
  const posterProbe = probeMedia(posterPath);
  const frameCount = clip.durationSeconds * 30;
  const section = extractSection(markdown, clip.name);

  expectSingleEvidenceLine(section, '- source video:', `- source video: \`${clip.videoId}\` (\`${clip.title}\`)`);
  expectSingleEvidenceLine(
    section,
    '- timecodes:',
    `- timecodes: \`${formatTimestamp(clip.startSeconds)}-${formatTimestamp(clip.startSeconds + clip.durationSeconds)}\``,
  );
  expectSingleEvidenceLine(
    section,
    '- frame scan result:',
    `- frame scan result: \`${frameCount}\` frames scanned, \`0\` hits from \`findSensitive\``,
  );
  expectSingleEvidenceLine(section, '- dimensions / fps:', '- dimensions / fps:');
  expectSingleEvidenceLine(section, '  - clip:', `  - clip: \`${clipProbe.width}x${clipProbe.height} @ ${clipProbe.fps}fps\``);
  expectSingleEvidenceLine(section, '  - poster:', `  - poster: \`${posterProbe.width}x${posterProbe.height}\``);
  expectSingleEvidenceLine(section, '- byte sizes:', '- byte sizes:');
  expectSingleEvidenceLine(section, `  - \`${clip.name}.webm\`:`, `  - \`${clip.name}.webm\`: \`${statSync(clipPath).size}\``);
  expectSingleEvidenceLine(section, `  - \`${clip.name}.mp4\`:`, `  - \`${clip.name}.mp4\`: \`${statSync(mp4Path).size}\``);
  expectSingleEvidenceLine(section, `  - \`${clip.name}.webp\`:`, `  - \`${clip.name}.webp\`: \`${statSync(posterPath).size}\``);
}

function expectPosterEvidence(markdown: string, poster: PosterDef) {
  const posterPath = join(dir, `${poster.name}.webp`);
  const posterProbe = probeMedia(posterPath);
  const section = extractSection(markdown, poster.name);

  expectSingleEvidenceLine(section, '- source video:', `- source video: \`${poster.videoId}\` (\`${poster.title}\`)`);
  expectSingleEvidenceLine(section, '- timecode:', `- timecode: \`${formatTimestamp(poster.atSeconds)}\``);
  expectSingleEvidenceLine(
    section,
    '- frame scan result:',
    '- frame scan result: `1` frame scanned, `0` hits from `findSensitive`',
  );
  expectSingleEvidenceLine(section, '- dimensions:', '- dimensions:');
  expectSingleEvidenceLine(section, '  - poster:', `  - poster: \`${posterProbe.width}x${posterProbe.height}\``);
  expectSingleEvidenceLine(section, '- byte sizes:', '- byte sizes:');
  expectSingleEvidenceLine(section, `  - \`${poster.name}.webp\`:`, `  - \`${poster.name}.webp\`: \`${statSync(posterPath).size}\``);
}

describe('clips script plan', () => {
  it('plans four home surfaces and three clips per product page', async () => {
    const { CLIPS } = await loadClipsModule();
    const counts = Object.fromEntries(
      ['home', 'sre', 'automation', 'infrastructure', 'observability'].map((surface) => [surface, 0]),
    );

    for (const clip of CLIPS) counts[clip.surface] += 1;

    expect(counts).toEqual({
      home: 4,
      sre: 3,
      automation: 3,
      infrastructure: 3,
      observability: 3,
    });
  });

  it('keeps every planned clip inside the spec envelope', async () => {
    const { CLIPS } = await loadClipsModule();
    expect(CLIPS.length).toBe(16);
    for (const clip of CLIPS) {
      expect(clip.name).toMatch(/^[a-z0-9-]+$/);
      expect(clip.durationSeconds).toBeGreaterThanOrEqual(8);
      expect(clip.durationSeconds).toBeLessThanOrEqual(15);
      expect(clip.width).toBe(1440);
      expect(clip.videoId).toMatch(/^[A-Za-z0-9_-]{11}$/);
    }
  });

  it('builds silent AV1 and H.264 encodes plus a webp poster', async () => {
    const { CLIPS, OUTPUT_DIR, buildEncodePlan } = await loadClipsModule();
    const clip = CLIPS[0];
    const plan = buildEncodePlan(clip, '/tmp/source.mp4', OUTPUT_DIR);

    expect(plan.webm.args).toEqual(
      expect.arrayContaining(['-vf', 'scale=1440:-2,fps=30', '-c:v', 'libsvtav1', '-crf', '34', '-b:v', '0', '-an']),
    );
    expect(plan.mp4.args).toEqual(
      expect.arrayContaining([
        '-vf',
        'scale=1440:-2,fps=30',
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
      ]),
    );
    expect(plan.posterFrame.args).toEqual(
      expect.arrayContaining(['-vframes', '1', '-vf', 'scale=1440:-2']),
    );
    expect(plan.poster.command).toBe('cwebp');
    expect(plan.poster.args).toEqual(
      expect.arrayContaining(['-quiet', '-q', '80', '-o', join(OUTPUT_DIR, `${clip.name}.webp`)]),
    );
  });

  it('writes outputs into public/product with matching stems', async () => {
    const { CLIPS, OUTPUT_DIR, buildOutputPaths } = await loadClipsModule();
    const clip = CLIPS[0];
    const out = buildOutputPaths(clip, OUTPUT_DIR);

    expect(out.webm).toBe(join(OUTPUT_DIR, `${clip.name}.webm`));
    expect(out.mp4).toBe(join(OUTPUT_DIR, `${clip.name}.mp4`));
    expect(out.poster).toBe(join(OUTPUT_DIR, `${clip.name}.webp`));
  });

  it('plans a redaction scan for the featured-case poster before encoding it', async () => {
    const { FEATURED_CASE_POSTER, buildPosterFrameScanPlan } = await loadClipsModule();
    const plan = buildPosterFrameScanPlan(
      FEATURED_CASE_POSTER,
      '/tmp/source.mp4',
      '/tmp/poster-frames',
    );

    expect(plan.command).toBe('ffmpeg');
    expect(plan.args).toEqual(
      expect.arrayContaining([
        '-ss',
        String(FEATURED_CASE_POSTER.atSeconds),
        '-i',
        '/tmp/source.mp4',
        '-vframes',
        '1',
        '-vf',
        'scale=1440:-2',
        join('/tmp/poster-frames', 'frame-%05d.png'),
      ]),
    );
  });
});

describe('product clip budget', () => {
  it('keeps every encode under the 3 MB budget', () => {
    const { BUDGET_BYTES } = { BUDGET_BYTES: 3 * 1024 * 1024 };
    expect(existsSync(dir)).toBe(true);
    for (const f of readdirSync(dir).filter((f) => /\.(webm|mp4)$/.test(f))) {
      expect(statSync(join(dir, f)).size, f).toBeLessThanOrEqual(BUDGET_BYTES);
    }
  });

  it('ships a poster beside every clip', () => {
    expect(existsSync(dir)).toBe(true);
    const files = readdirSync(dir);
    for (const f of files.filter((f) => f.endsWith('.webm'))) {
      expect(files, `poster for ${f}`).toContain(f.replace('.webm', '.webp'));
    }
  });

  it('documents every currently cleared clip in the sign-off with actual media facts', async () => {
    const { CLIPS } = await loadClipsModule();
    const signoff = readMarkdown(signoffPath);

    for (const clip of CLIPS.filter((entry) => ['home-audit', 'home-automation'].includes(entry.name))) {
      expectClearedClipEvidence(signoff, clip);
    }
  });

  it('documents the verified featured-case poster in the sign-off with actual media facts', async () => {
    const { FEATURED_CASE_POSTER } = await loadClipsModule();
    const signoff = readMarkdown(signoffPath);

    expectPosterEvidence(signoff, FEATURED_CASE_POSTER);
  });

  it('mirrors the cleared media evidence in the Task 6 report', async () => {
    const { CLIPS, FEATURED_CASE_POSTER } = await loadClipsModule();
    const report = readMarkdown(reportPath);

    for (const clip of CLIPS.filter((entry) => ['home-audit', 'home-automation'].includes(entry.name))) {
      expectClearedClipEvidence(report, clip);
    }
    expectPosterEvidence(report, FEATURED_CASE_POSTER);
  });

  it('keeps Task 6 honestly blocked on the remaining 14 unsigned segments', async () => {
    const { CLIPS } = await loadClipsModule();
    const report = readMarkdown(reportPath);
    const uncleared = CLIPS
      .filter((clip) => !['home-audit', 'home-automation'].includes(clip.name))
      .map((clip) => clip.name);

    expect(uncleared).toHaveLength(14);
    expect(report).toContain('- `blocked`');
    expect(report).toContain('remaining `14` planned clip segments');
    for (const clipName of uncleared) {
      expect(report).toContain(`- \`${clipName}\``);
    }
  });

  it('keeps the sign-off blocked on exactly the same 14 uncleared segments as the report', () => {
    const signoff = readMarkdown(signoffPath);
    const report = readMarkdown(reportPath);

    expect(signoff).toContain('- `blocked`');
    expect(extractUnclearedSegments(signoff, '- Remaining planned clip segments are still unsigned:')).toEqual(
      extractUnclearedSegments(report, '- No clearance evidence yet for these remaining planned clip segments:'),
    );
  });

  it('rejects duplicate cleared-asset evidence stanzas before they can contradict each other', async () => {
    const { CLIPS } = await loadClipsModule();
    const signoff = readMarkdown(signoffPath);
    const clip = CLIPS.find((entry) => entry.name === 'home-audit');

    expect(clip).toBeDefined();
    const duplicated = `${signoff}\n\n### \`home-audit\`\n- source video: \`i31kMgVn_Xk\` (\`Conflicting duplicate\`)`;
    expect(() => expectClearedClipEvidence(duplicated, clip!)).toThrow(/exactly 1 section/i);
  });
});
