import Image from "next/image";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Mechanism() {
  const { title, caption, image } = home.mechanism;

  return (
    <SectionShell
      className="bg-surface px-[var(--spacing-pad-x)] pt-4 pb-[88px]"
      aria-labelledby="mechanism-heading"
    >
      <h2 id="mechanism-heading" className="sr-only">
        {title}
      </h2>
      <div className="mx-auto max-w-[1040px] overflow-hidden border border-[#1F2124] bg-[#0B0C0E]">
        <Image
          src={image}
          alt={title}
          width={1040}
          height={600}
          className="h-auto w-full"
          priority
        />
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm font-medium text-[#f3f4f6]">{title}</p>
          <p className="text-xs text-[#9aa0ac]">{caption}</p>
        </div>
      </div>
    </SectionShell>
  );
}
