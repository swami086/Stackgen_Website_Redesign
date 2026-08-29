import { SectionShell } from "@/components/primitives/SectionShell";
import { DotGrid } from "@/components/motion/DotGrid";
import { InteractiveBezel } from "@/components/motion/InteractiveBezel";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { homeShelf } from "@/content/home-shelf";
import { InnerOuterLoopDiagram } from "./InnerOuterLoopDiagram";

export function AssembliesSection() {
  const { heading, sub, pillars, osBar } = homeShelf.assemblies;

  return (
    <SectionShell
      id="assemblies"
      className="relative flex flex-col items-center gap-8 overflow-hidden bg-bg py-[96px]"
      aria-labelledby="assemblies-heading"
    >
      <DotGrid className="opacity-30" />
      <Reveal className="w-full text-center">
        <h2
          id="assemblies-heading"
          className="text-[36px] font-bold tracking-[-0.5px] text-text-primary"
        >
          {heading}
        </h2>
      </Reveal>

      <Reveal index={1} className="flex w-full justify-center">
        <InnerOuterLoopDiagram />
      </Reveal>

      <Reveal index={2} className="w-full text-center">
        <p className="mx-auto max-w-[720px] text-base text-text-secondary">
          {sub}
        </p>
      </Reveal>

      <div className="grid w-full max-w-[1248px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal
            key={pillar.title}
            index={i}
            className="flex flex-col items-center gap-2.5"
          >
            <span className="w-full text-center text-[11px] font-semibold tracking-[1.5px] text-text-tertiary">
              {pillar.label}
            </span>
            <InteractiveBezel className="h-[228px] w-full">
              <div className="flex h-full flex-col gap-3.5 p-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface outline outline-1 -outline-offset-1 outline-border"
                  aria-hidden
                >
                  <span className="text-accent-text text-lg">◆</span>
                </div>
                <h3 className="text-[17px] font-bold text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-[13px] leading-[19px] text-text-secondary">
                  {pillar.body}
                </p>
              </div>
            </InteractiveBezel>
          </Reveal>
        ))}
      </div>

      <Reveal index={4} className="w-full max-w-[1248px]">
        <InteractiveBezel className="w-full">
          <div className="flex flex-col items-center gap-4 px-6 py-[18px] sm:flex-row sm:items-center sm:gap-5">
            <span className="shrink-0 text-base font-bold text-accent-text">
              {osBar.title}
            </span>
            <div className="flex flex-1 flex-wrap justify-center gap-2 sm:justify-start">
              {osBar.chips.map((chip) => (
                <span
                  key={chip.label}
                  className={cn(
                    "rounded-full px-3 py-[7px] font-mono text-[9.5px] text-text-secondary outline outline-1 -outline-offset-1",
                    "highlight" in chip && chip.highlight
                      ? "bg-[#2E1D13] outline-[#62351D]"
                      : "bg-bg outline-border",
                  )}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </InteractiveBezel>
      </Reveal>
    </SectionShell>
  );
}
