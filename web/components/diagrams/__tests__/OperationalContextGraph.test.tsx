import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OperationalContextGraph } from '../OperationalContextGraph';

describe('OperationalContextGraph', () => {
  function renderVariant(variant: 'home' | 'platform') {
    return render(<OperationalContextGraph variant={variant} />);
  }

  function svgTextContent(container: HTMLElement) {
    return [...container.querySelectorAll('text')]
      .map((text) => {
        const tspans = [...text.querySelectorAll('tspan')].map((tspan) => tspan.textContent ?? '');
        return tspans.length > 0 ? tspans.join(' ') : (text.textContent ?? '');
      })
      .join(' ');
  }

  it('uses one accessible svg with title and description ids', () => {
    const { container } = renderVariant('home');
    expect(container.querySelectorAll('svg')).toHaveLength(1);

    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    expect(svg).toHaveAttribute('data-ground', 'panel');

    const labelledBy = svg.getAttribute('aria-labelledby')?.split(/\s+/) ?? [];
    expect(labelledBy).toHaveLength(2);
    expect(container.querySelector(`#${labelledBy[0]}`)?.tagName.toLowerCase()).toBe('title');
    expect(container.querySelector(`#${labelledBy[1]}`)?.tagName.toLowerCase()).toBe('desc');
  });

  it('describes the flow for screen readers', () => {
    const { container } = renderVariant('home');
    expect(container.querySelector('desc')?.textContent).toMatch(
      /topology|change|drift|incident|observability/i,
    );
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = renderVariant('home');
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = renderVariant('home');
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = renderVariant('home');
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('uses no banned product name', () => {
    const { container } = renderVariant('platform');
    expect(container.textContent ?? '').not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('uses the Figma platform viewBox instead of the old page-sized geometry', () => {
    const { container } = renderVariant('platform');
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 1248.35205078125 555.1572265625',
    );
  });

  it('renders the Figma card copy for the platform variant', () => {
    const { container } = renderVariant('platform');
    const text = svgTextContent(container);
    expect(text).toContain('Infrastructure Topology');
    expect(text).toContain('Current state and relationships of resources');
    expect(text).toContain('Change Attribution');
    expect(text).toContain('IaC changes and timestamps.');
    expect(text).toContain('Drift History');
    expect(text).toContain('Divergence from desired state');
    expect(text).toContain('Incident Causality');
    expect(text).toContain('Infrastructure patterns linked to incident classes.');
    expect(text).toContain('Observability Correlations');
    expect(text).toContain('Infrastructure states linked to anomalies.');
    expect(text).toContain('OCG Shared Intel');
  });

  it('keeps wrapped diagram copy within a bounded line budget', () => {
    const { container } = renderVariant('platform');
    const wrapped = [...container.querySelectorAll('text')].filter(
      (text) => text.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const text of wrapped) {
      expect(text.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });
});
