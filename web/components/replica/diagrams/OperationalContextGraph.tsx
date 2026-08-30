"use client";

/**
 * Operational Context Graph — complete Intent Router (Nano Banana C1).
 *
 * THESIS: Ask → Intent Router → four equal Factory Assemblies; each assembly
 * owns three estate vendors on EXPLICIT feeder lines (world model), not
 * floating triangles. checkout-api sits in the Observe vendor arc as a chip.
 *
 * OWN-WORLD: Soft Structuralism ds-* hairlines; accent on hub + focused
 * route + checkout-api chip chrome (not glow soup).
 *
 * STORY: Intent routes; shared context is the vendors + entity underlay.
 * FIRST VIEWPORT: ask → tethered hub diagram → Aiden OS strip.
 * FORM: C1 tethered clusters; seed ocg-intent-router-complete.
 *
 * Motion (neural-mesh): feeders draw → ring synapses → traveling packets
 * on spokes/feeders/synapses with rotating assembly focus (parts talking).
 * Comp: .impeccable/mocks/ocg-intent-router-complete/option-C1.png
 * Logos: VendorMark = Integrations + Pencil tool-grid SoT.
 */
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import {
  VendorMark,
  VENDOR_NAMES,
  type VendorSlug,
} from "@/components/replica/logos";
import { Beam } from "@/components/replica/motion/Beam";
import { DrawPath } from "@/components/replica/motion/DrawPath";
import { Reveal } from "@/components/replica/motion/Reveal";
import { Stagger } from "@/components/replica/motion/Stagger";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import { AMBIENT, DUR, EASE, STAGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

const TELEMETRY: { label: string; icon: PhosphorIconName }[] = [
  { label: "Logs", icon: "terminal-window" },
  { label: "Metrics", icon: "chart-line" },
  { label: "Traces", icon: "broadcast" },
];

type Slot = "n" | "e" | "s" | "w";

const SLOT_ORDER: Slot[] = ["s", "e", "n", "w"];

const ASSEMBLIES: {
  slot: Slot;
  stage: string;
  stageMark: string;
  title: string;
  short: string;
  icon: PhosphorIconName;
  /** Dock center in % of stage */
  x: number;
  y: number;
}[] = [
  {
    slot: "n",
    stage: "Build",
    stageMark: "B",
    title: "Aiden for Infrastructure",
    short: "Infrastructure",
    icon: "cloud-arrow-down",
    x: 50,
    y: 22,
  },
  {
    slot: "e",
    stage: "Operate",
    stageMark: "O",
    title: "Aiden for Automation",
    short: "Automation",
    icon: "git-branch",
    x: 78,
    y: 50,
  },
  {
    slot: "s",
    stage: "Observe",
    stageMark: "O",
    title: "Aiden for Observability",
    short: "Observability",
    icon: "chart-line",
    x: 50,
    y: 72,
  },
  {
    slot: "w",
    stage: "Remediate",
    stageMark: "R",
    title: "Aiden for SRE",
    short: "SRE",
    icon: "heartbeat",
    x: 22,
    y: 50,
  },
];

/** Adjacent docks talk on the ring; diagonals are quieter cross-talk. */
const RING_PAIRS: [Slot, Slot][] = [
  ["n", "e"],
  ["e", "s"],
  ["s", "w"],
  ["w", "n"],
];
const CROSS_PAIRS: [Slot, Slot][] = [
  ["n", "s"],
  ["e", "w"],
];

/** Each assembly owns three vendors — positions %; feeders drawn to dock. */
const VENDOR_BY_SLOT: Record<
  Slot,
  { slug: VendorSlug; x: number; y: number; short?: string }[]
> = {
  n: [
    { slug: "aws", x: 37, y: 11 },
    { slug: "terraform", x: 50, y: 8 },
    { slug: "eks", x: 63, y: 11, short: "EKS" },
  ],
  e: [
    { slug: "github", x: 88, y: 37 },
    { slug: "gitlab", x: 91, y: 50 },
    { slug: "jira", x: 88, y: 63 },
  ],
  s: [
    { slug: "datadog", x: 18, y: 92 },
    { slug: "prometheus", x: 56, y: 96 },
    { slug: "pagerduty", x: 80, y: 92 },
  ],
  w: [
    { slug: "opa", x: 12, y: 37, short: "OPA" },
    { slug: "slack", x: 9, y: 50 },
    { slug: "backstage", x: 12, y: 63 },
  ],
};

/** World-model entity — Observe-arc chip peer (not an orb on the dock label). */
const ENTITY = { x: 36, y: 92, label: "checkout-api" } as const;

const OS_CHIPS: { label: string; icon: PhosphorIconName }[] = [
  { label: "Governance", icon: "shield-check" },
  { label: "Guardrails", icon: "funnel" },
  { label: "Tokenomics", icon: "lightning" },
  { label: "Identity", icon: "check-circle" },
  { label: "Audit", icon: "book-open" },
  { label: "Integrations", icon: "stack" },
];

function dockOf(slot: Slot) {
  return ASSEMBLIES.find((a) => a.slot === slot)!;
}

function curvedBeam(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  return `M${from.x} ${from.y} Q${mx} ${my} ${to.x} ${to.y}`;
}

/** Bow a synapse away from the hub so lateral talk doesn't scribble the center. */
function ringSynapse(
  from: { x: number; y: number },
  to: { x: number; y: number },
  push = 10,
) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = mx - 50;
  const dy = my - 50;
  const len = Math.hypot(dx, dy) || 1;
  return `M${from.x} ${from.y} Q${mx + (dx / len) * push} ${my + (dy / len) * push} ${to.x} ${to.y}`;
}

