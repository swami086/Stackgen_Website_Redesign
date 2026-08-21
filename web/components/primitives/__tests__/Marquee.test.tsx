import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Marquee } from '../Marquee';

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as never;
}

beforeEach(() => {
  setReducedMotion(true);
});

describe('Marquee', () => {
  it('holds still under reduced motion', () => {
    const { container } = render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);
    expect(container.querySelector('[data-part="track"]')?.getAttribute('data-animated')).toBe('false');
  });

  it('renders a fully readable static list under reduced motion', () => {
    const items = ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Terraform', 'Docker'];
    const { container } = render(<Marquee items={items} label="Clouds" />);

    expect(container.querySelector('[data-part="viewport"]')).toBeNull();

    const lists = container.querySelectorAll('[data-part="list"]');
    expect(lists).toHaveLength(1);

    for (const item of items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('duplicates the list into a masked animated lane for seamless looping', () => {
    setReducedMotion(false);
    const { container } = render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);

    const viewport = container.querySelector<HTMLElement>('[data-part="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport?.style.maskImage).toContain('linear-gradient');

    const lists = container.querySelectorAll('[data-part="list"]');
    expect(lists).toHaveLength(2);
    expect(lists[1]?.getAttribute('aria-hidden')).toBe('true');
  });

  it('names the group for assistive technology', () => {
    render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);
    expect(screen.getByRole('list', { name: 'Clouds' })).toBeInTheDocument();
  });
});
