import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import platform from '@/content/platform';
import { AidenOsLinks } from '../AidenOsLinks';

const content = { aidenOs: platform.aidenOs, productLinks: platform.productLinks };

describe('AidenOsLinks', () => {
  it('renders the section heading and is no longer a stub', () => {
    render(<AidenOsLinks content={content} />);

    expect(
      screen.getByRole('heading', { level: 2, name: platform.aidenOs.heading }),
    ).toBeInTheDocument();
    expect(document.querySelector('[data-stub="AidenOsLinks"]')).toBeNull();
  });

  it('cross-links to all four product routes', () => {
    render(<AidenOsLinks content={content} />);

    expect(screen.getByRole('link', { name: 'Aiden for Infrastructure' })).toHaveAttribute(
      'href',
      '/product/aiden-for-infrastructure',
    );
    expect(screen.getByRole('link', { name: 'Aiden for Automation' })).toHaveAttribute(
      'href',
      '/product/aiden-for-automation',
    );
    expect(screen.getByRole('link', { name: 'Aiden for Observability' })).toHaveAttribute(
      'href',
      '/product/aiden-for-observability',
    );
    expect(screen.getByRole('link', { name: 'Aiden for SRE' })).toHaveAttribute(
      'href',
      '/product/aiden-for-sre',
    );
  });
});
