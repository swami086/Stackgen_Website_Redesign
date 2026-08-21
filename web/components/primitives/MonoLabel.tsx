import { cn } from "@/lib/cn";

type MonoLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-wide text-text-tertiary",
        className,
      )}
    >
      {children}
    </span>
  );
}
