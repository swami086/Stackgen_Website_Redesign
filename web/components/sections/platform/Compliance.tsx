import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import platform from "@/content/platform";

export function Compliance() {
  const { label, badges } = platform.compliance;

  return (
    <SectionShell className="bg-bg py-[72px]" aria-label={label}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8">
        <MonoLabel>{label}</MonoLabel>
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
