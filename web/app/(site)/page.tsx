import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getPublishedHomepage } from "@/lib/puck-pages";

export const revalidate = 300;

export default async function HomePage() {
  const puckHome = await getPublishedHomepage();
  if (!puckHome?.puckData) notFound();
  return <PuckSitePage data={puckHome.puckData as Data} />;
}
