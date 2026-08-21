// components/sections/home/Mechanism.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type MechanismContent = typeof home.mechanism;

export function Mechanism({ content }: SectionProps<MechanismContent>) {
  return (
    <section aria-labelledby="mechanism-heading" data-stub="Mechanism">
      <h2 id="mechanism-heading">{content.heading}</h2>
    </section>
  );
}