const ENTITY_FEEDER = `M${ENTITY.x} ${ENTITY.y} Q28 82 ${dockOf("s").x} ${dockOf("s").y}`;

function VendorChip({
  slug,
  x,
  y,
  short,
  theme,
  reduced,
  delay,
}: {
  slug: VendorSlug;
  x: number;
  y: number;
  short?: string;
  theme: "light" | "dark";
  reduced: boolean;
  delay: number;
}) {
  const isLight = theme === "light";
  const label = short ?? VENDOR_NAMES[slug];
  return (
    <motion.div
      data-vendor-slug={slug}
      data-part="vendor-node"
      title={VENDOR_NAMES[slug]}
      className={cn(
        "absolute z-[3] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-md border px-1 py-0.5",
        isLight
          ? "border-border/70 bg-surface shadow-sm"
          : "border-border bg-surface-raised/95",
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={reduced ? false : { opacity: 0, scale: 0.86 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DUR.chip, ease: EASE.emphasize, delay }}
    >
      <VendorMark slug={slug} theme={theme} className="size-3.5 shrink-0" />
      <span className="max-w-[4.25rem] truncate font-mono text-[8px] leading-none text-text-secondary">
        {label}
      </span>
    </motion.div>
  );
}

function AssemblyDisc({
  card,
  theme,
  reduced,
  focused,
}: {
  card: (typeof ASSEMBLIES)[number];
  theme: "light" | "dark";
  reduced: boolean;
  focused: boolean;
}) {
  const isLight = theme === "light";
  return (
    <motion.div
      data-assembly={card.short.toLowerCase()}
      data-part="assembly-dock"
      data-focus={focused ? "on" : "off"}
      title={card.title}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
      style={{ left: `${card.x}%`, top: `${card.y}%` }}
      initial={reduced ? false : { opacity: 0, scale: 0.88 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: DUR.shell,
        ease: EASE.emphasize,
        delay: focused ? 0.42 : 0.28,
      }}
    >
      <div
        className={cn(
          "relative flex size-11 items-center justify-center rounded-full border sm:size-12",
          focused
            ? isLight
              ? "border-accent/50 bg-surface shadow-sm"
              : "border-accent/55 bg-surface-raised"
            : isLight
              ? "border-border/80 bg-surface"
              : "border-border bg-surface/95",
        )}
      >
        <PhosphorIcon
          name={card.icon}
          className={cn(
            "size-4",
            focused ? "text-accent-text" : "text-text-secondary",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full border font-mono text-[7px] font-semibold",
            isLight
              ? "border-border bg-surface text-text-tertiary"
              : "border-border bg-surface-raised text-text-tertiary",
          )}
        >
          {card.stageMark}
        </span>
        {!reduced && focused && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border border-accent/25"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }}
            transition={{
              duration: AMBIENT.hub,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
      <span className="sr-only">{card.title}</span>
      <span
        aria-hidden
        className="max-w-[6rem] truncate text-center text-[10px] font-semibold text-text-primary sm:text-[11px]"
      >
        {card.short}
      </span>
    </motion.div>
  );
}

function RouterStage({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();
  const isLight = theme === "light";
  const router = { x: 50, y: 50 };
  const [focus, setFocus] = useState<Slot>("s");
  let feederI = 0;
  let packetI = 0;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setFocus((cur) => {
        const i = SLOT_ORDER.indexOf(cur);
        return SLOT_ORDER[(i + 1) % SLOT_ORDER.length]!;
      });
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div
      data-part="router-stage"
      data-focus-slot={focus}
      className={cn(
        "relative aspect-[5/4] w-full overflow-hidden rounded-lg border sm:aspect-[4/3]",
        isLight ? "border-border/80 bg-surface" : "border-border bg-surface",
      )}
      style={{
        backgroundImage: isLight
          ? "radial-gradient(circle, color-mix(in oklab, var(--ds-border) 55%, transparent) 0.9px, transparent 1px)"
          : "radial-gradient(circle, color-mix(in oklab, var(--ds-text-tertiary) 32%, transparent) 0.9px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      <svg
        data-part="context-graph"
        data-neural="mesh"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden
      >
        {/* Ring + cross synapses — assemblies talk laterally */}
        {RING_PAIRS.map(([a, b], i) => {
          const d = ringSynapse(dockOf(a), dockOf(b), 11);
          return (
            <g key={`ring-${a}-${b}`} data-part="neural-synapse" data-kind="ring">
              <DrawPath
                d={d}
                className="stroke-[var(--ds-border)]"
                strokeWidth={0.4}
                delay={0.5 + i * 0.05}
                duration={0.5}
              />
              <Beam
                d={d}
                delay={0.9 + i * 0.35}
                duration={AMBIENT.sweep / 2.4}
                r={1.05}
                className="fill-[var(--ds-text-tertiary)]"
              />
              <Beam
                d={d}
                reverse
                delay={1.4 + i * 0.35}
                duration={AMBIENT.sweep / 2.2}
                r={0.9}
                className="fill-[var(--ds-accent)]"
              />
            </g>
          );
        })}
        {CROSS_PAIRS.map(([a, b], i) => {
          const d = ringSynapse(dockOf(a), dockOf(b), 4);
          return (
            <g key={`cross-${a}-${b}`} data-part="neural-synapse" data-kind="cross">
              <DrawPath
                d={d}
                className="stroke-[var(--ds-border)] opacity-50"
                strokeWidth={0.35}
                delay={0.7 + i * 0.06}
                duration={0.55}
              />
              <Beam
                d={d}
                delay={1.8 + i * 0.55}
                duration={AMBIENT.sweep / 1.8}
                r={0.85}
                className="fill-[var(--ds-text-tertiary)]"
              />
            </g>
          );
        })}

        {/* Vendor → assembly feeders + ambient packets */}
        {ASSEMBLIES.flatMap((card) =>
          VENDOR_BY_SLOT[card.slot].map((v) => {
            const i = feederI++;
            const d = curvedBeam({ x: v.x, y: v.y }, { x: card.x, y: card.y });
            const hot = card.slot === focus;
            const pi = packetI++;
            return (
              <g key={`f-${card.slot}-${v.slug}`} data-part="neural-feeder">
                <DrawPath
                  d={d}
                  className="stroke-[var(--ds-border)]"
                  strokeWidth={0.55}
                  delay={0.06 + i * 0.025}
                  duration={0.4}
                />
                <Beam
                  d={d}
                  delay={0.55 + pi * 0.22}
                  duration={hot ? AMBIENT.sweep / 3.2 : AMBIENT.sweep / 2.1}
                  r={hot ? 1.25 : 0.95}
                  className={
                    hot
                      ? "fill-[var(--ds-accent)]"
                      : "fill-[var(--ds-text-tertiary)]"
                  }
                />
                {hot && (
                  <Beam
                    d={d}
                    reverse
                    delay={1.1 + pi * 0.18}
                    duration={AMBIENT.sweep / 3.6}
                    r={0.85}
                    className="fill-[var(--ds-accent)]"
                  />
                )}
              </g>
            );
          }),
        )}

        {/* Entity → Observability dock */}
        <g data-part="neural-feeder" data-kind="entity">
          <DrawPath
            d={ENTITY_FEEDER}
            className="stroke-[var(--ds-border)]"
            strokeWidth={0.55}
            delay={0.28}
            duration={0.4}
          />
          <Beam
            d={ENTITY_FEEDER}
            delay={0.85}
            duration={AMBIENT.sweep / 3}
            r={focus === "s" ? 1.35 : 1}
            className={
              focus === "s"
                ? "fill-[var(--ds-accent)]"
                : "fill-[var(--ds-text-tertiary)]"
            }
          />
        </g>

        {/* Assembly → Router spokes */}
        {ASSEMBLIES.map((card, i) => {
          const d = curvedBeam({ x: card.x, y: card.y }, router);
          const hot = card.slot === focus;
          return (
            <g
              key={`b-${card.slot}`}
              data-part={hot ? "route-beam-active" : "route-beam"}
            >
              <DrawPath
                d={d}
                className={
                  hot
                    ? "stroke-[var(--ds-accent)]"
                    : "stroke-[var(--ds-border)]"
                }
                strokeWidth={hot ? 1.4 : 0.85}
                delay={hot ? 0.48 : 0.32}
                duration={0.55}
              />
              <Beam
                d={d}
                delay={0.7 + i * 0.28}
                duration={hot ? AMBIENT.sweep / 3.5 : AMBIENT.sweep / 2.4}
                r={hot ? 1.7 : 1.15}
                className={
                  hot
                    ? "fill-[var(--ds-accent)]"
                    : "fill-[var(--ds-text-tertiary)]"
                }
              />
              <Beam
                d={d}
                reverse
                delay={1.35 + i * 0.3}
                duration={hot ? AMBIENT.sweep / 3.2 : AMBIENT.sweep / 2.2}
                r={hot ? 1.2 : 0.9}
                className={
                  hot
                    ? "fill-[var(--ds-accent)]"
                    : "fill-[var(--ds-text-tertiary)]"
                }
              />
            </g>
          );
        })}
      </svg>

      {ASSEMBLIES.flatMap((card, ci) =>
        VENDOR_BY_SLOT[card.slot].map((v, vi) => (
          <VendorChip
            key={v.slug}
            slug={v.slug}
            x={v.x}
            y={v.y}
            short={v.short}
            theme={theme}
            reduced={reduced}
            delay={0.1 + ci * 0.04 + vi * 0.03}
          />
        )),
      )}

      <motion.div
        data-part="entity-hub"
        className={cn(
          "absolute z-[4] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-md border px-1.5 py-0.5",
          isLight
            ? "border-accent/45 bg-surface shadow-sm"
            : "border-accent/50 bg-surface-raised",
        )}
        style={{ left: `${ENTITY.x}%`, top: `${ENTITY.y}%` }}
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: DUR.chip, ease: EASE.emphasize }}
        title="Resolved entity in the context graph"
      >
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-accent"
        />
        <span className="font-mono text-[8px] font-medium leading-none text-accent-text">
          {ENTITY.label}
        </span>
      </motion.div>

      {ASSEMBLIES.map((card) => (
        <AssemblyDisc
          key={card.slot}
          card={card}
          theme={theme}
          reduced={reduced}
          focused={card.slot === focus}
        />
      ))}

      <motion.div
        data-part="intent-router"
        className={cn(
          "absolute z-20 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border sm:size-[5.25rem]",
          isLight
            ? "border-accent/45 bg-surface shadow-sm"
            : "border-accent/50 bg-surface-raised",
        )}
        style={{ left: "50%", top: "50%" }}
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: DUR.shell, ease: EASE.emphasize, delay: 0.16 }}
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
            className="pointer-events-none absolute inset-0 rounded-full border border-accent/20"
            animate={{ opacity: [0.28, 0.55, 0.28], scale: [1, 1.05, 1] }}
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
      aria-label="Operational Context Graph: ask Aiden; Intent Router routes to Infrastructure, Automation, Observability, and SRE assemblies that exchange context across a neural mesh, each tethered to estate vendors, with checkout-api in the Observe cluster under Aiden OS"
      data-motion-metaphor="neural-mesh"
      data-structure="router-hub"
      data-complete="tethered-c1"
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
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-on-accent">
            Submit
            <PhosphorIcon name="arrow-right" className="size-3" />
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.05} y={4}>
        <div
          data-layer="telemetry"
          className="flex flex-wrap items-center justify-center gap-3 px-1"
        >
          <Stagger step={STAGGER.chip} className="flex flex-wrap gap-3">
            {TELEMETRY.map((channel) => (
              <span
                key={channel.label}
                className="inline-flex items-center gap-1 font-mono text-[10px] text-text-tertiary"
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

      <Reveal delay={0.1} y={6}>
        <div data-layer="aiden" data-layer-context="context">
          <RouterStage theme={theme} />
        </div>
      </Reveal>

      <span data-layer="context" className="sr-only">
        Context graph tethers AWS Terraform EKS to Infrastructure; GitHub
        GitLab Jira to Automation; Datadog Prometheus PagerDuty and checkout-api
        to Observability; OPA Slack Backstage to SRE. Assemblies exchange
        packets across a neural mesh through the Intent Router.
      </span>

      <Reveal delay={0.5} y={4}>
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
          <div className="mb-1 text-center font-mono text-[10px] font-medium text-accent-text">
            Aiden OS
          </div>
          <Stagger
            step={STAGGER.chip}
            className="flex flex-wrap justify-center gap-1.5"
          >
            {OS_CHIPS.map((chip) => (
              <span
                key={chip.label}
                title={chip.label}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium text-text-primary",
                  isLight
                    ? "border-border/70 bg-surface"
                    : "border-border bg-surface",
                )}
              >
                <PhosphorIcon
                  name={chip.icon}
                  className="size-3 shrink-0 text-text-tertiary"
                />
                {chip.label}
              </span>
            ))}
          </Stagger>
        </div>
      </Reveal>
    </div>
  );
}
