import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getPublishedPost, getPublishedPosts } from "@/lib/cms";
import { getPublishedPageBySlug } from "@/lib/puck-pages";

export const revalidate = 300;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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
  const [post, puckPage] = await Promise.all([
    getPublishedPost(slug),
    getPublishedPageBySlug(slug),
  ]);
  if (!post) notFound();

  if (!puckPage?.puckData) notFound();

  return <PuckSitePage data={puckPage.puckData as Data} />;
}
