import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import infrastructure from '@/content/product-infrastructure';
import { ProductHero } from '../ProductHero';

describe('ProductHero', () => {
  it('renders the page h1 from content', () => {
    render(<ProductHero content={infrastructure.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      infrastructure.hero.h1,
    );
  });

  it('offers Schedule demo as the primary action', () => {
    render(<ProductHero content={infrastructure.hero} />);
    expect(screen.getByRole('link', { name: 'Schedule demo' })).toHaveAttribute(
      'href',
      '/schedule-demo',
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<ProductHero content={infrastructure.hero} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
