import { Reveal } from '@/components/motion/Reveal';
import type { Quote } from '@/lib/types';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type InTheirWordsContent = typeof home.inTheirWords;

function QuoteCard({ quote }: { quote: Quote }) {
  const isPlaceholder = quote.status === 'placeholder';

  return (
    <blockquote
      className="flex h-[302px] w-[315px] shrink-0 flex-col gap-4 rounded-xl border border-border-card bg-surface-card p-6"
      cite={quote.status === 'published' ? quote.sourceUrl : undefined}
    >
      <div className="flex w-full items-center gap-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-text-tertiary">
          {quote.company}
        </span>
        <span className="min-h-px flex-1" aria-hidden="true" />
        {isPlaceholder ? (
          <span className="font-mono text-[10px] text-halt">PLACEHOLDER</span>
        ) : null}
      </div>
      <div className="min-h-0 flex-1" aria-hidden="true" />
      <p className="text-[15px] leading-6 tracking-[-0.01em] text-text-primary">
        {quote.text}
      </p>
      <footer className="flex w-full flex-col gap-0.5 border-t border-border-hairline pt-3.5">
        <cite className="text-xs font-medium not-italic tracking-[-0.01em] text-text-secondary">
          {isPlaceholder && quote.attribution === 'PLACEHOLDER'
            ? quote.role
            : quote.attribution}
        </cite>
        <span className="text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
          {isPlaceholder && quote.attribution === 'PLACEHOLDER'
            ? quote.company
            : quote.role}
        </span>
        {quote.status === 'published' ? (
          <a
            href={quote.sourceUrl}
            className="mt-2 text-xs text-accent-text underline-offset-2 hover:underline"
          >
            Source
          </a>
        ) : null}
      </footer>
    </blockquote>
  );
}

export function InTheirWords({ content, className }: SectionProps<InTheirWordsContent>) {
  const placeholderCount = content.quotes.filter((q) => q.status === 'placeholder').length;

  return (
    <section
      aria-labelledby="in-their-words-heading"
      className={[
        'border-y border-border-hairline bg-bg-raised py-pad-y pl-pad-x',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Reveal>
        <div className="flex max-w-[1240px] flex-col gap-12">
          <div className="flex w-full max-w-[1240px] items-end gap-20">
            <h2
              id="in-their-words-heading"
              className="max-w-[700px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
            >
              {content.heading}
            </h2>
          </div>

          {placeholderCount > 0 ? (
            <p
              className="inline-flex w-fit items-center gap-2 rounded-md border border-halt/30 bg-halt/10 px-3 py-1.5 text-xs text-halt"
              role="status"
            >
              Quotes below are unapproved placeholders — review before publish
            </p>
          ) : null}

          <div className="flex gap-[18px] overflow-x-auto pb-1">
            {content.quotes.map((quote) => (
              <QuoteCard key={`${quote.company}-${quote.role}`} quote={quote} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
