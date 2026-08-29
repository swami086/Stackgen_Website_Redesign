import { SectionShell } from "@/components/primitives/SectionShell";
import {
  HorizontalSnap,
  HorizontalSnapItem,
} from "@/components/motion/HorizontalSnap";
import { InteractiveBezel } from "@/components/motion/InteractiveBezel";
import {
  StaggerGroup,
  StaggerGroupItem,
} from "@/components/motion/StaggerGroup";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerText } from "@/components/motion/StaggerText";
import { homeShelf } from "@/content/home-shelf";

export function WhoItsFor() {
  const { eyebrow, heading, sub, roles } = homeShelf.whoItsFor;

  return (
    <SectionShell
      className="bg-bg py-[96px]"
      aria-labelledby="who-its-for-heading"
    >
      <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal>
            <span className="rounded-full bg-surface px-3 py-1.5 text-[10px] font-semibold tracking-[2px] text-text-tertiary">
              {eyebrow}
            </span>
          </Reveal>
          <Reveal index={1}>
            <h2
              id="who-its-for-heading"
              className="max-w-[720px] text-[36px] font-bold leading-[41px] tracking-[-0.5px] text-text-primary"
            >
              <StaggerText text={heading} as="span" delay={0.1} />
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="max-w-[640px] text-base leading-6 text-text-secondary">
              {sub}
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="hidden gap-4 lg:grid lg:grid-cols-4">
          {roles.map((role) => (
            <StaggerGroupItem key={role.title}>
              <InteractiveBezel innerClassName="bg-surface">
                <div className="flex flex-col gap-3.5 p-6">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-raised"
                    aria-hidden
                  >
                    <span className="text-accent-text">●</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-text-primary">
                    {role.title}
                  </h3>
                  <p className="text-sm leading-5 text-text-secondary">
                    {role.body}
                  </p>
                </div>
              </InteractiveBezel>
            </StaggerGroupItem>
          ))}
        </StaggerGroup>

        <HorizontalSnap className="lg:hidden" label="Who it's for">
          {roles.map((role) => (
            <HorizontalSnapItem key={role.title}>
              <InteractiveBezel innerClassName="bg-surface">
                <div className="flex flex-col gap-3.5 p-6">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-raised"
                    aria-hidden
                  >
                    <span className="text-accent-text">●</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-text-primary">
                    {role.title}
                  </h3>
                  <p className="text-sm leading-5 text-text-secondary">
                    {role.body}
                  </p>
                </div>
              </InteractiveBezel>
            </HorizontalSnapItem>
          ))}
        </HorizontalSnap>
      </div>
    </SectionShell>
  );
}
