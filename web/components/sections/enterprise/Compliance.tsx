import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import enterprise from "@/content/enterprise";

export function Compliance() {
  const { label, heading, badges } = enterprise.compliance;

  return (
    <SectionShell className="bg-bg py-[72px]" aria-label={label}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8">
        <MonoLabel>{label}</MonoLabel>
        <h2 className="max-w-[640px] text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-text-primary">
          {heading}
        </h2>
        <ul
          className="flex gap-4"
          aria-label="Compliance certifications"
        >
          {badges.map((badge) => (
            <li
              key={badge}
              className="rounded-md bg-surface-raised px-6 py-3 text-lg font-medium tracking-[-0.02em] text-text-primary"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
