import { AidenOsLinksDiagram } from '@/components/diagrams/AidenOsLinksDiagram';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type AidenOsLinksContent = Pick<typeof platform, 'aidenOs' | 'productLinks'>;

export function AidenOsLinks({ content }: SectionProps<AidenOsLinksContent>) {
  return (
    <section
      aria-labelledby="aiden-os-links-heading"
      className="bg-bg-base px-pad-x py-pad-y"
    >
      <h2 id="aiden-os-links-heading" className="sr-only">
        {content.aidenOs.heading}
      </h2>
      <Reveal>
        <AidenOsLinksDiagram
          aidenOs={content.aidenOs}
          productLinks={content.productLinks}
          className="w-full"
        />
      </Reveal>
    </section>
  );
}
