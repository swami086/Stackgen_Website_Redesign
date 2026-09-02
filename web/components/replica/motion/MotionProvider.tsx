"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const LenisReadyContext = createContext(false);

/**
 * Single owner of smooth scroll and ScrollTrigger registration.
 * GSAP is imported dynamically so it stays out of the initial bundle;
 * Shell OCG pinning uses it when Lenis is enabled.
 *
 * Lenis go/no-go (spec, Wave 0 decision): if the pinned scrub jitters at
 * 120Hz, set LENIS_ENABLED to false and ship native scroll. Do not defer
 * this past Wave 0.
 */
const LENIS_ENABLED = true;

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced || !LENIS_ENABLED) {
      setReady(true);
      return;
    }

    let disposed = false;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const instance = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis = instance;

      instance.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        instance.raf(time * 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      ScrollTrigger.refresh();
      setReady(true);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced]);

  return <LenisReadyContext.Provider value={ready}>{children}</LenisReadyContext.Provider>;
}

export function useLenisReady(): boolean {
  return useContext(LenisReadyContext);
}
