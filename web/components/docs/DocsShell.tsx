"use client";

import Link from "next/link";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { docsNav } from "@/lib/docs/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const PRODUCTS = [
  { id: "stackgen" as const, label: "StackGen", href: "/docs/stackgen" },
  { id: "aiden" as const, label: "Aiden", href: "/docs/aiden" },
  { id: "observenow" as const, label: "ObserveNow", href: "/docs/observenow" },
];

function productFromPathname(pathname: string): keyof typeof docsNav | null {
  const segment = pathname.split("/")[2];
  if (segment === "stackgen" || segment === "aiden" || segment === "observenow") {
    return segment;
  }
  return null;
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const product = productFromPathname(pathname);

  return (
    <div data-docs-root className="flex min-h-dvh w-full flex-col bg-bg text-text-primary">
      <a
        href="#docs-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <ReplicaNav theme={theme} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 pt-28 pb-16">
        <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Docs products" className="flex flex-wrap gap-4">
            {PRODUCTS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-sm no-underline transition-colors hover:text-text-primary",
                  product === item.id ? "font-medium text-text-primary" : "text-text-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div data-docs-search-slot>
            <DocsSearch />
          </div>
        </div>
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          {product ? (
            <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-64 lg:self-start">
              <details open className="group">
                <summary className="cursor-pointer text-sm font-medium text-text-primary lg:hidden">
                  In this product
                </summary>
                <div className="mt-4 lg:mt-0">
                  <DocsSidebar product={product} />
                </div>
              </details>
            </aside>
          ) : null}
          <div id="docs-content" className="min-w-0 flex-1">
            {children}
          </div>
        </div>
      </div>
      <ReplicaFooter theme={theme} />
    </div>
  );
}
