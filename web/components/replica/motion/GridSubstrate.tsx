"use client";

import { useEffect, useRef } from "react";
import { mulberry32, SEEDS } from "@/lib/seeded-random";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const SPACING = 28;
const MAX_DPR = 2;

/**
 * Animated dot grid. This is load-bearing, not decoration: it is the only
 * thing the Tier 1 nav glass has to refract, so it carries a deliberate
 * travelling luminance gradient. If this is ever flattened to uniform
 * low-alpha dots, the nav must ship as Tier 2 from the start.
 */
export function GridSubstrate({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let raf = 0;
    let running = true;
    const rng = mulberry32(SEEDS.substrate);

    // Per-dot phase offsets, seeded so the field is reproducible.
    const phases: number[] = [];

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      phases.length = 0;
      for (let i = 0; i < cols * rows; i++) phases.push(rng() * Math.PI * 2);
    };

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ds-text-tertiary").trim() ||
      "#7e8591";

    const draw = (t: number) => {
      if (!running) return;
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = accent();

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      // Travelling luminance band. This is what makes glass above it read.
      const band = ((t / 9000) % 1) * (w + h);

      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++, i++) {
          const px = x * SPACING;
          const py = y * SPACING;
          const dist = Math.abs(px + py - band);
          const falloff = Math.max(0, 1 - dist / 320);
          const twinkle = 0.5 + 0.5 * Math.sin(t / 2600 + (phases[i] ?? 0));
          ctx.globalAlpha = 0.06 + falloff * 0.34 * twinkle;
          ctx.beginPath();
          ctx.arc(px, py, 1.1 + falloff * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw(0);
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
