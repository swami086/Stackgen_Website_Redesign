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

test("renders graph resolution entity and six sources", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  expect(screen.getAllByText("checkout-api").length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText("one entity · six sources")).toBeInTheDocument();
  expect(container.querySelectorAll("code")).toHaveLength(6);
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

test("renders spider path geometry for graph convergence", () => {
  const { container } = render(<OperationalContextGraph theme="dark" />);
  const paths = container.querySelectorAll('path[d*="C28"]');
  expect(paths.length).toBe(6);
});

test("reduced motion settles without wave loops", () => {
  reducedMotion = true;
  const { container } = render(<OperationalContextGraph theme="light" />);
  expect(container.querySelectorAll("circle")).toHaveLength(0);
  expect(container.querySelectorAll('path[d="M12 0 V40"]')).toHaveLength(7);
  expect(container.querySelectorAll('path[d*="C28"]')).toHaveLength(6);
});
