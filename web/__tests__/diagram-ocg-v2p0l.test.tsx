import { render, screen } from "@testing-library/react";
import { OperationalContextGraph } from "@/components/replica/diagrams/OperationalContextGraph";

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
