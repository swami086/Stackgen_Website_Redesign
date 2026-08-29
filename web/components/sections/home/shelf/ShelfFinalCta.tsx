"use client";

import { motion } from "motion/react";
import { SectionShell } from "@/components/primitives/SectionShell";
import { PillButton } from "@/components/primitives/PillButton";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerText } from "@/components/motion/StaggerText";
import { SPRING_EASE } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import type { HomeShelfContent } from "@/content/home-shelf";
import { PRIMARY_CTA } from "@/lib/nav";

type FinalCtaContent = HomeShelfContent["finalCta"];

export function ShelfFinalCta({ finalCta }: { finalCta: FinalCtaContent }) {
  const reduced = useReducedMotion();

  return (
    <SectionShell className="relative overflow-hidden bg-bg py-[120px]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--ds-accent) 18%, transparent), transparent 70%)",
        }}
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.28, 0.48, 0.28],
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: SPRING_EASE,
        }}
      />
      <div className="relative mx-auto flex max-w-[800px] flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="text-[40px] font-bold leading-[44px] tracking-[-1px] text-text-primary">
            <StaggerText text={finalCta.heading} as="span" delay={0.08} />
          </h2>
        </Reveal>
        <Reveal index={1}>
          <PillButton href={PRIMARY_CTA.href} variant="primary" showArrow>
            {finalCta.cta}
          </PillButton>
        </Reveal>
      </div>
    </SectionShell>
  );
}
