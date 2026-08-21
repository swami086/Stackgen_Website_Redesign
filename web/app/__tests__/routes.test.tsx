import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '../page';
import PricingPage from '../pricing/page';

describe('routes', () => {
  it('home renders exactly one h1 inside a main landmark', () => {
    render(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('home has nav and footer landmarks', () => {
    render(<HomePage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('home renders the lifecycle section once without the old loop heading', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'From intent to automated learning' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        level: 2,
        name: 'Build, Operate, observe, remediate.',
      }),
    ).not.toBeInTheDocument();
  });

  it('coming-soon pages still offer the primary CTA', () => {
    render(<PricingPage />);
    expect(screen.getAllByRole('link', { name: 'Schedule demo' }).length).toBeGreaterThan(0);
  });
});
