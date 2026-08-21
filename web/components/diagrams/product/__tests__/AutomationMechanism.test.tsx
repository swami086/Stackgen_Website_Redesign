import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AutomationMechanism } from '../AutomationMechanism';

describe('AutomationMechanism', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<AutomationMechanism />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<AutomationMechanism />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('renders a single accessible SVG on a panel ground', () => {
    const { container } = render(<AutomationMechanism />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    expect(container.querySelector('svg')).toHaveAttribute('data-ground', 'panel');
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<AutomationMechanism />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(6);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<AutomationMechanism />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(10);
  });

  it('uses the approved product name and no banned legacy names', () => {
    const { container } = render(<AutomationMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Aiden for Automation/);
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('ports the Figma pipeline stages and supporting callouts', () => {
    const { container } = render(<AutomationMechanism />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Code Repository/i);
    expect(text).toMatch(/Source/i);
    expect(text).toMatch(/Build/i);
    expect(text).toMatch(/Test & Validation/i);
    expect(text).toMatch(/Staging Deploy/i);
    expect(text).toMatch(/UAT\/PERF Test/i);
    expect(text).toMatch(/Production Deploy/i);
    expect(text).toMatch(/Live Application/i);
    expect(text).toMatch(/Monitoring & logs/i);
    expect(text).toMatch(/OCG Operational Context Graph/i);
    expect(text).toMatch(/Active Gating/i);
    expect(text).toMatch(/Self-Verification/i);
    expect(text).toMatch(/<3%/);
    expect(text).toMatch(/Zero/);
  });

  it('bounds wrapped copy so translated text cannot overflow plates', () => {
    const { container } = render(<AutomationMechanism />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (node) => node.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const node of wrapped) {
      expect(node.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<AutomationMechanism />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
