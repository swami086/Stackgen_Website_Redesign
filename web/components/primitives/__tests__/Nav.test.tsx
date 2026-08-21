import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NAV_ITEMS } from '@/lib/nav';
import { Nav } from '../Nav';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    'aria-label': ariaLabel,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    'aria-label'?: string;
  }) => (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ),
}));

describe('Nav', () => {
  it('renders nav links for each item plus Schedule demo', () => {
    render(<Nav />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    for (const item of NAV_ITEMS) {
      expect(screen.getAllByRole('link', { name: item.label }).some((link) => (
        link.getAttribute('href') === item.href
      ))).toBe(true);
    }

    expect(screen.getAllByRole('link', { name: 'Schedule demo' }).some((link) => (
      link.getAttribute('href') === '/schedule-demo'
    ))).toBe(true);
  });
});
