import { render, screen } from "@testing-library/react";
import { OpsLag } from "@/components/replica/diagrams/OpsLag";

test("renders Inner Loop chips, Outer Loop chips, and bridge text", () => {
  render(<OpsLag theme="dark" />);
  expect(screen.getByText("Inner Loop")).toBeInTheDocument();
  expect(screen.getByText("Outer Loop")).toBeInTheDocument();
  expect(screen.getByText("Slow Feedback / Noisy Signal")).toBeInTheDocument();
  for (const label of [
    "AI-assisted Build",
    "Deploy",
    "AI-generated code",
    "High-volume pushes",
    "Debug",
  ]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
  for (const label of ["Observe", "Operate", "Remediate", "Compliance", "Observability"]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
});

test("exposes ops-lag diagram identity and inner-orbit motion hook", () => {
  const { container } = render(<OpsLag theme="dark" />);
  const fig = container.querySelector('[data-problem-diagram="ops-lag"]');
  expect(fig).toBeInTheDocument();
  expect(fig).toHaveAttribute("role", "img");
  expect(fig?.getAttribute("aria-label")).toMatch(/inner.*outer/i);
  expect(container.querySelector('[data-motion="inner-orbit-ring"]')).toBeInTheDocument();
});

test("bans stray product titles and neon glow class spam", () => {
  const { container } = render(<OpsLag theme="dark" />);
  expect(screen.queryByText("Aiden for Infrastructure")).not.toBeInTheDocument();
  const html = container.innerHTML;
  expect(html).not.toMatch(/neon|glow-\d|drop-shadow-\[\#0/i);
});

test("has data-figma-id on root", () => {
  const { container } = render(<OpsLag theme="dark" />);
  const root = container.querySelector('figure');
  expect(root).toHaveAttribute("data-figma-id", "23:2");
});
