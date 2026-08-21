import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '../Hero';
import home from '@/content/home';

describe('Home Hero', () => {
  it('renders the h1 from content', () => {
    render(<Hero content={home.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(home.hero.h1);
  });

  it('offers Schedule demo as the primary action', () => {
    render(<Hero content={home.hero} />);
    expect(screen.getByRole('link', { name: 'Schedule demo' })).toHaveAttribute(
      'href',
      '/schedule-demo',
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<Hero content={home.hero} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
