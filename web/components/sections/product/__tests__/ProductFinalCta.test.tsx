import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import infrastructure from '@/content/product-infrastructure';
import { ProductFinalCta } from '../ProductFinalCta';

describe('ProductFinalCta', () => {
  it('renders the heading as h2', () => {
    render(<ProductFinalCta content={infrastructure.finalCta} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      infrastructure.finalCta.heading,
    );
  });

  it('offers Schedule demo as the primary action', () => {
    render(<ProductFinalCta content={infrastructure.finalCta} />);
    expect(screen.getByRole('link', { name: 'Schedule demo' })).toHaveAttribute(
      'href',
      '/schedule-demo',
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<ProductFinalCta content={infrastructure.finalCta} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
