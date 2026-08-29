"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SectionShell } from "@/components/primitives/SectionShell";
import { FlowPulse } from "@/components/motion/FlowPulse";
import { InteractiveBezel } from "@/components/motion/InteractiveBezel";
import { Reveal } from "@/components/motion/Reveal";
import { SPRING_EASE } from "@/components/motion/easing";
import { homeShelf } from "@/content/home-shelf";

function FlowChip({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="rounded-lg bg-surface-raised px-4 py-3 text-sm text-text-primary outline outline-1 -outline-offset-1 outline-border"
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.45, ease: SPRING_EASE }}
    >
      {children}
    </motion.span>
  );
}

function TodayPanel() {
  const { label, steps, roles } = homeShelf.beforeAfter.today;

  return (
    <InteractiveBezel className="h-[270px] flex-1">
      <div className="flex h-full flex-col justify-center gap-6 p-8">
        <p className="text-lg font-bold text-text-primary">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <FlowChip>{steps[0]}</FlowChip>
          <FlowPulse />
          <FlowChip>{steps[1]}</FlowChip>
          <FlowPulse />
          <div className="flex flex-col gap-2">
            {roles.map((role, i) => (
              <motion.span
                key={role}
                className="rounded-lg bg-surface-raised px-3 py-2 text-xs text-text-secondary"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.6,
                  ease: SPRING_EASE,
                }}
              >
                {role}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </InteractiveBezel>
  );
}

function FuturePanel() {
  const { label, specs, osTitle, assemblies } = homeShelf.beforeAfter.future;

  return (
    <InteractiveBezel className="relative h-[270px] flex-1 overflow-hidden">
      <motion.div
        className="absolute inset-0 rounded-[14px] bg-accent/[0.03]"
        aria-hidden
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: SPRING_EASE,
        }}
      />
      <div className="relative flex h-full flex-col justify-center gap-6 p-8">
        <p className="text-lg font-bold text-text-primary">{label}</p>
        <div className="flex items-center gap-4">
          <FlowChip>{specs}</FlowChip>
          <FlowPulse />
          <div className="flex flex-col gap-3 rounded-xl bg-surface-raised p-4 outline outline-1 -outline-offset-1 outline-border">
            <span className="text-sm font-semibold text-text-primary">
              {osTitle}
            </span>
            <div className="flex flex-wrap gap-2">
              {assemblies.map((name, i) => (
                <motion.span
                  key={name}
                  className="rounded-lg bg-surface px-3 py-1.5 text-xs text-text-secondary"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 0.55,
                    ease: SPRING_EASE,
                  }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InteractiveBezel>
  );
}

export function BeforeAfter() {
  return (
    <SectionShell
      className="bg-bg py-[96px]"
      aria-label="Today versus factory future"
    >
      <div className="mx-auto flex max-w-[1248px] flex-col gap-8 lg:flex-row lg:items-stretch">
        <Reveal index={0} className="flex-1">
          <TodayPanel />
        </Reveal>
        <Reveal index={1} className="flex-1">
          <FuturePanel />
        </Reveal>
      </div>
    </SectionShell>
  );
}
