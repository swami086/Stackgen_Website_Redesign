import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { CaseHero } from '@/components/sections/case/CaseHero';
import { FeaturedCases } from '@/components/sections/case/FeaturedCases';
import { FinalCta } from '@/components/sections/home/FinalCta';
import caseIndex from '@/content/case-index';

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <CaseHero content={caseIndex.hero} />
        <FeaturedCases content={caseIndex.cases} />
        <FinalCta content={caseIndex.finalCta} />
      </main>
      <Footer />
    </>
  );
}
