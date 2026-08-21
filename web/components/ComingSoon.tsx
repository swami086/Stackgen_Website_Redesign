import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { MonoLabel } from '@/components/primitives/MonoLabel';

export function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Nav />
      <main className="px-(--spacing-pad-x) py-(--spacing-pad-y)">
        <MonoLabel>Later wave</MonoLabel>
        <h1 className="mt-6 text-5xl font-medium text-(--color-text-primary)">{title}</h1>
        <p className="mt-4 max-w-xl text-lg text-(--color-text-secondary)">
          This page is not part of the current review build. Everything else in the
          navigation is live.
        </p>
        <div className="mt-10">
          <ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>
        </div>
      </main>
      <Footer />
    </>
  );
}
