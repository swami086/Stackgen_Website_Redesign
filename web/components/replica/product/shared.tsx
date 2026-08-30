import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const PLACEHOLDER_BADGE = "PLACEHOLDER — fill me";

type ProductPlaceholderBadgeProps = {
  className?: string;
};

export function ProductPlaceholderBadge({ className }: ProductPlaceholderBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-tertiary",
        className,
      )}
    >
      {PLACEHOLDER_BADGE}
    </span>
  );
}

type ProductSectionShellProps = {
  id: string;
  theme: "light" | "dark";
  className?: string;
  children: ReactNode;
  pencilId?: string;
};

export function ProductSectionShell({
  id,
  theme,
  className,
  children,
  pencilId,
}: ProductSectionShellProps) {
  return (
    <section
      id={id}
      data-product-section={id}
      data-pencil-id={pencilId}
      data-pencil-theme={theme}
      className={cn(
        "relative flex w-full flex-col items-center overflow-hidden border-b border-border bg-bg px-6 py-10 text-text-primary md:px-16 md:py-14",
        className,
      )}
    >
      <div className="relative z-10 flex w-full max-w-5xl flex-col gap-4">{children}</div>
    </section>
  );
}

export function isPlaceholderCopy(value: string): boolean {
  return value.startsWith("PLACEHOLDER — ");
}
