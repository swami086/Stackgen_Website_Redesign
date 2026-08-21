import Image from "next/image";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Integrations() {
  const { heading, body, categories } = home.integrations;

  return (
    <SectionShell
      className="bg-bg py-[120px]"
      aria-labelledby="integrations-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
        <div className="flex items-start justify-between gap-20">
          <h2
            id="integrations-heading"
            className="max-w-[560px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="max-w-[600px] text-base leading-[1.6] text-text-secondary">
            {body}
          </p>
        </div>

        {categories.map((category) => (
          <section
            key={category.label}
            aria-label={category.label}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <MonoLabel className="w-[140px] shrink-0">
                {category.label}
              </MonoLabel>
              <p className="text-lg leading-[1.2] tracking-[-0.01em] text-text-primary">
                {category.caption}
              </p>
            </div>
            <ul className="flex flex-wrap border-t border-l border-border">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex h-[52px] w-[124px] items-center justify-center gap-2 border-r border-b border-border px-2"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0 object-contain"
                  />
                  <span className="truncate text-[13px] text-text-tertiary">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
