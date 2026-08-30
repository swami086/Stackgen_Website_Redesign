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

test("who-its-for renders product portraits, role dock, and OS rail", () => {
  const { container } = render(<ReplicaWhoItsFor theme="dark" />);
  expect(container.querySelector('[data-who-layout="portraits-dock"]')).toBeTruthy();
  expect(container.querySelectorAll("[data-who-portrait]")).toHaveLength(4);
  expect(container.querySelectorAll("[data-who-role]")).toHaveLength(4);
  expect(container.querySelector("[data-who-os]")).toBeTruthy();
  expect(
    container.querySelectorAll("[data-who-pillars] [data-bento-cell]"),
  ).toHaveLength(4);
  expect(
    container.querySelectorAll("[data-who-roles] [data-bento-cell]"),
  ).toHaveLength(4);
  // Real product UI frames — not generative product heroes
  const imgs = [...container.querySelectorAll("[data-who-portrait] img")];
  expect(imgs).toHaveLength(4);
  expect(imgs.every((img) => !(img.getAttribute("src") ?? "").includes("/media/product/"))).toBe(
    true,
  );
  expect(container.querySelectorAll('[data-feature="true"]')).toHaveLength(0);
});

test("footer CTA nests its icon in its own circle", () => {
  const { container } = render(<ReplicaFooter theme="dark" />);
  const cta = screen.getByText(replicaContent.footer.cta).closest("a");
  expect(cta?.querySelector("[data-cta-icon]")).toBeInTheDocument();
});

test("footer product links resolve to product routes and meta bar is present", () => {
  render(<ReplicaFooter theme="dark" />);
  expect(
    screen.getByRole("link", { name: "Aiden for Infrastructure" }),
  ).toHaveAttribute("href", "/product/aiden-for-infrastructure");
  expect(screen.getByText(replicaContent.footer.legal)).toBeInTheDocument();
  expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
  expect(screen.getByText(/All systems normal/i)).toBeInTheDocument();
});
