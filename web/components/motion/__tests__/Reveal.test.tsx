import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Reveal } from "../Reveal";

vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
