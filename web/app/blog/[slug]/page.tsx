import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogChrome } from "@/components/replica/BlogChrome";
import { getPublishedPost, getPublishedPosts, stripHtml } from "@/lib/webflow-cms";

export const revalidate = 300;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function paragraphsFromCmsHtml(html: string): string[] {
  const matches = [...html.matchAll(/<p\b[^>]*>(.*?)<\/p>/gi)].map((match) =>
    stripHtml(match[1]),
  );
  const blocks = matches.filter(Boolean);
  return blocks.length ? blocks : [stripHtml(html)].filter(Boolean);
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "StackGen" };
  return {
    title: `${post.title} | StackGen`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  return (
    <BlogChrome>
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-24">
        <p className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
          News
        </p>
        <h1 className="text-4xl font-bold tracking-[-1px] text-text-primary">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="text-lg leading-relaxed text-text-secondary">{post.excerpt}</p>
        ) : null}
        <div className="flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
          {paragraphsFromCmsHtml(post.body).map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </BlogChrome>
  );
}
