import type { Metadata } from 'next';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { DemoHero } from '@/components/sections/demo/DemoHero';
import { DemoForm } from '@/components/sections/demo/DemoForm';
import scheduleDemo from '@/content/schedule-demo';

export const metadata: Metadata = {
  title: 'Schedule a demo',
};

export default function ScheduleDemoPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <DemoHero content={{ ...scheduleDemo.hero, label: 'GET STARTED' }} />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
