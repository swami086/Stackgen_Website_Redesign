import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import infrastructure from '@/content/product-infrastructure';
import { EarlyAccessStrip } from '../EarlyAccessStrip';

describe('EarlyAccessStrip', () => {
  it('renders the early access heading and accent label', () => {
    render(<EarlyAccessStrip content={infrastructure.earlyAccess!} />);
    expect(
      screen.getByRole('heading', { level: 2, name: infrastructure.earlyAccess!.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(infrastructure.earlyAccess!.label)).toBeInTheDocument();
  });

  it('offers Schedule demo as the primary action', () => {
    render(<EarlyAccessStrip content={infrastructure.earlyAccess!} />);
    expect(screen.getByRole('link', { name: 'Schedule demo' })).toHaveAttribute(
      'href',
      '/schedule-demo',
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<EarlyAccessStrip content={infrastructure.earlyAccess!} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
