import { cn } from "@/lib/cn";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
} & React.ComponentPropsWithoutRef<"section">;

export function SectionShell({
  children,
  className,
  as: Tag = "section",
  ...props
}: SectionShellProps) {
  return (
    <Tag
      className={cn(
        "px-[var(--spacing-pad-x)] py-[var(--spacing-pad-y)]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
