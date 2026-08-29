import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { CYFSL_FRAMES } from "@/lib/cyfsl-frames";

test("renders dark-only CYfSl with eight section pencil ids", () => {
  render(<HomePage />);
  expect(document.documentElement.getAttribute("data-theme")).not.toBe("light");
  expect(document.querySelector('[data-pencil-id="CYfSl"]')).toBeInTheDocument();
  for (const id of Object.values(CYFSL_FRAMES)) {
    expect(document.querySelector(`[data-pencil-id="${id}"]`)).toBeInTheDocument();
  }
  expect(document.querySelector('[data-pencil-id="LexRf"]')).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /theme|toggle/i })).not.toBeInTheDocument();
});
