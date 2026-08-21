import { act, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Reveal } from '../Reveal';

let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;
let observerCallback: IntersectionObserverCallback | null;

function stubMatchMedia({
  matches = false,
  addEventListener = vi.fn(),
  removeEventListener = vi.fn(),
}: {
  matches?: boolean;
  addEventListener?: MediaQueryList['addEventListener'];
  removeEventListener?: MediaQueryList['removeEventListener'];
} = {}) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener,
      removeEventListener,
      dispatchEvent: vi.fn(),
    }),
  );
}

function stubIntersectionObserver() {
  observeSpy = vi.fn();
  disconnectSpy = vi.fn();
  observerCallback = null;

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }

      observe = observeSpy;
      disconnect = disconnectSpy;
      unobserve() {}
      takeRecords() {
        return [];
      }
    } as unknown as typeof IntersectionObserver,
  );
}

beforeEach(() => {
  stubIntersectionObserver();
  stubMatchMedia();
});

afterEach(() => {
  vi.unstubAllGlobals();
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

  it('starts hidden, then reveals after observation using only opacity and transform motion', () => {
    const { container } = render(
      <Reveal delay={120}>
        <p>Body</p>
      </Reveal>,
    );

    const el = container.firstElementChild as HTMLElement;
    const style = el.getAttribute('style') ?? '';

    expect(el.tagName).toBe('DIV');
    expect(el.className).toContain('opacity-0');
    expect(el.className).toContain('translate-y-4');
    expect(el.className).toContain('transition-[opacity,transform]');
    expect(el.style.transitionDelay).toBe('120ms');
    expect(style).not.toMatch(/(^|;)\s*(top|left|width|height)\s*:/);
    expect(observeSpy).toHaveBeenCalledTimes(1);

    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(el.className).toContain('opacity-100');
    expect(el.className).toContain('translate-y-0');
  });

  it('includes reduced-motion final-state overrides in first-render markup', () => {
    const markup = renderToStaticMarkup(
      <Reveal>
        <p>Body</p>
      </Reveal>,
    );

    expect(markup).toContain('motion-reduce:opacity-100');
    expect(markup).toContain('motion-reduce:translate-y-0');
    expect(markup).toContain('motion-reduce:transition-none');
  });

  it('does not throw when browser motion APIs are partial and keeps the observer fallback', () => {
    stubMatchMedia({
      matches: false,
      addEventListener: undefined,
      removeEventListener: undefined,
    });
    vi.stubGlobal('IntersectionObserver', undefined);

    expect(() =>
      render(
        <Reveal>
          <p>Body</p>
        </Reveal>,
      ),
    ).not.toThrow();

    const { container } = render(
      <Reveal>
        <p>Body</p>
      </Reveal>,
    );
    const el = container.firstElementChild as HTMLElement;

    expect(el.className).toContain('opacity-100');
    expect(el.className).toContain('translate-y-0');
  });
});
