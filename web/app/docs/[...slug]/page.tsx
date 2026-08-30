import { notFound } from "next/navigation";
import Link from "next/link";
import { DocsMarkdown } from "@/components/docs/DocsMarkdown";
import { DocsToc, parseTocHeadings } from "@/components/docs/DocsToc";
import { listDocSlugs, loadDoc } from "@/lib/docs/load";
import { crumbsForHref, navForProduct, prevNextForHref } from "@/lib/docs/nav";

type PageProps = { params: Promise<{ slug: string[] }> };

function descriptionFromBody(body: string): string | undefined {
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const plain = trimmed
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_~`]/g, "")
      .trim();
    if (plain) return plain.slice(0, 160);
  }
  return undefined;
}

export function generateStaticParams() {
  return listDocSlugs()
    .filter((slug) => slug.length > 0)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = loadDoc(slug);
  if (!page) return { title: "Docs | StackGen" };
  const productNav = navForProduct(slug[0] ?? "");
  const title = productNav
    ? (crumbsForHref(productNav, page.href).at(-1)?.title ?? page.frontmatter.title)
    : page.frontmatter.title;
  const description = descriptionFromBody(page.body);
  return {
    title,
    description,
    alternates: { canonical: `https://stackgen.com${page.href}` },
    openGraph: {
      title: `${title} | StackGen Docs`,
      description,
    },
  };
}

export default async function DocsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (slug.length === 0) notFound();
  const page = loadDoc(slug);
  if (!page) notFound();

  const productNav = navForProduct(slug[0]!);
  const toc = parseTocHeadings(page.body);
  const { prev, next } = productNav ? prevNextForHref(productNav, page.href) : { prev: null, next: null };
  const crumbs = productNav ? crumbsForHref(productNav, page.href) : [];
  const heading = crumbs.at(-1)?.title ?? page.frontmatter.title;

  return (
    <div className="flex w-full gap-8">
      <article className="flex min-w-0 flex-1 flex-col gap-6">
        {crumbs.length > 1 ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-sm text-text-secondary">
              <li>
                <Link href="/docs" className="text-text-secondary no-underline hover:text-text-primary">
                  Docs
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {index === crumbs.length - 1 ? (
                    <span className="text-text-primary">{crumb.title}</span>
                  ) : (
                    <Link href={crumb.href} className="text-text-secondary no-underline hover:text-text-primary">
                      {crumb.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <h1 className="text-balance text-3xl font-medium text-text-primary">{heading}</h1>
        {page.frontmatter.status !== "ok" ? (
          <p className="rounded-md border border-border bg-surface p-3 text-sm">
            This page imported with status {page.frontmatter.status}. Source:{" "}
            <a href={page.frontmatter.sourceUrl}>{page.frontmatter.sourceUrl}</a>
          </p>
        ) : null}
        <div className="lg:hidden">
          <DocsToc headings={toc} />
        </div>
        <DocsMarkdown body={page.body} />
        {prev || next ? (
          <nav
            aria-label="Docs pagination"
            className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between"
          >
            {prev ? (
              <Link
                href={prev.href}
                className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary"
              >
                Previous: {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.href}
                className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary sm:text-right"
              >
                Next: {next.title}
              </Link>
            ) : null}
          </nav>
        ) : null}
      </article>
      {toc.length > 0 ? (
        <aside className="hidden w-56 shrink-0 lg:sticky lg:top-28 lg:block lg:self-start">
          <DocsToc headings={toc} />
        </aside>
      ) : null}
    </div>
  );
}
