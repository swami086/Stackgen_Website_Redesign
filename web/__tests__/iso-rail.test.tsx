// web/__tests__/iso-rail.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { IsoScene, IsoLayer, Billboard, ISO_ROTATION } from "@/components/replica/motion/IsoScene";
import { Constellation } from "@/components/replica/motion/Constellation";
import { LayerRail } from "@/components/replica/motion/LayerRail";

const LAYERS = [
  { id: "intent", label: "Intent" },
  { id: "assemblies", label: "Assemblies" },
  { id: "context", label: "System of Context" },
  { id: "sources", label: "Data Sources" },
] as const;

function RailHarness() {
  const [active, setActive] = useState<string>("intent");
  return <LayerRail layers={LAYERS} activeId={active} onSelect={setActive} />;
}

test("scene angle is a single exported constant", () => {
  expect(ISO_ROTATION.x).toBeGreaterThan(0);
  expect(ISO_ROTATION.z).toBeLessThan(0);
});

test("IsoScene renders its layers and billboarded content", () => {
  render(
    <IsoScene>
      <IsoLayer index={0} lift={0} active>
        <Billboard>
          <span>AWS</span>
        </Billboard>
      </IsoLayer>
    </IsoScene>,
  );
  expect(screen.getByText("AWS")).toBeInTheDocument();
});

test("LayerRail is a tablist with correct selection semantics", () => {
  render(<RailHarness />);
  const rail = screen.getByRole("tablist");
  expect(rail).toBeInTheDocument();
  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(4);
  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  expect(tabs[0]).toHaveAttribute("tabindex", "0");
  expect(tabs[1]).toHaveAttribute("tabindex", "-1");
});

test("LayerRail moves selection with arrow keys", async () => {
  const user = userEvent.setup();
  render(<RailHarness />);
  const tabs = screen.getAllByRole("tab");
  tabs[0].focus();
  await user.keyboard("{ArrowDown}");
  expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  await user.keyboard("{End}");
  expect(screen.getAllByRole("tab")[3]).toHaveAttribute("aria-selected", "true");
  await user.keyboard("{Home}");
  expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
});

test("Constellation renders every node label and edge", () => {
  const { container } = render(
    <svg>
      <Constellation
        nodes={[
          { id: "a", label: "checkout-api", x: 10, y: 10 },
          { id: "b", label: "deploy", x: 50, y: 40 },
        ]}
        edges={[{ from: "a", to: "b" }]}
        progress={1}
      />
    </svg>,
  );
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
  expect(container.querySelectorAll("line")).toHaveLength(1);
});
