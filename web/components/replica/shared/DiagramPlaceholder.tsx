import { cn } from "@/lib/cn";
import type { DiagramPlaceholderContent } from "@/content/diagram-placeholders";

type Props = {
  content: DiagramPlaceholderContent;
  theme?: "light" | "dark";
  className?: string;
  /** Desktop-ish height; Soft Structuralism plate */
  compact?: boolean;
};

/**
 * Soft Structuralism stand-in for Pencil diagrams not yet approved → React.
 * Quiet plate + mono badge — no fake chrome, no neon.
 */
export function DiagramPlaceholder({
  content,
  theme = "dark",
  className,
  compact = false,
}: Props) {
  void theme;

  return (
    <figure
      data-diagram-placeholder={content.id}
      className={cn(
        "glass-specular relative flex w-full flex-col overflow-hidden rounded-[16px] border border-border p-2.5 md:p-3",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-center gap-3 rounded-md border border-border bg-surface-raised px-6 text-center",
          compact ? "min-h-[200px] py-10 md:min-h-[240px]" : "min-h-[280px] py-12 md:min-h-[360px]",
        )}
        role="img"
        aria-label={`Diagram placeholder: ${content.title}. ${content.subtitle}. ${content.deck}`}
      >
        <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
          Diagram placeholder
        </span>
        <p className="max-w-xl text-base font-semibold text-text-primary md:text-lg">
          {content.title}
        </p>
        <p className="max-w-lg text-sm leading-snug text-text-secondary">{content.subtitle}</p>
        <p className="font-mono text-[11px] tracking-[1px] text-text-tertiary">{content.deck}</p>
      </div>
    </figure>
  );
}
