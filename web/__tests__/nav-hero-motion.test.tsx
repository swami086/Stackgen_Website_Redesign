import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaHero } from "@/components/replica/sections/Hero";
import { replicaContent } from "@/content/replica";

test("nav starts in the glass material state", () => {
  const { container } = render(
    <ThemeProvider>
      <ReplicaNav theme="dark" />
    </ThemeProvider>,
  );
  const island = container.querySelector("[data-nav-material]");
  expect(island).toHaveAttribute("data-nav-material", "glass");
});

test("hero splits its heading into per-word spans for the mask reveal", () => {
  render(<ReplicaHero theme="dark" />);
  const h1 = screen.getByRole("heading", { level: 1 });
  const words = h1.querySelectorAll("[data-word]");
  expect(words.length).toBeGreaterThanOrEqual(4);
  expect(h1.textContent?.replace(/\s+/g, " ").trim()).toBe(
    replicaContent.hero.heading.replace(/\s+/g, " ").trim(),
  );
});

test("hero mounts the substrate behind its content", () => {
  const { container } = render(<ReplicaHero theme="dark" />);
  expect(container.querySelector("canvas[aria-hidden='true']")).toBeInTheDocument();
});

test("hero keeps both CTAs on one line each", () => {
  render(<ReplicaHero theme="dark" />);
  expect(screen.getByText(replicaContent.hero.primaryCta)).toBeInTheDocument();
  expect(screen.getByText(replicaContent.hero.secondaryCta)).toBeInTheDocument();
});
