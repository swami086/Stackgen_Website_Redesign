import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import news from "@/content/news";

export function PlaceholderItems() {
  const { label, items } = news.placeholderItems;

  return (
    <SectionShell className="bg-bg py-[72px]" aria-label={label}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <MonoLabel>{label}</MonoLabel>
        <ul className="m-0 grid list-none grid-cols-3 gap-8 p-0">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-md border border-border bg-surface p-6"
            >
              <span className="font-mono text-xs tracking-[0.08em] text-text-tertiary">
                {item.tag}
              </span>
              <h2 className="text-lg font-medium tracking-[-0.02em] text-text-primary">
                {item.title}
              </h2>
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
