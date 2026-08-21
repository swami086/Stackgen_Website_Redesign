import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ButtonGhost } from '../ButtonGhost';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('ButtonGhost', () => {
  it('renders a link with an accessible name and no accent fill', () => {
    render(<ButtonGhost href="/platform">Learn more</ButtonGhost>);
    const link = screen.getByRole('link', { name: 'Learn more' });
    expect(link).toHaveAttribute('href', '/platform');
    expect(link.className).not.toMatch(/bg-accent/);
  });
});
