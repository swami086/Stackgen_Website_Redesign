import { render, screen } from "@testing-library/react";
import { ReplicaLogos } from "@/components/replica/sections/Logos";
import { ReplicaWhoItsFor } from "@/components/replica/sections/WhoItsFor";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { replicaContent } from "@/content/replica";

test("logo row renders eight customer marks in a rolling marquee", () => {
  const { container } = render(<ReplicaLogos theme="dark" />);
  const primary =
    container.querySelector("[data-marquee-set='a']") ??
    container.querySelector("[data-logos-row]");
  expect(primary?.querySelectorAll("[data-customer-logo]")).toHaveLength(8);
  expect(container.querySelector("[data-marquee]")).toBeInTheDocument();
  expect(container.querySelectorAll("[data-marquee-set]")).toHaveLength(2);
});

test("who-its-for renders two aligned four-column rows (ck4Dy)", () => {
  const { container } = render(<ReplicaWhoItsFor theme="dark" />);
  expect(container.querySelectorAll("[data-bento-cell]")).toHaveLength(8);
  expect(
    container.querySelectorAll("[data-who-pillars] [data-bento-cell]"),
  ).toHaveLength(4);
  expect(
    container.querySelectorAll("[data-who-roles] [data-bento-cell]"),
  ).toHaveLength(4);
  expect(container.querySelectorAll('[data-feature="true"]')).toHaveLength(0);
});

test("footer CTA nests its icon in its own circle", () => {
  const { container } = render(<ReplicaFooter theme="dark" />);
  const cta = screen.getByText(replicaContent.footer.cta).closest("a");
  expect(cta?.querySelector("[data-cta-icon]")).toBeInTheDocument();
});
