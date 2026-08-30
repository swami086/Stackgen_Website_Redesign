"use client";

/**
 * Communicates: intent routes into factory assemblies, resolves against the
 * Operational Context Graph, then stays governed by Aiden OS. Pencil V2P0L.
 *
 * Motion thesis (execution wave): energy travels DOWN the spine —
 * prompt → Intent Router pulse → assemblies L→R → sources converge on
 * checkout-api → OS chips settle. Mobbin: n8n execute glow, Railway Online
 * pulse, FLORA/ElevenLabs path draw. Reduced motion = assembled final state.
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

const ASSEMBLIES: {
  stage: string;
  title: string;
  meta: string;
  icon: PhosphorIconName;
}[] = [
  {
    stage: "Build",
    title: "Aiden for Infrastructure",
    meta: "Infrastructure · IaC",
    icon: "cloud-arrow-down",
  },
  {
    stage: "Operate",
    title: "Aiden for Automation",
    meta: "Automation · Pipelines",
    icon: "git-branch",
  },
  {
    stage: "Observe",
    title: "Aiden for Observability",
    meta: "Traces · Metrics · Alerts",
    icon: "chart-line",
  },
  {
    stage: "Remediate",
    title: "Aiden for SRE",
    meta: "Incidents · SLOs",
    icon: "heartbeat",
  },
];

const SOURCES = [
  "ecs-svc/checkout",
  "module.checkout_api",
  'job="checkout"',
  "checkout-api",
  "label: checkout",
  "Checkout latency",
] as const;

const OS_CHIPS = [
  "Governance",
  "Guardrails",
  "Tokenomics",
  "Identity & Access",
  "Audit & Evidence",
  "Integrations",
] as const;

/** Vertical spine segment (viewBox units). Shared by DrawPath + Beam. */
const SPINE_D = "M12 0 V40";
const SPIDER_YS = [16, 40, 64, 88, 112, 136] as const;

