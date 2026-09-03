import { PuckSitePage } from "@/components/puck/PuckSitePage";
import type { Data } from "@puckeditor/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isNextProductionBuild } from "@/lib/next-build-phase";
import { getPublishedPageBySlug } from "@/lib/puck-pages";

/** Payload Local API — no DB at Docker build time. */
export const dynamic = "force-dynamic";

const DEMO_SLUG = "puck-demo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPageBySlug(DEMO_SLUG);
  if (!page) return { title: "Puck Demo" };
  const meta = page.meta as { title?: string; description?: string } | undefined;
  return {
    title: meta?.title ?? page.title ?? "Puck Demo",
    description: meta?.description,
  };
}

export default async function PuckDemoPage() {
  const page = await getPublishedPageBySlug(DEMO_SLUG);
  if (!page?.puckData) {
    if (isNextProductionBuild()) {
      return (
        <main className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-500">
          Content loads at runtime.
        </main>
      );
    }
    notFound();
  }

  return <PuckSitePage data={page.puckData as Data} />;
}
