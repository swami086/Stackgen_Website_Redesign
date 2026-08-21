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
