import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { CaseHero } from '@/components/sections/case/CaseHero';
import { FeaturedCases } from '@/components/sections/case/FeaturedCases';
import { FinalCtaCompact } from '@/components/sections/FinalCtaCompact';
import caseIndex from '@/content/case-index';

export const metadata: Metadata = {
  title: 'Case studies',
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CaseHero content={{ ...caseIndex.hero, label: 'PROOF' }} />
        <FeaturedCases content={caseIndex.cases} />
        <FinalCtaCompact content={caseIndex.finalCta} headingId="case-index-final-cta-heading" />
      </main>
      <Footer />
    </>
  );
}
