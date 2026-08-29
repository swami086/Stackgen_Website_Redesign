/**
 * Deterministic PRNG. `Math.random` is banned in rendering code because the
 * particle simulation and scatter entrances must reproduce byte-identically
 * for Playwright parity captures.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fixed seeds so every surface is reproducible and independently tunable. */
export const SEEDS = {
  particles: 1337,
  integrations: 4242,
  substrate: 8080,
} as const;

export function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

export function range(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}
