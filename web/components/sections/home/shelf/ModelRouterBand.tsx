import { SectionShell } from "@/components/primitives/SectionShell";
import { DualMarquee } from "@/components/motion/DualMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerText } from "@/components/motion/StaggerText";
import type { HomeShelfContent } from "@/content/home-shelf";

type ModelRouterContent = HomeShelfContent["modelRouter"];

export function ModelRouterBand({ modelRouter }: { modelRouter: ModelRouterContent }) {
  const row1 = modelRouter.row1.map((name) => ({
    id: name,
    mark: (
      <span className="rounded-full bg-surface px-4 py-2 text-sm text-text-secondary outline outline-1 -outline-offset-1 outline-border">
        {name}
      </span>
    ),
  }));

  const row2 = modelRouter.row2.map((name) => ({
    id: name,
    mark: (
      <span className="rounded-full bg-surface px-4 py-2 text-sm text-text-secondary outline outline-1 -outline-offset-1 outline-border">
        {name}
      </span>
    ),
  }));

  return (
    <SectionShell
      className="bg-bg py-[72px]"
      aria-labelledby="model-router-heading"
    >
      <div className="mx-auto flex max-w-[1248px] flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <h2
              id="model-router-heading"
              className="max-w-[720px] text-[28px] font-bold tracking-[-0.5px] text-text-primary"
            >
              <StaggerText text={modelRouter.heading} as="span" />
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="max-w-[640px] text-base text-text-secondary">
              {modelRouter.sub}
            </p>
          </Reveal>
        </div>
        <Reveal index={2}>
          <DualMarquee
            row1={row1}
            row2={row2}
            label="Model and tool routing"
          />
        </Reveal>
      </div>
    </SectionShell>
  );
}
