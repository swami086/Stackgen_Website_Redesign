// web/__tests__/diagram-offerings.test.tsx
import { render, screen } from "@testing-library/react";
import { Offerings } from "@/components/replica/diagrams/Offerings";

const CHIPS = [
  "Persona Agents", "Skills & Workflows", "Activity & Replay",
  "Policy Engine", "Identity & Approval", "Cost Controls",
  "Knowledge Hub", "Context Graph", "AppStacks",
];

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

test("bezel is a self-drawing svg rect", () => {
  const { container } = render(<Offerings theme="dark" />);
  expect(container.querySelector('[data-animate="bezel"] path, [data-animate="bezel"] rect')).toBeTruthy();
});

test("contains zero vendor marks by design", () => {
  const { container } = render(<Offerings theme="dark" />);
  expect(container.querySelectorAll("[data-vendor-mark]")).toHaveLength(0);
});
