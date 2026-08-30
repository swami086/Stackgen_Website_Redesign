import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { slugifyHeading } from "@/components/docs/DocsToc";
import { rewriteDocsHref } from "@/lib/docs/paths";

function headingText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        return headingText(child.props.children);
      }
      return "";
    })
    .join("");
}

export function DocsMarkdown({ body }: { body: string }) {
  return (
    <div className="docs-prose flex max-w-prose flex-col gap-4 text-text-secondary leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const mapped = href ? rewriteDocsHref(href) : href;
            if (mapped && mapped.startsWith("/")) {
              return (
                <Link href={mapped} className="text-accent-text underline">
                  {children}
                </Link>
              );
            }
            return (
              <a href={mapped} className="text-accent-text underline" rel="noreferrer">
                {children}
              </a>
            );
          },
          h1: () => null,
          h2: ({ children }) => {
            const id = slugifyHeading(headingText(children));
            return (
              <h2 id={id} className="mt-8 text-xl font-medium text-text-primary">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = slugifyHeading(headingText(children));
            return (
              <h3 id={id} className="mt-6 text-lg font-medium text-text-primary">
                {children}
              </h3>
            );
          },
          code: ({ className, children }) => (
            <code className={`font-mono text-sm text-text-primary ${className ?? ""}`}>
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border py-2 text-left text-text-primary">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border py-2">{children}</td>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
