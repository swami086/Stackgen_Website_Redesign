"use client";

/**
 * Operational Context Graph — Intent Router hub (comp R1).
 *
 * Communicates: ask → Intent Router (center) routes to one of four Factory
 * Assemblies under Aiden OS. Quiet telemetry inputs; faint context constellation
 * behind the hub (world model), not a wordy labeled spider.
 *
 * Motion thesis (route pulse): hub settles → beams draw to four docks →
 * one active route lights with a traveling packet. Reduced = final lit state.
 *
 * Inspiration: Mobbin Dovetail converge hub, Base centered router, Nano Banana
 * R1 plate. Soft Structuralism: ds-* hairlines, accent on hub/active only.
 */
import { motion } from "motion/react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { Beam } from "@/components/replica/motion/Beam";
import { Reveal } from "@/components/replica/motion/Reveal";
import { Stagger } from "@/components/replica/motion/Stagger";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import { AMBIENT, DUR, EASE, STAGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

const PROMPT_CHIPS = ["auto-route", "world model", "guardrails"] as const;

const TELEMETRY: { label: string; icon: PhosphorIconName }[] = [
  { label: "Logs", icon: "terminal-window" },
  { label: "Metrics", icon: "chart-line" },
  { label: "Traces", icon: "broadcast" },
];

const ASSEMBLIES: {
  stage: string;
  title: string;
  short: string;
  icon: PhosphorIconName;
  slot: "n" | "e" | "s" | "w";
  active?: boolean;
}[] = [
  {
    stage: "Build",
    title: "Aiden for Infrastructure",
    short: "Infrastructure",
    icon: "cloud-arrow-down",
    slot: "n",
  },
  {
    stage: "Operate",
    title: "Aiden for Automation",
    short: "Automation",
    icon: "git-branch",
    slot: "e",
  },
  {
    stage: "Observe",
    title: "Aiden for Observability",
    short: "Observability",
    icon: "chart-line",
    slot: "s",
    active: true,
  },
  {
    stage: "Remediate",
    title: "Aiden for SRE",
    short: "SRE",
    icon: "heartbeat",
    slot: "w",
  },
];

const OS_CHIPS = [
  "Governance",
  "Guardrails",
  "Tokenomics",
  "Identity & Access",
  "Audit & Evidence",
  "Integrations",
] as const;

/** Faint world-model constellation behind the hub (no edge captions). */
const CONSTELLATION = [
  { x: 50, y: 18 },
  { x: 78, y: 32 },
  { x: 88, y: 55 },
  { x: 72, y: 78 },
  { x: 50, y: 88 },
  { x: 28, y: 78 },
  { x: 12, y: 55 },
  { x: 22, y: 32 },
] as const;

const SLOT_CLASS: Record<(typeof ASSEMBLIES)[number]["slot"], string> = {
  n: "col-start-2 row-start-1 self-end justify-self-center",
  e: "col-start-3 row-start-2 self-center justify-self-start",
  s: "col-start-2 row-start-3 self-start justify-self-center",
  w: "col-start-1 row-start-2 self-center justify-self-end",
};

/** Beam endpoints in the 3×3 stage viewBox (percent). */
const BEAM_PATH: Record<(typeof ASSEMBLIES)[number]["slot"], string> = {
  n: "M50 50 L50 22",
  e: "M50 50 L78 50",
  s: "M50 50 L50 78",
  w: "M50 50 L22 50",
};

function AssemblyDock({
  card,
  theme,
  reduced,
}: {
  card: (typeof ASSEMBLIES)[number];
  theme: "light" | "dark";
  reduced: boolean;
}) {
  const isLight = theme === "light";
  return (
    <motion.div
      title={card.title}
      className={cn(
        SLOT_CLASS[card.slot],
        "z-10 flex min-w-0 max-w-[9.5rem] items-center gap-1.5 rounded-md border px-2 py-1.5",
        card.active
          ? isLight
            ? "border-accent/50 bg-surface shadow-sm"
            : "border-accent/55 bg-surface"
          : isLight
            ? "border-border/70 bg-surface/90"
            : "border-border bg-surface/90",
      )}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: DUR.shell,
        ease: EASE.emphasize,
        delay: card.active ? 0.55 : 0.35,
      }}
    >
      <PhosphorIcon
        name={card.icon}
        className={cn(
          "size-3.5 shrink-0",
          card.active ? "text-accent-text" : "text-text-secondary",
        )}
      />
      <div className="min-w-0">
        <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-tertiary">
          {card.stage}
        </div>
        <div className="truncate text-[11px] font-semibold text-text-primary">
          <span className="sr-only">{card.title}</span>
          <span aria-hidden>{card.short}</span>
        </div>
      </div>
    </motion.div>
  );
}

