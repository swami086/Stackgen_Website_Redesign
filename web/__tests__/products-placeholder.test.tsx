import { render, screen, within } from "@testing-library/react";
import { ProductMegaMenu } from "@/components/replica/nav/ProductMegaMenu";
import { ProductPage } from "@/components/replica/ProductPage";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { productMegaMenuContent } from "@/content/product-mega-menu";
import { getProductContent } from "@/content/products";
import { PRODUCTS, PRODUCT_SLUGS, getProduct, productHref } from "@/lib/products";

function renderProduct(slug: (typeof PRODUCT_SLUGS)[number]) {
  document.documentElement.dataset.theme = "dark";
  window.localStorage.setItem("stackgen-theme", "dark");
  return render(
    <ThemeProvider>
      <ProductPage slug={slug} />
    </ThemeProvider>,
  );
}

test("PRODUCT_SLUGS uses locked InfraOps and DevOps routes", () => {
  expect(PRODUCT_SLUGS).toEqual([
    "aiden-for-infraops",
    "aiden-for-devops",
    "aiden-for-observability",
    "aiden-for-sre",
  ]);

  expect(PRODUCTS["aiden-for-infraops"].title).toBe("Aiden for InfraOps");
  expect(PRODUCTS["aiden-for-devops"].title).toBe("Aiden for DevOps");
  expect(PRODUCTS["aiden-for-infraops"].href).toBe("/product/aiden-for-infraops");
  expect(PRODUCTS["aiden-for-devops"].href).toBe("/product/aiden-for-devops");
});

test("all four product slugs resolve via getProduct", () => {
  for (const slug of PRODUCT_SLUGS) {
    const product = getProduct(slug);
    expect(product).toBeDefined();
    expect(product?.slug).toBe(slug);
    expect(product?.href).toBe(`/product/${slug}`);
  }
});

test("SRE product page ships Factory hero and DETECT spine without PLACEHOLDER", () => {
  const content = getProductContent("aiden-for-sre");
  expect(content.hero.subhead).not.toMatch(/^PLACEHOLDER/);
  expect(content.hero.subhead).toMatch(/Detect/);
  expect(content.problem.heading).not.toMatch(/^PLACEHOLDER/);
  renderProduct("aiden-for-sre");
  expect(screen.queryByText(/PLACEHOLDER — hero subhead/)).toBeNull();
});

test("product pages never use superseded Infrastructure or Automation naming", () => {
  for (const slug of PRODUCT_SLUGS) {
    const { container, unmount } = renderProduct(slug);
    expect(container.textContent).not.toMatch(/Aiden for Infrastructure/);
    expect(container.textContent).not.toMatch(/Aiden for Automation/);
    unmount();
  }
});

test("mega-menu explore hrefs point to the four product routes", () => {
  const hrefs = productMegaMenuContent.columns.map((column) =>
    productHref(column.slug),
  );
  expect(hrefs).toEqual([
    "/product/aiden-for-infraops",
    "/product/aiden-for-devops",
    "/product/aiden-for-observability",
    "/product/aiden-for-sre",
  ]);
});

test("mega-menu columns use locked product titles from PRODUCT.md", () => {
  for (const column of productMegaMenuContent.columns) {
    expect(column.title).toMatch(/^Aiden for (InfraOps|DevOps|Observability|SRE)$/);
    expect(column.title).not.toMatch(/Infrastructure|Automation|Olly/);
  }
});

test("InfraOps product page ships Factory hero without PLACEHOLDER", () => {
  const content = getProductContent("aiden-for-infraops");
  expect(content.hero.subhead).not.toMatch(/^PLACEHOLDER/);
  expect(content.hero.subhead).toMatch(/IDE/);
  expect(content.problem.heading).not.toMatch(/^PLACEHOLDER/);
});

test("product content objects expose section placeholders for stub slugs", () => {
  const stubSlugs = PRODUCT_SLUGS.filter(
    (slug) => slug !== "aiden-for-sre" && slug !== "aiden-for-infraops",
  );
  for (const slug of stubSlugs) {
    const content = getProductContent(slug);
    expect(content.hero.subhead).toMatch(/^PLACEHOLDER — /);
    expect(content.problem.heading).toMatch(/^PLACEHOLDER — /);
    expect(content.finalCta.cta).toBe("Schedule a demo");
  }
});

test("product page renders locked title as hero heading", () => {
  renderProduct("aiden-for-infraops");
  expect(
    screen.getByRole("heading", { level: 1, name: "Aiden for InfraOps" }),
  ).toBeInTheDocument();
});

test("product page skips optional offers section when flag is false", () => {
  renderProduct("aiden-for-devops");
  expect(document.querySelector('[data-product-section="product-offers"]')).toBeNull();
});

test("product page includes final CTA with Schedule a demo", () => {
  renderProduct("aiden-for-observability");
  const ctas = screen.getAllByRole("link", { name: "Schedule a demo" });
  expect(ctas.length).toBeGreaterThanOrEqual(2);
});

test("product hero CTAs link to schedule-demo and homepage how-it-works", () => {
  renderProduct("aiden-for-sre");
  const hero = document.getElementById("product-hero")!;
  expect(within(hero).getByRole("link", { name: "Schedule a demo" })).toHaveAttribute(
    "href",
    "/schedule-demo",
  );
  expect(within(hero).getByRole("link", { name: "How it works" })).toHaveAttribute(
    "href",
    "/#how-it-works",
  );
});

test("final CTA uses Schedule a demo href", () => {
  const content = getProductContent("aiden-for-infraops");
  expect(content.finalCta.cta).toBe("Schedule a demo");
  expect(content.finalCta.href).toBe("/schedule-demo");
});

test("product mega menu lists four Explore links to product routes", () => {
  render(
    <ProductMegaMenu forceOpen>
      <button type="button">Products</button>
    </ProductMegaMenu>,
  );

  for (const slug of PRODUCT_SLUGS) {
    const column = productMegaMenuContent.columns.find((entry) => entry.slug === slug);
    expect(column).toBeDefined();
    const link = screen.getByRole("menuitem", {
      name: `Explore ${column!.title}`,
    });
    expect(link).toHaveAttribute("href", productHref(slug));
  }

  expect(screen.getAllByRole("menuitem")).toHaveLength(4);
});

test("Products trigger exposes aria-expanded when menu is forced open", () => {
  render(
    <ProductMegaMenu forceOpen>
      <button type="button">Products</button>
    </ProductMegaMenu>,
  );

  expect(screen.getByRole("button", { name: "Products" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  expect(screen.getByRole("menu", { name: "Product catalog" })).toBeInTheDocument();
});

test("mega menu panel aligns to the nav shell axis, not the Products trigger", () => {
  const { container } = render(
    <ProductMegaMenu forceOpen>
      <button type="button">Products</button>
    </ProductMegaMenu>,
  );

  const panel = container.querySelector('[data-mega-align="nav-shell"]');
  expect(panel).toBeInTheDocument();
  expect(panel).toHaveClass("fixed", "left-1/2", "-translate-x-1/2");
});

test("mega menu mounts a hover bridge under the nav when open", () => {
  const { container } = render(
    <ProductMegaMenu forceOpen>
      <button type="button">Products</button>
    </ProductMegaMenu>,
  );

  expect(container.querySelector("[data-mega-bridge]")).toBeInTheDocument();
});
