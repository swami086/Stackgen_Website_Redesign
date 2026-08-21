import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonPrimaryProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonPrimary({ href, children, className }: ButtonPrimaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-md bg-accent px-[14px] py-2 text-[13.5px] font-medium tracking-[-0.1px] text-on-accent no-underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}
