import Link from "next/link";
import { Logo } from "@/components/primitives/Logo";
import { cn } from "@/lib/cn";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type FooterProps = {
  columns?: FooterColumn[];
  tagline?: string;
  copyright?: string;
  className?: string;
};

export function Footer({
  columns = [],
  tagline,
  copyright,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-bg px-[var(--spacing-pad-x)] py-12",
        className,
      )}
    >
      <div className="flex flex-col gap-10">
        <div className="flex items-start justify-between gap-12">
          <div className="flex w-[280px] flex-col gap-3">
            <Link href="/" aria-label="StackGen home">
              <Logo />
            </Link>
            {tagline ? (
              <p className="text-[13px] text-text-tertiary">{tagline}</p>
            ) : null}
          </div>

          {columns.length > 0 ? (
            <div className="flex flex-1 gap-16">
              {columns.map((column) => (
                <div key={column.title} className="flex-1">
                  <p className="mb-2.5 text-[13px] font-medium text-text-primary">
                    {column.title}
                  </p>
                  <ul className="m-0 list-none space-y-2.5 p-0">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[13px] text-text-secondary no-underline"
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

        {copyright ? (
          <p className="text-xs text-text-tertiary">{copyright}</p>
        ) : null}
      </div>
    </footer>
  );
}
