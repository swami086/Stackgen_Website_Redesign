import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TwoPlanesDiagram } from '../TwoPlanesDiagram';

describe('TwoPlanesDiagram', () => {
  it('labels both planes as text', () => {
    const { container } = render(<TwoPlanesDiagram />);
    const text = Array.from(container.querySelectorAll('text'))
      .map((t) => t.textContent)
      .join(' ');
    expect(text).toMatch(/Deterministic/i);
    expect(text).toMatch(/Agentic/i);
  });

  it('carries motion hooks', () => {
    const { container } = render(<TwoPlanesDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(1);
  });

  it('exposes an accessible name via title', () => {
    const { container } = render(<TwoPlanesDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<TwoPlanesDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('is no longer a stub', () => {
    const { container } = render(<TwoPlanesDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
