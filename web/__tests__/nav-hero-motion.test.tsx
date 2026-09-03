import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaHero } from "@/components/replica/sections/Hero";
import { replicaContent } from "@/content/replica";
import { PuckCanvasProvider } from "@/puck/PuckCanvasContext";

test("nav is fixed on the public site, sticky inside the Puck canvas", () => {
  // Public site: `fixed` — Puck's overlay mis-measures fixed targets
  // (puckeditor/puck#1456), so canvas rendering must avoid it (see Nav.tsx).
  const { container: publicSite } = render(
    <ThemeProvider>
      <ReplicaNav theme="dark" />
    </ThemeProvider>,
  );
  expect(publicSite.querySelector("header")).toHaveClass("fixed");
  expect(publicSite.querySelector("header")).not.toHaveClass("sticky");

  const { container: canvas } = render(
    <PuckCanvasProvider>
      <ThemeProvider>
        <ReplicaNav theme="dark" />
      </ThemeProvider>
    </PuckCanvasProvider>,
  );
  expect(canvas.querySelector("header")).toHaveClass("sticky");
  expect(canvas.querySelector("header")).not.toHaveClass("fixed");
});

test("nav starts as clear Liquid Glass over the hero", () => {
  const { container } = render(
    <ThemeProvider>
      <ReplicaNav theme="dark" />
    </ThemeProvider>,
  );
  const island = container.querySelector("[data-nav-island]");
  expect(island).toHaveAttribute("data-nav-material", "glass");
  expect(island).toHaveAttribute("data-liquid-variant", "clear");
  expect(island).toHaveClass("glass-real", "w-auto", "max-w-6xl");
  expect(island).not.toHaveClass("glow-source");
  expect(container.querySelector("[data-liquid-glass]")).toHaveAttribute(
    "data-nav-minimize",
    "on-scroll-down",
  );
  expect(container.querySelector(".nav-scroll-edge")).toHaveAttribute(
    "data-active",
    "false",
  );
  expect(container.querySelector("[data-nav-density]")).toHaveAttribute(
    "data-nav-density",
    "expanded",
  );
});

test("nav keeps primary links in the expanded island", () => {
  render(
    <ThemeProvider>
      <ReplicaNav theme="dark" />
    </ThemeProvider>,
  );
  expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Products" })).toBeInTheDocument();
  expect(screen.getByText("Platform")).toBeInTheDocument();
  expect(screen.getByText("Case Studies")).toBeInTheDocument();
  expect(screen.getByText("Schedule a demo")).toBeInTheDocument();
});

test("nav CTA is a nested single-line glassProminent pill", () => {
  const { container } = render(
    <ThemeProvider>
      <ReplicaNav theme="dark" />
    </ThemeProvider>,
  );
  const cta = container.querySelector('[data-pill-variant="nav"]');
  expect(cta).toBeTruthy();
  expect(cta).toHaveClass("h-8", "rounded-full", "whitespace-nowrap", "bg-accent");
  expect(cta).not.toHaveClass("rounded-lg", "py-2", "py-3");
});

test("hero splits its heading into per-word spans for the mask reveal", () => {
  render(<ReplicaHero theme="dark" />);
  const h1 = screen.getByRole("heading", { level: 1 });
  const words = h1.querySelectorAll("[data-word]");
  const expectedWords = replicaContent.hero.heading.split(/\s+/).filter(Boolean).length;
  expect(words.length).toBe(expectedWords);
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
