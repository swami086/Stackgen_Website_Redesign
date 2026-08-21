import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InfrastructureMechanism } from '../InfrastructureMechanism';

describe('InfrastructureMechanism', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<InfrastructureMechanism />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<InfrastructureMechanism />);
    const desc = container.querySelector('desc')?.textContent ?? '';
    expect(desc.length).toBeGreaterThan(40);
    expect(desc).toMatch(/policy|migration|rollback|Factory Spec|intent/i);
  });

  it('renders a single accessible SVG on a panel ground', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    expect(container.querySelector('svg')).toHaveAttribute('data-ground', 'panel');
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(6);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(10);
  });

  it('uses the approved product name and no banned legacy names', () => {
    const { container } = render(<InfrastructureMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Aiden for Infrastructure/);
    expect(text).not.toMatch(/InfraOps|Aiden for DevOps|Olly/);
  });

  it('ports the Figma migration card and supporting callouts', () => {
    const { container } = render(<InfrastructureMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/IaC Translation/i);
    expect(text).toMatch(/Performance Baselines/i);
    expect(text).toMatch(/Threshold Rollbacks/i);
    expect(text).toMatch(/Policy-Bounded Migration Pipeline/i);
    expect(text).toMatch(/Timeline Compression/i);
    expect(text).toMatch(/Early Access/i);
  });

  it('bounds wrapped copy so translated text cannot overflow plates', () => {
    const { container } = render(<InfrastructureMechanism />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (node) => node.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const node of wrapped) {
      expect(node.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
