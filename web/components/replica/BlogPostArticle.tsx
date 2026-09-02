"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { applyPostOverlay, stripHtml, type CmsFieldData, type CmsPost } from "@/lib/cms-overlay";

function paragraphsFromCmsHtml(html: string): string[] {
  const matches = [...html.matchAll(/<p\b[^>]*>(.*?)<\/p>/gi)].map((match) =>
    stripHtml(match[1]),
  );
  const blocks = matches.filter(Boolean);
  return blocks.length ? blocks : [stripHtml(html)].filter(Boolean);
}

type BlogPostArticleProps = {
  post: CmsPost;
  /** Raw `posts` doc fields — enables Payload admin Live Preview when set. */
  rawPost?: CmsFieldData;
};

export function BlogPostArticle({ post, rawPost }: BlogPostArticleProps) {
  const { data: livePost } = useLivePreview<CmsFieldData>({
    initialData: rawPost ?? {},
    serverURL:
      process.env.NEXT_PUBLIC_SERVER_URL ??
      (typeof window !== "undefined" ? window.location.origin : ""),
    depth: 0,
  });

  const resolved = rawPost ? applyPostOverlay(post, livePost) : post;

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-24">
      <p className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
        News
      </p>
      <h1 className="text-4xl font-bold tracking-[-1px] text-text-primary">
        {resolved.title}
      </h1>
      {resolved.excerpt ? (
        <p className="text-lg leading-relaxed text-text-secondary">{resolved.excerpt}</p>
      ) : null}
      <div className="flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
        {paragraphsFromCmsHtml(resolved.body).map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
