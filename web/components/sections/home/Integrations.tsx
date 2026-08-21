// components/sections/home/Integrations.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type IntegrationsContent = typeof home.integrations;

export function Integrations({ content }: SectionProps<IntegrationsContent>) {
  return (
    <section aria-labelledby="integrations-heading" data-stub="Integrations">
      <h2 id="integrations-heading">{content.heading}</h2>
    </section>
  );
}
