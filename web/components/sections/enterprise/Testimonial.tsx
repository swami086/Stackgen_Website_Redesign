import { SectionShell } from "@/components/primitives/SectionShell";
import enterprise from "@/content/enterprise";

export function Testimonial() {
  const { quote, attribution } = enterprise.testimonial;

  return (
    <SectionShell className="border-y border-border bg-bg py-[72px]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5">
        <blockquote className="max-w-[820px] border-none p-0 text-[22px] font-medium leading-[1.35] tracking-[-0.02em] text-text-primary">
          {quote}
        </blockquote>
        <cite className="text-sm not-italic text-text-secondary">
          {attribution}
        </cite>
      </div>
    </SectionShell>
  );
}
