import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { CaseHero } from '@/components/sections/case/CaseHero';
import { FeaturedCases } from '@/components/sections/case/FeaturedCases';
import { FinalCta } from '@/components/sections/home/FinalCta';
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
        <FinalCta content={caseIndex.finalCta} />
      </main>
      <Footer />
    </>
  );
}
