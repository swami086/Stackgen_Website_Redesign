import { render, screen } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import { OperationalContextGraph } from "@/components/replica/diagrams/OperationalContextGraph";

let reducedMotion = false;

vi.mock("@/components/replica/motion/useReducedMotionSafe", () => ({
  useReducedMotionSafe: () => reducedMotion,
}));

beforeEach(() => {
  reducedMotion = false;
});

test("renders Intent Router hub structure", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelector('[data-structure="router-hub"]')).toBeTruthy();
  expect(container.querySelector('[data-part="intent-router"]')).toBeTruthy();
  expect(container.querySelector('[data-part="router-stage"]')).toBeTruthy();
  expect(container.querySelector('[data-layer="telemetry"]')).toBeTruthy();
  expect(container.querySelector('[data-layer="aiden"]')).toBeTruthy();
  expect(container.querySelector('[data-motion-metaphor="route-pulse"]')).toBeTruthy();
});

test("ask bar sits at diagram top before telemetry and router", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  const root = container.querySelector('[data-structure="router-hub"]');
  const ask = container.querySelector('[data-part="ask-bar"]');
  const telemetry = container.querySelector('[data-layer="telemetry"]');
  const stage = container.querySelector('[data-part="router-stage"]');
  expect(ask).toBeTruthy();
  expect(stage?.contains(ask)).toBe(false);
  const order = [ask, telemetry, stage].map((el) =>
    el ? [...root!.querySelectorAll("*")].indexOf(el) : -1,
  );
  expect(order[0]).toBeLessThan(order[1]!);
  expect(order[1]).toBeLessThan(order[2]!);
  expect(screen.getByText(/Ask Aiden to investigate/)).toBeInTheDocument();
});

test("renders telemetry channels", () => {
  render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("Logs")).toBeInTheDocument();
  expect(screen.getByText("Metrics")).toBeInTheDocument();
  expect(screen.getByText("Traces")).toBeInTheDocument();
});

test("renders centered Intent Router and four factory assemblies", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("Intent Router")).toBeInTheDocument();
  expect(container.querySelector('[data-part="intent-router"]')).toBeTruthy();
  for (const title of [
    "Aiden for Infrastructure",
    "Aiden for Automation",
    "Aiden for Observability",
    "Aiden for SRE",
  ]) {
    expect(screen.getByText(title)).toBeInTheDocument();
  }
});

test("uses light-theme surface contrast", () => {
  const { container } = render(<OperationalContextGraph theme="light" />);
  expect(container.firstElementChild).toHaveClass("bg-surface/95");
  expect(screen.getByText("Intent Router")).toBeInTheDocument();
});

test("renders quiet context constellation underlay", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
  expect(container.querySelector('[data-part="context-graph"]')).toBeTruthy();
});

test("renders Aiden OS governance chips", () => {
  render(<OperationalContextGraph theme="dark" />);
  for (const chip of [
    "Governance",
    "Guardrails",
    "Tokenomics",
    "Identity & Access",
    "Audit & Evidence",
    "Integrations",
  ]) {
    expect(screen.getByText(chip)).toBeInTheDocument();
  }
});

test("never prints banned DevOps product name", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.textContent).not.toMatch(/Aiden for DevOps/);
});

test("draws route beams with an active packet path", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelectorAll('[data-part="route-beam"]').length).toBe(3);
  expect(container.querySelector('[data-part="route-beam-active"]')).toBeTruthy();
});

test("reduced motion keeps hub and beams without traveling packet", () => {
  reducedMotion = true;
  const { container } = render(<OperationalContextGraph theme="light" />);
  expect(container.querySelector('[data-part="intent-router"]')).toBeTruthy();
  expect(
    container.querySelectorAll(
      '[data-part="route-beam"], [data-part="route-beam-active"]',
    ).length,
  ).toBe(4);
  // Beam component returns null under reduced motion
  expect(container.querySelector('[data-part="route-beam-active"] circle')).toBeNull();
});
