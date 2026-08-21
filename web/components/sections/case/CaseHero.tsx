import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { MonoLabel } from '@/components/primitives/MonoLabel';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import caseGreythr from '@/content/case-greythr';
import caseIndex from '@/content/case-index';
import innovaccer from '@/content/case-innovaccer';

type CaseHeroContent = (
  | typeof caseIndex.hero
  | typeof caseGreythr.hero
  | typeof innovaccer.hero
) & { label?: string };

function isPublishedQuote(
  content: CaseHeroContent,
): content is typeof caseGreythr.hero {
  return 'quote' in content && content.quote.status === 'published';
}

export function CaseHero({ content }: SectionProps<CaseHeroContent>) {
  return (
    <section
      aria-labelledby="casehero-heading"
      className="bg-bg-base px-pad-x pt-[88px] pb-12"
    >
      <Reveal>
        <div className="flex max-w-[1240px] flex-col gap-7">
          {content.label ? <MonoLabel>{content.label}</MonoLabel> : null}
          <h1
            id="casehero-heading"
            className="max-w-[980px] text-[64px] font-medium leading-[1.06] tracking-[-0.02em] text-balance text-text-primary"
          >
            {content.h1}
          </h1>
          <p className="max-w-[680px] text-[17px] leading-normal text-text-secondary">
            {content.sub}
          </p>
          {'support' in content && content.support ? (
            <p className="max-w-[640px] text-[15px] leading-normal text-text-tertiary">
              {content.support}
              {isPublishedQuote(content) ? (
                <>
                  {' '}
                  <a
                    href={content.quote.sourceUrl}
                    className="text-text-primary underline underline-offset-2"
                  >
                    Source
                  </a>
                </>
              ) : null}
            </p>
          ) : null}
          <div>
            <ButtonPrimary href={content.cta.href}>{content.cta.label}</ButtonPrimary>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
