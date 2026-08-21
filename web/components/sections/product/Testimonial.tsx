import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductContent } from "@/content/products";

type TestimonialProps = {
  testimonial: ProductContent["testimonial"];
};

export function Testimonial({ testimonial }: TestimonialProps) {
  const { label, quote, attribution, placeholder, note } = testimonial;

  return (
    <SectionShell className="bg-bg py-[72px]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5">
        <MonoLabel>{label}</MonoLabel>
        {quote ? (
          <>
            <blockquote className="max-w-[820px] border-none p-0 text-[22px] font-medium leading-[1.35] tracking-[-0.02em] text-text-primary">
              {quote}
            </blockquote>
            {attribution ? (
              <cite className="text-sm not-italic text-text-secondary">
                {attribution}
              </cite>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-lg text-text-tertiary">{placeholder}</p>
            {note ? (
              <p className="text-sm text-text-tertiary">{note}</p>
            ) : null}
          </>
        )}
      </div>
    </SectionShell>
  );
}
