import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Logos } from '../Logos';
import home from '@/content/home';
import { CUSTOMER_LOGOS } from '@/content/shared';

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

describe('Home Logos', () => {
  it('renders every customer logo with an accessible name', () => {
    render(<Logos content={home.logos} />);
    for (const logo of CUSTOMER_LOGOS) {
      expect(screen.getByAltText(logo.name)).toBeInTheDocument();
    }
  });

  it('renders exactly twelve logos', () => {
    render(<Logos content={home.logos} />);
    expect(screen.getAllByRole('img')).toHaveLength(12);
  });

  it('is no longer a stub', () => {
    const { container } = render(<Logos content={home.logos} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
