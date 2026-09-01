"use client";

/**
 * Communicates: three Aiden surfaces sit on one Aiden OS substrate
 * (Agent Platform · Governance · Shared Context). Pencil F4Jlp.
 * Density: content fills the plate — no empty substrate frame.
 */
import { motion } from "motion/react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { Stagger } from "@/components/replica/motion/Stagger";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import { DUR, EASE, STAGGER } from "@/lib/motion-tokens";

const APPS: {
  title: string;
  sub: string;
  icon: PhosphorIconName;
}[] = [
  {
    title: "Aiden for SRE",
    sub: "on-call with shared context",
    icon: "shield-check",
  },
  {
    title: "Aiden for DevOps",
    sub: "delivery on-call can trust",
    icon: "git-branch",
  },
  {
    title: "Aiden for InfraOps",
    sub: "policy-checked from the IDE",
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
      className="glass-specular relative flex w-full flex-col gap-2 overflow-hidden rounded-[16px] border border-border p-2.5 md:p-3"
      role="img"
      aria-label="Aiden factory offerings: SRE, Automation, and Infrastructure apps over the Aiden OS agent platform, governance, and shared context capabilities"
    >
      <div className="relative z-10 grid grid-cols-1 gap-1.5 md:grid-cols-3">
        {APPS.map((app, i) => (
          <motion.div
            key={app.title}
            initial={reduced ? false : { y: -8, opacity: 0, scale: 0.98 }}
            whileInView={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.05, margin: "80px 0px" }}
            transition={{
              duration: DUR.shell,
              delay: reduced ? 0 : i * STAGGER.chip,
              ease: EASE.emphasize,
            }}
            className="relative z-10 flex flex-col gap-0.5 rounded-md border border-border glass-tile px-2 py-2"
          >
            <PhosphorIcon
              name={app.icon}
              className="size-3.5 text-text-secondary"
            />
            <div className="text-[12px] font-semibold text-text-primary">
              {app.title}
            </div>
            <div className="text-[10px] leading-snug text-text-tertiary">
              {app.sub}
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="relative z-10 rounded-md border border-border bg-surface p-2"
        data-part="os-band"
      >
        <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-1.5">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-[13px] font-semibold text-text-primary">
              Aiden OS
            </span>
            <span className="text-[9px] text-text-tertiary">
              Grounded · Governed · Useful
            </span>
          </div>
          <span className="text-[9px] text-text-tertiary">
            Spans every application
          </span>
        </div>

        <Stagger
          step={STAGGER.chip}
          className="grid grid-cols-1 gap-2 md:grid-cols-3"
        >
          {GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-0.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                  {group.label}
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                {group.chips.map((chip) => (
                  <div
                    key={chip}
                    className="flex items-center justify-center rounded-md border border-border bg-surface-raised px-2 py-1 text-center text-[11px] font-medium text-text-primary"
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
