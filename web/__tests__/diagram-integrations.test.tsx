import { render, screen } from "@testing-library/react";
import { Integrations } from "@/components/replica/diagrams/Integrations";

const ORDER = [
  "GitHub",
  "GitLab",
  "Terraform",
  "Datadog",
  "PagerDuty",
  "Jira",
  "OPA",
  "Slack",
];

test("renders the heading verbatim", () => {
  render(<Integrations theme="dark" />);
  expect(
    screen.getByText("Plugs into the stack you already run"),
  ).toBeInTheDocument();
});

test("renders all eight vendor pills in canvas order", () => {
  const { container } = render(<Integrations theme="dark" />);
  const primary =
    container.querySelector("[data-marquee-set='a']") ??
    container.querySelector("[data-integrations-row]");
  const pills = [...(primary?.querySelectorAll("[data-vendor-slug]") ?? [])];
  expect(pills).toHaveLength(8);
  expect(pills.map((p) => p.getAttribute("data-vendor-label"))).toEqual(ORDER);
});

test("rolling bar duplicates the track for a seamless marquee", () => {
  const { container } = render(<Integrations theme="dark" />);
  const marquee = container.querySelector("[data-marquee]");
  // jsdom has no matchMedia reduced-motion → marquee path is active
  expect(marquee).toBeInTheDocument();
  expect(container.querySelectorAll("[data-marquee-set]")).toHaveLength(2);
  expect(container.querySelectorAll("[data-vendor-slug]")).toHaveLength(16);
});

test("two renders stay deterministic", () => {
  const a = render(<Integrations theme="dark" />).container.innerHTML;
  const b = render(<Integrations theme="dark" />).container.innerHTML;
  expect(a).toBe(b);
});
