import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FinalCta } from '../FinalCta';
import home from '@/content/home';

describe('Home Final CTA', () => {
  it('renders the heading as h2', () => {
    render(<FinalCta content={home.finalCta} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      home.finalCta.heading,
    );
  });

  it('offers Schedule demo as the primary action', () => {
    render(<FinalCta content={home.finalCta} />);
    expect(screen.getByRole('link', { name: 'Schedule demo' })).toHaveAttribute(
      'href',
      '/schedule-demo',
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<FinalCta content={home.finalCta} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
