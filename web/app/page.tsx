import type { Metadata } from "next";
import { AssembliesSection } from "@/components/sections/home/shelf/AssembliesSection";
import { BeforeAfter } from "@/components/sections/home/shelf/BeforeAfter";
import { ContextGraphShell } from "@/components/sections/home/shelf/ContextGraphShell";
import { ModelRouterBand } from "@/components/sections/home/shelf/ModelRouterBand";
import { ProductVideo } from "@/components/sections/home/shelf/ProductVideo";
import { ShelfFinalCta } from "@/components/sections/home/shelf/ShelfFinalCta";
import { ShelfHero } from "@/components/sections/home/shelf/ShelfHero";
import { ShelfLogos } from "@/components/sections/home/shelf/ShelfLogos";
import { SurfacesShowcase } from "@/components/sections/home/shelf/SurfacesShowcase";
import { WhoItsFor } from "@/components/sections/home/shelf/WhoItsFor";
import { homeShelf } from "@/content/home-shelf";

export const metadata: Metadata = {
  title: "The Autonomous DevOps Factory | StackGen",
};

/** Home page replicated from Pencil frame `CYfSl` (Web Shelf — Home [Dark]). */
export default function HomePage() {
  return (
    <main className="bg-bg text-text-primary">
      <ShelfHero />
      <ProductVideo />
      <ShelfLogos />
      <SurfacesShowcase surfaces={homeShelf.surfaces} />
      <ModelRouterBand modelRouter={homeShelf.modelRouter} />
      <AssembliesSection />
      <WhoItsFor />
      <BeforeAfter />
      <ContextGraphShell />
      <ShelfFinalCta finalCta={homeShelf.finalCta} />
    </main>
  );
}
