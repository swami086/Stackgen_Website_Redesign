// STUB
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type AidenOsLinksContent = Pick<typeof platform, 'aidenOs' | 'productLinks'>;

export function AidenOsLinks({ content }: SectionProps<AidenOsLinksContent>) {
  return (
    <section aria-labelledby="aiden-os-links-heading" data-stub="AidenOsLinks">
      <h2 id="aiden-os-links-heading">{content.aidenOs.heading}</h2>
    </section>
  );
}
