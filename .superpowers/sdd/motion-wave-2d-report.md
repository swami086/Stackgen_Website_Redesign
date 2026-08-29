# Wave 2D Report

## Progress-to-Layer Bands
- `< 0.3` -> `intent`
- `< 0.45` -> `intent`
- `< 0.65` -> `assemblies`
- `< 0.85` -> `context`
- `>= 0.85` -> `sources`

## Explode Factor Formula
`const explode = Math.min(1, Math.max(0, (progress - 0.12) / 0.18));`
`const lift = explode * LIFT_STEP * index;`

## GSAP Dynamic Import
Verified. GSAP and ScrollTrigger are dynamically imported inside the `useEffect` hook using `await Promise.all([import("gsap"), import("gsap/ScrollTrigger")])`, ensuring they stay out of the initial JavaScript bundle.

## Concerns
- Testing rail click integration: While state updates correctly, without `useLenis` scrubbing the scroll offset manually, rail clicks merely change visual state but don't scrub the page. The prompt states "Rail clicks set activeId directly. Both write to the same state", so it's implemented correctly per instructions.
