import Link from "next/link";
import { docsHub } from "@/content/docs/hub";

export default function DocsHubPage() {
  return (
    <article className="flex w-full max-w-3xl flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-balance text-4xl font-medium text-text-primary">{docsHub.title}</h1>
        <p className="text-text-secondary">{docsHub.productsBody}</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-text-primary">{docsHub.productsTitle}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {docsHub.products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-lg border border-border bg-surface p-6 no-underline"
            >
              <h3 className="text-lg font-medium text-text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{p.body}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-text-primary">{docsHub.toolsTitle}</h2>
        <p className="text-text-secondary">{docsHub.toolsLead}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {docsHub.tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-lg border border-border bg-surface p-6 no-underline"
            >
              <h3 className="text-lg font-medium text-text-primary">{t.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{t.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
