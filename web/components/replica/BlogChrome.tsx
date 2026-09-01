"use client";

import type { ReactNode } from "react";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { useTheme } from "@/components/replica/theme/ThemeProvider";

export function BlogChrome({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <main className="flex w-full flex-col bg-bg text-text-primary">
      <ReplicaNav theme={theme} />
      {children}
      <ReplicaFooter theme={theme} />
    </main>
  );
}
