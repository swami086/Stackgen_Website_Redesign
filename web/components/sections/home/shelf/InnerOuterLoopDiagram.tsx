"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { revealTransition, SPRING_EASE } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/cn";
import { FlowConnector } from "./FlowConnector";

const RING_LG = "h-[224px] w-[224px]";
const RING_MD = "h-[200px] w-[200px]";
const COL_INNER = "w-[224px]";
const COL_CONTEXT = "w-[200px]";
const COL_OUTER = "w-[224px]";
const LABEL_BAND_H = "min-h-[52px]";

function ContextGraphIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("h-9 w-9", className)}
      aria-hidden
    >
      <motion.g
        stroke="var(--ds-accent)"
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          x="14"
          y="4"
          width="8"
          height="8"
          rx="1.5"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: SPRING_EASE,
          }}
        />
        <motion.rect
          x="4"
          y="24"
          width="8"
          height="8"
          rx="1.5"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: SPRING_EASE,
            delay: 0.35,
          }}
        />
        <motion.rect
          x="24"
          y="24"
          width="8"
          height="8"
          rx="1.5"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: SPRING_EASE,
            delay: 0.7,
          }}
        />
        <path d="M18 12v6M10 24l4-4M26 24l-4-4" />
      </motion.g>
    </svg>
  );
}

type LoopChipProps = {
  iconSrc: string;
  label: string;
  index?: number;
};

function LoopChip({ iconSrc, label, index = 0 }: LoopChipProps) {
  return (
    <motion.div
      className="flex h-9 items-center gap-2 rounded-full bg-surface-raised px-3.5 py-2"
      whileHover={{ scale: 1.03, y: -1 }}
      transition={{ duration: 0.45, ease: SPRING_EASE }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      custom={index}
    >
      <Image
        src={iconSrc}
        alt=""
        width={14}
        height={14}
        className="h-3.5 w-3.5 shrink-0"
      />
      <span className="text-[13px] font-medium text-text-primary">{label}</span>
    </motion.div>
  );
}

type LoopRingProps = {
  children: ReactNode;
  size?: "lg" | "md";
  pulse?: boolean;
  index?: number;
};

function LoopRing({
  children,
  size = "lg",
  pulse = false,
  index = 0,
}: LoopRingProps) {
  const reduced = useReducedMotion();
  const dimension = size === "lg" ? RING_LG : RING_MD;
  const innerRadius = size === "lg" ? "rounded-[108px]" : "rounded-[94px]";

  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={revealTransition(index * 0.14, 0.85)}
    >
      {pulse && !reduced && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full bg-accent/20"
          aria-hidden
          animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.98, 1.02, 0.98] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: SPRING_EASE,
          }}
        />
      )}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-surface p-1 outline outline-1 -outline-offset-1 outline-border",
          dimension,
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-2.5 bg-bg outline outline-1 -outline-offset-1 outline-border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            innerRadius,
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function EyebrowPill({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-surface px-2.5 py-1 outline outline-1 -outline-offset-1 outline-border">
      <span className="text-[10px] font-semibold tracking-[2px] text-text-tertiary">
        {children}
      </span>
    </div>
  );
}

/** Pencil `RBepL`: labels in a fixed band, rings + arrows on one shared axis. */
export function InnerOuterLoopDiagram() {
  return (
    <div
      className="mx-auto w-full max-w-[1248px]"
      aria-label="Inner loop, context graph, and outer loop diagram"
    >
      {/* Desktop: label band + ring row share identical column widths */}
      <div className="hidden md:block">
        <div
          className={cn(
            "mx-auto flex items-start justify-center gap-[28px]",
            LABEL_BAND_H,
          )}
        >
          <div className={cn(COL_INNER, "flex flex-col items-center gap-1 pt-0.5")}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={revealTransition(0, 0.6)}
            >
              <EyebrowPill>INNER LOOP</EyebrowPill>
            </motion.div>
            {/* ponytail: invisible spacer matches outer subtitle height for ring alignment */}
            <span className="text-[11px] invisible" aria-hidden>
              Runtime / Infrastructure
            </span>
          </div>
          <div className="w-[72px]" aria-hidden />
          <div className={cn(COL_CONTEXT)} aria-hidden />
          <div className="w-[72px]" aria-hidden />
          <div
            className={cn(
              COL_OUTER,
              "flex flex-col items-center gap-1 pt-0.5",
            )}
          >
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={revealTransition(0.2, 0.6)}
            >
              <EyebrowPill>OUTER LOOP</EyebrowPill>
              <span className="text-[11px] text-text-secondary">
                Runtime / Infrastructure
              </span>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto mt-2.5 flex items-center justify-center gap-[28px]">
          <div className={cn(COL_INNER, "flex justify-center")}>
            <LoopRing index={0}>
              <LoopChip
                iconSrc="/logos/integrations/Cursor-icon.png"
                label="IDE"
                index={0}
              />
            </LoopRing>
          </div>

          <FlowConnector delay={0.2} className="w-[72px]" />

          <div className={cn(COL_CONTEXT, "flex justify-center")}>
            <LoopRing size="md" pulse index={1}>
              <ContextGraphIcon />
              <motion.span
                className="text-[13px] font-semibold text-text-primary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={revealTransition(0.25, 0.6)}
              >
                Context Graph
              </motion.span>
            </LoopRing>
          </div>

          <FlowConnector delay={0.45} className="w-[72px]" />

          <div className={cn(COL_OUTER, "flex justify-center")}>
            <LoopRing index={2}>
              <LoopChip
                iconSrc="/logos/integrations/GitHub.png"
                label="Runtime"
                index={0}
              />
              <LoopChip
                iconSrc="/logos/integrations/AWS.png"
                label="Infrastructure"
                index={1}
              />
            </LoopRing>
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col items-center gap-2 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={revealTransition(0, 0.6)}
        >
          <EyebrowPill>INNER LOOP</EyebrowPill>
        </motion.div>
        <LoopRing index={0}>
          <LoopChip
            iconSrc="/logos/integrations/Cursor-icon.png"
            label="IDE"
            index={0}
          />
        </LoopRing>

        <FlowConnector delay={0.2} orientation="vertical" />

        <LoopRing size="md" pulse index={1}>
          <ContextGraphIcon />
          <span className="text-[13px] font-semibold text-text-primary">
            Context Graph
          </span>
        </LoopRing>

        <FlowConnector delay={0.45} orientation="vertical" />

        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={revealTransition(0.35, 0.6)}
        >
          <EyebrowPill>OUTER LOOP</EyebrowPill>
          <span className="text-[11px] text-text-secondary">
            Runtime / Infrastructure
          </span>
        </motion.div>
        <LoopRing index={2}>
          <LoopChip
            iconSrc="/logos/integrations/GitHub.png"
            label="Runtime"
            index={0}
          />
          <LoopChip
            iconSrc="/logos/integrations/AWS.png"
            label="Infrastructure"
            index={1}
          />
        </LoopRing>
      </div>
    </div>
  );
}
