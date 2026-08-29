"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaWhoItsForProps = {
  theme: "light" | "dark";
  className?: string;
};

const PILLAR_ICONS: PhosphorIconName[] = [
  "stack",
  "rocket-launch",
  "chart-line-up",
  "heartbeat",
];

const ROLE_ICONS: Record<string, PhosphorIconName> = {
  "Platform Engineering": "rocket-launch",
  Developers: "chart-line-up",
  DevSecOps: "shield-check",
  SRE: "heartbeat",
};

export function ReplicaWhoItsFor({ theme, className }: ReplicaWhoItsForProps) {
  const { eyebrow, heading, sub, pillars, roles, osTitle, osChips } =
    replicaContent.whoItsFor;

  const items = [
    ...pillars.map((p, i) => ({ type: "pillar" as const, data: p, icon: PILLAR_ICONS[i] ?? "stack" })),
    ...roles.map((r, i) => ({ type: "role" as const, data: r, icon: ROLE_ICONS[r.title] ?? "stack" }))
  ];

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].whoItsFor}
      className={cn(
        "flex w-full flex-col gap-6 bg-bg px-4 md:px-24 py-16",
        className,
      )}
    >
      <header className="flex w-full flex-col items-center gap-2.5">
        <div className="rounded-full border border-border bg-surface px-3 py-1.5">
          <span className="text-[10px] font-semibold tracking-[2px] text-text-tertiary">
            {eyebrow}
          </span>
        </div>
        <h2 className="max-w-[720px] text-center text-[32px] font-bold leading-[1.15] tracking-[-0.5px] text-text-primary">
          {heading}
        </h2>
        <p className="max-w-[640px] text-center text-base leading-normal text-text-secondary">
          {sub}
        </p>
      </header>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, index) => {
          const isFeature = (item.type === "pillar" && index === 0) || (item.type === "role" && item.data.title === "SRE");
          return (
            <BentoCell key={item.data.title} item={item} isFeature={isFeature} />
          );
        })}
      </div>

      <div className="flex w-full flex-col gap-2 rounded-2xl border border-[var(--ds-layer-os-stroke)] bg-[var(--ds-layer-os-bg)] px-3.5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-accent-text">{osTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {osChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-full border border-border bg-bg px-3 py-1.5 text-[11px] text-text-secondary"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCell({ item, isFeature }: { item: any, isFeature: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isPillar = item.type === "pillar";

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      data-bento-cell
      data-feature={isFeature ? "true" : undefined}
      className={cn(
        "group relative flex min-w-0 flex-col gap-2.5 rounded-[14px] p-4 overflow-hidden border border-border glass-specular",
        isFeature && "lg:col-span-2"
      )}
      style={{
        "--spotlight-x": useMotionTemplate`${mouseX}px`,
        "--spotlight-y": useMotionTemplate`${mouseY}px`,
      } as any}
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full gap-2.5">
        {isPillar && (
          <span className="text-[11px] font-semibold tracking-[1.5px] text-text-tertiary">
            {item.data.label}
          </span>
        )}
        <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface-raised">
          <PhosphorIcon
            name={item.icon}
            size={22}
            className="text-accent"
          />
        </div>
        <h3 className="text-[15px] font-bold text-text-primary">
          {item.data.title}
        </h3>
        <p className="text-sm leading-[1.45] text-text-secondary">
          {item.data.body}
        </p>
      </div>
    </motion.article>
  );
}