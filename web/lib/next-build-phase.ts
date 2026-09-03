/** True while `next build` is collecting/prerendering (no live DB expected in Docker). */
export function isNextProductionBuild(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}
