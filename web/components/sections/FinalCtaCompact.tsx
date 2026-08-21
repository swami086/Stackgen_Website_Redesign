import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { Reveal } from '@/components/motion/Reveal';
import { PRIMARY_CTA } from '@/lib/nav';

/**
 * The 272px closing band shared by the product, platform and case study pages
 * (canvas `v47e5`, `q8grMq`, `qIKEH`, `o0WWaf`, `yhFJB`): 80 top, 44 heading,
 * 20 gap, 32 CTA, 96 bottom, and no body paragraph.
 *
 * Home closes with the much taller `ZHuzU` band instead — see `home/FinalCta`.
 */
export function FinalCtaCompact({
  content,
  headingId,
  className,
}: {
  content: { heading: string };
  headingId: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={['bg-bg-base px-pad-x pt-20 pb-24', className].filter(Boolean).join(' ')}
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5">
          <h2
            id={headingId}
            className="max-w-[800px] text-[36px] font-medium leading-[44px] tracking-[-0.028em] text-balance text-text-primary"
          >
            {content.heading}
          </h2>
          <div>
            <ButtonPrimary href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonPrimary>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
