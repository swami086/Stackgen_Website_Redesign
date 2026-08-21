import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { SectionShell } from "@/components/primitives/SectionShell";
import { PRIMARY_CTA } from "@/lib/nav";
import { cn } from "@/lib/cn";
import home from "@/content/home";

export function FinalCta() {
  const { modes, tagline, heading, body, cta } = home.finalCta;

  return (
    <SectionShell
      className="bg-bg pt-24 pb-[120px]"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-[26px] px-[var(--spacing-pad-x)] pt-32 text-center">
        <div className="flex flex-col items-center gap-3.5">
          <div className="flex items-center">
            {modes.map((mode, index) => (
              <div key={mode.title} className="flex items-center">
                <div
                  className={cn(
                    "flex w-[266px] flex-col gap-1.5 rounded-[9px] border px-[22px] py-4 text-left",
                    index === modes.length - 1
                      ? "border-accent bg-surface"
                      : "border-border bg-transparent",
                  )}
                >
                  <p className="text-sm font-medium text-text-primary">
                    {mode.title}
                  </p>
                  <p className="text-xs text-text-secondary">{mode.body}</p>
                </div>
                {index < modes.length - 1 ? (
                  <span
                    className="flex w-11 items-center justify-center text-text-tertiary"
                    aria-hidden="true"
                  >
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <p className="max-w-[900px] text-[13px] leading-[1.5] tracking-[-0.01em] text-text-tertiary">
            {tagline}
          </p>
        </div>

        <h2
          id="final-cta-heading"
          className="max-w-[760px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>
        <p className="max-w-[660px] text-[17px] leading-[1.6] tracking-[-0.01em] text-text-secondary">
          {body}
        </p>
        <ButtonPrimary href={PRIMARY_CTA.href}>{cta.label}</ButtonPrimary>
      </div>
    </SectionShell>
  );
}
