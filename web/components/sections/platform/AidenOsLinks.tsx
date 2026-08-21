import Link from 'next/link';
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
        <nav
          aria-label={content.productLinks.heading}
          className="mx-auto mt-4 max-w-[1240px] pl-[100px] max-[767px]:pl-0"
        >
          <ul className="flex flex-col gap-2">
            {content.productLinks.products.map((product) => (
              <li key={product.href}>
                <Link
                  href={product.href}
                  className="text-lg text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
    </section>
  );
}
