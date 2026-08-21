import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdfLifecycleDiagram } from '../AdfLifecycleDiagram';

describe('AdfLifecycleDiagram', () => {
  it('exposes an accessible name through its title and description', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const labelledBy = svg.getAttribute('aria-labelledby')?.split(/\s+/) ?? [];
    expect(labelledBy).toHaveLength(2);
    expect(container.querySelector(`#${labelledBy[0]}`)?.textContent).toBeTruthy();
    expect(container.querySelector(`#${labelledBy[1]}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders labels as real SVG text, never paths', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('uses no banned product name', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('bounds every wrapped block so translated copy cannot overflow its plate', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (text) => text.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const text of wrapped) {
      expect(text.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('renders four lifecycle cards on one grounded panel', () => {
    const { container } = render(<AdfLifecycleDiagram />);
    expect(container.querySelectorAll('[data-part="step-card"]')).toHaveLength(4);
    expect(container.querySelector('[data-part="panel-ground"]')).not.toBeNull();
  });
});
