"use client";

/**
 * Communicates: signals enrich one Operational Context Graph; Aiden acts
 * within policy. Option E — three bands in a Shell-scale plate (peer to
 * Offerings / InnerOuterLoop height, not a full viewport).
 *
 * Spatial thesis (Mobbin Base / Railway / Midday): one framed card, short
 * spines (~32px), dense mid graph as the peak.
 *
 * Motion thesis (signal drop): telemetry → spine → nodes → edges → hop
 * beams → spine → router / assemblies / OS. Reduced = final state.
 *
 * Pencil V2P0L. Structure from option-E.png — not raster-as-live.
 */
import { motion } from "motion/react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { Beam } from "@/components/replica/motion/Beam";
import { DrawPath } from "@/components/replica/motion/DrawPath";
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
}[] = [
  {
    stage: "Build",
    title: "Aiden for Infrastructure",
    short: "Infrastructure",
    icon: "cloud-arrow-down",
  },
  {
    stage: "Operate",
    title: "Aiden for Automation",
    short: "Automation",
    icon: "git-branch",
  },
  {
    stage: "Observe",
    title: "Aiden for Observability",
    short: "Observability",
    icon: "chart-line",
  },
  {
    stage: "Remediate",
    title: "Aiden for SRE",
    short: "SRE",
    icon: "heartbeat",
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

const GRAPH_NODES = [
  { id: "latency", label: "Checkout latency", x: 280, y: 18 },
  { id: "ecs", label: "ecs-svc/checkout", x: 72, y: 58 },
  { id: "hub", label: "checkout-api", x: 280, y: 62, hub: true as const },
  { id: "module", label: "module.checkout_api", x: 488, y: 58 },
  { id: "job", label: 'job="checkout"', x: 120, y: 108 },
  { id: "label", label: "label: checkout", x: 440, y: 108 },
] as const;

const GRAPH_EDGES: {
  from: (typeof GRAPH_NODES)[number]["id"];
  to: (typeof GRAPH_NODES)[number]["id"];
  rel: string;
  active?: boolean;
}[] = [
  { from: "latency", to: "hub", rel: "monitors", active: true },
  { from: "ecs", to: "hub", rel: "deploys" },
  { from: "module", to: "hub", rel: "deploys" },
  { from: "job", to: "hub", rel: "owns", active: true },
  { from: "label", to: "hub", rel: "governs", active: true },
];

const SPINE_D = "M12 2 V30";

function nodeById(id: string) {
  return GRAPH_NODES.find((n) => n.id === id)!;
}

function edgePath(
  from: (typeof GRAPH_NODES)[number]["id"],
  to: (typeof GRAPH_NODES)[number]["id"],
) {
  const a = nodeById(from);
  const b = nodeById(to);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
}

function Spine({ delay, theme }: { delay: number; theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();
  const isLight = theme === "light";
  return (
    <div className="flex justify-center py-0.5" aria-hidden>
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        className={cn(
          "overflow-visible",
          isLight ? "text-text-secondary" : "text-border",
        )}
        data-part="drop-rail"
      >
        <DrawPath
          d={SPINE_D}
          className="stroke-current"
          strokeWidth={1.25}
          delay={delay}
          duration={DUR.flow}
        />
        {!reduced && (
          <Beam
            d={SPINE_D}
            className={isLight ? "fill-accent/75" : "fill-accent"}
            duration={AMBIENT.sweep / 2}
            delay={delay + DUR.flow}
            r={2}
          />
        )}
      </svg>
    </div>
  );
}

function ContextGraphSvg({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();
  const isLight = theme === "light";

  return (
    <svg
      viewBox="0 0 560 128"
      className="mx-auto h-auto w-full max-w-xl overflow-visible"
      role="presentation"
      data-part="context-graph"
    >
      {GRAPH_EDGES.map((edge, i) => {
        const d = edgePath(edge.from, edge.to);
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <DrawPath
              d={d}
              className={
                edge.active
                  ? isLight
                    ? "stroke-accent/50"
                    : "stroke-accent/65"
                  : "stroke-border"
              }
              strokeWidth={edge.active ? 1.35 : 1}
              delay={0.4 + i * 0.045}
              duration={0.36}
            />
            {edge.active && !reduced && (
              <Beam
                d={d}
                className={isLight ? "fill-accent/80" : "fill-accent"}
                duration={2 + i * 0.1}
                delay={0.8 + i * 0.05}
                r={1.4}
              />
            )}
            <motion.text
              x={(nodeById(edge.from).x + nodeById(edge.to).x) / 2}
              y={(nodeById(edge.from).y + nodeById(edge.to).y) / 2 - 4}
              textAnchor="middle"
              className="fill-current font-mono text-[8px] text-text-tertiary"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: 0.55 + i * 0.045,
                duration: DUR.chip,
                ease: EASE.emphasize,
              }}
            >
              {edge.rel}
            </motion.text>
          </g>
        );
      })}

      {GRAPH_NODES.map((node, i) => {
        const isHub = "hub" in node && node.hub;
        const w = isHub ? 108 : 102;
        const h = isHub ? 32 : 22;
        return (
          <motion.g
            key={node.id}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: 0.26 + i * STAGGER.chip,
              duration: DUR.chip,
              ease: EASE.emphasize,
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <rect
              x={node.x - w / 2}
              y={node.y - h / 2}
              width={w}
              height={h}
              rx={6}
              fill={
                isHub
                  ? isLight
                    ? "var(--ds-surface)"
                    : "var(--ds-layer-intent-bg)"
                  : "var(--ds-surface-raised)"
              }
              stroke={
                isHub
                  ? isLight
                    ? "color-mix(in srgb, var(--ds-accent) 45%, transparent)"
                    : "var(--ds-layer-intent-stroke)"
                  : "var(--ds-border)"
              }
              strokeWidth={1}
            />
            <text
              x={node.x}
              y={node.y + (isHub ? -4 : 1)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--ds-text-primary)"
              style={{
                fontSize: isHub ? 11 : 9,
                fontFamily: isHub
                  ? "var(--font-sans, ui-sans-serif)"
                  : "var(--font-mono, ui-monospace)",
                fontWeight: isHub ? 600 : 500,
              }}
            >
              {node.label}
            </text>
            {isHub && (
              <text
                x={node.x}
                y={node.y + 9}
                textAnchor="middle"
                fill="var(--ds-text-tertiary)"
                style={{
                  fontSize: 8,
                  fontFamily: "var(--font-mono, ui-monospace)",
                }}
              >
                one entity · six sources
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
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
      aria-label="Operational Context Graph: ask Aiden first; telemetry signals enrich a shared context graph; Aiden routes intent to factory assemblies under Aiden OS"
      data-motion-metaphor="signal-drop"
      data-structure="three-layer"
      className={cn(
        "glass-specular flex w-full max-w-3xl flex-col gap-0 rounded-[20px] border p-3",
        isLight ? "border-border/80 bg-surface/95" : "border-border bg-surface/90",
        className,
      )}
    >
      {/* Intent chrome — diagram top, not nested inside Context Graph */}
      <Reveal delay={0} y={4}>
        <div
          data-part="ask-bar"
          className={cn(
            "mb-2 flex items-center gap-2 rounded-md border px-2 py-1.5",
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

      {/* L1 Telemetry — quiet mono strip */}
      <Reveal delay={0.06} y={4}>
        <div
          data-layer="telemetry"
          className={cn(
            "flex flex-wrap items-center gap-2 rounded-md border px-2.5 py-1.5",
            isLight
              ? "border-border/70 bg-surface-raised/60"
              : "border-border bg-surface-raised/35",
          )}
        >
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
            Telemetry · signals
          </span>
          <Stagger step={STAGGER.chip} className="flex flex-wrap gap-1.5">
            {TELEMETRY.map((channel) => (
              <span
                key={channel.label}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]",
                  isLight
                    ? "border-border/60 bg-surface text-text-secondary"
                    : "border-border bg-surface/80 text-text-tertiary",
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

      <Spine delay={0.14} theme={theme} />

      {/* L2 Context Graph — peak (graph only; ask bar lives above) */}
      <Reveal delay={0.2} y={6}>
        <div
          data-layer="context"
          className={cn(
            "rounded-lg border p-2.5",
            isLight ? "border-border/80 bg-surface" : "border-border bg-surface",
          )}
        >
          <div className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
            Context Graph · semantic relationships
          </div>

          <ContextGraphSvg theme={theme} />
        </div>
      </Reveal>

      <Spine delay={0.68} theme={theme} />

      {/* L3 Aiden — compact action band */}
      <Reveal delay={0.74} y={6}>
        <div data-layer="aiden" className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
              Aiden · act within policy
            </span>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                isLight
                  ? "border-accent/40 bg-surface"
                  : "border-accent/50 bg-surface",
              )}
            >
              <PhosphorIcon
                name="git-branch"
                className="size-3.5 text-accent-text"
              />
              <span className="text-[11px] font-semibold text-text-primary">
                Intent Router
              </span>
            </div>
          </div>

          <div
            className={cn(
              "rounded-lg border p-2",
              isLight ? "border-border/80 bg-surface" : "border-border",
            )}
            style={{
              borderColor: isLight
                ? "var(--ds-border)"
                : "var(--ds-layer-agent-stroke)",
              backgroundColor: isLight
                ? "var(--ds-surface)"
                : "var(--ds-layer-agent-bg)",
            }}
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span
                className={cn(
                  "font-mono text-[9px] font-semibold uppercase tracking-[0.14em]",
                  isLight ? "text-text-secondary" : "text-pass",
                )}
              >
                Factory assemblies
              </span>
            </div>
            <Stagger
              step={STAGGER.orbit}
              className="grid grid-cols-2 gap-1 sm:grid-cols-4"
            >
              {ASSEMBLIES.map((card) => (
                <div
                  key={card.stage}
                  title={card.title}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-2 py-1.5",
                    isLight
                      ? "border-border/70 bg-surface/90"
                      : "border-border bg-surface/90",
                  )}
                >
                  <PhosphorIcon
                    name={card.icon}
                    className="size-3 shrink-0 text-text-secondary"
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
                </div>
              ))}
            </Stagger>
          </div>

          <div
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
        </div>
      </Reveal>
    </div>
  );
}
