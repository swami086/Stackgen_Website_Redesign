import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonGhostProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonGhost({ href, children, className }: ButtonGhostProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center text-[13.5px] tracking-[-0.1px] text-text-secondary no-underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}
