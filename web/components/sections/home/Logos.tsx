import { Reveal } from '@/components/motion/Reveal';
import { CUSTOMER_WORDMARKS } from '@/content/shared';
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
          <ul className="grid w-full grid-cols-4 items-center gap-x-4 gap-y-4 min-[768px]:flex">
            {CUSTOMER_WORDMARKS.map((name) => (
              <li
                key={name}
                className="text-[15px] font-semibold leading-[18px] tracking-[-0.01em] text-text-tertiary max-[767px]:text-[13px]"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="text-center text-xs leading-[15px] tracking-[-0.01em] text-text-tertiary">
            {content.heading}
          </p>
          <p className="text-center text-[11px] leading-[13px] text-text-tertiary">
            {content.note}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
