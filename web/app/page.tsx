import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { Hero } from '@/components/sections/home/Hero';
import { Mechanism } from '@/components/sections/home/Mechanism';
import { Logos } from '@/components/sections/home/Logos';
import { Problem } from '@/components/sections/home/Problem';
import { FactoryProcess } from '@/components/sections/home/FactoryProcess';
import { AgenticOs } from '@/components/sections/home/AgenticOs';
import { OperationalContextGraphSection } from '@/components/sections/home/OperationalContextGraphSection';
import { Integrations } from '@/components/sections/home/Integrations';
import { InTheirWords } from '@/components/sections/home/InTheirWords';
import { Compliance } from '@/components/sections/home/Compliance';
import { FinalCta } from '@/components/sections/home/FinalCta';
import home from '@/content/home';

export const metadata: Metadata = {
  title: 'Autonomous DevOps Factory',
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero content={home.hero} />
        <Mechanism content={home.mechanism} />
        <Logos content={home.logos} />
        <Problem content={home.problem} />
        <FactoryProcess content={home.factoryProcess} />
        <AgenticOs content={home.agenticOs} />
        <OperationalContextGraphSection content={home.contextGraph} />
        <Integrations content={home.integrations} />
        <InTheirWords content={home.inTheirWords} />
        <Compliance content={home.compliance} />
        <FinalCta content={home.finalCta} />
      </main>
      <Footer />
    </>
  );
}
