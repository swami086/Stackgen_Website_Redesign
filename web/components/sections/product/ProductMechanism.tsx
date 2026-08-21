import { ChangeSurface } from '@/components/ChangeSurface';
import { AutomationMechanism } from '@/components/diagrams/product/AutomationMechanism';
import { InfrastructureMechanism } from '@/components/diagrams/product/InfrastructureMechanism';
import { ObservabilityMechanism } from '@/components/diagrams/product/ObservabilityMechanism';
import { SreMechanism } from '@/components/diagrams/product/SreMechanism';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';

type ProductMechanismContent = {
  label: string;
  heading: string;
  body: string;
};

type MechanismWithChangeSurface = ProductMechanismContent & {
  intent: string;
  diff: string;
  verdict: { state: 'pass' | 'halt'; label: string; rule: string };
  mergeTarget: string;
  planFile?: string;
  haltBody?: string;
};

const MECHANISM_DIAGRAMS = {
  'aiden-for-infrastructure': InfrastructureMechanism,
  'aiden-for-automation': AutomationMechanism,
  'aiden-for-observability': ObservabilityMechanism,
  'aiden-for-sre': SreMechanism,
} as const;

type ProductSlug = keyof typeof MECHANISM_DIAGRAMS;

function hasChangeSurface(content: ProductMechanismContent): content is MechanismWithChangeSurface {
  return (
    'intent' in content &&
    'diff' in content &&
    'verdict' in content &&
    'mergeTarget' in content
  );
}

export function ProductMechanism({
  content,
  slug,
}: SectionProps<ProductMechanismContent> & { slug: string }) {
  const Diagram = MECHANISM_DIAGRAMS[slug as ProductSlug] ?? InfrastructureMechanism;
  const titleId = `${slug}-mechanism-diagram-title`;

  return (
    <section
      aria-labelledby="product-mechanism-heading"
      className="bg-bg-base px-pad-x py-[72px]"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <div className="flex gap-12">
            <div className="w-[520px] shrink-0">
              <p className="text-sm text-text-tertiary">{content.label}</p>
              <h2
                id="product-mechanism-heading"
                className="mt-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
              >
                {content.heading}
              </h2>
            </div>
            <p className="w-[480px] text-base leading-normal text-text-secondary">
              {content.body}
            </p>
          </div>
          {hasChangeSurface(content) ? (
            <ChangeSurface
              agentLabel={content.label}
              diff={content.diff}
              haltBody={content.haltBody}
              intent={content.intent}
              mergeTarget={content.mergeTarget}
              planFile={content.planFile}
              verdict={content.verdict}
            />
          ) : null}
          <Diagram className="w-full" titleId={titleId} />
        </div>
      </Reveal>
    </section>
  );
}
