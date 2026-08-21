import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductContent } from "@/content/products";

type KeyCapabilitiesProps = {
  capabilities: ProductContent["capabilities"];
};

export function KeyCapabilities({ capabilities }: KeyCapabilitiesProps) {
  return (
    <SectionShell className="bg-bg py-[72px]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <MonoLabel>KEY CAPABILITIES</MonoLabel>
        <ul className="grid grid-cols-3 gap-8 list-none p-0 m-0">
          {capabilities.map((capability) => (
            <li key={capability.title} className="flex flex-col gap-3">
              <h2 className="text-lg font-medium tracking-[-0.02em] text-text-primary">
                {capability.title}
              </h2>
              <p className="text-[15px] leading-[1.45] text-text-secondary">
                {capability.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
