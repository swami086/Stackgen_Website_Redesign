import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { PlatformHero } from '@/components/sections/platform/PlatformHero';
import { TwoPlanes } from '@/components/sections/platform/TwoPlanes';
import { PlatformContextGraphSection } from '@/components/sections/platform/PlatformContextGraphSection';
import { AidenOsLinks } from '@/components/sections/platform/AidenOsLinks';
import { PlatformFinalCta } from '@/components/sections/platform/PlatformFinalCta';
import platform from '@/content/platform';

export const metadata: Metadata = {
  title: 'Agentic OS for DevOps',
};

export default function PlatformPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <PlatformHero content={{ ...platform.hero, label: platform.twoPlanes.label }} />
        <TwoPlanes content={platform.twoPlanes} />
        <PlatformContextGraphSection content={platform.ocg} />
        <AidenOsLinks
          content={{ aidenOs: platform.aidenOs, productLinks: platform.productLinks }}
        />
        <PlatformFinalCta content={platform.finalCta} />
      </main>
      <Footer />
    </>
  );
}
