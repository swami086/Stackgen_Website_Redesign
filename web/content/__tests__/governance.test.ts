import { describe, expect, it } from 'vitest';
import home from '../home';
import platform from '../platform';
import caseGreythr from '../case-greythr';
import type { Quote, Metric } from '@/lib/types';

const BANNED = [/\bOlly\b/i, /Aiden for InfraOps/i, /Aiden for DevOps/i,
                /single pane of glass/i, /\u2014/];

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

describe('content governance', () => {
  const modules = { home, platform, caseGreythr };

  for (const [name, mod] of Object.entries(modules)) {
    it(`${name} contains no banned terms`, () => {
      for (const text of allStrings(mod)) {
        for (const pattern of BANNED) {
          expect(text, `"${text}" matched ${pattern}`).not.toMatch(pattern);
        }
      }
    });
  }

  it('every quote declares its status', () => {
    const quotes = allQuotes(home);
    expect(quotes.length).toBeGreaterThan(0);
    for (const q of quotes) {
      expect(['published', 'placeholder']).toContain(q.status);
      if (q.status === 'published') expect(q.sourceUrl).toMatch(/^https:\/\//);
    }
  });

  it('every metric cites a mechanism', () => {
    for (const m of allMetrics(home)) {
      expect(m.mechanism.trim().length).toBeGreaterThan(0);
    }
  });
});

function allQuotes(value: unknown): Quote[] {
  if (Array.isArray(value)) return value.flatMap(allQuotes);
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if (typeof v.text === 'string' && typeof v.status === 'string') return [v as unknown as Quote];
    return Object.values(v).flatMap(allQuotes);
  }
  return [];
}

function allMetrics(value: unknown): Metric[] {
  if (Array.isArray(value)) return value.flatMap(allMetrics);
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if (typeof v.value === 'string' && typeof v.mechanism === 'string') return [v as unknown as Metric];
    return Object.values(v).flatMap(allMetrics);
  }
  return [];
}
