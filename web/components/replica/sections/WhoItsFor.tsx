"use client";

/**
 * Communicates: four Aiden surfaces + four roles share one OS.
 * Layout: Pencil ck4Dy — two aligned 4-column rows (pillars, then roles),
 * not a masonry bento. Spotlight hover keeps dense cells scannable.
 */
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaWhoItsForProps = {
  theme: "light" | "dark";
  className?: string;
};

const PILLAR_ICONS: PhosphorIconName[] = [
  "cloud-arrow-down",
  "git-branch",
  "chart-line",
  "heartbeat",
];

const ROLE_ICONS: Record<string, PhosphorIconName> = {
  "Platform Engineering": "rocket-launch",
  Developers: "terminal-window",
  DevSecOps: "shield-check",
  SRE: "heartbeat",
};

const GRID =
  "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4";

export function ReplicaWhoItsFor({ theme, className }: ReplicaWhoItsForProps) {
  const { eyebrow, heading, sub, pillars, roles, osTitle, osChips } =
    replicaContent.whoItsFor;

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].whoItsFor}
      className={cn(
        "relative overflow-hidden flex w-full flex-col gap-6 bg-bg px-4 py-16 md:px-24",
        className,
      )}
    >
      <AtmosphereField slot="ground-who" theme={theme} />
      <div className="relative z-10 flex w-full flex-col gap-6">
      <header className="flex w-full flex-col items-center gap-2.5">
        <div className="rounded-full border border-border bg-surface px-3 py-1.5">
          <span className="text-[10px] font-semibold tracking-[2px] text-text-tertiary">
            {eyebrow}
          </span>
        </div>
        <h2 className="max-w-3xl text-center text-[32px] font-bold leading-[1.15] tracking-[-0.5px] text-text-primary">
          {heading}
        </h2>
        <p className="max-w-2xl text-center text-base leading-normal text-text-secondary">
          {sub}
        </p>
      </header>

      {/* Row 1 — pillars: label above card, 4 equal columns (ck4Dy dmGKK) */}
      <div data-who-pillars className={GRID}>
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className="flex min-w-0 flex-col gap-2.5"
          >
            <span className="text-center text-[11px] font-semibold uppercase tracking-[1.5px] text-text-tertiary">
              {pillar.label}
            </span>
            <Tile
              icon={PILLAR_ICONS[i] ?? "stack"}
              title={pillar.title}
              body={pillar.body}
            />
          </div>
        ))}
      </div>

      {/* Row 2 — roles: same 4-column gutters (ck4Dy vx9P2) */}
      <div data-who-roles className={GRID}>
        {roles.map((role) => (
          <Tile
            key={role.title}
            icon={ROLE_ICONS[role.title] ?? "stack"}
            title={role.title}
            body={role.body}
          />
        ))}
      </div>

      <div className="flex w-full flex-col gap-2 rounded-2xl border border-[var(--ds-layer-os-stroke)] bg-[var(--ds-layer-os-bg)] px-3.5 py-3">
        <span className="text-base font-bold text-accent-text">{osTitle}</span>
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
      </div>
    </section>
  );
}

function Tile({
  icon,
  title,
  body,
  className,
}: {
  icon: PhosphorIconName;
  title: string;
  body: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionTemplate`${mouseX}px`;
  const spotlightY = useMotionTemplate`${mouseY}px`;

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      data-bento-cell
      className={cn(
        "group relative flex min-h-[143px] min-w-0 flex-col gap-2 overflow-hidden rounded-[14px] border border-border p-4 glass-specular",
        className,
      )}
      style={
        {
          "--spotlight-x": spotlightX,
          "--spotlight-y": spotlightY,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-xl border border-border bg-surface-raised">
          <PhosphorIcon name={icon} size={22} className="text-accent" />
        </div>
        <h3 className="text-[15px] font-bold text-text-primary">{title}</h3>
        <p className="text-sm leading-[1.45] text-text-secondary">{body}</p>
      </div>
    </motion.article>
  );
}
