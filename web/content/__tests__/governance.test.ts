import { describe, expect, it } from 'vitest';
import home from '../home';
import platform from '../platform';
import caseGreythr from '../case-greythr';
import caseInnovaccer from '../case-innovaccer';
import caseIndex from '../case-index';
import scheduleDemo from '../schedule-demo';
import productInfrastructure from '../product-infrastructure';
import productAutomation from '../product-automation';
import productObservability from '../product-observability';
import productSre from '../product-sre';
import industries from '../industries';
import { CUSTOMER_LOGOS } from '../shared';
import type { Quote, Metric } from '@/lib/types';

const BANNED = [/\bOlly\b/i, /Aiden for InfraOps/i, /Aiden for DevOps/i,
                /single pane of glass/i, /\u2014/];

const contentModules = {
  home,
  platform,
  caseGreythr,
  caseInnovaccer,
  caseIndex,
  scheduleDemo,
  productInfrastructure,
  productAutomation,
  productObservability,
  productSre,
  shared: { CUSTOMER_LOGOS },
};

const quoteMetricModules = Object.fromEntries(
  Object.entries(contentModules).filter(([name]) => name !== 'shared'),
);

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

describe('content governance', () => {
  for (const [name, mod] of Object.entries(contentModules)) {
    it(`${name} contains no banned terms`, () => {
      for (const text of allStrings(mod)) {
        for (const pattern of BANNED) {
          expect(text, `"${text}" matched ${pattern}`).not.toMatch(pattern);
        }
      }
    });
  }

  it('every quote declares its status', () => {
    const quotes = Object.values(quoteMetricModules).flatMap(allQuotes);
    expect(quotes.length).toBeGreaterThan(0);
    for (const q of quotes) {
      expect(['published', 'placeholder']).toContain(q.status);
      if (q.status === 'published') expect(q.sourceUrl).toMatch(/^https:\/\//);
    }
  });

  it('every metric cites a mechanism', () => {
    const metrics = Object.values(quoteMetricModules).flatMap(allMetrics);
    expect(metrics.length).toBeGreaterThan(0);
    for (const m of metrics) {
      expect(m.mechanism.trim().length).toBeGreaterThan(0);
    }
  });
});


describe('new content surfaces', () => {
  it('gives every product a copyable prompt from its own demo', () => {
    for (const [name, mod] of Object.entries({
      productInfrastructure,
      productAutomation,
      productObservability,
      productSre,
    })) {
      expect(typeof (mod as { prompt?: string }).prompt, name).toBe('string');
    }
  });

  it('ships an industry only where evidence exists', () => {
    expect(industries.length).toBeGreaterThan(0);
    for (const i of industries) {
      expect(i.evidence.length).toBeGreaterThan(20);
      expect(i.href).toBe(`/industries/${i.slug}`);
    }
  });

  it('keeps copy inside the discipline: 85% of sentences at 15 words or fewer', () => {
    const strings = allStrings(contentModules);
    const sentences = strings
      .flatMap((s) => s.split(/(?<=[.?!])\s+/))
      .map((s) => s.trim().split(/\s+/).length)
      .filter((n) => n > 3);
    const short = sentences.filter((n) => n <= 15).length;
    expect(short / sentences.length).toBeGreaterThanOrEqual(0.85);
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
