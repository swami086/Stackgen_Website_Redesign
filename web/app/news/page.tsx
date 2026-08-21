import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/news/Hero";
import { PlaceholderItems } from "@/components/sections/news/PlaceholderItems";
import { RealMomentum } from "@/components/sections/news/RealMomentum";
import news from "@/content/news";

export const metadata: Metadata = {
  title: "News | StackGen",
};

export default function NewsPage() {
  return (
    <main className="bg-bg text-text-primary">
      <Hero />
      <RealMomentum />
      <PlaceholderItems />
      <Footer
        columns={news.footer.columns}
        tagline={news.footer.tagline}
        copyright={news.footer.copyright}
      />
    </main>
  );
}
