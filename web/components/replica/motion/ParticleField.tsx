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
  /**
   * Soft Structuralism quiet mode: no kind labels, lower trail alpha,
   * smaller shards. Prefer corridor clip instead of quiet when the hub
   * stitch must still read.
   */
  quiet?: boolean;
  /**
   * Kind labels: off, always (wide canvases), or only near the hub so
   * absorb→emit still teaches without labeling the shell edges.
   */
  labels?: boolean | "hub";
  /** Normalized x band where particles may draw (default full width). */
  corridor?: { minX: number; maxX: number };
  /** Override density cap (default MAX_PARTICLES). */
  maxParticles?: number;
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
  quiet = false,
  labels,
  corridor,
  maxParticles = MAX_PARTICLES,
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
  const labelMode: boolean | "hub" =
    labels === undefined ? (quiet ? false : true) : labels;

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
    const cadence = sources.map(() =>
      quiet ? range(rng, 1.4, 2.4) : range(rng, 0.9, 1.9),
    );
    const nextEmit = sources.map(() => range(rng, 0, quiet ? 1.6 : 1.2));
    const cap = Math.min(maxParticles, MAX_PARTICLES);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const spawn = (i: number) => {
      if (particles.length >= cap) particles.shift();
      const s = sources[i]!;
      particles.push({
        kind: s.emits,
        phase: "inbound",
        fromX: s.x,
        fromY: s.y,
        toX: hub.x,
        toY: hub.y,
        t: 0,
        speed: quiet ? range(rng, 0.18, 0.28) : range(rng, 0.22, 0.38),
        wobble: quiet ? range(rng, 0.002, 0.008) : range(rng, 0.006, 0.022),
        wobblePhase: range(rng, 0, Math.PI * 2),
        size: quiet ? range(rng, 1.6, 2.4) : range(rng, 2.4, 3.6),
        sourceId: s.id,
      });
    };

    const emitFromHub = (p: Particle) => {
      if (particles.length >= cap) particles.shift();
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
        speed: quiet ? range(rng, 0.2, 0.3) : range(rng, 0.24, 0.4),
        wobble: quiet ? range(rng, 0.001, 0.006) : range(rng, 0.004, 0.016),
        wobblePhase: range(rng, 0, Math.PI * 2),
        size: quiet ? range(rng, 1.5, 2.2) : range(rng, 2.2, 3.2),
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
      const wideEnough = w >= LABEL_MIN_WIDTH;
      const accent = readVar("--ds-accent", "#8c85ff");
      const text = readVar("--ds-text-secondary", "#9aa0ac");
      const cyan = "#A8E0F8";
      const trailAlpha = quiet ? 0.12 : 0.24;
      const curveAmp = quiet ? 3 : 6;
      const minX = (corridor?.minX ?? 0) * w;
      const maxX = (corridor?.maxX ?? 1) * w;

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

      // Keep threads inside the hub corridor so Soft Structuralism shells stay clean.
      if (corridor) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(minX, 0, maxX - minX, h);
        ctx.clip();
      }

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
        // Trail starts at the corridor edge so we never paint past the shells.
        const fromNx = corridor
          ? Math.min(Math.max(p.fromX, corridor.minX), corridor.maxX)
          : p.fromX;
        const fromPx = fromNx * w;
        const fromPy = p.fromY * h;

        const dimmed =
          isolateRef.current !== null && p.sourceId !== isolateRef.current;
        const alpha = (dimmed ? 0.3 : 1) * Math.sin(p.t * Math.PI);

        ctx.globalAlpha = alpha * trailAlpha;
        ctx.strokeStyle = p.phase === "outbound" ? accent : cyan;
        ctx.lineWidth = quiet ? 0.85 : p.phase === "outbound" ? 1.25 : 1;
        ctx.beginPath();
        ctx.moveTo(fromPx, fromPy);
        ctx.quadraticCurveTo(
          (fromPx + px) / 2,
          (fromPy + py) / 2 + Math.sin(p.wobblePhase) * curveAmp,
          px,
          py,
        );
        ctx.stroke();

        ctx.globalAlpha = alpha * (quiet ? 0.75 : 1);
        ctx.fillStyle = p.phase === "outbound" ? accent : text;
        if (p.phase === "inbound") {
          drawShard(ctx, px, py, p.size, p.wobblePhase + p.t * Math.PI);
        } else {
          drawLock(ctx, px, py, p.size * 0.95);
        }

        if (p.size > 2.2 && wideEnough && labelMode !== false) {
          const nearHub = Math.abs(nx - hub.x) < 0.09;
          const drawLabel =
            labelMode === true ? true : labelMode === "hub" ? nearHub : false;
          if (drawLabel) {
            ctx.globalAlpha = alpha * 0.8;
            ctx.fillStyle = p.phase === "outbound" ? accent : text;
            ctx.fillText(p.kind, px + p.size + 4, py);
          }
        }
      }

      if (corridor) ctx.restore();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced || frozen) {
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
  }, [sources, hub, sinks, seed, frozen, reduced, quiet, corridor, maxParticles, labelMode]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-motion-field="work-items"
      data-motion-metaphor={corridor ? "corridor-stitch" : quiet ? "soft-corridor" : "puzzle-stitch"}
      data-motion-quiet={quiet ? "true" : "false"}
      data-motion-labels={String(labelMode)}
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
