import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Marquee } from '../Marquee';

beforeEach(() => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as never;
});

describe('Marquee', () => {
  it('holds still under reduced motion', () => {
    const { container } = render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);
    expect(container.querySelector('[data-part="track"]')?.getAttribute('data-animated')).toBe('false');
  });

  it('names the group for assistive technology', () => {
    render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);
    expect(screen.getByRole('list', { name: 'Clouds' })).toBeInTheDocument();
  });
});
