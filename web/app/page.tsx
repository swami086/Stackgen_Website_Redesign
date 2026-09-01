import { HomeReplica } from "@/components/replica/HomeReplica";
import { getOverlayReplicaContent } from "@/lib/webflow-cms";

export const revalidate = 300;

export default async function HomePage() {
  const content = await getOverlayReplicaContent();
  return <HomeReplica content={content} />;
}
