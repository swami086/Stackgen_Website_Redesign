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

test("renders complete tethered Intent Router hub", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelector('[data-structure="router-hub"]')).toBeTruthy();
  expect(container.querySelector('[data-complete="tethered-c1"]')).toBeTruthy();
  expect(container.querySelector('[data-part="intent-router"]')).toBeTruthy();
  expect(container.querySelector('[data-part="router-stage"]')).toBeTruthy();
  expect(container.querySelector('[data-layer="telemetry"]')).toBeTruthy();
  expect(container.querySelector('[data-motion-metaphor="neural-mesh"]')).toBeTruthy();
  expect(container.querySelector('[data-neural="mesh"]')).toBeTruthy();
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
  expect(container.querySelectorAll('[data-part="assembly-dock"]').length).toBe(
    4,
  );
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

test("renders checkout-api and tethered official vendor marks", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
  expect(container.querySelector('[data-part="context-graph"]')).toBeTruthy();
  expect(container.querySelector('[data-part="entity-hub"]')).toBeTruthy();
  for (const slug of [
    "aws",
    "terraform",
    "eks",
    "datadog",
    "prometheus",
    "pagerduty",
    "github",
    "gitlab",
    "jira",
    "opa",
    "slack",
    "backstage",
  ]) {
    expect(container.querySelector(`[data-vendor-slug="${slug}"]`)).toBeTruthy();
  }
  expect(screen.getByText("OPA")).toBeInTheDocument();
  expect(screen.getByText("EKS")).toBeInTheDocument();
});

test("renders Aiden OS strip without truncated long labels", () => {
  render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("Aiden OS")).toBeInTheDocument();
  for (const chip of [
    "Governance",
    "Guardrails",
    "Tokenomics",
    "Identity",
    "Audit",
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

test("renders neural mesh synapses and feeders for cross-talk", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelectorAll('[data-part="neural-synapse"]').length).toBe(
    6,
  );
  expect(container.querySelectorAll('[data-part="neural-feeder"]').length).toBe(
    13,
  );
  expect(container.querySelector('[data-focus-slot="s"]')).toBeTruthy();
});

test("reduced motion keeps hub and beams", () => {
  reducedMotion = true;
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelector('[data-part="intent-router"]')).toBeTruthy();
  expect(container.querySelector('[data-part="route-beam-active"]')).toBeTruthy();
  expect(container.querySelectorAll("circle").length).toBe(0);
});
