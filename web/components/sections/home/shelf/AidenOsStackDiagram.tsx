"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Shimmer } from "@/components/motion/Shimmer";
import {
  StaggerGroup,
  StaggerGroupItem,
} from "@/components/motion/StaggerGroup";
import { SPRING_EASE } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/cn";
import type { HomeShelfContent } from "@/content/home-shelf";
import { VerticalFlowConnector } from "./VerticalFlowConnector";

type StackContent = HomeShelfContent["contextGraph"]["stack"];

function AssemblyIcon({ index }: { index: number }) {
  const paths: ReactNode[] = [
    <path
      key="cloud"
      d="M8.75 11.8125l-4.8125 0q-0.92969 0-1.75-0.46484-0.82031-0.46484-1.28516-1.28516-0.46484-0.82031-0.46484-1.75 0-0.92969 0.46484-1.75 0.46484-0.82031 1.28516-1.28516 0.82031-0.46484 1.75-0.46484 0.27344 0 0.49219 0.05469 0.54688-1.03906 1.47656-1.72266 0.92969-0.68359 2.05078-0.875 1.12109-0.19141 2.24219 0.16406 1.12109 0.35547 1.94141 1.14844 0.82031 0.79297 1.17578 1.88672 0.35547 1.09375 0.1914 2.26953-0.16406 1.17578-0.84765 2.10547-0.68359 0.92969-1.72266 1.44922-1.03906 0.51953-2.1875 0.51953z"
      fill="currentColor"
    />,
    <path
      key="robot"
      d="M10.9375 2.625l-3.5 0 0-1.75q0-0.16406-0.13672-0.30078-0.13672-0.13672-0.30078-0.13672-0.16406 0-0.30078 0.13672-0.13672 0.13672-0.13672 0.30078l0 1.75-3.5 0q-0.71094 0-1.23047 0.51953-0.51953 0.51953-0.51953 1.23047l0 6.125q0 0.71094 0.51953 1.23047 0.51953 0.51953 1.23047 0.51953l7.875 0q0.71094 0 1.23047-0.51953 0.51953-0.51953 0.51953-1.23047l0-6.125q0-0.71094-0.51953-1.23047-0.51953-0.51953-1.23047-0.51953z"
      fill="currentColor"
    />,
    <path
      key="chart"
      d="M12.6875 11.375q0 0.16406-0.13672 0.30078-0.13672 0.13672-0.30078 0.13672l-10.5 0q-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.30078l0-8.75q0-0.16406 0.13672-0.30078 0.13672-0.13672 0.30078-0.13672 0.16406 0 0.30078 0.13672 0.13672 0.13672 0.13672 0.30078l0 5.96094 2.73438-2.78906q0.16406-0.10938 0.32812-0.10938 0.16406 0 0.32813 0.10938l1.42187 1.47656 3.33594-3.33594-1.14844 0q-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.30078 0-0.16406 0.13672-0.30078 0.13672-0.13672 0.30078-0.13672l2.1875 0q0.16406 0 0.30078 0.13672 0.13672 0.13672 0.13672 0.30078l0 2.1875q0 0.16406-0.13672 0.30078-0.13672 0.13672-0.30078 0.13672-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.30078l0-1.14844-3.60938 3.66406q-0.16406 0.10938-0.32812 0.10938-0.16406 0-0.32813-0.10938l-1.42187-1.47656-3.0625 3.0625 0 1.14844 10.0625 0q0.16406 0 0.30078 0.13672 0.13672 0.13672 0.13672 0.30078z"
      fill="currentColor"
    />,
    <path
      key="activity"
      d="M1.75 7h2.1875l1.3125 3.9375 2.625-5.25 1.96875 3.9375h2.73438"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
  ];

  return (
    <svg
      viewBox="0 0 14 14"
      className="h-5 w-5 text-accent"
      aria-hidden
    >
      {paths[index % paths.length]}
    </svg>
  );
}

function ChipPill({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full bg-bg px-3 py-1.5 text-[11px] text-text-secondary outline outline-1 -outline-offset-1 outline-border",
        className,
      )}
    >
      {label}
    </span>
  );
}

