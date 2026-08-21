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
    expect(desc).toMatch(/policy-checked|Factory Spec|intent/i);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<InfrastructureMechanism />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('surfaces policy-checked plan and diff language from content', () => {
    const { container } = render(<InfrastructureMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Policy-checked plan reviewed/i);
    expect(text).toMatch(/diffable infrastructure plan/i);
  });
});
