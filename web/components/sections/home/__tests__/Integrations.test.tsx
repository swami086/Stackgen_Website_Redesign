import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FEATURED_TOOL_LOGOS, Integrations } from '../Integrations';
import home from '@/content/home';

vi.mock('next/image', () => ({
  default: ({
    alt,
    width,
    height,
    src,
  }: {
    alt: string;
    width: number;
    height: number;
    src: string;
  }) => <img alt={alt} width={width} height={height} src={src} />,
}));

describe('Home Integrations', () => {
  it('renders every featured tool logo with an accessible name', () => {
    render(<Integrations content={home.integrations} />);
    for (const logo of FEATURED_TOOL_LOGOS) {
      expect(screen.getByAltText(logo.name)).toBeInTheDocument();
    }
  });

  it('renders the section heading from content', () => {
    render(<Integrations content={home.integrations} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.integrations.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<Integrations content={home.integrations} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
