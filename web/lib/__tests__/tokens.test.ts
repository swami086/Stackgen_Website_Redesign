import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

function token(name: string): string {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!m) throw new Error(`token --color-${name} not found`);
  return m[1];
}

function lin(c: number) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function lum(hex: string) {
  const n = hex.slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

describe('light design system tokens', () => {
  it('renders ink on cream well above AA', () => {
    expect(contrast(token('text-primary'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders muted text on cream at AA', () => {
    expect(contrast(token('text-secondary'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders accent text on cream at AA', () => {
    expect(contrast(token('accent-text'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders cream text on the dark plate at AA', () => {
    expect(contrast(token('text-on-panel'), token('panel'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders the deck muted value on plates only, never on cream', () => {
    expect(contrast(token('text-muted-panel'), token('panel'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('text-muted-panel'), token('bg-base'))).toBeLessThan(4.5);
  });

  it('gives the primary action a cream label at AA', () => {
    expect(contrast(token('bg-base'), token('action'))).toBeGreaterThanOrEqual(4.5);
  });

  it('pairs every semantic role for both grounds', () => {
    expect(contrast(token('pass-ink'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('pass'), token('panel'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('halt-ink'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('halt'), token('panel'))).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the focus ring visible on cream', () => {
    expect(contrast(token('focus'), token('bg-base'))).toBeGreaterThanOrEqual(3);
  });

  it('drops the blanket reduced-motion override', () => {
    expect(css).not.toContain('0.01ms');
  });
});
