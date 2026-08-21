import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductClip } from '../ProductClip';

const props = {
  src: { webm: '/product/audit.webm', mp4: '/product/audit.mp4' },
  poster: '/product/audit.webp',
  label: 'Aiden running an AWS security audit',
  caption: 'Three agents scan the account and produce a standardised report.',
};

const syntheticSensitiveAccountId = ['1234', '5678', '9012'].join('');

let observerCallback: IntersectionObserverCallback | null;
let observeSpy: ReturnType<typeof vi.fn>;

function stubMatchMedia(matches = false) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  );
}

function stubIntersectionObserver() {
  observerCallback = null;
  observeSpy = vi.fn();

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }

      observe = observeSpy;
      disconnect() {}
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

describe('ProductClip', () => {
  it('carries the four attributes autoplay requires on Safari and iOS', () => {
    const { container } = render(<ProductClip {...props} />);
    const v = container.querySelector('video')!;
    expect(v.muted).toBe(true);
    expect(v.hasAttribute('playsinline')).toBe(true);
    expect(v.hasAttribute('loop')).toBe(true);
    expect(v.getAttribute('poster')).toBe(props.poster);
  });

  it('never preloads, so clips do not compete with first paint', () => {
    const { container } = render(<ProductClip {...props} />);
    expect(container.querySelector('video')!.getAttribute('preload')).toBe('none');
  });

  it('offers both encodes with the efficient one first', () => {
    const { container } = render(<ProductClip {...props} />);
    const types = [...container.querySelectorAll('source')].map((s) => s.getAttribute('type'));
    expect(types).toEqual(['video/webm', 'video/mp4']);
  });

  it('names the surface for assistive technology', () => {
    const { container } = render(<ProductClip {...props} />);
    expect(container.querySelector('video')!.getAttribute('aria-label')).toBe(props.label);
  });

  it('shows a visible caption, because a silent clip needs a text equivalent', () => {
    render(<ProductClip {...props} />);
    expect(screen.getByText(props.caption)).toBeInTheDocument();
  });

  it('does not autoplay under reduced motion and exposes controls instead', () => {
    stubMatchMedia(true);
    const { container } = render(<ProductClip {...props} />);
    const v = container.querySelector('video')!;
    expect(v.hasAttribute('autoplay')).toBe(false);
    expect(v.hasAttribute('controls')).toBe(true);
  });

  it('does not attach playback observers on first client render for reduced-motion users', () => {
    stubMatchMedia(true);
    render(<ProductClip {...props} />);
    expect(observeSpy).not.toHaveBeenCalled();
  });

  it('plays only when the clip enters view and pauses when it leaves or the tab hides', async () => {
    const { container } = render(<ProductClip {...props} />);
    const v = container.querySelector('video')!;
    const play = vi.fn().mockResolvedValue(undefined);
    const pause = vi.fn();

    Object.defineProperty(v, 'play', { configurable: true, value: play });
    Object.defineProperty(v, 'pause', { configurable: true, value: pause });

    await act(async () => {
      await observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(play).toHaveBeenCalledTimes(1);

    act(() => {
      observerCallback?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(pause).toHaveBeenCalledTimes(1);

    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(pause).toHaveBeenCalledTimes(2);
  });

  it('rejects sensitive identifiers through the redaction gate', () => {
    expect(() =>
      render(
        <ProductClip
          {...props}
          label={`AWS account ${syntheticSensitiveAccountId} in live footage`}
        />,
      ),
    ).toThrow(/sensitive identifier/i);
  });
});
