export type AtmosphereSlot =
  | "hero-field"
  | "video-still"
  | "ground-assemblies"
  | "ground-shell"
  | "ground-who";

export type AtmosphereTheme = "light" | "dark";

export const ATMOSPHERE_OPACITY: Record<AtmosphereSlot, number> = {
  "hero-field": 0.45,
  "video-still": 0.55,
  "ground-assemblies": 0.28,
  "ground-shell": 0.22,
  "ground-who": 0.18,
};

export function atmosphereSrc(
  slot: AtmosphereSlot,
  theme: AtmosphereTheme,
): string {
  return `/media/atmosphere/${slot}-${theme}.png`;
}
