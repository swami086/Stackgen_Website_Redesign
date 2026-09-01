"use client";

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

export function HomeReplica({ content = replicaContent }: { content?: ReplicaContent }) {
  const { theme } = useTheme();
  const frames = REPLICA_FRAMES[theme];

  return (
    <ReplicaContentProvider value={content}>
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
