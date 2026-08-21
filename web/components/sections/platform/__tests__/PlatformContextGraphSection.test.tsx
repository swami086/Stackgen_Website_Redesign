import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import platform from '@/content/platform';
import { PlatformContextGraphSection } from '../PlatformContextGraphSection';

describe('PlatformContextGraphSection', () => {
  it('renders the section heading and is no longer a stub', () => {
    render(<PlatformContextGraphSection content={platform.ocg} />);

    expect(
      screen.getByRole('heading', { level: 2, name: platform.ocg.heading }),
    ).toBeInTheDocument();
    expect(document.querySelector('[data-stub="PlatformContextGraphSection"]')).toBeNull();
  });

  it('renders the platform OCG diagram variant', () => {
    const { container } = render(<PlatformContextGraphSection content={platform.ocg} />);
    expect(container.querySelector('[data-part="ocg-hub"]')).toBeInTheDocument();
  });
});
