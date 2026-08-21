import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Reveal } from '../Reveal';

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private cb: IntersectionObserverCallback) {}
      observe() {
        this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as never);
      }
      disconnect() {}
      unobserve() {}
    },
  );
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as never;
});

describe('Reveal', () => {
  it('renders its children', () => {
    render(
      <Reveal>
        <p>Policy evaluated at every boundary.</p>
      </Reveal>,
    );
    expect(screen.getByText('Policy evaluated at every boundary.')).toBeInTheDocument();
  });

  it('animates only transform and opacity, never layout properties', () => {
    const { container } = render(
      <Reveal>
        <p>Body</p>
      </Reveal>,
    );
    const el = container.firstElementChild as HTMLElement;
    const style = el.getAttribute('style') ?? '';
    expect(el.tagName).toBe('DIV');
    expect(el.style.transform).toBe('translateY(0)');
    expect(el.style.transition).toBe(
      'opacity 600ms cubic-bezier(0.32,0.72,0,1) 0ms, transform 600ms cubic-bezier(0.32,0.72,0,1) 0ms',
    );
    expect(style).not.toMatch(/(^|;)\s*(top|left|width|height)\s*:/);
  });

  it('renders content at final state when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as never;
    const { container } = render(
      <Reveal>
        <p>Body</p>
      </Reveal>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.opacity === '' || el.style.opacity === '1').toBe(true);
  });

  it('renders content at final state when browser motion APIs are unavailable', () => {
    vi.unstubAllGlobals();
    const { container } = render(
      <Reveal>
        <p>Body</p>
      </Reveal>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('DIV');
    expect(el.style.opacity === '' || el.style.opacity === '1').toBe(true);
  });
});
