import { describe, expect, it } from 'vitest';
import { findSensitive, SENSITIVE_RULES } from '../redaction';

// R2 / R9: product footage carries live identifiers. A ten second clip is ~300
// frames, so segments are cleared by selection and this scanner is the gate.
describe('findSensitive', () => {
  it('flags a bare AWS account id', () => {
    const hits = findSensitive('Account 180217099948 scanned in us-west-2');
    expect(hits.map((h) => h.rule)).toContain('aws-account-id');
    expect(hits[0].match).toBe('180217099948');
  });

  it('flags an ARN', () => {
    const hits = findSensitive('arn:aws:s3:::prathvi-aiden-infra-backend-bucket');
    expect(hits.map((h) => h.rule)).toContain('arn');
  });

  it('flags an internal bucket name observed in the audit footage', () => {
    const hits = findSensitive('stackgen-terraform-state-bucket-a928b57');
    expect(hits.map((h) => h.rule)).toContain('state-bucket');
  });

  it('flags an email address', () => {
    const hits = findSensitive('owner: dana.okafor@stackgen.com');
    expect(hits.map((h) => h.rule)).toContain('email');
  });

  it('flags a bearer token without echoing its value into the report', () => {
    const hits = findSensitive('Authorization: Bearer sk-live-abc123def456ghi789');
    const hit = hits.find((h) => h.rule === 'token');
    expect(hit).toBeDefined();
    expect(hit!.match).toBe('[redacted]');
  });

  it('passes copy that carries no identifiers', () => {
    expect(findSensitive('Three of four policies auto-cleared.')).toEqual([]);
  });

  it('does not flag a plain twelve digit measurement as an account id', () => {
    expect(findSensitive('duration 1.802170999 seconds')).toEqual([]);
  });

  it('reports every distinct hit, not just the first', () => {
    const hits = findSensitive('180217099948 and ops@stackgen.com');
    expect(hits).toHaveLength(2);
  });

  // Found by running the scanner against strings actually observed in
  // i31kMgVn_Xk: the first rule set passed all three of these.
  it('flags an internal bucket carrying an engineer name', () => {
    const hits = findSensitive('prathvi-aiden-infra-backend-bucket');
    expect(hits.map((h) => h.rule)).toContain('infra-resource');
  });

  it('flags internal report buckets', () => {
    const hits = findSensitive('aiden-eval-reports and sg-deployment-test-statefiles');
    expect(hits.map((h) => h.rule)).toContain('infra-resource');
  });

  it('flags an internal hostname', () => {
    const hits = findSensitive('retroboard.demo.appcd.io');
    expect(hits.map((h) => h.rule)).toContain('internal-host');
  });

  it('does not flag the product route slug, which is public', () => {
    expect(findSensitive('/product/aiden-for-infrastructure')).toEqual([]);
  });

  it('does not flag the public marketing domain', () => {
    expect(findSensitive('https://stackgen.com/case-studies/greythr')).toEqual([]);
  });

  it('exposes its rule set so the spec and the scanner cannot drift apart', () => {
    expect(SENSITIVE_RULES.map((r) => r.name)).toEqual(
      expect.arrayContaining(['aws-account-id', 'arn', 'state-bucket', 'email', 'token']),
    );
  });
});
