import { SectionShell } from "@/components/primitives/SectionShell";
import { PillButton } from "@/components/primitives/PillButton";
import { DotGrid } from "@/components/motion/DotGrid";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerText } from "@/components/motion/StaggerText";
import { homeShelf } from "@/content/home-shelf";
import { PRIMARY_CTA } from "@/lib/nav";

export function ShelfHero() {
  const { heading, sub, primaryCta, secondaryCta } = homeShelf.hero;

  return (
    <SectionShell
      className="relative flex flex-col items-center overflow-hidden bg-bg py-[96px]"
      aria-labelledby="shelf-hero-heading"
    >
      <DotGrid className="opacity-40" />
      <div className="relative flex max-w-[1248px] flex-col items-center gap-6 text-center">
        <Reveal index={0}>
          <h1
            id="shelf-hero-heading"
            className="max-w-[800px] text-[56px] font-bold leading-[62px] tracking-[-1px] text-text-primary"
          >
            <StaggerText text={heading} as="span" />
          </h1>
        </Reveal>
        <Reveal index={1}>
          <p className="max-w-[700px] text-[17px] leading-6 text-text-secondary">
            {sub}
          </p>
        </Reveal>
        <Reveal index={2}>
          <div className="flex items-center gap-4 py-4">
            <PillButton href={PRIMARY_CTA.href} variant="primary">
              {primaryCta}
            </PillButton>
            <PillButton href="#assemblies" variant="ghost" showArrow>
              {secondaryCta}
            </PillButton>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
