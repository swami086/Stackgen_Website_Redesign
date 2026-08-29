"use client";

import { motion } from "motion/react";
import { SectionShell } from "@/components/primitives/SectionShell";
import { PlayPulse } from "@/components/motion/PlayPulse";
import { Reveal } from "@/components/motion/Reveal";
import { Shimmer } from "@/components/motion/Shimmer";
import { SlidePattern } from "@/components/motion/SlidePattern";
import { SPRING_EASE } from "@/components/motion/easing";
import { homeShelf } from "@/content/home-shelf";
import { DoubleBezel } from "./DoubleBezel";

export function ProductVideo() {
  return (
    <SectionShell className="bg-bg px-[96px] py-0">
      <Reveal className="mx-auto max-w-[1248px]">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.55, ease: SPRING_EASE }}
        >
          <DoubleBezel className="group relative overflow-hidden">
            <SlidePattern />
            <Shimmer />
            <div
              className="relative flex h-[480px] flex-col items-center justify-center gap-4"
              role="img"
              aria-label="Product tour video placeholder"
            >
              <PlayPulse />
              <p className="text-sm text-text-secondary">
                {homeShelf.video.label}
              </p>
            </div>
          </DoubleBezel>
        </motion.div>
      </Reveal>
    </SectionShell>
  );
}
