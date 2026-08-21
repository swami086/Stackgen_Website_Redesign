import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dir = join(process.cwd(), 'public/product');

type ClipDef = {
  name: string;
  surface: 'home' | 'sre' | 'automation' | 'infrastructure' | 'observability';
  videoId: string;
  durationSeconds: number;
  width: number;
};

type PosterDef = {
  name: string;
  videoId: string;
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
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir).filter((f) => /\.(webm|mp4)$/.test(f))) {
      expect(statSync(join(dir, f)).size, f).toBeLessThanOrEqual(BUDGET_BYTES);
    }
  });

  it('ships a poster beside every clip', () => {
    if (!existsSync(dir)) return;
    const files = readdirSync(dir);
    for (const f of files.filter((f) => f.endsWith('.webm'))) {
      expect(files, `poster for ${f}`).toContain(f.replace('.webm', '.webp'));
    }
  });
});
