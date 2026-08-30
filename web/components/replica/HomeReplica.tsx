"use client";

import { ReplicaAssemblies } from "@/components/replica/sections/Assemblies";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { ReplicaHero } from "@/components/replica/sections/Hero";
import { ReplicaLogos } from "@/components/replica/sections/Logos";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaShell } from "@/components/replica/sections/Shell";
import { ReplicaVideo } from "@/components/replica/sections/Video";
import { ReplicaWhoItsFor } from "@/components/replica/sections/WhoItsFor";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

export function HomeReplica() {
  const { theme } = useTheme();
  const frames = REPLICA_FRAMES[theme];

  return (
    <main
      data-pencil-id={frames.frame}
      data-pencil-theme={theme}
      className="flex w-full flex-col bg-bg text-text-primary"
    >
      <ReplicaNav theme={theme} />
      <ReplicaHero theme={theme} />
      <ReplicaVideo theme={theme} />
      <ReplicaLogos theme={theme} />
      <ReplicaAssemblies theme={theme} />
      <ReplicaShell theme={theme} />
      <ReplicaWhoItsFor theme={theme} />
      <ReplicaFooter theme={theme} />
    </main>
  );
}
