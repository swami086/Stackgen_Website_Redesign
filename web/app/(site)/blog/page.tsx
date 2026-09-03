import Link from "next/link";
import { BlogChrome } from "@/components/replica/BlogChrome";
import { getPublishedPosts } from "@/lib/cms";

/** Payload Local API — no DB at Docker build time. */
export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <BlogChrome>
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-24">
        <header className="flex flex-col gap-3">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
            News
          </p>
          <h1 className="text-4xl font-bold tracking-[-1px] text-text-primary">
            StackGen blog
          </h1>
        </header>
        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts published yet.</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col gap-2 no-underline"
                >
                  <h2 className="text-xl font-semibold text-text-primary">{post.title}</h2>
                  {post.excerpt ? (
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {post.excerpt}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </BlogChrome>
  );
}
