import { PageRenderer } from "@delmaredigital/payload-puck/render";
import type { Data } from "@puckeditor/core";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { baseConfig } from "@/puck/config";

export const revalidate = 60;

const DEMO_SLUG = "puck-demo";

async function getPuckDemoPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      and: [
        { slug: { equals: DEMO_SLUG } },
        { _status: { equals: "published" } },
      ],
    },
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPuckDemoPage();
  if (!page) return { title: "Puck Demo" };
  const meta = page.meta as { title?: string; description?: string } | undefined;
  return {
    title: meta?.title ?? page.title ?? "Puck Demo",
    description: meta?.description,
  };
}

export default async function PuckDemoPage() {
  const page = await getPuckDemoPage();
  if (!page?.puckData) notFound();

  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <PageRenderer config={baseConfig} data={page.puckData as Data} />
    </main>
  );
}
