import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { CaseHero } from '@/components/sections/case/CaseHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import innovaccer from '@/content/case-innovaccer';

export const metadata: Metadata = {
  title: 'Innovaccer case study',
};

export default function InnovaccerCasePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CaseHero content={{ ...innovaccer.hero, label: 'CASE STUDY' }} />
        <FinalCta content={innovaccer.finalCta} />
      </main>
      <Footer />
    </>
  );
}
