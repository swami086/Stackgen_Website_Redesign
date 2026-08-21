import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Compliance } from "@/components/sections/enterprise/Compliance";
import { EnterpriseCapabilities } from "@/components/sections/enterprise/EnterpriseCapabilities";
import { FinalCta } from "@/components/sections/enterprise/FinalCta";
import { Hero } from "@/components/sections/enterprise/Hero";
import { Metrics } from "@/components/sections/enterprise/Metrics";
import { Testimonial } from "@/components/sections/enterprise/Testimonial";
import enterprise from "@/content/enterprise";

export const metadata: Metadata = {
  title: "Enterprise | StackGen",
};

export default function EnterprisePage() {
  return (
    <main className="bg-bg text-text-primary">
      <Hero />
      <Metrics />
      <EnterpriseCapabilities />
      <Compliance />
      <Testimonial />
      <FinalCta />
      <Footer
        columns={enterprise.footer.columns}
        tagline={enterprise.footer.tagline}
        copyright={enterprise.footer.copyright}
      />
    </main>
  );
}
