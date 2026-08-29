import { render, screen } from "@testing-library/react";
import { ReplicaLogos } from "@/components/replica/sections/Logos";
import { ReplicaWhoItsFor } from "@/components/replica/sections/WhoItsFor";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { replicaContent } from "@/content/replica";

test("logo row renders all eight customer marks and no marquee", () => {
  const { container } = render(<ReplicaLogos theme="dark" />);
  expect(container.querySelectorAll("img")).toHaveLength(8);
  expect(container.querySelector("[data-marquee]")).toBeNull();
});

test("who-its-for renders an eight cell bento", () => {
  const { container } = render(<ReplicaWhoItsFor theme="dark" />);
  expect(container.querySelectorAll("[data-bento-cell]")).toHaveLength(8);
});

test("bento gives two cells feature emphasis for rhythm", () => {
  const { container } = render(<ReplicaWhoItsFor theme="dark" />);
  expect(container.querySelectorAll('[data-bento-cell][data-feature="true"]')).toHaveLength(2);
});

test("footer CTA nests its icon in its own circle", () => {
  const { container } = render(<ReplicaFooter theme="dark" />);
  const cta = screen.getByText(replicaContent.footer.cta).closest("a");
  expect(cta?.querySelector("[data-cta-icon]")).toBeInTheDocument();
});
