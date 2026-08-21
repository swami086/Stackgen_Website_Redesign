import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Industries() {
  const { label, heading, items, footer } = home.industries;

  return (
    <SectionShell
      className="bg-bg px-[100px] py-20"
      aria-labelledby="industries-heading"
    >
      <div className="flex max-w-[1240px] flex-col gap-5">
        <MonoLabel>{label}</MonoLabel>
        <h2
          id="industries-heading"
          className="max-w-[720px] text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
        >
          {heading}
        </h2>
        <ul className="mt-1 flex gap-4">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex-1 rounded-lg border border-border bg-surface p-6"
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
        <p className="max-w-[640px] text-[13px] text-text-secondary">
          {footer}
        </p>
      </div>
    </SectionShell>
  );
}
