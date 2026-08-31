import Link from "next/link";
import { cn } from "@/lib/cn";

type ReplicaPrimaryPillProps = {
  label: string;
  href?: string;
  variant?: "nav" | "hero";
};

/**
 * Primary CTA pill.
 * - hero: full-weight accent (page CTA)
 * - nav: Apple glassProminent analog — solid accent nested inside the
 *   Liquid Glass island (Mobbin Craft/Emergent: compact pill in frosted bar).
 *   Must stay single-line and shorter than the island height.
 */
export function ReplicaPrimaryPill({
  label,
  href = "#",
  variant = "hero",
}: ReplicaPrimaryPillProps) {
  const isNav = variant === "nav";

  return (
    <Link
      href={href}
      data-pill-variant={variant}
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-accent font-medium text-on-accent no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]",
        isNav
          ? /* Nested in 48–60px glass island — never wrap, never overflow. */
            "h-8 whitespace-nowrap rounded-full px-3.5 text-[13px] leading-none tracking-[-0.01em] shadow-[inset_0_1px_0_rgb(255_255_255/0.28)]"
          : "rounded-full px-4 py-3 text-sm leading-none",
      )}
    >
      {label}
    </Link>
  );
}
