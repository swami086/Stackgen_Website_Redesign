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
  sinkId?: string;
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
  /** Called when a transformed item leaves the hub toward a sink. */
  onEmit?: (kind: EmittedKind, sinkId: string) => void;
  className?: string;
};

const LABEL_MIN_WIDTH = 1024;
const FROZEN_TICKS = 240;

function drawShard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  // Puzzle-facet silhouette: irregular quad, not a circle.
  ctx.moveTo(size, 0);
  ctx.lineTo(size * 0.25, size * 0.75);
  ctx.lineTo(-size * 0.85, size * 0.35);
  ctx.lineTo(-size * 0.2, -size * 0.7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size * 0.85, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size * 0.85, y);
  ctx.closePath();
  ctx.fill();
}

export function ParticleField({
  sources,
  hub,
  sinks,
  seed = SEEDS.particles,
  frozen = false,
  isolateSourceId = null,
  onAbsorb,
  onEmit,
  className,
}: ParticleFieldProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotionSafe();
  const isolateRef = useRef(isolateSourceId);
  isolateRef.current = isolateSourceId;
  const onAbsorbRef = useRef(onAbsorb);
  onAbsorbRef.current = onAbsorb;
  const onEmitRef = useRef(onEmit);
  onEmitRef.current = onEmit;

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
        size: range(rng, 2.4, 3.6),
        sourceId: s.id,
      });
    };

    const emitFromHub = (p: Particle) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const sink = sinks[sinkCursor % sinks.length]!;
      sinkCursor++;
      const emitted = TRANSFORM_MAP[p.kind as WorkItemKind];
      onEmitRef.current?.(emitted, sink.id);
      particles.push({
        kind: emitted,
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
        sinkId: sink.id,
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
      // Deck cyan — not a CSS token yet; stitch trails only.
      const cyan = "#A8E0F8";

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
      ctx.lineCap = "round";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.t += p.speed * dt;

        if (p.t >= 1) {
          if (p.phase === "inbound") {
            onAbsorbRef.current?.(p.kind as WorkItemKind);
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
        const fromPx = p.fromX * w;
        const fromPy = p.fromY * h;

        const dimmed =
          isolateRef.current !== null && p.sourceId !== isolateRef.current;
        const alpha = (dimmed ? 0.3 : 1) * Math.sin(p.t * Math.PI);

        // Stitch thread: a fading trail that "sews" shard → hub → sink.
        ctx.globalAlpha = alpha * 0.28;
        ctx.strokeStyle = p.phase === "outbound" ? accent : cyan;
        ctx.lineWidth = p.phase === "outbound" ? 1.25 : 1;
        ctx.beginPath();
        ctx.moveTo(fromPx, fromPy);
        ctx.quadraticCurveTo(
          (fromPx + px) / 2,
          (fromPy + py) / 2 + Math.sin(p.wobblePhase) * 8,
          px,
          py,
        );
        ctx.stroke();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.phase === "outbound" ? accent : text;
        if (p.phase === "inbound") {
          drawShard(ctx, px, py, p.size, p.wobblePhase + p.t * Math.PI);
        } else {
          drawLock(ctx, px, py, p.size * 0.95);
        }

        if (showLabels && p.size > 2.6) {
          ctx.globalAlpha = alpha * 0.75;
          ctx.fillStyle = p.phase === "outbound" ? accent : text;
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
  }, [sources, hub, sinks, seed, frozen, reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-motion-field="work-items"
      data-motion-metaphor="puzzle-stitch"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
