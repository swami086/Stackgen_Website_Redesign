"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { docsNav, navForProduct, nodeContainsHref, type DocsNavNode } from "@/lib/docs/nav";

const LINK_CLASS =
  "block rounded-md px-2 py-1 text-sm text-text-secondary no-underline transition-colors hover:text-text-primary";

type DocsSidebarProps = {
  product: keyof typeof docsNav;
};

function isCurrent(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href;
}

function Tree({ nodes, pathname, depth }: { nodes: DocsNavNode[]; pathname: string; depth: number }) {
  return (
    <ul className={cn("flex list-none flex-col gap-1 p-0", depth > 0 && "mt-1 border-l border-border pl-3")}>
      {nodes.map((node) => {
        const contains = nodeContainsHref(node, pathname);
        const hasKids = node.children.length > 0;
        if (hasKids) {
          return (
            <li key={node.slug.join("/")}>
              <details
                key={`${pathname}:${node.slug.join("/")}`}
                {...(contains ? { open: true } : {})}
                className="group"
              >
                <summary className="cursor-pointer list-none rounded-md px-2 py-1 text-sm text-text-secondary marker:content-none hover:text-text-primary [&::-webkit-details-marker]:hidden">
                  {node.href ? (
                    <Link
                      href={node.href}
                      className={cn(
                        "no-underline",
                        isCurrent(pathname, node.href) ? "font-medium text-text-primary" : "text-text-secondary",
                      )}
                    >
                      {node.title}
                    </Link>
                  ) : (
                    <span className={contains ? "font-medium text-text-primary" : undefined}>{node.title}</span>
                  )}
                </summary>
                <Tree nodes={node.children} pathname={pathname} depth={depth + 1} />
              </details>
            </li>
          );
        }
        if (!node.href) return null;
        return (
          <li key={node.href}>
            <Link
              href={node.href}
              className={cn(LINK_CLASS, isCurrent(pathname, node.href) && "font-medium text-text-primary")}
            >
              {node.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DocsSidebar({ product }: DocsSidebarProps) {
  const pathname = usePathname();
  const root = navForProduct(product);
  if (!root) return null;

  return (
    <nav aria-label={`${root.title} docs`} className="flex flex-col gap-3">
      <Link
        href={root.href}
        className={cn(
          "text-sm no-underline transition-colors hover:text-text-primary",
          isCurrent(pathname, root.href) ? "font-medium text-text-primary" : "text-text-secondary",
        )}
      >
        {root.title}
      </Link>
      <Tree nodes={root.children} pathname={pathname} depth={0} />
    </nav>
  );
}
