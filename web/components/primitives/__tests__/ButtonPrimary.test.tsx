import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ButtonPrimary } from '../ButtonPrimary';

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

describe('ButtonPrimary', () => {
  it('renders as a link with an accessible name', () => {
    render(<ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>);
    const link = screen.getByRole('link', { name: 'Schedule demo' });
    expect(link).toHaveAttribute('href', '/schedule-demo');
  });
});
