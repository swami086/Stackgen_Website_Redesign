import Image from "next/image";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Logos() {
  const { body, items } = home.logos;

  return (
    <SectionShell
      as="section"
      aria-label="Customer logos"
      className="border-b border-border bg-bg py-[30px] pb-[34px]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-[26px]">
        <ul className="flex w-full flex-wrap items-center justify-between gap-6">
          {items.map((item) => (
            <li key={item.src} className="relative h-8 w-[100px] shrink-0">
              <Image
                src={item.src}
                alt=""
                fill
                className="object-contain object-center"
                sizes="100px"
              />
            </li>
          ))}
        </ul>
        <p className="text-center text-xs leading-[15px] tracking-[-0.01em] text-text-secondary">
          {body}
        </p>
      </div>
    </SectionShell>
  );
}
