import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { Logos } from "@/components/sections/home/Logos";
import { Surfaces } from "@/components/sections/home/Surfaces";
import { Mechanism } from "@/components/sections/home/Mechanism";
import { Problem } from "@/components/sections/home/Problem";
import { FactoryProcess } from "@/components/sections/home/FactoryProcess";
import { AdfLoop } from "@/components/sections/home/AdfLoop";
import { AgenticOs } from "@/components/sections/home/AgenticOs";
import { OperationalContextGraph } from "@/components/sections/home/OperationalContextGraph";
import { Integrations } from "@/components/sections/home/Integrations";
import { InTheirWords } from "@/components/sections/home/InTheirWords";
import { Industries } from "@/components/sections/home/Industries";
import { Compliance } from "@/components/sections/home/Compliance";
import { UseCases } from "@/components/sections/home/UseCases";
import { FinalCta } from "@/components/sections/home/FinalCta";

export const metadata: Metadata = {
  title: "Autonomous DevOps Factory | StackGen",
};

export default function HomePage() {
  return (
    <main className="bg-bg text-text-primary">
      <Hero />
      <Logos />
      <Surfaces />
      <Mechanism />
      <Problem />
      <FactoryProcess />
      <AdfLoop />
      <AgenticOs />
      <OperationalContextGraph />
      <Integrations />
      <InTheirWords />
      <Industries />
      <Compliance />
      <UseCases />
      <FinalCta />
    </main>
  );
}
