import { HomeReplica } from "@/components/replica/HomeReplica";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getCardsRaw, getHomeGlobalRaw, getOverlayReplicaContent } from "@/lib/cms";
import { getPublishedHomepage } from "@/lib/puck-pages";
import type { Data } from "@puckeditor/core";

export const revalidate = 300;

export default async function HomePage() {
  const puckHome = await getPublishedHomepage();
  if (puckHome?.puckData) {
    return <PuckSitePage data={puckHome.puckData as Data} />;
  }

  // ponytail: delete once homepage seed + editor sign-off complete
  const [content, rawHome, cards] = await Promise.all([
    getOverlayReplicaContent(),
    getHomeGlobalRaw(),
    getCardsRaw(),
  ]);
  return <HomeReplica content={content} rawHome={rawHome} cards={cards} />;
}
