import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function UseCases() {
  const { label, heading, items } = home.useCases;

  return (
    <SectionShell
      className="bg-bg px-[100px] py-20"
      aria-labelledby="use-cases-heading"
    >
      <div className="flex max-w-[1240px] flex-col gap-5">
        <MonoLabel>{label}</MonoLabel>
        <h2
          id="use-cases-heading"
          className="max-w-[720px] text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
        >
          {heading}
        </h2>
        <ul className="mt-1 grid grid-cols-2 gap-4">
          {items.map((item) => (
            <li
              key={item.number}
              className="flex gap-5 rounded-lg border border-border bg-surface p-6"
            >
              <span className="font-mono text-[13px] text-text-secondary">
                {item.number}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-text-secondary">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