function IntentRouterHub() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-surface p-1 outline outline-1 -outline-offset-1 outline-border">
        {!reduced && (
          <motion.span
            className="absolute inset-0 rounded-full outline outline-1 outline-accent/25"
            animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.12, 0.35] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: SPRING_EASE,
            }}
            aria-hidden
          />
        )}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1C193B] p-[3px] outline outline-1 -outline-offset-1 outline-[#352F70]"
        >
          <div
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-bg outline outline-1 -outline-offset-1 outline-border"
          >
            <svg viewBox="0 0 14 14" className="h-6 w-6 text-accent" aria-hidden>
              <path
                d="M9.625 8.75q-0.92969 0-1.58594 0.65625l-2.51562-1.64063q0.32813-0.76563 0-1.58593l2.51562-1.58594q0.54688 0.54688 1.33985 0.62891 0.79297 0.08203 1.44921-0.35547 0.65625-0.4375 0.875-1.17578 0.21875-0.73828-0.05468-1.44922-0.27344-0.71094-0.98438-1.09375-0.71094-0.38281-1.47656-0.2461-0.76563 0.13672-1.25781 0.76563-0.49219 0.62891-0.49219 1.39453 0 0.38281 0.16406 0.76563l-2.51562 1.64062q-0.49219-0.49219-1.14844-0.62891-0.65625-0.13672-1.25781 0.13672-0.60156 0.27344-0.98438 0.82031-0.38281 0.54688-0.38281 1.20313 0 0.65625 0.38281 1.20312 0.38281 0.54688 0.98438 0.82032 0.60156 0.27344 1.25781 0.13672 0.65625-0.13672 1.14844-0.62891l2.51562 1.58594q-0.16406 0.4375-0.16406 0.82031 0 0.92969 0.62891 1.55859 0.62891 0.62891 1.55859 0.62891 0.92969 0 1.55859-0.62891 0.62891-0.62891 0.62891-1.55859 0-0.92969-0.62891-1.55859-0.62891-0.62891-1.55859-0.62891z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
      <span className="text-[13px] font-semibold text-text-primary">
        Intent Router
      </span>
    </div>
  );
}

type AidenOsStackDiagramProps = {
  stack: StackContent;
};

