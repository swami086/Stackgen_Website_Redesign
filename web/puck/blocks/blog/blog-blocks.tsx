"use client";

import type { ComponentConfig } from "@puckeditor/core";
import { stripHtml } from "@/lib/cms-overlay";

function paragraphsFromHtml(html: string): string[] {
  const matches = [...html.matchAll(/<p\b[^>]*>(.*?)<\/p>/gi)].map((match) =>
    stripHtml(match[1]),
  );
  const blocks = matches.filter(Boolean);
  return blocks.length ? blocks : [stripHtml(html)].filter(Boolean);
}

export const stackGenBlogEyebrowBlock: ComponentConfig = {
  label: "Blog Eyebrow",
  fields: { text: { type: "text", label: "Eyebrow" } },
  defaultProps: { id: "blog-eyebrow", text: "News" },
  render: ({ text }) => (
    <p className="mx-auto w-full max-w-3xl px-6 pt-24 font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
      {text}
    </p>
  ),
};

export const stackGenBlogTitleBlock: ComponentConfig = {
  label: "Blog Title",
  fields: { title: { type: "text", label: "Title" } },
  defaultProps: { id: "blog-title", title: "Article title" },
  render: ({ title }) => (
    <h1 className="mx-auto w-full max-w-3xl px-6 text-4xl font-bold tracking-[-1px] text-text-primary">
      {title}
    </h1>
  ),
};

export const stackGenBlogExcerptBlock: ComponentConfig = {
  label: "Blog Excerpt",
  fields: { excerpt: { type: "textarea", label: "Excerpt" } },
  defaultProps: { id: "blog-excerpt", excerpt: "" },
  render: ({ excerpt }) => (
    <p className="mx-auto w-full max-w-3xl px-6 text-lg leading-relaxed text-text-secondary">
      {excerpt || ""}
    </p>
  ),
};

export const stackGenBlogBodyBlock: ComponentConfig = {
  label: "Blog Body",
  fields: {
    bodyHtml: {
      type: "textarea",
      label: "Body HTML (from Payload post body)",
    },
  },
  defaultProps: { id: "blog-body", bodyHtml: "<p>Article body</p>" },
  render: ({ bodyHtml }) => (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 pb-24 text-base leading-relaxed text-text-secondary">
      {paragraphsFromHtml(String(bodyHtml)).map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  ),
};

export const stackGenBlogParagraphBlock: ComponentConfig = {
  label: "Blog Paragraph",
  fields: { text: { type: "textarea", label: "Paragraph" } },
  defaultProps: { id: "blog-paragraph", text: "Paragraph text" },
  render: ({ text }) => (
    <p className="mx-auto w-full max-w-3xl px-6 text-base leading-relaxed text-text-secondary">
      {text}
    </p>
  ),
};

export const stackGenBlogQuoteBlock: ComponentConfig = {
  label: "Blog Quote",
  fields: {
    quote: { type: "textarea", label: "Quote" },
    attribution: { type: "text", label: "Attribution" },
  },
  defaultProps: { id: "blog-quote", quote: "", attribution: "" },
  render: ({ quote, attribution }) => (
    <blockquote className="mx-auto w-full max-w-3xl border-l-2 border-accent px-6 py-2">
      <p className="text-lg italic text-text-primary">{quote || ""}</p>
      {attribution ? (
        <footer className="mt-2 text-sm text-text-tertiary">— {attribution}</footer>
      ) : null}
    </blockquote>
  ),
};

export const blogBlocks = {
  StackGenBlogEyebrow: stackGenBlogEyebrowBlock,
  StackGenBlogTitle: stackGenBlogTitleBlock,
  StackGenBlogExcerpt: stackGenBlogExcerptBlock,
  StackGenBlogBody: stackGenBlogBodyBlock,
  StackGenBlogParagraph: stackGenBlogParagraphBlock,
  StackGenBlogQuote: stackGenBlogQuoteBlock,
};