function SpineSegment({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotionSafe();
  return (
    <svg
      width="24"
      height="40"
      viewBox="0 0 24 40"
      className="overflow-visible text-border"
      aria-hidden
    >
      <DrawPath
        d={SPINE_D}
        className="stroke-current"
        strokeWidth={1.25}
        delay={delay}
        duration={DUR.shell}
      />
      {!reduced && (
        <Beam
          d={SPINE_D}
          className="fill-accent"
          duration={AMBIENT.sweep / 2}
          delay={delay + DUR.shell}
          r={2.25}
        />
      )}
    </svg>
  );
}

function FlowLabel({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <SpineSegment delay={delay} />
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-text-tertiary">
        {children}
      </span>
      <SpineSegment delay={delay + 0.12} />
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
  const reduced = useReducedMotionSafe();
  void theme;

  return (
    <div
      role="img"
      aria-label="Operational Context Graph: ask Aiden, route intent to factory assemblies, enrich from context sources into one entity, govern through Aiden OS"
      className={cn(
        "glass-specular flex w-full max-w-4xl flex-col rounded-[20px] border border-border p-5 md:p-8",
        className,
      )}
    >
      {/* Prompt — wave starts here */}
      <Reveal delay={0} y={10}>
        <div className="rounded-xl border border-border bg-surface-raised p-3 md:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-text-secondary">
                Ask Aiden to investigate latency spike in checkout…
                {!reduced && (
                  <motion.span
                    aria-hidden
                    className="ml-0.5 inline-block h-3.5 w-px align-middle bg-accent"
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PROMPT_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-tertiary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent md:self-center">
              Submit
              <PhosphorIcon name="arrow-right" className="size-3.5" />
            </span>
          </div>
        </div>
      </Reveal>

      {/* Intent Router — n8n-style active node pulse */}
      <div className="flex flex-col items-center gap-2 py-3">
        <SpineSegment delay={0.15} />
        <Reveal delay={0.22} y={8}>
          <motion.div
            className="relative flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2"
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 0 color-mix(in srgb, var(--ds-accent) 0%, transparent)",
                      "0 0 0 8px color-mix(in srgb, var(--ds-accent) 18%, transparent)",
                      "0 0 0 0 color-mix(in srgb, var(--ds-accent) 0%, transparent)",
                    ],
                  }
            }
            transition={{
              duration: AMBIENT.hub,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-accent/15 text-accent-text">
              <PhosphorIcon name="git-branch" className="size-4" />
            </span>
            <span className="text-sm font-semibold text-text-primary">
              Intent Router
            </span>
            {!reduced && (
              <motion.span
                aria-hidden
                className="absolute -right-1 -top-1 size-2 rounded-full bg-pass"
                animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }}
                transition={{
                  duration: AMBIENT.hub,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        </Reveal>
      </div>

      <FlowLabel delay={0.35}>Route to assembly</FlowLabel>

      {/* Factory Assemblies — sequential L→R light-up */}
      <Reveal delay={0.42} y={12}>
        <div
          className="relative overflow-hidden rounded-xl border p-4"
          style={{
            borderColor: "var(--ds-layer-agent-stroke)",
            backgroundColor: "var(--ds-layer-agent-bg)",
          }}
        >
          {!reduced && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{
                boxShadow:
                  "inset 0 0 0 1px color-mix(in srgb, var(--ds-layer-agent-stroke) 70%, transparent)",
              }}
              animate={{ opacity: [0.45, 0.95, 0.45] }}
              transition={{
                duration: AMBIENT.bezel,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-pass">
              Factory assemblies
            </span>
            <span className="text-xs text-text-tertiary">
              Build · Operate · Observe · Remediate
            </span>
          </div>
          <Stagger
            step={STAGGER.orbit}
            className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ASSEMBLIES.map((card) => (
              <div
                key={card.stage}
                className="flex flex-col gap-2 rounded-lg border border-border bg-surface/90 p-3"
              >
                <div className="flex items-center gap-2">
                  <PhosphorIcon
                    name={card.icon}
                    className="size-4 text-text-secondary"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
                    {card.stage}
                  </span>
                </div>
                <div className="text-sm font-semibold text-text-primary">
                  {card.title}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wide text-text-tertiary">
                  {card.meta}
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </Reveal>

      <FlowLabel delay={0.55}>Enrich from context</FlowLabel>

      {/* Graph Resolution — spider DrawPath + Beam into checkout-api */}
      <Reveal delay={0.6} y={12}>
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
            Graph resolution
          </div>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_minmax(200px,280px)]">
            <Stagger step={STAGGER.chip} className="flex flex-col gap-2">
              {SOURCES.map((src) => (
                <div
                  key={src}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface-raised px-3 py-2"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <code className="truncate font-mono text-[11px] text-text-secondary">
                    {src}
                  </code>
                </div>
              ))}
            </Stagger>

            <svg
              className="mx-auto hidden h-40 w-16 overflow-visible text-border md:block"
              viewBox="0 0 64 160"
              aria-hidden
            >
              {SPIDER_YS.map((y, i) => {
                const d = `M0 ${y} C28 ${y}, 36 80, 64 80`;
                return (
                  <g key={y}>
                    <DrawPath
                      d={d}
                      className="stroke-current"
                      strokeWidth={1}
                      delay={0.65 + i * 0.05}
                      duration={0.55}
                    />
                    {!reduced && (
                      <Beam
                        d={d}
                        className="fill-accent"
                        duration={2.4 + i * 0.15}
                        delay={1.1 + i * 0.08}
                        r={1.75}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            <motion.div
              className="rounded-xl border p-4 shadow-sm"
              style={{
                borderColor: "var(--ds-layer-intent-stroke)",
                backgroundColor: "var(--ds-layer-intent-bg)",
              }}
              animate={
                reduced
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 0 color-mix(in srgb, var(--ds-accent) 0%, transparent)",
                        "0 0 24px 0 color-mix(in srgb, var(--ds-accent) 22%, transparent)",
                        "0 0 0 0 color-mix(in srgb, var(--ds-accent) 0%, transparent)",
                      ],
                    }
              }
              transition={{
                duration: AMBIENT.hub,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <div className="text-base font-semibold text-text-primary">
                checkout-api
              </div>
              <div className="mt-1 text-xs text-text-secondary">
                one entity · six sources
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-wide text-text-tertiary">
                owner · env · deps · recent change
              </div>
            </motion.div>
          </div>
          <p className="mt-4 text-center text-xs text-text-tertiary">
            Resolution covers what you connect. Nothing beyond that.
          </p>
        </div>
      </Reveal>

      <FlowLabel delay={0.75}>Governed by</FlowLabel>

      {/* Aiden OS — chips settle */}
      <Reveal delay={0.8} y={10}>
        <div
          className="rounded-xl border p-4"
          style={{
            backgroundColor: "var(--ds-layer-os-bg)",
            borderColor: "var(--ds-layer-os-stroke)",
          }}
        >
          <div className="mb-3 text-center text-sm font-semibold text-accent-text">
            Aiden Agentic Operating System
          </div>
          <Stagger
            step={STAGGER.chip}
            className="flex flex-wrap justify-center gap-2"
          >
            {OS_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary"
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
