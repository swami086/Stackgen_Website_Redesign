import Link from "next/link";
import { SectionShell } from "@/components/primitives/SectionShell";
import platform from "@/content/platform";

export function AidenOsAndProductLinks() {
  const { heading, body, modules, roadmap, productLinks } = platform.aidenOs;

  return (
    <SectionShell
      className="bg-surface py-[120px]"
      aria-labelledby="aiden-os-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14">
        <div className="grid grid-cols-[1fr_1fr] gap-12">
          <div className="flex flex-col gap-4">
            <h2
              id="aiden-os-heading"
              className="text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
            >
              {heading}
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6] text-text-secondary">
              {body}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-4">
            {modules.map((mod) => (
              <li
                key={mod.title}
                className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-6"
              >
                <h3 className="text-base font-semibold text-text-primary">
                  {mod.title}
                </h3>
                <p className="text-sm leading-[1.5] text-text-secondary">
                  {mod.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-bg p-8">
          <h3 className="mb-4 text-base font-semibold text-text-primary">
            {roadmap.heading}
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-text-secondary">
            <li>{roadmap.currentlyAvailable}</li>
            <li>{roadmap.earlyAccess}</li>
            <li>{roadmap.h1_2027}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-10">
          <h3 className="text-xl font-medium tracking-[-0.02em] text-text-primary">
            {productLinks.heading}
          </h3>
          <ul className="grid grid-cols-4 border-y border-border">
            {productLinks.links.map((link, index) => (
              <li
                key={link.label}
                className={`border-r border-border py-6 last:border-r-0 ${index === 0 ? "pl-0 pr-6" : "px-6"}`}
              >
                <Link
                  href={link.href}
                  className="text-base font-medium text-text-primary no-underline hover:text-accent-text"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
