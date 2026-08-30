"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

export type RailLayer = { id: string; label: string };

type Props = {
  layers: readonly RailLayer[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
};

/**
 * Accessible tablist rail. This is a real control, not a hover affectation:
 * roving tabindex, arrow/Home/End keys, aria-selected. Scroll and rail are
 * both inputs to one state machine owned by the parent, so they cannot
 * diverge.
 */
export function LayerRail({ layers, activeId, onSelect, className }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, layers.findIndex((l) => l.id === activeId));

  const move = (next: number) => {
    const clamped = (next + layers.length) % layers.length;
    onSelect(layers[clamped]!.id);
    refs.current[clamped]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation="vertical"
      aria-label="Aiden OS layers"
      className={cn("flex flex-col gap-1", className)}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            e.preventDefault();
            move(index + 1);
            break;
          case "ArrowUp":
          case "ArrowLeft":
            e.preventDefault();
            move(index - 1);
            break;
          case "Home":
            e.preventDefault();
            move(0);
            break;
          case "End":
            e.preventDefault();
            move(layers.length - 1);
            break;
        }
      }}
    >
      {layers.map((layer, i) => {
        const selected = layer.id === activeId;
        return (
          <button
            key={layer.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`rail-tab-${layer.id}`}
            aria-selected={selected}
            aria-controls={`rail-panel-${layer.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(layer.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-left text-[13px] transition-colors",
              selected
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
            )}
          >
            <span
              className={cn(
                "mr-2 font-mono text-[11px] tabular-nums",
                selected ? "text-text-secondary" : "text-text-tertiary",
              )}
            >
              {String(layers.length - i).padStart(2, "0")}
            </span>
            {layer.label}
          </button>
        );
      })}
    </div>
  );
}
