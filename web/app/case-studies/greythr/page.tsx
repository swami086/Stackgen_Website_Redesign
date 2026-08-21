import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { CaseHero } from '@/components/sections/case/CaseHero';
import { CaseMetrics } from '@/components/sections/case/CaseMetrics';
import { FinalCtaCompact } from '@/components/sections/FinalCtaCompact';
import greythr from '@/content/case-greythr';

export const metadata: Metadata = {
  title: 'greytHR case study',
};

export default function GreythrCasePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CaseHero content={{ ...greythr.hero, label: 'CASE STUDY' }} />
        <CaseMetrics content={greythr.metrics} />
        <FinalCtaCompact content={greythr.finalCta} headingId="case-greythr-final-cta-heading" />
      </main>
      <Footer />
    </>
  );
}
