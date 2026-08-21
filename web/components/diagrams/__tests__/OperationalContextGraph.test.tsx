import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OperationalContextGraph } from '../OperationalContextGraph';

describe('OperationalContextGraph', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<OperationalContextGraph variant="home" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<OperationalContextGraph variant="home" />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<OperationalContextGraph variant="home" />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<OperationalContextGraph variant="home" />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<OperationalContextGraph variant="home" />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('switches viewBox for platform variant', () => {
    const { container } = render(<OperationalContextGraph variant="platform" />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 1440 945');
  });
});
