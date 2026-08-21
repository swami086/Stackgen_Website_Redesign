'use client';

import { useEffect, useId, useRef, type JSX } from 'react';
import { useReducedMotion } from '@/components/motion/useReducedMotion';
import { findSensitive } from '@/scripts/redaction';
import { ProductFrame } from './ProductFrame';

type ProductClipProps = {
  src: { webm: string; mp4: string };
  poster: string;
  label: string;
  caption: string;
};

function assertSafeClipProps({ src, poster, label, caption }: ProductClipProps) {
  const hits = findSensitive([src.webm, src.mp4, poster, label, caption].join('\n'));
  if (hits.length === 0) {
    return;
  }

  const rules = [...new Set(hits.map((hit) => hit.rule))].join(', ');
  throw new Error(`Sensitive identifier detected in ProductClip props (${rules}).`);
}

export function ProductClip(props: ProductClipProps): JSX.Element {
  assertSafeClipProps(props);

  const { src, poster, label, caption } = props;
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const captionId = useId();

  useEffect(() => {
    if (reduced) {
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver !== 'function') {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void el.play().catch(() => {});
          return;
        }

        el.pause();
      },
      { threshold: 0.25 },
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        el.pause();
      }
    };

    io.observe(el);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [reduced]);

  return (
    <figure className="flex flex-col gap-3">
      <ProductFrame>
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          controls={reduced}
          aria-label={label}
          aria-describedby={captionId}
          className="block aspect-video w-full object-cover"
        >
          <source src={src.webm} type="video/webm" />
          <source src={src.mp4} type="video/mp4" />
        </video>
      </ProductFrame>
      <figcaption
        id={captionId}
        className="text-[15px] leading-6 tracking-[0.01em] text-text-secondary"
      >
        {caption}
      </figcaption>
    </figure>
  );
}
