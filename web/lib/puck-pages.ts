import config from "@payload-config";
import type { Data } from "@puckeditor/core";
import { getPayload } from "payload";

export type PuckPageDoc = {
  id: number | string;
  title?: string | null;
  slug?: string | null;
  isHomepage?: boolean | null;
  puckData?: Data | null;
  meta?: { title?: string; description?: string } | null;
};

export async function getPublishedPageBySlug(
  slug: string,
): Promise<PuckPageDoc | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
    limit: 1,
  });
  return (docs[0] as PuckPageDoc | undefined) ?? null;
}

export async function getPublishedHomepage(): Promise<PuckPageDoc | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      and: [{ isHomepage: { equals: true } }, { _status: { equals: "published" } }],
    },
    limit: 1,
  });
  return (docs[0] as PuckPageDoc | undefined) ?? null;
}
