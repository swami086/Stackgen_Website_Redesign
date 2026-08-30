"use client";

/**
 * Communicates: three Aiden surfaces sit on one Aiden OS substrate
 * (Agent Platform · Governance · Shared Context). Pencil F4Jlp.
 */
import { motion } from "motion/react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { Stagger } from "@/components/replica/motion/Stagger";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import { AMBIENT, DUR, EASE, STAGGER } from "@/lib/motion-tokens";

const APPS: {
  title: string;
  sub: string;
  icon: PhosphorIconName;
}[] = [
  {
    title: "Aiden for SRE",
    sub: "investigate with shared context",
    icon: "shield-check",
  },
  {
    title: "Aiden for Automation",
    sub: "ticket → reviewed action",
    icon: "git-branch",
  },
  {
    title: "Aiden for Infrastructure",
    sub: "intent → governed AppStacks",
    icon: "cloud-arrow-down",
  },
];

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
] as const;

export function Offerings({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();
  void theme;

  return (
    <div
      className="glass-specular relative flex w-full max-w-5xl flex-col gap-6 overflow-hidden rounded-[20px] border border-border p-6 md:p-8"
      role="img"
      aria-label="Aiden factory offerings: SRE, Automation, and Infrastructure apps over the Aiden OS agent platform, governance, and shared context capabilities"
    >
      <div className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {APPS.map((app, i) => (
          <motion.div
            key={app.title}
            initial={reduced ? false : { y: -18, opacity: 0, scale: 0.98 }}
            whileInView={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: DUR.shell,
              delay: reduced ? 0 : i * STAGGER.chip,
              ease: EASE.emphasize,
            }}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface-raised px-4 py-4 shadow-sm"
          >
            <PhosphorIcon
              name={app.icon}
              className="size-5 text-text-secondary"
            />
            <div className="text-sm font-semibold text-text-primary">
              {app.title}
            </div>
            <div className="text-xs leading-snug text-text-tertiary">
              {app.sub}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-1 overflow-hidden rounded-2xl border border-border bg-surface p-5 md:p-6">
        <div
          aria-hidden
          data-part="os-substrate"
          className="pointer-events-none absolute inset-x-4 top-14 bottom-4 rounded-2xl border border-border bg-surface-raised/70"
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          data-animate="bezel"
          aria-hidden
        >
          <motion.rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx="15"
            fill="none"
            stroke="var(--ds-border)"
            strokeWidth={1.5}
            strokeOpacity={0.7}
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduced ? 0 : DUR.shell,
              delay: 0.15,
              ease: EASE.emphasize,
            }}
          />
        </svg>

        {!reduced && (
          <style>{`
            [data-animate="bezel"] rect {
              animation: bezel-pulse ${AMBIENT.bezel}s ease-in-out infinite alternate;
            }
            @keyframes bezel-pulse {
              0% { stroke-opacity: 0.2; }
              100% { stroke-opacity: 0.55; }
            }
          `}</style>
        )}

        <div className="relative z-10 mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-lg font-semibold text-text-primary">
              Aiden OS
            </span>
            <span className="text-xs text-text-tertiary">
              Grounded · Governed · Useful
            </span>
          </div>
          <span className="text-xs text-text-tertiary">
            Spans every application
          </span>
        </div>

        <Stagger
          step={STAGGER.chip}
          className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-0.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                  {group.label}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {group.chips.map((chip) => (
                  <div
                    key={chip}
                    className="flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-2.5 text-center text-sm font-medium text-text-primary shadow-sm"
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
