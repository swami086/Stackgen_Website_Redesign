/**
 * Sensitive-identifier scanner for product footage (spec R2 / R9).
 *
 * A ten second clip is roughly 300 frames and all of them ship, so segments are
 * cleared by selection rather than edited frame by frame. This is the gate that
 * proves a selection was clean.
 *
 * Run against OCR'd frame text or any string extracted from a candidate segment.
 */

export type SensitiveRule = {
  name: string;
  pattern: RegExp;
  /** Never echo the matched value into a report. */
  redactMatch?: boolean;
};

export const SENSITIVE_RULES: SensitiveRule[] = [
  // 12 consecutive digits, not part of a longer number or a decimal.
  { name: 'aws-account-id', pattern: /(?<![\d.])\d{12}(?![\d.])/g },
  { name: 'arn', pattern: /arn:aws[\w-]*:[\w-]*:[^\s]*/gi },
  { name: 'state-bucket', pattern: /[\w-]*(?:terraform|tfstate|state)-?bucket[\w-]*/gi },
  { name: 'email', pattern: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { name: 'token', pattern: /\b(?:Bearer\s+|sk-|ghp_|xox[baprs]-)[\w-]{8,}/gi, redactMatch: true },
  // Hyphenated resource names carrying an infrastructure noun. Keyword-gated so
  // public route slugs such as aiden-for-infrastructure stay clear.
  {
    name: 'infra-resource',
    pattern:
      /\b[a-z0-9]+(?:-[a-z0-9]+)*-(?:bucket|buckets|backend|statefile|statefiles|tfstate|states?|reports?|snapshots?|sandbox|deploy|deployment)\b/g,
  },
  // Non-public hosts. The marketing domain is deliberately excluded.
  { name: 'internal-host', pattern: /\b[\w-]+(?:\.[\w-]+)*\.(?:internal|local|appcd\.io)\b/gi },
];

export type SensitiveHit = { rule: string; match: string; index: number };

export function findSensitive(text: string): SensitiveHit[] {
  const hits: SensitiveHit[] = [];
  for (const rule of SENSITIVE_RULES) {
    for (const m of text.matchAll(rule.pattern)) {
      hits.push({
        rule: rule.name,
        match: rule.redactMatch ? '[redacted]' : m[0],
        index: m.index ?? 0,
      });
    }
  }
  return hits.sort((a, b) => a.index - b.index);
}
