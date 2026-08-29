import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/replica/motion/Reveal";
import { Stagger } from "@/components/replica/motion/Stagger";
import { DrawPath } from "@/components/replica/motion/DrawPath";
import { GridSubstrate } from "@/components/replica/motion/GridSubstrate";

test("Reveal renders its children as visible content", () => {
  render(<Reveal>hello</Reveal>);
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("Stagger renders every child", () => {
  render(
    <Stagger>
      <span>one</span>
      <span>two</span>
      <span>three</span>
    </Stagger>,
  );
  expect(screen.getByText("one")).toBeInTheDocument();
  expect(screen.getByText("three")).toBeInTheDocument();
});

test("DrawPath renders a path carrying the supplied geometry", () => {
  const { container } = render(
    <svg>
      <DrawPath d="M0 0 L10 10" className="stroke-border" />
    </svg>,
  );
  expect(container.querySelector('path[d="M0 0 L10 10"]')).toBeInTheDocument();
});

test("GridSubstrate is decorative and hidden from assistive tech", () => {
  const { container } = render(<GridSubstrate />);
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveAttribute("aria-hidden", "true");
});
