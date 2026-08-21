import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Surfaces() {
  const { label, heading, items } = home.surfaces;

  return (
    <SectionShell
      className="bg-bg px-[100px] py-20"
      aria-labelledby="surfaces-heading"
    >
      <div className="flex max-w-[1240px] flex-col gap-5">
        <MonoLabel>{label}</MonoLabel>
        <h2
          id="surfaces-heading"
          className="max-w-[720px] text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
        >
          {heading}
        </h2>
        <ul className="mt-1 flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.number}
              className="flex gap-5 border-b border-border py-4"
            >
              <span className="font-mono text-[13px] text-text-secondary">
                {item.number}
              </span>
              <span className="w-[220px] shrink-0 text-[17px] font-semibold text-text-primary">
                {item.title}
              </span>
              <p className="flex-1 text-[14px] leading-[1.5] text-text-secondary">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
