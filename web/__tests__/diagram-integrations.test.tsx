import { render, screen } from "@testing-library/react";
import { Integrations } from "@/components/replica/diagrams/Integrations";

// The plan says "OPA" in the pills list, but VENDOR_NAMES likely expands it.
// Actually the plan explicitly says "OPA", let's fix the label in the component.
const ORDER = ["GitHub", "GitLab", "Terraform", "Datadog", "PagerDuty", "Jira", "OPA", "Slack"];

test("renders the heading verbatim", () => {
  render(<Integrations theme="dark" />);
  expect(screen.getByText("Plugs into the stack you already run")).toBeInTheDocument();
});

test("renders all eight vendor pills in canvas order", () => {
  const { container } = render(<Integrations theme="dark" />);
  const pills = [...container.querySelectorAll("[data-vendor-slug]")];
  expect(pills).toHaveLength(8);
  expect(pills.map((p) => p.getAttribute("data-vendor-label"))).toEqual(ORDER);
});

test("scatter offsets are seeded, so two renders match", () => {
  const a = render(<Integrations theme="dark" />).container.innerHTML;
  const b = render(<Integrations theme="dark" />).container.innerHTML;
  expect(a).toBe(b);
});
