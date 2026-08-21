import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlatformFinalCta } from '../PlatformFinalCta';
import platform from '@/content/platform';

describe('PlatformFinalCta', () => {
  it('renders heading, body, and schedule demo CTA', () => {
    render(<PlatformFinalCta content={platform.finalCta} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      platform.finalCta.heading,
    );
    expect(screen.getByText(platform.finalCta.body)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: platform.finalCta.cta.label }),
    ).toHaveAttribute('href', '/schedule-demo');
  });

  it('is no longer a stub', () => {
    const { container } = render(<PlatformFinalCta content={platform.finalCta} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