export function AidenOsStackDiagram({ stack }: AidenOsStackDiagramProps) {
  const reduced = useReducedMotion();
  const [activeAssembly, setActiveAssembly] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const placeholder = stack.intentPlaceholder;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveAssembly((i) => (i + 1) % stack.assemblies.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced, stack.assemblies.length]);

  useEffect(() => {
    if (reduced) {
      setTypedLen(placeholder.length);
      return;
    }
    setTypedLen(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= placeholder.length) window.clearInterval(id);
    }, 42);
    return () => window.clearInterval(id);
  }, [placeholder, reduced]);

  return (
    <div
      className="w-full rounded-[24px] bg-surface p-1.5 outline outline-1 -outline-offset-1 outline-border"
      aria-label="Aiden OS stack: intent router, factory assemblies, context graph, and operating system"
    >
      <div className="rounded-[18px] bg-surface-raised p-6 outline outline-1 -outline-offset-1 outline-border md:p-8">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-5">
          {/* Intent input */}
          <motion.div
            className="w-full rounded-[18px] bg-[#1C193B] p-1 outline outline-1 -outline-offset-1 outline-[#352F70]"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: SPRING_EASE }}
          >
            <div
              className="relative flex flex-col gap-3 rounded-[14px] bg-bg p-4 outline outline-1 -outline-offset-1 outline-[#352F70] md:px-[18px]"
            >
              <Shimmer className="opacity-60" />
              <div
                className="relative rounded-full bg-surface px-4 py-3 outline outline-1 -outline-offset-1 outline-border"
              >
                <span className="text-[13px] text-text-tertiary">
                  {placeholder.slice(0, typedLen)}
                  {!reduced && typedLen < placeholder.length ? (
                    <motion.span
                      className="text-accent"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        ease: SPRING_EASE,
                      }}
                    >
                      |
                    </motion.span>
                  ) : null}
                </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {stack.intentPills.map((pill, i) => (
                    <motion.span
                      key={pill}
                      className="flex items-center gap-1.5 rounded-full bg-bg px-3 py-1.5 text-[11px] text-text-secondary outline outline-1 -outline-offset-1 outline-border"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.06,
                        duration: 0.55,
                        ease: SPRING_EASE,
                      }}
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <span
                        className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-surface outline outline-1 -outline-offset-1 outline-border"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      {pill}
                    </motion.span>
                  ))}
                </div>
                <motion.button
                  type="button"
                  className="group flex items-center gap-2 rounded-full bg-accent px-[18px] py-2.5 text-xs font-semibold text-black"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.45, ease: SPRING_EASE }}
                >
                  Submit
                  <span
                    className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
                  >
                    <svg viewBox="0 0 14 14" className="h-3 w-3 text-accent" aria-hidden>
                      <path
                        d="M10.9375 3.5l0 5.6875q0 0.16406-0.13672 0.30078-0.13672 0.13672-0.30078 0.13672-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.30078l0-4.64844-6.23438 6.28906q-0.16406 0.10938-0.32812 0.10938-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.30078 0-0.16406 0.10937-0.32813l6.28907-6.23437-4.64844 0q-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.30078 0-0.16406 0.13672-0.30078 0.13672-0.13672 0.30078-0.13672l5.6875 0q0.16406 0 0.30078 0.13672 0.13672 0.13672 0.13672 0.30078z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          <VerticalFlowConnector delay={0.1} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: SPRING_EASE, delay: 0.15 }}
          >
            <IntentRouterHub />
          </motion.div>

          <VerticalFlowConnector
            cap={stack.connectors.routeToAssembly}
            delay={0.25}
          />

          {/* Factory assemblies */}
          <motion.div
            className="w-full rounded-[20px] bg-[#0F291B] p-4 outline outline-1 -outline-offset-1 outline-[#1C4E33]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: SPRING_EASE, delay: 0.1 }}
          >
            <div className="mb-4 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
              <span
                className="font-mono text-[9px] font-semibold tracking-[1.8px] text-text-tertiary"
              >
                FACTORY ASSEMBLIES
              </span>
              <span className="font-mono text-[10px] tracking-[0.6px] text-text-tertiary">
                {stack.assemblyCaption}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stack.assemblies.map((assembly, i) => {
                const isActive = i === activeAssembly;
                return (
                  <motion.div
                    key={assembly.title}
                    className={cn(
                      "rounded-[20px] bg-surface p-1.5 outline outline-1 -outline-offset-1 outline-border transition-[outline-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      isActive && "outline-[#1C4E33]",
                    )}
                    animate={
                      reduced
                        ? undefined
                        : {
                            y: isActive ? -4 : 0,
                            scale: isActive ? 1.02 : 1,
                          }
                    }
                    transition={{ duration: 0.65, ease: SPRING_EASE }}
                  >
                    <div
                      className={cn(
                        "flex flex-col items-center gap-3 rounded-[14px] bg-bg px-3.5 py-[18px] outline outline-1 -outline-offset-1",
                        isActive
                          ? "outline-[#1C4E33]"
                          : "outline-border",
                      )}
                    >
                      <span
                        className="rounded-full bg-surface-raised px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[1.8px] text-accent outline outline-1 -outline-offset-1 outline-border"
                      >
                        {assembly.phase}
                      </span>
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-surface outline outline-1 -outline-offset-1 outline-border"
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised outline outline-1 -outline-offset-1 outline-[#1C4E33]"
                        >
                          <AssemblyIcon index={i} />
                        </div>
                      </div>
                      <p className="text-center text-xs font-semibold text-text-primary">
                        {assembly.title}
                      </p>
                      <p
                        className="text-center font-mono text-[9px] font-semibold tracking-[1.4px] text-text-tertiary"
                      >
                        {assembly.subtitle}
                      </p>
                      {!reduced && isActive && (
                        <motion.span
                          className="h-1 w-8 rounded-full bg-accent/70"
                          layoutId="assembly-route"
                          transition={{ duration: 0.55, ease: SPRING_EASE }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <VerticalFlowConnector
            cap={stack.connectors.enrichFromContext}
            delay={0.35}
          />

          {/* Context graph band */}
          <motion.div
            className="w-full rounded-2xl bg-[#2E1D13] p-4 outline outline-1 -outline-offset-1 outline-[#62351D] md:px-[18px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: SPRING_EASE }}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-xs font-semibold text-text-primary">
                {stack.contextGraph.title}
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="flex items-center gap-1.5 rounded-full bg-bg px-3 py-1.5 text-[11px] text-text-secondary outline outline-1 -outline-offset-1 outline-border"
                >
                  <motion.span
                    className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-surface outline outline-1 -outline-offset-1 outline-border"
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: SPRING_EASE,
                    }}
                  >
                    <svg viewBox="0 0 14 14" className="h-2.5 w-2.5 text-accent" aria-hidden>
                      <path
                        d="M12.6875 2.84375l0 2.625q0 0.16406-0.10938 0.30078-0.10938 0.13672-0.32812 0.13672l-2.625 0q-0.16406 0-0.30078-0.13672-0.13672-0.13672-0.13672-0.32812 0-0.19141 0.13672-0.30078 0.13672-0.10938 0.30078-0.10938l1.58594 0-1.09375-1.14844q-0.875-0.82031-1.9961-1.12109-1.12109-0.30078-2.24218 0-1.12109 0.30078-1.9961 1.12109-0.10938 0.16406-0.30078 0.16406-0.19141 0-0.30078-0.13671-0.10938-0.13672-0.10937-0.32813 0-0.19141 0.10937-0.30078 1.03906-0.98438 2.37891-1.33984 1.33984-0.35547 2.67968 0 1.33984 0.35547 2.37891 1.33984l1.09375 1.09375 0-1.53125q0-0.21875 0.13672-0.32813 0.13672-0.10938 0.32812-0.10937 0.19141 0 0.30079 0.10937 0.10938 0.10938 0.10937 0.32813z"
                        fill="currentColor"
                      />
                    </svg>
                  </motion.span>
                  live sync
                </span>
                <span className="font-mono text-[10px] text-text-secondary">
                  {stack.contextGraph.stats}
                </span>
              </div>
            </div>
            <StaggerGroup className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {stack.contextGraph.chipsRow1.map((chip) => (
                  <StaggerGroupItem key={chip}>
                    <ChipPill label={chip} />
                  </StaggerGroupItem>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.contextGraph.chipsRow2.map((chip) => (
                  <StaggerGroupItem key={chip}>
                    <ChipPill label={chip} />
                  </StaggerGroupItem>
                ))}
              </div>
            </StaggerGroup>
          </motion.div>

          <VerticalFlowConnector cap={stack.connectors.governedBy} delay={0.45} />

          {/* OS band */}
          <motion.div
            className="w-full rounded-2xl bg-[#181A1F] p-4 outline outline-1 -outline-offset-1 outline-[#333742] md:px-[18px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: SPRING_EASE, delay: 0.08 }}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <StaggerGroup className="flex flex-wrap gap-2">
                {stack.osBand.chips.slice(0, 2).map((chip) => (
                  <StaggerGroupItem key={chip}>
                    <ChipPill label={chip} />
                  </StaggerGroupItem>
                ))}
              </StaggerGroup>
              <h4 className="text-xs font-semibold text-text-primary">
                {stack.osBand.title}
              </h4>
            </div>
            <StaggerGroup className="flex flex-wrap gap-2">
              {stack.osBand.chips.slice(2).map((chip) => (
                <StaggerGroupItem key={chip}>
                  <ChipPill label={chip} />
                </StaggerGroupItem>
              ))}
            </StaggerGroup>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
