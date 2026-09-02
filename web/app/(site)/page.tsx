import { HomeReplica } from "@/components/replica/HomeReplica";
import { getHomeGlobalRaw, getOverlayReplicaContent } from "@/lib/cms";

export const revalidate = 300;

export default async function HomePage() {
  const [content, rawHome] = await Promise.all([
    getOverlayReplicaContent(),
    getHomeGlobalRaw(),
  ]);
  return <HomeReplica content={content} rawHome={rawHome} />;
}
