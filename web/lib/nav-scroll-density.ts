/**
 * Apple Liquid Glass / tabBarMinimizeBehavior(.onScrollDown) analog:
 * compact on scroll-down past a threshold; expand on scroll-up (or at top).
 * Hysteresis + direction delta kill threshold flicker.
 *
 * Caller must seed `prev` from scrollY on mount (e.g. y >= compactY).
 */

export type NavScrollDensityOpts = {
  /** Past this Y, scroll-down may compact. */
  compactY: number;
  /** At or below this Y, always expanded. */
  expandY: number;
  /** Ignore micro jitter below this |delta|. */
  dirDelta: number;
};

export const NAV_SCROLL_DENSITY_DEFAULTS: NavScrollDensityOpts = {
  compactY: 72,
  expandY: 28,
  dirDelta: 6,
};

/**
 * @param prev - whether the island is currently scrolled (compact-eligible)
 * @param y - window.scrollY
 * @param delta - y - previousY (positive = scrolling down)
 */
export function nextNavScrolled(
  prev: boolean,
  y: number,
  delta: number,
  opts: NavScrollDensityOpts = NAV_SCROLL_DENSITY_DEFAULTS,
): boolean {
  if (y <= opts.expandY) return false;
  if (delta > opts.dirDelta && y >= opts.compactY) return true;
  if (delta < -opts.dirDelta) return false;
  return prev;
}
