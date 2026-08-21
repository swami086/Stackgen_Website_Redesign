import Link from 'next/link';
import { AidenOsDiagram } from '@/components/diagrams/AidenOsDiagram';
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
        <AidenOsDiagram className="w-full" />
        <div className="mx-auto mt-4 grid max-w-[1240px] gap-4 pl-[100px] max-[767px]:pl-0">
          <p className="max-w-[720px] text-sm leading-6 text-text-secondary">
            {content.aidenOs.body}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {content.aidenOs.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[20px] border border-border-card bg-bg-raised px-5 py-4"
              >
                <p className="text-base text-text-primary">{feature.title}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{feature.body}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[20px] border border-border-card bg-bg-raised px-5 py-4">
            <p className="text-base text-text-primary">{content.aidenOs.roadmap.label}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-accent-text">
              {content.aidenOs.roadmap.note}
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm leading-6 text-text-secondary">
              {content.aidenOs.roadmap.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
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
