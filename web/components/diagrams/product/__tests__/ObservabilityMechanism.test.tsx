import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ObservabilityMechanism } from '../ObservabilityMechanism';

describe('ObservabilityMechanism', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<ObservabilityMechanism />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<ObservabilityMechanism />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('renders a single accessible SVG on a panel ground', () => {
    const { container } = render(<ObservabilityMechanism />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    expect(container.querySelector('svg')).toHaveAttribute('data-ground', 'panel');
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<ObservabilityMechanism />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(6);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<ObservabilityMechanism />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(6);
  });

  it('uses the approved product name and no banned legacy names', () => {
    const { container } = render(<ObservabilityMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Aiden for Observability|Observe to remediate/i);
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('keeps wrapped copy within the configured line budget', () => {
    const { container } = render(<ObservabilityMechanism />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (node) => node.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const node of wrapped) {
      expect(node.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<ObservabilityMechanism />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
