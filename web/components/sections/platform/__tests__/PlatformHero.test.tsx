import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlatformHero } from '../PlatformHero';
import platform from '@/content/platform';

describe('PlatformHero', () => {
  it('renders h1, sub, support, and schedule demo CTA', () => {
    render(<PlatformHero content={platform.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(platform.hero.h1);
    expect(screen.getByText(platform.hero.sub)).toBeInTheDocument();
    expect(screen.getByText(platform.hero.support)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: platform.hero.cta.label })).toHaveAttribute(
      'href',
      '/schedule-demo',
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<PlatformHero content={platform.hero} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
