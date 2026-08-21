import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import caseIndex from '@/content/case-index';

type FeaturedCasesContent = typeof caseIndex.cases;

export function FeaturedCases({ content }: SectionProps<FeaturedCasesContent>) {
  return (
    <section
      aria-labelledby="featured-cases-heading"
      className="border-y border-border-hairline bg-bg-raised px-pad-x py-pad-y"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <h2 id="featured-cases-heading" className="sr-only">
            Featured cases
          </h2>
          <ul className="grid gap-[18px] md:grid-cols-2">
            {content.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col gap-4 rounded-xl border border-border-card bg-surface-card p-6 transition-colors hover:border-border-hairline"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-text-primary">
                    {item.company}
                  </h3>
                  <p className="flex-1 text-[15px] leading-6 tracking-[-0.01em] text-text-primary">
                    {item.summary}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
                    {item.attribution}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
