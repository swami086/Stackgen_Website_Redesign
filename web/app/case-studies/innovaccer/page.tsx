import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { CaseHero } from '@/components/sections/case/CaseHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import innovaccer from '@/content/case-innovaccer';

export default function InnovaccerCasePage() {
  return (
    <>
      <Nav />
      <main>
        <CaseHero content={innovaccer.hero} />
        <FinalCta content={innovaccer.finalCta} />
      </main>
      <Footer />
    </>
  );
}
