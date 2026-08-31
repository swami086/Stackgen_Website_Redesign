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

test("router stage uses capped landscape height not exploding aspect ratio", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  const stage = container.querySelector('[data-part="router-stage"]');
  expect(stage?.className).toMatch(/h-\[280px\]/);
  expect(stage?.className).not.toMatch(/aspect-/);
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
    "Aiden for InfraOps",
    "Aiden for DevOps",
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

test("never prints superseded Infrastructure or Automation product titles", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.textContent).not.toMatch(/Aiden for Infrastructure/);
  expect(container.textContent).not.toMatch(/Aiden for Automation/);
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

test("mesh viewBox is landscape-isotropic, not a stretched 100 square", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  const mesh = container.querySelector("[data-part='context-graph']");
  expect(mesh?.getAttribute("viewBox")).not.toBe("0 0 100 100");
  expect(mesh?.getAttribute("data-mesh-aspect")).toBeTruthy();
});

test("intent router is a machined double-bezel, not a pulse halo", () => {
  const { container } = render(<OperationalContextGraph theme="light" />);
  const hub = container.querySelector('[data-part="intent-router"]');
  expect(hub).toHaveAttribute("data-finish", "double-bezel");
  expect(hub?.querySelector("[data-part='intent-router-disc']")).toHaveClass(
    "glass-hub-shine",
    "glass-tile",
  );
  expect(hub?.querySelector(".glow-source")).toBeTruthy();
  expect(hub?.querySelector("[data-part='intent-router-bezel']")).toBeTruthy();
  expect(hub?.querySelector("[data-part='intent-router-pulse']")).toBeNull();
});

test("reduced motion keeps hub and beams", () => {
  reducedMotion = true;
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelector('[data-part="intent-router"]')).toBeTruthy();
  expect(container.querySelector('[data-part="route-beam-active"]')).toBeTruthy();
  expect(container.querySelectorAll("circle").length).toBe(0);
});
