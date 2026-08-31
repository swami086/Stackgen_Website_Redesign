/**
 * Harvested verbatim from Pencil node names in Stack_Linear.pen (2026-08-29).
 * Source nodes are cited per token. Do not invent values here.
 */

/**
 * Cubic-bezier control points for motion/react `ease`.
 * Declared as a MUTABLE tuple type on purpose: motion's `Easing` type is
 * `[number, number, number, number]`, and a readonly tuple produced by
 * `as const` is not assignable to it. Do not add `as const` here.
 */
type Bezier = [number, number, number, number];

export const EASE: { emphasize: Bezier; standard: Bezier } = {
  /** `k3vas0` "fade+slide 520ms ease.emphasize", `R0IVOn` "orbit enter 520ms ease.emphasize" */
  emphasize: [0.16, 1, 0.3, 1],
  /** `acrOa` "flow-in 180ms ease.standard", `Dsmvf` "enter 180ms ease.standard" */
  standard: [0.4, 0, 0.2, 1],
};

/** Same curves as CSS strings, for keyframes and transitions. */
export const EASE_CSS = {
  emphasize: "cubic-bezier(0.16, 1, 0.3, 1)",
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/** Durations in seconds. */
export const DUR = {
  /** `acrOa` Connector flow-in 180ms */
  flow: 0.18,
  /** `Dsmvf` Chip enter 180ms */
  chip: 0.18,
  /** `k3vas0` Inner Loop Shell 520ms */
  shell: 0.52,
  /** Nav Tier 1 to Tier 2 material crossfade, 240ms (spec) */
  glassFade: 0.24,
  /**
   * Fluid Island width/height morph. Layout needs longer than glassFade
   * (impeccable animate: 300–500ms layout; Apple minimize is direction-led).
   */
  navMorph: 0.42,
} as const;

/** Per-sibling stagger step in seconds. */
export const STAGGER = {
  /** `Dsmvf` -> `o4mGg`: 0/40/80/.../320ms */
  chip: 0.04,
  /** `R0IVOn` -> `CUSuE`: 0/80/160/240ms */
  orbit: 0.08,
  /** `k3vas0` 0ms -> `eYtt6` 160ms */
  shell: 0.16,
  /** Logo row cinematic stagger (spec) */
  logo: 0.05,
} as const;

/** Ambient loop periods in seconds. */
export const AMBIENT = {
  /** `SqQmR` Hub Core pulse glow 2.8s */
  hub: 2.8,
  /** `UZ0dn` Orbit Ring Outer pulse scale 3s, opacity 0.2 -> 0.55 */
  ring: 3,
  /** `Lt9Dw` Aiden OS Bezel pulse border 3.2s */
  bezel: 3.2,
  /** `rZ7X5` Orbit Track rotate linear 18s */
  orbit: 18,
  /** Integrations light sweep (spec) */
  sweep: 6,
} as const;

/** Ring opacity endpoints from `UZ0dn`. */
export const RING_OPACITY = { from: 0.2, to: 0.55 } as const;

/**
 * Per-item stagger step, shrunk so the whole sequence never exceeds `max`.
 * A 40-item list at 40ms would take 1.6s, which reads as latency.
 */
export function capStagger(count: number, step: number, max = 0.4): number {
  if (count <= 1) return step;
  const total = step * (count - 1);
  return total <= max ? step : max / (count - 1);
}
