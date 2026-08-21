import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AutomationMechanism } from '../AutomationMechanism';

describe('AutomationMechanism', () => {
  it('uses the source-derived cropped viewBox from the Figma slide bounds', () => {
    const { container } = render(<AutomationMechanism />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '66 266 1584 751');
  });

  it('pins key geometry to source coordinates instead of a remapped scaffold', () => {
    const { container } = render(<AutomationMechanism />);
    const cloudPanel = container.querySelector('[data-part="cloud-providers"] rect');
    const firstCard = container.querySelector('[data-part="pipeline-card"] rect');
    const metric = container.querySelector('[data-part="metrics"] text');
    expect(cloudPanel).toHaveAttribute('x', '418.093');
    expect(cloudPanel).toHaveAttribute('y', '266');
    expect(firstCard).toHaveAttribute('x', '69');
    expect(firstCard).toHaveAttribute('y', '410.378');
    expect(metric).toHaveAttribute('x', '66');
    expect(metric).toHaveAttribute('y', '925');
  });

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
    expect(text).toMatch(/Test\s*&\s*Validation/i);
    expect(text).toMatch(/Staging\s*Deploy/i);
    expect(text).toMatch(/UAT\/PERF\s*Test/i);
    expect(text).toMatch(/Production\s*Deploy/i);
    expect(text).toMatch(/Live\s*Application/i);
    expect(text).toMatch(/Monitoring\s*&\s*logs/i);
    expect(text).toMatch(/OCG\s*Operational\s*Context Graph/i);
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
