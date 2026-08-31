import { render, screen } from "@testing-library/react";
import { DiagramPlaceholder } from "@/components/replica/shared/DiagramPlaceholder";
import { productDiagramPlaceholders } from "@/content/diagram-placeholders";

test("product diagram placeholders cover all four new deep-dive slots", () => {
  for (const [slug, content] of Object.entries(productDiagramPlaceholders)) {
    const { unmount } = render(<DiagramPlaceholder content={content} />);
    expect(
      document.querySelector(`[data-diagram-placeholder="${content.id}"]`),
    ).toBeTruthy();
    expect(screen.getByText(content.title)).toBeInTheDocument();
    expect(screen.getByText("Diagram placeholder")).toBeInTheDocument();
    expect(slug.startsWith("aiden-for-")).toBe(true);
    unmount();
  }
});
