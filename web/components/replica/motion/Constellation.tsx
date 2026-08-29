"use client";

import { EASE_CSS } from "@/lib/motion-tokens";

export type ConstellationNode = { id: string; label: string; x: number; y: number };
export type ConstellationEdge = { from: string; to: string };

type Props = {
  nodes: readonly ConstellationNode[];
  edges: readonly ConstellationEdge[];
  /** 0..1. Nodes and edges reveal proportionally, so scroll can drive it. */
  progress: number;
  className?: string;
};

/**
 * A sparse labelled graph, not boxes and arrows. Must be rendered inside
 * an <svg>. Progress-driven rather than time-driven so the same component
 * serves both the scrubbed and the static reduced-motion path.
 */
export function Constellation({ nodes, edges, progress, className }: Props) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const nodeCut = progress * nodes.length;
  const edgeCut = Math.max(0, (progress - 0.25) / 0.75) * edges.length;

  return (
    <g className={className}>
      {edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const shown = Math.min(1, Math.max(0, edgeCut - i));
        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={a.x}
            y1={a.y}
            x2={a.x + (b.x - a.x) * shown}
            y2={a.y + (b.y - a.y) * shown}
            stroke="currentColor"
            strokeWidth={0.75}
            opacity={0.34 * shown}
          />
        );
      })}
      {nodes.map((n, i) => {
        const shown = Math.min(1, Math.max(0, nodeCut - i));
        return (
          <g
            key={n.id}
            opacity={shown}
            style={{ transition: `opacity 240ms ${EASE_CSS.standard}` }}
          >
            <circle cx={n.x} cy={n.y} r={2.5} fill="currentColor" />
            <text
              x={n.x + 7}
              y={n.y + 3}
              fontSize={7}
              fill="currentColor"
              opacity={0.72}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
