import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { AdfLoopDiagram } from '../AdfLoopDiagram';

describe('AdfLoopDiagram', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(
      <AdfLoopDiagram stages={home.adfLoop.stages} />,
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const labelledBy = svg.getAttribute('aria-labelledby')?.split(/\s+/) ?? [];
    expect(container.querySelector(`#${labelledBy[0]}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(
      <AdfLoopDiagram stages={home.adfLoop.stages} />,
    );
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(
      40,
    );
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(
      <AdfLoopDiagram stages={home.adfLoop.stages} />,
    );
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(
      <AdfLoopDiagram stages={home.adfLoop.stages} />,
    );
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(
      <AdfLoopDiagram stages={home.adfLoop.stages} />,
    );
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('renders custom legacy stages through the compatibility wrapper', () => {
    const stages = [
      {
        index: '11',
        title: 'Alpha custom stage',
        product: 'Alpha product',
        body: 'Alpha body should survive the wrapper.',
      },
      {
        index: '12',
        title: 'Beta custom stage',
        product: 'Beta product',
        body: 'Beta body should survive the wrapper.',
      },
      {
        index: '13',
        title: 'Gamma custom stage',
        product: 'Gamma product',
        body: 'Gamma body should survive the wrapper.',
      },
      {
        index: '14',
        title: 'Delta custom stage',
        product: 'Delta product',
        body: 'Delta body should survive the wrapper.',
      },
    ] as const;

    const { container } = render(<AdfLoopDiagram stages={stages} />);

    expect(container).toHaveTextContent('Alpha custom stage');
    expect(container).toHaveTextContent('Alpha body should survive the wrapper.');
    expect(container).toHaveTextContent('Delta custom stage');
    expect(container).toHaveTextContent('Delta body should survive the wrapper.');
    expect(container).not.toHaveTextContent('Intent');
    expect(container).not.toHaveTextContent('Factory Learning');
  });
});
