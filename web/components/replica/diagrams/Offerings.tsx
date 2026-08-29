"use client";

import { motion } from "motion/react";
import { Stagger } from "@/components/replica/motion/Stagger";
import { STAGGER, AMBIENT, EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";

const GROUPS = [
  {
    label: "Agent Platform",
    chips: ["Persona Agents", "Skills & Workflows", "Activity & Replay"],
  },
  {
    label: "Governance",
    chips: ["Policy Engine", "Identity & Approval", "Cost Controls"],
  },
  {
    label: "Shared Context",
    chips: ["Knowledge Hub", "Context Graph", "AppStacks"],
  },
];

const APPS = ["Aiden for SRE", "Aiden for DevOps", "Aiden for Infrastructure"];

export function Offerings({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();

  return (
    <div
      className="glass-specular rounded-[20px] p-6 relative overflow-hidden flex flex-col gap-6"
      role="img"
      aria-label="Aiden factory offerings: SRE, DevOps, and Infrastructure apps over the Aiden OS agent platform, governance, and shared context capabilities"
    >
      {/* App Tiles */}
      <div className="flex flex-wrap gap-4 z-10 relative justify-center">
        {APPS.map((app, i) => (
          <motion.div
            key={app}
            initial={reduced ? false : { y: -16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: EASE.emphasize }}
            className="flex-1 min-w-[140px] bg-background/50 p-4 rounded-xl border border-border/50 text-center text-sm font-medium shadow-sm"
          >
            {app}
          </motion.div>
        ))}
      </div>

      {/* Aiden OS Bezel */}
      <div className="relative p-6 rounded-2xl mt-2">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          data-animate="bezel"
        >
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="15"
            fill="none"
            className="stroke-primary/30"
            strokeWidth={2}
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: 0.2, ease: EASE.emphasize }}
          />
        </svg>

        {!reduced && (
          <style>{`
            [data-animate="bezel"] rect {
              animation: bezel-pulse ${AMBIENT.bezel}s ease-in-out infinite alternate;
            }
            @keyframes bezel-pulse {
              0% { stroke-opacity: 0.2; }
              100% { stroke-opacity: 0.6; }
            }
          `}</style>
        )}

        <Stagger step={STAGGER.chip} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </div>
              <div className="flex flex-col gap-2">
                {group.chips.map((chip) => (
                  <div
                    key={chip}
                    className="bg-background/80 px-3 py-2 rounded-lg border border-border/50 text-sm font-medium shadow-sm flex items-center justify-center text-center"
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
