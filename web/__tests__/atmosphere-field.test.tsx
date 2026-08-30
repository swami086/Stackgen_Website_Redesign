import { render } from "@testing-library/react";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { atmosphereSrc } from "@/lib/atmosphere";

test("atmosphereSrc builds fixed public paths", () => {
  expect(atmosphereSrc("hero-field", "light")).toBe(
    "/media/atmosphere/hero-field-light.png",
  );
  expect(atmosphereSrc("ground-who", "dark")).toBe(
    "/media/atmosphere/ground-who-dark.png",
  );
});

test("AtmosphereField is aria-hidden and decorative", () => {
  const { container } = render(
    <AtmosphereField slot="hero-field" theme="dark" />,
  );
  const root = container.firstElementChild;
  expect(root).toHaveAttribute("aria-hidden", "true");
});

test("AtmosphereField with srcOverride null renders no img and no broken bg url", () => {
  const { container } = render(
    <AtmosphereField slot="hero-field" theme="dark" srcOverride={null} />,
  );
  expect(container.querySelector("img")).toBeNull();
  const el = container.firstElementChild as HTMLElement;
  expect(el.style.backgroundImage || "").not.toMatch(/url\(/);
});
