import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogChrome } from "@/components/replica/BlogChrome";
import { BlogPostArticle } from "@/components/replica/BlogPostArticle";
import { getPostRaw, getPublishedPost, getPublishedPosts } from "@/lib/cms";

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
  const [post, rawPost] = await Promise.all([getPublishedPost(slug), getPostRaw(slug)]);
  if (!post) notFound();

  return (
    <BlogChrome>
      <BlogPostArticle post={post} rawPost={rawPost} />
    </BlogChrome>
  );
}
