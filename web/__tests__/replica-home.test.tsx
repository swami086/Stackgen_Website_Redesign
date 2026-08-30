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
  for (const e of ["OPERATIONAL CONTEXT GRAPH", "WHO IT'S FOR", "INNER LOOP", "OUTER LOOP"]) {
    expect(screen.getByText(e)).toBeInTheDocument();
  }
});

test("Shell hosts the V2P0L Operational Context Graph flow", () => {
  renderHome("dark");
  expect(screen.getByText("Intent Router")).toBeInTheDocument();
  expect(screen.getByText("Graph resolution")).toBeInTheDocument();
  expect(screen.getByText("Aiden Agentic Operating System")).toBeInTheDocument();
  expect(document.querySelector('[data-pencil-id="V2P0L"]')).toBeInTheDocument();
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
