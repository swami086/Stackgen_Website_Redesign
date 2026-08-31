import { render, screen } from "@testing-library/react";
import { DiagramPlaceholder } from "@/components/replica/shared/DiagramPlaceholder";
import {
  homeDiagramPlaceholders,
  productDiagramPlaceholders,
} from "@/content/diagram-placeholders";

test("home diagram placeholders expose Soft Structuralism plate identity", () => {
  const { container } = render(
    <DiagramPlaceholder content={homeDiagramPlaceholders.solutionPillars} />,
  );
  expect(
    container.querySelector('[data-diagram-placeholder="solution-pillars"]'),
  ).toBeTruthy();
  expect(screen.getByText("Factory pillars")).toBeInTheDocument();
  expect(screen.getByText("Diagram placeholder")).toBeInTheDocument();
  expect(screen.getByText(/Deck p4–5/)).toBeInTheDocument();
});

test("product diagram placeholders cover all four slugs", () => {
  for (const [slug, content] of Object.entries(productDiagramPlaceholders)) {
    const { unmount } = render(<DiagramPlaceholder content={content} />);
    expect(
      document.querySelector(`[data-diagram-placeholder="${content.id}"]`),
    ).toBeTruthy();
    expect(screen.getByText(content.title)).toBeInTheDocument();
    expect(slug.startsWith("aiden-for-")).toBe(true);
    unmount();
  }
});
