// components/sections/home/Compliance.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type ComplianceContent = typeof home.compliance;

export function Compliance({ content }: SectionProps<ComplianceContent>) {
  return (
    <section aria-labelledby="compliance-heading" data-stub="Compliance">
      <h2 id="compliance-heading">{content.heading}</h2>
    </section>
  );
}
