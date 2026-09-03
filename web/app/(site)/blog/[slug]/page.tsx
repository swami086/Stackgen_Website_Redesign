import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getPublishedPost } from "@/lib/cms";
import { isNextProductionBuild } from "@/lib/next-build-phase";
import { getPublishedPageBySlug } from "@/lib/puck-pages";

/** Payload Local API — no DB at Docker build time. */
export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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
  const [post, puckPage] = await Promise.all([
    getPublishedPost(slug),
    getPublishedPageBySlug(slug),
  ]);
  if (!post) {
    if (isNextProductionBuild()) {
      return (
        <main className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-500">
          Content loads at runtime.
        </main>
      );
    }
    notFound();
  }

  if (!puckPage?.puckData) {
    if (isNextProductionBuild()) {
      return (
        <main className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-500">
          Content loads at runtime.
        </main>
      );
    }
    notFound();
  }

  return <PuckSitePage data={puckPage.puckData as Data} />;
}
