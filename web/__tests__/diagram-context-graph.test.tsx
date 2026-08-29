// web/__tests__/diagram-context-graph.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContextGraph, CONTEXT_LAYERS } from "@/components/replica/diagrams/ContextGraph";

test("exposes four layers in top-to-bottom order", () => {
  expect(CONTEXT_LAYERS.map((l) => l.id)).toEqual([
    "intent", "assemblies", "context", "sources",
  ]);
});

test("renders the rail as an operable tablist", () => {
  render(<ContextGraph theme="dark" />);
  expect(screen.getByRole("tablist", { name: /aiden os layers/i })).toBeInTheDocument();
  expect(screen.getAllByRole("tab")).toHaveLength(4);
});

test("rail selection changes the active layer", async () => {
  const user = userEvent.setup();
  render(<ContextGraph theme="dark" />);
  const tabs = screen.getAllByRole("tab");
  await user.click(tabs[3]);
  expect(screen.getAllByRole("tab")[3]).toHaveAttribute("aria-selected", "true");
});

test("renders the four assembly cards and the focus entity", () => {
  render(<ContextGraph theme="dark" />);
  for (const card of [
    "Aiden for Infrastructure", "Aiden for Automation",
    "Aiden for Observability", "Aiden for SRE",
  ]) {
    expect(screen.getByText(card)).toBeInTheDocument();
  }
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
});

test("renders all five data-source marks", () => {
  const { container } = render(<ContextGraph theme="dark" />);
  const slugs = [...container.querySelectorAll("[data-vendor-slug]")].map((n) =>
    n.getAttribute("data-vendor-slug"),
  );
  expect(slugs).toEqual(["aws", "terraform", "prometheus", "backstage", "jira"]);
});

test("is an accessible figure", () => {
  const { container } = render(<ContextGraph theme="dark" />);
  expect(container.querySelector('[role="img"]')).toHaveAttribute(
    "aria-label",
    expect.stringContaining("context graph"),
  );
});
