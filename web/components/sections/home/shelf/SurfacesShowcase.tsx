"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionShell } from "@/components/primitives/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerText } from "@/components/motion/StaggerText";
import { SPRING_EASE } from "@/components/motion/easing";
import { cn } from "@/lib/cn";
import type { HomeShelfContent } from "@/content/home-shelf";
import { DoubleBezel } from "./DoubleBezel";

type SurfacesContent = HomeShelfContent["surfaces"];

export function SurfacesShowcase({ surfaces }: { surfaces: SurfacesContent }) {
  const [active, setActive] = useState(0);
  const current = surfaces.items[active];

  return (
    <SectionShell
      className="bg-bg py-[96px]"
      aria-labelledby="surfaces-heading"
    >
      <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal>
            <h2
              id="surfaces-heading"
              className="max-w-[800px] text-[36px] font-bold leading-[41px] tracking-[-0.5px] text-text-primary"
            >
              <StaggerText text={surfaces.heading} as="span" delay={0.06} />
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="max-w-[720px] text-base leading-6 text-text-secondary">
              {surfaces.sub}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <Reveal index={2} className="flex flex-col gap-2">
            {surfaces.items.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex flex-col gap-1 rounded-2xl px-5 py-4 text-left transition-[background-color,outline-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] outline outline-1 -outline-offset-1",
                    isActive
                      ? "bg-surface outline-accent/35"
                      : "bg-transparent outline-border hover:bg-surface/60",
                  )}
                >
                  <span
                    className="font-mono text-[10px] font-semibold tracking-[2px] text-text-tertiary"
                  >
                    {item.num}
                  </span>
                  <span className="text-base font-semibold text-text-primary">
                    {item.title}
                  </span>
                  <span className="text-sm text-text-secondary">{item.body}</span>
                </button>
              );
            })}
          </Reveal>

          <Reveal index={3}>
            <DoubleBezel className="group relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.55, ease: SPRING_EASE }}
                  className="flex min-h-[360px] flex-col items-center justify-center gap-4 p-10"
                >
                  <span
                    className="rounded-full bg-surface px-3 py-1 font-mono text-[10px] font-semibold tracking-[2px] text-accent-text outline outline-1 -outline-offset-1 outline-border"
                  >
                    {current.phase}
                  </span>
                  <p className="text-2xl font-bold text-text-primary">
                    {current.title}
                  </p>
                  <p className="max-w-md text-center text-sm text-text-secondary">
                    {current.preview}
                  </p>
                </motion.div>
              </AnimatePresence>
            </DoubleBezel>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
