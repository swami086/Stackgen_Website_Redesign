// STUB
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformFinalCtaContent = typeof platform.finalCta;

export function PlatformFinalCta({ content }: SectionProps<PlatformFinalCtaContent>) {
  return (
    <section aria-labelledby="platform-final-cta-heading" data-stub="PlatformFinalCta">
      <h2 id="platform-final-cta-heading">{content.heading}</h2>
    </section>
  );
}
