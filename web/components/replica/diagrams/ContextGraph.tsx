"use client";

/**
 * Communicates: Aiden OS is a machined stack the visitor can explode and
 * inspect layer-by-layer (Class B object + Class C instrument).
 */
import React, { useEffect, useRef, useState } from "react";
import { IsoScene, IsoLayer, Billboard } from "@/components/replica/motion/IsoScene";
import { Constellation, type ConstellationNode, type ConstellationEdge } from "@/components/replica/motion/Constellation";
import { LayerRail, type RailLayer } from "@/components/replica/motion/LayerRail";
import { VendorMark } from "@/components/replica/logos";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";

export const CONTEXT_LAYERS: readonly RailLayer[] = [
  { id: "intent", label: "Intent" },
  { id: "assemblies", label: "Assemblies" },
  { id: "context", label: "System of Context" },
  { id: "sources", label: "Data Sources" },
];

const GRAPH_NODES: ConstellationNode[] = [
  { id: "checkout-api", label: "checkout-api", x: 100, y: 100 },
  { id: "n2", label: "user-service", x: 150, y: 150 },
  { id: "n3", label: "payment-gw", x: 50, y: 150 },
];

const GRAPH_EDGES: ConstellationEdge[] = [
  { from: "checkout-api", to: "n2" },
  { from: "checkout-api", to: "n3" },
];

export function ContextGraph({ theme }: { theme: "light" | "dark" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("intent");
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotionSafe();

  const layerForProgress = (p: number): string => {
    if (p < 0.3) return "intent";
    if (p < 0.45) return "intent";
    if (p < 0.65) return "assemblies";
    if (p < 0.85) return "context";
    return "sources";
  };

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setProgress(1);
      return;
    }

    let ctxRef: { revert: () => void } | null = null;
    let disposed = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: rootRef.current!,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActiveId(layerForProgress(self.progress));
          },
        });
      }, rootRef);
      ctxRef = ctx;
    })();

    return () => {
      disposed = true;
      ctxRef?.revert();
    };
  }, [reduced]);

  const explode = Math.min(1, Math.max(0, (progress - 0.12) / 0.18));
  const LIFT_STEP = 78;
  const graphProgress = Math.min(1, Math.max(0, (progress - 0.65) / 0.2));

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[100dvh] w-full flex-col lg:flex-row items-center lg:items-start justify-center gap-12 overflow-hidden px-4 lg:px-12 py-24"
    >
      <div className="flex-none lg:sticky lg:top-1/2 lg:-translate-y-1/2 z-10 w-full lg:w-48 order-last lg:order-first">
        <LayerRail
          layers={CONTEXT_LAYERS}
          activeId={activeId}
          onSelect={(id) => {
            setActiveId(id);
            // In a real scrubbed section, clicking the rail might also scroll the page,
            // but the prompt explicitly states "Rail clicks set activeId directly."
          }}
        />
      </div>

      {/* role=img only on the decorative stack — never wrap the operable rail */}
      <div
        role="img"
        aria-label="context graph illustrating four layers: Intent, Assemblies, System of Context, and Data Sources."
        className="flex-1 w-full max-w-3xl flex items-center justify-center lg:min-h-screen"
      >
        <IsoScene className="w-full lg:w-[600px] h-[600px] flex items-center justify-center">
          {CONTEXT_LAYERS.slice().reverse().map((layer, reverseIndex) => {
            const index = reverseIndex; // sources=0, context=1, assemblies=2, intent=3
            return (
              <IsoLayer 
                key={layer.id}
                index={index} 
                lift={explode * LIFT_STEP * index} 
                active={layer.id === activeId || reduced}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  id={`rail-panel-${layer.id}`}
                  role="tabpanel"
                  aria-labelledby={`rail-tab-${layer.id}`}
                  className="w-[400px] h-[300px] border border-border-primary bg-bg-primary/80 rounded-xl p-6 flex flex-col shadow-sm"
                >
                  <h3 className="text-sm font-semibold mb-4 text-text-primary">{layer.label}</h3>
                  {layer.id === "intent" && (
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-bg-secondary rounded-full text-xs">auto-route</span>
                        <span className="px-3 py-1 bg-bg-secondary rounded-full text-xs">world model</span>
                        <span className="px-3 py-1 bg-bg-secondary rounded-full text-xs">guardrails</span>
                      </div>
                    </div>
                  )}
                  {layer.id === "assemblies" && (
                    <div className="grid grid-cols-2 gap-4">
                      {["Aiden for Infrastructure", "Aiden for Automation", "Aiden for Observability", "Aiden for SRE"].map((card) => (
                        <div key={card} className="bg-bg-secondary p-3 rounded-lg text-xs font-medium text-text-secondary text-center">
                          {card}
                        </div>
                      ))}
                    </div>
                  )}
                  {layer.id === "context" && (
                    <div className="flex-1 relative w-full h-full">
                      <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <Constellation 
                          nodes={GRAPH_NODES} 
                          edges={GRAPH_EDGES} 
                          progress={reduced ? 1 : graphProgress} 
                        />
                      </svg>
                    </div>
                  )}
                  {layer.id === "sources" && (
                    <div className="flex flex-wrap gap-6 items-center justify-center h-full">
                      {["aws", "terraform", "prometheus", "backstage", "jira"].map((slug) => (
                        <Billboard key={slug}>
                          <div data-vendor-slug={slug} className="w-12 h-12 bg-bg-secondary rounded-lg flex items-center justify-center p-2">
                            <VendorMark slug={slug as any} theme={theme} className="w-full h-full text-text-primary" />
                          </div>
                        </Billboard>
                      ))}
                    </div>
                  )}
                </div>
              </IsoLayer>
            );
          })}
        </IsoScene>
      </div>
    </div>
  );
}
