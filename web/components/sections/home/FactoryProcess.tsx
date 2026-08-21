// components/sections/home/FactoryProcess.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type FactoryProcessContent = typeof home.factoryProcess;

export function FactoryProcess({ content }: SectionProps<FactoryProcessContent>) {
  return (
    <section aria-labelledby="factory-process-heading" data-stub="FactoryProcess">
      <h2 id="factory-process-heading">{content.heading}</h2>
    </section>
  );
}
