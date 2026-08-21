import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProblemDiagram } from '../ProblemDiagram';

describe('ProblemDiagram', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<ProblemDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('uses no banned product name', () => {
    const { container } = render(<ProblemDiagram />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('bounds every wrapped block so translated copy cannot overflow its plate', () => {
    const { container } = render(<ProblemDiagram />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (text) => text.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);

    for (const text of wrapped) {
      expect(text.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('renders the Figma source structure on a panel ground', () => {
    const { container } = render(<ProblemDiagram />);
    const svg = container.querySelector('svg')!;

    expect(svg).toHaveAttribute('data-ground', 'panel');
    expect(container).toHaveTextContent('Software Creation (Dev)');
    expect(container).toHaveTextContent('Software Operations');
    expect(container).toHaveTextContent('AI-Accelerated Speed');
    expect(container).toHaveTextContent('2X');
    expect(container).toHaveTextContent('1x');
    expect(container).toHaveTextContent('PR Volume');
    expect(container).toHaveTextContent('No Boost');
    expect(container).toHaveTextContent('AI Coding Assistants:');
    expect(container).toHaveTextContent('PR Acceleration:');
    expect(container).toHaveTextContent('Operations Stagnation:');
    expect(container).toHaveTextContent('Reliability Gap:');
    expect(container).toHaveTextContent('Gap');
  });

  it('renders citations as visible evidence text when callers provide them', () => {
    const citations = [
      { claim: 'Claim one stays visible.', source: 'Source one' },
      { claim: 'Claim two stays visible.', source: 'Source two' },
      { claim: 'Claim three stays visible.', source: 'Source three' },
    ] as const;

    const { container } = render(<ProblemDiagram citations={citations} />);

    expect(container).toHaveTextContent('Claim one stays visible.');
    expect(container).toHaveTextContent('Source one');
    expect(container).toHaveTextContent('Claim two stays visible.');
    expect(container).toHaveTextContent('Source two');
    expect(container).toHaveTextContent('Claim three stays visible.');
    expect(container).toHaveTextContent('Source three');
  });

  it('uses the source-derived operations badge geometry', () => {
    const { container } = render(<ProblemDiagram />);
    const badge = container.querySelector('[data-part="operations-title-badge"]');
    const icon = badge?.querySelector('rect');
    const label = badge?.querySelector('text');

    expect(icon).toHaveAttribute('x', '982.5');
    expect(icon).toHaveAttribute('y', '100.67906188964844');
    expect(icon).toHaveAttribute('width', '29');
    expect(icon).toHaveAttribute('height', '29');
    expect(label).toHaveAttribute('x', '1021.6360359191895');
    expect(label).toHaveTextContent('Software Operations');
  });
});
