import { render } from "@testing-library/react";
import { VENDOR_MARKS, VendorMark, type VendorSlug } from "@/components/replica/logos";

const REQUIRED: VendorSlug[] = [
  "cursor",
  "github",
  "gitlab",
  "terraform",
  "eks",
  "aws",
  "datadog",
  "pagerduty",
  "jira",
  "opa",
  "slack",
  "prometheus",
  "backstage",
];

test("registry covers exactly the 13 marks the diagrams need", () => {
  expect(Object.keys(VENDOR_MARKS).sort()).toEqual([...REQUIRED].sort());
});

test("every mark renders an svg in both themes", () => {
  for (const slug of REQUIRED) {
    for (const theme of ["light", "dark"] as const) {
      const { container, unmount } = render(<VendorMark slug={slug} theme={theme} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  }
});

test("theme-sensitive marks differ between themes", () => {
  for (const slug of ["github", "cursor", "aws"] as const) {
    const light = render(<VendorMark slug={slug} theme="light" />);
    const dark = render(<VendorMark slug={slug} theme="dark" />);
    expect(light.container.innerHTML).not.toBe(dark.container.innerHTML);
    light.unmount();
    dark.unmount();
  }
});

test("marks are decorative by default", () => {
  const { container } = render(<VendorMark slug="slack" theme="dark" />);
  expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});
