/** high-end-visual-design: spring-like cubic-bezier, not ease-in-out */
export const SPRING_EASE = [0.32, 0.72, 0, 1] as const;

export const revealTransition = (delay = 0, duration = 0.8) => ({
  delay,
  duration,
  ease: SPRING_EASE,
});
