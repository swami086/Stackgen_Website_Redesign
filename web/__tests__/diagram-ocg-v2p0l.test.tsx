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

test("renders three-layer Option E structure", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelector('[data-structure="three-layer"]')).toBeTruthy();
  expect(container.querySelector('[data-layer="telemetry"]')).toBeTruthy();
  expect(container.querySelector('[data-layer="context"]')).toBeTruthy();
  expect(container.querySelector('[data-layer="aiden"]')).toBeTruthy();
  expect(container.querySelector('[data-motion-metaphor="signal-drop"]')).toBeTruthy();
});

test("ask bar sits at diagram top outside Context Graph", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  const root = container.querySelector('[data-structure="three-layer"]');
  const ask = container.querySelector('[data-part="ask-bar"]');
  const context = container.querySelector('[data-layer="context"]');
  const telemetry = container.querySelector('[data-layer="telemetry"]');
  expect(ask).toBeTruthy();
  expect(context?.contains(ask)).toBe(false);
  expect(root?.firstElementChild?.contains(ask) || root?.querySelector('[data-part="ask-bar"]')).toBeTruthy();
  // DOM order: ask before telemetry before context
  const order = [ask, telemetry, context].map((el) =>
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

test("renders intent router and four factory assemblies", () => {
  render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("Intent Router")).toBeInTheDocument();
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
  expect(screen.getByText("Factory assemblies")).toHaveClass("text-text-secondary");
});

test("renders context graph hub entity", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
  expect(screen.getByText("one entity · six sources")).toBeInTheDocument();
  expect(container.querySelector('[data-part="context-graph"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-part="context-graph"] text').length).toBeGreaterThanOrEqual(6);
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

test("renders typed graph edges and drop rails", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(container.querySelectorAll('[data-part="drop-rail"]').length).toBe(2);
  expect(screen.getByText("monitors")).toBeInTheDocument();
  expect(screen.getAllByText("deploys").length).toBe(2);
  expect(screen.getByText("owns")).toBeInTheDocument();
  expect(screen.getByText("governs")).toBeInTheDocument();
});

test("reduced motion settles without beam loops", () => {
  reducedMotion = true;
  const { container } = render(<OperationalContextGraph theme="light" />);
  expect(container.querySelectorAll("circle")).toHaveLength(0);
  expect(container.querySelectorAll('[data-part="drop-rail"] path').length).toBeGreaterThanOrEqual(2);
  expect(container.querySelector('[data-part="context-graph"]')).toBeTruthy();
  expect(container.querySelectorAll('path[d="M12 2 V30"]').length).toBe(2);
});
