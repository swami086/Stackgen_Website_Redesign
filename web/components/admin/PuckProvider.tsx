"use client";

import { PuckConfigProvider } from "@delmaredigital/payload-puck/client";
import { stackgenEditorConfig } from "@/puck/stackgen-config";
import { PuckRenderProviders } from "@/puck/PuckRenderProviders";

export default function PuckProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PuckRenderProviders>
      <PuckConfigProvider config={stackgenEditorConfig}>{children}</PuckConfigProvider>
    </PuckRenderProviders>
  );
}
