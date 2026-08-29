import { cn } from "@/lib/cn";

type DoubleBezelProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function DoubleBezel({
  children,
  className,
  innerClassName,
}: DoubleBezelProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-surface p-[6px] outline outline-1 -outline-offset-1 outline-border",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[14px] bg-surface-raised outline outline-1 -outline-offset-1 outline-border",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
