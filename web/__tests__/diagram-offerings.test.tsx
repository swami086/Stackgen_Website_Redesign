// web/__tests__/diagram-offerings.test.tsx
import { render, screen } from "@testing-library/react";
import { Offerings } from "@/components/replica/diagrams/Offerings";

const CHIPS = [
  "Persona Agents", "Skills & Workflows", "Activity & Replay",
  "Policy Engine", "Identity & Approval", "Cost Controls",
  "Knowledge Hub", "Context Graph", "AppStacks",
];

test("renders the three Aiden apps with locked naming", () => {
  render(<Offerings theme="dark" />);
  expect(screen.getByText("Aiden for SRE")).toBeInTheDocument();
  expect(screen.getByText("Aiden for DevOps")).toBeInTheDocument();
  expect(screen.getByText("Aiden for InfraOps")).toBeInTheDocument();
  expect(screen.queryByText("Aiden for Infrastructure")).not.toBeInTheDocument();
  expect(screen.queryByText("Aiden for Automation")).not.toBeInTheDocument();
});

test("renders all nine capability chips in canvas order", () => {
  render(<Offerings theme="dark" />);
  const rendered = CHIPS.map((c) => screen.getByText(c));
  expect(rendered).toHaveLength(9);
});

test("renders the three group labels", () => {
  render(<Offerings theme="dark" />);
  for (const g of ["Agent Platform", "Governance", "Shared Context"]) {
    expect(screen.getByText(g)).toBeInTheDocument();
  }
});

test("renders the Aiden OS band", () => {
  const { container } = render(<Offerings theme="dark" />);
  expect(container.querySelector('[data-part="os-band"]')).toBeTruthy();
  expect(screen.getByText("Aiden OS")).toBeInTheDocument();
});

test("contains zero vendor marks by design", () => {
  const { container } = render(<Offerings theme="dark" />);
  expect(container.querySelectorAll("[data-vendor-mark]")).toHaveLength(0);
});
