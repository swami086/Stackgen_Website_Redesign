"use client";

import { useEffect, useRef } from "react";
import { mulberry32, range, SEEDS } from "@/lib/seeded-random";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export type WorkItemKind = "edit" | "commit" | "pipeline" | "plan";
export type EmittedKind = "drift-check" | "deploy" | "verify" | "provision";

/**
 * The absorb-transform-emit chain IS the argument of this diagram:
 * an item enters as a commit and leaves as a deploy. Flow lines cannot
 * say this. If these labels stop transforming, the diagram has failed.
 */
export const TRANSFORM_MAP: Record<WorkItemKind, EmittedKind> = {
  edit: "drift-check",
  commit: "deploy",
  pipeline: "verify",
  plan: "provision",
};

/** Bounds cost regardless of how long the section stays in view. */
export const MAX_PARTICLES = 40;

export type FieldAnchor = { id: string; x: number; y: number };
export type SourceAnchor = FieldAnchor & { emits: WorkItemKind };

type Phase = "inbound" | "outbound";

type Particle = {
  kind: WorkItemKind | EmittedKind;
  phase: Phase;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  t: number;
  speed: number;
  wobble: number;
  wobblePhase: number;
  size: number;
  sourceId: string;
};

export type ParticleFieldProps = {
  sources: readonly SourceAnchor[];
  hub: FieldAnchor;
  sinks: readonly FieldAnchor[];
  seed?: number;
  /** Pins the field to a fixed tick for reproducible capture. */
  frozen?: boolean;
  /** Dims particles not originating from this source id. */
  isolateSourceId?: string | null;
  /** Called when the hub absorbs an item, so the parent can pulse a satellite. */
  onAbsorb?: (kind: WorkItemKind) => void;
  className?: string;
};

const LABEL_MIN_WIDTH = 1024;
const FROZEN_TICKS = 240;

export function ParticleField({
  sources,
  hub,
  sinks,
  seed = SEEDS.particles,
  frozen = false,
  isolateSourceId = null,
  onAbsorb,
  className,
}: ParticleFieldProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotionSafe();
  const isolateRef = useRef(isolateSourceId);
  isolateRef.current = isolateSourceId;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rng = mulberry32(seed);
    const particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let sinkCursor = 0;

    // Per-source emission cadence, jittered so the field never falls into
    // visible lockstep. Seeded, so the jitter is reproducible.
    const cadence = sources.map(() => range(rng, 0.9, 1.9));
    const nextEmit = sources.map(() => range(rng, 0, 1.2));

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const spawn = (i: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const s = sources[i]!;
      particles.push({
        kind: s.emits,
        phase: "inbound",
        fromX: s.x,
        fromY: s.y,
        toX: hub.x,
        toY: hub.y,
        t: 0,
        speed: range(rng, 0.22, 0.38),
        wobble: range(rng, 0.006, 0.022),
        wobblePhase: range(rng, 0, Math.PI * 2),
        size: range(rng, 2.2, 3.4),
        sourceId: s.id,
      });
    };

    const emitFromHub = (p: Particle) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const sink = sinks[sinkCursor % sinks.length]!;
      sinkCursor++;
      particles.push({
        kind: TRANSFORM_MAP[p.kind as WorkItemKind],
        phase: "outbound",
        fromX: hub.x,
        fromY: hub.y,
        toX: sink.x,
        toY: sink.y,
        t: 0,
        speed: range(rng, 0.24, 0.4),
        wobble: range(rng, 0.004, 0.016),
        wobblePhase: range(rng, 0, Math.PI * 2),
        size: range(rng, 2.2, 3.2),
        sourceId: p.sourceId,
      });
    };

    let last = 0;
    const step = (now: number) => {
      if (!running) return;
      const dt = last === 0 ? 0.016 : Math.min((now - last) / 1000, 0.05);
      last = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const showLabels = w >= LABEL_MIN_WIDTH;
      const accent = readVar("--ds-accent", "#8c85ff");
      const text = readVar("--ds-text-secondary", "#9aa0ac");

      for (let i = 0; i < sources.length; i++) {
        nextEmit[i]! -= dt;
        if (nextEmit[i]! <= 0) {
          spawn(i);
          nextEmit[i] = cadence[i]! * range(rng, 0.7, 1.3);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.font = "500 9px var(--font-mono, monospace)";
      ctx.textBaseline = "middle";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.t += p.speed * dt;

        if (p.t >= 1) {
          if (p.phase === "inbound") {
            onAbsorb?.(p.kind as WorkItemKind);
            emitFromHub(p);
          }
          particles.splice(i, 1);
          continue;
        }

        const ease = p.t * p.t * (3 - 2 * p.t);
        const nx = p.fromX + (p.toX - p.fromX) * ease;
        const ny =
          p.fromY +
          (p.toY - p.fromY) * ease +
          Math.sin(p.t * Math.PI * 2 + p.wobblePhase) * p.wobble;

        const px = nx * w;
        const py = ny * h;

        const dimmed =
          isolateRef.current !== null && p.sourceId !== isolateRef.current;
        const alpha = (dimmed ? 0.3 : 1) * Math.sin(p.t * Math.PI);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.phase === "outbound" ? accent : text;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (showLabels && p.size > 2.6) {
          ctx.globalAlpha = alpha * 0.75;
          ctx.fillText(p.kind, px + p.size + 4, py);
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced || frozen) {
      // Render one readable, fully labelled snapshot. Under reduced motion
      // the diagram must still show that work flows through the hub and
      // gets transformed, so the frozen frame has to be legible.
      last = 0;
      for (let k = 0; k < FROZEN_TICKS; k++) step(k * 16);
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !frozen) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sources, hub, sinks, seed, frozen, reduced, onAbsorb]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-motion-field="work-items"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
