import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import enterprise from "@/content/enterprise";

export function EnterpriseCapabilities() {
  const { label, heading, items } = enterprise.capabilities;

  return (
    <SectionShell
      className="bg-bg py-[72px]"
      aria-labelledby="enterprise-capabilities-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <MonoLabel>{label}</MonoLabel>
        <h2
          id="enterprise-capabilities-heading"
          className="max-w-[720px] text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>
        <ul className="m-0 grid list-none grid-cols-3 gap-8 p-0">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-3">
              <h3 className="text-lg font-medium tracking-[-0.02em] text-text-primary">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.45] text-text-secondary">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
