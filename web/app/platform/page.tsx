import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { AidenOsAndProductLinks } from "@/components/sections/platform/AidenOsAndProductLinks";
import { ByTheNumbers } from "@/components/sections/platform/ByTheNumbers";
import { Compliance } from "@/components/sections/platform/Compliance";
import { FinalCta } from "@/components/sections/platform/FinalCta";
import { Hero } from "@/components/sections/platform/Hero";
import { OperationalContextGraph } from "@/components/sections/platform/OperationalContextGraph";
import { TrustedBy } from "@/components/sections/platform/TrustedBy";
import { TwoPlanes } from "@/components/sections/platform/TwoPlanes";
import platform from "@/content/platform";

export const metadata: Metadata = {
  title: "Agentic OS for DevOps | StackGen",
};

export default function PlatformPage() {
  return (
    <main className="bg-bg text-text-primary">
      <Hero />
      <TrustedBy />
      <ByTheNumbers />
      <TwoPlanes />
      <OperationalContextGraph />
      <AidenOsAndProductLinks />
      <Compliance />
      <FinalCta />
      <Footer
        columns={platform.footer.columns}
        tagline={platform.footer.tagline}
        copyright={platform.footer.copyright}
      />
    </main>
  );
}
