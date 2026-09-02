import { HomeReplica } from "@/components/replica/HomeReplica";
import { getCardsRaw, getHomeGlobalRaw, getOverlayReplicaContent } from "@/lib/cms";

export const revalidate = 300;

export default async function HomePage() {
  const [content, rawHome, cards] = await Promise.all([
    getOverlayReplicaContent(),
    getHomeGlobalRaw(),
    getCardsRaw(),
  ]);
  return <HomeReplica content={content} rawHome={rawHome} cards={cards} />;
}
