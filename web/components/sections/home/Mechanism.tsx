import { ChangeSurface } from '@/components/ChangeSurface';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type MechanismContent = typeof home.mechanism;

export function Mechanism({ content }: SectionProps<MechanismContent>) {
  return (
    <section
      aria-labelledby="mechanism-heading"
      className="bg-bg-base px-pad-x py-pad-y"
    >
      <h2 id="mechanism-heading" className="sr-only">
        {content.heading}
      </h2>
      <Reveal>
        <ChangeSurface
          agentLabel={content.label}
          diff={content.diff}
          haltBody={content.body}
          intent={content.intent}
          mergeTarget={content.mergeTarget}
          planFile={content.planFile}
          verdict={content.verdict}
        />
      </Reveal>
    </section>
  );
}
