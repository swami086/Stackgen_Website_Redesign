import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { DemoHero } from '@/components/sections/demo/DemoHero';
import { DemoForm } from '@/components/sections/demo/DemoForm';
import scheduleDemo from '@/content/schedule-demo';

export default function ScheduleDemoPage() {
  return (
    <>
      <Nav />
      <main>
        <DemoHero content={scheduleDemo.hero} />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
