"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { applyHomeLivePreview, type CmsFieldData } from "@/lib/cms-overlay";
import { ReplicaAssemblies } from "@/components/replica/sections/Assemblies";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { ReplicaHero } from "@/components/replica/sections/Hero";
import { ReplicaLogos } from "@/components/replica/sections/Logos";
import { ReplicaProblem } from "@/components/replica/sections/Problem";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaShell } from "@/components/replica/sections/Shell";
import { ReplicaSolution } from "@/components/replica/sections/Solution";
import { ReplicaWhoItsFor } from "@/components/replica/sections/WhoItsFor";
import { ReplicaContentProvider } from "@/components/replica/ReplicaContentContext";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { replicaContent, type ReplicaContent } from "@/content/replica";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type HomeReplicaProps = {
  content?: ReplicaContent;
  /** Raw `home` global fields — enables Payload admin Live Preview when set. */
  rawHome?: CmsFieldData;
  /** All card docs — merged client-side when previewing a card. */
  cards?: CmsFieldData[];
};

export function HomeReplica({ content = replicaContent, rawHome, cards = [] }: HomeReplicaProps) {
  const { theme } = useTheme();
  const frames = REPLICA_FRAMES[theme];

  const { data: liveData } = useLivePreview<CmsFieldData>({
    initialData: rawHome ?? {},
    serverURL:
      process.env.NEXT_PUBLIC_SERVER_URL ??
      (typeof window !== "undefined" ? window.location.origin : ""),
    depth: 0,
  });

  const liveContent = applyHomeLivePreview(content, liveData, rawHome, cards);

  return (
    <ReplicaContentProvider value={liveContent}>
    <main
      data-pencil-id={frames.frame}
      data-pencil-theme={theme}
      className="flex w-full flex-col bg-bg text-text-primary"
    >
      <ReplicaNav theme={theme} />
      <ReplicaHero theme={theme} />
      <ReplicaLogos theme={theme} />
      <ReplicaProblem theme={theme} />
      <ReplicaSolution theme={theme} />
      <ReplicaAssemblies theme={theme} />
      <ReplicaShell theme={theme} />
      <ReplicaWhoItsFor theme={theme} />
      <ReplicaFooter theme={theme} />
    </main>
    </ReplicaContentProvider>
  );
}
