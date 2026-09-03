import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { isNextProductionBuild } from "@/lib/next-build-phase";
import { getPublishedHomepage } from "@/lib/puck-pages";

/** Payload Local API — no DB at Docker build time. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const puckHome = await getPublishedHomepage();

  if (!puckHome?.puckData) {
    // Docker `next build` uses a placeholder DATABASE_URL; don't fail the image.
    if (isNextProductionBuild()) {
      return (
        <main className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-500">
          Content loads at runtime.
        </main>
      );
    }
    notFound();
  }
  return <PuckSitePage data={puckHome.puckData as Data} />;
}
