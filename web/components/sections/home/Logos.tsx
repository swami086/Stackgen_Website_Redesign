import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { CUSTOMER_LOGOS } from '@/content/shared';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type LogosContent = typeof home.logos;

export function Logos({ content, className }: SectionProps<LogosContent>) {
  return (
    <section
      aria-label="Customer logos"
      className={[
        'border-b border-border-hairline bg-bg-base px-pad-x pt-[30px] pb-[34px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[26px]">
          <ul className="flex w-full items-center">
            {CUSTOMER_LOGOS.map((logo) => (
              <li key={logo.name} className="flex flex-1 items-center justify-center">
                <Image
                  src={logo.file}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-auto max-h-[30px] w-auto max-w-[120px] object-contain opacity-70"
                />
              </li>
            ))}
          </ul>
          <p className="text-center text-xs leading-normal tracking-[-0.01em] text-text-tertiary">
            {content.heading}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
