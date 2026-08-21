import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SreMechanism } from '../SreMechanism';

describe('SreMechanism', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<SreMechanism />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<SreMechanism />);
    const desc = container.querySelector('desc')?.textContent ?? '';
    expect(desc.length).toBeGreaterThan(40);
    expect(desc).toMatch(/refusal|bounded autonomy|policy boundary/i);
  });

  it('renders a single accessible SVG on a panel ground', () => {
    const { container } = render(<SreMechanism />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    expect(container.querySelector('svg')).toHaveAttribute('data-ground', 'panel');
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<SreMechanism />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(8);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<SreMechanism />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(10);
  });

  it('uses the approved product name and no banned legacy names', () => {
    const { container } = render(<SreMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Aiden for SRE/);
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('ports the Figma investigation ladder and footer labels', () => {
    const { container } = render(<SreMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Infra Drift Present/i);
    expect(text).toMatch(/P1 Alert Fires/i);
    expect(text).toMatch(/Root Cause Established/i);
    expect(text).toMatch(/Remediation Deployed/i);
    expect(text).toMatch(/Service Restored/i);
    expect(text).toMatch(/OCG - Operational Context Graph/i);
    expect(text).toMatch(/Temporal orchestrates sequencing/i);
    expect(text).toMatch(/OPA enforces policy at each action boundary/i);
  });

  it('marks the policy refusal boundary for motion and a11y', () => {
    const { container } = render(<SreMechanism />);
    const boundary = container.querySelector('[data-part="refusal-boundary"]');
    expect(boundary).not.toBeNull();
    expect(boundary?.textContent).toMatch(/Deploy/i);
  });

  it('bounds wrapped copy so translated text cannot overflow plates', () => {
    const { container } = render(<SreMechanism />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (node) => node.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const node of wrapped) {
      expect(node.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<SreMechanism />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
