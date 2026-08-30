import { render } from "@testing-library/react";
import {
  ParticleField,
  TRANSFORM_MAP,
  MAX_PARTICLES,
} from "@/components/replica/motion/ParticleField";

const SOURCES = [
  { id: "ide", x: 0.1, y: 0.2, emits: "edit" },
  { id: "git", x: 0.1, y: 0.4, emits: "commit" },
  { id: "ci", x: 0.1, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.1, y: 0.8, emits: "plan" },
] as const;
const HUB = { id: "hub", x: 0.5, y: 0.5 };
const SINKS = [
  { id: "runtime", x: 0.9, y: 0.3 },
  { id: "infra", x: 0.9, y: 0.5 },
  { id: "obs", x: 0.9, y: 0.7 },
] as const;

test("the absorb-transform-emit map is the diagram's argument", () => {
  expect(TRANSFORM_MAP).toEqual({
    edit: "drift-check",
    commit: "deploy",
    pipeline: "verify",
    plan: "provision",
  });
});

test("density is hard-capped", () => {
  expect(MAX_PARTICLES).toBe(40);
});

test("renders a decorative canvas", () => {
  const { container } = render(
    <ParticleField sources={SOURCES} hub={HUB} sinks={SINKS} />,
  );
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveAttribute("aria-hidden", "true");
  expect(canvas).toHaveAttribute("data-motion-metaphor", "puzzle-stitch");
});

test("frozen mode is accepted for deterministic capture", () => {
  const { container } = render(
    <ParticleField sources={SOURCES} hub={HUB} sinks={SINKS} frozen seed={99} />,
  );
  expect(container.querySelector("canvas")).toBeInTheDocument();
});
