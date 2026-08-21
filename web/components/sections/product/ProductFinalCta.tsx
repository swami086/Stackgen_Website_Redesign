import { FinalCtaCompact } from '@/components/sections/FinalCtaCompact';
import type { Cta, SectionProps } from '@/lib/types';

type ProductFinalCtaContent = {
  heading: string;
  cta: Cta;
};

export function ProductFinalCta({ content }: SectionProps<ProductFinalCtaContent>) {
  return <FinalCtaCompact content={content} headingId="product-final-cta-heading" />;
}