function RouterStage({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();
  const isLight = theme === "light";
  const stroke = isLight ? "var(--ds-border)" : "var(--ds-border)";
  const accent = "var(--ds-accent)";

  return (
    <div
      data-part="router-stage"
      className={cn(
        "relative grid aspect-[5/4] w-full grid-cols-3 grid-rows-3 gap-1 rounded-lg border p-2 sm:aspect-[4/3]",
        isLight ? "border-border/80 bg-surface" : "border-border bg-surface",
      )}
    >
      {/* Quiet constellation — world model substrate */}
      <svg
        data-part="context-graph"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-3 z-0 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] opacity-40"
        aria-hidden
      >
        {CONSTELLATION.map((a, i) => {
          const b = CONSTELLATION[(i + 1) % CONSTELLATION.length]!;
          return (
            <line
              key={`e-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={stroke}
              strokeWidth={0.4}
            />
          );
        })}
        {CONSTELLATION.map((p, i) => (
          <circle
            key={`n-${i}`}
            cx={p.x}
            cy={p.y}
            r={1.1}
            fill={isLight ? "var(--ds-text-tertiary)" : "var(--ds-text-tertiary)"}
          />
        ))}
        <text
          x={50}
          y={8}
          textAnchor="middle"
          className="fill-[var(--ds-text-tertiary)]"
          style={{ fontSize: 2.4, fontFamily: "ui-monospace, monospace" }}
        >
          checkout-api
        </text>
      </svg>

      {/* Route beams + traveling packet on the active spoke */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        aria-hidden
      >
        {ASSEMBLIES.map((card) => (
          <g key={card.slot} data-part={card.active ? "route-beam-active" : "route-beam"}>
            <path
              d={BEAM_PATH[card.slot]}
              fill="none"
              stroke={card.active ? accent : stroke}
              strokeWidth={card.active ? 1.25 : 0.7}
              strokeLinecap="round"
              opacity={card.active ? 1 : 0.4}
            />
            {card.active && (
              <Beam
                d={BEAM_PATH[card.slot]}
                delay={0.45}
                duration={AMBIENT.sweep / 4}
                r={1.8}
                className="fill-[var(--ds-accent)]"
              />
            )}
          </g>
        ))}
      </svg>

      {ASSEMBLIES.map((card) => (
        <AssemblyDock
          key={card.slot}
          card={card}
          theme={theme}
          reduced={reduced}
        />
      ))}

      {/* Center Intent Router hub */}
      <motion.div
        data-part="intent-router"
        className={cn(
          "relative z-20 col-start-2 row-start-2 flex size-[4.75rem] flex-col items-center justify-center justify-self-center self-center rounded-full border sm:size-[5.5rem]",
          isLight
            ? "border-accent/45 bg-surface shadow-sm"
            : "border-accent/50 bg-surface-raised",
        )}
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: DUR.shell, ease: EASE.emphasize, delay: 0.12 }}
      >
        <PhosphorIcon
          name="git-branch"
          className="mb-0.5 size-4 text-accent-text"
        />
        <span className="px-1 text-center text-[10px] font-semibold leading-tight text-text-primary sm:text-[11px]">
          Intent Router
        </span>
        {!reduced && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border border-accent/25"
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.05, 1] }}
            transition={{
              duration: AMBIENT.hub,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export function OperationalContextGraph({
  theme,
  className,
}: {
  theme: "light" | "dark";
  className?: string;
}) {
  const isLight = theme === "light";
  const reduced = useReducedMotionSafe();

  return (
    <div
      role="img"
      aria-label="Operational Context Graph: ask Aiden; Intent Router routes intent to factory assemblies under Aiden OS"
      data-motion-metaphor="route-pulse"
      data-structure="router-hub"
      className={cn(
        "glass-specular flex w-full max-w-3xl flex-col gap-2 rounded-[20px] border p-3",
        isLight ? "border-border/80 bg-surface/95" : "border-border bg-surface/90",
        className,
      )}
    >
      <Reveal delay={0} y={4}>
        <div
          data-part="ask-bar"
          className={cn(
            "flex items-center gap-2 rounded-md border px-2 py-1.5",
            isLight
              ? "border-border/70 bg-surface-raised"
              : "border-border bg-surface-raised",
          )}
        >
          <p className="min-w-0 flex-1 truncate text-xs text-text-secondary">
            Ask Aiden to investigate latency spike in checkout…
            {!reduced && (
              <motion.span
                aria-hidden
                className="ml-0.5 inline-block h-3 w-px align-middle bg-accent"
                animate={{ opacity: [1, isLight ? 0.3 : 0.15, 1] }}
                transition={{
                  duration: isLight ? 0.9 : 1.1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </p>
          <div className="hidden shrink-0 gap-1 sm:flex">
            {PROMPT_CHIPS.map((chip) => (
              <span
                key={chip}
                className={cn(
                  "rounded-full border px-1.5 py-0.5 font-mono text-[9px]",
                  isLight
                    ? "border-border/70 text-text-secondary"
                    : "border-border text-text-tertiary",
                )}
              >
                {chip}
              </span>
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-on-accent">
            Submit
            <PhosphorIcon name="arrow-right" className="size-3" />
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06} y={4}>
        <div
          data-layer="telemetry"
          className="flex flex-wrap items-center justify-center gap-3 px-1"
        >
          <Stagger step={STAGGER.chip} className="flex flex-wrap gap-2">
            {TELEMETRY.map((channel) => (
              <span
                key={channel.label}
                className={cn(
                  "inline-flex items-center gap-1 font-mono text-[10px] text-text-tertiary",
                )}
              >
                <PhosphorIcon
                  name={channel.icon}
                  className="size-3 text-text-tertiary"
                />
                {channel.label}
              </span>
            ))}
          </Stagger>
        </div>
      </Reveal>

      <Reveal delay={0.12} y={6}>
        <div data-layer="aiden" data-layer-context="context">
          <RouterStage theme={theme} />
        </div>
      </Reveal>

      {/* Keep a dedicated context hook for tests / a11y without a wordy band */}
      <span data-layer="context" className="sr-only">
        Context graph underlays the Intent Router as a quiet constellation
        including checkout-api.
      </span>

      <Reveal delay={0.55} y={4}>
        <div
          data-layer="os"
          className={cn(
            "rounded-lg border px-2 py-1.5",
            isLight ? "border-border/80 bg-surface-raised" : "border-border",
          )}
          style={{
            backgroundColor: isLight
              ? "var(--ds-surface-raised)"
              : "var(--ds-layer-os-bg)",
            borderColor: isLight
              ? "var(--ds-border)"
              : "var(--ds-layer-os-stroke)",
          }}
        >
          <div className="mb-1 text-center text-[11px] font-semibold text-accent-text">
            Aiden Agentic Operating System
          </div>
          <Stagger
            step={STAGGER.chip}
            className="flex flex-wrap justify-center gap-1"
          >
            {OS_CHIPS.map((chip) => (
              <span
                key={chip}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-medium text-text-primary",
                  isLight
                    ? "border-border/70 bg-surface"
                    : "border-border bg-surface",
                )}
              >
                {chip}
              </span>
            ))}
          </Stagger>
        </div>
      </Reveal>
    </div>
  );
}
