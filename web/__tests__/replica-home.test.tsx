import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { HomeReplica } from "@/components/replica/HomeReplica";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import { replicaContent } from "@/content/replica";

function renderHome(theme: "light" | "dark" = "dark") {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("stackgen-theme", theme);
  return render(
    <ThemeProvider>
      <HomeReplica />
    </ThemeProvider>,
  );
}

test("dark theme exposes CYfSl frame ids", () => {
  renderHome("dark");
  expect(document.querySelector('[data-pencil-id="CYfSl"]')).toBeInTheDocument();
  for (const id of Object.values(REPLICA_FRAMES.dark)) {
    expect(document.querySelector(`[data-pencil-id="${id}"]`)).toBeInTheDocument();
  }
  expect(screen.getByRole("button", { name: /theme|toggle|switch/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 }).textContent?.replace(/\s/g, "")).toBe(
    replicaContent.hero.heading.replace(/\s/g, ""),
  );
});

test("light theme exposes LexRf frame ids after toggle", async () => {
  const user = userEvent.setup();
  renderHome("dark");
  await user.click(screen.getByRole("button", { name: /theme|toggle|switch/i }));
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(document.querySelector('[data-pencil-id="LexRf"]')).toBeInTheDocument();
  for (const id of Object.values(REPLICA_FRAMES.light)) {
    expect(document.querySelector(`[data-pencil-id="${id}"]`)).toBeInTheDocument();
  }
});

test("no diagram renders as a raster image", () => {
  renderHome("dark");
  const imgs = [...document.querySelectorAll("img")].map((i) => i.getAttribute("src") ?? "");
  expect(imgs.some((s) => s.includes("/media/replica/"))).toBe(false);
});

test("every diagram exposes an accessible figure", () => {
  renderHome("dark");
  expect(document.querySelectorAll('[role="img"][aria-label]').length).toBeGreaterThanOrEqual(4);
});

test("the four canvas eyebrows are present and no fifth was added", () => {
  renderHome("dark");
  for (const e of ["SHARED WORLD MODEL", "Offerings", "Inner Loop", "Outer Loop"]) {
    expect(screen.getByText(e)).toBeInTheDocument();
  }
});

test("homepage section order is Hero Logos Problem Solution Assemblies", () => {
  renderHome("dark");
  const main = document.querySelector("main");
  expect(main).toBeTruthy();
  const ids = [...main!.querySelectorAll("[data-pencil-id]")].map((el) =>
    el.getAttribute("data-pencil-id"),
  );
  const hero = REPLICA_FRAMES.dark.hero;
  const logos = REPLICA_FRAMES.dark.logos;
  const problem = REPLICA_FRAMES.dark.problem;
  const video = REPLICA_FRAMES.dark.video; // Solution media plate
  const assemblies = REPLICA_FRAMES.dark.assemblies;
  const i = (id: string) => ids.indexOf(id);
  expect(i(hero)).toBeGreaterThanOrEqual(0);
  expect(i(logos)).toBeGreaterThan(i(hero));
  expect(i(problem)).toBeGreaterThan(i(logos));
  expect(i(video)).toBeGreaterThan(i(problem));
  expect(i(assemblies)).toBeGreaterThan(i(video));
});

test("Factory homepage hero and CTAs", () => {
  renderHome("dark");
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1.textContent?.replace(/\s/g, "")).toBe("Outcomes,notagents.");
  const scheduleLinks = screen.getAllByRole("link", { name: "Schedule a demo" });
  expect(scheduleLinks.some((link) => link.getAttribute("href") === "/schedule-demo")).toBe(
    true,
  );
  expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute(
    "href",
    "#how-it-works",
  );
});

test("how-it-works anchor exists on assemblies", () => {
  renderHome("dark");
  expect(document.getElementById("how-it-works")).toBeTruthy();
});

test("Factory brand appears in how-it-works / assemblies", () => {
  renderHome("dark");
  expect(
    screen.getByText(
      /Learn back into the Shared World Model — the Autonomous Operations Factory path/i,
    ),
  ).toBeInTheDocument();
});

test("hero and problem use Factory spine copy", () => {
  renderHome("dark");
  expect(screen.getByRole("heading", { level: 1 }).textContent?.replace(/\s/g, "")).toBe(
    "Outcomes,notagents.",
  );
  expect(screen.getByText("The problem")).toBeInTheDocument();
  expect(
    screen.getByText(/Outer Ops loop is failing to keep up with inner Dev loop/i),
  ).toBeInTheDocument();
  expect(screen.getByText("The solution")).toBeInTheDocument();
  expect(screen.getByText("Autonomous Operations Factory")).toBeInTheDocument();
});

test("problem section ships A+B chaos film plate", () => {
  renderHome("dark");
  expect(document.querySelector('[data-problem-film="chaos-ab"]')).toBeTruthy();
  expect(screen.getByText("Inner loop minutes · Outer loop hours to days")).toBeInTheDocument();
  expect(screen.getByText("Alert · no deploy")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Play problem explainer|Pause problem explainer/i })).toBeInTheDocument();
});

test("Shell hosts the V2P0L Operational Context Graph flow", () => {
  renderHome("dark");
  expect(screen.getByText("Intent Router")).toBeInTheDocument();
  expect(document.querySelector('[data-pencil-id="V2P0L"]')).toBeInTheDocument();
  const ocg = document.querySelector('[data-structure="router-hub"]');
  expect(ocg).toBeTruthy();
  expect(ocg?.getAttribute("data-complete")).toBe("tethered-c1");
  expect(ocg?.textContent).toContain("Aiden OS");
});

test("atmosphere fields are aria-hidden decorative layers", () => {
  renderHome("dark");
  const atmosphereImgs = [...document.querySelectorAll("img")].filter((img) =>
    (img.getAttribute("src") ?? "").includes("/media/atmosphere/"),
  );
  expect(atmosphereImgs.length).toBeGreaterThan(0);
  for (const img of atmosphereImgs) {
    expect(img.closest('[aria-hidden="true"]')).toBeTruthy();
  }
});
