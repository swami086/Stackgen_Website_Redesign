import { FinalCtaCompact } from '@/components/sections/FinalCtaCompact';
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformFinalCtaContent = typeof platform.finalCta;

export function PlatformFinalCta({ content }: SectionProps<PlatformFinalCtaContent>) {
  return <FinalCtaCompact content={content} headingId="platform-final-cta-heading" />;
}
