'use client';

import { useId, useState, type JSX } from 'react';
import { findSensitive } from '@/scripts/redaction';
import { ProductFrame } from './ProductFrame';

type VideoFigureProps = {
  poster: string;
  src: string;
  label: string;
  caption: string;
};

function assertSafeVideoFigureProps({ poster, src, label, caption }: VideoFigureProps) {
  const hits = findSensitive([poster, src, label, caption].join('\n'));
  if (hits.length === 0) {
    return;
  }

  const rules = [...new Set(hits.map((hit) => hit.rule))].join(', ');
  throw new Error(`Sensitive identifier detected in VideoFigure props (${rules}).`);
}

export function VideoFigure(props: VideoFigureProps): JSX.Element {
  assertSafeVideoFigureProps(props);

  const { poster, src, label, caption } = props;
  const [playing, setPlaying] = useState(false);
  const captionId = useId();

  return (
    <figure className="flex flex-col gap-3">
      <ProductFrame>
        <div className="relative aspect-video w-full">
          {playing ? (
            <iframe
              src={`${src}${src.includes('?') ? '&' : '?'}autoplay=1`}
              title={label}
              aria-describedby={captionId}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${label}`}
              aria-describedby={captionId}
              className="group absolute inset-0 block w-full text-left"
            >
              <img
                src={poster}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="rounded-chip bg-action px-4 py-2 text-[13px] font-medium text-text-on-panel">
                  Play
                </span>
              </span>
            </button>
          )}
        </div>
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
