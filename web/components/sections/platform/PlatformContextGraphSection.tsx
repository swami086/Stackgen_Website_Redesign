// STUB
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformOcgContent = typeof platform.ocg;

export function PlatformContextGraphSection({ content }: SectionProps<PlatformOcgContent>) {
  return (
    <section aria-labelledby="platform-ocg-heading" data-stub="PlatformContextGraphSection">
      <h2 id="platform-ocg-heading">{content.heading}</h2>
    </section>
  );
}
