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
});
