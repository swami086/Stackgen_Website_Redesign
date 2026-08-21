// components/sections/home/AgenticOs.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type AgenticOsContent = typeof home.agenticOs;

export function AgenticOs({ content }: SectionProps<AgenticOsContent>) {
  return (
    <section aria-labelledby="agentic-os-heading" data-stub="AgenticOs">
      <h2 id="agentic-os-heading">{content.heading}</h2>
    </section>
  );
}
