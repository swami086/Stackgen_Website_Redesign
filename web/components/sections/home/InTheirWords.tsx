import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function InTheirWords() {
  const { heading, testimonials } = home.inTheirWords;

  return (
    <SectionShell
      className="border-y border-border bg-bg py-[120px] pl-[var(--spacing-pad-x)] pr-0"
      aria-labelledby="in-their-words-heading"
    >
      <div className="flex max-w-[1240px] flex-col gap-12">
        <h2
          id="in-their-words-heading"
          className="max-w-[700px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>

        <div className="flex gap-[18px] overflow-x-auto pb-1">
          {testimonials.map((item) => (
            <blockquote
              key={`${item.company}-${item.name}`}
              className="flex h-[302px] w-[315px] shrink-0 flex-col gap-4 rounded-xl border border-border bg-surface p-6"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-text-tertiary">
                {item.company}
              </span>
              <div className="min-h-0 flex-1" aria-hidden="true" />
              <p className="text-[15px] leading-6 tracking-[-0.01em] text-text-primary">
                {item.quote}
              </p>
              <footer className="flex flex-col gap-0.5 border-t border-border pt-3.5">
                <cite className="text-xs font-medium not-italic tracking-[-0.01em] text-text-secondary">
                  {item.name}
                </cite>
                <span className="text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
                  {item.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
