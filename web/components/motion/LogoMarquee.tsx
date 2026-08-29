"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useIsomorphicLayoutEffect, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const RAMP = 0.19;
const SETTLE = 0.16;
const MAX_COPIES = 14;

type UseLogoMarqueeOptions = {
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  paused?: boolean;
};

function fold(x: number, loop: number) {
  const m = x % loop;
  return m > 0 ? m - loop : m;
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

function useLogoMarquee({
  speed = 40,
  direction = "left",
  gap = 48,
  paused = false,
}: UseLogoMarqueeOptions = {}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  const [copies, setCopies] = useState(4);
  const [held, setHeld] = useState(false);
  const [near, setNear] = useState(false);

  const reduced = useReducedMotion() === true;
  const stopped = held || paused;

  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const movingRef = useRef(false);
  movingRef.current = !stopped && !reduced;

  const offset = useRef(0);
  const nudge = useRef(0);
  const rate = useRef(0);
  const span = useRef(0);

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = reducedRef.current ? 0 : offset.current - span.current;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const loop = width > 0 ? width + gap : 0;
      const room = viewport.getBoundingClientRect().width;
      span.current = loop;
      offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0;
      paint();

      const next =
        reduced || loop <= 0
          ? 4
          : clamp(Math.ceil(room / loop) + 3, 4, MAX_COPIES);
      setCopies((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [gap, paint, reduced]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) setNear(entry.isIntersecting);
      },
      { rootMargin: "96px" },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !near) return;

    let frame = 0;
    let last = 0;
    const sign = direction === "right" ? 1 : -1;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const loop = span.current;
      if (loop <= 0) return;

      rate.current +=
        ((movingRef.current ? 1 : 0) - rate.current) *
        (1 - Math.exp(-dt / RAMP));

      const pull = nudge.current * (1 - Math.exp(-dt / SETTLE));
      nudge.current -= pull;

      let x = offset.current + sign * speed * rate.current * dt + pull;
      if (rate.current > 0.002 && Math.abs(nudge.current) < 0.25) {
        nudge.current = 0;
        x = fold(x, loop);
      } else {
        x = clamp(x, -loop, loop);
      }

      offset.current = x;
      paint();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, near, speed, direction, paint]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const pin = () => {
      if (reducedRef.current) return;
      if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
      if (viewport.scrollTop !== 0) viewport.scrollTop = 0;
    };

    viewport.addEventListener("scroll", pin, { passive: true });
    return () => viewport.removeEventListener("scroll", pin);
  }, []);

  useEffect(() => {
    const release = () => setHeld(false);
    window.addEventListener("blur", release);
    return () => window.removeEventListener("blur", release);
  }, []);

  const bind = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType !== "touch") setHeld(true);
    },
    onPointerDown: () => setHeld(true),
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType === "touch") setHeld(false);
    },
    onPointerCancel: () => setHeld(false),
    onPointerLeave: () => setHeld(false),
  };

  return {
    viewportRef,
    trackRef,
    groupRef,
    copies,
    reduced,
    bind,
  };
}

export type LogoMarqueeItem = {
  id: string;
  mark: ReactNode;
};

type LogoMarqueeProps = {
  items: LogoMarqueeItem[];
  label?: string;
  speed?: number;
  gap?: number;
  direction?: "left" | "right";
  className?: string;
};

/** 21st ddoemonn logo-marquee — themed for ds tokens, Vapi-style trust strip. */
export function LogoMarquee({
  items,
  label = "Customer logos",
  speed = 38,
  gap = 56,
  direction = "left",
  className,
}: LogoMarqueeProps) {
  const { viewportRef, trackRef, groupRef, copies, reduced, bind } =
    useLogoMarquee({ speed, gap, direction });

  const groups = reduced ? 1 : copies;
  const live = reduced ? 0 : 1;

  return (
    <section
      aria-label={label}
      className={cn("relative isolate w-full overflow-hidden", className)}
      {...bind}
    >
      <div
        ref={viewportRef}
        className="overflow-y-hidden py-2 outline-none"
        style={{ overflowX: reduced ? "auto" : "hidden" }}
      >
        <div
          ref={trackRef}
          style={{ gap, willChange: "transform" }}
          className="flex w-max items-center"
        >
          {Array.from({ length: groups }, (_, copy) => (
            <ul
              key={copy}
              ref={copy === live ? groupRef : undefined}
              aria-hidden={copy === live ? undefined : true}
              style={{ gap }}
              className="flex w-max items-center"
            >
              {items.map((item) => (
                <li key={`${copy}-${item.id}`} className="shrink-0 opacity-80">
                  {copy !== live ? (
                    <span className="inline-flex h-8 w-[130px] items-center justify-center">
                      {item.mark}
                    </span>
                  ) : (
                    <span className="inline-flex h-8 w-[130px] items-center justify-center transition-opacity duration-500 hover:opacity-100">
                      {item.mark}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent"
      />
    </section>
  );
}
