import Image from "next/image";
import { SectionShell } from "@/components/primitives/SectionShell";
import platform from "@/content/platform";

export function TrustedBy() {
  const { framing, logos } = platform.trustedBy;

  return (
    <SectionShell
      aria-label="Trusted by"
      className="border-b border-border bg-bg py-[30px] pb-[34px]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-[26px]">
        <ul className="flex w-full flex-wrap items-center justify-between gap-6">
          {logos.map((item) => (
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
          {framing}
        </p>
      </div>
    </SectionShell>
  );
}
