// web/__tests__/diagram-inner-outer-loop.test.tsx
import { render, screen } from "@testing-library/react";
import { InnerOuterLoop } from "@/components/replica/diagrams/InnerOuterLoop";

test("renders both loop shells with canvas labels", () => {
  render(<InnerOuterLoop theme="dark" />);
  expect(screen.getByText("INNER LOOP")).toBeInTheDocument();
  expect(screen.getByText("OUTER LOOP")).toBeInTheDocument();
  for (const label of ["IDE", "Git", "CI / CD", "IaC", "Runtime", "Infrastructure", "Observability"]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
});

test("renders the hub and its four satellites", () => {
  render(<InnerOuterLoop theme="dark" />);
  expect(screen.getByText("Context Graph")).toBeInTheDocument();
  for (const sat of ["intent", "entities", "policies", "memory"]) {
    expect(screen.getByText(sat)).toBeInTheDocument();
  }
});

test("hosts the particle simulation canvas", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  expect(container.querySelector('[data-motion-field="work-items"]')).toBeInTheDocument();
});

test("is an accessible figure with puzzle assemble state", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  const fig = container.querySelector('[role="img"]');
  expect(fig).toHaveAttribute("aria-label", expect.stringContaining("puzzle"));
  expect(fig).toHaveAttribute("data-diagram", "inner-outer-puzzle-stitch");
  expect(fig).toHaveAttribute("data-assemble-phase");
});

test("renders interlocking puzzle shells on both halves", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  expect(container.querySelector('[data-puzzle-shell="inner"]')).toBeInTheDocument();
  expect(container.querySelector('[data-puzzle-shell="outer"]')).toBeInTheDocument();
  expect(container.querySelectorAll("[data-puzzle-facet]")).toHaveLength(7);
  expect(container.querySelector("[data-stitch-seams]")).toBeInTheDocument();
});

test("no static arrow glyphs survive", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  expect(container.querySelectorAll("[data-connector-arrow]")).toHaveLength(0);
});
