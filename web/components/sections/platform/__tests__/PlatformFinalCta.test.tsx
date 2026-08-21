import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlatformFinalCta } from '../PlatformFinalCta';
import platform from '@/content/platform';

describe('PlatformFinalCta', () => {
  it('renders heading and schedule demo CTA, and no body paragraph', () => {
    render(<PlatformFinalCta content={platform.finalCta} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      platform.finalCta.heading,
    );
    // Canvas `q8grMq` closes with heading + CTA only; no body paragraph.
    expect(screen.queryByText(platform.finalCta.body)).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: platform.finalCta.cta.label }),
    ).toHaveAttribute('href', '/schedule-demo');
  });

  it('is no longer a stub', () => {
    const { container } = render(<PlatformFinalCta content={platform.finalCta} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
