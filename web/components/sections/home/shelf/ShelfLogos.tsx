import Image from "next/image";
import { SectionShell } from "@/components/primitives/SectionShell";
import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { homeShelf } from "@/content/home-shelf";

export function ShelfLogos() {
  const { eyebrow, items } = homeShelf.logos;

  const marqueeItems = items.map((item) => ({
    id: item.alt,
    mark: (
      <Image
        src={item.src}
        alt={item.alt}
        width={130}
        height={32}
        className="h-8 w-auto max-w-[130px] object-contain object-center"
      />
    ),
  }));

  return (
    <SectionShell
      as="section"
      aria-label="Customer logos"
      className="flex flex-col items-center gap-8 bg-bg py-[96px]"
    >
      <Reveal>
        <p className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal index={1} className="w-full max-w-[1248px]">
        <LogoMarquee items={marqueeItems} label="Customer logos" speed={36} />
      </Reveal>
    </SectionShell>
  );
}
