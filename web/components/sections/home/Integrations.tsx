import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type IntegrationsContent = typeof home.integrations;

/**
 * Canvas `K1zfG` is a 1278px section: seven categories, each a 12px label plus
 * an 18px subtitle over a row of 52px bordered tiles carrying plain text
 * wordmarks. Brand icons are deliberately not used — monochrome vendor SVGs
 * render as black-on-black against `--color-bg-base`.
 */
export function Integrations({ content, className }: SectionProps<IntegrationsContent>) {
  return (
    <section
      aria-labelledby="integrations-heading"
      className={['bg-bg-base px-pad-x py-[120px]', className].filter(Boolean).join(' ')}
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          {/* Canvas Header is a 52px split: heading left, deck right. */}
          <div className="flex items-start justify-between gap-10 max-[767px]:flex-col max-[767px]:gap-5">
            <h2
              id="integrations-heading"
              className="max-w-[560px] text-[42px] font-medium leading-[47px] tracking-[-0.03em] text-text-primary max-[767px]:text-[32px] max-[767px]:leading-9"
            >
              {content.heading}
            </h2>
            <p className="max-w-[600px] text-base leading-[26px] text-text-secondary max-[767px]:max-w-none">
              {content.deck}
            </p>
          </div>

          {home.integrationCategories.map((category) => (
            <section
              key={category.label}
              aria-label={category.label}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4 max-[767px]:flex-col max-[767px]:gap-1">
                <p className="w-[140px] shrink-0 text-xs leading-4 tracking-[0.04em] text-text-tertiary uppercase max-[767px]:w-auto">
                  {category.label}
                </p>
                <p className="text-lg leading-[22px] tracking-[-0.01em] text-text-primary">
                  {category.subtitle}
                </p>
              </div>
              <ul className="grid grid-cols-2 border-t border-l border-border-card min-[768px]:flex">
                {category.tools.map((tool) => (
                  <li
                    key={tool}
                    className="flex h-[52px] min-w-0 items-center justify-center border-r border-b border-border-card px-2 text-center text-[13px] text-text-tertiary"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
