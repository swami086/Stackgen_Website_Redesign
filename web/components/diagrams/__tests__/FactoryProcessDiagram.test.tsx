import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FactoryProcessDiagram } from '../FactoryProcessDiagram';

describe('FactoryProcessDiagram', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<FactoryProcessDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const labelledBy = svg.getAttribute('aria-labelledby')?.split(/\s+/) ?? [];
    expect(container.querySelector(`#${labelledBy[0]}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<FactoryProcessDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<FactoryProcessDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<FactoryProcessDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<FactoryProcessDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
