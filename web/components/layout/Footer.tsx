import Link from "next/link";
import { Logo } from "@/components/primitives/Logo";
import { cn } from "@/lib/cn";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type FooterProps = {
  columns?: FooterColumn[];
  className?: string;
};

export function Footer({ columns = [], className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-bg px-[var(--spacing-pad-x)] py-12",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-12">
        <Link href="/" aria-label="StackGen home">
          <Logo />
        </Link>

        {columns.length > 0 ? (
          <div className="flex gap-16">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 text-sm font-medium text-text-primary">
                  {column.title}
                </p>
                <ul className="m-0 list-none space-y-2 p-0">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary no-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
