// web/__tests__/diagram-inner-outer-loop.test.tsx
import { render, screen } from "@testing-library/react";
import { InnerOuterLoop } from "@/components/replica/diagrams/InnerOuterLoop";

test("renders both loop shells with canvas labels", () => {
  render(<InnerOuterLoop theme="dark" />);
  expect(screen.getByText("Inner Loop")).toBeInTheDocument();
  expect(screen.getByText("Outer Loop")).toBeInTheDocument();
  expect(screen.getByText("Build & ship")).toBeInTheDocument();
  expect(screen.getByText("Run & observe")).toBeInTheDocument();
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

test("hosts a corridor-stitch particle field — hub labels, clipped seams", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  const field = container.querySelector('[data-motion-field="work-items"]');
  expect(field).toBeInTheDocument();
  expect(field).toHaveAttribute("data-motion-metaphor", "corridor-stitch");
  expect(field).toHaveAttribute("data-motion-labels", "hub");
  expect(field).toHaveAttribute("data-motion-quiet", "false");
  expect(container.querySelector('[data-stitch-seams="corridor"]')).toBeInTheDocument();
  expect(container.querySelector('[role="img"]')).toHaveAttribute("data-motion", "corridor-stitch");
});

test("is an accessible figure with assemble state", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  const fig = container.querySelector('[role="img"]');
  expect(fig).toHaveAttribute("aria-label", expect.stringContaining("Context Graph"));
  expect(fig).toHaveAttribute("data-diagram", "inner-outer-loop-shells");
  expect(fig).toHaveAttribute("data-assemble-phase");
});

test("renders Pencil loop shells k3vas0 / eYtt6 as Soft Structuralism boxes", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  const inner = container.querySelector('[data-loop-shell="inner"]');
  const outer = container.querySelector('[data-loop-shell="outer"]');
  expect(inner).toHaveAttribute("data-pencil-id", "k3vas0");
  expect(outer).toHaveAttribute("data-pencil-id", "eYtt6");
  expect(inner?.className.split(/\s+/)).toContain("w-[260px]");
  expect(outer?.className.split(/\s+/)).toContain("w-[260px]");
  expect(container.querySelector('[data-loop-zone="inner"]')).toBeInTheDocument();
  expect(container.querySelector('[data-loop-zone="outer"]')).toBeInTheDocument();
  expect(container.querySelectorAll("[data-loop-chip]")).toHaveLength(7);
});

test("aligned chips — fixed height Soft Structuralism rows", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  const chips = container.querySelectorAll("[data-loop-chip]");
  expect(chips).toHaveLength(7);
  for (const chip of chips) {
    const classes = chip.className.split(/\s+/);
    expect(classes).toContain("rounded-md");
    expect(classes).toContain("h-7");
    expect(classes).toContain("px-2");
    expect(classes).toContain("items-center");
    expect(classes).toContain("bg-surface-raised");
    expect(classes).not.toContain("rounded-full");
  }
  const zones = container.querySelectorAll("[data-loop-zone]");
  for (const zone of zones) {
    const classes = zone.className.split(/\s+/);
    expect(classes).toContain("rounded-xl");
    expect(classes).toContain("p-3");
    expect(classes).toContain("bg-surface");
  }
});

test("no static arrow glyphs survive", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  expect(container.querySelectorAll("[data-connector-arrow]")).toHaveLength(0);
});
