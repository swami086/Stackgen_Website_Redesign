import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Faq } from "@/components/sections/pricing/Faq";
import { Hero } from "@/components/sections/pricing/Hero";
import { PricingModel } from "@/components/sections/pricing/PricingModel";
import { PublicWebRules } from "@/components/sections/pricing/PublicWebRules";
import pricing from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing | StackGen",
};

export default function PricingPage() {
  return (
    <main className="bg-bg text-text-primary">
      <Hero />
      <PricingModel />
      <PublicWebRules />
      <Faq />
      <Footer
        columns={pricing.footer.columns}
        tagline={pricing.footer.tagline}
        copyright={pricing.footer.copyright}
      />
    </main>
  );
}
