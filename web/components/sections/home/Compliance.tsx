import Image from "next/image";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Compliance() {
  const { heading, body, items, badges } = home.compliance;

  return (
    <SectionShell
      className="bg-bg py-[120px]"
      aria-labelledby="compliance-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14">
        <div className="flex gap-20">
          <h2
            id="compliance-heading"
            className="max-w-[520px] shrink-0 text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="flex-1 text-base leading-[1.6] text-text-secondary">
            {body}
          </p>
        </div>

        <ul className="grid grid-cols-4 border-t border-border">
          {items.map((item) => (
            <li
              key={item.title}
              className="border-r border-border px-6 py-8 last:border-r-0"
            >
              <h3 className="text-base font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.5] text-text-secondary">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <ul
          className="flex gap-8 border-t border-border pt-8"
          aria-label="Compliance certifications"
        >
          {badges.map((badge) => (
            <li key={badge.label} className="flex items-center gap-3">
              <Image
                src={badge.icon}
                alt=""
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-lg font-medium tracking-[-0.02em] text-text-primary">
                {badge.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
